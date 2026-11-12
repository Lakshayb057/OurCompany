export interface Inquiry {
  id: string;
  fullName: string;
  contact?: string;
  email: string;
  company?: string;
  country?: string;
  projectType: string;
  budgetRange?: string;
  timeline?: string;
  preferredContact?: string;
  description: string;
  status: 'New' | 'Review' | 'Contacted' | 'Converted' | 'Archived';
  createdAt: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  domain: string;
  icon: string;
  summary: string;
  technologies: string[];
  benefits: string[];
  image?: string;
  tag?: string;
  description?: string;
  deliverables?: string[];
}

export interface ProductMetric {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug?: string;
  name: string;
  subtitle: string;
  badge: string;
  status?: 'Live' | 'Beta' | 'Development' | 'Concept' | string;
  tagline?: string;
  lead?: string;
  category?: string;
  technologies?: string[];
  techStack?: string[];
  metrics?: ProductMetric[];
  metric?: string;
  impact?: string;
  highlights?: string[];
  architecture?: string;
  image?: string;
  previewUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation?: string;
  role: string;
  primaryResponsibility?: string;
  bio: string;
  avatar?: string;
  photo?: string;
  initials?: string;
  linkedin?: string;
}

export interface InternalProject {
  id: string;
  name: string;
  client: string;
  budget: number;
  status: string;
  allocations: {
    projectLead: number;
    engineering: number;
    companyReserve: number;
  };
  leadAmount: number;
  engineeringAmount: number;
  companyAmount: number;
  notes?: string;
}

export interface PlanRegistrationItem {
  id: string;
  fullName: string;
  email: string;
  contact: string;
  company?: string;
  planId: string;
  planName: string;
  category?: string;
  domainOption?: string;
  billingPeriod?: string;
  estimatedPrice?: string;
  notes?: string;
  status: string;
  createdAt: string;
}

export interface ProcessStage {
  num: string;
  title: string;
  shortTitle: string;
  image: string;
  deliverables: string[];
}

export interface SiteContent {
  hero: {
    line1: string;
    line2: string;
    line3: string;
    badge1: string;
    badge2: string;
    statCode: string;
  };
  story: {
    heading: string;
    subheading: string;
    paragraph1: string;
    paragraph2: string;
    stats: { label: string; value: string }[];
  };
  process: ProcessStage[];
  globalVision: {
    headline: string;
    subheading: string;
    metrics: { label: string; value: string }[];
  };
  siteSettings: {
    companyName: string;
    legalHeadquarters: string;
    contactEmail: string;
    contactPhone: string;
    copyrightNotice: string;
  };
}

