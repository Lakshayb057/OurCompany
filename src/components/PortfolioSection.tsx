import React, { useState } from 'react';
import { Github, ArrowUpRight, BookOpen, ArrowRight, Play, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';

interface PortfolioSectionProps {
  products: Product[];
  onOpenCaseStudy: (product: Product) => void;
  onViewAllProjects?: () => void;
  onViewAllServices?: () => void;
}

const PROJECT_IMAGES: Record<string, string> = {
  'prod-01': '/universe-banner.jpg',
  'prod-02': '/services/ai-agents.jpg',
  'prod-03': '/services/institutional-erp.jpg',
  'prod-04': '/services/crm-automation.jpg',
  'prod-05': '/services/campus-marketplaces.jpg',
  'prod-06': '/services/agri-commerce.jpg',
  'universe': '/universe-banner.jpg',
  'chatleads-ai': '/services/ai-agents.jpg',
  'abv-skillport': '/services/institutional-erp.jpg',
  'nexus-crm': '/services/crm-automation.jpg',
  'campxchange': '/services/campus-marketplaces.jpg',
  'sachikheti': '/services/agri-commerce.jpg',
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ 
  products, 
  onOpenCaseStudy,
  onViewAllProjects,
  onViewAllServices 
}) => {
  // Take top 2 projects to feature prominently
  const displayProducts = products.slice(0, 2);

  // UniVerse Interactive Media state (seamlessly toggle between WebP Video & High-Res Banner)
  const [universeMediaMode, setUniverseMediaMode] = useState<'video' | 'photo'>('video');

  return (
    <section id="projects" className="scroll-mt-12 sm:scroll-mt-16 py-24 relative overflow-hidden bg-light-100/50 dark:bg-midnight-900/40 transition-colors duration-300">
      {/* Anchor for legacy or alternate links targeting #portfolio */}
      <div id="portfolio" className="absolute -top-24 left-0 w-1 h-1 pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-electric-purple/5 dark:bg-electric-purple/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-lavender-glow/5 dark:bg-deep-violet/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
            Top Flagship <span className="text-gradient-purple">Projects</span>
          </h2>
          <p className="text-light-subtext dark:text-muted-gray text-base sm:text-lg leading-relaxed">
            Real-world systems, production platforms, and 0-to-1 startups built and shipped with verified impact, high availability, and measurable business outcomes.
          </p>
        </div>

        {/* Portfolio Cards Grid (2 Featured Flagship Projects) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {displayProducts.map((prod) => {
            const isUniverse = prod.slug === 'universe' || prod.id === 'prod-01' || prod.name.toLowerCase().includes('universe');
            const imgSrc = PROJECT_IMAGES[prod.id] || PROJECT_IMAGES[prod.slug] || '/services/cloud-systems.jpg';

            return (
              <div
                key={prod.id}
                className="glass-card-interactive rounded-2xl flex flex-col justify-between overflow-hidden group border border-purple-100 dark:border-midnight-border/80 shadow-md hover:shadow-xl transition-all"
              >
                {/* Card Header Media Preview */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900 group/media">
                  {isUniverse ? (
                    <>
                      {/* Media Mode Toggle Pills (Demo Video & Banner) */}
                      <div className="absolute top-3 right-3 z-30 flex items-center bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-lg">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUniverseMediaMode('video');
                          }}
                          className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            universeMediaMode === 'video'
                              ? 'bg-electric-purple text-white shadow-md'
                              : 'text-white/75 hover:text-white'
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Video</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUniverseMediaMode('photo');
                          }}
                          className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            universeMediaMode === 'photo'
                              ? 'bg-electric-purple text-white shadow-md'
                              : 'text-white/75 hover:text-white'
                          }`}
                        >
                          <ImageIcon className="w-3 h-3" />
                          <span>Banner</span>
                        </button>
                      </div>

                      {/* WebP Video Player or Photo Banner */}
                      {universeMediaMode === 'video' ? (
                        <div className="relative w-full h-full bg-slate-900">
                          <img
                            src="/universe_video.webp"
                            alt="UniVerse Platform Demo Video"
                            className="w-full h-full object-cover"
                            loading="eager"
                          />
                        </div>
                      ) : (
                        <img
                          src="/universe-banner.jpg"
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      )}
                    </>
                  ) : (
                    <img
                      src={imgSrc}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-2xl font-bold text-light-text dark:text-white group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors">
                        {prod.name}
                      </h3>
                      <div className="text-xs font-mono text-electric-purple/80 dark:text-lavender-muted mt-0.5 font-semibold">
                        {prod.subtitle}
                      </div>
                    </div>

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
                  <div className="pt-4 border-t border-purple-100 dark:border-midnight-border/70 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onOpenCaseStudy(prod)}
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-midnight-surface hover:bg-lavender-soft text-xs font-semibold text-electric-purple dark:text-lavender-light border border-purple-200 dark:border-electric-purple/30 flex items-center gap-1.5 transition-all shadow-sm group/btn"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-electric-purple" />
                      <span>Case Study</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {prod.githubUrl && (
                        <a
                          href={prod.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white dark:bg-midnight-card border border-light-border dark:border-midnight-border text-light-subtext dark:text-gray-400 hover:text-electric-purple dark:hover:text-white transition-colors shadow-sm"
                          title="View Source Code on GitHub"
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

              </div>
            );
          })}
        </div>

        {/* 2 Action Buttons: Explore All Projects & Explore All Services */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {/* Button 1: Explore All Projects */}
          <button
            onClick={onViewAllProjects}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-electric-purple to-deep-violet text-white text-sm font-semibold shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Button 2: Explore All Services */}
          <button
            onClick={onViewAllServices || (() => {
              const el = document.getElementById('services');
              el?.scrollIntoView({ behavior: 'smooth' });
            })}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-white/15 text-sm font-semibold text-light-text dark:text-white hover:text-electric-purple dark:hover:text-lavender-light hover:border-electric-purple hover:bg-lavender-soft/40 dark:hover:bg-white/5 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
