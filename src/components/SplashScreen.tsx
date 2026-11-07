import React, { useState, useEffect, useRef } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

type SplashPhase = 'init' | 'logo-enter' | 'text-emerge' | 'hold' | 'text-retract' | 'logo-morph' | 'done';

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<SplashPhase>('init');

  // Stable ref for onComplete callback so parent re-renders never trigger effect restart
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Guard to ensure choreography runs strictly once and cannot be reset or duplicated
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Precise choreography of the cinematic 3D sequence (~2.2s total duration)
    const t0 = setTimeout(() => setPhase('logo-enter'), 40);
    const t1 = setTimeout(() => setPhase('text-emerge'), 540);
    const t2 = setTimeout(() => setPhase('hold'), 1080);
    const t3 = setTimeout(() => setPhase('text-retract'), 1480);
    const t4 = setTimeout(() => setPhase('logo-morph'), 1860);
    const t5 = setTimeout(() => {
      setPhase('done');
      onCompleteRef.current?.();
    }, 2250);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []); // Run strictly once on mount

  const codeLetters = ['C', 'o', 'd', 'e'];
  const verseLetters = ['V', 'e', 'r', 's', 'e'];

  const isTextVisible = phase === 'text-emerge' || phase === 'hold';
  const isRetracting = phase === 'text-retract';
  const isMorphing = phase === 'logo-morph' || phase === 'done';

  // Compute Logo transform per phase with dramatic 3D perspective
  const getLogoStyles = () => {
    switch (phase) {
      case 'init':
        return {
          transform: 'perspective(1200px) scale(0.2) rotateY(140deg) rotateX(25deg) translateZ(-250px)',
          opacity: 0,
          filter: 'blur(16px)',
          transition: 'all 0.1s ease-out',
        };
      case 'logo-enter':
        return {
          transform: 'perspective(1200px) scale(1) rotateY(0deg) rotateX(0deg) translateZ(0px)',
          opacity: 1,
          filter: 'blur(0px)',
          transition: 'transform 0.52s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out, filter 0.4s ease-out',
        };
      case 'text-emerge':
        return {
          transform: 'perspective(1200px) scale(1) translateX(-18px) rotateY(-8deg) rotateX(3deg) translateZ(20px)',
          opacity: 1,
          filter: 'blur(0px)',
          transition: 'transform 0.54s cubic-bezier(0.16, 1, 0.3, 1)',
        };
      case 'hold':
        return {
          transform: 'perspective(1200px) scale(1.02) translateX(-18px) rotateY(-5deg) rotateX(2deg) translateZ(25px)',
          opacity: 1,
          filter: 'blur(0px)',
          transition: 'transform 0.4s ease-in-out',
        };
      case 'text-retract':
        return {
          transform: 'perspective(1200px) scale(1) translateX(0px) rotateY(0deg) rotateX(0deg) translateZ(0px)',
          opacity: 1,
          filter: 'blur(0px)',
          transition: 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)',
        };
      case 'logo-morph':
      case 'done':
        return {
          transform: 'perspective(1200px) scale(0.65) translate3d(-18vw, -12vh, 40px) rotateY(-18deg) rotateX(8deg)',
          opacity: 0,
          filter: 'blur(6px)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        };
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden transition-opacity duration-300 ${
        isMorphing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } bg-[#FBFBFE] dark:bg-[#09090B]`}
      style={{
        perspective: '1400px',
      }}
    >
      {/* 3D Dynamic Ambient Glow Backdrops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Core pulsing energy aura */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[110px] pointer-events-none transition-all duration-700 ${
            phase === 'init'
              ? 'scale-50 opacity-0'
              : 'scale-100 opacity-60 dark:opacity-75 animate-splash-glow'
          } bg-gradient-radial from-electric-purple/35 via-lavender-glow/20 dark:from-electric-purple/45 dark:via-deep-violet/35 to-transparent`}
        />

        {/* Outer radial ambient ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-electric-light/10 dark:bg-electric-purple/15 blur-[140px] pointer-events-none" />
      </div>

      {/* Central Interactive Animation Stage */}
      <div
        className="relative z-10 flex items-center justify-center px-4"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 1. 3D Morphing Logo Ribbon */}
        <div
          style={{
            transformStyle: 'preserve-3d',
            ...getLogoStyles(),
          }}
          className="relative flex items-center justify-center flex-shrink-0 cursor-default"
        >
          {/* 3D Floating Ribbon Image */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
            <img
              src="/hero-ribbon.png"
              alt="CodeVerse Ribbon Emblem"
              className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_16px_36px_rgba(124,44,245,0.32)] dark:drop-shadow-[0_22px_48px_rgba(182,108,255,0.42)]"
            />
          </div>

          {/* Mirrored Floor Reflection */}
          <div
            aria-hidden="true"
            className="absolute -bottom-16 sm:-bottom-20 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 opacity-15 dark:opacity-25 pointer-events-none [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.65),transparent_80%)]"
            style={{
              transform: 'scaleY(-1) translateY(-8px) rotateX(30deg)',
              filter: 'blur(3px)',
            }}
          >
            <img
              src="/hero-ribbon.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 2. Kinetic Emergent "CodeVerse" Typography */}
        <div
          className="overflow-hidden transition-all duration-500 ease-out flex items-center"
          style={{
            maxWidth: isTextVisible ? '380px' : '0px',
            opacity: isTextVisible ? 1 : 0,
            marginLeft: isTextVisible ? '12px' : '0px',
            transformStyle: 'preserve-3d',
            perspective: '900px',
            transformOrigin: 'left center',
          }}
        >
          <div className="flex items-center tracking-tight select-none py-2 whitespace-nowrap pl-1">
            {/* Word: Code */}
            <div className="flex items-center">
              {codeLetters.map((char, index) => {
                const staggerDelay = isRetracting
                  ? (codeLetters.length - 1 - index) * 30
                  : index * 45;
                return (
                  <span
                    key={`code-${index}`}
                    style={{
                      transform: isTextVisible
                        ? 'perspective(600px) rotateY(0deg) translateX(0px) translateZ(0px) scale(1)'
                        : 'perspective(600px) rotateY(-85deg) translateX(-28px) translateZ(-40px) scale(0.8)',
                      opacity: isTextVisible ? 1 : 0,
                      transition: `transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, opacity 0.35s ease-out ${staggerDelay}ms`,
                      transformOrigin: 'left center',
                      display: 'inline-block',
                    }}
                    className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-none tracking-tight drop-shadow-sm"
                  >
                    {char}
                  </span>
                );
              })}
            </div>

            {/* Word: Verse */}
            <div className="flex items-center ml-0.5 sm:ml-1">
              {verseLetters.map((char, index) => {
                const staggerDelay = isRetracting
                  ? (verseLetters.length - 1 - index) * 30
                  : (codeLetters.length + index) * 45;
                return (
                  <span
                    key={`verse-${index}`}
                    style={{
                      transform: isTextVisible
                        ? 'perspective(600px) rotateY(0deg) translateX(0px) translateZ(0px) scale(1)'
                        : 'perspective(600px) rotateY(-85deg) translateX(-28px) translateZ(-40px) scale(0.8)',
                      opacity: isTextVisible ? 1 : 0,
                      transition: `transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, opacity 0.35s ease-out ${staggerDelay}ms`,
                      transformOrigin: 'left center',
                      display: 'inline-block',
                    }}
                    className="text-3xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet bg-clip-text text-transparent leading-none tracking-tight drop-shadow-[0_4px_16px_rgba(124,44,245,0.35)]"
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modern bottom discreet indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-400 ${
          phase === 'init' || isMorphing ? 'opacity-0 translate-y-4' : 'opacity-70 translate-y-0'
        }`}
      >
        <div className="w-16 h-1 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-electric-purple to-lavender-glow rounded-full transition-all duration-1000 ease-out"
            style={{
              width:
                phase === 'logo-enter'
                  ? '30%'
                  : phase === 'text-emerge'
                  ? '65%'
                  : phase === 'hold'
                  ? '85%'
                  : '100%',
            }}
          />
        </div>
      </div>
    </div>
  );
};

