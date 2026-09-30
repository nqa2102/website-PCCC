import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  MessageSquareText,
  Check, 
  Filter, 
  Calculator, 
  ChevronRight,
  X,
  Share2
} from 'lucide-react';
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
    <div className="w-full bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <span className="w-1 h-3.5 bg-red-600 inline-block rounded-xs"></span>
            <span>HỆ THỐNG SẢN PHẨM APEX VIỆT NAM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            DANH MỤC CỬA CHỐNG CHÁY & THIẾT BỊ PCCC ĐỒNG BỘ
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Bốn nhóm sản phẩm chính được cấu hình theo hồ sơ thiết kế, kích thước thực tế và yêu cầu của từng công trình.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs mb-8 space-y-3">
          
          {/* Categories */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Phân loại danh mục
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-neutral-100 text-slate-700 hover:bg-neutral-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
            >
              {/* Product Image */}
              <div className="relative h-56 bg-neutral-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                    {product.fireRating}
                  </span>
                  {product.popular && (
                    <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                      Sản phẩm chủ lực
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {product.categoryName}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors mt-0.5 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-3 pt-3 border-t border-neutral-100 space-y-1.5">
                    {product.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Đơn giá tham khảo</span>
                    <span className="text-sm font-extrabold text-red-600">{product.priceEstimate}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setDetailProduct(product)}
                      className="px-3 py-1.5 border border-neutral-200 hover:border-slate-800 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Thông số
                    </button>
                    <button
                      onClick={() => onOpenQuote(product.category)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                    >
                      Báo giá
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
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200 my-auto">
            
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
                <div className="rounded-xl overflow-hidden h-48 sm:h-60 bg-neutral-100 border border-neutral-200">
                  <img
                    src={detailProduct.image}
                    alt={detailProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-0.5 bg-red-50 text-red-600 font-bold rounded-md text-xs">
                    Tiêu chuẩn: {detailProduct.fireRating}
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {detailProduct.longDescription}
                  </p>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    <span className="text-[10px] text-slate-500 block">Đơn giá sản xuất:</span>
                    <span className="text-base font-extrabold text-red-600">{detailProduct.priceEstimate}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Giá tham khảo; báo giá có hiệu lực 60 ngày và được xác nhận theo cấu hình thực tế.
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Bảng thông số kỹ thuật tiêu chuẩn
                </h4>
                <div className="border border-neutral-200 rounded-xl overflow-hidden">
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
                    <div key={idx} className="flex items-start gap-2 p-2 bg-neutral-50 rounded-lg">
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
                  className="px-4 py-2 border border-neutral-200 text-xs font-semibold rounded-lg hover:bg-neutral-100"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    const cat = detailProduct.category;
                    setDetailProduct(null);
                    onOpenQuote(cat);
                  }}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  Nhận báo giá sản phẩm này
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
