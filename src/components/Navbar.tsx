import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  dockBtnRef?: React.RefObject<HTMLDivElement>;
  dockStartBtnRef?: React.RefObject<HTMLDivElement>;
  dockExploreBtnRef?: React.RefObject<HTMLDivElement>;
  currentRoute?: 'home' | 'projects';
  onLogoClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  isDark = false, 
  onToggleTheme,
  dockBtnRef,
  dockStartBtnRef,
  dockExploreBtnRef,
  currentRoute = 'home',
  onLogoClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic glass opacity that smoothly materializes as user scrolls down and logo docks
  // If on the dedicated projects page, navbar is always in docked glass state
  const glassOpacity = currentRoute === 'projects' ? 1 : Math.min(1, Math.max(0, (scrollY - 60) / 180));

  const navItems = [
    { label: 'Our Story', target: 'story' },
    { label: 'Capabilities', target: 'services' },
    { label: 'Projects', target: 'projects' },
    { label: 'How We Work', target: 'process' },
    { label: 'Global Vision', target: 'global' },
    { label: 'Leadership', target: 'leadership' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Unified Master Glass Effect Background for the Entire Navbar (Logo, Wordmark, Nav Links, Both Buttons) */}
      <div 
        style={{
          opacity: glassOpacity,
          backdropFilter: 'blur(24px) saturate(190%)',
          WebkitBackdropFilter: 'blur(24px) saturate(190%)',
        }}
        className="fixed top-0 left-0 right-0 h-[82px] sm:h-[88px] z-40 bg-white/30 dark:bg-black/75 border-b border-purple-200/40 dark:border-white/10 shadow-[0_10px_30px_-5px_rgba(124,44,245,0.06),inset_0_1px_0_0_rgba(255,255,255,0.7)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.12),inset_0_-1px_0_0_rgba(124,44,245,0.25)] pointer-events-none transition-opacity duration-200"
      >
        {/* Subtle radiant purple bottom accent rule */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-electric-purple/40 dark:via-electric-purple/60 to-transparent" />
      </div>

      {/* 1. CENTER: Standalone Floating Navigation Bar (Desktop) with Integrated Theme Toggle */}
      <div className="hidden lg:block fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50">
        <nav 
          className={`flex items-center gap-1 rounded-full pl-5 pr-3 py-1.5 backdrop-blur-md transition-all duration-300 ${
            glassOpacity > 0.5 
              ? 'bg-white/20 dark:bg-white/[0.06] border border-purple-200/30 dark:border-white/10 shadow-none'
              : 'bg-white/90 dark:bg-black/80 border border-purple-200 dark:border-white/15 shadow-lg shadow-purple-950/5 dark:shadow-black/50 py-2'
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleLinkClick(item.target)}
              className="px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 rounded-full text-light-subtext dark:text-gray-200 hover:text-electric-purple dark:hover:text-white hover:bg-lavender-soft/70 dark:hover:bg-white/10"
            >
              {item.label}
            </button>
          ))}

          {/* Centered Dark/Light Mode Toggle */}
          {onToggleTheme && (
            <>
              <div className="h-4 w-[1px] bg-purple-200/80 dark:bg-white/15 mx-1" aria-hidden="true" />
              <button
                onClick={onToggleTheme}
                className="p-1.5 rounded-full text-light-subtext dark:text-gray-200 hover:text-electric-purple dark:hover:text-white hover:bg-lavender-soft/70 dark:hover:bg-white/10 transition-colors focus:outline-none"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" /> : <Moon className="w-4 h-4 text-electric-purple" />}
              </button>
            </>
          )}
        </nav>
      </div>

      {/* 2. TOP-RIGHT CORNER: Action Entities & Dock Target */}
      <div className="fixed top-4 right-4 sm:top-5 sm:right-8 z-50 flex items-center gap-2 sm:gap-3">
        {/* Mobile-only theme toggle (on desktop it is in the center navbar) */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="lg:hidden p-2 rounded-2xl bg-white/90 dark:bg-midnight-card/90 border border-purple-200 dark:border-midnight-border text-light-subtext dark:text-muted-gray hover:text-electric-purple dark:hover:text-white transition-all shadow-md shadow-purple-950/5 backdrop-blur-md"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" /> : <Moon className="w-4 h-4 text-electric-purple" />}
          </button>
        )}

        {/* If on dedicated Projects page, render a direct Start a Project button */}
        {currentRoute === 'projects' ? (
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-electric-purple to-deep-violet text-white text-xs sm:text-sm font-semibold shadow-md shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] transition-all"
          >
            Start a Project
          </button>
        ) : (
          <>
            {/* Dock Target Anchor for "Start a Project" Button */}
            <div 
              ref={dockStartBtnRef ?? dockBtnRef}
              className="h-9 w-[114px] sm:h-10 sm:w-[145px] pointer-events-none opacity-0 flex-shrink-0"
              aria-hidden="true"
            />

            {/* Dock Target Anchor for "Explore Projects" Button (just after Start a Project) */}
            <div 
              ref={dockExploreBtnRef}
              className="h-9 w-[114px] sm:h-10 sm:w-[140px] pointer-events-none opacity-0 flex-shrink-0"
              aria-hidden="true"
            />
          </>
        )}

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-2xl bg-white/90 dark:bg-midnight-card/90 border border-purple-200 dark:border-midnight-border text-light-text dark:text-white focus:outline-none shadow-md backdrop-blur-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-4 right-4 z-50 bg-white/95 dark:bg-midnight-900/95 border border-purple-200 dark:border-midnight-border rounded-2xl p-5 shadow-2xl backdrop-blur-xl space-y-3">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleLinkClick(item.target)}
              className="block w-full text-left py-2.5 px-4 text-sm font-semibold rounded-xl transition-colors text-light-text dark:text-gray-300 hover:text-electric-purple dark:hover:text-white hover:bg-lavender-soft/60 dark:hover:bg-white/5"
            >
              {item.label}
            </button>
          ))}

          {onToggleTheme && (
            <div className="pt-2 border-t border-purple-100 dark:border-midnight-border flex items-center justify-between px-2">
              <span className="text-xs font-medium text-light-subtext dark:text-muted-gray">Theme Appearance</span>
              <button
                onClick={onToggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-light-surface dark:bg-midnight-card border border-purple-200 dark:border-midnight-border text-xs font-semibold text-light-text dark:text-white"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" /> : <Moon className="w-3.5 h-3.5 text-electric-purple" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
