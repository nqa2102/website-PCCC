import { useEffect, useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { PRODUCTS, TECHNICAL_DOCS, NEWS_ARTICLES, HERO_IMAGE } from '../data/mockData';
import type { Product, TechnicalDoc, Project, NewsArticle } from '../types';
import type { AdminCompany, AdminContent, AdminDocument, AdminProduct, WebsiteLeadInput } from './adminTypes';

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

// Danh mục ban đầu để admin chủ động nhập vào Neon. Mọi bản ghi ở trạng thái NHÁP:
// chỉ hiển thị trên website sau khi người có thẩm quyền rà soát và chuyển sang "published".
// Không bao gồm dự án vì danh sách dự án mẫu chưa được xác minh.
export const createInitialCatalog = (): { products: AdminProduct[]; documents: AdminDocument[]; contents: AdminContent[] } => {
  const now = new Date().toISOString().slice(0, 16);
  return {
    products: PRODUCTS.map((product, index) => ({
      id: product.id,
      name: product.name,
      slug: product.id,
      category: product.category,
      categoryName: product.categoryName,
      fireRating: product.fireRating,
      shortDescription: product.description,
      material: product.specs.material,
      standard: product.specs.standard,
      warranty: product.specs.warranty,
      featured: Boolean(product.popular),
      status: 'draft',
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

const mapProducts = (items: AdminProduct[]): Product[] =>
  items
    .filter((p) => p.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((ap) => {
      const orig = PRODUCTS.find((p) => p.id === ap.id || p.id === ap.slug);
      if (orig) {
        return {
          ...orig,
          name: ap.name,
          category: ap.category as Product['category'],
          categoryName: ap.categoryName,
          fireRating: ap.fireRating,
          description: ap.shortDescription || orig.description,
          popular: ap.featured,
          image: ap.image || orig.image,
          priceEstimate: ap.priceEstimate || orig.priceEstimate || 'Liên hệ',
          specs: {
            ...orig.specs,
            material: ap.material || orig.specs.material,
            standard: ap.standard || orig.specs.standard,
            warranty: ap.warranty || orig.specs.warranty,
          },
        };
      }
      // Sản phẩm mới tạo từ admin: chỉ hiển thị thông tin admin đã nhập, không tự thêm cam kết kỹ thuật
      return {
        id: ap.id,
        name: ap.name,
        category: ap.category as Product['category'],
        categoryName: ap.categoryName || 'Sản phẩm PCCC',
        fireRating: ap.fireRating || 'Theo cấu hình',
        description: ap.shortDescription,
        longDescription: ap.shortDescription,
        specs: {
          material: ap.material || 'Liên hệ để được tư vấn',
          thickness: 'Theo hồ sơ công trình',
          insulation: 'Theo hồ sơ công trình',
          finish: 'Theo yêu cầu công trình',
          standard: ap.standard || 'Liên hệ để được tư vấn',
          warranty: ap.warranty || 'Liên hệ',
        },
        features: [],
        image: ap.image || PRODUCTS[0]?.image || '',
        priceEstimate: ap.priceEstimate || 'Liên hệ',
        popular: ap.featured,
      };
    });

const mapDocuments = (items: AdminDocument[]): TechnicalDoc[] =>
  items
    .filter((d) => d.status === 'published')
    .map((ad) => {
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

const PROJECT_CATEGORY_LABELS: Record<Project['category'], string> = {
  residential: 'Chung cư cao cấp',
  industrial: 'Nhà xưởng công nghiệp',
  commercial: 'Thương mại dịch vụ',
  healthcare: 'Y tế & Bệnh viện',
};

const mapProjects = (items: AdminContent[]): Project[] =>
  items
    .filter((c) => c.type === 'project' && c.status === 'published')
    .map((c) => {
      const category = (c.category && c.category in PROJECT_CATEGORY_LABELS ? c.category : 'commercial') as Project['category'];
      return {
        id: c.id,
        title: c.title,
        category,
        categoryLabel: PROJECT_CATEGORY_LABELS[category],
        location: c.location || '',
        scale: c.scale || '',
        itemsSupplied: c.itemsSupplied || '',
        year: c.year || '',
        image: c.image || HERO_IMAGE,
        description: c.summary || '',
        client: c.client || '',
      };
    });

const mapNews = (items: AdminContent[]): NewsArticle[] =>
  items
    .filter((c) => c.type === 'article' && c.status === 'published')
    .map((c) => ({
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
        liveSnapshot = {
          company: mapCompany(payload.company),
          products: mapProducts(payload.products || []),
          documents: mapDocuments(payload.documents || []),
          projects: mapProjects(contents),
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
      productInterest: input.topic,
      message: input.message || null,
      consent: input.consent,
      website: input.website || '',
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Không thể gửi yêu cầu lúc này.');
  }
};
