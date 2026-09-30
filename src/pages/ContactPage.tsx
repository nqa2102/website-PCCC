import React, { useState } from 'react';
import { MapPin, Phone, Send, CheckCircle2, ShieldCheck, UserRound } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface ContactPageProps {
  onOpenQuote: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenQuote }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Báo giá dự án');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Vui lòng nhập họ tên và số điện thoại!');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <span className="w-1 h-3.5 bg-red-600 inline-block rounded-xs"></span>
            <span>LIÊN HỆ & TƯ VẤN KỸ THUẬT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            KẾT NỐI VỚI APEX VIỆT NAM
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Gửi nhu cầu sản phẩm, kích thước hoặc địa điểm công trình. APEX sẽ tiếp nhận và phản hồi trong 1-2 ngày.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details & Addresses */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Hotline Box */}
            <div className="bg-red-600 text-white p-6 rounded-2xl shadow-lg space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-red-100">
                Tổng đài tư vấn kỹ thuật & báo giá
              </span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white text-red-600 flex items-center justify-center font-bold">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <a href={COMPANY_INFO.hotlineHref} className="text-2xl font-black tracking-tight hover:underline">
                    {COMPANY_INFO.hotlineDisplay}
                  </a>
                  <p className="text-xs text-red-100">{COMPANY_INFO.workingHours} · Phục vụ toàn quốc</p>
                </div>
              </div>
            </div>

            {/* Offices & Factory */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-5 text-xs">
              {COMPANY_INFO.addresses.map((item, index) => (
                <div key={item.label} className={`${index > 0 ? 'border-t border-neutral-100 pt-4 ' : ''}flex items-start gap-3`}>
                  <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.label}</h4>
                    <p className="text-slate-600 mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="border-t border-neutral-100 pt-4 flex items-start gap-3">
                <UserRound className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Người đại diện pháp luật</h4>
                  <p className="text-slate-600 mt-0.5">{COMPANY_INFO.representative} - {COMPANY_INFO.representativeTitle}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Gửi Yêu Cầu Tư Vấn Hoặc Hẹn Khảo Sát
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Vui lòng điền thông tin bên dưới, chuyên viên APEX sẽ chủ động liên hệ lại trong thời gian sớm nhất.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900">
                  Cảm Ơn Quý Khách Đã Gửi Liên Hệ!
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  APEX đã ghi nhận yêu cầu và sẽ liên hệ số <strong>{phone}</strong> trong vòng 1-2 ngày.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Địa chỉ Email</label>
                    <input
                      type="email"
                      placeholder="email@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nhu cầu cần hỗ trợ</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-red-500 bg-white"
                    >
                      <option value="Báo giá dự án">Báo giá cửa chống cháy dự án</option>
                      <option value="Tư vấn tiêu chuẩn">Tư vấn tiêu chuẩn QCVN 06 & Nghiệm thu</option>
                      <option value="Khảo sát hiện trường">Yêu cầu kỹ sư khảo sát hiện trường</option>
                      <option value="Bản vẽ CAD">Xin file CAD & Thư viện kỹ thuật</option>
                      <option value="Đại lý phân phối">Hợp tác làm đại lý / nhà phân phối</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nội dung chi tiết</label>
                  <textarea
                    rows={4}
                    placeholder="Mô tả số lượng cửa, kích thước, tiến độ công trình hoặc câu hỏi kỹ thuật cần giải đáp..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-red-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bảo mật thông tin khách hàng tuyệt đối</span>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-sm transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi tin nhắn</span>
                  </button>
                </div>
              </form>
            )}

            {/* Location summary */}
            <div className="mt-8 border-t border-neutral-100 pt-6">
              <h3 className="font-bold text-slate-900 text-xs mb-3">Phạm vi tiếp nhận yêu cầu</h3>
              <div className="rounded-xl bg-slate-50 border border-neutral-200 p-5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 text-sm">Tư vấn và cung ứng toàn quốc</p>
                  <p className="text-xs text-slate-600 mt-1">Báo giá có hiệu lực 60 ngày. Màu sắc, phụ kiện và kích thước được xác nhận theo lựa chọn của khách hàng.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
