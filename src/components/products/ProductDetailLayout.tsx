import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Calculator,
  CheckCircle2,
  FileCheck,
  Phone,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import type { Product } from '../../types';
import { SpecsTable } from './SpecsTable';
import { FireRatingBadge } from './FireRatingBadge';

interface ProductDetailLayoutProps {
  product: Product;
  onBack: () => void;
  onOpenQuote: (category?: string) => void;
  hotlineDisplay?: string;
  hotlineHref?: string;
}

export const ProductDetailLayout: React.FC<ProductDetailLayoutProps> = ({
  product,
  onBack,
  onOpenQuote,
  hotlineDisplay = '0981.042.828',
  hotlineHref = 'tel:0981042828',
}) => {
  // Bổ sung Schema.org JSON-LD Product (chỉ đưa các trường có dữ liệu thật, không giả lập review)
  useEffect(() => {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = `product-schema-${product.id}`;

    const schemaData: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      brand: {
        '@type': 'Brand',
        name: 'APEX',
      },
      category: product.categoryName,
    };

    if (product.image && !product.image.includes('placeholder')) {
      schemaData.image = product.image;
    }

    if (product.fireRating && product.certificationNo) {
      schemaData.award = `Cấp chịu lửa ${product.fireRating} - GCN: ${product.certificationNo}`;
    }

    schemaScript.textContent = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);

    return () => {
      const el = document.getElementById(`product-schema-${product.id}`);
      if (el) el.remove();
    };
  }, [product]);

  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  // Reset khi chuyển sản phẩm khác
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [product.id]);

  const galleryImages = (product.gallery && product.gallery.length > 0)
    ? product.gallery
    : (product.image ? [product.image] : []);

  const currentImage = galleryImages[selectedImageIndex] || product.image;

  const hasRealImage = Boolean(
    (product.gallery && product.gallery.length > 0) ||
    ['cua-thep-ngan-chay', 'cua-kinh-ngan-chay'].includes(product.category) ||
    (product.image && (product.image.includes('/products/') || product.image.includes('cua-thep') || product.image.includes('cua-kinh') || product.image.includes('vach-kinh')))
  );
  const altText = product.imageAlt || (hasRealImage
    ? `${product.name} - APEX Việt Nam`
    : `${product.name} (Hình ảnh minh họa) - APEX Việt Nam`);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb & Nút quay lại */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition-colors hover:text-red-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại danh mục sản phẩm</span>
        </button>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Danh mục: {product.categoryName}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Cột trái: Ảnh sản phẩm */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-4">
            <div className="relative flex aspect-square sm:aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
              <img
                src={currentImage}
                alt={`${altText}${galleryImages.length > 1 ? ` (Ảnh ${selectedImageIndex + 1}/${galleryImages.length})` : ''}`}
                className="h-full w-full object-contain"
                fetchPriority={selectedImageIndex === 0 ? 'high' : undefined}
                loading={selectedImageIndex === 0 ? 'eager' : 'lazy'}
              />
              {!hasRealImage && (
                <div className="absolute bottom-3 right-3 rounded-md bg-slate-900/70 px-2 py-1 text-[11px] text-white/90 backdrop-blur-xs">
                  Hình ảnh minh họa
                </div>
              )}
            </div>

            {/* Gallery thumbnails strip (khi có >= 2 ảnh) */}
            {galleryImages.length >= 2 && (
              <div
                className="flex flex-wrap gap-2 pt-1"
                role="group"
                aria-label="Danh sách ảnh chi tiết sản phẩm"
              >
                {galleryImages.map((imgSrc, idx) => {
                  const isSelected = idx === selectedImageIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`Xem ảnh ${idx + 1} / ${galleryImages.length}`}
                      aria-current={isSelected ? 'true' : undefined}
                      className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 bg-slate-100 transition-all focus-visible:outline-2 focus-visible:outline-red-600 ${
                        isSelected
                          ? 'border-red-600 ring-2 ring-red-600/30'
                          : 'border-slate-200 opacity-75 hover:border-slate-400 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgSrc}
                        alt={`${product.name} thu nhỏ ${idx + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Hộp hành động nhanh */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                <span className="text-xs text-slate-500">Giá tham chiếu</span>
                <span className="text-base font-bold text-red-600">
                  {product.priceEstimate || 'Liên hệ báo giá dự toán'}
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                Báo giá chính xác căn cứ theo bản vẽ thiết kế, kích thước đo đạc thực tế tại công trình và khối lượng phụ kiện đồng bộ.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => onOpenQuote(product.category)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-red-700"
                >
                  <Calculator className="h-4 w-4" />
                  <span>Yêu cầu báo giá dự toán theo công trình</span>
                </button>
                <a
                  href={hotlineHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
                >
                  <Phone className="h-3.5 w-3.5 text-red-600" />
                  <span>Hotline Kỹ sư APEX: {hotlineDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: Thông tin kỹ thuật & Ứng dụng */}
        <div className="space-y-6 lg:col-span-7">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-red-50 px-2.5 py-1 text-[11px] font-bold uppercase text-red-700">
                {product.categoryName}
              </span>
              <FireRatingBadge
                fireRating={product.fireRating}
                certificationNo={product.certificationNo}
                showDetails
              />
            </div>

            <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              {product.name}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {product.longDescription || product.description}
            </p>
          </div>

          {/* Trạng thái chứng nhận kiểm định */}
          {(!product.fireRating || !product.certificationNo) && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900">
              <div className="flex items-start gap-2">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <div className="space-y-1">
                  <strong className="font-bold">Hồ sơ kiểm định & Cấp chịu lửa</strong>
                  <p className="text-amber-800">
                    Số giấy chứng nhận hợp quy PCCC và cấp chịu lửa (EI) đang được cập nhật đối chiếu trực tiếp theo hồ sơ kiểm định của từng lô sản phẩm. Vui lòng liên hệ ban kỹ thuật APEX để nhận hồ sơ nghiệm thu chính xác.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Điểm nổi bật & Tính năng */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                Ưu điểm cấu tạo & Tính năng nổi bật
              </h3>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {product.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bảng thông số kỹ thuật */}
          <SpecsTable specs={product.specs} />

          {/* Cam kết quy chuẩn */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-xs text-slate-600">
            <h4 className="flex items-center gap-2 font-bold text-slate-900">
              <FileCheck className="h-4 w-4 text-emerald-600" />
              <span>Quy trình sản xuất & Kiểm soát chất lượng APEX</span>
            </h4>
            <ul className="mt-2.5 list-inside list-disc space-y-1 text-slate-600">
              <li>Sản xuất trên dây chuyền cơ khí chính xác, kiểm tra độ phẳng và kín khít trước khi xuất xưởng.</li>
              <li>Hệ thống sơn tĩnh điện công nghiệp đảm bảo độ bám dính và chống ăn mòn môi trường.</li>
              <li>Cung cấp đầy đủ chứng chỉ xuất xưởng (CO/CQ), hồ sơ kỹ thuật và hướng dẫn thi công lắp đặt.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
