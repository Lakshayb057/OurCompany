import React from 'react';
import {
  siReact,
  siTypescript,
  siNextdotjs,
  siNodedotjs,
  siExpress,
  siPython,
  siFastapi,
  siPostgresql,
  siMongodb,
  siRedis,
  siDocker,
  siTailwindcss,
  siSocketdotio,
  siPrisma,
  siVite,
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
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" fill={`#${siReact.hex}`}>
        <path d={siReact.path} />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" fill={`#${siTypescript.hex}`}>
        <path d={siTypescript.path} />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 fill-black dark:fill-white">
        <path d={siNextdotjs.path} />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" fill={`#${siNodedotjs.hex}`}>
        <path d={siNodedotjs.path} />
      </svg>
    ),
  },
  {
    name: 'Express.js',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 fill-black dark:fill-white">
        <path d={siExpress.path} />
      </svg>
    ),
  },
  {
    name: 'Python',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" fill={`#${siPython.hex}`}>
        <path d={siPython.path} />
      </svg>
    ),
  },
  {
    name: 'FastAPI',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" fill={`#${siFastapi.hex}`}>
        <path d={siFastapi.path} />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" fill={`#${siPostgresql.hex}`}>
        <path d={siPostgresql.path} />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" fill={`#${siMongodb.hex}`}>
        <path d={siMongodb.path} />
      </svg>
    ),
  },
  {
    name: 'Redis',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" fill={`#${siRedis.hex}`}>
        <path d={siRedis.path} />
      </svg>
    ),
  },
  {
    name: 'Docker',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" fill={`#${siDocker.hex}`}>
        <path d={siDocker.path} />
      </svg>
    ),
  },
  {
    name: 'AWS',
    icon: (
      <svg viewBox="0 0 36 26" className="w-10 sm:w-12 h-auto shrink-0" fill="none">
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
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" fill={`#${siTailwindcss.hex}`}>
        <path d={siTailwindcss.path} />
      </svg>
    ),
  },
  {
    name: 'Socket.io',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 fill-black dark:fill-white">
        <path d={siSocketdotio.path} />
      </svg>
    ),
  },
  {
    name: 'Prisma',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 fill-[#2D3748] dark:fill-white">
        <path d={siPrisma.path} />
      </svg>
    ),
  },
  {
    name: 'Vite',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" fill={`#${siVite.hex}`}>
        <path d={siVite.path} />
      </svg>
    ),
  },
  {
    name: 'GraphQL',
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" fill={`#${siGraphql.hex}`}>
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
        <div className="animate-tech-marquee flex items-center gap-6 sm:gap-9 py-2 pointer-events-none">
          {displayItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              title={item.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-midnight-card/90 border border-purple-100/90 dark:border-midnight-border/80 shadow-[0_3px_12px_-3px_rgba(124,44,245,0.1)] flex items-center justify-center shrink-0 backdrop-blur-md"
            >
              <div className="flex items-center justify-center">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
