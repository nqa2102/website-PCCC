// Dữ liệu chi tiết theo danh mục (Category Detail Landing Page)
// Áp dụng cho mô hình 1 trang chi tiết duy nhất cho mỗi danh mục, thay thế cho lưới sản phẩm con.
// Tài liệu tham chiếu: docs/PROMPT-TRANG-CHI-TIET-DANH-MUC.md & docs/mockup/chi-tiet-cua-thep.html

// Ảnh sản phẩm thật Cửa Thép Ngăn Cháy
import cuaThepCover from '../assets/images/products/cua-thep-ngan-chay-cover.webp';
import cuaThepEi90_1Cover from '../assets/images/products/cua-thep-ei90-1-canh-cover.webp';
import cuaThepEi90_2Cover from '../assets/images/products/cua-thep-ei90-2-canh-cover.webp';
import cuaThepEi70Cover from '../assets/images/products/cua-thep-ei70-1-canh-cover.webp';
import cuaThepEi120Cover from '../assets/images/products/cua-thep-ei120-2-canh-cover.webp';

import cuaThepProj1 from '../assets/images/products/cua-thep-ngan-chay-2.webp';
import cuaThepProj2 from '../assets/images/products/cua-thep-ngan-chay-3.webp';
import cuaThepProj3 from '../assets/images/products/cua-thep-ngan-chay-4.webp';

// Ảnh sản phẩm thật Cửa Kính Ngăn Cháy
import cuaKinhCover from '../assets/images/products/cua-kinh-ngan-chay-cover.webp';
import cuaKinhEi60Cover from '../assets/images/products/cua-kinh-ngan-chay-ei60-cover.webp';
import cuaKinhEi90Cover from '../assets/images/products/cua-kinh-ngan-chay-ei90-cover.webp';
import vachKinhCover from '../assets/images/products/vach-kinh-ngan-chay-ei60-ei90-cover.webp';
import cuaKinhProj1 from '../assets/images/products/cua-kinh-ngan-chay-2.webp';
import cuaKinhProj2 from '../assets/images/products/cua-kinh-ngan-chay-3.webp';
import cuaKinhProj3 from '../assets/images/products/cua-kinh-ngan-chay-4.webp';

// Ảnh các nhóm cơ điện & ngăn cháy còn lại
import rollerShutterImage from '../assets/images/product_fire_roller_shutter_1790648844563.webp';
import fireCurtainImage from '../assets/images/product_fire_curtain_1790648858516.webp';
import electricalCabinetImage from '../assets/images/product_electrical_cabinet.jpg';
import cableTrayImage from '../assets/images/product_cable_tray.jpg';
import serverRackImage from '../assets/images/product_server_rack.jpg';
import telecomShelterImage from '../assets/images/product_telecom_shelter.jpg';
import outdoorCabinetImage from '../assets/images/product_outdoor_cabinet.jpg';

export interface CategoryDetail {
  slug: string;              // trùng id danh mục, vd 'cua-thep-ngan-chay'
  name: string;
  priceFrom?: string;        // "1.600.000 đ/m²" | undefined -> ẩn dòng giá
  intro: string;
  sellingPoints: string[];   // 3 ý cam kết bán hàng
  quickSpec: { label: string; value: string }[];   // bảng tóm tắt ở hero
  advantages: string[];      // gạch đầu dòng mục Ưu điểm
  uses: { icon: string; title: string; desc: string }[]; // thẻ công dụng
  specTable: { label: string; value: string }[];   // thông số chi tiết
  quote?: {                  // undefined -> ẩn mục 5, chỉ hiện nút báo giá
    model: string;           // "cửa 1 cánh, 0.9 × 2.2m"
    rows: { name: string; unit: string; qty: string; price: string; amount: string }[];
    total: string;
    note?: string;
  };
  gallery: string[];         // import ảnh thật; [] -> ẩn mục 3
  projectImages: string[];   // [] -> ẩn mục 3 (hoặc dùng chung gallery)
  relatedSlugs: string[];    // 3 danh mục khác
}

export const CATEGORY_DETAILS: Record<string, CategoryDetail> = {
  // ==========================================
  // 1. CỬA THÉP NGĂN CHÁY (Điền đầy đủ 100% từ mockup)
  // ==========================================
  'cua-thep-ngan-chay': {
    slug: 'cua-thep-ngan-chay',
    name: 'Cửa Thép Ngăn Cháy',
    priceFrom: '1.600.000 đ/m²',
    intro:
      'Cửa đi thép ngăn cháy 1 cánh và 2 cánh, khung cánh thép gia cường, lõi cách nhiệt ngăn lửa và khói độc. Sản xuất theo hồ sơ thiết kế và kích thước khảo sát thực tế tại công trình.',
    sellingPoints: [
      'Đã kiểm định PCCC',
      'Giao hàng toàn quốc',
      'Miễn phí tư vấn, thiết kế theo yêu cầu',
    ],
    quickSpec: [
      { label: 'Cấp độ ngăn cháy', value: 'EI60 / EI70 / EI90 / EI120' },
      { label: 'Loại cửa', value: '1 cánh & 2 cánh' },
      { label: 'Cánh cửa', value: 'Dày 50mm, thép 0.7–1.0mm (JIS G3141)' },
      { label: 'Khung cửa', value: 'Thép 1.2–1.4mm, tăng cứng 1.5–2mm' },
      { label: 'Lõi trong cánh', value: 'ERON (MgO), bông khoáng, vải thủy tinh' },
      { label: 'Màu sơn', value: 'Sơn tĩnh điện Jotun / vân gỗ' },
      { label: 'Bảo hành', value: '24 tháng' },
    ],
    advantages: [
      'Chịu lửa EI60 – EI120, đã kiểm định phương tiện PCCC',
      'Ngăn khói và khí độc lan rộng nhờ gioăng chuyên dụng kín khít',
      'Thép tấm tiêu chuẩn JIS G3141 chống ăn mòn, không cong vênh theo thời gian',
      'Lõi cách nhiệt ERON (MgO), bông khoáng, vải thủy tinh và keo chống cháy',
      'Cách âm tốt, bản lề chắc, đóng mở êm nhẹ',
      'Thẩm mỹ cao: sơn tĩnh điện bền màu, có tùy chọn vân gỗ',
    ],
    uses: [
      {
        icon: 'flame',
        title: 'Ngăn lửa lan',
        desc: 'Giữ lửa trong khoang cháy, kéo dài thời gian thoát hiểm và xử lý sự cố.',
      },
      {
        icon: 'shield-half',
        title: 'Chống bắt lửa',
        desc: 'Thép dày sơn tĩnh điện kết hợp lõi chống cháy, cản đám cháy lan rộng.',
      },
      {
        icon: 'wind',
        title: 'Chặn khói & khí độc',
        desc: 'Gioăng kín ngăn khói và khí CO độc, bảo vệ đường thở khi thoát nạn.',
      },
      {
        icon: 'ear',
        title: 'Cách âm',
        desc: 'Kết cấu đặc và gioăng kín giúp giảm ồn, giữ không gian yên tĩnh.',
      },
    ],
    specTable: [
      { label: 'Loại / KT tiêu chuẩn', value: 'Cửa đi thép ngăn cháy 1 cánh, 2 cánh' },
      { label: 'Cấp độ ngăn cháy', value: 'EI60, EI70, EI90, EI120 (phút)' },
      { label: 'Vật liệu chính', value: 'Thép tấm tiêu chuẩn' },
      { label: 'Thép cánh cửa', value: 'Độ dày 0.7mm, 0.8mm, 1.0mm (JIS G3141)' },
      { label: 'Độ dày cánh cửa', value: '50mm (± 2%)' },
      { label: 'Thép làm khung cửa', value: '1.2mm, 1.4mm, tăng cứng 1.5–2mm' },
      {
        label: 'Kích thước mặt cắt ngang khung',
        value:
          'W(45/85) × D(100/115) / bao cả hèm 85×115mm, phào che khe tường 40mm một cạnh, có bậc dán zoăng chặn khói',
      },
      {
        label: 'Vật liệu trong cánh',
        value: 'ERON (thành phần chính Magie Oxide), bông khoáng, vải thủy tinh',
      },
      { label: 'Zoăng chặn khói', value: 'Zoăng chuyên dụng ngăn chặn khói' },
      { label: 'Vị trí lắp khóa', value: '1100mm tính từ cạnh dưới cánh cửa (nếu có)' },
      { label: 'Sơn / Màu sơn tiêu chuẩn', value: 'Sơn tĩnh điện theo màu Jotun, sơn màu vân gỗ' },
    ],
    quote: {
      model: 'cửa 1 cánh, mẫu 0.9 × 2.2m',
      rows: [
        {
          name: 'Cửa thép ngăn cháy tiêu chuẩn 60 phút, KT 900×2200',
          unit: 'm²',
          qty: '1.98',
          price: '1.600.000',
          amount: '3.168.000',
        },
        {
          name: 'Bản lề inox',
          unit: 'cái',
          qty: '4',
          price: '60.000',
          amount: '240.000',
        },
        {
          name: 'Doorsill inox',
          unit: 'md',
          qty: '0.9',
          price: '180.000',
          amount: '162.000',
        },
        {
          name: 'Khóa cửa MZ16-304C',
          unit: 'Bộ',
          qty: '1',
          price: '400.000',
          amount: '400.000',
        },
        {
          name: 'Tay co thủy lực Oval',
          unit: 'Bộ',
          qty: '1',
          price: '350.000',
          amount: '350.000',
        },
      ],
      total: '4.320.000',
      note: 'Dự toán mẫu cho cửa 1 cánh EI60, KT 900×2200. Giá chính xác căn cứ bản vẽ, kích thước đo đạc thực tế và phụ kiện đồng bộ. Chi phí kiểm định PCCC tính riêng (liên hệ).',
    },
    gallery: [
      cuaThepCover,
      cuaThepEi90_1Cover,
      cuaThepEi90_2Cover,
      cuaThepEi70Cover,
      cuaThepEi120Cover,
    ],
    projectImages: [cuaThepProj1, cuaThepProj2, cuaThepProj3],
    relatedSlugs: ['cua-kinh-ngan-chay', 'cua-cuon-ngan-chay', 'rem-ngan-chay'],
  },

  // ==========================================
  // 2. CỬA KÍNH NGĂN CHÁY (Điền đầy đủ 100% theo template chuẩn)
  // ==========================================
  'cua-kinh-ngan-chay': {
    slug: 'cua-kinh-ngan-chay',
    name: 'Cửa Kính Ngăn Cháy',
    priceFrom: '4.300.000 đ/m²',
    intro:
      'Cửa kính ngăn cháy EI60, 01 cánh mở quay 1 chiều đạt tiêu chuẩn kiểm định PCCC. Thép khung bao dày 1.5mm (W50×D100mm), thép khung cánh dày 1.2mm (W100/120×D50mm) kèm nẹp kính và rãnh gioăng khói. Kính ngăn cháy tiêu chuẩn EI60 độ dày 27mm, đảm bảo tầm nhìn thông thoáng và an toàn cách nhiệt tối ưu.',
    sellingPoints: [
      'Đã kiểm định phương tiện PCCC',
      'Lấy sáng tự nhiên, thẩm mỹ kiến trúc mở',
      'Miễn phí tư vấn, thiết kế theo yêu cầu',
    ],
    quickSpec: [
      { label: 'Ký hiệu / Model', value: '2CG-FGD60S1 (1 cánh mở quay 1 chiều)' },
      { label: 'Cấp độ ngăn cháy', value: 'EI60 (60 phút)' },
      { label: 'Kích thước tiêu chuẩn', value: 'W 900 × H 2200mm (1.98 m²)' },
      { label: 'Khung bao', value: 'Thép dày 1.5mm (W50 × D100mm)' },
      { label: 'Khung cánh', value: 'Thép dày 1.2mm (W100/120 × D50mm), nẹp kính & chân gioăng khói' },
      { label: 'Kính ngăn cháy', value: 'Kính ngăn cháy tiêu chuẩn EI60, độ dày 27mm' },
      { label: 'Phụ kiện kèm theo', value: 'Bản lề BL-SU201, Doorsill DS-SU201, Khóa MZ16-304C, Tay co Oval DC-071' },
      { label: 'Bảo hành', value: '12 tháng (cửa và phụ kiện)' },
    ],
    advantages: [
      'Chịu lửa cách nhiệt EI60 (60 phút), ngăn ngọn lửa và bức xạ nhiệt theo chuẩn QCVN 06:2022/BXD',
      'Độ truyền sáng cao (> 82%), tạo tầm nhìn thông thoáng và vẻ đẹp sang trọng cho công trình',
      'Kính chống cháy đa tầng độ dày 27mm tự động phồng nở tạo màng chắn nhiệt khi gặp nhiệt độ cao',
      'Khung bao thép 1.5mm và khung cánh 1.2mm chịu lực cao, chống biến dạng và chống rung lắc',
      'Khả năng cách âm, giảm ồn vượt trội (> 38dB), giữ không gian làm việc luôn yên tĩnh',
      'Phụ kiện bản lề Inox SU201, khóa an toàn tay gạt Inox 304 và tay co Oval đồng bộ kiểm định PCCC',
    ],
    uses: [
      {
        icon: 'flame',
        title: 'Ngăn lửa & bức xạ nhiệt',
        desc: 'Kính đa tầng dày 27mm tạo màng chắn bọt xốp cách nhiệt, bảo vệ an toàn lối thoát hiểm.',
      },
      {
        icon: 'scan',
        title: 'Lấy sáng & kiến trúc mở',
        desc: 'Tối ưu độ truyền sáng, mở rộng không gian và tầm nhìn cho sảnh, hành lang và văn phòng.',
      },
      {
        icon: 'wind',
        title: 'Chặn khói & khí độc',
        desc: 'Hệ gioăng kép chuyên dụng và rãnh chèn gioăng chặn khói bịt kín khói và khí CO lan rộng.',
      },
      {
        icon: 'ear',
        title: 'Cách âm & giảm ồn',
        desc: 'Kết cấu kính ghép đa lớp giúp giảm nhiệt truyền qua và cách âm chống ồn vượt trội (> 38dB).',
      },
    ],
    specTable: [
      { label: 'Ký hiệu sản phẩm', value: '2CG-FGD60S1 (theo mẫu báo giá tiêu chuẩn)' },
      { label: 'Loại / KT tiêu chuẩn', value: 'Cửa kính ngăn cháy 1 cánh mở quay (KT tiêu chuẩn 900×2200mm, 1.98 m²)' },
      { label: 'Cấp độ ngăn cháy', value: 'EI60 (60 phút)' },
      { label: 'Vật liệu chính', value: 'Thép làm khung bao dày 1.5mm; thép làm khung cánh dày 1.2mm' },
      { label: 'Kính ngăn cháy', value: 'Kính ngăn cháy tiêu chuẩn EI60 phút, độ dày 27mm' },
      {
        label: 'Kích thước mặt cắt ngang khung',
        value:
          'Khung bao: W50×D100mm; Khung cánh: W100×D50mm / W120×D50mm bao gồm cả nẹp kính có dán chân gioăng ngăn khói chuyên dụng',
      },
      { label: 'Bản lề kèm theo', value: 'Bản lề INOX SU201 (BL-SU201)' },
      { label: 'Doorsill', value: 'Doorsill Inox SU201; độ dày 1.2mm (DS-SU201)' },
      {
        label: 'Khóa cửa an toàn',
        value:
          'Khóa an toàn loại tay gạt INOX-304, 01 đầu chìa khóa, 01 chốt trong, có chốt gạt: nhờ chống va đập, lõi khóa bằng đồng (MZ16-304C)',
      },
      {
        label: 'Tay co thủy lực',
        value: 'Tay co thủy lực: DC-071 Lực co 61-85kg (OEM by Oval) / Dùng cho loại cửa có chiều rộng từ 950mm trở lên',
      },
      { label: 'Công thi công, vận chuyển', value: 'Công thi công CNC Tiêu chuẩn (Từ 1.5m² đến 2.8m²)' },
      { label: 'Bảo hành', value: '12 tháng với cửa và 12 tháng với phụ kiện theo tiêu chuẩn nhà sản xuất' },
    ],
    quote: {
      model: 'cửa kính EI60 01 cánh mở quay, KT 0.9 × 2.2m',
      rows: [
        {
          name: 'Cửa kính ngăn cháy EI60, 01 cánh mở quay 1 chiều (KT 900×2200, kính dày 27mm)',
          unit: 'm²',
          qty: '1.98',
          price: '4.300.000',
          amount: '8.514.000',
        },
        {
          name: 'Bản lề INOX SU201 (BL-SU201)',
          unit: 'cái',
          qty: '4',
          price: '60.000',
          amount: '240.000',
        },
        {
          name: 'Doorsill Inox SU201; 1.2mm (DS-SU201)',
          unit: 'md',
          qty: '0.9',
          price: '180.000',
          amount: '162.000',
        },
        {
          name: 'Khóa an toàn loại tay gạt INOX-304 (MZ16-304C)',
          unit: 'Bộ',
          qty: '1',
          price: '400.000',
          amount: '400.000',
        },
        {
          name: 'Tay co thủy lực Oval DC-071 (lực co 61-85kg)',
          unit: 'Bộ',
          qty: '1',
          price: '350.000',
          amount: '350.000',
        },
        {
          name: 'Công thi công CNC Tiêu chuẩn (Từ 1.5m² đến 2.8m²)',
          unit: 'm²',
          qty: '1.98',
          price: '500.000',
          amount: '990.000',
        },
      ],
      total: '10.656.000',
      note: 'Dự toán theo mẫu báo giá tiêu chuẩn cho 01 bộ cửa kính ngăn cháy EI60 kích thước 900×2200. Giá chưa bao gồm thuế VAT (đã bao gồm chi phí bảo hành 12 tháng với cửa và 12 tháng với phụ kiện theo tiêu chuẩn nhà sản xuất). Chi phí kiểm định PCCC tính riêng (liên hệ).',
    },
    gallery: [
      cuaKinhCover,
      cuaKinhEi60Cover,
      cuaKinhEi90Cover,
      vachKinhCover,
      cuaKinhProj1,
    ],
    projectImages: [cuaKinhProj1, cuaKinhProj2, cuaKinhProj3],
    relatedSlugs: ['cua-thep-ngan-chay', 'cua-cuon-ngan-chay', 'rem-ngan-chay'],
  },

  // ==========================================
  // 3. CỬA CUỐN NGĂN CHÁY (Khung rỗng chờ Phase 4)
  // ==========================================
  'cua-cuon-ngan-chay': {
    slug: 'cua-cuon-ngan-chay',
    name: 'Cửa Cuốn Ngăn Cháy',
    intro:
      'Cửa cuốn thép ngăn cháy khoang mở siêu trường nhịp lớn, đóng kín tự động khi nhận tín hiệu báo cháy từ tủ điều khiển trung tâm.',
    sellingPoints: [],
    quickSpec: [
      { label: 'Cấp độ ngăn cháy', value: 'EI60 / EI70 / EI90 / EI120' },
      { label: 'Nan cửa', value: 'Nan thép 2 lớp nhồi bông khoáng chống cháy' },
      { label: 'Hệ điều khiển', value: 'Motor chống cháy kèm bộ lưu điện UPS' },
      { label: 'Bảo hành', value: '24 tháng' },
    ],
    advantages: [],
    uses: [],
    specTable: [
      { label: 'Cấp độ ngăn cháy', value: 'EI60, EI70, EI90, EI120' },
      { label: 'Vật liệu nan cửa', value: 'Thép mạ kẽm sơn tĩnh điện 2 lớp' },
      { label: 'Lõi cách nhiệt', value: 'Bông khoáng gốm Ceramic chống cháy' },
      { label: 'Hệ thống motor', value: 'Motor tải trọng lớn tích hợp xích kéo tay cơ' },
      { label: 'Bộ lưu điện', value: 'UPS tự động kích hoạt khi mất điện lưới' },
      { label: 'Bảo hành', value: '24 tháng' },
    ],
    gallery: [rollerShutterImage],
    projectImages: [],
    relatedSlugs: ['cua-thep-ngan-chay', 'rem-ngan-chay', 'cua-kinh-ngan-chay'],
  },

  // ==========================================
  // 4. RÈM NGĂN CHÁY & KHÓI (Khung rỗng chờ Phase 4)
  // ==========================================
  'rem-ngan-chay': {
    slug: 'rem-ngan-chay',
    name: 'Rèm Ngăn Cháy & Khói',
    intro:
      'Vải sợi thủy tinh gia cường sợi thép kỹ thuật cao, giấu âm trần thẩm mỹ, tự động hạ trọng lực khoanh vùng khói độc khi có báo động cháy.',
    sellingPoints: [],
    quickSpec: [
      { label: 'Cấp độ ngăn cháy', value: 'EI60 / EI90 / Ngăn khói' },
      { label: 'Vật liệu rèm', value: 'Vải sợi thủy tinh dệt sợi inox bọc PU/Silicone' },
      { label: 'Cơ chế hạ', value: 'Trọng lực an toàn (Gravity Fail-Safe)' },
      { label: 'Bảo hành', value: '24 tháng' },
    ],
    advantages: [],
    uses: [],
    specTable: [
      { label: 'Cấp độ bảo vệ', value: 'Ngăn cháy EI60, EI90 / Ngăn khói chuyên dụng' },
      { label: 'Vải rèm', value: 'Sợi thủy tinh gia cường dây thép chịu nhiệt độ cao' },
      { label: 'Hộp cuốn & Ray dẫn hướng', value: 'Thép mạ kẽm định hình giấu âm trần' },
      { label: 'Động cơ', value: 'Motor 24VDC có cơ chế nhả phanh trọng lực' },
      { label: 'Bảo hành', value: '24 tháng' },
    ],
    gallery: [fireCurtainImage],
    projectImages: [],
    relatedSlugs: ['cua-thep-ngan-chay', 'cua-cuon-ngan-chay', 'cua-kinh-ngan-chay'],
  },

  // ==========================================
  // 5. TỦ ĐIỆN PHÂN PHỐI & ĐIỀU KHIỂN (Khung rỗng chờ Phase 4)
  // ==========================================
  'tu-dien': {
    slug: 'tu-dien',
    name: 'Tủ Điện Phân Phối & Điều Khiển',
    intro:
      'Vỏ tủ điện hạ thế, tủ tổng MSB, tủ phân phối DB, tủ ATS và tủ điều khiển bơm PCCC gia công CNC chính xác từ thép mạ kẽm sơn tĩnh điện tiêu chuẩn.',
    sellingPoints: [],
    quickSpec: [
      { label: 'Tiêu chuẩn chế tạo', value: 'IEC 61439-1/2, TCVN' },
      { label: 'Cấp bảo vệ', value: 'IP31 - IP54 (trong nhà) / IP55 - IP65 (ngoài trời)' },
      { label: 'Vật liệu vỏ', value: 'Thép cán nguội 1.2 - 2.0mm, sơn tĩnh điện RAL 7032/7035' },
      { label: 'Bảo hành', value: '12 - 24 tháng' },
    ],
    advantages: [],
    uses: [],
    specTable: [
      { label: 'Loại tủ', value: 'Tủ điện tổng MSB, tủ DB, tủ điều khiển bơm PCCC, tủ ATS' },
      { label: 'Tiêu chuẩn áp dụng', value: 'IEC 61439-1/2' },
      { label: 'Độ dày thép vỏ tủ', value: '1.2mm, 1.5mm, 2.0mm' },
      { label: 'Cấp bảo vệ vỏ tủ', value: 'IP42, IP54, IP65' },
      { label: 'Xử lý bề mặt', value: 'Sơn tĩnh điện bột ngoài trời / trong nhà' },
      { label: 'Bảo hành', value: '12 - 24 tháng' },
    ],
    gallery: [electricalCabinetImage],
    projectImages: [],
    relatedSlugs: ['thang-mang-cap', 'tu-rack', 'tu-nguon-outdoor'],
  },

  // ==========================================
  // 6. THANG MÁNG CÁP ĐIỆN (Khung rỗng chờ Phase 4)
  // ==========================================
  'thang-mang-cap': {
    slug: 'thang-mang-cap',
    name: 'Thang Máng Cáp Điện',
    intro:
      'Hệ thống máng cáp (Cable Trunking), thang cáp (Cable Ladder) và khay cáp mạ kẽm nhúng nóng, sơn tĩnh điện bảo vệ an toàn tuyến dây điện lực và PCCC.',
    sellingPoints: [],
    quickSpec: [
      { label: 'Chủng loại', value: 'Thang cáp, máng cáp, khay cáp & phụ kiện' },
      { label: 'Vật liệu', value: 'Thép tấm tiêu chuẩn 1.0 - 2.5mm' },
      { label: 'Bề mặt hoàn thiện', value: 'Mạ kẽm nhúng nóng, tôn mạ kẽm, sơn tĩnh điện' },
      { label: 'Bảo hành', value: '12 - 24 tháng' },
    ],
    advantages: [],
    uses: [],
    specTable: [
      { label: 'Quy cách', value: 'Chiều rộng 50 - 1000mm, chiều cao 50 - 200mm' },
      { label: 'Độ dày vật liệu', value: '1.0mm, 1.2mm, 1.5mm, 2.0mm, 2.5mm' },
      { label: 'Chiều dài tiêu chuẩn', value: '2500mm / 3000mm mỗi cây' },
      { label: 'Phương pháp bảo vệ', value: 'Sơn tĩnh điện, mạ kẽm điện phân, mạ kẽm nhúng nóng' },
      { label: 'Phụ kiện đồng bộ', value: 'Co ngang, tê, chữ thập, giảm, nẹp nối, giá đỡ' },
      { label: 'Bảo hành', value: '12 - 24 tháng' },
    ],
    gallery: [cableTrayImage],
    projectImages: [],
    relatedSlugs: ['tu-dien', 'tu-rack', 'nha-tram-shelter'],
  },

  // ==========================================
  // 7. TỦ RACK MẠNG & VIỄN THÔNG (Khung rỗng chờ Phase 4)
  // ==========================================
  'tu-rack': {
    slug: 'tu-rack',
    name: 'Tủ Rack Mạng & Viễn Thông',
    intro:
      'Tủ mạng 19 inch tiêu chuẩn quốc tế EIA-310-D từ 6U đến 42U, kết cấu thép gia cường chịu tải trọng lớn, tối ưu hóa lưu thông khí làm mát server.',
    sellingPoints: [],
    quickSpec: [
      { label: 'Tiêu chuẩn', value: '19 inch EIA-310-D' },
      { label: 'Kích cỡ', value: '6U, 10U, 15U, 20U, 27U, 32U, 42U (D600 - D1000)' },
      { label: 'Tải trọng', value: 'Lên tới 800 - 1000kg (cho tủ 42U Server)' },
      { label: 'Bảo hành', value: '24 tháng' },
    ],
    advantages: [],
    uses: [],
    specTable: [
      { label: 'Tiêu chuẩn thiết kế', value: 'EIA-310-D, DIN 41494' },
      { label: 'Dung tích', value: '6U, 12U, 15U, 27U, 36U, 42U' },
      { label: 'Chiều sâu (D)', value: 'D600, D800, D1000, D1100 mm' },
      { label: 'Vật liệu', value: 'Thép cán nguội SPCC chất lượng cao' },
      { label: 'Cửa tủ', value: 'Cửa lưới tổ ong thông thoáng 75% / cửa mica' },
      { label: 'Bảo hành', value: '24 tháng' },
    ],
    gallery: [serverRackImage],
    projectImages: [],
    relatedSlugs: ['tu-dien', 'thang-mang-cap', 'nha-tram-shelter'],
  },

  // ==========================================
  // 8. NHÀ TRẠM VIỄN THÔNG SHELTER (Khung rỗng chờ Phase 4)
  // ==========================================
  'nha-tram-shelter': {
    slug: 'nha-tram-shelter',
    name: 'Nhà Trạm Viễn Thông Shelter',
    intro:
      'Nhà trạm module lắp ghép panel sandwich polyurethane (PU) cách nhiệt, chống nước, chống ăn mòn dã ngoại cho các trạm thu phát sóng viễn thông BTS.',
    sellingPoints: [],
    quickSpec: [
      { label: 'Kết cấu', value: 'Module lắp ghép panel sandwich PU tỷ trọng cao' },
      { label: 'Khả năng cách nhiệt', value: 'Hệ số truyền nhiệt K ≤ 0.025 W/m.K' },
      { label: 'Độ bền môi trường', value: 'Chống thấm nước IP54/IP55, chịu gió bão cấp 12' },
      { label: 'Bảo hành', value: '24 tháng' },
    ],
    advantages: [],
    uses: [],
    specTable: [
      { label: 'Quy cách kích thước', value: 'Gia công theo thiết kế trạm BTS dã ngoại' },
      { label: 'Vật liệu vỏ panel', value: 'Tôn mạ màu / tôn mạ kẽm dập gân tăng cứng' },
      { label: 'Lõi cách nhiệt', value: 'Polyurethane (PU) tỷ trọng 40 - 45 kg/m³' },
      { label: 'Khung sàn & đế', value: 'Thép hình chữ I, U mạ kẽm nhúng nóng' },
      { label: 'Hệ thống phụ trợ', value: 'Cửa thoát hiểm, lỗ luồn cáp feeder, quạt hút DC' },
      { label: 'Bảo hành', value: '24 tháng' },
    ],
    gallery: [telecomShelterImage],
    projectImages: [],
    relatedSlugs: ['tu-nguon-outdoor', 'tu-rack', 'tu-dien'],
  },

  // ==========================================
  // 9. TỦ NGUỒN OUTDOOR (Khung rỗng chờ Phase 4)
  // ==========================================
  'tu-nguon-outdoor': {
    slug: 'tu-nguon-outdoor',
    name: 'Tủ Nguồn Outdoor',
    intro:
      'Tủ nguồn ngoài trời kết cấu 2 lớp vỏ cách nhiệt IP55/IP65, bảo vệ bộ chỉnh lưu nguồn rectifier, thiết bị mạng và hệ thống ắc quy viễn thông.',
    sellingPoints: [],
    quickSpec: [
      { label: 'Cấp bảo vệ', value: 'IP55 / IP65 chống bụi và nước áp lực' },
      { label: 'Kết cấu', value: '2 lớp vỏ cách nhiệt chống hấp thụ bức xạ mặt trời' },
      { label: 'Hệ thống làm mát', value: 'Quạt hút tản nhiệt tự nhiên / Máy lạnh mini DC' },
      { label: 'Bảo hành', value: '24 tháng' },
    ],
    advantages: [],
    uses: [],
    specTable: [
      { label: 'Cấp bảo vệ', value: 'IP55, IP65 theo IEC 60529' },
      { label: 'Vật liệu vỏ', value: 'Thép mạ kẽm 1.5 - 2.0mm / Hợp kim nhôm' },
      { label: 'Khóa cửa', value: 'Khóa bảo mật 3 điểm chuyên dụng ngoài trời' },
      { label: 'Cách nhiệt', value: 'Khoang đệm 2 lớp vỏ kèm mút PE cách nhiệt' },
      { label: 'Phân khoang', value: 'Khoang nguồn, khoang ắc quy và khoang thiết bị riêng' },
      { label: 'Bảo hành', value: '24 tháng' },
    ],
    gallery: [outdoorCabinetImage],
    projectImages: [],
    relatedSlugs: ['nha-tram-shelter', 'tu-dien', 'tu-rack'],
  },
};
