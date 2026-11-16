/**
 * Client-Side SEO & Meta Tags Manager for CodRix
 * Updates title, meta description, canonical tags, and Open Graph dynamically per route.
 */

export interface PageSEOConfig {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
}

export const ROUTE_SEO: Record<string, PageSEOConfig> = {
  home: {
    title: 'CodRix | Software & Web Development Company',
    description: 'CodRix builds websites, software, web applications and digital solutions for businesses. Turn your ideas into technology with CodRix.',
    canonical: 'https://codrix.co.in/',
    keywords: 'CodRix, Software Development Company, Web Development Company, Website Development, AI & Automation, Custom Software, Digital Solutions India'
  },
  services: {
    title: 'Flagship Software & Engineering Services | CodRix',
    description: 'Explore CodRix engineering pillars: Custom Full-Stack Web Applications, Distributed Microservices, AI & OCR Pipelines, Real-Time Cloud Infrastructure.',
    canonical: 'https://codrix.co.in/services',
    keywords: 'CodRix Services, Full-Stack Web Apps, Cloud Architecture, AI OCR Solutions, Real-Time Systems, Custom Software India'
  },
  projects: {
    title: 'Flagship Projects & Systems Architecture Portfolio | CodRix',
    description: 'Discover proprietary systems designed and scaled by CodRix: UniVerse real-time campus operating system, ChatLeads AI, Nexus CRM, CampXChange.',
    canonical: 'https://codrix.co.in/projects',
    keywords: 'CodRix Portfolio, UniVerse Platform, Nexus CRM, ChatLeads AI, Enterprise SaaS, Case Studies, Software Architecture'
  },
  plan: {
    title: 'Plans & Transparent Engineering Packages | CodRix',
    description: 'Fixed-cost, transparent software development packages starting at ₹14,999. Includes 1-year domain, full source code IP ownership, and strict NDA protection.',
    canonical: 'https://codrix.co.in/plan',
    keywords: 'CodRix Pricing, Website Development Cost, Software Development Packages, Single-Page Portfolio, Startup MVP Pricing'
  },
  admin: {
    title: 'Executive Mission Command | CodRix Admin Portal',
    description: 'CodRix secure administrative console for managing client proposals, package bookings, platform adoptions, and live website assets.',
    canonical: 'https://codrix.co.in/admin'
  }
};

export function updatePageSEO(routeKey: keyof typeof ROUTE_SEO) {
  const config = ROUTE_SEO[routeKey] || ROUTE_SEO.home;
  if (typeof document === 'undefined') return;

  // 1. Update Title
  document.title = config.title;

  // 2. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', config.description);
  }

  // 3. Update Canonical Tag
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', config.canonical);
  }

  // 4. Update Open Graph Title & Description
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', config.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', config.description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', config.canonical);

  // 5. Update Twitter Title & Description
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', config.title);

  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', config.description);
}
