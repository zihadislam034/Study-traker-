import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Edit2,
  Filter,
  GraduationCap,
  Layers,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { StorageService } from '../services/storage';
import {
  AcademicDepartment,
  AcademicLevel,
  Chapter,
  Examination,
  Subject,
  TopicStatus,
} from '../types';
import { Modal } from '../components/common/Modal';

interface SubjectsPageProps {
  onDataChanged: () => void;
}

export const SubjectsPage: React.FC<SubjectsPageProps> = ({ onDataChanged }) => {
  const { user, updateProfile } = useAuth();
  const { language, t } = useLanguage();

  if (!user) return null;

  const userData = StorageService.getUserData(user.id);
  const subjects = userData.subjects;
  const examinations = userData.examinations;

  const [expandedSubjectId, setExpandedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'syllabus' | 'exams'>('syllabus');
  const [paperFilter, setPaperFilter] = useState<'all' | '1st Paper' | '2nd Paper' | 'General'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Department & Level Syllabus Switcher State
  const [selectedDept, setSelectedDept] = useState<AcademicDepartment>(
    userData.profile?.department || 'Science'
  );
  const [selectedLevel, setSelectedLevel] = useState<AcademicLevel>(
    userData.profile?.academicLevel || 'HSC 2nd Year'
  );
  const [presetToast, setPresetToast] = useState<string | null>(null);

  // Add/Edit Subject Modal
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [subjectNameEn, setSubjectNameEn] = useState('');
  const [subjectNameBn, setSubjectNameBn] = useState('');
  const [subjectPaper, setSubjectPaper] = useState<'1st Paper' | '2nd Paper' | 'General'>('General');
  const [subjectColor, setSubjectColor] = useState('#3B82F6');

  // Add Chapter Modal
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [selectedSubjectForChapter, setSelectedSubjectForChapter] = useState<string>('');
  const [chapterTitleEn, setChapterTitleEn] = useState('');
  const [chapterTitleBn, setChapterTitleBn] = useState('');

  // Add Topic Modal
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [targetSubjectId, setTargetSubjectId] = useState('');
  const [targetChapterId, setTargetChapterId] = useState('');
  const [topicName, setTopicName] = useState('');

  // Add/Edit Exam Modal
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Examination | null>(null);
  const [examTitle, setExamTitle] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState('10:00');
  const [examTargetMarks, setExamTargetMarks] = useState(90);
  const [examSubjectId, setExamSubjectId] = useState('');

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#14B8A6', '#F97316'];

  // Load Department Syllabus Preset
  const handleApplyDepartmentPreset = (
    dept: AcademicDepartment,
    lvl: AcademicLevel,
    mode: 'replace' | 'merge' = 'replace'
  ) => {
    setSelectedDept(dept);
    setSelectedLevel(lvl);
    StorageService.loadSyllabusPreset(user.id, dept, lvl, mode);
    updateProfile({ department: dept, academicLevel: lvl });
    const updatedSubjects = StorageService.getSubjects(user.id);
    if (updatedSubjects.length > 0) {
      setExpandedSubjectId(updatedSubjects[0].id);
    }
    const deptNameBn =
      dept === 'Science' ? 'বিজ্ঞান' : dept === 'Commerce' ? 'ব্যবসায় শিক্ষা' : 'মানবিক';
    setPresetToast(
      language === 'bn'
        ? `✓ ${deptNameBn} (${lvl}) বিভাগের সকল বিষয়, অধ্যায় ও টপিক লোড করা হয়েছে!`
        : `✓ Loaded all ${dept} (${lvl}) subjects, chapters & topics!`
    );
    setTimeout(() => setPresetToast(null), 3500);
    onDataChanged();
  };

  // Subject actions
  const openNewSubjectModal = () => {
    setEditingSubject(null);
    setSubjectNameEn('');
    setSubjectNameBn('');
    setSubjectPaper('1st Paper');
    setSubjectColor('#3B82F6');
    setIsSubjectModalOpen(true);
  };

  const openEditSubjectModal = (subj: Subject) => {
    setEditingSubject(subj);
    setSubjectNameEn(subj.name);
    setSubjectNameBn(subj.nameBn || subj.name);
    setSubjectPaper(subj.paper || 'General');
    setSubjectColor(subj.color || '#3B82F6');
    setIsSubjectModalOpen(true);
  };

  const handleSaveSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = subjectNameEn.trim() || subjectNameBn.trim();
    if (!cleanName) return;

    if (editingSubject) {
      const updated: Subject = {
        ...editingSubject,
        name: subjectNameEn.trim() || subjectNameBn.trim(),
        nameBn: subjectNameBn.trim() || subjectNameEn.trim(),
        paper: subjectPaper,
        color: subjectColor,
      };
      StorageService.saveSubject(user.id, updated);
    } else {
      const newSubject: Subject = {
        id: `subj_${Date.now()}`,
        userId: user.id,
        name: subjectNameEn.trim() || subjectNameBn.trim(),
        nameBn: subjectNameBn.trim() || subjectNameEn.trim(),
        paper: subjectPaper,
        color: subjectColor,
        icon: 'BookOpen',
        chapters: [],
      };
      StorageService.saveSubject(user.id, newSubject);
      setExpandedSubjectId(newSubject.id);
    }

    setIsSubjectModalOpen(false);
    onDataChanged();
  };

  const handleDeleteSubject = (subjId: string) => {
    StorageService.deleteSubject(user.id, subjId);
    onDataChanged();
  };

  // Chapter actions
  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCh = chapterTitleBn.trim() || chapterTitleEn.trim();
    if (!cleanCh) return;

    const subject = subjects.find((s) => s.id === selectedSubjectForChapter);
    if (!subject) return;

    const newChapter: Chapter = {
      id: `ch_${Date.now()}`,
      title: chapterTitleEn.trim() || chapterTitleBn.trim(),
      titleBn: chapterTitleBn.trim() || chapterTitleEn.trim(),
      topics: [],
    };

    subject.chapters.push(newChapter);
    StorageService.saveSubject(user.id, subject);

    setChapterTitleEn('');
    setChapterTitleBn('');
    setIsChapterModalOpen(false);
    onDataChanged();
  };

  const handleDeleteChapter = (subjId: string, chId: string) => {
    StorageService.deleteChapter(user.id, subjId, chId);
    onDataChanged();
  };

  const handleMarkAllChapterTopics = (subjId: string, chId: string, status: TopicStatus) => {
    StorageService.markAllChapterTopics(user.id, subjId, chId, status);
    onDataChanged();
  };

  // Topic actions
  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicName.trim()) return;

    const subject = subjects.find((s) => s.id === targetSubjectId);
    if (!subject) return;
    const chapter = subject.chapters.find((c) => c.id === targetChapterId);
    if (!chapter) return;

    chapter.topics.push({
      id: `top_${Date.now()}`,
      title: topicName.trim(),
      titleBn: topicName.trim(),
      status: 'not_started',
    });

    StorageService.saveSubject(user.id, subject);
    setTopicName('');
    setIsTopicModalOpen(false);
    onDataChanged();
  };

  const handleUpdateTopicStatus = (
    subjId: string,
    chId: string,
    topId: string,
    newStatus: TopicStatus
  ) => {
    StorageService.updateTopicStatus(user.id, subjId, chId, topId, newStatus);
    onDataChanged();
  };

  const handleDeleteTopic = (subjId: string, chId: string, topId: string) => {
    StorageService.deleteTopic(user.id, subjId, chId, topId);
    onDataChanged();
  };

  // Exam actions
  const openNewExamModal = () => {
    setEditingExam(null);
    setExamTitle('');
    setExamDate('');
    setExamTime('10:00');
    setExamTargetMarks(90);
    setExamSubjectId('');
    setIsExamModalOpen(true);
  };

  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle.trim() || !examDate) return;

    const selSubj = subjects.find((s) => s.id === examSubjectId);

    if (editingExam) {
      const updated: Examination = {
        ...editingExam,
        title: examTitle.trim(),
        examDate,
        examTime,
        targetMarks: examTargetMarks,
        subjectId: examSubjectId || undefined,
        subjectName: selSubj ? (language === 'bn' ? selSubj.nameBn : selSubj.name) : undefined,
      };
      StorageService.saveExamination(user.id, updated);
    } else {
      const newExam: Examination = {
        id: `exam_${Date.now()}`,
        userId: user.id,
        title: examTitle.trim(),
        examDate,
        examTime,
        targetMarks: examTargetMarks,
        subjectId: examSubjectId || undefined,
        subjectName: selSubj ? (language === 'bn' ? selSubj.nameBn : selSubj.name) : undefined,
      };
      StorageService.saveExamination(user.id, newExam);
    }

    setIsExamModalOpen(false);
    onDataChanged();
  };

  const handleDeleteExam = (examId: string) => {
    StorageService.deleteExamination(user.id, examId);
    onDataChanged();
  };

  const calculateDaysLeft = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    const diff = new Date(dateStr).getTime() - new Date(today).getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  // Calculate overall syllabus statistics
  const allTopicsList = subjects.flatMap((s) => s.chapters.flatMap((c) => c.topics));
  const totalTopicsCount = allTopicsList.length;
  const completedCount = allTopicsList.filter((t) => t.status === 'completed').length;
  const revisedCount = allTopicsList.filter((t) => t.status === 'revised').length;
  const readingCount = allTopicsList.filter((t) => t.status === 'reading').length;
  const overallProgressPct =
    totalTopicsCount > 0 ? Math.round(((completedCount + revisedCount) / totalTopicsCount) * 100) : 0;

  // Filtered subjects by paper and search query
  const filteredSubjects = subjects.filter((subj) => {
    if (paperFilter !== 'all' && subj.paper !== paperFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchSubj =
      subj.name.toLowerCase().includes(q) || (subj.nameBn && subj.nameBn.toLowerCase().includes(q));
    const matchChap = subj.chapters.some(
      (ch) =>
        ch.title.toLowerCase().includes(q) ||
        (ch.titleBn && ch.titleBn.toLowerCase().includes(q)) ||
        ch.topics.some(
          (tp) =>
            tp.title.toLowerCase().includes(q) || (tp.titleBn && tp.titleBn.toLowerCase().includes(q))
        )
    );
    return matchSubj || matchChap;
  });

  return (
    <div className="space-y-5 pb-24">
      {/* Header and top tab toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{t.subjectsTitle}</span>
          </h2>
          <p className="text-xs text-gray-400">
            {language === 'bn'
              ? 'বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা বিভাগের সকল বিষয়, পত্র, অধ্যায় ও টপিক ট্র্যাকার'
              : 'Complete Science, Humanities & Commerce syllabus, chapters and topic tracker'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-[#131620] border border-[#222838] rounded-2xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'syllabus'
                ? 'bg-amber-400 text-black shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.subjects} ({subjects.length})
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'exams'
                ? 'bg-amber-400 text-black shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.examinationsList} ({examinations.length})
          </button>
        </div>
      </div>

      {activeTab === 'syllabus' ? (
        <div className="space-y-4">
          {/* 1. Department & Academic Level Instant Curriculum Switcher */}
          <div className="p-4 rounded-3xl bg-gradient-to-b from-[#151925] to-[#10131c] border border-[#242c3d] space-y-3 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-200">
                  {language === 'bn'
                    ? 'বিভাগ ও সিলেবাস নির্বাচন করুন (সকল বিষয় ও টপিকসহ)'
                    : 'Select Department Syllabus (With All Topics)'}
                </span>
              </div>

              {/* Level Selector */}
              <select
                value={selectedLevel}
                onChange={(e) => {
                  const newLvl = e.target.value as AcademicLevel;
                  handleApplyDepartmentPreset(selectedDept, newLvl, 'replace');
                }}
                className="px-2.5 py-1 rounded-xl bg-[#0d1017] border border-[#283147] text-amber-400 text-[11px] font-bold cursor-pointer focus:outline-none"
              >
                <option value="HSC 1st Year">
                  {language === 'bn' ? 'এইচএসসি ১ম বর্ষ (HSC 1st)' : 'HSC 1st Year'}
                </option>
                <option value="HSC 2nd Year">
                  {language === 'bn' ? 'এইচএসসি ২য় বর্ষ (HSC 2nd)' : 'HSC 2nd Year'}
                </option>
                <option value="Class 9">
                  {language === 'bn' ? '৯ম শ্রেণি (Class 9 - SSC)' : 'Class 9 (SSC)'}
                </option>
                <option value="Class 10">
                  {language === 'bn' ? '১০ম শ্রেণি (Class 10 - SSC)' : 'Class 10 (SSC)'}
                </option>
              </select>
            </div>

            {/* 3 Department Buttons: Science, Humanities, Commerce */}
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  {
                    id: 'Science' as AcademicDepartment,
                    labelBn: '🔬 বিজ্ঞান',
                    subBn: 'পদার্থ, রসায়ন, গণিত, জীববিজ্ঞান + আবশ্যিক',
                    labelEn: '🔬 Science',
                    subEn: 'Phy, Chem, Math, Bio + Common',
                  },
                  {
                    id: 'Humanities' as AcademicDepartment,
                    labelBn: '📚 মানবিক',
                    subBn: 'পৌরনীতি, অর্থনীতি, ইতিহাস, যুক্তিবিদ্যা + আবশ্যিক',
                    labelEn: '📚 Humanities',
                    subEn: 'Civics, Eco, History, Logic + Common',
                  },
                  {
                    id: 'Commerce' as AcademicDepartment,
                    labelBn: '📊 ব্যবসায় শিক্ষা',
                    subBn: 'হিসাববিজ্ঞান, ফিন্যান্স, ব্যবস্থাপনা, বিপণন + আবশ্যিক',
                    labelEn: '📊 Commerce',
                    subEn: 'Accounting, Finance, Mgmt + Common',
                  },
                ] as const
              ).map((d) => {
                const isActive = selectedDept === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => handleApplyDepartmentPreset(d.id, selectedLevel, 'replace')}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-400/15 border-amber-400 text-white shadow-md shadow-amber-400/10'
                        : 'bg-[#0f1219] border-[#212738] text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-white">
                        {language === 'bn' ? d.labelBn : d.labelEn}
                      </span>
                      {isActive && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5 line-clamp-1">
                      {language === 'bn' ? d.subBn : d.subEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {presetToast && (
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center">
                {presetToast}
              </div>
            )}

            {/* Overall Syllabus Mastery Summary Bar */}
            <div className="pt-2 border-t border-[#1f2637]">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="text-gray-300 font-semibold">
                  {language === 'bn'
                    ? `সামগ্রিক সিলেবাস অগ্রগতি (${completedCount + revisedCount}/${totalTopicsCount} টপিক)`
                    : `Overall Syllabus Progress (${completedCount + revisedCount}/${totalTopicsCount} topics)`}
                </span>
                <span className="text-amber-400 font-black">{overallProgressPct}%</span>
              </div>
              <div className="w-full bg-[#0b0d13] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallProgressPct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2 flex-wrap gap-2">
                <span className="text-emerald-400 font-semibold">
                  ✓ {t.statusCompleted}: {completedCount}
                </span>
                <span className="text-amber-400 font-semibold">
                  ★ {t.statusRevised}: {revisedCount}
                </span>
                <span className="text-blue-400 font-semibold">
                  📖 {t.statusReading}: {readingCount}
                </span>
                <span>
                  ○ {t.statusNotStarted}:{' '}
                  {Math.max(0, totalTopicsCount - completedCount - revisedCount - readingCount)}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Search Bar, Paper Filter Tabs & Add Custom Subject Button */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    language === 'bn'
                      ? 'বিষয়, অধ্যায় বা টপিকের নাম লিখে খুঁজুন...'
                      : 'Search subject, chapter or topic...'
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#131620] border border-[#222838] focus:border-amber-400 focus:outline-none text-white text-xs placeholder-gray-500"
                />
              </div>

              <button
                onClick={openNewSubjectModal}
                className="py-2.5 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-400/20 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addSubject}</span>
              </button>
            </div>

            {/* Paper Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(
                [
                  { id: 'all', label: language === 'bn' ? 'সকল পত্র' : 'All Papers' },
                  { id: '1st Paper', label: t.paperFirst },
                  { id: '2nd Paper', label: t.paperSecond },
                  { id: 'General', label: t.paperGeneral },
                ] as const
              ).map((pf) => (
                <button
                  key={pf.id}
                  onClick={() => setPaperFilter(pf.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    paperFilter === pf.id
                      ? 'bg-amber-400 text-black'
                      : 'bg-[#131620] border border-[#222838] text-gray-400 hover:text-white'
                  }`}
                >
                  {pf.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Subjects Accordion List */}
          <div className="space-y-3">
            {filteredSubjects.map((subj) => {
              const isExpanded = expandedSubjectId === subj.id || searchQuery.trim().length > 0;
              const totalTopics = subj.chapters.reduce((sum, ch) => sum + ch.topics.length, 0);
              const completedTopics = subj.chapters.reduce(
                (sum, ch) =>
                  sum +
                  ch.topics.filter(
                    (top) => top.status === 'completed' || top.status === 'revised'
                  ).length,
                0
              );
              const progressPct =
                totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

              return (
                <div
                  key={subj.id}
                  className="rounded-2xl bg-[#131620] border border-[#222838] overflow-hidden transition-all shadow-md"
                >
                  {/* Subject Header */}
                  <div
                    onClick={() =>
                      setExpandedSubjectId(expandedSubjectId === subj.id ? '' : subj.id)
                    }
                    className="p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#181c28] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0 shadow-sm"
                        style={{
                          backgroundColor: `${subj.color}25`,
                          color: subj.color,
                          border: `1px solid ${subj.color}55`,
                        }}
                      >
                        <BookOpen className="w-5 h-5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <h3 className="text-sm font-black text-white truncate">
                            {language === 'bn' && subj.nameBn ? subj.nameBn : subj.name}
                          </h3>
                          {subj.paper && (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1e2332] text-amber-400 font-semibold border border-[#2b3348]">
                              {subj.paper === '1st Paper'
                                ? t.paperFirst
                                : subj.paper === '2nd Paper'
                                ? t.paperSecond
                                : t.paperGeneral}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 flex-wrap">
                          <span>
                            {subj.chapters.length} {t.chaptersCount}
                          </span>
                          <span>•</span>
                          <span>
                            {completedTopics}/{totalTopics} {t.topicsProgress} ({progressPct}%)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-14 hidden sm:block bg-[#1b1f2e] h-2 rounded-full overflow-hidden mr-1">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${progressPct}%`, backgroundColor: subj.color }}
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditSubjectModal(subj);
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer"
                        title={t.editSubject}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSubject(subj.id);
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                        title={t.deleteSubject}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="text-gray-400">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Chapters & Topics List */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-[#1e2330] space-y-3 bg-[#0f1118]">
                      {/* Add Chapter Button */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] text-gray-400 font-semibold">
                          {language === 'bn'
                            ? 'অধ্যায় ও পাঠ্যসূচির টপিকসমূহ:'
                            : 'Chapters & Syllabus Topics:'}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedSubjectForChapter(subj.id);
                            setIsChapterModalOpen(true);
                          }}
                          className="py-1.5 px-3 rounded-xl bg-[#1b202e] hover:bg-[#252c3f] border border-[#2a3348] text-amber-400 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t.addChapter}</span>
                        </button>
                      </div>

                      {subj.chapters.length === 0 ? (
                        <div className="py-4 text-center text-xs text-gray-500">
                          {language === 'bn'
                            ? 'কোনো অধ্যায় যোগ করা হয়নি। উপরে "+ নতুন অধ্যায় যোগ" বাটনে ক্লিক করুন।'
                            : 'No chapters added yet.'}
                        </div>
                      ) : (
                        subj.chapters.map((ch, idx) => {
                          const allChDone =
                            ch.topics.length > 0 &&
                            ch.topics.every((tp) => tp.status === 'completed');

                          return (
                            <div
                              key={ch.id}
                              className="p-3.5 rounded-xl bg-[#141722] border border-[#212738] space-y-2.5"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-start gap-2 min-w-0">
                                  <span className="text-[10px] font-black text-amber-400 px-1.5 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20 shrink-0 mt-0.5">
                                    #{idx + 1}
                                  </span>
                                  <h4 className="text-xs font-bold text-white leading-snug">
                                    {language === 'bn' && ch.titleBn ? ch.titleBn : ch.title}
                                  </h4>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  {ch.topics.length > 0 && (
                                    <button
                                      onClick={() =>
                                        handleMarkAllChapterTopics(
                                          subj.id,
                                          ch.id,
                                          allChDone ? 'not_started' : 'completed'
                                        )
                                      }
                                      className={`text-[10px] px-2 py-0.5 rounded-md font-bold cursor-pointer border ${
                                        allChDone
                                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                          : 'bg-[#1d2333] text-gray-300 border-[#2b3348] hover:text-amber-400'
                                      }`}
                                      title="Mark entire chapter completed"
                                    >
                                      {allChDone
                                        ? language === 'bn'
                                          ? '✓ অধ্যায় শেষ'
                                          : '✓ All Done'
                                        : language === 'bn'
                                        ? 'সব সম্পন্ন'
                                        : 'Complete All'}
                                    </button>
                                  )}

                                  <button
                                    onClick={() => {
                                      setTargetSubjectId(subj.id);
                                      setTargetChapterId(ch.id);
                                      setIsTopicModalOpen(true);
                                    }}
                                    className="text-[10px] text-amber-400 hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>{t.addTopic}</span>
                                  </button>

                                  <button
                                    onClick={() => handleDeleteChapter(subj.id, ch.id)}
                                    className="p-1 text-gray-500 hover:text-red-400 cursor-pointer"
                                    title="Delete chapter"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                              {/* Topics List with Interactive Status Switcher */}
                              {ch.topics.length === 0 ? (
                                <p className="text-[11px] text-gray-500 italic pl-6">
                                  {language === 'bn'
                                    ? 'এই অধ্যায়ে টপিক যোগ করুন'
                                    : 'Add topics for this chapter'}
                                </p>
                              ) : (
                                <div className="space-y-1.5 pl-1">
                                  {ch.topics.map((topic) => (
                                    <div
                                      key={topic.id}
                                      className="p-2.5 rounded-lg bg-[#0d0f15] border border-[#1d2230] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                                    >
                                      <span className="text-xs font-medium text-gray-200 leading-relaxed">
                                        {language === 'bn' && topic.titleBn
                                          ? topic.titleBn
                                          : topic.title}
                                      </span>

                                      {/* Status Pills + Delete Topic */}
                                      <div className="flex items-center gap-1 self-end sm:self-auto shrink-0">
                                        {(
                                          [
                                            {
                                              id: 'not_started',
                                              label: t.statusNotStarted,
                                              color: 'text-gray-300 bg-gray-800 border border-gray-600',
                                            },
                                            {
                                              id: 'reading',
                                              label: t.statusReading,
                                              color:
                                                'text-blue-300 bg-blue-500/20 border border-blue-500/40',
                                            },
                                            {
                                              id: 'revised',
                                              label: t.statusRevised,
                                              color:
                                                'text-amber-300 bg-amber-500/20 border border-amber-500/40',
                                            },
                                            {
                                              id: 'completed',
                                              label: t.statusCompleted,
                                              color:
                                                'text-emerald-300 bg-emerald-500/20 border border-emerald-500/40',
                                            },
                                          ] as const
                                        ).map((st) => {
                                          const isCurrent = topic.status === st.id;
                                          return (
                                            <button
                                              key={st.id}
                                              onClick={() =>
                                                handleUpdateTopicStatus(
                                                  subj.id,
                                                  ch.id,
                                                  topic.id,
                                                  st.id
                                                )
                                              }
                                              className={`px-2 py-0.5 rounded-md text-[9px] font-bold transition-all cursor-pointer ${
                                                isCurrent
                                                  ? st.color
                                                  : 'text-gray-500 hover:text-gray-300 bg-[#141720]'
                                              }`}
                                            >
                                              {st.label}
                                            </button>
                                          );
                                        })}

                                        <button
                                          onClick={() =>
                                            handleDeleteTopic(subj.id, ch.id, topic.id)
                                          }
                                          className="p-1 text-gray-600 hover:text-red-400 cursor-pointer ml-0.5"
                                          title="Remove topic"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Examinations & Countdown List */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {language === 'bn' ? 'আসন্ন পরীক্ষার দিন গণনা' : 'Upcoming Exam Countdowns'}
            </span>
            <button
              onClick={openNewExamModal}
              className="py-2 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-400/20"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addExamBtn}</span>
            </button>
          </div>

          {examinations.length === 0 ? (
            <div className="p-8 rounded-3xl bg-[#131620] border border-[#222838] text-center space-y-3">
              <Calendar className="w-10 h-10 text-amber-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">{t.noExamScheduled}</h4>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                {language === 'bn'
                  ? 'বোর্ড পরীক্ষা, টেস্ট বা মডেল টেস্টের তারিখ যোগ করে দিন গণনা শুরু করুন'
                  : 'Add board exams, pre-test or test exams to see countdown badges'}
              </p>
              <button
                onClick={openNewExamModal}
                className="py-2 px-4 rounded-xl bg-amber-400 text-black font-bold text-xs cursor-pointer"
              >
                + {t.addExamBtn}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {examinations.map((exam) => {
                const daysLeft = calculateDaysLeft(exam.examDate);

                return (
                  <div
                    key={exam.id}
                    className="p-4 rounded-2xl bg-[#131620] border border-[#222838] flex items-start justify-between gap-3 shadow-md relative overflow-hidden"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20 font-bold">
                          {exam.subjectName || (language === 'bn' ? 'সকল বিষয়' : 'All Subjects')}
                        </span>
                        {exam.targetMarks && (
                          <span className="text-[10px] text-gray-400">
                            {t.targetMarks}: {exam.targetMarks}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-white truncate">{exam.title}</h3>

                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                          {exam.examDate}
                        </span>
                        {exam.examTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-gray-500" />
                            {exam.examTime}
                          </span>
                        )}
                      </div>

                      {exam.notes && (
                        <p className="text-[11px] text-gray-400 italic">{exam.notes}</p>
                      )}
                    </div>

                    <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                      <div className="text-right p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <span className="text-xl font-black text-amber-400 leading-none block">
                          {daysLeft}
                        </span>
                        <span className="text-[10px] text-amber-300 font-semibold">
                          {t.daysLeft}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteExam(exam.id)}
                        className="text-gray-500 hover:text-red-400 p-1 cursor-pointer"
                        title="Delete exam"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Subject Modal */}
      <Modal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        title={editingSubject ? t.editSubject : t.addSubject}
      >
        <form onSubmit={handleSaveSubject} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.subjectNameBn} <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={subjectNameBn}
              onChange={(e) => setSubjectNameBn(e.target.value)}
              placeholder="যেমন: পরিসংখ্যান ১ম পত্র / মনোবিজ্ঞান"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.subjectNameEn}
            </label>
            <input
              type="text"
              value={subjectNameEn}
              onChange={(e) => setSubjectNameEn(e.target.value)}
              placeholder="e.g. Statistics 1st Paper"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.paperSelect}
            </label>
            <select
              value={subjectPaper}
              onChange={(e) =>
                setSubjectPaper(e.target.value as '1st Paper' | '2nd Paper' | 'General')
              }
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs cursor-pointer"
            >
              <option value="1st Paper">{t.paperFirst}</option>
              <option value="2nd Paper">{t.paperSecond}</option>
              <option value="General">{t.paperGeneral}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.colorSelect}
            </label>
            <div className="flex items-center gap-2">
              {colors.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setSubjectColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform cursor-pointer ${
                    subjectColor === c ? 'scale-125 ring-2 ring-white' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs cursor-pointer shadow-lg shadow-amber-400/20"
            >
              {t.save}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Chapter Modal */}
      <Modal
        isOpen={isChapterModalOpen}
        onClose={() => setIsChapterModalOpen(false)}
        title={t.addChapter}
      >
        <form onSubmit={handleAddChapter} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.chapterTitleBn} <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={chapterTitleBn}
              onChange={(e) => setChapterTitleBn(e.target.value)}
              placeholder="যেমন: অধ্যায় ৩: সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.chapterTitleEn}
            </label>
            <input
              type="text"
              value={chapterTitleEn}
              onChange={(e) => setChapterTitleEn(e.target.value)}
              placeholder="e.g. Ch 3: Number Systems"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs cursor-pointer shadow-lg shadow-amber-400/20"
            >
              {t.save}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Topic Modal */}
      <Modal
        isOpen={isTopicModalOpen}
        onClose={() => setIsTopicModalOpen(false)}
        title={t.addTopic}
      >
        <form onSubmit={handleAddTopic} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.topicName} <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'যেমন: সামান্তরিক সূত্র ও নদী-নৌকার সমস্যা'
                  : 'e.g. Parallelogram Law & River-Boat problems'
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs cursor-pointer shadow-lg shadow-amber-400/20"
            >
              {t.save}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Exam Modal */}
      <Modal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        title={t.addExamBtn}
      >
        <form onSubmit={handleSaveExam} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.examTitle} <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'যেমন: এইচএসসি বোর্ড পরীক্ষা ২০২৬'
                  : 'e.g. HSC Board Examination 2026'
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.examDate} <span className="text-amber-400">*</span>
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {language === 'bn' ? 'শুরুর সময়' : 'Exam Time'}
              </label>
              <input
                type="time"
                value={examTime}
                onChange={(e) => setExamTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.selectSubject}
              </label>
              <select
                value={examSubjectId}
                onChange={(e) => setExamSubjectId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
              >
                <option value="">
                  {language === 'bn' ? 'সকল বিষয় / সম্মিলিত' : 'All Subjects'}
                </option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {language === 'bn' && s.nameBn ? s.nameBn : s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.targetMarks}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={examTargetMarks}
                onChange={(e) => setExamTargetMarks(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs cursor-pointer shadow-lg shadow-amber-400/20"
            >
              {t.save}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
