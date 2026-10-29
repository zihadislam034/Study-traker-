import React, { useState } from 'react';
import {
  AlertTriangle,
  Award,
  BookOpen,
  Building2,
  Camera,
  Clock,
  Download,
  Flame,
  Globe,
  GraduationCap,
  Heart,
  Key,
  LogOut,
  Moon,
  Smartphone,
  Sparkles,
  Trash2,
  Upload,
  User,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { StorageService } from '../services/storage';
import { AcademicBoard, AcademicDepartment, AcademicLevel } from '../types';
import { Modal } from '../components/common/Modal';
import { processProfileImage } from '../utils/imageUtils';
import { AboutDeveloperSection } from '../components/settings/AboutDeveloperSection';

interface SettingsPageProps {
  onDataChanged: () => void;
  onOpenInspiration: () => void;
  onOpenInstallModal?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  onDataChanged,
  onOpenInspiration,
  onOpenInstallModal,
}) => {
  const { user, updateProfile, logout, deleteAccount } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  if (!user) return null;

  const profile = user.profile;
  const userSettings = StorageService.getSettings(user.id);

  // Profile Edit Modal State
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [fullName, setFullName] = useState(profile.fullName);
  const [photoUrl, setPhotoUrl] = useState<string>(profile.photoUrl || '');
  const [photoStatusMsg, setPhotoStatusMsg] = useState<string | null>(null);
  const [dept, setDept] = useState<AcademicDepartment>(profile.department);
  const [lvl, setLvl] = useState<AcademicLevel>(profile.academicLevel);
  const [instName, setInstName] = useState(profile.institutionName);
  const [board, setBoard] = useState<AcademicBoard>(profile.academicBoard || 'Dhaka');
  const [targetGpa, setTargetGpa] = useState<number>(profile.targetGpa || 5.0);
  const [dailyGoalHours, setDailyGoalHours] = useState<number>(profile.dailyGoalHours || 6);

  // Change Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatusMsg, setPasswordStatusMsg] = useState<string | null>(null);

  // Delete Account Confirmation Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Backup & Export status
  const [backupMsg, setBackupMsg] = useState<string | null>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const processedDataUrl = await processProfileImage(file);
      setPhotoUrl(processedDataUrl);
      updateProfile({ photoUrl: processedDataUrl });
      onDataChanged();
      setPhotoStatusMsg(
        language === 'bn' ? 'প্রোফাইল ছবি সফলভাবে যুক্ত হয়েছে!' : 'Profile photo updated!'
      );
      setTimeout(() => setPhotoStatusMsg(null), 2500);
    } catch {
      setPhotoStatusMsg(
        language === 'bn' ? 'ছবি লোড করতে সমস্যা হয়েছে' : 'Failed to process image'
      );
      setTimeout(() => setPhotoStatusMsg(null), 2500);
    }
    e.target.value = '';
  };

  const handleRemovePhoto = () => {
    setPhotoUrl('');
    updateProfile({ photoUrl: '' });
    onDataChanged();
    setPhotoStatusMsg(
      language === 'bn' ? 'প্রোফাইল ছবি সরানো হয়েছে' : 'Profile photo removed'
    );
    setTimeout(() => setPhotoStatusMsg(null), 2500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: fullName.trim(),
      photoUrl: photoUrl || '',
      department: dept,
      academicLevel: lvl,
      institutionName: instName.trim(),
      academicBoard: board,
      targetGpa,
      dailyGoalHours,
    });
    setIsEditProfileOpen(false);
    onDataChanged();
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordStatusMsg(t.errPasswordLength);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatusMsg(t.errPasswordMismatch);
      return;
    }

    const updatedAccount = {
      ...user,
      passwordHash: newPassword,
    };
    StorageService.saveAccount(updatedAccount);
    setPasswordStatusMsg(language === 'bn' ? 'পাসওয়ার্ড সফলভাবে হালনাগাদ করা হয়েছে' : 'Password updated successfully');
    setTimeout(() => {
      setIsPasswordModalOpen(false);
      setPasswordStatusMsg(null);
      setNewPassword('');
      setConfirmPassword('');
    }, 1200);
  };

  const handleExportData = () => {
    const jsonStr = StorageService.exportUserData(user.id);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `focusforge_backup_${user.id}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupMsg(language === 'bn' ? 'ডেটা ব্যাকআপ ফাইল ডাউনলোড হয়েছে' : 'Data exported successfully');
    setTimeout(() => setBackupMsg(null), 3000);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = StorageService.importUserData(user.id, content);
      if (success) {
        setBackupMsg(language === 'bn' ? 'ডেটা সফলভাবে ইমপোর্ট হয়েছে!' : 'Data imported successfully!');
        onDataChanged();
      } else {
        setBackupMsg(language === 'bn' ? 'ফাইল ফরম্যাট সঠিক নয়' : 'Invalid backup JSON file');
      }
      setTimeout(() => setBackupMsg(null), 3000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <span>{t.settingsTitle}</span>
        </h2>
        <p className="text-xs text-gray-400">
          {language === 'bn'
            ? 'আপনার প্রোফাইল, ছবি, দৈনিক লক্ষ্য ও অ্যাপ সেটিংস নিয়ন্ত্রণ করুন'
            : 'Manage student profile, photo, study preferences, and application settings'}
        </p>
      </div>

      {photoStatusMsg && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center gap-2">
          <Camera className="w-4 h-4 shrink-0" />
          <span>{photoStatusMsg}</span>
        </div>
      )}

      {/* Student Profile Card */}
      <section className="p-5 rounded-3xl bg-gradient-to-br from-[#151924] to-[#10131a] border border-[#222838] shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative group shrink-0">
              <label
                title={language === 'bn' ? 'প্রোফাইল ছবি পরিবর্তন করুন' : 'Change profile photo'}
                className="w-16 h-16 rounded-2xl bg-amber-400/10 border-2 border-amber-400/40 flex items-center justify-center text-amber-400 font-extrabold text-xl overflow-hidden cursor-pointer shadow-lg shadow-amber-500/10 block relative"
              >
                {profile.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{profile.fullName.charAt(0) || 'S'}</span>
                )}
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-5 h-5 text-amber-300" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              <label
                title={language === 'bn' ? 'ছবি আপলোড করুন' : 'Upload photo'}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-md cursor-pointer border-2 border-[#12151e] hover:bg-amber-300 transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-base font-black text-white">{profile.fullName}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-400 font-bold border border-amber-400/30">
                  {profile.department}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-1">{profile.institutionName}</p>
              <div className="flex items-center gap-2 text-[11px] text-gray-400 flex-wrap">
                <span>{profile.academicLevel}</span>
                <span>•</span>
                <span>
                  {profile.academicBoard || 'Dhaka'} {language === 'bn' ? 'বোর্ড' : 'Board'}
                </span>
                <span>•</span>
                <span className="text-amber-400 font-bold">
                  Target GPA {profile.targetGpa?.toFixed(2) || '5.00'}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <label className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                  <Camera className="w-3 h-3" />
                  <span>
                    {profile.photoUrl
                      ? language === 'bn'
                        ? 'ছবি পরিবর্তন করুন'
                        : 'Change Photo'
                      : language === 'bn'
                      ? 'প্রোফাইল ছবি যোগ করুন'
                      : 'Add Profile Photo'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                {profile.photoUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-[11px] font-semibold text-red-400 hover:text-red-300 bg-red-500/10 px-2 py-1 rounded-lg border border-red-500/20 cursor-pointer"
                  >
                    {language === 'bn' ? 'ছবি মুছুন' : 'Remove'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setPhotoUrl(profile.photoUrl || '');
              setIsEditProfileOpen(true);
            }}
            className="py-1.5 px-3 rounded-xl bg-[#1b202e] hover:bg-[#232a3d] border border-[#283248] text-amber-400 text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            {t.editProfile}
          </button>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
          {language === 'bn' ? 'অ্যাপ পছন্দ ও ভাষা' : 'App Preferences'}
        </h3>

        <div className="rounded-2xl bg-[#131620] border border-[#222838] divide-y divide-[#1e2332]">
          {/* Language Switch */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{t.languagePreference}</h4>
                <p className="text-[11px] text-gray-400">
                  {language === 'bn' ? 'বাংলা (Bengali)' : 'English'}
                </p>
              </div>
            </div>

            <div className="flex p-0.5 bg-[#0f1218] border border-[#222838] rounded-xl">
              <button
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === 'bn' ? 'bg-amber-400 text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === 'en' ? 'bg-amber-400 text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Theme Indicator */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">
                  {language === 'bn' ? 'অ্যাপ থিম' : 'Theme Mode'}
                </h4>
                <p className="text-[11px] text-gray-400">
                  {language === 'bn' ? 'প্রিমিয়াম ডার্ক মোড ও গোল্ড অ্যাকসেন্ট' : 'Premium Dark Charcoal & Gold'}
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30">
              Dark Mode
            </span>
          </div>

          {/* Islamic Inspiration Link */}
          <div
            onClick={onOpenInspiration}
            className="p-4 flex items-center justify-between hover:bg-[#181c28] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{t.viewInspirationAgain}</h4>
                <p className="text-[11px] text-gray-400 font-serif">
                  “পড়ো তোমার সৃষ্টিকর্তার নামে, যিনি সৃষ্টি করেছেন।”
                </p>
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>

          {/* Change Password */}
          <div
            onClick={() => setIsPasswordModalOpen(true)}
            className="p-4 flex items-center justify-between hover:bg-[#181c28] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{t.changePassword}</h4>
                <p className="text-[11px] text-gray-400">
                  {language === 'bn' ? 'আপনার অ্যাকাউন্টের সুরক্ষা বজায় রাখুন' : 'Update your account access password'}
                </p>
              </div>
            </div>
            <span className="text-xs text-amber-400 font-bold">→</span>
          </div>

          {/* Quick Jump to About & Support Developer */}
          <div
            onClick={() => {
              document
                .getElementById('about-developer-section')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="p-4 flex items-center justify-between hover:bg-[#181c28] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">
                  {language === 'bn' ? 'ডেভেলপার পরিচিতি ও সাপোর্ট ❤️' : 'About Developer & Support ❤️'}
                </h4>
                <p className="text-[11px] text-gray-400">
                  Zihad Islam • Creator &amp; Developer of FocusForge
                </p>
              </div>
            </div>
            <span className="text-xs text-amber-400 font-bold">↓</span>
          </div>
        </div>
      </section>

      {/* Data Backup & Export Section */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
          {t.dataBackup}
        </h3>

        {backupMsg && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            {backupMsg}
          </div>
        )}

        <div className="p-4 rounded-2xl bg-[#131620] border border-[#222838] space-y-3">
          <p className="text-xs text-gray-400 leading-relaxed">
            {language === 'bn'
              ? 'আপনার সকল পড়ার রুটিন, সিলেবাস ট্র্যাকার, ফোকাস হিস্ট্রি ও অভ্যাসের ব্যাকআপ ফাইল সংরক্ষণ করুন বা অন্য ডিভাইসে রিস্টোর করুন।'
              : 'Export your entire study schedule, syllabus records, focus history and habits to JSON or restore from file.'}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleExportData}
              className="py-2.5 px-4 rounded-xl bg-[#1b202e] hover:bg-[#252c3e] border border-[#2a3348] text-amber-400 text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.exportData}</span>
            </button>

            <label className="py-2.5 px-4 rounded-xl bg-[#1b202e] hover:bg-[#252c3e] border border-[#2a3348] text-gray-300 text-xs font-bold flex items-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>{t.importData}</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </section>

      {/* About FocusForge, Developer Profile & Support the Developer */}
      <AboutDeveloperSection />

      {/* Account Actions (Logout, Delete) */}
      <section className="space-y-3 pt-2">
        <button
          onClick={logout}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#141722] hover:bg-[#1d2232] border border-[#23293a] text-gray-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-amber-400" />
          <span>{t.logout}</span>
        </button>

        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="w-full py-3 px-4 rounded-2xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>{t.deleteAccount}</span>
        </button>
      </section>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        title={t.editProfile}
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#0f1218] border border-[#232938]">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-extrabold text-xl overflow-hidden shrink-0">
              {photoUrl ? (
                <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span>{fullName.charAt(0) || 'S'}</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-white mb-1">
                {language === 'bn' ? 'প্রোফাইল ছবি' : 'Profile Photo'}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <label className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold cursor-pointer inline-flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  <span>
                    {photoUrl
                      ? language === 'bn'
                        ? 'ছবি পরিবর্তন'
                        : 'Change Photo'
                      : language === 'bn'
                      ? 'ছবি যোগ করুন'
                      : 'Upload Photo'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                {photoUrl && (
                  <button
                    type="button"
                    onClick={() => setPhotoUrl('')}
                    className="px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold cursor-pointer"
                  >
                    {language === 'bn' ? 'মুছুন' : 'Remove'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.fullName}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.department}
              </label>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value as AcademicDepartment)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
              >
                <option value="Science">{t.deptScience}</option>
                <option value="Commerce">{t.deptCommerce}</option>
                <option value="Humanities">{t.deptHumanities}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.academicLevel}
              </label>
              <select
                value={lvl}
                onChange={(e) => setLvl(e.target.value as AcademicLevel)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
              >
                <option value="Class 9">{t.class9}</option>
                <option value="Class 10">{t.class10}</option>
                <option value="HSC 1st Year">{t.hsc1st}</option>
                <option value="HSC 2nd Year">{t.hsc2nd}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.institutionName}
            </label>
            <input
              type="text"
              value={instName}
              onChange={(e) => setInstName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.targetGpa}
              </label>
              <select
                value={targetGpa}
                onChange={(e) => setTargetGpa(parseFloat(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
              >
                <option value="5.00">GPA 5.00</option>
                <option value="4.50">GPA 4.50</option>
                <option value="4.00">GPA 4.00</option>
                <option value="3.50">GPA 3.50</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {t.dailyGoalHours}
              </label>
              <input
                type="number"
                min="1"
                max="14"
                value={dailyGoalHours}
                onChange={(e) => setDailyGoalHours(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs"
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

      {/* Change Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title={t.changePassword}
      >
        <form onSubmit={handleChangePassword} className="space-y-4">
          {passwordStatusMsg && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              {passwordStatusMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {language === 'bn' ? 'নতুন পাসওয়ার্ড' : 'New Password'}
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              {t.confirmPassword}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1218] border border-[#232938] text-white text-xs focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs cursor-pointer"
            >
              {t.save}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t.deleteAccount}
      >
        <div className="space-y-4 py-2">
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{t.confirmDeleteAccount}</p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 py-2.5 rounded-xl bg-[#1b202e] hover:bg-[#252c3f] text-gray-300 text-xs font-bold cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="button"
              onClick={deleteAccount}
              className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
            >
              {t.deleteAccount}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
