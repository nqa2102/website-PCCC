import { createDefaultAdminCompany } from './adminData';
import type { AdminActivity, AdminContent, AdminDocument, AdminLead, AdminProduct, AdminProject, AdminState, AdminCompany } from './adminTypes';

const fetchJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Lỗi yêu cầu: ${res.statusText}`);
  }
  return res.json();
};

// Neon là nguồn dữ liệu duy nhất của trang quản trị: không trộn dữ liệu mẫu.
// Lỗi tải (chưa đăng nhập, mất kết nối DB) được ném ra để giao diện báo lỗi,
// tránh hiển thị danh sách trống rồi người dùng lưu đè lên dữ liệu thật.
export const loadRemoteAdminState = async (): Promise<AdminState> => {
  const [leadsRes, productsRes, projectsRes, documentsRes, contentsRes, companyRes, activitiesRes] = await Promise.all([
    fetchJson<LeadPage>('/api/leads'),
    fetchJson<{ products: AdminProduct[] }>('/api/admin/products'),
    fetchJson<{ projects: AdminProject[] }>('/api/admin/projects').catch(() => ({ projects: [] })),
    fetchJson<{ documents: AdminDocument[] }>('/api/admin/documents'),
    fetchJson<{ contents: AdminContent[] }>('/api/admin/contents'),
    fetchJson<{ company: AdminCompany | null }>('/api/admin/settings'),
    fetchJson<{ activities: AdminActivity[] }>('/api/admin/activities').catch(() => ({ activities: [] })),
  ]);

  return {
    leads: leadsRes.leads || [],
    leadsHasMore: Boolean(leadsRes.hasMore),
    leadsTotal: leadsRes.total ?? (leadsRes.leads || []).length,
    products: productsRes.products || [],
    projects: projectsRes.projects || [],
    documents: documentsRes.documents || [],
    contents: contentsRes.contents || [],
    // Chưa có bản ghi cấu hình: điền sẵn thông tin doanh nghiệp đã xác minh để admin lưu lần đầu
    company: companyRes.company || createDefaultAdminCompany(),
    activities: activitiesRes.activities || [],
  };
};

interface LeadPage {
  leads: AdminLead[];
  hasMore?: boolean;
  total?: number;
}

// Tải trang tiếp theo, sau khách hàng cũ nhất đang hiển thị
export const loadMoreLeads = (oldest: AdminLead) =>
  fetchJson<LeadPage>(`/api/leads?before=${encodeURIComponent(oldest.createdAt)}&beforeId=${encodeURIComponent(oldest.id)}`);

// Mỗi thao tác chỉ ghi đúng bản ghi được sửa, không gửi lại toàn bộ danh sách
export const saveRemoteLead = (item: AdminLead) =>
  fetchJson('/api/leads', { method: 'PUT', body: JSON.stringify(item) });

export const saveRemoteProduct = (item: AdminProduct) =>
  fetchJson('/api/admin/products', { method: 'POST', body: JSON.stringify(item) });

export const saveRemoteProject = (item: AdminProject) =>
  fetchJson('/api/admin/projects', { method: 'POST', body: JSON.stringify(item) });

export const saveRemoteDocument = (item: AdminDocument) =>
  fetchJson('/api/admin/documents', { method: 'POST', body: JSON.stringify(item) });

export const saveRemoteContent = (item: AdminContent) =>
  fetchJson('/api/admin/contents', { method: 'POST', body: JSON.stringify(item) });

export const saveRemoteCompany = (company: AdminCompany) =>
  fetchJson('/api/admin/settings', { method: 'POST', body: JSON.stringify(company) });

// Nhật ký chỉ mang tính tham khảo: lỗi ghi nhật ký không được chặn thao tác chính
export const logRemoteActivity = (activity: Pick<AdminActivity, 'actor' | 'action' | 'target'>) =>
  fetchJson('/api/admin/activities', { method: 'POST', body: JSON.stringify(activity) }).catch((err) => {
    console.warn('Không thể ghi nhật ký hoạt động:', err);
  });

export const deleteRemoteLead = async (id: string) => {
  await fetchJson(`/api/leads?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
};

export const deleteRemoteProduct = async (id: string) => {
  await fetchJson(`/api/admin/products?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
};

export const deleteRemoteProject = async (id: string) => {
  await fetchJson(`/api/admin/projects?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
};

export const deleteRemoteDocument = async (id: string) => {
  await fetchJson(`/api/admin/documents?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
};

export const deleteRemoteContent = async (id: string) => {
  await fetchJson(`/api/admin/contents?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
};
