import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Search, Layout, Zap, Shield, Rocket, Check, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { ProcessStage } from '../types';

interface ProcessSectionProps {
  stages?: ProcessStage[];
}

interface StepItem extends ProcessStage {
  description: string;
}

const DEFAULT_STEPS: StepItem[] = [
  {
    num: '01',
    title: 'Discovery & System Design',
    shortTitle: 'System Discovery',
    description: 'Deep-dive stakeholder discovery, requirement modeling, and low-latency system architecture design with API contracts and data schemas.',
    image: '/process/step-01-discovery.webp',
    deliverables: ['SRS & Architectural Blueprint', 'Entity Relationship Diagram', 'API Contract Specification']
  },
  {
    num: '02',
    title: 'Rapid Prototyping & Validation',
    shortTitle: 'Interactive Prototyping',
    description: 'Interactive high-fidelity UI/UX wireframing in Figma, rapid interactive proof-of-concept testing, and database schema validation.',
    image: '/process/step-02-prototyping.webp',
    deliverables: ['Figma Design System', 'Key Interaction Proof-of-Concept', 'Database Schema Validation']
  },
  {
    num: '03',
    title: 'Production Engineering',
    shortTitle: 'Full-Stack Engineering',
    description: 'Full-stack clean architecture implementation featuring type-safe microservices, reactive frontends, and ACID-compliant distributed persistence.',
    image: '/process/step-03-engineering.webp',
    deliverables: ['Type-Safe Clean Codebase', 'REST / WebSocket Microservices', 'ACID Data Persistence']
  },
  {
    num: '04',
    title: 'QA, Security & Hardening',
    shortTitle: 'Security & QA',
    description: 'Comprehensive test automation, OWASP vulnerability audits, strict RBAC policy enforcement, and sub-200ms query & latency tuning.',
    image: '/process/step-04-qa-security.webp',
    deliverables: ['Unit & Integration Testing', 'Security & RBAC Auditing', 'Sub-200ms Latency Tuning']
  },
  {
    num: '05',
    title: 'Deployment & Observability',
    shortTitle: 'CI/CD & Live Telemetry',
    description: 'Automated zero-downtime CI/CD deployment pipelines, distributed telemetry observability, and complete intellectual property & source code handover.',
    image: '/process/step-05-deployment.webp',
    deliverables: ['Zero-Downtime CI/CD Handover', 'Structured Logs & Telemetry', 'Full IP & Source Transfer']
  }
];

export const ProcessSection: React.FC<ProcessSectionProps> = ({ stages }) => {
  // Normalize steps with rich descriptions
  const steps: StepItem[] = useMemo(() => {
    if (stages && stages.length > 0) {
      return stages.map((s, idx) => ({
        ...s,
        description:
          (s as any).description ||
          DEFAULT_STEPS[idx % DEFAULT_STEPS.length].description
      }));
    }
    return DEFAULT_STEPS;
  }, [stages]);

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  const [pathD, setPathD] = useState<string>('');
  const [pathLength, setPathLength] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [orbPos, setOrbPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const targetProgress = useRef<number>(0);
  const currentProgress = useRef<number>(0);
  const rafId = useRef<number | null>(null);

  // Dynamic Cubic Bezier S-curve calculation
  const calculateCurve = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const points: { x: number; y: number }[] = [];

    for (let i = 0; i < steps.length; i++) {
      const node = nodeRefs.current[i];
      if (node) {
        const nodeRect = node.getBoundingClientRect();
        // Calculate center relative to container
        const x = nodeRect.left - containerRect.left + nodeRect.width / 2;
        const y = nodeRect.top - containerRect.top + nodeRect.height / 2;
        points.push({ x, y });
      }
    }

    if (points.length < 2) return;

    // Cubic Bezier curve connecting nodes in alternating S-pattern
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const midY = (p1.y + p2.y) / 2;
      d += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    }

    setPathD(d);
  }, [steps.length]);

  // Observe resize, orientation, and font loading
  useEffect(() => {
    calculateCurve();

    const container = containerRef.current;
    let ro: ResizeObserver | null = null;

    if (container && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        calculateCurve();
      });
      ro.observe(container);
    }

    const handleWindowResize = () => calculateCurve();
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('orientationchange', handleWindowResize);

    if (document.fonts) {
      document.fonts.ready.then(calculateCurve).catch(() => {});
    }

    const t1 = setTimeout(calculateCurve, 200);
    const t2 = setTimeout(calculateCurve, 600);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('orientationchange', handleWindowResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [calculateCurve]);

  // Update total path length when path changes
  useEffect(() => {
    if (pathRef.current) {
      try {
        const totalLen = pathRef.current.getTotalLength();
        if (totalLen > 0) {
          setPathLength(totalLen);
        }
      } catch (e) {
        // SVG may not be attached yet
      }
    }
  }, [pathD]);

  // Silky 60fps scroll listener and spring dampening loop
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start revealing when container enters 75% down screen
      // Finish when container bottom reaches 35% above screen bottom
      const startTrigger = windowHeight * 0.72;
      const endTrigger = windowHeight * 0.38;
      const totalDist = rect.height + (startTrigger - endTrigger);
      const scrolledInto = startTrigger - rect.top;

      const raw = Math.min(Math.max(scrolledInto / (totalDist || 1), 0), 1);
      targetProgress.current = raw;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let isRunning = true;
    const updateLoop = () => {
      if (!isRunning) return;

      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.0006) {
        currentProgress.current += diff * 0.14; // smooth spring lerp
      } else {
        currentProgress.current = targetProgress.current;
      }

      const p = currentProgress.current;
      setScrollProgress(p);

      // Current active checkpoint index calculation
      const activeIdx = Math.min(
        Math.round(p * (steps.length - 1)),
        steps.length - 1
      );
      setActiveStepIdx(activeIdx);

      // Position traveling pulse orb along the curve
      if (pathRef.current && pathLength > 0) {
        try {
          const clamped = Math.min(Math.max(p, 0), 1);
          const point = pathRef.current.getPointAtLength(clamped * pathLength);
          setOrbPos({ x: point.x, y: point.y });
        } catch (err) {
          // Ignore transient SVG render glitches
        }
      }

      rafId.current = requestAnimationFrame(updateLoop);
    };

    rafId.current = requestAnimationFrame(updateLoop);

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [pathLength, steps.length]);

  // Click on a checkpoint smoothly scrolls to it
  const handleScrollToCheckpoint = (idx: number) => {
    const node = nodeRefs.current[idx];
    if (!node) return;
    const yOffset = -120;
    const y = node.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const renderIcon = (idx: number, isReached: boolean) => {
    const iconClass = `w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
      isReached
        ? 'text-white'
        : 'text-electric-purple dark:text-lavender-glow'
    }`;

    switch (idx) {
      case 0: return <Search className={iconClass} />;
      case 1: return <Layout className={iconClass} />;
      case 2: return <Zap className={iconClass} />;
      case 3: return <Shield className={iconClass} />;
      case 4: return <Rocket className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  // Safe calculated dash offset
  const dashOffset = pathLength > 0 ? pathLength * (1 - scrollProgress) : 0;

  return (
    <section
      id="process"
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-light-100/70 dark:bg-midnight-950 border-t border-b border-light-border dark:border-midnight-border/50"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric-purple/10 dark:bg-electric-purple/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-lavender-glow/10 dark:bg-deep-violet/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-[350px] h-[350px] bg-sky-400/5 dark:bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-light-text dark:text-white leading-[1.15]">
            Discovery-to-Delivery <span className="text-gradient-purple">Process</span>
          </h2>

          <p className="text-light-subtext dark:text-muted-gray text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            A structured 5-stage engineering lifecycle executed from initial technical discovery to zero-downtime global deployment.
          </p>
        </div>

        {/* Winding Flow Container with Dynamic S-Curve Tube */}
        <div ref={containerRef} className="relative py-6 sm:py-10 max-w-4xl mx-auto">
          
          {/* Dynamic Multi-Layer SVG Tube */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none w-full h-full overflow-visible z-0"
          >
            <defs>
              {/* Luminous Neon Gradient for Active Tube */}
              <linearGradient id="processTubeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7C2CF5" />
                <stop offset="40%" stopColor="#9550F8" />
                <stop offset="70%" stopColor="#B66CFF" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>

              {/* Glowing Aura Filter */}
              <filter id="tubeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {pathD && (
              <>
                {/* Layer 1: Ambient Drop Shadow & Deep Glow */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#7C2CF5"
                  strokeWidth={18}
                  strokeLinecap="round"
                  className="opacity-15 dark:opacity-25 blur-sm"
                />

                {/* Layer 2: Inactive Guide Track Channel */}
                <path
                  ref={pathRef}
                  d={pathD}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={11}
                  strokeLinecap="round"
                  className="text-purple-100 dark:text-white/10"
                />

                {/* Layer 3: Active Neon Glowing Progress Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#processTubeGradient)"
                  strokeWidth={11}
                  strokeLinecap="round"
                  filter="url(#tubeGlow)"
                  strokeDasharray={pathLength || 1000}
                  strokeDashoffset={dashOffset}
                  style={{
                    transition: 'stroke-dashoffset 0.1s linear'
                  }}
                />

                {/* Layer 4: Laser Core Dashed Highlight Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeDasharray="10 12"
                  strokeDashoffset={dashOffset}
                  className="text-white/90 dark:text-white/70"
                />

                {/* Layer 5: Traveling Pulse Particle & Glow Beacon */}
                {scrollProgress > 0.02 && scrollProgress < 0.99 && (
                  <g transform={`translate(${orbPos.x}, ${orbPos.y})`}>
                    {/* Outer Pulsing Aura Ring */}
                    <circle
                      r={18}
                      className="fill-electric-purple/20 animate-ping"
                    />
                    {/* Mid Glow Halo */}
                    <circle
                      r={12}
                      className="fill-lavender-glow/35 dark:fill-cyan-400/30"
                    />
                    {/* Solid Core Orb with High-Contrast Border */}
                    <circle
                      r={6.5}
                      className="fill-electric-purple dark:fill-cyan-300 stroke-white dark:stroke-midnight-950 stroke-[2.5] shadow-lg"
                    />
                  </g>
                )}
              </>
            )}
          </svg>

          {/* Alternating Checkpoints List (1 to 5) */}
          <ol className="relative z-10 flex flex-col gap-10 sm:gap-16 lg:gap-20">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isFinal = idx === steps.length - 1;

              // Step threshold along scroll progress
              const stepThreshold = idx / Math.max(steps.length - 1, 1);
              const isReached = scrollProgress >= stepThreshold - 0.04;
              const isCurrent = activeStepIdx === idx;

              return (
                <li
                  key={step.num}
                  className={`relative flex items-center gap-4 sm:gap-8 lg:gap-12 transition-all duration-300 ${
                    isEven ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Checkpoint Circular Node */}
                  <div
                    ref={(el) => {
                      nodeRefs.current[idx] = el;
                    }}
                    className="relative flex-shrink-0 z-20 group cursor-pointer"
                    onClick={() => handleScrollToCheckpoint(idx)}
                  >
                    {/* Expanding Radar Ring when active/reached */}
                    <span
                      aria-hidden="true"
                      className={`absolute -inset-2 rounded-full transition-all duration-500 pointer-events-none ${
                        isFinal
                          ? isReached
                            ? 'ring-4 ring-amber-400/50 dark:ring-amber-400/40 animate-pulse'
                            : 'ring-0'
                          : isReached
                          ? 'ring-4 ring-purple-400/50 dark:ring-electric-purple/40 animate-pulse'
                          : 'ring-0'
                      }`}
                    />

                    {/* Main Circular Badge */}
                    <div
                      className={`flex h-13 w-13 sm:h-16 sm:w-16 lg:h-18 lg:w-18 items-center justify-center rounded-full border-[3px] transition-all duration-500 shadow-lg relative ${
                        isFinal
                          ? isReached
                            ? 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-300 shadow-amber-500/30 text-white scale-105'
                            : 'bg-white dark:bg-midnight-surface border-amber-300/60 dark:border-amber-500/40 shadow-slate-200 dark:shadow-none'
                          : isReached
                          ? 'bg-gradient-to-br from-electric-purple to-deep-violet border-purple-300 dark:border-lavender-glow shadow-purple-600/30 text-white scale-105'
                          : 'bg-white dark:bg-midnight-surface border-purple-200 dark:border-midnight-border shadow-slate-200 dark:shadow-none hover:border-electric-purple/50'
                      }`}
                    >
                      {isFinal && isReached ? (
                        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      ) : (
                        renderIcon(idx, isReached)
                      )}
                    </div>

                    {/* Number Badge Pill at Bottom */}
                    <span
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-5 min-w-5 sm:h-6 sm:min-w-6 items-center justify-center rounded-full px-1.5 text-[10px] sm:text-[11px] font-mono font-bold text-white shadow-md z-30 transition-all duration-300 ${
                        isFinal
                          ? 'bg-amber-500'
                          : isReached
                          ? 'bg-electric-purple ring-2 ring-white/50'
                          : 'bg-slate-400 dark:bg-gray-600'
                      }`}
                    >
                      {isFinal ? '★' : step.num}
                    </span>
                  </div>

                  {/* Checkpoint Detail Card */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`group relative w-full rounded-2xl sm:rounded-3xl border transition-all duration-500 p-4 sm:p-6 lg:p-7 backdrop-blur-md ${
                        isFinal
                          ? isReached
                            ? 'bg-amber-50/70 dark:bg-midnight-card/90 border-amber-300/80 dark:border-amber-500/50 shadow-xl shadow-amber-500/5 ring-1 ring-amber-400/30'
                            : 'bg-white/90 dark:bg-midnight-card/80 border-amber-200/50 dark:border-amber-900/30 shadow-md'
                          : isCurrent
                          ? 'bg-white dark:bg-midnight-card border-purple-300 dark:border-electric-purple/60 shadow-xl shadow-purple-600/10 ring-1 ring-purple-400/30'
                          : isReached
                          ? 'bg-white/95 dark:bg-midnight-card/90 border-purple-200/90 dark:border-midnight-border shadow-lg hover:shadow-xl'
                          : 'bg-white/80 dark:bg-midnight-card/60 border-light-border dark:border-midnight-border/60 shadow-sm opacity-85 hover:opacity-100 hover:shadow-md'
                      }`}
                    >
                      {/* Laser Rim Light at top of card when active */}
                      {isCurrent && (
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-electric-purple to-transparent opacity-90 rounded-t-2xl sm:rounded-t-3xl pointer-events-none" />
                      )}

                      {/* Title */}
                      <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-light-text dark:text-white mb-2 group-hover:text-electric-purple dark:group-hover:text-lavender-glow transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-light-subtext dark:text-gray-300 leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Media Image Banner Preview */}
                      {step.image && (
                        <div className="relative w-full h-28 sm:h-36 lg:h-44 rounded-xl sm:rounded-2xl overflow-hidden mb-4 border border-purple-100 dark:border-midnight-border group/media">
                          <img
                            src={step.image}
                            alt={step.title}
                            loading={idx === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                            className="w-full h-full object-cover object-center group-hover/media:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                          {/* Image Bottom Overlay Caption */}
                          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium pointer-events-none">
                            <span className="truncate drop-shadow-sm font-semibold">
                              {step.shortTitle || step.title}
                            </span>
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20">
                              Verified Asset
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Deliverables Chip Pills */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-light-subtext/75 dark:text-muted-gray">
                          Key Deliverables
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {step.deliverables.map((item, dIdx) => (
                            <span
                              key={dIdx}
                              className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-lg bg-purple-50/70 dark:bg-white/[0.04] text-slate-700 dark:text-gray-200 border border-purple-100 dark:border-white/10 hover:border-electric-purple/40 dark:hover:border-lavender-glow/40 transition-colors"
                            >
                              <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                              <span className="truncate max-w-[200px] sm:max-w-none">{item}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

        </div>

      </div>
    </section>
  );
};
