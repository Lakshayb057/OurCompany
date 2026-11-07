/**
 * CodeVerse Session & Cookie Utilities
 * Manages theme persistence, cookie consent, and active browser sessions across reloads and hard refreshes.
 */

export function setCookie(name: string, value: string, days = 365): void {
  try {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
  } catch (err) {
    console.error('Error setting cookie:', err);
  }
}

export function getCookie(name: string): string | null {
  try {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  } catch (err) {
    console.error('Error reading cookie:', err);
  }
  return null;
}

export function deleteCookie(name: string): void {
  try {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  } catch (err) {
    console.error('Error deleting cookie:', err);
  }
}

// Theme storage keys
const THEME_KEY = 'codeverse-theme';
const COOKIE_THEME_KEY = 'codeverse_theme';

export function getStoredTheme(): 'light' | 'dark' {
  try {
    // 1. Check localStorage first
    const local = localStorage.getItem(THEME_KEY);
    if (local === 'dark' || local === 'light') return local;

    // 2. Check cookie
    const cookie = getCookie(COOKIE_THEME_KEY);
    if (cookie === 'dark' || cookie === 'light') return cookie;

    // 3. Fallback to system preference
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (err) {
    console.error('Error reading stored theme:', err);
  }
  return 'light';
}

export function saveStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
    setCookie(COOKIE_THEME_KEY, theme, 365);
  } catch (err) {
    console.error('Error saving stored theme:', err);
  }
}

// Cookie Consent keys
const CONSENT_KEY = 'codeverse_cookie_consent';
const SESSION_ID_KEY = 'codeverse_session_id';

export type CookieConsentStatus = 'accepted' | 'rejected' | null;

export function getCookieConsent(): CookieConsentStatus {
  try {
    const local = localStorage.getItem(CONSENT_KEY);
    if (local === 'accepted' || local === 'rejected') return local;

    const cookie = getCookie(CONSENT_KEY);
    if (cookie === 'accepted' || cookie === 'rejected') return cookie;
  } catch (err) {
    console.error('Error reading cookie consent:', err);
  }
  return null;
}

export function saveCookieConsent(status: 'accepted' | 'rejected'): void {
  try {
    localStorage.setItem(CONSENT_KEY, status);
    setCookie(CONSENT_KEY, status, 365);

    if (status === 'accepted') {
      // Initialize persistent anonymous session ID
      let sessionId = getCookie(SESSION_ID_KEY) || localStorage.getItem(SESSION_ID_KEY);
      if (!sessionId) {
        sessionId = `cv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      }
      localStorage.setItem(SESSION_ID_KEY, sessionId);
      setCookie(SESSION_ID_KEY, sessionId, 30);
    } else {
      // Clean non-essential session cookies
      deleteCookie(SESSION_ID_KEY);
      localStorage.removeItem(SESSION_ID_KEY);
    }
  } catch (err) {
    console.error('Error saving cookie consent:', err);
  }
}

