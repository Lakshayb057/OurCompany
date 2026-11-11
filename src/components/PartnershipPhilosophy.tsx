import React, { useState, useEffect, useRef } from 'react';
import { Shield, Code, Compass, Server, Check } from 'lucide-react';

interface AllocationTier {
  percentage: string;
  fraction: number;
  title: string;
  description: string;
  icon: 'code' | 'compass' | 'server';
  accentColor: string;
  deliverables: string[];
}

const ALLOCATION_TIERS: AllocationTier[] = [
  {
    percentage: '50%',
    fraction: 50,
    title: 'Direct Engineering & Core Delivery',
    description: "The lion's share of resources is dedicated directly to senior full-stack development, code reviews, database architecture, and performance hardening.",
    icon: 'code',
    accentColor: 'from-electric-purple to-deep-violet',
    deliverables: ['Senior Full-Stack Code', 'Database Architecture', 'Performance Hardening', 'Strict Code Audits']
  },
  {
    percentage: '30%',
    fraction: 30,
    title: 'Project Leadership & Client Success',
    description: 'Continuous technical direction, milestone governance, daily alignment, and end-to-end project management.',
    icon: 'compass',
    accentColor: 'from-lavender-glow to-electric-purple',
    deliverables: ['Technical Direction', 'Milestone Governance', 'Daily Standups & Sync', 'End-to-End Alignment']
  },
  {
    percentage: '20%',
    fraction: 20,
    title: 'Infrastructure, Tools & R&D Reserves',
    description: 'High-availability cloud compute, automated testing suites, deployment tooling, and guaranteed reserve support.',
    icon: 'server',
    accentColor: 'from-deep-violet to-purple-800',
    deliverables: ['AWS Cloud Compute', 'Automated CI/CD Suites', 'Deployment Tooling', 'Guaranteed Reserves']
  }
];

const Model3DCard: React.FC<{
  tier: AllocationTier;
  index: number;
  isInView: boolean;
}> = ({ tier, index, isInView }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const getIcon = () => {
    switch (tier.icon) {
      case 'code':
        return <Code className="w-6 h-6 text-white" />;
      case 'compass':
        return <Compass className="w-6 h-6 text-white" />;
      case 'server':
        return <Server className="w-6 h-6 text-white" />;
    }
  };

  const staggerDelay = index * 160;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(0) scale(1)`
          : 'perspective(1000px) rotateX(16deg) rotateY(0deg) translateY(50px) scale(0.92)',
        transition: rotateX === 0 && rotateY === 0
          ? `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms`
          : 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className="group relative rounded-3xl overflow-hidden bg-white/95 dark:bg-midnight-card/90 border border-purple-200/80 dark:border-midnight-border/80 hover:border-electric-purple/80 dark:hover:border-electric-purple/80 p-8 flex flex-col justify-between shadow-none hover:shadow-none select-none transition-colors duration-300"
    >
      {/* 3D Dynamic Holographic Mouse Glare Beam */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(400px circle at ${glare.x}% ${glare.y}%, rgba(124, 44, 245, 0.14), transparent 70%)`,
        }}
      />

      {/* Subtle 3D Depth Watermark Number */}
      <div 
        style={{ transform: 'translateZ(15px)' }}
        className="absolute -top-4 -right-2 text-8xl sm:text-9xl font-black font-mono text-purple-900/5 dark:text-white/5 pointer-events-none select-none"
      >
        {tier.percentage}
      </div>

      <div className="relative z-10 space-y-6" style={{ transform: 'translateZ(30px)' }}>
        {/* Top Icon & Percentage Header */}
        <div className="flex items-center justify-between">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.accentColor} flex items-center justify-center shadow-none`}>
            {getIcon()}
          </div>
          
          <div className="text-right">
            <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-light-text dark:text-white group-hover:text-electric-purple dark:group-hover:text-lavender-glow transition-colors">
              {tier.percentage}
            </span>
            <div className="text-[10px] font-mono uppercase tracking-wider text-light-subtext dark:text-muted-gray font-bold">
              Allocation
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-light-text dark:text-white tracking-tight leading-snug group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors">
            {tier.title}
          </h3>
          <p className="text-light-subtext dark:text-gray-300 text-sm leading-relaxed mt-2.5 font-normal">
            {tier.description}
          </p>
        </div>
      </div>

      {/* Bottom Allocation Bar & Focus Deliverables */}
      <div className="relative z-10 pt-6 space-y-5" style={{ transform: 'translateZ(25px)' }}>
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-light-subtext dark:text-muted-gray font-semibold">
            <span>Milestone Allocation</span>
            <span>{tier.percentage} of Scope</span>
          </div>
          <div className="w-full h-2 rounded-full bg-purple-100 dark:bg-midnight-surface overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${tier.accentColor} transition-all duration-1000 ease-out`}
              style={{ width: `${tier.fraction}%` }}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-purple-100 dark:border-midnight-border/70 flex flex-wrap gap-1.5">
          {tier.deliverables.map((item, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-light-surface dark:bg-midnight-surface/80 text-light-text dark:text-gray-300 border border-purple-100 dark:border-midnight-border flex items-center gap-1 shadow-none"
            >
              <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PartnershipPhilosophy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-light-100/50 dark:bg-midnight-900/40 transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-electric-purple/5 dark:bg-electric-purple/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-lavender-glow/5 dark:bg-deep-violet/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Center-Aligned Section Header matching all other flagship sections */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
            Aligned Incentives, <span className="text-gradient-purple">Zero Waste</span>
          </h2>
          <p className="text-light-subtext dark:text-muted-gray text-base sm:text-lg leading-relaxed">
            A disciplined 100% milestone allocation model where every dollar fuels product excellence, senior engineering, and zero agency bloat.
          </p>
        </div>

        {/* 3D Revenue Model Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {ALLOCATION_TIERS.map((tier, idx) => (
            <Model3DCard
              key={idx}
              tier={tier}
              index={idx}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom Trust Guarantee Seal */}
        <div className="mt-14 max-w-xl mx-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white dark:bg-midnight-card border border-purple-200/80 dark:border-midnight-border/80 text-xs font-mono text-light-subtext dark:text-muted-gray shadow-none text-center">
          <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>Strict 100% total milestone allocation verified and transparently reported on every build.</span>
        </div>

      </div>
    </section>
  );
};
