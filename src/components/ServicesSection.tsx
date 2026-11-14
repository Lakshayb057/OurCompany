import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Service } from '../types';

interface ServicesSectionProps {
  services: Service[];
  onSelectService: (serviceName: string) => void;
  onViewAllServices?: () => void;
}

const CLIPART_MAP: Record<string, string> = {
  'srv-01': '/services/cliparts/1.webp',
  'srv-02': '/services/cliparts/2.webp',
  'srv-03': '/services/cliparts/3.webp',
  'srv-04': '/services/cliparts/4.webp',
  'srv-05': '/services/cliparts/5.webp',
  'srv-06': '/services/cliparts/6.webp',
  'cloud-systems': '/services/cliparts/1.webp',
  'ai-agents': '/services/cliparts/2.webp',
  'crm-automation': '/services/cliparts/3.webp',
  'institutional-erp': '/services/cliparts/4.webp',
  'agri-commerce': '/services/cliparts/5.webp',
  'campus-marketplaces': '/services/cliparts/6.webp',
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  services, 
  onSelectService,
  onViewAllServices
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const hasExitedRef = useRef(false);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // IntersectionObserver to orchestrate smooth entrance every time the section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          hasExitedRef.current = true;
          setIsInView(false);
        } else {
          setIsInView(true);
          hasExitedRef.current = false;
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getClipartSrc = (service: Service, idx: number) => {
    if (service.image && service.image.includes('/cliparts/')) {
      return service.image;
    }
    return CLIPART_MAP[service.id] || CLIPART_MAP[service.slug] || `/services/cliparts/${(idx % 6) + 1}.webp`;
  };

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-8 sm:py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Reveal (Desktop only) */}
        <div 
          className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-16"
          style={isMobile ? undefined : {
            opacity: isInView ? 1 : 0,
            transform: isInView 
              ? 'perspective(1000px) translateY(0) scale(1) rotateX(0deg)' 
              : 'perspective(1000px) translateY(36px) scale(0.95) rotateX(-10deg)',
            filter: isInView ? 'blur(0px)' : 'blur(8px)',
            transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), filter 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lavender-soft/80 dark:bg-white/[0.06] border border-purple-200/60 dark:border-white/10 text-xs font-semibold text-electric-purple dark:text-lavender-light">
            <span>Specialized Engineering Pillars</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
            Engineering <span className="text-gradient-purple">Capabilities</span>
          </h2>
          <p 
            className="text-light-subtext dark:text-muted-gray text-base leading-relaxed"
            style={isMobile ? undefined : {
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 120ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 120ms',
            }}
          >
            Enterprise architecture, intelligent automation, and real-time platforms engineered for scale.
          </p>
        </div>

        {/* 3-Column Clipart Showcase Grid with Staggered Cascading 3D Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, idx) => {
            const imgSrc = getClipartSrc(service, idx);
            const staggerDelay = 150 + idx * 95;

            return (
              <div
                key={service.id}
                style={isMobile ? undefined : {
                  opacity: isInView ? 1 : 0,
                  transform: isInView 
                    ? 'perspective(1000px) translateY(0) scale(1) rotateX(0deg) translateZ(0px)' 
                    : 'perspective(1000px) translateY(54px) scale(0.92) rotateX(12deg) translateZ(-50px)',
                  filter: isInView ? 'blur(0px)' : 'blur(10px)',
                  transition: `opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, filter 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms`,
                  transformOrigin: 'bottom center',
                }}
                className="group relative rounded-3xl p-6 sm:p-7 bg-white/90 dark:bg-midnight-card/85 border border-purple-100/90 dark:border-white/10 hover:border-electric-purple/50 dark:hover:border-electric-purple/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between hover:-translate-y-1.5 backdrop-blur-xl"
              >
                {/* TOP: Header (Service Title) */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-light-text dark:text-white group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors line-clamp-2 min-h-[3.25rem]">
                    {service.title}
                  </h3>
                </div>

                {/* MIDDLE: Seamless Clipart Illustration (No Box Container) */}
                <div className="relative my-3 sm:my-4 h-44 sm:h-48 w-full flex items-center justify-center">
                  {/* Subtle ambient aura behind illustration */}
                  <div className="absolute w-3/4 h-28 rounded-full bg-electric-purple/10 dark:bg-lavender-glow/15 blur-2xl pointer-events-none opacity-40 group-hover:opacity-85 transition-opacity duration-500" />

                  {/* Transparent Tinted Clipart */}
                  <img
                    src={imgSrc}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 max-h-40 sm:max-h-44 max-w-[94%] object-contain transform transition-all duration-500 ease-out group-hover:scale-106 group-hover:-translate-y-1.5 drop-shadow-[0_4px_14px_rgba(124,44,245,0.15)] dark:drop-shadow-[0_4px_18px_rgba(182,108,255,0.4)] dark:brightness-130"
                  />
                </div>

                {/* BOTTOM: Concise Description & Action Button */}
                <div className="space-y-4 pt-1">
                  <p className="text-light-subtext dark:text-gray-300 text-sm leading-relaxed line-clamp-3 min-h-[3.75rem]">
                    {service.summary || "Enterprise-grade digital architecture and high-velocity engineering engineered for real-time scale."}
                  </p>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full py-2.5 sm:py-3 px-4 sm:px-5 rounded-2xl bg-lavender-soft/80 hover:bg-electric-purple text-electric-dark hover:text-white dark:bg-white/[0.06] dark:border-electric-purple/30 dark:hover:bg-electric-purple dark:text-white border border-purple-200/80 text-xs sm:text-sm font-semibold flex items-center justify-between group/btn transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md hover:shadow-purple-500/20"
                  >
                    <span>Inquire for {service.title.split('&')[0].trim().split(' ')[0]}</span>
                    <div className="w-7 h-7 rounded-full bg-white/80 dark:bg-white/10 group-hover/btn:bg-white/20 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 text-electric-purple group-hover/btn:text-white dark:text-lavender-glow group-hover/btn:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore All Services Action */}
        {onViewAllServices && (
          <div className="mt-8 sm:mt-14 flex justify-center">
            <button
              onClick={onViewAllServices}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-white/15 text-sm font-semibold text-light-text dark:text-white hover:text-electric-purple dark:hover:text-lavender-light hover:border-electric-purple hover:bg-lavender-soft/40 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer shadow-none hover:shadow-none"
            >
              <span>Explore All Engineering Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
