import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Building2,
  Mail,
  Phone,
  User,
  Layers,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileText
} from 'lucide-react';
import { Product, PlatformAdoption } from '../types';

interface PlatformAdoptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  allProducts?: Product[];
  onSuccess?: (adoption: PlatformAdoption) => void;
}

const AVAILABLE_PLATFORMS = [
  { id: 'universe', name: 'UniVerse', subtitle: 'Campus Dining & Multi-Vendor OS' },
  { id: 'chatleads-ai', name: 'ChatLeads AI', subtitle: 'Fleet WhatsApp CRM & Multimodal OCR' },
  { id: 'nexus-crm', name: 'Nexus CRM', subtitle: 'High-Velocity Multi-Tenant CRM' },
  { id: 'campxchange', name: 'CampXChange', subtitle: 'P2P Micro-Economy & Classifieds' },
];

export const PlatformAdoptionModal: React.FC<PlatformAdoptionModalProps> = ({
  isOpen,
  onClose,
  product,
  allProducts = [],
  onSuccess,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<{ id: string; name: string }>(() => {
    if (product) {
      return { id: product.slug || product.id, name: product.name };
    }
    return AVAILABLE_PLATFORMS[0];
  });

  // Sync selected platform when modal opens or product changes
  useEffect(() => {
    if (product) {
      setSelectedPlatform({ id: product.slug || product.id, name: product.name });
    }
  }, [product]);

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyContact, setCompanyContact] = useState('');
  const [timeline, setTimeline] = useState('Immediate (< 2 Weeks)');
  const [estimatedScale, setEstimatedScale] = useState('50 - 500 Users / Daily Transactions');
  const [usecases, setUsecases] = useState('');
  const [requirements, setRequirements] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedAdoption, setSubmittedAdoption] = useState<PlatformAdoption | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please provide a valid work or corporate email.');
      return;
    }
    if (!contact.trim()) {
      setErrorMessage('Please provide your contact phone number.');
      return;
    }
    if (!companyName.trim()) {
      setErrorMessage('Please provide your company or institution name.');
      return;
    }
    if (!usecases.trim()) {
      setErrorMessage('Please outline your primary use cases or intended operational workflow.');
      return;
    }
    if (!requirements.trim()) {
      setErrorMessage('Please specify your custom technical specifications or integration requirements.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        platformId: selectedPlatform.id,
        platformName: selectedPlatform.name,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        contact: contact.trim(),
        companyName: companyName.trim(),
        companyContact: companyContact.trim() || contact.trim(),
        timeline,
        estimatedScale,
        usecases: usecases.trim(),
        requirements: requirements.trim(),
      };

      const res = await fetch('/api/v1/platform-adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSubmittedAdoption(json.data);
        if (onSuccess) onSuccess(json.data);
      } else {
        setErrorMessage(json.message || 'Failed to submit platform adoption request. Please try again.');
      }
    } catch (err: any) {
      console.error('Adoption submit error:', err);
      setErrorMessage('Network connection error. Please verify your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedAdoption(null);
    setFullName('');
    setEmail('');
    setContact('');
    setCompanyName('');
    setCompanyContact('');
    setUsecases('');
    setRequirements('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl my-8 bg-white dark:bg-midnight-card border border-purple-200/80 dark:border-midnight-border rounded-3xl shadow-2xl shadow-purple-900/20 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-5 sm:p-7 border-b border-light-border dark:border-midnight-border/70 bg-gradient-to-r from-purple-500/10 via-electric-purple/5 to-transparent shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-1.5 rounded-lg bg-electric-purple/15 text-electric-purple dark:text-lavender-glow">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-electric-purple dark:text-lavender-glow">
              Platform Licensing & Service Tie-Up
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-light-text dark:text-white tracking-tight">
            Adopt <span className="text-gradient-purple">{selectedPlatform.name}</span>
          </h2>
          <p className="text-xs sm:text-sm text-light-subtext dark:text-muted-gray mt-1 max-w-xl">
            Partner with Codrix to deploy this production-grade proprietary platform for your enterprise or campus with custom white-label branding, bespoke updates, and SLA support.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 scrollbar-thin">
          {submittedAdoption ? (
            /* Success View */
            <div className="text-center py-8 px-4 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-500/20 animate-scale-up">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-light-text dark:text-white">
                  Application Submitted Successfully!
                </h3>
                <p className="text-sm text-light-subtext dark:text-muted-gray">
                  Your platform adoption application for <strong className="text-light-text dark:text-white">{submittedAdoption.platformName}</strong> has been logged in our enterprise database.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-light-100 dark:bg-midnight-surface/80 border border-purple-100 dark:border-midnight-border max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-light-border dark:border-midnight-border/60">
                  <span className="text-light-subtext dark:text-muted-gray font-mono">Reference ID:</span>
                  <span className="font-mono font-bold text-electric-purple">{submittedAdoption.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light-subtext dark:text-muted-gray">Company:</span>
                  <span className="font-semibold text-light-text dark:text-white">{submittedAdoption.companyName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light-subtext dark:text-muted-gray">Applicant:</span>
                  <span className="font-semibold text-light-text dark:text-white">{submittedAdoption.fullName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light-subtext dark:text-muted-gray">Contact:</span>
                  <span className="font-semibold text-light-text dark:text-white">{submittedAdoption.contact}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 max-w-md mx-auto text-xs text-light-subtext dark:text-slate-300 leading-relaxed text-left flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-electric-purple shrink-0 mt-0.5" />
                <span>
                  Our technical solutions team is reviewing your requirements. We will reach out within 12–24 hours with an architecture roadmap, demo instance credentials, and commercial tie-up terms.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:bg-electric-light transition-all shadow-md shadow-purple-600/30 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Platform Selector Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-electric-purple" />
                  <span>Target In-House Platform</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AVAILABLE_PLATFORMS.map((plat) => {
                    const isSelected = selectedPlatform.id === plat.id || selectedPlatform.name.toLowerCase().includes(plat.name.toLowerCase());
                    return (
                      <button
                        key={plat.id}
                        type="button"
                        onClick={() => setSelectedPlatform({ id: plat.id, name: plat.name })}
                        className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-electric-purple text-white border-electric-purple shadow-md shadow-purple-500/20 scale-[1.02]'
                            : 'bg-white dark:bg-midnight-surface/80 text-light-text dark:text-white border-purple-100 dark:border-midnight-border hover:border-purple-300'
                        }`}
                      >
                        <span className="font-bold">{plat.name}</span>
                        <span className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-purple-100' : 'text-light-subtext dark:text-muted-gray'}`}>
                          {plat.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2-Column Personal & Company Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-electric-purple" />
                    <span>Your Full Name <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-light-100 dark:bg-midnight-surface/90 border border-purple-100 dark:border-midnight-border text-light-text dark:text-white placeholder:text-light-subtext/60 dark:placeholder:text-muted-gray/50 text-xs focus:outline-none focus:border-electric-purple transition-all"
                  />
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-electric-purple" />
                    <span>Official / Work Email <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-light-100 dark:bg-midnight-surface/90 border border-purple-100 dark:border-midnight-border text-light-text dark:text-white placeholder:text-light-subtext/60 dark:placeholder:text-muted-gray/50 text-xs focus:outline-none focus:border-electric-purple transition-all"
                  />
                </div>

                {/* Direct Contact Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-electric-purple" />
                    <span>Personal / Direct Contact Number <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-light-100 dark:bg-midnight-surface/90 border border-purple-100 dark:border-midnight-border text-light-text dark:text-white placeholder:text-light-subtext/60 dark:placeholder:text-muted-gray/50 text-xs focus:outline-none focus:border-electric-purple transition-all"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-electric-purple" />
                    <span>Company / Institution Name <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bennett University / Apex Global"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-light-100 dark:bg-midnight-surface/90 border border-purple-100 dark:border-midnight-border text-light-text dark:text-white placeholder:text-light-subtext/60 dark:placeholder:text-muted-gray/50 text-xs focus:outline-none focus:border-electric-purple transition-all"
                  />
                </div>

                {/* Company Contact Phone / Desk */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-electric-purple" />
                    <span>Company Contact (Office / Desk / Website)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +91 11 2345 6789 or office@apex.com"
                    value={companyContact}
                    onChange={(e) => setCompanyContact(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-light-100 dark:bg-midnight-surface/90 border border-purple-100 dark:border-midnight-border text-light-text dark:text-white placeholder:text-light-subtext/60 dark:placeholder:text-muted-gray/50 text-xs focus:outline-none focus:border-electric-purple transition-all"
                  />
                </div>

                {/* Timeline */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-electric-purple" />
                    <span>Target Deployment Timeline</span>
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-light-100 dark:bg-midnight-surface/90 border border-purple-100 dark:border-midnight-border text-light-text dark:text-white text-xs focus:outline-none focus:border-electric-purple transition-all"
                  >
                    <option value="Immediate (< 2 Weeks)">Immediate (&lt; 2 Weeks)</option>
                    <option value="Within 1 Month">Within 1 Month</option>
                    <option value="1 - 3 Months">1 – 3 Months</option>
                    <option value="Flexible / Exploring RFP">Flexible / Exploring RFP</option>
                  </select>
                </div>
              </div>

              {/* Estimated Scale */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-electric-purple" />
                  <span>Estimated Volume / Concurrent Users</span>
                </label>
                <select
                  value={estimatedScale}
                  onChange={(e) => setEstimatedScale(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-light-100 dark:bg-midnight-surface/90 border border-purple-100 dark:border-midnight-border text-light-text dark:text-white text-xs focus:outline-none focus:border-electric-purple transition-all"
                >
                  <option value="Pilot / Up to 50 Users">Pilot / Up to 50 Users</option>
                  <option value="50 - 500 Users / Daily Transactions">50 – 500 Users / Daily Transactions</option>
                  <option value="500 - 5,000 Users (Campus / Mid-Enterprise)">500 – 5,000 Users (Campus / Mid-Enterprise)</option>
                  <option value="5,000+ Enterprise High-Concurrency">5,000+ Enterprise High-Concurrency</option>
                </select>
              </div>

              {/* Use Cases */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-electric-purple" />
                  <span>Primary Use Cases & Operational Goals <span className="text-rose-500">*</span></span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Replace our legacy dining tokens with automated QR code ordering, real-time kitchen display synchronization, and automated split settlements."
                  value={usecases}
                  onChange={(e) => setUsecases(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-light-100 dark:bg-midnight-surface/90 border border-purple-100 dark:border-midnight-border text-light-text dark:text-white placeholder:text-light-subtext/60 dark:placeholder:text-muted-gray/50 text-xs focus:outline-none focus:border-electric-purple transition-all resize-y"
                />
              </div>

              {/* Custom Requirements & Technical Specifications */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-electric-purple" />
                  <span>Custom Requirements & Technical Specifications <span className="text-rose-500">*</span></span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Need dedicated AWS hosting in India (Mumbai), integration with our custom ERP via Webhooks, custom corporate logo/color branding, and white-label mobile app APK."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-light-100 dark:bg-midnight-surface/90 border border-purple-100 dark:border-midnight-border text-light-text dark:text-white placeholder:text-light-subtext/60 dark:placeholder:text-muted-gray/50 text-xs focus:outline-none focus:border-electric-purple transition-all resize-y"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-light-border dark:border-midnight-border/60">
                <p className="text-[11px] text-light-subtext dark:text-muted-gray">
                  Guaranteed SLA review within 24 hours. Your details are encrypted & protected under NDA.
                </p>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-light-border dark:border-midnight-border text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-electric-purple to-deep-violet hover:opacity-95 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-purple-600/30 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Adoption Spec</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

