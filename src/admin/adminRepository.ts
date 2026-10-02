import { supabase } from '../lib/supabase';
import { createSeedState } from './adminData';
import type { AdminState } from './adminTypes';

const emptyRemoteState = (): AdminState => {
  const seed = createSeedState();
  return { ...seed, leads: [], activities: [] };
};

const ensureClient = () => {
  if (!supabase) throw new Error('Supabase chưa được cấu hình.');
  return supabase;
};

export const loadRemoteAdminState = async (): Promise<AdminState> => {
  const client = ensureClient();
  const [leads, products, documents, contents, company, activities] = await Promise.all([
    client.from('leads').select('*').order('created_at', { ascending: false }),
    client.from('products').select('*').order('sort_order'),
    client.from('documents').select('*').order('title'),
    client.from('contents').select('*').order('updated_at', { ascending: false }),
    client.from('company_settings').select('*').eq('id', 'apex').maybeSingle(),
    client.from('activities').select('*').order('created_at', { ascending: false }).limit(30),
  ]);

  const error = [leads.error, products.error, documents.error, contents.error, company.error, activities.error].find(Boolean);
  if (error) throw error;

  const fallback = emptyRemoteState();
  return {
    leads: (leads.data || []).map((item) => ({
      id: item.id,
      createdAt: item.created_at,
      fullName: item.full_name,
      phone: item.phone,
      email: item.email || '',
      company: item.company || '',
      projectName: item.project_name || '',
      projectLocation: item.project_location || '',
      productInterest: item.product_interest || '',
      fireRating: item.fire_rating || '',
      source: item.source,
      message: item.message || '',
      status: item.status,
      priority: item.priority,
      assignee: item.assignee || 'Chưa phân công',
      nextFollowUpAt: item.next_follow_up_at || '',
      notes: item.notes || '',
      consent: item.consent,
    })),
    products: products.data?.length ? products.data.map((item) => ({
      id: item.id, name: item.name, slug: item.slug, category: item.category, categoryName: item.category_name,
      fireRating: item.fire_rating || '', shortDescription: item.short_description || '', material: item.material || '',
      standard: item.standard || '', warranty: item.warranty || '', featured: item.featured, status: item.status,
      sortOrder: item.sort_order, seoTitle: item.seo_title || '', seoDescription: item.seo_description || '',
      imageAlt: item.image_alt || '', updatedAt: item.updated_at,
    })) : fallback.products,
    documents: documents.data?.length ? documents.data.map((item) => ({
      id: item.id, title: item.title, code: item.code, documentType: item.document_type || '', productGroup: item.product_group || '',
      standard: item.standard || '', owner: item.owner || '', scope: item.scope || '', issuedDate: item.issued_date || '',
      expiryDate: item.expiry_date || '', status: item.status, sourceReference: item.source_reference || '',
      verifiedBy: item.verified_by || '', verifiedAt: item.verified_at || '', notes: item.notes || '',
    })) : fallback.documents,
    contents: contents.data?.length ? contents.data.map((item) => ({
      id: item.id, type: item.type, title: item.title, summary: item.summary || '', status: item.status,
      publishAt: item.publish_at || '', owner: item.owner || '', featured: item.featured,
      mediaApproved: item.media_approved, clientApproved: item.client_approved, updatedAt: item.updated_at,
    })) : fallback.contents,
    company: company.data ? {
      legalName: company.data.legal_name || '', taxCode: company.data.tax_code || '', brandName: company.data.brand_name || '',
      representative: company.data.representative || '', representativeTitle: company.data.representative_title || '',
      hotline: company.data.hotline || '', zalo: company.data.zalo || '', email: company.data.email || '',
      responseTime: company.data.response_time || '', serviceArea: company.data.service_area || '',
      addresses: company.data.addresses || [], defaultSeoTitle: company.data.default_seo_title || '',
      defaultSeoDescription: company.data.default_seo_description || '',
    } : fallback.company,
    activities: (activities.data || []).map((item) => ({
      id: item.id, at: item.created_at, actor: item.actor, action: item.action, target: item.target,
    })),
  };
};

export type AdminSaveScope = 'lead' | 'product' | 'document' | 'content' | 'company' | 'all';

export const saveRemoteAdminState = async (state: AdminState, scope: AdminSaveScope) => {
  const client = ensureClient();
  const operations: PromiseLike<{ error: unknown }>[] = [];

  if (scope === 'lead' || scope === 'all') operations.push(client.from('leads').upsert(state.leads.map((item) => ({
      id: item.id, created_at: item.createdAt, full_name: item.fullName, phone: item.phone, email: item.email || null,
      company: item.company || null, project_name: item.projectName || null, project_location: item.projectLocation || null,
      product_interest: item.productInterest || null, fire_rating: item.fireRating || null, source: item.source,
      message: item.message || null, status: item.status, priority: item.priority, assignee: item.assignee || null,
      next_follow_up_at: item.nextFollowUpAt || null, notes: item.notes || null, consent: item.consent,
    }))));
  if (scope === 'product' || scope === 'all') operations.push(client.from('products').upsert(state.products.map((item) => ({
      id: item.id, name: item.name, slug: item.slug, category: item.category, category_name: item.categoryName,
      fire_rating: item.fireRating || null, short_description: item.shortDescription || null, material: item.material || null,
      standard: item.standard || null, warranty: item.warranty || null, featured: item.featured, status: item.status,
      sort_order: item.sortOrder, seo_title: item.seoTitle || null, seo_description: item.seoDescription || null,
      image_alt: item.imageAlt || null, updated_at: item.updatedAt,
    }))));
  if (scope === 'document' || scope === 'all') operations.push(client.from('documents').upsert(state.documents.map((item) => ({
      id: item.id, title: item.title, code: item.code, document_type: item.documentType || null,
      product_group: item.productGroup || null, standard: item.standard || null, owner: item.owner || null,
      scope: item.scope || null, issued_date: item.issuedDate || null, expiry_date: item.expiryDate || null,
      status: item.status, source_reference: item.sourceReference || null, verified_by: item.verifiedBy || null,
      verified_at: item.verifiedAt || null, notes: item.notes || null,
    }))));
  if (scope === 'content' || scope === 'all') operations.push(client.from('contents').upsert(state.contents.map((item) => ({
      id: item.id, type: item.type, title: item.title, summary: item.summary || null, status: item.status,
      publish_at: item.publishAt || null, owner: item.owner || null, featured: item.featured,
      media_approved: item.mediaApproved, client_approved: item.clientApproved, updated_at: item.updatedAt,
    }))));
  if (scope === 'company' || scope === 'all') operations.push(client.from('company_settings').upsert({
      id: 'apex', legal_name: state.company.legalName, tax_code: state.company.taxCode || null,
      brand_name: state.company.brandName, representative: state.company.representative,
      representative_title: state.company.representativeTitle, hotline: state.company.hotline,
      zalo: state.company.zalo, email: state.company.email || null, response_time: state.company.responseTime,
      service_area: state.company.serviceArea, addresses: state.company.addresses,
      default_seo_title: state.company.defaultSeoTitle, default_seo_description: state.company.defaultSeoDescription,
    }));
  if (state.activities.length) operations.push(client.from('activities').upsert(state.activities.map((item) => ({
      id: item.id, created_at: item.at, actor: item.actor, action: item.action, target: item.target,
    }))));
  const results = await Promise.all(operations);
  const error = results.map((result) => result.error).find(Boolean);
  if (error) throw error;
};
