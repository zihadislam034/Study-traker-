import React, { useState } from 'react';
import { Award, BookOpen, Building2, Camera, Check, Clock, GraduationCap, ShieldAlert, Sparkles, Trash2, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { AcademicBoard, AcademicDepartment, AcademicLevel, Gender } from '../types';
import { getDefaultSubjects } from '../utils/syllabusDefaults';
import { StorageService } from '../services/storage';
import { processProfileImage } from '../utils/imageUtils';

export const StudentOnboardingPage: React.FC = () => {
  const { user, updateProfile, completeOnboarding } = useAuth();
  const { language, t } = useLanguage();

  const [photoUrl, setPhotoUrl] = useState<string>(user?.profile?.photoUrl || '');
  const [department, setDepartment] = useState<AcademicDepartment>(user?.profile?.department || 'Science');
  const [level, setLevel] = useState<AcademicLevel>(user?.profile?.academicLevel || 'HSC 2nd Year');
  const [gender, setGender] = useState<Gender>(user?.profile?.gender || 'Prefer not to say');
  const [institutionName, setInstitutionName] = useState(user?.profile?.institutionName || '');
  const [board, setBoard] = useState<AcademicBoard>(user?.profile?.academicBoard || 'Dhaka');
  const [targetGpa, setTargetGpa] = useState<number>(user?.profile?.targetGpa || 5.0);
  const [dailyGoalHours, setDailyGoalHours] = useState<number>(user?.profile?.dailyGoalHours || 6);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processProfileImage(file);
      setPhotoUrl(dataUrl);
    } catch {
      setErrorMsg(language === 'bn' ? 'ছবি আপলোড করতে সমস্যা হয়েছে' : 'Could not process selected photo');
    }
    e.target.value = '';
  };

  const departments: { id: AcademicDepartment; labelBn: string; labelEn: string; icon: string }[] = [
    { id: 'Science', labelBn: 'বিজ্ঞান (Science)', labelEn: 'Science', icon: '🔬' },
    { id: 'Commerce', labelBn: 'ব্যবসায় শিক্ষা (Commerce)', labelEn: 'Commerce', icon: '📊' },
    { id: 'Humanities', labelBn: 'মানবিক (Humanities)', labelEn: 'Humanities', icon: '📚' },
  ];

  const levels: { id: AcademicLevel; labelBn: string; labelEn: string }[] = [
    { id: 'Class 9', labelBn: '৯ম শ্রেণি', labelEn: 'Class 9 (SSC)' },
    { id: 'Class 10', labelBn: '১০ম শ্রেণি', labelEn: 'Class 10 (SSC)' },
    { id: 'HSC 1st Year', labelBn: 'এইচএসসি ১ম বর্ষ', labelEn: 'HSC 1st Year' },
    { id: 'HSC 2nd Year', labelBn: 'এইচএসসি ২য় বর্ষ', labelEn: 'HSC 2nd Year' },
  ];

  const genders: { id: Gender; labelBn: string; labelEn: string }[] = [
    { id: 'Male', labelBn: 'পুরুষ', labelEn: 'Male' },
    { id: 'Female', labelBn: 'মহিলা', labelEn: 'Female' },
    { id: 'Others', labelBn: 'অন্যান্য', labelEn: 'Others' },
    { id: 'Prefer not to say', labelBn: 'বলতে অনিচ্ছুক', labelEn: 'Prefer not to say' },
  ];

  const boards: AcademicBoard[] = [
    'Dhaka',
    'Chittagong',
    'Rajshahi',
    'Comilla',
    'Barisal',
    'Sylhet',
    'Dinajpur',
    'Jessore',
    'Mymensingh',
    'Madrasah',
    'Technical',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!department) {
      setErrorMsg(t.errSelectDept);
      return;
    }
    if (!level) {
      setErrorMsg(t.errSelectLevel);
      return;
    }
    if (!institutionName.trim()) {
      setErrorMsg(t.errEnterInstitution);
      return;
    }

    if (user) {
      // Initialize tailored subjects for student's department and level
      const initialSubjects = getDefaultSubjects(user.id, department, level);
      const data = StorageService.getUserData(user.id);
      data.subjects = initialSubjects;
      data.profile = {
        ...data.profile,
        photoUrl: photoUrl || '',
        department,
        academicLevel: level,
        gender,
        institutionName: institutionName.trim(),
        academicBoard: board,
        targetGpa,
        dailyGoalHours,
        onboardingCompleted: true,
      };
      StorageService.saveUserData(user.id, data);

      updateProfile({
        photoUrl: photoUrl || '',
        department,
        academicLevel: level,
        gender,
        institutionName: institutionName.trim(),
        academicBoard: board,
        targetGpa,
        dailyGoalHours,
      });

      completeOnboarding();
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d11] text-white px-4 py-8 max-w-lg mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold text-sm">
            3
          </div>
          <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
            {language === 'bn' ? 'ধাপ ৩ এর ৫' : 'Step 3 of 5'}
          </span>
        </div>
        <span className="text-xs text-gray-400">
          {language === 'bn' ? 'শিক্ষার্থী প্রোফাইল' : 'Profile Setup'}
        </span>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-black text-white tracking-tight mb-1">
          {t.studentProfileTitle}
        </h2>
        <p className="text-xs text-gray-400">
          {t.studentProfileSubtitle}
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Photo Upload (Optional) */}
        <div className="p-4 rounded-2xl bg-[#13161f] border border-[#222838] flex items-center gap-4">
          <label className="relative w-16 h-16 rounded-2xl bg-amber-400/10 border-2 border-amber-400/40 flex items-center justify-center text-amber-400 font-black text-xl overflow-hidden cursor-pointer shrink-0">
            {photoUrl ? (
              <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span>{user?.profile?.fullName?.charAt(0) || 'S'}</span>
            )}
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-tl-lg bg-amber-400 text-black flex items-center justify-center">
              <Camera className="w-3 h-3" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoSelect}
              className="hidden"
            />
          </label>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-white mb-0.5">
              {language === 'bn' ? 'প্রোফাইল ছবি (ঐচ্ছিক)' : 'Profile Photo (Optional)'}
            </h4>
            <p className="text-[11px] text-gray-400 mb-2">
              {language === 'bn'
                ? 'আপনার গ্যালারি বা ক্যামেরা থেকে ছবি যুক্ত করুন'
                : 'Choose a photo from your device gallery or camera'}
            </p>
            <div className="flex items-center gap-2">
              <label className="px-3 py-1.5 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 text-amber-400 text-xs font-bold cursor-pointer inline-flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                <span>
                  {photoUrl
                    ? language === 'bn'
                      ? 'ছবি পরিবর্তন'
                      : 'Change Photo'
                    : language === 'bn'
                    ? 'ছবি নির্বাচন করুন'
                    : 'Select Photo'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />
              </label>
              {photoUrl && (
                <button
                  type="button"
                  onClick={() => setPhotoUrl('')}
                  className="px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{language === 'bn' ? 'মুছুন' : 'Remove'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Department Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>{t.department}</span> <span className="text-amber-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {departments.map((dept) => {
              const isSelected = department === dept.id;
              return (
                <button
                  type="button"
                  key={dept.id}
                  onClick={() => setDepartment(dept.id)}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400/10 border-amber-400 text-white shadow-md shadow-amber-400/10'
                      : 'bg-[#13161f] border-[#222838] text-gray-300 hover:border-gray-600'
                  }`}
                >
                  <span className="text-xl">{dept.icon}</span>
                  <div className="flex-1">
                    <span className="block text-xs font-bold">
                      {language === 'bn' ? dept.labelBn : dept.labelEn}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Academic Level */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>{t.academicLevel}</span> <span className="text-amber-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {levels.map((lvl) => {
              const isSelected = level === lvl.id;
              return (
                <button
                  type="button"
                  key={lvl.id}
                  onClick={() => setLevel(lvl.id)}
                  className={`py-3 px-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-black font-extrabold border-amber-400 shadow-md shadow-amber-400/20'
                      : 'bg-[#13161f] border-[#222838] text-gray-300 hover:border-gray-600 font-medium text-xs'
                  }`}
                >
                  <span className="text-xs">
                    {language === 'bn' ? lvl.labelBn : lvl.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* School / College Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>{t.institutionName}</span> <span className="text-amber-400">*</span>
          </label>
          <input
            type="text"
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
            placeholder={t.institutionPlaceholder}
            className="w-full px-4 py-3 rounded-xl bg-[#13161f] border border-[#222838] focus:border-amber-400 focus:outline-none text-white text-sm placeholder-gray-600 transition-colors"
            required
          />
        </div>

        {/* Education Board (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
              {t.academicBoard}
            </label>
            <select
              value={board}
              onChange={(e) => setBoard(e.target.value as AcademicBoard)}
              className="w-full px-3.5 py-3 rounded-xl bg-[#13161f] border border-[#222838] focus:border-amber-400 focus:outline-none text-white text-xs cursor-pointer"
            >
              {boards.map((b) => (
                <option key={b} value={b} className="bg-[#13161f] text-white">
                  {b} {language === 'bn' ? 'বোর্ড' : 'Board'}
                </option>
              ))}
            </select>
          </div>

          {/* Target GPA */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.targetGpa}</span>
            </label>
            <select
              value={targetGpa}
              onChange={(e) => setTargetGpa(parseFloat(e.target.value))}
              className="w-full px-3.5 py-3 rounded-xl bg-[#13161f] border border-[#222838] focus:border-amber-400 focus:outline-none text-white text-xs cursor-pointer"
            >
              <option value="5.00" className="bg-[#13161f]">GPA 5.00 (Golden / A+)</option>
              <option value="4.50" className="bg-[#13161f]">GPA 4.50 (A)</option>
              <option value="4.00" className="bg-[#13161f]">GPA 4.00 (A-)</option>
              <option value="3.50" className="bg-[#13161f]">GPA 3.50 (B)</option>
            </select>
          </div>
        </div>

        {/* Daily Study Goal Slider */}
        <div className="p-4 rounded-xl bg-[#13161f] border border-[#222838]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              {t.dailyGoalHours}
            </span>
            <span className="text-sm font-black text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/20">
              {dailyGoalHours} {language === 'bn' ? 'ঘণ্টা' : 'hours'}
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="12"
            step="1"
            value={dailyGoalHours}
            onChange={(e) => setDailyGoalHours(parseInt(e.target.value, 10))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>2 {language === 'bn' ? 'ঘণ্টা' : 'hrs'}</span>
            <span>6 {language === 'bn' ? 'ঘণ্টা' : 'hrs'}</span>
            <span>12 {language === 'bn' ? 'ঘণ্টা' : 'hrs'}</span>
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>{t.gender}</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {genders.map((g) => {
              const isSelected = gender === g.id;
              return (
                <button
                  type="button"
                  key={g.id}
                  onClick={() => setGender(g.id)}
                  className={`py-2 px-2.5 rounded-lg border text-center text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                      : 'bg-[#13161f] border-[#222838] text-gray-400 hover:text-white'
                  }`}
                >
                  {language === 'bn' ? g.labelBn : g.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer"
          >
            <span>{t.continueBtn}</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
