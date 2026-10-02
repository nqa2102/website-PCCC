import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuickContactWidget } from './components/QuickContactWidget';

import { HomePage } from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((module) => ({ default: module.ProductsPage })));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage').then((module) => ({ default: module.SolutionsPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })));
const TechnicalDocsPage = lazy(() => import('./pages/TechnicalDocsPage').then((module) => ({ default: module.TechnicalDocsPage })));
const NewsPage = lazy(() => import('./pages/NewsPage').then((module) => ({ default: module.NewsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const QuoteModal = lazy(() => import('./components/QuoteModal').then((module) => ({ default: module.QuoteModal })));
const LiveChatModal = lazy(() => import('./components/LiveChatModal').then((module) => ({ default: module.LiveChatModal })));
const SearchModal = lazy(() => import('./components/SearchModal').then((module) => ({ default: module.SearchModal })));
const AdminApp = lazy(() => import('./admin/AdminApp').then((module) => ({ default: module.AdminApp })));

const PageFallback = () => (
  <div className="flex min-h-[45vh] items-center justify-center bg-neutral-50" role="status">
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-red-700" />
    <span className="sr-only">Đang tải nội dung</span>
  </div>
);

export default function App() {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#/admin');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotePreselectedProduct, setQuotePreselectedProduct] = useState<string | undefined>();
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Sub-item routing state
  const [targetProductId, setTargetProductId] = useState<string | undefined>();
  const [targetProductCategory, setTargetProductCategory] = useState<string | undefined>();
  const [targetSolutionId, setTargetSolutionId] = useState<string | undefined>();
  const [targetDocId, setTargetDocId] = useState<string | undefined>();
  const [targetArticleId, setTargetArticleId] = useState<string | undefined>();

  useEffect(() => {
    const handleHashChange = () => setIsAdmin(window.location.hash === '#/admin');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.title = isAdmin
      ? 'APEX Admin - Trung tâm vận hành website'
      : 'APEX Việt Nam - Cửa Chống Cháy & Giải Pháp PCCC Toàn Diện';
  }, [isAdmin]);

  // Scroll to top when changing tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleOpenQuote = (productType?: string) => {
    setQuotePreselectedProduct(productType);
    setQuoteModalOpen(true);
  };

  const handleNavigate = (tab: string, itemId?: string) => {
    setActiveTab(tab);
    if (tab === 'products') {
      if (itemId && itemId.includes('-door') || itemId === 'roller-shutter' || itemId === 'fire-curtain' || itemId === 'accessories') {
        setTargetProductCategory(itemId);
        setTargetProductId(undefined);
      } else {
        setTargetProductId(itemId);
      }
    } else if (tab === 'solutions') {
      setTargetSolutionId(itemId);
    } else if (tab === 'documents') {
      setTargetDocId(itemId);
    } else if (tab === 'news') {
      setTargetArticleId(itemId);
    }
  };

  if (isAdmin) {
    return <Suspense fallback={<PageFallback />}><AdminApp onExit={() => { window.location.hash = ''; }} /></Suspense>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-slate-900 font-sans selection:bg-red-600 selection:text-white">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setTargetProductId(undefined);
          setTargetProductCategory(undefined);
          setTargetSolutionId(undefined);
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
        onSelectProductCategory={(catId) => {
          setActiveTab('products');
          setTargetProductCategory(catId);
          setTargetProductId(undefined);
        }}
        onSelectSolution={(solId) => {
          setActiveTab('solutions');
          setTargetSolutionId(solId);
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
            onOpenQuote={handleOpenQuote}
            initialCategory={targetProductCategory}
            initialProductId={targetProductId}
          />
        )}

        {activeTab === 'solutions' && (
          <SolutionsPage
            onOpenQuote={() => handleOpenQuote()}
            onNavigate={handleNavigate}
            initialSolutionId={targetSolutionId}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsPage
            onOpenQuote={() => handleOpenQuote()}
            initialProjectId={targetProductId}
          />
        )}

        {activeTab === 'documents' && (
          <TechnicalDocsPage
            onOpenQuote={() => handleOpenQuote()}
            initialDocId={targetDocId}
          />
        )}

        {activeTab === 'news' && (
          <NewsPage
            onOpenQuote={() => handleOpenQuote()}
            initialArticleId={targetArticleId}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            onOpenQuote={() => handleOpenQuote()}
          />
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
