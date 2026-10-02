import React, { useState, useMemo } from 'react';
import { Check, MessageSquareText, Phone, X } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface ProductsPageProps {
  onOpenQuote: (productCategory?: string) => void;
  initialCategory?: string;
  initialProductId?: string;
}

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
                      className="flex min-h-10 items-center gap-1.5 bg-red-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700"
                    >
                      <Phone className="h-3.5 w-3.5" /> Liên hệ
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
                  Gọi hoặc nhắn kinh doanh
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
