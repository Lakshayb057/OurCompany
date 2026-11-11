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
        x: rect.left + window.scrollX,
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
  const targetH = isMobile ? 48 : 72;
  const targetW = isMobile ? 66 : 98;
  const targetX = isMobile ? 12 : 24;       // left alignment
  const targetY = isMobile ? 12 : 8;        // vertically centered with floating header pill

  // Progress from 0 (hero) to 1 (header docked) - calibrated to 340px for smoother, gradual flight
  const maxScroll = 340;
  const rawP = isAlwaysDocked ? 1 : Math.min(1, Math.max(0, scrollY / maxScroll));

  // Smooth sinusoidal S-curve
  const p = isAlwaysDocked ? 1 : (0.5 - Math.cos(rawP * Math.PI) / 2);

  // Peak in-flight factor (0 at endpoints, 1 at midpoint)
  const flight = isAlwaysDocked ? 0 : Math.sin(rawP * Math.PI);

  // Once the logo arrives and aligns to the top-left, trigger the 3D "CodeVerse" emergence
  const isDocked = isAlwaysDocked || rawP >= 0.94;

  // Interpolated position and dimensions for the ribbon logo
  const heroCurrentY = box ? box.y - scrollY : targetY;
  const currentX = (box && !isAlwaysDocked) ? box.x * (1 - p) + targetX * p : targetX;
  const currentY = (box && !isAlwaysDocked) ? heroCurrentY * (1 - p) + targetY * p : targetY;
  const currentW = (box && !isAlwaysDocked) ? box.width * (1 - p) + targetW * p : targetW;
  const currentH = (box && !isAlwaysDocked) ? box.height * (1 - p) + targetH * p : targetH;

  // Smooth 3D rotations and perspective elevation during flight
  const rotateY = flight * -22;
  const rotateX = flight * 12;
  const rotateZ = flight * -5;
  const translateZ = flight * 48;

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Subtle natural drop-shadow on the 3D transparent ribbon itself during flight
  const ribbonFilter = flight > 0.05
    ? `drop-shadow(0 ${6 + flight * 14}px ${10 + flight * 16}px rgba(124, 44, 245, ${0.25 + flight * 0.3}))`
    : isDocked
      ? 'drop-shadow(0 2px 10px rgba(124, 44, 245, 0.28))'
      : 'none';

  return (
    <div
      onClick={handleLogoClick}
      style={{
        position: 'fixed',
        left: `${currentX}px`,
        top: `${currentY}px`,
        zIndex: 50,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        opacity: rawP === 0 ? (hasEntered ? 1 : 0) : 1,
        transform: rawP === 0 
          ? (hasEntered ? 'perspective(1000px) scale(1) translate3d(0, 0, 0) rotateY(0)' : 'perspective(1000px) scale(0.72) translate3d(0, 36px, 60px) rotateY(-20deg)')
          : 'none',
        transition: rawP === 0 
          ? 'opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1), transform 0.95s cubic-bezier(0.16, 1, 0.3, 1)' 
          : 'none',
        willChange: 'transform, left, top, opacity',
      }}
      className="select-none group focus:outline-none bg-transparent border-0 p-0 shadow-none"
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
      {/* 1. The 3D Morphing Ribbon Emblem (Substantially enlarged in docked state) */}
      <div
        style={{
          width: `${currentW}px`,
          height: `${currentH}px`,
          transform: `perspective(1000px) translate3d(0, 0, ${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
          transformStyle: 'preserve-3d',
          filter: ribbonFilter,
          willChange: 'transform, width, height, filter',
          flexShrink: 0,
        }}
        className={`flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${rawP === 0 && hasEntered ? 'animate-hero-float' : ''}`}
      >
        <img
          src="/hero-ribbon.png"
          alt="CodeVerse Ribbon"
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>

      {/* 2. The 3D Animated "CodeVerse" Word (Substantially enlarged font size) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          width: isDocked ? 'auto' : '0px',
          opacity: isDocked ? 1 : 0,
          transform: isDocked 
            ? 'perspective(600px) translate3d(0, 0, 0) rotateY(0deg) scale(1)' 
            : 'perspective(600px) translate3d(-32px, 0, -25px) rotateY(32deg) scale(0.85)',
          transformOrigin: 'left center',
          transition: 'width 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: isDocked ? 'auto' : 'none',
          marginLeft: isDocked ? (isMobile ? '4px' : '8px') : '0px',
        }}
        className="font-extrabold tracking-tight select-none"
      >
        <span 
          style={{
            textShadow: '0 2px 14px rgba(124, 44, 245, 0.22)',
          }}
          className="text-xl sm:text-3xl font-black bg-gradient-to-r from-light-text via-electric-purple to-deep-violet dark:from-white dark:via-lavender-light dark:to-electric-light bg-clip-text text-transparent tracking-tight whitespace-nowrap"
        >
          CodeVerse
        </span>
      </div>
    </div>
  );
};
