import React from 'react';

interface SpecsTableProps {
  specs?: Record<string, string | undefined> | null;
  className?: string;
}

const SPEC_LABEL_MAP: Record<string, string> = {
  material: 'Vật liệu kết cấu',
  thickness: 'Quy cách & Kích thước',
  insulation: 'Lõi cách nhiệt / Cấu trúc',
  finish: 'Xử lý bề mặt & Lớp sơn',
  standard: 'Tiêu chuẩn & Quy chuẩn',
  warranty: 'Chính sách bảo hành',
  fireRating: 'Cấp độ chịu lửa',
  certificationNo: 'Số chứng nhận hợp quy',
  dimension: 'Kích thước gia công',
  weight: 'Khối lượng / Tải trọng',
  ipRating: 'Cấp bảo vệ IP',
  capacity: 'Dung lượng / Công suất',
};

export const SpecsTable: React.FC<SpecsTableProps> = ({ specs, className = '' }) => {
  if (!specs || Object.keys(specs).length === 0) {
    return (
      <div className={`rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-xs text-slate-500 ${className}`}>
        Thông số kỹ thuật đang được phòng kỹ thuật APEX cập nhật theo từng mã sản phẩm.
      </div>
    );
  }

  const entries = Object.entries(specs).filter(([_, value]) => value && value.trim().length > 0);

  if (entries.length === 0) {
    return (
      <div className={`rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-xs text-slate-500 ${className}`}>
        Thông số kỹ thuật đang được phòng kỹ thuật APEX cập nhật.
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs ${className}`}>
      <div className="border-b border-slate-100 bg-slate-50/75 px-4 py-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Bảng thông số kỹ thuật chi tiết
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <tbody className="divide-y divide-slate-100">
            {entries.map(([key, value], idx) => {
              const label = SPEC_LABEL_MAP[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
              const isEven = idx % 2 === 0;
              return (
                <tr key={key} className={isEven ? 'bg-white' : 'bg-slate-50/50'}>
                  <td className="w-1/3 min-w-[140px] px-4 py-3 font-semibold text-slate-700 sm:w-2/5">
                    {label}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
