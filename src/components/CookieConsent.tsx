import React, { useState, useEffect } from 'react';
import { Cookie, Check } from 'lucide-react';
import { getCookieConsent, saveCookieConsent } from '../utils/session';

interface CookieConsentProps {
  onConsentChange?: (status: 'accepted' | 'rejected') => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onConsentChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // Check if user already made a consent choice
    const consent = getCookieConsent();
    if (!consent) {
      // Delay appearance slightly so hero entrance animation finishes smoothly
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    saveCookieConsent('accepted');
    onConsentChange?.('accepted');
    closeBanner();
  };

  const handleReject = () => {
    saveCookieConsent('rejected');
    onConsentChange?.('rejected');
    closeBanner();
  };

  const closeBanner = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimatingOut(false);
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and session consent banner"
      style={{
        transform: isAnimatingOut ? 'translateY(100%)' : 'translateY(0)',
        opacity: isAnimatingOut ? 0 : 1,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="fixed bottom-0 left-0 right-0 z-50 select-none bg-white/95 dark:bg-midnight-900/95 backdrop-blur-2xl border-t border-purple-200/70 dark:border-midnight-border py-4 sm:py-5 shadow-[0_-12px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-16px_50px_rgba(0,0,0,0.7)]"
    >
      {/* Top radiant purple accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-electric-purple/40 dark:via-lavender-glow/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8">
          
          {/* Left: Cookie Icon & Properly Aligned Text Content */}
          <div className="flex items-start sm:items-center gap-3.5 flex-1">
            <div className="w-10 h-10 rounded-xl bg-purple-100/80 dark:bg-electric-purple/20 border border-purple-200 dark:border-electric-purple/40 flex items-center justify-center flex-shrink-0 text-electric-purple dark:text-lavender-glow shadow-sm mt-0.5 sm:mt-0">
              <Cookie className="w-5 h-5 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-bold text-light-text dark:text-white leading-tight">
                Cookie &amp; Session Preferences
              </h4>
              <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray leading-relaxed max-w-3xl">
                We use essential session storage and cookies to remember your theme preference across reloads, maintain secure API sessions, and ensure resilient platform navigation.
              </p>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-initial py-2.5 px-6 rounded-xl bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet text-white text-xs sm:text-sm font-bold shadow-md shadow-electric-purple/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 focus:outline-none whitespace-nowrap"
            >
              <Check className="w-4 h-4" />
              <span>Accept Cookies</span>
            </button>

            <button
              onClick={handleReject}
              className="flex-1 sm:flex-initial py-2.5 px-6 rounded-xl bg-white dark:bg-midnight-card/80 border border-purple-200 dark:border-midnight-border text-light-text dark:text-gray-300 text-xs sm:text-sm font-semibold hover:bg-lavender-soft/60 dark:hover:bg-white/10 hover:border-electric-purple/50 active:scale-[0.98] transition-all focus:outline-none whitespace-nowrap"
            >
              Reject
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
};
