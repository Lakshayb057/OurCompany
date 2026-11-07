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

// Harmonious 4-segment smooth cubic Bezier curve matching the 4 station cards
// Card 1 (x~175, y~74), Card 2 (x~525, y~87), Card 3 (x~875, y~87), Card 4 (x~1225, y~74)
const SEGMENTS: BezierSegment[] = [
  { p0: { x: -60, y: 80 }, p1: { x: 50, y: 72 }, p2: { x: 200, y: 72 }, p3: { x: 350, y: 80 } },
  { p0: { x: 350, y: 80 }, p1: { x: 500, y: 88 }, p2: { x: 600, y: 88 }, p3: { x: 700, y: 88 } },
  { p0: { x: 700, y: 88 }, p1: { x: 800, y: 88 }, p2: { x: 900, y: 88 }, p3: { x: 1050, y: 80 } },
  { p0: { x: 1050, y: 80 }, p1: { x: 1200, y: 72 }, p2: { x: 1350, y: 72 }, p3: { x: 1460, y: 80 } },
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

function getOffsetPoints(offset: number, stepsPerSeg = 30): Point[] {
  const pts: Point[] = [];
  SEGMENTS.forEach((seg, sIdx) => {
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
}

export const RailwayTrack: React.FC<RailwayTrackProps> = ({ isBuilt = true }) => {
  // Compute mathematically parallel paths along the curve
  const {
    ballastPolygon,
    ballastTopPath,
    ballastBottomPath,
    centerPath,
    topRailPath,
    bottomRailPath,
  } = useMemo(() => {
    const topBallastPts = getOffsetPoints(40);
    const botBallastPts = getOffsetPoints(-40);
    const topRailPts = getOffsetPoints(20);
    const botRailPts = getOffsetPoints(-20);
    const centerPts = getOffsetPoints(0);

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
  }, []);

  return (
    <div className="relative w-full h-40 sm:h-44 select-none overflow-hidden flex items-center pointer-events-none">
      <svg
        viewBox="0 0 1400 160"
        preserveAspectRatio="none"
        className="w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dynamic Track Construction Progressive Reveal Clip Path */}
          <clipPath id="trackBuildClip">
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
          <linearGradient id="plasmaLaserGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0" />
            <stop offset="25%" stopColor="#C084FC" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>

          {/* Steel Rail Metallic Gradient */}
          <linearGradient id="railSteelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="35%" stopColor="#94A3B8" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Dark Mode Steel Rail Metallic Gradient */}
          <linearGradient id="railSteelGradDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="30%" stopColor="#94A3B8" />
            <stop offset="75%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Electric Signal Conduit Gradient */}
          <linearGradient id="railCenterGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C2CF5" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#B66CFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7C2CF5" stopOpacity="0.8" />
          </linearGradient>

          {/* Ballast / Gravel Bed Gradient (Light Mode) */}
          <linearGradient id="ballastGradLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C2CF5" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#7C2CF5" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#7C2CF5" stopOpacity="0.04" />
          </linearGradient>

          {/* Ballast / Gravel Bed Gradient (Dark Mode) */}
          <linearGradient id="ballastGradDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B66CFF" stopOpacity="0.03" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#B66CFF" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Dynamic Construction Group: Progressively unrolls from Left to Right */}
        <g clipPath="url(#trackBuildClip)">
          {/* 1. Ballast Embankment (Gravel Bed Ribbon) */}
          <path
            d={ballastPolygon}
            className="fill-[url(#ballastGradLight)] dark:fill-[url(#ballastGradDark)]"
          />

          {/* Ballast Outer Edges / Shoulder Boundaries */}
          <path
            d={ballastTopPath}
            fill="none"
            className="stroke-purple-300/40 dark:stroke-purple-500/25"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d={ballastBottomPath}
            fill="none"
            className="stroke-purple-300/40 dark:stroke-purple-500/25"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />

          {/* 2. Railway Crossties (Sleepers): Wide 58px Gauge with rounded ends */}
          {/* Sleeper Under-Shadow */}
          <path
            d={centerPath}
            fill="none"
            className="stroke-black/10 dark:stroke-black/40"
            strokeWidth="60"
            strokeDasharray="8 24"
            strokeLinecap="round"
          />

          {/* Sleeper Concrete / Timber Main Body */}
          <path
            d={centerPath}
            fill="none"
            className="stroke-slate-300 dark:stroke-slate-700/80"
            strokeWidth="56"
            strokeDasharray="8 24"
            strokeLinecap="round"
          />

          {/* Sleeper Surface Highlight & Tie Plates */}
          <path
            d={centerPath}
            fill="none"
            className="stroke-slate-200/90 dark:stroke-slate-600/60"
            strokeWidth="48"
            strokeDasharray="4 28"
            strokeLinecap="butt"
          />

          {/* 3. High-Tech Electric Center Conductor / Fiber Signal Line */}
          <path
            d={centerPath}
            fill="none"
            stroke="url(#railCenterGrad)"
            strokeWidth="1.8"
            strokeDasharray="6 10"
            className="opacity-75"
          />

          {/* 4. Top Steel Rail */}
          {/* Rail Base Shadow */}
          <path
            d={topRailPath}
            fill="none"
            stroke="rgba(0,0,0,0.22)"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          {/* Rail Flange Foot */}
          <path
            d={topRailPath}
            fill="none"
            className="stroke-slate-500 dark:stroke-slate-600"
            strokeWidth="5"
          />
          {/* Rail Metallic Crown */}
          <path
            d={topRailPath}
            fill="none"
            className="stroke-[url(#railSteelGrad)] dark:stroke-[url(#railSteelGradDark)]"
            strokeWidth="3.5"
          />
          {/* Polished Rail Top Shine */}
          <path
            d={topRailPath}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.75"
          />

          {/* 5. Bottom Steel Rail */}
          {/* Rail Base Shadow */}
          <path
            d={bottomRailPath}
            fill="none"
            stroke="rgba(0,0,0,0.22)"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          {/* Rail Flange Foot */}
          <path
            d={bottomRailPath}
            fill="none"
            className="stroke-slate-500 dark:stroke-slate-600"
            strokeWidth="5"
          />
          {/* Rail Metallic Crown */}
          <path
            d={bottomRailPath}
            fill="none"
            className="stroke-[url(#railSteelGrad)] dark:stroke-[url(#railSteelGradDark)]"
            strokeWidth="3.5"
          />
          {/* Polished Rail Top Shine */}
          <path
            d={bottomRailPath}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.75"
          />
        </g>

        {/* High-Tech Leading Edge Construction Laser Sparks that surge across as the track is laid */}
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
          {/* Vertical energetic laser line */}
          <line x1="0" y1="20" x2="0" y2="140" stroke="url(#plasmaLaserGrad)" strokeWidth="3" strokeLinecap="round" />
          {/* Center glowing energy core */}
          <circle cx="0" cy="80" r="14" className="fill-lavender-glow/30 blur-[4px]" />
          <circle cx="0" cy="80" r="6" className="fill-electric-purple/50 blur-[2px]" />
          <circle cx="0" cy="80" r="2.5" className="fill-white" />
          {/* Top Rail contact spark */}
          <circle cx="0" cy="60" r="8" className="fill-sky-400/40 blur-[3px]" />
          <circle cx="0" cy="60" r="2.5" className="fill-white" />
          {/* Bottom Rail contact spark */}
          <circle cx="0" cy="100" r="8" className="fill-sky-400/40 blur-[3px]" />
          <circle cx="0" cy="100" r="2.5" className="fill-white" />
        </g>
      </svg>
    </div>
  );
};
