import React, { useState } from 'react';
import { X, FileText, CheckCircle2, LoaderCircle, Send, ShieldCheck, Download } from 'lucide-react';
import { appendWebsiteLead } from '../admin/adminData';
import { ApexMark } from './brand';
import { trackLead } from '../lib/tracking';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [docTypes, setDocTypes] = useState<string[]>([
    'Hồ sơ năng lực APEX 2026',
    'Giấy kiểm định phương tiện PCCC',
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const toggleDocType = (type: string) => {
    setDocTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanPhone = phone.trim().replace(/[^\d+]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setErrorMsg('Vui lòng nhập số điện thoại hợp lệ để APEX gửi tài liệu.');
      return;
    }

    setSubmitting(true);
    try {
      await appendWebsiteLead({
        fullName: fullName.trim() || 'Khách hàng quan tâm tài liệu',
        phone: cleanPhone,
        email: email.trim() || undefined,
        topic: 'Nhận Hồ sơ năng lực & Giấy kiểm định PCCC',
        message: `Khách đăng ký nhận: ${docTypes.join(', ')}`,
        consent: true,
        productInterest: docTypes.join(', '),
        notes: `Khách đăng ký nhận: ${docTypes.join(', ')}`,
        source: 'catalog_modal',
        formName: 'catalog',
      });
      trackLead('catalog_modal');
      setSubmitted(true);
    } catch {
      setErrorMsg('Không thể gửi yêu cầu lúc này. Vui lòng gọi trực tiếp hotline để nhận tài liệu ngay.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
        {/* Header Bar */}
        <div className="relative bg-gradient-to-r from-slate-900 via-neutral-900 to-slate-900 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/90 text-white shadow-sm">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                  Tài liệu kỹ thuật & Pháp lý PCCC
                </p>
                <h3 className="text-base font-bold text-white sm:text-lg">
                  Nhận Hồ sơ năng lực & Catalog APEX
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Đóng"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {submitted ? (
            <div className="py-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="mt-4 text-lg font-bold text-slate-950">
                Đăng ký nhận tài liệu thành công!
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Hệ thống kỹ thuật APEX đã tiếp nhận thông tin. Kỹ sư phụ trách sẽ gửi trọn bộ file PDF
                Hồ sơ năng lực, Bản vẽ CAD và Giấy kiểm định PCCC qua Zalo/Email cho bạn trong ít phút.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleReset}
                  className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
                >
                  Hoàn tất
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs leading-relaxed text-slate-600">
                Điền số điện thoại hoặc Zalo để nhận ngay file PDF Catalog kỹ thuật và bản sao Giấy kiểm định
                phương tiện PCCC hợp quy QCVN 06:2022/BXD.
              </p>

              {/* Lựa chọn tài liệu */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Tài liệu bạn cần nhận:
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    'Hồ sơ năng lực APEX 2026',
                    'Giấy kiểm định phương tiện PCCC',
                    'Catalog thông số các dòng cửa',
                    'Bản vẽ CAD mặt cắt kỹ thuật',
                  ].map((doc) => {
                    const isSelected = docTypes.includes(doc);
                    return (
                      <button
                        type="button"
                        key={doc}
                        onClick={() => toggleDocType(doc)}
                        className={`flex items-center gap-2 rounded-lg border p-2.5 text-left text-xs font-medium transition-all ${
                          isSelected
                            ? 'border-red-600 bg-red-50 text-red-700 font-semibold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                            isSelected ? 'border-red-600 bg-red-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <span className="block h-1.5 w-1.5 rounded-full bg-white" />}
                        </span>
                        <span className="line-clamp-1">{doc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Thông tin liên hệ */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Họ tên / Đơn vị
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="VD: Anh Tuấn (Tổng thầu)"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Số điện thoại / Zalo <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09xx xxx xxx"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email nhận file (tùy chọn)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@congty.com"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {errorMsg && (
                <p className="rounded-lg bg-red-50 p-2.5 text-xs font-medium text-red-600">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-red-700 active:scale-[0.99] disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    <span>Đang gửi yêu cầu...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Gửi tài liệu qua Zalo cho tôi</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Bảo mật thông tin dự án & Cam kết không spam</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
