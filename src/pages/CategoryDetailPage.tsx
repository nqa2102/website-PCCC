import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Flame,
  Shield,
  Wind,
  Volume2,
  FileText,
  MessageSquare,
  Camera,
  FileSpreadsheet,
  Receipt,
  LayoutGrid,
  ArrowRight,
  Award,
  Scan,
  Zap,
  Box,
  Cpu,
  Droplets,
} from 'lucide-react';
import { CATEGORY_DETAILS } from '../data/categoryDetails';
import { useLiveData } from '../admin/adminData';

interface CategoryDetailPageProps {
  slug: string;
  onOpenQuote?: (category?: string) => void;
  onNavigate?: (tab: string, itemId?: string, category?: string) => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  slug,
  onOpenQuote,
  onNavigate,
}) => {
  const { company, products } = useLiveData();
  const detail = CATEGORY_DETAILS[slug];

  // Lấy sản phẩm tương ứng từ cơ sở dữ liệu admin nếu admin đã cập nhật giá
  const liveProduct = useMemo(() => {
    return products.find(
      (p) => p.slug === slug || p.id === slug || (p.category === slug && p.priceEstimate && p.priceEstimate !== 'Liên hệ')
    );
  }, [products, slug]);

  const effectivePriceFrom = liveProduct?.priceEstimate || detail?.priceFrom;

  // Tự động tính lại bảng dự toán bóc tách 1 bộ mẫu khi admin sửa đơn giá trong admin
  const effectiveQuote = useMemo(() => {
    if (!detail?.quote) return null;
    if (!effectivePriceFrom || effectivePriceFrom === 'Liên hệ') {
      return detail.quote;
    }

    // Trích xuất số đơn giá (vd: "Từ 1.950.000 đ/m²" -> "1.950.000")
    const match = effectivePriceFrom.match(/([0-9]{1,3}(?:\.[0-9]{3})+)/);
    if (!match) return detail.quote;

    const unitPriceStr = match[1];
    const unitPriceNum = parseInt(unitPriceStr.replace(/\./g, ''), 10);
    if (!unitPriceNum || isNaN(unitPriceNum)) return detail.quote;

    const firstRow = detail.quote.rows[0];
    const qtyNum = parseFloat(firstRow.qty) || 1.98;
    const amountNum = Math.round(qtyNum * unitPriceNum);
    const amountStr = amountNum.toLocaleString('vi-VN').replace(/,/g, '.');

    let accessoriesTotal = 0;
    detail.quote.rows.slice(1).forEach((r) => {
      const a = parseInt(r.amount.replace(/\./g, ''), 10) || 0;
      accessoriesTotal += a;
    });

    const newTotalNum = amountNum + accessoriesTotal;
    const newTotalStr = newTotalNum.toLocaleString('vi-VN').replace(/,/g, '.');

    const updatedRows = [
      {
        ...firstRow,
        price: unitPriceStr,
        amount: amountStr,
      },
      ...detail.quote.rows.slice(1),
    ];

    return {
      ...detail.quote,
      rows: updatedRows,
      total: newTotalStr,
    };
  }, [detail?.quote, effectivePriceFrom]);

  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Reset active image when slug changes
  useEffect(() => {
    setActiveImgIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!detail) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy thông tin danh mục</h2>
        <p className="mt-2 text-slate-600">Danh mục bạn đang tìm kiếm không tồn tại hoặc chưa được cập nhật.</p>
        <button
          type="button"
          onClick={() => onNavigate?.('products')}
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition-colors"
        >
          Quay lại danh mục sản phẩm
        </button>
      </div>
    );
  }

  const galleryImages = detail.gallery && detail.gallery.length > 0 ? detail.gallery : [];
  const currentImage = galleryImages[activeImgIdx] || galleryImages[0];

  const renderUseIcon = (iconName: string) => {
    switch (iconName) {
      case 'flame':
        return <Flame className="h-5 w-5 text-emerald-600" aria-hidden="true" />;
      case 'scan':
        return <Scan className="h-5 w-5 text-emerald-600" aria-hidden="true" />;
      case 'shield-half':
      case 'shield':
        return <Shield className="h-5 w-5 text-emerald-600" aria-hidden="true" />;
      case 'wind':
        return <Wind className="h-5 w-5 text-emerald-600" aria-hidden="true" />;
      case 'ear':
      case 'volume':
        return <Volume2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />;
      case 'zap':
        return <Zap className="h-5 w-5 text-emerald-600" aria-hidden="true" />;
      case 'box':
        return <Box className="h-5 w-5 text-emerald-600" aria-hidden="true" />;
      case 'cpu':
        return <Cpu className="h-5 w-5 text-emerald-600" aria-hidden="true" />;
      case 'droplets':
        return <Droplets className="h-5 w-5 text-emerald-600" aria-hidden="true" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />;
    }
  };

  return (
    <div className="w-full bg-[#f4f4f1] text-slate-900">
      <div className="mx-auto max-w-[1040px] px-4 py-6 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-slate-500">
          <a
            href="/san-pham"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.('products');
            }}
            className="hover:text-red-700 transition-colors"
          >
            Sản phẩm
          </a>
          <span className="mx-2 text-slate-400">›</span>
          <span className="font-medium text-slate-800">{detail.name}</span>
        </nav>

        {/* =========================================================================
            KHỐI 1: HERO (Thư viện ảnh + Tên + Giá + Sells + Bảng tóm tắt + CTA + Hotline)
           ========================================================================= */}
        <div className="grid grid-cols-1 gap-7 sm:gap-8 md:grid-cols-2 items-start">
          {/* Cột trái: Thư viện ảnh */}
          <div>
            {currentImage && (
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
                <img
                  id="galMain"
                  src={currentImage}
                  alt={detail.name}
                  className="h-full w-full object-cover transition-opacity duration-200"
                />
              </div>
            )}

            {/* Thumbnail selector */}
            {galleryImages.length > 1 && (
              <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-label="Danh sách ảnh sản phẩm">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIdx(idx)}
                    className={`h-[72px] w-[58px] cursor-pointer overflow-hidden rounded-lg border-2 p-0 transition-all ${
                      idx === activeImgIdx
                        ? 'border-red-700 ring-1 ring-red-700'
                        : 'border-transparent hover:border-slate-300'
                    }`}
                    aria-label={`Xem ảnh ${idx + 1}`}
                    aria-current={idx === activeImgIdx ? 'true' : undefined}
                  >
                    <img
                      src={img}
                      alt={`${detail.name} ảnh nhỏ ${idx + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cột phải: Thông tin chính */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-[13px] font-medium text-emerald-800">
              <ShieldCheck className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              <span>Đã kiểm định</span>
            </div>

            <h1 className="mt-3 mb-2 text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">
              {detail.name}
            </h1>

            {/* Giá từ (ẩn nếu rỗng) */}
            {effectivePriceFrom && (
              <p className="mb-3 text-[15px] text-slate-500">
                {effectivePriceFrom.startsWith('Từ') ? '' : 'Từ '}<b className="text-xl font-bold text-red-700 sm:text-2xl">{effectivePriceFrom}</b>{' '}
                <span className="text-xs font-normal text-slate-400">(chưa gồm VAT)</span>
              </p>
            )}

            {/* 3 Điểm bán hàng */}
            {detail.sellingPoints && detail.sellingPoints.length > 0 && (
              <ul className="mb-4 flex flex-col gap-2 p-0 list-none">
                {detail.sellingPoints.map((point, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-800">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Mô tả ngắn */}
            <p className="mb-4 text-[14.5px] leading-relaxed text-slate-600">{detail.intro}</p>

            {/* Bảng tóm tắt thông số kỹ thuật (quickSpec) */}
            {detail.quickSpec && detail.quickSpec.length > 0 && (
              <div className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-white text-[13.5px] shadow-xs">
                <table className="w-full border-collapse">
                  <tbody>
                    {detail.quickSpec.map((row, i) => (
                      <tr
                        key={i}
                        className={i !== detail.quickSpec.length - 1 ? 'border-b border-slate-100' : ''}
                      >
                        <th
                          scope="row"
                          className="w-[38%] bg-slate-50/60 px-3.5 py-2 text-left font-medium text-slate-500"
                        >
                          {row.label}
                        </th>
                        <td className="px-3.5 py-2 font-medium text-slate-900">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Nút hành động CTA */}
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => onOpenQuote?.(detail.slug)}
                className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-700 px-5 py-3 text-[15px] font-bold text-white shadow-xs transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-red-700"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Nhận báo giá dự toán</span>
              </button>

              <a
                href={company.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0068ff] px-5 py-3 text-[15px] font-bold text-white shadow-xs transition-colors hover:bg-[#0057d9] focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                <span>Tư vấn Zalo</span>
              </a>
            </div>

            {/* Hotline kỹ sư */}
            <span className="mt-3 block text-sm text-slate-500">
              Hotline kỹ sư APEX:{' '}
              <a
                href={company.hotlineHref}
                className="font-bold text-slate-900 transition-colors hover:text-red-700"
              >
                <b>{company.hotlineDisplay}</b>
              </a>
            </span>
          </div>
        </div>

        {/* =========================================================================
            KHỐI 2: ƯU ĐIỂM & CÔNG DỤNG (6 gạch đầu dòng + 4 thẻ công dụng)
           ========================================================================= */}
        {((detail.advantages && detail.advantages.length > 0) ||
          (detail.uses && detail.uses.length > 0)) && (
          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-[13px] font-bold tracking-wider uppercase text-red-700">
              <Award className="h-4 w-4 text-red-700" aria-hidden="true" />
              <span>1 · Ưu điểm &amp; công dụng</span>
            </h2>

            {/* 6 Gạch đầu dòng ưu điểm */}
            {detail.advantages && detail.advantages.length > 0 && (
              <ul className="mb-4 grid grid-cols-1 gap-2.5 p-0 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-3 list-none">
                {detail.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-800">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* 4 Thẻ công dụng */}
            {detail.uses && detail.uses.length > 0 && (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {detail.uses.map((use, i) => (
                  <div
                    key={i}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs"
                  >
                    <div className="mt-0.5 shrink-0">{renderUseIcon(use.icon)}</div>
                    <div>
                      <p className="mb-0.5 text-sm font-semibold text-slate-900">{use.title}</p>
                      <p className="text-[13px] leading-relaxed text-slate-600">{use.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* =========================================================================
            KHỐI 3: HÌNH ẢNH THỰC TẾ TẠI CÔNG TRÌNH (3 ảnh - tự ẩn nếu rỗng)
           ========================================================================= */}
        {detail.projectImages && detail.projectImages.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-[13px] font-bold tracking-wider uppercase text-red-700">
              <Camera className="h-4 w-4 text-red-700" aria-hidden="true" />
              <span>2 · Hình ảnh thực tế tại công trình</span>
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {detail.projectImages.map((img, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs"
                >
                  <img
                    src={img}
                    alt={`Hình ảnh thực tế công trình ${detail.name} ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            KHỐI 4: BẢNG THÔNG SỐ KỸ THUẬT CHI TIẾT (tự ẩn nếu rỗng)
           ========================================================================= */}
        {detail.specTable && detail.specTable.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-[13px] font-bold tracking-wider uppercase text-red-700">
              <FileSpreadsheet className="h-4 w-4 text-red-700" aria-hidden="true" />
              <span>
                {detail.projectImages && detail.projectImages.length > 0 ? '3' : '2'} · Bảng thông số kỹ thuật chi tiết
              </span>
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full border-collapse text-sm">
                <tbody>
                  {detail.specTable.map((row, i) => (
                    <tr
                      key={i}
                      className={i !== detail.specTable.length - 1 ? 'border-b border-slate-100' : ''}
                    >
                      <th
                        scope="row"
                        className="w-[40%] bg-slate-50/60 px-4 py-2.5 text-left font-medium text-slate-500 align-top"
                      >
                        {row.label}
                      </th>
                      <td className="px-4 py-2.5 font-medium text-slate-900 align-top">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* =========================================================================
            KHỐI 5: DỰ TOÁN CHI TIẾT CHO 1 BỘ HOẶC THANH CTA BÁO GIÁ
           ========================================================================= */}
        {effectiveQuote ? (
          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-[13px] font-bold tracking-wider uppercase text-red-700">
              <Receipt className="h-4 w-4 text-red-700" aria-hidden="true" />
              <span>
                {detail.projectImages && detail.projectImages.length > 0 ? '4' : '3'} · Dự toán chi tiết cho 1 bộ ({effectiveQuote.model})
              </span>
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-red-50 text-[13px] font-semibold text-red-950">
                    <th className="px-4 py-2.5 text-left">Hạng mục</th>
                    <th className="px-3 py-2.5 text-center">ĐVT</th>
                    <th className="px-3 py-2.5 text-center">SL</th>
                    <th className="px-4 py-2.5 text-right">Đơn giá (đ)</th>
                    <th className="px-4 py-2.5 text-right">Thành tiền (đ)</th>
                  </tr>
                </thead>
                <tbody>
                  {effectiveQuote.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-100 transition-colors hover:bg-slate-50/50"
                    >
                      <td className="px-4 py-2.5 font-medium text-slate-900">{row.name}</td>
                      <td className="px-3 py-2.5 text-center text-slate-600">{row.unit}</td>
                      <td className="px-3 py-2.5 text-center tabular-nums text-slate-600">{row.qty}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-slate-700">{row.price}</td>
                      <td className="px-4 py-2.5 text-right font-medium tabular-nums text-slate-900">
                        {row.amount}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-red-50/80 font-bold text-red-950">
                    <td colSpan={4} className="px-4 py-3">
                      Cộng 01 bộ (VNĐ)
                    </td>
                    <td className="px-4 py-3 text-right text-base tabular-nums text-red-700">
                      {effectiveQuote.total}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Ghi chú dưới bảng giá */}
            {effectiveQuote.note && (
              <p className="mt-2 text-xs italic text-slate-500">* {effectiveQuote.note}</p>
            )}

            {/* Thanh CTA Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-red-200/60 bg-red-50/60 p-4 sm:p-5">
              <div>
                <p className="mb-0.5 text-sm font-semibold text-slate-900">
                  Cần báo giá chính xác cho công trình của bạn?
                </p>
                <p className="text-xs text-slate-600 sm:text-sm">
                  Gửi kích thước và số lượng, kỹ sư APEX dự toán trong ngày.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => onOpenQuote?.(detail.slug)}
                  className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-800"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  <span>Nhận báo giá</span>
                </button>
                <a
                  href={company.zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0068ff] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0057d9]"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  <span>Tư vấn Zalo</span>
                </a>
              </div>
            </div>
          </section>
        ) : (
          <section className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-red-200/60 bg-red-50/60 p-4 sm:p-5">
              <div>
                <p className="mb-0.5 text-sm font-semibold text-slate-900">
                  Cần báo giá dự toán {detail.name}?
                </p>
                <p className="text-xs text-slate-600 sm:text-sm">
                  Gửi kích thước và yêu cầu kỹ thuật, kỹ sư APEX phản hồi dự toán trong ngày.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => onOpenQuote?.(detail.slug)}
                  className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-800"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  <span>Nhận báo giá</span>
                </button>
                <a
                  href={company.zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0068ff] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0057d9]"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  <span>Tư vấn Zalo</span>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            KHỐI 6: SẢN PHẨM TƯƠNG TỰ (3 thẻ danh mục)
           ========================================================================= */}
        {detail.relatedSlugs && detail.relatedSlugs.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-[13px] font-bold tracking-wider uppercase text-red-700">
              <LayoutGrid className="h-4 w-4 text-red-700" aria-hidden="true" />
              <span>Sản phẩm tương tự</span>
            </h2>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {detail.relatedSlugs.map((relSlug) => {
                const rel = CATEGORY_DETAILS[relSlug];
                if (!rel) return null;
                const relCover = rel.gallery?.[0] || '';

                return (
                  <a
                    key={relSlug}
                    href={`/san-pham/${relSlug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('products', undefined, relSlug);
                    }}
                    className="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:border-red-300 hover:shadow-md"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                      {relCover && (
                        <img
                          src={relCover}
                          alt={rel.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="p-3.5">
                      <p className="mb-1 text-[15px] font-bold text-slate-900 transition-colors group-hover:text-red-700">
                        {rel.name}
                      </p>
                      <p className="mb-2.5 text-xs leading-relaxed text-slate-600 line-clamp-2">
                        {rel.intro}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 transition-transform group-hover:translate-x-1">
                        Xem chi tiết <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
