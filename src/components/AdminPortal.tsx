import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  X, Lock, Shield, LayoutDashboard, Inbox, FolderKanban,
  FileText, CheckCircle2, AlertTriangle, Search,
  ExternalLink, Download, RefreshCw, LogOut, Check, Layers,
  Database, Users, Sparkles, Plus, Trash2, Edit3, Save, Globe,
  Briefcase, Activity, CheckCircle, ArrowLeft, Sun, Moon, ChevronRight,
  Phone, Mail, MapPin, Code, Cpu, Eye, EyeOff, Upload, Image as ImageIcon, Cloud, Loader2
} from 'lucide-react';
import {
  Inquiry, Product, Service, TeamMember,
  PlanRegistrationItem, SiteContent, ProcessStage
} from '../types';
import { PlanPackage } from '../data/plansData';

interface CloudinaryUploaderProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  isUploading: boolean;
  setIsUploading: (val: boolean) => void;
  showToast: (msg: string) => void;
  placeholder?: string;
}

const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({
  label,
  value,
  onChange,
  folder = 'codrix',
  isUploading,
  setIsUploading,
  showToast,
  placeholder = 'https://res.cloudinary.com/... or paste image URL'
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('Image file size exceeds 8MB. Please select an image under 8MB.');
      return;
    }

    setIsUploading(true);
    try {
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await fetch('/api/v1/admin/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Data, folder })
      });

      const data = await res.json();
      if (res.ok && data.success && data.data?.url) {
        onChange(data.data.url);
        showToast('Image uploaded to Cloudinary CDN successfully!');
      } else {
        alert(data.message || 'Image upload failed. Ensure Cloudinary credentials are set in .env / Vercel.');
      }
    } catch (err: any) {
      console.error('Cloudinary upload error:', err);
      alert('Network or server error during image upload. You can also paste an image URL directly.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block font-mono text-light-subtext text-[11px] font-semibold">{label}</label>
        <span className="text-[10px] text-electric-purple font-mono flex items-center gap-1">
          <Cloud className="w-3 h-3" /> Cloudinary CDN
        </span>
      </div>

      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative group w-14 h-14 rounded-xl overflow-hidden border border-purple-300 dark:border-white/20 bg-black/10 flex-shrink-0">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              title="Remove image"
              className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-14 h-14 rounded-xl border border-dashed border-light-border dark:border-midnight-border bg-purple-50/30 dark:bg-white/5 flex items-center justify-center text-light-subtext flex-shrink-0">
            <ImageIcon className="w-5 h-5 opacity-40" />
          </div>
        )}

        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-1.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs focus:border-electric-purple focus:outline-none"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 flex-shrink-0 disabled:opacity-50 transition-all cursor-pointer shadow-sm"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[10px] text-light-subtext font-mono">
            Click Upload to upload from device to Cloudinary, or paste an HTTPS image URL.
          </p>
        </div>
      </div>
    </div>
  );
};

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct?: (id: string) => void;
  onAddProduct?: (product: Product) => void;
  services: Service[];
  onUpdateService: (service: Service) => void;
  onDeleteService?: (id: string) => void;
  onAddService?: (service: Service) => void;
  team?: TeamMember[];
  onUpdateTeamMember?: (member: TeamMember) => void;
  onDeleteTeamMember?: (id: string) => void;
  onAddTeamMember?: (member: TeamMember) => void;
  plans?: PlanPackage[];
  onUpdatePlan?: (plan: PlanPackage) => void;
  onDeletePlan?: (id: string) => void;
  onAddPlan?: (plan: PlanPackage) => void;
  siteContent?: SiteContent;
  onUpdateSiteContent?: (section: keyof SiteContent, data: any) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

type AdminTab =
  | 'overview'
  | 'inquiries'
  | 'registrations'
  | 'portfolio'
  | 'team'
  | 'plans';

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProduct,
  onDeleteProduct,
  onAddProduct,
  services,
  onUpdateService,
  onDeleteService,
  onAddService,
  team = [],
  onUpdateTeamMember,
  onDeleteTeamMember,
  onAddTeamMember,
  plans = [],
  onUpdatePlan,
  onDeletePlan,
  onAddPlan,
  siteContent,
  onUpdateSiteContent,
  isDark = true,
  onToggleTheme
}) => {
  // Session Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('cv_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [loginEmail, setLoginEmail] = useState('admin@codrix.tech');
  const [loginPass, setLoginPass] = useState('Codrix@2026');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Database status state
  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    provider: string;
    host: string;
    database: string;
    counts?: Record<string, number>;
  }>({
    connected: true,
    provider: 'Database',
    host: 'database.cluster',
    database: 'codrix',
  });
  const [isCheckingDb, setIsCheckingDb] = useState(false);

  // Cloudinary media status & upload state
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [cloudinaryStatus, setCloudinaryStatus] = useState<{
    isConfigured: boolean;
    cloudName?: string;
  } | null>(null);

  // Inquiries & Registrations State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiriesFilter, setInquiriesFilter] = useState('All');
  const [inquiriesSearch, setInquiriesSearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const [registrations, setRegistrations] = useState<PlanRegistrationItem[]>([]);
  const [registrationsFilter, setRegistrationsFilter] = useState('All');
  const [registrationsSearch, setRegistrationsSearch] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState<PlanRegistrationItem | null>(null);

  // Save notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Fetch DB Status
  const fetchDbStatus = useCallback(async () => {
    setIsCheckingDb(true);
    try {
      const res = await fetch('/api/v1/admin/status');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setDbStatus(json.data);
        }
      }
    } catch {
      setDbStatus(prev => ({ ...prev, connected: false }));
    } finally {
      setIsCheckingDb(false);
    }
  }, []);

  // Fetch inquiries and registrations
  const fetchInquiries = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/admin/inquiries');
      if (res.ok) {
        const json = await res.json();
        if (json.data) setInquiries(json.data);
      }
    } catch (e) {
      console.warn('Inquiries fetch error', e);
    }
  }, []);

  const fetchRegistrations = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/admin/plan-registrations');
      if (res.ok) {
        const json = await res.json();
        if (json.data) setRegistrations(json.data);
      }
    } catch (e) {
      console.warn('Registrations fetch error', e);
    }
  }, []);

  const fetchCloudinaryStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/admin/cloudinary-status');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setCloudinaryStatus(json.data);
        }
      }
    } catch (e) {
      console.warn('Cloudinary status check error', e);
    }
  }, []);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchDbStatus();
      fetchInquiries();
      fetchRegistrations();
      fetchCloudinaryStatus();
    }
  }, [isOpen, isAuthenticated, fetchDbStatus, fetchInquiries, fetchRegistrations, fetchCloudinaryStatus]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        try {
          sessionStorage.setItem('cv_admin_auth', 'true');
        } catch { }
      } else {
        setLoginError(data.message || 'Invalid administrative credentials');
      }
    } catch {
      // Fallback auth for local resiliency
      if (loginEmail === 'admin@codrix.tech' && loginPass === 'Codrix@2026') {
        setIsAuthenticated(true);
        try {
          sessionStorage.setItem('cv_admin_auth', 'true');
        } catch { }
      } else {
        setLoginError('Invalid credentials. Use admin@codrix.tech / Codrix@2026');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('cv_admin_auth');
    } catch { }
  };

  // Product / Portfolio Management Handlers
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'Enterprise AI & Automation',
    tagline: '',
    subtitle: '',
    impact: 'Sub-200ms latency with 99.98% SLA guarantee',
    metric: '4x Efficiency',
    techStack: ['React 19', 'TypeScript', 'Node.js', 'MongoDB'],
    architecture: 'Microservices & Event-Driven Pipeline',
    previewUrl: 'https://codrix.tech',
    githubUrl: 'https://github.com/codrix-technologies',
    badge: 'LIVE PRODUCTION',
    isVisible: true
  });

  const handleToggleProductVisibility = async (prod: Product) => {
    const newVisibility = prod.isVisible === false ? true : false;
    const updated: Product = { ...prod, isVisible: newVisibility };
    if (onUpdateProduct) onUpdateProduct(updated);
    try {
      await fetch(`/api/v1/admin/products/${prod.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.warn('Atlas update product visibility error:', e);
    }
    showToast(`Project "${prod.name}" is now ${newVisibility ? 'visible on' : 'hidden from'} the website.`);
  };

  const handleCreateProduct = async () => {
    if (!newProduct.name?.trim()) {
      alert('Please enter a project name.');
      return;
    }
    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name.trim(),
      category: newProduct.category || 'Enterprise AI & Automation',
      tagline: newProduct.tagline || newProduct.name,
      subtitle: newProduct.subtitle || '',
      impact: newProduct.impact || 'Enterprise SLA scale',
      metric: newProduct.metric || '4x Scale',
      techStack: newProduct.techStack || ['React', 'TypeScript', 'Node.js'],
      architecture: newProduct.architecture || 'Distributed Microservices',
      previewUrl: newProduct.previewUrl || 'https://codrix.tech',
      image: newProduct.image || newProduct.previewUrl,
      githubUrl: newProduct.githubUrl || 'https://github.com/codrix-technologies',
      badge: newProduct.badge || 'PRODUCTION',
      isVisible: newProduct.isVisible !== false
    };

    try {
      await fetch('/api/v1/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(created)
      });
    } catch (e) {
      console.warn('Atlas save product error:', e);
    }

    if (onAddProduct) onAddProduct(created);
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      category: 'Enterprise AI & Automation',
      tagline: '',
      subtitle: '',
      impact: 'Sub-200ms latency with 99.98% SLA guarantee',
      metric: '4x Efficiency',
      techStack: ['React 19', 'TypeScript', 'Node.js', 'MongoDB'],
      architecture: 'Microservices & Event-Driven Pipeline',
      previewUrl: 'https://codrix.tech',
      image: '',
      githubUrl: 'https://github.com/codrix-technologies',
      badge: 'LIVE PRODUCTION',
      isVisible: true
    });
    showToast(`Project "${created.name}" created & saved.`);
  };

  const handleSaveExistingProduct = async (prod: Product) => {
    const updated = {
      ...prod,
      isVisible: prod.isVisible !== false
    };
    try {
      await fetch(`/api/v1/admin/products/${prod.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.warn('Atlas update product error:', e);
    }
    onUpdateProduct(updated);
    setEditingProduct(null);
    showToast(`Project "${prod.name}" updated.`);
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete project "${name}"?`)) return;
    try {
      await fetch(`/api/v1/admin/products/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Atlas delete product error:', e);
    }
    if (onDeleteProduct) onDeleteProduct(id);
    showToast(`Project "${name}" deleted.`);
  };

  // Team Management Handlers
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [isAddingTeamMember, setIsAddingTeamMember] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState<Partial<TeamMember>>({
    name: '',
    role: 'Principal Engineer',
    initials: 'CE',
    bio: 'Architecting distributed systems and reactive client architectures.',
    linkedin: 'https://linkedin.com',
    photo: '',
    isVisible: true
  });

  const handleToggleTeamMemberVisibility = async (member: TeamMember) => {
    const newVisibility = member.isVisible === false ? true : false;
    const updated: TeamMember = {
      ...member,
      isVisible: newVisibility
    };

    if (onUpdateTeamMember) {
      onUpdateTeamMember(updated);
    }

    try {
      await fetch(`/api/v1/admin/team/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.warn('Atlas update team visibility error:', e);
    }

    showToast(`${member.name} is now ${newVisibility ? 'visible on' : 'hidden from'} the website.`);
  };

  const handleCreateTeamMember = async () => {
    if (!newTeamMember.name?.trim()) {
      alert('Please enter a team member name.');
      return;
    }
    const img = newTeamMember.photo || (newTeamMember as any).avatar || '';
    const desig = newTeamMember.role || (newTeamMember as any).designation || 'Principal Engineer';
    const responsibility = newTeamMember.bio || (newTeamMember as any).primaryResponsibility || 'Architecting distributed systems and reactive client architectures.';

    const created: TeamMember = {
      id: `team-${Date.now()}`,
      name: newTeamMember.name.trim(),
      role: desig,
      designation: desig,
      initials: newTeamMember.initials || newTeamMember.name.slice(0, 2).toUpperCase(),
      photo: img,
      avatar: img,
      bio: responsibility,
      primaryResponsibility: responsibility,
      linkedin: newTeamMember.linkedin || 'https://linkedin.com',
      isVisible: newTeamMember.isVisible !== false
    };

    try {
      await fetch('/api/v1/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(created)
      });
    } catch (e) {
      console.warn('Atlas save team error:', e);
    }

    if (onAddTeamMember) onAddTeamMember(created);
    setIsAddingTeamMember(false);
    setNewTeamMember({
      name: '',
      role: 'Principal Engineer',
      initials: 'CE',
      bio: '',
      linkedin: 'https://linkedin.com',
      photo: '',
      isVisible: true
    });
    showToast(`Team member "${created.name}" added & saved.`);
  };

  const handleSaveExistingTeamMember = async (member: TeamMember) => {
    const img = member.photo || (member as any).avatar || '';
    const desig = member.role || (member as any).designation || 'Principal Engineer';
    const responsibility = member.bio || (member as any).primaryResponsibility || 'Architecting distributed systems and reactive client architectures.';
    const normalizedMember: TeamMember = {
      ...member,
      photo: img,
      avatar: img,
      role: desig,
      designation: desig,
      bio: responsibility,
      primaryResponsibility: responsibility,
      isVisible: member.isVisible !== false
    };

    try {
      await fetch(`/api/v1/admin/team/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalizedMember)
      });
    } catch (e) {
      console.warn('Atlas update team error:', e);
    }
    if (onUpdateTeamMember) onUpdateTeamMember(normalizedMember);
    setEditingTeamMember(null);
    showToast(`Team member "${member.name}" updated.`);
  };

  const handleDeleteTeamMember = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove team member "${name}"?`)) return;
    try {
      await fetch(`/api/v1/admin/team/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Atlas delete team error:', e);
    }
    if (onDeleteTeamMember) onDeleteTeamMember(id);
    showToast(`Team member "${name}" removed.`);
  };

  // Plans Management Handlers
  const [editingPlan, setEditingPlan] = useState<PlanPackage | null>(null);
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [newPlan, setNewPlan] = useState<Partial<PlanPackage>>({
    name: '',
    category: 'single-page',
    tagline: 'Modern, High-Speed Web Presence',
    description: 'Bespoke design, responsive layout, and lightning-fast edge delivery.',
    priceINR: 19999,
    priceUSD: 249,
    billingCycle: 'One-Time Project',
    deliverables: ['Custom Responsive Design', 'Zero-Downtime Deployment', 'Full Source Handover'],
    popular: false,
    domainIncluded: true,
    techStack: ['React', 'Tailwind CSS', 'Vite'],
    isVisible: true
  });

  const handleTogglePlanVisibility = async (plan: PlanPackage) => {
    const newVisibility = plan.isVisible === false ? true : false;
    const updated: PlanPackage = { ...plan, isVisible: newVisibility };
    if (onUpdatePlan) onUpdatePlan(updated);
    try {
      await fetch(`/api/v1/admin/plans/${plan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.warn('Atlas update plan visibility error:', e);
    }
    showToast(`Plan "${plan.name}" is now ${newVisibility ? 'visible on' : 'hidden from'} the website.`);
  };

  const handleCreatePlan = async () => {
    if (!newPlan.name?.trim()) {
      alert('Please enter a plan name.');
      return;
    }
    const created: PlanPackage = {
      id: `plan-${Date.now()}`,
      name: newPlan.name.trim(),
      category: newPlan.category as any || 'single-page',
      tagline: newPlan.tagline || '',
      description: newPlan.description || '',
      priceINR: Number(newPlan.priceINR) || 19999,
      priceUSD: Number(newPlan.priceUSD) || 249,
      billingPeriod: (newPlan.billingPeriod || 'One-Time') as any,
      billingCycle: newPlan.billingCycle || 'One-Time Project',
      turnaroundTime: newPlan.turnaroundTime || '5-7 Days',
      features: newPlan.features || newPlan.deliverables || ['Architectural Handover'],
      deliverables: newPlan.deliverables || ['Architectural Handover'],
      popular: Boolean(newPlan.popular),
      isPopular: Boolean(newPlan.popular || newPlan.isPopular),
      domainIncluded: Boolean(newPlan.domainIncluded),
      techStack: newPlan.techStack || ['React', 'Node.js'],
      idealFor: newPlan.idealFor || 'Startups & Growing Businesses',
      isVisible: newPlan.isVisible !== false
    };

    try {
      await fetch('/api/v1/admin/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(created)
      });
    } catch (e) {
      console.warn('Atlas save plan error:', e);
    }

    if (onAddPlan) onAddPlan(created);
    setIsAddingPlan(false);
    setNewPlan({
      name: '',
      category: 'single-page',
      tagline: 'Modern, High-Speed Web Presence',
      description: 'Bespoke design, responsive layout, and lightning-fast edge delivery.',
      priceINR: 19999,
      priceUSD: 249,
      billingCycle: 'One-Time Project',
      deliverables: ['Custom Responsive Design', 'Zero-Downtime Deployment', 'Full Source Handover'],
      popular: false,
      domainIncluded: true,
      techStack: ['React', 'Tailwind CSS', 'Vite'],
      isVisible: true
    });
    showToast(`Plan "${created.name}" created.`);
  };

  const handleSaveExistingPlan = async (plan: PlanPackage) => {
    const updated = {
      ...plan,
      isVisible: plan.isVisible !== false
    };
    try {
      await fetch(`/api/v1/admin/plans/${plan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.warn('Atlas update plan error:', e);
    }
    if (onUpdatePlan) onUpdatePlan(updated);
    setEditingPlan(null);
    showToast(`Plan "${plan.name}" updated.`);
  };

  const handleDeletePlan = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete plan "${name}"?`)) return;
    try {
      await fetch(`/api/v1/admin/plans/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Atlas delete plan error:', e);
    }
    if (onDeletePlan) onDeletePlan(id);
    showToast(`Plan "${name}" deleted.`);
  };

  // Inquiry Status Handler
  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/v1/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus as any } : i));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(prev => prev ? { ...prev, status: newStatus as any } : null);
      }
      showToast(`Inquiry status updated to ${newStatus}`);
    } catch (e) {
      console.warn('Atlas inquiry update error:', e);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await fetch(`/api/v1/admin/inquiries/${id}`, { method: 'DELETE' });
      setInquiries(prev => prev.filter(i => i.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
      showToast('Inquiry removed from database.');
    } catch (e) {
      console.warn('Atlas inquiry delete error:', e);
    }
  };

  // Plan Registration Status Handler
  const handleUpdateRegistrationStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/v1/admin/plan-registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
      if (selectedRegistration && selectedRegistration.id === id) {
        setSelectedRegistration(prev => prev ? { ...prev, status: newStatus } : null);
      }
      showToast(`Registration status updated to ${newStatus}`);
    } catch (e) {
      console.warn('Atlas registration update error:', e);
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    try {
      await fetch(`/api/v1/admin/plan-registrations/${id}`, { method: 'DELETE' });
      setRegistrations(prev => prev.filter(r => r.id !== id));
      if (selectedRegistration?.id === id) setSelectedRegistration(null);
      showToast('Registration deleted.');
    } catch (e) {
      console.warn('Atlas registration delete error:', e);
    }
  };

  if (!isOpen) return null;

  // -------------------------------------------------------------
  // LOGIN SCREEN VIEW
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-midnight flex items-center justify-center p-4 overflow-y-auto">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,44,245,0.25),rgba(255,255,255,0))] pointer-events-none" />

        <div className="w-full max-w-md bg-white/95 dark:bg-midnight-800/95 backdrop-blur-2xl rounded-3xl border border-light-border dark:border-midnight-border/80 p-8 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2.5 mb-1">
              <img
                src="/hero-ribbon.png"
                alt="Codrix Ribbon"
                className="w-10 h-10 object-contain drop-shadow-[0_2px_14px_rgba(124,44,245,0.45)]"
              />
              <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-light-text via-electric-purple to-deep-violet dark:from-white dark:via-lavender-light dark:to-electric-light bg-clip-text text-transparent tracking-tight">
                Codrix
              </span>
            </div>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-light-subtext dark:text-muted-gray mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-purple-50/50 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-light-text dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-purple"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-light-subtext dark:text-muted-gray mb-1.5">
                Secure Key
              </label>
              <input
                type="password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-purple-50/50 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-light-text dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-purple"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-electric-purple to-purple-600 text-white font-semibold text-sm tracking-wide shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-light-border dark:border-midnight-border/60">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs text-light-subtext dark:text-muted-gray hover:text-electric-purple dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // DEDICATED FULL EXECUTIVE DASHBOARD VIEW
  // -------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-[100] bg-light dark:bg-midnight text-light-text dark:text-white flex flex-col overflow-hidden transition-colors">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[150] bg-electric-purple text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in text-sm font-medium border border-purple-400/40">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="h-16 px-4 sm:px-6 lg:px-8 border-b border-light-border dark:border-midnight-border/80 bg-white/90 dark:bg-midnight-900/90 backdrop-blur-xl flex items-center justify-between flex-shrink-0 z-20">
        <div
          onClick={onClose}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
          title="Return to Website"
        >
          <img
            src="/hero-ribbon.png"
            alt="Codrix"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-[0_2px_10px_rgba(124,44,245,0.35)] transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-light-text via-electric-purple to-deep-violet dark:from-white dark:via-lavender-light dark:to-electric-light bg-clip-text text-transparent tracking-tight whitespace-nowrap">
            Codrix
          </span>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme toggle */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5 transition-colors"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* Return to website button */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-light-border dark:border-midnight-border text-xs font-medium text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Website</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">

        {/* Navigation Sidebar */}
        <aside className="w-64 lg:w-72 border-r border-light-border dark:border-midnight-border/80 bg-white/70 dark:bg-midnight-900/60 flex flex-col flex-shrink-0 overflow-y-auto">
          <div className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeTab === 'overview'
                ? 'bg-electric-purple text-white shadow-md shadow-purple-600/25'
                : 'text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Command Overview</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeTab === 'inquiries'
                ? 'bg-electric-purple text-white shadow-md shadow-purple-600/25'
                : 'text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4" />
                <span>Project Inquiries</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/20 dark:bg-white/10">
                {inquiries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('registrations')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeTab === 'registrations'
                ? 'bg-electric-purple text-white shadow-md shadow-purple-600/25'
                : 'text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4" />
                <span>Plan Registrations</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/20 dark:bg-white/10">
                {registrations.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeTab === 'portfolio'
                ? 'bg-electric-purple text-white shadow-md shadow-purple-600/25'
                : 'text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderKanban className="w-4 h-4" />
                <span>Flagship Projects</span>
              </div>
              <span className="text-[10px] opacity-75 font-mono">{products.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeTab === 'team'
                ? 'bg-electric-purple text-white shadow-md shadow-purple-600/25'
                : 'text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Leadership & Team</span>
              </div>
              <span className="text-[10px] opacity-75 font-mono">{team.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('plans')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeTab === 'plans'
                ? 'bg-electric-purple text-white shadow-md shadow-purple-600/25'
                : 'text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4" />
                <span>Plans & Packages</span>
              </div>
              <span className="text-[10px] opacity-75 font-mono">{plans.length}</span>
            </button>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-purple-50/20 dark:bg-midnight-950/40">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-light-text dark:text-white">
                    Command Overview
                  </h1>
                  <p className="text-xs text-light-subtext dark:text-muted-gray">
                    Manage and control all content, inquiries, and plans across the website.
                  </p>
                </div>

                {/* Status KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-light-subtext dark:text-muted-gray">INQUIRIES</span>
                      <Inbox className="w-4 h-4 text-electric-purple" />
                    </div>
                    <div className="text-3xl font-extrabold mt-2 text-light-text dark:text-white">
                      {inquiries.length}
                    </div>
                    <div className="text-[11px] text-emerald-500 font-medium mt-1">
                      {inquiries.filter(i => i.status === 'New').length} pending review
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-light-subtext dark:text-muted-gray">PLAN REGISTRATIONS</span>
                      <FileText className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-3xl font-extrabold mt-2 text-light-text dark:text-white">
                      {registrations.length}
                    </div>
                    <div className="text-[11px] text-purple-500 font-medium mt-1">
                      From /plan packages
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-light-subtext dark:text-muted-gray">LEADERSHIP & TEAM</span>
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-extrabold mt-2 text-light-text dark:text-white">
                      {team.length}
                    </div>
                    <div className="text-[11px] text-light-subtext dark:text-muted-gray mt-1">
                      Founding leaders & stakeholders
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-light-subtext dark:text-muted-gray">FLAGSHIP PROJECTS</span>
                      <FolderKanban className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-3xl font-extrabold mt-2 text-light-text dark:text-white">
                      {products.length}
                    </div>
                    <div className="text-[11px] text-light-subtext dark:text-muted-gray mt-1">
                      Showcased in portfolio
                    </div>
                  </div>
                </div>

                {/* Cloudinary Media Assets CDN Status */}
                <div className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cloudinaryStatus?.isConfigured
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      }`}>
                      <Cloud className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-light-text dark:text-white">
                          Cloudinary Media CDN Engine
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${cloudinaryStatus?.isConfigured
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          }`}>
                          {cloudinaryStatus?.isConfigured ? 'Active & Ready' : 'Configuration Pending'}
                        </span>
                      </div>
                      <p className="text-xs text-light-subtext dark:text-muted-gray mt-0.5">
                        {cloudinaryStatus?.isConfigured
                          ? `Connected to Cloudinary account (${cloudinaryStatus.cloudName}). Direct image uploads and auto-optimization active for Leaders, Projects, and Stages.`
                          : 'Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env and Vercel Environment Variables.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={fetchCloudinaryStatus}
                      className="px-3 py-1.5 rounded-xl border border-light-border dark:border-midnight-border text-xs font-medium hover:bg-purple-50 dark:hover:bg-white/5 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Ping Cloudinary</span>
                    </button>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setActiveTab('inquiries')}
                    className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border hover:border-purple-500/40 cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-light-text dark:text-white group-hover:text-electric-purple transition-colors">
                        Manage Client Inquiries
                      </span>
                      <Inbox className="w-4 h-4 text-light-subtext group-hover:text-electric-purple" />
                    </div>
                    <p className="text-xs text-light-subtext dark:text-muted-gray">
                      Review qualified project inquiries submitted from the website with timeline, budget, and description.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab('plans')}
                    className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border hover:border-purple-500/40 cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-light-text dark:text-white group-hover:text-electric-purple transition-colors">
                        Customize Plans & Pricing
                      </span>
                      <Briefcase className="w-4 h-4 text-light-subtext group-hover:text-electric-purple" />
                    </div>
                    <p className="text-xs text-light-subtext dark:text-muted-gray">
                      Update INR/USD pricing, domain inclusion, and deliverables displayed on the homepage and /plan page.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-xl font-bold text-light-text dark:text-white">Client Project Inquiries</h1>
                    <p className="text-xs text-light-subtext dark:text-muted-gray">
                      Qualified leads received through the "Let's Build Together" proposal form.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search name, company, email..."
                      value={inquiriesSearch}
                      onChange={(e) => setInquiriesSearch(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border text-xs focus:ring-1 focus:ring-electric-purple"
                    />
                    <select
                      value={inquiriesFilter}
                      onChange={(e) => setInquiriesFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border text-xs"
                    >
                      <option value="All">All Statuses</option>
                      <option value="New">New</option>
                      <option value="Review">Review</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                {inquiries.length === 0 ? (
                  <div className="p-12 text-center bg-white dark:bg-midnight-800 rounded-3xl border border-light-border dark:border-midnight-border text-light-subtext dark:text-muted-gray text-xs">
                    No inquiries recorded yet. Submissions from the public inquiry form appear here instantly.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries
                      .filter(i => {
                        if (inquiriesFilter !== 'All' && i.status !== inquiriesFilter) return false;
                        if (inquiriesSearch.trim()) {
                          const q = inquiriesSearch.toLowerCase();
                          return (
                            i.fullName.toLowerCase().includes(q) ||
                            i.email.toLowerCase().includes(q) ||
                            (i.company || '').toLowerCase().includes(q)
                          );
                        }
                        return true;
                      })
                      .map((inq) => (
                        <div
                          key={inq.id}
                          className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border/80 shadow-sm space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-light-border dark:border-midnight-border/60 pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-sm text-light-text dark:text-white">{inq.fullName}</h3>
                                {inq.company && (
                                  <span className="text-xs text-light-subtext dark:text-muted-gray">
                                    • {inq.company} ({inq.country || 'Global'})
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-light-subtext dark:text-muted-gray">
                                <span className="font-mono text-purple-600 dark:text-lavender-glow">{inq.email}</span>
                                {inq.contact && <span>• {inq.contact}</span>}
                                <span>• {new Date(inq.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={inq.status}
                                onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-midnight-900 border border-purple-200 dark:border-midnight-border text-electric-purple dark:text-lavender-glow"
                              >
                                <option value="New">New</option>
                                <option value="Review">In Review</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Closed">Closed</option>
                              </select>
                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                                title="Delete inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div>
                              <span className="text-light-subtext dark:text-muted-gray">Project Type:</span>
                              <p className="font-medium text-light-text dark:text-white mt-0.5">{inq.projectType}</p>
                            </div>
                            <div>
                              <span className="text-light-subtext dark:text-muted-gray">Budget Allocation:</span>
                              <p className="font-medium text-purple-600 dark:text-lavender-light mt-0.5">{inq.budgetRange}</p>
                            </div>
                            <div>
                              <span className="text-light-subtext dark:text-muted-gray">Target Timeline:</span>
                              <p className="font-medium text-light-text dark:text-white mt-0.5">{inq.timeline}</p>
                            </div>
                          </div>

                          {inq.description && (
                            <div className="p-3 rounded-xl bg-purple-50/40 dark:bg-midnight-900/60 text-xs text-light-text dark:text-muted-gray border border-light-border dark:border-midnight-border/40">
                              <span className="font-semibold block text-light-subtext dark:text-white mb-1">Architecture Scope:</span>
                              {inq.description}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: PLAN REGISTRATIONS */}
            {activeTab === 'registrations' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-xl font-bold text-light-text dark:text-white">Plan Registrations</h1>
                    <p className="text-xs text-light-subtext dark:text-muted-gray">
                      Clients who clicked "Register" on specific engineering packages on /plan.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search client, email..."
                      value={registrationsSearch}
                      onChange={(e) => setRegistrationsSearch(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border text-xs focus:ring-1 focus:ring-electric-purple"
                    />
                  </div>
                </div>

                {registrations.length === 0 ? (
                  <div className="p-12 text-center bg-white dark:bg-midnight-800 rounded-3xl border border-light-border dark:border-midnight-border text-light-subtext dark:text-muted-gray text-xs">
                    No plan registrations yet. When clients register for a package on /plan, their submissions will be recorded here.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {registrations
                      .filter(r => {
                        if (registrationsSearch.trim()) {
                          const q = registrationsSearch.toLowerCase();
                          return (
                            r.fullName.toLowerCase().includes(q) ||
                            r.email.toLowerCase().includes(q) ||
                            r.planName.toLowerCase().includes(q)
                          );
                        }
                        return true;
                      })
                      .map((reg) => (
                        <div
                          key={reg.id}
                          className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border shadow-sm space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-light-border dark:border-midnight-border/60 pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-sm text-light-text dark:text-white">{reg.fullName}</h3>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-electric-purple dark:text-lavender-glow border border-purple-500/20">
                                  {reg.planName}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-light-subtext dark:text-muted-gray">
                                <span>{reg.email}</span>
                                <span>• {reg.contact}</span>
                                <span>• {new Date(reg.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={reg.status}
                                onChange={(e) => handleUpdateRegistrationStatus(reg.id, e.target.value)}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-midnight-900 border border-purple-200 dark:border-midnight-border text-electric-purple dark:text-lavender-glow"
                              >
                                <option value="Pending Review">Pending Review</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                              </select>
                              <button
                                onClick={() => handleDeleteRegistration(reg.id)}
                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            <div>
                              <span className="text-light-subtext dark:text-muted-gray">Domain Status:</span>
                              <p className="font-medium text-light-text dark:text-white mt-0.5">{reg.domainOption || 'Standard'}</p>
                            </div>
                            <div>
                              <span className="text-light-subtext dark:text-muted-gray">Billing Period:</span>
                              <p className="font-medium text-light-text dark:text-white mt-0.5">{reg.billingPeriod || 'One-Time'}</p>
                            </div>
                            <div>
                              <span className="text-light-subtext dark:text-muted-gray">Estimated Price:</span>
                              <p className="font-medium text-purple-600 dark:text-lavender-light mt-0.5">{reg.estimatedPrice || 'Standard Package'}</p>
                            </div>
                            <div>
                              <span className="text-light-subtext dark:text-muted-gray">Company:</span>
                              <p className="font-medium text-light-text dark:text-white mt-0.5">{reg.company || 'Founder / Stealth'}</p>
                            </div>
                          </div>

                          {reg.notes && (
                            <div className="p-3 rounded-xl bg-purple-50/40 dark:bg-midnight-900/60 text-xs text-light-text dark:text-muted-gray border border-light-border dark:border-midnight-border/40">
                              <span className="font-semibold block text-light-subtext dark:text-white mb-1">Client Notes:</span>
                              {reg.notes}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: PORTFOLIO / PROJECTS */}
            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-light-text dark:text-white">Flagship Projects / Portfolio</h1>
                    <p className="text-xs text-light-subtext dark:text-muted-gray">
                      Add, update, or remove portfolio applications and system architecture case studies.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingProduct(true)}
                    className="px-3.5 py-2 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                {/* Add Project Form */}
                {isAddingProduct && (
                  <div className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border-2 border-electric-purple shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-sm text-light-text dark:text-white">Create New Portfolio Project</h2>
                      <button onClick={() => setIsAddingProduct(false)} className="text-light-subtext hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-mono text-light-subtext mb-1">Project Name</label>
                        <input
                          type="text"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          placeholder="e.g. ChatLeads AI"
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-light-subtext mb-1">Category</label>
                        <input
                          type="text"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                          placeholder="e.g. AI & Automation"
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-mono text-light-subtext mb-1">Impact Metric</label>
                        <input
                          type="text"
                          value={newProduct.metric}
                          onChange={(e) => setNewProduct({ ...newProduct, metric: e.target.value })}
                          placeholder="e.g. 4.2x Faster"
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-light-subtext mb-1">Badge</label>
                        <input
                          type="text"
                          value={newProduct.badge}
                          onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                          placeholder="e.g. LIVE PRODUCTION"
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        />
                      </div>
                    </div>

                    <div>
                      <CloudinaryUploader
                        label="Project Showcase Image / Banner"
                        value={newProduct.previewUrl || (newProduct as any).image || ''}
                        folder="codrix/projects"
                        isUploading={isUploadingImage}
                        setIsUploading={setIsUploadingImage}
                        showToast={showToast}
                        placeholder="https://res.cloudinary.com/... or click Upload"
                        onChange={(url) => setNewProduct({ ...newProduct, previewUrl: url, image: url } as any)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-light-subtext mb-1">Subtitle / Summary</label>
                      <textarea
                        rows={2}
                        value={newProduct.subtitle}
                        onChange={(e) => setNewProduct({ ...newProduct, subtitle: e.target.value })}
                        placeholder="Core problem solved and technical delivery..."
                        className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 font-mono text-xs text-light-text dark:text-white cursor-pointer select-none pt-1">
                        <input
                          type="checkbox"
                          checked={newProduct.isVisible !== false}
                          onChange={(e) => setNewProduct({ ...newProduct, isVisible: e.target.checked })}
                          className="w-4 h-4 rounded text-electric-purple focus:ring-electric-purple cursor-pointer"
                        />
                        <span>Display on website (Visible to public)</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsAddingProduct(false)}
                        className="px-3 py-1.5 rounded-xl border border-light-border dark:border-midnight-border text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateProduct}
                        className="px-4 py-1.5 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:opacity-90 cursor-pointer"
                      >
                        Save Project to Database
                      </button>
                    </div>
                  </div>
                )}

                {/* Projects List */}
                <div className="space-y-3">
                  {products.map((prod) => {
                    const isVisible = prod.isVisible !== false;
                    return (
                      <div
                        key={prod.id}
                        className={`p-5 rounded-2xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                          isVisible
                            ? 'bg-white dark:bg-midnight-800 border-light-border dark:border-midnight-border'
                            : 'bg-white/60 dark:bg-midnight-800/60 border-dashed border-amber-400/60 dark:border-amber-500/30 opacity-75'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {((prod as any).image || prod.previewUrl) ? (
                            <div className="w-16 h-14 rounded-xl overflow-hidden border border-purple-200 dark:border-white/10 bg-black flex-shrink-0">
                              <img src={(prod as any).image || prod.previewUrl} alt={prod.name} className={`w-full h-full object-cover ${!isVisible ? 'grayscale' : ''}`} />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-purple-50 dark:bg-midnight-900 border border-light-border dark:border-midnight-border flex items-center justify-center flex-shrink-0 text-electric-purple">
                              <FolderKanban className="w-6 h-6 opacity-60" />
                            </div>
                          )}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-sm text-light-text dark:text-white">{prod.name}</h3>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-electric-purple dark:text-lavender-glow border border-purple-500/20">
                                {prod.category}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold flex items-center gap-1 ${
                                isVisible
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isVisible ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                {isVisible ? 'Live on Site' : 'Hidden'}
                              </span>
                              {prod.metric && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                  {prod.metric}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-light-subtext dark:text-muted-gray line-clamp-2">
                              {prod.subtitle || prod.tagline}
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {prod.techStack?.slice(0, 4).map((tech, idx) => (
                                <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-50 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-light-subtext dark:text-muted-gray">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {/* Project Visibility Toggle Button */}
                          <button
                            type="button"
                            onClick={() => handleToggleProductVisibility(prod)}
                            title={isVisible ? "Currently visible on website. Click to hide." : "Currently hidden from website. Click to make visible."}
                            className={`p-1.5 rounded-lg border transition-all text-xs flex items-center justify-center cursor-pointer ${
                              isVisible
                                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25'
                                : 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25'
                            }`}
                          >
                            {isVisible ? (
                              <Eye className="w-3.5 h-3.5" />
                            ) : (
                              <EyeOff className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => setEditingProduct(prod)}
                            className="p-1.5 rounded-lg border border-light-border dark:border-midnight-border text-light-subtext hover:text-white text-xs flex items-center gap-1 cursor-pointer"
                            title="Edit project details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id, prod.name)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 text-xs flex items-center gap-1 cursor-pointer"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Edit Product Modal */}
                {editingProduct && (
                  <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white dark:bg-midnight-800 rounded-3xl p-6 border border-light-border dark:border-midnight-border shadow-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-bold text-sm text-light-text dark:text-white">Edit Project</h2>
                        <button onClick={() => setEditingProduct(null)} className="text-light-subtext cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Project Name</label>
                          <input
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Category</label>
                          <input
                            type="text"
                            value={editingProduct.category}
                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Metric</label>
                          <input
                            type="text"
                            value={editingProduct.metric || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, metric: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          />
                        </div>
                        <div>
                          <CloudinaryUploader
                            label="Project Showcase Image / Banner"
                            value={(editingProduct as any).image || editingProduct.previewUrl || ''}
                            folder="codrix/projects"
                            isUploading={isUploadingImage}
                            setIsUploading={setIsUploadingImage}
                            showToast={showToast}
                            placeholder="https://res.cloudinary.com/... or click Upload"
                            onChange={(url) => setEditingProduct({ ...editingProduct, previewUrl: url, image: url } as any)}
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Subtitle</label>
                          <textarea
                            rows={3}
                            value={editingProduct.subtitle || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 font-mono text-xs text-light-text dark:text-white cursor-pointer select-none pt-1">
                            <input
                              type="checkbox"
                              checked={editingProduct.isVisible !== false}
                              onChange={(e) => setEditingProduct({ ...editingProduct, isVisible: e.target.checked })}
                              className="w-4 h-4 rounded text-electric-purple focus:ring-electric-purple cursor-pointer"
                            />
                            <span>Display on website (Visible to public)</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="px-3 py-1.5 rounded-xl border border-light-border dark:border-midnight-border text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveExistingProduct(editingProduct)}
                          className="px-4 py-1.5 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: TEAM & LEADERSHIP */}
            {activeTab === 'team' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-light-text dark:text-white">Leadership & Stakeholders</h1>
                    <p className="text-xs text-light-subtext dark:text-muted-gray">
                      Add, update, or remove executive directors and founding partners.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingTeamMember(true)}
                    className="px-3.5 py-2 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Member</span>
                  </button>
                </div>

                {/* Add Member Form */}
                {isAddingTeamMember && (
                  <div className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border-2 border-electric-purple shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-sm text-light-text dark:text-white">Add Executive Team Member</h2>
                      <button onClick={() => setIsAddingTeamMember(false)} className="text-light-subtext hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-mono text-light-subtext mb-1">Full Name</label>
                        <input
                          type="text"
                          value={newTeamMember.name}
                          onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                          placeholder="e.g. Lakshay"
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-light-subtext mb-1">Role / Title</label>
                        <input
                          type="text"
                          value={newTeamMember.role}
                          onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                          placeholder="e.g. Chief Executive Officer & Architect"
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-mono text-light-subtext mb-1">Initials (2 Letters)</label>
                        <input
                          type="text"
                          maxLength={3}
                          value={newTeamMember.initials}
                          onChange={(e) => setNewTeamMember({ ...newTeamMember, initials: e.target.value.toUpperCase() })}
                          placeholder="LK"
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-light-subtext mb-1">LinkedIn Profile</label>
                        <input
                          type="url"
                          value={newTeamMember.linkedin}
                          onChange={(e) => setNewTeamMember({ ...newTeamMember, linkedin: e.target.value })}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        />
                      </div>
                    </div>

                    <div>
                      <CloudinaryUploader
                        label="Leader Headshot / Photograph"
                        value={newTeamMember.photo || ''}
                        folder="codrix/leadership"
                        isUploading={isUploadingImage}
                        setIsUploading={setIsUploadingImage}
                        showToast={showToast}
                        placeholder="https://res.cloudinary.com/... or click Upload"
                        onChange={(url) => setNewTeamMember({ ...newTeamMember, photo: url })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-light-subtext mb-1">Bio / Background</label>
                      <textarea
                        rows={2}
                        value={newTeamMember.bio}
                        onChange={(e) => setNewTeamMember({ ...newTeamMember, bio: e.target.value })}
                        placeholder="Leadership focus and technical background..."
                        className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 font-mono text-xs text-light-text dark:text-white cursor-pointer select-none pt-1">
                        <input
                          type="checkbox"
                          checked={newTeamMember.isVisible !== false}
                          onChange={(e) => setNewTeamMember({ ...newTeamMember, isVisible: e.target.checked })}
                          className="w-4 h-4 rounded text-electric-purple focus:ring-electric-purple cursor-pointer"
                        />
                        <span>Display on website (Visible to public)</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsAddingTeamMember(false)}
                        className="px-3 py-1.5 rounded-xl border border-light-border dark:border-midnight-border text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateTeamMember}
                        className="px-4 py-1.5 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:opacity-90 cursor-pointer"
                      >
                        Save Team Member
                      </button>
                    </div>
                  </div>
                )}

                {/* Team Members List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {team.map((member) => {
                    const isVisible = member.isVisible !== false;
                    return (
                      <div
                        key={member.id}
                        className={`p-5 rounded-2xl border shadow-sm flex items-start justify-between gap-3 transition-all ${
                          isVisible
                            ? 'bg-white dark:bg-midnight-800 border-light-border dark:border-midnight-border'
                            : 'bg-white/60 dark:bg-midnight-800/60 border-dashed border-amber-400/60 dark:border-amber-500/30 opacity-75'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {member.photo || member.avatar ? (
                            <img
                              src={member.photo || member.avatar}
                              alt={member.name}
                              className={`w-10 h-10 rounded-xl object-cover shadow-md flex-shrink-0 border border-purple-200 dark:border-white/10 ${!isVisible ? 'grayscale' : ''}`}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electric-purple to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-md flex-shrink-0">
                              {member.initials}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-sm text-light-text dark:text-white">{member.name}</h3>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold flex items-center gap-1 ${
                                isVisible
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isVisible ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                {isVisible ? 'Live on Site' : 'Hidden'}
                              </span>
                            </div>
                            <p className="text-xs text-electric-purple dark:text-lavender-glow mt-0.5">{member.role}</p>
                            <p className="text-xs text-light-subtext dark:text-muted-gray mt-1 line-clamp-2">{member.bio}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {/* Visibility Eye Button Toggle */}
                          <button
                            type="button"
                            onClick={() => handleToggleTeamMemberVisibility(member)}
                            title={isVisible ? "Currently visible on website. Click to hide." : "Currently hidden from website. Click to make visible."}
                            className={`p-1.5 rounded-lg border transition-all text-xs flex items-center justify-center cursor-pointer ${
                              isVisible
                                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25'
                                : 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25'
                            }`}
                          >
                            {isVisible ? (
                              <Eye className="w-3.5 h-3.5" />
                            ) : (
                              <EyeOff className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => setEditingTeamMember(member)}
                            className="p-1.5 rounded-lg border border-light-border dark:border-midnight-border text-light-subtext hover:text-white text-xs cursor-pointer"
                            title="Edit member details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTeamMember(member.id, member.name)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 text-xs cursor-pointer"
                            title="Delete member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Edit Team Modal */}
                {editingTeamMember && (
                  <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white dark:bg-midnight-800 rounded-3xl p-6 border border-light-border dark:border-midnight-border shadow-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-bold text-sm text-light-text dark:text-white">Edit Team Member</h2>
                        <button onClick={() => setEditingTeamMember(null)} className="text-light-subtext cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Name</label>
                          <input
                            type="text"
                            value={editingTeamMember.name}
                            onChange={(e) => setEditingTeamMember({ ...editingTeamMember, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Role</label>
                          <input
                            type="text"
                            value={editingTeamMember.role}
                            onChange={(e) => setEditingTeamMember({ ...editingTeamMember, role: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          />
                        </div>
                        <div>
                          <CloudinaryUploader
                            label="Leader Headshot / Photograph"
                            value={editingTeamMember.photo || editingTeamMember.avatar || ''}
                            folder="codrix/leadership"
                            isUploading={isUploadingImage}
                            setIsUploading={setIsUploadingImage}
                            showToast={showToast}
                            placeholder="https://res.cloudinary.com/... or click Upload"
                            onChange={(url) => setEditingTeamMember({ ...editingTeamMember, photo: url, avatar: url })}
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Bio</label>
                          <textarea
                            rows={3}
                            value={editingTeamMember.bio}
                            onChange={(e) => setEditingTeamMember({ ...editingTeamMember, bio: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 font-mono text-xs text-light-text dark:text-white cursor-pointer select-none pt-1">
                            <input
                              type="checkbox"
                              checked={editingTeamMember.isVisible !== false}
                              onChange={(e) => setEditingTeamMember({ ...editingTeamMember, isVisible: e.target.checked })}
                              className="w-4 h-4 rounded text-electric-purple focus:ring-electric-purple cursor-pointer"
                            />
                            <span>Display on website (Visible to public)</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingTeamMember(null)}
                          className="px-3 py-1.5 rounded-xl border border-light-border dark:border-midnight-border text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveExistingTeamMember(editingTeamMember)}
                          className="px-4 py-1.5 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: PLANS & PACKAGES */}
            {activeTab === 'plans' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-light-text dark:text-white">Engineering Plans & Packages</h1>
                    <p className="text-xs text-light-subtext dark:text-muted-gray">
                      Add, update, or remove plans shown on the homepage and the full /plan showcase page.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingPlan(true)}
                    className="px-3.5 py-2 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Plan</span>
                  </button>
                </div>

                {/* Add Plan Form */}
                {isAddingPlan && (
                  <div className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border-2 border-electric-purple shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-sm text-light-text dark:text-white">Create New Plan Package</h2>
                      <button onClick={() => setIsAddingPlan(false)} className="text-light-subtext hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-mono text-light-subtext mb-1">Plan Name</label>
                        <input
                          type="text"
                          value={newPlan.name}
                          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                          placeholder="e.g. Single Page Launchpad"
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-light-subtext mb-1">Category</label>
                        <select
                          value={newPlan.category}
                          onChange={(e) => setNewPlan({ ...newPlan, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        >
                          <option value="single-page">Single Page Websites</option>
                          <option value="web-apps">Web Applications</option>
                          <option value="softwares">Custom Softwares & ERP</option>
                          <option value="yearly-retainer">Yearly Retainers & AMC</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block font-mono text-light-subtext mb-1">Price (₹ INR)</label>
                        <input
                          type="number"
                          value={newPlan.priceINR}
                          onChange={(e) => setNewPlan({ ...newPlan, priceINR: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-light-subtext mb-1">Price ($ USD)</label>
                        <input
                          type="number"
                          value={newPlan.priceUSD}
                          onChange={(e) => setNewPlan({ ...newPlan, priceUSD: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-light-subtext mb-1">Free Domain Included?</label>
                        <select
                          value={newPlan.domainIncluded ? 'yes' : 'no'}
                          onChange={(e) => setNewPlan({ ...newPlan, domainIncluded: e.target.value === 'yes' })}
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        >
                          <option value="yes">Yes (Domain Included)</option>
                          <option value="no">No (Without Domain)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 font-mono text-xs text-light-text dark:text-white cursor-pointer select-none pt-1">
                        <input
                          type="checkbox"
                          checked={newPlan.isVisible !== false}
                          onChange={(e) => setNewPlan({ ...newPlan, isVisible: e.target.checked })}
                          className="w-4 h-4 rounded text-electric-purple focus:ring-electric-purple cursor-pointer"
                        />
                        <span>Display on website (Visible to public)</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsAddingPlan(false)}
                        className="px-3 py-1.5 rounded-xl border border-light-border dark:border-midnight-border text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreatePlan}
                        className="px-4 py-1.5 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:opacity-90 cursor-pointer"
                      >
                        Publish Plan to Database
                      </button>
                    </div>
                  </div>
                )}

                {/* Plans List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {plans.map((p) => {
                    const isVisible = p.isVisible !== false;
                    return (
                      <div
                        key={p.id}
                        className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between space-y-3 transition-all ${
                          isVisible
                            ? 'bg-white dark:bg-midnight-800 border-light-border dark:border-midnight-border'
                            : 'bg-white/60 dark:bg-midnight-800/60 border-dashed border-amber-400/60 dark:border-amber-500/30 opacity-75'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-electric-purple border border-purple-500/20">
                                {p.category}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold flex items-center gap-1 ${
                                isVisible
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isVisible ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                {isVisible ? 'Live on Site' : 'Hidden'}
                              </span>
                            </div>
                            {p.domainIncluded && (
                              <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
                                <Globe className="w-3 h-3" />
                                Domain Incl.
                              </span>
                            )}
                          </div>

                          <h3 className="font-bold text-sm text-light-text dark:text-white mt-2">{p.name}</h3>
                          <p className="text-xs text-light-subtext dark:text-muted-gray mt-1 line-clamp-2">{p.description}</p>
                        </div>

                        <div className="pt-2 border-t border-light-border dark:border-midnight-border/60 flex items-center justify-between">
                          <div>
                            <span className="text-sm font-extrabold text-electric-purple dark:text-lavender-glow">
                              ₹{p.priceINR?.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-light-subtext dark:text-muted-gray ml-1.5">
                              / ${p.priceUSD?.toLocaleString('en-US')}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {/* Plan Visibility Eye Button Toggle */}
                            <button
                              type="button"
                              onClick={() => handleTogglePlanVisibility(p)}
                              title={isVisible ? "Currently visible on website. Click to hide." : "Currently hidden from website. Click to make visible."}
                              className={`p-1.5 rounded-lg border transition-all text-xs flex items-center justify-center cursor-pointer ${
                                isVisible
                                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25'
                                  : 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25'
                              }`}
                            >
                              {isVisible ? (
                                <Eye className="w-3.5 h-3.5" />
                              ) : (
                                <EyeOff className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => setEditingPlan(p)}
                              className="p-1.5 rounded-lg border border-light-border dark:border-midnight-border text-light-subtext hover:text-white text-xs cursor-pointer"
                              title="Edit plan details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePlan(p.id, p.name)}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 text-xs cursor-pointer"
                              title="Delete plan"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Edit Plan Modal */}
                {editingPlan && (
                  <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white dark:bg-midnight-800 rounded-3xl p-6 border border-light-border dark:border-midnight-border shadow-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-bold text-sm text-light-text dark:text-white">Edit Plan Package</h2>
                        <button onClick={() => setEditingPlan(null)} className="text-light-subtext cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Plan Name</label>
                          <input
                            type="text"
                            value={editingPlan.name}
                            onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Price (₹ INR)</label>
                            <input
                              type="number"
                              value={editingPlan.priceINR}
                              onChange={(e) => setEditingPlan({ ...editingPlan, priceINR: Number(e.target.value) })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Price ($ USD)</label>
                            <input
                              type="number"
                              value={editingPlan.priceUSD}
                              onChange={(e) => setEditingPlan({ ...editingPlan, priceUSD: Number(e.target.value) })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Description</label>
                          <textarea
                            rows={3}
                            value={editingPlan.description}
                            onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 font-mono text-xs text-light-text dark:text-white cursor-pointer select-none pt-1">
                            <input
                              type="checkbox"
                              checked={editingPlan.isVisible !== false}
                              onChange={(e) => setEditingPlan({ ...editingPlan, isVisible: e.target.checked })}
                              className="w-4 h-4 rounded text-electric-purple focus:ring-electric-purple cursor-pointer"
                            />
                            <span>Display on website (Visible to public)</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingPlan(null)}
                          className="px-3 py-1.5 rounded-xl border border-light-border dark:border-midnight-border text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveExistingPlan(editingPlan)}
                          className="px-4 py-1.5 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </main>
      </div>

    </div>
  );
};
