import React, { useState } from 'react';
import { X, Check, Calculator, ShieldCheck, Download, Send, PhoneCall } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct
}) => {
  const [productType, setProductType] = useState(preselectedProduct || 'steel-door');
  const [fireRating, setFireRating] = useState('EI90');
  const [leafType, setLeafType] = useState<'1-leaf' | '2-leaf-equal' | '2-leaf-unequal'>('1-leaf');
  const [width, setWidth] = useState(900);
  const [height, setHeight] = useState(2200);
  const [quantity, setQuantity] = useState(2);

  // Accessories
  const [hasDoorCloser, setHasDoorCloser] = useState(true);
  const [hasPanicBar, setHasPanicBar] = useState(false);
  const [hasVisionGlass, setHasVisionGlass] = useState(false);
  const [hasSmokeSeal, setHasSmokeSeal] = useState(true);
  const [needsFireCertificate, setNeedsFireCertificate] = useState(true);

  // Contact Info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [notes, setNotes] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [quoteCode, setQuoteCode] = useState('');

  if (!isOpen) return null;

  // Price calculations in VND
  const basePricePerM2: Record<string, Record<string, number>> = {
    'steel-door': { EI60: 1850000, EI90: 2150000, EI120: 2450000 },
    'roller-shutter': { EI60: 2450000, EI90: 2850000, EI120: 3300000 },
    'fire-curtain': { EI60: 3100000, EI90: 3600000, EI120: 4200000 },
    'glass-door': { EI60: 4800000, EI90: 5900000, EI120: 7200000 },
  };

  const areaPerDoor = (width / 1000) * (height / 1000);
  const selectedTypePrice = basePricePerM2[productType]?.[fireRating] || 2150000;
  let doorLeafMultiplier = 1;
  if (leafType === '2-leaf-equal') doorLeafMultiplier = 1.05;
  if (leafType === '2-leaf-unequal') doorLeafMultiplier = 1.08;

  const baseDoorTotal = Math.round(selectedTypePrice * areaPerDoor * doorLeafMultiplier);

  // Accessories cost per door
  let accessoryTotalPerDoor = 0;
  if (hasDoorCloser) accessoryTotalPerDoor += 650000; // Tay co thủy lực Hafele/Dorma
  if (hasPanicBar) accessoryTotalPerDoor += 950000; // Thanh thoát hiểm Panic Bar
  if (hasVisionGlass) accessoryTotalPerDoor += 800000; // Ô kính chống cháy 200x600mm
  if (hasSmokeSeal) accessoryTotalPerDoor += 150000; // Gioăng cao su ngăn khói

  const pricePerUnit = baseDoorTotal + accessoryTotalPerDoor;
  const grandTotal = pricePerUnit * quantity;

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Vui lòng điền họ tên và số điện thoại liên hệ!');
      return;
    }
    const generated = `APEX-${Math.floor(100000 + Math.random() * 900000)}`;
    setQuoteCode(generated);
    setSubmitted(true);
  };

  const handlePresetDimensions = (w: number, h: number, leaf: '1-leaf' | '2-leaf-equal' | '2-leaf-unequal') => {
    setWidth(w);
    setHeight(h);
    setLeafType(leaf);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 overflow-y-auto backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl relative overflow-hidden my-auto max-h-[92vh] flex flex-col border border-neutral-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-red-600 flex items-center justify-center shrink-0">
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold">
                Bảng Tính Dự Toán & Báo Giá Nhanh APEX
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Nhận đơn giá chi tiết, hồ sơ kỹ thuật & tem kiểm định PCCC
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation View */
          <div className="p-5 sm:p-8 text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Yêu Cầu Báo Giá Đã Được Gửi Thành Công!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Mã dự toán của bạn là <strong className="text-red-600 font-mono text-base">{quoteCode}</strong>.
              Đội ngũ kỹ sư giải pháp APEX Việt Nam sẽ liên hệ qua số điện thoại <strong className="text-slate-900">{phone}</strong> trong vòng 15 phút để gửi bảng báo giá chính thức kèm bản vẽ chi tiết.
            </p>

            {/* Summary card */}
            <div className="bg-neutral-50 rounded-xl p-4 max-w-md mx-auto text-left border border-neutral-200 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Hạng mục:</span>
                <span className="font-semibold text-slate-900">
                  {productType === 'steel-door' ? 'Cửa thép ngăn cháy' : productType === 'roller-shutter' ? 'Cửa cuốn ngăn cháy' : 'Rèm ngăn cháy'} ({fireRating})
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Kích thước:</span>
                <span className="font-semibold text-slate-900">{width} x {height} mm ({quantity} bộ)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tổng giá trị tạm tính:</span>
                <span className="font-bold text-red-600 text-sm">{formatVND(grandTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Kiểm định PCCC:</span>
                <span className="text-emerald-700 font-medium">Bao gồm hồ sơ Cục PCCC</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  alert(`Đang tải file dự thảo báo giá [${quoteCode}].pdf`);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Tải bảng dự thảo (PDF)</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 border border-neutral-300 hover:bg-neutral-100 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
            
            {/* Step 1: Product Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                1. Chọn chủng loại sản phẩm & Tiêu chuẩn chống cháy
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'steel-door', label: 'Cửa thép ngăn cháy' },
                  { id: 'roller-shutter', label: 'Cửa cuốn ngăn cháy' },
                  { id: 'fire-curtain', label: 'Rèm ngăn cháy/khói' },
                  { id: 'glass-door', label: 'Cửa/Vách kính PCCC' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProductType(item.id)}
                    className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                      productType === item.id
                        ? 'border-red-600 bg-red-50 text-red-700 font-bold'
                        : 'border-neutral-200 text-slate-700 hover:border-neutral-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Fire rating selection */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-xs text-slate-600 font-medium">Giới hạn chịu lửa:</span>
                {['EI60', 'EI90', 'EI120'].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFireRating(rating)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                      fireRating === rating
                        ? 'bg-slate-900 text-white'
                        : 'bg-neutral-100 text-slate-700 hover:bg-neutral-200'
                    }`}
                  >
                    {rating} ({rating === 'EI60' ? '60 phút' : rating === 'EI90' ? '90 phút' : '120 phút'})
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions & Leaf type */}
            <div className="border-t border-neutral-100 pt-4">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                2. Cấu hình quy cách & kích thước thông thủy
              </label>

              {/* Leaf type buttons */}
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  { id: '1-leaf', label: 'Cửa 1 cánh đơn' },
                  { id: '2-leaf-equal', label: 'Cửa 2 cánh đều' },
                  { id: '2-leaf-unequal', label: 'Cửa 2 cánh mẹ bồng con' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setLeafType(t.id as any)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                      leafType === t.id
                        ? 'border-red-600 bg-red-50 text-red-700 font-bold'
                        : 'border-neutral-200 text-slate-600 hover:border-neutral-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Dimensions inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <div>
                  <label className="text-[11px] text-slate-600 block mb-1">Rộng (mm)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    min={600}
                    max={12000}
                    step={50}
                    className="w-full px-3 py-1.5 text-xs border border-neutral-200 rounded-md focus:border-red-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 block mb-1">Cao (mm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min={1800}
                    max={8000}
                    step={50}
                    className="w-full px-3 py-1.5 text-xs border border-neutral-200 rounded-md focus:border-red-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 block mb-1">Số lượng (bộ)</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    min={1}
                    max={500}
                    className="w-full px-3 py-1.5 text-xs border border-neutral-200 rounded-md focus:border-red-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px] text-slate-500">
                <span>Kích thước tiêu chuẩn gợi ý:</span>
                <button
                  type="button"
                  onClick={() => handlePresetDimensions(900, 2200, '1-leaf')}
                  className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 rounded-sm text-slate-700"
                >
                  900 x 2200 (1 cánh)
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetDimensions(1200, 2200, '2-leaf-unequal')}
                  className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 rounded-sm text-slate-700"
                >
                  1200 x 2200 (2 cánh lệch)
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetDimensions(1800, 2400, '2-leaf-equal')}
                  className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 rounded-sm text-slate-700"
                >
                  1800 x 2400 (2 cánh đều)
                </button>
              </div>
            </div>

            {/* Step 3: Accessories */}
            <div className="border-t border-neutral-100 pt-4">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                3. Phụ kiện PCCC đồng bộ (Tùy chọn)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <label className="flex items-center gap-2 p-2 border border-neutral-200 rounded-lg text-xs cursor-pointer hover:bg-neutral-50">
                  <input
                    type="checkbox"
                    checked={hasDoorCloser}
                    onChange={(e) => setHasDoorCloser(e.target.checked)}
                    className="accent-red-600"
                  />
                  <span>Tay co thủy lực tự đóng</span>
                </label>
                <label className="flex items-center gap-2 p-2 border border-neutral-200 rounded-lg text-xs cursor-pointer hover:bg-neutral-50">
                  <input
                    type="checkbox"
                    checked={hasPanicBar}
                    onChange={(e) => setHasPanicBar(e.target.checked)}
                    className="accent-red-600"
                  />
                  <span>Khóa thanh thoát hiểm</span>
                </label>
                <label className="flex items-center gap-2 p-2 border border-neutral-200 rounded-lg text-xs cursor-pointer hover:bg-neutral-50">
                  <input
                    type="checkbox"
                    checked={hasVisionGlass}
                    onChange={(e) => setHasVisionGlass(e.target.checked)}
                    className="accent-red-600"
                  />
                  <span>Ô kính chống cháy</span>
                </label>
                <label className="flex items-center gap-2 p-2 border border-neutral-200 rounded-lg text-xs cursor-pointer hover:bg-neutral-50">
                  <input
                    type="checkbox"
                    checked={hasSmokeSeal}
                    onChange={(e) => setHasSmokeSeal(e.target.checked)}
                    className="accent-red-600"
                  />
                  <span>Gioăng ngăn khói nở nhiệt</span>
                </label>
              </div>
            </div>

            {/* Estimated Price Bar */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                <span className="text-xs text-red-950 block">Dự toán kinh phí tạm tính ({quantity} bộ):</span>
                <span className="text-lg font-extrabold text-red-600">{formatVND(grandTotal)}</span>
                <span className="text-[11px] text-slate-500 ml-2">
                  (~{formatVND(pricePerUnit)} / bộ, diện tích {areaPerDoor.toFixed(2)} m²)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-emerald-200 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Đã gồm hồ sơ kiểm định lô</span>
              </div>
            </div>

            {/* Step 4: Contact details */}
            <div className="border-t border-neutral-100 pt-4 space-y-3">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                4. Thông tin nhận bảng chào giá chính thức
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Họ và tên quý khách *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-md focus:border-red-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại nhận báo giá *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-md focus:border-red-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Địa chỉ Email gửi báo giá"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-md focus:border-red-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Địa điểm công trình (Tỉnh/Thành phố)"
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-md focus:border-red-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Ghi chú thêm về quy cách sơn, màu sắc, tiến độ công trình..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-md focus:border-red-500 focus:outline-hidden resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-red-600" />
                <span>Cam kết phản hồi trong 15 phút làm việc</span>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-neutral-200 text-xs font-semibold text-slate-600 rounded-lg hover:bg-neutral-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi yêu cầu báo giá</span>
                </button>
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};
