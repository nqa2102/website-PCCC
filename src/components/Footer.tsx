import React from 'react';
import { Phone, MapPin, ShieldCheck, ChevronRight, FileCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <footer className="bg-[#102b21] text-neutral-300 border-t border-white/10 text-xs">
      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white font-serif">
                APEX
              </span>
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[9px] border-b-red-600 ml-1"></div>
              <span className="text-xs font-bold text-slate-400 tracking-wider">
                VIỆT NAM
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed pr-4">
              {COMPANY_INFO.legalName} cung cấp giải pháp ngăn cháy toàn diện cho nhà ở và công trình, với sản phẩm được cấu hình theo yêu cầu thực tế.
            </p>

            <div className="space-y-2 pt-2 text-neutral-300">
              {COMPANY_INFO.addresses.map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>{item.label}:</strong> {item.value}</span>
                </div>
              ))}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href={COMPANY_INFO.hotlineHref}>Hotline: {COMPANY_INFO.hotlineDisplay}</a>
              </div>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Sản Phẩm Chủ Lực
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Cửa thép ngăn cháy EI70 - EI120</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Cửa kính ngăn cháy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Cửa cuốn ngăn cháy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Rèm ngăn cháy</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions & Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Giải Pháp Theo Công Trình
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Chung cư, căn hộ cao tầng</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Văn phòng, tòa nhà thương mại</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Trung tâm thương mại & siêu thị</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Nhà xưởng, khu công nghiệp</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Bệnh viện, trường học</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Xem hồ sơ dự án tiêu biểu</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Standards & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Tiêu Chuẩn & Chứng Chỉ
            </h4>
            <div className="space-y-2">
              <div className="bg-[#163b2c] p-2.5 rounded-lg border border-white/10 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">QCVN 06:2022/BXD</p>
                  <p className="text-[10px] text-neutral-400">Cùng Sửa đổi 1:2023</p>
                </div>
              </div>
              <div className="bg-[#163b2c] p-2.5 rounded-lg border border-white/10 flex items-start gap-2">
                <FileCheck className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">QCVN 03:2023/BCA</p>
                  <p className="text-[10px] text-neutral-400">Phương tiện phòng cháy và chữa cháy</p>
                </div>
              </div>
              <div className="bg-[#163b2c] p-2.5 rounded-lg border border-white/10 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">TCVN 9383:2012</p>
                  <p className="text-[10px] text-neutral-400">Thử nghiệm khả năng chịu lửa</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.legalNameUpper}. Đại diện: {COMPANY_INFO.representative} - {COMPANY_INFO.representativeTitle}.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('documents')} className="hover:text-neutral-300">
              Tải tài liệu kỹ thuật
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('about')} className="hover:text-neutral-300">
              Bảo hành 12-24 tháng
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-neutral-300">
              Liên hệ hợp tác
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
