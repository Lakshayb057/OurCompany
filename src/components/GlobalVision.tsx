import React from 'react';
import { Clock, Shield, Laptop, Globe } from 'lucide-react';

export const GlobalVision: React.FC<{ onStartProject: () => void }> = ({ onStartProject }) => {
  return (
    <section id="global" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-purple-200 dark:border-electric-purple/30 relative overflow-hidden shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-electric-purple/10 dark:bg-electric-purple/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-light-text dark:text-white">
              Engineered Locally. <br />
              <span className="text-gradient-purple">Deployed Globally.</span>
            </h2>

            <p className="text-base text-light-subtext dark:text-muted-gray leading-relaxed max-w-prose">
              CodeVerse is architected from day one for global delivery. Whether partnering with fast-moving startups in London, agritech pioneers in South Asia, or scale-ups in North America, we deliver frictionless remote collaboration backed by airtight SLAs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white dark:bg-midnight-card/80 border border-purple-100 dark:border-midnight-border/70 shadow-sm">
                <Clock className="w-6 h-6 text-electric-purple mb-2" />
                <h4 className="text-sm font-bold text-light-text dark:text-white">Timezone Synchronized</h4>
                <p className="text-xs text-light-subtext dark:text-muted-gray mt-1">
                  Dedicated overlapping operational windows for seamless sprint reviews and standups.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-midnight-card/80 border border-purple-100 dark:border-midnight-border/70 shadow-sm">
                <Shield className="w-6 h-6 text-electric-purple mb-2" />
                <h4 className="text-sm font-bold text-light-text dark:text-white">Airtight IP & Security</h4>
                <p className="text-xs text-light-subtext dark:text-muted-gray mt-1">
                  Complete source code and intellectual property transfer with strict NDAs and git auditability.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-midnight-card/80 border border-purple-100 dark:border-midnight-border/70 shadow-sm">
                <Laptop className="w-6 h-6 text-electric-purple mb-2" />
                <h4 className="text-sm font-bold text-light-text dark:text-white">Cloud First Infrastructure</h4>
                <p className="text-xs text-light-subtext dark:text-muted-gray mt-1">
                  AWS, Render, and Vercel cloud provisioning with multi-region CDN and automated failover.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onStartProject}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-purple to-deep-violet text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/35 transition-all"
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
