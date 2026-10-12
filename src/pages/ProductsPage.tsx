import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Calculator,
  Download,
  FileCheck,
  Layers,
  Phone,
  ShieldCheck,
  PackageSearch,
} from 'lucide-react';
import { useLiveData } from '../admin/adminData';
import type { Product, ProductCategory } from '../types';
import { PRODUCT_CATEGORY_DEFINITIONS, PRODUCT_CATEGORY_GROUPS } from '../components/products/ProductCategoryGrid';
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

  const isSteelDoor = selectedCategory === 'cua-thep-ngan-chay';
  const quoteCategory = selectedCategory !== 'all' ? selectedCategory : undefined;

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
              {filteredProducts.length} sản phẩm
            </p>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onViewDetail={handleViewProduct} onOpenQuote={onOpenQuote} />
                ))}
              </div>
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

          {/* Thông tin kỹ thuật: chỉ hiển thị cho nhóm cửa thép ngăn cháy */}
          {isSteelDoor && (
            <div className="mt-14 space-y-14 border-t border-slate-300 pt-12">
              <section aria-labelledby="ei-matrix-title">
                <h2 id="ei-matrix-title" className="text-xl font-bold text-slate-950 sm:text-2xl">
                  Giới hạn chịu lửa EI theo QCVN 06:2022/BXD
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {EI_MATRIX.map((item) => (
                    <div
                      key={item.rating}
                      className={`rounded-xl border bg-white p-5 ${item.popular ? 'border-red-600 ring-1 ring-red-600' : 'border-slate-200'}`}
                    >
                      <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                        <span className="text-2xl font-black text-slate-900">{item.rating}</span>
                        <span className="rounded bg-red-50 px-2 py-0.5 text-[11px] font-bold text-red-700">
                          {item.popular ? 'Phổ biến nhất' : item.title}
                        </span>
                      </div>
                      <dl className="mt-3 space-y-2 text-xs">
                        <div>
                          <dt className="font-semibold text-slate-500">Độ dày thép</dt>
                          <dd className="text-slate-800">{item.thickness}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-slate-500">Lõi cách nhiệt</dt>
                          <dd className="text-slate-700">{item.core}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-slate-500">Vị trí khuyến nghị</dt>
                          <dd className="text-slate-700">{item.application}</dd>
                        </div>
                      </dl>
                      <p className="mt-3 flex items-start gap-1.5 border-t border-slate-100 pt-2 text-[11px] text-emerald-700">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                        <span>{item.standard}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="door-layers-title">
                <h2 id="door-layers-title" className="text-xl font-bold text-slate-950 sm:text-2xl">
                  Cấu tạo 5 lớp cửa ngăn cháy APEX
                </h2>
                <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                  {DOOR_LAYERS.map((layer) => (
                    <li key={layer.step} className="rounded-xl border border-slate-200 bg-white p-5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-lg font-black text-red-600">Lớp {layer.step}</span>
                        <Layers className="h-4 w-4 text-slate-400" aria-hidden="true" />
                      </div>
                      <h3 className="mt-2 text-sm font-bold text-slate-900">{layer.name}</h3>
                      <p className="mt-1 text-[11px] font-bold text-red-700">{layer.spec}</p>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">{layer.desc}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          )}

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
