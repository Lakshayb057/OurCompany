import React, { useState } from 'react';
import { Linkedin, Shield } from 'lucide-react';
import { TeamMember } from '../types';

interface LeadershipSectionProps {
  team: TeamMember[];
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ team }) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  return (
    <section id="leadership" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
            Leadership & <span className="text-gradient-purple">Governance</span>
          </h2>
          <p className="text-light-subtext dark:text-muted-gray text-base leading-relaxed">
            A cohesive multidisciplinary executive team uniting strategic direction, technical architecture, operations, and global growth.
          </p>
        </div>

        {/* Leadership Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {team.map((member) => (
            <div
              key={member.id}
              className="relative rounded-3xl overflow-hidden group transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 border border-purple-200/80 dark:border-white/10 hover:border-electric-purple/80 dark:hover:border-electric-purple/60 flex flex-col justify-between min-h-[580px] sm:min-h-[640px] lg:min-h-[670px] bg-slate-100 dark:bg-midnight-card"
            >
              {/* 1. Full Container Background Image Layer - 100% Visible & Crisp */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {member.avatar && !imgErrors[member.id] ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={() => setImgErrors(prev => ({ ...prev, [member.id]: true }))}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-lavender-soft via-white to-purple-100 dark:from-midnight-950 dark:via-midnight-900 dark:to-deep-violet flex items-center justify-center">
                    <span className="text-8xl font-black font-mono text-electric-purple/20 select-none">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                )}

                {/* 
                  Theme-Adaptive Gradient Overlays:
                  Keeps the entire upper 60%+ of the portrait completely unshaded and 100% visible,
                  while gently fading only behind the bottom text to guarantee readability.
                */}
                {/* Light Mode Scrim */}
                <div className="dark:hidden absolute inset-0 bg-gradient-to-t from-white via-white/85 via-25% to-transparent to-50%" />

                {/* Dark Mode Scrim */}
                <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/90 via-25% to-transparent to-50%" />
              </div>

              {/* 2. Top Bar: Floating Stream Tag & LinkedIn (Over Background) */}
              <div className="relative z-10 p-6 sm:p-7 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-black/75 backdrop-blur-md border border-purple-200/90 dark:border-white/20 text-xs font-mono font-bold text-electric-purple dark:text-lavender-glow shadow-md">
                  {member.role.split(' ')[0]}
                </span>

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/90 dark:bg-black/75 backdrop-blur-md border border-purple-200/90 dark:border-white/20 text-light-text dark:text-gray-200 hover:text-white hover:bg-electric-purple hover:border-electric-purple transition-all shadow-md flex-shrink-0"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* 3. Bottom Content Block: Name, Designation & Primary Responsibility (Over Background) */}
              <div className="relative z-10 p-6 sm:p-7 pt-0 flex flex-col justify-end">
                {/* Name & Designation with High-Contrast Drop Shadow */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-light-text dark:text-white tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-purple-700 dark:text-lavender-glow mt-1 font-bold drop-shadow-sm">
                    {member.designation}
                  </div>
                </div>

                {/* Primary Responsibility Frosted Badge */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-black/75 backdrop-blur-md border border-purple-200/90 dark:border-white/15 shadow-md mt-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-electric-purple dark:text-lavender-glow mb-1 flex items-center gap-1.5 font-bold">
                    <Shield className="w-3.5 h-3.5 text-electric-purple" />
                    <span>Primary Responsibility</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-light-text dark:text-gray-100 font-semibold leading-relaxed">
                    {member.primaryResponsibility}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
