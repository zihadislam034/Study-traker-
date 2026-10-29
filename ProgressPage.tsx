import React, { useState } from 'react';
import {
  Award,
  BarChart3,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Flame,
  Lightbulb,
  Plus,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { StorageService } from '../services/storage';
import { Habit } from '../types';
import { Modal } from '../components/common/Modal';

interface ProgressPageProps {
  onDataChanged: () => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ onDataChanged }) => {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  if (!user) return null;

  const analytics = StorageService.getAnalytics(user.id);
  const habits = StorageService.getHabits(user.id);

  // Today and 7 past dates for habit tracker
  const today = new Date();
  const weekDates: { dateStr: string; dayLabel: string; isToday: boolean }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { weekday: 'narrow' });
    weekDates.push({ dateStr, dayLabel, isToday: i === 0 });
  }

  // Add Habit modal state
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [habitTitle, setHabitTitle] = useState('');
  const [habitCategory, setHabitCategory] = useState<'study' | 'routine' | 'mindset' | 'health'>('study');
  const [habitColor, setHabitColor] = useState('#F59E0B');

  const handleToggleHabit = (habitId: string, dateStr: string) => {
    StorageService.toggleHabitDate(user.id, habitId, dateStr);
    onDataChanged();
  };

  const handleDeleteHabit = (habitId: string) => {
    StorageService.deleteHabit(user.id, habitId);
    onDataChanged();
  };

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitTitle.trim()) return;

    const newHabit: Habit = {
      id: `habit_${Date.now()}`,
      userId: user.id,
      title: habitTitle.trim(),
      titleBn: habitTitle.trim(),
      category: habitCategory,
      completedDates: [today.toISOString().split('T')[0]],
      color: habitColor,
      createdAt: new Date().toISOString(),
    };

    StorageService.saveHabit(user.id, newHabit);
    setHabitTitle('');
    setIsHabitModalOpen(false);
    onDataChanged();
  };

  // Find max minutes for 7-day focus chart scaling
  const maxDayMinutes = Math.max(...analytics.past7Days.map((d) => d.minutes), 60);

  // Generate dynamic authentic study insights based on real data
  const getInsights = () => {
    const insights: string[] = [];

    if (analytics.streak >= 3) {
      insights.push(
        language === 'bn'
          ? `অসাধারণ! আপনি টানা ${analytics.streak} দিন নিয়ম মেনে পড়াশোনা করেছেন। এই ধারাবাহিকতা বোর্ড পরীক্ষায় সেরা ফলাফল আনতে সাহায্য করবে।`
          : `Impressive! You have maintained a ${analytics.streak}-day study streak. Consistency is the foundation of high grades.`
      );
    } else {
      insights.push(
        language === 'bn'
          ? 'প্রতিদিন অন্তত একটি পোমোডোরো সেশন সম্পন্ন করে আপনার পড়ার স্ট্রিক ধরে রাখুন।'
          : 'Complete at least one pomodoro session daily to maintain your study streak.'
      );
    }

    if (analytics.totalHours >= 10) {
      insights.push(
        language === 'bn'
          ? `আপনি ইতিমধ্যে মোট ${analytics.totalHours} ঘণ্টা গভীর ফোকাস সময় দিয়েছেন। পড়ার পর নিয়মিত রিভিশন দিন।`
          : `You have logged over ${analytics.totalHours} hours of deep focus study. Schedule regular revision intervals.`
      );
    }

    if (analytics.completionRate >= 70) {
      insights.push(
        language === 'bn'
          ? `আপনার টাস্ক সম্পন্ন করার হার ${analytics.completionRate}%, যা চমৎকার শৃঙ্খলা প্রদর্শন করে।`
          : `Your task completion rate is ${analytics.completionRate}%, showing high disciplined execution.`
      );
    } else {
      insights.push(
        language === 'bn'
          ? 'ছোট ছোট ৩০-৪৫ মিনিটের টাস্কে ভাগ করে সিলেবাসের পড়া শেষ করুন।'
          : 'Break complex syllabus topics into bite-sized 30-45 minute tasks.'
      );
    }

    return insights;
  };

  const colors = ['#F59E0B', '#3B82F6', '#10B981', '#EC4899', '#8B5CF6'];

  return (
    <div className="space-y-6 pb-24">
      {/* Top Title */}
      <div>
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <span>{t.analyticsTitle}</span>
        </h2>
        <p className="text-xs text-gray-400">
          {language === 'bn'
            ? 'আপনার পড়ার প্রকৃত সময়, ধারাবাহিকতা এবং দৈনিক অভ্যাসের অগ্রগতি'
            : 'Track real study hours, daily streaks and consistency habits'}
        </p>
      </div>

      {/* 4 Core Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-4 rounded-2xl bg-[#131620] border border-[#222838]">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-semibold">{t.totalFocusHours}</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-white">{analytics.totalHours}</span>
            <span className="text-xs font-bold text-gray-400">{t.hoursShort}</span>
          </div>
          <span className="text-[10px] text-gray-500">
            {analytics.totalMinutes} {t.minsShort}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#131620] border border-[#222838]">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-semibold">{t.completedSessions}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-white">
              {analytics.completedSessionsCount}
            </span>
          </div>
          <span className="text-[10px] text-gray-500">
            {language === 'bn' ? 'পোমোডোরো সেশন' : 'Pomodoro sessions'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#131620] border border-[#222838]">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-semibold">{t.studyStreak}</span>
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-amber-400">{analytics.streak}</span>
            <span className="text-xs font-bold text-gray-400">{t.daysCount}</span>
          </div>
          <span className="text-[10px] text-amber-400/80 font-semibold">
            {language === 'bn' ? 'ধারাবাহিক সক্রিয়' : 'Active streak'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#131620] border border-[#222838]">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-semibold">{t.tasksCompletionRate}</span>
            <Target className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-white">{analytics.completionRate}%</span>
          </div>
          <span className="text-[10px] text-gray-500">
            {analytics.completedTasksCount}/{analytics.totalTasksCount} {t.tasksCompletedStat}
          </span>
        </div>
      </div>

      {/* 7-Day Focus Time Interactive Bar Chart */}
      <section className="p-5 rounded-3xl bg-[#131620] border border-[#222838] shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              {t.weeklyFocusChart}
            </h3>
          </div>
          <span className="text-[11px] text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
            {analytics.past7Days.reduce((sum, d) => sum + d.minutes, 0)} {t.minsShort} {language === 'bn' ? 'মোট' : 'total'}
          </span>
        </div>

        {/* Bar chart representation */}
        <div className="flex items-end justify-between gap-2 h-44 pt-4 px-2">
          {analytics.past7Days.map((day) => {
            const heightPercent = Math.max(8, Math.round((day.minutes / maxDayMinutes) * 100));
            const isToday = day.dateStr === today.toISOString().split('T')[0];

            return (
              <div key={day.dateStr} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {day.minutes}m
                </span>

                <div className="w-full max-w-[36px] bg-[#1a1f2c] rounded-t-xl overflow-hidden flex items-end justify-center h-32 relative">
                  <div
                    className={`w-full rounded-t-xl transition-all duration-500 ${
                      isToday
                        ? 'bg-gradient-to-t from-amber-500 to-amber-300 shadow-sm shadow-amber-400/30'
                        : day.minutes > 0
                        ? 'bg-amber-400/60 hover:bg-amber-400'
                        : 'bg-transparent'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                <span
                  className={`text-[10px] font-bold ${
                    isToday ? 'text-amber-400' : 'text-gray-400'
                  }`}
                >
                  {day.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Subject-Wise Study Distribution */}
      <section className="p-5 rounded-3xl bg-[#131620] border border-[#222838] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              {t.subjectDistribution}
            </h3>
          </div>
          <span className="text-[10px] text-gray-400">
            {analytics.subjectBreakdown.length} {language === 'bn' ? 'টি বিষয়ে অধ্যয়ন' : 'subjects studied'}
          </span>
        </div>

        {analytics.subjectBreakdown.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4">
            {language === 'bn' ? 'পোমোডোরো সেশন সম্পন্ন করলে এখানে বিষয়ভিত্তিক পরিসংখ্যান দেখা যাবে।' : 'Complete focus sessions to see subject time breakdown.'}
          </p>
        ) : (
          <div className="space-y-3">
            {analytics.subjectBreakdown.map((subj, idx) => {
              const totalMins = analytics.totalMinutes || 1;
              const pct = Math.round((subj.minutes / totalMins) * 100);
              const color = colors[idx % colors.length];

              return (
                <div key={subj.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white truncate max-w-[200px]">{subj.name}</span>
                    <span className="font-bold text-gray-300">
                      {subj.minutes} {t.minsShort} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#1b202e] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Daily Habits Tracker */}
      <section className="p-5 rounded-3xl bg-[#131620] border border-[#222838] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
                {t.habitTracker}
              </h3>
            </div>
            <p className="text-[11px] text-gray-400">
              {language === 'bn' ? 'প্রতিদিন অভ্যাসের ঘরে টিক দিন' : 'Track daily consistency'}
            </p>
          </div>

          <button
            onClick={() => setIsHabitModalOpen(true)}
            className="py-1.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addHabit}</span>
          </button>
        </div>

        {habits.length === 0 ? (
          <div className="p-6 rounded-2xl bg-[#0f1218] border border-[#1f2434] text-center space-y-2">
            <p className="text-xs text-gray-400">
              {language === 'bn'
                ? 'পড়াশোনা, নামাজ বা স্বাস্থ্যকর রুটিনের অভ্যাস যোগ করুন।'
                : 'Add daily habits for study, prayers, or routine.'}
            </p>
            <button
              onClick={() => setIsHabitModalOpen(true)}
              className="py-1.5 px-3 rounded-xl bg-amber-400 text-black font-bold text-xs"
            >
              + {t.addHabit}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Header row with 7 days narrow labels */}
            <div className="flex items-center justify-between pb-1 border-b border-[#1d2230]">
              <span className="text-[11px] font-bold text-gray-400">
                {language === 'bn' ? 'অভ্যাসসমূহ' : 'Habit Name'}
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {weekDates.map((wd) => (
                  <span
                    key={wd.dateStr}
                    className={`w-6 text-center text-[10px] font-bold ${
                      wd.isToday ? 'text-amber-400' : 'text-gray-400'
                    }`}
                  >
                    {wd.dayLabel}
                  </span>
                ))}
              </div>
            </div>

            {/* Habit items */}
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="p-3 rounded-xl bg-[#0f1218] border border-[#1e2332] flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate">
                    {language === 'bn' && habit.titleBn ? habit.titleBn : habit.title}
                  </h4>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400">
                    {habit.category}
                  </span>
                </div>

                {/* 7 Day checkboxes */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {weekDates.map((wd) => {
                    const isDone = habit.completedDates.includes(wd.dateStr);

                    return (
                      <button
                        key={wd.dateStr}
                        onClick={() => handleToggleHabit(habit.id, wd.dateStr)}
                        className={`w-6 h-6 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                          isDone
                            ? 'bg-amber-400 text-black font-black'
                            : 'bg-[#1b1f2c] border border-[#262c3e] text-transparent hover:border-gray-500'
                        }`}
                        title={`${wd.dateStr}: ${isDone ? 'Completed' : 'Pending'}`}
                      >
                        {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handleDeleteHabit(habit.id)}
                    className="p-1 text-gray-500 hover:text-red-400 ml-1 cursor-pointer"
                    title="Delete habit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Useful Study Insights Box */}
      <section className="p-5 rounded-3xl bg-gradient-to-r from-[#171b28] to-[#121520] border border-[#232938] shadow-lg">
        <div className="flex items-center gap-2 mb-3 text-amber-400">
          <Lightbulb className="w-4 h-4" />
          <h3 className="text-xs font-bold uppercase tracking-wider">{t.studyInsightTitle}</h3>
        </div>

        <div className="space-y-2">
          {getInsights().map((insight, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
              <span className="text-amber-400 font-bold shrink-0">•</span>
              <p className="leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Add Habit Modal */}
      <Modal
        isOpen={isHabitModalOpen}
        onClose={() => setIsHabitModalOpen(false)}
        title={t.addHabit}
      >
        <form onSubmit={handleCreateHabit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.habitTitle} <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={habitTitle}
              onChange={(e) => setHabitTitle(e.target.value)}
              placeholder={t.habitPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.habitCategory}
            </label>
            <select
              value={habitCategory}
              onChange={(e) => setHabitCategory(e.target.value as 'study' | 'routine' | 'mindset' | 'health')}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs cursor-pointer"
            >
              <option value="study">{language === 'bn' ? 'অধ্যয়ন (Study)' : 'Study'}</option>
              <option value="routine">{language === 'bn' ? 'দৈনন্দিন রুটিন (Routine)' : 'Routine'}</option>
              <option value="mindset">{language === 'bn' ? 'মনোবল ও ইবাদত (Mindset & Faith)' : 'Mindset'}</option>
              <option value="health">{language === 'bn' ? 'স্বাস্থ্য ও ফিটনেস (Health)' : 'Health'}</option>
            </select>
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
