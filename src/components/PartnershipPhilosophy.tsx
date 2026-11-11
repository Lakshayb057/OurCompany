import React, { useState, useEffect, useRef } from 'react';
import { Code, Compass, Server } from 'lucide-react';

interface AllocationTier {
  percentage: string;
  title: string;
  description: string;
  icon: 'code' | 'compass' | 'server';
  accentColor: string;
}

const ALLOCATION_TIERS: AllocationTier[] = [
  {
    percentage: '50%',
    title: 'Direct Engineering & Core Delivery',
    description: "The lion's share of resources is dedicated directly to senior full-stack development, code reviews, database architecture, and performance hardening.",
    icon: 'code',
    accentColor: 'from-electric-purple to-deep-violet'
  },
  {
    percentage: '30%',
    title: 'Project Leadership & Client Success',
    description: 'Continuous technical direction, milestone governance, daily alignment, and end-to-end project management.',
    icon: 'compass',
    accentColor: 'from-lavender-glow to-electric-purple'
  },
  {
    percentage: '20%',
    title: 'Infrastructure, Tools & R&D Reserves',
    description: 'High-availability cloud compute, automated testing suites, deployment tooling, and guaranteed reserve support.',
    icon: 'server',
    accentColor: 'from-deep-violet to-purple-800'
  }
];

const ModelCard: React.FC<{
  tier: AllocationTier;
  index: number;
  isInView: boolean;
}> = ({ tier, index, isInView }) => {
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

  return (
    <div
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease-out ${index * 120}ms, transform 0.6s ease-out ${index * 120}ms`,
      }}
      className="relative rounded-3xl overflow-hidden bg-white/95 dark:bg-midnight-card/90 border border-purple-200/80 dark:border-midnight-border/80 p-5 sm:p-8 md:p-9 flex flex-col justify-between shadow-none select-none min-h-[240px] sm:min-h-[320px]"
    >
      {/* Subtle Depth Watermark Number */}
      <div className="absolute -top-4 -right-2 text-8xl sm:text-9xl font-black font-mono text-purple-900/5 dark:text-white/5 pointer-events-none select-none">
        {tier.percentage}
      </div>

      <div className="relative z-10 space-y-6">
        {/* Top Icon & Percentage Header */}
        <div className="flex items-center justify-between">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.accentColor} flex items-center justify-center shadow-none`}>
            {getIcon()}
          </div>
          
          <div className="text-right">
            <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-light-text dark:text-white">
              {tier.percentage}
            </span>
            <div className="text-[10px] font-mono uppercase tracking-wider text-light-subtext dark:text-muted-gray font-bold">
              Allocation
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-light-text dark:text-white tracking-tight leading-snug">
            {tier.title}
          </h3>
          <p className="text-light-subtext dark:text-gray-300 text-sm leading-relaxed mt-3 font-normal">
            {tier.description}
          </p>
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
    <section ref={sectionRef} className="py-8 sm:py-16 md:py-24 relative overflow-hidden bg-light-100/50 dark:bg-midnight-900/40 transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-electric-purple/5 dark:bg-electric-purple/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-lavender-glow/5 dark:bg-deep-violet/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Center-Aligned Section Header matching all other flagship sections */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 mb-6 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
            Aligned Incentives, <span className="text-gradient-purple">Zero Waste</span>
          </h2>
          <p className="text-light-subtext dark:text-muted-gray text-base sm:text-lg leading-relaxed">
            A disciplined 100% milestone allocation model where every dollar fuels product excellence, senior engineering, and zero agency bloat.
          </p>
        </div>

        {/* Revenue Model Cards Grid (Completely Flat, Clean & Stable - Zero Hover Tilt/Warp) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {ALLOCATION_TIERS.map((tier, idx) => (
            <ModelCard
              key={idx}
              tier={tier}
              index={idx}
              isInView={isInView}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
