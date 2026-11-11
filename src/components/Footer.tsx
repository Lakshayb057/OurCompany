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
    <footer className="bg-white dark:bg-midnight-900 border-t border-light-border dark:border-midnight-border pt-8 pb-6 sm:pt-16 sm:pb-12 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid Area with Giant Watermark in Background */}
        <div className="relative pb-6 sm:pb-12 border-b border-light-border dark:border-midnight-border/70 overflow-hidden">
          
          {/* Giant Brand Typography Watermark (matches EKHUM style) */}
          <div className="absolute inset-x-0 top-0 bottom-6 sm:bottom-8 flex items-center justify-center pointer-events-none select-none z-0">
            <span className="text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[10vw] xl:text-[9.5rem] font-black tracking-tight sm:tracking-normal lg:tracking-wider uppercase leading-none whitespace-nowrap bg-gradient-to-b from-electric-purple/25 via-lavender-glow/12 to-transparent dark:from-electric-purple/35 dark:via-lavender-light/15 dark:to-transparent bg-clip-text text-transparent select-none opacity-90 transition-all">
              CodeVerse
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 relative z-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-light-surface dark:bg-midnight-card border border-purple-200 dark:border-electric-purple/30 flex items-center justify-center shadow-sm p-1.5">
                <img
                  src="/logo-icon.png"
                  alt="CodeVerse"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

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
        <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs font-mono text-light-subtext dark:text-muted-gray">
          <div>
            © {new Date().getFullYear()} CodeVerse. All rights reserved.
          </div>

          <div>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-light-surface dark:bg-midnight-card border border-light-border dark:border-midnight-border text-light-subtext dark:text-muted-gray hover:text-electric-purple dark:hover:text-white hover:border-electric-purple transition-all shadow-sm cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
