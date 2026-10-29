import React, { useState } from 'react';
import { ArrowLeft, Check, Eye, EyeOff, Flame, Lock, Mail, ShieldAlert, Sparkles, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Modal } from '../components/common/Modal';

export const AuthPage: React.FC = () => {
  const { login, signUp, quickDemoLogin, setCurrentScreen } = useAuth();
  const { language, t } = useLanguage();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const validateInput = (): boolean => {
    setErrorMsg(null);
    const cleanId = emailOrPhone.trim();
    if (!cleanId || !password) {
      setErrorMsg(t.errFillAllFields);
      return false;
    }

    // Email or 11 digit phone validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;
    if (!emailRegex.test(cleanId) && !phoneRegex.test(cleanId)) {
      setErrorMsg(t.errInvalidEmailOrPhone);
      return false;
    }

    if (password.length < 6) {
      setErrorMsg(t.errPasswordLength);
      return false;
    }

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setErrorMsg(t.errFillAllFields);
        return false;
      }
      if (password !== confirmPassword) {
        setErrorMsg(t.errPasswordMismatch);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput()) return;

    setLoading(true);
    try {
      if (mode === 'login') {
        const res = await login(emailOrPhone, password);
        if (!res.success) {
          setErrorMsg(res.error ? (t as unknown as Record<string, string>)[res.error] || res.error : t.errInvalidCredentials);
        }
      } else {
        const res = await signUp(fullName, emailOrPhone, password);
        if (!res.success) {
          setErrorMsg(res.error ? (t as unknown as Record<string, string>)[res.error] || res.error : 'Sign up error');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0d11] text-white flex flex-col justify-between px-4 py-6 max-w-md mx-auto">
      {/* Top Bar with back button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentScreen('welcome')}
          className="p-2 rounded-xl bg-[#141720] border border-[#232938] text-gray-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <span className="font-bold text-sm tracking-wide text-white">FocusForge</span>
        </div>
        <div className="w-9" /> {/* Spacer for symmetry */}
      </div>

      {/* Main Form Container */}
      <div className="my-auto py-2">
        {/* Toggle Login / Sign Up */}
        <div className="flex p-1 bg-[#13161f] border border-[#232938] rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.login}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.signUp}
          </button>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-white mb-1 tracking-tight">
            {mode === 'login' ? t.loginTitle : t.signUpTitle}
          </h2>
          <p className="text-xs text-gray-400">
            {mode === 'login' ? t.loginSubtitle : t.signUpSubtitle}
          </p>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                {t.fullName} <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#13161f] border border-[#232938] focus:border-amber-400 focus:outline-none text-white text-sm placeholder-gray-600 transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              {t.emailOrPhone} <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder={language === 'bn' ? 'student@example.com অথবা 017xxxxxxxx' : 'student@example.com or 017xxxxxxxx'}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#13161f] border border-[#232938] focus:border-amber-400 focus:outline-none text-white text-sm placeholder-gray-600 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-300">
                {t.password} <span className="text-amber-400">*</span>
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => {
                    setForgotModalOpen(true);
                    setForgotSubmitted(false);
                    setForgotEmail(emailOrPhone);
                  }}
                  className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                >
                  {t.forgotPassword}
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#13161f] border border-[#232938] focus:border-amber-400 focus:outline-none text-white text-sm placeholder-gray-600 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                {t.confirmPassword} <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#13161f] border border-[#232938] focus:border-amber-400 focus:outline-none text-white text-sm placeholder-gray-600 transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>{mode === 'login' ? t.login : t.signUp}</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#1f2432]" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-[#0b0d11] px-2 text-gray-500 font-semibold tracking-wider">
              {language === 'bn' ? 'অথবা নিরাপদ মোড' : 'or safe demo'}
            </span>
          </div>
        </div>

        {/* Safe Dev / Quick Demo Login Button */}
        <button
          type="button"
          onClick={quickDemoLogin}
          className="w-full py-2.5 px-4 rounded-xl bg-[#141722] hover:bg-[#1c2130] border border-amber-500/30 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.quickDemoLogin}</span>
        </button>
      </div>

      {/* Footer privacy & terms */}
      <p className="text-[11px] text-gray-500 text-center pt-3">
        {language === 'bn'
          ? 'নিবন্ধনের মাধ্যমে আপনি ফোকাসফোর্জ স্টুডেন্ট পলিসি ও শর্তাবলীতে সম্মত হচ্ছেন।'
          : 'By continuing, you agree to the FocusForge Student Terms & Privacy Policy.'}
      </p>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title={t.forgotPassword}
      >
        {forgotSubmitted ? (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">
              {language === 'bn' ? 'রিসেট লিঙ্ক পাঠানো হয়েছে' : 'Reset Link Sent'}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {language === 'bn'
                ? `পাসওয়ার্ড পুনরুদ্ধারের নির্দেশনা আপনার দেওয়া ঠিকানায় (${forgotEmail}) পাঠানো হয়েছে।`
                : `Instructions have been sent to ${forgotEmail}. Please check your inbox.`}
            </p>
            <button
              onClick={() => setForgotModalOpen(false)}
              className="mt-3 w-full py-2.5 rounded-xl bg-amber-400 text-black font-bold text-xs"
            >
              {language === 'bn' ? 'ঠিক আছে' : 'OK'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} className="space-y-4 py-2">
            <p className="text-xs text-gray-400">
              {language === 'bn'
                ? 'আপনার নিবন্ধিত ইমেইল বা ফোন নম্বর দিন। আমরা পাসওয়ার্ড রিসেট করার ব্যবস্থা করব।'
                : 'Enter your registered email or phone to reset your password.'}
            </p>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                {t.emailOrPhone}
              </label>
              <input
                type="text"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#13161f] border border-[#232938] text-white text-sm focus:border-amber-400 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs cursor-pointer"
            >
              {language === 'bn' ? 'রিসেট নির্দেশিকা পাঠান' : 'Send Instructions'}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};
