import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Shield, LayoutDashboard, Inbox, FolderKanban, 
  Percent, FileText, CheckCircle2, AlertTriangle, Search, 
  ExternalLink, Download, RefreshCw, Key, LogOut, Check
} from 'lucide-react';
import { Inquiry, Product, InternalProject } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProduct: (product: Product) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ 
  isOpen, 
  onClose, 
  products, 
  onUpdateProduct 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('admin@codeverse.tech');
  const [loginPass, setLoginPass] = useState('CodeVerse@2026');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'portfolio' | 'allocations' | 'audit'>('overview');

  // Inquiries state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Allocations calculator state
  const [allocLead, setAllocLead] = useState<number>(30);
  const [allocEng, setAllocEng] = useState<number>(50);
  const [allocComp, setAllocComp] = useState<number>(20);
  const [calcBudget, setCalcBudget] = useState<number>(450000);
  const [allocValidationMsg, setAllocValidationMsg] = useState<{ valid: boolean; text: string }>({
    valid: true,
    text: 'Valid: Total equals exactly 100%'
  });

  // Internal projects list
  const [internalProjects] = useState<InternalProject[]>([
    {
      id: "prj-01",
      name: "UniVerse — Campus Dining OS",
      client: "Campus Retail Network",
      budget: 450000,
      status: "In Production",
      allocations: { projectLead: 30, engineering: 50, companyReserve: 20 },
      leadAmount: 135000,
      engineeringAmount: 225000,
      companyAmount: 90000,
      notes: "Verified 100% allocation model compliant with Section 10.4."
    },
    {
      id: "prj-02",
      name: "ChatLeads AI Fleet Platform",
      client: "Logistics & Sales Tech UK",
      budget: 350000,
      status: "Delivered",
      allocations: { projectLead: 30, engineering: 50, companyReserve: 20 },
      leadAmount: 105000,
      engineeringAmount: 175000,
      companyAmount: 70000,
      notes: "FastAPI + Gemini OCR lead extraction engine."
    },
    {
      id: "prj-03",
      name: "SachiKheti Agri-Commerce & ERP",
      client: "Certified Farm Network",
      budget: 280000,
      status: "In Production",
      allocations: { projectLead: 30, engineering: 50, companyReserve: 20 },
      leadAmount: 84000,
      engineeringAmount: 140000,
      companyAmount: 56000,
      notes: "Razorpay UPI + WhatsApp direct-to-farm platform."
    }
  ]);

  // Audit log
  const [auditLogs, setAuditLogs] = useState<{ id: string; action: string; time: string; user: string }[]>([
    { id: '1', action: 'Admin session initiated', time: 'Just now', user: 'Lakshay (Super Admin)' },
    { id: '2', action: 'Inquiry inq-101 status updated to Review', time: '10 mins ago', user: 'Lakshay' },
    { id: '3', action: 'Allocation integrity check passed (100%)', time: '25 mins ago', user: 'System' }
  ]);

  // Fetch inquiries from API or fallback
  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/v1/admin/inquiries');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setInquiries(json.data);
          return;
        }
      }
    } catch (e) {
      console.log('Using local fallback for inquiries');
    }

    setInquiries([
      {
        id: "inq-101",
        fullName: "Alexander Vance",
        email: "alex@vancetech.io",
        company: "Vance Technologies UK",
        country: "United Kingdom",
        projectType: "AI & Distributed Cloud Platform",
        budgetRange: "$25,000 - $50,000",
        timeline: "2-3 Months",
        preferredContact: "Email",
        description: "We are seeking to build a high-concurrency document processing engine with automated OCR extraction and real-time agent dispatcher, similar to your ChatLeads AI architecture.",
        status: "Review",
        createdAt: "2026-10-28T14:32:00Z"
      },
      {
        id: "inq-102",
        fullName: "Meera Sen",
        email: "meera@ecosphere.in",
        company: "EcoSphere Agritech",
        country: "India",
        projectType: "Direct-to-Consumer & ERP",
        budgetRange: "₹5 Lakh - ₹15 Lakh",
        timeline: "1-2 Months",
        preferredContact: "WhatsApp",
        description: "Interested in building a multi-vendor direct farm portal with automated order tracking, Razorpay integration, and a centralized superadmin dashboard like SachiKheti.",
        status: "New",
        createdAt: "2026-11-01T09:15:00Z"
      }
    ]);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const total = allocLead + allocEng + allocComp;
    if (total === 100) {
      setAllocValidationMsg({ valid: true, text: 'Allocation Validated: Exactly 100% Total' });
    } else {
      setAllocValidationMsg({ 
        valid: false, 
        text: `Validation Error: Total is ${total}%. Must equal exactly 100% (FR-14 & Sec. 10.4)` 
      });
    }
  }, [allocLead, allocEng, allocComp]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'admin@codeverse.tech' && loginPass === 'CodeVerse@2026') {
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError('Invalid administrative credentials. Use the official demo credentials.');
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: Inquiry['status']) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
    }

    try {
      await fetch(`/api/v1/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.warn('Backend update error, saved in session:', e);
    }

    setAuditLogs(prev => [
      { id: Date.now().toString(), action: `Updated inquiry ${id} status to ${newStatus}`, time: 'Just now', user: 'Lakshay' },
      ...prev
    ]);
  };

  const handleExportCSV = () => {
    const headers = ['ID,Full Name,Email,Company,Country,Project Type,Budget,Timeline,Status,Created At'];
    const rows = inquiries.map(i => 
      `"${i.id}","${i.fullName}","${i.email}","${i.company || ''}","${i.country}","${i.projectType}","${i.budgetRange || ''}","${i.timeline || ''}","${i.status}","${i.createdAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `codeverse-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-6xl bg-white dark:bg-midnight-900 border border-purple-200 dark:border-midnight-border rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-light-border dark:border-midnight-border bg-light-surface/90 dark:bg-midnight-card/90 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-lavender-soft dark:bg-electric-purple/20 border border-purple-200 dark:border-electric-purple/50 flex items-center justify-center shadow-sm">
              <Shield className="w-4 h-4 text-electric-purple dark:text-lavender-glow" />
            </div>
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-electric-purple dark:text-lavender-glow font-bold">
                CodeVerse Private Admin Suite
              </div>
              <div className="text-sm font-bold text-light-text dark:text-white">
                SRS Section 12 • Content & Allocation Governance
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs font-mono text-light-subtext dark:text-muted-gray hover:text-rose-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-light-border dark:border-midnight-border hover:border-rose-300 transition-colors"
                title="Sign out of admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-light-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-14 max-w-md mx-auto w-full my-auto text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-lavender-soft dark:bg-electric-purple/20 border border-purple-200 dark:border-electric-purple/40 text-electric-purple dark:text-lavender-glow mx-auto flex items-center justify-center shadow-sm">
              <Key className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-white">Administrator Authentication</h2>
              <p className="text-xs text-light-subtext dark:text-muted-gray mt-1">
                Access protected under RBAC SEC-02 & FR-12.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono text-light-text dark:text-gray-300 mb-1 font-medium">
                  Admin Identifier
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border text-sm text-light-text dark:text-white focus:border-electric-purple focus:outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-light-text dark:text-gray-300 mb-1 font-medium">
                  Access Key
                </label>
                <input
                  type="password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border text-sm text-light-text dark:text-white focus:border-electric-purple focus:outline-none shadow-sm"
                />
              </div>

              <div className="p-3 rounded-lg bg-light-surface dark:bg-midnight-card/80 border border-purple-100 dark:border-midnight-border text-[11px] font-mono text-light-subtext dark:text-muted-gray">
                Demo Credentials: <br />
                <span className="text-electric-purple font-semibold">admin@codeverse.tech</span> / <span className="text-electric-purple font-semibold">CodeVerse@2026</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-purple to-deep-violet text-white text-xs font-semibold shadow-md shadow-purple-600/20 hover:shadow-lg hover:shadow-electric-purple/30 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Verify Administrative Clearance</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-56 bg-light-surface/70 dark:bg-midnight-card/60 border-r border-light-border dark:border-midnight-border p-3 space-y-1 flex-shrink-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'overview'
                    ? 'bg-electric-purple text-white shadow-md shadow-electric-purple/30 font-semibold'
                    : 'text-light-subtext dark:text-muted-gray hover:text-light-text hover:bg-lavender-soft/60 dark:hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview Stats</span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'inquiries'
                    ? 'bg-electric-purple text-white shadow-md shadow-electric-purple/30 font-semibold'
                    : 'text-light-subtext dark:text-muted-gray hover:text-light-text hover:bg-lavender-soft/60 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Inbox className="w-4 h-4" />
                  <span>Leads Inbox</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-white dark:bg-midnight-900 border border-purple-200 dark:border-midnight-border text-electric-purple dark:text-lavender-glow font-bold">
                  {inquiries.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'portfolio'
                    ? 'bg-electric-purple text-white shadow-md shadow-electric-purple/30 font-semibold'
                    : 'text-light-subtext dark:text-muted-gray hover:text-light-text hover:bg-lavender-soft/60 dark:hover:bg-white/5'
                }`}
              >
                <FolderKanban className="w-4 h-4" />
                <span>Portfolio CMS</span>
              </button>

              <button
                onClick={() => setActiveTab('allocations')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'allocations'
                    ? 'bg-electric-purple text-white shadow-md shadow-electric-purple/30 font-semibold'
                    : 'text-light-subtext dark:text-muted-gray hover:text-light-text hover:bg-lavender-soft/60 dark:hover:bg-white/5'
                }`}
              >
                <Percent className="w-4 h-4" />
                <span>100% Allocations</span>
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'audit'
                    ? 'bg-electric-purple text-white shadow-md shadow-electric-purple/30 font-semibold'
                    : 'text-light-subtext dark:text-muted-gray hover:text-light-text hover:bg-lavender-soft/60 dark:hover:bg-white/5'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Audit & Security</span>
              </button>
            </div>

            {/* Main Tab Panel */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white dark:bg-midnight-900">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-light-text dark:text-white">System Telemetry & Inquiries</h3>
                    <p className="text-xs text-light-subtext dark:text-muted-gray mt-0.5">
                      Operational overview of CodeVerse lead generation and active project catalog.
                    </p>
                  </div>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-light-surface dark:bg-midnight-card border border-purple-100 dark:border-midnight-border shadow-sm">
                      <div className="text-xs font-mono text-light-subtext dark:text-muted-gray">Total Qualified Inquiries</div>
                      <div className="text-3xl font-bold font-mono text-light-text dark:text-white mt-1">{inquiries.length}</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">100% Validated Leads</div>
                    </div>

                    <div className="p-4 rounded-xl bg-light-surface dark:bg-midnight-card border border-purple-100 dark:border-midnight-border shadow-sm">
                      <div className="text-xs font-mono text-light-subtext dark:text-muted-gray">Portfolio Products</div>
                      <div className="text-3xl font-bold font-mono text-electric-purple dark:text-lavender-glow mt-1">{products.length}</div>
                      <div className="text-[10px] text-light-subtext dark:text-muted-gray mt-1">6 Detailed Case Studies</div>
                    </div>

                    <div className="p-4 rounded-xl bg-light-surface dark:bg-midnight-card border border-purple-100 dark:border-midnight-border shadow-sm">
                      <div className="text-xs font-mono text-light-subtext dark:text-muted-gray">Active In-Review</div>
                      <div className="text-3xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
                        {inquiries.filter(i => i.status === 'Review' || i.status === 'New').length}
                      </div>
                      <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold">Pending Founder Action</div>
                    </div>

                    <div className="p-4 rounded-xl bg-light-surface dark:bg-midnight-card border border-purple-100 dark:border-midnight-border shadow-sm">
                      <div className="text-xs font-mono text-light-subtext dark:text-muted-gray">Allocation Model</div>
                      <div className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">30/50/20</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">100% Strict Integrity</div>
                    </div>
                  </div>

                  {/* Recent Inquiries List */}
                  <div className="p-5 rounded-2xl bg-light-surface/60 dark:bg-midnight-card border border-purple-100 dark:border-midnight-border space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-light-text dark:text-white">Recent High-Value Project Leads</h4>
                      <button
                        onClick={() => setActiveTab('inquiries')}
                        className="text-xs font-mono text-electric-purple dark:text-lavender-glow hover:underline font-semibold"
                      >
                        Open Inquiries Inbox →
                      </button>
                    </div>

                    <div className="space-y-2">
                      {inquiries.slice(0, 3).map((inq) => (
                        <div
                          key={inq.id}
                          className="p-3.5 rounded-xl bg-white dark:bg-midnight-surface border border-purple-100 dark:border-midnight-border flex items-center justify-between gap-4 shadow-sm"
                        >
                          <div>
                            <div className="text-xs font-semibold text-light-text dark:text-white">{inq.fullName}</div>
                            <div className="text-[11px] text-light-subtext dark:text-muted-gray font-mono">{inq.company || inq.email} • {inq.country}</div>
                          </div>
                          <div className="text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-lavender-soft text-electric-dark dark:bg-electric-purple/20 dark:text-lavender-light border border-purple-200 dark:border-electric-purple/40 font-semibold">
                              {inq.projectType}
                            </span>
                            <div className="text-[10px] text-light-subtext dark:text-muted-gray mt-1 font-medium">{inq.budgetRange}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: INQUIRIES MANAGEMENT */}
              {activeTab === 'inquiries' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-light-text dark:text-white">Inquiries & Leads Management</h3>
                      <p className="text-xs text-light-subtext dark:text-muted-gray mt-0.5">
                        Structured project submissions compliant with FR-09, FR-10, and FR-13.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportCSV}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border hover:border-electric-purple text-xs font-mono text-electric-purple dark:text-lavender-light flex items-center gap-1.5 shadow-sm font-semibold"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>

                      <button
                        onClick={fetchInquiries}
                        className="p-2 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border text-light-subtext dark:text-muted-gray hover:text-electric-purple shadow-sm"
                        title="Refresh Inquiries"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Filter and Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-light-subtext dark:text-muted-gray" />
                      <input
                        type="text"
                        placeholder="Search leads by name, email, company, or domain..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border text-xs text-light-text dark:text-white focus:outline-none focus:border-electric-purple shadow-sm"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto">
                      {['All', 'New', 'Review', 'Contacted', 'Converted'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setFilterStatus(st)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                            filterStatus === st
                              ? 'bg-electric-purple text-white shadow-sm font-semibold'
                              : 'bg-white dark:bg-midnight-card text-light-subtext dark:text-muted-gray hover:text-electric-purple border border-purple-200 dark:border-midnight-border'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inquiries Table */}
                  <div className="rounded-2xl border border-purple-200 dark:border-midnight-border overflow-hidden bg-white dark:bg-midnight-card/80 shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-light-surface dark:bg-midnight-surface text-light-subtext dark:text-gray-400 font-mono uppercase text-[10px] border-b border-light-border dark:border-midnight-border">
                          <tr>
                            <th className="p-3.5">Lead Details</th>
                            <th className="p-3.5">Domain & Timeline</th>
                            <th className="p-3.5">Budget</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-100 dark:divide-midnight-border/60">
                          {inquiries
                            .filter(i => filterStatus === 'All' || i.status.toLowerCase() === filterStatus.toLowerCase())
                            .filter(i => 
                              !searchQuery || 
                              i.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (i.company && i.company.toLowerCase().includes(searchQuery.toLowerCase()))
                            )
                            .map((inq) => (
                              <tr key={inq.id} className="hover:bg-light-surface/40 dark:hover:bg-midnight-surface/50 transition-colors">
                                <td className="p-3.5">
                                  <div className="font-semibold text-light-text dark:text-white">{inq.fullName}</div>
                                  <div className="text-[11px] text-light-subtext dark:text-muted-gray font-mono">{inq.email}</div>
                                  <div className="text-[10px] text-electric-purple dark:text-lavender-glow font-medium">{inq.company || inq.country}</div>
                                </td>
                                <td className="p-3.5">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-lavender-soft text-electric-dark dark:bg-electric-purple/15 dark:text-lavender-light border border-purple-200 dark:border-electric-purple/30 font-semibold">
                                    {inq.projectType}
                                  </span>
                                  <div className="text-[10px] text-light-subtext dark:text-muted-gray mt-1">Timeline: {inq.timeline}</div>
                                </td>
                                <td className="p-3.5 font-mono text-light-text dark:text-white font-medium">
                                  {inq.budgetRange}
                                </td>
                                <td className="p-3.5">
                                  <select
                                    value={inq.status}
                                    onChange={(e) => handleUpdateStatus(inq.id, e.target.value as any)}
                                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-midnight-900 border border-purple-200 dark:border-midnight-border text-[11px] font-mono text-light-text dark:text-white focus:outline-none focus:border-electric-purple cursor-pointer shadow-sm"
                                  >
                                    <option value="New">New</option>
                                    <option value="Review">Review</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Converted">Converted</option>
                                    <option value="Archived">Archived</option>
                                  </select>
                                </td>
                                <td className="p-3.5 text-right">
                                  <button
                                    onClick={() => setSelectedInquiry(inq)}
                                    className="px-2.5 py-1 rounded bg-lavender-soft/60 dark:bg-midnight-surface border border-purple-200 dark:border-midnight-border text-electric-purple dark:text-lavender-light hover:bg-electric-purple hover:text-white text-[11px] font-mono font-semibold transition-all shadow-sm"
                                  >
                                    View Scope
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Selected Inquiry Modal Drawer */}
                  {selectedInquiry && (
                    <div className="p-5 rounded-2xl bg-light-surface dark:bg-midnight-card border border-purple-200 dark:border-electric-purple/40 space-y-3 shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-mono uppercase tracking-wider text-electric-purple dark:text-lavender-glow font-bold">
                          Full Inquiry Requirements Scope • ID: {selectedInquiry.id}
                        </div>
                        <button
                          onClick={() => setSelectedInquiry(null)}
                          className="text-xs text-light-subtext dark:text-muted-gray hover:text-light-text flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Close</span>
                        </button>
                      </div>

                      <div className="text-sm font-bold text-light-text dark:text-white">
                        {selectedInquiry.fullName} ({selectedInquiry.email}) — {selectedInquiry.company || 'Private Startup'} [{selectedInquiry.country}]
                      </div>

                      <div className="p-3.5 rounded-xl bg-white dark:bg-midnight-900/80 border border-purple-200 dark:border-midnight-border text-xs text-light-text dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-sans shadow-sm">
                        {selectedInquiry.description}
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2 text-[11px] font-mono text-light-subtext dark:text-muted-gray">
                        <span>Domain: <strong className="text-light-text dark:text-white">{selectedInquiry.projectType}</strong></span>
                        <span>•</span>
                        <span>Budget: <strong className="text-light-text dark:text-white">{selectedInquiry.budgetRange}</strong></span>
                        <span>•</span>
                        <span>Preferred Contact: <strong className="text-light-text dark:text-white">{selectedInquiry.preferredContact}</strong></span>
                        <span>•</span>
                        <span>Submitted: <strong className="text-light-text dark:text-white">{new Date(selectedInquiry.createdAt).toLocaleDateString()}</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PORTFOLIO CMS */}
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-light-text dark:text-white">Portfolio Products & Case Studies</h3>
                    <p className="text-xs text-light-subtext dark:text-muted-gray mt-0.5">
                      Configure live URLs, status tags, and metadata for all 6 projects from Appendix C.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((p) => (
                      <div
                        key={p.id}
                        className="p-5 rounded-2xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border space-y-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-electric-purple dark:text-lavender-glow uppercase tracking-wider font-bold">
                            {p.badge}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                            p.status === 'Live' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                          }`}>
                            {p.status}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-light-text dark:text-white">{p.name}</h4>
                          <p className="text-xs text-light-subtext dark:text-muted-gray line-clamp-2 mt-1">{p.tagline}</p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-light-border dark:border-midnight-border/70 text-xs font-mono">
                          <div className="flex items-center justify-between">
                            <span className="text-light-subtext dark:text-muted-gray">Live URL:</span>
                            <span className="text-light-text dark:text-white truncate max-w-[200px] font-medium">{p.liveUrl || 'Not configured'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-light-subtext dark:text-muted-gray">GitHub:</span>
                            <span className="text-light-text dark:text-white truncate max-w-[200px] font-medium">{p.githubUrl || 'Private'}</span>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <select
                            value={p.status}
                            onChange={(e) => onUpdateProduct({ ...p, status: e.target.value as any })}
                            className="px-2 py-1 rounded bg-light-surface dark:bg-midnight-surface border border-purple-200 dark:border-midnight-border text-[11px] font-mono text-light-text dark:text-white"
                          >
                            <option value="Live">Live</option>
                            <option value="Beta">Beta</option>
                            <option value="Development">Development</option>
                            <option value="Concept">Concept</option>
                          </select>

                          {p.liveUrl && (
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-electric-purple dark:text-lavender-glow hover:underline flex items-center gap-1 font-mono font-semibold"
                            >
                              <span>Test Link</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: 100% ALLOCATIONS & FINANCIAL CALCULATOR */}
              {activeTab === 'allocations' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-light-text dark:text-white">Project Allocation & Financial Engine</h3>
                    <p className="text-xs text-light-subtext dark:text-muted-gray mt-0.5">
                      Enforces FR-14 & Section 10.4: Allocation rules must strictly equal 100% before activation.
                    </p>
                  </div>

                  {/* Calculator Panel */}
                  <div className="p-6 rounded-2xl bg-light-surface dark:bg-midnight-card border border-purple-200 dark:border-electric-purple/30 space-y-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono uppercase tracking-wider text-electric-purple dark:text-lavender-glow font-bold">
                        Rule 10.4 Allocation Validator
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 ${
                        allocValidationMsg.valid ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30' : 'bg-rose-50 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30'
                      }`}>
                        {allocValidationMsg.valid ? <Check className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        <span>{allocValidationMsg.text}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-white dark:bg-midnight-surface border border-purple-100 dark:border-midnight-border shadow-sm">
                        <label className="block text-xs font-mono text-electric-purple font-bold mb-1">
                          Project Lead / Acquisition (%)
                        </label>
                        <input
                          type="number"
                          value={allocLead}
                          onChange={(e) => setAllocLead(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg bg-light-surface dark:bg-midnight-900 border border-purple-200 dark:border-midnight-border text-base font-bold font-mono text-light-text dark:text-white"
                        />
                        <span className="text-[10px] text-light-subtext dark:text-muted-gray mt-1 block">Default: 30%</span>
                      </div>

                      <div className="p-4 rounded-xl bg-white dark:bg-midnight-surface border border-purple-100 dark:border-midnight-border shadow-sm">
                        <label className="block text-xs font-mono text-electric-purple font-bold mb-1">
                          Developer / Engineering (%)
                        </label>
                        <input
                          type="number"
                          value={allocEng}
                          onChange={(e) => setAllocEng(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg bg-light-surface dark:bg-midnight-900 border border-purple-200 dark:border-midnight-border text-base font-bold font-mono text-light-text dark:text-white"
                        />
                        <span className="text-[10px] text-light-subtext dark:text-muted-gray mt-1 block">Default: 50%</span>
                      </div>

                      <div className="p-4 rounded-xl bg-white dark:bg-midnight-surface border border-purple-100 dark:border-midnight-border shadow-sm">
                        <label className="block text-xs font-mono text-electric-purple font-bold mb-1">
                          Company Account / Reserves (%)
                        </label>
                        <input
                          type="number"
                          value={allocComp}
                          onChange={(e) => setAllocComp(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg bg-light-surface dark:bg-midnight-900 border border-purple-200 dark:border-midnight-border text-base font-bold font-mono text-light-text dark:text-white"
                        />
                        <span className="text-[10px] text-light-subtext dark:text-muted-gray mt-1 block">Default: 20%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-light-text dark:text-gray-300 mb-1 font-medium">
                        Simulated Total Project Budget (₹ or $)
                      </label>
                      <input
                        type="number"
                        value={calcBudget}
                        onChange={(e) => setCalcBudget(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-midnight-surface border border-purple-200 dark:border-midnight-border text-lg font-bold font-mono text-light-text dark:text-white shadow-sm"
                      />
                    </div>

                    {/* Breakdown Output */}
                    <div className="p-4 rounded-xl bg-white dark:bg-midnight-900/90 border border-purple-200 dark:border-midnight-border grid grid-cols-3 gap-3 text-center shadow-sm">
                      <div>
                        <div className="text-[10px] font-mono text-light-subtext dark:text-muted-gray">Lead Allocation ({allocLead}%)</div>
                        <div className="text-base font-bold font-mono text-electric-purple mt-1">
                          ${((calcBudget * allocLead) / 100).toLocaleString()}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-light-subtext dark:text-muted-gray">Engineering ({allocEng}%)</div>
                        <div className="text-base font-bold font-mono text-electric-dark dark:text-lavender-glow mt-1">
                          ${((calcBudget * allocEng) / 100).toLocaleString()}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-light-subtext dark:text-muted-gray">Company Reserve ({allocComp}%)</div>
                        <div className="text-base font-bold font-mono text-light-text dark:text-white mt-1">
                          ${((calcBudget * allocComp) / 100).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Configured Internal Projects */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-light-subtext dark:text-muted-gray font-bold">
                      Active Internal Projects (Private Records)
                    </h4>

                    {internalProjects.map((prj) => (
                      <div
                        key={prj.id}
                        className="p-4 rounded-xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                      >
                        <div>
                          <div className="text-sm font-bold text-light-text dark:text-white">{prj.name}</div>
                          <div className="text-xs text-light-subtext dark:text-muted-gray font-mono">{prj.client} • {prj.status}</div>
                        </div>

                        <div className="flex items-center gap-6 font-mono text-xs">
                          <div>
                            <span className="text-light-subtext dark:text-muted-gray text-[10px] block">Budget</span>
                            <span className="text-light-text dark:text-white font-bold">₹{prj.budget.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-light-subtext dark:text-muted-gray text-[10px] block">Splits (Lead/Eng/Co)</span>
                            <span className="text-electric-purple dark:text-lavender-glow font-bold">
                              {prj.allocations.projectLead}% / {prj.allocations.engineering}% / {prj.allocations.companyReserve}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: AUDIT LOGS */}
              {activeTab === 'audit' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-light-text dark:text-white">System Security & Audit Trail</h3>
                    <p className="text-xs text-light-subtext dark:text-muted-gray mt-0.5">
                      Compliant with SEC-12: Auditing administrative actions and allocation checks.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {auditLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-3.5 rounded-xl bg-white dark:bg-midnight-card border border-purple-100 dark:border-midnight-border flex items-center justify-between text-xs shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          <span className="text-light-text dark:text-white font-mono">{log.action}</span>
                        </div>
                        <div className="text-light-subtext dark:text-muted-gray font-mono text-[11px]">
                          {log.user} • {log.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
