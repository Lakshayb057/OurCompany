import React, { useState, useEffect, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MorphingLogo } from './components/MorphingLogo';
import { MorphingButton } from './components/MorphingButton';
import { OurStory } from './components/OurStory';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProjectsPage } from './components/ProjectsPage';
import { ServicesPage } from './components/ServicesPage';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProcessSection } from './components/ProcessSection';
import { GlobalVision } from './components/GlobalVision';
import { LeadershipSection } from './components/LeadershipSection';
import { PlansSection } from './components/PlansSection';
import { PlansPage } from './components/PlansPage';
import { PartnershipPhilosophy } from './components/PartnershipPhilosophy';
import { InquirySection } from './components/InquirySection';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { CookieConsent } from './components/CookieConsent';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { getStoredTheme, saveStoredTheme } from './utils/session';
import { realtimeSync } from './utils/realtime';

import { INITIAL_SERVICES, INITIAL_PRODUCTS, INITIAL_TEAM } from './data/mockData';
import { Service, Product, TeamMember, SiteContent } from './types';
import { PlanPackage, PLANS_DATA } from './data/plansData';

function sanitizeBrand<T>(obj: T): T {
  if (typeof obj === 'string') {
    return obj
      .replace(/CODEVERSE/g, 'CODRIX')
      .replace(/CodeVerse/g, 'Codrix')
      .replace(/Codeverse/g, 'Codrix')
      .replace(/codeverse/g, 'codrix') as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeBrand) as unknown as T;
  }
  if (obj && typeof obj === 'object') {
    const res: any = {};
    for (const key of Object.keys(obj)) {
      res[key] = sanitizeBrand((obj as any)[key]);
    }
    return res as T;
  }
  return obj;
}

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
  const [fallbackOverlay, setFallbackOverlay] = useState<{
    x: number;
    y: number;
    color: string;
  } | null>(null);
  const isThemeTransitioningRef = useRef(false);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [plans, setPlans] = useState<PlanPackage[]>(PLANS_DATA);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [inquiryDomain, setInquiryDomain] = useState<string>('AI, Intelligent Agents & OCR');
  const [currentRoute, setCurrentRoute] = useState<'home' | 'projects' | 'services' | 'plan'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/projects') {
        return 'projects';
      }
      if (path === '/services') {
        return 'services';
      }
      if (path === '/plan' || path === '/plans') {
        return 'plan';
      }
    }
    return 'home';
  });

  // Activate calibrated slow, silky-smooth momentum scrolling
  useSmoothScroll(!isAdminOpen && !selectedCaseStudy);

  // URL-based Admin, Projects, Services & Plans route detection (/admin, /projects, /services, /plan, or hashes)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const isAdmin = path === '/admin' || hash === '#admin';
      setIsAdminOpen(isAdmin);

      if (path === '/projects') {
        setCurrentRoute('projects');
      } else if (path === '/services') {
        setCurrentRoute('services');
      } else if (path === '/plan' || path === '/plans') {
        setCurrentRoute('plan');
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
      const fallback = currentRoute === 'home' ? '/' : `/${currentRoute}`;
      window.history.pushState(null, '', fallback);
    } else if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const navigateToProjects = () => {
    setCurrentRoute('projects');
    window.history.pushState(null, '', '/projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToServices = () => {
    setCurrentRoute('services');
    window.history.pushState(null, '', '/services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPlans = () => {
    setCurrentRoute('plan');
    window.history.pushState(null, '', '/plan');
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
    if (target === 'explore-projects' || target === 'projects-page') {
      navigateToProjects();
    } else if (target === 'explore-services' || target === 'services-page') {
      navigateToServices();
    } else if (target === 'plans') {
      navigateToPlans();
    } else if (currentRoute !== 'home') {
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

  const toggleTheme = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (isThemeTransitioningRef.current) return;

    const next = theme === 'light' ? 'dark' : 'light';

    // Calculate origin coordinates (switching button center)
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (e?.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else if (e && typeof e.clientX === 'number' && e.clientX > 0) {
      x = e.clientX;
      y = e.clientY;
    }

    // Maximum distance from origin to all 4 screen corners ensures total coverage
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const doc = document as any;

    // Standard View Transitions API (Chrome 111+, Edge 111+, Firefox 127+, Safari 18+)
    if (typeof doc.startViewTransition === 'function') {
      isThemeTransitioningRef.current = true;
      const root = document.documentElement;

      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          root.classList.add('theme-no-transitions');
          setTheme(next);
          if (next === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
          } else {
            root.classList.add('light');
            root.classList.remove('dark');
          }
          saveStoredTheme(next);
        });
      });

      transition.ready
        .then(() => {
          const animation = root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 650,
              easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );

          animation.onfinish = () => {
            root.classList.remove('theme-no-transitions');
            isThemeTransitioningRef.current = false;
          };
        })
        .catch(() => {
          root.classList.remove('theme-no-transitions');
          isThemeTransitioningRef.current = false;
        });

      return;
    }

    // Seamless fallback for environments without View Transitions API
    isThemeTransitioningRef.current = true;
    setFallbackOverlay({
      x,
      y,
      color: next === 'dark' ? '#09090B' : '#FBFBFE',
    });

    setTimeout(() => {
      setTheme(next);
      saveStoredTheme(next);
    }, 320);

    setTimeout(() => {
      setFallbackOverlay(null);
      isThemeTransitioningRef.current = false;
    }, 650);
  };

  // Load latest data from backend with real-time sync
  const fetchData = useCallback(async () => {
    try {
      const [srvRes, prodRes, teamRes, plansRes, contentRes] = await Promise.allSettled([
        fetch('/api/v1/services', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/v1/products', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/v1/team', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/v1/plans', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/v1/content', { cache: 'no-store' }).then(r => r.json()),
      ]);

      if (srvRes.status === 'fulfilled' && srvRes.value?.success && srvRes.value.data?.length) {
        setServices(sanitizeBrand(srvRes.value.data));
      }
      if (prodRes.status === 'fulfilled' && prodRes.value?.success && prodRes.value.data?.length) {
        setProducts(sanitizeBrand(prodRes.value.data));
      }
      if (teamRes.status === 'fulfilled' && teamRes.value?.success && teamRes.value.data?.length) {
        setTeam(sanitizeBrand(teamRes.value.data));
      }
      if (plansRes.status === 'fulfilled' && plansRes.value?.success && plansRes.value.data?.length) {
        setPlans(sanitizeBrand(plansRes.value.data));
      }
      if (contentRes.status === 'fulfilled' && contentRes.value?.success && contentRes.value.data) {
        setSiteContent(sanitizeBrand(contentRes.value.data));
      }
    } catch (err) {
      console.log('Using optimized built-in data:', err);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Real-time synchronization subscription (Socket.io + BroadcastChannel + Polling)
    const unsubscribe = realtimeSync.subscribe(() => {
      fetchData();
    });

    return () => {
      unsubscribe();
    };
  }, [fetchData]);

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

  const handleUpdateProduct = async (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    realtimeSync.broadcastChange('products', 'update', updated);
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    realtimeSync.broadcastChange('products', 'create', newProd);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    realtimeSync.broadcastChange('products', 'delete', { id });
  };

  const handleUpdateService = async (updated: Service) => {
    setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
    realtimeSync.broadcastChange('services', 'update', updated);
  };

  const handleAddService = (newSrv: Service) => {
    setServices(prev => [newSrv, ...prev]);
    realtimeSync.broadcastChange('services', 'create', newSrv);
  };

  const handleDeleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    realtimeSync.broadcastChange('services', 'delete', { id });
  };

  const handleUpdateTeamMember = (updated: TeamMember) => {
    setTeam(prev => prev.map(t => t.id === updated.id ? updated : t));
    realtimeSync.broadcastChange('team', 'update', updated);
  };

  const handleAddTeamMember = (newMember: TeamMember) => {
    setTeam(prev => [...prev, newMember]);
    realtimeSync.broadcastChange('team', 'create', newMember);
  };

  const handleDeleteTeamMember = (id: string) => {
    setTeam(prev => prev.filter(t => t.id !== id));
    realtimeSync.broadcastChange('team', 'delete', { id });
  };

  const handleUpdatePlan = (updated: PlanPackage) => {
    setPlans(prev => prev.map(p => p.id === updated.id ? updated : p));
    realtimeSync.broadcastChange('plans', 'update', updated);
  };

  const handleAddPlan = (newPlan: PlanPackage) => {
    setPlans(prev => [...prev, newPlan]);
    realtimeSync.broadcastChange('plans', 'create', newPlan);
  };

  const handleDeletePlan = (id: string) => {
    setPlans(prev => prev.filter(p => p.id !== id));
    realtimeSync.broadcastChange('plans', 'delete', { id });
  };

  const handleUpdateSiteContent = (section: keyof SiteContent, data: any) => {
    realtimeSync.broadcastChange('content', 'update', { section, data });
    setSiteContent(prev => {
      const current = prev || {
        hero: { line1: '', line2: '', line3: '', badge1: '', badge2: '', statCode: '' },
        story: { heading: '', subheading: '', paragraph1: '', paragraph2: '', stats: [] },
        process: [],
        globalVision: { headline: '', subheading: '', metrics: [] },
        siteSettings: {
          companyName: '',
          legalHeadquarters: '',
          contactEmail: '',
          contactPhone: '',
          copyrightNotice: '',
          linkedinUrl: '',
          instagramUrl: '',
          gmailUrl: ''
        }
      };
      return { ...current, [section]: sanitizeBrand(data) };
    });
  };

  return (
    <>
      {/* 3D Cinematic Animated Splash Screen on First Load */}
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      <div className="min-h-screen w-full max-w-full overflow-x-clip bg-light text-light-text dark:bg-midnight dark:text-white flex flex-col selection:bg-electric-purple selection:text-white transition-colors duration-300">
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
        isAlwaysDocked={currentRoute !== 'home'}
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
        {currentRoute === 'plan' ? (
          <PlansPage
            onBackToHome={() => navigateToHome()}
            plans={plans}
          />
        ) : currentRoute === 'projects' ? (
          <ProjectsPage
            products={products}
            onOpenCaseStudy={(prod) => setSelectedCaseStudy(prod)}
            onBackToHome={(sectionId) => navigateToHome(sectionId)}
            onInquire={(domain) => {
              setInquiryDomain(domain || 'Architecture inspired by Projects');
              navigateToHome('contact');
            }}
          />
        ) : currentRoute === 'services' ? (
          <ServicesPage
            services={services}
            products={products}
            onOpenCaseStudy={(prod) => setSelectedCaseStudy(prod)}
            onBackToHome={(sectionId) => navigateToHome(sectionId)}
            onInquire={(domain) => {
              setInquiryDomain(domain || 'Platform Tie-Up / In-House Service');
              navigateToHome('contact');
            }}
            onExploreProjects={navigateToProjects}
          />
        ) : (
          <>
            {/* Section 01: Hero */}
            <Hero
              content={siteContent?.hero}
              anchorRef={heroLogoAnchorRef}
              startBtnAnchorRef={heroBtnAnchorRef}
              exploreBtnAnchorRef={heroExploreBtnAnchorRef}
              onStartProject={() => scrollToSection('contact')}
              onExplorePortfolio={() => scrollToSection('projects')}
              onExploreProjects={() => scrollToSection('projects')}
            />

            {/* Section 02 & 03: Our Story & Philosophy */}
            <OurStory
              content={siteContent?.story}
            />

            {/* Section 04: What We Build / Engineering Capabilities */}
            <ServicesSection
              services={services}
              onSelectService={handleSelectServiceForInquiry}
              onViewAllServices={navigateToServices}
            />

            {/* Section 04.5: Top Flagship Projects (Appendix C) */}
            <PortfolioSection
              products={products}
              onOpenCaseStudy={(prod) => setSelectedCaseStudy(prod)}
              onViewAllProjects={navigateToProjects}
              onViewAllServices={navigateToServices}
            />

            {/* Section 05: How We Work (Discovery to Delivery) */}
            <ProcessSection
              stages={siteContent?.process}
            />

            {/* Section 07: Global Vision */}
            <GlobalVision
              content={siteContent?.globalVision}
              onStartProject={() => scrollToSection('contact')}
            />

            {/* Section 03: Stakeholders & Leadership */}
            <LeadershipSection
              team={team}
            />

            {/* Section 08: Engineering Plans & Packages */}
            <PlansSection
              plans={plans}
              onOpenPlansPage={navigateToPlans}
            />

            {/* Section 09 & 10.4: Partnership & 100% Allocation Philosophy */}
            <PartnershipPhilosophy />

            {/* Section 10: Let's Build Together (Project Inquiry) */}
            <InquirySection
              initialProjectType={inquiryDomain}
              onRedirectToPlans={navigateToPlans}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        settings={siteContent?.siteSettings}
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
        onDeleteProduct={handleDeleteProduct}
        onAddProduct={handleAddProduct}
        services={services}
        onUpdateService={handleUpdateService}
        onDeleteService={handleDeleteService}
        onAddService={handleAddService}
        team={team}
        onUpdateTeamMember={handleUpdateTeamMember}
        onDeleteTeamMember={handleDeleteTeamMember}
        onAddTeamMember={handleAddTeamMember}
        plans={plans}
        onUpdatePlan={handleUpdatePlan}
        onDeletePlan={handleDeletePlan}
        onAddPlan={handleAddPlan}
        siteContent={siteContent || undefined}
        onUpdateSiteContent={handleUpdateSiteContent}
        isDark={theme === 'dark'}
        onToggleTheme={toggleTheme}
      />

      {/* Cookie & Session Preferences Consent Banner */}
      <CookieConsent />

      {/* Circular Theme Reveal Fallback Overlay */}
      {fallbackOverlay && (
        <div
          className="theme-reveal-fallback"
          style={{
            '--reveal-x': `${fallbackOverlay.x}px`,
            '--reveal-y': `${fallbackOverlay.y}px`,
            backgroundColor: fallbackOverlay.color,
          } as React.CSSProperties}
          aria-hidden="true"
        />
      )}
    </div>
  </>
  );
};
