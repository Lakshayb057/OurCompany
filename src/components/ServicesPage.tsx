import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Cloud, Bot, Zap, ShieldCheck, ShoppingBag, RefreshCw, Rocket, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Service } from '../types';

interface ServicesPageProps {
  services: Service[];
  onBackToHome: (sectionId?: string) => void;
  onInquire: (domain?: string) => void;
  onExploreProjects?: () => void;
}

const DEFAULT_SERVICE_IMAGES: Record<string, string> = {
  'srv-01': '/services/cloud-systems.jpg',
  'srv-02': '/services/ai-agents.jpg',
  'srv-03': '/services/crm-automation.jpg',
  'srv-04': '/services/institutional-erp.jpg',
  'srv-05': '/services/agri-commerce.jpg',
  'srv-06': '/services/campus-marketplaces.jpg',
  'cloud-systems': '/services/cloud-systems.jpg',
  'ai-agents': '/services/ai-agents.jpg',
  'crm-automation': '/services/crm-automation.jpg',
  'institutional-erp': '/services/institutional-erp.jpg',
  'agri-commerce': '/services/agri-commerce.jpg',
  'campus-marketplaces': '/services/campus-marketplaces.jpg',
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  onBackToHome,
  onInquire,
  onExploreProjects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Distributed Cloud',
    'AI & Automation',
    'Enterprise ERP & CRM',
    'Agritech & Marketplaces'
  ];

  const getServiceIcon = (iconName: string) => {
    const iconClass = "w-4 h-4 sm:w-5 sm:h-5 text-electric-purple dark:text-lavender-glow";
    switch (iconName) {
      case 'Cloud': return <Cloud className={iconClass} />;
      case 'Bot': return <Bot className={iconClass} />;
      case 'Zap': return <Zap className={iconClass} />;
      case 'ShieldCheck': return <ShieldCheck className={iconClass} />;
      case 'ShoppingBag': return <ShoppingBag className={iconClass} />;
      case 'RefreshCw': return <RefreshCw className={iconClass} />;
      default: return <Rocket className={iconClass} />;
    }
  };

  // Filter services based on category and search query
  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      // Category filter matching
      let matchesCat = true;
      if (selectedCategory === 'Distributed Cloud') {
        matchesCat = srv.domain.toLowerCase().includes('cloud') || srv.title.toLowerCase().includes('cloud');
      } else if (selectedCategory === 'AI & Automation') {
        matchesCat = srv.domain.toLowerCase().includes('ai') || srv.title.toLowerCase().includes('ai') || srv.title.toLowerCase().includes('agent');
      } else if (selectedCategory === 'Enterprise ERP & CRM') {
        matchesCat = srv.domain.toLowerCase().includes('erp') || srv.domain.toLowerCase().includes('crm') || srv.title.toLowerCase().includes('erp') || srv.title.toLowerCase().includes('crm');
      } else if (selectedCategory === 'Agritech & Marketplaces') {
        matchesCat = srv.domain.toLowerCase().includes('agri') || srv.domain.toLowerCase().includes('marketplace') || srv.title.toLowerCase().includes('agri') || srv.title.toLowerCase().includes('marketplace');
      }

      // Search query matching
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch = (
          srv.title.toLowerCase().includes(q) ||
          srv.domain.toLowerCase().includes(q) ||
          srv.summary.toLowerCase().includes(q) ||
          srv.technologies.some(t => t.toLowerCase().includes(q)) ||
          srv.benefits.some(b => b.toLowerCase().includes(q))
        );
      }

      return matchesCat && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-midnight-card/80 border border-purple-200/70 dark:border-midnight-border text-xs sm:text-sm font-semibold text-light-text dark:text-white hover:text-electric-purple dark:hover:text-lavender-glow shadow-sm hover:shadow transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-electric-purple group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-light-subtext dark:text-muted-gray">
            <button onClick={() => onBackToHome()} className="hover:text-electric-purple transition-colors cursor-pointer">Home</button>
            <span>/</span>
            <span className="text-electric-purple dark:text-lavender-glow font-bold">Services</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-purple/10 dark:bg-electric-purple/20 border border-electric-purple/25 text-electric-purple dark:text-lavender-glow text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineering Capabilities & Domains</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-light-text dark:text-white leading-[1.12]">
            Engineering & Technical <span className="text-gradient-purple">Services</span>
          </h1>

          <p className="text-base sm:text-lg text-light-subtext dark:text-muted-gray leading-relaxed max-w-2xl font-medium">
            Production-grade software systems, scalable cloud microservices, intelligent AI automation, and proprietary enterprise applications engineered for high performance and airtight security.
          </p>
        </div>

        {/* Category Filters & Search Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-light-border dark:border-midnight-border/70">
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
              placeholder="Search services, tech, stack..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/90 dark:bg-midnight-card/90 border border-purple-100 dark:border-midnight-border text-xs sm:text-sm text-light-text dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-electric-purple/40"
            />
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 space-y-3 bg-white/60 dark:bg-midnight-card/60 rounded-3xl border border-dashed border-purple-200 dark:border-midnight-border">
            <p className="text-base font-semibold text-light-text dark:text-white">No services found matching your filter criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs font-mono text-electric-purple dark:text-lavender-glow hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => {
              const imageSrc = DEFAULT_SERVICE_IMAGES[service.id] || DEFAULT_SERVICE_IMAGES[service.slug] || service.image || '/services/cloud-systems.jpg';

              return (
                <div
                  key={service.id}
                  className="rounded-3xl overflow-hidden bg-white/90 dark:bg-midnight-card/90 border border-purple-100/90 dark:border-electric-purple/20 hover:border-electric-purple/50 dark:hover:border-electric-purple/60 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-950/30 flex flex-col justify-between group"
                >
                  {/* Service Visual Header */}
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                      <img
                        src={imageSrc}
                        alt={service.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                      {/* Domain Badge with Icon */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md">
                        <div className="w-5 h-5 rounded-md bg-electric-purple flex items-center justify-center flex-shrink-0 text-white">
                          {getServiceIcon(service.icon)}
                        </div>
                        <span className="truncate max-w-[190px]">{service.domain}</span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-light-text dark:text-white tracking-tight group-hover:text-electric-purple dark:group-hover:text-lavender-light transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-sm text-light-subtext dark:text-muted-gray leading-relaxed font-normal">
                        {service.summary}
                      </p>

                      {/* Technologies Pills */}
                      <div className="space-y-1.5 pt-2 border-t border-purple-50 dark:border-white/5">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-light-subtext dark:text-gray-400 font-semibold">
                          Core Technology Stack
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {service.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-purple-50 dark:bg-white/5 text-slate-700 dark:text-gray-300 border border-purple-100 dark:border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Enterprise Benefits */}
                      <div className="space-y-1.5 pt-2">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-light-subtext dark:text-gray-400 font-semibold">
                          Delivery Guarantees
                        </div>
                        <ul className="space-y-1">
                          {service.benefits.map((benefit, bIdx) => (
                            <li key={bIdx} className="flex items-center gap-2 text-xs text-light-subtext dark:text-gray-300">
                              <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                              <span className="truncate">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => onInquire(service.title)}
                      className="w-full py-2.5 px-4 rounded-xl bg-lavender-soft hover:bg-electric-purple text-electric-dark hover:text-white dark:bg-white/5 dark:border dark:border-white/10 dark:hover:bg-electric-purple dark:text-white text-xs font-semibold flex items-center justify-between group/btn transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900/40 via-midnight-card to-deep-violet/30 border border-electric-purple/40 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Need a Custom Enterprise Architecture?
            </h3>
            <p className="text-sm sm:text-base text-gray-300">
              Schedule a technical discovery session with our senior engineering leadership. Zero obligation, strict NDA, and 100% milestone transparency.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onInquire('Custom Architecture Consultation')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-electric-purple to-deep-violet text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Start Technical Discovery
            </button>
            {onExploreProjects && (
              <button
                onClick={onExploreProjects}
                className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all cursor-pointer"
              >
                Explore Projects
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

