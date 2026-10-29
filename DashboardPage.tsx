import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Plus,
  Sparkles,
  Target,
  Timer,
  Trash2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { StorageService } from '../services/storage';
import { StudyTask, Subject } from '../types';
import { TabType } from '../components/common/BottomNav';
import { Modal } from '../components/common/Modal';

interface DashboardPageProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenSettings: () => void;
  onDataChanged: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateTab,
  onOpenSettings,
  onDataChanged,
}) => {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  if (!user) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const userData = StorageService.getUserData(user.id);
  const analytics = StorageService.getAnalytics(user.id);

  // Today's specific sessions & focus minutes
  const todaySessions = userData.sessions.filter((s) => s.startedAt.startsWith(todayStr));
  const todayFocusMinutes = todaySessions.reduce((sum, s) => sum + s.durationMinutes, 0);
  const todayFocusHours = (todayFocusMinutes / 60).toFixed(1);

  // Today's scheduled tasks
  const todayTasks = userData.tasks.filter((t) => t.scheduledDate === todayStr);
  const completedTodayTasks = todayTasks.filter((t) => t.completed).length;

  // Upcoming closest examination
  const upcomingExams = userData.examinations
    .filter((e) => new Date(e.examDate) >= new Date(todayStr))
    .sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime());
  const nextExam = upcomingExams[0];

  const calculateDaysLeft = (targetDate: string) => {
    const diff = new Date(targetDate).getTime() - new Date(todayStr).getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  // Add Task Modal state
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubjectId, setTaskSubjectId] = useState<string>(userData.subjects[0]?.id || '');
  const [taskChapterTitle, setTaskChapterTitle] = useState('');
  const [taskDuration, setTaskDuration] = useState(45);
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('high');
  const [taskTime, setTaskTime] = useState('11:00');

  const handleToggleTask = (taskId: string) => {
    StorageService.toggleTask(user.id, taskId);
    onDataChanged();
  };

  const handleDeleteTask = (taskId: string) => {
    StorageService.deleteTask(user.id, taskId);
    onDataChanged();
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask: StudyTask = {
      id: `task_${Date.now()}`,
      userId: user.id,
      title: taskTitle.trim(),
      subjectId: taskSubjectId,
      chapterId: taskChapterTitle ? undefined : undefined,
      description: taskChapterTitle ? `${taskChapterTitle}` : undefined,
      scheduledDate: todayStr,
      startTime: taskTime,
      durationMinutes: taskDuration,
      priority: taskPriority,
      completed: false,
      hasReminder: true,
      createdAt: new Date().toISOString(),
    };

    StorageService.saveTask(user.id, newTask);
    setTaskTitle('');
    setTaskChapterTitle('');
    setIsAddTaskOpen(false);
    onDataChanged();
  };

  const goalHours = user.profile?.dailyGoalHours || 6;
  const progressPercent = Math.min(100, Math.round((todayFocusMinutes / (goalHours * 60)) * 100));

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Today's Study Overview: Hero Stat Grid */}
      <section className="bg-gradient-to-b from-[#131722] to-[#0f121a] border border-[#202738] rounded-3xl p-5 shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              {t.todayStudyGoal}
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
            {progressPercent}% {language === 'bn' ? 'অর্জিত' : 'Achieved'}
          </span>
        </div>

        {/* Goal Progress Bar */}
        <div className="w-full bg-[#1b202e] h-2.5 rounded-full overflow-hidden mb-5">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500 shadow-sm shadow-amber-400/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Focused Time */}
          <div className="p-3.5 rounded-2xl bg-[#171b26] border border-[#242b3d]">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-semibold">{t.actualFocusTime}</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-white">{todayFocusHours}</span>
              <span className="text-xs font-bold text-gray-400">{t.hoursShort}</span>
            </div>
            <span className="text-[10px] text-gray-500 block truncate">
              {language === 'bn' ? `লক্ষ্য: ${goalHours} ঘণ্টা` : `Goal: ${goalHours} hrs`}
            </span>
          </div>

          {/* Tasks Completed */}
          <div className="p-3.5 rounded-2xl bg-[#171b26] border border-[#242b3d]">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-semibold">{t.tasksCompletedStat}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-white">{completedTodayTasks}</span>
              <span className="text-xs font-bold text-gray-400">/{todayTasks.length}</span>
            </div>
            <span className="text-[10px] text-gray-500 block truncate">
              {todayTasks.length > 0
                ? `${Math.round((completedTodayTasks / todayTasks.length) * 100)}% সম্পন্ন`
                : language === 'bn'
                ? 'কোনো টাস্ক নেই'
                : 'No tasks yet'}
            </span>
          </div>

          {/* Study Streak */}
          <div className="p-3.5 rounded-2xl bg-[#171b26] border border-[#242b3d]">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-semibold">{t.studyStreak}</span>
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-amber-400">{analytics.streak}</span>
              <span className="text-xs font-bold text-gray-400">{t.daysCount}</span>
            </div>
            <span className="text-[10px] text-amber-400/80 block truncate font-medium">
              {language === 'bn' ? 'অবিরাম সক্রিয়' : 'Continuous'}
            </span>
          </div>

          {/* Target GPA */}
          <div className="p-3.5 rounded-2xl bg-[#171b26] border border-[#242b3d]">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-semibold">{t.targetGpa}</span>
              <Award className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-white">
                {user.profile?.targetGpa?.toFixed(2) || '5.00'}
              </span>
            </div>
            <span className="text-[10px] text-gray-500 block truncate">
              {user.profile?.academicBoard || 'Dhaka'} {language === 'bn' ? 'বোর্ড' : 'Board'}
            </span>
          </div>
        </div>

        {/* Upcoming Examination Countdown Banner */}
        {nextExam ? (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-black font-black flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                  {t.upcomingExam}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-[190px] sm:max-w-xs">
                  {nextExam.title}
                </h4>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-lg font-black text-amber-400">
                {calculateDaysLeft(nextExam.examDate)}
              </span>
              <span className="block text-[10px] text-amber-300 font-semibold">{t.daysLeft}</span>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-3 rounded-xl bg-[#161a24] border border-[#232938] flex items-center justify-between">
            <span className="text-xs text-gray-400">{t.noExamScheduled}</span>
            <button
              onClick={() => onNavigateTab('subjects')}
              className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
            >
              + {t.addExamBtn}
            </button>
          </div>
        )}
      </section>

      {/* 2. Quick Actions */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          {t.quickActions}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => onNavigateTab('focus')}
            className="p-3.5 rounded-2xl bg-[#131620] hover:bg-[#1a1e2b] border border-amber-500/20 hover:border-amber-500/50 text-left transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Timer className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white block">{t.startFocus}</span>
            <span className="text-[10px] text-gray-400 block">
              {language === 'bn' ? 'পোমোডোরো টাইমার' : 'Pomodoro Timer'}
            </span>
          </button>

          <button
            onClick={() => setIsAddTaskOpen(true)}
            className="p-3.5 rounded-2xl bg-[#131620] hover:bg-[#1a1e2b] border border-[#222838] hover:border-amber-400/40 text-left transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#1e2330] text-amber-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white block">{t.addTask}</span>
            <span className="text-[10px] text-gray-400 block">
              {language === 'bn' ? 'আজকের রুটিন' : 'Daily Schedule'}
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('planner')}
            className="p-3.5 rounded-2xl bg-[#131620] hover:bg-[#1a1e2b] border border-[#222838] hover:border-amber-400/40 text-left transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#1e2330] text-blue-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white block">{t.viewPlanner}</span>
            <span className="text-[10px] text-gray-400 block">
              {language === 'bn' ? 'সম্পূর্ণ স্টাডি প্ল্যান' : 'Full Study Plan'}
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('subjects')}
            className="p-3.5 rounded-2xl bg-[#131620] hover:bg-[#1a1e2b] border border-[#222838] hover:border-amber-400/40 text-left transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#1e2330] text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white block">{t.manageSubjects}</span>
            <span className="text-[10px] text-gray-400 block">
              {language === 'bn' ? 'সিলেবাস ও পরীক্ষা' : 'Syllabus & Exams'}
            </span>
          </button>
        </div>
      </section>

      {/* 3. Today's Study Plan (List of Tasks) */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {t.todayStudyPlan}
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1b202e] text-gray-300 font-bold">
              {todayTasks.length}
            </span>
          </div>

          <button
            onClick={() => setIsAddTaskOpen(true)}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addTask}</span>
          </button>
        </div>

        {todayTasks.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#131620] border border-[#222838] text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white">{t.noTasksToday}</h4>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">{t.createFirstTask}</p>
            <button
              onClick={() => setIsAddTaskOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-amber-400 text-black font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-400/20"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addTask}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {todayTasks.map((task) => {
              const subject = userData.subjects.find((s) => s.id === task.subjectId);
              const subjectName = language === 'bn' && subject?.nameBn ? subject.nameBn : subject?.name || 'General';

              return (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    task.completed
                      ? 'bg-[#10131a]/60 border-[#1c222f] opacity-70'
                      : 'bg-[#131620] border-[#222838] hover:border-[#2e374d]'
                  }`}
                >
                  {/* Complete checkbox */}
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className="mt-0.5 text-gray-500 hover:text-amber-400 cursor-pointer shrink-0"
                    aria-label={task.completed ? t.markUndone : t.markDone}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  {/* Task Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-md font-semibold text-white"
                        style={{ backgroundColor: `${subject?.color || '#3B82F6'}33`, color: subject?.color || '#3B82F6' }}
                      >
                        {subjectName}
                      </span>

                      {task.priority === 'high' && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 font-bold">
                          {t.priorityHigh}
                        </span>
                      )}

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

                    <h4
                      className={`text-xs sm:text-sm font-semibold truncate ${
                        task.completed ? 'line-through text-gray-400' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </h4>

                    {task.description && (
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">
                        {task.description}
                      </p>
                    )}
                  </div>

                  {/* Delete Task */}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    aria-label={t.deleteTask}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        title={t.addNewTask}
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.taskTitle} <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder={t.taskTitlePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] focus:border-amber-400 focus:outline-none text-white text-xs placeholder-gray-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.selectSubject}
              </label>
              <select
                value={taskSubjectId}
                onChange={(e) => setTaskSubjectId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
              >
                {userData.subjects.map((s) => (
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
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
              >
                <option value="high">{t.priorityHigh}</option>
                <option value="medium">{t.priorityMedium}</option>
                <option value="low">{t.priorityLow}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.taskDescription}
            </label>
            <input
              type="text"
              value={taskChapterTitle}
              onChange={(e) => setTaskChapterTitle(e.target.value)}
              placeholder={language === 'bn' ? 'যেমন: অধ্যায় ৩, বিগত বছরের সৃজনশীল প্রশ্ন' : 'e.g., Chapter 3, Board CQ questions'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] focus:border-amber-400 focus:outline-none text-white text-xs placeholder-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.startTime}
              </label>
              <input
                type="time"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
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
                max="300"
                step="5"
                value={taskDuration}
                onChange={(e) => setTaskDuration(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
              />
            </div>
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
