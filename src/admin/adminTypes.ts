export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed' | 'lost';
export type Priority = 'high' | 'medium' | 'low';
export type PublishStatus = 'draft' | 'review' | 'published' | 'internal';

export type ProductCategory =
  | 'cua-thep-ngan-chay'
  | 'cua-thep-van-go'
  | 'cua-kinh-ngan-chay'
  | 'cua-cuon-ngan-chay'
  | 'rem-ngan-chay'
  | 'tu-dien'
  | 'thang-mang-cap'
  | 'tu-rack'
  | 'nha-tram-shelter'
  | 'tu-nguon-outdoor';

export interface AdminLead {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  company: string;
  projectName: string;
  projectLocation: string;
  productInterest: string;
  fireRating: string;
  source: string;
  message: string;
  status: LeadStatus;
  priority: Priority;
  assignee: string;
  nextFollowUpAt: string;
  notes: string;
  consent: boolean;
}

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory | string;
  categoryName: string;
  fireRating?: string;
  certificationNo?: string;
  shortDescription: string;
  material: string;
  standard: string;
  warranty: string;
  specs?: Record<string, string>;
  features?: string[];
  longDescription?: string;
  featured: boolean;
  status: PublishStatus;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
  imageAlt: string;
  image?: string;
  gallery?: string[];
  projectImages?: string[];
  priceEstimate?: string;
  updatedAt: string;
}

export interface AdminProject {
  id: string;
  title: string;
  slug: string;
  clientName?: string;
  generalContractor?: string;
  apexRole?: string;
  category?: ProductCategory | string;
  location?: string;
  completedYear?: number;
  description: string;
  coverImage?: string;
  gallery: string[];
  status: PublishStatus;
  verified: boolean;
  verifiedNote?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminDocument {
  id: string;
  title: string;
  code: string;
  documentType: string;
  productGroup: string;
  standard: string;
  owner: string;
  scope: string;
  issuedDate: string;
  expiryDate: string;
  status: PublishStatus;
  sourceReference: string;
  verifiedBy: string;
  verifiedAt: string;
  notes: string;
  fileUrl?: string;
}

export interface AdminContent {
  id: string;
  type: 'project' | 'article' | 'page';
  title: string;
  summary: string;
  status: PublishStatus;
  publishAt: string;
  owner: string;
  featured: boolean;
  mediaApproved: boolean;
  clientApproved: boolean;
  updatedAt: string;
  category?: string;
  location?: string;
  scale?: string;
  itemsSupplied?: string;
  year?: string;
  client?: string;
  image?: string;
  author?: string;
  readTime?: string;
  content?: string[];
}

export interface AdminCompany {
  legalName: string;
  taxCode: string;
  brandName: string;
  representative: string;
  representativeTitle: string;
  hotline: string;
  zalo: string;
  email: string;
  responseTime: string;
  serviceArea: string;
  addresses: string[];
  defaultSeoTitle: string;
  defaultSeoDescription: string;
}

export interface AdminActivity {
  id: string;
  at: string;
  actor: string;
  action: string;
  target: string;
}

export interface AdminState {
  leads: AdminLead[];
  // Danh sách khách hàng được tải theo trang
  leadsHasMore?: boolean;
  leadsTotal?: number;
  products: AdminProduct[];
  projects?: AdminProject[];
  documents: AdminDocument[];
  contents: AdminContent[];
  company: AdminCompany;
  activities: AdminActivity[];
}

export interface WebsiteLeadInput {
  fullName: string;
  phone: string;
  email?: string;
  topic: string;
  message?: string;
  consent: boolean;
  website?: string;
  formName?: 'quote' | 'contact';
  // Các trường lưu tách riêng (form báo giá)
  productInterest?: string;
  fireRating?: string;
  projectLocation?: string;
  company?: string;
}
