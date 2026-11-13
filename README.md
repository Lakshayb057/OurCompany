# Codrix — Corporate Website & Innovation Platform

> **TURNING IDEAS INTO TECHNOLOGY**  
> Built strictly according to the **Codrix Software Requirements Specification (SRS v1.0)**.

---

## 🚀 Overview

Codrix is an engineering startup building scalable full-stack web applications, real-time event engines, AI automation systems, and proprietary digital products.

This repository contains the complete implementation of the **Codrix Promotional Story Website & Management Suite**, featuring:
1. **Story-Led Public Experience**: High-impact hero with official gradient ribbon visual identity, company story, core philosophy, and global delivery positioning.
2. **Specialized Engineering Domains**: Interactive catalogue covering Distributed Cloud Systems, AI/OCR Agents, High-Throughput CRMs, Institutional ERPs, Agri-Commerce OS, and Circular Marketplaces.
3. **Comprehensive Case Studies**: Deep-dive showcases for all 6 projects from SRS Appendix C (**UniVerse**, **ChatLeads AI**, **ABV — SkillPort**, **Nexus CRM**, **CampXChange**, **SachiKheti**) with live demo links, repository links, impact telemetry, and architecture breakdowns.
4. **Interactive Lead Generation Gateway**: Validated multi-parameter project inquiry form with client/server validation, real-time submission feedback, and email dispatch simulation.
5. **Private Admin Suite & Allocation Engine**: RBAC-protected management console with leads inbox (filter, search, status updates, CSV export), portfolio status toggles, audit logs, and an interactive **Rule 10.4 Allocation Validator** (30% Project Lead / 50% Engineering / 20% Company Reserve enforcing strict 100% total integrity).

---

## 🎨 Visual Identity & Brand System (SRS Section 6)

- **Midnight Black (`#09090B`)**: Canvas background and dark surfaces
- **Electric Purple (`#7C2CF5`)**: Primary accent, CTA, and interactive focus states
- **Lavender Glow (`#B66CFF`)**: Gradient highlight and soft illumination
- **Deep Violet (`#4B12C9`)**: Depth, card borders, and shadow gradients
- **White (`#FFFFFF`) & Muted Gray (`#A4A1AD`)**: Accessible, high-contrast typography

---

## 📁 Repository Structure

```
CodRix/
├── dist/                     # Optimized production bundle (Vite + Tailwind)
├── public/
│   ├── logo.png              # Official Codrix gradient ribbon logo
│   └── hero-ribbon.png       # 3D fluid ribbon hero artwork asset
├── server/
│   ├── data/
│   │   └── store.json        # Persistent JSON data store (services, products, team, inquiries)
│   └── index.js              # Express REST API (v1) & production static server
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # Sticky glassmorphism nav with mobile drawer
│   │   ├── Hero.tsx          # High-impact hero, brand ribbon & metrics ticker
│   │   ├── OurStory.tsx      # Origin, Mission, Vision, and Engineering Creed
│   │   ├── ServicesSection.tsx # Domain-separated capabilities catalogue
│   │   ├── PortfolioSection.tsx# 6 Case study cards with status & impact metrics
│   │   ├── CaseStudyModal.tsx# Comprehensive architectural deep-dive modal
│   │   ├── ProcessSection.tsx# 5-stage discovery-to-delivery lifecycle
│   │   ├── GlobalVision.tsx  # International delivery model & SLA standards
│   │   ├── LeadershipSection.tsx # Executive cards & Organizational Hierarchy visual
│   │   ├── PartnershipPhilosophy.tsx # 30/50/20 transparent allocation simulator
│   │   ├── InquirySection.tsx# Validated project parameters lead capture form
│   │   ├── AdminPortal.tsx   # Private CMS, lead table, allocation validator & audit
│   │   └── Footer.tsx        # Brand footer, navigation, and copyright
│   ├── data/
│   │   └── mockData.ts       # Fallback dataset seeded directly from the SRS
│   ├── styles/
│   │   └── index.css         # Tailwind directives and custom glass/glow utilities
│   ├── types/
│   │   └── index.ts          # TypeScript domain interfaces
│   ├── App.tsx               # Root component & state orchestration
│   └── main.tsx              # React DOM entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ How to Run

### 1. Development Mode (Vite HMR + Express Backend)
```bash
# Terminal 1: Start Backend API (Port 5000)
npm run server

# Terminal 2: Start Frontend Dev Server (Port 3000 with /api proxy)
npm run dev
```

### 2. Production Mode (Single Unified Server)
```bash
# Build the React frontend
npm run build

# Start the full-stack server (serves frontend + REST API at http://localhost:5000)
npm start
```

---

## 🔑 Administrative Access (SRS Section 12)

Click the **Admin Portal** button in the navigation bar or footer:
- **Admin Email**: `admin@codrix.tech`
- **Access Key**: `Codrix@2026`

Modules included:
- **Overview Telemetry**: Active lead volume, conversion pipeline, and catalog stats.
- **Leads Inbox**: Filter by status (*New*, *Review*, *Contacted*, *Converted*, *Archived*), live search, full scope modal, and one-click **Export to CSV**.
- **Portfolio CMS**: View and edit project status (*Live*, *Beta*, *Development*, *Concept*) and configure destination URLs.
- **100% Allocation Validator (Section 10.4)**: Real-time validation calculator that prevents unbalanced allocation budgets and displays exact dollar/rupee distributions for Senior Engineering, Project Leadership, and Company Reserves.
- **Audit Logs (SEC-12)**: Chronological administrative activity tracking.

---

## 📋 SRS Traceability Matrix (Section 5)

| Requirement | Description | Status |
| :--- | :--- | :--- |
| **FR-01** | Homepage displays Codrix logo, headline "Turning Ideas Into Technology", and clear CTAs | ✅ Implemented |
| **FR-02** | Present company story, mission, vision, and engineering philosophy | ✅ Implemented |
| **FR-03 & FR-04** | Service catalogue grouped by engineering domain with tech tags, benefits, and CTAs | ✅ Implemented |
| **FR-05 & FR-06** | Product section showing statuses and detailed modal case study views | ✅ Implemented |
| **FR-07** | Global vision section explaining remote delivery and international collaboration | ✅ Implemented |
| **FR-08** | Leadership section showing approved profiles, responsibilities, and org hierarchy visual | ✅ Implemented |
| **FR-09 & FR-10** | Structured inquiry form with client/server validation and real-time feedback | ✅ Implemented |
| **FR-11** | Inquiry persistence in store and notification dispatch logging | ✅ Implemented |
| **FR-12 & FR-13** | Admin dashboard for services, products, leadership, and inquiry status updates | ✅ Implemented |
| **FR-14 & FR-15** | Internal project allocation rules validated to strictly 100% total; financial data protected | ✅ Implemented |
| **FR-16** | Basic analytics and lead performance reporting | ✅ Implemented |
| **FR-17 & FR-18** | Loading/empty/validation states, full responsive design (mobile/tablet/desktop) | ✅ Implemented |

