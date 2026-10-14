import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Calculator,
  Download,
  FileCheck,
  Phone,
  PackageSearch,
} from 'lucide-react';
import { useLiveData } from '../admin/adminData';
import type { Product, ProductCategory } from '../types';
import { PRODUCT_CATEGORY_DEFINITIONS, PRODUCT_CATEGORY_GROUPS } from '../components/products/ProductCategoryGrid';
import { ProductCard } from '../components/products/ProductCard';
import { ProductDetailLayout } from '../components/products/ProductDetailLayout';
import { groupProductsByVariant } from '../components/products/productMenu';
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
  const catalogSectionRef = useRef<HTMLDivElement>(null);

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

  // Số sản phẩm theo từng nhóm (hiển thị cạnh tên nhóm trong bộ lọc)
  const countByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of products) counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, [products]);

  const currentCategoryInfo = useMemo(() => {
    return PRODUCT_CATEGORY_DEFINITIONS.find((c) => c.id === selectedCategory);
  }, [selectedCategory]);

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
    // Chỉ cuộn khi đầu danh sách đã trôi khỏi màn hình (đang ở giữa trang)
    const top = catalogSectionRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // Nếu đang chọn một danh mục cụ thể và danh mục đó có trang chi tiết: render CategoryDetailPage
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

  const quoteCategory = selectedCategory !== 'all' ? selectedCategory : undefined;

  // Danh mục cụ thể: chia nhóm theo biến thể (1 cánh / 2 cánh...) để hiển thị thành khối
  const variantGroups = useMemo(
    () => (selectedCategory === 'all' ? [] : groupProductsByVariant(filteredProducts, selectedCategory)),
    [filteredProducts, selectedCategory]
  );
  const displayCount =
    selectedCategory === 'all'
      ? filteredProducts.length
      : variantGroups.reduce((sum, g) => sum + g.products.length, 0);

  const filterButtonClass = (active: boolean) =>
    `flex min-h-10 w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-red-600 ${
      active ? 'bg-white font-semibold text-red-700 shadow-xs ring-1 ring-slate-200' : 'text-slate-700 hover:bg-white/70 hover:text-slate-950'
    }`;

  return (
    <div className="min-h-svh w-full bg-[#f4f4f1] pb-20">
      {/* Đầu trang gọn: tên nhóm đang xem + 1 CTA */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-red-700">Sản phẩm APEX</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
              {currentCategoryInfo ? currentCategoryInfo.name : 'Tất cả sản phẩm'}
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-600">
              {currentCategoryInfo
                ? currentCategoryInfo.shortDesc
                : 'Cửa và rèm ngăn cháy, thiết bị cơ điện – viễn thông. Sản xuất theo hồ sơ thiết kế và kích thước khảo sát thực tế.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenQuote(quoteCategory)}
            className="hidden min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-bold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:inline-flex"
          >
            <Calculator className="h-4 w-4" aria-hidden="true" />
            Nhận báo giá
          </button>
        </div>
      </div>

      <div
        ref={catalogSectionRef}
        className="mx-auto max-w-7xl scroll-mt-32 px-5 pt-6 sm:px-8 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8 lg:px-10"
      >
        {/* Bộ lọc nhóm sản phẩm: cột trái cố định trên desktop */}
        <nav aria-label="Nhóm sản phẩm" className="hidden lg:block">
          <div className="sticky top-36 space-y-4">
            <button
              type="button"
              aria-current={selectedCategory === 'all' ? 'page' : undefined}
              onClick={() => handleSelectCategory('all')}
              className={filterButtonClass(selectedCategory === 'all')}
            >
              <span>Tất cả sản phẩm</span>
              <span className="text-xs font-normal tabular-nums text-slate-400">{products.length}</span>
            </button>
            {PRODUCT_CATEGORY_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{group.label}</p>
                <ul className="space-y-0.5">
                  {group.ids.map((id) => {
                    const cat = PRODUCT_CATEGORY_DEFINITIONS.find((c) => c.id === id);
                    if (!cat) return null;
                    const active = selectedCategory === id;
                    return (
                      <li key={id}>
                        <button
                          type="button"
                          aria-current={active ? 'page' : undefined}
                          onClick={() => handleSelectCategory(id)}
                          className={filterButtonClass(active)}
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs font-normal tabular-nums text-slate-400">{countByCategory[id] || 0}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className="min-w-0">
          {/* Bộ lọc trên điện thoại / máy tính bảng: hàng chip cuộn ngang */}
          <div className="-mx-5 mb-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:hidden [&::-webkit-scrollbar]:hidden" role="group" aria-label="Nhóm sản phẩm">
            <div className="flex w-max gap-2">
              {[{ id: 'all', name: 'Tất cả' }, ...PRODUCT_CATEGORY_DEFINITIONS].map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleSelectCategory(cat.id as ProductCategory | 'all')}
                    className={`min-h-10 whitespace-nowrap rounded-full px-4 text-[13px] font-semibold transition-colors ${
                      active ? 'bg-slate-950 text-white' : 'border border-slate-300 bg-white text-slate-700 hover:border-red-600 hover:text-red-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Danh sách sản phẩm */}
          <section aria-label="Danh sách sản phẩm">
            <p className="mb-4 text-xs text-slate-500" aria-live="polite">
              {displayCount} sản phẩm
            </p>
            {displayCount > 0 ? (
              selectedCategory === 'all' ? (
                // Trang "Tất cả": lưới phẳng
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onViewDetail={handleViewProduct} onOpenQuote={onOpenQuote} />
                  ))}
                </div>
              ) : (
                // Danh mục cụ thể: chia nhóm theo biến thể (1 CÁNH / 2 CÁNH) nếu có, giữ ảnh trong thẻ
                <div className="space-y-10">
                  {variantGroups.map((group, gIdx) => (
                    <div key={group.label ?? `group-${gIdx}`}>
                      {group.label && (
                        <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                          {group.label}
                        </h2>
                      )}
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {group.products.map((product) => (
                          <ProductCard key={product.id} product={product} onViewDetail={handleViewProduct} onOpenQuote={onOpenQuote} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <PackageSearch className="h-8 w-8 text-slate-400" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-slate-900">Nhóm này đang cập nhật sản phẩm</p>
                <p className="mt-1 max-w-sm text-sm text-slate-600">
                  APEX vẫn nhận sản xuất theo yêu cầu. Gửi thông số công trình để nhận tư vấn và dự toán.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenQuote(quoteCategory)}
                  className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white hover:bg-red-700"
                >
                  <Calculator className="h-4 w-4" aria-hidden="true" />
                  Nhận báo giá
                </button>
              </div>
            )}
          </section>

          {/* CTA cuối trang: catalogue + hotline */}
          <div className="mt-14 flex flex-col gap-4 rounded-xl bg-slate-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
                <FileCheck className="h-4 w-4" aria-hidden="true" />
                E-Catalogue & hồ sơ năng lực
              </p>
              <p className="mt-1.5 max-w-xl text-sm text-slate-300">
                Nhận thông số kỹ thuật, bản vẽ cấu tạo và hướng dẫn chọn giải pháp theo công trình.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => onOpenQuote(quoteCategory)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-bold text-white hover:bg-red-700"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Nhận catalogue
              </button>
              <a
                href={company.hotlineHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-5 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-red-400" aria-hidden="true" />
                {company.hotlineDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
