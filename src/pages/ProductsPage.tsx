import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Download,
  FileCheck,
  Phone,
  ArrowRight,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { useLiveData } from '../admin/adminData';
import type { ProductCategory } from '../types';
import {
  PRODUCT_CATEGORY_DEFINITIONS,
  PRODUCT_CATEGORY_GROUPS,
} from '../components/products/ProductCategoryGrid';
import { CategoryDetailPage } from './CategoryDetailPage';
import { CATEGORY_DETAILS } from '../data/categoryDetails';

interface ProductsPageProps {
  onOpenQuote: (productCategory?: string) => void;
  initialCategory?: string;
  initialProductId?: string;
  onNavigate?: (tab: string, itemId?: string, category?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onOpenQuote,
  initialCategory,
  initialProductId,
  onNavigate,
}) => {
  const { products, company } = useLiveData();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [activeGroupFilter, setActiveGroupFilter] = useState<'all' | string>('all');

  // Cập nhật selectedCategory khi prop initialCategory đổi
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    } else {
      setSelectedCategory('all');
    }
  }, [initialCategory]);

  // Hỗ trợ redirect link cũ /san-pham/:old-product-id về trang danh mục tương ứng
  useEffect(() => {
    if (initialProductId) {
      const found = products.find((p) => p.id === initialProductId || p.slug === initialProductId);
      if (found && found.category) {
        setSelectedCategory(found.category);
        if (typeof window !== 'undefined' && window.history?.replaceState) {
          window.history.replaceState({}, '', `/san-pham/${encodeURIComponent(found.category)}`);
        }
      }
    }
  }, [initialProductId, products]);

  const handleSelectCategory = (catId: ProductCategory | 'all') => {
    setSelectedCategory(catId);
    if (onNavigate) {
      onNavigate('products', undefined, catId !== 'all' ? catId : undefined);
    }
  };

  // Nếu đang chọn một danh mục cụ thể: render trang chi tiết danh mục
  if (selectedCategory !== 'all' && CATEGORY_DETAILS[selectedCategory]) {
    return (
      <div className="min-h-screen w-full bg-[#f4f4f1] pb-20">
        <CategoryDetailPage
          slug={selectedCategory}
          onOpenQuote={onOpenQuote}
          onNavigate={onNavigate}
        />
      </div>
    );
  }

  // Lọc nhóm sản phẩm theo tab bộ lọc
  const filteredGroups = activeGroupFilter === 'all'
    ? PRODUCT_CATEGORY_GROUPS
    : PRODUCT_CATEGORY_GROUPS.filter((g) => g.label === activeGroupFilter);

  return (
    <div className="min-h-svh w-full bg-[#f4f4f1] pb-20">
      {/* 1. Header Trang Tổng Quan Sản Phẩm */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                <span>Hệ thống sản phẩm APEX Việt Nam</span>
              </div>
              <h1 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl lg:text-4xl">
                10 Dòng Sản Phẩm Ngăn Cháy & Cơ Điện
              </h1>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600">
                APEX sản xuất và gia công trực tiếp theo hồ sơ thiết kế, bản vẽ kỹ thuật và kích thước khảo sát thực tế tại công trình. Đầy đủ kiểm định PCCC, hồ sơ nghiệm thu và tiêu chuẩn kiểm soát chất lượng nghiêm ngặt.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenQuote()}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-bold text-white shadow-xs transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <Calculator className="h-4 w-4" aria-hidden="true" />
                Nhận báo giá dự toán
              </button>
              <a
                href={company.hotlineHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-red-600 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-red-600"
              >
                <Phone className="h-4 w-4 text-red-600" aria-hidden="true" />
                {company.hotlineDisplay}
              </a>
            </div>
          </div>

          {/* Tab lọc nhóm sản phẩm */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => setActiveGroupFilter('all')}
              className={`min-h-9 rounded-full px-4 text-xs sm:text-sm font-semibold transition-colors ${
                activeGroupFilter === 'all'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-red-600 hover:text-red-700'
              }`}
            >
              Tất cả 10 dòng sản phẩm
            </button>
            {PRODUCT_CATEGORY_GROUPS.map((group) => {
              const active = activeGroupFilter === group.label;
              return (
                <button
                  key={group.label}
                  type="button"
                  onClick={() => setActiveGroupFilter(group.label)}
                  className={`min-h-9 rounded-full px-4 text-xs sm:text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-red-600 hover:text-red-700'
                  }`}
                >
                  {group.label} ({group.ids.length})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Lưới 10 Thẻ Danh Mục Sản Phẩm */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 space-y-12">
        {filteredGroups.map((group) => (
          <section key={group.label} aria-labelledby={`group-title-${group.label}`}>
            <div className="mb-6 flex flex-col gap-1 border-b border-slate-200/80 pb-3 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h2
                  id={`group-title-${group.label}`}
                  className="text-lg font-bold text-slate-950 sm:text-xl flex items-center gap-2"
                >
                  <Layers className="h-5 w-5 text-red-600" aria-hidden="true" />
                  {group.label}
                </h2>
                <p className="text-xs text-slate-500">
                  {group.label === 'Giải pháp ngăn cháy'
                    ? 'Hệ cửa và rèm kỹ thuật ngăn lửa, chặn khói độc đạt chuẩn kiểm định PCCC'
                    : 'Hạ tầng vỏ tủ điện, thang máng cáp và thiết bị mạng viễn thông tiêu chuẩn công nghiệp'}
                </p>
              </div>
              <span className="text-xs font-medium text-slate-400">
                {group.ids.length} dòng sản phẩm
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.ids.map((catId) => {
                const catDef = PRODUCT_CATEGORY_DEFINITIONS.find((c) => c.id === catId);
                const detail = CATEGORY_DETAILS[catId];
                if (!catDef) return null;

                const IconComponent = catDef.icon;
                const coverImage = detail?.gallery?.[0];
                const priceFrom = detail?.priceFrom;
                const quickSpecs = detail?.quickSpec?.slice(0, 3) || [];

                return (
                  <article
                    key={catId}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-red-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-red-600"
                  >
                    {/* Ảnh đại diện danh mục */}
                    <a
                      href={`/san-pham/${catId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelectCategory(catId);
                      }}
                      className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      {coverImage ? (
                        <img
                          src={coverImage}
                          alt={catDef.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                          <IconComponent className="h-12 w-12" />
                        </div>
                      )}

                      {/* Tag phân loại & Giá từ */}
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
                        <span className="rounded-md bg-slate-950/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                          {catDef.tag}
                        </span>
                        {priceFrom && (
                          <span className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-xs">
                            Từ {priceFrom}
                          </span>
                        )}
                      </div>
                    </a>

                    {/* Nội dung thẻ */}
                    <div className="flex flex-1 flex-col p-5">
                      {/* Tiêu đề & Icon */}
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                          <IconComponent className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold text-slate-950 group-hover:text-red-600 transition-colors line-clamp-1">
                            <a
                              href={`/san-pham/${catId}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleSelectCategory(catId);
                              }}
                              className="focus-visible:outline-none"
                            >
                              {catDef.name}
                            </a>
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-2">
                            {catDef.shortDesc}
                          </p>
                        </div>
                      </div>

                      {/* Tóm tắt thông số kỹ thuật chính */}
                      {quickSpecs.length > 0 && (
                        <div className="mt-4 border-t border-slate-100 pt-3 space-y-1.5 flex-1">
                          {quickSpecs.map((spec, sIdx) => (
                            <div key={sIdx} className="flex items-center justify-between gap-2 text-xs">
                              <span className="text-slate-500 shrink-0">{spec.label}:</span>
                              <span className="font-semibold text-slate-800 text-right truncate">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Footer: Nút xem chi tiết & Báo giá */}
                      <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
                        <a
                          href={`/san-pham/${catId}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleSelectCategory(catId);
                          }}
                          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-neutral-100 px-3.5 text-xs font-bold text-slate-900 transition-colors hover:bg-red-50 hover:text-red-700"
                        >
                          <span>Xem chi tiết</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </a>

                        <button
                          type="button"
                          onClick={() => onOpenQuote(catId)}
                          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/60 px-3 text-xs font-bold text-red-700 transition-colors hover:bg-red-600 hover:text-white"
                        >
                          <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Báo giá</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        {/* 3. CTA Cuối Trang: Catalogue & Báo Giá Hồ Sơ Kỹ Thuật */}
        <div className="flex flex-col gap-6 rounded-2xl bg-slate-950 p-6 sm:p-8 lg:p-10 text-white sm:flex-row sm:items-center sm:justify-between shadow-xl">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
              <FileCheck className="h-4 w-4" aria-hidden="true" />
              E-Catalogue & Hồ sơ năng lực APEX
            </p>
            <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              Cần hồ sơ kỹ thuật và bản vẽ chi tiết cho dự án?
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Tải trọn bộ catalogue thông số kỹ thuật, bản vẽ CAD/DWG và bảng chào giá mẫu theo từng quy chuẩn PCCC mới nhất (QCVN 06:2022/BXD).
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row shrink-0">
            <button
              type="button"
              onClick={() => onOpenQuote()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-bold text-white transition-colors hover:bg-red-700"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Tải hồ sơ năng lực
            </button>
            <a
              href={company.hotlineHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-red-400" aria-hidden="true" />
              {company.hotlineDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
