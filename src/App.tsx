import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MorphingLogo } from './components/MorphingLogo';
import { MorphingButton } from './components/MorphingButton';
import { OurStory } from './components/OurStory';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProjectsPage } from './components/ProjectsPage';
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

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

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
  const [currentRoute, setCurrentRoute] = useState<'home' | 'projects'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/projects') {
        return 'projects';
      }
    }
    return 'home';
  });

  // Activate calibrated slow, silky-smooth momentum scrolling
  useSmoothScroll(!isAdminOpen && !selectedCaseStudy);

  // URL-based Admin & Projects route detection (/admin, /projects, or hashes)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const isAdmin = path === '/admin' || hash === '#admin';
      setIsAdminOpen(isAdmin);

      if (path === '/projects') {
        setCurrentRoute('projects');
      } else if (!isAdmin) {
        setCurrentRoute('home');
        if (hash) {
          const targetId = hash.replace('#', '');
          setTimeout(() => {
            scrollToSection(targetId);
          }, 80);
        }
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.pathname === '/admin') {
      window.history.pushState(null, '', currentRoute === 'projects' ? '/projects' : '/');
    } else if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const navigateToProjects = () => {
    setCurrentRoute('projects');
    window.history.pushState(null, '', '/projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = (sectionId?: string) => {
    setCurrentRoute('home');
    window.history.pushState(null, '', '/');
    if (sectionId) {
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNav = (target: string) => {
    if (currentRoute === 'projects') {
      navigateToHome(target);
    } else {
      scrollToSection(target);
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
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-light text-light-text dark:bg-midnight dark:text-white flex flex-col selection:bg-electric-purple selection:text-white transition-colors duration-300">
        {/* Fixed Navigation Bar */}
      <Navbar
        onNavigate={handleNav}
        isDark={theme === 'dark'}
        onToggleTheme={toggleTheme}
        dockStartBtnRef={navbarBtnDockRef}
        dockExploreBtnRef={navbarExploreBtnDockRef}
        currentRoute={currentRoute}
        onLogoClick={() => navigateToHome()}
      />

      {/* 3D Morphing Logo (Glides and morphs seamlessly between Hero and Top-Left Header dock) */}
      <MorphingLogo 
        anchorRef={heroLogoAnchorRef} 
        isAlwaysDocked={currentRoute === 'projects'}
        onLogoClick={() => navigateToHome()}
      />

      {/* 3D Morphing Buttons (Start a Project & Explore Projects glide and float seamlessly from Hero to Top-Right Header dock when on Home page) */}
      {currentRoute === 'home' && (
        <MorphingButton 
          heroStartAnchorRef={heroBtnAnchorRef}
          dockStartAnchorRef={navbarBtnDockRef}
          heroExploreAnchorRef={heroExploreBtnAnchorRef}
          dockExploreAnchorRef={navbarExploreBtnDockRef}
          onStartProject={() => scrollToSection('contact')}
          onExploreProjects={() => scrollToSection('projects')}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentRoute === 'projects' ? (
          <ProjectsPage
            products={products}
            onOpenCaseStudy={(prod) => setSelectedCaseStudy(prod)}
            onBackToHome={(sectionId) => navigateToHome(sectionId)}
            onInquire={(domain) => {
              setInquiryDomain(domain || 'Architecture inspired by Projects');
              navigateToHome('contact');
            }}
          />
        ) : (
          <>
            {/* Section 01: Hero */}
            <Hero
              anchorRef={heroLogoAnchorRef}
              startBtnAnchorRef={heroBtnAnchorRef}
              exploreBtnAnchorRef={heroExploreBtnAnchorRef}
              onStartProject={() => scrollToSection('contact')}
              onExplorePortfolio={() => scrollToSection('projects')}
              onExploreProjects={() => scrollToSection('projects')}
            />

            {/* Section 02 & 03: Our Story & Philosophy */}
            <OurStory />

            {/* Section 04: What We Build / Engineering Capabilities */}
            <ServicesSection
              services={services}
              onSelectService={handleSelectServiceForInquiry}
            />

            {/* Section 04.5: Top Flagship Projects (Appendix C) */}
            <PortfolioSection
              products={products}
              onOpenCaseStudy={(prod) => setSelectedCaseStudy(prod)}
              onViewAllProjects={navigateToProjects}
              onViewAllServices={() => scrollToSection('services')}
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
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNav}
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
