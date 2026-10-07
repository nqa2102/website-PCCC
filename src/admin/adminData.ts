import { useEffect, useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { PRODUCTS, TECHNICAL_DOCS } from '../data/mockData';
import type { Product, TechnicalDoc } from '../types';
import type { AdminLead, AdminState, WebsiteLeadInput } from './adminTypes';
import { supabase } from '../lib/supabase';

export const ADMIN_STORAGE_KEY = 'apex-admin-state-v1';

const formatDateTime = (date: Date) => date.toISOString().slice(0, 16);

export const createSeedState = (): AdminState => ({
  leads: [
    {
      id: 'lead-demo-001',
      createdAt: '2026-10-02T08:20',
      fullName: 'Nguyễn Minh Anh',
      phone: '09xx xxx 221',
      email: 'minhanh@example.com',
      company: 'Công ty Xây dựng Minh Thành',
      projectName: 'Nhà xưởng Bắc Thăng Long',
      projectLocation: 'Đông Anh, Hà Nội',
      productInterest: 'Cửa cuốn ngăn cháy',
      fireRating: 'EI90',
      source: 'Biểu mẫu website',
      message: 'Cần tư vấn khoảng mở lớn và tiến độ giao hàng.',
      status: 'new',
      priority: 'high',
      assignee: 'Chưa phân công',
      nextFollowUpAt: '2026-10-02T14:00',
      notes: '',
      consent: true,
    },
    {
      id: 'lead-demo-002',
      createdAt: '2026-10-01T15:40',
      fullName: 'Trần Hoàng Nam',
      phone: '09xx xxx 884',
      email: 'hoangnam@example.com',
      company: 'Ban QLDA An Phú',
      projectName: 'Chung cư An Phú',
      projectLocation: 'Nam Từ Liêm, Hà Nội',
      productInterest: 'Cửa thép ngăn cháy',
      fireRating: 'EI70',
      source: 'Hotline',
      message: 'Đang hoàn thiện hồ sơ mời thầu.',
      status: 'contacted',
      priority: 'medium',
      assignee: 'Nguyễn Việt Hùng',
      nextFollowUpAt: '2026-10-03T09:30',
      notes: 'Đã xin bản vẽ mặt bằng và thống kê cửa.',
      consent: true,
    },
    {
      id: 'lead-demo-003',
      createdAt: '2026-09-30T10:15',
      fullName: 'Lê Thu Hà',
      phone: '09xx xxx 116',
      email: 'thuha@example.com',
      company: 'Nội thất Hướng Dương',
      projectName: 'Khách sạn trung tâm',
      projectLocation: 'Hạ Long, Quảng Ninh',
      productInterest: 'Cửa kính ngăn cháy',
      fireRating: 'Theo cấu hình',
      source: 'Zalo',
      message: 'Ưu tiên thẩm mỹ và khả năng lấy sáng.',
      status: 'qualified',
      priority: 'medium',
      assignee: 'Phạm Minh Đức',
      nextFollowUpAt: '2026-10-04T10:00',
      notes: 'Hẹn khảo sát sau khi nhận hồ sơ kiến trúc.',
      consent: true,
    },
  ],
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
    status: 'published' as const,
    sortOrder: index + 1,
    seoTitle: `${product.name} | APEX Việt Nam`,
    seoDescription: product.description,
    imageAlt: `${product.name} APEX`,
    updatedAt: '2026-10-02T09:00',
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
    status: 'published' as const,
    sourceReference: 'Hồ sơ lưu nội bộ',
    verifiedBy: 'Phòng Kỹ thuật',
    verifiedAt: '2026-09-29T16:00',
    notes: 'Chỉ công bố thông tin sau khi đối chiếu bản gốc.',
  })),
  contents: [
    {
      id: 'content-home',
      type: 'page',
      title: 'Trang chủ',
      summary: 'Thông điệp thương hiệu, nhóm sản phẩm và giải pháp công trình.',
      status: 'published',
      publishAt: '2026-09-29T08:00',
      owner: 'Ban thương hiệu',
      featured: true,
      mediaApproved: true,
      clientApproved: true,
      updatedAt: '2026-10-01T11:20',
    },
    {
      id: 'content-project-template',
      type: 'project',
      title: 'Hồ sơ dự án mẫu - chờ dữ liệu xác thực',
      summary: 'Cần tên dự án, địa điểm, phạm vi cung cấp, ảnh và chấp thuận của khách hàng.',
      status: 'review',
      publishAt: '',
      owner: 'Kinh doanh',
      featured: false,
      mediaApproved: false,
      clientApproved: false,
      updatedAt: '2026-10-02T09:15',
    },
    {
      id: 'content-article-qcvn',
      type: 'article',
      title: 'Hướng dẫn lựa chọn cửa ngăn cháy theo hồ sơ công trình',
      summary: 'Nội dung chuyên môn cần phòng kỹ thuật duyệt trước khi xuất bản.',
      status: 'draft',
      publishAt: '',
      owner: 'Phòng Kỹ thuật',
      featured: false,
      mediaApproved: false,
      clientApproved: true,
      updatedAt: '2026-10-01T14:10',
    },
  ],
  company: {
    legalName: COMPANY_INFO.legalName,
    taxCode: '',
    brandName: 'APEX',
    representative: COMPANY_INFO.representative,
    representativeTitle: COMPANY_INFO.representativeTitle,
    hotline: COMPANY_INFO.hotlineDisplay,
    zalo: COMPANY_INFO.hotlineDisplay,
    email: '',
    responseTime: COMPANY_INFO.responseTime,
    serviceArea: COMPANY_INFO.serviceArea,
    addresses: COMPANY_INFO.addresses.map((item) => `${item.label}: ${item.value}`),
    defaultSeoTitle: 'APEX Việt Nam | Cửa và giải pháp ngăn cháy',
    defaultSeoDescription: 'Tư vấn, sản xuất và cung ứng cửa thép, cửa cuốn, cửa kính và rèm ngăn cháy cho công trình trên toàn quốc.',
  },
  activities: [
    { id: 'activity-003', at: '2026-10-02T09:15', actor: 'Ban nội dung', action: 'Chuyển sang chờ duyệt', target: 'Hồ sơ dự án mẫu' },
    { id: 'activity-002', at: '2026-10-02T08:30', actor: 'Nguyễn Việt Hùng', action: 'Phân công khách hàng', target: 'Ban QLDA An Phú' },
    { id: 'activity-001', at: '2026-10-01T16:05', actor: 'Phòng Kỹ thuật', action: 'Xác minh hồ sơ', target: 'Cửa thép ngăn cháy EI120' },
  ],
});

export const loadAdminState = (): AdminState => {
  if (typeof window === 'undefined') return createSeedState();
  try {
    const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdminState) : createSeedState();
  } catch {
    return createSeedState();
  }
};

export const saveAdminState = (state: AdminState) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event('apex-admin-data-change'));
  }
};

export const getLiveCompanyInfo = () => {
  const state = loadAdminState();
  const comp = state.company;

  const parsedAddresses = (comp?.addresses && comp.addresses.length > 0)
    ? comp.addresses.map((item, idx) => {
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
    taxCode: comp?.taxCode || '',
    representative: comp?.representative || COMPANY_INFO.representative,
    representativeTitle: comp?.representativeTitle || COMPANY_INFO.representativeTitle,
    hotlineDisplay: rawHotline,
    hotlineHref: `tel:${hotlineClean}`,
    zaloHref: comp?.zalo ? (comp.zalo.startsWith('http') ? comp.zalo : `https://zalo.me/${comp.zalo.replace(/[^\d+]/g, '')}`) : `https://zalo.me/${hotlineClean}`,
    responseTime: comp?.responseTime || COMPANY_INFO.responseTime,
    serviceArea: comp?.serviceArea || COMPANY_INFO.serviceArea,
    email: comp?.email || '',
    addresses: parsedAddresses,
    defaultSeoTitle: comp?.defaultSeoTitle,
    defaultSeoDescription: comp?.defaultSeoDescription,
  };
};

export const getLiveProducts = (): Product[] => {
  const state = loadAdminState();
  const publishedAdminProducts = state.products
    .filter((p) => p.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return publishedAdminProducts.map((ap) => {
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
        specs: {
          ...orig.specs,
          material: ap.material || orig.specs.material,
          standard: ap.standard || orig.specs.standard,
          warranty: ap.warranty || orig.specs.warranty,
        },
      };
    }
    return {
      id: ap.id,
      name: ap.name,
      category: ap.category as Product['category'],
      categoryName: ap.categoryName || 'Sản phẩm PCCC',
      fireRating: ap.fireRating || 'EI60-EI120',
      description: ap.shortDescription,
      longDescription: ap.shortDescription,
      specs: {
        material: ap.material || 'Thép mạ kẽm chất lượng cao',
        thickness: 'Theo hồ sơ công trình',
        insulation: 'Lõi chống cháy chuyên dụng',
        finish: 'Sơn tĩnh điện Jotun theo yêu cầu',
        standard: ap.standard || 'TCVN 9383:2012 / QCVN 06:2022',
        warranty: ap.warranty || '12-24 tháng',
      },
      features: ['Sản xuất theo kích thước khảo sát', 'Hồ sơ kiểm định PCCC đầy đủ', 'Bảo hành chính hãng APEX'],
      image: PRODUCTS[0]?.image || '',
      priceEstimate: 'Liên hệ',
      popular: ap.featured,
    };
  });
};

export const getLiveTechnicalDocs = (): TechnicalDoc[] => {
  const state = loadAdminState();
  const publishedDocs = state.documents.filter((d) => d.status === 'published');
  return publishedDocs.map((ad) => {
    const orig = TECHNICAL_DOCS.find((td) => td.id === ad.id);
    if (orig) {
      return {
        ...orig,
        title: ad.title,
        code: ad.code,
        standard: ad.standard || orig.standard,
        sourceOwner: ad.owner || orig.sourceOwner,
        scope: ad.scope || orig.scope,
      };
    }
    return {
      id: ad.id,
      title: ad.title,
      code: ad.code,
      category: 'certificate' as const,
      categoryLabel: ad.documentType || 'Chứng nhận kiểm định',
      updatedDate: ad.issuedDate || '2026',
      description: ad.notes || ad.scope || 'Hồ sơ kỹ thuật và kiểm định phòng cháy chữa cháy APEX.',
      standard: ad.standard,
      sourceOwner: ad.owner,
      scope: ad.scope,
    };
  });
};

export const useLiveData = () => {
  const [data, setData] = useState(() => ({
    company: getLiveCompanyInfo(),
    products: getLiveProducts(),
    documents: getLiveTechnicalDocs(),
  }));

  useEffect(() => {
    const refresh = () => {
      setData({
        company: getLiveCompanyInfo(),
        products: getLiveProducts(),
        documents: getLiveTechnicalDocs(),
      });
    };
    window.addEventListener('apex-admin-data-change', refresh);
    return () => window.removeEventListener('apex-admin-data-change', refresh);
  }, []);

  return data;
};

export const appendWebsiteLead = async (input: WebsiteLeadInput) => {
  if (supabase) {
    const { error } = await supabase.rpc('submit_lead', {
      p_full_name: input.fullName,
      p_phone: input.phone,
      p_email: input.email || null,
      p_topic: input.topic,
      p_message: input.message || null,
      p_consent: input.consent,
      p_website: input.website || '',
    });
    if (error) throw error;
    return;
  }

  const state = loadAdminState();
  const now = new Date();
  const lead: AdminLead = {
    id: `lead-${now.getTime()}`,
    createdAt: formatDateTime(now),
    fullName: input.fullName,
    phone: input.phone,
    email: input.email || '',
    company: '',
    projectName: '',
    projectLocation: '',
    productInterest: input.topic,
    fireRating: '',
    source: 'Biểu mẫu website',
    message: input.message || '',
    status: 'new',
    priority: 'medium',
    assignee: 'Chưa phân công',
    nextFollowUpAt: '',
    notes: '',
    consent: input.consent,
  };
  state.leads.unshift(lead);
  state.activities.unshift({
    id: `activity-${now.getTime()}`,
    at: formatDateTime(now),
    actor: 'Website',
    action: 'Tiếp nhận yêu cầu tư vấn',
    target: input.fullName,
  });
  saveAdminState(state);
  window.dispatchEvent(new Event('apex-admin-data-change'));
};
