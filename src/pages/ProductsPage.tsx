import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  Download,
  FileCheck,
  Layers,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface ProductsPageProps {
  onOpenQuote: (productCategory?: string) => void;
  initialCategory?: string;
  initialProductId?: string;
}

const EI_MATRIX = [
  {
    rating: 'EI60',
    title: 'Giới hạn chịu lửa 60 phút',
    thickness: 'Cánh 0.8mm / Khung 1.2mm',
    core: 'Bông gốm Ceramic hoặc Magie Oxit (MGO) 120kg/m³',
    application: 'Cửa phòng căn hộ, cửa hành lang các tầng, lối thoát nạn văn phòng tiêu chuẩn.',
    standard: 'QCVN 06:2022/BXD Bảng 4, TCVN 9383:2012',
    popular: false,
  },
  {
    rating: 'EI70',
    title: 'Giới hạn chịu lửa 70 phút',
    thickness: 'Cánh 0.8 - 1.0mm / Khung 1.2 - 1.4mm',
    core: 'Bông gốm Ceramic cách nhiệt kết hợp ron trương nở ngăn khói độc',
    application: 'Buồng thang bộ thoát hiểm N1/N2/N3, sảnh thang máy tòa nhà cao tầng, khu công cộng.',
    standard: 'QCVN 06:2022/BXD và Sửa đổi 1:2023 (Mã 1803/KD-PCCC-P7)',
    popular: true,
  },
  {
    rating: 'EI90',
    title: 'Giới hạn chịu lửa 90 phút',
    thickness: 'Cánh 1.0mm / Khung 1.4mm',
    core: 'Lõi composite đa tầng chống cháy chịu nhiệt > 1.100°C',
    application: 'Phòng kỹ thuật điện, phòng máy chủ server, trạm biến áp phụ tải, kho hồ sơ.',
    standard: 'TCVN 9383:2012 (Mã 1786 & 2736/KD-PCCC-P7)',
    popular: false,
  },
  {
    rating: 'EI120',
    title: 'Giới hạn chịu lửa 120 phút',
    thickness: 'Cánh 1.0 - 1.2mm / Khung 1.4 - 1.6mm',
    core: 'Lõi bông gốm Ceramic mật độ cao 128kg/m³ siêu cách nhiệt',
    application: 'Phòng máy biến áp chính, trạm bơm PCCC, phân khoang cháy nhà xưởng công nghiệp nặng.',
    standard: 'QCVN 06:2022/BXD (Mã 2225/KD-PCCC-P7)',
    popular: true,
  },
];

const DOOR_LAYERS = [
  {
    step: '01',
    name: 'Khung bao thép định hình',
    spec: 'Thép cán nguội mạ kẽm dày 1.2 - 1.6mm',
    desc: 'Chấn gấp CNC độ chính xác cao, tăng cứng chịu lực tại bản lề & lỗ khóa, gioăng rãnh chìm chuyên dụng.',
  },
  {
    step: '02',
    name: 'Tấm thép bề mặt cánh cửa',
    spec: 'Thép mạ điện dày 0.8 - 1.2mm',
    desc: 'Phủ sơn tĩnh điện bột Jotun cao cấp, chống trầy xước, chịu va đập cơ học lớn, chống oxy hóa.',
  },
  {
    step: '03',
    name: 'Lõi cách nhiệt chịu lửa đa tầng',
    spec: 'Bông gốm Ceramic / Magie Oxit (MGO)',
    desc: 'Vật liệu vô cơ chống cháy tuyệt đối, không sinh khói độc, giữ nhiệt độ mặt không cháy dưới 140°C.',
  },
  {
    step: '04',
    name: 'Hệ gioăng kép ngăn khói độc',
    spec: 'Gioăng EPDM + Gioăng Intumescent',
    desc: 'Gioăng giảm chấn khi đóng mở; gioăng trương nở tự động phồng nở khi nhiệt độ > 150°C để bịt kín khe hở.',
  },
  {
    step: '05',
    name: 'Phụ kiện cơ khí đồng bộ',
    spec: 'Inox 304 chuẩn chịu lửa',
    desc: 'Bản lề cối chịu lực, tay co thủy lực tự đóng đạt 500.000 chu kỳ, thanh panic và khóa liên kết ngầm.',
  },
];

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onOpenQuote,
  initialCategory,
  initialProductId
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [detailProduct, setDetailProduct] = useState<Product | null>(
    initialProductId ? (PRODUCTS.find(p => p.id === initialProductId) || null) : null
  );

  const categories = [
    { id: 'all', label: 'Tất cả sản phẩm' },
    { id: 'steel-door', label: 'Cửa thép ngăn cháy' },
    { id: 'roller-shutter', label: 'Cửa cuốn ngăn cháy' },
    { id: 'fire-curtain', label: 'Rèm ngăn cháy/khói' },
    { id: 'glass-door', label: 'Cửa & Vách kính PCCC' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      return matchCat;
    });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen w-full bg-[#f4f4f1] pb-20">
      <div className="border-b border-white/10 bg-slate-950 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase text-red-400"><span className="h-0.5 w-8 bg-red-500" />Hệ sản phẩm APEX</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-5xl">Hệ cửa và giải pháp ngăn cháy cho từng vị trí công trình.</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">Bốn nhóm sản phẩm được cấu hình theo hồ sơ thiết kế, kích thước khảo sát và yêu cầu vận hành thực tế.</p>
          <div className="mt-8 grid max-w-2xl grid-cols-3 border-y border-white/15 text-xs text-slate-300">
            <div className="py-3 pr-4"><strong className="block text-sm text-white">04 nhóm</strong>Sản phẩm chính</div>
            <div className="border-l border-white/15 px-4 py-3"><strong className="block text-sm text-white">EI70-EI120</strong>Cấu hình cửa thép</div>
            <div className="border-l border-white/15 px-4 py-3"><strong className="block text-sm text-white">Theo yêu cầu</strong>Kích thước thực tế</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-10">
        {/* Filter Bar */}
        <div className="mb-8 border-b border-slate-300 pb-5">
          {/* Categories */}
          <div>
            <span className="mb-3 block text-xs font-semibold uppercase text-slate-500">
              Phân loại danh mục
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`min-h-10 px-4 py-2 text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-slate-950 text-white'
                      : 'border border-slate-300 bg-white text-slate-700 hover:border-red-600 hover:text-red-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group grid overflow-hidden border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-red-300 hover:shadow-lg sm:grid-cols-[0.9fr_1.1fr] md:grid-cols-1 lg:grid-cols-[0.88fr_1.12fr]"
            >
              {/* Product Image */}
              <div className="relative min-h-64 overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  width="1200"
                  height="896"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="bg-slate-950 px-2.5 py-1 text-[11px] font-semibold text-white">
                    {product.fireRating}
                  </span>
                  {product.popular && (
                    <span className="bg-red-600 px-2 py-1 text-[11px] font-semibold text-white">
                      Sản phẩm chủ lực
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between space-y-5 p-6">
                <div>
                  <span className="text-[11px] font-semibold uppercase text-red-700">
                    {product.categoryName}
                  </span>
                  <h3 className="mb-3 mt-1 text-xl font-semibold leading-7 text-slate-950 transition-colors group-hover:text-red-700">
                    {product.name}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
                    {product.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-700">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
                  <div>
                    <span className="block text-[10px] font-semibold uppercase text-slate-500">Thông tin giá</span>
                    <span className="text-sm font-bold uppercase text-red-700">Liên hệ</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setDetailProduct(product)}
                      className="min-h-10 border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-900"
                    >
                      Thông số
                    </button>
                    <button
                      onClick={() => onOpenQuote(product.category)}
                      className="flex min-h-10 items-center gap-1.5 bg-red-600 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-red-700 shadow-xs"
                    >
                      Báo giá dự toán
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 p-8">
            <p className="text-sm font-bold text-slate-800">Không có sản phẩm nào phù hợp bộ lọc hiện tại.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
              }}
              className="mt-3 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}

        {/* ========================================================
            TECHNICAL SECTION 1: EI MATRIX COMPARISON
           ======================================================== */}
        <section className="mt-20 border-t border-slate-300 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="section-kicker">Quy chuẩn QCVN 06:2022/BXD</span>
              <h2 className="section-title">Ma trận đối chiếu cấp độ chịu lửa EI</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl">
                Bảng phân tích kỹ thuật giúp chủ đầu tư và tư vấn thiết kế lựa chọn chính xác cấu hình cửa theo vị trí ngăn cháy và kiểm định thực tế.
              </p>
            </div>
            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-lg text-xs self-start md:self-end transition-colors"
            >
              <Calculator className="w-4 h-4 text-red-400" />
              <span>Dự toán cấu hình theo công trình</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {EI_MATRIX.map((item) => (
              <div
                key={item.rating}
                className={`relative flex flex-col justify-between bg-white border rounded-xl p-5 shadow-xs transition-all hover:shadow-md ${
                  item.popular ? 'border-red-600 ring-1 ring-red-600' : 'border-slate-200'
                }`}
              >
                {item.popular && (
                  <span className="absolute -top-3 right-4 bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    Phổ biến nhất
                  </span>
                )}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                    <span className="text-2xl font-black text-slate-900 font-serif">{item.rating}</span>
                    <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                      {item.title}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">Độ dày thép</span>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">{item.thickness}</p>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">Lõi cách nhiệt</span>
                    <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">{item.core}</p>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">Vị trí lắp đặt khuyến nghị</span>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.application}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-700 flex items-start gap-1.5">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    <span>{item.standard}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onOpenQuote('steel-door')}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-neutral-100 hover:bg-red-600 hover:text-white text-slate-800 font-bold py-2 px-3 rounded-lg text-xs transition-colors"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Báo giá {item.rating}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            TECHNICAL SECTION 2: 5-LAYER EXPLODED VIEW
           ======================================================== */}
        <section className="mt-20 border-t border-slate-300 pt-16">
          <div className="max-w-2xl mb-8">
            <span className="section-kicker">Tiêu chuẩn gia công cơ khí</span>
            <h2 className="section-title">Cấu tạo mặt cắt 5 lớp cửa ngăn cháy APEX</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Được nghiên cứu và thử nghiệm đốt mẫu thực tế, mỗi lớp vật liệu đóng vai trò quyết định trong việc ngăn lửa, chặn khói độc và duy trì lối thoát hiểm an toàn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {DOOR_LAYERS.map((layer) => (
              <div
                key={layer.step}
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-xs hover:border-red-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-red-600">Lớp {layer.step}</span>
                    <Layers className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{layer.name}</h3>
                  <div className="mt-2 bg-red-50 text-red-700 text-[11px] font-bold p-1.5 rounded">
                    {layer.spec}
                  </div>
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {layer.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            TECHNICAL SECTION 3: CATALOGUE & PROFILE DOWNLOAD CTA
           ======================================================== */}
        <section className="mt-20 rounded-2xl bg-gradient-to-r from-slate-950 via-[#102b21] to-slate-950 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase text-red-400 tracking-wider">
                <FileCheck className="w-4 h-4" />
                <span>Hồ sơ năng lực & Tài liệu kỹ thuật 2026</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Tải E-Catalogue & Hồ sơ năng lực APEX Việt Nam
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Tài liệu đầy đủ bao gồm thông số kỹ thuật, bản vẽ cấu tạo chi tiết, chứng nhận kiểm định của Cục PCCC và hướng dẫn lựa chọn giải pháp phân khoang cháy theo QCVN 06:2022/BXD.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs transition-colors shadow-lg shadow-red-900/30"
              >
                <Download className="w-4 h-4" />
                <span>Yêu cầu gửi E-Catalogue (PDF)</span>
              </button>
              <a
                href="tel:0566385555"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-6 rounded-xl text-xs backdrop-blur-sm border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-red-400" />
                <span>Hotline Kỹ sư: 0566 38 5555</span>
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ========================================================
          PRODUCT DETAIL MODAL
         ======================================================== */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="my-auto flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden border border-slate-200 bg-white shadow-2xl">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                  Chi tiết sản phẩm & Thông số kỹ thuật
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {detailProduct.name} ({detailProduct.fireRating})
                </h3>
              </div>
              <button
                onClick={() => setDetailProduct(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
                <div className="h-48 overflow-hidden border border-slate-200 bg-neutral-100 sm:h-60">
                  <img
                    src={detailProduct.image}
                    alt={detailProduct.name}
                    width="1200"
                    height="896"
                    decoding="async"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-3">
                  <span className="inline-block bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                    Tiêu chuẩn: {detailProduct.fireRating}
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {detailProduct.longDescription}
                  </p>
                  <div className="border-l-4 border-red-600 bg-red-50 p-3">
                    <span className="block text-[10px] font-semibold uppercase text-slate-500">Thông tin giá</span>
                    <span className="text-base font-bold uppercase text-red-700">Liên hệ</span>
                    <span className="mt-1 block text-[11px] leading-5 text-slate-600">Nhân viên kinh doanh xác nhận theo kích thước, phụ kiện và cấu hình thực tế.</span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Bảng thông số kỹ thuật tiêu chuẩn
                </h4>
                <div className="overflow-hidden border border-neutral-200">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-neutral-200">
                      <tr className="bg-neutral-50">
                        <td className="px-3.5 py-2.5 font-bold text-slate-700 w-1/3">Vật liệu kết cấu:</td>
                        <td className="px-3.5 py-2.5 text-slate-600">{detailProduct.specs.material}</td>
                      </tr>
                      <tr>
                        <td className="px-3.5 py-2.5 font-bold text-slate-700">Độ dày thép & cánh:</td>
                        <td className="px-3.5 py-2.5 text-slate-600">{detailProduct.specs.thickness}</td>
                      </tr>
                      <tr className="bg-neutral-50">
                        <td className="px-3.5 py-2.5 font-bold text-slate-700">Lõi chống cháy cách nhiệt:</td>
                        <td className="px-3.5 py-2.5 text-slate-600">{detailProduct.specs.insulation}</td>
                      </tr>
                      <tr>
                        <td className="px-3.5 py-2.5 font-bold text-slate-700">Xử lý bề mặt / Lớp sơn:</td>
                        <td className="px-3.5 py-2.5 text-slate-600">{detailProduct.specs.finish}</td>
                      </tr>
                      <tr className="bg-neutral-50">
                        <td className="px-3.5 py-2.5 font-bold text-slate-700">Quy chuẩn kiểm định:</td>
                        <td className="px-3.5 py-2.5 text-slate-600">{detailProduct.specs.standard}</td>
                      </tr>
                      <tr>
                        <td className="px-3.5 py-2.5 font-bold text-slate-700">Chính sách bảo hành:</td>
                        <td className="px-3.5 py-2.5 text-slate-600">{detailProduct.specs.warranty}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Features List */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Ưu điểm & Tính năng nổi bật
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {detailProduct.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 border border-slate-100 bg-neutral-50 p-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
              <button
                onClick={() => {
                  const cat = detailProduct.category;
                  setDetailProduct(null);
                  onOpenQuote(cat);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-red-600 font-semibold"
              >
                <MessageSquareText className="w-4 h-4" />
                <span>Yêu cầu tài liệu kỹ thuật</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setDetailProduct(null)}
                  className="min-h-10 border border-neutral-300 px-4 py-2 text-xs font-semibold hover:bg-neutral-100"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    const cat = detailProduct.category;
                    setDetailProduct(null);
                    onOpenQuote(cat);
                  }}
                  className="min-h-10 bg-red-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-red-700"
                >
                  Nhận báo giá dự toán
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
