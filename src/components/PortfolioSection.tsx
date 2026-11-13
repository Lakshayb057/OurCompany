import React, { useState } from 'react';
import { Github, ArrowUpRight, BookOpen, ArrowRight, Play, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';
import { TechStackMarquee } from './TechStackMarquee';

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
  'prod-04': '/CRM.jpeg',
  'prod-05': '/services/campus-marketplaces.jpg',
  'prod-06': '/services/agri-commerce.jpg',
  'universe': '/universe-banner.jpg',
  'chatleads-ai': '/services/ai-agents.jpg',
  'abv-skillport': '/services/institutional-erp.jpg',
  'nexus-crm': '/CRM.jpeg',
  'campxchange': '/services/campus-marketplaces.jpg',
  'sachikheti': '/services/agri-commerce.jpg',
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  products,
  onOpenCaseStudy,
  onViewAllProjects,
  onViewAllServices
}) => {
  // Featured Flagship Services: UniVerse & Nexus CRM (filtered by visibility)
  const visibleProducts = products.filter(p => p.isVisible !== false);
  const universeProduct = visibleProducts.find(p => p.slug === 'universe' || p.id === 'prod-01') || visibleProducts[0];
  const nexusProduct = visibleProducts.find(p => p.slug === 'nexus-crm' || p.id === 'prod-04') || visibleProducts.find(p => p.name.toLowerCase().includes('nexus')) || visibleProducts[1];
  const displayProducts = [universeProduct, nexusProduct].filter(Boolean);

  // Dynamic Interactive Media state for each project (seamlessly toggle between Video & Photo)
  const [mediaModes, setMediaModes] = useState<Record<string, 'video' | 'photo'>>({});

  const getMediaMode = (prod: Product): 'video' | 'photo' => {
    if (mediaModes[prod.id]) return mediaModes[prod.id];
    const isUniverse = prod.slug === 'universe' || prod.id === 'prod-01' || prod.name.toLowerCase().includes('universe');
    const isNexus = prod.slug === 'nexus-crm' || prod.id === 'prod-04' || prod.name.toLowerCase().includes('nexus');
    const hasVideo = Boolean(prod.videoUrl || prod.video || (isUniverse ? '/universe_video.webp' : (isNexus ? '/CRM.webm' : null)));
    if (prod.mediaType === 'image') return 'photo';
    if (prod.mediaType === 'video') return 'video';
    return hasVideo ? 'video' : 'photo';
  };

  const setProjectMedia = (prodId: string, mode: 'video' | 'photo') => {
    setMediaModes(prev => ({ ...prev, [prodId]: mode }));
  };

  return (
    <section id="projects" className="scroll-mt-12 sm:scroll-mt-16 pt-8 pb-8 sm:py-16 md:py-24 relative overflow-hidden bg-light-100/50 dark:bg-midnight-900/40 transition-colors duration-300">
      {/* Anchor for legacy or alternate links targeting #portfolio */}
      <div id="portfolio" className="absolute -top-24 left-0 w-1 h-1 pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-electric-purple/5 dark:bg-electric-purple/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-lavender-glow/5 dark:bg-deep-violet/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
            Top Flagship <span className="text-gradient-purple">Services</span>
          </h2>
          <p className="text-light-subtext dark:text-muted-gray text-base sm:text-lg leading-relaxed">
            Real-world enterprise systems, production platforms, and scalable architectures engineered and shipped with verified impact and high availability.
          </p>
        </div>

      </div>

      {/* Full-Bleed Revolving Tech Stack Band - Positioned right after header text */}
      <div className="mb-8 sm:mb-12 w-full relative z-10 overflow-hidden">
        <TechStackMarquee />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Portfolio Cards Grid (Wider Showcase for UniVerse with Properly Aligned Widescreen Video) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto items-stretch">
          {displayProducts.map((prod) => {
            const isUniverse = prod.slug === 'universe' || prod.id === 'prod-01' || prod.name.toLowerCase().includes('universe');
            const isNexus = prod.slug === 'nexus-crm' || prod.id === 'prod-04' || prod.name.toLowerCase().includes('nexus');
            const videoSrc = prod.videoUrl || prod.video || (isUniverse ? '/universe_video.webp' : (isNexus ? '/CRM.webm' : ''));
            const imgSrc = (prod as any).image || (prod as any).previewUrl || PROJECT_IMAGES[prod.id] || PROJECT_IMAGES[prod.slug] || (isUniverse ? '/universe-banner.jpg' : (isNexus ? '/CRM.jpeg' : '/services/crm-automation.jpg'));
            const hasVideo = Boolean(videoSrc);
            const currentMode = getMediaMode(prod);
            const canToggle = hasVideo && Boolean(imgSrc) && prod.mediaType !== 'image' && prod.mediaType !== 'video';

            // Alignment styles
            const imageAlignClass = prod.imageAlignment === 'top'
              ? 'object-top'
              : prod.imageAlignment === 'bottom'
              ? 'object-bottom'
              : 'object-center';

            const videoAlignClass = prod.videoAlignment === 'contain' ? 'object-contain' : 'object-cover';

            return (
              <div
                key={prod.id}
                onClick={() => onOpenCaseStudy(prod)}
                className={`group relative rounded-3xl overflow-hidden flex flex-col justify-between border border-black/10 dark:border-white/10 hover:border-electric-purple/60 dark:hover:border-electric-purple/60 transition-all duration-500 cursor-pointer shadow-none hover:shadow-none ${isUniverse
                  ? 'lg:col-span-8 min-h-[460px] sm:min-h-[500px] lg:min-h-[520px]'
                  : 'lg:col-span-4 min-h-[460px] sm:min-h-[500px] lg:min-h-[520px]'
                  }`}
              >
                {/* 1. Full-Bleed Background Media covering the ENTIRE div (100% Crisp, Zero Overlay Wash) */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black flex items-center justify-center">
                  {hasVideo && currentMode === 'video' ? (
                    videoSrc.endsWith('.webp') || videoSrc.endsWith('.jpg') || videoSrc.endsWith('.png') ? (
                      <img
                        src={videoSrc}
                        alt={`${prod.name} Platform Demo`}
                        className={`w-full h-full ${videoAlignClass} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <video
                        key={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={imgSrc}
                        className={`w-full h-full ${videoAlignClass} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                      >
                        <source src={videoSrc} type={videoSrc.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                        {videoSrc.endsWith('.webm') && <source src="/CRM.mp4" type="video/mp4" />}
                      </video>
                    )
                  ) : (
                    <img
                      src={getOptimizedImageUrl(imgSrc, 900)}
                      alt={prod.name}
                      className={`w-full h-full ${imageAlignClass} transition-transform duration-700 ease-out group-hover:scale-105`}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>

                {/* 2. Minimal Crisp Bottom Fade ONLY behind text */}
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

                {/* 3. Card Top Row: Interactive Media Toggle (Video / Photo) */}
                <div className="relative z-20 p-5 sm:p-6 flex items-center justify-end">
                  {canToggle && (
                    <div className="flex items-center bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/20">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProjectMedia(prod.id, 'video');
                        }}
                        className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${currentMode === 'video'
                          ? 'bg-electric-purple text-white shadow-sm'
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
                          setProjectMedia(prod.id, 'photo');
                        }}
                        className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${currentMode === 'photo'
                          ? 'bg-electric-purple text-white shadow-sm'
                          : 'text-white/75 hover:text-white'
                          }`}
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Photo</span>
                      </button>
                    </div>
                  )}
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
        <div className="mt-6 sm:mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
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
            onClick={onViewAllServices}
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
