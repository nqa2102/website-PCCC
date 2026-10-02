import React from 'react';
import { ShieldCheck, Award, Wrench, CheckCircle2, FileCheck } from 'lucide-react';
import { STEEL_DOOR_IMAGE } from '../data/mockData';
import { COMPANY_INFO } from '../data/companyData';

interface AboutPageProps {
  onOpenQuote: () => void;
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuote, onNavigate }) => {
  const coreValues = [
    { letter: 'A', icon: FileCheck, english: 'Assurance', vietnamese: 'An tâm', description: 'Cam kết minh bạch về tiêu chuẩn, hồ sơ và chất lượng trong toàn bộ quá trình triển khai.' },
    { letter: 'P', icon: ShieldCheck, english: 'Protection', vietnamese: 'Bảo vệ', description: 'Đặt sự an toàn của con người, tài sản và công trình làm mục tiêu cao nhất.' },
    { letter: 'E', icon: Wrench, english: 'Engineering', vietnamese: 'Kỹ thuật', description: 'Lấy khảo sát thực tế, tính chính xác và khả năng nghiệm thu làm nền tảng cho mọi giải pháp.' },
    { letter: 'X', icon: Award, english: 'eXcellence', vietnamese: 'Vượt trội', description: 'Không ngừng nâng cao sản phẩm, tiến độ và chất lượng phục vụ sau bàn giao.' },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Banner */}
      <div className="bg-slate-900 text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-red-500 font-bold text-xs uppercase tracking-widest block mb-2">
            VỀ CHÚNG TÔI
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-serif">
            {COMPANY_INFO.legalNameUpper}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-3 leading-relaxed">
            Cung cấp giải pháp ngăn cháy toàn diện cho nhà ở và công trình trên phạm vi toàn quốc.
          </p>
        </div>
      </div>

      {/* Main Story & Values */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
              <span className="w-1 h-3.5 bg-red-600 inline-block rounded-xs"></span>
              <span>LỊCH SỬ HÌNH THÀNH & PHÁT TRIỂN</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              Giải pháp ngăn cháy được cấu hình theo nhu cầu thực tế
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thành lập năm {COMPANY_INFO.foundedYear}, {COMPANY_INFO.legalName} tập trung vào bốn nhóm sản phẩm: cửa thép ngăn cháy, cửa kính ngăn cháy, cửa cuốn ngăn cháy và rèm ngăn cháy.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sản phẩm được lựa chọn theo hồ sơ thiết kế, kích thước và phụ kiện thực tế. Cửa thép ngăn cháy có cấu hình EI70, EI90 và EI120; các nhóm còn lại được tư vấn theo yêu cầu từng công trình.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-2xl font-extrabold text-red-600 block">02</span>
                <span className="text-xs font-semibold text-slate-800">Địa điểm nhà máy</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Thạch Thất và Đông Anh, Hà Nội</p>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-2xl font-extrabold text-red-600 block">Toàn quốc</span>
                <span className="text-xs font-semibold text-slate-800">Phạm vi cung ứng</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Tiếp nhận nhu cầu không giới hạn khu vực</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
              <img
                src={STEEL_DOOR_IMAGE}
                width="1200"
                height="896"
                loading="lazy"
                decoding="async"
                alt="Nhà máy APEX Việt Nam"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold block">Sản xuất theo cấu hình thực tế</span>
                <span className="text-[10px] text-slate-300">Kích thước, màu sơn và phụ kiện được xác nhận theo lựa chọn của khách hàng</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Vision - Mission - Core Values */}
      <section className="py-14 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 max-w-2xl">
            <span className="section-kicker">Giá trị cốt lõi</span>
            <h2 className="section-title">APEX không chỉ là tên gọi</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Bốn chữ cái đại diện cho bốn nguyên tắc được áp dụng nhất quán trong sản phẩm, kỹ thuật và cách APEX đồng hành cùng khách hàng.
            </p>
          </div>

          <div className="grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map(({ letter, icon: Icon, english, vietnamese, description }) => (
              <article key={letter} className="min-h-64 border-b border-r border-slate-200 bg-white p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-5xl font-semibold leading-none text-[#14532d]">{letter}</span>
                  <Icon className="h-5 w-5 text-red-700" strokeWidth={1.7} aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-base font-semibold text-slate-900">{english}</h3>
                <p className="mt-1 text-xs font-semibold text-red-700">{vietnamese}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* Production Capacity & Compliance */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                NĂNG LỰC CUNG ỨNG
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white font-serif">
                Sản phẩm theo yêu cầu từng công trình
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                APEX tiếp nhận thông tin thiết kế, tư vấn cấu hình và sản xuất theo kích thước thực tế. Hồ sơ kiểm định và kết quả thử nghiệm được đối chiếu theo loại cửa, số cánh và yêu cầu chịu lửa của từng công trình.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cửa thép ngăn cháy EI70, EI90 và EI120</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kích thước tiêu chuẩn 900 x 2200 mm hoặc theo yêu cầu</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Phụ kiện và màu sơn Jotun theo lựa chọn khách hàng</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('documents')}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                   <span>Yêu cầu tài liệu kỹ thuật</span>
                </button>
                <button
                  onClick={onOpenQuote}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg border border-slate-700 transition-colors"
                >
                  Liên hệ kinh doanh
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-3xl font-extrabold text-red-500 font-mono">EI70-EI120</span>
                <p className="text-xs font-bold text-white">Cấu hình cửa thép</p>
                <p className="text-[11px] text-slate-400">Lựa chọn theo yêu cầu kỹ thuật</p>
              </div>
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-3xl font-extrabold text-red-500 font-mono">02</span>
                <p className="text-xs font-bold text-white">Nhà máy tại Hà Nội</p>
                <p className="text-[11px] text-slate-400">Thạch Thất và Đông Anh</p>
              </div>
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-3xl font-extrabold text-red-500 font-mono">12-24</span>
                <p className="text-xs font-bold text-white">Tháng bảo hành</p>
                <p className="text-[11px] text-slate-400">Tùy theo từng sản phẩm</p>
              </div>
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-3xl font-extrabold text-red-500 font-mono">1-2 ngày</span>
                <p className="text-xs font-bold text-white">Thời gian phản hồi</p>
                <p className="text-[11px] text-slate-400">Tiếp nhận hỗ trợ cả ngày</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
