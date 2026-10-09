import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { appendWebsiteLead, useLiveData } from '../admin/adminData';
import { ApexMark } from './brand';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

const PRODUCT_OPTIONS = [
  { id: 'steel-door', name: 'Cửa thép ngăn cháy', defaultRating: 'EI70', defaultW: 900, defaultH: 2200 },
  { id: 'glass-door', name: 'Cửa kính ngăn cháy', defaultRating: 'EI60', defaultW: 1000, defaultH: 2200 },
  { id: 'roller-shutter', name: 'Cửa cuốn ngăn cháy', defaultRating: 'EI90', defaultW: 3500, defaultH: 3500 },
  { id: 'fire-curtain', name: 'Rèm ngăn cháy/khói', defaultRating: 'EI60', defaultW: 4000, defaultH: 3000 },
];

const FIRE_RATINGS = ['EI60', 'EI70', 'EI90', 'EI120'];

const LEAF_TYPES = [
  { id: '1-leaf', label: '1 cánh' },
  { id: '2-leaf-equal', label: '2 cánh đều' },
  { id: '2-leaf-unequal', label: '2 cánh lệch' },
  { id: 'custom', label: 'Khổ lớn / Khác' },
];

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedProduct }) => {
  const { company } = useLiveData();
  const [activeTab, setActiveTab] = useState<'form' | 'direct'>('form');

  const initialProduct = PRODUCT_OPTIONS.find((p) => p.id === preselectedProduct) || PRODUCT_OPTIONS[0];

  const [productType, setProductType] = useState(initialProduct.id);
  const [fireRating, setFireRating] = useState(initialProduct.defaultRating);
  const [leafType, setLeafType] = useState('1-leaf');
  const [widthMm, setWidthMm] = useState(initialProduct.defaultW);
  const [heightMm, setHeightMm] = useState(initialProduct.defaultH);
  const [quantity, setQuantity] = useState(1);

  // Accessories
  const [hasDoorCloser, setHasDoorCloser] = useState(true);
  const [hasPanicBar, setHasPanicBar] = useState(false);
  const [hasVisionGlass, setHasVisionGlass] = useState(false);

  // Customer Contact
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleProductChange = (newType: string) => {
    setProductType(newType);
    const found = PRODUCT_OPTIONS.find((p) => p.id === newType);
    if (found) {
      setFireRating(found.defaultRating);
      setWidthMm(found.defaultW);
      setHeightMm(found.defaultH);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Vui lòng nhập họ tên và số điện thoại liên hệ.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const currentProd = PRODUCT_OPTIONS.find((p) => p.id === productType)?.name || productType;
    const leafLabel = LEAF_TYPES.find((l) => l.id === leafType)?.label || leafType;

    const accessoriesList: string[] = [];
    if (hasDoorCloser) accessoriesList.push('Tay co thủy lực');
    if (hasPanicBar) accessoriesList.push('Thanh thoát hiểm panic');
    if (hasVisionGlass) accessoriesList.push('Ô kính ngăn cháy');

    const composedMessage = [
      `Sản phẩm: ${currentProd} (${fireRating})`,
      `Quy cách: ${leafLabel}, Kích thước: ${widthMm}x${heightMm} mm, Số lượng: ${quantity} bộ`,
      accessoriesList.length ? `Phụ kiện: ${accessoriesList.join(', ')}` : 'Phụ kiện: Cơ bản tiêu chuẩn',
      projectLocation ? `Công trình/Địa điểm: ${projectLocation}` : '',
      notes ? `Ghi chú thêm: ${notes}` : '',
    ].filter(Boolean).join('\n');

    try {
      await appendWebsiteLead({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        topic: `Yêu cầu báo giá: ${currentProd}`,
        message: composedMessage,
        consent: true,
        formName: 'quote',
      });
      setSubmitted(true);
    } catch {
      setErrorMsg('Chưa thể gửi dữ liệu lúc này. Quý khách vui lòng gọi Hotline hoặc nhắn Zalo để được hỗ trợ tức thì.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-4 overflow-y-auto">
      <div className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="relative bg-slate-950 px-6 py-5 text-white sm:px-8">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-red-600" />
          <button
            onClick={handleResetAndClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Đóng cửa sổ"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
            <Calculator className="h-4 w-4" />
            <span>Tư vấn & Dự toán ngân sách PCCC</span>
          </div>
          <div className="mt-1 flex items-center gap-2.5">
            <ApexMark size={24} variant="faceted-gold" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Yêu cầu bảng báo giá kỹ thuật</h2>
          </div>
          <p className="mt-1 text-xs text-slate-300">
            Cung cấp cấu hình thực tế để nhận phương án báo giá và hồ sơ kiểm định tương ứng.
          </p>

          {/* Tab selector */}
          <div className="mt-4 flex gap-2 border-b border-white/15 pb-0 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('form')}
              className={`pb-2.5 px-3 transition-colors border-b-2 ${
                activeTab === 'form' ? 'border-red-500 text-white font-bold' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Điền cấu hình nhận báo giá
            </button>
            <button
              onClick={() => setActiveTab('direct')}
              className={`pb-2.5 px-3 transition-colors border-b-2 ${
                activeTab === 'direct' ? 'border-red-500 text-white font-bold' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Liên hệ Hotline & Zalo
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {activeTab === 'direct' ? (
          <div className="space-y-4 p-6 sm:p-8">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Quý khách cần trao đổi gấp về kích thước đặc thù, hồ sơ nghiệm thu hoặc tiến độ sản xuất, vui lòng liên hệ trực tiếp:
            </p>
            <a
              href={company.hotlineHref}
              className="group flex min-h-20 items-center gap-4 border border-red-200 bg-red-50 p-4 transition-colors hover:border-red-600 hover:bg-red-100 rounded-xl"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <Phone className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase text-red-700">Gọi Hotline kỹ thuật</span>
                <strong className="mt-0.5 block text-xl text-slate-950 font-bold">{company.hotlineDisplay}</strong>
              </span>
              <span className="text-xs font-bold text-red-700 bg-white px-3 py-1.5 rounded-md border border-red-200">
                Gọi ngay
              </span>
            </a>

            <a
              href={company.zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-20 items-center gap-4 border border-blue-200 bg-blue-50/60 p-4 transition-colors hover:border-blue-500 hover:bg-blue-100/70 rounded-xl"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                <MessageCircle className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase text-blue-700">Nhắn Zalo kinh doanh</span>
                <strong className="mt-0.5 block text-base text-slate-950 font-bold">Zalo: {company.hotlineDisplay}</strong>
              </span>
              <span className="text-xs font-bold text-blue-700 bg-white px-3 py-1.5 rounded-md border border-blue-200">
                Mở Zalo
              </span>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-200 pt-5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-red-600 shrink-0" />
                <span>{company.workingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{company.responseTime}</span>
              </div>
            </div>
          </div>
        ) : submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Tiếp nhận yêu cầu báo giá thành công!</h3>
            <p className="max-w-md mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed">
              Cảm ơn Quý khách <strong className="text-slate-900">{fullName}</strong>. Chuyên viên kinh doanh APEX sẽ liên hệ lại qua số điện thoại <strong className="text-red-700">{phone}</strong> trong vòng 1-2 ngày để gửi bảng dự toán chi tiết.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleResetAndClose}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-colors"
              >
                Đóng
              </button>
              <a
                href={company.hotlineHref}
                className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                Gọi xác nhận nhanh
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 max-h-[72vh] overflow-y-auto space-y-5 text-xs">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs leading-5">
                {errorMsg}
              </div>
            )}

            {/* Bước 1: Chọn sản phẩm & EI */}
            <div>
              <span className="block font-bold text-slate-900 uppercase tracking-wider mb-2">
                1. Chủng loại cửa & Giới hạn chịu lửa
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRODUCT_OPTIONS.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => handleProductChange(prod.id)}
                    className={`p-2.5 text-left border rounded-lg transition-all ${
                      productType === prod.id
                        ? 'border-red-600 bg-red-50/70 text-red-950 font-bold ring-1 ring-red-600'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="block text-xs">{prod.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-slate-600 font-medium">Chỉ số EI:</span>
                <div className="flex gap-1.5">
                  {FIRE_RATINGS.map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFireRating(rating)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold border transition-colors ${
                        fireRating === rating
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bước 2: Kích thước & Số lượng */}
            <div className="border-t border-slate-200 pt-4">
              <span className="block font-bold text-slate-900 uppercase tracking-wider mb-2">
                2. Quy cách & Kích thước ước tính
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div>
                  <label className="block text-[11px] text-slate-600 font-medium mb-1">Kiểu cánh</label>
                  <select
                    value={leafType}
                    onChange={(e) => setLeafType(e.target.value)}
                    className="w-full h-9 border border-slate-300 rounded-md px-2 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                  >
                    {LEAF_TYPES.map((l) => (
                      <option key={l.id} value={l.id}>{l.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 font-medium mb-1">Chiều rộng (mm)</label>
                  <input
                    type="number"
                    min={500}
                    max={12000}
                    step={10}
                    value={widthMm}
                    onChange={(e) => setWidthMm(Number(e.target.value))}
                    className="w-full h-9 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 font-medium mb-1">Chiều cao (mm)</label>
                  <input
                    type="number"
                    min={500}
                    max={12000}
                    step={10}
                    value={heightMm}
                    onChange={(e) => setHeightMm(Number(e.target.value))}
                    className="w-full h-9 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 font-medium mb-1">Số lượng (Bộ)</label>
                  <input
                    type="number"
                    min={1}
                    max={5000}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full h-9 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* Phụ kiện */}
              <div className="mt-3 flex flex-wrap gap-4 pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={hasDoorCloser}
                    onChange={(e) => setHasDoorCloser(e.target.checked)}
                    className="rounded border-slate-300 text-red-600 focus:ring-red-600"
                  />
                  <span>Tay co thủy lực tự đóng</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={hasPanicBar}
                    onChange={(e) => setHasPanicBar(e.target.checked)}
                    className="rounded border-slate-300 text-red-600 focus:ring-red-600"
                  />
                  <span>Khóa thanh thoát hiểm (Panic bar)</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={hasVisionGlass}
                    onChange={(e) => setHasVisionGlass(e.target.checked)}
                    className="rounded border-slate-300 text-red-600 focus:ring-red-600"
                  />
                  <span>Ô kính quan sát ngăn cháy</span>
                </label>
              </div>
            </div>

            {/* Bước 3: Thông tin nhận báo giá */}
            <div className="border-t border-slate-200 pt-4">
              <span className="block font-bold text-slate-900 uppercase tracking-wider mb-2">
                3. Thông tin nhận dự toán
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 font-medium mb-1">
                    Họ và tên <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-9 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 font-medium mb-1">
                    Số điện thoại <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 xxx xxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-9 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 font-medium mb-1">Email (nếu có)</label>
                  <input
                    type="email"
                    placeholder="email@congty.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-9 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 font-medium mb-1">Địa điểm công trình / Dự án</label>
                  <input
                    type="text"
                    placeholder="Hà Nội, KCN VSIP,..."
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    className="w-full h-9 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-[11px] text-slate-600 font-medium mb-1">Ghi chú thêm</label>
                <input
                  type="text"
                  placeholder="Yêu cầu màu sơn Jotun, tiến độ bàn giao, kiểm định phương tiện..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-9 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Nút hành động */}
            <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500">
                Thông tin được bảo mật theo chính sách quyền riêng tư APEX.
              </span>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-1/3 sm:w-auto px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Gửi yêu cầu báo giá</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
