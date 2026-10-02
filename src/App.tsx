import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuickContactWidget } from './components/QuickContactWidget';
import { QuoteModal } from './components/QuoteModal';
import { LiveChatModal } from './components/LiveChatModal';
import { SearchModal } from './components/SearchModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TechnicalDocsPage } from './pages/TechnicalDocsPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminApp } from './admin/AdminApp';

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
    return <AdminApp onExit={() => { window.location.hash = ''; }} />;
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
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedProduct={quotePreselectedProduct}
      />

      <LiveChatModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        onOpenQuote={() => {
          setChatModalOpen(false);
          handleOpenQuote();
        }}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
