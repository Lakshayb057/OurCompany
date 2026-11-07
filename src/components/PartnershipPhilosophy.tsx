import React, { useState } from 'react';
import { Shield, Calculator, Check } from 'lucide-react';

export const PartnershipPhilosophy: React.FC = () => {
  const [testBudget, setTestBudget] = useState<number>(50000);

  const leadAmount = (testBudget * 30) / 100;
  const devAmount = (testBudget * 50) / 100;
  const companyAmount = (testBudget * 20) / 100;

  return (
    <section className="py-24 relative overflow-hidden bg-light-100/50 dark:bg-midnight-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Partnership Principles */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
              Aligned Incentives, <span className="text-gradient-purple">Zero Waste</span>
            </h2>

            <p className="text-light-subtext dark:text-muted-gray text-base leading-relaxed">
              Traditional agencies bury budgets in administrative bloat and opaque subcontracting. CodeVerse operates on a disciplined, transparent engineering framework where every dollar directly fuels product excellence.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border/80 flex items-start gap-3.5 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-lavender-soft text-electric-dark dark:bg-electric-purple/15 dark:text-lavender-glow flex items-center justify-center font-mono font-bold text-sm flex-shrink-0">
                  50%
                </div>
                <div>
                  <h4 className="text-sm font-bold text-light-text dark:text-white">Direct Engineering & Core Delivery</h4>
                  <p className="text-xs text-light-subtext dark:text-muted-gray mt-0.5">
                    The lion's share of resources is dedicated directly to senior full-stack development, code reviews, database architecture, and performance hardening.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border/80 flex items-start gap-3.5 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-lavender-soft text-electric-dark dark:bg-lavender-glow/15 dark:text-lavender-light flex items-center justify-center font-mono font-bold text-sm flex-shrink-0">
                  30%
                </div>
                <div>
                  <h4 className="text-sm font-bold text-light-text dark:text-white">Project Leadership & Client Success</h4>
                  <p className="text-xs text-light-subtext dark:text-muted-gray mt-0.5">
                    Continuous technical direction, milestone governance, daily alignment, and end-to-end project management.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border/80 flex items-start gap-3.5 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-lavender-soft text-electric-dark dark:bg-deep-violet/30 dark:text-lavender-muted flex items-center justify-center font-mono font-bold text-sm flex-shrink-0">
                  20%
                </div>
                <div>
                  <h4 className="text-sm font-bold text-light-text dark:text-white">Infrastructure, Tools & R&D Reserves</h4>
                  <p className="text-xs text-light-subtext dark:text-muted-gray mt-0.5">
                    High-availability cloud compute, automated testing suites, deployment tooling, and guaranteed reserve support.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-lavender-soft/40 dark:bg-midnight-card/40 border border-purple-200 dark:border-midnight-border/50 text-xs text-light-subtext dark:text-muted-gray flex items-center gap-2 font-mono">
              <Shield className="w-4 h-4 text-electric-purple flex-shrink-0" />
              <span>Strict 100% total validation enforced on every project milestone.</span>
            </div>
          </div>

          {/* Right Column: Interactive Allocation Simulator */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-purple-200 dark:border-electric-purple/30 shadow-2xl relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-electric-purple dark:text-lavender-glow font-bold">
                    Interactive Simulator
                  </span>
                  <h3 className="text-lg font-bold text-light-text dark:text-white">Milestone Allocation Model</h3>
                </div>
                <Calculator className="w-5 h-5 text-electric-purple" />
              </div>

              {/* Slider for Budget */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-light-subtext dark:text-muted-gray">Simulate Engagement Scope:</span>
                  <span className="text-light-text dark:text-white font-bold">${testBudget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="5000"
                  value={testBudget}
                  onChange={(e) => setTestBudget(Number(e.target.value))}
                  className="w-full accent-electric-purple bg-purple-100 dark:bg-midnight-border rounded-lg h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-light-subtext dark:text-muted-gray">
                  <span>$10,000 (Sprint MVP)</span>
                  <span>$200,000 (Enterprise Cloud)</span>
                </div>
              </div>

              {/* Allocation Breakdown Cards */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-light-surface dark:bg-midnight-card/90 border border-purple-200 dark:border-electric-purple/40 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-electric-dark dark:text-electric-light font-bold">Engineering (50%)</span>
                    <div className="text-xs text-light-subtext dark:text-muted-gray">Senior code & architecture</div>
                  </div>
                  <div className="text-base font-bold font-mono text-light-text dark:text-white">
                    ${devAmount.toLocaleString()}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-light-surface dark:bg-midnight-card/90 border border-purple-200 dark:border-lavender-glow/30 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-electric-purple dark:text-lavender-glow font-bold">Project Leadership (30%)</span>
                    <div className="text-xs text-light-subtext dark:text-muted-gray">Client direction & strategy</div>
                  </div>
                  <div className="text-base font-bold font-mono text-light-text dark:text-white">
                    ${leadAmount.toLocaleString()}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-light-surface dark:bg-midnight-card/90 border border-purple-200 dark:border-deep-violet/40 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-electric-purple/80 dark:text-lavender-muted font-bold">Cloud & Reserves (20%)</span>
                    <div className="text-xs text-light-subtext dark:text-muted-gray">Infrastructure & CI/CD tools</div>
                  </div>
                  <div className="text-base font-bold font-mono text-light-text dark:text-white">
                    ${companyAmount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="mt-6 pt-4 border-t border-light-border dark:border-midnight-border/70 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Validation: 100% Total Met</span>
                </span>
                <span className="text-light-subtext dark:text-muted-gray">SRS Sec. 10.4 Compliant</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
