export interface AppRoute {
  tab: string;
  itemId?: string;
  category?: string;
}

const PRODUCT_CATEGORIES = new Set(['steel-door', 'glass-door', 'roller-shutter', 'fire-curtain', 'accessories']);

const TAB_PATHS: Record<string, string> = {
  home: '/',
  about: '/gioi-thieu',
  products: '/san-pham',
  solutions: '/giai-phap',
  projects: '/du-an',
  documents: '/tai-lieu-ky-thuat',
  news: '/tin-tuc',
  contact: '/lien-he',
  privacy: '/chinh-sach-bao-mat',
  admin: '/admin',
  'not-found': '/404',
};

export const readRoute = (): AppRoute => {
  if (window.location.hash === '#/admin' || window.location.pathname === '/admin') return { tab: 'admin' };

  const segments = window.location.pathname.split('/').filter(Boolean);
  const root = segments[0] || '';
  const itemId = segments[1] ? decodeURIComponent(segments.slice(1).join('/')) : undefined;

  if (root === '') return { tab: 'home' };
  if (root === 'gioi-thieu') return { tab: 'about' };
  if (root === 'san-pham') {
    const category = new URLSearchParams(window.location.search).get('nhom') || undefined;
    return { tab: 'products', itemId, category };
  }
  if (root === 'giai-phap') return { tab: 'solutions', itemId };
  if (root === 'du-an') return { tab: 'projects', itemId };
  if (root === 'tai-lieu-ky-thuat') return { tab: 'documents', itemId };
  if (root === 'tin-tuc') return { tab: 'news', itemId };
  if (root === 'lien-he') return { tab: 'contact' };
  if (root === 'chinh-sach-bao-mat') return { tab: 'privacy' };
  if (root === '404') return { tab: 'not-found' };
  return { tab: 'not-found' };
};

export const pathForRoute = (tab: string, itemId?: string) => {
  const base = TAB_PATHS[tab] || '/';
  if (!itemId) return base;
  if (tab === 'products' && PRODUCT_CATEGORIES.has(itemId)) return `${base}?nhom=${encodeURIComponent(itemId)}`;
  if (['products', 'solutions', 'projects', 'documents', 'news'].includes(tab)) return `${base}/${encodeURIComponent(itemId)}`;
  return base;
};

export const isProductCategory = (value?: string) => Boolean(value && PRODUCT_CATEGORIES.has(value));

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
    title: 'Hồ sơ dự án APEX Việt Nam',
    description: 'Các dự án thực tế của APEX chỉ được công bố sau khi xác minh thông tin, hình ảnh và quyền sử dụng tư liệu.',
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

const setMeta = (selector: string, attribute: string, value: string) => {
  const element = document.querySelector<HTMLMetaElement>(selector);
  element?.setAttribute(attribute, value);
};

export const applySeo = (tab: string, itemName?: string) => {
  const base = SEO[tab] || SEO.home;
  const title = itemName ? `${itemName} | APEX Việt Nam` : base.title;
  document.title = title;
  setMeta('meta[name="description"]', 'content', base.description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', base.description);
  setMeta('meta[property="og:url"]', 'content', window.location.href.split('#')[0]);
  setMeta('meta[property="og:image"]', 'content', `${window.location.origin}/og-image.png`);
  setMeta('meta[name="twitter:image"]', 'content', `${window.location.origin}/og-image.png`);

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = `${window.location.origin}${window.location.pathname}`;
};
