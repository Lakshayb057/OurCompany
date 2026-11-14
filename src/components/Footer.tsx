import React from 'react';
import { ArrowUp } from 'lucide-react';
import { siInstagram, siGmail } from 'simple-icons';

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
  const linkedinHref = settings?.linkedinUrl || 'https://www.linkedin.com/company/codrix';
  const instagramHref = settings?.instagramUrl || 'https://www.instagram.com/codrix.tech';
  const gmailHref = settings?.gmailUrl
    ? settings.gmailUrl
    : settings?.contactEmail
    ? `mailto:${settings.contactEmail}`
    : 'mailto:codrixsoftwares@gmail.com';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-midnight-900 border-t border-light-border dark:border-midnight-border pt-1 pb-3 sm:pt-2 sm:pb-4 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Massive Brand Showcase with Logo + CODRIX Wordmark Centered with bottom-to-top gradient fade into background (Unchanged) */}
        <div className="relative pt-0.5 pb-2 sm:pt-1 sm:pb-3 border-b border-light-border dark:border-midnight-border/70 flex items-center justify-center overflow-hidden">
          <div 
            style={{
              maskImage: 'linear-gradient(to top, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 26%, rgba(0,0,0,1) 80%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 26%, rgba(0,0,0,1) 80%)',
            }}
            className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 opacity-95 hover:opacity-100 transition-opacity duration-300"
          >
            <img
              src="/hero-ribbon.png"
              alt="Codrix Ribbon Logo"
              className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain flex-shrink-0 drop-shadow-[0_0_30px_rgba(124,44,245,0.45)]"
            />
            <span className="text-[11vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[6.8rem] xl:text-[8rem] font-black tracking-tight sm:tracking-normal lg:tracking-wider uppercase leading-none whitespace-nowrap bg-gradient-to-t from-purple-500/20 via-electric-purple to-purple-900 dark:from-electric-purple/20 dark:via-lavender-glow dark:to-white bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(124,44,245,0.2)] dark:drop-shadow-[0_4px_28px_rgba(124,44,245,0.45)] select-none">
              Codrix
            </span>
          </div>

          {/* Bottom-to-top background gradient blend to guarantee seamless transition */}
          <div className="absolute inset-x-0 bottom-0 h-4 sm:h-6 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-midnight-900 dark:via-midnight-900/80 to-transparent pointer-events-none z-10" />
        </div>

        {/* Portfolio-style Brand Info Row & Horizontal Social Links Bar */}
        <div className="py-3.5 sm:py-4.5 border-b border-light-border dark:border-midnight-border/70 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Left: Ribbon Logo + CODRIX | TURNING IDEAS INTO TECHNOLOGY */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5 select-none">
            <img
              src="/hero-ribbon.png"
              alt="Codrix Ribbon Logo"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0 drop-shadow-[0_0_12px_rgba(124,44,245,0.35)]"
            />
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-light-text dark:text-white uppercase">
              Codrix
            </span>
            <span className="text-light-subtext/30 dark:text-muted-gray/30 text-xs sm:text-sm">|</span>
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase text-light-subtext dark:text-muted-gray">
              Turning Ideas Into Technology
            </span>
          </div>

          {/* Right: Direct Real Logos (LinkedIn, Instagram, Gmail) + Back to Top Button */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Real Official LinkedIn Logo */}
            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              title="Connect on LinkedIn"
              className="p-1 flex items-center justify-center transition-transform hover:scale-115 active:scale-95 group cursor-pointer"
            >
              <svg role="img" viewBox="0 0 24 24" className="w-5 h-5 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 shrink-0 fill-[#0A66C2] drop-shadow-[0_2px_8px_rgba(10,102,194,0.3)] transition-transform group-hover:scale-105">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Real Official Instagram Logo with Official Gradient */}
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram"
              title="Follow on Instagram"
              className="p-1 flex items-center justify-center transition-transform hover:scale-115 active:scale-95 group cursor-pointer"
            >
              <svg role="img" viewBox="0 0 24 24" className="w-5 h-5 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 shrink-0 drop-shadow-[0_2px_8px_rgba(214,36,159,0.3)] transition-transform group-hover:scale-105">
                <defs>
                  <radialGradient id="footer-ig-grad" cx="20%" cy="115%" r="140%">
                    <stop stopColor="#fdf497" offset="0%" />
                    <stop stopColor="#fdf497" offset="5%" />
                    <stop stopColor="#fd5949" offset="45%" />
                    <stop stopColor="#d6249f" offset="60%" />
                    <stop stopColor="#285AEB" offset="90%" />
                  </radialGradient>
                </defs>
                <path fill="url(#footer-ig-grad)" d={siInstagram.path} />
              </svg>
            </a>

            {/* Real Official Gmail Logo */}
            <a
              href={gmailHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email via Gmail"
              title="Contact via Gmail"
              className="p-1 flex items-center justify-center transition-transform hover:scale-115 active:scale-95 group cursor-pointer"
            >
              <svg role="img" viewBox="0 0 24 24" className="w-5 h-5 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 shrink-0 fill-[#EA4335] drop-shadow-[0_2px_8px_rgba(234,67,53,0.3)] transition-transform group-hover:scale-105">
                <path d={siGmail.path} />
              </svg>
            </a>

            {/* Back to top scroll button */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-light-200/90 dark:bg-white/10 hover:bg-electric-purple/20 dark:hover:bg-electric-purple/30 text-light-text dark:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 border border-purple-200/60 dark:border-white/10 ml-0.5 sm:ml-1 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright on Left, Legal HQ on Right */}
        <div className="pt-2.5 sm:pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-light-subtext dark:text-muted-gray">
          {/* Copyright notice */}
          <div className="text-center sm:text-left font-medium">
            © {new Date().getFullYear()} {settings?.companyName || 'Codrix'}. {
              (settings?.copyrightNotice || 'All rights reserved.')
                .replace(/^©\s*\d{4}\s+[^.]*\.\s*/i, '')
                .trim() || 'All rights reserved.'
            }
          </div>

          {/* Legal Headquarters */}
          <div className="text-[11px] text-light-subtext/80 dark:text-muted-gray/80 text-center sm:text-right truncate max-w-md">
            {(settings?.legalHeadquarters || 'Corporate Headquarters: India').replace(/\s*•\s*Global Remote Delivery/gi, '').trim()}
          </div>
        </div>

      </div>
    </footer>
  );
};
