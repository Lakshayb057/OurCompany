import React, { useState } from 'react';
import { 
  Sparkles, Check, Globe, ArrowRight, Shield, Zap, Layers, Server, 
  Calendar, Clock, ExternalLink 
} from 'lucide-react';
import { PlanPackage, PLANS_DATA, PLAN_CATEGORIES } from '../data/plansData';
import { PlanRegistrationModal } from './PlanRegistrationModal';

interface PlansSectionProps {
  onOpenPlansPage: () => void;
}

export const PlansSection: React.FC<PlansSectionProps> = ({ onOpenPlansPage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<PlanPackage | null>(null);

  // Filter plans based on category
  const filteredPlans = activeCategory === 'all'
    ? PLANS_DATA
    : PLANS_DATA.filter(p => p.category === activeCategory);

  // On home section, highlight top famous plans (up to 6)
  const displayPlans = filteredPlans.slice(0, 6);

  const handleRegisterClick = (plan: PlanPackage) => {
    setSelectedPlanForModal(plan);
    setRegisterModalOpen(true);
  };

  return (
    <section id="plans" className="py-12 sm:py-20 lg:py-28 relative overflow-hidden bg-white/70 dark:bg-midnight-900/70 border-t border-b border-light-border dark:border-midnight-border/60">
      
      {/* Ambient background decorative glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-electric-purple/10 dark:bg-electric-purple/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-lavender-glow/10 dark:bg-deep-violet/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-200/80 dark:border-white/10 text-electric-purple dark:text-lavender-light text-xs font-mono font-bold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Engineering Packages</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
            Engineering Plans & <span className="text-gradient-purple">Packages</span>
          </h2>

          <p className="text-sm sm:text-base text-light-subtext dark:text-muted-gray leading-relaxed max-w-2xl mx-auto">
            Transparent, production-grade engagement models tailored for early founders to scaling enterprises. Full source code ownership, zero lock-in, and direct founding engineering delivery.
          </p>

          {/* Currency Toggle */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="text-xs font-mono text-light-subtext dark:text-muted-gray">Currency:</span>
            <div className="inline-flex items-center p-1 rounded-full bg-purple-50 dark:bg-midnight-card border border-purple-200 dark:border-midnight-border shadow-sm text-xs font-mono font-bold">
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-3 py-1 rounded-full transition-all ${
                  currency === 'INR'
                    ? 'bg-electric-purple text-white shadow-md'
                    : 'text-light-subtext dark:text-gray-400 hover:text-electric-purple'
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-full transition-all ${
                  currency === 'USD'
                    ? 'bg-electric-purple text-white shadow-md'
                    : 'text-light-subtext dark:text-gray-400 hover:text-electric-purple'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        {/* Famous Category Tabs */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 no-scrollbar">
          {PLAN_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-electric-purple text-white shadow-md shadow-purple-600/30 ring-1 ring-purple-300'
                    : 'bg-white/80 dark:bg-midnight-card/80 border border-purple-100 dark:border-midnight-border text-light-subtext dark:text-gray-300 hover:text-electric-purple hover:border-purple-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Featured Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayPlans.map((plan) => {
            const price = currency === 'INR'
              ? `₹${plan.priceINR.toLocaleString('en-IN')}`
              : `$${plan.priceUSD.toLocaleString('en-US')}`;

            return (
              <div
                key={plan.id}
                className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 ${
                  plan.isPopular || plan.isBestValue
                    ? 'bg-gradient-to-b from-purple-50/90 via-white to-white dark:from-white/[0.08] dark:via-midnight-card dark:to-midnight-card border-2 border-electric-purple shadow-xl shadow-purple-600/10'
                    : 'bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border hover:border-purple-300 dark:hover:border-electric-purple/50 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Floating Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-white/10 text-electric-purple dark:text-lavender-light border border-purple-200 dark:border-white/10">
                    {plan.category.replace('-', ' ')}
                  </span>
                  {plan.badge && (
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      plan.isPopular
                        ? 'bg-electric-purple text-white shadow-sm'
                        : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Plan Title & Tagline */}
                <div className="space-y-1.5 mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-light-text dark:text-white group-hover:text-electric-purple transition-colors">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-light-subtext dark:text-muted-gray line-clamp-2 leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                {/* Pricing & Timeline Pill */}
                <div className="p-3.5 rounded-xl bg-purple-50/60 dark:bg-midnight-900/60 border border-purple-100 dark:border-midnight-border/70 mb-4 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-light-text dark:text-white">
                      {price}
                    </span>
                    <span className="text-[11px] font-mono text-light-subtext dark:text-muted-gray">
                      {plan.billingPeriod}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-light-subtext dark:text-muted-gray pt-1 border-t border-purple-100/60 dark:border-midnight-border/40">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-electric-purple" />
                      <span>{plan.turnaroundTime}</span>
                    </span>
                    <span className={`font-medium flex items-center gap-1 ${
                      plan.domainIncluded ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-500 dark:text-gray-400'
                    }`}>
                      <Globe className="w-3 h-3" />
                      <span>{plan.domainIncluded ? '1-Yr Domain Free' : 'Domain Optional'}</span>
                    </span>
                  </div>
                </div>

                {/* Features Highlights */}
                <div className="space-y-2 flex-1 mb-6">
                  <div className="text-[11px] font-mono uppercase text-light-subtext dark:text-gray-400 font-bold tracking-wider">
                    Core Specifications
                  </div>
                  <ul className="space-y-1.5">
                    {plan.features.slice(0, 4).map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-light-text dark:text-gray-200 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Register Button */}
                <button
                  type="button"
                  onClick={() => handleRegisterClick(plan)}
                  className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    plan.isPopular || plan.isBestValue
                      ? 'bg-electric-purple hover:bg-electric-purple/90 text-white shadow-md shadow-purple-600/25 hover:scale-[1.01]'
                      : 'bg-white dark:bg-midnight-card border border-purple-200 dark:border-white/15 text-electric-purple dark:text-lavender-glow hover:bg-purple-50 dark:hover:bg-white/5'
                  }`}
                >
                  <span>Register for Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner: "See More Plans" */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-100/80 via-lavender-soft/50 to-purple-50/80 dark:from-midnight-card dark:via-white/[0.04] dark:to-midnight-card border border-purple-200 dark:border-electric-purple/30 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-light-text dark:text-white">
              Need a Custom Scope, Specific Domain or Retainer?
            </h3>
            <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray max-w-xl">
              Explore our full catalog of single-page architectures, enterprise ERP packages, SLA tiers, and domain-bundled solutions on our dedicated Plans portal.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenPlansPage}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <span>See More Plans & Custom Packages</span>
            <ExternalLink className="w-4 h-4 ml-0.5" />
          </button>
        </div>

      </div>

      {/* Plan Registration Modal */}
      <PlanRegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        selectedPlan={selectedPlanForModal}
        currency={currency}
      />

    </section>
  );
};

