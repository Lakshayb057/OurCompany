import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Linkedin, Shield, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
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

  // Active index (0 to teamLength - 1)
  const activeIndex = teamLength > 0 ? virtualIndex % teamLength : 0;

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

  const handleSelectMember = (index: number) => {
    const currentBase = Math.floor(virtualIndex / teamLength) * teamLength;
    setVirtualIndex(currentBase + index);
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
                className={`relative rounded-3xl overflow-hidden transition-all duration-700 ease-out select-none min-h-[490px] sm:min-h-[520px] lg:min-h-[540px] bg-slate-100 dark:bg-midnight-card ${
                  isActive
                    ? 'scale-100 opacity-100 z-20 shadow-[0_20px_50px_rgba(124,44,245,0.22)] ring-2 ring-purple-500/80 dark:ring-electric-purple/90 border-2 border-purple-400 dark:border-electric-purple'
                    : 'scale-[0.88] sm:scale-[0.91] opacity-45 hover:opacity-85 z-10 hover:scale-[0.93] cursor-pointer shadow-md border border-purple-200/60 dark:border-white/10'
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
                    Keeps the entire upper 60%+ of the portrait completely unshaded and 100% visible,
                    while gently fading only behind the bottom dock to guarantee contrast.
                  */}
                  {/* Light Mode Scrim */}
                  <div className="dark:hidden absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 via-30% to-transparent to-55%" />

                  {/* Dark Mode Scrim */}
                  <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/80 via-30% to-transparent to-55%" />
                </div>

                {/* 2. Top Bar: Floating Stream Tag & LinkedIn (Over Background) */}
                <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-black/75 backdrop-blur-md border border-purple-200/90 dark:border-white/20 text-xs font-mono font-bold text-electric-purple dark:text-lavender-glow shadow-md">
                    {member.role.split(' ')[0]}
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

                {/* 3. Bottom Content Dock: Lies Flush at the Bottom of Outer Container */}
                <div className="relative z-10 mt-auto w-full">
                  <div className="rounded-b-3xl p-5 sm:p-6 bg-white/95 dark:bg-black/85 backdrop-blur-xl border-t border-purple-200/80 dark:border-white/15 shadow-2xl transition-all duration-300">
                    
                    {/* Name & Designation Header */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-light-text dark:text-white tracking-tight leading-tight group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors truncate">
                        {member.name}
                      </h3>
                      <div className="text-xs font-mono font-bold text-electric-purple dark:text-lavender-glow mt-1">
                        {member.designation}
                      </div>
                    </div>

                    {/* Subtle Divider */}
                    <div className="h-[1px] w-full bg-gradient-to-r from-purple-200 via-purple-300/40 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent my-3" />

                    {/* Primary Responsibility */}
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-light-subtext dark:text-gray-400 font-bold flex items-center gap-1.5 mb-1.5">
                        <Shield className="w-3.5 h-3.5 text-electric-purple" />
                        <span>Primary Responsibility</span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-light-text dark:text-gray-200 font-semibold leading-relaxed">
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

      {/* 
        Interactive Carousel Navigation Controls
        - Left & Right smooth nudge buttons
        - Sequential numbered pills: 01 Lakshay, 02 Parth, 03 Diya, 04 Ishita, 05 Suryansh
        - Auto-rotation status badge
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 py-4 border-t border-purple-200/50 dark:border-midnight-border/70">
          
          {/* Left / Right Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Executive"
              className="p-3 rounded-2xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border hover:border-electric-purple hover:bg-electric-purple hover:text-white text-light-text dark:text-gray-200 transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Executive"
              className="p-3 rounded-2xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border hover:border-electric-purple hover:bg-electric-purple hover:text-white text-light-text dark:text-gray-200 transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Play/Pause Toggle Indicator */}
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
              className="px-3 py-2 rounded-xl bg-white/70 dark:bg-midnight-card/70 border border-purple-200/70 dark:border-midnight-border text-xs font-mono font-semibold text-light-subtext dark:text-gray-300 hover:text-electric-purple transition-all flex items-center gap-1.5"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-electric-purple" />
                  <span className="hidden sm:inline">Paused</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="hidden sm:inline">Auto-Rotating</span>
                </>
              )}
            </button>
          </div>

          {/* Executive Direct Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {teamList.map((member, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={member.id}
                  onClick={() => handleSelectMember(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-electric-purple text-white shadow-md shadow-purple-500/30 scale-105 ring-2 ring-purple-300 dark:ring-electric-purple/50'
                      : 'bg-white/70 dark:bg-midnight-card/70 border border-purple-200/60 dark:border-midnight-border text-light-subtext dark:text-gray-300 hover:border-electric-purple hover:text-electric-purple'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-electric-purple/40'}`} />
                  <span>{member.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
