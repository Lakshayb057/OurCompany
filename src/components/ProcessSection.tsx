import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Search, Layout, Zap, Shield, Rocket, Check, Sparkles } from 'lucide-react';
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
        // Calculate node center relative to container
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

  // Smooth scroll scrubbing calibrated to actual checkpoint node positions
  useEffect(() => {
    const handleScroll = () => {
      const firstNode = nodeRefs.current[0];
      const lastNode = nodeRefs.current[steps.length - 1];
      if (!firstNode || !lastNode) return;

      const firstRect = firstNode.getBoundingClientRect();
      const lastRect = lastNode.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Flow starts when Checkpoint 01 reaches 62% down viewport
      // and completes when Checkpoint 05 reaches 50% of viewport
      const triggerStart = windowHeight * 0.62;
      const totalScrollDist = Math.max(lastRect.top - firstRect.top, 80);
      const scrolled = triggerStart - firstRect.top;

      const raw = Math.min(Math.max(scrolled / totalScrollDist, 0), 1);
      targetProgress.current = raw;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let isRunning = true;
    const updateLoop = () => {
      if (!isRunning) return;

      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.0003) {
        currentProgress.current += diff * 0.16; // smooth spring lerp
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

      // Calculate traveling pulse orb coordinates exactly at progress point
      if (pathRef.current) {
        try {
          const totalLen = pathRef.current.getTotalLength();
          if (totalLen > 0) {
            const clamped = Math.min(Math.max(p, 0), 1);
            const point = pathRef.current.getPointAtLength(clamped * totalLen);
            setOrbPos({ x: point.x, y: point.y });
          }
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
  }, [steps.length]);

  const handleScrollToCheckpoint = (idx: number) => {
    const node = nodeRefs.current[idx];
    if (!node) return;
    const yOffset = -140;
    const y = node.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const renderIcon = (idx: number, isReached: boolean) => {
    const iconClass = `w-4.5 h-4.5 sm:w-5 sm:h-5 transition-colors duration-300 ${
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

  // Safe normalized dash offset for pathLength="1"
  const normalizedDashOffset = Math.max(0, 1 - scrollProgress);

  return (
    <section
      id="process"
      className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-light-100/70 dark:bg-midnight-950 border-t border-b border-light-border dark:border-midnight-border/50"
    >
      {/* Ambient background glows - Consistent primary purple */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-electric-purple/10 dark:bg-electric-purple/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-electric-purple/10 dark:bg-electric-purple/15 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with compact, clean spacing */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-light-text dark:text-white leading-[1.15]">
            Discovery-to-Delivery <span className="text-gradient-purple">Process</span>
          </h2>

          <p className="text-light-subtext dark:text-muted-gray text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl mx-auto">
            A structured 5-stage engineering lifecycle executed from initial technical discovery to zero-downtime global deployment.
          </p>
        </div>

        {/* Winding Flow Container with Dynamic S-Curve Tube */}
        <div ref={containerRef} className="relative py-2 sm:py-4 max-w-4xl mx-auto">
          
          {/* Dynamic Multi-Layer SVG Tube */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none w-full h-full overflow-visible z-0"
          >
            <defs>
              {/* Glowing Aura Filter */}
              <filter id="tubeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {pathD && (
              <>
                {/* Layer 1: Ambient Drop Shadow & Deep Glow in Primary Purple */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#7C2CF5"
                  strokeWidth={16}
                  strokeLinecap="round"
                  className="opacity-15 dark:opacity-25 blur-sm"
                />

                {/* Layer 2: Inactive Guide Track Channel (Ref for getTotalLength) */}
                <path
                  ref={pathRef}
                  d={pathD}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={10}
                  strokeLinecap="round"
                  className="text-purple-100 dark:text-white/10"
                />

                {/* Layer 3: Active Neon Line - Solid Primary Purple (#7C2CF5), Zero Gradient, 100% Locked with Orb */}
                <path
                  d={pathD}
                  pathLength={1}
                  fill="none"
                  stroke="#7C2CF5"
                  strokeWidth={10}
                  strokeLinecap="round"
                  filter="url(#tubeGlow)"
                  strokeDasharray={1}
                  strokeDashoffset={normalizedDashOffset}
                />

                {/* Layer 4: Laser Core Dashed Highlight Line */}
                <path
                  d={pathD}
                  pathLength={1}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="0.015 0.02"
                  strokeDashoffset={normalizedDashOffset}
                  className="text-white/90 dark:text-white/70"
                />

                {/* Layer 5: Traveling Pulse Particle - Primary Purple, Sits Exactly on Tip */}
                {scrollProgress > 0.005 && scrollProgress < 0.995 && (
                  <g transform={`translate(${orbPos.x}, ${orbPos.y})`}>
                    {/* Outer Pulsing Aura Ring */}
                    <circle
                      r={14}
                      className="fill-electric-purple/25 animate-ping"
                    />
                    {/* Mid Glow Halo */}
                    <circle
                      r={9}
                      className="fill-electric-purple/35"
                    />
                    {/* Solid Core Orb in Primary Purple with Crisp White Border */}
                    <circle
                      r={5.5}
                      className="fill-electric-purple stroke-white dark:stroke-midnight-950 stroke-[2] shadow-md"
                    />
                  </g>
                )}
              </>
            )}
          </svg>

          {/* Alternating Checkpoints List (1 to 5) with consistent primary purple theme */}
          <ol className="relative z-10 flex flex-col gap-6 sm:gap-8 lg:gap-10">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;

              // Step threshold along scroll progress
              const stepThreshold = idx / Math.max(steps.length - 1, 1);
              const isReached = scrollProgress >= stepThreshold - 0.03;
              const isCurrent = activeStepIdx === idx;

              return (
                <li
                  key={step.num}
                  className={`relative flex items-center gap-3.5 sm:gap-6 lg:gap-8 transition-all duration-300 ${
                    isEven ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Checkpoint Circular Node - Consistent Primary Purple */}
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
                      className={`absolute -inset-1.5 rounded-full transition-all duration-500 pointer-events-none ${
                        isReached
                          ? 'ring-4 ring-purple-400/50 dark:ring-electric-purple/40 animate-pulse'
                          : 'ring-0'
                      }`}
                    />

                    {/* Main Circular Badge in Primary Purple */}
                    <div
                      className={`flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full border-[2.5px] transition-all duration-500 shadow-md relative ${
                        isReached
                          ? 'bg-gradient-to-br from-electric-purple to-deep-violet border-purple-300 dark:border-lavender-glow shadow-purple-600/30 text-white scale-105'
                          : 'bg-white dark:bg-midnight-surface border-purple-200/90 dark:border-midnight-border hover:border-electric-purple/50'
                      }`}
                    >
                      {renderIcon(idx, isReached)}
                    </div>

                    {/* Number Badge Pill at Bottom */}
                    <span
                      className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex h-4.5 min-w-4.5 sm:h-5 sm:min-w-5 items-center justify-center rounded-full px-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-white shadow z-30 transition-all duration-300 ${
                        isReached
                          ? 'bg-electric-purple ring-1.5 ring-white/60'
                          : 'bg-slate-400 dark:bg-gray-600'
                      }`}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Checkpoint Detail Card with enlarged, highly visible image */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`group relative w-full rounded-2xl sm:rounded-3xl border transition-all duration-300 p-4 sm:p-5 lg:p-6 backdrop-blur-md ${
                        isCurrent
                          ? 'bg-white dark:bg-midnight-card border-purple-300 dark:border-electric-purple/50 shadow-lg shadow-purple-600/10'
                          : isReached
                          ? 'bg-white/95 dark:bg-midnight-card/90 border-purple-200/80 dark:border-midnight-border shadow-sm hover:shadow-md'
                          : 'bg-white/80 dark:bg-midnight-card/60 border-light-border dark:border-midnight-border/60 shadow-sm opacity-90 hover:opacity-100 hover:shadow-md'
                      }`}
                    >
                      {/* Title */}
                      <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-light-text dark:text-white mb-1.5 group-hover:text-electric-purple dark:group-hover:text-lavender-glow transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-light-subtext dark:text-gray-300 leading-relaxed mb-3.5">
                        {step.description}
                      </p>

                      {/* Enlarged & Highly-Visible Transparent Media Image Preview */}
                      {step.image && (
                        <div className="relative w-full h-52 sm:h-64 lg:h-72 rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 border border-purple-100/80 dark:border-midnight-border group/media bg-gradient-to-b from-purple-500/[0.04] to-purple-500/[0.01] dark:from-white/[0.03] dark:to-transparent flex items-center justify-center">
                          {/* Ambient radial purple glow behind transparent illustration */}
                          <div className="absolute inset-0 bg-hero-glow opacity-50 dark:opacity-40 pointer-events-none" />

                          <img
                            src={step.image}
                            alt={step.title}
                            loading={idx === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                            className="w-full h-full object-contain object-center p-2 sm:p-3 group-hover/media:scale-105 transition-transform duration-700 ease-out relative z-10"
                          />

                          {/* Image Bottom Overlay Caption */}
                          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] sm:text-[11px] font-medium pointer-events-none z-20">
                            <span className="truncate drop-shadow-sm font-semibold px-2 py-0.5 rounded-md bg-white/85 dark:bg-black/70 text-slate-800 dark:text-white backdrop-blur-md border border-purple-100 dark:border-white/15 shadow-sm">
                              {step.shortTitle || step.title}
                            </span>
                            <span className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md bg-white/85 dark:bg-black/70 text-slate-700 dark:text-gray-200 backdrop-blur-md border border-purple-100 dark:border-white/15 shadow-sm">
                              Verified Asset
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Deliverables Chip Pills */}
                      <div className="space-y-1">
                        <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-light-subtext/75 dark:text-muted-gray">
                          Key Deliverables
                        </span>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {step.deliverables.map((item, dIdx) => (
                            <span
                              key={dIdx}
                              className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-purple-50/70 dark:bg-white/[0.04] text-slate-700 dark:text-gray-200 border border-purple-100/70 dark:border-white/10 hover:border-electric-purple/40 dark:hover:border-lavender-glow/40 transition-colors"
                            >
                              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                              <span className="truncate max-w-[190px] sm:max-w-none">{item}</span>
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
