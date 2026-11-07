import React, { useState } from 'react';
import { Linkedin, Shield, Check } from 'lucide-react';
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
              className="relative rounded-3xl overflow-hidden group transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-1 border border-purple-200/80 dark:border-white/10 hover:border-electric-purple/80 dark:hover:border-electric-purple/60 flex flex-col justify-between min-h-[560px] sm:min-h-[600px] bg-white dark:bg-midnight-card"
            >
              {/* 1. Full Container Background Image Layer */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {member.avatar && !imgErrors[member.id] ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover object-top opacity-95 dark:opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
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
                  Preserves the face clearly visible in the upper region while smoothly deepens over the 
                  chest/torso to ensure 100% crisp typography in both Light and Dark mode.
                */}
                {/* Light Mode Gradient */}
                <div className="dark:hidden absolute inset-0 bg-gradient-to-t from-white via-white/95 via-50% to-white/10" />
                <div className="dark:hidden absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />

                {/* Dark Mode Gradient */}
                <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/95 via-50% to-midnight-950/20" />
                <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-midnight-950/40 via-transparent to-transparent" />
                <div className="hidden dark:block absolute inset-0 bg-purple-950/15 mix-blend-color" />
              </div>

              {/* 2. Top Bar: Floating Tag & LinkedIn (Over Background) */}
              <div className="relative z-10 p-6 sm:p-7 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 dark:bg-black/60 backdrop-blur-md border border-purple-200/80 dark:border-white/15 text-xs font-mono font-bold text-electric-purple dark:text-lavender-glow shadow-sm">
                  {member.role.split(' ')[0]}
                </span>

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/85 dark:bg-black/60 backdrop-blur-md border border-purple-200/80 dark:border-white/15 text-light-subtext dark:text-gray-300 hover:text-white hover:bg-electric-purple hover:border-electric-purple transition-all shadow-sm flex-shrink-0"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* 3. Bottom Content Block: Name, Role, Primary Responsibility, Bio, Status (Over Background) */}
              <div className="relative z-10 p-6 sm:p-7 pt-0 flex flex-col justify-end">
                {/* Name & Designation */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-light-text dark:text-white tracking-tight drop-shadow-sm group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-electric-purple dark:text-lavender-glow mt-1 font-bold">
                    {member.designation}
                  </div>
                </div>

                {/* Primary Responsibility Frosted Badge */}
                <div className="p-3.5 rounded-2xl bg-white/85 dark:bg-midnight-900/80 backdrop-blur-md border border-purple-200/70 dark:border-white/10 shadow-sm mt-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-electric-purple dark:text-lavender-glow mb-1 flex items-center gap-1.5 font-bold">
                    <Shield className="w-3.5 h-3.5 text-electric-purple" />
                    <span>Primary Responsibility</span>
                  </div>
                  <p className="text-xs text-light-text dark:text-gray-100 font-semibold leading-relaxed">
                    {member.primaryResponsibility}
                  </p>
                </div>

                {/* Approved Bio */}
                <p className="text-xs sm:text-sm text-light-subtext dark:text-gray-300 leading-relaxed mt-4 drop-shadow-sm">
                  {member.bio}
                </p>

                {/* Verified Stakeholder Status Bar */}
                <div className="pt-4 mt-5 border-t border-purple-200/50 dark:border-white/10 flex items-center justify-between text-xs font-mono text-light-subtext dark:text-muted-gray">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Approved Executive</span>
                  </span>
                  <span className="text-[10px] bg-purple-50/90 dark:bg-midnight-950/80 backdrop-blur-sm text-electric-purple dark:text-lavender-light font-bold px-2.5 py-1 rounded-md border border-purple-200 dark:border-midnight-border">
                    {member.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
