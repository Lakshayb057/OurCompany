import React, { useState, useEffect, useRef } from 'react';
import { Search, Layout, Zap, Shield, Rocket, Check } from 'lucide-react';

import { ProcessStage } from '../types';

interface ProcessSectionProps {
  stages?: ProcessStage[];
}

const DEFAULT_STEPS = [
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

export const ProcessSection: React.FC<ProcessSectionProps> = ({ stages }) => {
  const steps = (stages && stages.length > 0) ? stages : DEFAULT_STEPS;
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 1024 : false;
  });
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartY = useRef<number>(0);

  // Track responsive screen size for mobile horizontal glide
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



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
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }
          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const totalScrollable = rect.height - windowHeight;

          if (totalScrollable > 0) {
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
          }
          ticking = false;
        });
        ticking = true;
      }
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
      className="relative h-[280vh] sm:h-[320vh] lg:h-[380vh] bg-light-100/70 dark:bg-midnight-900/70 border-t border-b border-light-border dark:border-midnight-border/50"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-electric-purple/5 dark:bg-electric-purple/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-lavender-glow/5 dark:bg-deep-violet/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Pinned Sticky Viewport Container - Top padded to ALWAYS clear the navbar completely on all screens */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between pt-[76px] sm:pt-[84px] lg:pt-[96px] pb-2 sm:pb-6 overflow-hidden px-3.5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full justify-between min-h-0">
          
          {/* Section Header - Clears fixed navbar with calibrated spacing */}
          <div className="max-w-3xl mx-auto text-center space-y-1 sm:space-y-2 mt-0 sm:mt-1 mb-1 sm:mb-3 flex-shrink-0">
            <h2 className="text-xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-light-text dark:text-white leading-tight">
              Discovery-to-Delivery <span className="text-gradient-purple">Process</span>
            </h2>
            <p className="text-light-subtext dark:text-muted-gray text-xs sm:text-sm lg:text-base leading-snug sm:leading-relaxed max-w-xl mx-auto">
              A milestone-driven engineering lifecycle executed from architectural design to zero-downtime global deployment.
            </p>
          </div>

          {/* Main Layout: Desktop 2-Column Split (Left list + Right deck) | Mobile: Full-width Vertical Stacking Cards Deck */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-10 items-center flex-1 min-h-0 pb-1 sm:pb-2 w-full">
            
            {/* Left Column: ALL 5 STEPS - Visible on Desktop only */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-center min-w-0 space-y-2 sm:space-y-3">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;

                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    className={`w-full flex items-center gap-3.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-left transition-all duration-300 group ${
                      isActive
                        ? 'bg-purple-50/80 dark:bg-white/[0.04] border-l-4 border-electric-purple'
                        : 'bg-transparent hover:bg-slate-100/50 dark:hover:bg-white/[0.02] border-l-4 border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive
                          ? 'bg-electric-purple text-white'
                          : 'bg-purple-100/60 dark:bg-white/5 text-electric-purple dark:text-lavender-glow group-hover:bg-purple-100'
                      }`}
                    >
                      {renderStepIcon(idx, isActive)}
                    </div>

                    {/* Step Title & Number */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`text-sm sm:text-base font-semibold truncate transition-colors ${
                            isActive
                              ? 'text-electric-purple dark:text-lavender-glow font-bold'
                              : 'text-slate-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white'
                          }`}
                        >
                          {step.title}
                        </span>
                        <span
                          className={`text-xs font-mono font-medium flex-shrink-0 px-2 py-0.5 rounded ${
                            isActive
                              ? 'bg-electric-purple/10 text-electric-purple dark:text-lavender-glow font-bold'
                              : 'text-slate-400 dark:text-gray-500'
                          }`}
                        >
                          {step.num}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column / Mobile Full Width: Premium 3D Kinetic Card Deck */}
            <div className="w-full lg:col-span-7 flex flex-col justify-center items-center flex-1 h-full min-h-0 py-1 sm:py-2">
              
              {/* Mobile Stage Selector & Step Pills (01 to 05) */}
              <div className="flex lg:hidden items-center justify-center gap-1.5 sm:gap-2 my-1 z-20 w-full px-2">
                {steps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => handleStepClick(idx)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-electric-purple text-white shadow-lg shadow-purple-600/40 scale-105 font-bold ring-2 ring-purple-400/50'
                          : 'bg-black/40 dark:bg-white/5 text-slate-500 dark:text-gray-400 hover:text-white border border-white/10'
                      }`}
                    >
                      <span>{step.num}</span>
                      {isActive && (
                        <span className="text-[10px] font-sans font-semibold max-w-[85px] truncate">
                          {step.shortTitle || step.title}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 3D Kinetic Deck Container with Depth Perspective & Touch Swipe */}
              <div 
                className="relative w-full h-full max-h-[calc(100dvh-200px)] sm:max-h-[68vh] lg:h-[570px] max-w-sm sm:max-w-md lg:max-w-none mx-auto flex items-center justify-center overflow-hidden"
                style={{
                  perspective: '1200px',
                  transformStyle: 'preserve-3d',
                }}
                onTouchStart={(e) => {
                  touchStartY.current = e.touches[0].clientY;
                }}
                onTouchEnd={(e) => {
                  const deltaY = e.changedTouches[0].clientY - touchStartY.current;
                  if (Math.abs(deltaY) > 40) {
                    if (deltaY < 0 && activeStep < steps.length - 1) {
                      handleStepClick(activeStep + 1);
                    } else if (deltaY > 0 && activeStep > 0) {
                      handleStepClick(activeStep - 1);
                    }
                  }
                }}
              >
                
                {steps.map((step, idx) => {
                  let transform = '';
                  let opacity = 0;
                  let brightness = 1;
                  let shadowClass = 'shadow-2xl';
                  const cardZIndex = (idx + 1) * 10;
                  let isClickable = true;

                  const enterProgress = Math.min(Math.max(scrubValue - (idx - 1), 0), 1);
                  const depth = Math.max(0, scrubValue - idx);
                  const overlapShift = isMobile ? 18 : 28;

                  if (idx === 0) {
                    // First card stays visible at top of stack, shifting up and tilting slightly into 3D space as newer cards overlay it
                    opacity = 1;
                    const shiftY = Math.min(depth * overlapShift, isMobile ? 54 : 96);
                    const translateZ = -Math.min(depth * (isMobile ? 24 : 35), 110);
                    const rotateX = Math.min(depth * (isMobile ? 2.5 : 3.5), 10);
                    const scale = 1 - Math.min(depth * (isMobile ? 0.028 : 0.02), 0.08);
                    brightness = 1 - Math.min(depth * 0.08, 0.28);
                    shadowClass = depth > 0 ? 'shadow-xl' : 'shadow-2xl';
                    transform = `perspective(1200px) translate3d(0, ${-shiftY}px, ${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`;
                  } else if (enterProgress <= 0) {
                    // Card waiting below viewport in 3D perspective
                    opacity = 0;
                    transform = `perspective(1200px) translate3d(0, 110%, -60px) rotateX(-16deg) scale(0.92)`;
                    isClickable = false;
                  } else if (enterProgress < 1) {
                    // Card smoothly gliding up from below over previous stacked card with 3D pitch tilt & elevation
                    const currentY = (1 - enterProgress) * 110;
                    const currentRotateX = (1 - enterProgress) * -16;
                    const currentZ = (1 - enterProgress) * -60;
                    const currentScale = 0.92 + enterProgress * 0.08;
                    opacity = Math.min(enterProgress * 2.8, 1);
                    brightness = 1;
                    shadowClass = 'shadow-[0_-20px_50px_rgba(124,44,245,0.35),0_30px_60px_rgba(0,0,0,0.85)]';
                    transform = `perspective(1200px) translate3d(0, ${currentY}%, ${currentZ}px) rotateX(${currentRotateX}deg) scale(${currentScale})`;
                    isClickable = true;
                  } else {
                    // Card has fully entered, sits at rest or recedes backward in 3D stack
                    opacity = 1;
                    const shiftY = Math.min(depth * overlapShift, (4 - idx) * overlapShift);
                    const translateZ = -Math.min(depth * (isMobile ? 24 : 35), 110);
                    const rotateX = Math.min(depth * (isMobile ? 2.5 : 3.5), 10);
                    const scale = 1 - Math.min(depth * (isMobile ? 0.028 : 0.02), 0.08);
                    brightness = 1 - Math.min(depth * 0.08, 0.28);
                    shadowClass = 'shadow-[0_-12px_35px_rgba(0,0,0,0.65),0_20px_45px_rgba(0,0,0,0.85)]';
                    transform = `perspective(1200px) translate3d(0, ${-shiftY}px, ${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`;
                    isClickable = true;
                  }

                  return (
                    <div
                      key={step.num}
                      style={{
                        transform,
                        opacity,
                        zIndex: cardZIndex,
                        filter: `brightness(${brightness})`,
                        pointerEvents: isClickable ? 'auto' : 'none',
                        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                        transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out, filter 0.2s ease-out'
                      }}
                      className={`absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border-2 border-purple-200/90 dark:border-electric-purple/60 ${shadowClass} will-change-transform isolate`}
                    >
                      {/* Top Radiant Laser Rim Light on Active Entering Card */}
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-electric-purple to-transparent opacity-80 z-20 pointer-events-none" />

                      {/* Image Frame with Full Bleed to all 4 rounded corners */}
                      <div className="relative w-full h-full overflow-hidden rounded-[inherit]">
                        <img
                          src={step.image}
                          alt={step.title}
                          loading={idx === 0 ? "eager" : "lazy"}
                          decoding="async"
                          {...{ fetchpriority: idx === 0 ? "high" : "auto" }}
                          className="w-full h-full object-cover object-center rounded-[inherit] transform transition-transform duration-700 ease-out"
                        />

                        {/* Dark Atmospheric Gradients for Text Contrast */}
                        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-none rounded-t-[inherit]" />
                        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-52 bg-gradient-to-t from-black/95 via-black/80 to-transparent pointer-events-none rounded-b-[inherit]" />

                        {/* Top Stage Header Overlay - Sleek Stage Number in Corner */}
                        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 pointer-events-none z-10">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-electric-purple text-white font-mono font-black text-xs sm:text-sm flex items-center justify-center shadow-lg border border-white/25">
                            {step.num}
                          </div>
                        </div>

                        {/* Bottom Overlay Info with Title & Deliverables - Content aligned over image */}
                        <div className="absolute bottom-3.5 sm:bottom-5 left-3.5 sm:left-5 right-3.5 sm:right-5 space-y-2 pointer-events-none z-10">
                          <div className="text-white text-base sm:text-xl font-extrabold tracking-tight drop-shadow-md">
                            {step.title}
                          </div>

                          {/* Deliverables tags on image */}
                          <div className="flex flex-wrap gap-1 sm:gap-1.5">
                            {step.deliverables.map((item, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-medium text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-black/70 backdrop-blur-md border border-white/15"
                              >
                                <Check className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-emerald-400 flex-shrink-0" />
                                <span className="truncate max-w-[170px] sm:max-w-none">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
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
