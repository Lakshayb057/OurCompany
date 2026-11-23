import React, { useState, useEffect } from 'react';
import {
  Sparkles, Check, Globe, Shield, Clock, Search,
  ExternalLink, Layers, Zap, Server, Calendar, Filter,
  HelpCircle, CheckCircle2, MessageSquare, Terminal, FileText, CheckCircle
} from 'lucide-react';
import {
  PlanPackage, PLANS_DATA, PLAN_CATEGORIES,
  COMMERCIAL_TERMS, DOMAIN_HOSTING_POLICY, PACKAGE_COMPARISON_MATRIX
} from '../data/plansData';
import { PlanRegistrationModal } from './PlanRegistrationModal';

interface PlansPageProps {
  onBackToHome: () => void;
  plans?: PlanPackage[];
}

export const PlansPage: React.FC<PlansPageProps> = ({ onBackToHome, plans }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [domainFilter, setDomainFilter] = useState<'all' | 'with-domain' | 'without-domain'>('all');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [searchQuery, setSearchQuery] = useState('');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<PlanPackage | null>(null);
  const [clientInquiryData, setClientInquiryData] = useState<{ fullName?: string; email?: string } | null>(null);

  const basePlans = (plans && plans.length > 0) ? plans : PLANS_DATA;

  // Check if user came from the project inquiry form
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem('codrix_client_inquiry');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.fullName) {
          setClientInquiryData(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not read cached inquiry', e);
    }
    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filter plans based on category, domain, search, and visibility
  const filteredPlans = basePlans.filter((plan) => {
    // Visibility filter: hide plans toggled off in admin portal
    if (plan.isVisible === false) {
      return false;
    }
    // Category match
    if (activeCategory !== 'all') {
      if (activeCategory === 'website') {
        if (plan.category !== 'website' && plan.category !== 'single-page') return false;
      } else if (activeCategory === 'webapp') {
        if (plan.category !== 'webapp' && plan.category !== 'web-app') return false;
      } else if (activeCategory === 'ecommerce') {
        if (plan.category !== 'ecommerce') return false;
      } else if (activeCategory === 'enterprise') {
        if (plan.category !== 'enterprise' && plan.category !== 'software') return false;
      } else if (activeCategory === 'ai') {
        if (plan.category !== 'ai') return false;
      } else if (activeCategory === 'amc') {
        if (plan.category !== 'amc' && plan.category !== 'yearly') return false;
      } else if (plan.category !== activeCategory) {
        return false;
      }
    }
    // Domain match
    if (domainFilter === 'with-domain' && !plan.domainIncluded) {
      return false;
    }
    if (domainFilter === 'without-domain' && plan.domainIncluded) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = plan.name.toLowerCase().includes(q);
      const matchDesc = plan.description.toLowerCase().includes(q);
      const matchTagline = plan.tagline.toLowerCase().includes(q);
      const matchIdeal = plan.idealFor.toLowerCase().includes(q);
      const matchTech = plan.techStack.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTagline && !matchTech && !matchIdeal) {
        return false;
      }
    }
    return true;
  });

  const handleRegisterClick = (plan: PlanPackage) => {
    setSelectedPlanForModal(plan);
    setRegisterModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-32 pb-12 sm:pb-24 bg-light-100/60 dark:bg-midnight-900/60 relative overflow-hidden transition-colors duration-300">

      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric-purple/5 dark:bg-electric-purple/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-lavender-glow/5 dark:bg-deep-violet/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">

        {/* Top Controls: Currency Switcher & Return */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-light-subtext dark:text-gray-400 hover:text-electric-purple transition-colors cursor-pointer"
          >
            <span>← Return to Home</span>
          </button>

          <div className="inline-flex items-center p-1 rounded-full bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border shadow-sm text-xs font-mono font-bold">
            <button
              type="button"
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${currency === 'INR'
                  ? 'bg-electric-purple text-white shadow-md'
                  : 'text-light-subtext dark:text-gray-400 hover:text-electric-purple'
                }`}
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${currency === 'USD'
                  ? 'bg-electric-purple text-white shadow-md'
                  : 'text-light-subtext dark:text-gray-400 hover:text-electric-purple'
                }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Notification Banner if User Came from Inquiry */}
        {clientInquiryData && (
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between gap-3 text-xs sm:text-sm text-electric-purple dark:text-lavender-light">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 flex-shrink-0 animate-pulse" />
              <span>
                Welcome, <strong>{clientInquiryData.fullName}</strong>. Select a production package below to link directly with your inquiry specifications.
              </span>
            </div>
            <button
              onClick={() => setClientInquiryData(null)}
              className="text-xs font-mono text-light-subtext dark:text-gray-400 hover:text-light-text dark:hover:text-white cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Hero Title & Value Proposition */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-white/10 text-electric-purple dark:text-lavender-light text-xs font-mono font-semibold">
            <span>ENGINEERING ENGAGEMENT PACKAGES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-light-text dark:text-white">
            Transparent Pricing & <span className="text-gradient-purple">Packages</span>
          </h1>

          <p className="text-sm sm:text-base text-light-subtext dark:text-muted-gray max-w-2xl mx-auto leading-relaxed">
            From single-page web storefronts with domain bundles to full-scale SaaS platforms, AI systems, and annual retainers. Full source code ownership, zero agency bloat, and direct founding engineering.
          </p>
        </div>

        {/* Control Bar: Categories, Domain Toggle & Search */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border shadow-lg space-y-4">

          {/* Category Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {PLAN_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${isActive
                      ? 'bg-electric-purple text-white shadow-md shadow-purple-600/30 ring-1 ring-purple-300'
                      : 'bg-light-100 dark:bg-midnight-900 border border-purple-100/60 dark:border-midnight-border/70 text-light-subtext dark:text-gray-300 hover:text-electric-purple'
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sub-Filters: Domain Filter + Search Input */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-light-border dark:border-midnight-border/50">

            {/* Domain Option Segmented Control */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-xs font-mono text-light-subtext dark:text-gray-400 flex items-center gap-1 mr-1">
                <Globe className="w-3.5 h-3.5 text-electric-purple" />
                <span>Domain:</span>
              </span>
              <div className="inline-flex p-1 rounded-xl bg-light-100 dark:bg-midnight-900 border border-purple-100 dark:border-midnight-border text-xs font-medium w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setDomainFilter('all')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${domainFilter === 'all'
                      ? 'bg-white dark:bg-white/10 text-electric-purple dark:text-white font-bold shadow-sm'
                      : 'text-light-subtext dark:text-gray-400'
                    }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setDomainFilter('with-domain')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${domainFilter === 'with-domain'
                      ? 'bg-white dark:bg-white/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                      : 'text-light-subtext dark:text-gray-400'
                    }`}
                >
                  With Domain Included
                </button>
                <button
                  type="button"
                  onClick={() => setDomainFilter('without-domain')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${domainFilter === 'without-domain'
                      ? 'bg-white dark:bg-white/10 text-electric-purple dark:text-white font-bold shadow-sm'
                      : 'text-light-subtext dark:text-gray-400'
                    }`}
                >
                  Without Domain
                </button>
              </div>
            </div>

            {/* Keyword Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-light-subtext dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search plans by keyword, tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-light-100 dark:bg-midnight-900 border border-purple-100 dark:border-midnight-border focus:border-electric-purple focus:outline-none text-xs sm:text-sm text-light-text dark:text-white shadow-inner"
              />
            </div>

          </div>
        </div>

        {/* Catalog Plans Grid */}
        {filteredPlans.length === 0 ? (
          <div className="py-16 text-center space-y-3 p-8 rounded-3xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border">
            <Filter className="w-8 h-8 text-light-subtext dark:text-gray-500 mx-auto opacity-50" />
            <h3 className="text-lg font-bold text-light-text dark:text-white">No plans match your current filters</h3>
            <p className="text-xs text-light-subtext dark:text-muted-gray max-w-sm mx-auto">
              Try adjusting your category selection, domain toggle, or search query to view available packages.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDomainFilter('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-electric-purple text-white text-xs font-semibold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredPlans.map((plan) => {
              const price = currency === 'INR'
                ? `${plan.startingPrice ? 'Starting ' : ''}₹${plan.priceINR.toLocaleString('en-IN')}${plan.billingCycle ? ` ${plan.billingCycle}` : ''}`
                : `${plan.startingPrice ? 'Starting ' : ''}$${plan.priceUSD.toLocaleString('en-US')}${plan.billingCycle ? ` ${plan.billingCycle}` : ''}`;

              const categoryBadgeLabels: Record<string, string> = {
                website: 'Website Development',
                webapp: 'Web Application',
                ecommerce: 'E-Commerce',
                enterprise: 'Enterprise Software',
                ai: 'AI & Automation',
                amc: 'Annual Retainer (AMC)',
                'single-page': 'Website Development',
                'web-app': 'Web Application',
                software: 'Enterprise Software',
                yearly: 'Annual Retainer'
              };

              return (
                <div
                  key={plan.id}
                  className={`group relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 ${plan.isPopular || plan.isBestValue
                      ? 'bg-gradient-to-b from-purple-50/90 via-white to-white dark:from-white/[0.08] dark:via-midnight-card dark:to-midnight-card border-2 border-electric-purple shadow-xl shadow-purple-600/15'
                      : 'bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border hover:border-purple-300 dark:hover:border-electric-purple/50 shadow-md hover:shadow-xl'
                    }`}
                >
                  {/* Top Badges */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-white/10 text-electric-purple dark:text-lavender-light border border-purple-200 dark:border-white/10">
                        {categoryBadgeLabels[plan.category] || plan.category}
                      </span>
                      {plan.badge && (
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${plan.isPopular
                            ? 'bg-electric-purple text-white shadow-sm'
                            : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          }`}>
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-light-text dark:text-white leading-tight">
                      {plan.name}
                    </h3>

                    <p className="text-xs text-light-subtext dark:text-muted-gray mt-1 leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price & Turnaround Box */}
                  <div className="my-5 p-4 rounded-2xl bg-purple-50/70 dark:bg-midnight-900/80 border border-purple-100 dark:border-midnight-border space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl sm:text-3xl font-extrabold font-mono text-light-text dark:text-white tracking-tight">
                        {price}
                      </span>
                      <span className="text-xs font-mono text-light-subtext dark:text-muted-gray font-medium">
                        {plan.billingPeriod}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-purple-100 dark:border-midnight-border/50 flex flex-col gap-1.5 text-xs font-mono text-light-subtext dark:text-gray-300">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-light-subtext dark:text-gray-400">
                          <Clock className="w-3.5 h-3.5 text-electric-purple" />
                          <span>Delivery Timeline:</span>
                        </span>
                        <span className="font-bold text-light-text dark:text-white">{plan.turnaroundTime}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-light-subtext dark:text-gray-400">
                          <Globe className="w-3.5 h-3.5 text-electric-purple" />
                          <span>Domain Status:</span>
                        </span>
                        <span className={`font-bold ${plan.domainIncluded ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-gray-400'}`}>
                          {plan.domainIncluded ? 'Domain Included' : 'Domain Optional'}
                        </span>
                      </div>

                      {/* Domain Note Alert */}
                      {plan.domainNote && (
                        <div className="text-[11px] font-sans text-purple-700 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-950/40 p-2 rounded-lg mt-1 border border-purple-200/60 dark:border-purple-800/40">
                          {plan.domainNote}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ideal For Callout */}
                  <div className="mb-4 p-3 rounded-xl bg-light-100/80 dark:bg-midnight-900/50 border border-purple-50 dark:border-midnight-border/60">
                    <div className="text-[10px] font-mono uppercase text-light-subtext dark:text-gray-400 font-bold mb-1">
                      Ideal For:
                    </div>
                    <div className="text-xs text-light-text dark:text-gray-300 leading-snug">
                      {plan.idealFor}
                    </div>
                  </div>

                  {/* Core Features List */}
                  <div className="space-y-4 flex-1 mb-6">
                    <div>
                      <div className="text-[11px] font-mono uppercase text-light-subtext dark:text-gray-400 font-bold tracking-wider mb-2">
                        Included Features & Architecture
                      </div>
                      <ul className="space-y-1.5">
                        {plan.features.slice(0, 6).map((feat, fIdx) => (
                          <li key={fIdx} className="text-xs text-light-text dark:text-gray-200 flex items-start gap-2 leading-snug">
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                        {plan.features.length > 6 && (
                          <li className="text-[11px] font-mono text-electric-purple dark:text-lavender-light pl-5">
                            + {plan.features.length - 6} more included features
                          </li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <div className="text-[11px] font-mono uppercase text-light-subtext dark:text-gray-400 font-bold tracking-wider mb-2">
                        Handoff Deliverables
                      </div>
                      <ul className="space-y-1.5">
                        {plan.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="text-xs text-light-subtext dark:text-gray-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-electric-purple mt-1.5 flex-shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="pt-2">
                      <div className="text-[10px] font-mono uppercase text-light-subtext dark:text-gray-400 font-semibold mb-1.5">
                        Stack Architecture:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {plan.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-50 dark:bg-white/5 border border-purple-100 dark:border-white/10 text-light-subtext dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Register Plan Action Button */}
                  <button
                    type="button"
                    onClick={() => handleRegisterClick(plan)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${plan.isPopular || plan.isBestValue
                        ? 'bg-electric-purple hover:bg-electric-purple/90 text-white shadow-lg shadow-purple-600/30 hover:scale-[1.01]'
                        : 'bg-white dark:bg-midnight-card border border-purple-200 dark:border-white/15 text-electric-purple dark:text-lavender-glow hover:bg-purple-50 dark:hover:bg-white/5'
                      }`}
                  >
                    <span>Register for This Plan</span>
                    <Sparkles className="w-4 h-4 ml-0.5" />
                  </button>

                </div>
              );
            })}
          </div>
        )}

        {/* DOMAIN & HOSTING PRICING POLICY SECTION */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-white/10 text-electric-purple dark:text-lavender-light text-xs font-mono font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>INFRASTRUCTURE TRANSPARENCY</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-light-text dark:text-white">
              Domain & Hosting Pricing Policy
            </h3>
            <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray">
              Transparent terms regarding 1-year free hosting, standard domain allowances, and external cloud infrastructure.
            </p>
          </div>

          {/* Business Website Special Highlight Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 via-electric-purple/5 to-transparent border border-electric-purple/30 max-w-3xl mx-auto space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold text-sm text-electric-purple dark:text-lavender-light uppercase font-mono tracking-wider">
                Featured Option: Business Website
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-electric-purple text-white">
                1-Year Domain + Hosting Included
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-xl bg-white dark:bg-midnight-900 border border-purple-100 dark:border-midnight-border">
                <div className="text-xs text-light-subtext dark:text-muted-gray">Without Domain</div>
                <div className="text-xl font-black font-mono text-light-text dark:text-white mt-1">₹17,999</div>
                <div className="text-[11px] text-light-subtext dark:text-gray-400 mt-0.5">Setup on your existing domain</div>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-midnight-900 border border-purple-100 dark:border-midnight-border">
                <div className="text-xs text-light-subtext dark:text-muted-gray">Standard Domain Allowance</div>
                <div className="text-xl font-black font-mono text-electric-purple dark:text-lavender-glow mt-1">₹2,000</div>
                <div className="text-[11px] text-light-subtext dark:text-gray-400 mt-0.5">Estimated registration cost</div>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-midnight-800 border-2 border-electric-purple">
                <div className="text-xs text-electric-purple dark:text-lavender-light font-bold">Total With Domain</div>
                <div className="text-xl font-black font-mono text-electric-purple dark:text-white mt-1">₹19,999</div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">Domain + 1-Yr Hosting</div>
              </div>
            </div>
            <p className="text-[11px] text-light-subtext dark:text-gray-400 leading-relaxed text-center">
              *The domain allowance is capped at ₹2,000. If the chosen custom domain exceeds this threshold, the client covers the difference. Free hosting applies to eligible deployment infrastructure within agreed usage limits.
            </p>
          </div>

          {/* Hosting Policy Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-purple-200 dark:border-midnight-border font-mono text-light-subtext dark:text-gray-400">
                  <th className="py-3 px-3">Service</th>
                  <th className="py-3 px-3">Recommended Policy</th>
                  <th className="py-3 px-3 text-right">Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100 dark:divide-midnight-border/50 text-light-text dark:text-gray-200 font-medium">
                {DOMAIN_HOSTING_POLICY.map((row, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/40 dark:hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-semibold">{row.service}</td>
                    <td className="py-3 px-3 text-light-subtext dark:text-gray-300">{row.policy}</td>
                    <td className="py-3 px-3 text-right font-mono text-electric-purple dark:text-lavender-light font-bold">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PACKAGE COMPARISON MATRIX */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-white/10 text-electric-purple dark:text-lavender-light text-xs font-mono font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>CROSS-PACKAGE BENCHMARK</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-light-text dark:text-white">
              Package Comparison Matrix
            </h3>
            <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray">
              Compare prices, turnaround timelines, hosting, and complimentary support across all 14 engineering packages.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-purple-200 dark:border-midnight-border font-mono text-light-subtext dark:text-gray-400">
                  <th className="py-3 px-3">Package Name</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price (INR)</th>
                  <th className="py-3 px-3">Timeline</th>
                  <th className="py-3 px-3">Hosting</th>
                  <th className="py-3 px-3">Domain</th>
                  <th className="py-3 px-3 text-right">Support</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100 dark:divide-midnight-border/50 text-light-text dark:text-gray-200 font-medium">
                {PACKAGE_COMPARISON_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/40 dark:hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-semibold text-light-text dark:text-white">{row.package}</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-electric-purple dark:text-lavender-light">{row.category}</td>
                    <td className="py-3 px-3 font-mono font-bold">{row.priceINR}</td>
                    <td className="py-3 px-3 text-light-subtext dark:text-gray-300">{row.timeline}</td>
                    <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-medium">{row.hosting}</td>
                    <td className="py-3 px-3 text-light-subtext dark:text-gray-300 text-xs">{row.domain}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-electric-purple">{row.support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* IMPORTANT COMMERCIAL TERMS SECTION */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-white/10 text-electric-purple dark:text-lavender-light text-xs font-mono font-semibold">
              <FileText className="w-3.5 h-3.5" />
              <span>LEGAL & GOVERNANCE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-light-text dark:text-white">
              Important Commercial Terms for CodRix
            </h3>
            <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray">
              Transparent governing principles protecting both client deliverables and engineering integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMMERCIAL_TERMS.map((term) => (
              <div
                key={term.number}
                className="p-4 sm:p-5 rounded-2xl bg-light-100/60 dark:bg-midnight-900/60 border border-purple-100 dark:border-midnight-border/60 flex items-start gap-3.5"
              >
                <span className="w-7 h-7 rounded-xl bg-electric-purple/10 dark:bg-white/10 text-electric-purple dark:text-lavender-light font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-purple-200 dark:border-white/10">
                  {term.number}
                </span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-light-text dark:text-white">
                    {term.title}
                  </h4>
                  <p className="text-xs text-light-subtext dark:text-muted-gray leading-relaxed">
                    {term.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet text-white text-center space-y-5 shadow-2xl shadow-purple-600/30">
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
            Ready to Engineer Your Platform with Codrix?
          </h3>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl mx-auto leading-relaxed">
            Every partnership begins with a direct technical discovery call with our founding team. Lock in your sprint today with complete intellectual property handover.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                const p = basePlans[1] || basePlans[0];
                setSelectedPlanForModal(p);
                setRegisterModalOpen(true);
              }}
              className="px-6 py-3.5 rounded-xl bg-white text-electric-purple font-extrabold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
              Register for a Plan Now
            </button>
            <button
              onClick={onBackToHome}
              className="px-6 py-3.5 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Return to Main Site
            </button>
          </div>
        </div>

      </div>

      {/* Plan Registration Modal */}
      <PlanRegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        selectedPlan={selectedPlanForModal}
        currency={currency}
      />

    </div>
  );
};
