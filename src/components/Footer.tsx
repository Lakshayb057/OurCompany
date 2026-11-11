import React from 'react';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-white dark:bg-midnight-900 border-t border-light-border dark:border-midnight-border pt-6 pb-4 sm:pt-8 sm:pb-5 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centerpiece Giant Brand Logo & Wordmark Showcase */}
        <div className="py-5 sm:py-8 border-b border-light-border dark:border-midnight-border/70 flex items-center justify-center overflow-hidden">
          <div className="flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 opacity-75 dark:opacity-85 hover:opacity-100 transition-opacity duration-300">
            <img
              src="/hero-ribbon.png"
              alt="CodeVerse Ribbon Logo"
              className="w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44 object-contain flex-shrink-0 drop-shadow-[0_0_35px_rgba(124,44,245,0.65)]"
            />
            <span className="text-[13vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] xl:text-[8.5rem] font-black tracking-tight sm:tracking-normal lg:tracking-wider uppercase leading-none whitespace-nowrap bg-gradient-to-b from-purple-700 via-electric-purple to-purple-400/50 dark:from-white dark:via-lavender-glow dark:to-electric-purple/60 bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(124,44,245,0.3)] dark:drop-shadow-[0_4px_30px_rgba(124,44,245,0.6)] select-none">
              CodeVerse
            </span>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-3 sm:pt-4 flex items-center justify-center text-xs font-mono text-light-subtext dark:text-muted-gray">
          <div className="text-center font-medium">
            © {new Date().getFullYear()} CodeVerse. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
