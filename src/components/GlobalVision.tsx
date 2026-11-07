import React from 'react';
import { Clock, Shield, Laptop, Globe } from 'lucide-react';

export const GlobalVision: React.FC<{ onStartProject: () => void }> = ({ onStartProject }) => {
  return (
    <section id="global" className="py-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-electric-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Glass Panel Container with Portrait DSLR Photography Integration */}
        <div className="relative rounded-3xl border border-purple-200/80 dark:border-electric-purple/35 overflow-hidden shadow-2xl bg-white/85 dark:bg-midnight-card/80 backdrop-blur-xl">
          
          {/* Subtle Ambient Background Watermark Fill */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 dark:opacity-15 mix-blend-luminosity">
            <img
              src="/global-vision.jpg"
              alt="Engineered Locally Deployed Globally"
              className="w-full h-full object-cover object-right filter blur-sm scale-105"
            />
          </div>

          {/* Foreground Content: 2-Column Responsive Layout */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Context, Narrative & Pillars */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-purple/10 dark:bg-electric-purple/20 border border-electric-purple/20 text-electric-purple dark:text-lavender-glow text-xs font-semibold uppercase tracking-wider mb-3">
                    Global Delivery Model
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-light-text dark:text-white leading-[1.15]">
                    Engineered Locally. <br />
                    <span className="text-gradient-purple">Deployed Globally.</span>
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-light-subtext dark:text-muted-gray leading-relaxed max-w-prose">
                  CodeVerse is architected from day one for global delivery. Whether partnering with fast-moving startups in London, agritech pioneers in South Asia, or scale-ups in North America, we deliver frictionless remote collaboration backed by airtight SLAs.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                  <div className="p-4 rounded-2xl bg-white/90 dark:bg-midnight-surface/85 border border-purple-100 dark:border-midnight-border shadow-sm hover:border-electric-purple/50 transition-colors">
                    <Clock className="w-5 h-5 text-electric-purple mb-2" />
                    <h4 className="text-xs sm:text-sm font-bold text-light-text dark:text-white">Timezone Sync</h4>
                    <p className="text-[11px] sm:text-xs text-light-subtext dark:text-muted-gray mt-1 leading-snug">
                      Overlapping operational windows for real-time standups.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/90 dark:bg-midnight-surface/85 border border-purple-100 dark:border-midnight-border shadow-sm hover:border-electric-purple/50 transition-colors">
                    <Shield className="w-5 h-5 text-electric-purple mb-2" />
                    <h4 className="text-xs sm:text-sm font-bold text-light-text dark:text-white">Airtight IP & Security</h4>
                    <p className="text-[11px] sm:text-xs text-light-subtext dark:text-muted-gray mt-1 leading-snug">
                      Complete source code handover with strict NDAs.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/90 dark:bg-midnight-surface/85 border border-purple-100 dark:border-midnight-border shadow-sm hover:border-electric-purple/50 transition-colors">
                    <Laptop className="w-5 h-5 text-electric-purple mb-2" />
                    <h4 className="text-xs sm:text-sm font-bold text-light-text dark:text-white">Cloud First</h4>
                    <p className="text-[11px] sm:text-xs text-light-subtext dark:text-muted-gray mt-1 leading-snug">
                      AWS, Render, and Vercel cloud provisioning with multi-region failover.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onStartProject}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.02] transition-all"
                  >
                    <span>Partner With CodeVerse Worldwide</span>
                    <Globe className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              {/* Right Column: 4K Portrait Real DSLR Photography Showcase */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-200/90 dark:border-electric-purple/50 group">
                  <img
                    src="/global-vision.jpg"
                    alt="Engineered Locally, Deployed Globally - 4K DSLR Photography"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Atmospheric Gradient for Lighting Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                  {/* Delicate Glass Rim Highlight */}
                  <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none" />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
