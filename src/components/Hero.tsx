import React, { useState, useEffect, useRef } from 'react';

interface HeroProps {
  onStartProject?: () => void;
  onExplorePortfolio: () => void;
  anchorRef?: React.RefObject<HTMLDivElement>;
  btnAnchorRef?: React.RefObject<HTMLDivElement>;
  startBtnAnchorRef?: React.RefObject<HTMLDivElement>;
  exploreBtnAnchorRef?: React.RefObject<HTMLDivElement>;
}

export const Hero: React.FC<HeroProps> = ({
  onStartProject,
  onExplorePortfolio,
  anchorRef,
  btnAnchorRef,
  startBtnAnchorRef,
  exploreBtnAnchorRef
}) => {
  const [isEntered, setIsEntered] = useState(false);
  const heroSectionRef = useRef<HTMLElement>(null);
  const hasExitedRef = useRef(false);

  // Trigger entrance effect on initial page load and whenever user navigates back to Hero
  useEffect(() => {
    // Initial entrance on first load
    const mountTimer = setTimeout(() => {
      setIsEntered(true);
    }, 80);

    // Re-trigger entrance whenever the user scrolls away and returns to the Hero section
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          hasExitedRef.current = true;
        } else if (hasExitedRef.current) {
          // Re-trigger the kinetic typography and animations
          setIsEntered(false);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsEntered(true);
              hasExitedRef.current = false;
            });
          });
        }
      },
      { threshold: 0.25 }
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => {
      clearTimeout(mountTimer);
      observer.disconnect();
    };
  }, []);

  const metricsData = [
    { value: '50+', label: 'Fleet WhatsApp Sessions', color: 'text-light-text dark:text-white' },
    { value: '100K+', label: 'Lead Records Processed', color: 'text-electric-purple dark:text-lavender-glow' },
    { value: '90%', label: 'Manual Effort Saved (AI OCR)', color: 'text-electric-dark dark:text-electric-light' },
    { value: '₹1.1L+', label: 'Verified Client Project ROI', color: 'text-light-text dark:text-white' },
    { value: '100%', label: 'Idempotent Settlement Logic', color: 'text-electric-purple dark:text-lavender-glow', colSpan: true },
  ];

  return (
    <section 
      ref={heroSectionRef}
      id="hero" 
      className="relative min-h-screen pt-28 pb-8 sm:pt-30 sm:pb-10 flex flex-col justify-center overflow-hidden"
    >
      {/* Hero-Only Video & Animated WebP Dynamic Background with smooth entrance fade */}
      <div 
        style={{
          opacity: isEntered ? 1 : 0,
          transform: isEntered ? 'scale(1)' : 'scale(1.05)',
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster.jpg"
          className="w-full h-full object-cover opacity-25 dark:opacity-40"
        >
          <source src="/hero-bg.webm" type="video/webm" />
          <source src="/hero-bg.mp4" type="video/mp4" />
          <img
            src="/hero-bg.webp"
            alt="Hero Background Animation"
            className="w-full h-full object-cover"
          />
        </video>
        {/* Soft edge blend so the video seamlessly fades out at top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-light/60 via-transparent to-light dark:from-midnight/60 dark:via-transparent dark:to-midnight pointer-events-none" />
      </div>

      {/* Light background glow effects */}
      <div 
        style={{
          opacity: isEntered ? 1 : 0,
          transform: isEntered ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 1.4s ease-out, transform 1.4s ease-out',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-electric-purple/10 dark:bg-electric-purple/20 blur-[130px] pointer-events-none rounded-full" 
      />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[400px] h-[300px] bg-lavender-glow/15 dark:bg-deep-violet/25 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-lavender-soft/40 dark:bg-lavender-glow/15 blur-[130px] pointer-events-none rounded-full" />

      {/* Grid texture overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#7c2cf50c_1px,transparent_1px),linear-gradient(to_bottom,#7c2cf50c_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1b172a15_1px,transparent_1px),linear-gradient(to_bottom,#1b172a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Hero Visual Artwork Container (Anchors the Morphing 3D Logo) */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Soft circular ambient glow behind ribbon artwork */}
              <div 
                style={{
                  opacity: isEntered ? 1 : 0,
                  transform: isEntered ? 'scale(1)' : 'scale(0.7)',
                  transition: 'opacity 1s ease-out, transform 1s ease-out',
                  transitionDelay: '200ms',
                }}
                className="absolute -inset-4 bg-electric-purple/15 dark:bg-electric-purple/20 rounded-full blur-3xl pointer-events-none" 
              />

              {/* Layout footprint & anchor element measured by MorphingLogo */}
              <div
                ref={anchorRef}
                className="relative aspect-[3/2] w-full pointer-events-none opacity-0"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Right Column: Story & Typography */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left order-1 lg:order-2">
            {/* 3D Kinetic Headline with Staggered Word Reveal */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-light-text dark:text-white flex flex-col items-center lg:items-start gap-1">
              {/* Line 1: CODEVERSE */}
              <div className="overflow-hidden py-1">
                <div
                  style={{
                    opacity: isEntered ? 1 : 0,
                    transform: isEntered 
                      ? 'perspective(800px) translateY(0) rotateX(0deg) scale(1)' 
                      : 'perspective(800px) translateY(45px) rotateX(-35deg) scale(0.92)',
                    filter: isEntered ? 'blur(0px)' : 'blur(10px)',
                    transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '100ms',
                    transformOrigin: 'bottom center',
                  }}
                >
                  <span className="text-gradient-purple drop-shadow-[0_4px_18px_rgba(124,44,245,0.25)]">CODEVERSE</span>
                </div>
              </div>

              {/* Line 2: TURNING IDEAS INTO */}
              <div className="overflow-hidden py-1">
                <div
                  style={{
                    opacity: isEntered ? 1 : 0,
                    transform: isEntered 
                      ? 'perspective(800px) translateY(0) rotateX(0deg) scale(1)' 
                      : 'perspective(800px) translateY(45px) rotateX(-30deg) scale(0.94)',
                    filter: isEntered ? 'blur(0px)' : 'blur(8px)',
                    transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '240ms',
                    transformOrigin: 'bottom center',
                  }}
                >
                  TURNING IDEAS INTO
                </div>
              </div>

              {/* Line 3: TECHNOLOGY */}
              <div className="overflow-hidden py-1">
                <div
                  style={{
                    opacity: isEntered ? 1 : 0,
                    transform: isEntered 
                      ? 'perspective(800px) translateY(0) rotateX(0deg) scale(1)' 
                      : 'perspective(800px) translateY(45px) rotateX(-35deg) scale(0.92)',
                    filter: isEntered ? 'blur(0px)' : 'blur(10px)',
                    transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '380ms',
                    transformOrigin: 'bottom center',
                  }}
                >
                  <span className="text-gradient-purple drop-shadow-[0_4px_18px_rgba(124,44,245,0.25)]">TECHNOLOGY</span>
                </div>
              </div>
            </h1>

            {/* Action buttons footprint */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div
                ref={startBtnAnchorRef ?? btnAnchorRef}
                className="w-full sm:w-auto h-[56px] min-w-[178px] rounded-xl pointer-events-none opacity-0"
                aria-hidden="true"
              />
              <div
                ref={exploreBtnAnchorRef}
                className="w-full sm:w-auto h-[56px] min-w-[178px] rounded-xl pointer-events-none opacity-0"
                aria-hidden="true"
              />
            </div>

            {/* Terminal snippet / Micro-telemetry with Staggered Entrance */}
            <div 
              style={{
                opacity: isEntered ? 1 : 0,
                transform: isEntered ? 'translateY(0)' : 'translateY(22px)',
                transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '580ms',
              }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-light-subtext dark:text-muted-gray/90"
            >
              <div 
                style={{
                  opacity: isEntered ? 1 : 0,
                  transform: isEntered ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  transitionDelay: '620ms',
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50/70 dark:bg-midnight-card/70 border border-purple-100/90 dark:border-midnight-border/70"
              >
                <span className="text-electric-purple font-semibold">&gt;_</span>
                <span className="text-light-text dark:text-gray-200">PERN / Microservices</span>
              </div>

              <span className="text-light-border dark:text-midnight-border hidden sm:inline">•</span>

              <div 
                style={{
                  opacity: isEntered ? 1 : 0,
                  transform: isEntered ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  transitionDelay: '720ms',
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50/70 dark:bg-midnight-card/70 border border-purple-100/90 dark:border-midnight-border/70"
              >
                <span className="text-electric-purple font-semibold">&gt;_</span>
                <span className="text-light-text dark:text-gray-200">WebSockets &amp; Real-Time</span>
              </div>

              <span className="text-light-border dark:text-midnight-border hidden sm:inline">•</span>

              <div 
                style={{
                  opacity: isEntered ? 1 : 0,
                  transform: isEntered ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  transitionDelay: '820ms',
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50/70 dark:bg-midnight-card/70 border border-purple-100/90 dark:border-midnight-border/70"
              >
                <span className="text-electric-purple font-semibold">&gt;_</span>
                <span className="text-light-text dark:text-gray-200">Gemini 2.5 Flash OCR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar with Staggered Entrance and Reduced Margin */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-light-border dark:border-midnight-border/60 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 items-stretch">
          {metricsData.map((metric, index) => (
            <div 
              key={metric.label}
              style={{
                opacity: isEntered ? 1 : 0,
                transform: isEntered ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.95)',
                transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${720 + index * 80}ms`,
              }}
              className={`p-3 sm:p-3.5 rounded-xl bg-white/85 dark:bg-midnight-card/50 border border-light-border dark:border-midnight-border/60 shadow-sm hover:border-electric-purple/50 dark:hover:border-electric-purple/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5 ${metric.colSpan ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              <div className={`text-xl sm:text-2xl font-bold font-mono transition-transform duration-300 group-hover:scale-105 ${metric.color}`}>
                {metric.value}
              </div>
              <div className="text-[11px] sm:text-xs text-light-subtext dark:text-muted-gray mt-1 leading-snug group-hover:text-light-text dark:group-hover:text-white transition-colors">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
