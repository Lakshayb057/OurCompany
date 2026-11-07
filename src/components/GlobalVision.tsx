import React from 'react';
import { Clock, Shield, Laptop, Globe } from 'lucide-react';

export const GlobalVision: React.FC<{ onStartProject: () => void }> = ({ onStartProject }) => {
  return (
    <section id="global" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-electric-purple/10 dark:bg-electric-purple/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Reduced outer width for a more compact, refined card presence */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Full Container Background Glass Card - Compact Sizing */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-purple-200/80 dark:border-electric-purple/40 overflow-hidden shadow-xl shadow-purple-500/10 dark:shadow-purple-950/40 bg-white dark:bg-midnight-card group transition-colors duration-500">
          
          {/* Complete Container Full-Bleed Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/global-vision.jpg"
              alt="Engineered Locally, Deployed Globally - 4K Photography"
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105 opacity-85 sm:opacity-95 dark:opacity-85"
            />
            {/* Light Mode Gradients - Gentle left-side text scrim, leaving the photograph beautifully visible across the container */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 via-50% to-white/15 dark:hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/20 dark:hidden" />
            
            {/* Dark Mode Gradients */}
            <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-midnight-950/95 via-midnight-950/85 to-midnight-950/55" />
            <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-transparent to-midnight-950/40" />
            
            {/* Ambient Purple Accent Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-electric-purple/15 dark:bg-electric-purple/25 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* All Content Layered Directly Over The Background Image - Compact Padding & Typography */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-3xl space-y-4 sm:space-y-5">
            
            {/* Title - Compact Scale */}
            <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.15] transition-colors">
              Engineered Locally. <br />
              <span className="text-gradient-purple">Deployed Globally.</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-muted-gray leading-relaxed max-w-xl font-medium transition-colors">
              CodeVerse is architected from day one for global delivery. Whether partnering with fast-moving startups in London, agritech pioneers in South Asia, or scale-ups in North America, we deliver frictionless remote collaboration backed by airtight SLAs.
            </p>

            {/* 3 Pillar Cards - Compact Frosted Glass */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 sm:p-3.5 rounded-xl bg-white/90 dark:bg-midnight-surface/85 backdrop-blur-md border border-purple-200/80 dark:border-midnight-border shadow-sm hover:border-electric-purple/60 transition-all hover:bg-white dark:hover:bg-midnight-surface/95">
                <Clock className="w-4.5 h-4.5 text-electric-purple dark:text-lavender-glow mb-1.5" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Timezone Sync</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  Overlapping operational windows for real-time standups.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-white/90 dark:bg-midnight-surface/85 backdrop-blur-md border border-purple-200/80 dark:border-midnight-border shadow-sm hover:border-electric-purple/60 transition-all hover:bg-white dark:hover:bg-midnight-surface/95">
                <Shield className="w-4.5 h-4.5 text-electric-purple dark:text-lavender-glow mb-1.5" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Airtight IP & Security</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  Complete source code handover with strict NDAs.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-white/90 dark:bg-midnight-surface/80 backdrop-blur-md border border-purple-200/80 dark:border-midnight-border shadow-sm hover:border-electric-purple/60 transition-all hover:bg-white dark:hover:bg-midnight-surface/95">
                <Laptop className="w-4.5 h-4.5 text-electric-purple dark:text-lavender-glow mb-1.5" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Cloud First</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  AWS, Render, and Vercel cloud provisioning with multi-region failover.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-1">
              <button
                onClick={onStartProject}
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/45 hover:scale-[1.02] transition-all"
              >
                <span>Partner With CodeVerse Worldwide</span>
                <Globe className="w-4 h-4 ml-1" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
