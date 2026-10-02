import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  FileBadge2,
  FileText,
  Flame,
  FolderKanban,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  Package,
  PhoneCall,
  Plus,
  RefreshCcw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  UsersRound,
  X,
} from 'lucide-react';
import { createSeedState, loadAdminState, saveAdminState } from './adminData';
import { loadRemoteAdminState, saveRemoteAdminState, type AdminSaveScope } from './adminRepository';
import type {
  AdminContent,
  AdminDocument,
  AdminLead,
  AdminProduct,
  AdminState,
  LeadStatus,
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
  dataMode?: 'local' | 'remote';
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

const fieldClass = 'mt-1 h-10 w-full border border-neutral-300 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-red-600 focus:ring-1 focus:ring-red-600';
const textareaClass = 'mt-1 min-h-24 w-full resize-y border border-neutral-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-red-600 focus:ring-1 focus:ring-red-600';

const localDate = (value: string) => {
  if (!value) return 'Chưa đặt';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
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

export const AdminApp: React.FC<AdminAppProps> = ({ onExit, dataMode = 'local', userEmail = '', userRole = 'admin', onSignOut }) => {
  const [state, setState] = useState<AdminState>(() => dataMode === 'local' ? loadAdminState() : createSeedState());
  const [view, setView] = useState<AdminView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editor, setEditor] = useState<EditorState>(null);
  const [toast, setToast] = useState('');
  const [remoteLoading, setRemoteLoading] = useState(dataMode === 'remote');
  const [remoteError, setRemoteError] = useState('');
  const permittedViews: Record<string, AdminView[]> = {
    admin: ['dashboard', 'leads', 'products', 'documents', 'content', 'settings'],
    sales: ['dashboard', 'leads'],
    editor: ['dashboard', 'products', 'content'],
    technical: ['dashboard', 'products', 'documents'],
  };
  const availableViews = dataMode === 'local' ? permittedViews.admin : (permittedViews[userRole] || ['dashboard']);
  const availableNavItems = NAV_ITEMS.filter((item) => availableViews.includes(item.id));
  const navigateView = (next: AdminView) => {
    if (availableViews.includes(next)) setView(next);
  };

  useEffect(() => {
    if (dataMode !== 'local') return;
    const refresh = () => setState(loadAdminState());
    window.addEventListener('apex-admin-data-change', refresh);
    return () => window.removeEventListener('apex-admin-data-change', refresh);
  }, [dataMode]);

  useEffect(() => {
    if (dataMode !== 'remote') return;
    let active = true;
    loadRemoteAdminState()
      .then((next) => { if (active) setState(next); })
      .catch(() => { if (active) setRemoteError('Không thể tải dữ liệu Supabase. Hãy kiểm tra migration và quyền tài khoản.'); })
      .finally(() => { if (active) setRemoteLoading(false); });
    return () => { active = false; };
  }, [dataMode]);

  useEffect(() => {
    setSearch('');
    setStatusFilter('all');
    setSidebarOpen(false);
  }, [view]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 2400);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const persist = async (next: AdminState, action?: string, target?: string, scope: AdminSaveScope = 'all') => {
    let finalState = next;
    if (action && target) {
      finalState = {
        ...next,
        activities: [
          { id: `activity-${Date.now()}`, at: new Date().toISOString().slice(0, 16), actor: userEmail || 'Quản trị viên', action, target },
          ...next.activities,
        ].slice(0, 30),
      };
    }
    try {
      if (dataMode === 'remote') await saveRemoteAdminState(finalState, scope);
      else saveAdminState(finalState);
      setState(finalState);
    } catch {
      setRemoteError('Không thể lưu thay đổi. Tài khoản có thể chưa được cấp đúng vai trò.');
      throw new Error('Save failed');
    }
  };

  const saveEditor = async () => {
    if (!editor) return;
    const now = new Date().toISOString().slice(0, 16);
    if (editor.type === 'lead') {
      await persist({ ...state, leads: state.leads.some((item) => item.id === editor.data.id) ? state.leads.map((item) => item.id === editor.data.id ? editor.data : item) : [editor.data, ...state.leads] }, 'Cập nhật khách hàng', editor.data.fullName, 'lead');
    }
    if (editor.type === 'product') {
      const data = { ...editor.data, updatedAt: now };
      await persist({ ...state, products: state.products.some((item) => item.id === data.id) ? state.products.map((item) => item.id === data.id ? data : item) : [...state.products, data] }, 'Cập nhật sản phẩm', data.name, 'product');
    }
    if (editor.type === 'document') {
      await persist({ ...state, documents: state.documents.some((item) => item.id === editor.data.id) ? state.documents.map((item) => item.id === editor.data.id ? editor.data : item) : [editor.data, ...state.documents] }, 'Cập nhật hồ sơ', editor.data.title, 'document');
    }
    if (editor.type === 'content') {
      const data = { ...editor.data, updatedAt: now };
      await persist({ ...state, contents: state.contents.some((item) => item.id === data.id) ? state.contents.map((item) => item.id === data.id ? data : item) : [data, ...state.contents] }, 'Cập nhật nội dung', data.title, 'content');
    }
    setEditor(null);
    setToast('Đã lưu thay đổi vào dữ liệu quản trị.');
  };

  const navLabel = NAV_ITEMS.find((item) => item.id === view)?.label || 'Quản trị';

  const filteredLeads = useMemo(() => state.leads.filter((lead) => {
    const matchesSearch = `${lead.fullName} ${lead.phone} ${lead.company} ${lead.projectName}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (statusFilter === 'all' || lead.status === statusFilter);
  }), [search, state.leads, statusFilter]);

  const filteredProducts = useMemo(() => state.products.filter((product) => {
    const matchesSearch = `${product.name} ${product.categoryName} ${product.fireRating}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (statusFilter === 'all' || product.status === statusFilter);
  }), [search, state.products, statusFilter]);

  const filteredDocuments = useMemo(() => state.documents.filter((document) => {
    const matchesSearch = `${document.title} ${document.code} ${document.standard} ${document.owner}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (statusFilter === 'all' || document.status === statusFilter);
  }), [search, state.documents, statusFilter]);

  const filteredContents = useMemo(() => state.contents.filter((content) => {
    const matchesSearch = `${content.title} ${content.type} ${content.owner}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (statusFilter === 'all' || content.status === statusFilter);
  }), [search, state.contents, statusFilter]);

  if (remoteLoading) return <div className="flex min-h-screen items-center justify-center gap-3 bg-[#f3f5f4] text-sm font-semibold text-slate-700"><LoaderCircle className="h-5 w-5 animate-spin text-red-700" />Đang tải trung tâm dữ liệu APEX...</div>;

  return (
    <div className="min-h-screen bg-[#f5f6f7] font-sans text-slate-900 selection:bg-red-600 selection:text-white">
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-[#102b21] text-white transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <button onClick={() => setView('dashboard')} className="flex items-center gap-3 text-left">
            <span className="flex h-9 w-9 items-center justify-center bg-red-600"><Flame className="h-5 w-5" /></span>
            <span><strong className="block text-sm">APEX ADMIN</strong><span className="block text-[11px] text-emerald-100/70">Trung tâm vận hành website</span></span>
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
                <button key={item.id} onClick={() => navigateView(item.id)} className={`flex min-h-11 w-full items-center gap-3 px-3 text-left text-sm transition-colors ${active ? 'bg-white text-slate-950' : 'text-emerald-50/80 hover:bg-white/10 hover:text-white'}`}>
                  <Icon className={`h-4 w-4 ${active ? 'text-red-600' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.id === 'leads' && state.leads.filter((lead) => lead.status === 'new').length > 0 && <span className="ml-auto bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">{state.leads.filter((lead) => lead.status === 'new').length}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 px-2">
            <span className="flex h-9 w-9 items-center justify-center border border-white/15 bg-white/5"><CircleUserRound className="h-4 w-4" /></span>
            <span className="min-w-0"><strong className="block truncate text-xs">{userEmail || 'Quản trị viên APEX'}</strong><span className="text-[10px] text-emerald-100/60">{dataMode === 'remote' ? `Dữ liệu Supabase · ${userRole}` : 'Bản mô phỏng cục bộ'}</span></span>
          </div>
          {onSignOut && <button onClick={onSignOut} className="mb-2 flex min-h-10 w-full items-center justify-center gap-2 border border-white/15 text-xs font-semibold text-white transition-colors hover:bg-white/10"><LogOut className="h-4 w-4" />Đăng xuất</button>}
          <button onClick={onExit} className="flex min-h-10 w-full items-center justify-center gap-2 border border-white/15 text-xs font-semibold text-white transition-colors hover:bg-white/10"><ArrowLeft className="h-4 w-4" />Xem website khách hàng</button>
        </div>
      </aside>

      {sidebarOpen && <button className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Đóng lớp menu" />}

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="flex h-10 w-10 items-center justify-center border border-neutral-200 lg:hidden" aria-label="Mở menu"><Menu className="h-5 w-5" /></button>
            <div><p className="text-[10px] font-bold uppercase text-red-700">Không gian nội bộ</p><h1 className="text-sm font-bold text-slate-950 sm:text-base">{navLabel}</h1></div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`hidden items-center gap-2 border px-3 py-2 text-xs font-medium md:flex ${dataMode === 'remote' ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-amber-200 bg-amber-50 text-amber-900'}`}>{dataMode === 'remote' ? <ShieldCheck className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}{dataMode === 'remote' ? 'Đã kết nối dữ liệu máy chủ' : 'Dữ liệu mô phỏng trên trình duyệt'}</span>
            <button onClick={onExit} className="hidden min-h-10 items-center gap-2 border border-neutral-300 bg-white px-3 text-xs font-semibold text-slate-800 hover:bg-neutral-50 sm:flex">Xem website<ChevronRight className="h-4 w-4" /></button>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] p-4 sm:p-6">
          {remoteError && <div role="alert" className="mb-4 border border-red-200 bg-red-50 p-4 text-xs leading-5 text-red-800">{remoteError}</div>}
          {view === 'dashboard' && <Dashboard state={state} dataMode={dataMode} onNavigate={navigateView} onEditLead={(data) => setEditor({ type: 'lead', data })} />}
          {view === 'leads' && (
            <DataSection title="Khách cần tư vấn" description="Tiếp nhận, phân công và theo dõi xuyên suốt từ yêu cầu mới đến khi hoàn tất." search={search} onSearch={setSearch} statusFilter={statusFilter} onStatusFilter={setStatusFilter} statusOptions={Object.entries(LEAD_STATUS).map(([value, item]) => ({ value, label: item.label }))} onAdd={() => setEditor({ type: 'lead', data: newLead() })}>
              <LeadsTable leads={filteredLeads} onEdit={(data) => setEditor({ type: 'lead', data })} />
            </DataSection>
          )}
          {view === 'products' && (
            <DataSection title="Danh mục sản phẩm" description="Quản lý thông số công bố, trạng thái hiển thị, SEO và thứ tự sản phẩm." search={search} onSearch={setSearch} statusFilter={statusFilter} onStatusFilter={setStatusFilter} statusOptions={Object.entries(PUBLISH_STATUS).map(([value, item]) => ({ value, label: item.label }))} onAdd={() => setEditor({ type: 'product', data: newProduct(state.products.length + 1) })}>
              <ProductsTable products={filteredProducts} onEdit={(data) => setEditor({ type: 'product', data })} />
            </DataSection>
          )}
          {view === 'documents' && (
            <DataSection title="Hồ sơ kỹ thuật" description="Kiểm soát mã hồ sơ, phạm vi áp dụng, chủ sở hữu, xác minh và quyền công bố." search={search} onSearch={setSearch} statusFilter={statusFilter} onStatusFilter={setStatusFilter} statusOptions={Object.entries(PUBLISH_STATUS).map(([value, item]) => ({ value, label: item.label }))} onAdd={() => setEditor({ type: 'document', data: newDocument() })}>
              <DocumentsTable documents={filteredDocuments} onEdit={(data) => setEditor({ type: 'document', data })} />
            </DataSection>
          )}
          {view === 'content' && (
            <DataSection title="Nội dung & dự án" description="Duyệt nội dung trước khi công bố; quản lý quyền sử dụng ảnh và chấp thuận của khách hàng." search={search} onSearch={setSearch} statusFilter={statusFilter} onStatusFilter={setStatusFilter} statusOptions={Object.entries(PUBLISH_STATUS).map(([value, item]) => ({ value, label: item.label }))} onAdd={() => setEditor({ type: 'content', data: newContent() })}>
              <ContentTable contents={filteredContents} onEdit={(data) => setEditor({ type: 'content', data })} />
            </DataSection>
          )}
          {view === 'settings' && <SettingsView state={state} dataMode={dataMode} onChange={setState} onSave={async () => { await persist(state, 'Cập nhật cấu hình', 'Thông tin doanh nghiệp', 'company'); setToast('Đã lưu thông tin doanh nghiệp.'); }} onReset={async () => { const next = createSeedState(); await persist(next, 'Khôi phục dữ liệu mẫu', 'Toàn bộ hệ thống', 'all'); setToast('Đã khôi phục dữ liệu mẫu.'); }} />}
        </main>
      </div>

      {editor && <EditorPanel editor={editor} onChange={setEditor} onClose={() => setEditor(null)} onSave={saveEditor} />}
      {toast && <div className="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-3 border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-800 shadow-xl"><CheckCircle2 className="h-5 w-5" />{toast}</div>}
    </div>
  );
};

const Dashboard = ({ state, dataMode, onNavigate, onEditLead }: { state: AdminState; dataMode: 'local' | 'remote'; onNavigate: (view: AdminView) => void; onEditLead: (lead: AdminLead) => void }) => {
  const metrics = [
    { label: 'Yêu cầu mới', value: state.leads.filter((item) => item.status === 'new').length, detail: 'Cần phản hồi và phân công', icon: PhoneCall, color: 'text-red-700 bg-red-50' },
    { label: 'Đang theo dõi', value: state.leads.filter((item) => ['contacted', 'qualified'].includes(item.status)).length, detail: 'Có lịch sử xử lý', icon: ClipboardList, color: 'text-blue-700 bg-blue-50' },
    { label: 'Sản phẩm công bố', value: state.products.filter((item) => item.status === 'published').length, detail: `${state.products.filter((item) => item.status !== 'published').length} mục chưa công bố`, icon: Package, color: 'text-emerald-700 bg-emerald-50' },
    { label: 'Hồ sơ đã xác minh', value: state.documents.filter((item) => item.verifiedAt).length, detail: `${state.documents.length} hồ sơ đang quản lý`, icon: ShieldCheck, color: 'text-amber-800 bg-amber-50' },
  ];
  const reviewCount = state.contents.filter((item) => item.status === 'review').length + state.documents.filter((item) => item.status === 'review').length;

  return (
    <div className="space-y-5">
      <div className={`border px-4 py-3 text-xs leading-5 sm:flex sm:items-center sm:justify-between ${dataMode === 'remote' ? 'border-emerald-200 bg-emerald-50 text-emerald-950' : 'border-amber-200 bg-amber-50 text-amber-950'}`}>
        <span><strong>{dataMode === 'remote' ? 'Đang vận hành thật:' : 'Bản mô phỏng:'}</strong> {dataMode === 'remote' ? 'dữ liệu được lưu tập trung, có đăng nhập và phân quyền tại Supabase.' : 'dữ liệu chỉ được lưu trên trình duyệt này.'}</span>
        <button onClick={() => onNavigate('settings')} className="mt-2 font-bold text-amber-950 underline sm:mt-0">Xem lộ trình vận hành</button>
      </div>
      <div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return <div key={metric.label} className="bg-white p-5"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold text-slate-500">{metric.label}</p><strong className="mt-3 block text-3xl text-slate-950">{metric.value}</strong></div><span className={`flex h-10 w-10 items-center justify-center ${metric.color}`}><Icon className="h-5 w-5" /></span></div><p className="mt-3 text-[11px] text-slate-500">{metric.detail}</p></div>;
        })}
      </div>
      <div className="grid min-w-0 gap-5 2xl:grid-cols-[minmax(0,1.5fr)_minmax(290px,0.8fr)]">
        <section className="min-w-0 border border-neutral-200 bg-white">
          <SectionHeading title="Yêu cầu cần xử lý" description="Ưu tiên liên hệ yêu cầu mới và các lịch hẹn gần nhất." action={<button onClick={() => onNavigate('leads')} className="text-xs font-bold text-red-700 hover:underline">Xem toàn bộ</button>} />
          <LeadsTable leads={state.leads.slice(0, 5)} onEdit={onEditLead} compact />
        </section>
        <section className="min-w-0 border border-neutral-200 bg-white">
          <SectionHeading title="Việc cần chú ý" description="Các điểm có thể ảnh hưởng chất lượng công bố." />
          <div className="divide-y divide-neutral-100">
            <TaskRow icon={PhoneCall} title={`${state.leads.filter((item) => item.status === 'new').length} yêu cầu chưa liên hệ`} description="Mục tiêu phản hồi: trong ngày" onClick={() => onNavigate('leads')} />
            <TaskRow icon={BookOpenCheck} title={`${reviewCount} nội dung chờ duyệt`} description="Cần người có thẩm quyền xác nhận" onClick={() => onNavigate('content')} />
            <TaskRow icon={FileText} title="Rà soát hiệu lực hồ sơ" description="Ngày hết hạn chưa được nhập cho hồ sơ hiện có" onClick={() => onNavigate('documents')} />
          </div>
        </section>
      </div>
      <section className="border border-neutral-200 bg-white">
        <SectionHeading title="Nhật ký gần đây" description="Lịch sử thay đổi giúp truy vết người thực hiện và nội dung tác động." />
        <div className="divide-y divide-neutral-100">
          {state.activities.slice(0, 6).map((item) => <div key={item.id} className="grid gap-1 px-4 py-3 text-xs sm:grid-cols-[140px_140px_1fr] sm:px-6"><span className="text-slate-500">{localDate(item.at)}</span><strong className="text-slate-800">{item.actor}</strong><span><span className="text-slate-600">{item.action}:</span> {item.target}</span></div>)}
        </div>
      </section>
    </div>
  );
};

const TaskRow = ({ icon: Icon, title, description, onClick }: { icon: React.ElementType; title: string; description: string; onClick: () => void }) => (
  <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-neutral-50 sm:px-6"><span className="flex h-9 w-9 shrink-0 items-center justify-center bg-neutral-100 text-slate-700"><Icon className="h-4 w-4" /></span><span className="min-w-0 flex-1"><strong className="block text-xs text-slate-900">{title}</strong><span className="mt-0.5 block text-[11px] text-slate-500">{description}</span></span><ChevronRight className="h-4 w-4 text-slate-400" /></button>
);

const DataSection = ({ title, description, search, onSearch, statusFilter, onStatusFilter, statusOptions, onAdd, children }: { title: string; description: string; search: string; onSearch: (value: string) => void; statusFilter: string; onStatusFilter: (value: string) => void; statusOptions: { value: string; label: string }[]; onAdd: () => void; children: React.ReactNode }) => (
  <section className="border border-neutral-200 bg-white">
    <SectionHeading title={title} description={description} action={<button onClick={onAdd} className="flex min-h-10 items-center justify-center gap-2 bg-red-700 px-4 text-xs font-bold text-white transition-colors hover:bg-red-800"><Plus className="h-4 w-4" />Thêm mới</button>} />
    <div className="flex flex-col gap-3 border-b border-neutral-200 bg-neutral-50/70 p-4 sm:flex-row">
      <label className="relative flex-1"><span className="sr-only">Tìm kiếm</span><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Tìm theo tên, mã, số điện thoại..." className="h-10 w-full border border-neutral-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-red-600" /></label>
      <select value={statusFilter} onChange={(event) => onStatusFilter(event.target.value)} className="h-10 min-w-44 border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-red-600"><option value="all">Tất cả trạng thái</option>{statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
    </div>
    {children}
  </section>
);

const LeadsTable = ({ leads, onEdit, compact = false }: { leads: AdminLead[]; onEdit: (lead: AdminLead) => void; compact?: boolean }) => {
  if (!leads.length) return <EmptyState label="khách hàng" />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] border-collapse text-left text-xs">
        <thead><tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] uppercase text-slate-500"><th className="px-4 py-3 sm:px-6">Khách hàng</th><th className="px-4 py-3">Nhu cầu / Công trình</th><th className="px-4 py-3">Phụ trách</th><th className="px-4 py-3">Trạng thái</th><th className="px-4 py-3">Liên hệ tiếp</th><th className="w-20 px-4 py-3"></th></tr></thead>
        <tbody className="divide-y divide-neutral-100">{leads.map((lead) => <tr key={lead.id} className="hover:bg-neutral-50"><td className="px-4 py-3 sm:px-6"><strong className="block text-slate-950">{lead.fullName}</strong><span className="mt-0.5 block text-slate-500">{lead.phone} · {lead.source}</span></td><td className="max-w-[260px] px-4 py-3"><span className="block truncate font-medium text-slate-800">{lead.productInterest || 'Chưa xác định'}</span><span className="mt-0.5 block truncate text-slate-500">{lead.projectName || lead.company || 'Chưa bổ sung công trình'}</span></td><td className="px-4 py-3 text-slate-600">{lead.assignee}</td><td className="px-4 py-3"><Badge {...LEAD_STATUS[lead.status]} /></td><td className="px-4 py-3 text-slate-600">{localDate(lead.nextFollowUpAt)}</td><td className="px-4 py-3"><button onClick={() => onEdit(lead)} className="min-h-9 whitespace-nowrap font-bold text-red-700 hover:underline">Chi tiết</button></td></tr>)}</tbody>
      </table>
      {compact && leads.length === 0 && <EmptyState label="yêu cầu" />}
    </div>
  );
};

const ProductsTable = ({ products, onEdit }: { products: AdminProduct[]; onEdit: (product: AdminProduct) => void }) => products.length ? (
  <div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left text-xs"><thead><tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] uppercase text-slate-500"><th className="px-6 py-3">Sản phẩm</th><th className="px-4 py-3">Chỉ số chịu lửa</th><th className="px-4 py-3">Tiêu chuẩn</th><th className="px-4 py-3">Trạng thái</th><th className="px-4 py-3">Cập nhật</th><th className="px-4 py-3"></th></tr></thead><tbody className="divide-y divide-neutral-100">{products.map((product) => <tr key={product.id} className="hover:bg-neutral-50"><td className="px-6 py-3"><strong className="block text-slate-950">{product.name}</strong><span className="text-slate-500">{product.categoryName}{product.featured ? ' · Nổi bật' : ''}</span></td><td className="px-4 py-3 font-semibold">{product.fireRating}</td><td className="max-w-[250px] px-4 py-3 text-slate-600"><span className="line-clamp-2">{product.standard}</span></td><td className="px-4 py-3"><Badge {...PUBLISH_STATUS[product.status]} /></td><td className="px-4 py-3 text-slate-500">{localDate(product.updatedAt)}</td><td className="px-4 py-3"><button onClick={() => onEdit(product)} className="min-h-9 font-bold text-red-700 hover:underline">Chỉnh sửa</button></td></tr>)}</tbody></table></div>
) : <EmptyState label="sản phẩm" />;

const DocumentsTable = ({ documents, onEdit }: { documents: AdminDocument[]; onEdit: (document: AdminDocument) => void }) => documents.length ? (
  <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-xs"><thead><tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] uppercase text-slate-500"><th className="px-6 py-3">Hồ sơ / Mã</th><th className="px-4 py-3">Phạm vi áp dụng</th><th className="px-4 py-3">Chủ sở hữu</th><th className="px-4 py-3">Xác minh</th><th className="px-4 py-3">Công bố</th><th className="px-4 py-3"></th></tr></thead><tbody className="divide-y divide-neutral-100">{documents.map((document) => <tr key={document.id} className="hover:bg-neutral-50"><td className="px-6 py-3"><strong className="block text-slate-950">{document.title}</strong><span className="font-mono text-[11px] text-slate-500">{document.code}</span></td><td className="max-w-[270px] px-4 py-3 text-slate-600"><span className="line-clamp-2">{document.scope}</span></td><td className="max-w-[220px] px-4 py-3 text-slate-600">{document.owner}</td><td className="px-4 py-3">{document.verifiedAt ? <span className="inline-flex items-center gap-1 text-emerald-700"><CheckCircle2 className="h-4 w-4" />Đã đối chiếu</span> : <span className="text-amber-700">Chưa xác minh</span>}</td><td className="px-4 py-3"><Badge {...PUBLISH_STATUS[document.status]} /></td><td className="px-4 py-3"><button onClick={() => onEdit(document)} className="min-h-9 font-bold text-red-700 hover:underline">Chi tiết</button></td></tr>)}</tbody></table></div>
) : <EmptyState label="hồ sơ" />;

const ContentTable = ({ contents, onEdit }: { contents: AdminContent[]; onEdit: (content: AdminContent) => void }) => contents.length ? (
  <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left text-xs"><thead><tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] uppercase text-slate-500"><th className="px-6 py-3">Nội dung</th><th className="px-4 py-3">Loại</th><th className="px-4 py-3">Phụ trách</th><th className="px-4 py-3">Quyền sử dụng</th><th className="px-4 py-3">Trạng thái</th><th className="px-4 py-3"></th></tr></thead><tbody className="divide-y divide-neutral-100">{contents.map((content) => <tr key={content.id} className="hover:bg-neutral-50"><td className="max-w-[350px] px-6 py-3"><strong className="block text-slate-950">{content.title}</strong><span className="mt-0.5 block truncate text-slate-500">{content.summary}</span></td><td className="px-4 py-3 text-slate-600">{content.type === 'project' ? 'Dự án' : content.type === 'article' ? 'Bài viết' : 'Trang tĩnh'}</td><td className="px-4 py-3 text-slate-600">{content.owner}</td><td className="px-4 py-3"><span className={content.mediaApproved && content.clientApproved ? 'text-emerald-700' : 'text-amber-700'}>{content.mediaApproved && content.clientApproved ? 'Đầy đủ' : 'Cần bổ sung'}</span></td><td className="px-4 py-3"><Badge {...PUBLISH_STATUS[content.status]} /></td><td className="px-4 py-3"><button onClick={() => onEdit(content)} className="min-h-9 font-bold text-red-700 hover:underline">Chỉnh sửa</button></td></tr>)}</tbody></table></div>
) : <EmptyState label="nội dung" />;

const SettingsView = ({ state, dataMode, onChange, onSave, onReset }: { state: AdminState; dataMode: 'local' | 'remote'; onChange: (state: AdminState) => void; onSave: () => void; onReset: () => void }) => {
  const setCompany = (field: keyof AdminState['company'], value: string | string[]) => onChange({ ...state, company: { ...state.company, [field]: value } });
  const missingInformation = [
    !state.company.taxCode && 'Mã số thuế / mã số doanh nghiệp',
    !state.company.email && 'Email doanh nghiệp chính thức',
    !state.contents.some((item) => item.type === 'project' && item.status === 'published') && 'Dự án đã được khách hàng cho phép công bố',
    'Logo đối tác và văn bản xác nhận quyền sử dụng',
    dataMode === 'local' && 'Tài khoản máy chủ để lưu khách hàng và đăng nhập quản trị',
  ].filter(Boolean) as string[];
  const roles = [
    ['Quản trị hệ thống', 'Toàn bộ dữ liệu, cấu hình, phân quyền', 'Duyệt và công bố'],
    ['Kinh doanh', 'Khách hàng, lịch hẹn, ghi chú', 'Không sửa hồ sơ kỹ thuật'],
    ['Nội dung', 'Sản phẩm, bài viết, dự án', 'Gửi duyệt trước công bố'],
    ['Kỹ thuật', 'Thông số, tiêu chuẩn, hồ sơ', 'Xác minh chuyên môn'],
  ];
  return (
    <div className="grid min-w-0 gap-5 2xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)]">
      <section className="border border-neutral-200 bg-white">
        <SectionHeading title="Thông tin doanh nghiệp" description="Nguồn dữ liệu chuẩn dùng cho chân trang, liên hệ, SEO và thông tin pháp lý." action={<button onClick={onSave} className="flex min-h-10 items-center gap-2 bg-red-700 px-4 text-xs font-bold text-white hover:bg-red-800"><Save className="h-4 w-4" />Lưu cấu hình</button>} />
        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
          <Field label="Tên pháp lý"><input className={fieldClass} value={state.company.legalName} onChange={(e) => setCompany('legalName', e.target.value)} /></Field>
          <Field label="Mã số thuế"><input className={fieldClass} value={state.company.taxCode || ''} onChange={(e) => setCompany('taxCode', e.target.value)} placeholder="Chờ APEX xác nhận" /></Field>
          <Field label="Tên thương hiệu"><input className={fieldClass} value={state.company.brandName} onChange={(e) => setCompany('brandName', e.target.value)} /></Field>
          <Field label="Người đại diện"><input className={fieldClass} value={state.company.representative} onChange={(e) => setCompany('representative', e.target.value)} /></Field>
          <Field label="Chức danh"><input className={fieldClass} value={state.company.representativeTitle} onChange={(e) => setCompany('representativeTitle', e.target.value)} /></Field>
          <Field label="Hotline"><input className={fieldClass} value={state.company.hotline} onChange={(e) => setCompany('hotline', e.target.value)} /></Field>
          <Field label="Zalo"><input className={fieldClass} value={state.company.zalo} onChange={(e) => setCompany('zalo', e.target.value)} /></Field>
          <Field label="Email"><input type="email" className={fieldClass} value={state.company.email || ''} onChange={(e) => setCompany('email', e.target.value)} placeholder="Chờ APEX xác nhận" /></Field>
          <Field label="Thời gian phản hồi"><input className={fieldClass} value={state.company.responseTime} onChange={(e) => setCompany('responseTime', e.target.value)} /></Field>
          <Field label="Tiêu đề SEO mặc định" wide><input className={fieldClass} value={state.company.defaultSeoTitle} onChange={(e) => setCompany('defaultSeoTitle', e.target.value)} /></Field>
          <Field label="Mô tả SEO mặc định" wide><textarea className={textareaClass} value={state.company.defaultSeoDescription} onChange={(e) => setCompany('defaultSeoDescription', e.target.value)} /></Field>
          <Field label="Địa chỉ (mỗi dòng một địa chỉ)" wide><textarea className={textareaClass} value={state.company.addresses.join('\n')} onChange={(e) => setCompany('addresses', e.target.value.split('\n'))} /></Field>
        </div>
      </section>
      <div className="space-y-5">
        <section className="border border-amber-200 bg-white">
          <div className="border-b border-amber-100 bg-amber-50 p-4"><h3 className="text-sm font-bold text-amber-950">Dữ liệu cần APEX bổ sung</h3><p className="mt-1 text-[11px] leading-5 text-amber-900">Các mục này đang được giữ trống để tránh công bố thông tin chưa xác thực.</p></div>
          <ul className="divide-y divide-neutral-100">{missingInformation.map((item) => <li key={item} className="flex gap-2 p-4 text-xs leading-5 text-slate-700"><span className="mt-1 h-2 w-2 shrink-0 bg-amber-500" />{item}</li>)}</ul>
        </section>
        <section className="border border-neutral-200 bg-white">
          <SectionHeading title="Vai trò đề xuất" description="Phân quyền theo trách nhiệm, không dùng chung tài khoản." />
          <div className="divide-y divide-neutral-100">{roles.map(([role, access, control]) => <div key={role} className="p-4"><strong className="text-xs text-slate-950">{role}</strong><p className="mt-1 text-[11px] leading-5 text-slate-600">{access}</p><p className="text-[11px] font-medium text-emerald-700">{control}</p></div>)}</div>
        </section>
        <section className="border border-red-200 bg-white">
          <div className="border-b border-red-100 bg-red-50 p-4"><h3 className="flex items-center gap-2 text-sm font-bold text-red-900"><ShieldCheck className="h-4 w-4" />Điều kiện để vận hành thật</h3></div>
          <ol className="space-y-3 p-4 text-xs leading-5 text-slate-700"><li>1. Đăng nhập riêng và xác thực nhiều lớp.</li><li>2. Cơ sở dữ liệu máy chủ, sao lưu định kỳ.</li><li>3. Phân quyền theo vai trò và nhật ký không thể tự xóa.</li><li>4. Kho lưu trữ ảnh, PDF có kiểm soát phiên bản.</li><li>5. Đồng bộ biểu mẫu website và thông báo cho kinh doanh.</li></ol>
          <div className="border-t border-neutral-100 p-4"><button onClick={onReset} className="flex min-h-10 w-full items-center justify-center gap-2 border border-neutral-300 text-xs font-bold text-slate-700 hover:bg-neutral-50"><RefreshCcw className="h-4 w-4" />Khôi phục dữ liệu mẫu</button></div>
        </section>
      </div>
    </div>
  );
};

const Field = ({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) => <label className={`block text-xs font-semibold text-slate-700 ${wide ? 'sm:col-span-2' : ''}`}>{label}{children}</label>;

const EditorPanel = ({ editor, onChange, onClose, onSave }: { editor: Exclude<EditorState, null>; onChange: (editor: EditorState) => void; onClose: () => void; onSave: () => void }) => {
  const titles = { lead: 'Thông tin khách cần tư vấn', product: 'Thông tin sản phẩm', document: 'Thông tin hồ sơ kỹ thuật', content: 'Thông tin nội dung' };
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/45" role="dialog" aria-modal="true" aria-label={titles[editor.type]}>
      <div className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col bg-white shadow-2xl">
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4 sm:px-6"><div><p className="text-[10px] font-bold uppercase text-red-700">Biểu mẫu quản trị</p><h2 className="text-sm font-bold text-slate-950">{titles[editor.type]}</h2></div><button onClick={onClose} className="flex h-10 w-10 items-center justify-center border border-neutral-200" aria-label="Đóng"><X className="h-5 w-5" /></button></div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {editor.type === 'lead' && <LeadEditor data={editor.data} onChange={(data) => onChange({ type: 'lead', data })} />}
          {editor.type === 'product' && <ProductEditor data={editor.data} onChange={(data) => onChange({ type: 'product', data })} />}
          {editor.type === 'document' && <DocumentEditor data={editor.data} onChange={(data) => onChange({ type: 'document', data })} />}
          {editor.type === 'content' && <ContentEditor data={editor.data} onChange={(data) => onChange({ type: 'content', data })} />}
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6"><button onClick={onClose} className="min-h-10 border border-neutral-300 bg-white px-4 text-xs font-bold">Hủy</button><button onClick={onSave} className="flex min-h-10 items-center gap-2 bg-red-700 px-5 text-xs font-bold text-white hover:bg-red-800"><Save className="h-4 w-4" />Lưu thay đổi</button></div>
      </div>
    </div>
  );
};

const LeadEditor = ({ data, onChange }: { data: AdminLead; onChange: (data: AdminLead) => void }) => {
  const set = (field: keyof AdminLead, value: string | boolean) => onChange({ ...data, [field]: value });
  return <div className="grid gap-4 sm:grid-cols-2"><Field label="Họ và tên *"><input className={fieldClass} value={data.fullName} onChange={(e) => set('fullName', e.target.value)} /></Field><Field label="Số điện thoại *"><input className={fieldClass} value={data.phone} onChange={(e) => set('phone', e.target.value)} /></Field><Field label="Email"><input type="email" className={fieldClass} value={data.email} onChange={(e) => set('email', e.target.value)} /></Field><Field label="Công ty"><input className={fieldClass} value={data.company} onChange={(e) => set('company', e.target.value)} /></Field><Field label="Tên công trình"><input className={fieldClass} value={data.projectName} onChange={(e) => set('projectName', e.target.value)} /></Field><Field label="Địa điểm công trình"><input className={fieldClass} value={data.projectLocation} onChange={(e) => set('projectLocation', e.target.value)} /></Field><Field label="Sản phẩm quan tâm"><input className={fieldClass} value={data.productInterest} onChange={(e) => set('productInterest', e.target.value)} /></Field><Field label="Yêu cầu chịu lửa"><input className={fieldClass} value={data.fireRating} onChange={(e) => set('fireRating', e.target.value)} /></Field><Field label="Trạng thái"><select className={fieldClass} value={data.status} onChange={(e) => set('status', e.target.value)}>{Object.entries(LEAD_STATUS).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}</select></Field><Field label="Mức ưu tiên"><select className={fieldClass} value={data.priority} onChange={(e) => set('priority', e.target.value)}><option value="high">Cao</option><option value="medium">Trung bình</option><option value="low">Thấp</option></select></Field><Field label="Người phụ trách"><input className={fieldClass} value={data.assignee} onChange={(e) => set('assignee', e.target.value)} /></Field><Field label="Lịch liên hệ tiếp"><input type="datetime-local" className={fieldClass} value={data.nextFollowUpAt} onChange={(e) => set('nextFollowUpAt', e.target.value)} /></Field><Field label="Nội dung khách gửi" wide><textarea className={textareaClass} value={data.message} onChange={(e) => set('message', e.target.value)} /></Field><Field label="Ghi chú xử lý nội bộ" wide><textarea className={textareaClass} value={data.notes} onChange={(e) => set('notes', e.target.value)} /></Field></div>;
};

const ProductEditor = ({ data, onChange }: { data: AdminProduct; onChange: (data: AdminProduct) => void }) => {
  const set = (field: keyof AdminProduct, value: string | number | boolean) => onChange({ ...data, [field]: value });
  return <div className="grid gap-4 sm:grid-cols-2"><Field label="Tên sản phẩm *" wide><input className={fieldClass} value={data.name} onChange={(e) => set('name', e.target.value)} /></Field><Field label="Đường dẫn"><input className={fieldClass} value={data.slug} onChange={(e) => set('slug', e.target.value)} /></Field><Field label="Nhóm sản phẩm"><input className={fieldClass} value={data.categoryName} onChange={(e) => set('categoryName', e.target.value)} /></Field><Field label="Giới hạn chịu lửa"><input className={fieldClass} value={data.fireRating} onChange={(e) => set('fireRating', e.target.value)} /></Field><Field label="Bảo hành"><input className={fieldClass} value={data.warranty} onChange={(e) => set('warranty', e.target.value)} /></Field><Field label="Trạng thái"><select className={fieldClass} value={data.status} onChange={(e) => set('status', e.target.value)}>{Object.entries(PUBLISH_STATUS).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}</select></Field><Field label="Thứ tự"><input type="number" className={fieldClass} value={data.sortOrder} onChange={(e) => set('sortOrder', Number(e.target.value))} /></Field><Field label="Mô tả ngắn" wide><textarea className={textareaClass} value={data.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} /></Field><Field label="Vật liệu" wide><textarea className={textareaClass} value={data.material} onChange={(e) => set('material', e.target.value)} /></Field><Field label="Tiêu chuẩn / hồ sơ áp dụng" wide><textarea className={textareaClass} value={data.standard} onChange={(e) => set('standard', e.target.value)} /></Field><Field label="Tiêu đề SEO" wide><input className={fieldClass} value={data.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} /></Field><Field label="Mô tả SEO" wide><textarea className={textareaClass} value={data.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} /></Field><Field label="Mô tả ảnh" wide><input className={fieldClass} value={data.imageAlt} onChange={(e) => set('imageAlt', e.target.value)} /></Field><label className="flex min-h-11 items-center gap-3 border border-neutral-200 px-3 text-xs font-semibold sm:col-span-2"><input type="checkbox" checked={data.featured} onChange={(e) => set('featured', e.target.checked)} />Hiển thị ở nhóm sản phẩm nổi bật</label></div>;
};

const DocumentEditor = ({ data, onChange }: { data: AdminDocument; onChange: (data: AdminDocument) => void }) => {
  const set = (field: keyof AdminDocument, value: string) => onChange({ ...data, [field]: value });
  return <div className="grid gap-4 sm:grid-cols-2"><Field label="Tên hồ sơ *" wide><input className={fieldClass} value={data.title} onChange={(e) => set('title', e.target.value)} /></Field><Field label="Số / mã hồ sơ *"><input className={fieldClass} value={data.code} onChange={(e) => set('code', e.target.value)} /></Field><Field label="Loại tài liệu"><input className={fieldClass} value={data.documentType} onChange={(e) => set('documentType', e.target.value)} /></Field><Field label="Nhóm sản phẩm"><input className={fieldClass} value={data.productGroup} onChange={(e) => set('productGroup', e.target.value)} /></Field><Field label="Tiêu chuẩn"><input className={fieldClass} value={data.standard} onChange={(e) => set('standard', e.target.value)} /></Field><Field label="Chủ sở hữu hồ sơ" wide><input className={fieldClass} value={data.owner} onChange={(e) => set('owner', e.target.value)} /></Field><Field label="Ngày ban hành"><input type="date" className={fieldClass} value={data.issuedDate} onChange={(e) => set('issuedDate', e.target.value)} /></Field><Field label="Ngày hết hạn"><input type="date" className={fieldClass} value={data.expiryDate} onChange={(e) => set('expiryDate', e.target.value)} /></Field><Field label="Trạng thái công bố"><select className={fieldClass} value={data.status} onChange={(e) => set('status', e.target.value)}>{Object.entries(PUBLISH_STATUS).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}</select></Field><Field label="Người xác minh"><input className={fieldClass} value={data.verifiedBy} onChange={(e) => set('verifiedBy', e.target.value)} /></Field><Field label="Phạm vi áp dụng" wide><textarea className={textareaClass} value={data.scope} onChange={(e) => set('scope', e.target.value)} /></Field><Field label="Nguồn lưu hồ sơ" wide><input className={fieldClass} value={data.sourceReference} onChange={(e) => set('sourceReference', e.target.value)} /></Field><Field label="Ghi chú kiểm soát" wide><textarea className={textareaClass} value={data.notes} onChange={(e) => set('notes', e.target.value)} /></Field></div>;
};

const ContentEditor = ({ data, onChange }: { data: AdminContent; onChange: (data: AdminContent) => void }) => {
  const set = (field: keyof AdminContent, value: string | boolean) => onChange({ ...data, [field]: value });
  return <div className="grid gap-4 sm:grid-cols-2"><Field label="Tiêu đề *" wide><input className={fieldClass} value={data.title} onChange={(e) => set('title', e.target.value)} /></Field><Field label="Loại nội dung"><select className={fieldClass} value={data.type} onChange={(e) => set('type', e.target.value)}><option value="project">Dự án</option><option value="article">Bài viết</option><option value="page">Trang tĩnh</option></select></Field><Field label="Trạng thái"><select className={fieldClass} value={data.status} onChange={(e) => set('status', e.target.value)}>{Object.entries(PUBLISH_STATUS).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}</select></Field><Field label="Người phụ trách"><input className={fieldClass} value={data.owner} onChange={(e) => set('owner', e.target.value)} /></Field><Field label="Thời điểm công bố"><input type="datetime-local" className={fieldClass} value={data.publishAt} onChange={(e) => set('publishAt', e.target.value)} /></Field><Field label="Mô tả / tóm tắt" wide><textarea className={textareaClass} value={data.summary} onChange={(e) => set('summary', e.target.value)} /></Field><label className="flex min-h-11 items-center gap-3 border border-neutral-200 px-3 text-xs font-semibold"><input type="checkbox" checked={data.featured} onChange={(e) => set('featured', e.target.checked)} />Nội dung nổi bật</label><label className="flex min-h-11 items-center gap-3 border border-neutral-200 px-3 text-xs font-semibold"><input type="checkbox" checked={data.mediaApproved} onChange={(e) => set('mediaApproved', e.target.checked)} />Đã có quyền sử dụng ảnh</label><label className="flex min-h-11 items-center gap-3 border border-neutral-200 px-3 text-xs font-semibold sm:col-span-2"><input type="checkbox" checked={data.clientApproved} onChange={(e) => set('clientApproved', e.target.checked)} />Khách hàng đã chấp thuận công bố thông tin dự án</label></div>;
};

const newLead = (): AdminLead => ({ id: `lead-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 16), fullName: '', phone: '', email: '', company: '', projectName: '', projectLocation: '', productInterest: '', fireRating: '', source: 'Nhập thủ công', message: '', status: 'new', priority: 'medium', assignee: 'Chưa phân công', nextFollowUpAt: '', notes: '', consent: true });
const newProduct = (sortOrder: number): AdminProduct => ({ id: `product-${Date.now()}`, name: '', slug: '', category: 'steel-door', categoryName: '', fireRating: '', shortDescription: '', material: '', standard: '', warranty: '12 tháng', featured: false, status: 'draft', sortOrder, seoTitle: '', seoDescription: '', imageAlt: '', updatedAt: new Date().toISOString().slice(0, 16) });
const newDocument = (): AdminDocument => ({ id: `document-${Date.now()}`, title: '', code: '', documentType: '', productGroup: 'general', standard: '', owner: '', scope: '', issuedDate: '', expiryDate: '', status: 'internal', sourceReference: '', verifiedBy: '', verifiedAt: '', notes: '' });
const newContent = (): AdminContent => ({ id: `content-${Date.now()}`, type: 'article', title: '', summary: '', status: 'draft', publishAt: '', owner: '', featured: false, mediaApproved: false, clientApproved: false, updatedAt: new Date().toISOString().slice(0, 16) });
