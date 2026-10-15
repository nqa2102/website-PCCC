export interface AppRoute {
  tab: string;
  itemId?: string;
  category?: string;
}

export const PRODUCT_CATEGORIES = new Set([
  'cua-thep-ngan-chay',
  'cua-thep-van-go',
  'cua-kinh-ngan-chay',
  'cua-cuon-ngan-chay',
  'rem-ngan-chay',
  'tu-dien',
  'thang-mang-cap',
  'tu-rack',
  'nha-tram-shelter',
  'tu-nguon-outdoor',
]);

export const LEGACY_CATEGORY_MAP: Record<string, string> = {
  'steel-door': 'cua-thep-ngan-chay',
  'glass-door': 'cua-kinh-ngan-chay',
  'roller-shutter': 'cua-cuon-ngan-chay',
  'fire-curtain': 'rem-ngan-chay',
};

export const PRODUCT_CATEGORY_LABELS: Record<string, string> = {
  'cua-thep-ngan-chay': 'Cửa thép ngăn cháy',
  'cua-thep-van-go': 'Cửa thép vân gỗ chống cháy',
  'cua-kinh-ngan-chay': 'Cửa kính ngăn cháy',
  'cua-cuon-ngan-chay': 'Cửa cuốn ngăn cháy',
  'rem-ngan-chay': 'Rèm ngăn cháy',
  'tu-dien': 'Tủ điện',
  'thang-mang-cap': 'Thang máng cáp',
  'tu-rack': 'Tủ rack',
  'nha-tram-shelter': 'Nhà trạm shelter',
  'tu-nguon-outdoor': 'Tủ nguồn outdoor',
};

const TAB_PATHS: Record<string, string> = {
  home: '/',
  about: '/gioi-thieu',
  products: '/san-pham',
  solutions: '/san-pham',
  projects: '/du-an',
  documents: '/tai-lieu-ky-thuat',
  news: '/tin-tuc',
  contact: '/lien-he',
  privacy: '/chinh-sach-bao-mat',
  admin: '/admin',
  'not-found': '/404',
};

export const normalizeCategory = (cat?: string | null): string | undefined => {
  if (!cat) return undefined;
  if (PRODUCT_CATEGORIES.has(cat)) return cat;
  if (LEGACY_CATEGORY_MAP[cat]) return LEGACY_CATEGORY_MAP[cat];
  return undefined;
};

export const readRoute = (): AppRoute => {
  if (window.location.hash === '#/admin' || window.location.pathname === '/admin') return { tab: 'admin' };

  const segments = window.location.pathname.split('/').filter(Boolean);
  const root = segments[0] || '';

  if (root === '') return { tab: 'home' };
  if (root === 'gioi-thieu') return { tab: 'about' };
  if (root === 'san-pham') {
    const rawCategory = new URLSearchParams(window.location.search).get('nhom');
    const queryCategory = normalizeCategory(rawCategory);

    // /san-pham?nhom=... -> chuẩn hóa và chuyển hướng sạch qua replaceState
    if (queryCategory && segments.length === 1) {
      if (typeof window !== 'undefined' && window.history?.replaceState) {
        window.history.replaceState({}, '', `/san-pham/${encodeURIComponent(queryCategory)}`);
      }
      return { tab: 'products', category: queryCategory };
    }

    // /san-pham/:category/:slug -> chuyển hướng (redirect) sạch về /san-pham/:category (tránh 404 link cũ)
    if (segments.length >= 3) {
      const segCat = normalizeCategory(segments[1]) || queryCategory;
      if (segCat) {
        if (typeof window !== 'undefined' && window.history?.replaceState) {
          window.history.replaceState({}, '', `/san-pham/${encodeURIComponent(segCat)}`);
        }
        return { tab: 'products', category: segCat };
      }
      return { tab: 'products', category: queryCategory };
    }

    // /san-pham/:category OR /san-pham/:slug
    if (segments.length === 2) {
      const segCat = normalizeCategory(segments[1]);
      if (segCat) {
        return { tab: 'products', category: segCat };
      }
      return { tab: 'products', category: queryCategory, itemId: decodeURIComponent(segments[1]) };
    }

    // /san-pham (?nhom=...)
    return { tab: 'products', category: queryCategory };
  }

  const itemId = segments[1] ? decodeURIComponent(segments.slice(1).join('/')) : undefined;

  // Chuyển hướng sạch /giai-phap về /san-pham (đã bỏ tính năng giải pháp)
  if (root === 'giai-phap') {
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState({}, '', '/san-pham');
    }
    return { tab: 'products' };
  }
  if (root === 'du-an') return { tab: 'projects', itemId };
  if (root === 'tai-lieu-ky-thuat') return { tab: 'documents', itemId };
  if (root === 'tin-tuc') return { tab: 'news', itemId };
  if (root === 'lien-he') return { tab: 'contact' };
  if (root === 'chinh-sach-bao-mat') return { tab: 'privacy' };
  if (root === '404') return { tab: 'not-found' };
  return { tab: 'not-found' };
};

export const pathForRoute = (tab: string, itemId?: string, category?: string) => {
  const base = TAB_PATHS[tab] || '/';
  if (!itemId && !category) return base;

  if (tab === 'products') {
    const normCat = normalizeCategory(category || itemId);
    if (normCat) return `${base}/${encodeURIComponent(normCat)}`;
    if (itemId) {
      const maybeCat = normalizeCategory(itemId);
      if (maybeCat) return `${base}/${encodeURIComponent(maybeCat)}`;
      return `${base}/${encodeURIComponent(itemId)}`;
    }
    return base;
  }

  if (tab === 'projects' && itemId) return `${base}/${encodeURIComponent(itemId)}`;
  if (['documents', 'news'].includes(tab) && itemId) return `${base}/${encodeURIComponent(itemId)}`;
  return base;
};

export const isProductCategory = (value?: string) => Boolean(value && (PRODUCT_CATEGORIES.has(value) || LEGACY_CATEGORY_MAP[value]));

const SEO: Record<string, { title: string; description: string }> = {
  home: {
    title: 'APEX Việt Nam | Cửa và giải pháp ngăn cháy',
    description: 'APEX tư vấn, sản xuất và cung ứng cửa thép, cửa kính, cửa cuốn và rèm ngăn cháy theo yêu cầu thực tế của công trình.',
  },
  about: {
    title: 'Giới thiệu APEX Việt Nam | Năng lực và định hướng',
    description: 'Thông tin doanh nghiệp, định hướng kỹ thuật và năng lực cung ứng giải pháp ngăn cháy của Công ty TNHH Apex VN.',
  },
  products: {
    title: 'Sản phẩm cửa chống cháy APEX | Thép, kính, cửa cuốn và rèm',
    description: 'Danh mục sản phẩm ngăn cháy APEX với thông số, cấu hình, phụ kiện và hồ sơ tham chiếu theo từng vị trí công trình.',
  },
  solutions: {
    title: 'Giải pháp ngăn cháy theo công trình | APEX Việt Nam',
    description: 'Giải pháp cửa và phân khoang ngăn cháy cho chung cư, văn phòng, trung tâm thương mại, nhà xưởng, bệnh viện và khách sạn.',
  },
  projects: {
    title: 'Dự án tiêu biểu & Hồ sơ năng lực | APEX Việt Nam',
    description: 'Tổng hợp công trình dân dụng, thương mại và hạ tầng công nghiệp đã hoàn thành nghiệm thu PCCC thực tế do APEX Việt Nam thực hiện.',
  },
  documents: {
    title: 'Tài liệu kỹ thuật và hồ sơ kiểm định | APEX Việt Nam',
    description: 'Tra cứu thông tin hồ sơ kỹ thuật, tiêu chuẩn, phạm vi áp dụng và chủ sở hữu tài liệu liên quan đến sản phẩm ngăn cháy.',
  },
  news: {
    title: 'Kiến thức cửa và giải pháp ngăn cháy | APEX Việt Nam',
    description: 'Thông tin kỹ thuật, hướng dẫn lựa chọn và cập nhật quy chuẩn liên quan đến cửa và giải pháp ngăn cháy.',
  },
  contact: {
    title: 'Liên hệ tư vấn kỹ thuật APEX Việt Nam',
    description: 'Liên hệ APEX để trao đổi nhu cầu sản phẩm, hồ sơ thiết kế, khảo sát và tiến độ công trình.',
  },
  privacy: {
    title: 'Chính sách bảo mật dữ liệu | APEX Việt Nam',
    description: 'Thông tin về mục đích thu thập, sử dụng và quyền của khách hàng đối với dữ liệu gửi qua website APEX.',
  },
  admin: {
    title: 'APEX Admin - Trung tâm vận hành website',
    description: 'Không gian quản trị nội bộ APEX.',
  },
  'not-found': {
    title: '404 - Không tìm thấy trang | APEX Việt Nam',
    description: 'Trang bạn yêu cầu không tồn tại hoặc đã được di chuyển trên hệ thống website APEX Việt Nam.',
  },
};

// Tên miền chính thức: canonical/og luôn trỏ về đây, kể cả khi truy cập qua www hoặc *.vercel.app
export const SITE_URL = 'https://apexhome.vn';

const setMeta = (selector: string, attribute: string, value: string) => {
  const element = document.querySelector<HTMLMetaElement>(selector);
  element?.setAttribute(attribute, value);
};

export interface SeoOverrides {
  title?: string;
  description?: string;
  image?: string;
}

export const applySeo = (tab: string, itemName?: string, overrides?: SeoOverrides) => {
  const base = SEO[tab] || SEO.home;
  const title = overrides?.title || (itemName ? `${itemName} | APEX Việt Nam` : base.title);
  const description = overrides?.description || base.description;
  document.title = title;
  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);

  // Canonical luôn là URL sạch, trỏ về chính xác tên miền chính thức và pathname, loại bỏ query parameters
  const pageUrl = `${SITE_URL}${window.location.pathname}`;
  setMeta('meta[property="og:url"]', 'content', pageUrl);

  const rawImage = overrides?.image || `${SITE_URL}/og-image.png`;
  const imageUrl = rawImage.startsWith('http')
    ? rawImage
    : `${SITE_URL}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;
  setMeta('meta[property="og:image"]', 'content', imageUrl);
  setMeta('meta[name="twitter:image"]', 'content', imageUrl);

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = pageUrl;
};
