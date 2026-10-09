import React from 'react';
import { Database, Eye, Phone, ShieldCheck, Trash2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface PrivacyPageProps {
  onNavigate: (tab: string) => void;
}

const rights = [
  { icon: Eye, title: 'Được biết và kiểm tra', text: 'Khách hàng có thể hỏi APEX đang lưu những thông tin nào do mình đã gửi.' },
  { icon: Database, title: 'Yêu cầu chỉnh sửa', text: 'Khách hàng có thể yêu cầu cập nhật thông tin chưa chính xác hoặc đã thay đổi.' },
  { icon: Trash2, title: 'Rút lại và yêu cầu xóa', text: 'Khách hàng có thể rút lại sự đồng ý hoặc đề nghị xóa dữ liệu theo quy định áp dụng.' },
];

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => (
  <div className="min-h-screen bg-[#f4f4f1] py-12 sm:py-16">
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <p className="section-kicker">Dữ liệu khách hàng</p>
      <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl">Chính sách bảo mật và sử dụng thông tin</h1>
      <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">Cập nhật ngày 02/10/2026. Chính sách này áp dụng cho thông tin khách hàng chủ động gửi qua website APEX Việt Nam.</p>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_0.7fr]">
        <article className="border border-slate-200 bg-white p-6 sm:p-9">
          <div className="space-y-8 text-sm leading-7 text-slate-700">
            <section><h2 className="text-lg font-semibold text-slate-950">1. Đơn vị tiếp nhận</h2><p className="mt-2">{COMPANY_INFO.legalName}, đại diện bởi {COMPANY_INFO.representative} - {COMPANY_INFO.representativeTitle}. Mã số doanh nghiệp: {COMPANY_INFO.taxCode}, trụ sở chính: {COMPANY_INFO.headOffice}, email chính thức: {COMPANY_INFO.email}.</p></section>
            <section><h2 className="text-lg font-semibold text-slate-950">2. Dữ liệu được thu thập</h2><p className="mt-2">Họ tên, số điện thoại, email nếu có, nhu cầu hỗ trợ và nội dung khách hàng tự nhập. Website không yêu cầu thông tin thanh toán hoặc giấy tờ định danh.</p></section>
            <section><h2 className="text-lg font-semibold text-slate-950">3. Mục đích sử dụng</h2><p className="mt-2">Tiếp nhận yêu cầu tư vấn, liên hệ lại, sắp xếp khảo sát và theo dõi chất lượng phục vụ. APEX không công bố hoặc bán thông tin khách hàng cho mục đích quảng cáo của bên khác.</p></section>
            <section><h2 className="text-lg font-semibold text-slate-950">4. Thời gian và nơi lưu trữ</h2><p className="mt-2">Dữ liệu được lưu trữ bảo mật trên hệ thống máy chủ cơ sở dữ liệu được mã hóa do APEX quản lý. Chỉ nhân sự được phân quyền quản trị mới có thể tiếp cận để xử lý hồ sơ. Thông tin được lưu trong thời gian cần thiết để chăm sóc khách hàng hoặc theo quy định pháp luật; khách hàng có quyền yêu cầu xóa bất kỳ lúc nào.</p></section>
            <section><h2 className="text-lg font-semibold text-slate-950">5. Phạm vi chia sẻ</h2><p className="mt-2">Thông tin chỉ được chuyển cho nhân sự phụ trách kinh doanh, kỹ thuật hoặc quản lý của APEX khi cần xử lý yêu cầu. Việc chuyển cho nhà cung cấp hạ tầng chỉ thực hiện trong phạm vi cần thiết và có kiểm soát.</p></section>
            <section><h2 className="text-lg font-semibold text-slate-950">6. Liên hệ về dữ liệu</h2><p className="mt-2">Khách hàng có thể gọi Hotline {COMPANY_INFO.hotlineDisplay} hoặc gửi email tới {COMPANY_INFO.email} để yêu cầu kiểm tra, chỉnh sửa, hạn chế hoặc xóa thông tin đã gửi.</p></section>
          </div>
        </article>

        <aside className="space-y-5">
          <div className="border border-emerald-200 bg-emerald-50 p-5"><ShieldCheck className="h-6 w-6 text-emerald-700" /><h2 className="mt-4 text-base font-semibold text-emerald-950">Quyền của khách hàng</h2><div className="mt-4 divide-y divide-emerald-200">{rights.map(({ icon: Icon, title, text }) => <div key={title} className="py-4 first:pt-0 last:pb-0"><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-emerald-700" /><strong className="text-xs text-emerald-950">{title}</strong></div><p className="mt-2 text-xs leading-5 text-emerald-900/80">{text}</p></div>)}</div></div>
          <div className="border border-slate-200 bg-white p-5"><Phone className="h-5 w-5 text-red-700" /><h2 className="mt-3 text-sm font-semibold text-slate-950">Cần hỗ trợ?</h2><a href={COMPANY_INFO.hotlineHref} className="mt-2 block text-lg font-bold text-red-700">{COMPANY_INFO.hotlineDisplay}</a><button onClick={() => onNavigate('contact')} className="mt-4 min-h-10 w-full bg-slate-950 px-4 text-xs font-semibold text-white">Đến trang liên hệ</button></div>
        </aside>
      </div>
    </div>
  </div>
);
