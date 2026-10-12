import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  Download,
  FileCheck,
  Layers,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { useLiveData } from '../admin/adminData';
import type { Product, ProductCategory } from '../types';
import { ProductCategoryGrid, PRODUCT_CATEGORY_DEFINITIONS } from '../components/products/ProductCategoryGrid';
import { ProductCard } from '../components/products/ProductCard';
import { ProductDetailLayout } from '../components/products/ProductDetailLayout';

interface ProductsPageProps {
  onOpenQuote: (productCategory?: string) => void;
  initialCategory?: string;
  initialProductId?: string;
  onNavigate?: (tab: string, itemId?: string, category?: string) => void;
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
    standard: 'QCVN 06:2022/BXD và Sửa đổi 1:2023',
    popular: true,
  },
  {
    rating: 'EI90',
    title: 'Giới hạn chịu lửa 90 phút',
    thickness: 'Cánh 1.0mm / Khung 1.4mm',
    core: 'Lõi composite đa tầng chống cháy chịu nhiệt > 1.100°C',
    application: 'Phòng kỹ thuật điện, phòng máy chủ server, trạm biến áp phụ tải, kho hồ sơ.',
    standard: 'TCVN 9383:2012',
    popular: false,
  },
  {
    rating: 'EI120',
    title: 'Giới hạn chịu lửa 120 phút',
    thickness: 'Cánh 1.0 - 1.2mm / Khung 1.4 - 1.6mm',
    core: 'Lõi bông gốm Ceramic mật độ cao 128kg/m³ siêu cách nhiệt',
    application: 'Phòng máy biến áp chính, trạm bơm PCCC, phân khoang cháy nhà xưởng công nghiệp nặng.',
    standard: 'QCVN 06:2022/BXD',
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
  initialProductId,
  onNavigate,
}) => {
  const { products, company } = useLiveData();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [detailProduct, setDetailProduct] = useState<Product | null>(() => {
    if (initialProductId) {
      return products.find((p) => p.id === initialProductId || p.slug === initialProductId) || null;
    }
    return null;
  });

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialProductId) {
      const found = products.find((p) => p.id === initialProductId || p.slug === initialProductId);
      setDetailProduct(found || null);
    } else {
      setDetailProduct(null);
    }
  }, [initialProductId, products]);

  const categoryFilterList = useMemo(() => {
    return [
      { id: 'all', label: 'Tất cả sản phẩm (9 dòng)' },
      ...PRODUCT_CATEGORY_DEFINITIONS.map((c) => ({
        id: c.id,
        label: c.name,
      })),
    ];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (selectedCategory === 'all') return true;
      return item.category === selectedCategory;
    });
  }, [products, selectedCategory]);

  const handleSelectCategory = (catId: ProductCategory | 'all') => {
    setSelectedCategory(catId);
    setDetailProduct(null);
    if (onNavigate) {
      onNavigate('products', undefined, catId !== 'all' ? catId : undefined);
    }
  };

  const handleViewProduct = (product: Product) => {
    setDetailProduct(product);
    if (onNavigate) {
      onNavigate('products', product.slug || product.id, product.category);
    }
  };

  const handleBackToList = () => {
    setDetailProduct(null);
    if (onNavigate) {
      onNavigate('products', undefined, selectedCategory !== 'all' ? selectedCategory : undefined);
    }
  };

  // Nếu đang xem chi tiết một sản phẩm: render layout chi tiết hoàn chỉnh
  if (detailProduct) {
    return (
      <div className="min-h-screen w-full bg-[#f4f4f1] pb-20">
        <ProductDetailLayout
          product={detailProduct}
          onBack={handleBackToList}
          onOpenQuote={onOpenQuote}
          hotlineDisplay={company.hotlineDisplay}
          hotlineHref={company.hotlineHref}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f4f4f1] pb-20">
      {/* Hero Banner Header */}
      <div className="border-b border-white/10 bg-slate-950 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase text-red-400">
            <span className="h-0.5 w-8 bg-red-500" />
            Hệ sản phẩm APEX Việt Nam
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
            9 Dòng sản phẩm giải pháp ngăn cháy & thiết bị kỹ thuật công trình.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Sản xuất cơ khí chính xác theo hồ sơ thiết kế, kích thước khảo sát thực tế và tiêu chuẩn kỹ thuật nghiêm ngặt của dự án.
          </p>
          <div className="mt-8 grid max-w-2xl grid-cols-3 border-y border-white/15 text-xs text-slate-300">
            <div className="py-3 pr-4">
              <strong className="block text-sm text-white">09 Nhóm</strong>Sản phẩm đồng bộ
            </div>
            <div className="border-l border-white/15 px-4 py-3">
              <strong className="block text-sm text-white">Chính xác</strong>Gia công CNC
            </div>
            <div className="border-l border-white/15 px-4 py-3">
              <strong className="block text-sm text-white">Theo thiết kế</strong>Khảo sát thực tế
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-10 space-y-12">
        {/* 9 Dòng sản phẩm Grid Overview */}
        <ProductCategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Filter Pills */}
        <div className="border-b border-slate-300 pb-5">
          <span className="mb-3 block text-xs font-semibold uppercase text-slate-500">
            Lọc theo nhóm sản phẩm ({filteredProducts.length} sản phẩm)
          </span>
          <div className="flex flex-wrap gap-2">
            {categoryFilterList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id as any)}
                className={`min-h-10 px-4 py-2 text-xs font-semibold transition-all rounded-lg ${
                  selectedCategory === cat.id
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'border border-slate-300 bg-white text-slate-700 hover:border-red-600 hover:text-red-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetail={handleViewProduct}
              onOpenQuote={onOpenQuote}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm font-bold text-slate-800">
              Không tìm thấy sản phẩm nào trong nhóm hiện tại.
            </p>
            <button
              onClick={() => handleSelectCategory('all')}
              className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        )}

        {/* ========================================================
            TECHNICAL SECTION 1: EI MATRIX COMPARISON
           ======================================================== */}
        <section className="border-t border-slate-300 pt-14">
          <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                Quy chuẩn QCVN 06:2022/BXD
              </span>
              <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                Ma trận đối chiếu cấp độ chịu lửa EI
              </h2>
              <p className="mt-2 max-w-2xl text-xs text-slate-600 sm:text-sm">
                Bảng phân tích kỹ thuật giúp chủ đầu tư và tư vấn thiết kế lựa chọn chính xác cấu hình cửa theo vị trí ngăn cháy và hồ sơ công trình.
              </p>
            </div>
            <button
              onClick={() => onOpenQuote('cua-thep-ngan-chay')}
              className="inline-flex self-start items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-800 md:self-end"
            >
              <Calculator className="h-4 w-4 text-red-400" />
              <span>Dự toán cấu hình theo công trình</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {EI_MATRIX.map((item) => (
              <div
                key={item.rating}
                className={`relative flex flex-col justify-between rounded-xl border bg-white p-5 shadow-xs transition-all hover:shadow-md ${
                  item.popular ? 'border-red-600 ring-1 ring-red-600' : 'border-slate-200'
                }`}
              >
                {item.popular && (
                  <span className="absolute -top-3 right-4 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                    Phổ biến nhất
                  </span>
                )}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                    <span className="text-2xl font-black text-slate-900">{item.rating}</span>
                    <span className="rounded bg-red-50 px-2 py-0.5 text-[11px] font-bold text-red-700">
                      {item.title}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">Độ dày thép</span>
                    <p className="mt-0.5 text-xs font-semibold text-slate-800">{item.thickness}</p>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">Lõi cách nhiệt</span>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-700">{item.core}</p>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">Vị trí lắp đặt khuyến nghị</span>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{item.application}</p>
                  </div>

                  <div className="flex items-start gap-1.5 border-t border-slate-100 pt-2 text-[11px] text-emerald-700">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{item.standard}</span>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <button
                    onClick={() => onOpenQuote('cua-thep-ngan-chay')}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-neutral-100 py-2 px-3 text-xs font-bold text-slate-800 transition-colors hover:bg-red-600 hover:text-white"
                  >
                    <Calculator className="h-3.5 w-3.5" />
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
        <section className="border-t border-slate-300 pt-14">
          <div className="mb-8 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Tiêu chuẩn gia công cơ khí
            </span>
            <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              Cấu tạo mặt cắt 5 lớp cửa ngăn cháy APEX
            </h2>
            <p className="mt-2 text-xs text-slate-600 sm:text-sm">
              Mỗi lớp vật liệu đóng vai trò quyết định trong việc ngăn lửa, chặn khói độc và duy trì lối thoát hiểm an toàn.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {DOOR_LAYERS.map((layer) => (
              <div
                key={layer.step}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-colors hover:border-red-300"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-red-600">Lớp {layer.step}</span>
                    <Layers className="h-5 w-5 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-bold leading-snug text-slate-900">{layer.name}</h3>
                  <div className="mt-2 rounded bg-red-50 p-1.5 text-[11px] font-bold text-red-700">
                    {layer.spec}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">
                    {layer.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            TECHNICAL SECTION 3: CATALOGUE & PROFILE CTA
           ======================================================== */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-[#102b21] to-slate-950 p-8 text-white shadow-xl sm:p-12">
          <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-3 lg:col-span-8">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
                <FileCheck className="h-4 w-4" />
                <span>Hồ sơ năng lực & Tài liệu kỹ thuật 2026</span>
              </span>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Tải E-Catalogue & Hồ sơ năng lực APEX Việt Nam
              </h2>
              <p className="max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm">
                Tài liệu đầy đủ bao gồm thông số kỹ thuật 9 dòng sản phẩm, bản vẽ cấu tạo chi tiết và hướng dẫn lựa chọn giải pháp theo tiêu chuẩn công trình.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 px-6 text-xs font-bold text-white shadow-lg shadow-red-900/30 transition-colors hover:bg-red-700"
              >
                <Download className="h-4 w-4" />
                <span>Yêu cầu gửi E-Catalogue (PDF)</span>
              </button>
              <a
                href={company.hotlineHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 py-3.5 px-6 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <Phone className="h-4 w-4 text-red-400" />
                <span>Hotline Kỹ sư: {company.hotlineDisplay}</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
