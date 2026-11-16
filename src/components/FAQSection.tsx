import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, Code, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQItem[] = [
  {
    category: 'Capabilities',
    question: 'What services does CodRix provide?',
    answer: 'CodRix designs and engineers custom software, responsive websites, scalable web applications, real-time microservices, AI & automation workflows, and enterprise cloud solutions.'
  },
  {
    category: 'Engagement & Pricing',
    question: 'Does CodRix offer custom development packages?',
    answer: 'Yes. CodRix provides transparent packages starting from Single-Page Portfolios up to Enterprise Full-Stack Applications, complete with domain configurations, responsive UX, and rapid turnaround.'
  },
  {
    category: 'Intellectual Property',
    question: 'Who owns the source code and intellectual property (IP)?',
    answer: 'Clients retain 100% full source code intellectual property transfer upon project delivery, backed by a strict non-disclosure agreement (NDA).'
  },
  {
    category: 'Delivery Timeline',
    question: 'How fast does CodRix deliver projects?',
    answer: 'Turnaround times range from 3 to 5 business days for single-page applications up to multi-week sprint milestones for complex enterprise software suites.'
  },
  {
    category: 'Technology Stack',
    question: 'What technologies and frameworks does CodRix build with?',
    answer: 'We specialize in modern production stacks including React, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Redis, Docker, AWS, Tailwind CSS, and multimodal AI pipelines (Gemini 2.5 Flash, Groq).'
  },
  {
    category: 'Post-Launch',
    question: 'Do you offer ongoing maintenance, scaling, and technical support?',
    answer: 'Yes. Every project includes post-launch deployment verification, monitoring telemetry, and flexible maintenance agreements to scale with your growing user base.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-12 sm:py-20 lg:py-24 relative overflow-hidden bg-white/50 dark:bg-midnight-950/40 border-t border-light-border dark:border-midnight-border/60">
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-500/10 dark:bg-electric-purple/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-lavender-glow/10 dark:bg-deep-violet/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/10 text-electric-purple dark:text-lavender-glow border border-purple-500/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
            Everything You Need <span className="text-gradient-purple">to Know</span>
          </h2>

          <p className="text-sm sm:text-base text-light-subtext dark:text-muted-gray leading-relaxed max-w-2xl mx-auto">
            Clear, transparent answers about our engineering process, intellectual property guarantees, fixed turnaround times, and custom packages.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.question}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-white dark:bg-midnight-800 border-electric-purple/40 shadow-lg shadow-purple-600/5'
                    : 'bg-white/70 dark:bg-midnight-900/60 border-light-border dark:border-midnight-border/70 hover:border-purple-300 dark:hover:border-midnight-border'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between text-left p-5 sm:p-6 gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-purple-500/10 text-electric-purple dark:text-lavender-glow flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 sm:mt-0">
                      0{idx + 1}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-light-text dark:text-white">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`p-1.5 rounded-full bg-light-100 dark:bg-midnight-900 shrink-0 text-light-subtext dark:text-muted-gray transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-electric-purple dark:text-lavender-glow bg-purple-50 dark:bg-purple-950/40' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-light-border/40 dark:border-midnight-border/40 mt-1">
                    <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray leading-relaxed pt-3">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Trust Badges Footer */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-500/5 via-electric-purple/10 to-lavender-glow/5 border border-purple-500/20 flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-light-subtext dark:text-muted-gray">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
            <Shield className="w-4 h-4" />
            <span>Strict NDA Protected</span>
          </div>
          <div className="flex items-center gap-2 text-electric-purple dark:text-lavender-glow font-semibold">
            <Code className="w-4 h-4" />
            <span>100% Full Source IP Transfer</span>
          </div>
          <div className="flex items-center gap-2 text-purple-600 dark:text-lavender-light font-semibold">
            <Clock className="w-4 h-4" />
            <span>Rapid Delivery Sprints</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Zero Hidden Fees</span>
          </div>
        </div>

      </div>
    </section>
  );
};
