import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Linkedin, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { TeamMember } from '../types';

interface LeadershipSectionProps {
  team: TeamMember[];
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ team }) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  
  // Safe fallback if team is empty
  const teamList = useMemo(() => team || [], [team]);
  const teamLength = teamList.length;

  // Triplicate array for smooth infinite rotation: [...team, ...team, ...team]
  const extendedTeam = useMemo(() => {
    if (teamLength === 0) return [];
    return [...teamList, ...teamList, ...teamList];
  }, [teamList, teamLength]);

  // Virtual index starts at the beginning of the middle batch
  const [virtualIndex, setVirtualIndex] = useState(teamLength);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Track drag / touch support
  const touchStartXRef = useRef<number | null>(null);

  // Auto-rotation every 3.8 seconds
  useEffect(() => {
    if (isPaused || teamLength === 0) return;

    const interval = setInterval(() => {
      setVirtualIndex((prev) => prev + 1);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, teamLength]);

  // Seamless infinite loop wrap without visible snap
  useEffect(() => {
    if (teamLength === 0) return;

    if (virtualIndex >= teamLength * 2) {
      // Reached the third batch, silently reposition to the middle batch
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setVirtualIndex((prev) => prev - teamLength);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 750); // Matches transition duration
      return () => clearTimeout(timer);
    } else if (virtualIndex < teamLength) {
      // Reached before the middle batch, silently reposition to the middle batch
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setVirtualIndex((prev) => prev + teamLength);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [virtualIndex, teamLength]);

  const handlePrev = () => {
    setVirtualIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setVirtualIndex((prev) => prev + 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartXRef.current !== null) {
      const diff = e.changedTouches[0].clientX - touchStartXRef.current;
      if (diff > 50) {
        handlePrev();
      } else if (diff < -50) {
        handleNext();
      }
      touchStartXRef.current = null;
    }
  };

  const getRoleTag = (role: string) => {
    const cleaned = role.replace(/,/g, '');
    if (cleaned.toLowerCase().includes('founder')) return 'Leadership';
    if (cleaned.toLowerCase().includes('technology')) return 'Technology';
    if (cleaned.toLowerCase().includes('operation')) return 'Operations';
    if (cleaned.toLowerCase().includes('governance')) return 'Governance';
    if (cleaned.toLowerCase().includes('growth')) return 'Growth';
    return cleaned.split(' ')[0];
  };

  if (teamLength === 0) return null;

  return (
    <section id="leadership" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
            Leadership & <span className="text-gradient-purple">Governance</span>
          </h2>
          <p className="text-light-subtext dark:text-muted-gray text-base leading-relaxed">
            A cohesive multidisciplinary executive team uniting strategic direction, technical architecture, operations, and global growth.
          </p>
        </div>

      </div>

      {/* 
        Horizontal Carousel Viewport 
        - All cards positioned in a continuous horizontal line
        - Smoothly auto-rotates sequentially: 1 -> 2 -> 3 -> 4 -> 5 -> 1...
      */}
      <div 
        className="relative w-full overflow-hidden py-6 [--card-w:300px] sm:[--card-w:370px] md:[--card-w:410px] lg:[--card-w:430px] [--gap:20px] sm:[--gap:32px]"
        style={{
          '--virtual-idx': virtualIndex,
        } as React.CSSProperties}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left & Right Edge Vignette Mask for cinematic depth */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-28 bg-gradient-to-r from-light via-light/60 to-transparent dark:from-midnight dark:via-midnight/60 to-transparent z-30" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-28 bg-gradient-to-l from-light via-light/60 to-transparent dark:from-midnight dark:via-midnight/60 to-transparent z-30" />

        {/* Left Side Navigation Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous Team Member"
          className="absolute left-3 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/90 dark:bg-midnight-950/85 backdrop-blur-md border border-purple-200/80 dark:border-white/20 text-light-text dark:text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_30px_rgba(124,44,245,0.35)] hover:bg-electric-purple hover:border-electric-purple hover:text-white transition-all duration-300 active:scale-90 flex items-center justify-center cursor-pointer group/btn"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover/btn:-translate-x-0.5" />
        </button>

        {/* Right Side Navigation Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next Team Member"
          className="absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/90 dark:bg-midnight-950/85 backdrop-blur-md border border-purple-200/80 dark:border-white/20 text-light-text dark:text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_30px_rgba(124,44,245,0.35)] hover:bg-electric-purple hover:border-electric-purple hover:text-white transition-all duration-300 active:scale-90 flex items-center justify-center cursor-pointer group/btn"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </button>

        {/* Sliding Horizontal Track */}
        <div 
          className="flex items-center will-change-transform"
          style={{
            transform: 'translateX(calc(50% - (var(--virtual-idx) * (var(--card-w) + var(--gap)) + var(--card-w) / 2)))',
            transition: isTransitioning ? 'transform 750ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          }}
        >
          {extendedTeam.map((member, itemIndex) => {
            const isActive = itemIndex === virtualIndex;
            const originalIndex = itemIndex % teamLength;

            return (
              <div
                key={`${member.id}-${itemIndex}`}
                onClick={() => {
                  if (itemIndex !== virtualIndex) {
                    setVirtualIndex(itemIndex);
                  }
                }}
                style={{
                  width: 'var(--card-w)',
                  marginRight: 'var(--gap)',
                  flexShrink: 0,
                }}
                className={`relative rounded-3xl overflow-hidden transition-all duration-700 ease-out select-none h-[500px] sm:h-[530px] lg:h-[550px] flex flex-col justify-between bg-slate-100 dark:bg-midnight-card ${
                  isActive
                    ? 'scale-100 opacity-100 z-20 shadow-none ring-2 ring-purple-500/80 dark:ring-electric-purple/90 border-2 border-purple-400 dark:border-electric-purple'
                    : 'scale-[0.88] sm:scale-[0.91] opacity-45 hover:opacity-85 z-10 hover:scale-[0.93] cursor-pointer shadow-none border border-purple-200/60 dark:border-white/10'
                }`}
              >
                {/* 1. Full Container Background Image Layer - 100% Visible & Crisp */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  {member.avatar && !imgErrors[member.id] ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={() => setImgErrors((prev) => ({ ...prev, [member.id]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-lavender-soft via-white to-purple-100 dark:from-midnight-950 dark:via-midnight-900 dark:to-deep-violet flex items-center justify-center">
                      <span className="text-8xl font-black font-mono text-electric-purple/20 select-none">
                        {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                  )}

                  {/* 
                    Theme-Adaptive Gradient Overlays:
                    Keeps the upper area of the portrait crisp and visible,
                    while smoothly shading the bottom region behind the glass dock.
                  */}
                  {/* Light Mode Scrim */}
                  <div className="dark:hidden absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 via-35% to-transparent to-60%" />

                  {/* Dark Mode Scrim */}
                  <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/75 via-35% to-transparent to-60%" />
                </div>

                {/* 2. Top Bar: Floating Stream Tag & LinkedIn (Over Background) */}
                <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-black/75 backdrop-blur-md border border-purple-200/90 dark:border-white/20 text-xs font-mono font-bold text-electric-purple dark:text-lavender-glow shadow-md">
                    {getRoleTag(member.role)}
                  </span>

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-white/90 dark:bg-black/75 backdrop-blur-md border border-purple-200/90 dark:border-white/20 text-light-text dark:text-gray-200 hover:text-white hover:bg-electric-purple hover:border-electric-purple transition-all shadow-md flex-shrink-0"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* 3. Bottom Content Dock: Cleanly Anchored at Bottom of Container */}
                <div className="relative z-10 p-4 sm:p-5 mt-auto">
                  <div className="rounded-2xl p-4 sm:p-4.5 bg-white/92 dark:bg-black/80 backdrop-blur-md border border-purple-200/80 dark:border-white/15 shadow-none transition-all duration-300">
                    
                    {/* Name & Designation Header */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-light-text dark:text-white tracking-tight leading-tight transition-colors truncate">
                        {member.name}
                      </h3>
                      <div className="text-xs font-mono font-bold text-electric-purple dark:text-lavender-glow mt-0.5">
                        {member.designation}
                      </div>
                    </div>

                    {/* Subtle Divider */}
                    <div className="h-[1px] w-full bg-gradient-to-r from-purple-200/80 via-purple-300/40 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent my-2.5" />

                    {/* Primary Responsibility */}
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-light-subtext dark:text-gray-400 font-bold flex items-center gap-1.5 mb-1">
                        <Shield className="w-3.5 h-3.5 text-electric-purple flex-shrink-0" />
                        <span>Primary Responsibility</span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-light-text dark:text-gray-200 font-medium leading-snug">
                        {member.primaryResponsibility}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
