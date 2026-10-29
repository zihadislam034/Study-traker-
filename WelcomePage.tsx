import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Compass, Flame, Globe, Sparkles, Target, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { MOTIVATIONAL_QUOTES } from '../utils/syllabusDefaults';

interface WelcomePageProps {
  onOpenInstallModal?: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onOpenInstallModal }) => {
  const { setCurrentScreen, quickDemoLogin } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Auto-rotate quote every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const activeQuote = MOTIVATIONAL_QUOTES[currentQuoteIndex];

  return (
    <div className="min-h-screen bg-[#0b0d11] text-white flex flex-col justify-between px-4 py-6 sm:py-8 max-w-md mx-auto relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-60 h-60 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header: Brand crest & Language switch */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/25 flex items-center justify-center">
            <div className="w-full h-full bg-[#0d0f15] rounded-[14px] flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white">FocusForge</span>
            <span className="block text-[10px] uppercase font-semibold tracking-wider text-amber-400/90">
              Student Edition
            </span>
          </div>
        </div>

        <button
          onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141720] border border-[#232938] text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
        </button>
      </div>

      {/* Main Hero & Motivation */}
      <div className="my-auto py-8 z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'বাংলাদেশের শিক্ষার্থীদের জন্য তৈরি' : 'Crafted for Bangladeshi Students'}</span>
        </div>

        {/* Primary Tagline */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
          {language === 'bn' ? (
            <>
              ইতিবাচক থাকো। <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                কঠোর পরিশ্রম করো।
              </span>
            </>
          ) : (
            <>
              Stay Positive. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Work Hard.
              </span>
            </>
          )}
        </h1>

        <p className="text-sm text-gray-400 max-w-xs mb-8">
          {language === 'bn'
            ? 'ক্লাস ৯-১০ ও এইচএসসি পরীক্ষার প্রস্তুতি, পোমোডোরো স্টাডি টাইমার এবং সিলেবাস ট্র্যাকার।'
            : 'Master your Class 9, 10 & HSC syllabi with focused study sessions, streaks, and smart planning.'}
        </p>

        {/* Rotating Motivational Quotation Box */}
        <div className="w-full bg-[#13161f] border border-[#242b3b] rounded-2xl p-5 relative shadow-xl shadow-black/40 text-left mb-6">
          <div className="flex items-center justify-between mb-3 text-xs text-amber-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              {t.quoteTitle}
            </span>
            <div className="flex items-center gap-1 text-gray-400">
              <button
                onClick={() =>
                  setCurrentQuoteIndex(
                    (prev) => (prev - 1 + MOTIVATIONAL_QUOTES.length) % MOTIVATIONAL_QUOTES.length
                  )
                }
                className="p-1 rounded hover:bg-gray-800 text-gray-300 hover:text-white cursor-pointer"
                aria-label="Previous quote"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-gray-400">
                {currentQuoteIndex + 1}/{MOTIVATIONAL_QUOTES.length}
              </span>
              <button
                onClick={() =>
                  setCurrentQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length)
                }
                className="p-1 rounded hover:bg-gray-800 text-gray-300 hover:text-white cursor-pointer"
                aria-label="Next quote"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base font-medium text-gray-200 italic mb-2 leading-relaxed">
            "{language === 'bn' ? activeQuote.quoteBn : activeQuote.quote}"
          </p>
          <p className="text-xs font-semibold text-amber-400 text-right">
            — {language === 'bn' ? activeQuote.authorBn : activeQuote.author}
          </p>
        </div>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-3 gap-2 w-full mb-2">
          <div className="bg-[#10131a] border border-[#1e2330] rounded-xl p-2.5 text-center">
            <Target className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="text-[11px] font-semibold text-gray-300 block">
              {language === 'bn' ? 'সিলেবাস' : 'Syllabus'}
            </span>
          </div>
          <div className="bg-[#10131a] border border-[#1e2330] rounded-xl p-2.5 text-center">
            <Flame className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="text-[11px] font-semibold text-gray-300 block">
              {language === 'bn' ? 'স্টাডি স্ট্রিক' : 'Streak'}
            </span>
          </div>
          <div className="bg-[#10131a] border border-[#1e2330] rounded-xl p-2.5 text-center">
            <Compass className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="text-[11px] font-semibold text-gray-300 block">
              {language === 'bn' ? 'টাইমার' : 'Timer'}
            </span>
          </div>
        </div>
      </div>

      {/* Footer & Primary Actions */}
      <div className="z-10 space-y-2.5">
        <button
          onClick={() => setCurrentScreen('auth')}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer"
        >
          <span>{t.getStarted}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Safe Dev / Quick Demo Button */}
        <button
          onClick={quickDemoLogin}
          className="w-full py-2.5 px-3 rounded-xl bg-[#141722] hover:bg-[#1c2130] border border-[#23293a] text-xs font-semibold text-gray-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.quickDemoLogin}</span>
        </button>

        <p className="text-center text-xs text-gray-500 pt-1 tracking-wide">
          {t.buildDiscipline}
        </p>
      </div>
    </div>
  );
};
