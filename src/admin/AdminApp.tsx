import React, { useEffect, useMemo, useState } from 'react';
import { upload } from '@vercel/blob/client';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BookOpenCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  Download,
  ExternalLink,
  FileBadge2,
  FileText,
  Flame,
  FolderKanban,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  Package,
  Phone,
  PhoneCall,
  Plus,
  RefreshCcw,
  RefreshCw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  Upload,
  UsersRound,
  X,
  Zap,
} from 'lucide-react';
import { createDefaultAdminCompany, createInitialCatalog } from './adminData';
import { ApexAvatar, ApexBrandLogo } from '../components/brand';
import {
  loadRemoteAdminState,
  saveRemoteLead,
  saveRemoteProduct,
  saveRemoteDocument,
  saveRemoteContent,
  saveRemoteCompany,
  logRemoteActivity,
  deleteRemoteLead,
  deleteRemoteProduct,
  deleteRemoteDocument,
  deleteRemoteContent,
} from './adminRepository';
import type {
  AdminContent,
  AdminDocument,
  AdminLead,
  AdminProduct,
  AdminState,
  LeadStatus,
  Priority,
  PublishStatus,
} from './adminTypes';

type AdminView = 'dashboard' | 'leads' | 'products' | 'documents' | 'content' | 'settings';
type EditorState =
  | { type: 'lead'; data: AdminLead }
  | { type: 'product'; data: AdminProduct }
  | { type: 'document'; data: AdminDocument }
  | { type: 'content'; data: AdminContent }
  | null;

interface AdminAppProps {
  onExit: () => void;
  userEmail?: string;
  userRole?: string;
  onSignOut?: () => void;
}

const NAV_ITEMS: { id: AdminView; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
  { id: 'leads', label: 'Khách cần tư vấn', icon: UsersRound },
  { id: 'products', label: 'Sản phẩm', icon: Package },
  { id: 'documents', label: 'Hồ sơ kỹ thuật', icon: FileBadge2 },
  { id: 'content', label: 'Nội dung & dự án', icon: FolderKanban },
  { id: 'settings', label: 'Doanh nghiệp & quyền', icon: Settings },
];

const LEAD_STATUS: Record<LeadStatus, { label: string; classes: string }> = {
  new: { label: 'Mới', classes: 'bg-red-50 text-red-700 border-red-200' },
  contacted: { label: 'Đã liên hệ', classes: 'bg-blue-50 text-blue-700 border-blue-200' },
  qualified: { label: 'Đủ điều kiện', classes: 'bg-amber-50 text-amber-800 border-amber-200' },
  closed: { label: 'Hoàn tất', classes: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  lost: { label: 'Không tiếp tục', classes: 'bg-neutral-100 text-slate-600 border-neutral-200' },
};

const PUBLISH_STATUS: Record<PublishStatus, { label: string; classes: string }> = {
  draft: { label: 'Bản nháp', classes: 'bg-neutral-100 text-slate-700 border-neutral-200' },
  review: { label: 'Chờ duyệt', classes: 'bg-amber-50 text-amber-800 border-amber-200' },
  published: { label: 'Đã công bố', classes: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  internal: { label: 'Nội bộ', classes: 'bg-blue-50 text-blue-700 border-blue-200' },
};

const PRODUCT_CATEGORY_CHOICES = [
  { id: 'steel-door', name: 'Cửa thép ngăn cháy' },
  { id: 'glass-door', name: 'Cửa kính ngăn cháy' },
  { id: 'roller-shutter', name: 'Cửa cuốn ngăn cháy' },
  { id: 'fire-curtain', name: 'Rèm ngăn cháy/khói' },
  { id: 'accessories', name: 'Phụ kiện chống cháy' },
];

const DOC_GROUP_CHOICES = [
  { id: 'all', label: 'Áp dụng chung toàn bộ' },
  { id: 'steel-door', label: 'Cửa thép ngăn cháy' },
  { id: 'roller-shutter', label: 'Cửa cuốn ngăn cháy' },
  { id: 'fire-curtain', label: 'Rèm ngăn cháy' },
  { id: 'glass-door', label: 'Cửa kính ngăn cháy' },
  { id: 'general', label: 'Quy chuẩn & Tiêu chuẩn ngành' },
];

const DOC_TYPE_CHOICES = [
  'Giấy chứng nhận kiểm định',
  'Biên bản thử nghiệm chịu lửa',
  'Quy chuẩn & Tiêu chuẩn ngành',
  'Catalog & Bản vẽ kỹ thuật CAD',
  'Hồ sơ năng lực & Pháp lý',
];

const fieldClass = 'mt-1 h-10 w-full border border-neutral-300 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-red-600 focus:ring-1 focus:ring-red-600';
const textareaClass = 'mt-1 min-h-24 w-full resize-y border border-neutral-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-red-600 focus:ring-1 focus:ring-red-600';

const localDate = (value?: string) => {
  if (!value) return 'Chưa đặt';
  // pure date YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split('-');
    return `${d}/${m}/${y}`;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
};

const toInputDateTime = (value?: string) => {
  if (!value) return '';
  return value.slice(0, 16);
};

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const Badge = ({ label, classes }: { label: string; classes: string }) => (
  <span className={`inline-flex min-h-6 items-center border px-2 text-[11px] font-semibold ${classes}`}>{label}</span>
);

const SectionHeading = ({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) => (
  <div className="flex flex-col gap-3 border-b border-neutral-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
    <div>
      <h2 className="text-base font-bold text-slate-950">{title}</h2>
      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
    </div>
    {action}
  </div>
);

const EmptyState = ({ label }: { label: string }) => (
  <div className="px-6 py-14 text-center text-sm text-slate-500">Không tìm thấy {label} phù hợp.</div>
);

const createEmptyState = (): AdminState => ({
  leads: [],
  products: [],
  documents: [],
  contents: [],
  company: createDefaultAdminCompany(),
  activities: [],
});

const errorMessage = (err: unknown, fallback: string) => (err instanceof Error && err.message ? err.message : fallback);

export const AdminApp: React.FC<AdminAppProps> = ({ onExit, userEmail = '', userRole = 'admin', onSignOut }) => {
  const [state, setState] = useState<AdminState>(createEmptyState);
  const [view, setView] = useState<AdminView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [editor, setEditor] = useState<EditorState>(null);
  const [toast, setToast] = useState('');
  const [remoteLoading, setRemoteLoading] = useState(true);
  const [remoteError, setRemoteError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const effectiveRole = userRole;
  // Khớp với API: chỉ Quản trị viên được xóa và công bố
  const isAdmin = userRole === 'admin';
  const requestDelete = (target: { type: 'lead' | 'product' | 'document' | 'content'; id: string; name: string }) => {
    if (!isAdmin) {
      setToast('Chỉ Quản trị viên được xóa dữ liệu.');
      return;
    }
    setConfirmDelete(target);
  };

  // Deletion Confirmation modal state
  const [confirmDelete, setConfirmDelete] = useState<{
    type: 'lead' | 'product' | 'document' | 'content';
    id: string;
    name: string;
  } | null>(null);

  const permittedViews: Record<string, AdminView[]> = {
    admin: ['dashboard', 'leads', 'products', 'documents', 'content', 'settings'],
    sales: ['dashboard', 'leads'],
    editor: ['dashboard', 'products', 'content'],
    technical: ['dashboard', 'products', 'documents'],
  };
  const availableViews = permittedViews[effectiveRole] || ['dashboard'];
  const availableNavItems = NAV_ITEMS.filter((item) => availableViews.includes(item.id));

  const navigateView = (next: AdminView) => {
    if (availableViews.includes(next)) setView(next);
  };

  useEffect(() => {
    let active = true;
    loadRemoteAdminState()
      .then((next) => { if (active) setState(next); })
      .catch((err) => {
        if (active) setRemoteError(`Không thể tải dữ liệu Neon Database: ${errorMessage(err, 'lỗi không xác định')}. Không thực hiện chỉnh sửa cho tới khi tải lại thành công.`);
      })
      .finally(() => { if (active) setRemoteLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    setSearch('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setSidebarOpen(false);
  }, [view]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 2500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const next = await loadRemoteAdminState();
      setState(next);
      setRemoteError('');
      setToast('Đã đồng bộ dữ liệu mới nhất từ Neon Database.');
    } catch (err) {
      setToast(`Lỗi khi làm mới dữ liệu: ${errorMessage(err, 'không xác định')}`);
    } finally {
      setRefreshing(false);
    }
  };

  const recordActivity = (current: AdminState, action: string, target: string): AdminState => {
    const actor = userEmail || 'Quản trị viên';
    logRemoteActivity({ actor, action, target });
    return {
      ...current,
      activities: [
        { id: `activity-${Date.now()}`, at: new Date().toISOString().slice(0, 16), actor, action, target },
        ...current.activities,
      ].slice(0, 30),
    };
  };

  // Ghi đúng một bản ghi lên Neon; chỉ cập nhật giao diện khi máy chủ xác nhận thành công
  const persist = async (next: AdminState, action: string, target: string, save: () => Promise<unknown>) => {
    try {
      await save();
    } catch (err) {
      setRemoteError(`Không thể lưu thay đổi: ${errorMessage(err, 'lỗi không xác định')}`);
      throw err;
    }
    setRemoteError('');
    setState(recordActivity(next, action, target));
  };

  const upsert = <T extends { id: string }>(items: T[], item: T, prepend = true) =>
    items.some((existing) => existing.id === item.id)
      ? items.map((existing) => (existing.id === item.id ? item : existing))
      : prepend ? [item, ...items] : [...items, item];

  const saveEditor = async () => {
    if (!editor) return;
    const now = new Date().toISOString().slice(0, 16);
    try {
      if (editor.type === 'lead') {
        const data = editor.data;
        await persist({ ...state, leads: upsert(state.leads, data) }, 'Cập nhật khách hàng', data.fullName, () => saveRemoteLead(data));
      }
      if (editor.type === 'product') {
        const data = { ...editor.data, updatedAt: now };
        await persist({ ...state, products: upsert(state.products, data, false) }, 'Cập nhật sản phẩm', data.name, () => saveRemoteProduct(data));
      }
      if (editor.type === 'document') {
        const data = editor.data;
        await persist({ ...state, documents: upsert(state.documents, data) }, 'Cập nhật hồ sơ', data.title, () => saveRemoteDocument(data));
      }
      if (editor.type === 'content') {
        const data = { ...editor.data, updatedAt: now };
        await persist({ ...state, contents: upsert(state.contents, data) }, 'Cập nhật nội dung', data.title, () => saveRemoteContent(data));
      }
    } catch {
      setToast('Chưa lưu được thay đổi. Vui lòng kiểm tra thông báo lỗi.');
      return;
    }
    setEditor(null);
    setToast('Đã lưu thay đổi vào Neon Database.');
  };

  // Nhập danh mục ban đầu (sản phẩm, hồ sơ, bài viết) ở trạng thái nháp, bỏ qua mục đã có
  const handleImportCatalog = async () => {
    const catalog = createInitialCatalog();
    const products = catalog.products.filter((item) => !state.products.some((p) => p.id === item.id || p.slug === item.slug));
    const documents = catalog.documents.filter((item) => !state.documents.some((d) => d.id === item.id));
    const contents = catalog.contents.filter((item) => !state.contents.some((c) => c.id === item.id));
    const total = products.length + documents.length + contents.length;
    if (!total) {
      setToast('Danh mục ban đầu đã có đầy đủ trong Neon Database.');
      return;
    }
    if (!window.confirm(`Nhập ${total} mục (${products.length} sản phẩm, ${documents.length} hồ sơ, ${contents.length} bài viết) vào Neon ở trạng thái NHÁP?\nCác mục chỉ hiển thị trên website sau khi được rà soát và chuyển sang "Đã công bố".`)) return;
    try {
      await Promise.all([
        ...products.map((item) => saveRemoteProduct(item)),
        ...documents.map((item) => saveRemoteDocument(item)),
        ...contents.map((item) => saveRemoteContent(item)),
      ]);
      setState(recordActivity({
        ...state,
        products: [...state.products, ...products],
        documents: [...documents, ...state.documents],
        contents: [...contents, ...state.contents],
      }, 'Nhập danh mục ban đầu (nháp)', `${total} mục`));
      setToast(`Đã nhập ${total} mục ở trạng thái nháp.`);
    } catch (err) {
      setRemoteError(`Nhập danh mục chưa hoàn tất: ${errorMessage(err, 'lỗi không xác định')}. Bấm "Làm mới" để xem dữ liệu đã lưu.`);
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!confirmDelete) return;
    const { type, id, name } = confirmDelete;
    try {
      if (type === 'lead') await deleteRemoteLead(id);
      else if (type === 'product') await deleteRemoteProduct(id);
      else if (type === 'document') await deleteRemoteDocument(id);
      else if (type === 'content') await deleteRemoteContent(id);
      const nextState = { ...state };
      if (type === 'lead') nextState.leads = state.leads.filter((l) => l.id !== id);
      else if (type === 'product') nextState.products = state.products.filter((p) => p.id !== id);
      else if (type === 'document') nextState.documents = state.documents.filter((d) => d.id !== id);
      else if (type === 'content') nextState.contents = state.contents.filter((c) => c.id !== id);

      setState(recordActivity(nextState, 'Xóa bản ghi', name));
      setToast(`Đã xóa thành công: ${name}`);
    } catch {
      setToast('Không thể xóa mục này. Vui lòng kiểm tra quyền hạn.');
    } finally {
      setConfirmDelete(null);
      if (editor && editor.data.id === id) setEditor(null);
    }
  };

  const handleUpdateLeadStatus = async (lead: AdminLead, nextStatus: LeadStatus) => {
    const updatedLead: AdminLead = { ...lead, status: nextStatus };
    try {
      await persist(
        { ...state, leads: state.leads.map((l) => (l.id === lead.id ? updatedLead : l)) },
        `Đổi trạng thái: ${LEAD_STATUS[nextStatus]?.label || nextStatus}`,
        lead.fullName,
        () => saveRemoteLead(updatedLead),
      );
      setToast(`Đã chuyển trạng thái ${lead.fullName} -> ${LEAD_STATUS[nextStatus]?.label}`);
    } catch {
      setToast('Không thể cập nhật trạng thái.');
    }
  };

  const exportLeadsToCsv = () => {
    if (!state.leads.length) {
      alert('Không có dữ liệu khách hàng để xuất.');
      return;
    }
    const headers = [
      'Mã yêu cầu',
      'Thời gian gửi',
      'Họ và tên',
      'Số điện thoại',
      'Email',
      'Công ty',
      'Tên công trình',
      'Địa điểm',
      'Sản phẩm quan tâm',
      'Chỉ số chịu lửa',
      'Nguồn tiếp nhận',
      'Trạng thái',
      'Mức ưu tiên',
      'Người phụ trách',
      'Lịch liên hệ tiếp',
      'Nội dung tin nhắn',
      'Ghi chú nội bộ'
    ];

    const rows = state.leads.map((l) => [
      `"${l.id}"`,
      `"${l.createdAt}"`,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.projectName || '').replace(/"/g, '""')}"`,
      `"${(l.projectLocation || '').replace(/"/g, '""')}"`,
      `"${(l.productInterest || '').replace(/"/g, '""')}"`,
      `"${(l.fireRating || '').replace(/"/g, '""')}"`,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      `"${LEAD_STATUS[l.status]?.label || l.status}"`,
      `"${l.priority === 'high' ? 'Cao' : l.priority === 'low' ? 'Thấp' : 'Trung bình'}"`,
      `"${(l.assignee || '').replace(/"/g, '""')}"`,
      `"${(l.nextFollowUpAt || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${(l.notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `APEX_KhachHang_PCCC_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setToast('Đã xuất file Excel/CSV thành công.');
  };

  const navLabel = NAV_ITEMS.find((item) => item.id === view)?.label || 'Quản trị';

  const filteredLeads = useMemo(() => state.leads.filter((lead) => {
    const matchesSearch = `${lead.fullName} ${lead.phone} ${lead.company} ${lead.projectName} ${lead.productInterest}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  }), [search, state.leads, statusFilter, priorityFilter]);

  const filteredProducts = useMemo(() => state.products.filter((product) => {
    const matchesSearch = `${product.name} ${product.categoryName} ${product.fireRating} ${product.slug}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (statusFilter === 'all' || product.status === statusFilter);
  }), [search, state.products, statusFilter]);

  const filteredDocuments = useMemo(() => state.documents.filter((document) => {
    const matchesSearch = `${document.title} ${document.code} ${document.standard} ${document.owner} ${document.productGroup}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (statusFilter === 'all' || document.status === statusFilter);
  }), [search, state.documents, statusFilter]);

  const filteredContents = useMemo(() => state.contents.filter((content) => {
    const matchesSearch = `${content.title} ${content.type} ${content.owner} ${content.summary}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (statusFilter === 'all' || content.status === statusFilter);
  }), [search, state.contents, statusFilter]);

  if (remoteLoading) return <div className="flex min-h-screen items-center justify-center gap-3 bg-[#f3f5f4] text-sm font-semibold text-slate-700"><LoaderCircle className="h-5 w-5 animate-spin text-red-700" />Đang tải trung tâm dữ liệu APEX...</div>;

  return (
    <div className="min-h-screen bg-[#f5f6f7] font-sans text-slate-900 selection:bg-red-600 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-[#102b21] text-white transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <button onClick={() => setView('dashboard')} className="flex items-center gap-3 text-left">
            <ApexAvatar size={36} theme="dark-gold" />
            <div>
              <strong className="block text-sm tracking-wide text-white">APEX ADMIN</strong>
              <span className="block text-[10px] text-emerald-100/70">Trung tâm vận hành website</span>
            </div>
          </button>
          <button onClick={() => setSidebarOpen(false)} className="flex h-10 w-10 items-center justify-center text-emerald-50 lg:hidden" aria-label="Đóng menu"><X className="h-5 w-5" /></button>
        </div>

        <nav className="px-3 py-5" aria-label="Điều hướng quản trị">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase text-emerald-100/50">Điều hành</p>
          <div className="space-y-1">
            {availableNavItems.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button key={item.id} onClick={() => navigateView(item.id)} className={`flex min-h-11 w-full items-center gap-3 px-3 text-left text-sm transition-colors ${active ? 'bg-white text-slate-950 font-bold' : 'text-emerald-50/80 hover:bg-white/10 hover:text-white'}`}>
                  <Icon className={`h-4 w-4 ${active ? 'text-red-600' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.id === 'leads' && state.leads.filter((lead) => lead.status === 'new').length > 0 && <span className="ml-auto bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white rounded-full">{state.leads.filter((lead) => lead.status === 'new').length}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer info */}
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 px-2">
            <span className="flex h-9 w-9 items-center justify-center border border-white/15 bg-white/5"><CircleUserRound className="h-4 w-4" /></span>
            <span className="min-w-0 flex-1">
              <strong className="block truncate text-xs">{userEmail || 'Quản trị viên APEX'}</strong>
              <span className="text-[10px] text-emerald-100/60 block truncate">
                {`Neon DB · ${userRole}`}
              </span>
            </span>
          </div>

          {onSignOut && <button onClick={onSignOut} className="mb-2 flex min-h-10 w-full items-center justify-center gap-2 border border-white/15 text-xs font-semibold text-white transition-colors hover:bg-white/10"><LogOut className="h-4 w-4" />Đăng xuất</button>}
          <button onClick={onExit} className="flex min-h-10 w-full items-center justify-center gap-2 border border-white/15 text-xs font-semibold text-white transition-colors hover:bg-white/10"><ArrowLeft className="h-4 w-4" />Xem website khách hàng</button>
        </div>
      </aside>

      {sidebarOpen && <button className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Đóng lớp menu" />}

      {/* Main Container */}
      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="flex h-10 w-10 items-center justify-center border border-neutral-200 lg:hidden" aria-label="Mở menu"><Menu className="h-5 w-5" /></button>
            <div><p className="text-[10px] font-bold uppercase text-red-700">Không gian nội bộ</p><h1 className="text-sm font-bold text-slate-950 sm:text-base">{navLabel}</h1></div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-neutral-50 transition-colors disabled:opacity-50"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-red-600' : ''}`} />
              <span className="hidden sm:inline">Làm mới</span>
            </button>
            <span className={`hidden items-center gap-2 border px-3 py-2 text-xs font-medium md:flex ${remoteError ? 'border-red-200 bg-red-50 text-red-900' : 'border-emerald-200 bg-emerald-50 text-emerald-900'}`}>
              {remoteError ? <AlertTriangle className="h-4 w-4 text-red-600" /> : <ShieldCheck className="h-4 w-4 text-emerald-600" />}
              {remoteError ? 'Lỗi kết nối Neon Database' : 'Đã kết nối Neon Database'}
            </span>
            <button onClick={onExit} className="hidden min-h-10 items-center gap-2 border border-neutral-300 bg-white px-3 text-xs font-semibold text-slate-800 hover:bg-neutral-50 sm:flex">
              Xem website<ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] p-4 sm:p-6">
          {remoteError && <div role="alert" className="mb-4 border border-red-200 bg-red-50 p-4 text-xs leading-5 text-red-800">{remoteError}</div>}
          
          {view === 'dashboard' && (
            <Dashboard
              state={state}
              onNavigate={navigateView}
              onEditLead={(data) => setEditor({ type: 'lead', data })}
              onDeleteLead={(lead) => requestDelete({ type: 'lead', id: lead.id, name: lead.fullName })}
              onUpdateLeadStatus={handleUpdateLeadStatus}
            />
          )}

          {view === 'leads' && (
            <DataSection
              title="Khách cần tư vấn & Báo giá"
              description="Tiếp nhận, phân công và theo dõi xử lý từ lúc khách gửi form đến khi chốt hợp đồng."
              search={search}
              onSearch={setSearch}
              statusFilter={statusFilter}
              onStatusFilter={setStatusFilter}
              statusOptions={Object.entries(LEAD_STATUS).map(([value, item]) => ({ value, label: item.label }))}
              extraFilters={
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="h-10 border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-red-600"
                >
                  <option value="all">Tất cả mức ưu tiên</option>
                  <option value="high">Ưu tiên Cao</option>
                  <option value="medium">Ưu tiên Trung bình</option>
                  <option value="low">Ưu tiên Thấp</option>
                </select>
              }
              onAdd={() => setEditor({ type: 'lead', data: newLead() })}
              extraAction={
                <button
                  type="button"
                  onClick={exportLeadsToCsv}
                  className="flex min-h-10 items-center justify-center gap-2 border border-neutral-300 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-neutral-50 transition-colors"
                >
                  <Download className="h-4 w-4 text-emerald-600" />
                  Xuất Excel/CSV
                </button>
              }
            >
              <LeadsTable
                leads={filteredLeads}
                onEdit={(data) => setEditor({ type: 'lead', data })}
                onDelete={(lead) => requestDelete({ type: 'lead', id: lead.id, name: lead.fullName })}
                onUpdateStatus={handleUpdateLeadStatus}
              />
            </DataSection>
          )}

          {view === 'products' && (
            <DataSection
              title="Danh mục sản phẩm PCCC"
              description="Quản lý cấu hình cửa chống cháy, chỉ số EI, phân nhóm danh mục và SEO cho toàn bộ website."
              search={search}
              onSearch={setSearch}
              statusFilter={statusFilter}
              onStatusFilter={setStatusFilter}
              statusOptions={Object.entries(PUBLISH_STATUS).map(([value, item]) => ({ value, label: item.label }))}
              onAdd={() => setEditor({ type: 'product', data: newProduct(state.products.length + 1) })}
            >
              <ProductsTable
                products={filteredProducts}
                onEdit={(data) => setEditor({ type: 'product', data })}
                onDelete={(prod) => requestDelete({ type: 'product', id: prod.id, name: prod.name })}
              />
            </DataSection>
          )}

          {view === 'documents' && (
            <DataSection
              title="Hồ sơ kỹ thuật & Chứng nhận kiểm định"
              description="Kiểm soát mã hồ sơ, số chứng nhận, giới hạn chịu lửa EI, tiêu chuẩn áp dụng và trạng thái xác minh chuyên môn."
              search={search}
              onSearch={setSearch}
              statusFilter={statusFilter}
              onStatusFilter={setStatusFilter}
              statusOptions={Object.entries(PUBLISH_STATUS).map(([value, item]) => ({ value, label: item.label }))}
              onAdd={() => setEditor({ type: 'document', data: newDocument() })}
            >
              <DocumentsTable
                documents={filteredDocuments}
                onEdit={(data) => setEditor({ type: 'document', data })}
                onDelete={(doc) => requestDelete({ type: 'document', id: doc.id, name: `${doc.title} (${doc.code})` })}
              />
            </DataSection>
          )}

          {view === 'content' && (
            <DataSection
              title="Nội dung, Dự án & Tin tức"
              description="Kiểm soát dự án tiêu biểu, bài viết kỹ thuật PCCC, phê duyệt quyền sử dụng hình ảnh và xuất bản ra website."
              search={search}
              onSearch={setSearch}
              statusFilter={statusFilter}
              onStatusFilter={setStatusFilter}
              statusOptions={Object.entries(PUBLISH_STATUS).map(([value, item]) => ({ value, label: item.label }))}
              onAdd={() => setEditor({ type: 'content', data: newContent() })}
            >
              <ContentTable
                contents={filteredContents}
                onEdit={(data) => setEditor({ type: 'content', data })}
                onDelete={(item) => requestDelete({ type: 'content', id: item.id, name: item.title })}
              />
            </DataSection>
          )}

          {view === 'settings' && (
            <SettingsView
              state={state}
              onChange={setState}
              onSave={async () => {
                try {
                  await persist(state, 'Cập nhật cấu hình', 'Thông tin doanh nghiệp', () => saveRemoteCompany(state.company));
                  setToast('Đã lưu thông tin doanh nghiệp.');
                } catch {
                  setToast('Chưa lưu được thông tin doanh nghiệp.');
                }
              }}
              onImportCatalog={handleImportCatalog}
            />
          )}
        </main>
      </div>

      {/* Editor Drawer */}
      {editor && (
        <EditorPanel
          editor={editor}
          canPublish={isAdmin}
          canDelete={isAdmin}
          onChange={setEditor}
          onClose={() => setEditor(null)}
          onSave={saveEditor}
          onDelete={() => {
            if (editor) {
              const name = editor.type === 'lead' ? editor.data.fullName :
                           editor.type === 'product' ? editor.data.name :
                           editor.type === 'document' ? editor.data.title : editor.data.title;
              requestDelete({ type: editor.type, id: editor.data.id, name });
            }
          }}
        />
      )}

      {/* Confirmation Modal for Deletion */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-red-600">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <Trash2 className="h-5 w-5" />
              </span>
              <h3 className="text-base font-bold text-slate-950">Xác nhận xóa bản ghi</h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-600">
              Bạn có chắc chắn muốn xóa bản ghi <strong>"{confirmDelete.name}"</strong>?
              Hành động này sẽ xóa dữ liệu khỏi hệ thống và không thể hoàn tác.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="rounded border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-neutral-50"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirmed}
                className="flex items-center gap-1.5 rounded bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Đồng ý xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[90] flex max-w-sm items-center gap-3 border border-emerald-300 bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-emerald-900 shadow-2xl rounded-md animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

/* --- DASHBOARD VIEW --- */
const Dashboard = ({
  state,
  onNavigate,
  onEditLead,
  onDeleteLead,
  onUpdateLeadStatus,
}: {
  state: AdminState;
  onNavigate: (view: AdminView) => void;
  onEditLead: (lead: AdminLead) => void;
  onDeleteLead: (lead: AdminLead) => void;
  onUpdateLeadStatus: (lead: AdminLead, status: LeadStatus) => void;
}) => {
  const metrics = [
    { label: 'Yêu cầu mới', value: state.leads.filter((item) => item.status === 'new').length, detail: 'Cần phản hồi và phân công', icon: PhoneCall, color: 'text-red-700 bg-red-50' },
    { label: 'Đang theo dõi', value: state.leads.filter((item) => ['contacted', 'qualified'].includes(item.status)).length, detail: 'Có lịch sử xử lý', icon: ClipboardList, color: 'text-blue-700 bg-blue-50' },
    { label: 'Sản phẩm công bố', value: state.products.filter((item) => item.status === 'published').length, detail: `${state.products.filter((item) => item.status !== 'published').length} mục chưa công bố`, icon: Package, color: 'text-emerald-700 bg-emerald-50' },
    { label: 'Hồ sơ đã xác minh', value: state.documents.filter((item) => item.verifiedAt).length, detail: `${state.documents.length} hồ sơ đang quản lý`, icon: ShieldCheck, color: 'text-amber-800 bg-amber-50' },
  ];
  const reviewCount = state.contents.filter((item) => item.status === 'review').length + state.documents.filter((item) => item.status === 'review').length;

  return (
    <div className="space-y-5">
      <div className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-950 sm:flex sm:items-center sm:justify-between">
        <span><strong>Đang vận hành thật:</strong> dữ liệu được lưu tập trung tại Neon PostgreSQL, có đăng nhập quản trị.</span>
        <button onClick={() => onNavigate('settings')} className="mt-2 font-bold text-amber-950 underline sm:mt-0">Xem lộ trình vận hành</button>
      </div>
      <div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">{metric.label}</p>
                  <strong className="mt-3 block text-3xl text-slate-950">{metric.value}</strong>
                </div>
                <span className={`flex h-10 w-10 items-center justify-center ${metric.color}`}><Icon className="h-5 w-5" /></span>
              </div>
              <p className="mt-3 text-[11px] text-slate-500">{metric.detail}</p>
            </div>
          );
        })}
      </div>
      <div className="grid min-w-0 gap-5 2xl:grid-cols-[minmax(0,1.5fr)_minmax(290px,0.8fr)]">
        <section className="min-w-0 border border-neutral-200 bg-white">
          <SectionHeading title="Yêu cầu cần xử lý gần nhất" description="Ưu tiên liên hệ các yêu cầu mới và lịch hẹn trong ngày." action={<button onClick={() => onNavigate('leads')} className="text-xs font-bold text-red-700 hover:underline">Xem toàn bộ ({state.leads.length})</button>} />
          <LeadsTable
            leads={state.leads.slice(0, 5)}
            onEdit={onEditLead}
            onDelete={onDeleteLead}
            onUpdateStatus={onUpdateLeadStatus}
            compact
          />
        </section>
        <section className="min-w-0 border border-neutral-200 bg-white">
          <SectionHeading title="Việc cần chú ý" description="Các điểm có thể ảnh hưởng chất lượng công bố." />
          <div className="divide-y divide-neutral-100">
            <TaskRow icon={PhoneCall} title={`${state.leads.filter((item) => item.status === 'new').length} yêu cầu chưa liên hệ`} description="Mục tiêu phản hồi: trong 15-30 phút" onClick={() => onNavigate('leads')} />
            <TaskRow icon={BookOpenCheck} title={`${reviewCount} nội dung chờ duyệt`} description="Cần người có thẩm quyền xác nhận trước khi công bố" onClick={() => onNavigate('content')} />
            <TaskRow icon={FileText} title="Rà soát hiệu lực hồ sơ kỹ thuật" description={`${state.documents.filter((d) => !d.verifiedAt).length} hồ sơ chưa đối chiếu bản gốc`} onClick={() => onNavigate('documents')} />
          </div>
        </section>
      </div>
      <section className="border border-neutral-200 bg-white">
        <SectionHeading title="Nhật ký gần đây" description="Lịch sử thay đổi giúp truy vết người thực hiện và nội dung tác động." />
        <div className="divide-y divide-neutral-100">
          {state.activities.slice(0, 8).map((item) => (
            <div key={item.id} className="grid gap-1 px-4 py-3 text-xs sm:grid-cols-[140px_140px_1fr] sm:px-6 hover:bg-neutral-50">
              <span className="text-slate-500">{localDate(item.at)}</span>
              <strong className="text-slate-800">{item.actor}</strong>
              <span><span className="text-slate-600 font-medium">{item.action}:</span> {item.target}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const TaskRow = ({ icon: Icon, title, description, onClick }: { icon: React.ElementType; title: string; description: string; onClick: () => void }) => (
  <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-neutral-50 sm:px-6">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-neutral-100 text-slate-700"><Icon className="h-4 w-4" /></span>
    <span className="min-w-0 flex-1"><strong className="block text-xs text-slate-900">{title}</strong><span className="mt-0.5 block text-[11px] text-slate-500">{description}</span></span>
    <ChevronRight className="h-4 w-4 text-slate-400" />
  </button>
);

/* --- DATA SECTION WRAPPER --- */
const DataSection = ({
  title,
  description,
  search,
  onSearch,
  statusFilter,
  onStatusFilter,
  statusOptions,
  extraFilters,
  onAdd,
  extraAction,
  children,
}: {
  title: string;
  description: string;
  search: string;
  onSearch: (value: string) => void;
  statusFilter: string;
  onStatusFilter: (value: string) => void;
  statusOptions: { value: string; label: string }[];
  extraFilters?: React.ReactNode;
  onAdd: () => void;
  extraAction?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="border border-neutral-200 bg-white">
    <SectionHeading
      title={title}
      description={description}
      action={
        <div className="flex items-center gap-2">
          {extraAction}
          <button onClick={onAdd} className="flex min-h-10 items-center justify-center gap-2 bg-red-700 px-4 text-xs font-bold text-white transition-colors hover:bg-red-800">
            <Plus className="h-4 w-4" />Thêm mới
          </button>
        </div>
      }
    />
    <div className="flex flex-col gap-3 border-b border-neutral-200 bg-neutral-50/70 p-4 sm:flex-row">
      <label className="relative flex-1">
        <span className="sr-only">Tìm kiếm</span>
        <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Tìm theo tên, mã, số điện thoại, công trình..."
          className="h-10 w-full border border-neutral-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-red-600"
        />
      </label>
      <select
        value={statusFilter}
        onChange={(event) => onStatusFilter(event.target.value)}
        className="h-10 min-w-44 border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-red-600"
      >
        <option value="all">Tất cả trạng thái</option>
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {extraFilters}
    </div>
    {children}
  </section>
);

/* --- LEADS TABLE --- */
const LeadsTable = ({
  leads,
  onEdit,
  onDelete,
  onUpdateStatus,
  compact = false,
}: {
  leads: AdminLead[];
  onEdit: (lead: AdminLead) => void;
  onDelete?: (lead: AdminLead) => void;
  onUpdateStatus?: (lead: AdminLead, status: LeadStatus) => void;
  compact?: boolean;
}) => {
  if (!leads.length) return <EmptyState label="yêu cầu khách hàng" />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[880px] border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] uppercase text-slate-500">
            <th className="px-4 py-3 sm:px-6">Khách hàng / Liên hệ</th>
            <th className="px-4 py-3">Nhu cầu / Công trình</th>
            <th className="px-4 py-3">Phụ trách</th>
            <th className="px-4 py-3">Trạng thái</th>
            <th className="px-4 py-3">Lịch hẹn tiếp</th>
            <th className="w-28 px-4 py-3 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {leads.map((lead) => {
            const cleanPhone = lead.phone ? lead.phone.replace(/[^\d+]/g, '') : '';
            return (
              <tr key={lead.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-4 py-3 sm:px-6">
                  <strong className="block text-slate-950 font-bold">{lead.fullName}</strong>
                  <div className="mt-1 flex items-center gap-2 text-slate-600">
                    <span className="font-mono">{lead.phone}</span>
                    {cleanPhone && (
                      <div className="inline-flex items-center gap-1">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="p-1 rounded hover:bg-neutral-200 text-red-700 transition-colors"
                          title="Gọi điện"
                        >
                          <Phone className="h-3 w-3" />
                        </a>
                        <a
                          href={`https://zalo.me/${cleanPhone}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-1 text-[10px] font-bold text-sky-700 hover:underline"
                          title="Chat Zalo"
                        >
                          Zalo
                        </a>
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{lead.source} · {lead.priority === 'high' ? 'Ưu tiên cao' : 'Bình thường'}</span>
                </td>
                <td className="max-w-[260px] px-4 py-3">
                  <span className="block truncate font-semibold text-slate-900">{lead.productInterest || 'Tư vấn chung'}</span>
                  <span className="mt-0.5 block truncate text-slate-500">{lead.projectName || lead.company || 'Chưa có thông tin công trình'}</span>
                </td>
                <td className="px-4 py-3 text-slate-600">{lead.assignee}</td>
                <td className="px-4 py-3">
                  {onUpdateStatus ? (
                    <select
                      value={lead.status}
                      onChange={(e) => onUpdateStatus(lead, e.target.value as LeadStatus)}
                      className={`text-[11px] font-semibold border rounded px-1.5 py-1 outline-none ${LEAD_STATUS[lead.status]?.classes || 'bg-white'}`}
                    >
                      {Object.entries(LEAD_STATUS).map(([st, item]) => (
                        <option key={st} value={st}>{item.label}</option>
                      ))}
                    </select>
                  ) : (
                    <Badge {...LEAD_STATUS[lead.status]} />
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600">{localDate(lead.nextFollowUpAt)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onEdit(lead)} className="font-bold text-red-700 hover:underline text-xs">
                      Chi tiết
                    </button>
                    {!compact && onDelete && (
                      <button
                        onClick={() => onDelete(lead)}
                        className="text-slate-400 hover:text-red-700 p-1 transition-colors"
                        title="Xóa yêu cầu"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/* --- PRODUCTS TABLE --- */
const ProductsTable = ({
  products,
  onEdit,
  onDelete,
}: {
  products: AdminProduct[];
  onEdit: (product: AdminProduct) => void;
  onDelete: (product: AdminProduct) => void;
}) => products.length ? (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[860px] text-left text-xs">
      <thead>
        <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] uppercase text-slate-500">
          <th className="px-6 py-3">Sản phẩm</th>
          <th className="px-4 py-3">Nhóm danh mục</th>
          <th className="px-4 py-3">Chịu lửa</th>
          <th className="px-4 py-3">Tiêu chuẩn</th>
          <th className="px-4 py-3">Trạng thái</th>
          <th className="px-4 py-3">Cập nhật</th>
          <th className="px-4 py-3 text-right">Thao tác</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-100">
        {products.map((product) => (
          <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
            <td className="px-6 py-3">
              <strong className="block text-slate-950 font-bold">{product.name}</strong>
              <span className="text-[11px] text-slate-400 font-mono">/{product.slug}{product.featured ? ' · ⭐ Nổi bật' : ''}</span>
            </td>
            <td className="px-4 py-3 font-medium text-slate-700">{product.categoryName}</td>
            <td className="px-4 py-3 font-semibold text-red-700">{product.fireRating}</td>
            <td className="max-w-[220px] px-4 py-3 text-slate-600 truncate">{product.standard}</td>
            <td className="px-4 py-3"><Badge {...PUBLISH_STATUS[product.status]} /></td>
            <td className="px-4 py-3 text-slate-500">{localDate(product.updatedAt)}</td>
            <td className="px-4 py-3 text-right">
              <div className="flex items-center justify-end gap-2">
                <button onClick={() => onEdit(product)} className="font-bold text-red-700 hover:underline">
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className="text-slate-400 hover:text-red-700 p-1 transition-colors"
                  title="Xóa sản phẩm"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : <EmptyState label="sản phẩm" />;

/* --- DOCUMENTS TABLE --- */
const DocumentsTable = ({
  documents,
  onEdit,
  onDelete,
}: {
  documents: AdminDocument[];
  onEdit: (document: AdminDocument) => void;
  onDelete: (document: AdminDocument) => void;
}) => documents.length ? (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[920px] text-left text-xs">
      <thead>
        <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] uppercase text-slate-500">
          <th className="px-6 py-3">Hồ sơ / Mã văn bản</th>
          <th className="px-4 py-3">Nhóm sản phẩm</th>
          <th className="px-4 py-3">Chủ sở hữu</th>
          <th className="px-4 py-3">Xác minh</th>
          <th className="px-4 py-3">Trạng thái</th>
          <th className="px-4 py-3 text-right">Thao tác</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-100">
        {documents.map((document) => (
          <tr key={document.id} className="hover:bg-neutral-50 transition-colors">
            <td className="px-6 py-3">
              <strong className="block text-slate-950 font-bold">{document.title}</strong>
              <span className="font-mono text-[11px] text-red-700 font-semibold">{document.code}</span>
            </td>
            <td className="px-4 py-3 text-slate-700 font-medium">{document.productGroup}</td>
            <td className="max-w-[220px] px-4 py-3 text-slate-600 truncate">{document.owner}</td>
            <td className="px-4 py-3">
              {document.verifiedAt ? (
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" />Đã đối chiếu
                </span>
              ) : (
                <span className="text-amber-700 font-medium">Chưa xác minh</span>
              )}
            </td>
            <td className="px-4 py-3"><Badge {...PUBLISH_STATUS[document.status]} /></td>
            <td className="px-4 py-3 text-right">
              <div className="flex items-center justify-end gap-2">
                <button onClick={() => onEdit(document)} className="font-bold text-red-700 hover:underline">
                  Chi tiết
                </button>
                <button
                  onClick={() => onDelete(document)}
                  className="text-slate-400 hover:text-red-700 p-1 transition-colors"
                  title="Xóa hồ sơ"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : <EmptyState label="hồ sơ" />;

/* --- CONTENT TABLE --- */
const ContentTable = ({
  contents,
  onEdit,
  onDelete,
}: {
  contents: AdminContent[];
  onEdit: (content: AdminContent) => void;
  onDelete: (content: AdminContent) => void;
}) => contents.length ? (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[860px] text-left text-xs">
      <thead>
        <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] uppercase text-slate-500">
          <th className="px-6 py-3">Nội dung</th>
          <th className="px-4 py-3">Phân loại</th>
          <th className="px-4 py-3">Phụ trách</th>
          <th className="px-4 py-3">Quyền sử dụng</th>
          <th className="px-4 py-3">Trạng thái</th>
          <th className="px-4 py-3 text-right">Thao tác</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-100">
        {contents.map((content) => (
          <tr key={content.id} className="hover:bg-neutral-50 transition-colors">
            <td className="max-w-[350px] px-6 py-3">
              <strong className="block text-slate-950 font-bold">{content.title}</strong>
              <span className="mt-0.5 block truncate text-slate-500">{content.summary}</span>
            </td>
            <td className="px-4 py-3">
              <span className="inline-block rounded px-2 py-0.5 text-[10px] font-bold bg-neutral-100 text-slate-700 uppercase">
                {content.type === 'project' ? 'Dự án' : content.type === 'article' ? 'Bài viết' : 'Trang tĩnh'}
              </span>
            </td>
            <td className="px-4 py-3 text-slate-600">{content.owner}</td>
            <td className="px-4 py-3">
              <span className={content.mediaApproved && content.clientApproved ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-medium'}>
                {content.mediaApproved && content.clientApproved ? '✓ Đầy đủ' : 'Cần bổ sung'}
              </span>
            </td>
            <td className="px-4 py-3"><Badge {...PUBLISH_STATUS[content.status]} /></td>
            <td className="px-4 py-3 text-right">
              <div className="flex items-center justify-end gap-2">
                <button onClick={() => onEdit(content)} className="font-bold text-red-700 hover:underline">
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => onDelete(content)}
                  className="text-slate-400 hover:text-red-700 p-1 transition-colors"
                  title="Xóa nội dung"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : <EmptyState label="nội dung" />;

/* --- SETTINGS VIEW --- */
const SettingsView = ({
  state,
  onChange,
  onSave,
  onImportCatalog,
}: {
  state: AdminState;
  onChange: (state: AdminState) => void;
  onSave: () => void;
  onImportCatalog: () => void;
}) => {
  const setCompany = (field: keyof AdminState['company'], value: string | string[]) =>
    onChange({ ...state, company: { ...state.company, [field]: value } });

  const missingInformation = [
    !state.company.taxCode && 'Mã số thuế / mã số doanh nghiệp',
    !state.company.email && 'Email doanh nghiệp chính thức',
    !state.contents.some((item) => item.type === 'project' && item.status === 'published') && 'Dự án đã được khách hàng cho phép công bố',
  ].filter(Boolean) as string[];

  const roles = [
    ['Quản trị hệ thống (Admin)', 'Toàn bộ dữ liệu, cấu hình, phân quyền', 'Toàn quyền duyệt, xóa & công bố'],
    ['Kinh doanh (Sales)', 'Khách hàng, lịch hẹn, ghi chú, báo giá', 'Chỉ xem & cập nhật dữ liệu khách hàng'],
    ['Nội dung (Editor)', 'Sản phẩm, bài viết, dự án', 'Chỉnh sửa và gửi duyệt trước công bố'],
    ['Kỹ thuật (Technical)', 'Thông số, tiêu chuẩn, hồ sơ kiểm định', 'Xác minh chuyên môn hồ sơ phương tiện PCCC'],
  ];

  return (
    <div className="grid min-w-0 gap-5 2xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)]">
      <section className="border border-neutral-200 bg-white">
        <SectionHeading
          title="Thông tin doanh nghiệp"
          description="Nguồn dữ liệu chuẩn dùng cho chân trang, liên hệ, Hotline, Zalo và thẻ SEO."
          action={
            <button onClick={onSave} className="flex min-h-10 items-center gap-2 bg-red-700 px-4 text-xs font-bold text-white hover:bg-red-800 transition-colors">
              <Save className="h-4 w-4" />Lưu cấu hình
            </button>
          }
        />
        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
          <Field label="Tên pháp lý"><input className={fieldClass} value={state.company.legalName} onChange={(e) => setCompany('legalName', e.target.value)} /></Field>
          <Field label="Mã số thuế"><input className={fieldClass} value={state.company.taxCode || ''} onChange={(e) => setCompany('taxCode', e.target.value)} placeholder="Nhập mã số thuế doanh nghiệp" /></Field>
          <Field label="Tên thương hiệu"><input className={fieldClass} value={state.company.brandName} onChange={(e) => setCompany('brandName', e.target.value)} /></Field>
          <Field label="Người đại diện"><input className={fieldClass} value={state.company.representative} onChange={(e) => setCompany('representative', e.target.value)} /></Field>
          <Field label="Chức danh"><input className={fieldClass} value={state.company.representativeTitle} onChange={(e) => setCompany('representativeTitle', e.target.value)} /></Field>
          <Field label="Hotline"><input className={fieldClass} value={state.company.hotline} onChange={(e) => setCompany('hotline', e.target.value)} /></Field>
          <Field label="Zalo liên hệ"><input className={fieldClass} value={state.company.zalo} onChange={(e) => setCompany('zalo', e.target.value)} /></Field>
          <Field label="Email chính thức"><input type="email" className={fieldClass} value={state.company.email || ''} onChange={(e) => setCompany('email', e.target.value)} placeholder="contact@apexdoor.net" /></Field>
          <Field label="Thời gian phản hồi"><input className={fieldClass} value={state.company.responseTime} onChange={(e) => setCompany('responseTime', e.target.value)} /></Field>
          <Field label="Khu vực phục vụ"><input className={fieldClass} value={state.company.serviceArea} onChange={(e) => setCompany('serviceArea', e.target.value)} /></Field>
          <Field label="Tiêu đề SEO mặc định" wide><input className={fieldClass} value={state.company.defaultSeoTitle} onChange={(e) => setCompany('defaultSeoTitle', e.target.value)} /></Field>
          <Field label="Mô tả SEO mặc định" wide><textarea className={textareaClass} value={state.company.defaultSeoDescription} onChange={(e) => setCompany('defaultSeoDescription', e.target.value)} /></Field>
          <Field label="Địa chỉ văn phòng & nhà máy (Mỗi dòng một địa chỉ, định dạng 'Nhãn: Địa chỉ')" wide>
            <textarea
              className={textareaClass}
              value={state.company.addresses.join('\n')}
              onChange={(e) => setCompany('addresses', e.target.value.split('\n'))}
              placeholder="Trụ sở chính: Số 10 Ngõ 25 Đường 422B, Xã Sơn Đồng, Thành phố Hà Nội&#10;Nhà máy: Thạch Thất, Hà Nội"
            />
          </Field>
        </div>
      </section>

      <div className="space-y-5">
        <section className="border border-amber-200 bg-white">
          <div className="border-b border-amber-100 bg-amber-50 p-4">
            <h3 className="text-sm font-bold text-amber-950">Dữ liệu cần bổ sung hoàn thiện</h3>
            <p className="mt-1 text-[11px] leading-5 text-amber-900">Các mục này cần cập nhật để đảm bảo tính pháp lý và tin cậy trên website.</p>
          </div>
          {missingInformation.length > 0 ? (
            <ul className="divide-y divide-neutral-100">
              {missingInformation.map((item) => (
                <li key={item} className="flex gap-2 p-4 text-xs leading-5 text-slate-700">
                  <span className="mt-1 h-2 w-2 shrink-0 bg-amber-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-xs font-semibold text-emerald-700 flex items-center gap-2">
              <Check className="h-4 w-4" /> Dữ liệu hồ sơ doanh nghiệp đã đầy đủ.
            </div>
          )}
        </section>

        <section className="border border-neutral-200 bg-white">
          <SectionHeading title="Quy định phân quyền vai trò" description="Phân quyền bảo mật theo chức trách nhân sự APEX." />
          <div className="divide-y divide-neutral-100">
            {roles.map(([role, access, control]) => (
              <div key={role} className="p-4">
                <strong className="text-xs text-slate-950">{role}</strong>
                <p className="mt-1 text-[11px] leading-5 text-slate-600">{access}</p>
                <p className="text-[11px] font-medium text-emerald-700">{control}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-red-200 bg-white">
          <div className="border-b border-red-100 bg-red-50 p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-red-900"><ShieldCheck className="h-4 w-4" />Nhập danh mục ban đầu</h3>
          </div>
          <div className="p-4 text-xs leading-5 text-slate-600">
            Nhập sản phẩm, hồ sơ kiểm định và bài viết có sẵn trong mã nguồn vào Neon ở trạng thái <strong>nháp</strong>. Mục đã tồn tại được giữ nguyên, không nhập dự án mẫu. Website chỉ hiển thị các mục sau khi được rà soát và chuyển sang "Đã công bố".
          </div>
          <div className="border-t border-neutral-100 p-4">
            <button
              onClick={onImportCatalog}
              className="flex min-h-10 w-full items-center justify-center gap-2 border border-neutral-300 text-xs font-bold text-slate-700 hover:bg-neutral-50 transition-colors"
            >
              <RefreshCcw className="h-4 w-4" />Nhập danh mục ban đầu (dạng nháp)
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const Field = ({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) => (
  <label className={`block text-xs font-semibold text-slate-700 ${wide ? 'sm:col-span-2' : ''}`}>
    {label}
    {children}
  </label>
);

// Trạng thái công bố: vai trò khác Admin chỉ được lưu nháp / chờ duyệt / nội bộ
const StatusSelect = ({ value, onChange, canPublish }: { value: PublishStatus; onChange: (value: PublishStatus) => void; canPublish: boolean }) => (
  <>
    <select className={fieldClass} value={value} onChange={(e) => onChange(e.target.value as PublishStatus)}>
      {Object.entries(PUBLISH_STATUS).map(([status, item]) => (
        <option key={status} value={status} disabled={status === 'published' && !canPublish}>
          {item.label}{status === 'published' && !canPublish ? ' (chỉ Quản trị viên)' : ''}
        </option>
      ))}
    </select>
    {!canPublish && value === 'published' && (
      <span className="mt-1 block text-[11px] font-normal text-amber-700">Mục đang công bố. Lưu thay đổi cần chuyển sang "Chờ duyệt" để Quản trị viên duyệt lại.</span>
    )}
  </>
);

const slugifyFileName = (name: string) => {
  const dot = name.lastIndexOf('.');
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'tep';
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, '') : '';
  return ext ? `${base}.${ext}` : base;
};

// Ô nhập URL kèm nút tải tệp lên Vercel Blob (ảnh website hoặc PDF hồ sơ)
const UploadField = ({
  label,
  value,
  onChange,
  kind,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  kind: 'images' | 'documents';
  placeholder?: string;
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const accept = kind === 'images' ? 'image/jpeg,image/png,image/webp,image/avif' : 'application/pdf';

  const handleFile = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const blob = await upload(`${kind}/${slugifyFileName(file.name)}`, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/upload',
        contentType: file.type,
      });
      onChange(blob.url);
    } catch (err) {
      setUploadError(err instanceof Error && err.message ? err.message : 'Không thể tải tệp lên.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="block text-xs font-semibold text-slate-700 sm:col-span-2">
      {label}
      <div className="mt-1 flex gap-2">
        <input className={fieldClass.replace('mt-1 ', '')} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
        <label className={`flex h-10 shrink-0 cursor-pointer items-center gap-1.5 border border-neutral-300 bg-white px-3 text-xs font-bold text-slate-800 hover:bg-neutral-50 ${uploading ? 'pointer-events-none opacity-60' : ''}`}>
          <Upload className="h-4 w-4" />
          {uploading ? 'Đang tải...' : 'Tải lên'}
          <input type="file" accept={accept} className="sr-only" onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ''; }} />
        </label>
      </div>
      <span className="mt-1 block text-[11px] font-normal text-slate-500">
        {kind === 'images' ? 'JPG, PNG, WebP hoặc AVIF, tối đa 5 MB.' : 'PDF, tối đa 25 MB. Tệp được công khai khi hồ sơ ở trạng thái "Đã công bố".'}
      </span>
      {uploadError && <span role="alert" className="mt-1 block text-[11px] font-normal text-red-700">{uploadError}</span>}
      {kind === 'images' && value && <img src={value} alt="" className="mt-2 h-24 w-auto border border-neutral-200 object-cover" />}
      {kind === 'documents' && value && <a href={value} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-normal text-red-700 underline">Xem tệp hiện tại</a>}
    </div>
  );
};

/* --- EDITOR PANEL --- */
const EditorPanel = ({
  editor,
  canPublish,
  canDelete,
  onChange,
  onClose,
  onSave,
  onDelete,
}: {
  editor: Exclude<EditorState, null>;
  canPublish: boolean;
  canDelete: boolean;
  onChange: (editor: EditorState) => void;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
}) => {
  const titles = {
    lead: 'Thông tin khách cần tư vấn',
    product: 'Thông tin sản phẩm PCCC',
    document: 'Thông tin hồ sơ kỹ thuật & kiểm định',
    content: 'Thông tin nội dung, dự án & tin tức'
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex justify-end" role="dialog" aria-modal="true" aria-label={titles[editor.type]}>
      <div className="flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl">
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4 sm:px-6 bg-neutral-50">
          <div>
            <p className="text-[10px] font-bold uppercase text-red-700">Biểu mẫu quản trị</p>
            <h2 className="text-sm font-bold text-slate-950 sm:text-base">{titles[editor.type]}</h2>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center border border-neutral-200 bg-white hover:bg-neutral-100" aria-label="Đóng">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {editor.type === 'lead' && <LeadEditor data={editor.data} onChange={(data) => onChange({ type: 'lead', data })} />}
          {editor.type === 'product' && <ProductEditor data={editor.data} canPublish={canPublish} onChange={(data) => onChange({ type: 'product', data })} />}
          {editor.type === 'document' && <DocumentEditor data={editor.data} canPublish={canPublish} onChange={(data) => onChange({ type: 'document', data })} />}
          {editor.type === 'content' && <ContentEditor data={editor.data} canPublish={canPublish} onChange={(data) => onChange({ type: 'content', data })} />}
        </div>
        <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6">
          {canDelete ? (
            <button
              type="button"
              onClick={onDelete}
              className="flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
              Xóa mục này
            </button>
          ) : <span />}
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="min-h-10 border border-neutral-300 bg-white px-4 text-xs font-bold hover:bg-neutral-50">
              Hủy
            </button>
            <button onClick={onSave} className="flex min-h-10 items-center gap-2 bg-red-700 px-5 text-xs font-bold text-white hover:bg-red-800 transition-colors">
              <Save className="h-4 w-4" />Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- LEAD EDITOR --- */
const LeadEditor = ({ data, onChange }: { data: AdminLead; onChange: (data: AdminLead) => void }) => {
  const set = (field: keyof AdminLead, value: string | boolean) => onChange({ ...data, [field]: value });
  const cleanPhone = data.phone ? data.phone.replace(/[^\d+]/g, '') : '';

  return (
    <div className="space-y-4">
      {cleanPhone && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-red-50/70 border border-red-200 rounded">
          <span className="text-xs font-bold text-slate-800">Liên hệ trực tiếp:</span>
          <a
            href={`tel:${cleanPhone}`}
            className="inline-flex items-center gap-1 rounded bg-red-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-800"
          >
            <Phone className="h-3 w-3" /> Gọi {cleanPhone}
          </a>
          <a
            href={`https://zalo.me/${cleanPhone}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded bg-sky-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-sky-800"
          >
            <ExternalLink className="h-3 w-3" /> Chat Zalo
          </a>
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-1 rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-neutral-50"
            >
              Gửi Email
            </a>
          )}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Họ và tên *"><input className={fieldClass} value={data.fullName} onChange={(e) => set('fullName', e.target.value)} /></Field>
        <Field label="Số điện thoại *"><input className={fieldClass} value={data.phone} onChange={(e) => set('phone', e.target.value)} /></Field>
        <Field label="Email"><input type="email" className={fieldClass} value={data.email} onChange={(e) => set('email', e.target.value)} /></Field>
        <Field label="Công ty"><input className={fieldClass} value={data.company} onChange={(e) => set('company', e.target.value)} /></Field>
        <Field label="Tên công trình"><input className={fieldClass} value={data.projectName} onChange={(e) => set('projectName', e.target.value)} /></Field>
        <Field label="Địa điểm công trình"><input className={fieldClass} value={data.projectLocation} onChange={(e) => set('projectLocation', e.target.value)} /></Field>
        <Field label="Sản phẩm quan tâm"><input className={fieldClass} value={data.productInterest} onChange={(e) => set('productInterest', e.target.value)} /></Field>
        <Field label="Yêu cầu chịu lửa"><input className={fieldClass} value={data.fireRating} onChange={(e) => set('fireRating', e.target.value)} placeholder="EI60, EI70, EI90, EI120" /></Field>
        <Field label="Trạng thái">
          <select className={fieldClass} value={data.status} onChange={(e) => set('status', e.target.value)}>
            {Object.entries(LEAD_STATUS).map(([value, item]) => (
              <option key={value} value={value}>{item.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Mức ưu tiên">
          <select className={fieldClass} value={data.priority} onChange={(e) => set('priority', e.target.value)}>
            <option value="high">Cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Thấp</option>
          </select>
        </Field>
        <Field label="Người phụ trách"><input className={fieldClass} value={data.assignee} onChange={(e) => set('assignee', e.target.value)} /></Field>
        <Field label="Lịch liên hệ tiếp">
          <input
            type="datetime-local"
            className={fieldClass}
            value={toInputDateTime(data.nextFollowUpAt)}
            onChange={(e) => set('nextFollowUpAt', e.target.value)}
          />
        </Field>
        <Field label="Nội dung khách gửi" wide>
          <textarea className={textareaClass} value={data.message} onChange={(e) => set('message', e.target.value)} />
        </Field>
        <Field label="Ghi chú xử lý nội bộ" wide>
          <textarea className={textareaClass} value={data.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Ghi chú thông tin trao đổi, yêu cầu bản vẽ, khảo sát..." />
        </Field>
      </div>
    </div>
  );
};

/* --- PRODUCT EDITOR --- */
const ProductEditor = ({ data, canPublish, onChange }: { data: AdminProduct; canPublish: boolean; onChange: (data: AdminProduct) => void }) => {
  const set = (field: keyof AdminProduct, value: string | number | boolean) => onChange({ ...data, [field]: value });

  const handleNameChange = (nameVal: string) => {
    const updates: Partial<AdminProduct> = { name: nameVal };
    if (!data.slug || data.slug === slugify(data.name)) {
      updates.slug = slugify(nameVal);
    }
    onChange({ ...data, ...updates });
  };

  const handleCategoryChange = (catCode: string) => {
    const found = PRODUCT_CATEGORY_CHOICES.find((c) => c.id === catCode);
    onChange({
      ...data,
      category: catCode,
      categoryName: found ? found.name : data.categoryName,
    });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Tên sản phẩm *" wide>
        <input className={fieldClass} value={data.name} onChange={(e) => handleNameChange(e.target.value)} />
      </Field>
      <Field label="Đường dẫn (Slug)">
        <input className={fieldClass} value={data.slug} onChange={(e) => set('slug', e.target.value)} placeholder="cua-thep-ei70" />
      </Field>
      <Field label="Nhóm danh mục *">
        <select
          className={fieldClass}
          value={data.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {PRODUCT_CATEGORY_CHOICES.map((choice) => (
            <option key={choice.id} value={choice.id}>{choice.name} ({choice.id})</option>
          ))}
        </select>
      </Field>
      <Field label="Tên hiển thị nhóm">
        <input className={fieldClass} value={data.categoryName} onChange={(e) => set('categoryName', e.target.value)} />
      </Field>
      <Field label="Giới hạn chịu lửa">
        <input className={fieldClass} value={data.fireRating} onChange={(e) => set('fireRating', e.target.value)} placeholder="EI70, EI90, EI120..." />
      </Field>
      <Field label="Bảo hành">
        <input className={fieldClass} value={data.warranty} onChange={(e) => set('warranty', e.target.value)} />
      </Field>
      <Field label="Giá tham khảo / Ước tính">
        <input className={fieldClass} value={data.priceEstimate || ''} onChange={(e) => set('priceEstimate', e.target.value)} placeholder="Liên hệ / Từ 1.800.000 đ/m²" />
      </Field>
      <Field label="Trạng thái">
        <StatusSelect value={data.status} canPublish={canPublish} onChange={(value) => set('status', value)} />
      </Field>
      <Field label="Thứ tự hiển thị">
        <input type="number" className={fieldClass} value={data.sortOrder} onChange={(e) => set('sortOrder', Number(e.target.value))} />
      </Field>
      <Field label="Mô tả ngắn" wide>
        <textarea className={textareaClass} value={data.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} />
      </Field>
      <Field label="Vật liệu & Cấu tạo" wide>
        <textarea className={textareaClass} value={data.material} onChange={(e) => set('material', e.target.value)} />
      </Field>
      <Field label="Tiêu chuẩn / hồ sơ kiểm định áp dụng" wide>
        <textarea className={textareaClass} value={data.standard} onChange={(e) => set('standard', e.target.value)} />
      </Field>
      <UploadField label="Ảnh đại diện" kind="images" value={data.image || ''} onChange={(url) => set('image', url)} placeholder="Tải ảnh lên hoặc dán URL ảnh" />
      <Field label="Tiêu đề SEO" wide>
        <input className={fieldClass} value={data.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} />
      </Field>
      <Field label="Mô tả SEO" wide>
        <textarea className={textareaClass} value={data.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} />
      </Field>
      <label className="flex min-h-11 items-center gap-3 border border-neutral-200 px-3 text-xs font-semibold sm:col-span-2">
        <input type="checkbox" checked={data.featured} onChange={(e) => set('featured', e.target.checked)} className="h-4 w-4 text-red-600" />
        Hiển thị ở nhóm sản phẩm nổi bật trang chủ
      </label>
    </div>
  );
};

/* --- DOCUMENT EDITOR --- */
const DocumentEditor = ({ data, canPublish, onChange }: { data: AdminDocument; canPublish: boolean; onChange: (data: AdminDocument) => void }) => {
  const set = (field: keyof AdminDocument, value: string) => onChange({ ...data, [field]: value });

  const handleVerifiedToggle = (checked: boolean) => {
    onChange({
      ...data,
      verifiedAt: checked ? new Date().toISOString() : '',
      verifiedBy: checked ? (data.verifiedBy || 'Phòng Kỹ thuật APEX') : '',
    });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Tên hồ sơ *" wide>
        <input className={fieldClass} value={data.title} onChange={(e) => set('title', e.target.value)} />
      </Field>
      <Field label="Số / mã hồ sơ kiểm định *">
        <input className={fieldClass} value={data.code} onChange={(e) => set('code', e.target.value)} placeholder="1803/KD-PCCC-P7" />
      </Field>
      <Field label="Loại tài liệu">
        <select className={fieldClass} value={data.documentType} onChange={(e) => set('documentType', e.target.value)}>
          {DOC_TYPE_CHOICES.map((choice) => (
            <option key={choice} value={choice}>{choice}</option>
          ))}
        </select>
      </Field>
      <Field label="Nhóm sản phẩm áp dụng">
        <select className={fieldClass} value={data.productGroup} onChange={(e) => set('productGroup', e.target.value)}>
          {DOC_GROUP_CHOICES.map((choice) => (
            <option key={choice.id} value={choice.id}>{choice.label} ({choice.id})</option>
          ))}
        </select>
      </Field>
      <Field label="Tiêu chuẩn">
        <input className={fieldClass} value={data.standard} onChange={(e) => set('standard', e.target.value)} placeholder="TCVN 9383:2012 / QCVN 06:2022" />
      </Field>
      <Field label="Chủ sở hữu hồ sơ" wide>
        <input className={fieldClass} value={data.owner} onChange={(e) => set('owner', e.target.value)} />
      </Field>
      <Field label="Ngày ban hành">
        <input type="date" className={fieldClass} value={data.issuedDate} onChange={(e) => set('issuedDate', e.target.value)} />
      </Field>
      <Field label="Ngày hết hạn">
        <input type="date" className={fieldClass} value={data.expiryDate} onChange={(e) => set('expiryDate', e.target.value)} />
      </Field>
      <Field label="Trạng thái công bố">
        <StatusSelect value={data.status} canPublish={canPublish} onChange={(value) => set('status', value)} />
      </Field>
      <Field label="Người xác minh hồ sơ">
        <input className={fieldClass} value={data.verifiedBy} onChange={(e) => set('verifiedBy', e.target.value)} placeholder="Phòng Kỹ thuật APEX" />
      </Field>
      <label className="flex min-h-11 items-center gap-3 border border-neutral-200 px-3 text-xs font-semibold sm:col-span-2 bg-neutral-50/50">
        <input
          type="checkbox"
          checked={Boolean(data.verifiedAt)}
          onChange={(e) => handleVerifiedToggle(e.target.checked)}
          className="h-4 w-4 text-emerald-600"
        />
        <span>Đã xác minh và đối chiếu bản gốc kiểm định {data.verifiedAt && `(Thời điểm: ${localDate(data.verifiedAt)})`}</span>
      </label>
      <Field label="Phạm vi áp dụng" wide>
        <textarea className={textareaClass} value={data.scope} onChange={(e) => set('scope', e.target.value)} />
      </Field>
      <UploadField label="Tệp PDF công bố (khách tải về trên website)" kind="documents" value={data.fileUrl || ''} onChange={(url) => set('fileUrl', url)} placeholder="Tải PDF lên hoặc dán URL" />
      <Field label="Nguồn lưu hồ sơ gốc (nội bộ)" wide>
        <input className={fieldClass} value={data.sourceReference} onChange={(e) => set('sourceReference', e.target.value)} placeholder="Vị trí lưu bản gốc, số lưu trữ..." />
      </Field>
      <Field label="Ghi chú kiểm soát" wide>
        <textarea className={textareaClass} value={data.notes} onChange={(e) => set('notes', e.target.value)} />
      </Field>
    </div>
  );
};

/* --- CONTENT EDITOR --- */
const ContentEditor = ({ data, canPublish, onChange }: { data: AdminContent; canPublish: boolean; onChange: (data: AdminContent) => void }) => {
  const set = (field: keyof AdminContent, value: string | boolean) => onChange({ ...data, [field]: value });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Tiêu đề *" wide>
        <input className={fieldClass} value={data.title} onChange={(e) => set('title', e.target.value)} />
      </Field>
      <Field label="Loại nội dung">
        <select className={fieldClass} value={data.type} onChange={(e) => set('type', e.target.value)}>
          <option value="project">Hồ sơ dự án</option>
          <option value="article">Bài viết chuyên ngành</option>
          <option value="page">Trang tĩnh</option>
        </select>
      </Field>
      <Field label="Trạng thái">
        <StatusSelect value={data.status} canPublish={canPublish} onChange={(value) => set('status', value)} />
      </Field>
      <Field label="Người phụ trách / Tác giả">
        <input className={fieldClass} value={data.owner} onChange={(e) => set('owner', e.target.value)} />
      </Field>
      <Field label="Thời điểm công bố">
        <input
          type="datetime-local"
          className={fieldClass}
          value={toInputDateTime(data.publishAt)}
          onChange={(e) => set('publishAt', e.target.value)}
        />
      </Field>

      {data.type === 'project' && (
        <>
          <Field label="Phân nhóm dự án">
            <select className={fieldClass} value={data.category || 'commercial'} onChange={(e) => set('category', e.target.value)}>
              <option value="commercial">Trung tâm thương mại & Văn phòng</option>
              <option value="residential">Chung cư cao tầng & Đô thị</option>
              <option value="industrial">Nhà máy & Khu công nghiệp</option>
              <option value="healthcare">Bệnh viện & Y tế</option>
            </select>
          </Field>
          <Field label="Địa điểm công trình">
            <input className={fieldClass} value={data.location || ''} onChange={(e) => set('location', e.target.value)} />
          </Field>
          <Field label="Quy mô dự án">
            <input className={fieldClass} value={data.scale || ''} onChange={(e) => set('scale', e.target.value)} />
          </Field>
          <Field label="Hạng mục cung cấp">
            <input className={fieldClass} value={data.itemsSupplied || ''} onChange={(e) => set('itemsSupplied', e.target.value)} />
          </Field>
          <Field label="Khách hàng / Chủ đầu tư">
            <input className={fieldClass} value={data.client || ''} onChange={(e) => set('client', e.target.value)} />
          </Field>
          <Field label="Năm thực hiện">
            <input className={fieldClass} value={data.year || '2024'} onChange={(e) => set('year', e.target.value)} />
          </Field>
        </>
      )}

      {data.type === 'article' && (
        <>
          <Field label="Chuyên mục bài viết">
            <select className={fieldClass} value={data.category || 'Tiêu chuẩn & Quy chuẩn'} onChange={(e) => set('category', e.target.value)}>
              <option value="Tiêu chuẩn & Quy chuẩn">Tiêu chuẩn & Quy chuẩn</option>
              <option value="Giải pháp thi công">Giải pháp thi công</option>
              <option value="Xu hướng kiến trúc">Xu hướng kiến trúc</option>
            </select>
          </Field>
          <Field label="Thời gian đọc">
            <input className={fieldClass} value={data.readTime || '5 phút đọc'} onChange={(e) => set('readTime', e.target.value)} />
          </Field>
        </>
      )}

      <Field label="Mô tả / Tóm tắt" wide>
        <textarea className={textareaClass} value={data.summary} onChange={(e) => set('summary', e.target.value)} />
      </Field>
      <UploadField label="Hình ảnh đại diện" kind="images" value={data.image || ''} onChange={(url) => set('image', url)} placeholder="Tải ảnh lên hoặc dán URL ảnh" />

      <label className="flex min-h-11 items-center gap-3 border border-neutral-200 px-3 text-xs font-semibold">
        <input type="checkbox" checked={data.featured} onChange={(e) => set('featured', e.target.checked)} className="h-4 w-4 text-red-600" />
        Nội dung nổi bật
      </label>
      <label className="flex min-h-11 items-center gap-3 border border-neutral-200 px-3 text-xs font-semibold">
        <input type="checkbox" checked={data.mediaApproved} onChange={(e) => set('mediaApproved', e.target.checked)} className="h-4 w-4 text-emerald-600" />
        Đã có quyền sử dụng hình ảnh
      </label>
      <label className="flex min-h-11 items-center gap-3 border border-neutral-200 px-3 text-xs font-semibold sm:col-span-2">
        <input type="checkbox" checked={data.clientApproved} onChange={(e) => set('clientApproved', e.target.checked)} className="h-4 w-4 text-emerald-600" />
        Khách hàng / Chủ đầu tư đã chấp thuận công bố thông tin
      </label>
    </div>
  );
};

/* --- FACTORY GENERATORS --- */
const newLead = (): AdminLead => ({
  id: `lead-${Date.now()}`,
  createdAt: new Date().toISOString().slice(0, 16),
  fullName: '',
  phone: '',
  email: '',
  company: '',
  projectName: '',
  projectLocation: '',
  productInterest: '',
  fireRating: '',
  source: 'Nhập thủ công',
  message: '',
  status: 'new',
  priority: 'medium',
  assignee: 'Chưa phân công',
  nextFollowUpAt: '',
  notes: '',
  consent: true
});

const newProduct = (sortOrder: number): AdminProduct => ({
  id: `product-${Date.now()}`,
  name: '',
  slug: '',
  category: 'steel-door',
  categoryName: 'Cửa thép ngăn cháy',
  fireRating: 'EI70',
  shortDescription: '',
  material: 'Thép mạ kẽm chất lượng cao',
  standard: 'TCVN 9383:2012 / QCVN 06:2022',
  warranty: '12 tháng',
  featured: false,
  status: 'draft',
  sortOrder,
  seoTitle: '',
  seoDescription: '',
  imageAlt: '',
  image: '',
  priceEstimate: 'Liên hệ',
  updatedAt: new Date().toISOString().slice(0, 16)
});

const newDocument = (): AdminDocument => ({
  id: `document-${Date.now()}`,
  title: '',
  code: '',
  documentType: 'Giấy chứng nhận kiểm định',
  productGroup: 'steel-door',
  standard: 'TCVN 9383:2012',
  owner: 'Công ty TNHH APEX Việt Nam',
  scope: '',
  issuedDate: '',
  expiryDate: '',
  status: 'internal',
  sourceReference: 'Hồ sơ lưu trữ nội bộ',
  verifiedBy: 'Phòng Kỹ thuật APEX',
  verifiedAt: '',
  notes: ''
});

const newContent = (): AdminContent => ({
  id: `content-${Date.now()}`,
  type: 'project',
  title: '',
  summary: '',
  status: 'draft',
  publishAt: '',
  owner: 'Ban dự án',
  featured: false,
  mediaApproved: false,
  clientApproved: false,
  updatedAt: new Date().toISOString().slice(0, 16)
});
