import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Bell,
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  Headphones,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  Sliders,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { StorageService } from '../services/storage';
import { FocusMode, FocusSession } from '../types';
import { audioService } from '../services/audio';
import { Modal } from '../components/common/Modal';

interface FocusPageProps {
  onDataChanged: () => void;
}

export const FocusPage: React.FC<FocusPageProps> = ({ onDataChanged }) => {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  if (!user) return null;

  const userData = StorageService.getUserData(user.id);
  const userSettings = StorageService.getSettings(user.id);
  const subjects = userData.subjects;

  // Timer Configuration
  const [focusMins, setFocusMins] = useState(userSettings.focusDuration || 25);
  const [shortBreakMins, setShortBreakMins] = useState(userSettings.shortBreakDuration || 5);
  const [longBreakMins, setLongBreakMins] = useState(userSettings.longBreakDuration || 15);

  const [mode, setMode] = useState<FocusMode>('deep_focus');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [sessionRound, setSessionRound] = useState(1);
  const [ambientSound, setAmbientSound] = useState<'none' | 'whitenoise' | 'rain' | 'metronome'>(
    userSettings.ambientSound || 'none'
  );

  // Countdown state based on timestamp differences
  const getModeDurationSeconds = (m: FocusMode) => {
    if (m === 'deep_focus') return focusMins * 60;
    if (m === 'short_break') return shortBreakMins * 60;
    return longBreakMins * 60;
  };

  const [totalSeconds, setTotalSeconds] = useState(getModeDurationSeconds('deep_focus'));
  const [secondsRemaining, setSecondsRemaining] = useState(getModeDurationSeconds('deep_focus'));
  const [isActive, setIsActive] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const endTimeRef = useRef<number | null>(null);
  const sessionStartTimeRef = useRef<number | null>(null);

  // Recalculate duration when mode or minutes setting changes
  useEffect(() => {
    const sec = getModeDurationSeconds(mode);
    setTotalSeconds(sec);
    if (!isActive) {
      setSecondsRemaining(sec);
    }
  }, [mode, focusMins, shortBreakMins, longBreakMins]);

  // Ambient sound controller
  useEffect(() => {
    if (isActive && mode === 'deep_focus' && ambientSound !== 'none') {
      audioService.startAmbient(ambientSound);
    } else {
      audioService.stopAmbient();
    }
    return () => {
      audioService.stopAmbient();
    };
  }, [isActive, mode, ambientSound]);

  // Main countdown loop with Date.now() drift prevention
  useEffect(() => {
    let interval: number | null = null;

    if (isActive) {
      if (!endTimeRef.current) {
        endTimeRef.current = Date.now() + secondsRemaining * 1000;
        sessionStartTimeRef.current = Date.now();
      }

      interval = window.setInterval(() => {
        const remaining = Math.max(0, Math.ceil((endTimeRef.current! - Date.now()) / 1000));
        setSecondsRemaining(remaining);

        if (remaining <= 0) {
          handleSessionCompletion();
        }
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const handleSessionCompletion = () => {
    setIsActive(false);
    endTimeRef.current = null;
    audioService.stopAmbient();
    audioService.playCompletionChime();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FACC15', '#F59E0B', '#10B981', '#3B82F6'],
      });
    } catch {
      // silent
    }

    // If it was a deep focus session, save to user database
    if (mode === 'deep_focus') {
      const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);
      const newSession: FocusSession = {
        id: `sess_${Date.now()}`,
        userId: user.id,
        subjectId: selectedSubjectId || undefined,
        subjectName: selectedSubject?.nameBn || selectedSubject?.name || 'General Focus',
        mode: 'deep_focus',
        durationMinutes: focusMins,
        startedAt: new Date(sessionStartTimeRef.current || Date.now() - focusMins * 60000).toISOString(),
        endedAt: new Date().toISOString(),
      };

      StorageService.addSession(user.id, newSession);
      onDataChanged();

      // Advance round
      const nextRound = sessionRound + 1;
      setSessionRound(nextRound);

      // Transition to break
      if (nextRound % 4 === 0) {
        setMode('long_break');
      } else {
        setMode('short_break');
      }
    } else {
      // Finished break -> back to deep focus
      setMode('deep_focus');
    }
  };

  const handleStart = () => {
    endTimeRef.current = Date.now() + secondsRemaining * 1000;
    sessionStartTimeRef.current = Date.now();
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
    endTimeRef.current = null;
  };

  const handleReset = () => {
    setIsActive(false);
    endTimeRef.current = null;
    sessionStartTimeRef.current = null;
    audioService.stopAmbient();
    setSecondsRemaining(getModeDurationSeconds(mode));
  };

  const handleSkip = () => {
    handleReset();
    if (mode === 'deep_focus') {
      setMode(sessionRound % 4 === 0 ? 'long_break' : 'short_break');
    } else {
      setMode('deep_focus');
    }
  };

  const handleSaveDurations = (e: React.FormEvent) => {
    e.preventDefault();
    userSettings.focusDuration = focusMins;
    userSettings.shortBreakDuration = shortBreakMins;
    userSettings.longBreakDuration = longBreakMins;
    StorageService.saveSettings(user.id, userSettings);
    setIsCustomizeOpen(false);
  };

  // Format MM:SS
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  // SVG Progress calculation
  const progressRatio = totalSeconds > 0 ? (totalSeconds - secondsRemaining) / totalSeconds : 0;
  const strokeRadius = 135;
  const circumference = 2 * Math.PI * strokeRadius;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const currentSubject = subjects.find((s) => s.id === selectedSubjectId);
  const recentSessions = userData.sessions.slice(0, 5);

  return (
    <div className="space-y-6 pb-24">
      {/* Top Title & Settings */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{t.focusTimerTitle}</span>
          </h2>
          <p className="text-xs text-gray-400">
            {language === 'bn'
              ? 'গভীর মনোযোগের সাথে পড়ুন এবং নিয়মিত বিরতি নিন'
              : 'Maximize deep study retention with focused pomodoro intervals'}
          </p>
        </div>

        <button
          onClick={() => setIsCustomizeOpen(true)}
          className="p-2.5 rounded-xl bg-[#131620] border border-[#222838] text-gray-400 hover:text-white transition-colors cursor-pointer"
          title="Customize Durations"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex p-1 bg-[#131620] border border-[#222838] rounded-2xl max-w-sm mx-auto">
        <button
          onClick={() => {
            handleReset();
            setMode('deep_focus');
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            mode === 'deep_focus'
              ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {t.deepFocus} ({focusMins}m)
        </button>
        <button
          onClick={() => {
            handleReset();
            setMode('short_break');
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            mode === 'short_break'
              ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {t.shortBreak} ({shortBreakMins}m)
        </button>
        <button
          onClick={() => {
            handleReset();
            setMode('long_break');
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            mode === 'long_break'
              ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {t.longBreak} ({longBreakMins}m)
        </button>
      </div>

      {/* Subject Selector for Session */}
      {mode === 'deep_focus' && (
        <div className="max-w-xs mx-auto">
          <label className="block text-[11px] font-semibold text-gray-400 text-center mb-1.5 flex items-center justify-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.selectedSubjectForFocus}</span>
          </label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            disabled={isActive}
            className="w-full px-3.5 py-2 rounded-xl bg-[#131620] border border-[#222838] text-white text-xs font-semibold focus:border-amber-400 focus:outline-none text-center cursor-pointer disabled:opacity-60"
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {language === 'bn' && s.nameBn ? s.nameBn : s.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Large Circular Countdown Timer */}
      <div className="flex flex-col items-center justify-center py-4 relative">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Ambient Glow */}
          {isActive && (
            <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-2xl animate-pulse pointer-events-none" />
          )}

          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 320 320">
            {/* Background Track */}
            <circle
              cx="160"
              cy="160"
              r={strokeRadius}
              stroke="#1b1f2b"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Animated Progress Stroke */}
            <circle
              cx="160"
              cy="160"
              r={strokeRadius}
              stroke="url(#timerGradient)"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>

          {/* Time & Info Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <span className="text-[11px] uppercase tracking-widest font-black text-amber-400 mb-1">
              {mode === 'deep_focus' ? t.deepFocus : mode === 'short_break' ? t.shortBreak : t.longBreak}
            </span>

            <span className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight leading-none mb-2">
              {timeFormatted}
            </span>

            {/* Session round indicator */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1f2c] border border-[#262c3e] text-[11px] text-gray-300 font-semibold">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>
                {t.sessionRound} {sessionRound}
              </span>
            </div>

            {currentSubject && mode === 'deep_focus' && (
              <span className="text-[11px] text-amber-400/90 font-semibold mt-2 truncate max-w-[170px]">
                {language === 'bn' && currentSubject.nameBn ? currentSubject.nameBn : currentSubject.name}
              </span>
            )}
          </div>
        </div>

        {/* Timer Control Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleReset}
            className="p-3.5 rounded-2xl bg-[#131620] hover:bg-[#1a1f2e] border border-[#222838] text-gray-400 hover:text-white transition-colors cursor-pointer"
            title={t.reset}
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {!isActive ? (
            <button
              onClick={handleStart}
              className="py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-base shadow-xl shadow-amber-400/25 flex items-center gap-2.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>{t.start}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="py-4 px-8 rounded-2xl bg-[#1f2433] hover:bg-[#282f42] border border-amber-400/50 text-amber-400 font-extrabold text-base shadow-lg flex items-center gap-2.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Pause className="w-5 h-5 fill-amber-400" />
              <span>{t.pause}</span>
            </button>
          )}

          <button
            onClick={handleSkip}
            className="p-3.5 rounded-2xl bg-[#131620] hover:bg-[#1a1f2e] border border-[#222838] text-gray-400 hover:text-white transition-colors cursor-pointer"
            title={t.skip}
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Ambient Audio Selector */}
      <div className="p-4 rounded-2xl bg-[#131620] border border-[#222838] max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
            <Headphones className="w-4 h-4 text-amber-400" />
            {t.ambientSound}
          </span>
          <span className="text-[10px] text-gray-500">
            {language === 'bn' ? 'ওয়েব অডিও সিন্থেসাইজার' : 'Synthesized audio'}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {(
            [
              { id: 'none', label: t.soundNone, icon: VolumeX },
              { id: 'whitenoise', label: t.soundWhiteNoise, icon: Volume2 },
              { id: 'rain', label: t.soundRain, icon: Volume2 },
              { id: 'metronome', label: t.soundMetronome, icon: Clock },
            ] as const
          ).map((sound) => {
            const isSelected = ambientSound === sound.id;
            const Icon = sound.icon;
            return (
              <button
                key={sound.id}
                onClick={() => setAmbientSound(sound.id)}
                className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-[#0f1218] border-[#1f2432] text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 mx-auto mb-1" />
                <span className="text-[10px] block truncate">{sound.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Completed Focus Sessions */}
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {t.recentFocusSessions}
          </h3>
          <span className="text-[10px] text-gray-500 font-semibold">
            {userData.sessions.length} {language === 'bn' ? 'টি সেশন' : 'sessions'}
          </span>
        </div>

        {recentSessions.length === 0 ? (
          <div className="p-5 rounded-2xl bg-[#131620] border border-[#222838] text-center text-xs text-gray-400">
            {t.noSessionsYet}
          </div>
        ) : (
          <div className="space-y-2">
            {recentSessions.map((sess) => (
              <div
                key={sess.id}
                className="p-3 rounded-xl bg-[#131620] border border-[#202534] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{sess.subjectName || 'General'}</h4>
                    <span className="text-[10px] text-gray-400">
                      {new Date(sess.endedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-amber-400 text-xs">
                    +{sess.durationMinutes} {t.minsShort}
                  </span>
                  <span className="block text-[10px] text-gray-400">
                    {sess.mode === 'deep_focus' ? t.deepFocus : t.shortBreak}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Customize Durations Modal */}
      <Modal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        title={t.timerDurations}
      >
        <form onSubmit={handleSaveDurations} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.focusMins}
            </label>
            <input
              type="number"
              min="5"
              max="120"
              step="5"
              value={focusMins}
              onChange={(e) => setFocusMins(parseInt(e.target.value, 10))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.shortBreakMins}
            </label>
            <input
              type="number"
              min="1"
              max="30"
              step="1"
              value={shortBreakMins}
              onChange={(e) => setShortBreakMins(parseInt(e.target.value, 10))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.longBreakMins}
            </label>
            <input
              type="number"
              min="5"
              max="60"
              step="5"
              value={longBreakMins}
              onChange={(e) => setLongBreakMins(parseInt(e.target.value, 10))}
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
    </div>
  );
};
