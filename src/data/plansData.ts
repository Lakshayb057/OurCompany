export interface PlanPackage {
  id: string;
  name: string;
  tagline: string;
  category: 'website' | 'webapp' | 'ecommerce' | 'enterprise' | 'ai' | 'amc' | 'single-page' | 'web-app' | 'software' | 'yearly';
  badge?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  priceINR: number;
  priceUSD: number;
  startingPrice?: boolean;
  billingPeriod: 'One-Time' | 'Yearly Retainer' | 'Monthly Retainer';
  billingCycle?: string;
  popular?: boolean;
  domainIncluded: boolean;
  domainNote?: string;
  turnaroundTime: string;
  description: string;
  features: string[];
  deliverables: string[];
  techStack: string[];
  idealFor: string;
  isVisible?: boolean;
}

export const PLAN_CATEGORIES = [
  { id: 'all', label: 'All Plans & Packages', shortDesc: 'Complete catalog of 14 engineering packages' },
  { id: 'website', label: 'Website Development', shortDesc: '₹9,999 onwards · Portfolios, business websites and corporate presence' },
  { id: 'webapp', label: 'Web Applications', shortDesc: '₹89,999 onwards · MVPs, client portals & scalable SaaS systems' },
  { id: 'ecommerce', label: 'E-Commerce Solutions', shortDesc: '₹59,999 onwards · Online stores & multi-vendor marketplaces' },
  { id: 'enterprise', label: 'Enterprise Software', shortDesc: '₹2,49,999 onwards · ERP, CRM and institutional management systems' },
  { id: 'ai', label: 'AI & Automation', shortDesc: '₹1,49,999 onwards · AI agents, OCR & intelligent document workflows' },
  { id: 'amc', label: 'Annual Retainers (AMC)', shortDesc: '₹14,999/yr onwards · Dedicated maintenance, backups & SLA support' },
] as const;

export const PLANS_DATA: PlanPackage[] = [
  // ==========================================
  // 1. WEBSITE DEVELOPMENT PACKAGES
  // ==========================================
  {
    id: 'plan-01-static-portfolio',
    name: 'Static Website & Portfolio',
    tagline: 'Recommended entry-level pricing for individuals, portfolios and consultants',
    category: 'website',
    badge: 'Starter',
    priceINR: 9999,
    priceUSD: 129,
    billingPeriod: 'One-Time',
    turnaroundTime: '3–5 business days',
    domainIncluded: false,
    domainNote: 'Domain not included. Optional at actual registration cost.',
    description: 'Custom single-page responsive website with modern UI, mobile optimization, and fast turnaround for personal branding.',
    idealFor: 'Personal portfolios, freelancers, students, consultants and individuals.',
    features: [
      'Custom single-page responsive website',
      'Modern UI with mobile optimization',
      'About, Services, Projects and Contact sections',
      'WhatsApp and email integration',
      'Basic on-page SEO optimization',
      'Social media integration',
      'Smooth animations and transitions',
      'Free hosting for 1 year',
      'SSL configuration',
      'Complete source code handover',
      '15 days complimentary bug-fix support'
    ],
    deliverables: [
      'Complete Source Code Handover',
      '1-Year Free Hosting on Vercel / Cloudflare',
      'SSL Certificate Setup',
      '15 Days Complimentary Bug-Fix Support'
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Cloudflare Pages / Vercel'],
    isVisible: true
  },
  {
    id: 'plan-02-business-website',
    name: 'Business Website – UI/UX',
    tagline: 'High-converting commercial website with up to 10 custom pages and maps integration',
    category: 'website',
    badge: 'Popular',
    isPopular: true,
    priceINR: 17999,
    priceUSD: 249,
    billingPeriod: 'One-Time',
    turnaroundTime: '5–7 business days',
    domainIncluded: true,
    domainNote: 'Without domain: ₹17,999 · With domain: ₹19,999 (Includes standard domain allowance up to ₹2,000 for 1 year).',
    description: 'Up to 10 custom-designed pages with premium UI/UX, contact forms, Google Maps, and full analytics integration.',
    idealFor: 'Startups, agencies, local businesses, professionals and service providers.',
    features: [
      'Up to 10 custom-designed pages',
      'Premium UI/UX design & fluid layouts',
      'Fully responsive for mobile, tablet & desktop',
      'Home, About, Services, Contact & other business pages',
      'Contact and inquiry capture forms',
      'WhatsApp click-to-chat integration',
      'Google Maps location integration',
      'Basic SEO optimization',
      'Google Analytics integration',
      'Social media integration',
      'Free hosting for 1 year',
      'SSL certificate configuration',
      'Source code handover',
      '30 days complimentary bug-fix support'
    ],
    deliverables: [
      '10 Custom Pages with Source Code Transfer',
      'Domain Setup Allowance (up to ₹2,000)',
      '1-Year Free Hosting & Standard SSL',
      '30 Days Complimentary Bug-Fix Support'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    isVisible: true
  },
  {
    id: 'plan-03-professional-business',
    name: 'Professional Business Website',
    tagline: 'Up to 15 pages with dynamic CMS, technical SEO, blog, and Schema markup',
    category: 'website',
    badge: 'Professional',
    priceINR: 29999,
    priceUSD: 399,
    billingPeriod: 'One-Time',
    turnaroundTime: '7–12 business days',
    domainIncluded: true,
    domainNote: 'Includes 1-year standard domain registration + SSL deployment',
    description: 'Enterprise-grade corporate website with up to 15 pages, blog engine, technical SEO, and lead notification pipelines.',
    idealFor: 'Growing companies, professional agencies and established businesses.',
    features: [
      'Up to 15 professionally designed pages',
      'Advanced UI/UX and custom animations',
      'Dynamic content management capabilities',
      'Blog / News publication section',
      'Advanced inquiry forms with validation',
      'Lead capture and email notifications',
      'Google Analytics 4 and Search Console setup',
      'Technical SEO implementation',
      'Schema markup and OpenGraph integration',
      'Performance and speed optimization',
      'Free 1-year hosting',
      '1-year standard domain registration',
      'SSL and deployment configuration',
      'Complete source code and documentation',
      '45 days complimentary support'
    ],
    deliverables: [
      '15 Custom Designed Pages with Dynamic CMS',
      '1-Year Standard Domain Registration & SSL',
      'Google Analytics 4 & Search Console Setup',
      '45 Days Complimentary Engineering Support'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Vercel / Cloudflare'],
    isVisible: true
  },
  {
    id: 'plan-04-ecommerce-website',
    name: 'E-Commerce Website',
    tagline: 'Custom online store with Razorpay payment gateway, catalogue & admin dashboard',
    category: 'ecommerce',
    badge: 'Online Store',
    isPopular: true,
    priceINR: 59999,
    priceUSD: 799,
    billingPeriod: 'One-Time',
    turnaroundTime: '3–4 weeks',
    domainIncluded: true,
    domainNote: 'Standard domain registration for 1 year included',
    description: 'End-to-end online store supporting up to 100 products, Razorpay payment gateway, inventory management, and customer accounts.',
    idealFor: 'Retailers, D2C brands and businesses looking to sell online.',
    features: [
      'Custom e-commerce website architecture',
      'Product catalogue (up to 100 products)',
      'Product categories, filters and instant search',
      'Shopping cart and checkout experience',
      'Razorpay payment gateway integration',
      'Order management dashboard',
      'Real-time inventory management',
      'Customer accounts and order history',
      'Coupon and discount code engine',
      'Automated order email notifications',
      'Admin control dashboard',
      'Basic sales analytics & reporting',
      'Free 1-year hosting',
      'Standard domain registration for 1 year',
      'SSL configuration & security hardening',
      '60 days complimentary support'
    ],
    deliverables: [
      'Production Online Store with Razorpay Gateway',
      'Admin Management & Inventory Dashboard',
      '1-Year Domain Registration & Free Hosting',
      '60 Days Complimentary Support'
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB / PostgreSQL', 'Razorpay'],
    isVisible: true
  },
  {
    id: 'plan-05-advanced-marketplace',
    name: 'Advanced E-Commerce & Marketplace',
    tagline: 'Multi-vendor marketplace with vendor dashboards, commission engine & analytics',
    category: 'ecommerce',
    badge: 'Marketplace',
    startingPrice: true,
    priceINR: 99999,
    priceUSD: 1299,
    billingPeriod: 'One-Time',
    turnaroundTime: '4–7 weeks',
    domainIncluded: true,
    domainNote: 'Custom domain and multi-tenant hosting setup included',
    description: 'Multi-vendor e-commerce platform with vendor onboarding, commission payouts, fulfillment tracking, and advanced analytics.',
    idealFor: 'Growing online businesses and multi-vendor marketplaces.',
    features: [
      'Advanced product management system',
      'Multi-vendor functionality & onboarding',
      'Vendor registration and self-serve dashboards',
      'Commission management & automated splits',
      'Advanced inventory management',
      'Order tracking and fulfillment pipeline',
      'Payment, refund, and payout workflows',
      'Customer and vendor relationship management',
      'Advanced analytics, sales telemetry & reporting',
      'Promotional campaigns and coupon engine',
      'Role-based admin access control (RBAC)',
      'Production deployment and architectural docs',
      '90 days complimentary support'
    ],
    deliverables: [
      'Complete Multi-Vendor Marketplace Platform',
      'Vendor Self-Serve Portals & Commission Engine',
      'Redis Caching & Payment Settlement Workflows',
      '90 Days Complimentary Engineering Support'
    ],
    techStack: ['React / Next.js', 'Node.js', 'PostgreSQL / MongoDB', 'Redis', 'Razorpay'],
    isVisible: true
  },

  // ==========================================
  // 2. WEB APPLICATION DEVELOPMENT
  // ==========================================
  {
    id: 'plan-06-startup-mvp',
    name: 'Startup MVP Web Application',
    tagline: 'Build and launch your first functional software product in 30 days',
    category: 'webapp',
    badge: 'Founder Favorite',
    isPopular: true,
    priceINR: 89999,
    priceUSD: 1199,
    billingPeriod: 'One-Time',
    turnaroundTime: '3–5 weeks',
    domainIncluded: true,
    domainNote: 'Production cloud deployment on modern infrastructure included',
    description: 'Full-stack software product with frontend, backend REST API, database architecture, JWT authentication, and admin reporting.',
    idealFor: 'Startups, founders, educational platforms, and service providers requiring actual software.',
    features: [
      'Custom frontend and backend architecture',
      'User registration and secure authentication',
      'JWT authentication with session management',
      'Role-based access control (RBAC)',
      'User dashboard with real-time UI states',
      'Production database architecture & migrations',
      'Full CRUD operations for core workflows',
      'REST API development & documentation',
      'Automated email notifications',
      'Third-party API integration',
      'Admin dashboard for platform governance',
      'Basic reporting, audit metrics and analytics',
      'Production deployment to cloud infrastructure',
      'Technical architecture documentation',
      '90 days bug-fix support'
    ],
    deliverables: [
      'Production Full-Stack Web Application',
      'JWT Auth, RBAC & Database Migrations',
      'REST API Documentation & Cloud Deployment',
      '90 Days Bug-Fix & Engineering Support'
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB / PostgreSQL', 'Tailwind CSS'],
    isVisible: true
  },
  {
    id: 'plan-07-advanced-webapp',
    name: 'Advanced Web Application',
    tagline: 'Multi-role operational system with webhooks, dynamic reporting & Docker CI/CD',
    category: 'webapp',
    badge: 'Advanced',
    priceINR: 129999,
    priceUSD: 1699,
    billingPeriod: 'One-Time',
    turnaroundTime: '4–6 weeks',
    domainIncluded: true,
    domainNote: 'Production containerized cloud deployment included',
    description: 'Advanced full-stack operational system with multi-role dashboards, payment gateway, webhook automation, and file management.',
    idealFor: 'Businesses requiring advanced workflows, dashboards and operational systems.',
    features: [
      'Complete full-stack architectural engineering',
      'Multi-role customized dashboards',
      'Advanced authentication and granular RBAC',
      'Dynamic reporting, exports and analytics',
      'Real-time notifications & event listeners',
      'Advanced multi-parameter search & filtering',
      'Payment gateway integration & invoice generation',
      'Email and webhook event automation',
      'File and secure document management (Cloudinary/S3)',
      'Admin master control panel',
      'OpenAPI / Swagger documentation',
      'Automated deployment pipeline (CI/CD with Docker)',
      '90 days engineering support'
    ],
    deliverables: [
      'Scalable Multi-Role Operational Web Application',
      'Webhook Automation & Real-Time Notification Bus',
      'Dockerized Container Deployment & API Docs',
      '90 Days Dedicated Engineering Support'
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker'],
    isVisible: true
  },
  {
    id: 'plan-08-saas-platform',
    name: 'SaaS Multi-Tenant Platform',
    tagline: 'Multi-tenant architecture with tenant-level data isolation & subscription billing',
    category: 'webapp',
    badge: 'Scalable SaaS',
    isBestValue: true,
    priceINR: 169999,
    priceUSD: 2199,
    billingPeriod: 'One-Time',
    turnaroundTime: '5–8 weeks',
    domainIncluded: true,
    domainNote: 'AWS / Cloud infrastructure deployment configured',
    description: 'Production-grade SaaS platform with workspace organization, tenant data isolation, recurring billing, team invites, and superpanel.',
    idealFor: 'Founders building subscription-based software platforms and B2B SaaS.',
    features: [
      'Multi-tenant cloud architecture',
      'Workspace and organization management',
      'Tenant-level strict data isolation',
      'Subscription and recurring billing integration',
      'User invitations and team role management',
      'Granular role and permission management (RBAC)',
      'Admin superpanel for global tenant oversight',
      'Real-time notifications and alerts',
      'Usage tracking and metering telemetry',
      'Advanced reports and data exports (CSV/PDF)',
      'Complete API documentation',
      'Cloud deployment (Docker, Redis, AWS / DigitalOcean)',
      '120 days complimentary support'
    ],
    deliverables: [
      'Production Multi-Tenant SaaS Engine',
      'Tenant Data Isolation & Subscription Gateways',
      'Admin Superpanel & Usage Tracking',
      '120 Days Complimentary Engineering Support'
    ],
    techStack: ['Next.js / React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    isVisible: true
  },

  // ==========================================
  // 3. ENTERPRISE SOFTWARE
  // ==========================================
  {
    id: 'plan-09-custom-enterprise',
    name: 'Custom Enterprise Software',
    tagline: 'Custom ERP / CRM architecture, multi-department portals & automated workflows',
    category: 'enterprise',
    badge: 'Enterprise',
    startingPrice: true,
    priceINR: 249999,
    priceUSD: 3299,
    billingPeriod: 'One-Time',
    turnaroundTime: '6–10 weeks or project-dependent',
    domainIncluded: true,
    domainNote: 'Complete enterprise cloud deployment & staff training included',
    description: 'Custom institutional ERP / CRM operating system with multi-department dashboards, attendance, financial fees, audit logs, and 6 months warranty.',
    idealFor: 'Educational institutions, organizations, enterprises and operational businesses.',
    features: [
      'Custom ERP / CRM enterprise architecture',
      'Multi-department dedicated dashboards',
      'Super Admin and granular role-based portals',
      'Employee / student / customer lifecycle management',
      'Workflow and hierarchical approval automation',
      'Attendance and leave management (where applicable)',
      'Financial tracking, billing, and fee management',
      'Automated reports and PDF document generation',
      'Immutable audit logs and security access control',
      'Database backup and disaster recovery architecture',
      'Custom enterprise integrations & legacy bridges',
      'Production deployment and hands-on staff training',
      'Complete source code handover with zero lock-in',
      '6 months complimentary bug-fix support'
    ],
    deliverables: [
      'Complete Turnkey Enterprise ERP / CRM Software',
      'Departmental Portals, Role-Based Access & Audit Logs',
      'Production AWS Deployment & Staff Training Handover',
      '6 Months Complimentary Bug-Fix Support'
    ],
    techStack: ['Node.js', 'React', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    isVisible: true
  },

  // ==========================================
  // 4. AI, AUTOMATION & INTELLIGENT SYSTEMS
  // ==========================================
  {
    id: 'plan-10-ai-automation',
    name: 'AI Automation & Document Processing',
    tagline: 'OCR text extraction, LLM classification, and automated approval pipelines',
    category: 'ai',
    badge: 'AI Powered',
    priceINR: 149999,
    priceUSD: 1899,
    billingPeriod: 'One-Time',
    turnaroundTime: '4–7 weeks',
    domainIncluded: true,
    domainNote: 'Containerized AI pipeline deployment included',
    description: 'Intelligent document extraction, Gemini multimodal OCR, automated classification, and human-in-the-loop review dashboards.',
    idealFor: 'Businesses automating repetitive operations and document workflows.',
    features: [
      'AI-powered document processing & OCR text extraction',
      'Multimodal intelligence & automated classification',
      'LLM API integration (Gemini 2.5 Flash, Groq, OpenAI)',
      'Automated document extraction workflows',
      'Human approval and review workflows',
      'REST API and webhook integration',
      'Dedicated document processing dashboard',
      'Evaluation benchmarks and accuracy testing',
      'Secure enterprise API credential isolation',
      'Production deployment and architectural documentation',
      '90 days bug-fix support'
    ],
    deliverables: [
      'End-to-End AI OCR & Document Extraction Pipeline',
      'Classification Engine & Human Approval Dashboard',
      'Docker Container Deployment & API Webhooks',
      '90 Days Bug-Fix & Optimization Support'
    ],
    techStack: ['Python', 'FastAPI', 'Node.js', 'Gemini API', 'Vector Database', 'Docker'],
    isVisible: true
  },
  {
    id: 'plan-11-custom-ai-agent',
    name: 'Custom AI Agent & Intelligent Platform',
    tagline: 'Multi-agent orchestration, RAG retrieval & autonomous task execution',
    category: 'ai',
    badge: 'Intelligent Agent',
    startingPrice: true,
    priceINR: 199999,
    priceUSD: 2499,
    billingPeriod: 'One-Time',
    turnaroundTime: '5–9 weeks',
    domainIncluded: true,
    domainNote: 'High-availability vector DB and cloud orchestration included',
    description: 'Custom AI agents with multi-agent orchestration, RAG vector retrieval, system integrations, and conversation analytics.',
    idealFor: 'Organizations looking for customized AI agents and intelligent automation.',
    features: [
      'Custom AI agent development & persona engineering',
      'Multi-agent workflow orchestration',
      'RAG-based vector knowledge retrieval',
      'Vector database integration (ChromaDB / Pinecone / pgvector)',
      'AI chatbot, assistant & conversational UI',
      'Business system integrations (CRM, ERP, DB)',
      'Automated task execution with approval controls',
      'Conversation logs and token usage management',
      'Admin monitoring and telemetry dashboard',
      'Model evaluation and latency tuning',
      'Production deployment and security hardening',
      '90 days optimization and support'
    ],
    deliverables: [
      'Custom Multi-Agent Autonomous Platform',
      'RAG Vector Retrieval Index & System Bridges',
      'Admin Monitoring Dashboard & Token Analytics',
      '90 Days Continuous Optimization & Support'
    ],
    techStack: ['Python', 'FastAPI', 'Node.js', 'Gemini', 'LLM APIs', 'ChromaDB / Pinecone'],
    isVisible: true
  },

  // ==========================================
  // 5. ANNUAL MAINTENANCE & TECHNICAL RETAINERS
  // ==========================================
  {
    id: 'plan-12-basic-amc',
    name: 'Basic Website AMC',
    tagline: 'Health monitoring, security updates, weekly backups and technical assistance',
    category: 'amc',
    badge: 'Retainer',
    priceINR: 14999,
    priceUSD: 199,
    billingPeriod: 'Yearly Retainer',
    billingCycle: '/ year',
    turnaroundTime: 'Ongoing 365 Days Support',
    domainIncluded: false,
    domainNote: 'Includes SSL and hosting configuration monitoring',
    description: 'Yearly maintenance package covering uptime monitoring, regular security updates, weekly backups, and monthly developer hours.',
    idealFor: 'Small businesses and portfolio owners needing reliable uptime and peace of mind.',
    features: [
      'Continuous website health and uptime monitoring',
      'SSL and hosting configuration monitoring',
      'Regular security and vulnerability updates',
      'Weekly automated backups (where supported)',
      'Up to 2 hours of monthly minor content/code changes',
      'Bug fixes and direct technical assistance',
      'Direct email and ticket support'
    ],
    deliverables: [
      '24/7 Automated Uptime Monitoring',
      'Weekly Backup Verification & SSL Renewal Tracking',
      'Up to 2 Hours/Month Developer Code Changes',
      'Email Support & Bug-Fix Remediation'
    ],
    techStack: ['Cloudflare', 'Vercel', 'Git CI/CD', 'SSL Monitoring'],
    isVisible: true
  },
  {
    id: 'plan-13-professional-amc',
    name: 'Professional Website & Application AMC',
    tagline: 'Application monitoring, automated database backups, 10 hrs/mo enhancements & priority SLA',
    category: 'amc',
    badge: 'Recommended',
    isPopular: true,
    priceINR: 49999,
    priceUSD: 649,
    billingPeriod: 'Yearly Retainer',
    billingCycle: '/ year',
    turnaroundTime: 'Priority Response SLA',
    domainIncluded: false,
    domainNote: 'Full application and database backup management included',
    description: 'Comprehensive annual retainer with automated database backups, up to 10 hours monthly engineering enhancements, and priority response window.',
    idealFor: 'Growing businesses and active web applications requiring regular enhancements and quick remediation.',
    features: [
      'Continuous website and application monitoring',
      'Security and dependency package updates',
      'Automated daily/weekly database backups',
      'Up to 10 hours monthly enhancement & feature work',
      'Performance and API latency monitoring',
      'Bug remediation & security patches',
      'Monthly technical health and telemetry report',
      'Priority ticket and WhatsApp support',
      'Defined critical-issue response window'
    ],
    deliverables: [
      'Automated Database Backup Scheduling & Archival',
      'Up to 10 Hours/Month Feature & Enhancement Work',
      'Monthly Technical Health & Performance Audit Report',
      'Priority SLA Incident Remediation'
    ],
    techStack: ['MongoDB / PostgreSQL', 'Redis', 'Docker', 'Sentry', 'AWS CloudWatch'],
    isVisible: true
  },
  {
    id: 'plan-14-enterprise-retainer',
    name: 'Enterprise Engineering Retainer',
    tagline: 'Dedicated technical point of contact, 30 hrs/mo engineering, CI/CD & disaster recovery',
    category: 'amc',
    badge: 'Dedicated Retainer',
    isBestValue: true,
    priceINR: 119999,
    priceUSD: 1599,
    billingPeriod: 'Yearly Retainer',
    billingCycle: '/ year',
    turnaroundTime: 'Dedicated Tech Point of Contact',
    domainIncluded: false,
    domainNote: 'Full multi-cloud DevOps, security monitoring & disaster recovery planning',
    description: 'High-touch enterprise retainer providing up to 30 hours of monthly senior engineering, cloud infrastructure management, quarterly architecture reviews, and disaster recovery.',
    idealFor: 'Scaling startups, institutions and enterprise platforms needing continuous engineering without agency bloat.',
    features: [
      'Up to 30 hours of monthly engineering and development work',
      'Dedicated technical point of contact & senior engineer',
      'Cloud infrastructure management (AWS / DigitalOcean / GCP)',
      'CI/CD pipeline maintenance and automation',
      'Database performance optimization and indexing',
      'Security monitoring and vulnerability assessments',
      'Quarterly architectural reviews & roadmap planning',
      'Weekly progress updates and sprint alignment calls',
      'Priority critical incident handling with rapid SLA',
      'Disaster recovery planning and failover verification',
      'Direct technical consulting and technology advice'
    ],
    deliverables: [
      'Up to 30 Hours/Month Dedicated Senior Engineering Work',
      'Dedicated Technical Point of Contact & Weekly Sprints',
      'Cloud Infrastructure & CI/CD DevOps Governance',
      'Quarterly Architecture Reviews & Disaster Recovery Plan'
    ],
    techStack: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'PostgreSQL'],
    isVisible: true
  }
];

// ==========================================
// 6. DOMAIN & HOSTING PRICING POLICY
// ==========================================
export const DOMAIN_HOSTING_POLICY = [
  { service: 'Static Website Hosting', policy: 'Free for 1 year on eligible infrastructure (Cloudflare / Vercel)', note: 'Included' },
  { service: 'Business Website Hosting', policy: 'Free for 1 year on eligible infrastructure', note: 'Included' },
  { service: 'Web Application Hosting', policy: 'Included within defined deployment infrastructure limits', note: 'Included' },
  { service: 'Standard Domain (.com / .in / .tech)', policy: '₹1,000 – ₹2,000/year estimated allowance', note: 'Included in eligible plans' },
  { service: 'SSL Certificate', policy: 'Free standard automated SSL certificate', note: 'Always Free' },
  { service: 'Premium Domain', policy: 'Additional charges apply if domain exceeds ₹2,000 allowance', note: 'Client pays difference' },
  { service: 'Advanced Cloud Infrastructure', policy: 'Dedicated AWS / GCP instances billed separately at actuals', note: 'At actuals' },
  { service: 'Corporate Email Hosting', policy: 'Google Workspace / Zoho Mail billed separately unless specified', note: 'Separate' },
];

// ==========================================
// 7. PACKAGE COMPARISON MATRIX
// ==========================================
export const PACKAGE_COMPARISON_MATRIX = [
  { package: 'Static Portfolio', category: 'Website', priceINR: '₹9,999', timeline: '3–5 days', hosting: '1 Year Free', domain: 'Optional', support: '15 Days' },
  { package: 'Business Website', category: 'Website', priceINR: '₹17,999', timeline: '5–7 days', hosting: '1 Year Free', domain: '₹2,000 allowance (₹19,999 total)', support: '30 Days' },
  { package: 'Professional Website', category: 'Website', priceINR: '₹29,999', timeline: '7–12 days', hosting: '1 Year Free', domain: '1 Year Included', support: '45 Days' },
  { package: 'E-Commerce Website', category: 'E-Commerce', priceINR: '₹59,999', timeline: '3–4 weeks', hosting: '1 Year Free', domain: '1 Year Included', support: '60 Days' },
  { package: 'Advanced Marketplace', category: 'E-Commerce', priceINR: 'Starting ₹99,999', timeline: '4–7 weeks', hosting: 'Cloud Setup', domain: '1 Year Included', support: '90 Days' },
  { package: 'Startup MVP', category: 'Web App', priceINR: '₹89,999', timeline: '3–5 weeks', hosting: 'Defined Deployment', domain: 'Deployment Included', support: '90 Days' },
  { package: 'Advanced Web App', category: 'Web App', priceINR: '₹1,29,999', timeline: '4–6 weeks', hosting: 'Defined Deployment', domain: 'Deployment Included', support: '90 Days' },
  { package: 'SaaS Platform', category: 'Web App', priceINR: '₹1,69,999', timeline: '5–8 weeks', hosting: 'Defined Deployment', domain: 'Cloud Setup Included', support: '120 Days' },
  { package: 'Enterprise Software', category: 'Enterprise', priceINR: 'Starting ₹2,49,999', timeline: '6–10 weeks', hosting: 'Defined Deployment', domain: 'Enterprise Cloud', support: '6 Months' },
  { package: 'AI Automation & OCR', category: 'AI', priceINR: '₹1,49,999', timeline: '4–7 weeks', hosting: 'Defined Deployment', domain: 'Dockerized Pipeline', support: '90 Days' },
  { package: 'Custom AI Agent', category: 'AI', priceINR: 'Starting ₹1,99,999', timeline: '5–9 weeks', hosting: 'Defined Deployment', domain: 'Vector DB Setup', support: '90 Days' },
  { package: 'Basic Website AMC', category: 'AMC', priceINR: '₹14,999 / yr', timeline: 'Ongoing Support', hosting: 'Uptime Monitoring', domain: 'DNS/SSL Monitoring', support: 'Email & Minor Updates' },
  { package: 'Professional AMC', category: 'AMC', priceINR: '₹49,999 / yr', timeline: 'Priority Response', hosting: 'DB Backups', domain: 'Infrastructure Support', support: '10 hrs/mo + Priority SLA' },
  { package: 'Enterprise Retainer', category: 'AMC', priceINR: '₹1,19,999 / yr', timeline: 'Dedicated Lead', hosting: 'AWS/DevOps Governance', domain: 'Disaster Recovery', support: '30 hrs/mo + Senior Engineer' },
];

// ==========================================
// 8. IMPORTANT COMMERCIAL TERMS FOR CODRIX
// ==========================================
export const COMMERCIAL_TERMS = [
  { number: '01', title: 'GST', description: 'Prices are exclusive of applicable GST.' },
  { number: '02', title: 'Domain Ownership', description: 'Domain registration is included only where explicitly mentioned. Full domain ownership is transferred to the client.' },
  { number: '03', title: 'Hosting Terms', description: 'One-year free hosting applies to eligible infrastructure (Cloudflare Pages, Vercel, or agreed tier) and agreed usage limits.' },
  { number: '04', title: 'Renewals', description: 'Hosting, domain, business email, and third-party subscription renewals after the included period are chargeable at actuals.' },
  { number: '05', title: 'Third-Party Services', description: 'Payment gateway fees, paid LLM APIs, premium plugins, paid licenses, and external subscriptions are additional.' },
  { number: '06', title: 'Scope Governance', description: 'Additional pages, bespoke features, and integrations outside the agreed scope specification are quoted separately.' },
  { number: '07', title: 'Payment Milestones', description: 'Recommended milestone schedule: 50% advance, 30% after development milestone, and 20% before final production handover.' },
  { number: '08', title: 'Support Scope', description: 'Complimentary hypercare support covers bug fixes and defect remediation, not unlimited new features or visual redesigns.' },
  { number: '09', title: 'Delivery Timeline', description: 'Sprint timelines commence after advance payment clearance and receipt of required content, branding assets, and technical approvals.' },
  { number: '10', title: 'Source Code & IP', description: 'Complete repository source code, deployment access, and agreed intellectual property are transferred unconditionally after full payment.' },
];
