import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-midnight-900 border-t border-light-border dark:border-midnight-border pt-6 pb-4 sm:pt-10 sm:pb-6 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid Area with Giant Watermark in Background */}
        <div className="relative pb-5 sm:pb-7 border-b border-light-border dark:border-midnight-border/70 overflow-hidden">
          
          {/* Giant Brand Logo & Typography Watermark in Footer Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden px-4">
            <div className="flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 opacity-20 dark:opacity-30">
              <img
                src="/hero-ribbon.png"
                alt="CodeVerse Watermark Logo"
                className="w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44 object-contain flex-shrink-0 drop-shadow-[0_0_24px_rgba(124,44,245,0.45)]"
              />
              <span className="text-[12vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8.5vw] xl:text-[8rem] font-black tracking-tight sm:tracking-normal lg:tracking-wider uppercase leading-none whitespace-nowrap bg-gradient-to-b from-electric-purple/90 via-lavender-glow/60 to-transparent dark:from-electric-purple dark:via-lavender-light/60 dark:to-transparent bg-clip-text text-transparent select-none">
                CodeVerse
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 relative z-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-electric-purple dark:text-lavender-glow mb-4 font-bold">
              About CodeVerse
            </h4>

            <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray leading-relaxed max-w-sm">
              CodeVerse is an engineering startup building scalable full-stack web applications, real-time engines, AI automation systems, and proprietary digital products.
            </p>

            <div className="pt-2 text-xs font-mono text-light-subtext dark:text-gray-400">
              Corporate Headquarters: <span className="text-light-text dark:text-white font-semibold">India • Global Remote Delivery</span>
            </div>
          </div>

          {/* Core Specialties */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-electric-purple dark:text-lavender-glow mb-4 font-bold">
              Core Specialties
            </h4>
            <ul className="space-y-2 text-xs text-light-subtext dark:text-muted-gray">
              <li>Distributed Cloud Systems (PERN)</li>
              <li>AI, OCR & Multimodal LLMs</li>
              <li>Redis Event Bus & WebSockets</li>
              <li>Institute ERPs & JWT Verification</li>
              <li>Agri-Commerce & SVG BI Systems</li>
              <li>Campus Circular Marketplaces</li>
            </ul>
          </div>

          {/* Direct Technical Discovery CTA */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-electric-purple dark:text-lavender-glow mb-3 font-bold">
                Technical Discovery
              </h4>
              <p className="text-xs text-light-subtext dark:text-muted-gray leading-relaxed mb-4">
                Ready to engineer your platform? Connect directly with our founding engineering team.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-electric-purple to-deep-violet text-white font-semibold text-xs hover:brightness-110 active:scale-[0.98] transition-all w-full text-center shadow-sm cursor-pointer"
            >
              Start Technical Discovery
            </button>
          </div>

        </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-3 sm:pt-4 relative flex items-center justify-center text-xs font-mono text-light-subtext dark:text-muted-gray">
          <div className="text-center font-medium">
            © {new Date().getFullYear()} CodeVerse. All rights reserved.
          </div>

          <div className="absolute right-0">
            <button
              onClick={scrollToTop}
              className="p-1.5 sm:p-2 rounded-lg bg-light-surface dark:bg-midnight-card border border-light-border dark:border-midnight-border text-light-subtext dark:text-muted-gray hover:text-electric-purple dark:hover:text-white hover:border-electric-purple transition-all shadow-sm cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
