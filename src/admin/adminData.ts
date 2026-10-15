import { useEffect, useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { PRODUCTS, TECHNICAL_DOCS, NEWS_ARTICLES, HERO_IMAGE } from '../data/mockData';
import type { Product, TechnicalDoc, Project, NewsArticle } from '../types';
import type { AdminCompany, AdminContent, AdminDocument, AdminProduct, AdminProject, WebsiteLeadInput } from './adminTypes';
import { trackLead } from '../lib/tracking';
import { PRODUCT_CATEGORY_LABELS } from '../routing';

// Thông tin doanh nghiệp đã xác minh theo giấy chứng nhận ĐKDN, dùng để điền sẵn khi Neon chưa có bản ghi cấu hình.
export const createDefaultAdminCompany = (): AdminCompany => ({
  legalName: COMPANY_INFO.legalName,
  taxCode: COMPANY_INFO.taxCode,
  brandName: 'APEX',
  representative: COMPANY_INFO.representative,
  representativeTitle: COMPANY_INFO.representativeTitle,
  hotline: COMPANY_INFO.hotlineDisplay,
  zalo: COMPANY_INFO.hotlineDisplay,
  email: COMPANY_INFO.email,
  responseTime: COMPANY_INFO.responseTime,
  serviceArea: COMPANY_INFO.serviceArea,
  addresses: COMPANY_INFO.addresses.map((item) => `${item.label}: ${item.value}`),
  defaultSeoTitle: 'APEX Việt Nam | Cửa và giải pháp ngăn cháy',
  defaultSeoDescription: 'Tư vấn, sản xuất và cung ứng cửa thép, cửa cuốn, cửa kính và rèm ngăn cháy cho công trình trên toàn quốc.',
});

// Ảnh dự án thực tế từ thư mục dự án APEX
import bvTimCover from '../assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-1.webp';
import hvhcCover from '../assets/images/projects/hoc-vien-hau-can/photo-1.webp';
import dlybCover from '../assets/images/projects/cong-ty-dien-luc-yen-bai/photo-1.webp';
import astarteCover from '../assets/images/projects/nha-may-astarte-viet-nam/photo-1.webp';
import vksCover from '../assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-1.webp';

// Danh sách các dự án tiêu biểu thực tế đã nghiệm thu hoàn thành của APEX
export const INITIAL_PROJECTS: AdminProject[] = [
  {
    id: 'prj-benh-vien-tim-hn',
    title: 'Bệnh viện Tim Hà Nội cơ sở 2',
    slug: 'benh-vien-tim-ha-noi-co-so-2',
    category: 'cua-thep-ngan-chay',
    clientName: 'Bệnh viện Tim Hà Nội',
    generalContractor: 'Ban quản lý dự án công trình y tế Hà Nội',
    apexRole: 'Cung cấp và lắp đặt cửa ngăn cháy phòng kỹ thuật và sảnh bệnh viện',
    location: 'Tây Hồ, Hà Nội',
    completedYear: 2026,
    description: 'Cung cấp và thi công hoàn thiện hệ thống cửa thép ngăn cháy tiêu chuẩn PCCC, cửa phòng kỹ thuật y tế tại Bệnh viện Tim Hà Nội cơ sở 2.',
    coverImage: bvTimCover,
    gallery: [bvTimCover],
    status: 'published',
    verified: true,
    verifiedNote: 'Hồ sơ nghiệm thu hoàn thành bàn giao sử dụng',
    updatedAt: new Date().toISOString().slice(0, 16),
  },
  {
    id: 'prj-hoc-vien-hau-can',
    title: 'Học viện Hậu Cần',
    slug: 'hoc-vien-hau-can',
    category: 'cua-thep-ngan-chay',
    clientName: 'Học viện Hậu Cần',
    generalContractor: 'Tổng công ty 789/BQP',
    apexRole: 'Nghiệm thu hoàn thành gói cửa chống cháy',
    location: 'Long Biên, Hà Nội',
    completedYear: 2026,
    description: 'Cung cấp, lắp đặt và nghiệm thu hoàn thành toàn bộ hệ thống cửa thép chống cháy tiêu chuẩn EI tại Tòa nhà đa năng KV I - Học viện Hậu Cần.',
    coverImage: hvhcCover,
    gallery: [hvhcCover],
    status: 'published',
    verified: true,
    verifiedNote: 'Biên bản nghiệm thu hoàn thành ngày 22/5/2026',
    updatedAt: new Date().toISOString().slice(0, 16),
  },
  {
    id: 'prj-dien-luc-yen-bai',
    title: 'Nhà làm việc 9 tầng công ty Điện lực Yên Bái',
    slug: 'cong-ty-dien-luc-yen-bai',
    category: 'cua-thep-ngan-chay',
    clientName: 'Công ty Điện lực Yên Bái (EVNNPC)',
    generalContractor: 'Công ty Cổ phần Xây dựng Điện lực',
    apexRole: 'Cung cấp và lắp đặt cửa thép chống cháy sảnh và buồng thang',
    location: 'TP. Yên Bái, Yên Bái',
    completedYear: 2026,
    description: 'Sản xuất, cung cấp và lắp đặt cửa thép chống cháy sảnh tầng, buồng thang thoát hiểm và phòng máy kỹ thuật Nhà làm việc 9 tầng Công ty Điện lực Yên Bái.',
    coverImage: dlybCover,
    gallery: [dlybCover],
    status: 'published',
    verified: true,
    verifiedNote: 'Hồ sơ nghiệm thu bàn giao hệ thống cửa chống cháy hoàn thành',
    updatedAt: new Date().toISOString().slice(0, 16),
  },
  {
    id: 'prj-nha-may-astarte',
    title: 'Nhà máy Astarte Việt Nam',
    slug: 'nha-may-astarte-viet-nam',
    category: 'cua-thep-ngan-chay',
    clientName: 'Công ty TNHH Astarte Việt Nam',
    generalContractor: 'Tổng thầu Xây dựng Công nghiệp',
    apexRole: 'Cung cấp và lắp đặt cửa thép ngăn cháy nhà xưởng sản xuất',
    location: 'Khu công nghiệp, Hưng Yên',
    completedYear: 2026,
    description: 'Cung cấp và lắp đặt trọn gói hệ thống cửa thép ngăn cháy nhà xưởng sản xuất, kho nguyên liệu và phòng kỹ thuật Nhà máy Astarte Việt Nam.',
    coverImage: astarteCover,
    gallery: [astarteCover],
    status: 'published',
    verified: true,
    verifiedNote: 'Nghiệm thu hoàn thành bàn giao đưa vào hoạt động',
    updatedAt: new Date().toISOString().slice(0, 16),
  },
  {
    id: 'prj-vien-kiem-sat-quang-ninh',
    title: 'Viện kiểm sát nhân dân tỉnh Quảng Ninh',
    slug: 'vien-kiem-sat-tinh-quang-ninh',
    category: 'cua-thep-ngan-chay',
    clientName: 'Viện kiểm sát nhân dân tỉnh Quảng Ninh',
    generalContractor: 'Ban quản lý dự án công trình cơ quan nhà nước',
    apexRole: 'Cung cấp và lắp đặt cửa chống cháy sảnh và kho hồ sơ',
    location: 'Hạ Long, Quảng Ninh',
    completedYear: 2026,
    description: 'Gói thầu cung cấp và lắp đặt toàn bộ hệ thống cửa ngăn cháy tiêu chuẩn EI cho công trình Trụ sở Viện kiểm sát nhân dân tỉnh Quảng Ninh.',
    coverImage: vksCover,
    gallery: [vksCover],
    status: 'published',
    verified: true,
    verifiedNote: 'Hồ sơ nghiệm thu bàn giao hệ thống cửa chống cháy hoàn thành',
    updatedAt: new Date().toISOString().slice(0, 16),
  },
];

// Danh mục ban đầu để admin chủ động nhập vào Neon. Mọi bản ghi ở trạng thái NHÁP:
// chỉ hiển thị trên website sau khi người có thẩm quyền rà soát và chuyển sang "published".
export const createInitialCatalog = (): {
  products: AdminProduct[];
  documents: AdminDocument[];
  contents: AdminContent[];
  projects: AdminProject[];
} => {
  const now = new Date().toISOString().slice(0, 16);
  return {
    products: PRODUCTS.map((product, index) => ({
      id: product.id,
      name: product.name,
      slug: product.slug || product.id,
      category: product.category,
      categoryName: product.categoryName,
      fireRating: product.fireRating || '',
      certificationNo: product.certificationNo || '',
      specs: (product.specs || {}) as Record<string, string>,
      features: product.features || [],
      longDescription: product.longDescription || product.description,
      shortDescription: product.description,
      material: product.specs?.material || '',
      standard: product.specs?.standard || '',
      warranty: product.specs?.warranty || '',
      featured: Boolean(product.popular),
      status: 'published',
      sortOrder: index + 1,
      seoTitle: `${product.name} | APEX Việt Nam`,
      seoDescription: product.description,
      imageAlt: `${product.name} APEX`,
      image: product.image,
      priceEstimate: product.priceEstimate || 'Liên hệ',
      updatedAt: now,
    })),
    documents: TECHNICAL_DOCS.map((document) => ({
      id: document.id,
      title: document.title,
      code: document.code,
      documentType: document.documentType || document.categoryLabel,
      productGroup: document.productGroup || 'general',
      standard: document.standard || '',
      owner: document.sourceOwner || '',
      scope: document.scope || '',
      issuedDate: document.updatedDate.split('/').reverse().join('-'),
      expiryDate: '',
      status: 'draft',
      sourceReference: '',
      verifiedBy: '',
      verifiedAt: '',
      notes: 'Nhập từ danh mục ban đầu. Cần đối chiếu bản gốc trước khi công bố.',
    })),
    contents: NEWS_ARTICLES.map((art) => ({
      id: art.id,
      type: 'article',
      title: art.title,
      summary: art.summary,
      status: 'draft',
      publishAt: '',
      owner: art.author,
      featured: false,
      mediaApproved: false,
      clientApproved: false,
      updatedAt: now,
      category: art.category,
      author: art.author,
      readTime: art.readTime,
      content: art.content,
      image: art.image,
    })),
    projects: INITIAL_PROJECTS,
  };
};

export type LiveCompanyInfo = ReturnType<typeof mapCompany>;

const mapCompany = (comp?: Partial<AdminCompany> | null) => {
  const validAddressStrings = (comp?.addresses || []).filter((item) => item && item.trim().length > 0);
  const parsedAddresses = (validAddressStrings.length > 0)
    ? validAddressStrings.map((item, idx) => {
        const colonIdx = item.indexOf(':');
        if (colonIdx > -1) {
          return {
            label: item.slice(0, colonIdx).trim(),
            value: item.slice(colonIdx + 1).trim(),
          };
        }
        return {
          label: `Địa điểm ${idx + 1}`,
          value: item.trim(),
        };
      })
    : COMPANY_INFO.addresses;

  const rawHotline = comp?.hotline || COMPANY_INFO.hotlineDisplay;
  const hotlineClean = rawHotline.replace(/[^\d+]/g, '');

  return {
    ...COMPANY_INFO,
    legalName: comp?.legalName || COMPANY_INFO.legalName,
    legalNameUpper: (comp?.legalName || COMPANY_INFO.legalName).toUpperCase(),
    brandName: comp?.brandName || 'APEX',
    taxCode: comp?.taxCode || COMPANY_INFO.taxCode,
    representative: comp?.representative || COMPANY_INFO.representative,
    representativeTitle: comp?.representativeTitle || COMPANY_INFO.representativeTitle,
    hotlineDisplay: rawHotline,
    hotlineHref: `tel:${hotlineClean}`,
    zaloHref: comp?.zalo ? (comp.zalo.startsWith('http') ? comp.zalo : `https://zalo.me/${comp.zalo.replace(/[^\d+]/g, '')}`) : `https://zalo.me/${hotlineClean}`,
    responseTime: comp?.responseTime || COMPANY_INFO.responseTime,
    serviceArea: comp?.serviceArea || COMPANY_INFO.serviceArea,
    email: comp?.email || COMPANY_INFO.email,
    addresses: parsedAddresses,
    defaultSeoTitle: comp?.defaultSeoTitle,
    defaultSeoDescription: comp?.defaultSeoDescription,
  };
};

const mapProducts = (items: AdminProduct[]): Product[] => {
  if (!items || items.length === 0) {
    return PRODUCTS;
  }
  const publishedItems = items.filter((p) => p.status === 'published');
  if (publishedItems.length === 0) {
    return PRODUCTS;
  }
  const mapped = publishedItems
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((ap) => {
      const orig = PRODUCTS.find((p) => p.id === ap.id || p.id === ap.slug || p.slug === ap.slug);
      if (orig) {
        return {
          ...orig,
          name: ap.name,
          slug: ap.slug || orig.slug,
          category: ap.category as Product['category'],
          categoryName: ap.categoryName || orig.categoryName,
          fireRating: ap.fireRating,
          certificationNo: ap.certificationNo,
          description: ap.shortDescription || orig.description,
          longDescription: ap.longDescription || orig.longDescription || ap.shortDescription || orig.description,
          features: Array.isArray(ap.features) && ap.features.length > 0 ? ap.features : orig.features,
          popular: ap.featured,
          image: ap.image || orig.image,
          priceEstimate: ap.priceEstimate || orig.priceEstimate || 'Liên hệ',
          seoTitle: ap.seoTitle || orig.seoTitle,
          seoDescription: ap.seoDescription || orig.seoDescription,
          imageAlt: ap.imageAlt || orig.imageAlt,
          specs: {
            ...orig.specs,
            ...(ap.specs || {}),
            material: ap.material || ap.specs?.material || orig.specs.material,
            standard: ap.standard || ap.specs?.standard || orig.specs.standard,
            warranty: ap.warranty || ap.specs?.warranty || orig.specs.warranty,
          },
        };
      }
      // Sản phẩm mới tạo từ admin: chỉ hiển thị thông tin admin đã nhập, không tự thêm cam kết kỹ thuật
      return {
        id: ap.id,
        slug: ap.slug || ap.id,
        name: ap.name,
        category: ap.category as Product['category'],
        categoryName: ap.categoryName || 'Sản phẩm PCCC',
        fireRating: ap.fireRating || '',
        certificationNo: ap.certificationNo || '',
        description: ap.shortDescription,
        longDescription: ap.longDescription || ap.shortDescription,
        seoTitle: ap.seoTitle,
        seoDescription: ap.seoDescription,
        imageAlt: ap.imageAlt,
        specs: ap.specs || {
          material: ap.material || 'Liên hệ để được tư vấn',
          thickness: 'Theo hồ sơ công trình',
          insulation: 'Theo hồ sơ công trình',
          finish: 'Theo yêu cầu công trình',
          standard: ap.standard || 'Liên hệ để được tư vấn',
          warranty: ap.warranty || 'Liên hệ',
        },
        features: Array.isArray(ap.features) ? ap.features : [],
        image: ap.image || PRODUCTS[0]?.image || '',
        priceEstimate: ap.priceEstimate || 'Liên hệ',
        popular: ap.featured,
      };
    });

  // Đảm bảo 9 dòng sản phẩm cốt lõi không bị mất nếu DB chưa seed đủ
  const existingKeys = new Set<string>(publishedItems.flatMap((p) => [p.id, p.slug].filter((k): k is string => Boolean(k))));
  const missingBase = PRODUCTS.filter((p) => !existingKeys.has(p.id) && (!p.slug || !existingKeys.has(p.slug)));
  return [...mapped, ...missingBase];
};

const mapDocuments = (items: AdminDocument[]): TechnicalDoc[] => {
  if (!items || items.length === 0) return TECHNICAL_DOCS;
  const published = items.filter((d) => d.status === 'published');
  if (published.length === 0) return TECHNICAL_DOCS;
  return published.map((ad) => {
      const orig = TECHNICAL_DOCS.find((td) => td.id === ad.id);
      if (orig) {
        return {
          ...orig,
          title: ad.title,
          code: ad.code,
          standard: ad.standard || orig.standard,
          sourceOwner: ad.owner || orig.sourceOwner,
          scope: ad.scope || orig.scope,
          fileUrl: ad.fileUrl || undefined,
        };
      }
      return {
        id: ad.id,
        title: ad.title,
        code: ad.code,
        category: 'certificate' as const,
        categoryLabel: ad.documentType || 'Chứng nhận kiểm định',
        updatedDate: ad.issuedDate || '',
        description: ad.scope || '',
        standard: ad.standard,
        sourceOwner: ad.owner,
        scope: ad.scope,
        fileUrl: ad.fileUrl || undefined,
      };
    });
};

const PROJECT_CATEGORY_LABELS: Record<Project['category'], string> = {
  residential: 'Chung cư cao cấp',
  industrial: 'Nhà xưởng công nghiệp',
  commercial: 'Thương mại dịch vụ',
  healthcare: 'Y tế & Bệnh viện',
};

const mapProjects = (_items: AdminContent[], projectRecords: any[] = []): Project[] => {
  // Bản đồ ảnh bìa chất lượng cao từ INITIAL_PROJECTS
  const coverMap = new Map<string, string>();
  INITIAL_PROJECTS.forEach((ip) => {
    if (ip.coverImage) {
      coverMap.set(ip.id, ip.coverImage);
      if (ip.slug) coverMap.set(ip.slug, ip.coverImage);
    }
  });

  const validRecords = (projectRecords || []).filter(
    (p) => p && p.verified && p.status === 'published' && p.id !== 'prj-toa-an-quang-ninh' && p.slug !== 'toa-an-tinh-quang-ninh'
  );

  const mapped: Project[] = validRecords.map((p) => {
    const catKey = p.category || '';
    const catLabel = PRODUCT_CATEGORY_LABELS[catKey as keyof typeof PRODUCT_CATEGORY_LABELS] || p.category || 'Dự án tiêu biểu';
    const localCover = coverMap.get(p.id) || (p.slug ? coverMap.get(p.slug) : undefined);
    const finalCover = localCover || p.coverImage || undefined;
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: catKey,
      categoryLabel: catLabel,
      clientName: p.clientName || '',
      client: p.clientName || '',
      generalContractor: p.generalContractor || '',
      apexRole: p.apexRole || '',
      location: p.location || '',
      completedYear: p.completedYear,
      completedDate: p.completedYear ? `Năm ${p.completedYear}` : '',
      year: p.completedYear ? String(p.completedYear) : '',
      description: p.description || '',
      image: finalCover || HERO_IMAGE,
      coverImage: finalCover,
      gallery: Array.isArray(p.gallery) && p.gallery.length ? p.gallery : (finalCover ? [finalCover] : []),
      verified: Boolean(p.verified),
      verifiedNote: p.verifiedNote || '',
    };
  });

  // Bổ sung các dự án thực tế còn thiếu từ INITIAL_PROJECTS để luôn đủ 5 dự án thực tế
  const seenIds = new Set<string>();
  mapped.forEach((p) => {
    if (p) {
      seenIds.add(p.id);
      if (p.slug) seenIds.add(p.slug);
    }
  });

  (INITIAL_PROJECTS as unknown as Project[]).forEach((ip) => {
    if (ip && !seenIds.has(ip.id) && (!ip.slug || !seenIds.has(ip.slug))) {
      mapped.push(ip);
      seenIds.add(ip.id);
      if (ip.slug) seenIds.add(ip.slug);
    }
  });

  return mapped;
};

const mapNews = (items: AdminContent[]): NewsArticle[] => {
  if (!items || items.length === 0) return NEWS_ARTICLES;
  const published = items.filter((c) => c.type === 'article' && c.status === 'published');
  if (published.length === 0) return NEWS_ARTICLES;
  return published.map((c) => ({
    id: c.id,
    title: c.title,
    date: c.publishAt ? c.publishAt.slice(0, 10).split('-').reverse().join('/') : '',
    author: c.author || c.owner || 'Ban Kỹ thuật APEX',
    category: c.category || 'Tin tức',
    summary: c.summary || '',
    content: c.content?.length ? c.content : [c.summary],
    image: c.image || HERO_IMAGE,
    readTime: c.readTime || '',
  }));
};

interface LiveData {
  company: LiveCompanyInfo;
  products: Product[];
  documents: TechnicalDoc[];
  projects: Project[];
  news: NewsArticle[];
}

// Dữ liệu tĩnh đóng gói cùng website, chỉ dùng khi Neon chưa kết nối hoặc lỗi.
// Không chứa dự án: dự án chỉ được công bố từ Neon sau khi xác minh.
const STATIC_LIVE_DATA: LiveData = {
  company: mapCompany(null),
  products: PRODUCTS,
  documents: TECHNICAL_DOCS,
  projects: [],
  news: NEWS_ARTICLES,
};

let liveSnapshot: LiveData = STATIC_LIVE_DATA;
let publicContentRequest: Promise<void> | null = null;
const liveListeners = new Set<(data: LiveData) => void>();

// Tải nội dung công khai một lần cho mỗi lượt truy cập; khi Neon hoạt động,
// Neon là nguồn dữ liệu duy nhất (kể cả khi danh sách trống).
const loadPublicContent = () => {
  if (!publicContentRequest) {
    publicContentRequest = fetch('/api/public-content')
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (!payload || !payload.isDatabaseLive) return;
        const contents: AdminContent[] = payload.contents || [];
        const remoteProjects: any[] = payload.projects || [];
        liveSnapshot = {
          company: mapCompany(payload.company),
          products: mapProducts(payload.products || []),
          documents: mapDocuments(payload.documents || []),
          projects: mapProjects(contents, remoteProjects),
          news: mapNews(contents),
        };
        liveListeners.forEach((listener) => listener(liveSnapshot));
      })
      .catch(() => {
        // Neon chưa cấu hình hoặc mạng lỗi: giữ dữ liệu tĩnh
      });
  }
  return publicContentRequest;
};

export const useLiveData = () => {
  const [data, setData] = useState<LiveData>(liveSnapshot);

  useEffect(() => {
    liveListeners.add(setData);
    setData(liveSnapshot);
    loadPublicContent();
    return () => {
      liveListeners.delete(setData);
    };
  }, []);

  return data;
};

// Gửi lead lên Neon. Lỗi được ném ra để form báo khách gọi hotline,
// không lưu tạm trên trình duyệt (lead lưu tạm sẽ không bao giờ tới được APEX).
export const appendWebsiteLead = async (input: WebsiteLeadInput) => {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: input.fullName,
      phone: input.phone,
      email: input.email || null,
      productInterest: input.productInterest || input.topic,
      fireRating: input.fireRating || null,
      projectLocation: input.projectLocation || null,
      company: input.company || null,
      source: input.formName === 'quote' ? 'Form báo giá website' : 'Form liên hệ website',
      message: input.message || null,
      consent: input.consent === true,
      website: input.website || '',
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Không thể gửi yêu cầu lúc này.');
  }
  // Chỉ ghi chuyển đổi khi máy chủ đã lưu lead thành công (không gửi dữ liệu khách cho bên đo lường)
  trackLead(input.formName || 'contact');
};
