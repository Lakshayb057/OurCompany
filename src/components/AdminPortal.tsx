import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  X, Lock, Shield, LayoutDashboard, Inbox, FolderKanban,
  FileText, CheckCircle2, AlertTriangle, Search,
  ExternalLink, Download, RefreshCw, LogOut, Check, Layers,
  Database, Users, Sparkles, Plus, Trash2, Edit3, Save, Globe,
  Briefcase, Activity, CheckCircle, ArrowLeft, Sun, Moon, ChevronRight,
  Phone, Mail, MapPin, Code, Cpu, Eye, EyeOff, Upload, Image as ImageIcon, Cloud, Loader2,
  Video, Film, Play, Settings, Linkedin, Instagram, Building2
} from 'lucide-react';
import {
  Inquiry, Product, Service, TeamMember,
  PlanRegistrationItem, PlatformAdoption, SiteContent, ProcessStage
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
  mediaKind?: 'image' | 'video' | 'any';
}

const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({
  label,
  value,
  onChange,
  folder = 'codrix',
  isUploading,
  setIsUploading,
  showToast,
  placeholder,
  mediaKind = 'image'
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isVideo = mediaKind === 'video' || Boolean(value && (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(value) || value.includes('/video/upload/')));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideoFile = file.type.startsWith('video/') || mediaKind === 'video';
    const maxSizeMB = isVideoFile ? 40 : 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`${isVideoFile ? 'Video' : 'Image'} file size exceeds ${maxSizeMB}MB. Please select a smaller file or paste a direct CDN URL.`);
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
        body: JSON.stringify({ 
          image: base64Data, 
          folder: folder || (isVideoFile ? 'codrix/projects/videos' : 'codrix/projects')
        })
      });

      const data = await res.json();
      if (res.ok && data.success && data.data?.url) {
        onChange(data.data.url);
        showToast(`${isVideoFile ? 'Video' : 'Image'} uploaded to Cloudinary CDN successfully!`);
      } else {
        alert(data.message || 'Media upload failed. Ensure Cloudinary credentials are set in .env / Vercel.');
      }
    } catch (err: any) {
      console.error('Cloudinary upload error:', err);
      alert('Network or server error during media upload. You can also paste an HTTPS URL directly.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const defaultPlaceholder = mediaKind === 'video' 
    ? 'https://res.cloudinary.com/... or paste .mp4/.webm video URL'
    : 'https://res.cloudinary.com/... or paste image URL';

  const acceptPattern = mediaKind === 'video'
    ? 'video/mp4,video/webm,video/ogg,video/quicktime'
    : mediaKind === 'any'
    ? 'image/*,video/mp4,video/webm,video/ogg,video/quicktime'
    : 'image/*';

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
            {isVideo ? (
              <>
                <video src={value} muted autoPlay loop playsInline className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 p-0.5 rounded bg-black/60 text-white">
                  <Film className="w-2.5 h-2.5" />
                </span>
              </>
            ) : (
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            )}
            <button
              type="button"
              onClick={() => onChange('')}
              title={`Remove ${isVideo ? 'video' : 'image'}`}
              className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-14 h-14 rounded-xl border border-dashed border-light-border dark:border-midnight-border bg-purple-50/30 dark:bg-white/5 flex items-center justify-center text-light-subtext flex-shrink-0">
            {mediaKind === 'video' ? (
              <Video className="w-5 h-5 opacity-40 text-electric-purple" />
            ) : (
              <ImageIcon className="w-5 h-5 opacity-40" />
            )}
          </div>
        )}

        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || defaultPlaceholder}
              className="flex-1 px-3 py-1.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs focus:border-electric-purple focus:outline-none"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptPattern}
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
                  <span>Upload {mediaKind === 'video' ? 'Video' : 'Media'}</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[10px] text-light-subtext font-mono">
            {mediaKind === 'video' 
              ? 'Upload .mp4 / .webm video (up to 40MB) or paste video CDN URL.'
              : 'Click Upload to upload from device to Cloudinary, or paste an HTTPS URL.'}
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
  | 'adoptions'
  | 'registrations'
  | 'portfolio'
  | 'team'
  | 'plans'
  | 'settings';

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
  const [leadSourceFilter, setLeadSourceFilter] = useState<'all' | 'inquiries' | 'registrations'>('all');

  const [registrations, setRegistrations] = useState<PlanRegistrationItem[]>([]);
  const [registrationsFilter, setRegistrationsFilter] = useState('All');
  const [registrationsSearch, setRegistrationsSearch] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState<PlanRegistrationItem | null>(null);

  // Platform Adoptions State
  const [adoptions, setAdoptions] = useState<PlatformAdoption[]>([]);
  const [adoptionsFilter, setAdoptionsFilter] = useState('All');
  const [adoptionsPlatformFilter, setAdoptionsPlatformFilter] = useState('All');
  const [adoptionsSearch, setAdoptionsSearch] = useState('');
  const [selectedAdoption, setSelectedAdoption] = useState<PlatformAdoption | null>(null);
  const [adoptionNotes, setAdoptionNotes] = useState('');

  // Site Settings & Socials State
  const [settingsForm, setSettingsForm] = useState({
    companyName: siteContent?.siteSettings?.companyName || 'Codrix',
    legalHeadquarters: siteContent?.siteSettings?.legalHeadquarters || 'Corporate Headquarters: India',
    contactEmail: siteContent?.siteSettings?.contactEmail || 'codrixsoftwares@gmail.com',
    contactPhone: siteContent?.siteSettings?.contactPhone || '+91 99999 99999',
    copyrightNotice: siteContent?.siteSettings?.copyrightNotice || 'All rights reserved.',
    linkedinUrl: siteContent?.siteSettings?.linkedinUrl || 'https://linkedin.com/company/codrix',
    instagramUrl: siteContent?.siteSettings?.instagramUrl || 'https://instagram.com/codrix.tech',
    gmailUrl: siteContent?.siteSettings?.gmailUrl || 'mailto:codrixsoftwares@gmail.com',
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  useEffect(() => {
    if (siteContent?.siteSettings) {
      setSettingsForm({
        companyName: siteContent.siteSettings.companyName || 'Codrix',
        legalHeadquarters: siteContent.siteSettings.legalHeadquarters || 'Corporate Headquarters: India',
        contactEmail: siteContent.siteSettings.contactEmail || 'codrixsoftwares@gmail.com',
        contactPhone: siteContent.siteSettings.contactPhone || '+91 99999 99999',
        copyrightNotice: siteContent.siteSettings.copyrightNotice || 'All rights reserved.',
        linkedinUrl: siteContent.siteSettings.linkedinUrl || 'https://linkedin.com/company/codrix',
        instagramUrl: siteContent.siteSettings.instagramUrl || 'https://instagram.com/codrix.tech',
        gmailUrl: siteContent.siteSettings.gmailUrl || 'mailto:codrixsoftwares@gmail.com',
      });
    }
  }, [siteContent]);

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

  const fetchAdoptions = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/admin/platform-adoptions');
      if (res.ok) {
        const json = await res.json();
        if (json.data) setAdoptions(json.data);
      }
    } catch (e) {
      console.warn('Platform adoptions fetch error', e);
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
      fetchAdoptions();
      fetchCloudinaryStatus();
    }
  }, [isOpen, isAuthenticated, fetchDbStatus, fetchInquiries, fetchRegistrations, fetchAdoptions, fetchCloudinaryStatus]);

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
    image: '',
    videoUrl: '',
    video: '',
    mediaType: 'both',
    imageAlignment: 'center',
    videoAlignment: 'cover',
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
      previewUrl: newProduct.previewUrl || newProduct.image || 'https://codrix.tech',
      image: newProduct.image || newProduct.previewUrl || '',
      videoUrl: newProduct.videoUrl || (newProduct as any).video || '',
      video: newProduct.videoUrl || (newProduct as any).video || '',
      mediaType: newProduct.mediaType || 'both',
      imageAlignment: newProduct.imageAlignment || 'center',
      videoAlignment: newProduct.videoAlignment || 'cover',
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
      videoUrl: '',
      video: '',
      mediaType: 'both',
      imageAlignment: 'center',
      videoAlignment: 'cover',
      githubUrl: 'https://github.com/codrix-technologies',
      badge: 'LIVE PRODUCTION',
      isVisible: true
    });
    showToast(`Project "${created.name}" created & saved.`);
  };

  const handleSaveExistingProduct = async (prod: Product) => {
    const updated = {
      ...prod,
      image: (prod as any).image || prod.previewUrl || '',
      previewUrl: prod.previewUrl || (prod as any).image || '',
      videoUrl: prod.videoUrl || (prod as any).video || '',
      video: prod.videoUrl || (prod as any).video || '',
      mediaType: prod.mediaType || 'both',
      imageAlignment: prod.imageAlignment || 'center',
      videoAlignment: prod.videoAlignment || 'cover',
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
    const initials = member.initials || (member.name ? member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'CE');
    const linkedin = member.linkedin || '';
    const normalizedMember: TeamMember = {
      ...member,
      initials,
      linkedin,
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
    category: 'website',
    tagline: '',
    badge: 'Popular',
    idealFor: '',
    priceINR: 17999,
    priceUSD: 249,
    startingPrice: false,
    billingPeriod: 'One-Time',
    billingCycle: '',
    turnaroundTime: '5–7 business days',
    domainIncluded: true,
    domainNote: 'Includes standard domain allowance up to ₹2,000 for 1 year.',
    description: '',
    isPopular: false,
    isBestValue: false,
    isVisible: true
  });
  const [newPlanFeaturesText, setNewPlanFeaturesText] = useState('');
  const [newPlanDeliverablesText, setNewPlanDeliverablesText] = useState('');
  const [newPlanTechStackText, setNewPlanTechStackText] = useState('React, TypeScript, Tailwind CSS, Vite');

  const [editPlanFeaturesText, setEditPlanFeaturesText] = useState('');
  const [editPlanDeliverablesText, setEditPlanDeliverablesText] = useState('');
  const [editPlanTechStackText, setEditPlanTechStackText] = useState('');

  const openAddPlan = () => {
    setNewPlan({
      name: '',
      category: 'website',
      tagline: '',
      badge: 'Popular',
      idealFor: '',
      priceINR: 17999,
      priceUSD: 249,
      startingPrice: false,
      billingPeriod: 'One-Time',
      billingCycle: '',
      turnaroundTime: '5–7 business days',
      domainIncluded: true,
      domainNote: 'Includes standard domain allowance up to ₹2,000 for 1 year.',
      description: '',
      isPopular: false,
      isBestValue: false,
      isVisible: true
    });
    setNewPlanFeaturesText('Custom single-page or multi-page responsive design\nModern UI with mobile optimization\nWhatsApp and contact inquiry integration\nFree hosting for 1 year with SSL\nComplete source code handover');
    setNewPlanDeliverablesText('Production deployed application\n1-Year domain and hosting setup\n30 Days complimentary bug-fix support');
    setNewPlanTechStackText('React, TypeScript, Tailwind CSS, Vite');
    setIsAddingPlan(true);
  };

  const openEditPlan = (plan: PlanPackage) => {
    setEditingPlan({ ...plan });
    setEditPlanFeaturesText((plan.features || []).join('\n'));
    setEditPlanDeliverablesText((plan.deliverables || []).join('\n'));
    setEditPlanTechStackText((plan.techStack || []).join(', '));
  };

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
    const features = newPlanFeaturesText.split('\n').map(s => s.trim()).filter(Boolean);
    const deliverables = newPlanDeliverablesText.split('\n').map(s => s.trim()).filter(Boolean);
    const techStack = newPlanTechStackText.split(',').map(s => s.trim()).filter(Boolean);

    const created: PlanPackage = {
      id: `plan-${Date.now()}`,
      name: newPlan.name.trim(),
      category: (newPlan.category as any) || 'website',
      tagline: newPlan.tagline?.trim() || '',
      badge: newPlan.badge?.trim() || '',
      idealFor: newPlan.idealFor?.trim() || '',
      description: newPlan.description?.trim() || '',
      priceINR: Number(newPlan.priceINR) || 0,
      priceUSD: Number(newPlan.priceUSD) || 0,
      startingPrice: Boolean(newPlan.startingPrice),
      billingPeriod: (newPlan.billingPeriod || 'One-Time') as any,
      billingCycle: newPlan.billingCycle?.trim() || '',
      turnaroundTime: newPlan.turnaroundTime?.trim() || '5–7 business days',
      domainIncluded: Boolean(newPlan.domainIncluded),
      domainNote: newPlan.domainNote?.trim() || '',
      features: features.length ? features : ['Complete Architectural Handover'],
      deliverables: deliverables.length ? deliverables : ['Production Deployment & Source Code'],
      techStack: techStack.length ? techStack : ['React', 'TypeScript', 'Tailwind CSS'],
      isPopular: Boolean(newPlan.isPopular),
      isBestValue: Boolean(newPlan.isBestValue),
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
    showToast(`Plan "${created.name}" published to database.`);
  };

  const handleSaveExistingPlan = async () => {
    if (!editingPlan || !editingPlan.name?.trim()) {
      alert('Please enter a valid plan name.');
      return;
    }
    const features = editPlanFeaturesText.split('\n').map(s => s.trim()).filter(Boolean);
    const deliverables = editPlanDeliverablesText.split('\n').map(s => s.trim()).filter(Boolean);
    const techStack = editPlanTechStackText.split(',').map(s => s.trim()).filter(Boolean);

    const updated: PlanPackage = {
      ...editingPlan,
      name: editingPlan.name.trim(),
      tagline: editingPlan.tagline?.trim() || '',
      badge: editingPlan.badge?.trim() || '',
      idealFor: editingPlan.idealFor?.trim() || '',
      description: editingPlan.description?.trim() || '',
      priceINR: Number(editingPlan.priceINR) || 0,
      priceUSD: Number(editingPlan.priceUSD) || 0,
      startingPrice: Boolean(editingPlan.startingPrice),
      billingPeriod: (editingPlan.billingPeriod || 'One-Time') as any,
      billingCycle: editingPlan.billingCycle?.trim() || '',
      turnaroundTime: editingPlan.turnaroundTime?.trim() || '',
      domainIncluded: Boolean(editingPlan.domainIncluded),
      domainNote: editingPlan.domainNote?.trim() || '',
      features: features.length ? features : (editingPlan.features || []),
      deliverables: deliverables.length ? deliverables : (editingPlan.deliverables || []),
      techStack: techStack.length ? techStack : (editingPlan.techStack || []),
      isPopular: Boolean(editingPlan.isPopular),
      isBestValue: Boolean(editingPlan.isBestValue),
      isVisible: editingPlan.isVisible !== false
    };

    try {
      await fetch(`/api/v1/admin/plans/${updated.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.warn('Atlas update plan error:', e);
    }

    if (onUpdatePlan) onUpdatePlan(updated);
    setEditingPlan(null);
    showToast(`Plan "${updated.name}" updated successfully.`);
  };

  const handleDeletePlan = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete plan "${name}"? This action removes it from the website and database.`)) return;
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

  // Platform Adoption Handlers
  const handleUpdateAdoptionStatus = async (id: string, newStatus: string, notes?: string) => {
    try {
      await fetch(`/api/v1/admin/platform-adoptions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes })
      });
      setAdoptions(prev => prev.map(a => a.id === id ? { ...a, status: newStatus, ...(notes !== undefined ? { notes } : {}) } : a));
      if (selectedAdoption && selectedAdoption.id === id) {
        setSelectedAdoption(prev => prev ? { ...prev, status: newStatus, ...(notes !== undefined ? { notes } : {}) } : null);
      }
      showToast(`Platform adoption status updated to ${newStatus}`);
    } catch (e) {
      console.warn('Atlas adoption update error:', e);
    }
  };

  const handleDeleteAdoption = async (id: string) => {
    if (!confirm('Are you sure you want to delete this platform adoption application?')) return;
    try {
      await fetch(`/api/v1/admin/platform-adoptions/${id}`, { method: 'DELETE' });
      setAdoptions(prev => prev.filter(a => a.id !== id));
      if (selectedAdoption?.id === id) setSelectedAdoption(null);
      showToast('Platform adoption application deleted.');
    } catch (e) {
      console.warn('Atlas adoption delete error:', e);
    }
  };

  // Site Settings Handler
  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSavingSettings(true);
    try {
      const res = await fetch('/api/v1/admin/content/siteSettings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        if (onUpdateSiteContent) {
          onUpdateSiteContent('siteSettings', settingsForm);
        }
        showToast('Site settings & social media links updated!');
      } else {
        showToast(json.message || 'Failed to update settings.');
      }
    } catch (err: any) {
      console.error('Settings save error:', err);
      showToast('Network error saving settings.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  const renderPlanRegistrationCard = (reg: PlanRegistrationItem) => (
    <div
      key={reg.id}
      className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border shadow-sm space-y-4"
    >
      {/* Top Header: Client Name, Company, Contact, Date, Status Selector & Delete */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-light-border dark:border-midnight-border/60 pb-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-base text-light-text dark:text-white">{reg.fullName}</h3>
            {reg.company && (
              <span className="text-xs text-light-subtext dark:text-muted-gray">
                • {reg.company}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-500/10 text-electric-purple dark:text-lavender-glow border border-purple-500/20">
              Plan Booking
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-light-subtext dark:text-muted-gray font-mono">
            <span className="text-purple-600 dark:text-lavender-glow font-medium">{reg.email}</span>
            <span>•</span>
            <span>{reg.contact}</span>
            <span>•</span>
            <span>{new Date(reg.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={reg.status}
            onChange={(e) => handleUpdateRegistrationStatus(reg.id, e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-midnight-900 border border-purple-200 dark:border-midnight-border text-electric-purple dark:text-lavender-glow focus:ring-1 focus:ring-electric-purple cursor-pointer"
          >
            <option value="Pending Review">Pending Review</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={() => handleDeleteRegistration(reg.id)}
            className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
            title="Delete registration"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Package Specification Showcase */}
      <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-midnight-900/80 border border-purple-200/60 dark:border-midnight-border/70 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-electric-purple text-white">
              {reg.category ? reg.category.replace('-', ' ') : 'SINGLE PAGE'}
            </span>
            {(reg.badge || 'Fast Delivery') && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {reg.badge || 'Fast Delivery'}
              </span>
            )}
          </div>
          <span className="text-xs font-extrabold text-purple-700 dark:text-lavender-light">
            {reg.estimatedPrice || '₹14,999'} • {reg.billingPeriod || 'One-Time'} {reg.turnaroundTime ? `• ${reg.turnaroundTime}` : '• 3 - 5 Business Days'}
          </span>
        </div>

        <h4 className="font-extrabold text-sm sm:text-base text-light-text dark:text-white">
          [{reg.category ? reg.category.toUpperCase().replace('-', ' ') : 'SINGLE-PAGE'}] {reg.planName} — {reg.estimatedPrice || '₹14,999'} ({reg.billingPeriod || 'One-Time'})
        </h4>
        {reg.tagline && (
          <p className="text-xs text-light-subtext dark:text-muted-gray">
            {reg.tagline}
          </p>
        )}
      </div>

      {/* Client Parameters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-light-50 dark:bg-midnight-900/50 border border-light-border/60 dark:border-midnight-border/40">
          <span className="text-light-subtext dark:text-muted-gray block mb-1 font-medium">Domain Requirement Preference:</span>
          <p className="font-semibold text-light-text dark:text-white">
            {reg.domainOption === 'with-domain' || reg.domainOption === 'With Domain'
              ? 'With Domain — Codrix registers & configures 1-year domain'
              : reg.domainOption === 'without-domain' || reg.domainOption === 'Without Domain'
              ? 'Without Domain — I already own a custom domain to link'
              : reg.domainOption === 'need-advice' || reg.domainOption === 'Need Domain Advice'
              ? 'Need Domain Advice — Help me choose the ideal domain TLD'
              : (reg.domainOption || 'Standard Configuration')}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-light-50 dark:bg-midnight-900/50 border border-light-border/60 dark:border-midnight-border/40">
          <span className="text-light-subtext dark:text-muted-gray block mb-1 font-medium">Company / Organization:</span>
          <p className="font-semibold text-light-text dark:text-white">
            {reg.company || 'Not Specified (Individual / Stealth)'}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-light-50 dark:bg-midnight-900/50 border border-light-border/60 dark:border-midnight-border/40">
          <span className="text-light-subtext dark:text-muted-gray block mb-1 font-medium">Delivery & Execution:</span>
          <p className="font-semibold text-purple-600 dark:text-lavender-glow">
            {reg.billingPeriod || 'One-Time'} • {reg.turnaroundTime || '3 - 5 Business Days'}
          </p>
        </div>
      </div>

      {/* Project Notes */}
      {reg.notes && (
        <div className="p-3.5 rounded-xl bg-light-50 dark:bg-midnight-900/60 text-xs text-light-text dark:text-muted-gray border border-light-border dark:border-midnight-border/50">
          <span className="font-bold block text-light-text dark:text-white mb-1">Project Notes, Custom Features or Deadlines:</span>
          <p className="leading-relaxed">{reg.notes}</p>
        </div>
      )}

      {/* Guarantees & Protections Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-light-subtext dark:text-muted-gray font-mono">
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
          <Shield className="w-3.5 h-3.5" />
          Strict NDA Protected
        </span>
        <span>•</span>
        <span className="text-purple-600 dark:text-lavender-glow font-semibold">100% Full Source IP Transfer</span>
        <span>•</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Zero Hidden Fees</span>
      </div>
    </div>
  );

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
                src="/hero-ribbon.webp"
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
            src="/hero-ribbon.webp"
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
              onClick={() => setActiveTab('adoptions')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeTab === 'adoptions'
                ? 'bg-electric-purple text-white shadow-md shadow-purple-600/25'
                : 'text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Platform Adoptions</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                adoptions.some(a => a.status === 'New')
                  ? 'bg-amber-400 text-black shadow-sm shadow-amber-400/40'
                  : 'bg-white/20 dark:bg-white/10'
              }`}>
                {adoptions.length}
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

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeTab === 'settings'
                ? 'bg-electric-purple text-white shadow-md shadow-purple-600/25'
                : 'text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-purple-400" />
                <span>Site & Social Settings</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

                  <div
                    onClick={() => setActiveTab('adoptions')}
                    className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border shadow-sm cursor-pointer hover:border-purple-500/50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-light-subtext dark:text-muted-gray">PLATFORM ADOPTIONS</span>
                      <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-3xl font-extrabold mt-2 text-light-text dark:text-white">
                      {adoptions.length}
                    </div>
                    <div className="text-[11px] text-amber-500 font-medium mt-1">
                      {adoptions.filter(a => a.status === 'New').length} pending tie-up specs
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
            {activeTab === 'inquiries' && (() => {
              const filteredInquiries = inquiries.filter(i => {
                if (inquiriesFilter !== 'All' && i.status !== inquiriesFilter) return false;
                if (inquiriesSearch.trim()) {
                  const q = inquiriesSearch.toLowerCase();
                  return (
                    i.fullName.toLowerCase().includes(q) ||
                    i.email.toLowerCase().includes(q) ||
                    (i.company || '').toLowerCase().includes(q) ||
                    (i.projectType || '').toLowerCase().includes(q)
                  );
                }
                return true;
              });

              const filteredRegistrations = registrations.filter(r => {
                if (inquiriesFilter !== 'All') {
                  if (inquiriesFilter === 'New' && r.status !== 'Pending Review' && r.status !== 'New') return false;
                  if (inquiriesFilter === 'Contacted' && r.status !== 'Contacted') return false;
                  if (inquiriesFilter === 'Closed' && r.status !== 'Completed' && r.status !== 'Closed') return false;
                }
                if (inquiriesSearch.trim()) {
                  const q = inquiriesSearch.toLowerCase();
                  return (
                    r.fullName.toLowerCase().includes(q) ||
                    r.email.toLowerCase().includes(q) ||
                    r.planName.toLowerCase().includes(q) ||
                    (r.company || '').toLowerCase().includes(q) ||
                    (r.category || '').toLowerCase().includes(q)
                  );
                }
                return true;
              });

              const totalVisible = (leadSourceFilter !== 'registrations' ? filteredInquiries.length : 0) +
                                   (leadSourceFilter !== 'inquiries' ? filteredRegistrations.length : 0);

              return (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h1 className="text-xl font-bold text-light-text dark:text-white">Client Project Inquiries</h1>
                      <p className="text-xs text-light-subtext dark:text-muted-gray">
                        Real-time client proposals and package bookings recorded in the database.
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
                        <option value="New">New / Pending</option>
                        <option value="Review">In Review</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed / Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Channel Filter Toggle */}
                  <div className="flex items-center gap-2 p-1 bg-white/60 dark:bg-midnight-900/60 rounded-xl border border-light-border dark:border-midnight-border/80 w-fit">
                    <button
                      onClick={() => setLeadSourceFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        leadSourceFilter === 'all'
                          ? 'bg-electric-purple text-white shadow-sm'
                          : 'text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white'
                      }`}
                    >
                      All Inquiries & Bookings ({inquiries.length + registrations.length})
                    </button>
                    <button
                      onClick={() => setLeadSourceFilter('inquiries')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        leadSourceFilter === 'inquiries'
                          ? 'bg-electric-purple text-white shadow-sm'
                          : 'text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white'
                      }`}
                    >
                      Direct Proposals ({inquiries.length})
                    </button>
                    <button
                      onClick={() => setLeadSourceFilter('registrations')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        leadSourceFilter === 'registrations'
                          ? 'bg-electric-purple text-white shadow-sm'
                          : 'text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white'
                      }`}
                    >
                      Plan Bookings ({registrations.length})
                    </button>
                  </div>

                  {totalVisible === 0 ? (
                    <div className="p-12 text-center bg-white dark:bg-midnight-800 rounded-3xl border border-light-border dark:border-midnight-border text-light-subtext dark:text-muted-gray text-xs">
                      No matching inquiries or package bookings found.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Render Plan Registration Bookings */}
                      {leadSourceFilter !== 'inquiries' &&
                        filteredRegistrations.map((reg) => renderPlanRegistrationCard(reg))}

                      {/* Render Direct Proposal Inquiries */}
                      {leadSourceFilter !== 'registrations' &&
                        filteredInquiries.map((inq) => (
                          <div
                            key={inq.id}
                            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border/80 shadow-sm space-y-4"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-light-border dark:border-midnight-border/60 pb-3">
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="font-bold text-base text-light-text dark:text-white">{inq.fullName}</h3>
                                  {inq.company && (
                                    <span className="text-xs text-light-subtext dark:text-muted-gray">
                                      • {inq.company} ({inq.country || 'Global'})
                                    </span>
                                  )}
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                    Direct Proposal
                                  </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-light-subtext dark:text-muted-gray font-mono">
                                  <span className="text-purple-600 dark:text-lavender-glow font-medium">{inq.email}</span>
                                  {inq.contact && <span>• {inq.contact}</span>}
                                  <span>• {new Date(inq.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <select
                                  value={inq.status}
                                  onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-midnight-900 border border-purple-200 dark:border-midnight-border text-electric-purple dark:text-lavender-glow focus:ring-1 focus:ring-electric-purple cursor-pointer"
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
                              <div className="p-3 rounded-xl bg-light-50 dark:bg-midnight-900/50 border border-light-border/60 dark:border-midnight-border/40">
                                <span className="text-light-subtext dark:text-muted-gray block mb-1 font-medium">Project Type:</span>
                                <p className="font-semibold text-light-text dark:text-white mt-0.5">{inq.projectType}</p>
                              </div>
                              <div className="p-3 rounded-xl bg-light-50 dark:bg-midnight-900/50 border border-light-border/60 dark:border-midnight-border/40">
                                <span className="text-light-subtext dark:text-muted-gray block mb-1 font-medium">Budget Allocation:</span>
                                <p className="font-semibold text-purple-600 dark:text-lavender-light mt-0.5">{inq.budgetRange}</p>
                              </div>
                              <div className="p-3 rounded-xl bg-light-50 dark:bg-midnight-900/50 border border-light-border/60 dark:border-midnight-border/40">
                                <span className="text-light-subtext dark:text-muted-gray block mb-1 font-medium">Target Timeline:</span>
                                <p className="font-semibold text-light-text dark:text-white mt-0.5">{inq.timeline}</p>
                              </div>
                            </div>

                            {inq.description && (
                              <div className="p-3.5 rounded-xl bg-light-50 dark:bg-midnight-900/60 text-xs text-light-text dark:text-muted-gray border border-light-border dark:border-midnight-border/50">
                                <span className="font-bold block text-light-text dark:text-white mb-1">Architecture Scope:</span>
                                <p className="leading-relaxed">{inq.description}</p>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* TAB: PLATFORM ADOPTIONS */}
            {activeTab === 'adoptions' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-bold text-light-text dark:text-white">Platform Adoption Applications</h1>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        {adoptions.length} Requests
                      </span>
                    </div>
                    <p className="text-xs text-light-subtext dark:text-muted-gray">
                      Clients & organizations requesting turnkey deployment, white-label licensing, or corporate tie-ups for UniVerse, ChatLeads AI, Nexus CRM, or CampXChange.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-light-subtext dark:text-muted-gray" />
                      <input
                        type="text"
                        placeholder="Search applicant, company, usecases..."
                        value={adoptionsSearch}
                        onChange={(e) => setAdoptionsSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border text-xs focus:ring-1 focus:ring-electric-purple text-light-text dark:text-white"
                      />
                    </div>

                    <select
                      value={adoptionsPlatformFilter}
                      onChange={(e) => setAdoptionsPlatformFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border text-xs text-light-text dark:text-white"
                    >
                      <option value="All">All Platforms</option>
                      <option value="UniVerse">UniVerse</option>
                      <option value="ChatLeads AI">ChatLeads AI</option>
                      <option value="Nexus CRM">Nexus CRM</option>
                      <option value="CampXChange">CampXChange</option>
                    </select>

                    <select
                      value={adoptionsFilter}
                      onChange={(e) => setAdoptionsFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border text-xs text-light-text dark:text-white"
                    >
                      <option value="All">All Statuses</option>
                      <option value="New">New</option>
                      <option value="In Review">In Review</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Converted">Converted</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>

                {/* KPI mini-cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border">
                    <span className="text-[10px] font-mono text-light-subtext dark:text-muted-gray block">TOTAL ADOPTIONS</span>
                    <span className="text-xl font-bold text-light-text dark:text-white">{adoptions.length}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border">
                    <span className="text-[10px] font-mono text-amber-500 block">NEW / PENDING</span>
                    <span className="text-xl font-bold text-amber-500">{adoptions.filter(a => a.status === 'New').length}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border">
                    <span className="text-[10px] font-mono text-blue-500 block">IN REVIEW</span>
                    <span className="text-xl font-bold text-blue-500">{adoptions.filter(a => a.status === 'In Review').length}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border">
                    <span className="text-[10px] font-mono text-emerald-500 block">CONVERTED / SIGNED</span>
                    <span className="text-xl font-bold text-emerald-500">{adoptions.filter(a => a.status === 'Converted').length}</span>
                  </div>
                </div>

                {adoptions.length === 0 ? (
                  <div className="p-12 text-center bg-white dark:bg-midnight-800 rounded-3xl border border-light-border dark:border-midnight-border text-light-subtext dark:text-muted-gray text-xs space-y-2">
                    <Sparkles className="w-8 h-8 mx-auto text-electric-purple/40" />
                    <p className="font-semibold text-sm text-light-text dark:text-white">No platform adoptions yet.</p>
                    <p>When clients click "Adopt This Platform" on /services and submit their deployment requirements, their data will sync here in real-time.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {adoptions
                      .filter(a => {
                        if (adoptionsFilter !== 'All' && a.status !== adoptionsFilter) return false;
                        if (adoptionsPlatformFilter !== 'All' && !a.platformName.toLowerCase().includes(adoptionsPlatformFilter.toLowerCase())) return false;
                        if (adoptionsSearch.trim()) {
                          const q = adoptionsSearch.toLowerCase();
                          return (
                            a.fullName.toLowerCase().includes(q) ||
                            a.email.toLowerCase().includes(q) ||
                            a.contact.toLowerCase().includes(q) ||
                            a.companyName.toLowerCase().includes(q) ||
                            (a.companyContact || '').toLowerCase().includes(q) ||
                            a.platformName.toLowerCase().includes(q) ||
                            a.usecases.toLowerCase().includes(q) ||
                            a.requirements.toLowerCase().includes(q)
                          );
                        }
                        return true;
                      })
                      .map((adopt) => (
                        <div
                          key={adopt.id}
                          className="p-5 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border shadow-sm space-y-4 hover:border-purple-300 dark:hover:border-midnight-border/90 transition-all"
                        >
                          {/* Card Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-light-border dark:border-midnight-border/60 pb-3">
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-gradient-to-r from-electric-purple to-deep-violet text-white shadow-sm shadow-purple-500/20">
                                  {adopt.platformName}
                                </span>
                                <h3 className="font-bold text-sm text-light-text dark:text-white">
                                  {adopt.fullName}
                                </h3>
                                <span className="text-xs text-light-subtext dark:text-muted-gray">
                                  from <strong className="text-light-text dark:text-white">{adopt.companyName}</strong>
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-light-subtext dark:text-muted-gray">
                                <a href={`mailto:${adopt.email}`} className="hover:text-electric-purple flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-electric-purple" />
                                  <span>{adopt.email}</span>
                                </a>
                                <a href={`tel:${adopt.contact}`} className="hover:text-electric-purple flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-electric-purple" />
                                  <span>{adopt.contact}</span>
                                </a>
                                {adopt.companyContact && (
                                  <span className="flex items-center gap-1">
                                    <Building2 className="w-3 h-3 text-electric-purple" />
                                    <span>HQ Contact: {adopt.companyContact}</span>
                                  </span>
                                )}
                                <span>• Submitted: {new Date(adopt.createdAt).toLocaleString()}</span>
                              </div>
                            </div>

                            {/* Status Selector & Actions */}
                            <div className="flex items-center gap-2 self-start sm:self-center">
                              <select
                                value={adopt.status}
                                onChange={(e) => handleUpdateAdoptionStatus(adopt.id, e.target.value)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                                  adopt.status === 'New'
                                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                                    : adopt.status === 'In Review'
                                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-500'
                                    : adopt.status === 'Contacted'
                                    ? 'bg-purple-500/10 border-purple-500/30 text-electric-purple'
                                    : adopt.status === 'Converted'
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                                    : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="In Review">In Review</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Converted">Converted</option>
                                <option value="Archived">Archived</option>
                              </select>

                              <button
                                onClick={() => {
                                  setSelectedAdoption(adopt);
                                  setAdoptionNotes(adopt.notes || '');
                                }}
                                className="px-3 py-1 rounded-lg bg-purple-50 dark:bg-midnight-900 border border-purple-200 dark:border-midnight-border text-electric-purple dark:text-lavender-glow hover:bg-purple-100 text-xs font-semibold cursor-pointer"
                              >
                                Deep Dive Specs
                              </button>

                              <button
                                onClick={() => handleDeleteAdoption(adopt.id)}
                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                                title="Delete application"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Quick Spec Details Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-light-100/70 dark:bg-midnight-900/40 border border-light-border dark:border-midnight-border/50">
                              <span className="text-[10px] text-light-subtext dark:text-muted-gray uppercase font-mono block">Timeline</span>
                              <span className="font-semibold text-light-text dark:text-white mt-0.5 block">{adopt.timeline || 'Flexible'}</span>
                            </div>
                            <div className="p-3 rounded-xl bg-light-100/70 dark:bg-midnight-900/40 border border-light-border dark:border-midnight-border/50">
                              <span className="text-[10px] text-light-subtext dark:text-muted-gray uppercase font-mono block">Estimated Scale</span>
                              <span className="font-semibold text-light-text dark:text-white mt-0.5 block">{adopt.estimatedScale || 'Standard'}</span>
                            </div>
                            <div className="sm:col-span-2 p-3 rounded-xl bg-light-100/70 dark:bg-midnight-900/40 border border-light-border dark:border-midnight-border/50">
                              <span className="text-[10px] text-light-subtext dark:text-muted-gray uppercase font-mono block">Primary Use Case</span>
                              <p className="text-light-text dark:text-white mt-0.5 line-clamp-2">{adopt.usecases}</p>
                            </div>
                          </div>

                          {/* Custom Requirements Snippet */}
                          <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-midnight-900/70 border border-purple-100 dark:border-midnight-border/60 text-xs">
                            <span className="font-semibold text-electric-purple dark:text-lavender-glow block mb-1">
                              Custom Requirements & Technical Specifications:
                            </span>
                            <p className="text-light-text dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                              {adopt.requirements}
                            </p>
                          </div>
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
                  <div className="space-y-4">
                    {registrations
                      .filter(r => {
                        if (registrationsSearch.trim()) {
                          const q = registrationsSearch.toLowerCase();
                          return (
                            r.fullName.toLowerCase().includes(q) ||
                            r.email.toLowerCase().includes(q) ||
                            r.planName.toLowerCase().includes(q) ||
                            (r.company || '').toLowerCase().includes(q) ||
                            (r.category || '').toLowerCase().includes(q)
                          );
                        }
                        return true;
                      })
                      .map((reg) => renderPlanRegistrationCard(reg))}
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

                    {/* Media Management: Showcase Image + Vertical Alignment */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                      <div className="md:col-span-2">
                        <CloudinaryUploader
                          label="Project Showcase Image / Banner"
                          value={newProduct.previewUrl || (newProduct as any).image || ''}
                          folder="codrix/projects"
                          isUploading={isUploadingImage}
                          setIsUploading={setIsUploadingImage}
                          showToast={showToast}
                          mediaKind="image"
                          placeholder="https://res.cloudinary.com/... or upload image"
                          onChange={(url) => setNewProduct({ ...newProduct, previewUrl: url, image: url } as any)}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-light-subtext font-semibold mb-1">Image Vertical Alignment</label>
                        <select
                          value={newProduct.imageAlignment || 'center'}
                          onChange={(e) => setNewProduct({ ...newProduct, imageAlignment: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs font-mono text-light-text dark:text-white"
                        >
                          <option value="center">Center (Default)</option>
                          <option value="top">Top (Header Focus)</option>
                          <option value="bottom">Bottom (Footer Focus)</option>
                        </select>
                      </div>
                    </div>

                    {/* Media Management: Demo Video + Aspect Fit */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                      <div className="md:col-span-2">
                        <CloudinaryUploader
                          label="Project Demo Video (.mp4, .webm, webp)"
                          value={newProduct.videoUrl || (newProduct as any).video || ''}
                          folder="codrix/projects/videos"
                          isUploading={isUploadingImage}
                          setIsUploading={setIsUploadingImage}
                          showToast={showToast}
                          mediaKind="video"
                          placeholder="https://res.cloudinary.com/... or upload .mp4/.webm"
                          onChange={(url) => setNewProduct({ ...newProduct, videoUrl: url, video: url } as any)}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-light-subtext font-semibold mb-1">Video Aspect Fit</label>
                        <select
                          value={newProduct.videoAlignment || 'cover'}
                          onChange={(e) => setNewProduct({ ...newProduct, videoAlignment: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs font-mono text-light-text dark:text-white"
                        >
                          <option value="cover">Cover (Full bleed)</option>
                          <option value="contain">Contain (Letterboxed)</option>
                        </select>
                      </div>
                    </div>

                    {/* Media Display Mode */}
                    <div>
                      <label className="block text-[11px] font-mono text-light-subtext font-semibold mb-1">Card Media Display Preference</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setNewProduct({ ...newProduct, mediaType: 'both' })}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                            (newProduct.mediaType || 'both') === 'both'
                              ? 'bg-electric-purple text-white border-electric-purple font-semibold shadow-sm'
                              : 'bg-purple-50/40 dark:bg-midnight-900 border-light-border dark:border-midnight-border text-light-subtext hover:border-purple-300'
                          }`}
                        >
                          Both (Toggleable)
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewProduct({ ...newProduct, mediaType: 'video' })}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                            newProduct.mediaType === 'video'
                              ? 'bg-electric-purple text-white border-electric-purple font-semibold shadow-sm'
                              : 'bg-purple-50/40 dark:bg-midnight-900 border-light-border dark:border-midnight-border text-light-subtext hover:border-purple-300'
                          }`}
                        >
                          Video Only
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewProduct({ ...newProduct, mediaType: 'image' })}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                            newProduct.mediaType === 'image'
                              ? 'bg-electric-purple text-white border-electric-purple font-semibold shadow-sm'
                              : 'bg-purple-50/40 dark:bg-midnight-900 border-light-border dark:border-midnight-border text-light-subtext hover:border-purple-300'
                          }`}
                        >
                          Photo Only
                        </button>
                      </div>
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
                        {/* Media Management: Showcase Image + Vertical Alignment */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                          <div className="md:col-span-2">
                            <CloudinaryUploader
                              label="Project Showcase Image / Banner"
                              value={(editingProduct as any).image || editingProduct.previewUrl || ''}
                              folder="codrix/projects"
                              isUploading={isUploadingImage}
                              setIsUploading={setIsUploadingImage}
                              showToast={showToast}
                              mediaKind="image"
                              placeholder="https://res.cloudinary.com/... or upload image"
                              onChange={(url) => setEditingProduct({ ...editingProduct, previewUrl: url, image: url } as any)}
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono text-light-subtext font-semibold mb-1">Image Vertical Alignment</label>
                            <select
                              value={editingProduct.imageAlignment || 'center'}
                              onChange={(e) => setEditingProduct({ ...editingProduct, imageAlignment: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs font-mono text-light-text dark:text-white"
                            >
                              <option value="center">Center (Default)</option>
                              <option value="top">Top (Header Focus)</option>
                              <option value="bottom">Bottom (Footer Focus)</option>
                            </select>
                          </div>
                        </div>

                        {/* Media Management: Demo Video + Aspect Fit */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                          <div className="md:col-span-2">
                            <CloudinaryUploader
                              label="Project Demo Video (.mp4, .webm, webp)"
                              value={editingProduct.videoUrl || (editingProduct as any).video || ''}
                              folder="codrix/projects/videos"
                              isUploading={isUploadingImage}
                              setIsUploading={setIsUploadingImage}
                              showToast={showToast}
                              mediaKind="video"
                              placeholder="https://res.cloudinary.com/... or upload .mp4/.webm"
                              onChange={(url) => setEditingProduct({ ...editingProduct, videoUrl: url, video: url } as any)}
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono text-light-subtext font-semibold mb-1">Video Aspect Fit</label>
                            <select
                              value={editingProduct.videoAlignment || 'cover'}
                              onChange={(e) => setEditingProduct({ ...editingProduct, videoAlignment: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs font-mono text-light-text dark:text-white"
                            >
                              <option value="cover">Cover (Full bleed)</option>
                              <option value="contain">Contain (Letterboxed)</option>
                            </select>
                          </div>
                        </div>

                        {/* Media Display Mode */}
                        <div>
                          <label className="block text-[11px] font-mono text-light-subtext font-semibold mb-1">Card Media Display Preference</label>
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingProduct({ ...editingProduct, mediaType: 'both' })}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                                (editingProduct.mediaType || 'both') === 'both'
                                  ? 'bg-electric-purple text-white border-electric-purple font-semibold shadow-sm'
                                  : 'bg-purple-50/40 dark:bg-midnight-900 border-light-border dark:border-midnight-border text-light-subtext hover:border-purple-300'
                              }`}
                            >
                              Both (Toggleable)
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingProduct({ ...editingProduct, mediaType: 'video' })}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                                editingProduct.mediaType === 'video'
                                  ? 'bg-electric-purple text-white border-electric-purple font-semibold shadow-sm'
                                  : 'bg-purple-50/40 dark:bg-midnight-900 border-light-border dark:border-midnight-border text-light-subtext hover:border-purple-300'
                              }`}
                            >
                              Video Only
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingProduct({ ...editingProduct, mediaType: 'image' })}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                                editingProduct.mediaType === 'image'
                                  ? 'bg-electric-purple text-white border-electric-purple font-semibold shadow-sm'
                                  : 'bg-purple-50/40 dark:bg-midnight-900 border-light-border dark:border-midnight-border text-light-subtext hover:border-purple-300'
                              }`}
                            >
                              Photo Only
                            </button>
                          </div>
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
                  <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="w-full max-w-xl bg-white dark:bg-midnight-800 rounded-3xl p-6 border-2 border-electric-purple shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                      <div className="flex items-center justify-between pb-1 border-b border-light-border dark:border-midnight-border/60">
                        <h2 className="font-bold text-sm text-light-text dark:text-white">Edit Team Member</h2>
                        <button onClick={() => setEditingTeamMember(null)} className="text-light-subtext hover:text-white cursor-pointer p-1">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3.5 text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Full Name</label>
                            <input
                              type="text"
                              value={editingTeamMember.name || ''}
                              onChange={(e) => setEditingTeamMember({ ...editingTeamMember, name: e.target.value })}
                              placeholder="e.g. Lakshay"
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Role / Title</label>
                            <input
                              type="text"
                              value={editingTeamMember.role || editingTeamMember.designation || ''}
                              onChange={(e) => setEditingTeamMember({ ...editingTeamMember, role: e.target.value, designation: e.target.value })}
                              placeholder="Principal Engineer"
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Initials (2 Letters)</label>
                            <input
                              type="text"
                              maxLength={3}
                              value={editingTeamMember.initials || ''}
                              onChange={(e) => setEditingTeamMember({ ...editingTeamMember, initials: e.target.value.toUpperCase() })}
                              placeholder="CE"
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border uppercase"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">LinkedIn Profile</label>
                            <input
                              type="url"
                              value={editingTeamMember.linkedin || ''}
                              onChange={(e) => setEditingTeamMember({ ...editingTeamMember, linkedin: e.target.value })}
                              placeholder="https://linkedin.com"
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                            />
                          </div>
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
                          <label className="block text-xs font-mono text-light-subtext mb-1">Bio / Background</label>
                          <textarea
                            rows={3}
                            value={editingTeamMember.bio || editingTeamMember.primaryResponsibility || ''}
                            onChange={(e) => setEditingTeamMember({ ...editingTeamMember, bio: e.target.value, primaryResponsibility: e.target.value })}
                            placeholder="Architecting distributed systems and reactive client architectures."
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs"
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

                      <div className="flex justify-end gap-2 pt-2 border-t border-light-border dark:border-midnight-border/60">
                        <button
                          onClick={() => setEditingTeamMember(null)}
                          className="px-3.5 py-1.5 rounded-xl border border-light-border dark:border-midnight-border text-xs cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveExistingTeamMember(editingTeamMember)}
                          className="px-4 py-1.5 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-600/20"
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-xl font-bold text-light-text dark:text-white">Engineering Plans & Packages</h1>
                    <p className="text-xs text-light-subtext dark:text-muted-gray">
                      Add, update, or remove plans shown on the homepage and the full /plan showcase page.
                    </p>
                  </div>
                  <button
                    onClick={openAddPlan}
                    className="px-4 py-2 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 shadow-md shadow-purple-600/20 cursor-pointer w-fit"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Plan</span>
                  </button>
                </div>

                {/* Add Plan Form */}
                {isAddingPlan && (
                  <div className="p-6 rounded-3xl bg-white dark:bg-midnight-800 border-2 border-electric-purple shadow-2xl space-y-5 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-light-border dark:border-midnight-border/60 pb-3">
                      <div>
                        <h2 className="font-extrabold text-base text-light-text dark:text-white flex items-center gap-2">
                          <Plus className="w-4 h-4 text-electric-purple" />
                          <span>Create New Plan Package</span>
                        </h2>
                        <p className="text-[11px] text-light-subtext dark:text-muted-gray">
                          Configure all pricing, architectural features, domain inclusions, and handoff terms.
                        </p>
                      </div>
                      <button onClick={() => setIsAddingPlan(false)} className="p-1 rounded-lg text-light-subtext hover:text-white hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Section 1: Core Details */}
                    <div className="space-y-3">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-electric-purple dark:text-lavender-light">
                        1. Core Plan Details
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="md:col-span-2">
                          <label className="block font-mono text-light-subtext mb-1">Plan Name *</label>
                          <input
                            type="text"
                            value={newPlan.name || ''}
                            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                            placeholder="e.g. Business Website – UI/UX"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border focus:border-electric-purple focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Category *</label>
                          <select
                            value={newPlan.category || 'website'}
                            onChange={(e) => setNewPlan({ ...newPlan, category: e.target.value as any })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border focus:border-electric-purple focus:outline-none font-medium"
                          >
                            <option value="website">Website Development</option>
                            <option value="webapp">Web Applications</option>
                            <option value="ecommerce">E-Commerce Solutions</option>
                            <option value="enterprise">Enterprise Software</option>
                            <option value="ai">AI & Automation</option>
                            <option value="amc">Annual Retainers (AMC)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Tagline / Subtitle</label>
                          <input
                            type="text"
                            value={newPlan.tagline || ''}
                            onChange={(e) => setNewPlan({ ...newPlan, tagline: e.target.value })}
                            placeholder="e.g. High-converting commercial website with up to 10 custom pages"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border focus:border-electric-purple focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Badge Text</label>
                          <input
                            type="text"
                            value={newPlan.badge || ''}
                            onChange={(e) => setNewPlan({ ...newPlan, badge: e.target.value })}
                            placeholder="e.g. Popular, Starter, Founder Favorite, Enterprise"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border focus:border-electric-purple focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="text-xs">
                        <label className="block font-mono text-light-subtext mb-1">Ideal For (Target Client / Persona)</label>
                        <input
                          type="text"
                          value={newPlan.idealFor || ''}
                          onChange={(e) => setNewPlan({ ...newPlan, idealFor: e.target.value })}
                          placeholder="e.g. Startups, agencies, local businesses, professionals and service providers."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border focus:border-electric-purple focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Section 2: Pricing & Billing */}
                    <div className="space-y-3 pt-2 border-t border-light-border dark:border-midnight-border/50">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-electric-purple dark:text-lavender-light">
                        2. Pricing, Billing & Timeline
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Price (₹ INR) *</label>
                          <input
                            type="number"
                            value={newPlan.priceINR ?? 0}
                            onChange={(e) => setNewPlan({ ...newPlan, priceINR: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border font-mono font-bold text-electric-purple"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Price ($ USD) *</label>
                          <input
                            type="number"
                            value={newPlan.priceUSD ?? 0}
                            onChange={(e) => setNewPlan({ ...newPlan, priceUSD: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border font-mono font-bold"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Billing Period</label>
                          <select
                            value={newPlan.billingPeriod || 'One-Time'}
                            onChange={(e) => setNewPlan({ ...newPlan, billingPeriod: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          >
                            <option value="One-Time">One-Time Payment</option>
                            <option value="Yearly Retainer">Yearly Retainer (AMC)</option>
                            <option value="Monthly Retainer">Monthly Retainer</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Delivery Timeline</label>
                          <input
                            type="text"
                            value={newPlan.turnaroundTime || ''}
                            onChange={(e) => setNewPlan({ ...newPlan, turnaroundTime: e.target.value })}
                            placeholder="e.g. 5–7 business days"
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <label className="flex items-center gap-2 font-mono text-xs text-light-text dark:text-white cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={Boolean(newPlan.startingPrice)}
                            onChange={(e) => setNewPlan({ ...newPlan, startingPrice: e.target.checked })}
                            className="w-4 h-4 rounded text-electric-purple focus:ring-electric-purple cursor-pointer"
                          />
                          <span>Show as "Starting Price" (e.g. Starting ₹99,999)</span>
                        </label>
                        <div>
                          <input
                            type="text"
                            value={newPlan.billingCycle || ''}
                            onChange={(e) => setNewPlan({ ...newPlan, billingCycle: e.target.value })}
                            placeholder="Optional cycle suffix (e.g. / year)"
                            className="w-full px-3 py-1.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Domain & Hosting Policy */}
                    <div className="space-y-3 pt-2 border-t border-light-border dark:border-midnight-border/50">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-electric-purple dark:text-lavender-light">
                        3. Domain & Infrastructure Terms
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Free Domain Included?</label>
                          <select
                            value={newPlan.domainIncluded ? 'yes' : 'no'}
                            onChange={(e) => setNewPlan({ ...newPlan, domainIncluded: e.target.value === 'yes' })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          >
                            <option value="yes">Yes (Domain Included)</option>
                            <option value="no">No (Domain Optional / Excluded)</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-mono text-light-subtext mb-1">Domain Allowance / Note</label>
                          <input
                            type="text"
                            value={newPlan.domainNote || ''}
                            onChange={(e) => setNewPlan({ ...newPlan, domainNote: e.target.value })}
                            placeholder="e.g. Without domain: ₹17,999 · With domain: ₹19,999 (Includes ₹2,000 allowance)"
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Specifications, Deliverables & Tech Stack */}
                    <div className="space-y-3 pt-2 border-t border-light-border dark:border-midnight-border/50">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-electric-purple dark:text-lavender-light">
                        4. Scope, Features & Stack Architecture
                      </div>
                      <div className="text-xs">
                        <label className="block font-mono text-light-subtext mb-1">Detailed Description</label>
                        <textarea
                          rows={2}
                          value={newPlan.description || ''}
                          onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                          placeholder="Comprehensive description of what this engagement delivers..."
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Included Features (One per line)</label>
                          <textarea
                            rows={4}
                            value={newPlanFeaturesText}
                            onChange={(e) => setNewPlanFeaturesText(e.target.value)}
                            placeholder="Custom single-page responsive website&#10;WhatsApp and contact integration&#10;1-Year free hosting on Vercel&#10;Complete source code handover"
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border font-mono text-[11px]"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Handoff Deliverables (One per line)</label>
                          <textarea
                            rows={4}
                            value={newPlanDeliverablesText}
                            onChange={(e) => setNewPlanDeliverablesText(e.target.value)}
                            placeholder="Complete source code repository transfer&#10;Production cloud deployment & SSL setup&#10;30 Days complimentary bug-fix support"
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border font-mono text-[11px]"
                          />
                        </div>
                      </div>
                      <div className="text-xs">
                        <label className="block font-mono text-light-subtext mb-1">Stack Architecture (Comma-separated)</label>
                        <input
                          type="text"
                          value={newPlanTechStackText}
                          onChange={(e) => setNewPlanTechStackText(e.target.value)}
                          placeholder="e.g. React, TypeScript, Tailwind CSS, Vite, Cloudflare"
                          className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border font-mono text-xs"
                        />
                      </div>
                    </div>

                    {/* Section 5: Badges & Display Options */}
                    <div className="pt-2 border-t border-light-border dark:border-midnight-border/50 flex flex-wrap items-center gap-4 text-xs font-mono">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={Boolean(newPlan.isPopular)}
                          onChange={(e) => setNewPlan({ ...newPlan, isPopular: e.target.checked })}
                          className="w-4 h-4 rounded text-electric-purple focus:ring-electric-purple cursor-pointer"
                        />
                        <span>Highlight as "Popular" (Purple Ring & Glow)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={Boolean(newPlan.isBestValue)}
                          onChange={(e) => setNewPlan({ ...newPlan, isBestValue: e.target.checked })}
                          className="w-4 h-4 rounded text-electric-purple focus:ring-electric-purple cursor-pointer"
                        />
                        <span>Highlight as "Best Value"</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer select-none text-emerald-600 dark:text-emerald-400 font-bold">
                        <input
                          type="checkbox"
                          checked={newPlan.isVisible !== false}
                          onChange={(e) => setNewPlan({ ...newPlan, isVisible: e.target.checked })}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span>Display on website (Live to public)</span>
                      </label>
                    </div>

                    {/* Form Buttons */}
                    <div className="flex justify-end gap-2.5 pt-3 border-t border-light-border dark:border-midnight-border/60">
                      <button
                        onClick={() => setIsAddingPlan(false)}
                        className="px-4 py-2 rounded-xl border border-light-border dark:border-midnight-border text-xs text-light-subtext hover:text-light-text dark:hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreatePlan}
                        className="px-5 py-2 rounded-xl bg-electric-purple text-white text-xs font-bold hover:opacity-90 cursor-pointer shadow-lg shadow-purple-600/30 flex items-center gap-2"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Publish Plan to Database</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Plans List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {plans.map((p) => {
                    const isVisible = p.isVisible !== false;
                    const categoryLabels: Record<string, string> = {
                      website: 'Website',
                      webapp: 'Web App',
                      ecommerce: 'E-Commerce',
                      enterprise: 'Enterprise',
                      ai: 'AI & Auto',
                      amc: 'Retainer',
                      'single-page': 'Website',
                      'web-app': 'Web App',
                      software: 'Enterprise',
                      yearly: 'Retainer'
                    };

                    return (
                      <div
                        key={p.id}
                        className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between space-y-3 transition-all ${
                          isVisible
                            ? 'bg-white dark:bg-midnight-800 border-light-border dark:border-midnight-border hover:border-purple-300 dark:hover:border-electric-purple/50'
                            : 'bg-white/60 dark:bg-midnight-800/60 border-dashed border-amber-400/60 dark:border-amber-500/30 opacity-75'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-electric-purple border border-purple-500/20 font-bold">
                                {categoryLabels[p.category] || p.category}
                              </span>
                              {p.badge && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 dark:bg-white/10 text-electric-purple dark:text-lavender-light font-semibold">
                                  {p.badge}
                                </span>
                              )}
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold flex items-center gap-1 ${
                                isVisible
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isVisible ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                {isVisible ? 'Live' : 'Hidden'}
                              </span>
                            </div>
                            {p.domainIncluded && (
                              <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1 shrink-0">
                                <Globe className="w-3 h-3" />
                                Domain
                              </span>
                            )}
                          </div>

                          <h3 className="font-bold text-sm text-light-text dark:text-white mt-2 leading-snug">{p.name}</h3>
                          <p className="text-xs text-light-subtext dark:text-muted-gray mt-1 line-clamp-2 leading-relaxed">
                            {p.tagline || p.description}
                          </p>

                          {p.idealFor && (
                            <p className="text-[11px] text-light-subtext dark:text-gray-400 mt-1.5 line-clamp-1 italic">
                              Target: {p.idealFor}
                            </p>
                          )}
                        </div>

                        <div className="pt-2 border-t border-light-border dark:border-midnight-border/60 flex items-center justify-between">
                          <div>
                            <span className="text-sm font-extrabold font-mono text-electric-purple dark:text-lavender-glow">
                              {p.startingPrice ? 'Starting ' : ''}₹{p.priceINR?.toLocaleString('en-IN')}{p.billingCycle ? ` ${p.billingCycle}` : ''}
                            </span>
                            <span className="text-[10px] font-mono text-light-subtext dark:text-muted-gray ml-1.5">
                              (${p.priceUSD?.toLocaleString('en-US')})
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {/* Visibility Eye Toggle */}
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
                            {/* Edit Button */}
                            <button
                              onClick={() => openEditPlan(p)}
                              className="p-1.5 rounded-lg border border-light-border dark:border-midnight-border text-light-subtext hover:text-white hover:bg-electric-purple/10 text-xs cursor-pointer"
                              title="Edit all plan details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            {/* Delete Button */}
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

                {/* Edit Plan Modal with Complete Fields */}
                {editingPlan && (
                  <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-midnight-800 rounded-3xl p-6 sm:p-7 border border-light-border dark:border-midnight-border shadow-2xl space-y-5">
                      <div className="flex items-center justify-between border-b border-light-border dark:border-midnight-border/60 pb-3">
                        <div>
                          <h2 className="font-extrabold text-base text-light-text dark:text-white flex items-center gap-2">
                            <Edit3 className="w-4 h-4 text-electric-purple" />
                            <span>Edit Plan: {editingPlan.name}</span>
                          </h2>
                          <p className="text-[11px] text-light-subtext dark:text-muted-gray">
                            Update pricing, timeline, domain allowance, specifications and handoff deliverables.
                          </p>
                        </div>
                        <button onClick={() => setEditingPlan(null)} className="p-1 rounded-lg text-light-subtext hover:text-white hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-4 text-xs">
                        {/* 1. Core Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="md:col-span-2">
                            <label className="block font-mono text-light-subtext mb-1">Plan Name *</label>
                            <input
                              type="text"
                              value={editingPlan.name || ''}
                              onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border font-bold text-light-text dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Category</label>
                            <select
                              value={editingPlan.category || 'website'}
                              onChange={(e) => setEditingPlan({ ...editingPlan, category: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border font-medium"
                            >
                              <option value="website">Website Development</option>
                              <option value="webapp">Web Applications</option>
                              <option value="ecommerce">E-Commerce Solutions</option>
                              <option value="enterprise">Enterprise Software</option>
                              <option value="ai">AI & Automation</option>
                              <option value="amc">Annual Retainers (AMC)</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Tagline</label>
                            <input
                              type="text"
                              value={editingPlan.tagline || ''}
                              onChange={(e) => setEditingPlan({ ...editingPlan, tagline: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Badge Text</label>
                            <input
                              type="text"
                              value={editingPlan.badge || ''}
                              onChange={(e) => setEditingPlan({ ...editingPlan, badge: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Ideal For (Target Audience)</label>
                          <input
                            type="text"
                            value={editingPlan.idealFor || ''}
                            onChange={(e) => setEditingPlan({ ...editingPlan, idealFor: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          />
                        </div>

                        {/* 2. Pricing & Timeline */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Price (₹ INR)</label>
                            <input
                              type="number"
                              value={editingPlan.priceINR ?? 0}
                              onChange={(e) => setEditingPlan({ ...editingPlan, priceINR: Number(e.target.value) })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border font-mono font-bold text-electric-purple"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Price ($ USD)</label>
                            <input
                              type="number"
                              value={editingPlan.priceUSD ?? 0}
                              onChange={(e) => setEditingPlan({ ...editingPlan, priceUSD: Number(e.target.value) })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border font-mono font-bold"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Billing Period</label>
                            <select
                              value={editingPlan.billingPeriod || 'One-Time'}
                              onChange={(e) => setEditingPlan({ ...editingPlan, billingPeriod: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                            >
                              <option value="One-Time">One-Time Payment</option>
                              <option value="Yearly Retainer">Yearly Retainer (AMC)</option>
                              <option value="Monthly Retainer">Monthly Retainer</option>
                            </select>
                          </div>
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Timeline</label>
                            <input
                              type="text"
                              value={editingPlan.turnaroundTime || ''}
                              onChange={(e) => setEditingPlan({ ...editingPlan, turnaroundTime: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className="flex items-center gap-2 font-mono text-xs text-light-text dark:text-white cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={Boolean(editingPlan.startingPrice)}
                              onChange={(e) => setEditingPlan({ ...editingPlan, startingPrice: e.target.checked })}
                              className="w-4 h-4 rounded text-electric-purple focus:ring-electric-purple cursor-pointer"
                            />
                            <span>Show as "Starting Price"</span>
                          </label>
                          <div>
                            <input
                              type="text"
                              value={editingPlan.billingCycle || ''}
                              onChange={(e) => setEditingPlan({ ...editingPlan, billingCycle: e.target.value })}
                              placeholder="Cycle suffix (e.g. / year)"
                              className="w-full px-3 py-1.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs"
                            />
                          </div>
                        </div>

                        {/* 3. Domain Terms */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Domain Included?</label>
                            <select
                              value={editingPlan.domainIncluded ? 'yes' : 'no'}
                              onChange={(e) => setEditingPlan({ ...editingPlan, domainIncluded: e.target.value === 'yes' })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                            >
                              <option value="yes">Yes (Domain Included)</option>
                              <option value="no">No (Without Domain)</option>
                            </select>
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block font-mono text-light-subtext mb-1">Domain Allowance / Note</label>
                            <input
                              type="text"
                              value={editingPlan.domainNote || ''}
                              onChange={(e) => setEditingPlan({ ...editingPlan, domainNote: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                            />
                          </div>
                        </div>

                        {/* 4. Description, Features & Deliverables */}
                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={editingPlan.description || ''}
                            onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Included Features (One per line)</label>
                            <textarea
                              rows={4}
                              value={editPlanFeaturesText}
                              onChange={(e) => setEditPlanFeaturesText(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border font-mono text-[11px]"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-light-subtext mb-1">Handoff Deliverables (One per line)</label>
                            <textarea
                              rows={4}
                              value={editPlanDeliverablesText}
                              onChange={(e) => setEditPlanDeliverablesText(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border font-mono text-[11px]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-mono text-light-subtext mb-1">Tech Stack Architecture (Comma-separated)</label>
                          <input
                            type="text"
                            value={editPlanTechStackText}
                            onChange={(e) => setEditPlanTechStackText(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border font-mono text-xs"
                          />
                        </div>

                        {/* 5. Toggles */}
                        <div className="pt-2 border-t border-light-border dark:border-midnight-border/50 flex flex-wrap items-center gap-4 font-mono">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={Boolean(editingPlan.isPopular)}
                              onChange={(e) => setEditingPlan({ ...editingPlan, isPopular: e.target.checked })}
                              className="w-4 h-4 rounded text-electric-purple focus:ring-electric-purple cursor-pointer"
                            />
                            <span>Highlight as "Popular"</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={Boolean(editingPlan.isBestValue)}
                              onChange={(e) => setEditingPlan({ ...editingPlan, isBestValue: e.target.checked })}
                              className="w-4 h-4 rounded text-electric-purple focus:ring-electric-purple cursor-pointer"
                            />
                            <span>Highlight as "Best Value"</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer select-none text-emerald-600 dark:text-emerald-400 font-bold">
                            <input
                              type="checkbox"
                              checked={editingPlan.isVisible !== false}
                              onChange={(e) => setEditingPlan({ ...editingPlan, isVisible: e.target.checked })}
                              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                            />
                            <span>Display on website (Live to public)</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2.5 pt-3 border-t border-light-border dark:border-midnight-border/60">
                        <button
                          onClick={() => setEditingPlan(null)}
                          className="px-4 py-2 rounded-xl border border-light-border dark:border-midnight-border text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveExistingPlan}
                          className="px-5 py-2 rounded-xl bg-electric-purple text-white text-xs font-bold hover:opacity-90 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-purple-600/30"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Changes to Database</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: SITE & SOCIAL SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-xl font-bold text-light-text dark:text-white">
                      Site & Social Media Settings
                    </h1>
                    <p className="text-xs text-light-subtext dark:text-muted-gray">
                      Configure your official LinkedIn, Instagram, and Gmail accounts, corporate identity, and footer details.
                    </p>
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    disabled={isSavingSettings}
                    className="px-5 py-2.5 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:bg-electric-light flex items-center gap-2 shadow-md shadow-purple-600/30 transition-all cursor-pointer self-start sm:self-center disabled:opacity-50"
                  >
                    {isSavingSettings ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving Changes...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save All Settings</span>
                      </>
                    )}
                  </button>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  {/* Section 1: Social Media Connectivity */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-light-border dark:border-midnight-border/60">
                      <Globe className="w-4 h-4 text-electric-purple" />
                      <h2 className="text-sm font-bold text-light-text dark:text-white">
                        Official Social Media & Direct Contact Channels
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* LinkedIn URL */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                            <span>LinkedIn URL</span>
                          </span>
                          {settingsForm.linkedinUrl && (
                            <a
                              href={settingsForm.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-electric-purple hover:underline flex items-center gap-0.5"
                            >
                              <span>Test link</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </label>
                        <input
                          type="url"
                          placeholder="https://linkedin.com/company/codrix"
                          value={settingsForm.linkedinUrl}
                          onChange={(e) => setSettingsForm({ ...settingsForm, linkedinUrl: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs text-light-text dark:text-white focus:outline-none focus:border-electric-purple"
                        />
                      </div>

                      {/* Instagram URL */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />
                            <span>Instagram URL</span>
                          </span>
                          {settingsForm.instagramUrl && (
                            <a
                              href={settingsForm.instagramUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-electric-purple hover:underline flex items-center gap-0.5"
                            >
                              <span>Test link</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </label>
                        <input
                          type="url"
                          placeholder="https://instagram.com/codrix.tech"
                          value={settingsForm.instagramUrl}
                          onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs text-light-text dark:text-white focus:outline-none focus:border-electric-purple"
                        />
                      </div>

                      {/* Gmail / Contact Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#EA4335]" />
                            <span>Gmail / Email Address</span>
                          </span>
                          {settingsForm.contactEmail && (
                            <a
                              href={`mailto:${settingsForm.contactEmail}`}
                              className="text-[10px] text-electric-purple hover:underline flex items-center gap-0.5"
                            >
                              <span>Compose</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </label>
                        <input
                          type="email"
                          placeholder="codrixsoftwares@gmail.com"
                          value={settingsForm.contactEmail}
                          onChange={(e) => setSettingsForm({
                            ...settingsForm,
                            contactEmail: e.target.value,
                            gmailUrl: `mailto:${e.target.value}`
                          })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs text-light-text dark:text-white focus:outline-none focus:border-electric-purple"
                        />
                      </div>
                    </div>

                    {/* Live Preview Box */}
                    <div className="p-4 rounded-xl bg-purple-50/30 dark:bg-midnight-900/60 border border-dashed border-purple-200 dark:border-midnight-border/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                      <span className="text-light-subtext dark:text-muted-gray">Footer Button Preview:</span>
                      <div className="flex items-center gap-2">
                        <a
                          href={settingsForm.linkedinUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border text-light-subtext dark:text-muted-gray hover:text-[#0A66C2] shadow-sm flex items-center gap-1.5 font-mono text-[11px]"
                        >
                          <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                          <span>LinkedIn</span>
                        </a>
                        <a
                          href={settingsForm.instagramUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border text-light-subtext dark:text-muted-gray hover:text-[#E4405F] shadow-sm flex items-center gap-1.5 font-mono text-[11px]"
                        >
                          <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />
                          <span>Instagram</span>
                        </a>
                        <a
                          href={`mailto:${settingsForm.contactEmail || 'codrixsoftwares@gmail.com'}`}
                          className="p-2 rounded-xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border text-light-subtext dark:text-muted-gray hover:text-[#EA4335] shadow-sm flex items-center gap-1.5 font-mono text-[11px]"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#EA4335]" />
                          <span>Gmail</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Corporate & Footer Identity */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-midnight-800 border border-light-border dark:border-midnight-border shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-light-border dark:border-midnight-border/60">
                      <Shield className="w-4 h-4 text-electric-purple" />
                      <h2 className="text-sm font-bold text-light-text dark:text-white">
                        Corporate Identity & Legal Information
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Company Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray">
                          Company / Brand Name
                        </label>
                        <input
                          type="text"
                          value={settingsForm.companyName}
                          onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs text-light-text dark:text-white focus:outline-none focus:border-electric-purple"
                        />
                      </div>

                      {/* Contact Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray">
                          Official Phone Number
                        </label>
                        <input
                          type="text"
                          value={settingsForm.contactPhone}
                          onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs text-light-text dark:text-white focus:outline-none focus:border-electric-purple"
                        />
                      </div>

                      {/* Legal Headquarters */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray">
                          Legal Headquarters Notice
                        </label>
                        <input
                          type="text"
                          value={settingsForm.legalHeadquarters}
                          onChange={(e) => setSettingsForm({ ...settingsForm, legalHeadquarters: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs text-light-text dark:text-white focus:outline-none focus:border-electric-purple"
                        />
                      </div>

                      {/* Copyright Notice */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray">
                          Copyright Text
                        </label>
                        <input
                          type="text"
                          value={settingsForm.copyrightNotice}
                          onChange={(e) => setSettingsForm({ ...settingsForm, copyrightNotice: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/40 dark:bg-midnight-900 border border-light-border dark:border-midnight-border text-xs text-light-text dark:text-white focus:outline-none focus:border-electric-purple"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSavingSettings}
                      className="px-6 py-2.5 rounded-xl bg-electric-purple text-white text-xs font-semibold hover:bg-electric-light flex items-center gap-2 shadow-md shadow-purple-600/30 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSavingSettings ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving Changes...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save All Settings</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Selected Platform Adoption Deep-Dive Modal */}
      {selectedAdoption && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-2xl bg-white dark:bg-midnight-card border border-purple-200 dark:border-midnight-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-light-border dark:border-midnight-border/70 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-gradient-to-r from-electric-purple to-deep-violet text-white">
                    {selectedAdoption.platformName}
                  </span>
                  <span className="text-xs font-mono text-light-subtext dark:text-muted-gray">
                    ID: {selectedAdoption.id}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-light-text dark:text-white mt-1">
                  {selectedAdoption.fullName}
                </h2>
                <p className="text-xs text-light-subtext dark:text-muted-gray">
                  Organization: <strong className="text-light-text dark:text-white">{selectedAdoption.companyName}</strong>
                </p>
              </div>

              <button
                onClick={() => setSelectedAdoption(null)}
                className="p-2 rounded-xl text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Contact Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <a
                href={`mailto:${selectedAdoption.email}`}
                className="p-3 rounded-xl bg-purple-50 dark:bg-midnight-900 border border-purple-100 dark:border-midnight-border flex items-center gap-2 hover:border-electric-purple transition-all"
              >
                <Mail className="w-4 h-4 text-electric-purple shrink-0" />
                <span className="truncate">{selectedAdoption.email}</span>
              </a>
              <a
                href={`tel:${selectedAdoption.contact}`}
                className="p-3 rounded-xl bg-purple-50 dark:bg-midnight-900 border border-purple-100 dark:border-midnight-border flex items-center gap-2 hover:border-electric-purple transition-all"
              >
                <Phone className="w-4 h-4 text-electric-purple shrink-0" />
                <span>{selectedAdoption.contact}</span>
              </a>
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-midnight-900 border border-purple-100 dark:border-midnight-border flex items-center gap-2">
                <Building2 className="w-4 h-4 text-electric-purple shrink-0" />
                <span className="truncate">{selectedAdoption.companyContact || 'HQ: Not provided'}</span>
              </div>
            </div>

            {/* Scale & Timeline Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-light-100 dark:bg-midnight-surface border border-light-border dark:border-midnight-border">
                <span className="text-[10px] uppercase font-mono text-light-subtext dark:text-muted-gray block">Target Timeline</span>
                <span className="font-semibold text-light-text dark:text-white mt-0.5 block">{selectedAdoption.timeline || 'Flexible'}</span>
              </div>
              <div className="p-3 rounded-xl bg-light-100 dark:bg-midnight-surface border border-light-border dark:border-midnight-border">
                <span className="text-[10px] uppercase font-mono text-light-subtext dark:text-muted-gray block">Estimated Users / Scale</span>
                <span className="font-semibold text-light-text dark:text-white mt-0.5 block">{selectedAdoption.estimatedScale || 'Standard'}</span>
              </div>
            </div>

            {/* Primary Use Cases */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray">
                Primary Use Cases & Operational Goals
              </label>
              <div className="p-4 rounded-xl bg-light-100 dark:bg-midnight-surface border border-light-border dark:border-midnight-border text-xs text-light-text dark:text-white whitespace-pre-wrap leading-relaxed">
                {selectedAdoption.usecases}
              </div>
            </div>

            {/* Custom Specifications & Requirements */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray">
                Custom Requirements & Technical Specifications
              </label>
              <div className="p-4 rounded-xl bg-light-100 dark:bg-midnight-surface border border-light-border dark:border-midnight-border text-xs text-light-text dark:text-white whitespace-pre-wrap leading-relaxed">
                {selectedAdoption.requirements}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2 pt-2 border-t border-light-border dark:border-midnight-border/70">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-light-subtext dark:text-muted-gray">
                  Internal Administrative Notes & Follow-up Actions
                </label>
                <button
                  type="button"
                  onClick={() => handleUpdateAdoptionStatus(selectedAdoption.id, selectedAdoption.status, adoptionNotes)}
                  className="px-3 py-1 rounded-lg bg-electric-purple text-white text-xs font-semibold hover:bg-electric-light flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  <Save className="w-3 h-3" />
                  <span>Save Notes</span>
                </button>
              </div>
              <textarea
                rows={3}
                placeholder="Record meeting notes, client agreement terms, proposed pricing, or SLA commitments..."
                value={adoptionNotes}
                onChange={(e) => setAdoptionNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-light-100 dark:bg-midnight-surface border border-purple-100 dark:border-midnight-border text-xs text-light-text dark:text-white placeholder:text-light-subtext/60 focus:outline-none focus:border-electric-purple"
              />
            </div>

            {/* Status Selector & Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-light-border dark:border-midnight-border/70">
              <div className="flex items-center gap-2">
                <span className="text-xs text-light-subtext dark:text-muted-gray">Application Status:</span>
                <select
                  value={selectedAdoption.status}
                  onChange={(e) => handleUpdateAdoptionStatus(selectedAdoption.id, e.target.value, adoptionNotes)}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-midnight-900 border border-purple-200 dark:border-midnight-border text-xs font-semibold text-electric-purple dark:text-lavender-glow"
                >
                  <option value="New">New</option>
                  <option value="In Review">In Review</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedAdoption(null)}
                  className="px-4 py-2 rounded-xl border border-light-border dark:border-midnight-border text-xs font-semibold text-light-subtext dark:text-muted-gray hover:text-light-text dark:hover:text-white cursor-pointer"
                >
                  Close Spec
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
