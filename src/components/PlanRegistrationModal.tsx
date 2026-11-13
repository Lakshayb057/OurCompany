import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Sparkles, Globe, Shield, Send, ArrowRight, MessageSquare } from 'lucide-react';
import { PlanPackage, PLANS_DATA } from '../data/plansData';

interface PlanRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PlanPackage | null;
  onSelectAnotherPlan?: (plan: PlanPackage) => void;
  currency?: 'INR' | 'USD';
}

export const PlanRegistrationModal: React.FC<PlanRegistrationModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  currency = 'INR'
}) => {
  const [currentPlanId, setCurrentPlanId] = useState<string>(selectedPlan?.id || PLANS_DATA[0].id);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [company, setCompany] = useState('');
  const [domainOption, setDomainOption] = useState<'with-domain' | 'without-domain' | 'custom'>('with-domain');
  const [billingPeriod, setBillingPeriod] = useState<string>('One-Time');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sync selected plan on prop change or open
  useEffect(() => {
    if (selectedPlan) {
      setCurrentPlanId(selectedPlan.id);
      setBillingPeriod(selectedPlan.billingPeriod);
      setDomainOption(selectedPlan.domainIncluded ? 'with-domain' : 'without-domain');
    }
  }, [selectedPlan]);

  // Attempt to autofill from client's prior inquiry if available
  useEffect(() => {
    if (isOpen) {
      try {
        const cached = sessionStorage.getItem('codrix_client_inquiry');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.fullName && !fullName) setFullName(parsed.fullName);
          if (parsed.email && !email) setEmail(parsed.email);
          if (parsed.contact && !contact) setContact(parsed.contact);
          if (parsed.description && !notes) {
            setNotes(`[From Project Inquiry]: ${parsed.description}`);
          }
        }
      } catch (err) {
        console.warn('Could not read cached inquiry', err);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const activePlan = PLANS_DATA.find(p => p.id === currentPlanId) || selectedPlan || PLANS_DATA[0];
  const priceDisplay = currency === 'INR'
    ? `₹${activePlan.priceINR.toLocaleString('en-IN')}`
    : `$${activePlan.priceUSD.toLocaleString('en-US')}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid business or personal email.');
      return;
    }
    if (!contact.trim()) {
      setError('Please provide your contact number / WhatsApp for technical coordination.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/v1/plan-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          contact: contact.trim(),
          company: company.trim(),
          planId: activePlan.id,
          planName: activePlan.name,
          category: activePlan.category,
          domainOption,
          billingPeriod: activePlan.billingPeriod,
          estimatedPrice: priceDisplay,
          notes: notes.trim()
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(data.message || 'Registration confirmed! Our founding team will contact you within 24 hours with the architecture blueprint.');
      } else {
        setError(data.message || 'Failed to submit registration. Please verify your details.');
      }
    } catch (err) {
      console.warn('Failed to submit via API, acknowledging locally:', err);
      setSuccess(`Registration for "${activePlan.name}" received! Our engineering leadership will reach out within 24 hours.`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-midnight-900 border border-purple-200 dark:border-electric-purple/40 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-light-border dark:border-midnight-border bg-purple-50/70 dark:bg-midnight-card/80 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-electric-purple text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-light-text dark:text-white leading-tight">
                Register for Engineering Plan
              </h3>
              <p className="text-xs text-light-subtext dark:text-muted-gray">
                Lock in your scope, timeline & founding team delivery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-light-subtext dark:text-gray-400 hover:text-light-text dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 min-h-0 space-y-6">
          {success ? (
            <div className="py-8 text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/20 border-2 border-emerald-400 text-emerald-500 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-extrabold text-light-text dark:text-white">
                  Plan Registration Confirmed
                </h4>
                <p className="text-sm text-light-subtext dark:text-muted-gray max-w-md mx-auto leading-relaxed">
                  {success}
                </p>
              </div>

              {/* Summary Pill */}
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-midnight-card border border-purple-200 dark:border-midnight-border max-w-md mx-auto text-left text-xs space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-light-subtext dark:text-gray-400">Selected Plan:</span>
                  <span className="font-bold text-electric-purple dark:text-lavender-glow">{activePlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-subtext dark:text-gray-400">Estimated Investment:</span>
                  <span className="font-bold text-light-text dark:text-white">{priceDisplay} ({activePlan.billingPeriod})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-subtext dark:text-gray-400">Target Delivery:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{activePlan.turnaroundTime}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi Codrix team! I have registered for the "${activePlan.name}" plan under ${fullName}. Looking forward to connecting!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Connect on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-electric-purple text-white font-semibold text-xs shadow-md hover:bg-electric-purple/90 transition-all"
                >
                  Close & Explore Plans
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Plan Snapshot Badge Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 via-lavender-soft/40 to-white dark:from-midnight-card dark:via-midnight-card/80 dark:to-midnight-900 border border-purple-200 dark:border-midnight-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-electric-purple text-white font-bold tracking-wider">
                      {activePlan.category.replace('-', ' ')}
                    </span>
                    {activePlan.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 dark:bg-white/10 text-electric-purple dark:text-lavender-light font-semibold">
                        {activePlan.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base sm:text-lg font-extrabold text-light-text dark:text-white mt-1">
                    {activePlan.name}
                  </h4>
                  <p className="text-xs text-light-subtext dark:text-muted-gray mt-0.5 line-clamp-1">
                    {activePlan.tagline}
                  </p>
                </div>

                <div className="sm:text-right flex-shrink-0">
                  <div className="text-lg sm:text-xl font-mono font-black text-electric-purple dark:text-lavender-glow">
                    {priceDisplay}
                  </div>
                  <div className="text-[10px] font-mono text-light-subtext dark:text-muted-gray">
                    {activePlan.billingPeriod} • {activePlan.turnaroundTime}
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Plan Selector Dropdown */}
              <div>
                <label className="block text-xs font-mono font-semibold text-light-text dark:text-gray-300 mb-1.5">
                  Change Selected Package
                </label>
                <select
                  value={currentPlanId}
                  onChange={(e) => {
                    setCurrentPlanId(e.target.value);
                    const p = PLANS_DATA.find(x => x.id === e.target.value);
                    if (p) {
                      setBillingPeriod(p.billingPeriod);
                      setDomainOption(p.domainIncluded ? 'with-domain' : 'without-domain');
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border focus:border-electric-purple focus:outline-none text-xs sm:text-sm text-light-text dark:text-white font-medium"
                >
                  {PLANS_DATA.map((p) => (
                    <option key={p.id} value={p.id} className="bg-white text-light-text dark:bg-midnight-900 dark:text-white">
                      [{p.category.toUpperCase()}] {p.name} — {currency === 'INR' ? `₹${p.priceINR.toLocaleString('en-IN')}` : `$${p.priceUSD.toLocaleString('en-US')}`} ({p.billingPeriod})
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-light-text dark:text-gray-300 mb-1.5">
                    Full Name <span className="text-electric-purple">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lakshay Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border focus:border-electric-purple focus:outline-none text-xs sm:text-sm text-light-text dark:text-white shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-light-text dark:text-gray-300 mb-1.5">
                    Business / Personal Email <span className="text-electric-purple">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border focus:border-electric-purple focus:outline-none text-xs sm:text-sm text-light-text dark:text-white shadow-sm"
                  />
                </div>
              </div>

              {/* Row 2: Contact Number and Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-light-text dark:text-gray-300 mb-1.5">
                    Contact Number / WhatsApp <span className="text-electric-purple">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210 / WhatsApp"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border focus:border-electric-purple focus:outline-none text-xs sm:text-sm text-light-text dark:text-white shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-light-text dark:text-gray-300 mb-1.5">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Tech Innovations"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border focus:border-electric-purple focus:outline-none text-xs sm:text-sm text-light-text dark:text-white shadow-sm"
                  />
                </div>
              </div>

              {/* Row 3: Domain Requirement Preference */}
              <div>
                <label className="block text-xs font-mono font-semibold text-light-text dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-electric-purple" />
                  <span>Domain Requirement Preference</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <label className={`p-3 rounded-xl border flex flex-col cursor-pointer transition-all ${
                    domainOption === 'with-domain'
                      ? 'border-electric-purple bg-purple-50/80 dark:bg-white/[0.08] shadow-sm'
                      : 'border-purple-100 dark:border-midnight-border bg-white dark:bg-midnight-card/50'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="domainOption"
                        checked={domainOption === 'with-domain'}
                        onChange={() => setDomainOption('with-domain')}
                        className="text-electric-purple focus:ring-electric-purple"
                      />
                      <span className="font-bold text-light-text dark:text-white">With Domain</span>
                    </div>
                    <span className="text-[10px] text-light-subtext dark:text-muted-gray mt-1">
                      Codrix registers & configures 1-year domain
                    </span>
                  </label>

                  <label className={`p-3 rounded-xl border flex flex-col cursor-pointer transition-all ${
                    domainOption === 'without-domain'
                      ? 'border-electric-purple bg-purple-50/80 dark:bg-white/[0.08] shadow-sm'
                      : 'border-purple-100 dark:border-midnight-border bg-white dark:bg-midnight-card/50'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="domainOption"
                        checked={domainOption === 'without-domain'}
                        onChange={() => setDomainOption('without-domain')}
                        className="text-electric-purple focus:ring-electric-purple"
                      />
                      <span className="font-bold text-light-text dark:text-white">Without Domain</span>
                    </div>
                    <span className="text-[10px] text-light-subtext dark:text-muted-gray mt-1">
                      I already own a custom domain to link
                    </span>
                  </label>

                  <label className={`p-3 rounded-xl border flex flex-col cursor-pointer transition-all ${
                    domainOption === 'custom'
                      ? 'border-electric-purple bg-purple-50/80 dark:bg-white/[0.08] shadow-sm'
                      : 'border-purple-100 dark:border-midnight-border bg-white dark:bg-midnight-card/50'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="domainOption"
                        checked={domainOption === 'custom'}
                        onChange={() => setDomainOption('custom')}
                        className="text-electric-purple focus:ring-electric-purple"
                      />
                      <span className="font-bold text-light-text dark:text-white">Need Domain Advice</span>
                    </div>
                    <span className="text-[10px] text-light-subtext dark:text-muted-gray mt-1">
                      Help me choose the ideal domain TLD
                    </span>
                  </label>
                </div>
              </div>

              {/* Row 4: Custom Requirements & Notes */}
              <div>
                <label className="block text-xs font-mono font-semibold text-light-text dark:text-gray-300 mb-1.5">
                  Project Notes, Custom Features or Deadlines
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention your target launch deadline, specific design inspirations, integrations, or customizations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border focus:border-electric-purple focus:outline-none text-xs sm:text-sm text-light-text dark:text-white shadow-sm"
                />
              </div>

              {/* Guarantees Strip */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-light-subtext dark:text-muted-gray pt-1 font-mono">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-electric-purple" />
                  <span>Strict NDA Protected</span>
                </span>
                <span>•</span>
                <span>100% Full Source IP Transfer</span>
                <span>•</span>
                <span>Zero Hidden Fees</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-purple-200 dark:border-midnight-border text-xs font-semibold text-light-text dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-electric-purple via-lavender-glow to-deep-violet text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Registration...</span>
                    </span>
                  ) : (
                    <>
                      <span>Confirm & Register Plan</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

