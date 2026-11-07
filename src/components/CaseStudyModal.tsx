import React from 'react';
import { X, Github, Laptop, BarChart3, Zap, Check, Database } from 'lucide-react';
import { Product } from '../types';

interface CaseStudyModalProps {
  product: Product | null;
  onClose: () => void;
  onInquireSimilar: (projectName: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ product, onClose, onInquireSimilar }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 dark:bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-midnight-900 border border-purple-200 dark:border-midnight-border rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="px-6 py-5 border-b border-light-border dark:border-midnight-border flex items-center justify-between bg-light-surface/90 dark:bg-midnight-card/80 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-lavender-soft text-electric-dark dark:bg-electric-purple/20 dark:text-lavender-glow border border-purple-200 dark:border-electric-purple/40">
              {product.badge}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold ${
              product.status === 'Live' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30' : 'bg-amber-50 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30'
            }`}>
              {product.status} Status
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-light-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Title & Tagline */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-light-text dark:text-white mb-2">
              {product.name}
            </h2>
            <div className="text-base sm:text-lg text-electric-purple dark:text-lavender-glow font-semibold mb-3">
              {product.subtitle}
            </div>
            <p className="text-sm sm:text-base text-light-subtext dark:text-muted-gray leading-relaxed">
              {product.tagline}
            </p>
            <div className="mt-3 text-xs font-mono text-light-subtext dark:text-gray-400 bg-light-surface dark:bg-midnight-card p-3 rounded-lg border border-purple-100 dark:border-midnight-border flex items-center gap-2">
              <Laptop className="w-4 h-4 text-electric-purple flex-shrink-0" />
              <span>{product.lead}</span>
            </div>
          </div>

          {/* Key Impact Metrics Grid */}
          <div>
            <h3 className="text-xs uppercase font-mono tracking-wider text-light-subtext dark:text-muted-gray mb-3 flex items-center gap-1.5 font-bold">
              <BarChart3 className="w-4 h-4 text-electric-purple" />
              <span>Verified Impact & Production Metrics</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {product.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-light-surface dark:bg-midnight-card border border-purple-100 dark:border-midnight-border/70 text-center shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-light-text dark:text-white mb-1">
                    {m.value}
                  </div>
                  <div className="text-[11px] text-light-subtext dark:text-muted-gray font-medium">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-light-subtext dark:text-muted-gray flex items-center gap-1.5 font-bold">
              <Zap className="w-4 h-4 text-electric-purple" />
              <span>Deep-Dive Engineering Highlights</span>
            </h3>
            <div className="space-y-2.5">
              {product.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-light-surface/60 dark:bg-midnight-card/50 border border-purple-100 dark:border-midnight-border/60">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-light-text dark:text-gray-300 leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Production Technology Stack */}
          <div>
            <h3 className="text-xs uppercase font-mono tracking-wider text-light-subtext dark:text-muted-gray mb-3 flex items-center gap-1.5 font-bold">
              <Database className="w-4 h-4 text-electric-purple" />
              <span>Production Stack & Infrastructure Topology</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-light-surface dark:bg-midnight-card border border-purple-200 dark:border-electric-purple/20 text-light-text dark:text-gray-300 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links & Action Bar */}
          <div className="pt-6 border-t border-light-border dark:border-midnight-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {product.liveUrl && (
                <a
                  href={product.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-electric-purple to-deep-violet text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-purple-600/20 hover:shadow-lg hover:shadow-electric-purple/30 transition-all"
                >
                  <span>Launch Live Platform</span>
                  <span className="text-xs select-none">↗</span>
                </a>
              )}

              {product.githubUrl && (
                <a
                  href={product.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-light-border dark:border-midnight-border hover:border-electric-purple text-light-text dark:text-white text-xs font-medium flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onInquireSimilar(product.name);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-lavender-soft/60 dark:bg-midnight-surface border border-purple-200 dark:border-electric-purple/40 hover:border-electric-purple text-electric-dark dark:text-lavender-light text-xs font-semibold transition-colors text-center shadow-sm"
            >
              Inquire Similar Architecture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
