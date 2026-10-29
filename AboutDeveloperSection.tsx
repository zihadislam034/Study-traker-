import React, { useState } from 'react';
import {
  Check,
  Code2,
  Copy,
  ExternalLink,
  Heart,
  Info,
  Mail,
  Terminal,
} from 'lucide-react';
import { DEVELOPER_CONFIG, getMailtoHref } from '../../config/developerConfig';
import { Modal } from '../common/Modal';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const AboutDeveloperSection: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DEVELOPER_CONFIG.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard API fallback not needed if mailto works
    }
  };

  return (
    <div id="about-developer-section" className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
          About, Developer & Support
        </h3>
        {DEVELOPER_CONFIG.appVersion && (
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/25">
            v{DEVELOPER_CONFIG.appVersion}
          </span>
        )}
      </div>

      {/* 1. About FocusForge Card */}
      <section className="p-5 rounded-3xl bg-[#131620] border border-[#222838] space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white tracking-tight">
                About {DEVELOPER_CONFIG.appName}
              </h4>
              {DEVELOPER_CONFIG.appVersion && (
                <p className="text-[11px] text-gray-400">
                  Version {DEVELOPER_CONFIG.appVersion}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs text-gray-300 leading-relaxed pt-1">
          <p>
            FocusForge is built to help you stay focused, organize your tasks, manage your time, and make steady progress toward your goals.
          </p>
          <p className="text-amber-400/90 font-semibold">
            Thank you for being part of the FocusForge journey.
          </p>
        </div>
      </section>

      {/* 2. Developer Profile Card */}
      <section className="p-5 rounded-3xl bg-gradient-to-br from-[#151924] to-[#10131a] border border-[#222838] space-y-4 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                Developer Profile
              </span>
              <h4 className="text-base font-black text-white tracking-tight">
                {DEVELOPER_CONFIG.developerName}
              </h4>
              <p className="text-xs text-gray-400 font-medium">
                {DEVELOPER_CONFIG.developerRole}
              </p>
            </div>
          </div>

          {/* Quick Social Icon Links */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={DEVELOPER_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zihad Islam on Instagram"
              title="Instagram (@zihad.034)"
              className="p-2.5 rounded-xl bg-[#1b202e] hover:bg-amber-400/20 border border-[#283248] hover:border-amber-400/40 text-gray-300 hover:text-amber-400 transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={DEVELOPER_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zihad Islam on Facebook"
              title="Facebook (Zihad.034)"
              className="p-2.5 rounded-xl bg-[#1b202e] hover:bg-amber-400/20 border border-[#283248] hover:border-amber-400/40 text-gray-300 hover:text-amber-400 transition-colors"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          FocusForge is designed to help people improve focus, manage tasks, and build productive habits.
        </p>

        {/* Contact Details List */}
        <div className="pt-1 space-y-2">
          <div className="p-3 rounded-2xl bg-[#0f1218] border border-[#1e2434] flex items-center justify-between gap-2">
            <a
              href={getMailtoHref()}
              className="flex items-center gap-2.5 text-xs text-gray-200 hover:text-amber-400 transition-colors truncate"
            >
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-medium truncate">{DEVELOPER_CONFIG.email}</span>
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              title="Copy email address"
              className="px-2.5 py-1 rounded-lg bg-[#1b202e] hover:bg-[#252c3e] border border-[#2a3348] text-[11px] font-bold text-gray-300 flex items-center gap-1 shrink-0 cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-amber-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={DEVELOPER_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#0f1218] hover:bg-[#171c28] border border-[#1e2434] flex items-center justify-between text-xs text-gray-300 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2 truncate">
                <InstagramIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate font-medium">@zihad.034</span>
              </span>
              <ExternalLink className="w-3 h-3 text-gray-500 shrink-0" />
            </a>

            <a
              href={DEVELOPER_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#0f1218] hover:bg-[#171c28] border border-[#1e2434] flex items-center justify-between text-xs text-gray-300 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2 truncate">
                <FacebookIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate font-medium">Zihad.034</span>
              </span>
              <ExternalLink className="w-3 h-3 text-gray-500 shrink-0" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Support FocusForge Card */}
      <section className="p-5 rounded-3xl bg-gradient-to-br from-[#171a26] via-[#131620] to-[#10131a] border border-amber-400/25 space-y-4 shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-400/15 text-amber-400 border border-amber-400/30">
            <Heart className="w-4 h-4 fill-amber-400/20" />
          </div>
          <h4 className="text-base font-black text-white tracking-tight">
            Support FocusForge ❤️
          </h4>
        </div>

        <div className="space-y-2.5 text-xs text-gray-300 leading-relaxed">
          <p className="font-bold text-white">Enjoying FocusForge? ❤️</p>
          <p>
            I created FocusForge with the goal of helping people stay focused, manage their time, and become more productive.
          </p>
          <p>
            If this app has helped you in any way and you would like to support my work, you can make a voluntary donation.
          </p>
          <p>
            Your support, encouragement, and feedback mean a lot to me and motivate me to keep improving FocusForge.
          </p>
          <p className="text-gray-400">
            Donations are completely optional. Please support only if you genuinely want to and can afford to.
          </p>
          <p className="font-semibold text-amber-400">
            Thank you for supporting an independent developer and helping FocusForge grow! ❤️
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          {DEVELOPER_CONFIG.donationUrl ? (
            <a
              href={DEVELOPER_CONFIG.donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-colors"
            >
              <Heart className="w-4 h-4 fill-black" />
              <span>Support the Developer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => setIsDonationModalOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-black" />
              <span>Support the Developer</span>
            </button>
          )}

          <a
            href={getMailtoHref('Supporting FocusForge')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1b202e] hover:bg-[#232a3d] border border-[#2a3348] text-amber-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Contact the Developer</span>
          </a>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={DEVELOPER_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#161a26] hover:bg-[#1f2536] border border-[#252c3f] text-gray-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Follow on Instagram</span>
            </a>

            <a
              href={DEVELOPER_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#161a26] hover:bg-[#1f2536] border border-[#252c3f] text-gray-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <FacebookIcon className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Follow on Facebook</span>
            </a>
          </div>
        </div>
      </section>

      {/* Support / Donation Status & Setup Modal */}
      <Modal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        title="Support FocusForge ❤️"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 space-y-2.5">
            <p className="text-sm font-bold text-white">
              Thank you for wanting to support FocusForge! ❤️
            </p>
            <p className="text-xs text-gray-300 leading-relaxed">
              The donation option is not available yet. Please check back later or contact the developer.
            </p>
          </div>

          <a
            href={getMailtoHref('Supporting FocusForge')}
            className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Contact the Developer</span>
          </a>

          <div className="pt-2 border-t border-[#222838]">
            <button
              type="button"
              onClick={() => setShowSetupGuide((prev) => !prev)}
              className="w-full flex items-center justify-between text-[11px] font-bold text-gray-400 hover:text-gray-200 py-1 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>Developer Setup Guide (Configure Donation Link)</span>
              </span>
              <span>{showSetupGuide ? '▲' : '▼'}</span>
            </button>

            {showSetupGuide && (
              <div className="mt-2 p-3 rounded-xl bg-[#0b0d11] border border-[#1f2534] text-[11px] text-gray-400 space-y-2 leading-relaxed">
                <p className="text-gray-300 font-semibold">
                  How to connect a legitimate donation link later:
                </p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>
                    Set <code className="text-amber-400">VITE_DONATION_URL="https://..."</code> in your <code className="text-gray-300">.env</code> file, or update <code className="text-gray-300">src/config/developerConfig.ts</code>.
                  </li>
                  <li>
                    Only verified <code className="text-amber-400">https://</code> URLs are enabled; when configured, the &ldquo;Support the Developer&rdquo; button automatically opens that URL.
                  </li>
                  <li>
                    Rebuild &amp; sync Android with <code className="text-amber-400">npm run build &amp;&amp; npx cap sync android</code>.
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
