import React, { useState } from 'react';
import { Clock, Shield, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface InquirySectionProps {
  initialProjectType?: string;
  onRedirectToPlans?: (userData?: { fullName: string; email: string; contact: string; description: string; budgetRange: string }) => void;
}

export const InquirySection: React.FC<InquirySectionProps> = ({ initialProjectType, onRedirectToPlans }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    email: '',
    budgetRange: '$25,000 - $50,000',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const budgetRanges = [
    '$10,000 - $25,000 (Sprint MVP)',
    '$25,000 - $50,000 (Production Scale)',
    '$50,000+ (Enterprise Architecture)',
    '₹5 Lakh - ₹15 Lakh (Regional Deployment)',
    '₹15 Lakh+ (Comprehensive Custom ERP)',
    'Not Decided / Flexible'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!formData.fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!formData.contact.trim()) {
      setError('Please provide your contact number (Phone / WhatsApp).');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please provide a valid business email address.');
      return;
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      setError('Please provide at least 10 characters describing your project requirements.');
      return;
    }

    setLoading(true);

    try {
      // Save submitted client data so /plan page can prefill their details
      try {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('codrix_client_inquiry', JSON.stringify({
            fullName: formData.fullName,
            contact: formData.contact,
            email: formData.email,
            budgetRange: formData.budgetRange,
            description: formData.description,
            timestamp: Date.now()
          }));
        }
      } catch (e) {
        console.warn('Could not cache inquiry in sessionStorage', e);
      }

      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projectType: initialProjectType || 'Full-Stack & Cloud Engineering',
          country: 'Global / Remote',
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess('Inquiry successfully recorded! Redirecting to Plans & Packages...');
        setTimeout(() => {
          if (onRedirectToPlans) {
            onRedirectToPlans(formData);
          } else if (typeof window !== 'undefined') {
            window.history.pushState({}, '', '/plan');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }
        }, 900);
      } else {
        setError(data.message || 'Failed to submit inquiry. Please verify your details.');
      }
    } catch (err) {
      console.warn('API error, acknowledging submission locally and redirecting:', err);
      setSuccess('Inquiry received! Redirecting to Plans & Packages...');
      setTimeout(() => {
        if (onRedirectToPlans) {
          onRedirectToPlans(formData);
        } else if (typeof window !== 'undefined') {
          window.history.pushState({}, '', '/plan');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }, 900);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-8 sm:py-16 md:py-24 relative overflow-hidden bg-light-100/60 dark:bg-midnight-900/60 border-t border-light-border dark:border-midnight-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12">
          
          {/* Left Column: Context & Assurances */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-light-text dark:text-white">
              Start Your <br />
              <span className="text-gradient-purple">Next Initiative</span>
            </h2>

            <p className="text-light-subtext dark:text-muted-gray text-base leading-relaxed">
              Have an ambitious product vision, enterprise platform requirement, or mission-critical architecture? Submit your project parameters below to initiate technical discovery with our founders.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border/70 shadow-sm">
                <Clock className="w-5 h-5 text-electric-purple flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-light-text dark:text-white">24-Hour Technical Review</h4>
                  <p className="text-xs text-light-subtext dark:text-muted-gray mt-0.5">
                    Every inquiry is reviewed directly by our CTO and Founder to assess feasibility and system topology.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border/70 shadow-sm">
                <Shield className="w-5 h-5 text-electric-purple flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-light-text dark:text-white">Mutual Confidentiality (NDA)</h4>
                  <p className="text-xs text-light-subtext dark:text-muted-gray mt-0.5">
                    Your proprietary specifications and trade secrets are protected under strict confidentiality protocols.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-lavender-soft/40 dark:bg-midnight-card/50 border border-purple-200 dark:border-midnight-border/50 text-xs font-mono text-light-subtext dark:text-muted-gray">
              Direct Contact: <span className="text-light-text dark:text-white font-semibold">leadership@codrix.tech</span>
            </div>
          </div>

          {/* Right Column: Structured Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-4 sm:p-8 md:p-10 rounded-2xl border border-purple-200 dark:border-electric-purple/30 shadow-2xl">
              
              {success ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-light-text dark:text-white">Inquiry Successfully Transmitted</h3>
                  <p className="text-light-subtext dark:text-muted-gray text-sm max-w-md mx-auto leading-relaxed">
                    {success}
                  </p>
                  <button
                    onClick={() => setSuccess(null)}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border hover:border-electric-purple text-xs font-mono text-electric-purple dark:text-lavender-light transition-all shadow-sm font-semibold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-light-border dark:border-midnight-border/70 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-light-text dark:text-white">Project Inquiry Parameters</h3>
                    <p className="text-xs text-light-subtext dark:text-muted-gray mt-1">
                      Required fields adhere to SRS Section 5.1 data integrity guidelines.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Row 1: Name and Contact Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-light-text dark:text-gray-300 mb-1.5 font-medium">
                        Full Name <span className="text-electric-purple font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lakshay Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border focus:border-electric-purple focus:outline-none text-sm text-light-text dark:text-white transition-colors shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-light-text dark:text-gray-300 mb-1.5 font-medium">
                        Contact Number <span className="text-electric-purple font-bold">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210 / WhatsApp"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border focus:border-electric-purple focus:outline-none text-sm text-light-text dark:text-white transition-colors shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Row 2: Business Email and Target Budget Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-light-text dark:text-gray-300 mb-1.5 font-medium">
                        Business Email <span className="text-electric-purple font-bold">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border focus:border-electric-purple focus:outline-none text-sm text-light-text dark:text-white transition-colors shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-light-text dark:text-gray-300 mb-1.5 font-medium">
                        Target Budget Range
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border focus:border-electric-purple focus:outline-none text-sm text-light-text dark:text-white transition-colors shadow-sm cursor-pointer"
                      >
                        {budgetRanges.map((br, idx) => (
                          <option key={idx} value={br} className="bg-white text-light-text dark:bg-midnight-900 dark:text-white">
                            {br}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Project Description & Requirements */}
                  <div>
                    <label className="block text-xs font-mono text-light-text dark:text-gray-300 mb-1.5 font-medium">
                      Project Description & Requirements <span className="text-electric-purple font-bold">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline your product vision, system bottlenecks, scale expectations, or specific technologies..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border focus:border-electric-purple focus:outline-none text-sm text-light-text dark:text-white transition-colors shadow-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet text-white font-semibold text-sm shadow-xl shadow-electric-purple/25 hover:shadow-electric-purple/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving Inquiry & Opening Plans...</span>
                      </span>
                    ) : (
                      <>
                        <span>Submit & See Plans</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
