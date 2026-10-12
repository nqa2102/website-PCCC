import React from 'react';
import {
  DoorClosed,
  Scan,
  GalleryVertical,
  Layers,
  Zap,
  Route,
  Server,
  Radio,
  Power,
  ChevronRight,
} from 'lucide-react';
import type { ProductCategory } from '../../types';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

export const PRODUCT_CATEGORY_DEFINITIONS: CategoryInfo[] = [
  {
    id: 'cua-thep-ngan-chay',
    name: 'Cửa Thép Ngăn Cháy',
    shortDesc: 'Khung cánh thép gia cường, lõi cách nhiệt không cháy, ngăn lửa và khói độc.',
    icon: DoorClosed,
    tag: 'PCCC Công Trình',
  },
  {
    id: 'cua-kinh-ngan-chay',
    name: 'Cửa Kính Ngăn Cháy',
    shortDesc: 'Hệ khung chịu lực kết hợp kính ngăn cháy đa tầng, lấy sáng và thẩm mỹ.',
    icon: Scan,
    tag: 'Kiến Trúc Mở',
  },
  {
    id: 'cua-cuon-ngan-chay',
    name: 'Cửa Cuốn Ngăn Cháy',
    shortDesc: 'Khoảng mở siêu trường nhịp lớn, đóng kín tự động khi nhận tín hiệu báo cháy.',
    icon: GalleryVertical,
    tag: 'Khoảng Mở Lớn',
  },
  {
    id: 'rem-ngan-chay',
    name: 'Rèm Ngăn Cháy & Khói',
    shortDesc: 'Vải sợi thủy tinh gia cường thép, giấu âm trần thẩm mỹ, tự động hạ khi báo động.',
    icon: Layers,
    tag: 'Ngăn Khói Trọng Lực',
  },
  {
    id: 'tu-dien',
    name: 'Tủ Điện Phân Phối & ĐK',
    shortDesc: 'Vỏ tủ điện hạ thế, tủ MSB, DB và tủ điều khiển bơm PCCC gia công CNC chính xác.',
    icon: Zap,
    tag: 'Cơ Điện Hạ Thế',
  },
  {
    id: 'thang-mang-cap',
    name: 'Thang Máng Cáp Điện',
    shortDesc: 'Máng cáp, thang cáp mạ kẽm / nhúng nóng, bảo vệ cáp điện lực và tín hiệu PCCC.',
    icon: Route,
    tag: 'Hạ Tầng Dây Dẫn',
  },
  {
    id: 'tu-rack',
    name: 'Tủ Rack Mạng & Server',
    shortDesc: 'Tủ mạng 19 inch (6U - 42U) chuẩn EIA-310-D, tải trọng cao, thông gió tối ưu.',
    icon: Server,
    tag: 'CNTT & Viễn Thông',
  },
  {
    id: 'nha-tram-shelter',
    name: 'Nhà Trạm Viễn Thông Shelter',
    shortDesc: 'Panel sandwich cách nhiệt, chống nước, chống ăn mòn dã ngoại cho trạm BTS.',
    icon: Radio,
    tag: 'Module Dã Ngoại',
  },
  {
    id: 'tu-nguon-outdoor',
    name: 'Tủ Nguồn Outdoor',
    shortDesc: 'Kết cấu 2 lớp vỏ cách nhiệt IP55/IP65, bảo vệ bộ chỉnh lưu và ắc quy ngoài trời.',
    icon: Power,
    tag: 'Nguồn Ngoài Trời',
  },
];

interface ProductCategoryGridProps {
  selectedCategory?: string;
  onSelectCategory: (category: ProductCategory | 'all') => void;
  className?: string;
}

export const ProductCategoryGrid: React.FC<ProductCategoryGridProps> = ({
  selectedCategory = 'all',
  onSelectCategory,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
            Hệ sinh thái sản phẩm APEX
          </span>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            9 Dòng sản phẩm sản xuất & cung ứng
          </h2>
        </div>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold text-red-600 hover:underline"
          >
            Xem tất cả (9 nhóm)
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCT_CATEGORY_DEFINITIONS.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
              className={`group flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                isSelected
                  ? 'border-red-600 bg-red-50/50 shadow-md ring-1 ring-red-600'
                  : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-red-50 group-hover:text-red-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-600">
                    {cat.tag}
                  </span>
                </div>

                <h3 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-red-600">
                  {cat.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                  {cat.shortDesc}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-1 border-t border-slate-100 pt-2 text-[11px] font-semibold text-slate-700 group-hover:text-red-600">
                <span>{isSelected ? 'Đang chọn nhóm này' : 'Xem sản phẩm'}</span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
