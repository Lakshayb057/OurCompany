import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.join(__dirname, '..', '.env') });

let isMongoConnected = false;

// 1. Inquiry Schema
const inquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  contact: { type: String, default: '' },
  email: { type: String, required: true },
  company: { type: String, default: '' },
  country: { type: String, default: 'Global / Remote' },
  projectType: { type: String, default: 'Full-Stack & Cloud Engineering' },
  budgetRange: { type: String, default: 'Not decided' },
  timeline: { type: String, default: 'Flexible' },
  preferredContact: { type: String, default: 'Phone / Email' },
  description: { type: String, required: true },
  status: { type: String, default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

// 2. Plan Registration Schema
const planRegistrationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  company: { type: String, default: '' },
  planId: { type: String, required: true },
  planName: { type: String, required: true },
  category: { type: String, default: 'General' },
  domainOption: { type: String, default: 'with-domain' },
  billingPeriod: { type: String, default: 'One-Time' },
  estimatedPrice: { type: String, default: '' },
  notes: { type: String, default: '' },
  status: { type: String, default: 'Pending Review' },
  createdAt: { type: Date, default: Date.now }
});

// 3. Service Schema
const serviceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, default: '' },
  title: { type: String, required: true },
  domain: { type: String, default: '' },
  icon: { type: String, default: 'Zap' },
  summary: { type: String, required: true },
  technologies: [{ type: String }],
  benefits: [{ type: String }],
  image: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

// 4. Product / Portfolio Schema
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, default: '' },
  name: { type: String, required: true },
  subtitle: { type: String, default: '' },
  badge: { type: String, default: '' },
  status: { type: String, default: 'Live' },
  tagline: { type: String, default: '' },
  lead: { type: String, default: '' },
  technologies: [{ type: String }],
  metrics: [{ label: String, value: String }],
  highlights: [{ type: String }],
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  image: { type: String, default: '' },
  previewUrl: { type: String, default: '' },
  isVisible: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
}, { strict: false });

// 5. Team Member Schema
const teamMemberSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  designation: { type: String, default: '' },
  role: { type: String, default: '' },
  primaryResponsibility: { type: String, default: '' },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  photo: { type: String, default: '' },
  initials: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  isVisible: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
}, { strict: false });

// 6. Plan Package Schema
const planSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tagline: { type: String, default: '' },
  category: { type: String, default: 'single-page' },
  badge: { type: String, default: '' },
  isPopular: { type: Boolean, default: false },
  isBestValue: { type: Boolean, default: false },
  priceINR: { type: Number, default: 0 },
  priceUSD: { type: Number, default: 0 },
  billingPeriod: { type: String, default: 'One-Time' },
  domainIncluded: { type: Boolean, default: true },
  domainNote: { type: String, default: '' },
  turnaroundTime: { type: String, default: '' },
  description: { type: String, default: '' },
  features: [{ type: String }],
  deliverables: [{ type: String }],
  techStack: [{ type: String }],
  idealFor: { type: String, default: '' },
  isVisible: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

// 7. Site Content Singleton Schema
const siteContentSchema = new mongoose.Schema({
  id: { type: String, default: 'site_singleton', unique: true },
  hero: {
    line1: { type: String, default: 'CODEVERSE' },
    line2: { type: String, default: 'TURNING IDEAS INTO' },
    line3: { type: String, default: 'TECHNOLOGY' },
    badge1: { type: String, default: 'Production-Grade Distributed Cloud Systems' },
    badge2: { type: String, default: 'Zero-Downtime Mission-Critical Deployments' },
    statCode: { type: String, default: '100% Type-Safe Architecture' }
  },
  story: {
    heading: { type: String, default: 'Engineered for Performance. Built for Reliability.' },
    subheading: { type: String, default: 'We build mission-critical digital systems with architectural precision.' },
    paragraph1: { type: String, default: 'Founded by engineers with deep passion for distributed computing, CodeVerse designs, architects, and scales resilient full-stack systems. We eliminate technical debt at the design phase.' },
    paragraph2: { type: String, default: 'From real-time campus dining ecosystems to intelligent OCR pipeline fleets, our software powers operations with sub-100ms response times and zero-downtime reliability.' },
    stats: [
      { label: { type: String, default: 'Clean Codebase' }, value: { type: String, default: '100%' } },
      { label: { type: String, default: 'API Latency' }, value: { type: String, default: '<200ms' } },
      { label: { type: String, default: 'Architecture' }, value: { type: String, default: 'ACID' } },
      { label: { type: String, default: 'Sprint Delivery' }, value: { type: String, default: '30 Days' } }
    ]
  },
  process: [
    {
      num: { type: String, default: '01' },
      title: { type: String, default: 'Discovery & System Design' },
      shortTitle: { type: String, default: 'System Discovery' },
      image: { type: String, default: '/process/step-01-discovery.jpg' },
      deliverables: [{ type: String }]
    },
    {
      num: { type: String, default: '02' },
      title: { type: String, default: 'Rapid Prototyping & Validation' },
      shortTitle: { type: String, default: 'Interactive Prototyping' },
      image: { type: String, default: '/process/step-02-prototyping.jpg' },
      deliverables: [{ type: String }]
    },
    {
      num: { type: String, default: '03' },
      title: { type: String, default: 'Production Engineering' },
      shortTitle: { type: String, default: 'Full-Stack Engineering' },
      image: { type: String, default: '/process/step-03-engineering.jpg' },
      deliverables: [{ type: String }]
    },
    {
      num: { type: String, default: '04' },
      title: { type: String, default: 'QA, Security & Hardening' },
      shortTitle: { type: String, default: 'Security & QA' },
      image: { type: String, default: '/process/step-04-qa-security.jpg' },
      deliverables: [{ type: String }]
    },
    {
      num: { type: String, default: '05' },
      title: { type: String, default: 'Deployment & Observability' },
      shortTitle: { type: String, default: 'CI/CD & Live Telemetry' },
      image: { type: String, default: '/process/step-05-deployment.jpg' },
      deliverables: [{ type: String }]
    }
  ],
  globalVision: {
    headline: { type: String, default: 'Engineered Locally. Deployed Globally.' },
    subheading: { type: String, default: 'Headquartered in India, building scalable cloud platforms for global high-growth businesses and enterprises.' },
    metrics: [
      { label: { type: String, default: 'Global Delivery' }, value: { type: String, default: '24/7' } },
      { label: { type: String, default: 'Average Uptime' }, value: { type: String, default: '99.98%' } },
      { label: { type: String, default: 'Source Code IP' }, value: { type: String, default: '100% Client Owned' } }
    ]
  },
  siteSettings: {
    companyName: { type: String, default: 'CodeVerse' },
    legalHeadquarters: { type: String, default: 'Corporate Headquarters: India • Global Remote Delivery' },
    contactEmail: { type: String, default: 'leadership@codeverse.tech' },
    contactPhone: { type: String, default: '+91 99999 99999' },
    copyrightNotice: { type: String, default: '© 2026 CodeVerse. All rights reserved.' }
  },
  updatedAt: { type: Date, default: Date.now }
});

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
export const PlanRegistration = mongoose.models.PlanRegistration || mongoose.model('PlanRegistration', planRegistrationSchema);
export const ServiceModel = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);
export const TeamModel = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);
export const PlanModel = mongoose.models.PlanPackage || mongoose.model('PlanPackage', planSchema);
export const SiteContentModel = mongoose.models.SiteContent || mongoose.model('SiteContent', siteContentSchema);

export const DEFAULT_ATLAS_URI = 'mongodb+srv://Lakshay:Lakshay123@ourcompany.fwhyx65.mongodb.net/codeverse?compressors=zlib';

let cachedConnectionPromise = null;

// Connect to MongoDB Atlas with serverless connection pooling & reuse
export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    isMongoConnected = true;
    return true;
  }

  if (cachedConnectionPromise) {
    try {
      await cachedConnectionPromise;
      isMongoConnected = mongoose.connection.readyState === 1;
      return isMongoConnected;
    } catch {
      cachedConnectionPromise = null;
    }
  }

  const uri = (process.env.MONGODB_URI && process.env.MONGODB_URI.trim()) || DEFAULT_ATLAS_URI;

  try {
    console.log('[Database] Connecting to online MongoDB Atlas cluster...');
    cachedConnectionPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    });
    await cachedConnectionPromise;
    isMongoConnected = true;
    console.log('[Database] Successfully connected to online MongoDB Atlas database.');
    return true;
  } catch (err) {
    console.warn('[Database] MongoDB Atlas connection error:', err.message);
    isMongoConnected = false;
    cachedConnectionPromise = null;
    return false;
  }
}

export function isConnected() {
  return mongoose.connection.readyState === 1;
}
