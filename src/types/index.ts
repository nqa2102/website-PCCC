export interface Product {
  id: string;
  name: string;
  category: 'steel-door' | 'roller-shutter' | 'fire-curtain' | 'accessories' | 'glass-door';
  categoryName: string;
  fireRating: string;
  description: string;
  longDescription: string;
  specs: {
    material: string;
    thickness: string;
    insulation: string;
    finish: string;
    standard: string;
    warranty: string;
  };
  features: string[];
  image: string;
  priceEstimate: string;
  popular?: boolean;
}

export interface Solution {
  id: string;
  title: string;
  slug: string;
  icon: string;
  tagline: string;
  description: string;
  challenges: string[];
  recommendedProducts: string[];
  standards: string[];
  caseStudy: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'commercial' | 'residential' | 'industrial' | 'healthcare';
  categoryLabel: string;
  location: string;
  scale: string;
  itemsSupplied: string;
  year: string;
  image: string;
  description: string;
  client: string;
}

export interface TechnicalDoc {
  id: string;
  title: string;
  code: string;
  category: 'regulation' | 'catalog' | 'cad' | 'certificate';
  categoryLabel: string;
  updatedDate: string;
  description: string;
  productGroup?: 'steel-door' | 'roller-shutter' | 'fire-curtain';
  standard?: string;
  sourceOwner?: string;
  documentType?: string;
  scope?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  summary: string;
  content: string[];
  image: string;
  readTime: string;
}

export interface QuoteRequest {
  productType: string;
  fireRating: string;
  doorLeafType: '1-leaf' | '2-leaf-equal' | '2-leaf-unequal' | 'custom';
  widthMm: number;
  heightMm: number;
  quantity: number;
  hasVisionGlass: boolean;
  hasPanicBar: boolean;
  hasDoorCloser: boolean;
  fullName: string;
  phone: string;
  email: string;
  company?: string;
  projectLocation: string;
  notes?: string;
}
