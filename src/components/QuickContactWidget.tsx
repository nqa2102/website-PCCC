import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowUp, X, Calculator } from 'lucide-react';
import { useLiveData } from '../admin/adminData';

interface QuickContactWidgetProps {
  onOpenChat: () => void;
  onOpenQuote?: () => void;
}

export const QuickContactWidget: React.FC<QuickContactWidgetProps> = ({
  onOpenChat,
  onOpenQuote
}) => {
  const { company } = useLiveData();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showZaloModal, setShowZaloModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ========================================================
          1. DESKTOP FLOATING DOCK (Identical to screenshot on md/lg)
         ======================================================== */}
      <aside 
        aria-label="Kênh liên hệ nhanh desktop" 
        className="hidden md:flex fixed right-4 bottom-6 z-40 flex-col items-center gap-2"
      >
        {/* 1. Báo giá nhanh */}
        {onOpenQuote && (
          <button
            onClick={onOpenQuote}
            aria-label="Nhận báo giá dự toán PCCC"
            className="group relative flex items-center justify-center w-11 h-11 rounded bg-red-600 text-white border border-red-600 shadow-md hover:bg-red-700 transition-colors animate-pulse"
          >
            <Calculator className="w-5 h-5" />
            {/* Tooltip */}
            <span className="absolute right-14 whitespace-nowrap bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
              Dự toán & Báo giá nhanh
            </span>
          </button>
        )}

        {/* 2. Gọi ngay */}
        <a
          href={company.hotlineHref}
          aria-label={`Gọi ngay hotline ${company.hotlineDisplay}`}
          className="group relative flex items-center justify-center w-11 h-11 rounded bg-white text-red-700 border border-slate-200 shadow-md hover:border-red-300 transition-colors"
        >
          <Phone className="w-5 h-5" />
          {/* Tooltip */}
          <span className="absolute right-14 whitespace-nowrap bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
            Hotline: {company.hotlineDisplay}
          </span>
        </a>

        {/* 3. Zalo */}
        <button
          onClick={() => setShowZaloModal(true)}
          aria-label="Liên hệ qua Zalo"
          className="group relative flex items-center justify-center w-11 h-11 rounded bg-white text-blue-700 border border-slate-200 shadow-md hover:border-blue-300 transition-colors"
        >
          <span className="text-[11px] font-extrabold tracking-tight">Zalo</span>
          {/* Tooltip */}
          <span className="absolute right-14 whitespace-nowrap bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
            Chat Zalo Official Account
          </span>
        </button>

        {/* 4. Chat tư vấn */}
        <button
          onClick={onOpenChat}
          aria-label="Chat tư vấn kỹ thuật PCCC"
          className="group relative flex items-center justify-center w-11 h-11 rounded bg-white text-slate-700 border border-slate-200 shadow-md hover:border-slate-400 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          {/* Tooltip */}
          <span className="absolute right-14 whitespace-nowrap bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
            Tư vấn kỹ thuật PCCC trực tuyến
          </span>
        </button>

        {/* 5. Scroll to top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Lên đầu trang"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-slate-700 border border-neutral-200 shadow-md hover:bg-neutral-100 hover:text-red-600 transition-all active:scale-95"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </aside>

      {/* ========================================================
          2. MOBILE RESPONSIVE BOTTOM ACTION BAR (< 640px)
         ======================================================== */}
      <nav 
        aria-label="Thanh liên hệ nhanh mobile"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-1.5 px-3 flex items-center justify-between shadow-2xl safe-area-bottom"
      >
        {/* Call Hotline */}
        <a
          href={company.hotlineHref}
          className="flex flex-col items-center justify-center py-1 px-2 text-slate-700 hover:text-red-600 active:scale-95 transition-transform"
        >
          <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-0.5">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold">Gọi ngay</span>
        </a>

        {/* Zalo */}
        <button
          onClick={() => setShowZaloModal(true)}
          className="flex flex-col items-center justify-center py-1 px-2 text-slate-700 hover:text-blue-600 active:scale-95 transition-transform"
        >
          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-0.5 font-bold text-[10px]">
            Zalo
          </div>
          <span className="text-[10px] font-bold">Zalo Chat</span>
        </button>

        {/* Live Chat */}
        <button
          onClick={onOpenChat}
          className="flex flex-col items-center justify-center py-1 px-2 text-slate-700 hover:text-sky-600 active:scale-95 transition-transform"
        >
          <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-0.5">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold">Tư vấn</span>
        </button>

        {/* Primary CTA: Báo giá ngay */}
        {onOpenQuote ? (
          <button
            onClick={onOpenQuote}
            className="flex items-center gap-1.5 bg-red-600 active:bg-red-700 text-white font-bold text-xs py-2 px-3.5 rounded-full shadow-md active:scale-95 transition-transform"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Báo giá ngay</span>
          </button>
        ) : (
          <a
            href={company.hotlineHref}
            className="flex items-center gap-1.5 bg-red-600 active:bg-red-700 text-white font-bold text-xs py-2 px-3.5 rounded-full shadow-md active:scale-95 transition-transform"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Gọi tư vấn</span>
          </a>
        )}
      </nav>

      {/* Mobile Scroll-to-top floating button (Above the bottom bar) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Lên đầu trang"
          className="md:hidden fixed right-3 bottom-16 z-40 flex items-center justify-center w-9 h-9 rounded-full bg-slate-900/80 text-white backdrop-blur-xs shadow-lg active:scale-90 transition-transform"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* ========================================================
          3. ZALO MODAL
         ======================================================== */}
      {showZaloModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative text-center">
            <button
              onClick={() => setShowZaloModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 font-extrabold text-lg flex items-center justify-center mx-auto mb-3">
              Zalo
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Kết nối Zalo Kỹ thuật APEX
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-4">
              Nhắn trực tiếp đến số điện thoại kinh doanh để trao đổi nhu cầu sản phẩm và công trình.
            </p>

            <p className="mb-4 border-y border-neutral-200 py-4 text-lg font-bold text-slate-900">Zalo {company.hotlineDisplay}</p>

            <div className="flex gap-2">
              <a
                href={company.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center"
              >
                Mở ứng dụng Zalo
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(company.hotlineDisplay.replace(/[^\d+]/g, ''));
                  alert(`Đã sao chép số Zalo: ${company.hotlineDisplay}`);
                }}
                className="px-3 py-2.5 border border-neutral-200 text-slate-700 text-xs font-medium rounded-lg hover:bg-neutral-50"
              >
                Copy SĐT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
