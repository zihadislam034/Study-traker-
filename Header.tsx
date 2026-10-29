import React from 'react';
import { Flame, Globe, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  onOpenSettings?: () => void;
  onOpenInstallModal?: () => void;
  streakCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, onOpenInstallModal, streakCount = 0 }) => {
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return t.greetingMorning;
    if (hour >= 12 && hour < 17) return t.greetingAfternoon;
    if (hour >= 17 && hour < 21) return t.greetingEvening;
    return t.greetingNight;
  };

  const getFormattedDate = () => {
    const now = new Date();
    if (language === 'bn') {
      const bnMonths = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
        'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
      ];
      const bnDays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
      const bnNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      const toBnNum = (n: number) => n.toString().split('').map((d) => bnNumbers[parseInt(d, 10)] || d).join('');

      return `${bnDays[now.getDay()]}, ${toBnNum(now.getDate())} ${bnMonths[now.getMonth()]}`;
    }
    return now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const firstName = user?.profile?.fullName?.split(' ')[0] || (language === 'bn' ? 'শিক্ষার্থী' : 'Student');

  return (
    <header className="sticky top-0 z-30 bg-[#0b0d11]/90 backdrop-blur-md border-b border-[#1b1f2b] px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Student Avatar / Brand & Greeting */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSettings}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center overflow-hidden cursor-pointer shrink-0"
            title={language === 'bn' ? 'প্রোফাইল ও সেটিংস' : 'Profile & Settings'}
          >
            {user?.profile?.photoUrl ? (
              <img
                src={user.profile.photoUrl}
                alt={user.profile.fullName}
                className="w-full h-full object-cover rounded-[10px]"
              />
            ) : (
              <div className="w-full h-full bg-[#0d0f15] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-amber-400 text-lg tracking-tighter">FF</span>
              </div>
            )}
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                {t.appName}
              </span>
              {user?.profile?.academicLevel && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1e2330] text-gray-300 border border-[#2b3244]">
                  {user.profile.academicLevel}
                </span>
              )}
            </div>
            <h1 className="text-base font-bold text-white flex items-center gap-1.5 leading-tight">
              <span>{getGreeting()},</span>
              <span className="text-amber-400 truncate max-w-[140px] sm:max-w-xs">{firstName}</span>
            </h1>
            <p className="text-[11px] text-gray-400">{getFormattedDate()}</p>
          </div>
        </div>

        {/* Right: Actions (Streak, Language Toggle, Settings) */}
        <div className="flex items-center gap-2">
          {/* Streak indicator */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold"
            title={`${streakCount} ${t.daysCount} ${t.studyStreak}`}
          >
            <Flame className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
            <span>{streakCount}</span>
            <span className="hidden sm:inline font-normal text-[11px] text-amber-300/80">{t.daysCount}</span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#171a23] hover:bg-[#202533] border border-[#262c3b] text-gray-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            title={language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">{language === 'bn' ? 'EN' : 'বাং'}</span>
          </button>

          {/* Settings Shortcut */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl bg-[#171a23] hover:bg-[#202533] border border-[#262c3b] text-gray-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Settings"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
