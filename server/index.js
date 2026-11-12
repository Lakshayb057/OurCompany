import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { 
  connectDB, isConnected, 
  Inquiry, PlanRegistration, ServiceModel, ProductModel, TeamModel, PlanModel, SiteContentModel 
} from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const DATA_FILE = path.join(__dirname, 'data', 'store.json');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serverless-ready MongoDB Atlas connection middleware
// Ensures online Atlas DB is connected before resolving any API endpoint on Vercel or local
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    try {
      await connectDB();
      if (isConnected()) {
        await seedInitialDataIfEmpty();
      }
    } catch (err) {
      console.warn('[Database] Middleware connection warning:', err.message);
    }
  }
  next();
});

// Non-blocking initial connection attempt on startup
connectDB().catch(() => {});

// Helper to read local JSON data store fallback
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return getInitialEmptyStore();
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.planRegistrations) parsed.planRegistrations = [];
    if (!parsed.plans) parsed.plans = [];
    if (!parsed.siteContent) parsed.siteContent = getDefaultSiteContent();
    return parsed;
  } catch (err) {
    console.error('Error reading data store:', err);
    return getInitialEmptyStore();
  }
}

// Helper to write data store fallback
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    // Expected on serverless read-only platforms like Vercel
    return false;
  }
}

function getInitialEmptyStore() {
  return { 
    inquiries: [], 
    planRegistrations: [], 
    services: [], 
    products: [], 
    team: [], 
    plans: [], 
    internalProjects: [],
    siteContent: getDefaultSiteContent()
  };
}

function getDefaultSiteContent() {
  return {
    hero: {
      line1: 'CODEVERSE',
      line2: 'TURNING IDEAS INTO',
      line3: 'TECHNOLOGY',
      badge1: 'Production-Grade Distributed Cloud Systems',
      badge2: 'Zero-Downtime Mission-Critical Deployments',
      statCode: '100% Type-Safe Architecture'
    },
    story: {
      heading: 'Engineered for Performance. Built for Reliability.',
      subheading: 'We build mission-critical digital systems with architectural precision.',
      paragraph1: 'Founded by engineers with deep passion for distributed computing, CodeVerse designs, architects, and scales resilient full-stack systems. We eliminate technical debt at the design phase.',
      paragraph2: 'From real-time campus dining ecosystems to intelligent OCR pipeline fleets, our software powers operations with sub-100ms response times and zero-downtime reliability.',
      stats: [
        { label: 'Clean Codebase', value: '100%' },
        { label: 'API Latency', value: '<200ms' },
        { label: 'Architecture', value: 'ACID' },
        { label: 'Sprint Delivery', value: '30 Days' }
      ]
    },
    process: [
      {
        num: '01',
        title: 'Discovery & System Design',
        shortTitle: 'System Discovery',
        image: '/process/step-01-discovery.jpg',
        deliverables: ['SRS & Architectural Blueprint', 'Entity Relationship Diagram', 'API Contract Specification']
      },
      {
        num: '02',
        title: 'Rapid Prototyping & Validation',
        shortTitle: 'Interactive Prototyping',
        image: '/process/step-02-prototyping.jpg',
        deliverables: ['Figma Design System', 'Key Interaction Proof-of-Concept', 'Database Schema Validation']
      },
      {
        num: '03',
        title: 'Production Engineering',
        shortTitle: 'Full-Stack Engineering',
        image: '/process/step-03-engineering.jpg',
        deliverables: ['Type-Safe Clean Codebase', 'REST / WebSocket Microservices', 'ACID Data Persistence']
      },
      {
        num: '04',
        title: 'QA, Security & Hardening',
        shortTitle: 'Security & QA',
        image: '/process/step-04-qa-security.jpg',
        deliverables: ['Unit & Integration Testing', 'Security & RBAC Auditing', 'Sub-200ms Latency Tuning']
      },
      {
        num: '05',
        title: 'Deployment & Observability',
        shortTitle: 'CI/CD & Live Telemetry',
        image: '/process/step-05-deployment.jpg',
        deliverables: ['Zero-Downtime CI/CD Handover', 'Structured Logs & Telemetry', 'Full IP & Source Transfer']
      }
    ],
    globalVision: {
      headline: 'Engineered Locally. Deployed Globally.',
      subheading: 'Headquartered in India, building scalable cloud platforms for global high-growth businesses and enterprises.',
      metrics: [
        { label: 'Global Delivery', value: '24/7' },
        { label: 'Average Uptime', value: '99.98%' },
        { label: 'Source Code IP', value: '100% Client Owned' }
      ]
    },
    siteSettings: {
      companyName: 'CodeVerse',
      legalHeadquarters: 'Corporate Headquarters: India • Global Remote Delivery',
      contactEmail: 'leadership@codeverse.tech',
      contactPhone: '+91 99999 99999',
      copyrightNotice: '© 2026 CodeVerse. All rights reserved.'
    }
  };
}

// Seed initial documents to Atlas if collections are newly created
let isSeeded = false;
async function seedInitialDataIfEmpty() {
  if (!isConnected() || isSeeded) return;
  isSeeded = true;
  const store = readData();

  // 1. Services
  const svcCount = await ServiceModel.countDocuments();
  if (svcCount === 0 && store.services?.length) {
    await ServiceModel.insertMany(store.services);
    console.log(`[Seed] Seeded ${store.services.length} services to MongoDB Atlas`);
  }

  // 2. Products
  const prodCount = await ProductModel.countDocuments();
  if (prodCount === 0 && store.products?.length) {
    await ProductModel.insertMany(store.products);
    console.log(`[Seed] Seeded ${store.products.length} products to MongoDB Atlas`);
  }

  // 3. Team
  const teamCount = await TeamModel.countDocuments();
  if (teamCount === 0 && store.team?.length) {
    await TeamModel.insertMany(store.team);
    console.log(`[Seed] Seeded ${store.team.length} team members to MongoDB Atlas`);
  }

  // 4. Site Content
  const contentCount = await SiteContentModel.countDocuments();
  if (contentCount === 0) {
    await SiteContentModel.create(getDefaultSiteContent());
    console.log(`[Seed] Seeded default site content singleton to MongoDB Atlas`);
  }
}

// -------------------------------------------------------------
// PUBLIC API ENDPOINTS
// -------------------------------------------------------------

// Health & System Status
app.get('/api/v1/health', (req, res) => {
  res.json({ 
    success: true, 
    status: 'operational', 
    database: isConnected() ? 'MongoDB Atlas (Connected)' : 'Local JSON Store (Fallback)',
    timestamp: new Date().toISOString() 
  });
});

// Full Dynamic Site Content (Hero, Story, Process, Global Vision, Site Settings)
app.get('/api/v1/content', async (req, res) => {
  if (isConnected()) {
    try {
      const doc = await SiteContentModel.findOne({ id: 'site_singleton' }).lean();
      if (doc) return res.json({ success: true, data: doc });
    } catch (e) {
      console.warn('Error reading content from Atlas:', e.message);
    }
  }
  const store = readData();
  res.json({ success: true, data: store.siteContent || getDefaultSiteContent() });
});

// Services
app.get('/api/v1/services', async (req, res) => {
  if (isConnected()) {
    try {
      const services = await ServiceModel.find().lean();
      if (services && services.length) return res.json({ success: true, data: services });
    } catch (e) {
      console.warn('Error fetching services from Atlas:', e.message);
    }
  }
  const data = readData();
  res.json({ success: true, data: data.services || [] });
});

// Products / Portfolio
app.get('/api/v1/products', async (req, res) => {
  if (isConnected()) {
    try {
      const products = await ProductModel.find().lean();
      if (products && products.length) return res.json({ success: true, data: products });
    } catch (e) {
      console.warn('Error fetching products from Atlas:', e.message);
    }
  }
  const data = readData();
  res.json({ success: true, data: data.products || [] });
});

// Team / Leadership
app.get('/api/v1/team', async (req, res) => {
  if (isConnected()) {
    try {
      const team = await TeamModel.find().lean();
      if (team && team.length) return res.json({ success: true, data: team });
    } catch (e) {
      console.warn('Error fetching team from Atlas:', e.message);
    }
  }
  const data = readData();
  res.json({ success: true, data: data.team || [] });
});

// Plans
app.get('/api/v1/plans', async (req, res) => {
  if (isConnected()) {
    try {
      const plans = await PlanModel.find().lean();
      if (plans && plans.length) return res.json({ success: true, data: plans });
    } catch (e) {
      console.warn('Error fetching plans from Atlas:', e.message);
    }
  }
  const data = readData();
  res.json({ success: true, data: data.plans || [] });
});

// Submit Inquiry
app.post('/api/v1/inquiries', async (req, res) => {
  const { fullName, contact, phone, email, company, country, projectType, budgetRange, timeline, preferredContact, description } = req.body;

  if (!fullName || !fullName.trim()) {
    return res.status(400).json({ success: false, message: 'Full name is required.' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'A valid business email is required.' });
  }
  if (!description || description.trim().length < 10) {
    return res.status(400).json({ success: false, message: 'Please provide at least 10 characters describing your project requirements.' });
  }

  const data = readData();
  const newInquiry = {
    id: `inq-${Date.now()}`,
    fullName: fullName.trim(),
    contact: (contact || phone || '').trim(),
    email: email.trim().toLowerCase(),
    company: company ? company.trim() : '',
    country: (country || 'Global / Remote').trim(),
    projectType: projectType || 'Full-Stack & Cloud Engineering',
    budgetRange: budgetRange || 'Not decided',
    timeline: timeline || 'Flexible',
    preferredContact: preferredContact || 'Phone / Email',
    description: description.trim(),
    status: 'New',
    createdAt: new Date().toISOString()
  };

  data.inquiries.unshift(newInquiry);
  writeData(data);

  if (isConnected()) {
    try {
      await Inquiry.create(newInquiry);
      console.log(`[MongoDB Atlas] Inquiry persisted: ${newInquiry.fullName}`);
    } catch (dbErr) {
      console.error('[MongoDB Atlas] Error writing inquiry:', dbErr.message);
    }
  }

  return res.status(201).json({
    success: true,
    message: 'Thank you for contacting CodeVerse. Your inquiry has been submitted and saved!',
    data: { inquiryId: newInquiry.id, inquiry: newInquiry }
  });
});

// Register for Plan
app.post('/api/v1/plan-registrations', async (req, res) => {
  const { fullName, email, contact, company, planId, planName, category, domainOption, billingPeriod, estimatedPrice, notes } = req.body;

  if (!fullName || !fullName.trim()) return res.status(400).json({ success: false, message: 'Full name is required.' });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return res.status(400).json({ success: false, message: 'A valid email is required.' });
  if (!contact || !contact.trim()) return res.status(400).json({ success: false, message: 'Contact number is required.' });
  if (!planName || !planName.trim()) return res.status(400).json({ success: false, message: 'Plan name is required.' });

  const data = readData();
  data.planRegistrations = data.planRegistrations || [];

  const newReg = {
    id: `plan-reg-${Date.now()}`,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    contact: contact.trim(),
    company: (company || '').trim(),
    planId: (planId || 'custom-plan').trim(),
    planName: planName.trim(),
    category: category || 'General',
    domainOption: domainOption || 'with-domain',
    billingPeriod: billingPeriod || 'One-Time',
    estimatedPrice: estimatedPrice || '',
    notes: (notes || '').trim(),
    status: 'Pending Review',
    createdAt: new Date().toISOString()
  };

  data.planRegistrations.unshift(newReg);
  writeData(data);

  if (isConnected()) {
    try {
      await PlanRegistration.create(newReg);
      console.log(`[MongoDB Atlas] Plan registration saved: ${newReg.fullName}`);
    } catch (dbErr) {
      console.error('[MongoDB Atlas] Error saving plan registration:', dbErr.message);
    }
  }

  return res.status(201).json({
    success: true,
    message: `Plan registration for "${newReg.planName}" confirmed! Our engineering team will contact you within 24 hours.`,
    data: { registrationId: newReg.id }
  });
});

// -------------------------------------------------------------
// ADMIN AUTHENTICATION & CONTROL APIS
// -------------------------------------------------------------

// Admin Login
app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@codeverse.tech' && password === 'CodeVerse@2026') {
    return res.json({
      success: true,
      data: {
        token: 'cv_admin_session_jwt_token_2026',
        user: {
          name: 'Lakshay',
          email: 'admin@codeverse.tech',
          role: 'Super Admin',
          permissions: ['all']
        }
      }
    });
  }
  return res.status(401).json({ success: false, message: 'Invalid administrative credentials.' });
});

// Admin System / Database Connectivity Status
app.get('/api/v1/admin/status', async (req, res) => {
  const store = readData();
  const connected = isConnected();
  let dbInfo = {
    connected,
    provider: 'MongoDB Atlas',
    host: 'ourcompany.fwhyx65.mongodb.net',
    database: 'codeverse',
    counts: {
      inquiries: store.inquiries?.length || 0,
      planRegistrations: store.planRegistrations?.length || 0,
      services: store.services?.length || 0,
      products: store.products?.length || 0,
      team: store.team?.length || 0,
      plans: store.plans?.length || 0
    }
  };

  if (isConnected()) {
    try {
      dbInfo.counts.inquiries = await Inquiry.countDocuments();
      dbInfo.counts.planRegistrations = await PlanRegistration.countDocuments();
      dbInfo.counts.services = await ServiceModel.countDocuments();
      dbInfo.counts.products = await ProductModel.countDocuments();
      dbInfo.counts.team = await TeamModel.countDocuments();
      dbInfo.counts.plans = await PlanModel.countDocuments();
    } catch (e) {
      console.warn('Error reading counts from Atlas:', e.message);
    }
  }

  res.json({ success: true, data: dbInfo });
});

// -------------------------------------------------------------
// SECTION CONTENT CRUD (Hero, Story, Process, Global Vision, Settings)
// -------------------------------------------------------------

app.put('/api/v1/admin/content/:section', async (req, res) => {
  const { section } = req.params;
  const updatePayload = req.body;
  const store = readData();
  store.siteContent = store.siteContent || getDefaultSiteContent();

  store.siteContent[section] = updatePayload;
  store.siteContent.updatedAt = new Date().toISOString();
  writeData(store);

  if (isConnected()) {
    try {
      await SiteContentModel.findOneAndUpdate(
        { id: 'site_singleton' },
        { [section]: updatePayload, updatedAt: new Date() },
        { upsert: true, new: true }
      );
      console.log(`[MongoDB Atlas] SiteContent.${section} updated successfully`);
    } catch (e) {
      console.error('[MongoDB Atlas] Error updating site content:', e.message);
    }
  }

  res.json({ 
    success: true, 
    message: `${section.toUpperCase()} section updated successfully.`, 
    data: store.siteContent[section] 
  });
});

// -------------------------------------------------------------
// SERVICES CRUD (Add, Update, Delete)
// -------------------------------------------------------------

app.post('/api/v1/admin/services', async (req, res) => {
  const newService = {
    ...req.body,
    id: req.body.id || `srv-${Date.now()}`
  };
  const store = readData();
  store.services = store.services || [];
  store.services.push(newService);
  writeData(store);

  if (isConnected()) {
    try {
      await ServiceModel.create(newService);
    } catch (e) {
      console.warn('Atlas service create error:', e.message);
    }
  }

  res.status(201).json({ success: true, message: 'Service added successfully.', data: newService });
});

app.put('/api/v1/admin/services/:id', async (req, res) => {
  const { id } = req.params;
  const updatedService = req.body;
  const store = readData();
  store.services = store.services || [];
  const idx = store.services.findIndex(s => s.id === id);
  if (idx !== -1) {
    store.services[idx] = { ...store.services[idx], ...updatedService };
  } else {
    store.services.push({ id, ...updatedService });
  }
  writeData(store);

  if (isConnected()) {
    try {
      await ServiceModel.findOneAndUpdate({ id }, updatedService, { upsert: true, new: true });
    } catch (e) {
      console.warn('Atlas service update error:', e.message);
    }
  }

  res.json({ success: true, message: 'Service updated successfully.', data: updatedService });
});

app.delete('/api/v1/admin/services/:id', async (req, res) => {
  const { id } = req.params;
  const store = readData();
  store.services = (store.services || []).filter(s => s.id !== id);
  writeData(store);

  if (isConnected()) {
    try {
      await ServiceModel.deleteOne({ id });
    } catch (e) {
      console.warn('Atlas service delete error:', e.message);
    }
  }

  res.json({ success: true, message: 'Service deleted successfully.' });
});

// -------------------------------------------------------------
// PRODUCTS / PORTFOLIO CRUD (Add, Update, Delete)
// -------------------------------------------------------------

app.post('/api/v1/admin/products', async (req, res) => {
  const newProduct = {
    ...req.body,
    id: req.body.id || `prod-${Date.now()}`
  };
  const store = readData();
  store.products = store.products || [];
  store.products.push(newProduct);
  writeData(store);

  if (isConnected()) {
    try {
      await ProductModel.create(newProduct);
    } catch (e) {
      console.warn('Atlas product create error:', e.message);
    }
  }

  res.status(201).json({ success: true, message: 'Project added successfully.', data: newProduct });
});

app.put('/api/v1/admin/products/:id', async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const store = readData();
  store.products = store.products || [];
  const idx = store.products.findIndex(p => p.id === id);
  if (idx !== -1) {
    store.products[idx] = { ...store.products[idx], ...updatedProduct };
  } else {
    store.products.push({ id, ...updatedProduct });
  }
  writeData(store);

  if (isConnected()) {
    try {
      await ProductModel.findOneAndUpdate({ id }, updatedProduct, { upsert: true, new: true });
    } catch (e) {
      console.warn('Atlas product update error:', e.message);
    }
  }

  res.json({ success: true, message: 'Project updated successfully.', data: updatedProduct });
});

app.delete('/api/v1/admin/products/:id', async (req, res) => {
  const { id } = req.params;
  const store = readData();
  store.products = (store.products || []).filter(p => p.id !== id);
  writeData(store);

  if (isConnected()) {
    try {
      await ProductModel.deleteOne({ id });
    } catch (e) {
      console.warn('Atlas product delete error:', e.message);
    }
  }

  res.json({ success: true, message: 'Project deleted successfully.' });
});

// -------------------------------------------------------------
// TEAM MEMBERS CRUD (Add, Update, Delete)
// -------------------------------------------------------------

app.post('/api/v1/admin/team', async (req, res) => {
  const newMember = {
    ...req.body,
    id: req.body.id || `team-${Date.now()}`
  };
  const store = readData();
  store.team = store.team || [];
  store.team.push(newMember);
  writeData(store);

  if (isConnected()) {
    try {
      await TeamModel.create(newMember);
    } catch (e) {
      console.warn('Atlas team create error:', e.message);
    }
  }

  res.status(201).json({ success: true, message: 'Team member added successfully.', data: newMember });
});

app.put('/api/v1/admin/team/:id', async (req, res) => {
  const { id } = req.params;
  const updatedMember = req.body;
  const store = readData();
  store.team = store.team || [];
  const idx = store.team.findIndex(t => t.id === id);
  if (idx !== -1) {
    store.team[idx] = { ...store.team[idx], ...updatedMember };
  } else {
    store.team.push({ id, ...updatedMember });
  }
  writeData(store);

  if (isConnected()) {
    try {
      await TeamModel.findOneAndUpdate({ id }, updatedMember, { upsert: true, new: true });
    } catch (e) {
      console.warn('Atlas team update error:', e.message);
    }
  }

  res.json({ success: true, message: 'Team member updated successfully.', data: updatedMember });
});

app.delete('/api/v1/admin/team/:id', async (req, res) => {
  const { id } = req.params;
  const store = readData();
  store.team = (store.team || []).filter(t => t.id !== id);
  writeData(store);

  if (isConnected()) {
    try {
      await TeamModel.deleteOne({ id });
    } catch (e) {
      console.warn('Atlas team delete error:', e.message);
    }
  }

  res.json({ success: true, message: 'Team member deleted successfully.' });
});

// -------------------------------------------------------------
// PLANS & PACKAGES CRUD (Add, Update, Delete)
// -------------------------------------------------------------

app.post('/api/v1/admin/plans', async (req, res) => {
  const newPlan = {
    ...req.body,
    id: req.body.id || `plan-${Date.now()}`
  };
  const store = readData();
  store.plans = store.plans || [];
  store.plans.push(newPlan);
  writeData(store);

  if (isConnected()) {
    try {
      await PlanModel.create(newPlan);
    } catch (e) {
      console.warn('Atlas plan create error:', e.message);
    }
  }

  res.status(201).json({ success: true, message: 'Plan added successfully.', data: newPlan });
});

app.put('/api/v1/admin/plans/:id', async (req, res) => {
  const { id } = req.params;
  const updatedPlan = req.body;
  const store = readData();
  store.plans = store.plans || [];
  const idx = store.plans.findIndex(p => p.id === id);
  if (idx !== -1) {
    store.plans[idx] = { ...store.plans[idx], ...updatedPlan };
  } else {
    store.plans.push({ id, ...updatedPlan });
  }
  writeData(store);

  if (isConnected()) {
    try {
      await PlanModel.findOneAndUpdate({ id }, updatedPlan, { upsert: true, new: true });
    } catch (e) {
      console.warn('Atlas plan update error:', e.message);
    }
  }

  res.json({ success: true, message: 'Plan updated successfully.', data: updatedPlan });
});

app.delete('/api/v1/admin/plans/:id', async (req, res) => {
  const { id } = req.params;
  const store = readData();
  store.plans = (store.plans || []).filter(p => p.id !== id);
  writeData(store);

  if (isConnected()) {
    try {
      await PlanModel.deleteOne({ id });
    } catch (e) {
      console.warn('Atlas plan delete error:', e.message);
    }
  }

  res.json({ success: true, message: 'Plan deleted successfully.' });
});

// -------------------------------------------------------------
// INQUIRIES & PLAN REGISTRATIONS MANAGEMENT
// -------------------------------------------------------------

app.get('/api/v1/admin/inquiries', async (req, res) => {
  let inquiries = [];
  if (isConnected()) {
    try {
      inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    } catch (e) {
      console.warn('Atlas inquiries fetch error:', e.message);
    }
  }
  if (!inquiries || !inquiries.length) {
    const data = readData();
    inquiries = data.inquiries || [];
  }

  const { status, search } = req.query;
  if (status && status !== 'All') {
    inquiries = inquiries.filter(i => (i.status || '').toLowerCase() === status.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    inquiries = inquiries.filter(i => 
      (i.fullName || '').toLowerCase().includes(q) || 
      (i.email || '').toLowerCase().includes(q) || 
      (i.company && i.company.toLowerCase().includes(q)) ||
      (i.projectType || '').toLowerCase().includes(q)
    );
  }

  res.json({ success: true, data: inquiries });
});

app.patch('/api/v1/admin/inquiries/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const store = readData();
  const idx = store.inquiries.findIndex(i => i.id === id);
  if (idx !== -1) {
    store.inquiries[idx].status = status;
    writeData(store);
  }

  if (isConnected()) {
    try {
      await Inquiry.findOneAndUpdate({ id }, { status });
    } catch (e) {
      console.warn('Atlas inquiry update error:', e.message);
    }
  }

  res.json({ success: true, message: 'Inquiry status updated successfully.' });
});

app.delete('/api/v1/admin/inquiries/:id', async (req, res) => {
  const { id } = req.params;
  const store = readData();
  store.inquiries = (store.inquiries || []).filter(i => i.id !== id);
  writeData(store);

  if (isConnected()) {
    try {
      await Inquiry.deleteOne({ id });
    } catch (e) {
      console.warn('Atlas inquiry delete error:', e.message);
    }
  }

  res.json({ success: true, message: 'Inquiry deleted successfully.' });
});

app.get('/api/v1/admin/plan-registrations', async (req, res) => {
  let regs = [];
  if (isConnected()) {
    try {
      regs = await PlanRegistration.find().sort({ createdAt: -1 }).lean();
    } catch (e) {
      console.warn('Atlas plan registrations fetch error:', e.message);
    }
  }
  if (!regs || !regs.length) {
    const data = readData();
    regs = data.planRegistrations || [];
  }
  res.json({ success: true, data: regs });
});

app.patch('/api/v1/admin/plan-registrations/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const store = readData();
  const idx = (store.planRegistrations || []).findIndex(r => r.id === id);
  if (idx !== -1) {
    store.planRegistrations[idx].status = status;
    writeData(store);
  }

  if (isConnected()) {
    try {
      await PlanRegistration.findOneAndUpdate({ id }, { status });
    } catch (e) {
      console.warn('Atlas plan registration update error:', e.message);
    }
  }

  res.json({ success: true, message: 'Plan registration status updated.' });
});

app.delete('/api/v1/admin/plan-registrations/:id', async (req, res) => {
  const { id } = req.params;
  const store = readData();
  store.planRegistrations = (store.planRegistrations || []).filter(r => r.id !== id);
  writeData(store);

  if (isConnected()) {
    try {
      await PlanRegistration.deleteOne({ id });
    } catch (e) {
      console.warn('Atlas plan registration delete error:', e.message);
    }
  }

  res.json({ success: true, message: 'Plan registration deleted.' });
});

// -------------------------------------------------------------
// CLOUDINARY MEDIA ASSETS CONTROLLERS
// -------------------------------------------------------------

// Check Cloudinary Status
app.get('/api/v1/admin/cloudinary-status', (req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const isConfigured = Boolean(cloudName && apiKey && process.env.CLOUDINARY_API_SECRET);
  res.json({
    success: true,
    data: {
      configured: isConfigured,
      cloudName: cloudName || null,
    }
  });
});

// Upload image to Cloudinary (Folder-based: leadership, projects, process)
app.post('/api/v1/admin/upload-image', async (req, res) => {
  const { image, folder = 'codeverse' } = req.body;
  if (!image) {
    return res.status(400).json({ success: false, message: 'No image data provided.' });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ 
      success: false, 
      message: 'Cloudinary credentials missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env / Vercel Environment Variables.' 
    });
  }

  try {
    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });

    return res.json({
      success: true,
      url: uploadRes.secure_url,
      publicId: uploadRes.public_id,
      format: uploadRes.format,
      width: uploadRes.width,
      height: uploadRes.height,
    });
  } catch (err) {
    console.error('[Cloudinary] Upload error:', err);
    return res.status(500).json({ 
      success: false, 
      message: err.message || 'Image upload to Cloudinary failed.' 
    });
  }
});

// Delete image from Cloudinary by public ID
app.delete('/api/v1/admin/delete-image', async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) return res.status(400).json({ success: false, message: 'publicId required.' });
  try {
    const delRes = await cloudinary.uploader.destroy(publicId);
    res.json({ success: true, result: delRes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin Analytics Overview
app.get('/api/v1/admin/analytics', (req, res) => {
  const data = readData();
  const inquiries = data.inquiries || [];
  const statusCounts = inquiries.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  res.json({
    success: true,
    data: {
      totalInquiries: inquiries.length,
      statusCounts,
      totalProjects: (data.products || []).length,
      totalServices: (data.services || []).length,
      totalPlanRegistrations: (data.planRegistrations || []).length,
      recentInquiries: inquiries.slice(0, 5)
    }
  });
});

// Serve static assets from public/ and built dist/
const PUBLIC_PATH = path.join(__dirname, '..', 'public');
if (fs.existsSync(PUBLIC_PATH)) {
  app.use(express.static(PUBLIC_PATH));
}

const DIST_PATH = path.join(__dirname, '..', 'dist');
if (fs.existsSync(DIST_PATH)) {
  app.use(express.static(DIST_PATH));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(DIST_PATH, 'index.html'));
  });
}

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`CodeVerse Backend running on port ${PORT}`);
  });
}
