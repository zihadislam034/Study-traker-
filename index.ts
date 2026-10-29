export type AcademicDepartment = 'Science' | 'Humanities' | 'Commerce';

export type AcademicLevel = 'Class 9' | 'Class 10' | 'HSC 1st Year' | 'HSC 2nd Year';

export type Gender = 'Male' | 'Female' | 'Others' | 'Prefer not to say';

export type AcademicBoard =
  | 'Dhaka'
  | 'Chittagong'
  | 'Rajshahi'
  | 'Comilla'
  | 'Barisal'
  | 'Sylhet'
  | 'Dinajpur'
  | 'Jessore'
  | 'Mymensingh'
  | 'Madrasah'
  | 'Technical'
  | 'Other';

export interface StudentProfile {
  fullName: string;
  department: AcademicDepartment;
  academicLevel: AcademicLevel;
  gender: Gender;
  institutionName: string;
  academicBoard?: AcademicBoard;
  targetGpa?: number;
  dailyGoalHours: number;
  onboardingCompleted: boolean;
  avatarSeed?: string;
  photoUrl?: string;
  createdAt: string;
}

export interface UserAccount {
  id: string;
  emailOrPhone: string;
  passwordHash?: string;
  profile: StudentProfile;
}

export type Priority = 'low' | 'medium' | 'high';

export interface StudyTask {
  id: string;
  userId: string;
  title: string;
  description?: string;
  subjectId: string;
  chapterId?: string;
  scheduledDate: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  durationMinutes: number;
  priority: Priority;
  completed: boolean;
  completedAt?: string;
  hasReminder: boolean;
  createdAt: string;
}

export type TopicStatus = 'not_started' | 'reading' | 'revised' | 'completed';

export interface ChapterTopic {
  id: string;
  title: string;
  titleBn?: string;
  status: TopicStatus;
  notes?: string;
}

export interface Chapter {
  id: string;
  title: string;
  titleBn?: string;
  paper?: '1st Paper' | '2nd Paper' | 'General';
  topics: ChapterTopic[];
  isCompleted?: boolean;
}

export interface Subject {
  id: string;
  userId: string;
  name: string;
  nameBn: string;
  paper?: '1st Paper' | '2nd Paper' | 'General';
  color: string;
  icon: string;
  chapters: Chapter[];
  targetCompletionDate?: string;
}

export type FocusMode = 'deep_focus' | 'short_break' | 'long_break';

export interface FocusSession {
  id: string;
  userId: string;
  subjectId?: string;
  subjectName?: string;
  chapterTitle?: string;
  mode: FocusMode;
  durationMinutes: number;
  startedAt: string;
  endedAt: string;
  notes?: string;
}

export interface Examination {
  id: string;
  userId: string;
  title: string;
  subjectId?: string;
  subjectName?: string;
  examDate: string; // YYYY-MM-DD
  examTime?: string; // HH:mm
  targetMarks?: number;
  notes?: string;
}

export interface Habit {
  id: string;
  userId: string;
  title: string;
  titleBn?: string;
  category: 'study' | 'health' | 'mindset' | 'routine';
  completedDates: string[]; // ['2026-10-29', ...]
  color?: string;
  createdAt: string;
}

export interface UserSettings {
  language: 'bn' | 'en';
  theme: 'dark';
  focusDuration: number; // minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  soundEnabled: boolean;
  ambientSound: 'none' | 'whitenoise' | 'rain' | 'metronome';
  autoStartBreaks: boolean;
  dailyGoalHours: number;
}
