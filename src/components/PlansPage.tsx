import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Sparkles, Check, Globe, Shield, Clock, Search, 
  ExternalLink, Layers, Zap, Server, Calendar, Filter, ChevronDown, 
  HelpCircle, CheckCircle2, MessageSquare, Terminal 
} from 'lucide-react';
import { PlanPackage, PLANS_DATA, PLAN_CATEGORIES } from '../data/plansData';
import { PlanRegistrationModal } from './PlanRegistrationModal';

interface PlansPageProps {
  onBackToHome: () => void;
}

export const PlansPage: React.FC<PlansPageProps> = ({ onBackToHome }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [domainFilter, setDomainFilter] = useState<'all' | 'with-domain' | 'without-domain'>('all');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [searchQuery, setSearchQuery] = useState('');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<PlanPackage | null>(null);
  const [clientInquiryData, setClientInquiryData] = useState<{ fullName?: string; email?: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Check if user came from the project inquiry form
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem('codeverse_client_inquiry');
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

  // Filter plans
  const filteredPlans = PLANS_DATA.filter((plan) => {
    // Category match
    if (activeCategory !== 'all' && plan.category !== activeCategory) {
      return false;
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
      const matchTech = plan.techStack.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTagline && !matchTech) {
        return false;
      }
    }
    return true;
  });

  const handleRegisterClick = (plan: PlanPackage) => {
    setSelectedPlanForModal(plan);
    setRegisterModalOpen(true);
  };

  const faqs = [
    {
      q: 'How does the domain inclusion option work?',
      a: 'Plans marked "With Domain Included" provide full registration and configuration of a top-level domain (e.g. .com, .in, .tech) for 1 full year, including DNS routing, Cloudflare CDN protection, and SSL encryption. If you already own a domain, we configure it to point to your new platform at no additional cost.'
    },
    {
      q: 'Do I get 100% intellectual property (IP) and source code ownership?',
      a: 'Yes, unconditionally. Upon final milestone deployment, full copyright, repository ownership (GitHub / GitLab), and production infrastructure keys are transferred directly to your organization. CodeVerse maintains zero proprietary lock-in.'
    },
    {
      q: 'What is the onboarding process after I register for a plan?',
      a: 'Within 24 hours of registering, our founding technical leadership coordinates directly with you to sign a mutual NDA, confirm architectural specifications, and deliver an interactive sprint roadmap with transparent deliverables.'
    },
    {
      q: 'Can I customize any of these plans or split payments into milestones?',
      a: 'Absolutely. We typically structure projects into milestone tranches (e.g. 40% discovery & prototyping, 40% engineering, 20% QA & handover). Custom feature additions or third-party API integrations can be tailored to your sprint.'
    },
    {
      q: 'What ongoing maintenance is provided post-handover?',
      a: 'All plans include 30 to 120 days of complimentary hypercare bugfix support. For ongoing updates, 24/7 server uptime guarantees, and security patch monitoring, you can also opt for our Yearly Retainer (AMC) packages.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 sm:pt-32 pb-12 sm:pb-24 bg-light-100/60 dark:bg-midnight-900/60 relative overflow-hidden transition-colors duration-300">
      
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric-purple/5 dark:bg-electric-purple/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-lavender-glow/5 dark:bg-deep-violet/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        
        {/* Navigation Breadcrumb & Controls (Matches Projects & Services page) */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => onBackToHome()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-midnight-card/80 border border-purple-200/70 dark:border-midnight-border text-xs sm:text-sm font-semibold text-light-text dark:text-white hover:text-electric-purple dark:hover:text-lavender-glow shadow-sm hover:shadow transition-all group"
          >
            <ArrowLeft className="w-4 h-4 text-electric-purple group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <div className="inline-flex items-center p-1 rounded-full bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border shadow-sm text-xs font-mono font-bold">
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

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-light-subtext dark:text-muted-gray">
              <button onClick={() => onBackToHome()} className="hover:text-electric-purple transition-colors">Home</button>
              <span>/</span>
              <span className="text-electric-purple dark:text-lavender-glow font-bold">Plans & Packages</span>
            </div>
          </div>
        </div>

        {/* Welcome Notification if redirected from Inquiry */}
        {clientInquiryData && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-purple-50 to-emerald-50 dark:from-emerald-950/40 dark:via-midnight-card dark:to-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 shadow-lg flex items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-light-text dark:text-white">
                  Welcome, {clientInquiryData.fullName || 'Valued Partner'}! Your Inquiry Parameters Have Been Saved.
                </h4>
                <p className="text-xs text-light-subtext dark:text-muted-gray mt-0.5">
                  Select your preferred package below to link your project specs and lock in your delivery sprint.
                </p>
              </div>
            </div>
            <button
              onClick={() => setClientInquiryData(null)}
              className="text-xs font-mono text-light-subtext dark:text-gray-400 hover:text-light-text dark:hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Hero Title & Value Proposition */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-electric-purple dark:text-lavender-light text-xs font-mono font-bold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Standardized Scope • Guaranteed Execution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-light-text dark:text-white">
            Engineering Plans & <span className="text-gradient-purple">Packages</span>
          </h1>

          <p className="text-sm sm:text-base text-light-subtext dark:text-muted-gray max-w-2xl mx-auto leading-relaxed">
            From single-page web storefronts with domain bundles to full-scale enterprise ERP systems and 24/7 SLA retainers. Choose your model or customize your scope with our founding engineers.
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
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                    isActive
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
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    domainFilter === 'all'
                      ? 'bg-white dark:bg-white/10 text-electric-purple dark:text-white font-bold shadow-sm'
                      : 'text-light-subtext dark:text-gray-400'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setDomainFilter('with-domain')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    domainFilter === 'with-domain'
                      ? 'bg-white dark:bg-white/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                      : 'text-light-subtext dark:text-gray-400'
                  }`}
                >
                  With Domain Included
                </button>
                <button
                  type="button"
                  onClick={() => setDomainFilter('without-domain')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    domainFilter === 'without-domain'
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
              Try adjusting your category selection, domain toggle, or search query to see available packages.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDomainFilter('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-electric-purple text-white text-xs font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPlans.map((plan) => {
              const price = currency === 'INR'
                ? `₹${plan.priceINR.toLocaleString('en-IN')}`
                : `$${plan.priceUSD.toLocaleString('en-US')}`;

              return (
                <div
                  key={plan.id}
                  className={`flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 relative ${
                    plan.isPopular || plan.isBestValue
                      ? 'bg-gradient-to-b from-purple-50 via-white to-white dark:from-white/[0.08] dark:via-midnight-card dark:to-midnight-card border-2 border-electric-purple shadow-2xl shadow-purple-600/15'
                      : 'bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border hover:border-purple-300 dark:hover:border-electric-purple/50 shadow-lg hover:shadow-2xl'
                  }`}
                >
                  {/* Top Header Tag */}
                  <div>
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
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-light-text dark:text-white tracking-tight">
                        {price}
                      </span>
                      <span className="text-xs font-mono text-light-subtext dark:text-muted-gray font-medium">
                        {plan.billingPeriod}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-purple-100 dark:border-midnight-border/50 flex flex-col gap-1 text-xs font-mono text-light-subtext dark:text-gray-300">
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
                          {plan.domainIncluded ? '1-Year Included' : 'Excluded / Optional'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Core Features List */}
                  <div className="space-y-4 flex-1 mb-6">
                    <div>
                      <div className="text-[11px] font-mono uppercase text-light-subtext dark:text-gray-400 font-bold tracking-wider mb-2">
                        Included Features & Architecture
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feat, fIdx) => (
                          <li key={fIdx} className="text-xs text-light-text dark:text-gray-200 flex items-start gap-2 leading-snug">
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
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
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      plan.isPopular || plan.isBestValue
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

        {/* Feature Comparison Matrix Section */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-light-text dark:text-white">
              Package Deliverable Matrix
            </h3>
            <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray">
              Direct comparison of what each tier provides from discovery to post-launch handover.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-purple-200 dark:border-midnight-border font-mono text-light-subtext dark:text-gray-400">
                  <th className="py-3 px-3">Specification / Deliverable</th>
                  <th className="py-3 px-3">Single Page</th>
                  <th className="py-3 px-3">Web App MVP</th>
                  <th className="py-3 px-3">Enterprise Software</th>
                  <th className="py-3 px-3">Yearly Retainer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100 dark:divide-midnight-border/50 text-light-text dark:text-gray-200 font-medium">
                <tr>
                  <td className="py-3 px-3 font-semibold">100% Full Source IP Transfer</td>
                  <td className="py-3 px-3 text-emerald-500 font-bold">✓ Included</td>
                  <td className="py-3 px-3 text-emerald-500 font-bold">✓ Included</td>
                  <td className="py-3 px-3 text-emerald-500 font-bold">✓ Included</td>
                  <td className="py-3 px-3 text-emerald-500 font-bold">✓ Included</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold">Custom Domain & SSL Setup</td>
                  <td className="py-3 px-3 text-emerald-500">✓ 1-Yr Free (.com)</td>
                  <td className="py-3 px-3 text-emerald-500">✓ 1-Yr Free (.com/.io)</td>
                  <td className="py-3 px-3 text-emerald-500">✓ 1-Yr Free Enterprise</td>
                  <td className="py-3 px-3 text-emerald-500">✓ Managed Renewal</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold">Database Persistence (ACID)</td>
                  <td className="py-3 px-3 text-slate-400">Static / CMS API</td>
                  <td className="py-3 px-3 text-emerald-500 font-bold">✓ MongoDB / PostgreSQL</td>
                  <td className="py-3 px-3 text-emerald-500 font-bold">✓ Dedicated VPC DB</td>
                  <td className="py-3 px-3 text-emerald-500 font-bold">✓ HA Cluster Backups</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold">User Authentication & RBAC</td>
                  <td className="py-3 px-3 text-slate-400">Optional Lead Gate</td>
                  <td className="py-3 px-3 text-emerald-500 font-bold">✓ JWT / OAuth2</td>
                  <td className="py-3 px-3 text-emerald-500 font-bold">✓ Multi-Role Hierarchies</td>
                  <td className="py-3 px-3 text-emerald-500 font-bold">✓ Security Audits</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold">CI/CD Automated Deployment</td>
                  <td className="py-3 px-3 text-emerald-500">✓ Vercel / Cloudflare</td>
                  <td className="py-3 px-3 text-emerald-500 font-bold">✓ GitHub Actions + Docker</td>
                  <td className="py-3 px-3 text-emerald-500 font-bold">✓ Kubernetes / Cloud</td>
                  <td className="py-3 px-3 text-emerald-500 font-bold">✓ Managed DevOps SLA</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold">Hypercare Bugfix Warranty</td>
                  <td className="py-3 px-3">30 - 60 Days</td>
                  <td className="py-3 px-3">90 Days</td>
                  <td className="py-3 px-3 font-bold text-electric-purple">180 Days (6 Months)</td>
                  <td className="py-3 px-3 font-bold text-electric-purple">Continuous 365 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-center space-y-1 mb-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-light-text dark:text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-light-subtext dark:text-muted-gray">
              Transparent terms regarding domains, source code, warranties, and payments.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-purple-100 dark:border-midnight-border bg-white dark:bg-midnight-card overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-light-text dark:text-white hover:text-electric-purple transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-electric-purple transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-light-subtext dark:text-muted-gray leading-relaxed border-t border-purple-50 dark:border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet text-white text-center space-y-5 shadow-2xl shadow-purple-600/30">
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
            Ready to Engineer Your Platform with CodeVerse?
          </h3>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl mx-auto leading-relaxed">
            Every partnership begins with a direct technical discovery call with our CTO and founding team. Lock in your sprint today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                const p = PLANS_DATA[0];
                setSelectedPlanForModal(p);
                setRegisterModalOpen(true);
              }}
              className="px-6 py-3.5 rounded-xl bg-white text-electric-purple font-extrabold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all"
            >
              Register for a Plan Now
            </button>
            <button
              onClick={onBackToHome}
              className="px-6 py-3.5 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all"
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

