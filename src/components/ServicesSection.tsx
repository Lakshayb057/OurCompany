import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Cloud, Bot, Zap, ShieldCheck, ShoppingBag, RefreshCw, Rocket } from 'lucide-react';
import { Service } from '../types';

interface ServicesSectionProps {
  services: Service[];
  onSelectService: (serviceName: string) => void;
  onViewAllServices?: () => void;
}

const DEFAULT_SERVICE_IMAGES: Record<string, string> = {
  'srv-01': '/services/cloud-systems.jpg',
  'srv-02': '/services/ai-agents.jpg',
  'srv-03': '/services/crm-automation.jpg',
  'srv-04': '/services/institutional-erp.jpg',
  'srv-05': '/services/agri-commerce.jpg',
  'srv-06': '/services/campus-marketplaces.jpg',
  'cloud-systems': '/services/cloud-systems.jpg',
  'ai-agents': '/services/ai-agents.jpg',
  'crm-automation': '/services/crm-automation.jpg',
  'institutional-erp': '/services/institutional-erp.jpg',
  'agri-commerce': '/services/agri-commerce.jpg',
  'campus-marketplaces': '/services/campus-marketplaces.jpg',
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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud': return <Cloud className="w-5 h-5 text-electric-purple dark:text-lavender-glow" />;
      case 'Bot': return <Bot className="w-5 h-5 text-electric-purple dark:text-lavender-glow" />;
      case 'Zap': return <Zap className="w-5 h-5 text-electric-purple dark:text-lavender-glow" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-electric-purple dark:text-lavender-glow" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-electric-purple dark:text-lavender-glow" />;
      case 'RefreshCw': return <RefreshCw className="w-5 h-5 text-electric-purple dark:text-lavender-glow" />;
      default: return <Rocket className="w-5 h-5 text-electric-purple dark:text-lavender-glow" />;
    }
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
          className="max-w-3xl mx-auto text-center space-y-4 mb-6 sm:mb-16"
          style={isMobile ? undefined : {
            opacity: isInView ? 1 : 0,
            transform: isInView 
              ? 'perspective(1000px) translateY(0) scale(1) rotateX(0deg)' 
              : 'perspective(1000px) translateY(36px) scale(0.95) rotateX(-10deg)',
            filter: isInView ? 'blur(0px)' : 'blur(8px)',
            transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), filter 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
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

        {/* 4K Portrait Explanatory Showcase Grid with Staggered Cascading 3D Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const imgSrc = service.image || DEFAULT_SERVICE_IMAGES[service.id] || DEFAULT_SERVICE_IMAGES[service.slug] || '/services/cloud-systems.jpg';
            const shortDomain = service.domain || service.title;
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
                className="group relative rounded-3xl overflow-hidden bg-white/90 dark:bg-midnight-card/90 border border-purple-100/90 dark:border-electric-purple/20 hover:border-electric-purple/50 dark:hover:border-electric-purple/60 transition-all duration-500 shadow-none hover:shadow-none flex flex-col justify-between"
              >
                {/* 4K Portrait Explanatory Imagery Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-900">
                  <img
                    src={imgSrc}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dual-Theme Atmospheric Gradients */}
                  {/* Top subtle vignette */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Bottom smooth fade to card body */}
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-midnight-card dark:via-midnight-card/85 dark:to-transparent pointer-events-none transition-colors duration-300" />

                  {/* Top Floating Glass Domain Pill */}
                  <div 
                    className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none"
                    style={isMobile ? undefined : {
                      opacity: isInView ? 1 : 0,
                      transform: isInView ? 'translateY(0)' : 'translateY(-12px)',
                      transition: `opacity 0.6s ease-out ${staggerDelay + 160}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay + 160}ms`,
                    }}
                  >
                    <div className="px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-midnight/80 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-sm flex items-center gap-2">
                      {getIcon(service.icon)}
                      <span className="text-xs font-semibold tracking-wide text-slate-800 dark:text-gray-200">
                        {shortDomain}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Clean Bottom Meta & Action */}
                <div 
                  className="relative z-10 p-6 pt-2 space-y-4"
                  style={isMobile ? undefined : {
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(14px)',
                    transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay + 100}ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay + 100}ms`,
                  }}
                >
                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-light-text dark:text-white group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors line-clamp-2">
                    {service.title}
                  </h3>

                  {/* Sleek CTA Button */}
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full py-3 px-5 rounded-2xl bg-lavender-soft hover:bg-electric-purple text-electric-dark hover:text-white dark:bg-midnight-surface dark:border-electric-purple/30 dark:hover:bg-electric-purple dark:text-white border border-purple-200/80 text-sm font-semibold flex items-center justify-between group/btn transition-all duration-300 shadow-sm hover:shadow-md"
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
          <div className="mt-6 sm:mt-14 flex justify-center">
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
