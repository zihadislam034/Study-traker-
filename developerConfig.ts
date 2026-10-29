import pkg from '../../package.json';

export interface DeveloperInfo {
  appName: string;
  appVersion: string;
  developerName: string;
  developerRole: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
  donationUrl: string | null;
}

/**
 * Validates that a configured donation URL is a legitimate HTTPS URL.
 * Returns null if no donation URL is configured yet.
 */
function getVerifiedDonationUrl(): string | null {
  const rawUrl = (import.meta.env.VITE_DONATION_URL || '').trim();
  if (!rawUrl) return null;
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol === 'https:') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

export const DEVELOPER_CONFIG: DeveloperInfo = {
  appName: 'FocusForge',
  appVersion: pkg.version || '',
  developerName: 'Zihad Islam',
  developerRole: 'Creator & Developer of FocusForge',
  email: 'zihadislam034@gmail.com',
  instagramUrl: 'https://www.instagram.com/zihad.034/',
  facebookUrl: 'https://www.facebook.com/Zihad.034',
  donationUrl: getVerifiedDonationUrl(),
};

export function getMailtoHref(subject?: string): string {
  const base = `mailto:${DEVELOPER_CONFIG.email}`;
  if (!subject) return base;
  return `${base}?subject=${encodeURIComponent(subject)}`;
}
