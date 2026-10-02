import { COMPANY_INFO } from '../data/companyData';
import { PRODUCTS, TECHNICAL_DOCS } from '../data/mockData';
import type { AdminLead, AdminState, WebsiteLeadInput } from './adminTypes';

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
  window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(state));
};

export const appendWebsiteLead = (input: WebsiteLeadInput) => {
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
