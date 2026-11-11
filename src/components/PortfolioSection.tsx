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
  // Featured Flagship Services: UniVerse & Nexus CRM
  const universeProduct = products.find(p => p.slug === 'universe' || p.id === 'prod-01') || products[0];
  const nexusProduct = products.find(p => p.slug === 'nexus-crm' || p.id === 'prod-04') || products.find(p => p.name.toLowerCase().includes('nexus')) || products[1];
  const displayProducts = [universeProduct, nexusProduct].filter(Boolean);

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
            Top Flagship <span className="text-gradient-purple">Services</span>
          </h2>
          <p className="text-light-subtext dark:text-muted-gray text-base sm:text-lg leading-relaxed">
            Real-world enterprise systems, production platforms, and scalable architectures engineered and shipped with verified impact and high availability.
          </p>
        </div>

        {/* Portfolio Cards Grid (Wider Showcase for UniVerse with Properly Aligned Widescreen Video) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto items-stretch">
          {displayProducts.map((prod) => {
            const isUniverse = prod.slug === 'universe' || prod.id === 'prod-01' || prod.name.toLowerCase().includes('universe');
            const imgSrc = PROJECT_IMAGES[prod.id] || PROJECT_IMAGES[prod.slug] || '/services/crm-automation.jpg';

            return (
              <div
                key={prod.id}
                onClick={() => onOpenCaseStudy(prod)}
                className={`group relative rounded-3xl overflow-hidden flex flex-col justify-between border border-black/10 dark:border-white/10 hover:border-electric-purple/60 dark:hover:border-electric-purple/60 transition-all duration-500 cursor-pointer shadow-none hover:shadow-none ${
                  isUniverse
                    ? 'lg:col-span-8 min-h-[460px] sm:min-h-[500px] lg:min-h-[520px]'
                    : 'lg:col-span-4 min-h-[460px] sm:min-h-[500px] lg:min-h-[520px]'
                }`}
              >
                {/* 1. Full-Bleed Background Media covering the ENTIRE div (100% Crisp, Zero Overlay Wash) */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black flex items-center justify-center">
                  {isUniverse ? (
                    universeMediaMode === 'video' ? (
                      <img
                        src="/universe_video.webp"
                        alt="UniVerse Platform Demo Video"
                        className="w-full h-full object-cover object-top sm:object-[center_8%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        loading="eager"
                      />
                    ) : (
                      <img
                        src="/universe-banner.jpg"
                        alt={prod.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )
                  ) : (
                    <img
                      src={imgSrc}
                      alt={prod.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </div>

                {/* 2. Minimal Crisp Bottom Fade ONLY behind text - completely removes inner blue/dark shadow effect */}
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

                {/* 3. Card Top Row: Service Flag (Left) & Controls (Right) */}
                <div className="relative z-20 p-5 sm:p-6 flex items-center justify-between gap-3">
                  <div className="px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-lavender-light border border-white/20 flex items-center gap-1.5 shadow-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{isUniverse ? 'FLAGSHIP SERVICE' : 'ENTERPRISE SERVICE'}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {isUniverse && (
                      <div className="flex items-center bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/20">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUniverseMediaMode('video');
                          }}
                          className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            universeMediaMode === 'video'
                              ? 'bg-electric-purple text-white'
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
                              ? 'bg-electric-purple text-white'
                              : 'text-white/75 hover:text-white'
                          }`}
                        >
                          <ImageIcon className="w-3 h-3" />
                          <span>Banner</span>
                        </button>
                      </div>
                    )}

                    {prod.liveUrl ? (
                      <a
                        href={prod.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 shadow-none"
                        title="Open Full Screen"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Open Full Screen</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenCaseStudy(prod);
                        }}
                        className="px-4 py-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 shadow-none cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Open Full Screen</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 4. Card Bottom: Clean Overlaid Title & Tagline matching reference screenshot */}
                <div className="relative z-20 p-6 sm:p-8 space-y-1.5">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {prod.name}
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 font-normal leading-relaxed max-w-xl">
                    {prod.tagline || prod.subtitle}
                  </p>
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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-electric-purple to-deep-violet text-white text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer shadow-none hover:shadow-none"
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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-white/15 text-sm font-semibold text-light-text dark:text-white hover:text-electric-purple dark:hover:text-lavender-light hover:border-electric-purple hover:bg-lavender-soft/40 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer shadow-none hover:shadow-none"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
