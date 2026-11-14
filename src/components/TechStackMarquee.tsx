import React from 'react';
import {
  siReact,
  siTypescript,
  siNextdotjs,
  siNodedotjs,
  siExpress,
  siFastapi,
  siPostgresql,
  siMongodb,
  siRedis,
  siDocker,
  siTailwindcss,
  siSocketdotio,
  siPrisma,
  siGraphql,
} from 'simple-icons';

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

const TECH_STACK_ITEMS: TechItem[] = [
  {
    name: 'React',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" fill={`#${siReact.hex}`}>
        <path d={siReact.path} />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#FFFFFF" />
        <path d={siTypescript.path} fill={`#${siTypescript.hex}`} />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">
        <circle cx="12" cy="12" r="11.5" className="fill-white dark:fill-black" />
        <path d={siNextdotjs.path} className="fill-black dark:fill-white" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" fill={`#${siNodedotjs.hex}`}>
        <path d={siNodedotjs.path} />
      </svg>
    ),
  },
  {
    name: 'Express.js',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 fill-black dark:fill-white">
        <path d={siExpress.path} />
      </svg>
    ),
  },
  {
    name: 'Python',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">
        <path
          d="M11.914 0C5.825 0 6.2 2.656 6.2 2.656l.006 2.752h5.81v.825H3.92S0 5.766 0 11.895c0 6.13 3.42 5.92 3.42 5.92h2.043v-2.868s-.11-3.42 3.364-3.42h5.782s3.255.053 3.255-3.148V3.148S18.337 0 11.914 0zM8.59 1.838a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z"
          fill="#387EB8"
        />
        <path
          d="M12.086 24c6.089 0 5.714-2.656 5.714-2.656l-.006-2.752h-5.81v-.825h8.096s3.92.467 3.92-5.662c0-6.13-3.42-5.92-3.42-5.92h-2.043v2.868s.11 3.42-3.364 3.42H9.391s-3.255-.053-3.255 3.148v5.239S5.663 24 12.086 24zm3.324-1.838a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z"
          fill="#FFE873"
        />
      </svg>
    ),
  },
  {
    name: 'FastAPI',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">
        <circle cx="12" cy="12" r="11" fill="#FFFFFF" />
        <path d={siFastapi.path} fill={`#${siFastapi.hex}`} />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" fill={`#${siPostgresql.hex}`}>
        <path d={siPostgresql.path} />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" fill={`#${siMongodb.hex}`}>
        <path d={siMongodb.path} />
      </svg>
    ),
  },
  {
    name: 'Redis',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" fill={`#${siRedis.hex}`}>
        <path d={siRedis.path} />
      </svg>
    ),
  },
  {
    name: 'Docker',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" fill={`#${siDocker.hex}`}>
        <path d={siDocker.path} />
      </svg>
    ),
  },
  {
    name: 'AWS',
    icon: (
      <svg viewBox="0 0 36 26" className="w-12 sm:w-14 h-auto shrink-0" fill="none">
        <path
          d="M10.8 14.5c0-1.8-1.1-2.7-2.9-2.7-1.4 0-2.4.6-2.9 1.3l1.4 1.2c.3-.4.8-.7 1.4-.7.8 0 1.2.4 1.2 1.1v.4c-.5-.1-1.1-.2-1.7-.2-2 0-3.3.9-3.3 2.4 0 1.4 1 2.2 2.3 2.2 1.1 0 1.9-.5 2.4-1.3v1.1h1.8v-4.8zm-1.8 3c-.3.5-.9.9-1.5.9-.8 0-1.3-.4-1.3-1.2 0-.8.5-1.2 1.5-1.2.4 0 .9.1 1.3.2v1.3z"
          fill="#232F3E"
          className="dark:fill-white"
        />
        <path
          d="M22.5 11h-1.9l-2 7-1.9-7h-1.7l-2 7-2-7H9.2l3.1 9.5h1.8l1.9-6.5 1.9 6.5h1.8l3-9.5h-2z"
          fill="#232F3E"
          className="dark:fill-white"
        />
        <path
          d="M28.2 17.5c-.3.4-1 .8-1.8.8-1 0-1.5-.5-1.5-1.2 0-.7.5-1 1.5-1.3l1.1-.3c1.8-.4 2.6-1.3 2.6-2.7 0-1.8-1.5-2.9-3.6-2.9-1.5 0-2.8.5-3.6 1.3l1.1 1.4c.6-.5 1.4-.9 2.4-.9 1 0 1.6.5 1.6 1.2 0 .6-.4.9-1.4 1.2l-1.1.3c-1.9.4-2.8 1.4-2.8 2.8 0 1.8 1.4 2.9 3.5 2.9 1.4 0 2.5-.5 3.2-1.2l-1.4-1.4z"
          fill="#232F3E"
          className="dark:fill-white"
        />
        <path
          d="M3.8 21.8c6.4 4.1 15 4.7 22.7 1.5.7-.3 1.4.3 1.1 1-.9 2.2-3.7 3.2-6.3 3.7-6.9 1.2-14.1-.7-19.2-4.8-.5-.4-.2-1.2.5-1.4h1.2z"
          fill="#FF9900"
        />
        <path
          d="M29.2 22.3c-.5-.6-3.5-1-4.9-.9-.4 0-.6-.3-.3-.7 2.3-2.1 6.1-1.5 6.6-.8.5.8-.2 4.8-2.3 6.7-.3.3-.7.2-.6-.3.3-1.4 1.2-3.3 1.5-4z"
          fill="#FF9900"
        />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" fill={`#${siTailwindcss.hex}`}>
        <path d={siTailwindcss.path} />
      </svg>
    ),
  },
  {
    name: 'Socket.io',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 fill-black dark:fill-white">
        <path d={siSocketdotio.path} />
      </svg>
    ),
  },
  {
    name: 'Prisma',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 fill-[#2D3748] dark:fill-white">
        <path d={siPrisma.path} />
      </svg>
    ),
  },
  {
    name: 'Vite',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">
        <defs>
          <linearGradient id="viteGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#41D1FF" />
            <stop offset="100%" stopColor="#BD34FE" />
          </linearGradient>
          <linearGradient id="viteBolt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFEA83" />
            <stop offset="100%" stopColor="#FFA800" />
          </linearGradient>
        </defs>
        <path
          d="M23.593 3.655L12.57 23.37a.64.64 0 01-1.127.004L.407 3.655a.644.644 0 01.764-.932L12 6.096l10.829-3.373a.644.644 0 01.764.932z"
          fill="url(#viteGrad)"
        />
        <path
          d="M13.882 1.004L6.46 12.352a.4.4 0 00.334.618h3.944l-2.072 6.223a.3.3 0 00.495.313l7.98-9.155a.4.4 0 00-.303-.664h-3.951l2.42-8.318a.3.3 0 00-.425-.365z"
          fill="url(#viteBolt)"
        />
      </svg>
    ),
  },
  {
    name: 'GraphQL',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" fill={`#${siGraphql.hex}`}>
        <path d={siGraphql.path} />
      </svg>
    ),
  },
];

export const TechStackMarquee: React.FC = () => {
  // Repeating the set 4 times guarantees a seamless, gap-free infinite flow on all resolutions (from mobile to ultrawide/4K)
  const displayItems = [
    ...TECH_STACK_ITEMS,
    ...TECH_STACK_ITEMS,
    ...TECH_STACK_ITEMS,
    ...TECH_STACK_ITEMS,
  ];

  return (
    <div className="w-full relative py-2 sm:py-4 overflow-hidden select-none">
      {/* Edge-to-edge marquee wrapper with subtle edge fade masks */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_3%,black_97%,transparent_100%)]">
        <div className="animate-tech-marquee flex items-center gap-8 sm:gap-12 md:gap-14 py-2 pointer-events-none">
          {displayItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              title={item.name}
              className="flex items-center justify-center shrink-0 opacity-85 hover:opacity-100 transition-opacity"
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
