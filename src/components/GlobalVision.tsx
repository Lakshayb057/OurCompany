import React from 'react';
import { Clock, Shield, Laptop, Globe } from 'lucide-react';

export const GlobalVision: React.FC<{ onStartProject: () => void }> = ({ onStartProject }) => {
  return (
    <section id="global" className="py-14 sm:py-16 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-electric-purple/10 dark:bg-electric-purple/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Full Container Background Glass Card */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-purple-200/80 dark:border-electric-purple/40 overflow-hidden shadow-xl shadow-purple-500/10 dark:shadow-purple-950/50 bg-white dark:bg-midnight-card group transition-colors duration-500">
          
          {/* Complete Container Full-Bleed Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/global-vision.jpg"
              alt="Engineered Locally, Deployed Globally - 4K Photography"
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 sm:opacity-90 dark:opacity-85"
            />
            {/* Light Mode Gradients - Gentle text scrim */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 via-55% to-white/15 dark:hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/20 dark:hidden" />
            
            {/* Dark Mode Gradients */}
            <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-midnight-950/95 via-midnight-950/85 to-midnight-950/55" />
            <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-transparent to-midnight-950/40" />
            
            {/* Ambient Purple Accent Glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-electric-purple/15 dark:bg-electric-purple/25 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Compact Content Layered Over Background */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-3xl space-y-4 sm:space-y-5">
            
            {/* Title - Compact Scale */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.15] transition-colors">
              Engineered Locally. <br />
              <span className="text-gradient-purple">Deployed Globally.</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-muted-gray leading-relaxed max-w-xl font-medium transition-colors">
              CodeVerse is architected from day one for global delivery. Whether partnering with fast-moving startups in London, agritech pioneers in South Asia, or scale-ups in North America, we deliver frictionless remote collaboration backed by airtight SLAs.
            </p>

            {/* 3 Pillar Cards - Compact Frosted Glass */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 sm:p-3.5 rounded-xl bg-white/90 dark:bg-midnight-surface/85 backdrop-blur-md border border-purple-200/80 dark:border-midnight-border shadow-sm hover:border-electric-purple/60 transition-all hover:bg-white dark:hover:bg-midnight-surface/95">
                <Clock className="w-4 h-4 text-electric-purple dark:text-lavender-glow mb-1.5" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Timezone Sync</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  Overlapping operational windows for real-time standups.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-white/90 dark:bg-midnight-surface/85 backdrop-blur-md border border-purple-200/80 dark:border-midnight-border shadow-sm hover:border-electric-purple/60 transition-all hover:bg-white dark:hover:bg-midnight-surface/95">
                <Shield className="w-4 h-4 text-electric-purple dark:text-lavender-glow mb-1.5" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Airtight IP & Security</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  Complete source code handover with strict NDAs.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-white/90 dark:bg-midnight-surface/80 backdrop-blur-md border border-purple-200/80 dark:border-midnight-border shadow-sm hover:border-electric-purple/60 transition-all hover:bg-white dark:hover:bg-midnight-surface/95">
                <Laptop className="w-4 h-4 text-electric-purple dark:text-lavender-glow mb-1.5" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Cloud First</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  AWS, Render, and Vercel multi-region failover.
                </p>
              </div>
            </div>

            {/* CTA Button - Compact */}
            <div className="pt-1">
              <button
                onClick={onStartProject}
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/45 hover:scale-[1.02] transition-all"
              >
                <span>Partner With CodeVerse Worldwide</span>
                <Globe className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
