import React, { useState, useEffect } from 'react';
import {
  Calculator,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  X,
  ChevronRight,
  ChevronLeft,
  Layers,
  Ruler,
  Building2,
  Flame,
  FileCheck2,
} from 'lucide-react';
import { appendWebsiteLead, useLiveData } from '../admin/adminData';
import { ApexMark } from './brand';
import type { ProductCategory } from '../types';
import { normalizeCategory } from '../routing';
import {
  PRODUCT_CATEGORY_DEFINITIONS,
  PRODUCT_CATEGORY_GROUPS,
} from './products/ProductCategoryGrid';
import { trackLead } from '../lib/tracking';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export type ProductGroupType = 'fire-protection' | 'mep-telecom';

export interface CategoryQuoteConfig {
  id: ProductCategory;
  name: string;
  group: ProductGroupType;
  defaultRating?: string;
  defaultW: number;
  defaultH: number;
  defaultD?: number;
  defaultLengthM?: number;
  hasLeafType?: boolean;
  hasDoorAccessories?: boolean;
  hasDepth?: boolean;
  hasLengthM?: boolean;
  hasIpRating?: boolean;
  defaultIp?: string;
  defaultFinish?: string;
  defaultMaterial?: string;
}

export const QUOTE_CONFIG_BY_CATEGORY: Record<ProductCategory, CategoryQuoteConfig> = {
  'cua-thep-ngan-chay': {
    id: 'cua-thep-ngan-chay',
    name: 'Cửa Thép Ngăn Cháy',
    group: 'fire-protection',
    defaultRating: 'EI70',
    defaultW: 900,
    defaultH: 2200,
    hasLeafType: true,
    hasDoorAccessories: true,
  },
  'cua-thep-van-go': {
    id: 'cua-thep-van-go',
    name: 'Cửa Thép Vân Gỗ',
    group: 'fire-protection',
    defaultRating: 'EI70',
    defaultW: 900,
    defaultH: 2200,
    hasLeafType: true,
    hasDoorAccessories: true,
  },
  'cua-kinh-ngan-chay': {
    id: 'cua-kinh-ngan-chay',
    name: 'Cửa Kính Ngăn Cháy',
    group: 'fire-protection',
    defaultRating: 'EI60',
    defaultW: 1000,
    defaultH: 2200,
    hasLeafType: true,
    hasDoorAccessories: true,
  },
  'cua-cuon-ngan-chay': {
    id: 'cua-cuon-ngan-chay',
    name: 'Cửa Cuốn Ngăn Cháy',
    group: 'fire-protection',
    defaultRating: 'EI90',
    defaultW: 3500,
    defaultH: 3500,
    hasLeafType: false,
    hasDoorAccessories: false,
  },
  'rem-ngan-chay': {
    id: 'rem-ngan-chay',
    name: 'Rèm Ngăn Cháy & Khói',
    group: 'fire-protection',
    defaultRating: 'EI60',
    defaultW: 4000,
    defaultH: 3000,
    hasLeafType: false,
    hasDoorAccessories: false,
  },
  'tu-dien': {
    id: 'tu-dien',
    name: 'Tủ Điện Phân Phối & ĐK',
    group: 'mep-telecom',
    defaultW: 800,
    defaultH: 1200,
    defaultD: 400,
    hasDepth: true,
    hasIpRating: true,
    defaultIp: 'IP54',
    defaultFinish: 'Sơn tĩnh điện RAL 7032/7035',
    defaultMaterial: 'Tôn mạ kẽm 1.5mm',
  },
  'thang-mang-cap': {
    id: 'thang-mang-cap',
    name: 'Thang Máng Cáp Điện',
    group: 'mep-telecom',
    defaultW: 200,
    defaultH: 100,
    defaultLengthM: 100,
    hasLengthM: true,
    defaultFinish: 'Mạ kẽm nhúng nóng',
    defaultMaterial: 'Tôn tráng kẽm 1.5mm',
  },
  'tu-rack': {
    id: 'tu-rack',
    name: 'Tủ Rack Mạng & Server',
    group: 'mep-telecom',
    defaultW: 600,
    defaultH: 2000,
    defaultD: 1000,
    hasDepth: true,
    hasIpRating: false,
    defaultFinish: 'Sơn tĩnh điện đen cát',
    defaultMaterial: 'Thép cán nguội SPCC',
  },
  'nha-tram-shelter': {
    id: 'nha-tram-shelter',
    name: 'Nhà Trạm Viễn Thông Shelter',
    group: 'mep-telecom',
    defaultW: 2400,
    defaultH: 2800,
    defaultD: 3000,
    hasDepth: true,
    hasIpRating: true,
    defaultIp: 'IP55',
    defaultFinish: 'Tôn mạ màu kháng thời tiết',
    defaultMaterial: 'Sandwich Panel PU/PIR 50mm',
  },
  'tu-nguon-outdoor': {
    id: 'tu-nguon-outdoor',
    name: 'Tủ Nguồn Outdoor',
    group: 'mep-telecom',
    defaultW: 750,
    defaultH: 1400,
    defaultD: 750,
    hasDepth: true,
    hasIpRating: true,
    defaultIp: 'IP55',
    defaultFinish: 'Sơn tĩnh điện ngoài trời UV',
    defaultMaterial: 'Thép 2 lớp cách nhiệt 1.5mm',
  },
};

const FIRE_RATINGS = ['EI60', 'EI70', 'EI90', 'EI120'];

const LEAF_TYPES = [
  { id: '1-leaf', label: '1 cánh' },
  { id: '2-leaf-equal', label: '2 cánh đều' },
  { id: '2-leaf-unequal', label: '2 cánh lệch' },
  { id: 'custom', label: 'Khổ lớn / Khác' },
];

const IP_RATINGS = ['IP54', 'IP55', 'IP65'];

const FINISH_OPTIONS = [
  'Sơn tĩnh điện tiêu chuẩn',
  'Mạ kẽm điện phân',
  'Mạ kẽm nhúng nóng',
  'Inox 304 bóng / xước hairline',
];

const MATERIAL_OPTIONS = [
  'Tiêu chuẩn kỹ thuật nhà sản xuất',
  'Thép mạ kẽm / Tôn dày 1.2 mm',
  'Thép mạ kẽm / Tôn dày 1.5 mm',
  'Thép mạ kẽm / Tôn dày 2.0 mm',
  'Inox 304 gia cường',
];

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedProduct }) => {
  const { company } = useLiveData();
  const [activeTab, setActiveTab] = useState<'wizard' | 'direct'>('wizard');
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);

  // Khởi tạo danh mục đã chuẩn hóa từ preselectedProduct
  const resolveInitialCategory = (raw?: string | null): ProductCategory => {
    const norm = normalizeCategory(raw) as ProductCategory | undefined;
    return norm && QUOTE_CONFIG_BY_CATEGORY[norm] ? norm : 'cua-thep-ngan-chay';
  };

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(() =>
    resolveInitialCategory(preselectedProduct)
  );

  const currentConfig = QUOTE_CONFIG_BY_CATEGORY[selectedCategory] || QUOTE_CONFIG_BY_CATEGORY['cua-thep-ngan-chay'];
  const isFireRated = currentConfig.group === 'fire-protection';

  // State thông số kỹ thuật (Bước 1 & 2)
  const [fireRating, setFireRating] = useState<string>(currentConfig.defaultRating || 'EI70');
  const [leafType, setLeafType] = useState('1-leaf');
  const [widthMm, setWidthMm] = useState<number>(currentConfig.defaultW);
  const [heightMm, setHeightMm] = useState<number>(currentConfig.defaultH);
  const [depthMm, setDepthMm] = useState<number>(currentConfig.defaultD || 400);
  const [lengthM, setLengthM] = useState<number>(currentConfig.defaultLengthM || 100);
  const [quantity, setQuantity] = useState<number>(1);

  // Phụ kiện cửa ngăn cháy
  const [hasDoorCloser, setHasDoorCloser] = useState(true);
  const [hasPanicBar, setHasPanicBar] = useState(false);
  const [hasVisionGlass, setHasVisionGlass] = useState(false);

  // Cơ điện viễn thông
  const [ipRating, setIpRating] = useState<string>(currentConfig.defaultIp || 'IP55');
  const [finish, setFinish] = useState<string>(currentConfig.defaultFinish || FINISH_OPTIONS[0]);
  const [material, setMaterial] = useState<string>(currentConfig.defaultMaterial || MATERIAL_OPTIONS[0]);

  // Thông tin liên hệ & Dự án (Bước 3)
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Cập nhật khi đổi category
  const applyCategory = (newCat: ProductCategory) => {
    setSelectedCategory(newCat);
    const cfg = QUOTE_CONFIG_BY_CATEGORY[newCat];
    if (cfg) {
      if (cfg.group === 'fire-protection') {
        setFireRating(cfg.defaultRating || 'EI70');
      } else {
        setFireRating('');
      }
      setWidthMm(cfg.defaultW);
      setHeightMm(cfg.defaultH);
      if (cfg.defaultD) setDepthMm(cfg.defaultD);
      if (cfg.defaultLengthM) setLengthM(cfg.defaultLengthM);
      if (cfg.defaultIp) setIpRating(cfg.defaultIp);
      if (cfg.defaultFinish) setFinish(cfg.defaultFinish);
      if (cfg.defaultMaterial) setMaterial(cfg.defaultMaterial);
    }
  };

  useEffect(() => {
    if (preselectedProduct) {
      applyCategory(resolveInitialCategory(preselectedProduct));
    }
  }, [preselectedProduct]);

  if (!isOpen) return null;

  // Xử lý gửi biểu mẫu dự toán (Bước 3)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanPhone = phone.trim().replace(/[^\d+]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setErrorMsg('Vui lòng nhập số điện thoại hoặc Zalo hợp lệ (tối thiểu 9 chữ số) để kỹ sư gửi dự toán.');
      return;
    }

    if (!consent) {
      setErrorMsg('Vui lòng đồng ý với chính sách xử lý dữ liệu trước khi gửi yêu cầu.');
      return;
    }

    setSubmitting(true);

    const specLines: string[] = [];
    specLines.push(`Sản phẩm: ${currentConfig.name}`);
    if (isFireRated && fireRating) {
      specLines.push(`Cấp chống cháy: ${fireRating}`);
    }

    const leafLabel = LEAF_TYPES.find((l) => l.id === leafType)?.label;
    if (currentConfig.hasLeafType && leafLabel) {
      specLines.push(`Kiểu cánh: ${leafLabel}`);
    }

    if (currentConfig.hasLengthM) {
      specLines.push(
        `Kích thước: R${widthMm} x C${heightMm} mm, Tuyến: ${lengthM} m, Khối lượng: ${quantity} mét/hệ`
      );
    } else if (currentConfig.hasDepth) {
      specLines.push(
        `Kích thước: R${widthMm} x C${heightMm} x S${depthMm} mm, Số lượng: ${quantity} bộ/tủ`
      );
    } else {
      specLines.push(`Kích thước: R${widthMm} x C${heightMm} mm, Số lượng: ${quantity} bộ`);
    }

    if (currentConfig.hasIpRating && ipRating) {
      specLines.push(`Cấp bảo vệ: ${ipRating}`);
    }
    if (!isFireRated) {
      if (material) specLines.push(`Vật liệu/Độ dày: ${material}`);
      if (finish) specLines.push(`Hoàn thiện: ${finish}`);
    }

    const accessoriesList: string[] = [];
    if (currentConfig.hasDoorAccessories) {
      if (hasDoorCloser) accessoriesList.push('Tay co thủy lực');
      if (hasPanicBar) accessoriesList.push('Thanh thoát hiểm panic');
      if (hasVisionGlass) accessoriesList.push('Ô kính quan sát');
    }
    if (accessoriesList.length) {
      specLines.push(`Phụ kiện: ${accessoriesList.join(', ')}`);
    }
    if (companyName) specLines.push(`Đơn vị / Nhà thầu: ${companyName.trim()}`);
    if (projectLocation) specLines.push(`Dự án / Địa điểm: ${projectLocation.trim()}`);
    if (notes) specLines.push(`Ghi chú: ${notes.trim()}`);

    const composedMessage = specLines.join('\n');

    try {
      await appendWebsiteLead({
        fullName: fullName.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        topic: `Dự toán dự án: ${currentConfig.name} (${isFireRated ? fireRating : (ipRating || 'Cơ điện')})`,
        message: composedMessage,
        consent,
        website,
        formName: 'quote',
        productInterest: currentConfig.name,
        fireRating: isFireRated ? fireRating : undefined,
        projectLocation: projectLocation.trim() || undefined,
        company: companyName.trim() || undefined,
        source: 'quote_wizard_modal',
      });
      trackLead('quote_wizard');
      setSubmitted(true);
    } catch {
      setErrorMsg(
        'Chưa thể gửi dữ liệu lúc này. Quý khách vui lòng gọi Hotline hoặc nhắn Zalo để được hỗ trợ tức thì.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setWizardStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-xs sm:p-4 overflow-y-auto">
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
            <span>Tư vấn kỹ thuật & Dự toán APEX VN</span>
          </div>
          <div className="mt-1 flex items-center gap-2.5">
            <ApexMark size={24} variant="faceted-gold" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Yêu cầu bảng báo giá dự toán công trình</h2>
          </div>
          <p className="mt-1 text-xs text-slate-300">
            Báo giá bảo mật theo khối lượng thực tế và bản vẽ dự án, kèm trọn bộ hồ sơ kiểm định PCCC hợp chuẩn.
          </p>

          {/* Tab selector: Wizard vs Hotline/Zalo */}
          <div className="mt-4 flex gap-2 border-b border-white/15 pb-0 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('wizard')}
              className={`pb-2.5 px-3 transition-colors border-b-2 ${
                activeTab === 'wizard'
                  ? 'border-red-500 text-white font-bold'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Quy trình nhận báo giá 3 bước
            </button>
            <button
              onClick={() => setActiveTab('direct')}
              className={`pb-2.5 px-3 transition-colors border-b-2 ${
                activeTab === 'direct'
                  ? 'border-red-500 text-white font-bold'
                  : 'border-transparent text-slate-400 hover:text-white'
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
              Quý khách cần trao đổi khẩn cấp về hồ sơ thẩm duyệt PCCC, thông số kích thước ô chờ đặc thù hoặc tiến độ sản xuất:
            </p>
            <a
              href={company.hotlineHref}
              className="group flex min-h-20 items-center gap-4 border border-red-200 bg-red-50 p-4 transition-colors hover:border-red-600 hover:bg-red-100 rounded-xl"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <Phone className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase text-red-700">Gọi Hotline kỹ thuật 24/7</span>
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
                <span className="block text-xs font-semibold uppercase text-blue-700">Nhắn Zalo kinh doanh dự án</span>
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
            <h3 className="text-lg font-bold text-slate-900">Tiếp nhận yêu cầu dự toán công trình thành công!</h3>
            <p className="max-w-md mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed">
              Cảm ơn Quý khách <strong className="text-slate-900">{fullName}</strong>. Chuyên viên kinh doanh APEX sẽ liên hệ lại qua số điện thoại/Zalo <strong className="text-red-700">{phone}</strong> trong vòng 1-2 ngày để gửi bảng dự toán chi tiết nhóm <strong className="text-slate-900">{currentConfig.name}</strong> kèm hồ sơ kiểm định kỹ thuật tương ứng.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleResetAndClose}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-colors min-h-10"
              >
                Đóng
              </button>
              <a
                href={company.hotlineHref}
                className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors min-h-10"
              >
                <Phone className="h-3.5 w-3.5" />
                Gọi xác nhận nhanh
              </a>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
            {/* Step Wizard Progress Bar */}
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-2 pb-3 border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => setWizardStep(1)}
                  className={`flex items-center gap-2 text-left transition-colors ${
                    wizardStep === 1
                      ? 'text-red-700 font-bold'
                      : wizardStep > 1
                      ? 'text-emerald-700 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                    wizardStep === 1
                      ? 'bg-red-600 text-white'
                      : wizardStep > 1
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {wizardStep > 1 ? '✓' : '1'}
                  </span>
                  <span className="text-xs truncate">Chủng loại & EI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  className={`flex items-center gap-2 text-left transition-colors ${
                    wizardStep === 2
                      ? 'text-red-700 font-bold'
                      : wizardStep > 2
                      ? 'text-emerald-700 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                    wizardStep === 2
                      ? 'bg-red-600 text-white'
                      : wizardStep > 2
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {wizardStep > 2 ? '✓' : '2'}
                  </span>
                  <span className="text-xs truncate">Quy cách & Kích thước</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWizardStep(3)}
                  className={`flex items-center gap-2 text-left transition-colors ${
                    wizardStep === 3
                      ? 'text-red-700 font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                    wizardStep === 3
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    3
                  </span>
                  <span className="text-xs truncate">Dự án & Báo giá</span>
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs leading-5">
                {errorMsg}
              </div>
            )}

            {/* BƯỚC 1: CHỌN SẢN PHẨM & CẤP CHỊU LỬA */}
            {wizardStep === 1 && (
              <div className="space-y-5 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-red-600" /> Chọn hệ sản phẩm dự án (10 nhóm)
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Bước 1/3</span>
                  </div>

                  <div className="space-y-3">
                    {PRODUCT_CATEGORY_GROUPS.map((grp) => (
                      <div key={grp.label} className="bg-slate-50/70 p-3 rounded-xl border border-slate-200">
                        <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
                          {grp.label}
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {grp.ids.map((catId) => {
                            const def = PRODUCT_CATEGORY_DEFINITIONS.find((d) => d.id === catId);
                            const isSelected = selectedCategory === catId;
                            return (
                              <button
                                key={catId}
                                type="button"
                                onClick={() => applyCategory(catId)}
                                className={`min-h-11 p-2.5 text-left rounded-lg border text-xs transition-all ${
                                  isSelected
                                    ? 'border-red-600 bg-red-50 text-red-950 font-bold ring-2 ring-red-600/30 shadow-xs'
                                    : 'border-slate-200 bg-white hover:bg-slate-100/70 text-slate-700'
                                }`}
                              >
                                <span className="block truncate font-medium">{def?.name || catId}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cấp chịu lửa EI (Chỉ nhóm ngăn cháy) */}
                  {isFireRated && (
                    <div className="mt-4 bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/70">
                      <div className="flex items-center gap-1.5 text-amber-950 font-bold mb-2">
                        <Flame className="h-4 w-4 text-red-600" />
                        <span>Cấp giới hạn chịu lửa thiết kế (EI):</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {FIRE_RATINGS.map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setFireRating(rating)}
                            className={`min-h-9 px-4 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                              fireRating === rating
                                ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                            }`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                      <p className="mt-2 text-[11px] text-amber-800">
                        Đạt thử nghiệm chịu lửa theo QCVN 06:2022/BXD và TCVN 9383:2012 với đầy đủ tem kiểm định PCCC.
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="inline-flex min-h-11 items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    Tiếp tục: Nhập kích thước & quy cách <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* BƯỚC 2: QUY CÁCH & KÍCH THƯỚC */}
            {wizardStep === 2 && (
              <div className="space-y-5 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Ruler className="h-4 w-4 text-red-600" /> Thông số kích thước: {currentConfig.name}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Bước 2/3</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {/* Kiểu cánh (chỉ cửa thép/kính) */}
                    {currentConfig.hasLeafType && (
                      <div>
                        <label className="block text-[11px] text-slate-600 font-medium mb-1">Kiểu cánh</label>
                        <select
                          value={leafType}
                          onChange={(e) => setLeafType(e.target.value)}
                          className="w-full h-10 border border-slate-300 rounded-md px-2 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                        >
                          {LEAF_TYPES.map((l) => (
                            <option key={l.id} value={l.id}>{l.label}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Chiều rộng */}
                    <div>
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">Chiều rộng (mm)</label>
                      <input
                        type="number"
                        min={100}
                        max={20000}
                        step={10}
                        value={widthMm}
                        onChange={(e) => setWidthMm(Number(e.target.value))}
                        className="w-full h-10 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                      />
                    </div>

                    {/* Chiều cao */}
                    <div>
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">Chiều cao (mm)</label>
                      <input
                        type="number"
                        min={100}
                        max={20000}
                        step={10}
                        value={heightMm}
                        onChange={(e) => setHeightMm(Number(e.target.value))}
                        className="w-full h-10 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                      />
                    </div>

                    {/* Chiều sâu (Tủ điện, Tủ rack, Shelter, Tủ nguồn) */}
                    {currentConfig.hasDepth && (
                      <div>
                        <label className="block text-[11px] text-slate-600 font-medium mb-1">Chiều sâu (mm)</label>
                        <input
                          type="number"
                          min={100}
                          max={10000}
                          step={10}
                          value={depthMm}
                          onChange={(e) => setDepthMm(Number(e.target.value))}
                          className="w-full h-10 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                        />
                      </div>
                    )}

                    {/* Chiều dài tuyến (Thang máng cáp) */}
                    {currentConfig.hasLengthM && (
                      <div>
                        <label className="block text-[11px] text-slate-600 font-medium mb-1">Chiều dài (m)</label>
                        <input
                          type="number"
                          min={1}
                          max={50000}
                          step={5}
                          value={lengthM}
                          onChange={(e) => setLengthM(Number(e.target.value))}
                          className="w-full h-10 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                        />
                      </div>
                    )}

                    {/* Số lượng */}
                    <div>
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">
                        {currentConfig.hasLengthM ? 'Số mét / Tuyến' : 'Số lượng (Bộ / Tủ)'}
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10000}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                        className="w-full h-10 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600 font-bold"
                      />
                    </div>
                  </div>

                  {/* Cơ điện viễn thông */}
                  {!isFireRated && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      {currentConfig.hasIpRating && (
                        <div>
                          <label className="block text-[11px] text-slate-600 font-medium mb-1">Cấp bảo vệ IP</label>
                          <select
                            value={ipRating}
                            onChange={(e) => setIpRating(e.target.value)}
                            className="w-full h-10 border border-slate-300 rounded-md px-2 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                          >
                            {IP_RATINGS.map((ip) => (
                              <option key={ip} value={ip}>{ip}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className={!currentConfig.hasIpRating ? 'sm:col-span-1.5' : ''}>
                        <label className="block text-[11px] text-slate-600 font-medium mb-1">Hoàn thiện bề mặt</label>
                        <select
                          value={finish}
                          onChange={(e) => setFinish(e.target.value)}
                          className="w-full h-10 border border-slate-300 rounded-md px-2 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                        >
                          {FINISH_OPTIONS.map((f) => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                      </div>

                      <div className={!currentConfig.hasIpRating ? 'sm:col-span-1.5' : ''}>
                        <label className="block text-[11px] text-slate-600 font-medium mb-1">Vật liệu / Độ dày</label>
                        <select
                          value={material}
                          onChange={(e) => setMaterial(e.target.value)}
                          className="w-full h-10 border border-slate-300 rounded-md px-2 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                        >
                          {MATERIAL_OPTIONS.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Phụ kiện cửa (chỉ cửa thép/kính) */}
                  {currentConfig.hasDoorAccessories && (
                    <div className="mt-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <span className="block font-bold text-slate-900 mb-2">Phụ kiện đồng bộ theo cửa:</span>
                      <div className="flex flex-wrap gap-4">
                        <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 min-h-8">
                          <input
                            type="checkbox"
                            checked={hasDoorCloser}
                            onChange={(e) => setHasDoorCloser(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-600"
                          />
                          <span>Tay co thủy lực tự đóng</span>
                        </label>
                        <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 min-h-8">
                          <input
                            type="checkbox"
                            checked={hasPanicBar}
                            onChange={(e) => setHasPanicBar(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-600"
                          />
                          <span>Khóa thanh thoát hiểm (Panic bar)</span>
                        </label>
                        <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 min-h-8">
                          <input
                            type="checkbox"
                            checked={hasVisionGlass}
                            onChange={(e) => setHasVisionGlass(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-600"
                          />
                          <span>Ô kính quan sát ngăn cháy</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="inline-flex min-h-11 items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                  >
                    <ChevronLeft className="h-4 w-4" /> Quay lại
                  </button>
                  <button
                    type="button"
                    onClick={() => setWizardStep(3)}
                    className="inline-flex min-h-11 items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    Tiếp tục: Thông tin dự án <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* BƯỚC 3: THÔNG TIN DỰ ÁN & GỬI BÁO GIÁ */}
            {wizardStep === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-red-600" /> Thông tin công trình & Người nhận dự toán
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Bước 3/3</span>
                  </div>

                  {/* Tóm tắt cấu hình đã chọn */}
                  <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-700">
                      <strong>Cấu hình:</strong> {currentConfig.name}{' '}
                      {isFireRated ? `(${fireRating})` : ''} -{' '}
                      {currentConfig.hasLeafType ? `${LEAF_TYPES.find((l) => l.id === leafType)?.label} - ` : ''}
                      {widthMm}x{heightMm} mm ({quantity} {currentConfig.hasLengthM ? 'mét' : 'bộ'})
                    </div>
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="text-red-700 hover:underline text-[11px] font-semibold"
                    >
                      Sửa cấu hình
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">
                        Họ và tên người nhận <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full h-10 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">
                        Số điện thoại / Zalo <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0912 xxx xxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-10 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">Email nhận dự toán (nếu có)</label>
                      <input
                        type="email"
                        placeholder="duan@congty.vn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">Công ty / Nhà thầu (nếu có)</label>
                      <input
                        type="text"
                        placeholder="Công ty Xây dựng / Cơ điện ABC"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full h-10 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">Tên dự án / Địa điểm công trình</label>
                      <input
                        type="text"
                        placeholder="KCN VSIP Bắc Ninh, Tòa nhà Hà Nội, Nhà xưởng Hải Phòng..."
                        value={projectLocation}
                        onChange={(e) => setProjectLocation(e.target.value)}
                        className="w-full h-10 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-[11px] text-slate-600 font-medium mb-1">Ghi chú yêu cầu kỹ thuật đặc thù</label>
                    <input
                      type="text"
                      placeholder="Mã màu sơn RAL, tiến độ bàn giao, cấp kiểm định PCCC hoặc chứng chỉ xuất xưởng..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full h-10 border border-slate-300 rounded-md px-2.5 text-xs bg-white text-slate-900 outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                {/* Bẫy chống bot */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </label>
                </div>

                {/* Đồng ý xử lý dữ liệu cá nhân (Nghị định 13/2023) */}
                <label className="flex items-start gap-2 text-[11px] leading-5 text-slate-600 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-red-600"
                  />
                  <span>
                    Tôi đồng ý để APEX lưu và xử lý thông tin trên nhằm liên hệ tư vấn, báo giá theo{' '}
                    <a href="/chinh-sach-bao-mat" target="_blank" rel="noopener noreferrer" className="font-semibold text-red-700 underline">
                      chính sách bảo mật
                    </a>
                    .
                  </span>
                </label>

                {/* Nút hành động */}
                <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="inline-flex min-h-11 items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 w-full sm:w-auto"
                  >
                    <ChevronLeft className="h-4 w-4" /> Quay lại bước 2
                  </button>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleResetAndClose}
                      className="min-h-11 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="min-h-11 flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-2.5 rounded-lg transition-colors shadow-md disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                          <span>Đang gửi dự toán...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Gửi yêu cầu dự toán công trình</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
