import React from 'react';
import { Clock, Shield, Laptop, Globe } from 'lucide-react';

export const GlobalVision: React.FC<{ onStartProject: () => void }> = ({ onStartProject }) => {
  return (
    <section id="global" className="py-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-electric-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Full Container Background Glass Card */}
        <div className="relative rounded-3xl border border-purple-200/80 dark:border-electric-purple/40 overflow-hidden shadow-2xl bg-slate-950 group">
          
          {/* Complete Container Full-Bleed Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/global-vision.jpg"
              alt="Engineered Locally, Deployed Globally - 4K Photography"
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Dual Cinematic Gradients for 100% Text Legibility & Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />
            {/* Soft Ambient Purple Accent Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-electric-purple/20 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* All Content Layered Directly Over The Background Image */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-4xl space-y-6 sm:space-y-8">
            
            {/* Title - No "Global Delivery Model" badge */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Engineered Locally. <br />
              <span className="text-gradient-purple">Deployed Globally.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed max-w-2xl">
              CodeVerse is architected from day one for global delivery. Whether partnering with fast-moving startups in London, agritech pioneers in South Asia, or scale-ups in North America, we deliver frictionless remote collaboration backed by airtight SLAs.
            </p>

            {/* 3 Pillar Cards - High-contrast Frosted Glass */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/15 shadow-lg hover:border-electric-purple/60 transition-all hover:bg-black/55">
                <Clock className="w-5 h-5 text-lavender-glow mb-2.5" />
                <h4 className="text-sm font-bold text-white">Timezone Sync</h4>
                <p className="text-xs text-slate-300 mt-1 leading-snug">
                  Overlapping operational windows for real-time standups.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/15 shadow-lg hover:border-electric-purple/60 transition-all hover:bg-black/55">
                <Shield className="w-5 h-5 text-lavender-glow mb-2.5" />
                <h4 className="text-sm font-bold text-white">Airtight IP & Security</h4>
                <p className="text-xs text-slate-300 mt-1 leading-snug">
                  Complete source code handover with strict NDAs.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/15 shadow-lg hover:border-electric-purple/60 transition-all hover:bg-black/55">
                <Laptop className="w-5 h-5 text-lavender-glow mb-2.5" />
                <h4 className="text-sm font-bold text-white">Cloud First</h4>
                <p className="text-xs text-slate-300 mt-1 leading-snug">
                  AWS, Render, and Vercel cloud provisioning with multi-region failover.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onStartProject}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet text-white font-semibold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-purple-600/35 hover:shadow-purple-600/50 hover:scale-[1.02] transition-all"
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
