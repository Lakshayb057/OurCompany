import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data', 'store.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to read data
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { inquiries: [], services: [], products: [], team: [], internalProjects: [] };
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading data store:', err);
    return { inquiries: [], services: [], products: [], team: [], internalProjects: [] };
  }
}

// Helper to write data
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing data store:', err);
    return false;
  }
}

// Public API: Health
app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, status: 'operational', timestamp: new Date().toISOString() });
});

// Public API: Services
app.get('/api/v1/services', (req, res) => {
  const data = readData();
  res.json({ success: true, data: data.services || [] });
});

// Admin API: Update or Create Service
app.put('/api/v1/services/:id', (req, res) => {
  const { id } = req.params;
  const updatedService = req.body;
  const data = readData();
  data.services = data.services || [];
  const index = data.services.findIndex(s => s.id === id);
  if (index !== -1) {
    data.services[index] = { ...data.services[index], ...updatedService };
  } else {
    data.services.push({ id, ...updatedService });
  }
  writeData(data);
  res.json({ success: true, message: 'Service updated successfully.', data: updatedService });
});

// Public API: Products
app.get('/api/v1/products', (req, res) => {
  const data = readData();
  res.json({ success: true, data: data.products || [] });
});

// Admin API: Update or Create Product
app.put('/api/v1/products/:id', (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const data = readData();
  data.products = data.products || [];
  const index = data.products.findIndex(p => p.id === id);
  if (index !== -1) {
    data.products[index] = { ...data.products[index], ...updatedProduct };
  } else {
    data.products.push({ id, ...updatedProduct });
  }
  writeData(data);
  res.json({ success: true, message: 'Product updated successfully.', data: updatedProduct });
});

// Public API: Team / Leadership
app.get('/api/v1/team', (req, res) => {
  const data = readData();
  res.json({ success: true, data: data.team || [] });
});

// Public API: Submit Inquiry (FR-09, FR-10, FR-11)
app.post('/api/v1/inquiries', (req, res) => {
  const { fullName, email, company, country, projectType, budgetRange, timeline, preferredContact, description } = req.body;

  // Validation
  if (!fullName || !fullName.trim()) {
    return res.status(400).json({ success: false, message: 'Full name is required.' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'A valid business email is required.' });
  }
  if (!country || !country.trim()) {
    return res.status(400).json({ success: false, message: 'Country is required.' });
  }
  if (!projectType) {
    return res.status(400).json({ success: false, message: 'Project type is required.' });
  }
  if (!description || description.trim().length < 10) {
    return res.status(400).json({ success: false, message: 'Please provide at least 10 characters describing your project requirements.' });
  }

  const data = readData();
  const newInquiry = {
    id: `inq-${Date.now()}`,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    company: company ? company.trim() : '',
    country: country.trim(),
    projectType,
    budgetRange: budgetRange || 'Not decided',
    timeline: timeline || 'Flexible',
    preferredContact: preferredContact || 'Email',
    description: description.trim(),
    status: 'New',
    createdAt: new Date().toISOString()
  };

  data.inquiries.unshift(newInquiry);
  writeData(data);

  // Email Notification simulation as per Section 5.1 & 7.1
  console.log(`[Notification Dispatch] New qualified project inquiry received from ${newInquiry.fullName} (${newInquiry.email}) for ${newInquiry.projectType}.`);

  return res.status(201).json({
    success: true,
    message: 'Thank you for contacting CodeVerse. Our engineering leadership will review your inquiry within 24 hours.',
    data: { inquiryId: newInquiry.id }
  });
});

// Auth API: Admin Login
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

// Admin API: List Inquiries
app.get('/api/v1/admin/inquiries', (req, res) => {
  const data = readData();
  const { status, search } = req.query;
  let inquiries = data.inquiries || [];

  if (status && status !== 'All') {
    inquiries = inquiries.filter(i => i.status.toLowerCase() === status.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    inquiries = inquiries.filter(i => 
      i.fullName.toLowerCase().includes(q) || 
      i.email.toLowerCase().includes(q) || 
      (i.company && i.company.toLowerCase().includes(q)) ||
      i.projectType.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, data: inquiries });
});

// Admin API: Update Inquiry Status
app.patch('/api/v1/admin/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const data = readData();
  const index = data.inquiries.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Inquiry not found.' });
  }

  data.inquiries[index].status = status;
  writeData(data);
  res.json({ success: true, message: 'Inquiry status updated successfully.', data: data.inquiries[index] });
});

// Admin API: Internal Projects & Allocation Management (FR-14 & 10.4)
app.get('/api/v1/admin/projects', (req, res) => {
  const data = readData();
  res.json({ success: true, data: data.internalProjects || [] });
});

// Admin API: Validate Allocation Rule
app.post('/api/v1/admin/allocations/validate', (req, res) => {
  const { projectLead, engineering, companyReserve, budget } = req.body;
  const leadPct = Number(projectLead) || 0;
  const engPct = Number(engineering) || 0;
  const compPct = Number(companyReserve) || 0;
  const total = leadPct + engPct + compPct;

  if (Math.abs(total - 100) > 0.01) {
    return res.status(400).json({
      success: false,
      message: `Invalid allocation: percentages sum to ${total}%, but must total exactly 100%.`
    });
  }

  const b = Number(budget) || 0;
  const breakdown = {
    totalBudget: b,
    leadAmount: (b * leadPct) / 100,
    engineeringAmount: (b * engPct) / 100,
    companyAmount: (b * compPct) / 100,
    valid: true
  };

  res.json({ success: true, message: 'Allocation percentages valid (100%).', data: breakdown });
});

// Admin API: Analytics Overview (FR-16)
app.get('/api/v1/admin/analytics', (req, res) => {
  const data = readData();
  const inquiries = data.inquiries || [];
  const totalInquiries = inquiries.length;
  const statusCounts = inquiries.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const projectCounts = (data.products || []).length;
  const servicesCounts = (data.services || []).length;

  res.json({
    success: true,
    data: {
      totalInquiries,
      statusCounts,
      totalProjects: projectCounts,
      totalServices: servicesCounts,
      recentInquiries: inquiries.slice(0, 5)
    }
  });
});

// Serve built frontend assets if dist exists
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
