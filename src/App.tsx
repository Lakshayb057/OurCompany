import React, { useState, useEffect, useRef } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MorphingLogo } from './components/MorphingLogo';
import { MorphingButton } from './components/MorphingButton';
import { OurStory } from './components/OurStory';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProcessSection } from './components/ProcessSection';
import { GlobalVision } from './components/GlobalVision';
import { LeadershipSection } from './components/LeadershipSection';
import { PartnershipPhilosophy } from './components/PartnershipPhilosophy';
import { InquirySection } from './components/InquirySection';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { CookieConsent } from './components/CookieConsent';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { getStoredTheme, saveStoredTheme } from './utils/session';

import { INITIAL_SERVICES, INITIAL_PRODUCTS, INITIAL_TEAM } from './data/mockData';
import { Service, Product, TeamMember } from './types';

export const App: React.FC = () => {
  const heroLogoAnchorRef = useRef<HTMLDivElement>(null);
  const heroBtnAnchorRef = useRef<HTMLDivElement>(null);
  const heroExploreBtnAnchorRef = useRef<HTMLDivElement>(null);
  const navbarBtnDockRef = useRef<HTMLDivElement>(null);
  const navbarExploreBtnDockRef = useRef<HTMLDivElement>(null);

  // Splash Screen initial display state
  const [showSplash, setShowSplash] = useState(true);

  // Prevent scroll during initial cinematic splash
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSplash]);

  // Initialize theme from persistent session / cookie / system preference
  const [theme, setTheme] = useState<'light' | 'dark'>(getStoredTheme);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);

  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [inquiryDomain, setInquiryDomain] = useState<string>('AI, Intelligent Agents & OCR');

  // Activate calibrated slow, silky-smooth momentum scrolling
  useSmoothScroll(!isAdminOpen && !selectedCaseStudy);

  // URL-based Admin route detection (/admin or #admin)
  useEffect(() => {
    const checkAdminRoute = () => {
      const isAdmin = window.location.pathname === '/admin' || window.location.hash === '#admin';
      setIsAdminOpen(isAdmin);
    };
    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.pathname === '/admin') {
      window.history.pushState(null, '', '/');
    } else if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  // Handle Theme Switching on <html> and persistent session storage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    saveStoredTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      saveStoredTheme(next);
      return next;
    });
  };

  // Load latest data from backend if reachable
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [srvRes, prodRes, teamRes] = await Promise.allSettled([
          fetch('/api/v1/services').then(r => r.json()),
          fetch('/api/v1/products').then(r => r.json()),
          fetch('/api/v1/team').then(r => r.json()),
        ]);

        if (srvRes.status === 'fulfilled' && srvRes.value.success && srvRes.value.data?.length) {
          setServices(srvRes.value.data);
        }
        if (prodRes.status === 'fulfilled' && prodRes.value.success && prodRes.value.data?.length) {
          setProducts(prodRes.value.data);
        }
        if (teamRes.status === 'fulfilled' && teamRes.value.success && teamRes.value.data?.length) {
          setTeam(teamRes.value.data);
        }
      } catch (err) {
        console.log('Using optimized built-in data:', err);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setInquiryDomain(serviceTitle);
    scrollToSection('contact');
  };

  const handleInquireFromCaseStudy = (projectName: string) => {
    setInquiryDomain(`Architecture inspired by ${projectName}`);
    scrollToSection('contact');
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  return (
    <>
      {/* 3D Cinematic Animated Splash Screen on First Load */}
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      <div className="min-h-screen bg-light text-light-text dark:bg-midnight dark:text-white flex flex-col selection:bg-electric-purple selection:text-white transition-colors duration-300">
        {/* Fixed Navigation Bar */}
      <Navbar
        onNavigate={scrollToSection}
        isDark={theme === 'dark'}
        onToggleTheme={toggleTheme}
        dockStartBtnRef={navbarBtnDockRef}
        dockExploreBtnRef={navbarExploreBtnDockRef}
      />

      {/* 3D Morphing Logo (Glides and morphs seamlessly between Hero and Top-Left Header dock) */}
      <MorphingLogo anchorRef={heroLogoAnchorRef} />

      {/* 3D Morphing Buttons (Start a Project & Explore Projects glide and float seamlessly from Hero to Top-Right Header dock) */}
      <MorphingButton 
        heroStartAnchorRef={heroBtnAnchorRef}
        dockStartAnchorRef={navbarBtnDockRef}
        heroExploreAnchorRef={heroExploreBtnAnchorRef}
        dockExploreAnchorRef={navbarExploreBtnDockRef}
        onStartProject={() => scrollToSection('contact')}
        onExploreProjects={() => scrollToSection('portfolio')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Section 01: Hero */}
        <Hero
          anchorRef={heroLogoAnchorRef}
          startBtnAnchorRef={heroBtnAnchorRef}
          exploreBtnAnchorRef={heroExploreBtnAnchorRef}
          onStartProject={() => scrollToSection('contact')}
          onExplorePortfolio={() => scrollToSection('portfolio')}
        />

        {/* Section 02 & 03: Our Story & Philosophy */}
        <OurStory />

        {/* Section 04: What We Build / Engineering Capabilities */}
        <ServicesSection
          services={services}
          onSelectService={handleSelectServiceForInquiry}
        />

        {/* Section 06 & Appendix C: Flagship & Selected Portfolio Projects */}
        <PortfolioSection
          products={products}
          onOpenCaseStudy={(prod) => setSelectedCaseStudy(prod)}
        />

        {/* Section 05: How We Work (Discovery to Delivery) */}
        <ProcessSection />

        {/* Section 07: Global Vision */}
        <GlobalVision
          onStartProject={() => scrollToSection('contact')}
        />

        {/* Section 03: Stakeholders & Leadership */}
        <LeadershipSection
          team={team}
        />

        {/* Section 09 & 10.4: Partnership & 100% Allocation Philosophy */}
        <PartnershipPhilosophy />

        {/* Section 10: Let's Build Together (Project Inquiry) */}
        <InquirySection
          initialProjectType={inquiryDomain}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
      />

      {/* Deep-Dive Case Study Modal */}
      <CaseStudyModal
        product={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onInquireSimilar={handleInquireFromCaseStudy}
      />

      {/* Section 12 Admin Portal Modal (Accessible exclusively via /admin route) */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        products={products}
        onUpdateProduct={handleUpdateProduct}
      />

      {/* Cookie & Session Preferences Consent Banner */}
      <CookieConsent />
    </div>
  </>
  );
};
