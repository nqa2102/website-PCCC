import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, FileText, ArrowUp, X, Sparkles } from 'lucide-react';

interface QuickContactWidgetProps {
  onOpenQuote: () => void;
  onOpenChat: () => void;
}

export const QuickContactWidget: React.FC<QuickContactWidgetProps> = ({
  onOpenQuote,
  onOpenChat
}) => {
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
        className="hidden min-[1440px]:flex fixed right-4 bottom-6 z-40 flex-col items-center gap-2"
      >
        {/* 1. Gọi ngay */}
        <a
          href="tel:0901234567"
          aria-label="Gọi ngay hotline 0901 234 567"
          className="group relative flex items-center justify-center w-11 h-11 rounded bg-white text-red-700 border border-slate-200 shadow-md hover:border-red-300 transition-colors"
        >
          <Phone className="w-5 h-5" />
          {/* Tooltip */}
          <span className="absolute right-14 whitespace-nowrap bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
            Hotline: 0901 234 567
          </span>
        </a>

        {/* 2. Zalo */}
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

        {/* 3. Chat tư vấn */}
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

        {/* 4. Yêu cầu báo giá */}
        <button
          onClick={onOpenQuote}
          aria-label="Yêu cầu gửi báo giá"
          className="group relative flex items-center justify-center w-11 h-11 rounded bg-red-700 text-white border border-red-700 shadow-md hover:bg-red-800 transition-colors"
        >
          <FileText className="w-4 h-4" />
          {/* Tooltip */}
          <span className="absolute right-14 whitespace-nowrap bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
            Nhận dự toán & báo giá trong 15p
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
        className="min-[1440px]:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-1.5 px-3 flex items-center justify-between shadow-2xl safe-area-bottom"
      >
        {/* Call Hotline */}
        <a
          href="tel:0901234567"
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

        {/* Primary CTA: Nhận báo giá */}
        <button
          onClick={onOpenQuote}
          className="flex items-center gap-1.5 bg-red-600 active:bg-red-700 text-white font-bold text-xs py-2 px-3.5 rounded-full shadow-md active:scale-95 transition-transform"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Nhận báo giá</span>
        </button>
      </nav>

      {/* Mobile Scroll-to-top floating button (Above the bottom bar) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Lên đầu trang"
          className="min-[1440px]:hidden fixed right-3 bottom-16 z-40 flex items-center justify-center w-9 h-9 rounded-full bg-slate-900/80 text-white backdrop-blur-xs shadow-lg active:scale-90 transition-transform"
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
              Quét mã QR hoặc nhắn trực tiếp đến số điện thoại phòng giải pháp kỹ thuật để nhận file CAD và bảng giá đại lý.
            </p>
            
            {/* Mock QR Code Graphic */}
            <div className="bg-neutral-100 p-4 rounded-xl inline-block border border-neutral-200 mb-4">
              <div className="w-40 h-40 bg-white border border-neutral-300 rounded-lg flex flex-col items-center justify-center p-2 mx-auto">
                <div className="grid grid-cols-4 gap-1 w-full h-full p-2">
                  <div className="bg-slate-900 rounded-xs"></div>
                  <div className="bg-slate-200"></div>
                  <div className="bg-slate-900 rounded-xs"></div>
                  <div className="bg-blue-600 rounded-xs"></div>
                  <div className="bg-slate-200"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-slate-200"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-slate-900 rounded-xs"></div>
                  <div className="bg-slate-200"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-slate-200"></div>
                  <div className="bg-blue-600 rounded-xs"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-slate-200"></div>
                  <div className="bg-slate-900 rounded-xs"></div>
                </div>
              </div>
              <p className="text-[11px] font-bold text-slate-700 mt-2">Zalo: 0901 234 567</p>
            </div>

            <div className="flex gap-2">
              <a
                href="https://zalo.me/0901234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center"
              >
                Mở ứng dụng Zalo
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('0901234567');
                  alert('Đã sao chép số Zalo: 0901234567');
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
