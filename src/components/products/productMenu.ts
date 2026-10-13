import type { Product } from '../../types';

export interface ProductVariantGroup {
  label: string | null;
  products: Product[];
}

/**
 * Lọc danh sách sản phẩm con thuộc một danh mục (loại trừ sản phẩm tổng quan)
 */
export function getCategorySubProducts(products: Product[], categoryId: string): Product[] {
  if (!products || !categoryId) return [];
  return products.filter((p) => p.category === categoryId && p.id !== categoryId);
}

/**
 * Phân nhóm sản phẩm con theo biến thể (số cánh) và sắp xếp theo cấp chịu lửa (EI).
 * - Nếu MỌI sản phẩm trong danh mục khớp regex /(\d)\s*cánh/i trên tên:
 *   chia nhóm "1 CÁNH", "2 CÁNH"... theo số tăng dần, trong mỗi nhóm sắp xếp EI tăng dần.
 * - Nếu không khớp hết (hoặc danh mục phẳng như tủ điện, cửa cuốn...):
 *   trả về 1 nhóm phẳng { label: null, products }, giữ nguyên thứ tự dữ liệu.
 * - Tự động loại bỏ sản phẩm tổng quan (id === categoryId hoặc id === category).
 * - Nếu danh sách rỗng: trả về mảng rỗng [].
 */
export function groupProductsByVariant(
  products: Product[],
  categoryId?: string
): ProductVariantGroup[] {
  if (!products || products.length === 0) return [];

  // Loại bỏ sản phẩm tổng quan
  const validProducts = products.filter((p) => {
    if (categoryId && p.id === categoryId) return false;
    if (p.category && p.id === p.category) return false;
    return true;
  });

  if (validProducts.length === 0) return [];

  // Kiểm tra xem MỌI sản phẩm có chứa đặc điểm số cánh không
  const allMatchWings = validProducts.every((p) => /(\d)\s*cánh/i.test(p.name));

  if (!allMatchWings) {
    // Danh sách phẳng, giữ thứ tự dữ liệu
    return [{ label: null, products: validProducts }];
  }

  // Chia nhóm theo số cánh
  const groupsMap = new Map<number, Product[]>();
  for (const p of validProducts) {
    const match = p.name.match(/(\d)\s*cánh/i);
    const wingNum = match ? parseInt(match[1], 10) : 0;
    if (!groupsMap.has(wingNum)) {
      groupsMap.set(wingNum, []);
    }
    groupsMap.get(wingNum)!.push(p);
  }

  // Sắp xếp số cánh tăng dần
  const sortedWingNums = Array.from(groupsMap.keys()).sort((a, b) => a - b);

  return sortedWingNums.map((wingNum) => {
    const groupItems = [...groupsMap.get(wingNum)!];

    // Trong mỗi nhóm, sắp xếp theo số EI tăng dần
    groupItems.sort((a, b) => {
      const matchA = (a.name || '').match(/EI\s*(\d+)/i) || (a.fireRating || '').match(/EI\s*(\d+)/i);
      const matchB = (b.name || '').match(/EI\s*(\d+)/i) || (b.fireRating || '').match(/EI\s*(\d+)/i);
      const eiA = matchA ? parseInt(matchA[1], 10) : 0;
      const eiB = matchB ? parseInt(matchB[1], 10) : 0;
      return eiA - eiB;
    });

    return {
      label: `${wingNum} CÁNH`,
      products: groupItems,
    };
  });
}

/**
 * Chuẩn hóa tên sản phẩm hiển thị trong menu dạng câu:
 * Viết hoa chữ đầu tiên, giữ nguyên các mã kỹ thuật như EI70, IP55, v.v.
 */
export function formatMenuProductName(name: string): string {
  if (!name) return '';
  const trimmed = name.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}
