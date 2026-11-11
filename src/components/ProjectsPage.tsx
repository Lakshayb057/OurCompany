import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Github, ExternalLink, BookOpen, Layers, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProjectsPageProps {
  products: Product[];
  onOpenCaseStudy: (product: Product) => void;
  onBackToHome: (sectionId?: string) => void;
  onInquire: (domain?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  products,
  onOpenCaseStudy,
  onBackToHome,
  onInquire,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'AI & Intelligent Agents',
    'Distributed Cloud & Systems',
    'ERP & Agri-Commerce',
    'P2P & Community'
  ];

  // Filter projects based on category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category filter matching
      let matchesCat = true;
      if (selectedCategory === 'AI & Intelligent Agents') {
        matchesCat = prod.name.includes('ChatLeads') || prod.technologies.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('groq'));
      } else if (selectedCategory === 'Distributed Cloud & Systems') {
        matchesCat = prod.name.includes('UniVerse') || prod.name.includes('Nexus') || prod.technologies.some(t => t.toLowerCase().includes('aws') || t.toLowerCase().includes('redis'));
      } else if (selectedCategory === 'ERP & Agri-Commerce') {
        matchesCat = prod.name.includes('SachiKheti') || prod.name.includes('Nexus') || prod.subtitle.toLowerCase().includes('erp');
      } else if (selectedCategory === 'P2P & Community') {
        matchesCat = prod.name.includes('CampXChange') || prod.name.includes('SkillPort') || prod.subtitle.toLowerCase().includes('campus');
      }

      // Search query matching
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
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 bg-light-100/60 dark:bg-midnight-900/60 relative overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric-purple/5 dark:bg-electric-purple/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-lavender-glow/5 dark:bg-deep-violet/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb & Back to Home */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={() => onBackToHome()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-midnight-card/80 border border-purple-200/70 dark:border-midnight-border text-xs sm:text-sm font-semibold text-light-text dark:text-white hover:text-electric-purple dark:hover:text-lavender-glow shadow-sm hover:shadow transition-all group"
          >
            <ArrowLeft className="w-4 h-4 text-electric-purple group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-light-subtext dark:text-muted-gray">
            <button onClick={() => onBackToHome()} className="hover:text-electric-purple transition-colors">Home</button>
            <span>/</span>
            <span className="text-electric-purple dark:text-lavender-glow font-bold">Projects</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-purple/10 dark:bg-electric-purple/20 border border-electric-purple/25 text-electric-purple dark:text-lavender-glow text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Systems & Startup Archive</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-light-text dark:text-white leading-[1.12]">
            Engineering <span className="text-gradient-purple">Projects</span>
          </h1>

          <p className="text-base sm:text-lg text-light-subtext dark:text-muted-gray leading-relaxed max-w-2xl font-medium">
            A comprehensive showcase of production platforms, distributed microservices, and 0-to-1 startups engineered and shipped with verified impact, high concurrency, and measurable business ROI.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-light-border dark:border-midnight-border/60">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-electric-purple text-white shadow-md shadow-purple-500/25 scale-[1.02]'
                      : 'bg-white/80 dark:bg-midnight-card/80 text-light-subtext dark:text-muted-gray border border-purple-100 dark:border-midnight-border hover:border-purple-300 dark:hover:border-midnight-border/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or keyword..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/90 dark:bg-midnight-card/90 border border-purple-100 dark:border-midnight-border text-xs sm:text-sm text-light-text dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-electric-purple/40"
            />
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 space-y-3 bg-white/60 dark:bg-midnight-card/60 rounded-3xl border border-dashed border-purple-200 dark:border-midnight-border">
            <Layers className="w-10 h-10 text-electric-purple/60 mx-auto" />
            <h3 className="text-lg font-bold text-light-text dark:text-white">No projects found</h3>
            <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray max-w-sm mx-auto">
              No matching projects for &ldquo;{searchQuery}&rdquo;. Try another category or clear your search query.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-electric-purple text-white text-xs font-semibold mt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="glass-card-interactive rounded-2xl flex flex-col justify-between overflow-hidden group border border-purple-100 dark:border-midnight-border/80 shadow-none hover:shadow-none transition-all duration-300 bg-white/80 dark:bg-midnight-card/80"
              >
                <div className="p-7 space-y-5">
                  {/* Badge & Status Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-50 dark:bg-midnight-surface text-electric-purple dark:text-lavender-glow border border-purple-200/60 dark:border-midnight-border">
                      {prod.badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {prod.status}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl font-bold text-light-text dark:text-white group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors">
                      {prod.name}
                    </h3>
                    <div className="text-xs font-mono text-electric-purple/80 dark:text-lavender-muted mt-1 font-semibold">
                      {prod.subtitle}
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray leading-relaxed">
                    {prod.tagline}
                  </p>

                  {/* Impact Metrics Row */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {prod.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-light-surface dark:bg-midnight-surface border border-purple-100 dark:border-midnight-border/60">
                        <div className="text-base font-bold font-mono text-light-text dark:text-white">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-light-subtext dark:text-muted-gray truncate font-medium">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Highlights Checklist */}
                  <div className="space-y-1.5 pt-1">
                    {prod.highlights.slice(0, 2).map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-light-subtext dark:text-muted-gray">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {prod.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-light-100 dark:bg-midnight-surface text-light-subtext dark:text-gray-300 border border-light-border dark:border-midnight-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {prod.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-lavender-soft dark:bg-midnight-surface text-electric-purple dark:text-lavender-muted font-semibold border border-purple-200 dark:border-midnight-border">
                        +{prod.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-5 bg-light-surface/60 dark:bg-midnight-surface/50 border-t border-purple-100 dark:border-midnight-border/70 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenCaseStudy(prod)}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-midnight-card hover:bg-lavender-soft text-xs font-semibold text-electric-purple dark:text-lavender-light border border-purple-200 dark:border-electric-purple/30 flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Deep Dive</span>
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
                        className="p-2 rounded-lg bg-white dark:bg-midnight-card border border-light-border dark:border-midnight-border text-light-subtext dark:text-gray-400 hover:text-electric-purple dark:hover:text-white transition-colors shadow-sm"
                        title="Open Live Platform"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Call-To-Action Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900/40 via-midnight-card to-deep-violet/30 border border-electric-purple/40 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Have a similar system or startup in mind?
            </h3>
            <p className="text-sm text-slate-300">
              Partner with CodeVerse engineering to architect, prototype, and ship your production platform with milestone rigor.
            </p>
          </div>
          <button
            onClick={() => onInquire()}
            className="px-6 py-3.5 rounded-xl bg-electric-purple hover:bg-electric-light text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 whitespace-nowrap transition-all"
          >
            <span>Start an Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

