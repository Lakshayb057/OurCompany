import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';

interface MorphingLogoProps {
  anchorRef: React.RefObject<HTMLDivElement>;
  isAlwaysDocked?: boolean;
  onLogoClick?: () => void;
}

export const MorphingLogo: React.FC<MorphingLogoProps> = ({ 
  anchorRef,
  isAlwaysDocked = false,
  onLogoClick
}) => {
  const [box, setBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  const updateBox = useCallback(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      setBox({
        x: rect.left,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [anchorRef]);

  // Measure synchronously before browser paint
  useLayoutEffect(() => {
    updateBox();
    const t1 = setTimeout(updateBox, 50);
    const t2 = setTimeout(updateBox, 200);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && anchorRef.current) {
      ro = new ResizeObserver(() => {
        updateBox();
      });
      ro.observe(anchorRef.current);
    }

    const handleResize = () => {
      updateBox();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', handleResize);
      ro?.disconnect();
    };
  }, [updateBox, anchorRef]);

  // Track scroll position smoothly at display refresh rate
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!box && !isAlwaysDocked) return null;

  // Prominent, significantly enlarged docked size when aligned to top-left
  const targetH = isMobile ? 40 : 72;
  const targetW = isMobile ? 54 : 98;
  const targetX = isMobile ? 16 : 24;       // left alignment
  const targetY = isMobile ? 12 : 8;        // vertically centered with header

  // Progress from 0 (hero) to 1 (header docked) - calibrated for fluid, butter-smooth flight on all screens
  const maxScroll = isMobile ? 220 : 320;
  const rawP = isAlwaysDocked ? 1 : Math.min(1, Math.max(0, scrollY / maxScroll));

  // Smooth sinusoidal S-curve with zero sudden acceleration jumps
  const p = isAlwaysDocked ? 1 : (0.5 - Math.cos(rawP * Math.PI) / 2);

  // Peak in-flight factor (0 at endpoints, 1 at midpoint)
  const flight = isAlwaysDocked ? 0 : Math.sin(rawP * Math.PI);

  // Once the logo approaches dock position, smoothly trigger the "CodeVerse" wordmark emergence
  const isDocked = isAlwaysDocked || rawP >= 0.85;

  // Interpolated position and dimensions for the ribbon logo
  const heroCurrentY = box ? box.y - scrollY : targetY;
  const currentX = (box && !isAlwaysDocked) ? box.x * (1 - p) + targetX * p : targetX;
  const currentY = (box && !isAlwaysDocked) ? heroCurrentY * (1 - p) + targetY * p : targetY;
  const currentW = (box && !isAlwaysDocked) ? box.width * (1 - p) + targetW * p : targetW;
  const currentH = (box && !isAlwaysDocked) ? box.height * (1 - p) + targetH * p : targetH;

  // Smooth 3D rotations and perspective elevation during flight
  const rotateY = flight * -18;
  const rotateX = flight * 10;
  const rotateZ = flight * -4;
  const translateZ = flight * 40;

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Subtle natural drop-shadow on the 3D transparent ribbon itself during flight
  const ribbonFilter = flight > 0.05
    ? `drop-shadow(0 ${4 + flight * 12}px ${8 + flight * 14}px rgba(124, 44, 245, ${0.2 + flight * 0.25}))`
    : isDocked
      ? 'drop-shadow(0 2px 8px rgba(124, 44, 245, 0.24))'
      : 'none';

  return (
    <div
      onClick={handleLogoClick}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate3d(${Math.round(currentX)}px, ${Math.round(currentY)}px, 0)`,
        zIndex: 50,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        opacity: hasEntered ? 1 : 0,
        transition: 'opacity 0.4s ease-out',
        willChange: 'transform',
      }}
      className="select-none group focus:outline-none bg-transparent border-0 p-0 shadow-none pointer-events-auto"
      title={isAlwaysDocked ? "CodeVerse - Return to Home" : "CodeVerse Home - Scroll to top"}
      aria-label="CodeVerse Home"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleLogoClick();
        }
      }}
    >
      {/* 1. The 3D Morphing Ribbon Emblem */}
      <div
        style={{
          width: `${Math.round(currentW)}px`,
          height: `${Math.round(currentH)}px`,
          transform: `perspective(1000px) translate3d(0, 0, ${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
          transformStyle: 'preserve-3d',
          filter: ribbonFilter,
          willChange: 'transform, width, height',
          flexShrink: 0,
        }}
        className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
      >
        <img
          src="/hero-ribbon.png"
          alt="CodeVerse Ribbon"
          className={`w-full h-full object-contain pointer-events-none ${rawP === 0 && hasEntered ? 'animate-hero-float' : ''}`}
        />
      </div>

      {/* 2. The 3D Animated "CodeVerse" Wordmark - Butter smooth max-width reveal */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          maxWidth: isDocked ? (isMobile ? '160px' : '280px') : '0px',
          opacity: isDocked ? 1 : 0,
          transform: isDocked 
            ? 'translate3d(0, 0, 0) scale(1)' 
            : 'translate3d(-14px, 0, 0) scale(0.92)',
          transformOrigin: 'left center',
          transition: 'max-width 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease-out, transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), margin-left 0.32s ease-out',
          pointerEvents: isDocked ? 'auto' : 'none',
          marginLeft: isDocked ? (isMobile ? '6px' : '10px') : '0px',
        }}
        className="font-extrabold tracking-tight select-none"
      >
        <span 
          style={{
            textShadow: '0 2px 14px rgba(124, 44, 245, 0.22)',
          }}
          className="text-lg sm:text-3xl font-black bg-gradient-to-r from-light-text via-electric-purple to-deep-violet dark:from-white dark:via-lavender-light dark:to-electric-light bg-clip-text text-transparent tracking-tight whitespace-nowrap"
        >
          CodeVerse
        </span>
      </div>
    </div>
  );
};
