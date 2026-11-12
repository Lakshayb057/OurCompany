import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface MorphingButtonProps {
  // Primary button: Start a Project
  heroAnchorRef?: React.RefObject<HTMLDivElement>;
  dockAnchorRef?: React.RefObject<HTMLDivElement>;
  onClick?: () => void;

  heroStartAnchorRef?: React.RefObject<HTMLDivElement>;
  dockStartAnchorRef?: React.RefObject<HTMLDivElement>;
  onStartProject?: () => void;

  // Secondary button: Explore Projects
  heroExploreAnchorRef?: React.RefObject<HTMLDivElement>;
  dockExploreAnchorRef?: React.RefObject<HTMLDivElement>;
  onExploreProjects?: () => void;
}

export const MorphingButton: React.FC<MorphingButtonProps> = ({
  heroAnchorRef,
  dockAnchorRef,
  onClick,
  heroStartAnchorRef,
  dockStartAnchorRef,
  onStartProject,
  heroExploreAnchorRef,
  dockExploreAnchorRef,
  onExploreProjects,
}) => {
  const startHeroRef = heroStartAnchorRef ?? heroAnchorRef;
  const startDockRef = dockStartAnchorRef ?? dockAnchorRef;
  const handleStartClick = onStartProject ?? onClick ?? (() => {});

  const exploreHeroRef = heroExploreAnchorRef;
  const exploreDockRef = dockExploreAnchorRef;
  const handleExploreClick = onExploreProjects ?? (() => {});

  const [startHeroBox, setStartHeroBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [startDockBox, setStartDockBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const [exploreHeroBox, setExploreHeroBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [exploreDockBox, setExploreDockBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const [scrollY, setScrollY] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 220);
    return () => clearTimeout(timer);
  }, []);

  const updateBoxes = useCallback(() => {
    // 1. Measure Start a Project Hero & Dock
    if (startHeroRef?.current) {
      const hRect = startHeroRef.current.getBoundingClientRect();
      if (hRect.width > 0 && hRect.height > 0) {
        setStartHeroBox({
          x: hRect.left + window.scrollX,
          y: hRect.top + window.scrollY,
          width: hRect.width,
          height: hRect.height,
        });
      }
    }

    if (startDockRef?.current) {
      const dRect = startDockRef.current.getBoundingClientRect();
      if (dRect.width > 0 && dRect.height > 0) {
        setStartDockBox({
          x: dRect.left,
          y: dRect.top,
          width: dRect.width,
          height: dRect.height,
        });
      }
    }

    // 2. Measure Explore Projects Hero & Dock
    if (exploreHeroRef?.current) {
      const hRect = exploreHeroRef.current.getBoundingClientRect();
      if (hRect.width > 0 && hRect.height > 0) {
        setExploreHeroBox({
          x: hRect.left + window.scrollX,
          y: hRect.top + window.scrollY,
          width: hRect.width,
          height: hRect.height,
        });
      }
    }

    if (exploreDockRef?.current) {
      const dRect = exploreDockRef.current.getBoundingClientRect();
      if (dRect.width > 0 && dRect.height > 0) {
        setExploreDockBox({
          x: dRect.left,
          y: dRect.top,
          width: dRect.width,
          height: dRect.height,
        });
      }
    }
  }, [startHeroRef, startDockRef, exploreHeroRef, exploreDockRef]);

  // Synchronous layout measurement
  useLayoutEffect(() => {
    updateBoxes();
    const t1 = setTimeout(updateBoxes, 50);
    const t2 = setTimeout(updateBoxes, 200);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => updateBoxes());
      if (startHeroRef?.current) ro.observe(startHeroRef.current);
      if (startDockRef?.current) ro.observe(startDockRef.current);
      if (exploreHeroRef?.current) ro.observe(exploreHeroRef.current);
      if (exploreDockRef?.current) ro.observe(exploreDockRef.current);
    }

    const handleResize = () => updateBoxes();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', handleResize);
      ro?.disconnect();
    };
  }, [updateBoxes, startHeroRef, startDockRef, exploreHeroRef, exploreDockRef]);

  // Smooth scroll sync
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isDesktop || !startHeroBox || !startDockBox) return null;

  // Progress from 0 (hero) to 1 (docked at top right)
  const maxScroll = 340;
  const rawP = Math.min(1, Math.max(0, scrollY / maxScroll));

  // Sinusoidal easing curve
  const p = 0.5 - Math.cos(rawP * Math.PI) / 2;

  // In-flight peak factor
  const flight = Math.sin(rawP * Math.PI);

  // 1. Position interpolation: Start a Project
  const heroCurrentY1 = startHeroBox.y - scrollY;
  const currentX1 = startHeroBox.x * (1 - p) + startDockBox.x * p;
  const currentY1 = heroCurrentY1 * (1 - p) + startDockBox.y * p;
  const currentW1 = startHeroBox.width * (1 - p) + startDockBox.width * p;
  const currentH1 = startHeroBox.height * (1 - p) + startDockBox.height * p;
  const currentRadius1 = 14 * (1 - p) + 16 * p;
  const fontSize1 = 15.5 * (1 - p) + 13 * p;

  // 3D rotations for Start a Project (banking right)
  const rotateY1 = flight * 18;
  const rotateX1 = flight * 12;
  const rotateZ1 = flight * 4;
  const translateZ1 = flight * 46;

  const dynamicShadow1 = flight > 0.05
    ? `0 ${12 + flight * 20}px ${25 + flight * 25}px rgba(124, 44, 245, ${0.3 + flight * 0.3}), 0 0 ${flight * 25}px rgba(182, 108, 255, ${flight * 0.45})`
    : p > 0.9
    ? '0 10px 20px -3px rgba(124, 44, 245, 0.35)'
    : '0 20px 25px -5px rgba(124, 44, 245, 0.28)';

  // 2. Position interpolation: Explore Projects (if anchors configured)
  const hasExplore = Boolean(exploreHeroBox && exploreDockBox);
  const heroCurrentY2 = exploreHeroBox ? exploreHeroBox.y - scrollY : 0;
  const currentX2 = (exploreHeroBox && exploreDockBox) ? exploreHeroBox.x * (1 - p) + exploreDockBox.x * p : 0;
  const currentY2 = (exploreHeroBox && exploreDockBox) ? heroCurrentY2 * (1 - p) + exploreDockBox.y * p : 0;
  const currentW2 = (exploreHeroBox && exploreDockBox) ? exploreHeroBox.width * (1 - p) + exploreDockBox.width * p : 0;
  const currentH2 = (exploreHeroBox && exploreDockBox) ? exploreHeroBox.height * (1 - p) + exploreDockBox.height * p : 0;
  const currentRadius2 = 14 * (1 - p) + 16 * p;
  const fontSize2 = 15.5 * (1 - p) + 13 * p;

  const rotateY2 = flight * 16;
  const rotateX2 = flight * 10;
  const rotateZ2 = flight * 3;
  const translateZ2 = flight * 38;

  const dynamicShadow2 = flight > 0.05
    ? `0 ${10 + flight * 16}px ${20 + flight * 20}px rgba(124, 44, 245, ${0.18 + flight * 0.2}), 0 4px 12px rgba(0, 0, 0, 0.08)`
    : p > 0.9
    ? '0 6px 16px -2px rgba(124, 44, 245, 0.15), 0 2px 6px rgba(0, 0, 0, 0.05)'
    : '0 4px 14px 0 rgba(0, 0, 0, 0.06)';

  return (
    <>
      {/* Button 1: Start a Project */}
      <button
        onClick={handleStartClick}
        style={{
          position: 'fixed',
          left: `${currentX1}px`,
          top: `${currentY1}px`,
          width: `${currentW1}px`,
          height: `${currentH1}px`,
          borderRadius: `${currentRadius1}px`,
          zIndex: 50,
          transform: !hasEntered
            ? 'perspective(1000px) translateY(28px) scale(0.92)'
            : `perspective(1000px) translate3d(0, 0, ${translateZ1}px) rotateY(${rotateY1}deg) rotateX(${rotateX1}deg) rotateZ(${rotateZ1}deg)`,
          transformStyle: 'preserve-3d',
          opacity: hasEntered ? 1 : 0,
          transition: !hasEntered 
            ? 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)' 
            : 'none',
          transitionDelay: !hasEntered ? '480ms' : '0ms',
          boxShadow: dynamicShadow1,
          willChange: 'transform, left, top, width, height, border-radius',
          cursor: 'pointer',
        }}
        className="relative overflow-hidden group p-[1px] select-none focus:outline-none active:scale-[0.98] transition-transform"
        aria-label="Start a Project"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet transition-all duration-300 group-hover:scale-105" />
        <span
          style={{
            borderRadius: `${Math.max(0, currentRadius1 - 1)}px`,
            fontSize: `${fontSize1}px`
          }}
          className="relative w-full h-full flex items-center justify-center gap-2 bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet text-white font-semibold transition-colors group-hover:brightness-110 px-3"
        >
          <span className="font-bold tracking-tight whitespace-nowrap">
            Start a Project
          </span>
          {p > 0.5 ? (
            <ArrowUpRight className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
          ) : (
            <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          )}
        </span>
      </button>

      {/* Button 2: Explore Projects (morphs in tandem, docking just after Start a Project) */}
      {hasExplore && (
        <button
          onClick={handleExploreClick}
          style={{
            position: 'fixed',
            left: `${currentX2}px`,
            top: `${currentY2}px`,
            width: `${currentW2}px`,
            height: `${currentH2}px`,
            borderRadius: `${currentRadius2}px`,
            zIndex: 50,
            transform: !hasEntered
              ? 'perspective(1000px) translateY(28px) scale(0.92)'
              : `perspective(1000px) translate3d(0, 0, ${translateZ2}px) rotateY(${rotateY2}deg) rotateX(${rotateX2}deg) rotateZ(${rotateZ2}deg)`,
            transformStyle: 'preserve-3d',
            opacity: hasEntered ? 1 : 0,
            transition: !hasEntered 
              ? 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)' 
              : 'none',
            transitionDelay: !hasEntered ? '580ms' : '0ms',
            boxShadow: dynamicShadow2,
            willChange: 'transform, left, top, width, height, border-radius',
            cursor: 'pointer',
          }}
          className="relative overflow-hidden group select-none focus:outline-none active:scale-[0.98] transition-transform bg-white/95 dark:bg-black/75 backdrop-blur-md border border-purple-200 dark:border-white/15 hover:border-electric-purple dark:hover:border-electric-purple/80 text-light-text dark:text-white"
          aria-label="Explore Projects"
        >
          <span
            style={{
              borderRadius: `${Math.max(0, currentRadius2 - 1)}px`,
              fontSize: `${fontSize2}px`
            }}
            className="relative w-full h-full flex items-center justify-center gap-2 font-semibold transition-colors group-hover:text-electric-purple dark:group-hover:text-lavender-glow px-3"
          >
            <span className="font-bold tracking-tight whitespace-nowrap">
              Explore Projects
            </span>
          </span>
        </button>
      )}
    </>
  );
};
