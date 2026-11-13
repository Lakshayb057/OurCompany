import React, { useState, useMemo } from 'react';
import { Search, BookOpen, ExternalLink, Github, Check, ArrowRight, Video, Layers } from 'lucide-react';
import { Product, Service } from '../types';
import { PlatformAdoptionModal } from './PlatformAdoptionModal';

interface ServicesPageProps {
  products?: Product[];
  services?: Service[];
  onOpenCaseStudy?: (product: Product) => void;
  onBackToHome: (sectionId?: string) => void;
  onInquire: (domain?: string) => void;
  onExploreProjects?: () => void;
}

const IN_HOUSE_METADATA: Record<string, {
  tieUpPitch: string;
  serviceDomain: string;
  serviceBadge: string;
}> = {
  'universe': {
    serviceDomain: 'Campus Dining & Food OS',
    serviceBadge: 'IN-HOUSE PLATFORM • TURNKEY DEPLOYMENT',
    tieUpPitch: 'Ready-to-deploy campus dining OS with QR order automation, live kitchen POS sync, and automated split settlements for university campuses and food courts.'
  },
  'chatleads-ai': {
    serviceDomain: 'AI, Fleet WhatsApp & Multimodal OCR',
    serviceBadge: 'IN-HOUSE PLATFORM • AI AGENT ENGINE',
    tieUpPitch: 'Deployable multi-session WhatsApp fleet engine with Gemini 2.5 Flash OCR and Llama-4 automated lead extraction for organizations handling high lead volumes.'
  },
  'nexus-crm': {
    serviceDomain: 'Enterprise CRM & Real-Time Event Bus',
    serviceBadge: 'IN-HOUSE PLATFORM • HIGH-CONCURRENCY CRM',
    tieUpPitch: 'Battle-tested multi-tenant CRM with Redis event bus, 100k+ record chunked batch imports, and automated appointment pipelines for sales organizations.'
  },
  'campxchange': {
    serviceDomain: 'P2P Circular Marketplace & Sharing OS',
    serviceBadge: 'IN-HOUSE PLATFORM • CIRCULAR COMMERCE',
    tieUpPitch: 'Complete peer-to-peer campus marketplace and sharing platform with institutional domain verification, student ID authentication, and rental logistics.'
  }
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  products = [],
  onOpenCaseStudy,
  onBackToHome,
  onInquire,
  onExploreProjects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [adoptionModalProduct, setAdoptionModalProduct] = useState<Product | null>(null);
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);

  const handleAdoptPlatform = (prod: Product) => {
    setAdoptionModalProduct(prod);
    setIsAdoptionModalOpen(true);
  };

  const categories = [
    'All',
    'Campus & Food OS',
    'AI & Automation',
    'Enterprise CRM',
    'Circular Commerce'
  ];

  // In-House Platforms offered "as a service" with minimal updates / tie-ups:
  // UniVerse, ChatLeads AI, Nexus CRM, CampXChange
  const inHousePlatforms = useMemo(() => {
    const inHouseSlugs = ['universe', 'chatleads-ai', 'nexus-crm', 'campxchange'];

    return products.filter((prod) => {
      if (prod.isVisible === false) return false;
      const isInHouse = inHouseSlugs.includes(prod.slug || '') ||
        prod.name.toLowerCase().includes('universe') ||
        prod.name.toLowerCase().includes('chatleads') ||
        prod.name.toLowerCase().includes('nexus') ||
        prod.name.toLowerCase().includes('campxchange');
      if (!isInHouse) return false;

      // Category matching
      let matchesCat = true;
      if (selectedCategory === 'Campus & Food OS') {
        matchesCat = prod.name.includes('UniVerse') || (prod.slug || '').includes('universe');
      } else if (selectedCategory === 'AI & Automation') {
        matchesCat = prod.name.includes('ChatLeads') || (prod.slug || '').includes('chatleads');
      } else if (selectedCategory === 'Enterprise CRM') {
        matchesCat = prod.name.includes('Nexus') || (prod.slug || '').includes('nexus');
      } else if (selectedCategory === 'Circular Commerce') {
        matchesCat = prod.name.includes('CampXChange') || (prod.slug || '').includes('campxchange');
      }

      // Search matching
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch = (
          prod.name.toLowerCase().includes(q) ||
          prod.subtitle.toLowerCase().includes(q) ||
          prod.tagline.toLowerCase().includes(q) ||
          prod.technologies.some(t => t.toLowerCase().includes(q))
        );
      }

      return matchesCat && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-20 sm:pt-32 pb-10 sm:pb-24 bg-light-100/60 dark:bg-midnight-900/60 relative overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric-purple/5 dark:bg-electric-purple/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-lavender-glow/5 dark:bg-deep-violet/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-3 sm:space-y-4 mb-6 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-light-text dark:text-white leading-[1.12]">
            In-House Platforms as a <span className="text-gradient-purple">Service</span>
          </h1>

          <p className="text-base sm:text-lg text-light-subtext dark:text-muted-gray leading-relaxed max-w-2xl font-medium">
            Production-grade, battle-tested proprietary software platforms engineered in-house by Codrix. We partner with companies, colleges, and organizations to deliver these systems with turnkey custom branding and minimal updates as a full service.
          </p>
        </div>

        {/* Category Filters & Search Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 pb-4 sm:mb-10 sm:pb-6 border-b border-light-border dark:border-midnight-border/70">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-electric-purple text-white shadow-md shadow-electric-purple/30 scale-[1.02]'
                      : 'bg-white/80 dark:bg-midnight-card/80 text-light-subtext dark:text-muted-gray border border-purple-100 dark:border-midnight-border hover:border-purple-300 dark:hover:border-midnight-border/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="relative min-w-[260px] md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-light-subtext dark:text-muted-gray" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in-house platforms..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/90 dark:bg-midnight-card/90 border border-purple-100 dark:border-midnight-border text-xs sm:text-sm text-light-text dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-electric-purple/40"
            />
          </div>
        </div>

        {/* In-House Platforms Grid */}
        {inHousePlatforms.length === 0 ? (
          <div className="text-center py-20 space-y-3 bg-white/60 dark:bg-midnight-card/60 rounded-3xl border border-dashed border-purple-200 dark:border-midnight-border">
            <Layers className="w-10 h-10 text-electric-purple/60 mx-auto" />
            <h3 className="text-lg font-bold text-light-text dark:text-white">No platforms found</h3>
            <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray max-w-sm mx-auto">
              No matching in-house services for &ldquo;{searchQuery}&rdquo;. Try another filter or reset.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-electric-purple text-white text-xs font-semibold mt-2 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {inHousePlatforms.map((prod) => {
              const slugKey = prod.slug || '';
              const meta = IN_HOUSE_METADATA[slugKey] || {
                serviceDomain: prod.category || 'In-House Platform Service',
                serviceBadge: 'IN-HOUSE PLATFORM • SERVICE LICENSING',
                tieUpPitch: 'Production-ready platform available for corporate tie-ups and turnkey customization.'
              };

              const isUniverse = prod.slug === 'universe' || prod.id === 'prod-01' || prod.name.toLowerCase().includes('universe');
              const isNexus = prod.slug === 'nexus-crm' || prod.id === 'prod-04' || prod.name.toLowerCase().includes('nexus');
              const videoSrc = prod.videoUrl || (prod as any).video || (isUniverse ? '/universe_video.webp' : (isNexus ? '/CRM.webm' : ''));
              const imgSrc = (prod as any).image || (prod as any).previewUrl || (isUniverse ? '/universe-banner.jpg' : (isNexus ? '/CRM.jpeg' : '/services/crm-automation.jpg'));
              const hasVideo = Boolean(videoSrc);

              const imageAlignClass = prod.imageAlignment === 'top'
                ? 'object-top'
                : prod.imageAlignment === 'bottom'
                ? 'object-bottom'
                : 'object-center';

              const videoAlignClass = prod.videoAlignment === 'contain' ? 'object-contain' : 'object-cover';

              return (
                <div
                  key={prod.id}
                  className="rounded-3xl overflow-hidden bg-white/90 dark:bg-midnight-card/90 border border-purple-100/90 dark:border-electric-purple/20 hover:border-electric-purple/50 dark:hover:border-electric-purple/60 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between group"
                >
                  {/* Top Media Showcase Banner */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950 border-b border-purple-100 dark:border-midnight-border/60">
                    {hasVideo && prod.mediaType !== 'image' ? (
                      videoSrc.endsWith('.webp') ? (
                        <img src={videoSrc} alt={prod.name} className={`w-full h-full ${videoAlignClass}`} />
                      ) : (
                        <video key={videoSrc} muted autoPlay loop playsInline className={`w-full h-full ${videoAlignClass}`}>
                          <source src={videoSrc} type={videoSrc.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                          {videoSrc.endsWith('.webm') && <source src="/CRM.mp4" type="video/mp4" />}
                        </video>
                      )
                    ) : (
                      <img
                        src={imgSrc}
                        alt={prod.name}
                        className={`w-full h-full object-cover ${imageAlignClass} group-hover:scale-105 transition-transform duration-700`}
                      />
                    )}

                    {/* Gradient Overlay for Crisp Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-lavender-glow border border-white/20 shadow-md">
                        {meta.serviceBadge}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Tie-Up Ready
                      </span>
                    </div>

                    {/* Bottom Domain Ribbon */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                      <span className="font-semibold text-lavender-glow">{meta.serviceDomain}</span>
                      {hasVideo && (
                        <span className="flex items-center gap-1 text-[10px] bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                          <Video className="w-3 h-3 text-electric-purple" />
                          Live Demo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-7 space-y-5">
                    {/* Title & Subtitle */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-light-text dark:text-white group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors">
                        {prod.name}
                      </h2>
                      <div className="text-xs font-mono text-electric-purple dark:text-lavender-glow mt-1 font-semibold">
                        {prod.subtitle}
                      </div>
                    </div>

                    {/* Turnkey Tie-Up Value Proposition Box */}
                    <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-white/[0.04] border border-purple-200/70 dark:border-white/10 text-xs text-light-text dark:text-gray-200 leading-relaxed">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-electric-purple dark:text-lavender-glow font-bold mb-1">
                        Turnkey Partnership & Service Model
                      </div>
                      <p className="font-medium text-[11px] sm:text-xs">
                        {meta.tieUpPitch}
                      </p>
                    </div>

                    {/* Production Impact Metrics Row */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {prod.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-light-surface dark:bg-midnight-surface border border-purple-100 dark:border-midnight-border/60">
                          <div className="text-base sm:text-lg font-bold font-mono text-light-text dark:text-white">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-light-subtext dark:text-muted-gray truncate font-medium">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Capabilities / Delivery Guarantees */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-light-subtext dark:text-gray-400 font-bold">
                        Platform Capabilities & Delivery SLA
                      </div>
                      <div className="space-y-1">
                        {prod.highlights.slice(0, 2).map((item, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-light-subtext dark:text-muted-gray">
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-2 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technology Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {prod.technologies.slice(0, 5).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-purple-50 dark:bg-midnight-surface text-light-subtext dark:text-gray-300 border border-purple-100 dark:border-midnight-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-6 pt-0 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAdoptPlatform(prod)}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-electric-purple to-deep-violet hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/25 transition-all cursor-pointer"
                      >
                        <span>Adopt This Platform</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {onOpenCaseStudy && (
                        <button
                          onClick={() => onOpenCaseStudy(prod)}
                          className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-midnight-surface border border-purple-200 dark:border-midnight-border text-light-text dark:text-white hover:border-electric-purple text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-electric-purple" />
                          <span>Deep Dive Spec</span>
                        </button>
                      )}
                    </div>

                    {/* Repository & Live Demo URLs */}
                    {(prod.liveUrl || prod.githubUrl) && (
                      <div className="flex items-center justify-end gap-3 pt-1 text-xs text-light-subtext dark:text-muted-gray">
                        {prod.githubUrl && (
                          <a
                            href={prod.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-electric-purple dark:hover:text-white flex items-center gap-1"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Repository</span>
                          </a>
                        )}
                        {prod.liveUrl && (
                          <a
                            href={prod.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-electric-purple dark:hover:text-white flex items-center gap-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Instance ↗</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Call-To-Action Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900/40 via-midnight-card to-deep-violet/30 border border-electric-purple/40 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Need custom modifications or institutional tie-up?
            </h3>
            <p className="text-sm text-slate-300">
              Codrix offers full turnkey licensing, proprietary source IP transfer, or bespoke feature updates to fit your exact operational requirements.
            </p>
          </div>
          <button
            onClick={() => handleAdoptPlatform(inHousePlatforms[0] || ({} as Product))}
            className="px-6 py-3.5 rounded-xl bg-electric-purple hover:bg-electric-light text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 whitespace-nowrap transition-all cursor-pointer"
          >
            <span>Partner / Tie-Up Inquiries</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Enterprise Platform Adoption Application Modal */}
      <PlatformAdoptionModal
        isOpen={isAdoptionModalOpen}
        onClose={() => setIsAdoptionModalOpen(false)}
        product={adoptionModalProduct}
        allProducts={inHousePlatforms}
      />
    </div>
  );
};
