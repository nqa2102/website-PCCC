export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed' | 'lost';
export type Priority = 'high' | 'medium' | 'low';
export type PublishStatus = 'draft' | 'review' | 'published' | 'internal';

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
  category: string;
  categoryName: string;
  fireRating: string;
  shortDescription: string;
  material: string;
  standard: string;
  warranty: string;
  featured: boolean;
  status: PublishStatus;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
  imageAlt: string;
  updatedAt: string;
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
  products: AdminProduct[];
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
}
