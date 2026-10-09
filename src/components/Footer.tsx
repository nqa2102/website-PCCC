import React from 'react';
import { Phone, MapPin, ShieldCheck, ChevronRight, FileCheck, Mail } from 'lucide-react';
import { useLiveData } from '../admin/adminData';
import { ApexBrandLogo } from './brand';
import { pathForRoute } from '../routing';

interface FooterProps {
  onNavigate: (tab: string, itemId?: string) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { company } = useLiveData();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: string, itemId?: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(tab, itemId);
  };

  return (
    <footer className="bg-[#102b21] text-neutral-300 border-t border-white/10 text-xs">
      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="mb-2">
              <ApexBrandLogo
                layout="horizontal"
                size="md"
                theme="gold"
                taglineMode="none"
                asLink={false}
              />
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed pr-4">
              {company.legalName} cung cấp giải pháp ngăn cháy toàn diện cho nhà ở và công trình, với sản phẩm được cấu hình theo yêu cầu thực tế.
            </p>

            <div className="space-y-2 pt-2 text-neutral-300">
              {company.addresses.map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>{item.label}:</strong> {item.value}</span>
                </div>
              ))}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href={company.hotlineHref}>Hotline: {company.hotlineDisplay}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`mailto:${company.email || 'contact@apex.vn'}`}>Email: {company.email || 'contact@apex.vn'}</a>
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
                <a
                  href="/san-pham?nhom=steel-door"
                  onClick={(e) => handleNavClick(e, 'products', 'steel-door')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Cửa thép ngăn cháy EI70 - EI120</span>
                </a>
              </li>
              <li>
                <a
                  href="/san-pham?nhom=glass-door"
                  onClick={(e) => handleNavClick(e, 'products', 'glass-door')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Cửa kính ngăn cháy</span>
                </a>
              </li>
              <li>
                <a
                  href="/san-pham?nhom=roller-shutter"
                  onClick={(e) => handleNavClick(e, 'products', 'roller-shutter')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Cửa cuốn ngăn cháy</span>
                </a>
              </li>
              <li>
                <a
                  href="/san-pham?nhom=fire-curtain"
                  onClick={(e) => handleNavClick(e, 'products', 'fire-curtain')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Rèm ngăn cháy</span>
                </a>
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
                <a
                  href="/giai-phap/chung-cu-can-ho"
                  onClick={(e) => handleNavClick(e, 'solutions', 'chung-cu-can-ho')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Chung cư, căn hộ cao tầng</span>
                </a>
              </li>
              <li>
                <a
                  href="/giai-phap/van-phong-toa-nha"
                  onClick={(e) => handleNavClick(e, 'solutions', 'van-phong-toa-nha')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Văn phòng, tòa nhà thương mại</span>
                </a>
              </li>
              <li>
                <a
                  href="/giai-phap/trung-tam-thuong-mai"
                  onClick={(e) => handleNavClick(e, 'solutions', 'trung-tam-thuong-mai')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Trung tâm thương mại & siêu thị</span>
                </a>
              </li>
              <li>
                <a
                  href="/giai-phap/nha-xuong-khu-cong-nghiep"
                  onClick={(e) => handleNavClick(e, 'solutions', 'nha-xuong-khu-cong-nghiep')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Nhà xưởng, khu công nghiệp</span>
                </a>
              </li>
              <li>
                <a
                  href="/giai-phap/benh-vien-truong-hoc"
                  onClick={(e) => handleNavClick(e, 'solutions', 'benh-vien-truong-hoc')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Bệnh viện, trường học</span>
                </a>
              </li>
              <li>
                <a
                  href="/du-an"
                  onClick={(e) => handleNavClick(e, 'projects')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-500" />
                  <span>Xem hồ sơ dự án tiêu biểu</span>
                </a>
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
            © {new Date().getFullYear()} {company.legalNameUpper}. Mã số doanh nghiệp: {company.taxCode} do Sở Tài chính TP. Hà Nội cấp ngày {company.registeredDate}. Đại diện pháp luật: {company.representative} - {company.representativeTitle}.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/tai-lieu-ky-thuat"
              onClick={(e) => handleNavClick(e, 'documents')}
              className="hover:text-neutral-300"
            >
              Xem hồ sơ kỹ thuật
            </a>
            <span>·</span>
            <a
              href="/gioi-thieu"
              onClick={(e) => handleNavClick(e, 'about')}
              className="hover:text-neutral-300"
            >
              Bảo hành 12-24 tháng
            </a>
            <span>·</span>
            <a
              href="/lien-he"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hover:text-neutral-300"
            >
              Liên hệ hợp tác
            </a>
            <span>·</span>
            <a
              href="/chinh-sach-bao-mat"
              onClick={(e) => handleNavClick(e, 'privacy')}
              className="hover:text-neutral-300"
            >
              Chính sách bảo mật
            </a>
            <span>·</span>
            <a
              href="/admin"
              onClick={(e) => handleNavClick(e, 'admin')}
              className="text-neutral-400 hover:text-red-400 transition-colors"
              title="Cổng quản trị APEX"
            >
              Quản trị
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
