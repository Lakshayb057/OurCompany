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
}

export interface ProductMetric {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  badge: string;
  status: 'Live' | 'Beta' | 'Development' | 'Concept';
  tagline: string;
  lead: string;
  technologies: string[];
  metrics: ProductMetric[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  role: string;
  primaryResponsibility: string;
  bio: string;
  avatar?: string;
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

