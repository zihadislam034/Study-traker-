import React, { useState } from 'react';
import {
  ArrowDownToLine,
  Check,
  CheckCircle2,
  Copy,
  Download,
  FolderArchive,
  Laptop,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { Modal } from './Modal';
import { useLanguage } from '../../context/LanguageContext';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeTab, setActiveTab] = useState<'bubblewrap' | 'android'>('bubblewrap');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    }
  };

  const handleDownloadZip = async () => {
    setDownloading(true);
    setDownloadSuccess(false);
    try {
      const response = await fetch('/FocusForge-Android-Project.zip');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'FocusForge-Android-Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setDownloadSuccess(true);
    } catch {
      // Fallback to direct anchor navigation
      const a = document.createElement('a');
      a.href = '/FocusForge-Android-Project.zip';
      a.download = 'FocusForge-Android-Project.zip';
      a.click();
    } finally {
      setDownloading(false);
    }
  };

  const copyCapacitorCmd = () => {
    const script = `cd android && ./gradlew assembleDebug`;
    navigator.clipboard.writeText(script);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={language === 'bn' ? 'অ্যান্ড্রয়েড প্রজেক্ট ও APK ফাইল ডাউনলোড' : 'Android Project & APK Download'}
    >
      <div className="space-y-4">
        {/* Top Toggle */}
        <div className="flex p-1 bg-[#0f1218] border border-[#222838] rounded-xl">
          <button
            onClick={() => setActiveTab('bubblewrap')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'bubblewrap' ? 'bg-amber-400 text-black shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FolderArchive className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? '২. ফাইল ডাউনলোড (.ZIP)' : '2. File Download (.ZIP)'}</span>
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'android' ? 'bg-amber-400 text-black shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? '১. ফোনে সরাসরি ইনস্টল' : '1. Direct Phone Install'}</span>
          </button>
        </div>

        {activeTab === 'bubblewrap' ? (
          /* Ready-to-Build Capacitor Android Project Download & Cloud APK Build */
          <div className="space-y-3.5 text-xs text-gray-300">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  {language === 'bn'
                    ? 'FocusForge Android Project (.ZIP) ডাউনলোডের জন্য প্রস্তুত!'
                    : 'FocusForge Android Project (.ZIP) Ready for Download!'}
                </span>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                {language === 'bn'
                  ? 'নিচের বাটনে ক্লিক করলে সর্বশেষ আপডেটসহ (সব বিভাগের সাবজেক্ট, প্রোফাইল ফটো, ডেভেলপার পরিচিতি ও সাপোর্ট সেকশন) সম্পূর্ণ বিল্ড ও সিঙ্ক করা `android/` ফোল্ডার সহ পুরো প্রজেক্টের `.zip` ফাইল সরাসরি ডাউনলোড হবে।'
                  : 'Click the button below to directly download the complete synced Android project (.zip) with all latest features to your device.'}
              </p>

              <button
                type="button"
                onClick={handleDownloadZip}
                disabled={downloading}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/25 cursor-pointer transition-transform active:scale-95 disabled:opacity-60"
              >
                <Download className="w-4 h-4" />
                <span>
                  {downloading
                    ? language === 'bn'
                      ? 'ডাউনলোড হচ্ছে...'
                      : 'Downloading...'
                    : language === 'bn'
                    ? 'FocusForge-Android-Project.zip ডাউনলোড করুন'
                    : 'Download FocusForge-Android-Project.zip'}
                </span>
              </button>

              {downloadSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold text-center">
                  {language === 'bn'
                    ? '✓ ডাউনলোড শুরু হয়েছে! আপনার ব্রাউজারের Downloads ফোল্ডার চেক করুন।'
                    : '✓ Download started! Check your browser Downloads folder.'}
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0d0f15] border border-[#1e2330] space-y-2">
              <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {language === 'bn'
                    ? 'ডাউনলোডের পর যেভাবে .APK ফাইল বের করবেন:'
                    : 'How to generate the .APK after downloading:'}
                </span>
              </h5>
              <ul className="space-y-1.5 text-[11px] text-gray-300 list-disc pl-4">
                <li>
                  {language === 'bn'
                    ? 'পদ্ধতি ক (Android Studio): জিপ ফাইলটি Extract করে Android Studio দিয়ে `android` ফোল্ডারটি ওপেন করুন এবং মেনু থেকে Build > Build Bundle(s) / APK(s) > Build APK(s) চাপুন।'
                    : 'Option A (Android Studio): Extract the ZIP, open the `android` folder in Android Studio, and click Build > Build Bundle(s) / APK(s) > Build APK(s).'}
                </li>
                <li>
                  {language === 'bn'
                    ? 'পদ্ধতি খ (GitHub Actions - কোনো সফটওয়্যার ছাড়াই): জিপ ফাইলের কোডগুলো আপনার GitHub রিপোজিটরিতে আপলোড করুন। সেখানে থাকা Actions ট্যাব থেকে অটোমেটিক `FocusForge-Android-APK` তৈরি হয়ে যাবে!'
                    : 'Option B (GitHub Actions - No software needed): Upload the extracted files to a GitHub repository. GitHub Actions will automatically build `FocusForge-Android-APK` for you!'}
                </li>
              </ul>

              <div className="relative mt-2">
                <pre className="p-3 rounded-xl bg-black/80 text-[11px] text-amber-300 font-mono overflow-x-auto">
{`cd android && ./gradlew assembleDebug
# APK Path: android/app/build/outputs/apk/debug/app-debug.apk`}
                </pre>
                <button
                  onClick={copyCapacitorCmd}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#222838] hover:bg-[#2d364a] text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedCmd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Status card */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {language === 'bn'
                    ? 'অ্যান্ড্রয়েড ফোনে এক ক্লিকে ইনস্টল করুন (WebAPK)'
                    : 'Install directly on Android Phone (WebAPK)'}
                </h4>
                <p className="text-[11px] text-gray-300 mt-0.5 leading-relaxed">
                  {language === 'bn'
                    ? 'অ্যান্ড্রয়েড সিস্টেম সরাসরি এই অ্যাপটির অফিসিয়াল WebAPK প্যাকেজ তৈরি করে আপনার হোমস্ক্রিন ও অ্যাপ ড্রয়ারে যুক্ত করে দেবে।'
                    : 'Android will automatically package this into an official standalone WebAPK on your device.'}
                </p>
              </div>
            </div>

            {/* Direct 1-Click Install Button if browser supports beforeinstallprompt */}
            {isInstallable && (
              <button
                onClick={handleInstallClick}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/25 cursor-pointer active:scale-95 transition-transform"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>{language === 'bn' ? 'এখনই অ্যাপ ইনস্টল করুন' : 'Install FocusForge App'}</span>
              </button>
            )}

            {isInstalled && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  {language === 'bn'
                    ? 'অ্যাপটি ইতিমধ্যে আপনার ডিভাইসে ইনস্টল করা আছে!'
                    : 'FocusForge is already installed on this device!'}
                </span>
              </div>
            )}

            {/* Step by step instructions for Chrome / Android */}
            <div className="p-4 rounded-2xl bg-[#0d0f15] border border-[#1e2330] space-y-3">
              <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {language === 'bn' ? 'অ্যান্ড্রয়েড ফোনে যেভাবে যুক্ত করবেন:' : 'How to install on Android:'}
              </h5>

              <ol className="space-y-2.5 text-xs text-gray-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#1b202e] text-amber-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <p>
                    {language === 'bn'
                      ? 'অ্যান্ড্রয়েড ফোনের Chrome ব্রাউজারে অ্যাপটির লিঙ্ক খুলুন।'
                      : 'Open this app URL in Google Chrome on your Android phone.'}
                  </p>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#1b202e] text-amber-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <p>
                    {language === 'bn'
                      ? 'ডান পাশের উপরে ৩টি ডট (⋮) মেনুতে চাপ দিন।'
                      : 'Tap the three dots menu (⋮) in the top right corner.'}
                  </p>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#1b202e] text-amber-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <p>
                    {language === 'bn'
                      ? '"Install app" বা "Add to Home screen" (হোম স্ক্রিনে যোগ করুন) অপশনে ট্যাপ করুন।'
                      : 'Select "Install app" or "Add to Home screen".'}
                  </p>
                </li>
              </ol>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#1b202e] hover:bg-[#252c3e] text-gray-300 text-xs font-bold transition-colors cursor-pointer"
        >
          {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
        </button>
      </div>
    </Modal>
  );
};
