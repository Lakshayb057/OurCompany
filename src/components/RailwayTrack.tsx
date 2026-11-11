import React, { useMemo } from 'react';

interface Point {
  x: number;
  y: number;
}

interface BezierSegment {
  p0: Point;
  p1: Point;
  p2: Point;
  p3: Point;
}

// 1. Horizontal track segments (Desktop: 4 station cards in horizontal row)
const HORIZONTAL_SEGMENTS: BezierSegment[] = [
  { p0: { x: -60, y: 80 }, p1: { x: 50, y: 72 }, p2: { x: 200, y: 72 }, p3: { x: 350, y: 80 } },
  { p0: { x: 350, y: 80 }, p1: { x: 500, y: 88 }, p2: { x: 600, y: 88 }, p3: { x: 700, y: 88 } },
  { p0: { x: 700, y: 88 }, p1: { x: 800, y: 88 }, p2: { x: 900, y: 88 }, p3: { x: 1050, y: 80 } },
  { p0: { x: 1050, y: 80 }, p1: { x: 1200, y: 72 }, p2: { x: 1350, y: 72 }, p3: { x: 1460, y: 80 } },
];

// 2. Vertical track segments (Mobile: 4 station cards stacked vertically)
// Curves gently in an S-wave through the 4 vertically stacked cards (Understand, Design, Build, Launch)
const VERTICAL_SEGMENTS: BezierSegment[] = [
  { p0: { x: 100, y: -40 }, p1: { x: 86, y: 40 }, p2: { x: 86, y: 160 }, p3: { x: 100, y: 250 } },
  { p0: { x: 100, y: 250 }, p1: { x: 114, y: 340 }, p2: { x: 114, y: 440 }, p3: { x: 100, y: 500 } },
  { p0: { x: 100, y: 500 }, p1: { x: 114, y: 560 }, p2: { x: 114, y: 660 }, p3: { x: 100, y: 750 } },
  { p0: { x: 100, y: 750 }, p1: { x: 86, y: 840 }, p2: { x: 86, y: 960 }, p3: { x: 100, y: 1040 } },
];

function getBezierPoint(seg: BezierSegment, t: number): { pt: Point; normal: Point } {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;

  const x = mt2 * mt * seg.p0.x + 3 * mt2 * t * seg.p1.x + 3 * mt * t2 * seg.p2.x + t2 * t * seg.p3.x;
  const y = mt2 * mt * seg.p0.y + 3 * mt2 * t * seg.p1.y + 3 * mt * t2 * seg.p2.y + t2 * t * seg.p3.y;

  const dx = 3 * mt2 * (seg.p1.x - seg.p0.x) + 6 * mt * t * (seg.p2.x - seg.p1.x) + 3 * t2 * (seg.p3.x - seg.p2.x);
  const dy = 3 * mt2 * (seg.p1.y - seg.p0.y) + 6 * mt * t * (seg.p2.y - seg.p1.y) + 3 * t2 * (seg.p3.y - seg.p2.y);

  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { pt: { x, y }, normal: { x: -dy / len, y: dx / len } };
}

function getOffsetPoints(segments: BezierSegment[], offset: number, stepsPerSeg = 30): Point[] {
  const pts: Point[] = [];
  segments.forEach((seg, sIdx) => {
    const start = sIdx === 0 ? 0 : 1;
    for (let i = start; i <= stepsPerSeg; i++) {
      const t = i / stepsPerSeg;
      const { pt, normal } = getBezierPoint(seg, t);
      pts.push({
        x: +(pt.x + normal.x * offset).toFixed(1),
        y: +(pt.y + normal.y * offset).toFixed(1),
      });
    }
  });
  return pts;
}

function pointsToSvgPath(pts: Point[]): string {
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
}

export interface RailwayTrackProps {
  isBuilt?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const RailwayTrack: React.FC<RailwayTrackProps> = ({ 
  isBuilt = true, 
  orientation = 'horizontal' 
}) => {
  const isVertical = orientation === 'vertical';

  // Compute mathematically parallel paths along either the horizontal or vertical curve
  const paths = useMemo(() => {
    const segments = isVertical ? VERTICAL_SEGMENTS : HORIZONTAL_SEGMENTS;
    const ballastOffset = isVertical ? 38 : 40;
    const railOffset = isVertical ? 19 : 20;

    const topBallastPts = getOffsetPoints(segments, ballastOffset);
    const botBallastPts = getOffsetPoints(segments, -ballastOffset);
    const topRailPts = getOffsetPoints(segments, railOffset);
    const botRailPts = getOffsetPoints(segments, -railOffset);
    const centerPts = getOffsetPoints(segments, 0);

    const polygon = `${pointsToSvgPath(topBallastPts)} ${botBallastPts
      .slice()
      .reverse()
      .map((p) => `L ${p.x},${p.y}`)
      .join(' ')} Z`;

    return {
      ballastPolygon: polygon,
      ballastTopPath: pointsToSvgPath(topBallastPts),
      ballastBottomPath: pointsToSvgPath(botBallastPts),
      centerPath: pointsToSvgPath(centerPts),
      topRailPath: pointsToSvgPath(topRailPts),
      bottomRailPath: pointsToSvgPath(botRailPts),
    };
  }, [isVertical]);

  const pId = isVertical ? 'v' : 'h';

  if (isVertical) {
    return (
      <div className="relative w-full h-full select-none overflow-hidden flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 200 1000"
          preserveAspectRatio="none"
          className="w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dynamic Vertical Progressive Construction Reveal Clip Path */}
            <clipPath id={`trackBuildClip_${pId}`}>
              <rect
                x="-40"
                y="-60"
                width="280"
                height={isBuilt ? 1160 : 0}
                style={{
                  transition: isBuilt
                    ? 'height 1.25s cubic-bezier(0.22, 1, 0.36, 1) 100ms'
                    : 'height 0.25s ease-out 0ms',
                }}
              />
            </clipPath>

            {/* Construction Plasma Welding Laser Gradient (Horizontal spark across vertical rails) */}
            <linearGradient id={`plasmaLaserGrad_${pId}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0" />
              <stop offset="25%" stopColor="#C084FC" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>

            {/* Steel Rail Metallic Gradient */}
            <linearGradient id={`railSteelGrad_${pId}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="35%" stopColor="#94A3B8" />
              <stop offset="70%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Dark Mode Steel Rail Metallic Gradient */}
            <linearGradient id={`railSteelGradDark_${pId}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F1F5F9" />
              <stop offset="30%" stopColor="#94A3B8" />
              <stop offset="75%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            {/* Electric Signal Conduit Gradient */}
            <linearGradient id={`railCenterGrad_${pId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C2CF5" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#B66CFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7C2CF5" stopOpacity="0.8" />
            </linearGradient>

            {/* Ballast / Gravel Bed Gradient (Light Mode) */}
            <linearGradient id={`ballastGradLight_${pId}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7C2CF5" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#7C2CF5" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#7C2CF5" stopOpacity="0.04" />
            </linearGradient>

            {/* Ballast / Gravel Bed Gradient (Dark Mode) */}
            <linearGradient id={`ballastGradDark_${pId}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#B66CFF" stopOpacity="0.03" />
              <stop offset="50%" stopColor="#A855F7" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#B66CFF" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* Dynamic Construction Group: Progressively unrolls from Top to Bottom */}
          <g clipPath={`url(#trackBuildClip_${pId})`}>
            {/* 1. Ballast Embankment */}
            <path
              d={paths.ballastPolygon}
              fill={`url(#ballastGradLight_${pId})`}
              className={`fill-[url(#ballastGradLight_${pId})] dark:fill-[url(#ballastGradDark_${pId})]`}
            />

            {/* Ballast Outer Boundaries */}
            <path
              d={paths.ballastTopPath}
              fill="none"
              className="stroke-purple-300/40 dark:stroke-purple-500/25"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <path
              d={paths.ballastBottomPath}
              fill="none"
              className="stroke-purple-300/40 dark:stroke-purple-500/25"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />

            {/* 2. Crossties (Sleepers): Formed horizontally across the vertical rails */}
            {/* Sleeper Under-Shadow */}
            <path
              d={paths.centerPath}
              fill="none"
              className="stroke-black/10 dark:stroke-black/40"
              strokeWidth="56"
              strokeDasharray="8 24"
              strokeLinecap="round"
            />

            {/* Sleeper Concrete / Timber Main Body */}
            <path
              d={paths.centerPath}
              fill="none"
              className="stroke-slate-300 dark:stroke-slate-700/80"
              strokeWidth="52"
              strokeDasharray="8 24"
              strokeLinecap="round"
            />

            {/* Sleeper Surface Highlight & Plates */}
            <path
              d={paths.centerPath}
              fill="none"
              className="stroke-slate-200/90 dark:stroke-slate-600/60"
              strokeWidth="44"
              strokeDasharray="4 28"
              strokeLinecap="butt"
            />

            {/* 3. Center Optical Signal Cable */}
            <path
              d={paths.centerPath}
              fill="none"
              stroke={`url(#railCenterGrad_${pId})`}
              strokeWidth="1.8"
              strokeDasharray="6 10"
              className="opacity-75"
            />

            {/* 4. Left Steel Rail */}
            <path
              d={paths.topRailPath}
              fill="none"
              stroke="rgba(0,0,0,0.22)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d={paths.topRailPath}
              fill="none"
              className="stroke-slate-500 dark:stroke-slate-600"
              strokeWidth="4.5"
            />
            <path
              d={paths.topRailPath}
              fill="none"
              className={`stroke-[url(#railSteelGrad_${pId})] dark:stroke-[url(#railSteelGradDark_${pId})]`}
              strokeWidth="3.2"
            />
            <path
              d={paths.topRailPath}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeOpacity="0.75"
            />

            {/* 5. Right Steel Rail */}
            <path
              d={paths.bottomRailPath}
              fill="none"
              stroke="rgba(0,0,0,0.22)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d={paths.bottomRailPath}
              fill="none"
              className="stroke-slate-500 dark:stroke-slate-600"
              strokeWidth="4.5"
            />
            <path
              d={paths.bottomRailPath}
              fill="none"
              className={`stroke-[url(#railSteelGrad_${pId})] dark:stroke-[url(#railSteelGradDark_${pId})]`}
              strokeWidth="3.2"
            />
            <path
              d={paths.bottomRailPath}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeOpacity="0.75"
            />
          </g>

          {/* High-Tech Leading Edge Construction Laser Sparks that surge DOWNWARDS as vertical track is built */}
          <g
            className="pointer-events-none"
            style={{
              transform: isBuilt ? 'translateY(1060px)' : 'translateY(-40px)',
              opacity: isBuilt ? 1 : 0,
              transition: isBuilt
                ? 'transform 1.25s cubic-bezier(0.22, 1, 0.36, 1) 100ms, opacity 0.35s ease-out 100ms'
                : 'transform 0.25s ease-out 0ms, opacity 0.2s ease-out',
            }}
          >
            {/* Horizontal energetic laser line */}
            <line x1="55" y1="0" x2="145" y2="0" stroke={`url(#plasmaLaserGrad_${pId})`} strokeWidth="3" strokeLinecap="round" />
            {/* Center glowing energy core */}
            <circle cx="100" cy="0" r="14" className="fill-lavender-glow/30 blur-[4px]" />
            <circle cx="100" cy="0" r="6" className="fill-electric-purple/50 blur-[2px]" />
            <circle cx="100" cy="0" r="2.5" className="fill-white" />
            {/* Left Rail contact spark */}
            <circle cx="81" cy="0" r="8" className="fill-sky-400/40 blur-[3px]" />
            <circle cx="81" cy="0" r="2.5" className="fill-white" />
            {/* Right Rail contact spark */}
            <circle cx="119" cy="0" r="8" className="fill-sky-400/40 blur-[3px]" />
            <circle cx="119" cy="0" r="2.5" className="fill-white" />
          </g>
        </svg>
      </div>
    );
  }

  // Horizontal Track (Desktop view)
  return (
    <div className="relative w-full h-40 sm:h-44 select-none overflow-hidden flex items-center pointer-events-none">
      <svg
        viewBox="0 0 1400 160"
        preserveAspectRatio="none"
        className="w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dynamic Horizontal Progressive Construction Reveal Clip Path */}
          <clipPath id={`trackBuildClip_${pId}`}>
            <rect
              x="-80"
              y="-30"
              width={isBuilt ? 1600 : 0}
              height="220"
              style={{
                transition: isBuilt
                  ? 'width 1.15s cubic-bezier(0.22, 1, 0.36, 1) 100ms'
                  : 'width 0.25s ease-out 0ms',
              }}
            />
          </clipPath>

          {/* Construction Plasma Welding Laser Gradient */}
          <linearGradient id={`plasmaLaserGrad_${pId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0" />
            <stop offset="25%" stopColor="#C084FC" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>

          {/* Steel Rail Metallic Gradient */}
          <linearGradient id={`railSteelGrad_${pId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="35%" stopColor="#94A3B8" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Dark Mode Steel Rail Metallic Gradient */}
          <linearGradient id={`railSteelGradDark_${pId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="30%" stopColor="#94A3B8" />
            <stop offset="75%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Electric Signal Conduit Gradient */}
          <linearGradient id={`railCenterGrad_${pId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C2CF5" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#B66CFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7C2CF5" stopOpacity="0.8" />
          </linearGradient>

          {/* Ballast / Gravel Bed Gradient (Light Mode) */}
          <linearGradient id={`ballastGradLight_${pId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C2CF5" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#7C2CF5" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#7C2CF5" stopOpacity="0.04" />
          </linearGradient>

          {/* Ballast / Gravel Bed Gradient (Dark Mode) */}
          <linearGradient id={`ballastGradDark_${pId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B66CFF" stopOpacity="0.03" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#B66CFF" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Dynamic Construction Group: Progressively unrolls from Left to Right */}
        <g clipPath={`url(#trackBuildClip_${pId})`}>
          {/* 1. Ballast Embankment */}
          <path
            d={paths.ballastPolygon}
            fill={`url(#ballastGradLight_${pId})`}
            className={`fill-[url(#ballastGradLight_${pId})] dark:fill-[url(#ballastGradDark_${pId})]`}
          />

          {/* Ballast Outer Edges */}
          <path
            d={paths.ballastTopPath}
            fill="none"
            className="stroke-purple-300/40 dark:stroke-purple-500/25"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d={paths.ballastBottomPath}
            fill="none"
            className="stroke-purple-300/40 dark:stroke-purple-500/25"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />

          {/* 2. Railway Crossties (Sleepers): Wide 58px Gauge with rounded ends */}
          <path
            d={paths.centerPath}
            fill="none"
            className="stroke-black/10 dark:stroke-black/40"
            strokeWidth="60"
            strokeDasharray="8 24"
            strokeLinecap="round"
          />

          <path
            d={paths.centerPath}
            fill="none"
            className="stroke-slate-300 dark:stroke-slate-700/80"
            strokeWidth="56"
            strokeDasharray="8 24"
            strokeLinecap="round"
          />

          <path
            d={paths.centerPath}
            fill="none"
            className="stroke-slate-200/90 dark:stroke-slate-600/60"
            strokeWidth="48"
            strokeDasharray="4 28"
            strokeLinecap="butt"
          />

          {/* 3. Electric Center Conductor */}
          <path
            d={paths.centerPath}
            fill="none"
            stroke={`url(#railCenterGrad_${pId})`}
            strokeWidth="1.8"
            strokeDasharray="6 10"
            className="opacity-75"
          />

          {/* 4. Top Steel Rail */}
          <path
            d={paths.topRailPath}
            fill="none"
            stroke="rgba(0,0,0,0.22)"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <path
            d={paths.topRailPath}
            fill="none"
            className="stroke-slate-500 dark:stroke-slate-600"
            strokeWidth="5"
          />
          <path
            d={paths.topRailPath}
            fill="none"
            className={`stroke-[url(#railSteelGrad_${pId})] dark:stroke-[url(#railSteelGradDark_${pId})]`}
            strokeWidth="3.5"
          />
          <path
            d={paths.topRailPath}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.75"
          />

          {/* 5. Bottom Steel Rail */}
          <path
            d={paths.bottomRailPath}
            fill="none"
            stroke="rgba(0,0,0,0.22)"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <path
            d={paths.bottomRailPath}
            fill="none"
            className="stroke-slate-500 dark:stroke-slate-600"
            strokeWidth="5"
          />
          <path
            d={paths.bottomRailPath}
            fill="none"
            className={`stroke-[url(#railSteelGrad_${pId})] dark:stroke-[url(#railSteelGradDark_${pId})]`}
            strokeWidth="3.5"
          />
          <path
            d={paths.bottomRailPath}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.75"
          />
        </g>

        {/* High-Tech Leading Edge Construction Laser Sparks that surge across from left to right */}
        <g
          className="pointer-events-none"
          style={{
            transform: isBuilt ? 'translateX(1520px)' : 'translateX(-80px)',
            opacity: isBuilt ? 1 : 0,
            transition: isBuilt
              ? 'transform 1.15s cubic-bezier(0.22, 1, 0.36, 1) 100ms, opacity 0.35s ease-out 100ms'
              : 'transform 0.25s ease-out 0ms, opacity 0.2s ease-out',
          }}
        >
          <line x1="0" y1="20" x2="0" y2="140" stroke={`url(#plasmaLaserGrad_${pId})`} strokeWidth="3" strokeLinecap="round" />
          <circle cx="0" cy="80" r="14" className="fill-lavender-glow/30 blur-[4px]" />
          <circle cx="0" cy="80" r="6" className="fill-electric-purple/50 blur-[2px]" />
          <circle cx="0" cy="80" r="2.5" className="fill-white" />
          <circle cx="0" cy="60" r="8" className="fill-sky-400/40 blur-[3px]" />
          <circle cx="0" cy="60" r="2.5" className="fill-white" />
          <circle cx="0" cy="100" r="8" className="fill-sky-400/40 blur-[3px]" />
          <circle cx="0" cy="100" r="2.5" className="fill-white" />
        </g>
      </svg>
    </div>
  );
};
