import {
  AcademicDepartment,
  AcademicLevel,
  Examination,
  FocusSession,
  Habit,
  StudentProfile,
  StudyTask,
  Subject,
  TopicStatus,
  UserAccount,
  UserSettings,
} from '../types';
import { getDefaultSubjects } from '../utils/syllabusDefaults';

const STORAGE_KEYS = {
  CURRENT_USER: 'focusforge_current_user_v1',
  ACCOUNTS: 'focusforge_accounts_v1',
  DATA_PREFIX: 'focusforge_data_',
  SETTINGS_PREFIX: 'focusforge_settings_',
};

export interface UserStoreData {
  profile: StudentProfile;
  subjects: Subject[];
  tasks: StudyTask[];
  sessions: FocusSession[];
  examinations: Examination[];
  habits: Habit[];
}

const DEFAULT_SETTINGS: UserSettings = {
  language: 'bn',
  theme: 'dark',
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  soundEnabled: true,
  ambientSound: 'none',
  autoStartBreaks: false,
  dailyGoalHours: 5,
};

export class StorageService {
  // Accounts & Auth State
  static getAccounts(): UserAccount[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveAccount(account: UserAccount): void {
    const accounts = this.getAccounts();
    const existingIndex = accounts.findIndex((a) => a.id === account.id || a.emailOrPhone === account.emailOrPhone);
    if (existingIndex >= 0) {
      accounts[existingIndex] = account;
    } else {
      accounts.push(account);
    }
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  }

  static getCurrentUser(): UserAccount | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static setCurrentUser(user: UserAccount | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  // User-isolated database store
  static getUserData(userId: string): UserStoreData {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEYS.DATA_PREFIX}${userId}`);
      if (raw) {
        const parsed: UserStoreData = JSON.parse(raw);
        // Auto-upgrade older accounts that had fewer than 8 subjects
        if (parsed.subjects && parsed.subjects.length < 8) {
          const dept = parsed.profile?.department || 'Science';
          const lvl = parsed.profile?.academicLevel || 'HSC 2nd Year';
          const fullDefaults = getDefaultSubjects(userId, dept, lvl);
          // Replace old default seed subjects while keeping any custom user subjects
          const customSubjects = parsed.subjects.filter(
            (s) => !s.id.startsWith('subj_hsc_') && !s.id.startsWith('subj_ssc_')
          );
          parsed.subjects = [...fullDefaults, ...customSubjects];
          localStorage.setItem(`${STORAGE_KEYS.DATA_PREFIX}${userId}`, JSON.stringify(parsed));
        }
        return parsed;
      }
    } catch {
      // fallback
    }

    // Default seeded data for fresh accounts
    const initialSubjects = getDefaultSubjects(userId, 'Science', 'HSC 2nd Year');
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const seededData: UserStoreData = {
      profile: {
        fullName: 'তানভীর আহমেদ',
        department: 'Science',
        academicLevel: 'HSC 2nd Year',
        gender: 'Male',
        institutionName: 'ঢাকা রেসিডেন্সিয়াল মডেল কলেজ',
        academicBoard: 'Dhaka',
        targetGpa: 5.0,
        dailyGoalHours: 6,
        onboardingCompleted: true,
        createdAt: new Date().toISOString(),
      },
      subjects: initialSubjects,
      tasks: [
        {
          id: 'task_seed_1',
          userId,
          title: 'ভেক্টর গুণন ও নদী-নৌকার ম্যাথ প্র্যাকটিস',
          description: 'গাণিতিক উদাহরণ ৪, ৫ এবং বিগত বোর্ড প্রশ্ন সমাধান',
          subjectId: initialSubjects[0]?.id || 'subj_1',
          scheduledDate: today,
          startTime: '10:00',
          durationMinutes: 45,
          priority: 'high',
          completed: true,
          completedAt: new Date(Date.now() - 3600000).toISOString(),
          hasReminder: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'task_seed_2',
          userId,
          title: 'গুণগত রসায়ন: বোর মডেল ও কোয়ান্টাম সংখ্যা রিভিশন',
          description: 'প্রধান ও সহকারী কোয়ান্টাম সংখ্যার মান নির্ধারণ',
          subjectId: initialSubjects[1]?.id || 'subj_2',
          scheduledDate: today,
          startTime: '14:30',
          durationMinutes: 50,
          priority: 'high',
          completed: false,
          hasReminder: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'task_seed_3',
          userId,
          title: 'ম্যাট্রিক্সের গুণন ও বিপরীত ম্যাট্রিক্স নির্ণয়',
          description: 'অধ্যায় ১.১ এর ৩টি বোর্ড সৃজনশীল সমাধান',
          subjectId: initialSubjects[2]?.id || 'subj_3',
          scheduledDate: today,
          startTime: '18:00',
          durationMinutes: 60,
          priority: 'medium',
          completed: false,
          hasReminder: false,
          createdAt: new Date().toISOString(),
        },
      ],
      sessions: [
        {
          id: 'sess_seed_1',
          userId,
          subjectId: initialSubjects[0]?.id,
          subjectName: 'পদার্থবিজ্ঞান ১ম পত্র',
          chapterTitle: 'ভেক্টর',
          mode: 'deep_focus',
          durationMinutes: 25,
          startedAt: new Date(Date.now() - 7200000).toISOString(),
          endedAt: new Date(Date.now() - 5700000).toISOString(),
        },
        {
          id: 'sess_seed_2',
          userId,
          subjectId: initialSubjects[0]?.id,
          subjectName: 'পদার্থবিজ্ঞান ১ম পত্র',
          chapterTitle: 'ভেক্টর',
          mode: 'deep_focus',
          durationMinutes: 25,
          startedAt: new Date(Date.now() - 5400000).toISOString(),
          endedAt: new Date(Date.now() - 3900000).toISOString(),
        },
        {
          id: 'sess_seed_yesterday',
          userId,
          subjectId: initialSubjects[1]?.id,
          subjectName: 'রসায়ন ১ম পত্র',
          chapterTitle: 'গুণগত রসায়ন',
          mode: 'deep_focus',
          durationMinutes: 50,
          startedAt: `${yesterday}T15:00:00Z`,
          endedAt: `${yesterday}T15:50:00Z`,
        },
      ],
      examinations: [
        {
          id: 'exam_seed_1',
          userId,
          title: 'এইচএসসি প্রাক-নির্বাচনী পরীক্ষা (Pre-Test Exam)',
          subjectName: 'সকল বিষয়',
          examDate: new Date(Date.now() + 32 * 86400000).toISOString().split('T')[0],
          examTime: '10:00',
          targetMarks: 95,
          notes: 'সিলেবাস ৮০% শেষ করতে হবে।',
        },
        {
          id: 'exam_seed_2',
          userId,
          title: 'পদার্থবিজ্ঞান মডেল টেস্ট ১',
          subjectId: initialSubjects[0]?.id,
          subjectName: 'পদার্থবিজ্ঞান ১ম পত্র',
          examDate: new Date(Date.now() + 12 * 86400000).toISOString().split('T')[0],
          examTime: '09:00',
          targetMarks: 70,
        },
      ],
      habits: [
        {
          id: 'habit_1',
          userId,
          title: 'ভোর ৬ টায় ঘুম থেকে ওঠা',
          titleBn: 'ভোর ৬ টায় ঘুম থেকে ওঠা',
          category: 'routine',
          completedDates: [yesterday, today],
          color: '#3B82F6',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'habit_2',
          userId,
          title: 'প্রতিদিন ৫০টি MCQ প্র্যাকটিস',
          titleBn: 'প্রতিদিন ৫০টি MCQ প্র্যাকটিস',
          category: 'study',
          completedDates: [today],
          color: '#F59E0B',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'habit_3',
          userId,
          title: 'নামাজ ও আত্মনিয়ন্ত্রণ বজায় রাখা',
          titleBn: 'নামাজ ও আত্মনিয়ন্ত্রণ বজায় রাখা',
          category: 'mindset',
          completedDates: [yesterday, today],
          color: '#10B981',
          createdAt: new Date().toISOString(),
        },
      ],
    };

    this.saveUserData(userId, seededData);
    return seededData;
  }

  static saveUserData(userId: string, data: UserStoreData): void {
    try {
      localStorage.setItem(`${STORAGE_KEYS.DATA_PREFIX}${userId}`, JSON.stringify(data));
      window.dispatchEvent(new Event('focusforge_storage_updated'));
    } catch (e) {
      console.error('Failed to save user data', e);
    }
  }

  // Tasks API
  static getTasks(userId: string): StudyTask[] {
    return this.getUserData(userId).tasks;
  }

  static saveTask(userId: string, task: StudyTask): void {
    const data = this.getUserData(userId);
    const idx = data.tasks.findIndex((t) => t.id === task.id);
    if (idx >= 0) {
      data.tasks[idx] = task;
    } else {
      data.tasks.unshift(task);
    }
    this.saveUserData(userId, data);
  }

  static toggleTask(userId: string, taskId: string): boolean {
    const data = this.getUserData(userId);
    const task = data.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date().toISOString() : undefined;
      this.saveUserData(userId, data);
      return task.completed;
    }
    return false;
  }

  static deleteTask(userId: string, taskId: string): void {
    const data = this.getUserData(userId);
    data.tasks = data.tasks.filter((t) => t.id !== taskId);
    this.saveUserData(userId, data);
  }

  // Subjects & Chapters API
  static getSubjects(userId: string): Subject[] {
    return this.getUserData(userId).subjects;
  }

  static saveSubject(userId: string, subject: Subject): void {
    const data = this.getUserData(userId);
    const idx = data.subjects.findIndex((s) => s.id === subject.id);
    if (idx >= 0) {
      data.subjects[idx] = subject;
    } else {
      data.subjects.push(subject);
    }
    this.saveUserData(userId, data);
  }

  static deleteSubject(userId: string, subjectId: string): void {
    const data = this.getUserData(userId);
    data.subjects = data.subjects.filter((s) => s.id !== subjectId);
    this.saveUserData(userId, data);
  }

  static updateTopicStatus(
    userId: string,
    subjectId: string,
    chapterId: string,
    topicId: string,
    status: TopicStatus
  ): void {
    const data = this.getUserData(userId);
    const subject = data.subjects.find((s) => s.id === subjectId);
    if (!subject) return;
    const chapter = subject.chapters.find((c) => c.id === chapterId);
    if (!chapter) return;
    const topic = chapter.topics.find((t) => t.id === topicId);
    if (!topic) return;

    topic.status = status;
    // Check if entire chapter is completed
    const allCompleted = chapter.topics.length > 0 && chapter.topics.every((t) => t.status === 'completed');
    chapter.isCompleted = allCompleted;

    this.saveUserData(userId, data);
  }

  static markAllChapterTopics(
    userId: string,
    subjectId: string,
    chapterId: string,
    status: TopicStatus
  ): void {
    const data = this.getUserData(userId);
    const subject = data.subjects.find((s) => s.id === subjectId);
    if (!subject) return;
    const chapter = subject.chapters.find((c) => c.id === chapterId);
    if (!chapter) return;

    chapter.topics.forEach((t) => {
      t.status = status;
    });
    chapter.isCompleted = status === 'completed' && chapter.topics.length > 0;
    this.saveUserData(userId, data);
  }

  static deleteChapter(userId: string, subjectId: string, chapterId: string): void {
    const data = this.getUserData(userId);
    const subject = data.subjects.find((s) => s.id === subjectId);
    if (!subject) return;
    subject.chapters = subject.chapters.filter((c) => c.id !== chapterId);
    this.saveUserData(userId, data);
  }

  static deleteTopic(userId: string, subjectId: string, chapterId: string, topicId: string): void {
    const data = this.getUserData(userId);
    const subject = data.subjects.find((s) => s.id === subjectId);
    if (!subject) return;
    const chapter = subject.chapters.find((c) => c.id === chapterId);
    if (!chapter) return;
    chapter.topics = chapter.topics.filter((t) => t.id !== topicId);
    this.saveUserData(userId, data);
  }

  static loadSyllabusPreset(
    userId: string,
    department: AcademicDepartment,
    level: AcademicLevel,
    mode: 'replace' | 'merge' = 'replace'
  ): void {
    const data = this.getUserData(userId);
    const presetSubjects = getDefaultSubjects(userId, department, level);

    if (mode === 'replace') {
      data.subjects = presetSubjects;
    } else {
      const existingNames = new Set(data.subjects.map((s) => s.name.toLowerCase()));
      presetSubjects.forEach((ps) => {
        if (!existingNames.has(ps.name.toLowerCase())) {
          data.subjects.push(ps);
        }
      });
    }

    data.profile.department = department;
    data.profile.academicLevel = level;
    this.saveUserData(userId, data);
  }

  // Sessions API
  static getSessions(userId: string): FocusSession[] {
    return this.getUserData(userId).sessions;
  }

  static addSession(userId: string, session: FocusSession): void {
    const data = this.getUserData(userId);
    data.sessions.unshift(session);
    this.saveUserData(userId, data);
  }

  // Examinations API
  static getExaminations(userId: string): Examination[] {
    return this.getUserData(userId).examinations;
  }

  static saveExamination(userId: string, exam: Examination): void {
    const data = this.getUserData(userId);
    const idx = data.examinations.findIndex((e) => e.id === exam.id);
    if (idx >= 0) {
      data.examinations[idx] = exam;
    } else {
      data.examinations.push(exam);
    }
    // Sort by examDate ascending
    data.examinations.sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime());
    this.saveUserData(userId, data);
  }

  static deleteExamination(userId: string, examId: string): void {
    const data = this.getUserData(userId);
    data.examinations = data.examinations.filter((e) => e.id !== examId);
    this.saveUserData(userId, data);
  }

  // Habits API
  static getHabits(userId: string): Habit[] {
    return this.getUserData(userId).habits;
  }

  static saveHabit(userId: string, habit: Habit): void {
    const data = this.getUserData(userId);
    const idx = data.habits.findIndex((h) => h.id === habit.id);
    if (idx >= 0) {
      data.habits[idx] = habit;
    } else {
      data.habits.push(habit);
    }
    this.saveUserData(userId, data);
  }

  static toggleHabitDate(userId: string, habitId: string, dateStr: string): void {
    const data = this.getUserData(userId);
    const habit = data.habits.find((h) => h.id === habitId);
    if (!habit) return;

    if (habit.completedDates.includes(dateStr)) {
      habit.completedDates = habit.completedDates.filter((d) => d !== dateStr);
    } else {
      habit.completedDates.push(dateStr);
    }
    this.saveUserData(userId, data);
  }

  static deleteHabit(userId: string, habitId: string): void {
    const data = this.getUserData(userId);
    data.habits = data.habits.filter((h) => h.id !== habitId);
    this.saveUserData(userId, data);
  }

  // Settings API
  static getSettings(userId: string): UserSettings {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEYS.SETTINGS_PREFIX}${userId}`);
      if (raw) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  }

  static saveSettings(userId: string, settings: UserSettings): void {
    try {
      localStorage.setItem(`${STORAGE_KEYS.SETTINGS_PREFIX}${userId}`, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }

  // Streak & Statistics Calculator (Actual Stored Data Only)
  static getAnalytics(userId: string) {
    const data = this.getUserData(userId);
    const sessions = data.sessions;
    const tasks = data.tasks;

    const totalMinutes = sessions.reduce((acc, s) => acc + s.durationMinutes, 0);
    const completedTasksCount = tasks.filter((t) => t.completed).length;

    // Calculate actual 7-day breakdown
    const today = new Date();
    const past7Days: { dateStr: string; label: string; minutes: number }[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

      const dayMins = sessions
        .filter((s) => s.startedAt.startsWith(dateStr))
        .reduce((sum, s) => sum + s.durationMinutes, 0);

      past7Days.push({
        dateStr,
        label: dayName,
        minutes: dayMins,
      });
    }

    // Subject breakdown
    const subjectMap: Record<string, number> = {};
    sessions.forEach((s) => {
      const name = s.subjectName || 'General';
      subjectMap[name] = (subjectMap[name] || 0) + s.durationMinutes;
    });

    // Calculate streak
    let streak = 0;
    const checkDate = new Date();
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const hasSession = sessions.some((s) => s.startedAt.startsWith(dateStr));
      const hasCompletedTask = tasks.some((t) => t.completed && t.completedAt?.startsWith(dateStr));

      if (hasSession || hasCompletedTask) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        // If today has no activity yet, check yesterday before breaking
        if (streak === 0) {
          checkDate.setDate(checkDate.getDate() - 1);
          const yestDateStr = checkDate.toISOString().split('T')[0];
          const hasYest = sessions.some((s) => s.startedAt.startsWith(yestDateStr));
          if (hasYest) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
            continue;
          }
        }
        break;
      }
    }

    return {
      totalMinutes,
      totalHours: Number((totalMinutes / 60).toFixed(1)),
      completedSessionsCount: sessions.length,
      completedTasksCount,
      totalTasksCount: tasks.length,
      completionRate: tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0,
      past7Days,
      subjectBreakdown: Object.entries(subjectMap).map(([name, mins]) => ({
        name,
        minutes: mins,
      })),
      streak,
    };
  }

  // Backup & Restore
  static exportUserData(userId: string): string {
    const data = this.getUserData(userId);
    const settings = this.getSettings(userId);
    return JSON.stringify({ version: '1.0', exportedAt: new Date().toISOString(), data, settings }, null, 2);
  }

  static importUserData(userId: string, jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.data && parsed.data.subjects) {
        this.saveUserData(userId, parsed.data);
        if (parsed.settings) {
          this.saveSettings(userId, parsed.settings);
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  static deleteUserAccount(userId: string): void {
    localStorage.removeItem(`${STORAGE_KEYS.DATA_PREFIX}${userId}`);
    localStorage.removeItem(`${STORAGE_KEYS.SETTINGS_PREFIX}${userId}`);
    const accounts = this.getAccounts().filter((a) => a.id !== userId);
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
    this.setCurrentUser(null);
  }
}
