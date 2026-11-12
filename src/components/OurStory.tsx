import React, { useState, useEffect, useRef } from 'react';
import { RailwayTrack } from './RailwayTrack';

// Reusable scroll-reveal hook that triggers whenever an element enters or leaves the viewport
const useScrollReveal = (threshold = 0.18, rootMargin = '0px 0px -40px 0px') => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Automatically toggles inView on every scroll into or out of view
        setInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView] as const;
};

interface OurStoryProps {
  content?: {
    heading?: string;
    subheading?: string;
    paragraph1?: string;
    paragraph2?: string;
    stats?: { label: string; value: string }[];
  };
}

export const OurStory: React.FC<OurStoryProps> = ({ content }) => {
  // Independent scroll observers for each distinct content block
  const [headerRef, isHeaderInView] = useScrollReveal(0.25, '0px 0px -30px 0px');
  const [cardsRowRef, isCardsRowInView] = useScrollReveal(0.18, '0px 0px -40px 0px');
  const [processRef, isProcessInView] = useScrollReveal(0.18, '0px 0px -40px 0px');

  const headline = content?.heading || 'Why CodeVerse Exists';
  const subheading = content?.subheading || "We started with a foundational truth: modern businesses don't just need software; they need resilient, intelligent digital engines built with surgical craftsmanship.";

  return (
    <section 
      id="story" 
      className="py-8 sm:py-16 md:py-24 relative overflow-hidden w-full max-w-full bg-light-100/60 dark:bg-midnight-900/60 border-t border-b border-light-border dark:border-midnight-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. SECTION HEADER: Triggers when the header scrolls into view */}
        <div 
          ref={headerRef}
          className="max-w-3xl mx-auto text-center space-y-4"
          style={{
            transform: isHeaderInView ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.96)',
            opacity: isHeaderInView ? 1 : 0,
            filter: isHeaderInView ? 'blur(0px)' : 'blur(6px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s ease-out',
          }}
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
            {headline}
          </h2>
          <p 
            className="text-light-subtext dark:text-muted-gray text-base sm:text-lg leading-relaxed"
            style={{
              transform: isHeaderInView ? 'translateY(0)' : 'translateY(16px)',
              opacity: isHeaderInView ? 1 : 0,
              transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 100ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 100ms',
            }}
          >
            {subheading}
          </p>
        </div>

        {/* Unified Glass Container */}
        <div className="mt-6 sm:mt-16 glass-panel rounded-2xl border border-light-border dark:border-midnight-border overflow-hidden shadow-lg">
          
          {/* 2. TOP HALF (Mission, Philosophy & Vision): Triggers when this row scrolls into view */}
          <div 
            ref={cardsRowRef}
            className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-light-border dark:divide-midnight-border/70"
          >
            
            {/* Mission Card */}
            <div className="p-5 sm:p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-electric-purple/5 dark:bg-electric-purple/10 rounded-full blur-2xl group-hover:bg-electric-purple/15 transition-all pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-5">
                {/* 1. Icon Badge: 3D Entrance */}
                <div 
                  className="w-12 h-12 rounded-xl bg-lavender-soft dark:bg-electric-purple/15 border border-purple-200 dark:border-electric-purple/40 flex items-center justify-center shadow-sm select-none flex-shrink-0"
                  style={{
                    transform: isCardsRowInView 
                      ? 'perspective(600px) scale(1) translateZ(0) rotateY(0)' 
                      : 'perspective(600px) scale(0.55) translateZ(-40px) rotateY(-35deg)',
                    opacity: isCardsRowInView ? 1 : 0,
                    transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 80ms',
                  }}
                >
                  <img
                    src="/mission-target.png"
                    alt="Our Mission"
                    className="w-6 h-6 object-contain dark:invert transition-transform duration-300 group-hover:scale-110 pointer-events-none"
                  />
                </div>

                {/* 2. "Our Mission" Text Unfurls horizontally out from the icon in radiant gradient */}
                <div
                  style={{
                    perspective: '600px',
                    transformStyle: 'preserve-3d',
                  }}
                  className={`overflow-hidden transition-all ease-out ${
                    isCardsRowInView
                      ? 'max-w-[280px] opacity-100 duration-700 delay-[260ms] pointer-events-auto'
                      : 'max-w-0 opacity-0 duration-200 delay-0 pointer-events-none'
                  }`}
                >
                  <div
                    className="whitespace-nowrap transition-transform duration-700 ease-out"
                    style={{
                      transform: isCardsRowInView 
                        ? 'perspective(600px) rotateY(0deg) translateX(0) scale(1)' 
                        : 'perspective(600px) rotateY(-60deg) translateX(-24px) scale(0.85)',
                      transformOrigin: 'left center',
                    }}
                  >
                    <h3 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet bg-clip-text text-transparent">
                      Our Mission
                    </h3>
                  </div>
                </div>
              </div>

              {/* Tagline & Body */}
              <div
                style={{
                  transform: isCardsRowInView ? 'translateY(0)' : 'translateY(16px)',
                  opacity: isCardsRowInView ? 1 : 0,
                  transition: 'opacity 0.6s ease-out 380ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 380ms',
                }}
              >
                <p className="text-base font-semibold text-light-text dark:text-white mb-2">
                  Engineering Solutions That Matter.
                </p>
                <p className="text-light-subtext dark:text-muted-gray text-base leading-relaxed">
                  We build reliable, scalable software that helps businesses overcome challenges, streamline operations, and achieve real results.
                </p>
              </div>
            </div>

            {/* Philosophy Card */}
            <div className="p-5 sm:p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-electric-purple/5 dark:bg-electric-purple/10 rounded-full blur-2xl group-hover:bg-electric-purple/15 transition-all pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-5">
                {/* 1. Icon Badge: 3D Entrance */}
                <div 
                  className="w-12 h-12 rounded-xl bg-lavender-soft dark:bg-electric-purple/15 border border-purple-200 dark:border-electric-purple/40 flex items-center justify-center shadow-sm select-none flex-shrink-0"
                  style={{
                    transform: isCardsRowInView 
                      ? 'perspective(600px) scale(1) translateZ(0) rotateY(0)' 
                      : 'perspective(600px) scale(0.55) translateZ(-40px) rotateY(-35deg)',
                    opacity: isCardsRowInView ? 1 : 0,
                    transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 180ms',
                  }}
                >
                  <img
                    src="/philosophy-head.png"
                    alt="Our Philosophy"
                    className="w-6 h-6 object-contain dark:invert transition-transform duration-300 group-hover:scale-110 pointer-events-none"
                  />
                </div>

                {/* 2. "Our Philosophy" Text Unfurls horizontally out from the icon in radiant gradient */}
                <div
                  style={{
                    perspective: '600px',
                    transformStyle: 'preserve-3d',
                  }}
                  className={`overflow-hidden transition-all ease-out ${
                    isCardsRowInView
                      ? 'max-w-[280px] opacity-100 duration-700 delay-[360ms] pointer-events-auto'
                      : 'max-w-0 opacity-0 duration-200 delay-0 pointer-events-none'
                  }`}
                >
                  <div
                    className="whitespace-nowrap transition-transform duration-700 ease-out"
                    style={{
                      transform: isCardsRowInView 
                        ? 'perspective(600px) rotateY(0deg) translateX(0) scale(1)' 
                        : 'perspective(600px) rotateY(-60deg) translateX(-24px) scale(0.85)',
                      transformOrigin: 'left center',
                    }}
                  >
                    <h3 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-electric-purple via-lavender-light to-deep-violet bg-clip-text text-transparent">
                      Our Philosophy
                    </h3>
                  </div>
                </div>
              </div>

              {/* Tagline & Body */}
              <div
                style={{
                  transform: isCardsRowInView ? 'translateY(0)' : 'translateY(16px)',
                  opacity: isCardsRowInView ? 1 : 0,
                  transition: 'opacity 0.6s ease-out 480ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 480ms',
                }}
              >
                <p className="text-base font-semibold text-light-text dark:text-white mb-2">
                  Technology with Purpose.
                </p>
                <p className="text-light-subtext dark:text-muted-gray text-base leading-relaxed">
                  We believe technology should solve real problems, create opportunities, and make a meaningful impact.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="p-5 sm:p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-electric-purple/5 dark:bg-electric-purple/10 rounded-full blur-2xl group-hover:bg-electric-purple/15 transition-all pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-5">
                {/* 1. Icon Badge: 3D Entrance */}
                <div 
                  className="w-12 h-12 rounded-xl bg-lavender-soft dark:bg-electric-purple/15 border border-purple-200 dark:border-electric-purple/40 flex items-center justify-center shadow-sm select-none flex-shrink-0"
                  style={{
                    transform: isCardsRowInView 
                      ? 'perspective(600px) scale(1) translateZ(0) rotateY(0)' 
                      : 'perspective(600px) scale(0.55) translateZ(-40px) rotateY(-35deg)',
                    opacity: isCardsRowInView ? 1 : 0,
                    transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 280ms',
                  }}
                >
                  <img
                    src="/vision-bulb.png"
                    alt="Our Vision"
                    className="w-6 h-6 object-contain dark:invert transition-transform duration-300 group-hover:scale-110 pointer-events-none"
                  />
                </div>

                {/* 2. "Our Vision" Text Unfurls horizontally out from the icon in radiant gradient */}
                <div
                  style={{
                    perspective: '600px',
                    transformStyle: 'preserve-3d',
                  }}
                  className={`overflow-hidden transition-all ease-out ${
                    isCardsRowInView
                      ? 'max-w-[280px] opacity-100 duration-700 delay-[460ms] pointer-events-auto'
                      : 'max-w-0 opacity-0 duration-200 delay-0 pointer-events-none'
                  }`}
                >
                  <div
                    className="whitespace-nowrap transition-transform duration-700 ease-out"
                    style={{
                      transform: isCardsRowInView 
                        ? 'perspective(600px) rotateY(0deg) translateX(0) scale(1)' 
                        : 'perspective(600px) rotateY(-60deg) translateX(-24px) scale(0.85)',
                      transformOrigin: 'left center',
                    }}
                  >
                    <h3 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-lavender-glow via-electric-purple to-deep-violet bg-clip-text text-transparent">
                      Our Vision
                    </h3>
                  </div>
                </div>
              </div>

              {/* Tagline & Body */}
              <div
                style={{
                  transform: isCardsRowInView ? 'translateY(0)' : 'translateY(16px)',
                  opacity: isCardsRowInView ? 1 : 0,
                  transition: 'opacity 0.6s ease-out 580ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 580ms',
                }}
              >
                <p className="text-base font-semibold text-light-text dark:text-white mb-2">
                  Beyond Services, Towards Real Impact.
                </p>
                <p className="text-light-subtext dark:text-muted-gray text-base leading-relaxed">
                  Along with building solutions for businesses, we're also creating our own products to solve real-world problems and contribute to a better society.
                </p>
              </div>
            </div>

          </div>

          {/* Horizontal Divider Line */}
          <div className="border-t border-light-border dark:border-midnight-border/70" />

          {/* 3. BOTTOM HALF (The Process CodeVerse Follows): Triggers when user scrolls down to this block */}
          <div 
            ref={processRef}
            className="p-5 sm:p-8 md:p-10 bg-lavender-soft/30 dark:bg-black/25 relative overflow-hidden"
          >
            {/* Process Header */}
            <div 
              className="max-w-2xl mb-4 sm:mb-8"
              style={{
                transform: isProcessInView ? 'translateY(0)' : 'translateY(24px)',
                opacity: isProcessInView ? 1 : 0,
                transition: 'opacity 0.65s ease-out 60ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 60ms',
              }}
            >
              <span className="text-xs uppercase font-mono tracking-widest text-electric-purple dark:text-lavender-glow font-bold">
                Our Approach
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-light-text dark:text-white">
                The Process <span className="text-gradient-purple">CodeVerse</span> Follows
              </h3>
              <p className="text-sm text-light-subtext dark:text-muted-gray mt-2 leading-relaxed">
                A simple, transparent, and collaborative process that keeps you involved at every step.
              </p>
            </div>

            {/* Container where the 4 Cards sit directly OVER the Continuous Background Railway Track */}
            <div className="relative py-8 sm:py-10">
              
              {/* Desktop Horizontal Railway Track (Large screens) */}
              <div
                className="hidden lg:block absolute inset-x-0 -mx-8 sm:-mx-10 w-[calc(100%+4rem)] sm:w-[calc(100%+5rem)] top-1/2 -translate-y-1/2 z-0 pointer-events-none"
                style={{
                  transform: isProcessInView ? 'translateY(-50%)' : 'translateY(-30%)',
                  opacity: isProcessInView ? 1 : 0,
                  transition: 'opacity 0.65s ease-out 100ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 100ms',
                }}
              >
                <RailwayTrack isBuilt={isProcessInView} orientation="horizontal" />
              </div>

              {/* Mobile Vertical Railway Track (Small screens) */}
              <div
                className="block lg:hidden absolute inset-y-0 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-[calc(100%+2rem)] -my-4 z-0 pointer-events-none"
                style={{
                  opacity: isProcessInView ? 1 : 0,
                  transition: 'opacity 0.65s ease-out 100ms',
                }}
              >
                <RailwayTrack isBuilt={isProcessInView} orientation="vertical" />
              </div>

              {/* 4 Process Cards: Compact & Harmoniously Aligned with Generous Gaps on the Railway Track Curve */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-14 max-w-5xl mx-auto items-center px-4">
                
                {/* Card 1: Understand */}
                <div 
                  className="w-full max-w-[175px] sm:max-w-[185px] mx-auto min-h-[110px] sm:min-h-[118px] p-4 sm:p-4.5 rounded-xl bg-white/95 dark:bg-midnight-card/95 border border-purple-200/90 dark:border-midnight-border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-center group hover:-translate-y-1.5 backdrop-blur-md text-left"
                  style={{
                    transform: isProcessInView 
                      ? 'perspective(1000px) translate3d(0, -6px, 0px) rotateX(0deg) scale(1)' 
                      : 'perspective(1000px) translate3d(0, 48px, 60px) rotateX(20deg) scale(0.85)',
                    opacity: isProcessInView ? 1 : 0,
                    filter: isProcessInView ? 'blur(0px)' : 'blur(5px)',
                    transition: isProcessInView
                      ? 'transform 0.75s cubic-bezier(0.34, 1.35, 0.64, 1) 750ms, opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 750ms, filter 0.5s ease-out 750ms'
                      : 'transform 0.25s ease-out 0ms, opacity 0.25s ease-out 0ms, filter 0.25s ease-out 0ms',
                  }}
                >
                  <h4 className="font-bold text-light-text dark:text-white text-base sm:text-lg group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors">
                    Understand
                  </h4>
                  <p className="text-xs text-light-subtext dark:text-muted-gray leading-relaxed mt-1.5">
                    Your goals, challenges and needs.
                  </p>
                </div>

                {/* Card 2: Design */}
                <div 
                  className="w-full max-w-[175px] sm:max-w-[185px] mx-auto min-h-[110px] sm:min-h-[118px] p-4 sm:p-4.5 rounded-xl bg-white/95 dark:bg-midnight-card/95 border border-purple-200/90 dark:border-midnight-border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-center group hover:-translate-y-1.5 backdrop-blur-md text-left"
                  style={{
                    transform: isProcessInView 
                      ? 'perspective(1000px) translate3d(0, 6px, 0px) rotateX(0deg) scale(1)' 
                      : 'perspective(1000px) translate3d(0, 48px, 60px) rotateX(20deg) scale(0.85)',
                    opacity: isProcessInView ? 1 : 0,
                    filter: isProcessInView ? 'blur(0px)' : 'blur(5px)',
                    transition: isProcessInView
                      ? 'transform 0.75s cubic-bezier(0.34, 1.35, 0.64, 1) 950ms, opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 950ms, filter 0.5s ease-out 950ms'
                      : 'transform 0.25s ease-out 0ms, opacity 0.25s ease-out 0ms, filter 0.25s ease-out 0ms',
                  }}
                >
                  <h4 className="font-bold text-light-text dark:text-white text-base sm:text-lg group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors">
                    Design
                  </h4>
                  <p className="text-xs text-light-subtext dark:text-muted-gray leading-relaxed mt-1.5">
                    Turn ideas into intuitive experiences.
                  </p>
                </div>

                {/* Card 3: Build */}
                <div 
                  className="w-full max-w-[175px] sm:max-w-[185px] mx-auto min-h-[110px] sm:min-h-[118px] p-4 sm:p-4.5 rounded-xl bg-white/95 dark:bg-midnight-card/95 border border-purple-200/90 dark:border-midnight-border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-center group hover:-translate-y-1.5 backdrop-blur-md text-left"
                  style={{
                    transform: isProcessInView 
                      ? 'perspective(1000px) translate3d(0, 6px, 0px) rotateX(0deg) scale(1)' 
                      : 'perspective(1000px) translate3d(0, 48px, 60px) rotateX(20deg) scale(0.85)',
                    opacity: isProcessInView ? 1 : 0,
                    filter: isProcessInView ? 'blur(0px)' : 'blur(5px)',
                    transition: isProcessInView
                      ? 'transform 0.75s cubic-bezier(0.34, 1.35, 0.64, 1) 1150ms, opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1150ms, filter 0.5s ease-out 1150ms'
                      : 'transform 0.25s ease-out 0ms, opacity 0.25s ease-out 0ms, filter 0.25s ease-out 0ms',
                  }}
                >
                  <h4 className="font-bold text-light-text dark:text-white text-base sm:text-lg group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors">
                    Build
                  </h4>
                  <p className="text-xs text-light-subtext dark:text-muted-gray leading-relaxed mt-1.5">
                    Develop scalable and reliable solutions.
                  </p>
                </div>

                {/* Card 4: Launch */}
                <div 
                  className="w-full max-w-[175px] sm:max-w-[185px] mx-auto min-h-[110px] sm:min-h-[118px] p-4 sm:p-4.5 rounded-xl bg-white/95 dark:bg-midnight-card/95 border border-purple-200/90 dark:border-midnight-border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-center group hover:-translate-y-1.5 backdrop-blur-md text-left"
                  style={{
                    transform: isProcessInView 
                      ? 'perspective(1000px) translate3d(0, -6px, 0px) rotateX(0deg) scale(1)' 
                      : 'perspective(1000px) translate3d(0, 48px, 60px) rotateX(20deg) scale(0.85)',
                    opacity: isProcessInView ? 1 : 0,
                    filter: isProcessInView ? 'blur(0px)' : 'blur(5px)',
                    transition: isProcessInView
                      ? 'transform 0.75s cubic-bezier(0.34, 1.35, 0.64, 1) 1350ms, opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1350ms, filter 0.5s ease-out 1350ms'
                      : 'transform 0.25s ease-out 0ms, opacity 0.25s ease-out 0ms, filter 0.25s ease-out 0ms',
                  }}
                >
                  <h4 className="font-bold text-light-text dark:text-white text-base sm:text-lg group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors">
                    Launch
                  </h4>
                  <p className="text-xs text-light-subtext dark:text-muted-gray leading-relaxed mt-1.5">
                    Deploy, support and help you grow further.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
