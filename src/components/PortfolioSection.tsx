import React from 'react';
import { Github, ArrowUpRight, BookOpen } from 'lucide-react';
import { Product } from '../types';

interface PortfolioSectionProps {
  products: Product[];
  onOpenCaseStudy: (product: Product) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ products, onOpenCaseStudy }) => {
  return (
    <section id="portfolio" className="py-24 relative overflow-hidden bg-light-100/50 dark:bg-midnight-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
            Selected <span className="text-gradient-purple">Engineering Case Studies</span>
          </h2>
          <p className="text-light-subtext dark:text-muted-gray text-base leading-relaxed">
            Real-world systems, production platforms, and 0-to-1 startups built and shipped with verified impact, high availability, and measurable business outcomes.
          </p>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="glass-card-interactive rounded-2xl flex flex-col justify-between overflow-hidden group border border-purple-100 dark:border-midnight-border/80 shadow-md hover:shadow-xl transition-all"
            >
              <div className="p-7 space-y-5">
                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-2xl font-bold text-light-text dark:text-white group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors">
                    {prod.name}
                  </h3>
                  <div className="text-xs font-mono text-electric-purple/80 dark:text-lavender-muted mt-0.5 font-semibold">
                    {prod.subtitle}
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray leading-relaxed">
                  {prod.tagline}
                </p>

                {/* Impact Metrics Row */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {prod.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-light-surface dark:bg-midnight-card/90 border border-purple-100 dark:border-midnight-border/60">
                      <div className="text-base font-bold font-mono text-light-text dark:text-white">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-light-subtext dark:text-muted-gray truncate font-medium">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {prod.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-light-100 dark:bg-midnight-card text-light-subtext dark:text-gray-400 border border-light-border dark:border-midnight-border"
                    >
                      {tech}
                    </span>
                  ))}
                  {prod.technologies.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-lavender-soft text-electric-purple font-semibold border border-purple-200 dark:bg-midnight-card dark:text-lavender-muted dark:border-midnight-border">
                      +{prod.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 bg-light-surface/60 dark:bg-midnight-card/50 border-t border-purple-100 dark:border-midnight-border/70 flex items-center justify-between gap-3">
                <button
                  onClick={() => onOpenCaseStudy(prod)}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-midnight-surface hover:bg-lavender-soft text-xs font-semibold text-electric-purple dark:text-lavender-light border border-purple-200 dark:border-electric-purple/30 flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Case Study</span>
                </button>

                <div className="flex items-center gap-2">
                  {prod.githubUrl && (
                    <a
                      href={prod.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white dark:bg-midnight-card border border-light-border dark:border-midnight-border text-light-subtext dark:text-gray-400 hover:text-electric-purple dark:hover:text-white transition-colors shadow-sm"
                      title="View Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {prod.liveUrl && (
                    <a
                      href={prod.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-electric-purple hover:bg-electric-dark text-white text-xs font-medium flex items-center gap-1 transition-all shadow-md shadow-purple-600/20"
                      title="Open Live Deployment"
                    >
                      <span>Live</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
