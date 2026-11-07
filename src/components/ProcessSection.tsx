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
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start pt-20 sm:pt-24 pb-6 sm:pb-8 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full justify-between min-h-0">
          
          {/* Section Header - Always visible, never cut off */}
          <div className="mb-3 sm:mb-6 flex-shrink-0">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-light-text dark:text-white">
              Discovery-to-Delivery <span className="text-gradient-purple">Process</span>
            </h2>
          </div>

          {/* Main 2-Column Split: Single Container (Left) + 3D Stacked Files (Right) */}
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

            {/* Right Column: 3D Stacked Cards Deck - "Collects as File over Files" */}
            <div className="lg:col-span-7 flex flex-col justify-center h-full min-h-0 [perspective:1400px]">
              <div className="relative w-full aspect-[16/10] max-h-[46vh] sm:max-h-[52vh] flex items-center justify-center [transform-style:preserve-3d]">
                
                {steps.map((step, idx) => {
                  // 3D Card Stack Calculation:
                  // Cards slide up from bottom to top and stack one over another like physical file folders
                  let translateY = '0px';
                  let scale = 1;
                  let rotateX = 0;
                  let opacity = 1;
                  let zIndex = 10 + idx;
                  let brightness = 1;
                  let pointerEvents: 'auto' | 'none' = 'none';

                  if (idx === 0) {
                    // Base file 01
                    const depth = Math.max(0, scrubValue);
                    translateY = `${-depth * 9}px`;
                    scale = 1 - Math.min(depth * 0.024, 0.096);
                    brightness = 1 - Math.min(depth * 0.07, 0.28);
                    zIndex = 10;
                    pointerEvents = activeStep === 0 ? 'auto' : 'none';
                  } else {
                    // Files 02, 03, 04, 05
                    const enterProgress = Math.min(Math.max(scrubValue - (idx - 1), 0), 1);

                    if (enterProgress < 0.001) {
                      // Waiting below the viewport to slide up
                      translateY = '120%';
                      scale = 0.94;
                      rotateX = 14;
                      opacity = 0;
                      zIndex = 10 + idx;
                    } else if (enterProgress < 1) {
                      // Currently scrolling from bottom to top onto the stack!
                      translateY = `${(1 - enterProgress) * 115}%`;
                      scale = 0.94 + enterProgress * 0.06;
                      rotateX = (1 - enterProgress) * 12;
                      opacity = Math.min(enterProgress * 2.5, 1);
                      zIndex = 20 + idx;
                      pointerEvents = 'auto';
                    } else {
                      // Fully landed on top of previous files!
                      const depth = Math.max(0, scrubValue - idx);
                      translateY = `${-depth * 9}px`;
                      scale = 1 - Math.min(depth * 0.024, 0.096);
                      rotateX = 0;
                      opacity = 1;
                      brightness = 1 - Math.min(depth * 0.07, 0.28);
                      zIndex = 20 + idx;
                      pointerEvents = activeStep === idx ? 'auto' : 'none';
                    }
                  }

                  return (
                    <div
                      key={step.num}
                      style={{
                        transform: `translate3d(0, ${translateY}, 0) scale(${scale}) rotateX(${rotateX}deg)`,
                        opacity,
                        zIndex,
                        filter: `brightness(${brightness})`,
                        pointerEvents,
                        transition: 'transform 0.15s ease-out, opacity 0.2s ease-out, filter 0.2s ease-out'
                      }}
                      className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border-2 border-purple-200/80 dark:border-electric-purple/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65),0_0_2px_1px_rgba(168,85,247,0.3)] flex flex-col will-change-transform"
                    >
                      {/* Physical File Folder Header Tab */}
                      <div className="flex items-center justify-between px-3.5 sm:px-4 py-1.5 sm:py-2 bg-slate-900/90 dark:bg-midnight-950/90 backdrop-blur-md border-b border-white/10 z-20 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-rose-500/80 shadow-sm" />
                            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-500/80 shadow-sm" />
                            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500/80 shadow-sm" />
                          </div>
                          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-purple-300 dark:text-lavender-glow ml-2">
                            STAGE // {step.num}
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-xs font-mono text-slate-300 dark:text-muted-gray font-medium truncate max-w-[200px] sm:max-w-none">
                          {step.shortTitle}
                        </span>
                      </div>

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
