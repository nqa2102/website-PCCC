import React from 'react';
import { ArrowRight, Check, Image as ImageIcon } from 'lucide-react';
import type { Product } from '../../types';
import { FireRatingBadge } from './FireRatingBadge';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
  onOpenQuote: (category?: string) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetail,
  onOpenQuote,
  className = '',
}) => {
  const hasRealImage = Boolean(product.image && !product.image.includes('placeholder'));
  const altText = hasRealImage
    ? `${product.name} - Sản phẩm APEX Việt Nam`
    : `${product.name} (Hình ảnh minh họa) - APEX Việt Nam`;

  return (
    <div
      className={`group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md ${className}`}
    >
      <div>
        {/* Khung ảnh sản phẩm */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          {product.image ? (
            <img
              src={product.image}
              alt={altText}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-slate-100 text-slate-400">
              <ImageIcon className="h-10 w-10 stroke-1 text-slate-300" />
              <span className="mt-2 text-[11px] font-medium text-slate-400">Hình ảnh minh họa</span>
            </div>
          )}

          {/* Badges trên ảnh */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span className="rounded bg-slate-900/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
              {product.categoryName}
            </span>
            {product.popular && (
              <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                Chủ lực
              </span>
            )}
          </div>

          {/* Minh họa watermark tag nếu là placeholder */}
          {!hasRealImage && (
            <div className="absolute bottom-2 right-2 rounded bg-slate-900/60 px-1.5 py-0.5 text-[9px] text-white/90 backdrop-blur-xs">
              Hình ảnh minh họa
            </div>
          )}
        </div>

        {/* Nội dung card */}
        <div className="p-5">
          <div className="min-h-[22px]">
            <FireRatingBadge
              fireRating={product.fireRating}
              certificationNo={product.certificationNo}
            />
          </div>

          <h3
            onClick={() => onViewDetail(product)}
            className="mt-2 cursor-pointer text-base font-bold text-slate-900 transition-colors group-hover:text-red-600"
          >
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">
            {product.description}
          </p>

          {/* Điểm nổi bật kỹ thuật */}
          {product.features && product.features.length > 0 && (
            <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
              {product.features.slice(0, 2).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  <span className="line-clamp-1">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-slate-100 bg-slate-50/50 p-4">
        {/* Chỉ hiện giá khi có giá tham khảo thật ("Liên hệ" không thêm thông tin) */}
        {product.priceEstimate && product.priceEstimate !== 'Liên hệ' && (
          <p className="mb-3 text-xs text-slate-500">
            Giá tham khảo: <span className="font-bold text-red-700">{product.priceEstimate}</span>
          </p>
        )}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onViewDetail(product)}
            className="min-h-10 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-red-600"
          >
            Thông số
          </button>
          <button
            type="button"
            onClick={() => onOpenQuote(product.category)}
            className="inline-flex min-h-10 items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-red-600 px-3 text-xs font-bold text-white shadow-xs transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <span>Báo giá</span>
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
