import React from 'react';
import { Linkedin, Instagram, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
  settings?: {
    companyName?: string;
    legalHeadquarters?: string;
    contactEmail?: string;
    contactPhone?: string;
    copyrightNotice?: string;
    linkedinUrl?: string;
    instagramUrl?: string;
    gmailUrl?: string;
  };
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="bg-white dark:bg-midnight-900 border-t border-light-border dark:border-midnight-border pt-3 pb-3 sm:pt-4 sm:pb-3 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact & Balanced Brand Logo Showcase */}
        <div className="py-1.5 sm:py-2.5 border-b border-light-border dark:border-midnight-border/70 flex items-center justify-center overflow-hidden">
          <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-5 opacity-80 dark:opacity-90 hover:opacity-100 transition-opacity duration-300">
            <img
              src="/hero-ribbon.png"
              alt="Codrix Ribbon Logo"
              className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain flex-shrink-0 drop-shadow-[0_0_25px_rgba(124,44,245,0.55)]"
            />
            <span className="text-[10vw] sm:text-[7.5vw] md:text-[5.5vw] lg:text-[4.5rem] font-black tracking-tight sm:tracking-normal lg:tracking-wider uppercase leading-none whitespace-nowrap bg-gradient-to-b from-purple-700 via-electric-purple to-purple-400/50 dark:from-white dark:via-lavender-glow dark:to-electric-purple/60 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(124,44,245,0.25)] dark:drop-shadow-[0_3px_20px_rgba(124,44,245,0.5)] select-none">
              Codrix
            </span>
          </div>
        </div>

        {/* Bottom Bar: Copyright on Left, Social Media Buttons in Center, HQ on Right */}
        <div className="pt-2.5 sm:pt-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono text-light-subtext dark:text-muted-gray">
          {/* Copyright notice */}
          <div className="text-center md:text-left font-medium order-2 md:order-1 md:flex-1">
            © {new Date().getFullYear()} {settings?.companyName || 'Codrix'}. {
              (settings?.copyrightNotice || 'All rights reserved.')
                .replace(/^©\s*\d{4}\s+[^.]*\.\s*/i, '')
                .trim() || 'All rights reserved.'
            }
          </div>

          {/* Social Media Links: LinkedIn, Instagram, Gmail */}
          <div className="flex items-center justify-center gap-2.5 order-1 md:order-2 flex-shrink-0">
            {/* LinkedIn Button */}
            <a
              href={settings?.linkedinUrl || 'https://www.linkedin.com/company/codrix'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              title="Connect on LinkedIn"
              className="p-1.5 sm:p-2 rounded-xl bg-purple-50/80 dark:bg-midnight-card border border-purple-200/70 dark:border-midnight-border text-light-subtext dark:text-muted-gray hover:text-[#0A66C2] dark:hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 transition-all shadow-sm group cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
            </a>

            {/* Instagram Button */}
            <a
              href={settings?.instagramUrl || 'https://www.instagram.com/codrix.tech'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram"
              title="Follow on Instagram"
              className="p-1.5 sm:p-2 rounded-xl bg-purple-50/80 dark:bg-midnight-card border border-purple-200/70 dark:border-midnight-border text-light-subtext dark:text-muted-gray hover:text-[#E4405F] dark:hover:text-[#E4405F] hover:border-[#E4405F]/50 hover:bg-[#E4405F]/10 transition-all shadow-sm group cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
            </a>

            {/* Gmail / Email Button */}
            <a
              href={
                settings?.gmailUrl
                  ? settings.gmailUrl
                  : settings?.contactEmail
                  ? `mailto:${settings.contactEmail}`
                  : 'mailto:codrixsoftwares@gmail.com'
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email via Gmail"
              title="Contact via Gmail"
              className="p-1.5 sm:p-2 rounded-xl bg-purple-50/80 dark:bg-midnight-card border border-purple-200/70 dark:border-midnight-border text-light-subtext dark:text-muted-gray hover:text-[#EA4335] dark:hover:text-[#EA4335] hover:border-[#EA4335]/50 hover:bg-[#EA4335]/10 transition-all shadow-sm group cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Legal Headquarters */}
          <div className="text-[11px] text-light-subtext/80 dark:text-muted-gray/80 text-center md:text-right truncate max-w-md order-3 md:flex-1">
            {(settings?.legalHeadquarters || 'Corporate Headquarters: India').replace(/\s*•\s*Global Remote Delivery/gi, '').trim()}
          </div>
        </div>

      </div>
    </footer>
  );
};
