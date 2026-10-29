import React, { useState, useMemo } from 'react';
import {
  ArrowRight, Award,
  CheckCircle2, Download, FileCheck2, Flame,
  MapPin, MessageSquare, ShieldCheck, Wrench,
  FileText, ExternalLink, Layers, Sparkles
} from 'lucide-react';
import {
  HERO_IMAGE, PARTNER_LOGOS,
} from '../data/mockData';
import { useLiveData } from '../admin/adminData';
import { pathForRoute } from '../routing';

interface HomePageProps {
  onNavigate: (tab: string, itemId?: string) => void;
  onOpenQuote: (productId?: string) => void;
  onOpenChat: () => void;
  onOpenCatalog?: () => void;
}

const trustPoints = [
  { value: 'EI60-EI120', label: 'Dải giới hạn chịu lửa' },
  { value: '12-24 tháng', label: 'Bảo hành theo sản phẩm' },
  { value: '1-2 ngày', label: 'Thời gian phản hồi' },
  { value: 'Toàn quốc', label: 'Phạm vi cung ứng' },
];

const coreValues = [
  { letter: 'A', icon: FileCheck2, english: 'Assurance', vietnamese: 'An tâm', description: 'Cam kết rõ ràng về tiêu chuẩn, hồ sơ và chất lượng để mỗi công trình được triển khai với sự tin cậy.' },
  { letter: 'P', icon: ShieldCheck, english: 'Protection', vietnamese: 'Bảo vệ', description: 'Mọi giải pháp đều hướng tới mục tiêu cốt lõi: bảo vệ con người, tài sản và khả năng thoát nạn.' },
  { letter: 'E', icon: Wrench, english: 'Engineering', vietnamese: 'Kỹ thuật', description: 'Khảo sát đúng hiện trạng, thiết kế đúng yêu cầu và kiểm soát chính xác trong từng khâu sản xuất, lắp đặt.' },
  { letter: 'X', icon: Award, english: 'eXcellence', vietnamese: 'Vượt trội', description: 'Liên tục nâng chuẩn sản phẩm, tiến độ và dịch vụ để tạo ra giá trị bền vững cho mỗi dự án.' },
];

const projectProcess = [
  ['Tiếp nhận yêu cầu', 'Bản vẽ, vị trí lắp đặt, số lượng và tiến độ dự kiến.'],
  ['Rà soát kỹ thuật', 'Đối chiếu công năng, lối thoát nạn và yêu cầu hồ sơ.'],
  ['Khảo sát hiện trường', 'Xác nhận kích thước, chiều mở và điều kiện lắp đặt.'],
  ['Chốt cấu hình', 'Thống nhất vật liệu, phụ kiện, màu và phạm vi cung cấp.'],
  ['Sản xuất & lắp đặt', 'Triển khai theo cấu hình và kích thước đã được xác nhận.'],
  ['Bàn giao', 'Đối chiếu hạng mục, hồ sơ liên quan và chính sách bảo hành.'],
];

// 4 Nhóm giải pháp phân tab trang chủ
type SolutionTab = 'steel' | 'roller' | 'glass' | 'mep';

const SOLUTION_TABS: { id: SolutionTab; label: string; badge: string; desc: string }[] = [
  {
    id: 'steel',
    label: 'Cửa Thép & Vân Gỗ',
    badge: 'EI70 - EI120',
    desc: 'Lối thoát nạn, phòng kỹ thuật, sảnh & căn hộ cao cấp'
  },
  {
    id: 'roller',
    label: 'Cửa Cuốn & Rèm Ngăn Cháy',
    badge: 'EI60 - EI90',
    desc: 'Phân khoang siêu trường tầng hầm, TTTM & nhà xưởng'
  },
  {
    id: 'glass',
    label: 'Cửa Kính & Vách Kính',
    badge: 'EI60 - EI90',
    desc: 'Kiến trúc mở sảnh đón, thông tầng & văn phòng hạng A'
  },
  {
    id: 'mep',
    label: 'Cơ Điện & Trạm Shelter',
    badge: 'IP55 - TCVN',
    desc: 'Tủ điện, thang máng cáp & trạm viễn thông công nghiệp'
  },
];

// Danh sách giấy chứng nhận kiểm định PCCC tiêu biểu
const CERTIFICATES = [
  {
    code: '1803/KD-PCCC-P7',
    authority: 'Cục Cảnh sát PCCC & CNCH',
    title: 'Cửa thép ngăn cháy 1 cánh & 2 cánh',
    rating: 'EI70 - EI90',
    standard: 'QCVN 06:2022/BXD & TCVN 9383:2012',
    scope: 'Áp dụng buồng thang bộ, lối thoát nạn, phòng kỹ thuật điện nước toàn quốc.'
  },
  {
    code: '1786/KD-PCCC-P7',
    authority: 'Cục Cảnh sát PCCC & CNCH',
    title: 'Cửa kính ngăn cháy & Vách kính cố định',
    rating: 'EI60 - EI90',
    standard: 'QCVN 06:2022/BXD',
    scope: 'Kính gel cách nhiệt đa tầng, khung thép gia cường bọc Inox 304 kiến trúc mở.'
  },
  {
    code: '2736/KD-PCCC-P7',
    authority: 'Cục Cảnh sát PCCC & CNCH',
    title: 'Cửa cuốn chống cháy & Rèm ngăn khói',
    rating: 'EI60 - EI90',
    standard: 'TCVN 9383:2012',
    scope: 'Phân chia khoang cháy tầng hầm đỗ xe, trung tâm thương mại và nhà xưởng công nghiệp.'
  },
  {
    code: '2225/KD-PCCC-P7',
    authority: 'Cục Cảnh sát PCCC & CNCH',
    title: 'Cửa thép vân gỗ cách nhiệt & Hệ cơ điện',
    rating: 'EI120 / IP55',
    standard: 'QCVN 06:2022/BXD & ISO 9001:2015',
    scope: 'Cửa căn hộ cao cấp 120 phút kết hợp giải pháp tủ điện cơ điện hạ thế, trạm shelter.'
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenQuote, onOpenChat, onOpenCatalog }) => {
  const { products, projects } = useLiveData();
  const [activeTab, setActiveTab] = useState<SolutionTab>('steel');

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, tab: string, itemId?: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(tab, itemId);
  };

  // Lọc sản phẩm theo tab đang chọn
  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case 'steel':
        return products.filter((p) =>
          p.category === 'cua-thep-ngan-chay' || p.category === 'cua-thep-van-go'
        ).slice(0, 4);
      case 'roller':
        return products.filter((p) =>
          p.category === 'cua-cuon-ngan-chay' || p.category === 'rem-ngan-chay'
        ).slice(0, 4);
      case 'glass':
        return products.filter((p) =>
          p.category === 'cua-kinh-ngan-chay'
        ).slice(0, 4);
      case 'mep':
        return products.filter((p) =>
          p.category === 'tu-dien' ||
          p.category === 'thang-mang-cap' ||
          p.category === 'tu-rack' ||
          p.category === 'nha-tram-shelter' ||
          p.category === 'tu-nguon-outdoor'
        ).slice(0, 4);
      default:
        return products.slice(0, 4);
    }
  }, [products, activeTab]);

  return (
    <div className="w-full bg-neutral-50">
      {/* Hero Section */}
      <section className="relative min-h-[520px] overflow-hidden bg-[#102b21] text-white sm:min-h-[560px]">
        <img
          src={HERO_IMAGE}
          alt="Cửa chống cháy APEX tại công trình"
          width="1376"
          height="768"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,43,33,0.97)_0%,rgba(16,43,33,0.86)_48%,rgba(39,36,31,0.22)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#102b21]/80 to-transparent" />

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-5 py-14 sm:min-h-[560px] sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold text-red-300">
              <span className="h-px w-10 bg-red-400" />
              Vững chuẩn an toàn, trọn niềm an tâm
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
              Bảo vệ công trình bằng giải pháp được kiểm chứng.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              APEX sản xuất và cung ứng đồng bộ hệ thống ngăn cháy & cơ điện công nghiệp: Cửa thép EI70–EI120, Cửa kính, Cửa cuốn siêu trường, Rèm ngăn khói và Tủ điện viễn thông.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="/san-pham"
                onClick={(e) => handleLink(e, 'products')}
                className="flex min-h-12 items-center gap-2 bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 shadow-sm"
              >
                Xem sản phẩm <ArrowRight className="h-4 w-4" />
              </a>
              {onOpenCatalog && (
                <button
                  onClick={onOpenCatalog}
                  className="flex min-h-12 items-center gap-2 border border-white/60 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-slate-950"
                >
                  <Download className="h-4 w-4" /> Tải Hồ sơ năng lực & Catalog
                </button>
              )}
              <button
                onClick={onOpenChat}
                className="flex min-h-12 items-center gap-2 border border-white/30 bg-black/20 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Trao đổi kỹ sư <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-14 hidden max-w-3xl grid-cols-2 border-y border-white/20 sm:grid sm:grid-cols-4">
            {trustPoints.map((item) => (
              <div key={item.label} className="border-white/20 px-3 py-5 first:pl-0 sm:border-r sm:px-5">
                <strong className="block text-lg font-semibold text-white">{item.value}</strong>
                <span className="mt-1 block text-[11px] leading-4 text-slate-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sản phẩm chủ lực với 4 tab giải pháp */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <span className="section-kicker">Sản phẩm chủ lực</span>
              <h2 className="section-title">Hệ sản phẩm đồng bộ cho từng khoang cháy</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:pb-1">
              Từ cửa thép cho hành lang thoát hiểm đến cửa cuốn siêu trường và rèm ngăn khói, mỗi cấu hình đều được sản xuất chuẩn hóa theo vị trí lắp đặt và hồ sơ thiết kế thẩm duyệt PCCC.
            </p>
          </div>

          {/* 4 Solution Tabs */}
          <div className="mt-10 border-b border-slate-200">
            <div className="flex flex-wrap gap-2 pb-px sm:gap-3">
              {SOLUTION_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative flex flex-col text-left px-4 py-3 sm:px-5 sm:py-3.5 transition-all rounded-t-lg border-t-2 ${
                      isActive
                        ? 'border-red-600 bg-neutral-50 text-slate-950 shadow-xs'
                        : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-sm sm:text-base font-bold ${isActive ? 'text-red-700' : 'text-slate-800'}`}>
                        {tab.label}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}>
                        {tab.badge}
                      </span>
                    </div>
                    <span className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                      {tab.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
              >
                <a
                  href={pathForRoute('products', product.id)}
                  onClick={(e) => handleLink(e, 'products', product.id)}
                  className="relative block h-56 overflow-hidden bg-slate-100 text-left"
                  aria-label={`Xem chi tiết ${product.name}`}
                >
                  <img
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    width="1200"
                    height="896"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                    {product.fireRating && (
                      <span className="inline-flex items-center gap-1 bg-red-600/95 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm backdrop-blur-xs">
                        <Flame className="h-3 w-3" /> {product.fireRating}
                      </span>
                    )}
                    {product.certificationNo && (
                      <span className="inline-flex items-center gap-1 bg-slate-900/90 px-2 py-0.5 text-[10px] font-semibold text-slate-100 shadow-sm backdrop-blur-xs">
                        <FileCheck2 className="h-2.5 w-2.5 text-amber-400" /> {product.certificationNo}
                      </span>
                    )}
                  </div>
                </a>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-2 text-base font-bold leading-6 text-slate-900 group-hover:text-red-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 text-xs leading-5 text-slate-600">
                    {product.description}
                  </p>
                  <div className="mt-auto pt-5">
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400">Dự toán</span>
                        <span className="text-xs font-bold text-red-700">Báo giá theo dự án</span>
                      </div>
                      <button
                        onClick={() => onOpenQuote(product.category)}
                        className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700"
                      >
                        Nhận báo giá
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
            <a
              href="/san-pham"
              onClick={(e) => handleLink(e, 'products')}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-red-700"
            >
              Xem toàn bộ danh mục sản phẩm <ArrowRight className="h-4 w-4" />
            </a>
            {onOpenCatalog && (
              <button
                onClick={onOpenCatalog}
                className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 hover:text-red-800"
              >
                <Download className="h-3.5 w-3.5" /> Tải tài liệu thông số kỹ thuật PDF
              </button>
            )}
          </div>
        </div>
      </section>

      {/* KHỐI HỒ SƠ PHÁP LÝ & GIẤY KIỂM ĐỊNH PCCC (Trọng tâm B2B) */}
      <section className="border-t border-slate-200 bg-slate-900 py-18 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400 border border-red-500/30">
                <ShieldCheck className="h-3.5 w-3.5" /> Pháp lý & Chứng nhận độc lập
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Hồ sơ kiểm định phương tiện PCCC theo QCVN 06:2022/BXD
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Toàn bộ sản phẩm ngăn cháy APEX xuất xưởng đều có hồ sơ kiểm định do Cục Cảnh sát PCCC & CNCH cấp hoặc kết quả đốt mẫu thử nghiệm chịu lửa tại Viện Chuyên ngành PCCC (IBST), đáp ứng đầy đủ điều kiện nghiệm thu công trình thực tế trên toàn quốc.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-200">
                    <strong>Đốt mẫu thực tế lò ngang & lò đứng:</strong> Thử nghiệm giới hạn chịu lửa E (tính toàn vẹn) và I (tính cách nhiệt).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-200">
                    <strong>Đồng bộ tem kiểm định & CO/CQ:</strong> Cấp mã định danh kiểm định cho từng lô sản phẩm bàn giao tại công trình.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-200">
                    <strong>Hỗ trợ kỹ sư giải trình thẩm duyệt:</strong> Cung cấp bản vẽ chi tiết cấu tạo, báo cáo thử nghiệm khi Cảnh sát PCCC kiểm tra.
                  </p>
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                {onOpenCatalog ? (
                  <button
                    onClick={onOpenCatalog}
                    className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700 shadow-md"
                  >
                    <Download className="h-4 w-4" /> Tải trọn bộ Hồ sơ & Giấy kiểm định
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenQuote()}
                    className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700 shadow-md"
                  >
                    Yêu cầu hồ sơ kiểm định <ArrowRight className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => onOpenQuote()}
                  className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  Gửi yêu cầu dự toán
                </button>
              </div>
            </div>

            {/* 4 Cards giấy kiểm định */}
            <div className="grid gap-4 sm:grid-cols-2">
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.code}
                  className="relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-5 shadow-lg transition-all hover:border-slate-700 hover:bg-slate-950"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                      Số: {cert.code}
                    </span>
                    <span className="text-[11px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                      {cert.rating}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="block text-[10px] uppercase font-bold text-slate-400">
                      {cert.authority}
                    </span>
                    <h3 className="mt-1 text-sm font-bold text-white">
                      {cert.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                      {cert.scope}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-slate-800/80 pt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate">{cert.standard}</span>
                    <span className="text-emerald-400 font-semibold shrink-0">Hợp quy</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quy trình phối hợp dự án */}
      <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <span className="section-kicker">Quy trình phối hợp dự án</span>
              <h2 className="section-title max-w-lg">Khóa đúng dữ liệu trước khi sản xuất.</h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600">
                Quy trình được bắt đầu từ bản vẽ và điều kiện thực tế, giúp hạn chế triệt để sai khác giữa cấu hình sản phẩm, vị trí lắp đặt và hồ sơ nghiệm thu PCCC công trình.
              </p>
              <a
                href="/lien-he"
                onClick={(e) => handleLink(e, 'contact')}
                className="mt-7 inline-flex min-h-11 items-center gap-2 bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 rounded-lg shadow-sm"
              >
                Gửi yêu cầu khảo sát <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <ol className="grid border-l border-t border-slate-200 sm:grid-cols-2 xl:grid-cols-3">
              {projectProcess.map(([title, description], index) => (
                <li key={title} className="min-h-44 border-b border-r border-slate-200 p-5">
                  <span className="font-mono text-xs font-semibold text-red-700">0{index + 1}</span>
                  <h3 className="mt-5 text-sm font-semibold text-slate-950">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Dự án tiêu biểu & Đối tác */}
      <section className="border-b border-slate-200 bg-neutral-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {projects.length > 0 && (
            <>
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <span className="section-kicker">Hồ sơ dự án tiêu biểu</span>
                  <h2 className="section-title max-w-2xl">Công trình thực tế ứng dụng giải pháp APEX</h2>
                </div>
                <a
                  href="/du-an"
                  onClick={(e) => handleLink(e, 'projects')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-800"
                >
                  Xem toàn bộ dự án <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.slice(0, 3).map((project) => (
                  <article key={project.id} className="group flex flex-col border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md rounded-xl overflow-hidden">
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute left-3 top-3 bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                        {project.categoryLabel}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                        <MapPin className="h-3.5 w-3.5 text-red-600" />
                        <span>{project.location}</span>
                      </div>
                      <h3 className="line-clamp-1 text-base font-bold text-slate-900 transition-colors group-hover:text-red-700">{project.title}</h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">{project.description}</p>
                      <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-700">
                        <span className="font-semibold text-slate-900">Hạng mục: </span>
                        <span className="font-medium text-red-700">{project.itemsSupplied}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {PARTNER_LOGOS.length > 0 && (
            <div className="mt-16 border-t border-slate-200 pt-10">
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                Hệ thống thương hiệu thiết bị & đối tác kỹ thuật
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-12">
                {PARTNER_LOGOS.map((partner) => (
                  <div key={partner.name} className="flex flex-col items-center px-3 py-1 opacity-80 transition-opacity hover:opacity-100">
                    <span className="text-sm font-extrabold tracking-tight text-slate-800 sm:text-base">{partner.name}</span>
                    <span className="text-[10px] text-slate-500">{partner.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#dc2626_0%,#f97316_45%,#dc2626_100%)]" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
            <div>
              <span className="text-xs font-semibold uppercase text-red-400">Giá trị cốt lõi</span>
              <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">APEX là bốn lớp bảo vệ trong một cam kết.</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">Từ hồ sơ đến sản phẩm, mỗi lớp đều phải đứng vững trước áp lực của lửa, khói, tiến độ và nghiệm thu.</p>
              <div className="mt-9 flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center border border-red-500 bg-red-600/10 text-red-400"><Flame className="h-6 w-6" /></span>
                <div><strong className="block text-sm text-white">Tư duy ngăn cháy thụ động</strong><span className="mt-1 block text-xs text-slate-400">An toàn được thiết kế từ trước sự cố</span></div>
              </div>
            </div>
            <div className="grid border-l border-t border-white/15 sm:grid-cols-2">
              {coreValues.map(({ letter, icon: Icon, english, vietnamese, description }, index) => (
                <div key={letter} className="relative min-h-64 border-b border-r border-white/15 p-6 transition-colors hover:bg-white/[0.04] sm:p-7">
                  <span className="absolute right-5 top-5 text-[10px] font-mono text-slate-500">0{index + 1}</span>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-5xl font-semibold leading-none text-red-500">{letter}</span>
                    <Icon className="mr-7 h-5 w-5 text-slate-400" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 text-base font-semibold text-white">{english} <span className="font-normal text-red-400">/ {vietnamese}</span></h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid border-y border-white/15 sm:grid-cols-4">
            {['Ngăn lửa lan', 'Chặn khói độc', 'Giữ lối thoát', 'Đồng bộ hồ sơ'].map((label, index) => (
              <div key={label} className="flex items-center gap-3 border-b border-white/15 py-4 sm:border-b-0 sm:border-r sm:px-5 first:pl-0 last:border-r-0">
                <span className="text-xs font-mono text-red-400">0{index + 1}</span><span className="text-sm font-semibold text-slate-200">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cấu hình vật tư */}
      <section className="border-b border-slate-200 bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div><span className="section-kicker">Cấu hình vật tư</span><h2 className="mt-3 text-2xl font-semibold text-slate-950">Chọn đúng vật liệu cho từng vị trí lắp đặt.</h2></div>
          <div className="grid border-l border-t border-slate-200 sm:grid-cols-3">
            {[['Lõi cách nhiệt', 'Bông gốm, MGO hoặc bông thủy tinh'], ['Phụ kiện đồng bộ', 'Khóa, panic bar, ô kính và tay co'], ['Màu hoàn thiện', 'Bảng màu sơn Jotun theo lựa chọn']].map(([title, detail]) => (
              <div key={title} className="min-h-32 border-b border-r border-slate-200 p-5"><p className="text-xs font-semibold uppercase text-red-700">{title}</p><p className="mt-3 text-sm leading-6 text-slate-700">{detail}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="bg-red-700 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-5 sm:px-8 md:flex-row md:items-center lg:px-10">
          <div>
            <p className="text-xs font-semibold text-red-100 uppercase tracking-wider">Tư vấn kỹ thuật & Dự toán công trình</p>
            <h2 className="mt-2 max-w-2xl text-2xl font-semibold leading-9 text-white sm:text-3xl">Gửi bản vẽ hoặc yêu cầu kỹ thuật, APEX sẽ phản hồi phương án và báo giá chi tiết.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onOpenQuote()}
              className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-red-700 shadow-md hover:bg-red-50"
            >
              Yêu cầu báo giá kỹ thuật <ArrowRight className="h-4 w-4" />
            </button>
            {onOpenCatalog && (
              <button
                onClick={onOpenCatalog}
                className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg border border-white/60 bg-red-800/60 px-5 py-3 text-sm font-semibold text-white hover:bg-red-800"
              >
                <Download className="h-4 w-4" /> Tải Catalog PCCC
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
