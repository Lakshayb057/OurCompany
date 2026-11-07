import React, { useState, useEffect, useRef } from 'react';
import { Search, Layout, Zap, Shield, Rocket, Check, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const renderStepIcon = (index: number, isActive: boolean) => {
    const iconClass = `w-6 h-6 transition-all duration-300 ${
      isActive
        ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]'
        : 'text-electric-purple dark:text-lavender-glow'
    }`;

    switch (index) {
      case 0: return <Search className={iconClass} />;
      case 1: return <Layout className={iconClass} />;
      case 2: return <Zap className={iconClass} />;
      case 3: return <Shield className={iconClass} />;
      case 4: return <Rocket className={iconClass} />;
      default: return <Zap className={iconClass} />;
    }
  };

  const steps = [
    {
      num: '01',
      title: 'Discovery & System Design',
      shortTitle: 'System Discovery',
      image: '/process/step-01-discovery.jpg',
      deliverables: ['SRS & Architectural Blueprint', 'Entity Relationship Diagram', 'API Contract Specification']
    },
    {
      num: '02',
      title: 'Rapid Prototyping & Validation',
      shortTitle: 'Interactive Prototyping',
      image: '/process/step-02-prototyping.jpg',
      deliverables: ['Figma Design System', 'Key Interaction Proof-of-Concept', 'Database Schema Validation']
    },
    {
      num: '03',
      title: 'Production Engineering',
      shortTitle: 'Full-Stack Engineering',
      image: '/process/step-03-engineering.jpg',
      deliverables: ['Type-Safe Clean Codebase', 'REST / WebSocket Microservices', 'ACID Data Persistence']
    },
    {
      num: '04',
      title: 'QA, Security & Hardening',
      shortTitle: 'Security & QA',
      image: '/process/step-04-qa-security.jpg',
      deliverables: ['Unit & Integration Testing', 'Security & RBAC Auditing', 'Sub-200ms Latency Tuning']
    },
    {
      num: '05',
      title: 'Deployment & Observability',
      shortTitle: 'CI/CD & Live Telemetry',
      image: '/process/step-05-deployment.jpg',
      deliverables: ['Zero-Downtime CI/CD Handover', 'Structured Logs & Telemetry', 'Full IP & Source Transfer']
    }
  ];

  // Scroll spy: synchronizes active stage to scroll speed and position
  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.42;
      let currentActive = 0;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerPoint) {
          currentActive = index;
        }
      });

      setActiveStep(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    const target = stepRefs.current[index];
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <section id="process" className="py-28 relative overflow-hidden bg-light-100/60 dark:bg-midnight-900/60 border-t border-b border-light-border dark:border-midnight-border/50">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-electric-purple/5 dark:bg-electric-purple/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-lavender-glow/5 dark:bg-deep-violet/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
            Discovery-to-Delivery <span className="text-gradient-purple">Lifecycle</span>
          </h2>
          <p className="text-light-subtext dark:text-muted-gray text-base sm:text-lg leading-relaxed">
            A systematic engineering process designed to eliminate uncertainty, ensure architectural integrity, and deliver battle-tested software on schedule.
          </p>
        </div>

        {/* Desktop Split View: Left 5 Steps & Right Sticky 4K Portrait Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: 5 Sequential Process Headings & Deliverables */}
          <div className="lg:col-span-7 space-y-8 relative">
            {/* Vertical Progress Spine */}
            <div className="hidden sm:block absolute left-[26px] top-6 bottom-6 w-[2px] bg-purple-100 dark:bg-midnight-border" />
            
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.num}
                  ref={(el) => (stepRefs.current[idx] = el)}
                  onClick={() => handleStepClick(idx)}
                  className={`relative p-6 sm:p-8 rounded-3xl transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-midnight-card border-2 border-electric-purple/60 dark:border-electric-purple shadow-xl shadow-purple-500/10 scale-[1.01]'
                      : 'bg-white/60 dark:bg-midnight-card/40 border border-light-border dark:border-midnight-border/70 hover:border-purple-300 dark:hover:border-midnight-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Step Icon & Number Badge */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                          isActive
                            ? 'bg-electric-purple shadow-electric-purple/40 shadow-lg scale-110'
                            : 'bg-lavender-soft/70 dark:bg-midnight-surface border border-purple-200/60 dark:border-midnight-border'
                        }`}
                      >
                        {renderStepIcon(idx, isActive)}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <h3 className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                        isActive ? 'text-light-text dark:text-white' : 'text-slate-700 dark:text-gray-300'
                      }`}>
                        {step.title}
                      </h3>

                      {/* Mobile portrait inline preview with Deliverables Overlay (under lg breakpoint) */}
                      <div className="lg:hidden pt-3">
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-purple-200 dark:border-midnight-border shadow-md bg-slate-900">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
                          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none" />

                          {/* Mobile Deliverables Overlay */}
                          <div className="absolute bottom-3 left-3 right-3 space-y-1.5 pointer-events-none">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-lavender-glow block font-bold">
                              Core Deliverables:
                            </span>
                            <div className="space-y-1">
                              {step.deliverables.map((item, dIdx) => (
                                <div
                                  key={dIdx}
                                  className="flex items-center gap-2 text-xs font-medium text-white px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/15"
                                >
                                  <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                                  <span className="truncate">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky 4K Portrait Real Photography Showcase (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border-2 border-purple-200/80 dark:border-electric-purple/40 shadow-2xl shadow-purple-500/20 group">
              
              {/* 4K Portrait Image Aspect Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                {steps.map((step, idx) => {
                  const isActive = activeStep === idx;

                  return (
                    <div
                      key={step.num}
                      className={`absolute inset-0 transition-all duration-700 ease-out ${
                        isActive
                          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 scale-105 translate-y-4 pointer-events-none'
                      }`}
                    >
                      {/* Real 4K Portrait Photograph */}
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
                      />

                      {/* Dual-Theme Atmospheric Gradients */}
                      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/75 via-black/25 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/95 via-black/75 to-transparent pointer-events-none" />

                      {/* Stage Indicator Pill pinned to top */}
                      <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                        <div className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-midnight-950/85 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            Stage {step.num} of 05
                          </span>
                        </div>

                        <div className="px-3 py-1.5 rounded-full bg-electric-purple/90 backdrop-blur-md text-white text-xs font-semibold shadow-md">
                          {step.shortTitle}
                        </div>
                      </div>

                      {/* Bottom Visual Stage Info & Core Deliverables Overlay */}
                      <div className="absolute bottom-5 left-5 right-5 space-y-3 pointer-events-none">
                        <div>
                          <div className="text-white text-xl font-extrabold tracking-tight drop-shadow-md">
                            {step.title}
                          </div>
                        </div>

                        {/* Core Deliverables Pointers Over The Image */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-lavender-glow block font-bold drop-shadow-sm">
                            Core Deliverables:
                          </span>
                          <div className="space-y-1.5">
                            {step.deliverables.map((item, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-center gap-2 text-xs font-medium text-white/95 px-3 py-1.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Interactive Progress Bar */}
              <div className="h-1.5 w-full bg-white/10 relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet transition-all duration-500 ease-out"
                  style={{
                    width: `${((activeStep + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>

            </div>

            {/* Quick Stage Jump Navigation Pills beneath the image */}
            <div className="mt-4 flex items-center justify-between gap-1.5 px-2">
              {steps.map((s, idx) => (
                <button
                  key={s.num}
                  onClick={() => handleStepClick(idx)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-mono font-semibold transition-all duration-300 ${
                    activeStep === idx
                      ? 'bg-electric-purple text-white shadow-sm shadow-purple-500/30 scale-105'
                      : 'bg-white/70 dark:bg-midnight-card text-light-subtext dark:text-muted-gray hover:text-electric-purple dark:hover:text-white border border-light-border dark:border-midnight-border'
                  }`}
                  title={s.title}
                >
                  {s.num}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
