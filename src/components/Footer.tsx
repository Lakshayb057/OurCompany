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
    <footer className="bg-white dark:bg-midnight-900 border-t border-light-border dark:border-midnight-border pt-16 pb-12 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-light-border dark:border-midnight-border/70">
          
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

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-electric-purple dark:text-lavender-glow mb-4 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-light-subtext dark:text-muted-gray">
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-electric-purple dark:hover:text-white transition-colors">
                  Our Story & Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-electric-purple dark:hover:text-white transition-colors">
                  Capabilities & Domains
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-electric-purple dark:hover:text-white transition-colors">
                  Engineering Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('process')} className="hover:text-electric-purple dark:hover:text-white transition-colors">
                  How We Work (5 Stages)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('leadership')} className="hover:text-electric-purple dark:hover:text-white transition-colors">
                  Leadership & Governance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('global')} className="hover:text-electric-purple dark:hover:text-white transition-colors">
                  Global Delivery Model
                </button>
              </li>
            </ul>
          </div>

          {/* Engineering Domains */}
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

          {/* Administration & Governance */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-electric-purple dark:text-lavender-glow mb-4 font-bold">
              Governance & Admin
            </h4>
            <ul className="space-y-2 text-xs text-light-subtext dark:text-muted-gray mb-4">
              <li>SRS Version: 1.0 (Nov 2026)</li>
              <li>Confidential Internal Planning</li>
              <li>100% Allocation Validation</li>
            </ul>

            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 rounded-xl bg-lavender-soft/80 border border-purple-200 text-electric-dark font-semibold text-xs hover:bg-electric-purple hover:text-white dark:bg-electric-purple/20 dark:border-electric-purple/40 dark:text-lavender-light dark:hover:bg-electric-purple dark:hover:text-white transition-all w-full text-center shadow-sm"
            >
              Start Technical Discovery
            </button>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-light-subtext dark:text-muted-gray">
          <div>
            © {new Date().getFullYear()} CodeVerse. All rights reserved. Turning Ideas Into Technology.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-light-subtext dark:text-gray-400 font-medium">
              <span>Theme: Light Mode • Electric Purple & Lavender</span>
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-light-surface dark:bg-midnight-card border border-light-border dark:border-midnight-border text-light-subtext dark:text-muted-gray hover:text-electric-purple dark:hover:text-white hover:border-electric-purple transition-all shadow-sm"
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
