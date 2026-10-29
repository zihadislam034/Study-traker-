import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Filter,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { StorageService } from '../services/storage';
import { Priority, StudyTask } from '../types';
import { Modal } from '../components/common/Modal';

interface PlannerPageProps {
  onDataChanged: () => void;
}

type FilterTab = 'today' | 'upcoming' | 'overdue' | 'completed' | 'all';
type SortOption = 'time' | 'subject' | 'priority';

export const PlannerPage: React.FC<PlannerPageProps> = ({ onDataChanged }) => {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  if (!user) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const userData = StorageService.getUserData(user.id);
  const tasks = userData.tasks;
  const subjects = userData.subjects;

  const [filterTab, setFilterTab] = useState<FilterTab>('today');
  const [sortBy, setSortBy] = useState<SortOption>('time');
  const [searchQuery, setSearchQuery] = useState('');

  // Task creation/edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<StudyTask | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [scheduledDate, setScheduledDate] = useState(todayStr);
  const [startTime, setStartTime] = useState('14:00');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [priority, setPriority] = useState<Priority>('medium');
  const [hasReminder, setHasReminder] = useState(true);

  const openNewTaskModal = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setSubjectId(subjects[0]?.id || '');
    setScheduledDate(todayStr);
    setStartTime('14:00');
    setDurationMinutes(45);
    setPriority('medium');
    setHasReminder(true);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task: StudyTask) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || '');
    setSubjectId(task.subjectId);
    setScheduledDate(task.scheduledDate);
    setStartTime(task.startTime || '14:00');
    setDurationMinutes(task.durationMinutes);
    setPriority(task.priority);
    setHasReminder(task.hasReminder);
    setIsModalOpen(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask) {
      const updated: StudyTask = {
        ...editingTask,
        title: title.trim(),
        description: description.trim() || undefined,
        subjectId,
        scheduledDate,
        startTime,
        durationMinutes,
        priority,
        hasReminder,
      };
      StorageService.saveTask(user.id, updated);
    } else {
      const newTask: StudyTask = {
        id: `task_${Date.now()}`,
        userId: user.id,
        title: title.trim(),
        description: description.trim() || undefined,
        subjectId,
        scheduledDate,
        startTime,
        durationMinutes,
        priority,
        completed: false,
        hasReminder,
        createdAt: new Date().toISOString(),
      };
      StorageService.saveTask(user.id, newTask);
    }

    setIsModalOpen(false);
    onDataChanged();
  };

  const handleToggle = (taskId: string) => {
    StorageService.toggleTask(user.id, taskId);
    onDataChanged();
  };

  const handleDelete = (taskId: string) => {
    StorageService.deleteTask(user.id, taskId);
    onDataChanged();
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchDesc = task.description?.toLowerCase().includes(q) || false;
      const subj = subjects.find((s) => s.id === task.subjectId);
      const matchSubj = subj?.name.toLowerCase().includes(q) || subj?.nameBn?.toLowerCase().includes(q) || false;
      if (!matchTitle && !matchDesc && !matchSubj) return false;
    }

    if (filterTab === 'all') return true;
    if (filterTab === 'completed') return task.completed;
    if (filterTab === 'today') return task.scheduledDate === todayStr && !task.completed;
    if (filterTab === 'upcoming') return task.scheduledDate > todayStr && !task.completed;
    if (filterTab === 'overdue') return task.scheduledDate < todayStr && !task.completed;
    return true;
  });

  // Sort tasks
  filteredTasks.sort((a, b) => {
    if (sortBy === 'time') {
      if (a.scheduledDate !== b.scheduledDate) {
        return a.scheduledDate.localeCompare(b.scheduledDate);
      }
      return (a.startTime || '99:99').localeCompare(b.startTime || '99:99');
    }
    if (sortBy === 'priority') {
      const pWeights = { high: 3, medium: 2, low: 1 };
      return pWeights[b.priority] - pWeights[a.priority];
    }
    if (sortBy === 'subject') {
      const subjA = subjects.find((s) => s.id === a.subjectId)?.name || '';
      const subjB = subjects.find((s) => s.id === b.subjectId)?.name || '';
      return subjA.localeCompare(subjB);
    }
    return 0;
  });

  // Counts for tabs
  const countToday = tasks.filter((t) => t.scheduledDate === todayStr && !t.completed).length;
  const countUpcoming = tasks.filter((t) => t.scheduledDate > todayStr && !t.completed).length;
  const countOverdue = tasks.filter((t) => t.scheduledDate < todayStr && !t.completed).length;
  const countCompleted = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-5 pb-24">
      {/* Top Header & Add button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{t.plannerTitle}</span>
          </h2>
          <p className="text-xs text-gray-400">
            {language === 'bn'
              ? 'পরীক্ষার প্রস্তুতি ও দৈনন্দিন পড়া সাজিয়ে রাখুন'
              : 'Organize study tasks, syllabus milestones and daily schedule'}
          </p>
        </div>

        <button
          onClick={openNewTaskModal}
          className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-amber-400/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addNewTask}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex p-1 bg-[#131620] border border-[#222838] rounded-2xl overflow-x-auto no-scrollbar gap-1">
        <button
          onClick={() => setFilterTab('today')}
          className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
            filterTab === 'today'
              ? 'bg-amber-400 text-black shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>{t.todayTasks}</span>
          {countToday > 0 && (
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filterTab === 'today' ? 'bg-black/20 text-black' : 'bg-[#1e2330] text-amber-400'
              }`}
            >
              {countToday}
            </span>
          )}
        </button>

        <button
          onClick={() => setFilterTab('upcoming')}
          className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
            filterTab === 'upcoming'
              ? 'bg-amber-400 text-black shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>{t.upcomingTasks}</span>
          {countUpcoming > 0 && (
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filterTab === 'upcoming' ? 'bg-black/20 text-black' : 'bg-[#1e2330] text-gray-300'
              }`}
            >
              {countUpcoming}
            </span>
          )}
        </button>

        <button
          onClick={() => setFilterTab('overdue')}
          className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
            filterTab === 'overdue'
              ? 'bg-red-500 text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>{t.overdueTasks}</span>
          {countOverdue > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-red-950 text-red-300 border border-red-800">
              {countOverdue}
            </span>
          )}
        </button>

        <button
          onClick={() => setFilterTab('completed')}
          className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
            filterTab === 'completed'
              ? 'bg-amber-400 text-black shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>{t.completedTasks}</span>
          {countCompleted > 0 && (
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filterTab === 'completed' ? 'bg-black/20 text-black' : 'bg-[#1e2330] text-gray-300'
              }`}
            >
              {countCompleted}
            </span>
          )}
        </button>

        <button
          onClick={() => setFilterTab('all')}
          className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
            filterTab === 'all'
              ? 'bg-amber-400 text-black shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>{t.allTasks}</span>
        </button>
      </div>

      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'bn' ? 'টাস্ক বা বিষয় খুঁজুন...' : 'Search tasks or subjects...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#131620] border border-[#222838] focus:border-amber-400 focus:outline-none text-white text-xs placeholder-gray-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs text-gray-400">{t.sortBy}:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 rounded-xl bg-[#131620] border border-[#222838] text-white text-xs focus:border-amber-400 focus:outline-none cursor-pointer"
          >
            <option value="time">{t.sortByTime}</option>
            <option value="priority">{t.sortByPriority}</option>
            <option value="subject">{t.sortBySubject}</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="p-10 rounded-3xl bg-[#131620] border border-[#222838] text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-white">
            {language === 'bn' ? 'এই ফিল্টারে কোনো টাস্ক পাওয়া যায়নি' : 'No tasks found for this filter'}
          </h4>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            {language === 'bn'
              ? 'নতুন স্টাডি টাস্ক যোগ করুন অথবা অন্য ফিল্টারে দেখুন'
              : 'Create a new study task or switch filters'}
          </p>
          <button
            onClick={openNewTaskModal}
            className="py-2.5 px-4 rounded-xl bg-amber-400 text-black font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-400/20"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addNewTask}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredTasks.map((task) => {
            const subject = subjects.find((s) => s.id === task.subjectId);
            const subjectName = language === 'bn' && subject?.nameBn ? subject.nameBn : subject?.name || 'General';
            const isOverdue = task.scheduledDate < todayStr && !task.completed;

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  task.completed
                    ? 'bg-[#10131a]/60 border-[#1c222f] opacity-65'
                    : isOverdue
                    ? 'bg-red-500/5 border-red-500/30'
                    : 'bg-[#131620] border-[#222838] hover:border-[#2f384d]'
                }`}
              >
                {/* Complete checkbox */}
                <button
                  onClick={() => handleToggle(task.id)}
                  className="mt-0.5 text-gray-500 hover:text-amber-400 cursor-pointer shrink-0"
                  aria-label={task.completed ? t.markUndone : t.markDone}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                {/* Details */}
                <div className="flex-1 min-w-0" onClick={() => openEditTaskModal(task)}>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-md font-semibold text-white"
                      style={{
                        backgroundColor: `${subject?.color || '#3B82F6'}33`,
                        color: subject?.color || '#3B82F6',
                      }}
                    >
                      {subjectName}
                    </span>

                    {isOverdue && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-red-500/20 text-red-400 border border-red-500/30 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {t.overdueTasks}
                      </span>
                    )}

                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold ${
                        task.priority === 'high'
                          ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                          : task.priority === 'medium'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {task.priority === 'high'
                        ? t.priorityHigh
                        : task.priority === 'medium'
                        ? t.priorityMedium
                        : t.priorityLow}
                    </span>

                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {task.scheduledDate}
                    </span>

                    {task.startTime && (
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.startTime}
                      </span>
                    )}

                    <span className="text-[10px] text-gray-400">
                      {task.durationMinutes} {t.minsShort}
                    </span>
                  </div>

                  <h3
                    className={`text-sm font-bold truncate cursor-pointer ${
                      task.completed ? 'line-through text-gray-400' : 'text-white'
                    }`}
                  >
                    {task.title}
                  </h3>

                  {task.description && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  aria-label={t.deleteTask}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Task Creation & Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? t.editTask : t.addNewTask}
      >
        <form onSubmit={handleSaveTask} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.taskTitle} <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.taskTitlePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] focus:border-amber-400 focus:outline-none text-white text-xs placeholder-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.taskDescription}
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'bn' ? 'অধ্যায় বা স্পেসিফিক টপিকের বিবরণ...' : 'Notes or specific chapter topics...'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] focus:border-amber-400 focus:outline-none text-white text-xs placeholder-gray-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.selectSubject}
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs cursor-pointer"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {language === 'bn' && s.nameBn ? s.nameBn : s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.priority}
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs cursor-pointer"
              >
                <option value="high">{t.priorityHigh}</option>
                <option value="medium">{t.priorityMedium}</option>
                <option value="low">{t.priorityLow}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.scheduledDate}
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.startTime}
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.estimatedDuration}
              </label>
              <input
                type="number"
                min="5"
                max="360"
                step="5"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="reminderCheck"
              checked={hasReminder}
              onChange={(e) => setHasReminder(e.target.checked)}
              className="accent-amber-400 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="reminderCheck" className="text-xs text-gray-300 cursor-pointer">
              {t.reminder}
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              {t.saveTask}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
