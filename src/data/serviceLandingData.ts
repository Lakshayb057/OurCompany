export interface ServiceLandingConfig {
  slug: string;
  path: string;
  serviceId: string;
  primaryKeyword: string;
  title: string;
  metaDescription: string;
  heroBadge: string;
  heroHeading: string;
  heroHighlight: string;
  heroSubheading: string;
  inquiryProjectType: string;
  stats: Array<{ label: string; value: string }>;
  overview: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
  };
  pillars: Array<{
    title: string;
    description: string;
    icon: string;
    deliverables: string[];
  }>;
  technologies: string[];
  caseStudy: {
    title: string;
    subtitle: string;
    description: string;
    metrics: string[];
    image: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const SERVICE_LANDING_PAGES: Record<string, ServiceLandingConfig> = {
  'website-development': {
    slug: 'website-development',
    path: '/website-development',
    serviceId: 'srv-web',
    primaryKeyword: 'Website Development Company',
    title: 'Website Development Company | High-Performance Web Design | CodRix',
    metaDescription: 'CodRix is a leading website development company engineering ultra-fast, mobile-responsive, SEO-optimized business websites, landing pages, and web portals.',
    heroBadge: 'HIGH-PERFORMANCE WEB ENGINEERING',
    heroHeading: 'Modern Business Websites Engineered for',
    heroHighlight: 'Speed, Search & Conversion',
    heroSubheading: 'We build production-grade web applications, corporate brand portals, and executive platforms featuring sub-second load times, fluid responsive UX, and airtight SEO foundations.',
    inquiryProjectType: 'Full-Stack & Cloud Engineering',
    stats: [
      { label: 'Page Load Speed', value: '<800ms' },
      { label: 'Core Web Vitals', value: '100% Green' },
      { label: 'Source IP Transfer', value: '100% Client Owned' },
      { label: 'Mobile Responsive', value: 'Pixel-Perfect' }
    ],
    overview: {
      heading: 'Why Standard Website Templates Fail Modern Businesses',
      paragraph1: 'Generic site builders and bloated WordPress themes introduce heavy scripts, slow database queries, and poor Core Web Vitals that hurt your Google rankings and bounce prospective clients.',
      paragraph2: 'CodRix designs custom React and TypeScript web frontends backed by lightweight, distributed architectures. Every line of code is optimized for SEO crawlability, social previews, and lightning-fast user interactions.'
    },
    pillars: [
      {
        title: 'Bespoke Executive & Corporate Websites',
        description: 'Tailored brand narratives with custom typography, dark/light theme persistence, and interactive animations that captivate enterprise visitors.',
        icon: 'Layout',
        deliverables: ['Custom UI/UX Design System', 'Fluid Responsive Layouts', 'Dark/Light Theme Bootstrap', 'Interactive Micro-Animations']
      },
      {
        title: 'Search-Engine-First Technical Architecture',
        description: 'Engineered from the ground up for maximum Google discoverability with complete Schema.org graphs, automated XML sitemaps, and optimized open-graph previews.',
        icon: 'Search',
        deliverables: ['Full JSON-LD Graph Schema', 'Dynamic Canonical Routing', 'Optimized Meta & Open Graph Tags', 'Robots & Sitemap Generation']
      },
      {
        title: 'High-Converting Lead Funnels & Portals',
        description: 'Frictionless client proposal forms, WhatsApp integration, and automated email confirmation sequences that turn visitors into verified inbound leads.',
        icon: 'Zap',
        deliverables: ['Real-Time Form Validation', 'Automated Lead Routing', 'Omnichannel Inquiry Alerts', 'Database Lead Synchronization']
      },
      {
        title: 'Edge Caching & Global CDN Delivery',
        description: 'Asset delivery powered by global CDN distribution, automatic WebP/AVIF image compression, and zero-downtime serverless infrastructure.',
        icon: 'Globe',
        deliverables: ['Cloudinary Image Transformation', 'Global Edge CDN Deployment', 'SSL/TLS 1.3 Encryption', '99.98% Server Uptime SLA']
      }
    ],
    technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5 / Modern CSS', 'Node.js', 'Vercel Edge', 'Cloudinary CDN'],
    caseStudy: {
      title: 'CodRix Executive Corporate Platform',
      subtitle: 'Modern Engineering Platform with Sub-Second Latency',
      description: 'Engineered with React, TypeScript, and modern CSS gradients, featuring real-time MongoDB lead tracking, client proposal flow, and automated Socket.io state synchronization.',
      metrics: ['Sub-100ms API Latency', '100% Clean Codebase', 'Complete SEO Schema Graph'],
      image: '/hero-ribbon.png'
    },
    faqs: [
      {
        question: 'How long does it take to develop a custom website with CodRix?',
        answer: 'Our turnkey single-page founder portfolios and high-impact business sites are delivered within 3 to 5 business days. Complex corporate portals typically take 2 to 4 weeks.'
      },
      {
        question: 'Will my website be optimized for mobile phones and tablets?',
        answer: 'Yes. Every CodRix website is built mobile-first, ensuring flawless performance, legible typography, and touch-optimized controls across iPhone, Android, tablets, and 4K desktop screens.'
      },
      {
        question: 'Do I own the full source code and domain?',
        answer: '100%. Upon project completion, you receive full intellectual property ownership, source repositories, and domain credentials under strict NDA protection with zero ongoing vendor lock-in.'
      }
    ]
  },

  'software-development': {
    slug: 'software-development',
    path: '/software-development',
    serviceId: 'srv-software',
    primaryKeyword: 'Custom Software Development',
    title: 'Custom Software Development Company | Enterprise Cloud & Web Apps | CodRix',
    metaDescription: 'CodRix architects mission-critical custom software, distributed microservices, scalable databases, and enterprise cloud applications with sub-100ms response times.',
    heroBadge: 'MISSION-CRITICAL CUSTOM SOFTWARE',
    heroHeading: 'Custom Cloud Applications & Systems Built for',
    heroHighlight: 'Resilience, Scale & Performance',
    heroSubheading: 'We engineer multi-tenant cloud ecosystems, high-concurrency microservices, and distributed web applications with ACID transactional guarantees and zero technical debt.',
    inquiryProjectType: 'Full-Stack & Cloud Engineering',
    stats: [
      { label: 'API Response Latency', value: '<100ms' },
      { label: 'Data Integrity', value: '100% ACID' },
      { label: 'Concurrency Handling', value: '100k+ Batch' },
      { label: 'Uptime Reliability', value: '99.98%' }
    ],
    overview: {
      heading: 'Enterprise Systems Built to Eliminate Technical Debt',
      paragraph1: 'Off-the-shelf software forces growing companies into rigid workflows, recurring per-seat subscription fees, and fragile integrations that fail under high concurrent load.',
      paragraph2: 'CodRix develops custom software solutions tailored exactly to your business logic. We design resilient PostgreSQL and MongoDB schemas, implement connection pooling, and deploy isolated microservices.'
    },
    pillars: [
      {
        title: 'Distributed Cloud Architecture & Microservices',
        description: 'Scalable service fleets isolated inside virtual private clouds (VPCs), communicating via high-speed RESTful APIs and real-time WebSocket event buses.',
        icon: 'Cpu',
        deliverables: ['Containerized Docker Workloads', 'API Gateway & Rate Limiting', 'Connection Pooling & Sharding', 'VPC Network Isolation']
      },
      {
        title: 'High-Concurrency Database Engineering',
        description: 'ACID-compliant relational and document database architectures with strict indexing, automated backups, and sub-10ms query execution.',
        icon: 'Database',
        deliverables: ['PostgreSQL & MongoDB Optimization', 'Prisma & Mongoose Schema Modeling', 'Zero-Downtime Data Migrations', 'Replication & Failover']
      },
      {
        title: 'Custom Enterprise Web Applications',
        description: 'Bespoke operational dashboards, multi-tenant portal suites, role-based access control (RBAC), and automated auditing logs.',
        icon: 'Shield',
        deliverables: ['Granular RBAC Permission Tiering', 'JWT & Session Security Architecture', 'Audit Logging & Telemetry', 'Comprehensive API Documentation']
      },
      {
        title: 'Real-Time Event Streaming & Synchronization',
        description: 'Sub-millisecond data push across client sessions using Redis Pub/Sub, Socket.io, and persistent event streaming.',
        icon: 'Zap',
        deliverables: ['Bidirectional WebSocket Sync', 'Redis Event Bus Brokerage', 'Real-Time Telemetry Feeds', 'Offline Queue Recovery']
      }
    ],
    technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB Atlas', 'Redis', 'Docker', 'Prisma ORM', 'Socket.io', 'AWS'],
    caseStudy: {
      title: 'UniVerse Campus Operating System',
      subtitle: 'High-Concurrency Real-Time Platform',
      description: 'Distributed campus operating platform orchestrating automated QR transactions, live kitchen POS pipelines, and zero-downtime split settlements under peak university rush hours.',
      metrics: ['Sub-100ms Response Times', '10,000+ Concurrent Students', 'Zero-Data-Loss ACID Transactions'],
      image: '/universe_video.webp'
    },
    faqs: [
      {
        question: 'What types of custom software does CodRix develop?',
        answer: 'We develop custom enterprise web applications, real-time operating systems, multi-tenant SaaS platforms, administrative portals, inventory engines, and automated API backends.'
      },
      {
        question: 'How do you ensure data security and compliance?',
        answer: 'All data is encrypted in transit (TLS 1.3) and at rest. We implement strict RBAC privilege separation, isolated database VPCs, input sanitation against injection attacks, and strict NDA protocols.'
      },
      {
        question: 'Can CodRix integrate with our existing tools and legacy databases?',
        answer: 'Yes. We build custom ETL pipelines and REST/GraphQL adapters to securely interface with your existing ERPs, legacy SQL databases, payment gateways, and third-party SaaS tools.'
      }
    ]
  },

  'ai-development': {
    slug: 'ai-development',
    path: '/ai-development',
    serviceId: 'srv-ai',
    primaryKeyword: 'AI Development Company',
    title: 'AI Development Company | Autonomous AI Agents & Intelligent OCR | CodRix',
    metaDescription: 'CodRix engineers autonomous AI agents, high-speed document OCR pipelines, and intelligent automated workflows with sub-second inference and multimodal LLMs.',
    heroBadge: 'AUTONOMOUS COGNITIVE PIPELINES',
    heroHeading: 'Intelligent AI Agents & Computer Vision That Automate',
    heroHighlight: 'Complex Manual Workflows',
    heroSubheading: 'We deploy multimodal LLMs, high-speed OCR document extraction engines, and multi-session WhatsApp fleet engines that cut manual operations by up to 90%.',
    inquiryProjectType: 'AI, Intelligent Agents & OCR',
    stats: [
      { label: 'Manual Effort Reduction', value: '90%' },
      { label: 'OCR Inference Speed', value: '<1.2s' },
      { label: 'Fleet Concurrency', value: 'Multi-Session' },
      { label: 'Extraction Accuracy', value: '99.4%' }
    ],
    overview: {
      heading: 'From Experimental AI Prompts to Production-Grade Pipelines',
      paragraph1: 'Most AI implementations stall at basic chat wrappers that hallucinate and lack integration with real business data. Enterprise AI requires structured pipelines with strict validation gates.',
      paragraph2: 'CodRix builds battle-tested AI pipelines combining Google Gemini 2.5 Flash, Groq-accelerated Llama models, and computer vision OCR engines that extract structured JSON directly into your databases.'
    },
    pillars: [
      {
        title: 'Multimodal Document & Invoice OCR',
        description: 'Instant optical character recognition for unstandardized invoices, handwritten notes, identity cards, and complex multi-page financial PDF documents.',
        icon: 'FileText',
        deliverables: ['Sub-second Document Scanning', 'Automated Table & Field Parsing', 'Confidence Scoring & Human-in-Loop', 'Direct DB Integration']
      },
      {
        title: 'Autonomous LLM Agent Fleets',
        description: 'Autonomous goal-driven agents that research, summarize, classify tickets, and execute multi-step business logic without constant human oversight.',
        icon: 'Bot',
        deliverables: ['Tool-Calling Agent Architectures', 'RAG Knowledge Base Retrieval', 'Hallucination Guardrails', 'Structured JSON Output Guarantees']
      },
      {
        title: 'Fleet WhatsApp & Conversational AI',
        description: 'High-volume WhatsApp fleet automation handling thousands of simultaneous customer conversations with intelligent lead extraction.',
        icon: 'MessageSquare',
        deliverables: ['Multi-Session WhatsApp Infrastructure', 'Context-Aware AI Responses', 'Instant Lead Categorization', 'Live Agent Handoff Protocol']
      },
      {
        title: 'Predictive Pipelines & Analytics',
        description: 'Automated data clustering, sentiment classification, demand forecasting, and intelligent anomaly detection pipelines.',
        icon: 'TrendingUp',
        deliverables: ['FastAPI High-Speed Microservices', 'Streaming Real-Time Predictions', 'Custom Python ML Pipelines', 'Automated Model Evaluation']
      }
    ],
    technologies: ['Gemini 2.5 Flash', 'Groq Llama-4', 'FastAPI', 'Python', 'OpenCV / OCR', 'Baileys Multi-Session', 'WebSockets', 'PostgreSQL JSONB'],
    caseStudy: {
      title: 'ChatLeads AI Fleet Engine',
      subtitle: 'Multimodal OCR & Autonomous WhatsApp Fleet',
      description: 'Engineered for high-volume sales organizations, combining Gemini 2.5 Flash document intelligence with Llama-4 reasoning to automate lead extraction and customer booking pipelines.',
      metrics: ['90% Reduction in Audit Effort', 'Sub-Second Document OCR', 'Automated Lead Extraction'],
      image: '/services/ai-agents.jpg'
    },
    faqs: [
      {
        question: 'How accurate is the OCR document extraction pipeline?',
        answer: 'Our multimodal pipelines achieve over 99% accuracy on structured and semi-structured documents, including noisy scanned PDFs, mobile photos of receipts, and tabular balance sheets.'
      },
      {
        question: 'Can the AI agents integrate directly with our CRM or ERP?',
        answer: 'Yes. Our AI microservices output structured, validated JSON data that automatically creates records, updates stages, or triggers webhooks directly inside your CRM or internal databases.'
      },
      {
        question: 'Are our confidential documents and proprietary data safe from training?',
        answer: 'Absolutely. We enforce enterprise zero-data-retention APIs and on-premise/VPC deployments ensuring your business data is never used to train public foundation models.'
      }
    ]
  },

  'crm-development': {
    slug: 'crm-development',
    path: '/crm-development',
    serviceId: 'srv-crm',
    primaryKeyword: 'CRM Software Development',
    title: 'CRM Software Development Company | Custom High-Throughput CRMs | CodRix',
    metaDescription: 'CodRix builds high-concurrency custom CRM software equipped with Redis event streams, sub-second lead routing, and automated omnichannel follow-up pipelines.',
    heroBadge: 'HIGH-VELOCITY SALES TELEMETRY',
    heroHeading: 'Custom CRM Platforms Built for Instant',
    heroHighlight: 'Lead Routing, Telemetry & Speed',
    heroSubheading: 'We develop custom CRM solutions that process 100,000+ records in seconds, automate omnichannel client touchpoints, and eliminate expensive per-user licensing fees.',
    inquiryProjectType: 'High-Throughput CRMs & Real-Time Engines',
    stats: [
      { label: 'Batch Processing Speed', value: '70% Faster' },
      { label: 'Lead Routing Latency', value: '<50ms' },
      { label: 'Records Handled', value: '100k+ Chunked' },
      { label: 'Daily Reminders', value: '1,000+ Automated' }
    ],
    overview: {
      heading: 'Break Free From Restrictive, Expensive SaaS CRMs',
      paragraph1: 'Commercial CRMs charge exorbitant monthly fees per user, throttle your bulk imports, and restrict your ability to customize routing logic and automated reminder workflows.',
      paragraph2: 'CodRix delivers custom, proprietary CRM platforms tailored to your sales process. You own the software and database entirely, with zero recurring user licensing costs.'
    },
    pillars: [
      {
        title: 'Sub-Second Automated Lead Routing',
        description: 'Instant lead assignment based on agent availability, territory, and deal size, delivered in real-time to active sales rep dashboards.',
        icon: 'Shuffle',
        deliverables: ['Round-Robin & Weighted Routing', 'Instant Push Notifications', 'Live Agent Presence Tracking', 'SLA Response Enforcers']
      },
      {
        title: 'Chunked Batch Ingestion Engines',
        description: 'High-speed ingestion pipelines capable of uploading, deduping, and validating 100,000+ client contacts in seconds without browser freezing.',
        icon: 'UploadCloud',
        deliverables: ['Worker Thread Stream Processing', 'Instant Duplicate Detection', 'Automated CSV/Excel Normalization', 'Live Progress Telemetry']
      },
      {
        title: 'Omnichannel Automated Follow-Up Sequences',
        description: 'Trigger-based appointment reminders, WhatsApp alerts, and transactional email follow-ups that increase deal closing rates.',
        icon: 'Clock',
        deliverables: ['Brevo SMTP & WhatsApp Sync', 'Customizable Drip Campaigns', 'Smart Scheduling Triggers', 'Conversion Analytics Funnel']
      },
      {
        title: 'Granular Role-Based Access Control (RBAC)',
        description: 'Multi-tiered permission hierarchies ensuring executives, managers, and sales agents see strictly the accounts they are authorized to view.',
        icon: 'Lock',
        deliverables: ['Multi-Tiered Security Roles', 'Confidential Data Masking', 'Audit Activity Logs', 'Zero-Trust Session Validation']
      }
    ],
    technologies: ['React.js', 'Node.js', 'Prisma ORM', 'Redis Event Bus', 'PostgreSQL JSONB', 'Socket.io', 'Brevo SMTP', 'Tailwind CSS'],
    caseStudy: {
      title: 'Nexus Real-Time CRM & Telemetry',
      subtitle: 'High-Concurrency Event-Driven Platform',
      description: 'Battle-tested enterprise CRM managing 100,000+ records, equipped with Redis Pub/Sub, sub-second lead routing, and automated omnichannel dispatch.',
      metrics: ['100,000+ Records Ingested', 'Sub-50ms Routing Latency', '4 Operational Role Tiers'],
      image: '/CRM.jpeg'
    },
    faqs: [
      {
        question: 'Why choose a custom CRM over Salesforce or HubSpot?',
        answer: 'A custom CRM gives you 100% intellectual property ownership, zero recurring per-user seat fees, complete control over data privacy, and architecture built precisely for your unique sales workflow.'
      },
      {
        question: 'How fast can our sales team import large lead databases?',
        answer: 'Our chunked batch ingestion pipeline processes over 100,000 records in seconds, performing automatic deduplication, formatting, and database verification without server lag.'
      },
      {
        question: 'Can we integrate WhatsApp and SMS notifications?',
        answer: 'Yes. We build native WhatsApp and SMS triggers so your leads receive immediate confirmations and appointment reminders the moment an action occurs.'
      }
    ]
  },

  'mobile-app-development': {
    slug: 'mobile-app-development',
    path: '/mobile-app-development',
    serviceId: 'srv-mobile',
    primaryKeyword: 'Mobile App Development',
    title: 'Mobile App Development Company | iOS & Android Applications | CodRix',
    metaDescription: 'CodRix engineers high-performance cross-platform mobile apps for iOS and Android with native performance, offline-first sync, and intuitive touch UI/UX.',
    heroBadge: 'CROSS-PLATFORM MOBILE ENGINEERING',
    heroHeading: 'High-Performance Mobile Apps Built for',
    heroHighlight: 'iOS, Android & Offline Sync',
    heroSubheading: 'We engineer intuitive, high-performance mobile applications with native device capabilities, real-time push telemetry, and frictionless App Store releases.',
    inquiryProjectType: 'Full-Stack & Cloud Engineering',
    stats: [
      { label: 'Codebase Sharing', value: 'Up to 90%' },
      { label: 'Animation Frame Rate', value: 'Fluid 60 FPS' },
      { label: 'Platform Support', value: 'iOS & Android' },
      { label: 'Offline Capabilities', value: 'Local-First Sync' }
    ],
    overview: {
      heading: 'Native Performance with Cross-Platform Velocity',
      paragraph1: 'Building two separate codebases for iOS and Android doubles development expenses and slows down feature rollout. Businesses need unified codebases that deliver genuine native speed.',
      paragraph2: 'CodRix engineers cross-platform mobile applications using modern React Native and TypeScript, delivering 60 FPS performance, native device hardware access, and robust offline-first synchronization.'
    },
    pillars: [
      {
        title: 'Unified Cross-Platform iOS & Android Apps',
        description: 'Single maintainable codebase delivering native look, feel, and performance across Apple App Store and Google Play Store.',
        icon: 'Smartphone',
        deliverables: ['Native Navigation Stacks', 'Platform-Specific UI Calibration', 'Unified State Management', '60 FPS Fluid Animations']
      },
      {
        title: 'Offline-First Local Data Synchronization',
        description: 'Mobile apps that continue functioning seamlessly even when users lose network connectivity, with automatic reconciliation on reconnect.',
        icon: 'WifiOff',
        deliverables: ['Local SQLite Database Caching', 'Optimistic UI Updates', 'Conflict-Free Reconnection Sync', 'Minimal Battery & Data Usage']
      },
      {
        title: 'Hardware & Native Device Integration',
        description: 'Seamless integration with device cameras, GPS location tracking, biometric Face ID/Fingerprint authentication, and Bluetooth peripherals.',
        icon: 'ShieldCheck',
        deliverables: ['Biometric Face/Touch ID Security', 'High-Accuracy Geolocation', 'Camera & QR Scanning Engines', 'Push Notifications (APNs & FCM)']
      },
      {
        title: 'Automated CI/CD App Store Deployment',
        description: 'Streamlined build and release pipelines ensuring smooth approval, testflight beta distribution, and rapid production updates.',
        icon: 'CloudRain',
        deliverables: ['Fastlane & Expo Build Pipelines', 'TestFlight & Internal Track Releases', 'Apple & Google Review Compliance', 'Live Over-the-Air Hotfixes']
      }
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand', 'SQLite', 'Firebase Cloud Messaging', 'Node.js APIs'],
    caseStudy: {
      title: 'CampXChange P2P Mobile Marketplace',
      subtitle: 'Verified Campus Sharing & Circular Commerce App',
      description: 'Peer-to-peer mobile marketplace featuring institutional domain verification, student ID authentication, in-app rental logistics, and instant push notifications.',
      metrics: ['Cross-Platform iOS & Android', 'Verified Student Authentication', 'Real-Time Push Alerts'],
      image: '/CRM.webm'
    },
    faqs: [
      {
        question: 'Will our mobile app work on both iPhones and Android phones?',
        answer: 'Yes. We engineer cross-platform applications using React Native and TypeScript, ensuring your app runs with native speed and styling on both iOS and Android devices.'
      },
      {
        question: 'Does CodRix handle the App Store and Google Play submission process?',
        answer: 'Yes. We manage the entire store deployment workflow, including app icon assets, provisioning profiles, privacy compliance policies, and App Store review requirements.'
      },
      {
        question: 'Can the app function offline when users have poor internet reception?',
        answer: 'Yes. We architect offline-first mobile databases with local SQLite caching, allowing users to browse, create drafts, and view data without interruption. Everything syncs automatically once reconnected.'
      }
    ]
  }
};
