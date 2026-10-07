import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuickContactWidget } from './components/QuickContactWidget';

import { HomePage } from './pages/HomePage';
import { applySeo, isProductCategory, pathForRoute, readRoute, type AppRoute } from './routing';

const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((module) => ({ default: module.ProductsPage })));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage').then((module) => ({ default: module.SolutionsPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })));
const TechnicalDocsPage = lazy(() => import('./pages/TechnicalDocsPage').then((module) => ({ default: module.TechnicalDocsPage })));
const NewsPage = lazy(() => import('./pages/NewsPage').then((module) => ({ default: module.NewsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((module) => ({ default: module.PrivacyPage })));
const QuoteModal = lazy(() => import('./components/QuoteModal').then((module) => ({ default: module.QuoteModal })));
const LiveChatModal = lazy(() => import('./components/LiveChatModal').then((module) => ({ default: module.LiveChatModal })));
const SearchModal = lazy(() => import('./components/SearchModal').then((module) => ({ default: module.SearchModal })));
const AdminPortal = lazy(() => import('./admin/AdminPortal').then((module) => ({ default: module.AdminPortal })));

const PageFallback = () => (
  <div className="flex min-h-[45vh] items-center justify-center bg-neutral-50" role="status">
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-red-700" />
    <span className="sr-only">Đang tải nội dung</span>
  </div>
);

export default function App() {
  const initialRoute = useRef(readRoute()).current;
  const [isAdmin, setIsAdmin] = useState(() => initialRoute.tab === 'admin');
  const [activeTab, setActiveTab] = useState<string>(() => initialRoute.tab === 'admin' ? 'home' : initialRoute.tab);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotePreselectedProduct, setQuotePreselectedProduct] = useState<string | undefined>();
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Sub-item routing state
  const [targetProductId, setTargetProductId] = useState<string | undefined>(() => initialRoute.tab === 'products' ? initialRoute.itemId : undefined);
  const [targetProductCategory, setTargetProductCategory] = useState<string | undefined>(() => initialRoute.tab === 'products' ? initialRoute.category : undefined);
  const [targetSolutionId, setTargetSolutionId] = useState<string | undefined>(() => initialRoute.tab === 'solutions' ? initialRoute.itemId : undefined);
  const [targetProjectId, setTargetProjectId] = useState<string | undefined>(() => initialRoute.tab === 'projects' ? initialRoute.itemId : undefined);
  const [targetDocId, setTargetDocId] = useState<string | undefined>(() => initialRoute.tab === 'documents' ? initialRoute.itemId : undefined);
  const [targetArticleId, setTargetArticleId] = useState<string | undefined>(() => initialRoute.tab === 'news' ? initialRoute.itemId : undefined);

  useEffect(() => {
    if (window.location.hash === '#/admin') window.history.replaceState({}, '', '/admin');

    const handleLocationChange = () => applyRouteState(readRoute());
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    applySeo(isAdmin ? 'admin' : activeTab);
  }, [activeTab, isAdmin, targetProductId, targetSolutionId, targetProjectId, targetDocId, targetArticleId]);

  // Scroll to top when changing tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, targetProductId, targetSolutionId, targetProjectId, targetDocId, targetArticleId]);

  const handleOpenQuote = (productType?: string) => {
    setQuotePreselectedProduct(productType);
    setQuoteModalOpen(true);
  };

  const applyRouteState = (route: AppRoute) => {
    const tab = route.tab;
    if (tab === 'admin') {
      setIsAdmin(true);
      return;
    }

    setIsAdmin(false);
    setActiveTab(tab);
    setTargetProductId(undefined);
    setTargetProductCategory(undefined);
    setTargetSolutionId(undefined);
    setTargetProjectId(undefined);
    setTargetDocId(undefined);
    setTargetArticleId(undefined);

    if (tab === 'products') {
      if (route.category || isProductCategory(route.itemId)) {
        setTargetProductCategory(route.category || route.itemId);
      } else {
        setTargetProductId(route.itemId);
      }
    } else if (tab === 'solutions') {
      setTargetSolutionId(route.itemId);
    } else if (tab === 'projects') {
      setTargetProjectId(route.itemId);
    } else if (tab === 'documents') {
      setTargetDocId(route.itemId);
    } else if (tab === 'news') {
      setTargetArticleId(route.itemId);
    }
  };

  const handleNavigate = (tab: string, itemId?: string) => {
    const path = pathForRoute(tab, itemId);
    window.history.pushState({}, '', path);
    applyRouteState(readRoute());
  };

  if (isAdmin) {
    return <Suspense fallback={<PageFallback />}><AdminPortal onExit={() => handleNavigate('home')} /></Suspense>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-slate-900 font-sans selection:bg-red-600 selection:text-white">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          handleNavigate(tab);
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenQuote={() => handleOpenQuote()}
        onSelectProductCategory={(catId) => {
          handleNavigate('products', catId);
        }}
        onSelectSolution={(solId) => {
          handleNavigate('solutions', solId);
        }}
      />

      {/* Main Page Content */}
      <main className="flex-1 pb-16 sm:pb-0">
        <Suspense fallback={<PageFallback />}>
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuote={handleOpenQuote}
            onOpenChat={() => setChatModalOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onOpenQuote={() => handleOpenQuote()}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'products' && (
          <ProductsPage
            key={`${targetProductCategory || 'all'}-${targetProductId || 'list'}`}
            onOpenQuote={handleOpenQuote}
            initialCategory={targetProductCategory}
            initialProductId={targetProductId}
          />
        )}

        {activeTab === 'solutions' && (
          <SolutionsPage
            key={targetSolutionId || 'solutions'}
            onOpenQuote={() => handleOpenQuote()}
            onNavigate={handleNavigate}
            initialSolutionId={targetSolutionId}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsPage
            key={targetProjectId || 'projects'}
            onOpenQuote={() => handleOpenQuote()}
            initialProjectId={targetProjectId}
          />
        )}

        {activeTab === 'documents' && (
          <TechnicalDocsPage
            key={targetDocId || 'documents'}
            onOpenQuote={() => handleOpenQuote()}
            initialDocId={targetDocId}
          />
        )}

        {activeTab === 'news' && (
          <NewsPage
            key={targetArticleId || 'news'}
            onOpenQuote={() => handleOpenQuote()}
            initialArticleId={targetArticleId}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            onOpenQuote={() => handleOpenQuote()}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'privacy' && (
          <PrivacyPage onNavigate={handleNavigate} />
        )}
        </Suspense>
      </main>

      {/* Corporate Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Floating Action Dock Widget (Right edge: Call, Zalo, Chat, Quote, ScrollTop) */}
      <QuickContactWidget
        onOpenChat={() => setChatModalOpen(true)}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Interactive Modals */}
      <Suspense fallback={null}>
        {quoteModalOpen && <QuoteModal
          isOpen
          onClose={() => setQuoteModalOpen(false)}
          preselectedProduct={quotePreselectedProduct}
        />}

        {chatModalOpen && <LiveChatModal
          isOpen
          onClose={() => setChatModalOpen(false)}
          onOpenQuote={() => {
            setChatModalOpen(false);
            handleOpenQuote();
          }}
        />}

        {searchModalOpen && <SearchModal
          isOpen
          onClose={() => setSearchModalOpen(false)}
          onNavigate={handleNavigate}
        />}
      </Suspense>
    </div>
  );
}
