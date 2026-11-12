export interface PlanPackage {
  id: string;
  name: string;
  tagline: string;
  category: 'single-page' | 'web-app' | 'software' | 'yearly';
  badge?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  priceINR: number;
  priceUSD: number;
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
}

export const PLAN_CATEGORIES = [
  { id: 'all', label: 'All Plans & Packages', shortDesc: 'Complete catalog of engineering solutions' },
  { id: 'single-page', label: 'Single Page Websites', shortDesc: 'Fast, responsive, high-converting digital storefronts' },
  { id: 'web-app', label: 'Web Applications', shortDesc: 'Full-stack MVPs, client portals & SaaS systems' },
  { id: 'software', label: 'Custom Softwares & ERP', shortDesc: 'Enterprise systems, AI engines & complex business workflows' },
  { id: 'yearly', label: 'Yearly Retainers & AMC', shortDesc: '24/7 SLA, infrastructure DevOps, security & maintenance' },
] as const;

export const PLANS_DATA: PlanPackage[] = [
  // --- SINGLE PAGE WEBSITES ---
  {
    id: 'single-page-starter',
    name: 'Founder & Personal Portfolio',
    tagline: 'High-impact personal branding & executive portfolio',
    category: 'single-page',
    badge: 'Fast Delivery',
    priceINR: 14999,
    priceUSD: 249,
    billingPeriod: 'One-Time',
    domainIncluded: false,
    domainNote: 'Custom domain setup assistance included (Domain purchase separate)',
    turnaroundTime: '3 - 5 Business Days',
    description: 'Bespoke, high-performance personal portfolio showcasing technical achievements, experience, and direct lead generation.',
    features: [
      'Custom Responsive UI with Dark/Light Mode',
      'Ultra-fast Tailwind CSS & React 18 Architecture',
      'Sub-second Lighthouse Performance (95+ score)',
      'Interactive Resume & Project Showcase',
      'Direct WhatsApp & Email Contact Integration',
      'SEO Metadata & OpenGraph Social Sharing'
    ],
    deliverables: [
      'Complete Source Code (GitHub Repository)',
      'Free Cloudflare / Vercel Global Hosting Setup',
      'SSL Certificate Configuration',
      '30 Days Complimentary Bugfix Support'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloudflare CDN'],
    idealFor: 'Tech Founders, Engineers, Executives, and Freelancers wanting a modern online presence.'
  },
  {
    id: 'single-page-startup-with-domain',
    name: 'Startup Launchpad (With Domain)',
    tagline: 'All-inclusive single-page website with free 1-year domain & SSL',
    category: 'single-page',
    badge: 'Most Popular',
    isPopular: true,
    priceINR: 24999,
    priceUSD: 399,
    billingPeriod: 'One-Time',
    domainIncluded: true,
    domainNote: 'Includes 1-Year Free Custom Domain (.com / .in / .tech) + Managed DNS',
    turnaroundTime: '5 - 7 Business Days',
    description: 'Turnkey landing page engineered for high customer conversion, product announcements, waitlists, and investor demos.',
    features: [
      '1-Year Free Domain (.com / .in / .tech) Included',
      'Interactive Lead Capture & Inquiry System',
      'Framed Product Demo & Feature Showcase',
      'Mobile-First Fluid Layout with Smooth Animations',
      'Automated Email & Telegram/Discord Lead Webhooks',
      'Google Analytics 4 & Meta Pixel Setup'
    ],
    deliverables: [
      'Fully Registered Domain with DNS Management',
      'Zero-Downtime Vercel/Netlify Global Deployment',
      'End-to-End Source Code Transfer',
      '60 Days Priority Warranty & Maintenance'
    ],
    techStack: ['React', 'Tailwind CSS', 'Lucide Icons', 'Vercel Edge', 'Cloudflare DNS'],
    idealFor: 'Seed-stage Startups, Product Launches, Boutiques, and Service Agencies.'
  },
  {
    id: 'single-page-corporate',
    name: 'Corporate Single-Page Showcase',
    tagline: 'Enterprise-grade single-page portal with dynamic CMS capabilities',
    category: 'single-page',
    badge: 'Enterprise Tier',
    priceINR: 34999,
    priceUSD: 549,
    billingPeriod: 'One-Time',
    domainIncluded: true,
    domainNote: 'Includes 1-Year Premium Domain (.com) + Corporate Business Email Setup',
    turnaroundTime: '7 - 10 Business Days',
    description: 'Polished corporate showcase with interactive service calculators, leadership profiles, multi-language readiness, and CRM sync.',
    features: [
      '1-Year Domain (.com) + 3 Business Emails (Google Workspace / Zoho)',
      'Custom SVG Illustrations & Micro-interactions',
      'Multi-section Sticky Nav with Kinetic Anchors',
      'Interactive Pricing Calculator & Lead Qualification',
      'Full WCAG Accessibility Compliance',
      'Automated Lead Sync to HubSpot / Notion / Google Sheets'
    ],
    deliverables: [
      'Full Intellectual Property (IP) Transfer',
      'Enterprise Hosting Setup with Automated Backups',
      'Documentation & Content Editing Walkthrough',
      '90 Days Engineering Support'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js Micro-Gateway', 'Vercel / AWS'],
    idealFor: 'Growing Businesses, Consulting Firms, and Corporate Subsidiaries.'
  },

  // --- WEB APPLICATIONS ---
  {
    id: 'webapp-sprint-mvp',
    name: 'Sprint MVP Web Application',
    tagline: 'Go from concept to production-ready MVP in 30 days',
    category: 'web-app',
    badge: 'Founder Favorite',
    isPopular: true,
    priceINR: 89999,
    priceUSD: 1299,
    billingPeriod: 'One-Time',
    domainIncluded: true,
    domainNote: 'Includes 1-Year Domain (.com/.io) + Cloud DB Tier Setup',
    turnaroundTime: '3 - 4 Weeks',
    description: 'Production-ready full-stack web application featuring user authentication, database persistence, dashboard analytics, and payment gateway.',
    features: [
      'Full-Stack Architecture (React + Node.js / Express + MongoDB / PostgreSQL)',
      'JWT / OAuth2 Authentication & Role-Based Access Control',
      'Client Dashboard with Real-Time Data Tables & Filtering',
      'Stripe / Razorpay Payment Gateway Integration',
      'Transactional Email Dispatch (Resend / SendGrid)',
      'RESTful API Backend with OpenAPI Documentation'
    ],
    deliverables: [
      'Production Dockerized Repository',
      'MongoDB Atlas / Supabase Database Cluster Setup',
      'Automated GitHub Actions CI/CD Pipeline',
      'Complete Architecture Documentation (SRS & ERD)',
      '90 Days Hypercare Engineering Support'
    ],
    techStack: ['React 18', 'Node.js', 'Express', 'MongoDB Atlas', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    idealFor: 'Early-stage tech founders validating a venture-backed or bootstrapped software concept.'
  },
  {
    id: 'webapp-saas-portal',
    name: 'SaaS Multi-Tenant Web Platform',
    tagline: 'Scalable subscription software with multi-tenant architecture',
    category: 'web-app',
    badge: 'Best Value',
    isBestValue: true,
    priceINR: 169999,
    priceUSD: 2499,
    billingPeriod: 'One-Time',
    domainIncluded: true,
    domainNote: 'Includes Custom Domain + SSL + Managed Redis Cloud',
    turnaroundTime: '5 - 7 Weeks',
    description: 'High-scale multi-tenant SaaS application built for recurring subscriptions, team workspaces, granular permissions, and webhook automations.',
    features: [
      'Multi-Tenant Tenant Isolation & Workspace Management',
      'Recurring Subscription Billing (Stripe Customer Portal / Paddle)',
      'Team Invitations, Seat Licensing & RBAC',
      'Real-Time WebSocket Notifications & Live Feeds',
      'PDF / CSV Export Engine & Advanced Reporting',
      'High-throughput Redis Caching Layer (<50ms response)'
    ],
    deliverables: [
      'AWS / DigitalOcean Cloud Infrastructure Provisioning',
      'Production Database with Automated Nightly Snapshots',
      'Swagger / Postman API Test Suite',
      'Full Source Code & Admin Superpanel',
      '120 Days Dedicated Engineering Support'
    ],
    techStack: ['Next.js / React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS ECS / S3'],
    idealFor: 'B2B SaaS startups, productivity platforms, and client-facing digital tools.'
  },
  {
    id: 'webapp-ecommerce-marketplace',
    name: 'Dynamic E-Commerce & Marketplace',
    tagline: 'High-converting custom commerce engine with inventory & order management',
    category: 'web-app',
    badge: 'High Conversion',
    priceINR: 139999,
    priceUSD: 1999,
    billingPeriod: 'One-Time',
    domainIncluded: true,
    domainNote: 'Includes 1-Year Domain + CDN Cache Acceleration',
    turnaroundTime: '4 - 6 Weeks',
    description: 'Modern head-less commerce and multi-vendor marketplace with real-time inventory tracking, coupon engines, cart abandonment recovery, and SMS order alerts.',
    features: [
      'Dynamic Product Catalog with Variants, Filters & Fast Search',
      'Optimized 1-Page Checkout with Instant UPI, Cards & NetBanking',
      'Merchant Admin Portal for Order Fulfillment & Analytics',
      'Automated Order Notifications via WhatsApp & Email',
      'Coupon Codes, Tiered Discounts & Referral Engine',
      'Optimized Image CDN with WebP Conversion'
    ],
    deliverables: [
      'Full E-Commerce Web Platform with Admin Panel',
      'Cloud Database & S3 Media Bucket Setup',
      'Payment Gateway Compliance Certification',
      'Staff Training Video Walkthrough',
      '90 Days Maintenance Support'
    ],
    techStack: ['React', 'Express', 'MongoDB / Postgres', 'Razorpay / Stripe', 'AWS S3', 'Tailwind'],
    idealFor: 'D2C Brands, Circular Campus Marketplaces, and B2B Wholesale Distributors.'
  },

  // --- CUSTOM SOFTWARES & ERP ---
  {
    id: 'software-custom-erp',
    name: 'Custom Enterprise ERP & Institute Engine',
    tagline: 'Tailored institutional resource planning & operational governance system',
    category: 'software',
    badge: 'Enterprise Core',
    isBestValue: true,
    priceINR: 249999,
    priceUSD: 3699,
    billingPeriod: 'One-Time',
    domainIncluded: true,
    domainNote: 'Includes Enterprise Domain + Private Dedicated VPC Configuration',
    turnaroundTime: '6 - 9 Weeks',
    description: 'Comprehensive operational ERP designed for universities, institutes, hospitals, or logistics firms with automated payroll, student/staff records, and verifiable digital certificates.',
    features: [
      'Multi-Role Dashboards (Superadmin, Department Heads, Staff, Students/Clients)',
      'QR Code-Verifiable Digital Certificate & Document Issuance',
      'Fee Collection, Invoicing & Financial Reconciliation',
      'Attendance Tracking, Biometric Sync & Leave Management',
      'Audit Logging & Cryptographic Integrity Safeguards',
      'Exportable Compliance Reports (PDF, Excel, Government Formats)'
    ],
    deliverables: [
      'On-Premises or Private Cloud (AWS/Azure) Deployment',
      'Air-Gapped Data Privacy & Automated Backup Vault',
      'Comprehensive Admin Manual & Role Training Sessions',
      'Full Source Code & Database Architecture Handoff',
      '6 Months Enterprise Hypercare & SLA'
    ],
    techStack: ['Node.js (PERN)', 'PostgreSQL', 'Redis Event Bus', 'Docker', 'Kubernetes / AWS', 'Tailwind'],
    idealFor: 'Colleges, Professional Institutes, Manufacturing Hubs, and Large Clinical Practices.'
  },
  {
    id: 'software-ai-automation',
    name: 'AI Automation & Document OCR Engine',
    tagline: 'Intelligent multimodal AI agents and automated document processing pipelines',
    category: 'software',
    badge: 'AI Powered',
    priceINR: 199999,
    priceUSD: 2899,
    billingPeriod: 'One-Time',
    domainIncluded: true,
    domainNote: 'Includes Domain + Cloud GPU / LLM Gateway Setup',
    turnaroundTime: '4 - 6 Weeks',
    description: 'Custom AI platform extracting structured data from unstructured invoices, PDFs, handwritten forms, and integrating autonomous task execution via Gemini and Claude APIs.',
    features: [
      'Multimodal Document OCR & Entity Extraction (>98% accuracy)',
      'Autonomous LLM Agent Workflows with Human-in-the-Loop Approval',
      'Vector Search & RAG Knowledge Retrieval System',
      'Bulk File Processing Queue with Redis & Worker Threads',
      'REST & Webhook Integrations into Existing CRM / ERP',
      'Data Privacy Filter (PII Redaction before LLM inference)'
    ],
    deliverables: [
      'Containerized AI Processing Pipeline',
      'Custom Evaluation Benchmark & Accuracy Metrics',
      'Secure Token & API Key Vault Integration',
      'Production API Documentation & Webhooks',
      '90 Days Continuous Optimization'
    ],
    techStack: ['Python / Node.js', 'FastAPI', 'Gemini 1.5 Pro / Flash', 'ChromaDB / Pinecone', 'Docker'],
    idealFor: 'Logistics, Legal Firms, Accounting Services, and FinTech enterprises wanting AI automation.'
  },

  // --- YEARLY RETAINERS & AMC ---
  {
    id: 'yearly-amc-standard',
    name: 'Annual Maintenance & Uptime SLA (AMC)',
    tagline: 'Continuous monitoring, zero-downtime patches & bug remediation',
    category: 'yearly',
    badge: 'Annual Retainer',
    priceINR: 49999,
    priceUSD: 699,
    billingPeriod: 'Yearly Retainer',
    domainIncluded: true,
    domainNote: 'Includes 1-Year Domain Renewal + Premium SSL Managed Renewals',
    turnaroundTime: 'Annual 365-Day Coverage',
    description: 'End-to-end protection and upkeep for your web application or corporate site, guaranteeing security updates, database cleanups, and rapid emergency patching.',
    features: [
      '1-Year Free Domain Renewal & Managed SSL Certificate',
      '99.9% Uptime Guarantee with 24/7 Server Heartbeat Monitoring',
      'Up to 10 Hours of Monthly Feature Tweaks or Enhancements',
      'Security Patching, Dependency Upgrades & Vulnerability Scans',
      'Automated Weekly Off-Site Database Backups',
      'Guaranteed 4-Hour Response Window for Critical Issues'
    ],
    deliverables: [
      'Monthly Health & Uptime Performance Audit Report',
      'Dedicated Engineering Slack / WhatsApp Channel',
      'Priority Queue for New Feature Development',
      'Discounted Hourly Rates for Additional Scope'
    ],
    techStack: ['Uptime Kuma', 'Cloudflare', 'AWS / DigitalOcean', 'Docker', 'Sentry'],
    idealFor: 'Businesses that have launched and require ongoing engineering stewardship.'
  },
  {
    id: 'yearly-devops-enterprise',
    name: 'Enterprise Cloud DevOps & Retainer Squad',
    tagline: 'Dedicated engineering bandwidth and scalable cloud infrastructure management',
    category: 'yearly',
    badge: 'Enterprise Squad',
    isBestValue: true,
    priceINR: 119999,
    priceUSD: 1699,
    billingPeriod: 'Yearly Retainer',
    domainIncluded: true,
    domainNote: 'Includes Multi-Domain Portfolio Management & Enterprise DNS Safeguards',
    turnaroundTime: 'Continuous Dedicated Engineering',
    description: 'Strategic engineering partnership providing dedicated developer hours, DevOps optimization, horizontal autoscaling, and architecture reviews throughout the year.',
    features: [
      'Up to 30 Hours / Month of Senior Full-Stack Engineering Bandwidth',
      'Complete Cloud Architecture Management (AWS / GCP / Kubernetes)',
      'Sub-1-Hour Critical Incident Response SLA',
      'CI/CD Pipeline Optimization & Performance Tuning',
      'Quarterly Architectural Roadmapping & Tech Debt Audits',
      'Direct Directorship & CTO Advisory Council'
    ],
    deliverables: [
      'Dedicated Tech Lead & Direct Communications Access',
      'Weekly Sprint Demos & Transparent Jira / Linear Boards',
      'Continuous Security & Penetration Hardening',
      'Immediate Disaster Recovery RPO < 1 Hour, RTO < 2 Hours'
    ],
    techStack: ['Kubernetes', 'Terraform', 'AWS CloudFormation', 'PostgreSQL HA', 'Redis Cluster'],
    idealFor: 'Funded Startups, High-Volume E-Commerce, and Scaled Platforms.'
  }
];

