import React from 'react';
import { ArrowRight, BookOpen, Compass, HeartHandshake, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const InspirationPage: React.FC = () => {
  const { setCurrentScreen } = useAuth();
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#090b0f] text-white flex flex-col justify-between px-6 py-10 max-w-md mx-auto text-center relative overflow-hidden">
      {/* Subtle background spiritual aura / gold glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
          <BookOpen className="w-4 h-4" />
        </div>
        <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
          {language === 'bn' ? 'পবিত্র নির্দেশ ও অনুপ্রেরণা' : 'Inspirational Reflection'}
        </span>
      </div>

      {/* Main Peaceful Islamic Verse Presentation */}
      <div className="my-auto py-8 space-y-6">
        {/* Arabic Calligraphy header */}
        <div className="text-amber-300 text-lg font-serif tracking-widest opacity-80">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        {/* Primary exact Bengali verse required by spec */}
        <div className="p-8 rounded-3xl bg-[#11141d]/80 border border-amber-500/20 shadow-2xl shadow-black/80 backdrop-blur-md space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 leading-relaxed font-serif">
            “পড়ো তোমার সৃষ্টিকর্তার নামে, যিনি সৃষ্টি করেছেন।”
          </h2>

          <p className="text-xs font-bold text-amber-400/90 tracking-wider">
            {t.islamicQuoteReference}
          </p>

          <div className="w-12 h-0.5 bg-amber-500/30 mx-auto my-4" />

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xs mx-auto">
            {t.islamicMessageDesc}
          </p>
        </div>

        {/* Supporting thought on discipline & sincerity */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-[#11141e] border border-[#1e2332]">
            <HeartHandshake className="w-4 h-4 text-amber-400 mb-1.5" />
            <h4 className="text-xs font-bold text-white mb-0.5">
              {language === 'bn' ? 'বিশুদ্ধ নিয়ত' : 'Pure Intention'}
            </h4>
            <p className="text-[11px] text-gray-400">
              {language === 'bn' ? 'জ্ঞান অর্জনকে ইবাদতের অংশ হিসেবে দেখা' : 'Seek knowledge with sincere purpose and diligence'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#11141e] border border-[#1e2332]">
            <Compass className="w-4 h-4 text-amber-400 mb-1.5" />
            <h4 className="text-xs font-bold text-white mb-0.5">
              {language === 'bn' ? 'কঠোর সাধনা' : 'Unshakable Effort'}
            </h4>
            <p className="text-[11px] text-gray-400">
              {language === 'bn' ? 'অলসতা পরিহার করে প্রতিটি মুহূর্ত কাজে লাগানো' : 'Overcome procrastination with focused discipline'}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="space-y-3 pb-4">
        <button
          onClick={() => setCurrentScreen('main')}
          className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer"
        >
          <span>{t.continueToDashboard}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-gray-500">
          {language === 'bn'
            ? 'আপনি পরবর্তীতে সেটিংস থেকে এই বাণী পুনরায় দেখতে পারবেন।'
            : 'You can revisit this inspirational verse at any time in Settings.'}
        </p>
      </div>
    </div>
  );
};
