import React from 'react';
import { Clock3, MessageCircle, Phone, ShieldCheck, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

const productLabels: Record<string, string> = {
  'steel-door': 'Cửa thép ngăn cháy',
  'glass-door': 'Cửa kính ngăn cháy',
  'roller-shutter': 'Cửa cuốn ngăn cháy',
  'fire-curtain': 'Rèm ngăn cháy',
};

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedProduct }) => {
  if (!isOpen) return null;

  const productLabel = preselectedProduct ? productLabels[preselectedProduct] : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-t-2xl border border-white/10 bg-white shadow-2xl sm:rounded-2xl">
        <div className="relative bg-slate-950 px-6 py-6 text-white sm:px-8 sm:py-7">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-red-600" />
          <button onClick={onClose} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-slate-400 transition-colors hover:text-white" aria-label="Đóng cửa sổ liên hệ">
            <X className="h-5 w-5" />
          </button>
          <p className="text-xs font-semibold uppercase text-red-400">Kết nối trực tiếp</p>
          <h2 className="mt-2 max-w-sm text-2xl font-semibold leading-8 text-white">Trao đổi với nhân viên kinh doanh APEX</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            {productLabel
              ? `Bạn đang quan tâm ${productLabel}. Gọi hoặc nhắn Zalo để trao đổi nhanh về kích thước, số lượng và tiến độ.`
              : 'Gọi hoặc nhắn Zalo để trao đổi nhanh về sản phẩm, kích thước, số lượng và tiến độ công trình.'}
          </p>
        </div>

        <div className="space-y-3 p-5 sm:p-8">
          <a href={COMPANY_INFO.hotlineHref} className="group flex min-h-20 items-center gap-4 border border-red-200 bg-red-50 p-4 transition-colors hover:border-red-600 hover:bg-red-100">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-red-600 text-white"><Phone className="h-5 w-5" /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold uppercase text-red-700">Gọi tư vấn ngay</span>
              <strong className="mt-1 block text-xl text-slate-950">{COMPANY_INFO.hotlineDisplay}</strong>
            </span>
            <span className="text-sm font-semibold text-red-700">Gọi</span>
          </a>

          <a href={COMPANY_INFO.zaloHref} target="_blank" rel="noopener noreferrer" className="group flex min-h-20 items-center gap-4 border border-slate-200 bg-white p-4 transition-colors hover:border-blue-500 hover:bg-blue-50">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-blue-600 text-white"><MessageCircle className="h-5 w-5" /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold uppercase text-blue-700">Nhắn nhân viên kinh doanh</span>
              <strong className="mt-1 block text-base text-slate-950">Zalo {COMPANY_INFO.hotlineDisplay}</strong>
            </span>
            <span className="text-sm font-semibold text-blue-700">Mở Zalo</span>
          </a>

          <div className="grid grid-cols-1 gap-3 border-t border-slate-200 pt-5 text-xs text-slate-600 sm:grid-cols-2">
            <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 shrink-0 text-red-600" /><span>{COMPANY_INFO.workingHours}</span></div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" /><span>{COMPANY_INFO.responseTime}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
