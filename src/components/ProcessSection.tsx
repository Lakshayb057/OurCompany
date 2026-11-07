import React, { useState, useEffect, useRef } from 'react';
import { Search, Layout, Zap, Shield, Rocket, Check } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  const renderStepIcon = (index: number, isActive: boolean) => {
    const iconClass = `w-4 h-4 sm:w-4.5 sm:h-4.5 transition-all duration-300 ${
      isActive
        ? 'text-white'
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

  // Sticky scroll listener: calculates smooth scrub progress through the 5 stages
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Distance scrolled into the section
      const scrolledInside = -rect.top;
      const rawProgress = Math.min(Math.max(scrolledInside / totalScrollable, 0), 1);
      setProgress(rawProgress);

      // Current active step calculation
      const stepIdx = Math.min(
        Math.round(rawProgress * (steps.length - 1)),
        steps.length - 1
      );
      setActiveStep(stepIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps.length]);

  // Click on a stage in the single container scrolls directly to that stage
  const handleStepClick = (index: number) => {
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const totalDist = sectionRef.current.offsetHeight - window.innerHeight;
    const targetProgress = index / (steps.length - 1);
    const targetScrollY = sectionTop + targetProgress * totalDist;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  // Continuous scrub factor from 0.0 to 4.0
  const scrubValue = progress * (steps.length - 1);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative h-[380vh] bg-light-100/70 dark:bg-midnight-900/70 border-t border-b border-light-border dark:border-midnight-border/50"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-electric-purple/5 dark:bg-electric-purple/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-lavender-glow/5 dark:bg-deep-violet/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Pinned Sticky Viewport Container - Top padded to ALWAYS clear the navbar completely */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full justify-between min-h-0">
          
          {/* Section Header - Perfectly aligned with other sections with one-line explanation */}
          <div className="max-w-3xl mx-auto text-center space-y-2.5 mb-4 sm:mb-7 flex-shrink-0">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
              Discovery-to-Delivery <span className="text-gradient-purple">Process</span>
            </h2>
            <p className="text-light-subtext dark:text-muted-gray text-sm sm:text-base leading-relaxed">
              A milestone-driven engineering lifecycle executed from architectural design to zero-downtime global deployment.
            </p>
          </div>

          {/* Main 2-Column Split: Single Container (Left) + Stacked Files (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center flex-1 min-h-0 pb-2">
            
            {/* Left Column: ALL 5 STEPS IN A SINGLE CONTAINER (smaller font size) */}
            <div className="lg:col-span-5 flex flex-col justify-center min-w-0">
              <div className="bg-white/90 dark:bg-midnight-card/90 backdrop-blur-xl border border-purple-200/70 dark:border-midnight-border/80 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-xl shadow-purple-500/5 space-y-1.5 transition-all">
                {steps.map((step, idx) => {
                  const isActive = activeStep === idx;

                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => handleStepClick(idx)}
                      className={`w-full flex items-center gap-3 sm:gap-3.5 px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-left transition-all duration-300 group ${
                        isActive
                          ? 'bg-purple-50/90 dark:bg-midnight-surface border border-electric-purple/60 dark:border-electric-purple/50 shadow-md shadow-purple-500/10'
                          : 'bg-transparent hover:bg-slate-100/60 dark:hover:bg-midnight-surface/50 border border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      {/* Compact Icon */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-sm ${
                          isActive
                            ? 'bg-electric-purple shadow-electric-purple/40 shadow scale-105'
                            : 'bg-lavender-soft/70 dark:bg-midnight-card border border-purple-200/50 dark:border-midnight-border group-hover:scale-105'
                        }`}
                      >
                        {renderStepIcon(idx, isActive)}
                      </div>

                      {/* Smaller Font Size Title */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                              isActive
                                ? 'text-electric-purple dark:text-lavender-glow font-bold'
                                : 'text-slate-700 dark:text-gray-300 group-hover:text-light-text dark:group-hover:text-white'
                            }`}
                          >
                            {step.title}
                          </span>
                          <span
                            className={`text-[10px] sm:text-xs font-mono font-medium flex-shrink-0 px-1.5 py-0.5 rounded ${
                              isActive
                                ? 'bg-electric-purple/15 text-electric-purple dark:text-lavender-glow font-bold'
                                : 'text-slate-400 dark:text-gray-500'
                            }`}
                          >
                            {step.num}
                          </span>
                        </div>
                      </div>

                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-electric-purple animate-pulse flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Stacked Cards Deck - Each card arrives strictly ON TOP of the previous ones */}
            <div className="lg:col-span-7 flex flex-col justify-center h-full min-h-0 pt-4 sm:pt-6">
              <div className="relative w-full aspect-[16/10] max-h-[46vh] sm:max-h-[52vh] flex items-center justify-center">
                
                {steps.map((step, idx) => {
                  // Ascending zIndex guarantees every subsequent card lands ON TOP, NEVER from behind!
                  const cardZIndex = (idx + 1) * 10;

                  let translateY = '105%';
                  let scale = 1;
                  let opacity = 0;
                  let brightness = 1;
                  let shadowClass = 'shadow-none';

                  if (idx === 0) {
                    // Base file 01 (always visible)
                    opacity = 1;
                    const depth = Math.max(0, scrubValue); // 0 to 4
                    const shiftY = Math.min(depth * 10, 40);
                    translateY = `${-shiftY}px`;
                    scale = 1 - Math.min(depth * 0.015, 0.06);
                    brightness = 1 - Math.min(depth * 0.06, 0.24);
                    shadowClass = 'shadow-2xl';
                  } else {
                    // Files 02, 03, 04, 05
                    const enterProgress = Math.min(Math.max(scrubValue - (idx - 1), 0), 1);

                    if (enterProgress <= 0) {
                      // Waiting below the deck to slide up
                      translateY = '105%';
                      opacity = 0;
                    } else if (enterProgress < 1) {
                      // Actively sliding UP from the bottom ON TOP of previous cards!
                      const currentY = (1 - enterProgress) * 105;
                      translateY = `${currentY}%`;
                      opacity = Math.min(enterProgress * 2.5, 1);
                      scale = 0.98 + enterProgress * 0.02;
                      shadowClass = 'shadow-[0_-12px_35px_rgba(0,0,0,0.65),0_25px_50px_rgba(0,0,0,0.85)]';
                    } else {
                      // Fully landed on top of previous files!
                      opacity = 1;
                      const depth = Math.max(0, scrubValue - idx);
                      const shiftY = Math.min(depth * 10, (4 - idx) * 10);
                      translateY = `${-shiftY}px`;
                      scale = 1 - Math.min(depth * 0.015, 0.06);
                      brightness = 1 - Math.min(depth * 0.06, 0.24);
                      shadowClass = 'shadow-[0_-8px_30px_rgba(0,0,0,0.55),0_20px_45px_rgba(0,0,0,0.75)]';
                    }
                  }

                  return (
                    <div
                      key={step.num}
                      style={{
                        transform: `translate3d(0, ${translateY}, 0) scale(${scale})`,
                        opacity,
                        zIndex: cardZIndex,
                        filter: `brightness(${brightness})`,
                        transition: 'transform 0.12s ease-out, opacity 0.15s ease-out, filter 0.15s ease-out'
                      }}
                      className={`absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border-2 border-purple-200/90 dark:border-electric-purple/60 ${shadowClass} flex flex-col will-change-transform`}
                    >
                      {/* Image Frame */}
                      <div className="relative flex-1 min-h-0 overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover object-center"
                        />

                        {/* Dark Atmospheric Gradients for Text Contrast */}
                        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 h-36 sm:h-44 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none" />

                        {/* Bottom Overlay Info with Deliverables */}
                        <div className="absolute bottom-2.5 sm:bottom-4 left-3 sm:left-5 right-3 sm:right-5 space-y-1.5 sm:space-y-2 pointer-events-none">
                          <div className="text-white text-sm sm:text-lg lg:text-xl font-extrabold tracking-tight drop-shadow-md">
                            {step.title}
                          </div>

                          {/* Deliverables tags on image */}
                          <div className="flex flex-wrap gap-1 sm:gap-1.5">
                            {step.deliverables.map((item, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-medium text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-black/60 backdrop-blur-md border border-white/15"
                              >
                                <Check className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-emerald-400 flex-shrink-0" />
                                <span className="truncate max-w-[160px] sm:max-w-none">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Edge Accent Line */}
                      <div className="h-1 w-full bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet flex-shrink-0" />
                    </div>
                  );
                })}

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
