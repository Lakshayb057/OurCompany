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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="glass-card-interactive rounded-2xl p-7 flex flex-col justify-between group relative overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div>
                {/* Portrait & Info Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-purple-200 dark:border-electric-purple/40 shadow-md group-hover:border-electric-purple group-hover:shadow-[0_0_20px_rgba(124,44,245,0.25)] transition-all duration-300 flex-shrink-0 bg-light-surface dark:bg-midnight-card relative">
                    {!imgErrors[member.id] && member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                        onError={() => setImgErrors(prev => ({ ...prev, [member.id]: true }))}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-lavender-soft via-white to-purple-100 dark:from-electric-purple/30 dark:to-deep-violet flex items-center justify-center font-bold font-mono text-xl text-electric-purple dark:text-lavender-light">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-light-text dark:text-white group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors truncate">
                          {member.name}
                        </h3>
                        <div className="text-xs font-mono text-electric-purple dark:text-lavender-glow mt-0.5 font-semibold">
                          {member.designation}
                        </div>
                      </div>

                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-light-surface dark:bg-midnight-card border border-purple-200 dark:border-midnight-border text-light-subtext dark:text-muted-gray hover:text-electric-purple hover:border-electric-purple transition-all shadow-sm flex-shrink-0"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Primary Responsibility Badge */}
                <div className="p-3 rounded-xl bg-light-surface dark:bg-midnight-card/80 border border-purple-100 dark:border-midnight-border/70 mb-5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-light-subtext dark:text-muted-gray mb-1 flex items-center gap-1.5 font-bold">
                    <Shield className="w-3.5 h-3.5 text-electric-purple" />
                    <span>Primary Responsibility</span>
                  </div>
                  <p className="text-xs text-light-text dark:text-gray-200 font-semibold leading-relaxed">
                    {member.primaryResponsibility}
                  </p>
                </div>

                {/* Approved Bio */}
                <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Verified Stakeholder status */}
              <div className="pt-4 border-t border-light-border dark:border-midnight-border/60 flex items-center justify-between text-xs font-mono text-light-subtext dark:text-muted-gray">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Approved Executive</span>
                </span>
                <span className="text-[10px] bg-lavender-soft text-electric-dark font-bold px-2 py-0.5 rounded border border-purple-200 dark:bg-midnight-900 dark:text-muted-gray dark:border-midnight-border">
                  {member.role.split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
