import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Check, Shield, ChevronDown, 
  HelpCircle, Sparkles, Layers, Code, Globe, 
  Cpu, Database, Bot, Zap, ArrowLeft, CheckCircle2,
  Clock, Award, Lock, ExternalLink
} from 'lucide-react';
import { ServiceLandingConfig } from '../data/serviceLandingData';
import { InquirySection } from './InquirySection';

interface ServiceLandingPageProps {
  config: ServiceLandingConfig;
  onBackToHome: () => void;
  onNavigateToPlans: () => void;
}

export const ServiceLandingPage: React.FC<ServiceLandingPageProps> = ({
  config,
  onBackToHome,
  onNavigateToPlans
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scroll to top on mount or route switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [config.slug]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(prev => (prev === idx ? null : idx));
  };

  const scrollToInquiry = () => {
    const el = document.getElementById('service-inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-light dark:bg-midnight text-light-text dark:text-white pt-24 sm:pt-28 pb-16 transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-electric-purple/10 dark:bg-electric-purple/15 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-lavender-glow/10 dark:bg-deep-violet/20 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 sm:space-y-24">
        
        {/* Breadcrumb Navigation & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-light-border dark:border-midnight-border/70 pb-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-light-subtext dark:text-muted-gray hover:text-electric-purple dark:hover:text-lavender-light transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to CodRix Homepage</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-light-subtext dark:text-muted-gray">
            <button onClick={onBackToHome} className="hover:text-light-text dark:hover:text-white transition-colors">
              CodRix
            </button>
            <span>/</span>
            <span className="text-purple-600 dark:text-lavender-glow">Services</span>
            <span>/</span>
            <span className="font-semibold text-light-text dark:text-white">{config.primaryKeyword}</span>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-purple-500/10 text-electric-purple dark:text-lavender-glow border border-purple-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{config.heroBadge}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>CODRIX PRIVATE LIMITED &bull; VERIFIED SOFTWARE COMPANY</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {config.heroHeading}{' '}
            <span className="text-gradient-purple block sm:inline">{config.heroHighlight}</span>
          </h1>

          <p className="text-base sm:text-lg text-light-subtext dark:text-muted-gray leading-relaxed max-w-2xl mx-auto">
            {config.heroSubheading}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={scrollToInquiry}
              className="px-6 py-3.5 rounded-xl bg-electric-purple text-white font-semibold text-sm hover:opacity-95 shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Request Technical Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToPlans}
              className="px-6 py-3.5 rounded-xl bg-white dark:bg-midnight-800 text-light-text dark:text-white font-semibold text-sm border border-light-border dark:border-midnight-border hover:border-purple-400 dark:hover:border-purple-500/40 shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Fixed Packages</span>
              <ExternalLink className="w-4 h-4 text-light-subtext" />
            </button>
          </div>

          {/* KPI Highlights Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 max-w-4xl mx-auto">
            {config.stats.map((st) => (
              <div
                key={st.label}
                className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-midnight-800/80 border border-light-border dark:border-midnight-border/80 shadow-sm text-center"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-electric-purple dark:text-lavender-glow">
                  {st.value}
                </div>
                <div className="text-xs font-mono text-light-subtext dark:text-muted-gray mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ARCHITECTURAL OVERVIEW */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white/90 dark:bg-midnight-card/90 border border-purple-100 dark:border-midnight-border shadow-xl space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-lavender-light">
              Engineering Perspective
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-light-text dark:text-white tracking-tight">
              {config.overview.heading}
            </h2>
            <p className="text-sm sm:text-base text-light-subtext dark:text-muted-gray leading-relaxed">
              {config.overview.paragraph1}
            </p>
            <p className="text-sm sm:text-base text-light-subtext dark:text-muted-gray leading-relaxed">
              {config.overview.paragraph2}
            </p>
          </div>
        </section>

        {/* DELIVERABLE PILLARS */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-lavender-light">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-light-text dark:text-white">
              What We Deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="p-7 rounded-3xl bg-white/80 dark:bg-midnight-800/70 border border-light-border dark:border-midnight-border/80 hover:border-purple-400 dark:hover:border-purple-500/50 shadow-sm transition-all duration-300 space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-purple-500/10 text-electric-purple dark:text-lavender-glow flex items-center justify-center font-mono text-xs font-bold">
                    0{i + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-electric-purple/40 group-hover:scale-150 group-hover:bg-electric-purple transition-all" />
                </div>

                <h3 className="text-xl font-bold text-light-text dark:text-white group-hover:text-electric-purple dark:group-hover:text-lavender-glow transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray leading-relaxed">
                  {pillar.description}
                </p>

                <div className="pt-2 border-t border-light-border/40 dark:border-midnight-border/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-light-text dark:text-slate-300">
                    {pillar.deliverables.map((deliv) => (
                      <div key={deliv} className="flex items-center gap-1.5 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CASE STUDY SPOTLIGHT */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-purple-950/40 via-midnight-800 to-midnight-card border border-electric-purple/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-electric-purple text-white">
                Battle-Tested Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                {config.caseStudy.title}
              </h2>
              <div className="text-xs font-mono text-lavender-glow">
                {config.caseStudy.subtitle}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {config.caseStudy.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {config.caseStudy.metrics.map((m) => (
                  <span
                    key={m}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-white/10 text-lavender-light border border-white/10"
                  >
                    ✓ {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl bg-slate-950 p-2">
                <img
                  src={config.caseStudy.image}
                  alt={config.caseStudy.title}
                  className="w-full h-56 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK SHOWCASE */}
        <section className="text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-lavender-light">
              Technologies & Frameworks
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-light-text dark:text-white">
              Production Stack Precision
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
            {config.technologies.map((t) => (
              <span
                key={t}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border text-light-text dark:text-white shadow-sm hover:border-electric-purple transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* SERVICE-SPECIFIC FAQS */}
        <section className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-lavender-light">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-light-text dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {config.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? 'bg-white dark:bg-midnight-800 border-electric-purple/40 shadow-md'
                      : 'bg-white/70 dark:bg-midnight-900/60 border-light-border dark:border-midnight-border/70'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left p-5 gap-4 cursor-pointer select-none"
                  >
                    <span className="font-bold text-sm sm:text-base text-light-text dark:text-white">
                      {faq.question}
                    </span>
                    <div className={`p-1.5 rounded-full bg-light-100 dark:bg-midnight-900 shrink-0 text-light-subtext dark:text-muted-gray transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-electric-purple dark:text-lavender-glow' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 border-t border-light-border/40 dark:border-midnight-border/40 mt-1">
                      <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray leading-relaxed pt-3">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* DIRECT INQUIRY & PROPOSAL SECTION */}
        <section id="service-inquiry" className="scroll-mt-24">
          <InquirySection
            initialProjectType={config.inquiryProjectType}
            onRedirectToPlans={onNavigateToPlans}
          />
        </section>

      </div>
    </div>
  );
};
