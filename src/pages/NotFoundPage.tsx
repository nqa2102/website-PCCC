import React from 'react';
import { Home, Compass, FileText, Phone, ArrowLeft, Search, ShieldAlert, Layers } from 'lucide-react';
import { useLiveData } from '../admin/adminData';
import { pathForRoute } from '../routing';

interface NotFoundPageProps {
  onNavigate: (tab: string, itemId?: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const { company } = useLiveData();

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, tab: string, itemId?: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(tab, itemId);
  };

  const quickLinks = [
    {
      tab: 'home',
      label: 'Trang chủ',
      desc: 'Quay lại cổng thông tin chính của APEX Việt Nam',
      icon: Home,
      href: '/',
    },
    {
      tab: 'products',
      label: 'Sản phẩm PCCC',
      desc: 'Cửa thép, cửa kính, cửa cuốn & rèm ngăn cháy',
      icon: Layers,
      href: '/san-pham',
    },
    {
      tab: 'solutions',
      label: 'Giải pháp công trình',
      desc: 'Giải pháp phân khoang cho chung cư, nhà xưởng, TTTM',
      icon: Compass,
      href: '/giai-phap',
    },
    {
      tab: 'documents',
      label: 'Tài liệu kỹ thuật',
      desc: 'Tra cứu catalog, tiêu chuẩn và hồ sơ chứng nhận',
      icon: FileText,
      href: '/tai-lieu-ky-thuat',
    },
  ];

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-neutral-50 via-white to-neutral-100 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center space-y-8">
        
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-red-600" />
          <span>Mã lỗi 404 — Không tìm thấy nội dung</span>
        </div>

        {/* 404 Graphic & Heading */}
        <div className="space-y-3">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-slate-900 font-sans">
            4<span className="text-red-600">0</span>4
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển
          </h2>
          <p className="max-w-xl mx-auto text-sm text-slate-600 leading-relaxed">
            Đường dẫn URL có thể bị sai chính tả, nội dung đã được cập nhật sang vị trí mới theo tiêu chuẩn QCVN 06:2022/BXD hoặc trang đã ngừng xuất bản.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="/"
            onClick={(e) => handleLink(e, 'home')}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg text-sm transition-all shadow-sm hover:shadow active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về trang chủ</span>
          </a>
          <a
            href="/lien-he"
            onClick={(e) => handleLink(e, 'contact')}
            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-slate-800 font-semibold px-6 py-3 rounded-lg text-sm border border-neutral-300 transition-colors"
          >
            <Phone className="w-4 h-4 text-slate-600" />
            <span>Liên hệ hỗ trợ</span>
          </a>
        </div>

        {/* Quick Links Section */}
        <div className="pt-6 border-t border-neutral-200 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 text-center">
            Hoặc bạn có thể truy cập nhanh các chuyên mục sau:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.tab}
                  href={item.href}
                  onClick={(e) => handleLink(e, item.tab)}
                  className="group flex items-start gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-red-300 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Support Hotline Banner */}
        <div className="bg-[#102b21] rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-xs text-emerald-300 font-semibold">Cần hỗ trợ kỹ thuật hoặc báo giá khẩn cấp?</p>
            <p className="text-sm text-neutral-200 mt-0.5">
              Đội ngũ kỹ sư APEX luôn sẵn sàng tư vấn cấu hình ngăn cháy phù hợp theo bản vẽ.
            </p>
          </div>
          <a
            href={company.hotlineHref}
            className="shrink-0 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Gọi {company.hotlineDisplay}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
