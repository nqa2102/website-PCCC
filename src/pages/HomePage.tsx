import React, { useState } from 'react';
import { 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Cog, 
  Users, 
  Building2, 
  Building, 
  Store, 
  Factory, 
  School, 
  Hotel, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Wrench, 
  Clock, 
  Award,
  Layers,
  Flame
} from 'lucide-react';
import { 
  PRODUCTS, 
  SOLUTIONS, 
  PROJECTS, 
  NEWS_ARTICLES, 
  PARTNER_LOGOS, 
  HERO_IMAGE 
} from '../data/mockData';

interface HomePageProps {
  onNavigate: (tab: string, itemId?: string) => void;
  onOpenQuote: (productId?: string) => void;
  onOpenChat: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenQuote,
  onOpenChat,
}) => {
  const [projectIndex, setProjectIndex] = useState(0);

  const nextProject = () => {
    setProjectIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevProject = () => {
    setProjectIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const solutionIcons: Record<string, React.ReactNode> = {
    'chung-cu-can-ho': <Building2 className="w-8 h-8 text-sky-600 mb-2" />,
    'van-phong-toa-nha': <Building className="w-8 h-8 text-sky-600 mb-2" />,
    'trung-tam-thuong-mai': <Store className="w-8 h-8 text-sky-600 mb-2" />,
    'nha-xuong-khu-cong-nghiep': <Factory className="w-8 h-8 text-sky-600 mb-2" />,
    'benh-vien-truong-hoc': <School className="w-8 h-8 text-sky-600 mb-2" />,
    'khach-san-resort': <Hotel className="w-8 h-8 text-sky-600 mb-2" />,
  };

  return (
    <div className="w-full">
      {/* ========================================================
          1. HERO SECTION (Identical to screenshot)
         ======================================================== */}
      <section className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-8 sm:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 z-10">
              
              {/* Tagline */}
              <div className="inline-block">
                <span className="text-[10px] sm:text-xs font-bold text-red-400 tracking-widest uppercase">
                  AN TOÀN KIẾN TẠO GIÁ TRỊ BỀN VỮNG
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight font-serif">
                CỬA CHỐNG CHÁY <br />
                <span className="text-slate-100">GIẢI PHÁP PCCC TOÀN DIỆN</span> <br />
                <span className="text-red-500">CHO MỌI CÔNG TRÌNH</span>
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Công ty TNHH APEX Việt Nam cung cấp các giải pháp cửa chống cháy, cửa cuốn ngăn cháy, rèm ngăn cháy và thiết bị PCCC đồng bộ, đáp ứng tiêu chuẩn an toàn cho công trình dân dụng và công nghiệp.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                <button
                  onClick={() => onNavigate('products')}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg shadow-lg hover:shadow-red-600/30 transition-all active:scale-95 group"
                >
                  <span>Khám phá sản phẩm</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenChat}
                  className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg border border-slate-700 hover:border-slate-500 transition-all active:scale-95"
                >
                  <span>Tư vấn ngay</span>
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                </button>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative mt-2 sm:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-900 group">
                <img
                  src={HERO_IMAGE}
                  alt="Cửa chống cháy APEX Việt Nam"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                
                {/* Float indicator badge */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-slate-950/80 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-slate-700/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-white block">Cửa thép ngăn cháy EI120</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-400">Đạt thử nghiệm kiểm định IBST</span>
                  </div>
                  <button
                    onClick={() => onOpenQuote('steel-door')}
                    className="text-[10px] sm:text-[11px] font-bold text-red-400 hover:text-red-300 underline"
                  >
                    Báo giá nhanh →
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* 4 Trust Indicators Banner (Bottom of Hero in Screenshot) */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-900/50 p-2.5 sm:p-0 rounded-xl sm:rounded-none border border-slate-800/80 sm:border-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-red-500">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold text-white">Đạt tiêu chuẩn</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400">PCCC Việt Nam & Quốc tế</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-900/50 p-2.5 sm:p-0 rounded-xl sm:rounded-none border border-slate-800/80 sm:border-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-red-500">
                <Cog className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold text-white">Sản phẩm chính hãng</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400">Chất lượng cao</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-900/50 p-2.5 sm:p-0 rounded-xl sm:rounded-none border border-slate-800/80 sm:border-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-red-500">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold text-white">Giải pháp đồng bộ</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400">Tư vấn chuyên sâu</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-900/50 p-2.5 sm:p-0 rounded-xl sm:rounded-none border border-slate-800/80 sm:border-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-red-500">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold text-white">Đồng hành cùng</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400">Dự án lớn nhỏ</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. SẢN PHẨM CHỦ LỰC (Core Products - 4 Cards)
         ======================================================== */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                <span className="w-1 h-3.5 bg-red-600 inline-block rounded-xs"></span>
                <span>SẢN PHẨM CHỦ LỰC</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                GIẢI PHÁP PCCC ĐỒNG BỘ TỪ APEX VIỆT NAM
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Cung cấp hệ thống sản phẩm và thiết bị phòng cháy chữa cháy chính hãng, đáp ứng đa dạng nhu cầu công trình.
              </p>
            </div>

            <button
              onClick={() => onNavigate('products')}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group whitespace-nowrap"
            >
              <span>Xem tất cả sản phẩm</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4 Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 bg-neutral-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    {product.fireRating}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-sm font-bold text-slate-900 uppercase group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h3>
                      <button
                        onClick={() => onNavigate('products', product.id)}
                        className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-red-600 transition-colors shrink-0"
                        aria-label={`Xem chi tiết ${product.name}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 mt-3 flex items-center justify-between text-xs">
                    <span className="text-red-600 font-bold">{product.priceEstimate}</span>
                    <button
                      onClick={() => onOpenQuote(product.category)}
                      className="text-[11px] font-medium text-slate-600 hover:text-red-600 underline"
                    >
                      Báo giá
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          3. GIẢI PHÁP AN TOÀN CHO MỌI LOẠI CÔNG TRÌNH
         ======================================================== */}
      <section className="relative py-14 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
        {/* Subtle fire warmth backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.15),transparent_60%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-serif">
                GIẢI PHÁP AN TOÀN <br />
                <span className="text-red-500">CHO MỌI LOẠI CÔNG TRÌNH</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                Từ nhà ở, chung cư, văn phòng đến nhà xưởng, trung tâm thương mại... APEX Việt Nam luôn đồng hành cùng bạn với giải pháp PCCC tối ưu.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-lg hover:shadow-red-600/30 transition-all self-start md:self-auto shrink-0 group active:scale-95"
            >
              <span>Liên hệ tư vấn ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 6 Building Facility Types (Grid from screenshot) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-8">
            {SOLUTIONS.map((sol) => (
              <button
                key={sol.id}
                onClick={() => onNavigate('solutions', sol.id)}
                className="bg-white text-slate-900 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all group border border-neutral-100"
              >
                <div className="p-2 rounded-lg bg-sky-50 group-hover:bg-red-50 transition-colors">
                  {solutionIcons[sol.id] || <Building className="w-8 h-8 text-sky-600 mb-2" />}
                </div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors mt-2">
                  {sol.title}
                </h3>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          4. DỰ ÁN TIÊU BIỂU (Featured Projects Grid/Carousel)
         ======================================================== */}
      <section className="py-14 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                <span className="w-1 h-3.5 bg-red-600 inline-block rounded-xs"></span>
                <span>DỰ ÁN TIÊU BIỂU</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                ĐỒNG HÀNH CÙNG NHIỀU CÔNG TRÌNH TRỌNG ĐIỂM
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('projects')}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group whitespace-nowrap mr-2"
              >
                <span>Xem tất cả dự án</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={prevProject}
                className="w-8 h-8 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-slate-700 transition-colors"
                aria-label="Dự án trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextProject}
                className="w-8 h-8 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-slate-700 transition-colors"
                aria-label="Dự án tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Projects 4-column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                onClick={() => onNavigate('projects', project.id)}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 bg-neutral-200 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-xs">
                    {project.location}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {project.itemsSupplied}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-neutral-100 mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Quy mô: {project.scale}</span>
                    <span className="text-red-600 font-semibold group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          5. VÌ SAO CHỌN APEX VIỆT NAM? (4 Pillars)
         ======================================================== */}
      <section className="py-14 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900">
              VÌ SAO CHỌN APEX VIỆT NAM?
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Cam kết chất lượng vững bền cùng dịch vụ hỗ trợ kỹ thuật chuyên sâu từ giai đoạn thiết kế đến nghiệm thu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-neutral-100 text-slate-900 flex items-center justify-center mb-4 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Sản phẩm chính hãng chất lượng cao
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Đốt mẫu thực nghiệm tại IBST, đạt kiểm định PCCC QCVN 06:2022/BXD.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-neutral-100 text-slate-900 flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Tư vấn giải pháp theo từng công trình
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tối ưu chi phí đầu tư và đáp ứng trọn vẹn tiêu chuẩn an toàn từng phân khu.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-neutral-100 text-slate-900 flex items-center justify-center mb-4">
                <Wrench className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Thi công chuyên nghiệp đúng tiến độ
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Đội ngũ kỹ thuật lành nghề, máy móc hiện đại, đồng hành nghiệm thu bàn giao.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-neutral-100 text-slate-900 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Hỗ trợ bảo trì lâu dài
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Chính sách bảo hành cơ khí 36 tháng, xử lý sự cố kỹ thuật khẩn cấp 24/7.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          6. ĐỐI TÁC & THƯƠNG HIỆU (Brand Logos Carousel)
         ======================================================== */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
              ĐỐI TÁC & THƯƠNG HIỆU
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Đồng hành cùng các tập đoàn hàng đầu</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PARTNER_LOGOS.map((partner, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-neutral-200 flex flex-col items-center justify-center text-center shadow-xs hover:border-red-300 transition-colors"
              >
                <span className="text-sm sm:text-base font-black tracking-tighter text-slate-800">
                  {partner.name}
                </span>
                <span className="text-[9px] text-slate-400 mt-1 line-clamp-1">
                  {partner.tag}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          7. TIN TỨC & KIẾN THỨC PCCC
         ======================================================== */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900">
                TIN TỨC & KIẾN THỨC PCCC
              </h2>
            </div>
            <button
              onClick={() => onNavigate('news')}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group whitespace-nowrap"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3 News Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS_ARTICLES.map((article) => (
              <div
                key={article.id}
                onClick={() => onNavigate('news', article.id)}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
              >
                <div className="relative h-44 bg-neutral-100 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-xs">
                    {article.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{article.date}</span>
                    <span className="text-red-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                      Đọc tiếp →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
