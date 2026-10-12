import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FireRatingBadgeProps {
  fireRating?: string | null;
  certificationNo?: string | null;
  className?: string;
  showDetails?: boolean;
}

/**
 * FireRatingBadge
 * Quy tắc bắt buộc: CHỈ hiển thị khi CẢ fireRating VÀ certificationNo đều có giá trị thật.
 * Nếu một trong hai trường rỗng, null, hoặc đang cập nhật, component trả về null (ẩn hoàn toàn)
 * nhằm tuân thủ quy chuẩn pháp lý và tránh gây hiểu lầm là sản phẩm đã có chứng nhận kiểm định.
 */
export const FireRatingBadge: React.FC<FireRatingBadgeProps> = ({
  fireRating,
  certificationNo,
  className = '',
  showDetails = false,
}) => {
  const rating = fireRating?.trim();
  const cert = certificationNo?.trim();

  // Kiểm tra tính hợp lệ: cả hai đều phải tồn tại và không phải là placeholder
  if (!rating || !cert) {
    return null;
  }

  const isPlaceholder = (val: string) => {
    const lower = val.toLowerCase();
    return lower === 'đang cập nhật' || lower === 'dang cap nhat' || lower === 'null' || lower === 'undefined';
  };

  if (isPlaceholder(rating) || isPlaceholder(cert)) {
    return null;
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 shadow-xs ${className}`}
      title={`Cấp chịu lửa: ${rating} — Số GCN kiểm định: ${cert}`}
    >
      <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
      <span>{rating}</span>
      <span className="text-emerald-400">|</span>
      <span className="font-mono text-[11px] font-normal text-emerald-700">GCN: {cert}</span>
      {showDetails && (
        <span className="ml-1 text-[10px] text-emerald-600">(Đã kiểm định)</span>
      )}
    </div>
  );
};
