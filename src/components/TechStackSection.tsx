import React from 'react';
import { TechStackMarquee } from './TechStackMarquee';

export const TechStackSection: React.FC = () => {
  return (
    <section id="tech-stack" className="relative py-12 sm:py-16 overflow-hidden bg-light-50/70 dark:bg-midnight-950/60 border-y border-purple-500/10 dark:border-white/5 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-electric-purple/5 dark:bg-electric-purple/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-6 sm:mb-8">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase bg-electric-purple/10 text-electric-purple dark:text-purple-300 border border-electric-purple/20 mb-3 sm:mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-purple animate-pulse" />
          Production Engineering Stack
        </div>

        {/* User-requested quote line */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-light-text dark:text-white max-w-3xl mx-auto leading-snug">
          &ldquo;The tech stacks we proficiently work with to turn ideas into scalable technology.&rdquo;
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-light-subtext dark:text-muted-gray max-w-xl mx-auto font-medium">
          Modern frameworks, type-safe languages, cloud infrastructure, and real-time distributed data layers.
        </p>
      </div>

      {/* Borderless Tech Stack Marquee */}
      <div className="w-full relative z-10">
        <TechStackMarquee />
      </div>
    </section>
  );
};
