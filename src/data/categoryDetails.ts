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

// Ảnh sản phẩm thật Cửa Thép Vân Gỗ Chống Cháy
import cuaThepVanGoCover from '../assets/images/products/cua-thep-van-go-cover.webp';
import cuaThepVanGoProj1 from '../assets/images/products/cua-thep-van-go-2.webp';
import cuaThepVanGoProj2 from '../assets/images/products/cua-thep-van-go-3.webp';
import cuaThepVanGoProj3 from '../assets/images/products/cua-thep-van-go-4.webp';

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
    relatedSlugs: ['cua-thep-van-go', 'cua-kinh-ngan-chay', 'cua-cuon-ngan-chay'],
  },

  // ==========================================
  // 1B. CỬA THÉP VÂN GỖ CHỐNG CHÁY (Category Landing Page 6 khối)
  // ==========================================
  'cua-thep-van-go': {
    slug: 'cua-thep-van-go',
    name: 'Cửa Thép Vân Gỗ Chống Cháy',
    priceFrom: '1.600.000 đ/m²',
    intro:
      'Cửa thép vân gỗ chống cháy 1 cánh và 2 cánh, dập huỳnh định hình và sơn in chuyển nhiệt 3D vân gỗ tự nhiên sang trọng. Đạt kiểm định PCCC EI60 – EI90 theo QCVN 06:2022/BXD, cách âm 35–40dB, không cong vênh hay mối mọt, lý tưởng cho căn hộ, biệt thự và khách sạn.',
    sellingPoints: [
      'Đạt kiểm định PCCC EI60 – EI90 theo QCVN 06:2022/BXD',
      'Công nghệ in truyền nhiệt vân gỗ 3D bền màu trên 15 năm',
      'Chống cong vênh, mối mọt, cách âm và ngăn khói tuyệt đối',
    ],
    quickSpec: [
      { label: 'Cấp độ ngăn cháy', value: 'EI60 / EI70 / EI90' },
      { label: 'Loại cửa', value: '1 cánh đơn & 2 cánh đôi (đều hoặc lệch)' },
      { label: 'Cánh cửa', value: 'Dày 50mm, thép mạ điện cán nguội 0.8 – 1.0mm (JIS G3141)' },
      { label: 'Khung cửa', value: 'Thép cán nguội 1.2 – 1.5mm, hèm tăng cứng 1.5 – 2.0mm' },
      { label: 'Lõi cách nhiệt', value: 'Tấm Magie Oxit (MgO) / ERON chống cháy, tỷ trọng 350–450 kg/m³' },
      { label: 'Bề mặt', value: 'Sơn tĩnh điện in chuyển nhiệt vân gỗ tự nhiên (Lim, Gõ đỏ, Sồi, Óc chó)' },
      { label: 'Bảo hành', value: '36 tháng' },
    ],
    advantages: [
      'Khả năng chịu lửa EI60 – EI90, đã thử nghiệm và cấp giấy chứng nhận kiểm định PCCC',
      'Bề mặt vân gỗ tinh xảo, chân thực, khắc phục hoàn toàn nhược điểm co ngót, ẩm mốc, mối mọt của gỗ tự nhiên',
      'Thép tấm mạ điện tiêu chuẩn JIS G3141 chống gỉ sét, kết cấu hàn gia cường chống xệ cánh',
      'Hệ gioăng cao su chống va đập kết hợp gioăng ngăn khói nở nhiệt, tự phồng bịt kín khe cửa khi gặp nhiệt độ cao',
      'Khả năng cách âm vượt trội (35–40dB), đóng mở êm nhẹ nhờ bản lề inox 304 4 vòng bi',
      'Tương thích hoàn toàn với các dòng khóa thông minh (vân tay, thẻ từ, mật mã) và khóa cơ an toàn',
    ],
    uses: [
      {
        icon: 'flame',
        title: 'Ngăn lửa & khói độc',
        desc: 'Đóng kín khoang cháy căn hộ, ngăn khói độc xâm nhập hành lang thoát nạn.',
      },
      {
        icon: 'volume',
        title: 'Cách âm & tiêu âm',
        desc: 'Tạo không gian yên tĩnh tuyệt đối cho căn hộ và phòng ngủ gia đình.',
      },
      {
        icon: 'scan',
        title: 'Thẩm mỹ kiến trúc',
        desc: 'Đem lại vẻ đẹp ấm cúng, sang trọng, hài hòa với nội thất gỗ cao cấp.',
      },
      {
        icon: 'shield',
        title: 'Bền vững & an ninh',
        desc: 'Lõi thép kiên cố chống cạy phá, chống trộm, không biến dạng sau nhiều năm sử dụng.',
      },
    ],
    specTable: [
      { label: 'Tiêu chuẩn áp dụng', value: 'QCVN 06:2022/BXD, QCVN 03:2023/BCA, TCVN 9383:2012' },
      { label: 'Kích thước chế tạo', value: 'Sản xuất theo kích thước ô chờ thực tế (rộng 700–1200mm/cánh, cao 1900–2400mm)' },
      { label: 'Cấp độ ngăn cháy', value: 'EI60 / EI70 / EI90' },
      { label: 'Vật liệu khung & cánh', value: 'Thép mạ điện cán nguội JIS G3141 (cánh 0.8–1.0mm, khung 1.2–1.5mm)' },
      { label: 'Độ dày cánh cửa', value: '50mm (± 2%)' },
      { label: 'Lớp cách nhiệt', value: 'Tấm Magie Oxit (MgO) / ERON không chứa amiăng, không sinh khói độc khi tiếp xúc lửa' },
      { label: 'Công nghệ vân gỗ', value: 'Sơn lót tĩnh điện chống gỉ → Dán màng in vân gỗ → Hút chân không truyền nhiệt → Phủ bóng Nano chống trầy xước' },
      { label: 'Gioăng chặn khói', value: 'Gioăng cao su EPDM giảm chấn kết hợp gioăng ngăn khói nở nhiệt chuyên dụng' },
      { label: 'Phụ kiện tiêu chuẩn', value: 'Bản lề inox SUS304 4 vòng bi (3–4 cái/cánh), khóa tay gạt Inox / khóa điện tử, tay co thủy lực King/Dorma, mắt thần 180°' },
      { label: 'Bảo hành kỹ thuật', value: '36 tháng đối với bề mặt vân gỗ, 24 tháng đối với phụ kiện' },
    ],
    quote: {
      model: 'cửa 1 cánh tiêu chuẩn 60 phút, kích thước 900×2200',
      rows: [
        {
          name: 'Cửa thép vân gỗ ngăn cháy tiêu chuẩn 60 phút, kích thước 900×2200',
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
      ],
      total: '3.970.000',
      note: 'Dự toán mẫu cho 1 bộ cửa kích thước 900×2200 (chưa gồm tay co thủy lực Oval và chi phí công thi công). Giá chính xác căn cứ theo khối lượng, bản vẽ và phụ kiện thực tế của công trình.',
    },
    gallery: [cuaThepVanGoCover, cuaThepVanGoProj1, cuaThepVanGoProj2, cuaThepVanGoProj3],
    projectImages: [cuaThepVanGoProj1, cuaThepVanGoProj2, cuaThepVanGoProj3],
    relatedSlugs: ['cua-thep-ngan-chay', 'cua-kinh-ngan-chay', 'rem-ngan-chay'],
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
  // 3. CỬA CUỐN NGĂN CHÁY (Điền đầy đủ 100% theo template chuẩn & dự toán thực tế)
  // ==========================================
  'cua-cuon-ngan-chay': {
    slug: 'cua-cuon-ngan-chay',
    name: 'Cửa Cuốn Ngăn Cháy',
    priceFrom: '5.000.000 đ/m²',
    intro:
      'Cửa cuốn ngăn cháy tiêu chuẩn EI60 (mã hiệu AKS) khẩu độ siêu trường nhịp lớn, tự động đóng kín khi nhận tín hiệu báo cháy từ tủ điều khiển trung tâm. Thân cửa tổ hợp đa tầng dày 50±2mm gồm nan thép mạ kẽm sơn tĩnh điện 0.8mm, 2 lớp vải chống cháy Hiyot Silica và lõi bông gốm Ceramic cách nhiệt cao cấp.',
    sellingPoints: [
      'Đạt kiểm định an toàn phương tiện PCCC',
      'Cơ chế nhả phanh trọng lực an toàn khi mất điện',
      'Khẩu độ siêu trường cho nhà xưởng & TTTM',
    ],
    quickSpec: [
      { label: 'Ký hiệu / Model', value: 'AKS (tiêu chuẩn PCCC)' },
      { label: 'Cấp độ ngăn cháy', value: 'EI60 (60 phút) / EI90 / EI120' },
      { label: 'Kích thước mẫu', value: 'W 3000 × H 3000mm (9.0 m²)' },
      { label: 'Thân cửa', value: 'Tổ hợp nan thép 0.8mm + 2 lớp vải Hiyot Silica + bông gốm dày 50±2mm' },
      { label: 'Ray & Hộp kỹ thuật', value: 'Ray thép 120×125×1.2mm nhồi MgO & gốm; Hộp thép 40×40 bọc tôn 0.8mm' },
      { label: 'Động cơ & Tích hợp', value: 'Motor Netdoor N500 (370W - 500kg) + Hộp tín hiệu báo cháy Oz' },
      { label: 'Bảo hành', value: '12 tháng theo tiêu chuẩn nhà sản xuất' },
    ],
    advantages: [
      'Ngăn cháy cách nhiệt EI60 (60 phút) theo chuẩn QCVN 06:2022/BXD, kiểm định phương tiện PCCC',
      'Cấu tạo thân cửa tổ hợp 6 lớp chuyên dụng dày 50mm với 2 lớp vải Hiyot Silica và bông gốm 128-200kg/m³',
      'Động cơ Netdoor N500 sức nâng 500kg, tích hợp xích kéo cơ thoát hiểm và khóa ngắt điện tự động',
      'Ray dẫn hướng 120×125×1.2mm nhồi tấm chống cháy MgO 5mm tỷ trọng cao và bông gốm chịu nhiệt',
      'Hộp kỹ thuật khung thép hộp mạ kẽm 40×40×1.4mm bọc tôn định hình cách nhiệt đồng bộ',
      'Kết nối tủ báo cháy trung tâm qua tiếp điểm khô Oz, hạ cửa tự động 2 giai đoạn ngăn khói và thoát hiểm',
    ],
    uses: [
      {
        icon: 'flame',
        title: 'Ngăn cháy lan diện rộng',
        desc: 'Khoanh vùng khoang cháy lớn tại tầng hầm, nhà máy sản xuất và trung tâm logistics.',
      },
      {
        icon: 'wind',
        title: 'Chặn khói độc & nhiệt bức xạ',
        desc: 'Bịt kín các ô thông tầng, chống khói tràn sang các khu vực và buồng thang thoát nạn.',
      },
      {
        icon: 'shield',
        title: 'Tự động hạ khi mất điện',
        desc: 'Bộ lưu điện UPS và cơ cấu nhả phanh trọng lực giúp cửa đóng an toàn ngay cả khi cháy mất điện.',
      },
      {
        icon: 'box',
        title: 'Tối ưu không gian nhịp lớn',
        desc: 'Cuộn gọn trên hộp kỹ thuật trần, giải phóng tối đa chiều cao tĩnh không và lối di chuyển.',
      },
    ],
    specTable: [
      { label: 'Ký hiệu sản phẩm', value: 'AKS (Cửa cuốn ngăn cháy tiêu chuẩn)' },
      { label: 'Giới hạn chịu lửa', value: 'EI60 (60 phút) theo QCVN 06:2022/BXD và TCVN 9383:2012' },
      { label: 'Kích thước tiêu chuẩn mẫu', value: '3000 × 3000 mm (Diện tích 9.0 m²) hoặc gia công theo thiết kế' },
      { label: 'Độ dày thân cửa', value: 'Tổ hợp cách nhiệt đa tầng dày 50 ± 2 mm' },
      {
        label: 'Cấu tạo nan & lõi',
        value:
          'Nan thép mạ kẽm sơn tĩnh điện 0.8mm (bản 68mm), 2 lớp vải Hiyot Silica 0.75mm, bông gốm cách nhiệt 128–200kg/m³',
      },
      { label: 'Trục cuốn', value: 'Thép mạ kẽm Ø113.5 × 2.5 mm chịu lực mô-men xoắn lớn' },
      { label: 'Ray dẫn hướng', value: 'Thép dập định hình 120×125×1.2mm nhồi bông gốm 160kg/m³ & tấm MgO 5mm' },
      {
        label: 'Hộp che kỹ thuật',
        value: 'Khung thép hộp 40×40×1.4mm bọc tôn mạ kẽm 0.8mm nhồi bông gốm cách nhiệt 25mm (128kg/m³)',
      },
      { label: 'Động cơ vận hành', value: 'Động cơ Netdoor 220V-50Hz model N500 (370W, tải trọng nâng 500kg)' },
      { label: 'Tích hợp PCCC', value: 'Hộp nhận tín hiệu báo cháy tiếp điểm khô Oz, xích kéo cơ tay khi mất điện' },
      { label: 'Công lắp đặt & hoàn thiện', value: 'Công thi công CNC tiêu chuẩn kỹ thuật APEX' },
      { label: 'Bảo hành', value: '12 tháng đối với thân cửa và mô tơ theo tiêu chuẩn nhà sản xuất' },
    ],
    quote: {
      model: 'cửa cuốn ngăn cháy EI60, mẫu 3.0 × 3.0m',
      rows: [
        {
          name: 'Cửa cuốn ngăn cháy EI60 (thân cửa dày 50mm, nan 0.8mm, vải Hiyot Silica, bông gốm)',
          unit: 'm²',
          qty: '9',
          price: '5.000.000',
          amount: '45.000.000',
        },
        {
          name: 'Động cơ Netdoor 220V-50Hz N500 (370W - 500kg) & Hộp tín hiệu Oz',
          unit: 'Bộ',
          qty: '1',
          price: '4.800.000',
          amount: '4.800.000',
        },
        {
          name: 'Công thi công CNC Tiêu chuẩn (Từ 1.5m² đến 2.8m²)',
          unit: 'm²',
          qty: '9',
          price: '500.000',
          amount: '4.500.000',
        },
      ],
      total: '54.300.000',
      note: 'Dự toán theo mẫu báo giá tiêu chuẩn cho 01 bộ cửa cuốn ngăn cháy EI60 kích thước 3000×3000 (9m²). Giá chưa bao gồm thuế VAT (đã bao gồm chi phí bảo hành 12 tháng theo tiêu chuẩn nhà sản xuất). Chi phí kiểm định PCCC tính riêng (liên hệ).',
    },
    gallery: [rollerShutterImage],
    projectImages: [],
    relatedSlugs: ['cua-thep-ngan-chay', 'rem-ngan-chay', 'cua-kinh-ngan-chay'],
  },

  // ==========================================
  // 4. RÈM NGĂN CHÁY & KHÓI (Điền đầy đủ 100% theo template chuẩn)
  // ==========================================
  'rem-ngan-chay': {
    slug: 'rem-ngan-chay',
    name: 'Rèm Ngăn Cháy & Khói',
    priceFrom: '2.900.000 đ/m²',
    intro:
      'Rèm ngăn cháy và ngăn khói tự động APEX cấu tạo từ sợi thủy tinh dệt sợi inox chịu nhiệt cao, thiết kế giấu âm trần thẩm mỹ 100%. Hệ thống tự động kích hoạt hạ bằng cơ chế nhả phanh trọng lực an toàn (Gravity Fail-Safe) khi nhận tín hiệu báo cháy, khoanh vùng cô lập khí độc và khói nóng bốc qua sảnh thông tầng.',
    sellingPoints: [
      'Thiết kế giấu âm trần 100% giữ trọn kiến trúc',
      'Cơ chế nhả phanh trọng lực an toàn (Gravity Fail-Safe)',
      'Chịu nhiệt độ cực hạn lên tới 1000°C',
    ],
    quickSpec: [
      { label: 'Cấp độ bảo vệ', value: 'EI60 / EI90 / E120 / Ngăn khói chuyên dụng' },
      { label: 'Vật liệu màn rèm', value: 'Vải sợi thủy tinh dệt sợi inox bọc PU/Silicone chống cháy' },
      { label: 'Giới hạn chịu nhiệt', value: 'Chịu nhiệt liên tục 600°C – 1000°C' },
      { label: 'Cơ chế kích hoạt', value: 'Motor 24VDC + hạ trọng lực có giảm tốc khi mất điện' },
      { label: 'Ray & Hộp cuốn', value: 'Thép mạ kẽm định hình sơn tĩnh điện giấu âm trần' },
      { label: 'Tích hợp hệ thống', value: 'Kết nối tủ báo cháy trung tâm qua giao thức BMS / dry contact' },
      { label: 'Bảo hành', value: '24 tháng chính hãng APEX' },
    ],
    advantages: [
      'Giấu âm trần hoàn toàn, tối ưu 100% diện tích và không gian kiến trúc thông thoáng',
      'Vải sợi thủy tinh kỹ thuật cao dệt lưới thép SUS304 siêu bền, không bị rách xé khi gặp áp suất lửa',
      'Lớp phủ polymer chống thấm nước, kháng hóa chất, không sinh khói độc hại khi tiếp xúc ngọn lửa',
      'Tự động hạ 2 cấp độ: hạ 1.8m để người thoát nạn, sau đó hạ sát sàn để cô lập hoàn toàn khoang cháy',
      'Cơ cấu hạ trọng lực Fail-Safe đảm bảo màn rèm luôn hạ an toàn ngay cả khi mất toàn bộ điện lưới',
      'Hộp cuốn và ray dẫn hướng thép định hình mạ kẽm kín khít, hạn chế tối đa rò rỉ khói lan tỏa',
    ],
    uses: [
      {
        icon: 'wind',
        title: 'Ngăn khói & cô lập giếng trời',
        desc: 'Ngăn chặn khói độc và luồng khí nóng bốc ngược qua sảnh thông tầng và giếng trời.',
      },
      {
        icon: 'flame',
        title: 'Khoanh vùng khoang cháy',
        desc: 'Phân chia phân đoạn khoang cháy linh hoạt cho các trung tâm thương mại và sảnh khách sạn.',
      },
      {
        icon: 'shield',
        title: 'Bảo vệ lối thoát hiểm',
        desc: 'Hạ rèm 2 giai đoạn giữ luồng khí thở sạch cho hành lang và lối thoát hiểm của tòa nhà.',
      },
      {
        icon: 'scan',
        title: 'Ẩn mình trong trần thạch cao',
        desc: 'Không làm thay đổi không gian nội thất, chỉ xuất hiện tự động khi có báo động cháy.',
      },
    ],
    specTable: [
      { label: 'Chủng loại', value: 'Rèm ngăn cháy tự động (Fire Curtain) & Rèm ngăn khói (Smoke Curtain)' },
      { label: 'Tiêu chuẩn đáp ứng', value: 'QCVN 06:2022/BXD, BS EN 1634-1, BS EN 12101-1' },
      { label: 'Cấp chịu lửa', value: 'EI60, EI90, E120 (ngăn cháy & ngăn bức xạ nhiệt)' },
      { label: 'Vật liệu vải rèm', value: 'Sợi thủy tinh gia cường dây thép Inox bọc hợp chất vô cơ chống cháy' },
      { label: 'Độ dày / Định lượng vải', value: 'Độ dày 0.6 – 1.2 mm; định lượng 650 – 1200 g/m²' },
      { label: 'Khả năng chịu nhiệt', value: 'Chịu nhiệt đỉnh lên tới 1000°C trong tối thiểu 120 phút' },
      { label: 'Động cơ cuốn', value: 'Motor hình ống 24VDC chuyên dụng, tích hợp bộ ly hợp giảm tốc' },
      { label: 'Nguồn cấp dự phòng', value: 'Bộ lưu điện UPS 24VDC duy trì điều khiển khi cắt điện tòa nhà' },
      { label: 'Ray dẫn hướng', value: 'Thép mạ kẽm 1.5mm sơn tĩnh điện, tích hợp rãnh chống kẹt vải' },
      { label: 'Thanh đáy đối trọng', value: 'Thanh thép hộp bọc vải rèm, đảm bảo màn rèm luôn căng phẳng khi hạ' },
      { label: 'Tín hiệu điều khiển', value: 'Tín hiệu báo cháy 24VDC hoặc tiếp điểm rơle NO/NC' },
      { label: 'Bảo hành', value: '24 tháng theo tiêu chuẩn nhà sản xuất APEX' },
    ],
    gallery: [fireCurtainImage],
    projectImages: [],
    relatedSlugs: ['cua-thep-ngan-chay', 'cua-cuon-ngan-chay', 'cua-kinh-ngan-chay'],
  },

  // ==========================================
  // 5. TỦ ĐIỆN PHÂN PHỐI & ĐIỀU KHIỂN (Điền đầy đủ 100% theo template chuẩn)
  // ==========================================
  'tu-dien': {
    slug: 'tu-dien',
    name: 'Tủ Điện Phân Phối & Điều Khiển',
    priceFrom: 'Liên hệ dự toán',
    intro:
      'Vỏ tủ điện hạ thế và tủ điều khiển chuyên dụng APEX được gia công cơ khí chính xác trên hệ thống máy đột dập CNC Amada, sơn tĩnh điện bột ngoài trời công nghệ cao. Đạt tiêu chuẩn IEC 61439-1/2, chuyên dụng cho tủ tổng MSB, tủ phân phối DB, tủ chuyển nguồn tự động ATS và tủ điều khiển bơm PCCC.',
    sellingPoints: [
      'Gia công CNC tự động hóa chuẩn xác từng chi tiết',
      'Cấp bảo vệ IP31 - IP65 chống bụi và nước hoàn hảo',
      'Sơn tĩnh điện hạt tĩnh phân tử chống trầy xước, ăn mòn',
    ],
    quickSpec: [
      { label: 'Tiêu chuẩn chế tạo', value: 'IEC 61439-1/2, TCVN 7994-1' },
      { label: 'Cấp bảo vệ', value: 'IP31, IP42, IP54 (trong nhà) / IP55, IP65 (ngoài trời)' },
      { label: 'Vật liệu vỏ', value: 'Thép cán nguội SPCC 1.2 – 2.5mm / Inox 304 xước Hairline' },
      { label: 'Xử lý bề mặt', value: 'Sơn tĩnh điện sần / bóng màu RAL 7032, RAL 7035 ngoài trời' },
      { label: 'Kết cấu form tủ', value: 'Form 1, 2A/2B, 3A/3B, 4A/4B phân chia ngăn chức năng an toàn' },
      { label: 'Phụ kiện tủ', value: 'Khóa tay nắm xoay, bản lề góc mở 130°, thanh gá thiết bị đa năng' },
      { label: 'Bảo hành', value: '24 tháng chính hãng APEX' },
    ],
    advantages: [
      'Khung vỏ dập CNC gân tăng cứng đa điểm, đảm bảo độ cứng vững khi mang tải thiết bị đóng cắt nặng',
      'Cấp bảo vệ vỏ tủ từ IP42 đến IP65 với hệ gioăng cao su Polyurethane đúc liền bằng robot chống thấm tuyệt đối',
      'Đạt tiêu chuẩn thử nghiệm điển hình Type-Test theo IEC 61439-1/2 về độ tăng nhiệt và khả năng chịu ngắn mạch',
      'Bề mặt xử lý qua bể phốt phát hóa 7 công đoạn trước khi sơn tĩnh điện bột ngoài trời chịu tia UV',
      'Thiết kế module hóa linh hoạt, dễ dàng mở rộng ngăn lộ và tháo lắp bảo trì từ phía trước hoặc sau',
      'Đầy đủ thanh đồng tiếp địa tiếp mass và tấm đáy luồn cáp có ron cao su chống xâm nhập côn trùng',
    ],
    uses: [
      {
        icon: 'zap',
        title: 'Phân phối điện lực an toàn',
        desc: 'Làm tủ tổng MSB, tủ DB và tủ nhánh bảo vệ hệ thống điện công nghiệp và dân dụng.',
      },
      {
        icon: 'shield',
        title: 'Điều khiển cụm bơm PCCC',
        desc: 'Vỏ tủ chuyên dụng cho hệ thống điều khiển bơm chữa cháy tự động khởi động sao/tam giác.',
      },
      {
        icon: 'box',
        title: 'Chống chịu thời tiết dã ngoại',
        desc: 'Vỏ tủ outdoor 2 lớp mái dốc che mưa nắng, bảo vệ linh kiện biến tần và khởi động mềm.',
      },
      {
        icon: 'wind',
        title: 'Tản nhiệt & lưu thông khí',
        desc: 'Bố trí khe chớp thông gió kết hợp quạt hút gắn lọc bụi, duy trì nhiệt độ tối ưu cho thiết bị.',
      },
    ],
    specTable: [
      { label: 'Chủng loại tủ', value: 'Tủ MSB, Tủ phân phối DB, Tủ ATS, Tủ bù công suất, Tủ điều khiển bơm PCCC' },
      { label: 'Tiêu chuẩn thiết kế', value: 'IEC 61439-1/2, IEC 60529, TCVN 7994-1' },
      { label: 'Điện áp định mức', value: '220VAC / 380VAC – 690VAC; Tần số 50Hz' },
      { label: 'Dòng điện định mức', value: 'Lên tới 6300A (tủ MSB) / 800A (tủ DB)' },
      { label: 'Dòng cắt ngắn mạch', value: 'Lên tới 50kA, 65kA, 85kA / 1s' },
      { label: 'Độ dày thép vỏ tủ', value: 'Khung 2.0 – 2.5 mm; Cánh & vách 1.5 – 2.0 mm; Đế 2.5 – 3.0 mm' },
      { label: 'Cấp bảo vệ vỏ (IP)', value: 'IP31, IP42, IP54 (Indoor); IP55, IP65 (Outdoor)' },
      { label: 'Vật liệu chế tạo', value: 'Thép cán nguội SPCC mạ kẽm điện phân / Inox 304' },
      { label: 'Công nghệ sơn', value: 'Sơn tĩnh điện bột sấy hồng ngoại dày 60 – 80 µm' },
      { label: 'Màu sơn tiêu chuẩn', value: 'Ghi sáng RAL 7032 / RAL 7035 hoặc sơn màu theo yêu cầu' },
      { label: 'Thanh cái dẫn điện', value: 'Đồng đỏ tinh khiết 99.9% bọc màng co nhiệt phân pha' },
      { label: 'Bảo hành', value: '24 tháng theo tiêu chuẩn nhà sản xuất APEX' },
    ],
    gallery: [electricalCabinetImage],
    projectImages: [],
    relatedSlugs: ['thang-mang-cap', 'tu-rack', 'tu-nguon-outdoor'],
  },

  // ==========================================
  // 6. THANG MÁNG CÁP ĐIỆN (Điền đầy đủ 100% theo template chuẩn)
  // ==========================================
  'thang-mang-cap': {
    slug: 'thang-mang-cap',
    name: 'Thang Máng Cáp Điện',
    priceFrom: 'Liên hệ theo quy cách',
    intro:
      'Hệ thống Thang cáp (Cable Ladder), Máng cáp (Cable Trunking) và Khay cáp (Cable Tray) APEX sản xuất đồng bộ từ thép tấm tiêu chuẩn, mạ kẽm nhúng nóng hoặc sơn tĩnh điện. Thiết kế gia cường gờ mép chịu tải trọng võng cao, bảo vệ đường dây dẫn điện và cáp tín hiệu PCCC an toàn suốt vòng đời công trình.',
    sellingPoints: [
      'Chấn mép tăng cứng chống võng vặn xoắn',
      'Mạ kẽm nhúng nóng dày ≥ 65µm chống rỉ sét dã ngoại',
      'Đầy đủ co ngang, tê, giảm, co lên xuống nối nhanh',
    ],
    quickSpec: [
      { label: 'Chủng loại', value: 'Thang cáp, Máng cáp, Khay cáp & phụ kiện co, tê, nối' },
      { label: 'Chiều rộng thông dụng', value: 'W 50mm – 1000mm (50, 100, 200, 300, 400, 600, 800, 1000)' },
      { label: 'Chiều cao thông dụng', value: 'H 50mm, 75mm, 100mm, 150mm, 200mm' },
      { label: 'Độ dày thép', value: '1.0mm, 1.2mm, 1.5mm, 2.0mm, 2.5mm' },
      { label: 'Bề mặt hoàn thiện', value: 'Sơn tĩnh điện, Tôn tráng kẽm Z12–Z18, Mạ kẽm nhúng nóng ASTM A123' },
      { label: 'Chiều dài mỗi cây', value: '2500 mm / 3000 mm tiêu chuẩn' },
      { label: 'Bảo hành', value: '24 tháng chính hãng APEX' },
    ],
    advantages: [
      'Thiết kế gờ mép chấn chữ C chịu lực tăng cứng, giảm tối đa độ võng khi rải cáp điện lực nặng',
      'Lớp phủ mạ kẽm nhúng nóng đạt độ dày lớp mạ ≥ 65 micromet, chống ăn mòn xuất sắc ở môi trường ven biển và hóa chất',
      'Gia công dập lỗ đột CNC tinh xảo, bề mặt nhẵn mịn không gờ bén, chống trầy xước vỏ bọc dây cáp',
      'Hệ phụ kiện co, tê, cút nối nhanh ăn khớp chính xác, rút ngắn 40% thời gian thi công trên cao',
      'Máng đục lỗ thông hơi đối lưu khí giải nhiệt hiệu quả, nâng cao hiệu suất truyền tải của dây cáp',
      'Độ dày tôn đạt chuẩn từ 1.2mm đến 2.5mm theo đúng thiết kế bản vẽ và tải trọng công trình',
    ],
    uses: [
      {
        icon: 'zap',
        title: 'Tuyến cáp điện lực động lực',
        desc: 'Đỡ và phân tuyến cáp lực trục đứng (riser) và trục ngang tầng hầm cho nhà cao tầng.',
      },
      {
        icon: 'flame',
        title: 'Bảo vệ tuyến cáp PCCC',
        desc: 'Máng cáp kín có nắp đậy che chắn cáp chống cháy chống tác động cơ học và nhiệt lượng.',
      },
      {
        icon: 'cpu',
        title: 'Hệ thống cáp mạng & viễn thông',
        desc: 'Khay cáp đục lỗ phân luồng dây tín hiệu điều khiển BMS, camera và dây cáp mạng server.',
      },
      {
        icon: 'box',
        title: 'Tải trọng chịu lực siêu cao',
        desc: 'Thang cáp chịu tải phân bổ đều lên tới 250kg/m mà không bị biến dạng hay xô lệch.',
      },
    ],
    specTable: [
      { label: 'Sản phẩm chính', value: 'Thang cáp (Cable Ladder), Máng cáp (Trunking), Khay cáp đục lỗ (Tray)' },
      { label: 'Tiêu chuẩn sản xuất', value: 'NEMA VE1, BS EN 61537, TCVN 10688' },
      { label: 'Chiều rộng (W)', value: 'Từ 50 mm đến 1000 mm (50, 100, 150, 200, 300, 400, 500, 600, 800, 1000)' },
      { label: 'Chiều cao thành (H)', value: '50, 75, 100, 150, 200 mm' },
      { label: 'Chiều dài mỗi cây', value: '2.500 mm hoặc 3.000 mm (tùy chọn 2.400 mm)' },
      { label: 'Độ dày thép tấm', value: '1.0 mm, 1.2 mm, 1.5 mm, 2.0 mm, 2.5 mm' },
      { label: 'Vật liệu chế tạo', value: 'Thép tấm đen cán nguội SPCC, Tôn mạ kẽm cuộn, Inox 304' },
      { label: 'Xử lý bề mặt', value: 'Sơn tĩnh điện bột ngoài trời / Mạ kẽm điện phân / Mạ kẽm nhúng nóng' },
      { label: 'Độ dày lớp mạ kẽm', value: 'Mạ nhúng nóng ≥ 65 µm theo chuẩn ASTM A123 / ISO 1461' },
      { label: 'Màu sơn tĩnh điện', value: 'Ghi sần RAL 7032, Kem, Cam PCCC hoặc theo yêu cầu chủ đầu tư' },
      { label: 'Hệ phụ kiện đồng bộ', value: 'Co ngang L, Tê chữ T, Chữ thập X, Cút giảm thu, Nẹp nối, Bulong M8/M10' },
      { label: 'Bảo hành', value: '24 tháng theo tiêu chuẩn nhà sản xuất APEX' },
    ],
    gallery: [cableTrayImage],
    projectImages: [],
    relatedSlugs: ['tu-dien', 'tu-rack', 'nha-tram-shelter'],
  },

  // ==========================================
  // 7. TỦ RACK MẠNG & VIỄN THÔNG (Điền đầy đủ 100% theo template chuẩn)
  // ==========================================
  'tu-rack': {
    slug: 'tu-rack',
    name: 'Tủ Rack Mạng & Viễn Thông',
    priceFrom: 'Liên hệ theo dung tích',
    intro:
      'Tủ Rack 19 inch APEX đạt tiêu chuẩn quốc tế EIA-310-D, đa dạng kích cỡ từ tủ treo tường 6U, 10U, 15U đến tủ server chuyên dụng 27U, 36U, 42U. Kết cấu khung thép cán nguội gia cường chịu tải tĩnh lên tới 1000kg, cửa lưới tổ ong thông thoáng 75% tối ưu tản nhiệt cho các trung tâm dữ liệu Data Center.',
    sellingPoints: [
      'Chuẩn 19 inch quốc tế EIA-310-D tương thích mọi thiết bị',
      'Cửa lưới tổ ong lục giác thông thoáng 75% tản nhiệt',
      'Khung chịu tải tĩnh lên tới 1.000 kg (tủ Server 42U)',
    ],
    quickSpec: [
      { label: 'Tiêu chuẩn', value: '19 inch EIA-310-D, DIN 41494' },
      { label: 'Kích cỡ (U)', value: '6U, 9U, 12U, 15U, 20U, 27U, 32U, 36U, 42U' },
      { label: 'Chiều sâu (Depth)', value: 'D400, D600, D800, D1000, D1100, D1200 mm' },
      { label: 'Tải trọng chịu lực', value: 'Từ 60kg (treo tường) đến 1000kg (tủ server 42U đứng sàn)' },
      { label: 'Cửa trước / sau', value: 'Cửa lưới lục giác thoáng 75% / Cửa mica có khóa an toàn' },
      { label: 'Phụ kiện kèm theo', value: 'Quạt tản nhiệt nóc, thanh nguồn PDU 6–12 port, ốc cài, khay cố định' },
      { label: 'Bảo hành', value: '24 tháng chính hãng APEX' },
    ],
    advantages: [
      'Khung thép cán nguội chất lượng cao dày 1.5 – 2.0mm liên kết hàn định hình siêu cứng vững',
      'Cửa trước và cửa sau dập lưới lục giác mật độ cao thông thoáng 75%, đáp ứng tiêu chuẩn luồng khí lạnh - nóng',
      'Thanh gắn thiết bị 19 inch đánh dấu chỉ số U rõ ràng, điều chỉnh chiều sâu linh hoạt theo chiều dài server',
      'Cửa mở góc rộng 180°, có thể đảo chiều mở trái / phải linh hoạt phù hợp với từng vị trí góc phòng',
      'Hệ thống 4 bánh xe chịu lực có khóa hãm kết hợp chân tăng chỉnh cân bằng trên sàn kỹ thuật',
      'Đầy đủ lỗ luồn cáp nóc và đáy có nẹp chổi chắn bụi, quản lý tuyến cáp patch cord gọn gàng chuyên nghiệp',
    ],
    uses: [
      {
        icon: 'cpu',
        title: 'Data Center & Server Room',
        desc: 'Chứa máy chủ blade server, switch core, router và thiết bị lưu trữ SAN/NAS.',
      },
      {
        icon: 'wind',
        title: 'Tản nhiệt đối lưu luồng khí',
        desc: 'Tối ưu luồng khí hút gió lạnh phía trước và thổi khí nóng ra sau theo chuẩn Tier III.',
      },
      {
        icon: 'shield',
        title: 'Bảo mật an toàn thiết bị',
        desc: 'Khóa tay xoay bảo vệ vật lý, ngăn chặn can thiệp trái phép vào hệ thống mạng doanh nghiệp.',
      },
      {
        icon: 'box',
        title: 'Tủ treo tường văn phòng',
        desc: 'Dòng tủ 6U - 12U treo tường gọn nhẹ cho switch mạng, đầu ghi camera CCTV và tổng đài IP.',
      },
    ],
    specTable: [
      { label: 'Tiêu chuẩn áp dụng', value: 'EIA-310-D, IEC 297-2, DIN 41494, RoHS' },
      { label: 'Dung tích lắp đặt (U)', value: 'Treo tường: 6U, 9U, 12U, 15U; Đứng sàn: 20U, 27U, 32U, 36U, 42U' },
      { label: 'Kích thước chiều sâu (D)', value: 'D400, D600, D800, D1000, D1100, D1200 mm' },
      { label: 'Chiều rộng tiêu chuẩn', value: 'Chuẩn 19 inch (Width 600 mm hoặc 800 mm có khoang đi dây)' },
      { label: 'Tải trọng tải tĩnh', value: 'Tủ treo tường 60 – 100 kg; Tủ đứng sàn 800 – 1000 kg' },
      { label: 'Vật liệu thép', value: 'Thép cán nguội SPCC; Thanh gắn thiết bị 2.0mm, khung 1.5mm, vách 1.2mm' },
      { label: 'Xử lý bề mặt', value: 'Sơn tĩnh điện cát màu đen mờ RAL 9005 hoặc ghi xám RAL 7035' },
      { label: 'Cửa tủ', value: 'Cửa trước lưới tổ ong hoặc mica; Cửa sau lưới 2 cánh mở đôi (tủ sâu)' },
      { label: 'Hệ thống quạt hút', value: 'Từ 2 đến 4 quạt hút gió 220VAC gắn trên nóc tủ' },
      { label: 'Thanh phân phối nguồn', value: 'Thanh nguồn PDU 6 chấu, 8 chấu hoặc 12 chấu có aptomat chống quá tải' },
      { label: 'Phụ kiện kèm theo', value: 'Chân đế tăng chỉnh, bánh xe khóa, khay cố định / khay trượt, ốc cài M6' },
      { label: 'Bảo hành', value: '24 tháng theo tiêu chuẩn nhà sản xuất APEX' },
    ],
    gallery: [serverRackImage],
    projectImages: [],
    relatedSlugs: ['tu-dien', 'thang-mang-cap', 'nha-tram-shelter'],
  },

  // ==========================================
  // 8. NHÀ TRẠM VIỄN THÔNG SHELTER (Điền đầy đủ 100% theo template chuẩn)
  // ==========================================
  'nha-tram-shelter': {
    slug: 'nha-tram-shelter',
    name: 'Nhà Trạm Viễn Thông Shelter',
    priceFrom: 'Liên hệ thiết kế',
    intro:
      'Nhà trạm Shelter module lắp ghép APEX sử dụng tấm panel sandwich Polyurethane (PU) tỷ trọng cao 40–45 kg/m³, khung dầm đế thép hình dập định hình mạ kẽm nhúng nóng. Thiết kế cách âm, cách nhiệt vượt trội, chống bão cấp 12 và chống nước IP55, vận hành bền bỉ bảo vệ trạm BTS viễn thông ở điều kiện địa hình dã ngoại khắc nghiệt.',
    sellingPoints: [
      'Panel sandwich PU tỷ trọng cao 40-45 kg/m³ cách nhiệt K ≤ 0.025',
      'Kết cấu thép mạ kẽm nhúng nóng chịu gió bão cấp 12',
      'Lắp ghép module dã ngoại hoàn thiện chỉ trong 2-3 ngày',
    ],
    quickSpec: [
      { label: 'Kết cấu nhà trạm', value: 'Module lắp ghép panel sandwich PU ngàm camlock' },
      { label: 'Kích thước thông dụng', value: '2.5 × 2.5m, 2.5 × 3.0m, 3.0 × 4.0m, H 2.6 – 2.8m' },
      { label: 'Khả năng cách nhiệt', value: 'Hệ số truyền nhiệt K ≤ 0.025 W/m.K, tiết kiệm 40% điện điều hòa' },
      { label: 'Chống chịu thời tiết', value: 'Cấp chống nước IP55, chịu sức gió bão cấp 12 (130 km/h)' },
      { label: 'Khung sàn đế', value: 'Thép hình chữ I, U mạ kẽm nhúng nóng chống ăn mòn' },
      { label: 'Trang bị phụ trợ', value: 'Cửa chống trộm 3 điểm, lỗ luồn feeder, quạt thông gió DC dự phòng' },
      { label: 'Bảo hành', value: '24 tháng chính hãng APEX' },
    ],
    advantages: [
      'Công nghệ phun foam PU áp lực cao tỷ trọng 40–45 kg/m³, không rỗng xốp, khả năng giữ nhiệt độ trạm ổn định dưới 25°C',
      'Hai mặt ngoài bọc tôn mạ hợp kim nhôm kẽm phủ sơn tĩnh điện kháng muối biển và tia cực tím UV',
      'Hệ thống ngàm khóa âm Camlock đúc liền trong panel, lắp dựng kín khít tuyệt đối không lọt nước',
      'Khung dầm đế thép hình dập định hình mạ kẽm nhúng nóng, đặt vững vàng trên móng cột hoặc sàn bê tông',
      'Tích hợp hệ thống quạt hút khẩn cấp DC tự động chạy khi mất điện lưới hoặc điều hòa bị lỗi',
      'Cửa ra vào kín khít có gioăng EPDM cách nhiệt, trang bị khóa cơ an ninh 3 điểm chống cạy phá dã ngoại',
    ],
    uses: [
      {
        icon: 'shield',
        title: 'Trạm thu phát sóng BTS viễn thông',
        desc: 'Bảo vệ thiết bị phát sóng vô tuyến 4G/5G, tổng đài quang và tủ rectifier ngoài đồi núi.',
      },
      {
        icon: 'flame',
        title: 'Cách nhiệt & tiết kiệm điện năng',
        desc: 'Duy trì nhiệt độ phòng máy 22-25°C, giảm đến 40% công suất tiêu thụ của máy lạnh.',
      },
      {
        icon: 'droplets',
        title: 'Chống thấm nước & chịu bão cấp 12',
        desc: 'Chống chọi gió giật bão biển và mưa rào áp lực cao dã ngoại không lo ngấm dột.',
      },
      {
        icon: 'box',
        title: 'Nhà trạm module di động',
        desc: 'Tháo dỡ, di dời và tái sử dụng linh hoạt giữa các vị trí trạm BTS nhanh chóng.',
      },
    ],
    specTable: [
      { label: 'Quy cách phủ bì', value: '2.5×2.5m, 2.5×3.0m, 3.0×4.0m, 3.0×6.0m (Chiều cao 2.6 – 2.8m)' },
      { label: 'Cấu tạo panel tường & trần', value: 'Panel sandwich 3 lớp dày 75 – 100 mm' },
      { label: 'Vỏ tôn ngoài & trong', value: 'Tôn mạ hợp kim nhôm kẽm dày 0.5 – 0.6 mm phủ sơn tĩnh điện PE' },
      { label: 'Lõi cách nhiệt', value: 'Polyurethane (PU) tỷ trọng 40 – 45 kg/m³ chống cháy lan' },
      { label: 'Hệ số dẫn nhiệt', value: 'λ ≤ 0.022 W/m.K (Hệ số K ≤ 0.025 W/m²K)' },
      { label: 'Khung dầm đáy', value: 'Thép hình chữ I 150 – 200 mm mạ kẽm nhúng nóng độ dày mạ ≥ 75 µm' },
      { label: 'Sàn thao tác', value: 'Tấm Cemboard 18mm lót sàn nhựa Vinyl chống tĩnh điện ESD' },
      { label: 'Cửa ra vào', value: 'Cửa cách nhiệt PU kèm khóa tay gạt 3 điểm, tay co thủy lực dã ngoại' },
      { label: 'Khả năng chịu gió', value: 'Chịu vận tốc gió giật lên tới 140 km/h (tương đương bão cấp 12)' },
      { label: 'Lỗ luồn cáp Feeder', value: 'Mặt bích nhôm 12 – 24 lỗ có nút cao su bịt kín chống côn trùng' },
      { label: 'Hệ thống phụ trợ', value: 'Bảng điện trạm ATS, máng cáp nội bộ, đèn LED, quạt thông gió khẩn cấp DC' },
      { label: 'Bảo hành', value: '24 tháng theo tiêu chuẩn nhà sản xuất APEX' },
    ],
    gallery: [telecomShelterImage],
    projectImages: [],
    relatedSlugs: ['tu-nguon-outdoor', 'tu-rack', 'tu-dien'],
  },

  // ==========================================
  // 9. TỦ NGUỒN OUTDOOR (Điền đầy đủ 100% theo template chuẩn)
  // ==========================================
  'tu-nguon-outdoor': {
    slug: 'tu-nguon-outdoor',
    name: 'Tủ Nguồn Outdoor',
    priceFrom: 'Liên hệ cấu hình',
    intro:
      'Tủ nguồn ngoài trời APEX thiết kế kết cấu 2 lớp vỏ cách nhiệt chuyên dụng, đạt chuẩn bảo vệ IP55/IP65 chống bụi và nước áp lực dã ngoại. Tích hợp khoang chứa nguồn chỉnh lưu rectifier, khoang chứa ắc quy dự phòng và hệ thống điều hòa mini hoặc quạt thông gió tản nhiệt thông minh.',
    sellingPoints: [
      'Kết cấu 2 lớp vỏ cách nhiệt chống sốc nhiệt bức xạ',
      'Cấp bảo vệ IP55 / IP65 chống bụi nước áp lực',
      'Khóa 3 điểm bảo mật chống cạy phá ngoài trời',
    ],
    quickSpec: [
      { label: 'Cấp bảo vệ', value: 'IP55 / IP65 theo chuẩn IEC 60529' },
      { label: 'Kết cấu vỏ tủ', value: '2 lớp vỏ cách nhiệt (thép mạ kẽm 1.5 – 2.0mm kèm mút PE/PU)' },
      { label: 'Kích thước thông dụng', value: 'H1400 – H2000 × W700 – W1200 × D700 – D1000 mm' },
      { label: 'Hệ thống làm mát', value: 'Điều hòa nhiệt độ mini DC 300W–1500W / Quạt tản nhiệt lọc bụi' },
      { label: 'Phân khoang chức năng', value: 'Khoang thiết bị viễn thông, khoang nguồn và khoang ắc quy độc lập' },
      { label: 'Khóa bảo vệ', value: 'Khóa 3 điểm chống trộm chuyên dụng ngoài trời dã ngoại' },
      { label: 'Bảo hành', value: '24 tháng chính hãng APEX' },
    ],
    advantages: [
      'Cấu trúc vỏ kép 2 lớp có lớp đệm không khí cách nhiệt, hạn chế 80% bức xạ nhiệt mặt trời chiếu vào trong tủ',
      'Hệ gioăng cao su Polyurethane liên tục đúc liền bằng công nghệ bơm keo tự động, chống nước ngập hắt chuẩn IP65',
      'Khóa bảo mật tay nắm gập 3 điểm trên - giữa - dưới làm từ hợp kim chống ăn mòn và bẻ khóa',
      'Mái che dốc phía trước và sau thoát nước mưa nhanh, có chớp lấy gió trang bị lưới lọc bụi không thấm nước',
      'Khoang chứa ắc quy thiết kế tấm đỡ chịu tải nặng lên tới 400kg, có vách ngăn cách ly hơi axit',
      'Sơn tĩnh điện bột ngoài trời chất lượng cao chống phai màu, chịu được sương muối và độ ẩm cao',
    ],
    uses: [
      {
        icon: 'zap',
        title: 'Cung cấp nguồn trạm BTS dã ngoại',
        desc: 'Chứa hệ thống rectifier đổi nguồn AC/DC và phân phối nguồn 48VDC cho thiết bị viễn thông.',
      },
      {
        icon: 'shield',
        title: 'Lưu trữ ắc quy dự phòng an toàn',
        desc: 'Khoang riêng bảo vệ ắc quy Lithium / chì axit duy trì hoạt động khi mất điện lưới.',
      },
      {
        icon: 'droplets',
        title: 'Chống chọi mưa bão dã ngoại',
        desc: 'Vận hành tin cậy dưới mưa bão lớn, nắng nóng sa mạc hoặc môi trường biển mặn.',
      },
      {
        icon: 'wind',
        title: 'Làm mát điều hòa thông minh',
        desc: 'Trang bị máy lạnh mini DC tự động điều chỉnh nhiệt độ bảo vệ tuổi thọ ắc quy.',
      },
    ],
    specTable: [
      { label: 'Tiêu chuẩn bảo vệ', value: 'IP55 / IP65 theo IEC 60529; Chống va đập IK10' },
      { label: 'Vật liệu chế tạo', value: 'Thép mạ kẽm cán nguội dày 1.5 – 2.0 mm / Hợp kim nhôm 2.0 – 3.0 mm' },
      { label: 'Cấu tạo cách nhiệt', value: 'Cấu trúc 2 lớp vỏ kèm lớp xốp cách nhiệt PE/PU dày 10 – 20 mm' },
      { label: 'Kích thước tiêu chuẩn', value: 'Cao 1600–2000 mm × Rộng 800–1200 mm × Sâu 800–1000 mm' },
      { label: 'Phân khoang bên trong', value: 'Khoang nguồn & thiết bị 19 inch, khoang chứa ắc quy (pin Lithium) riêng biệt' },
      { label: 'Hệ thống giải nhiệt', value: 'Điều hòa tủ điện DC (300W – 1500W) hoặc cụm quạt hút cảm biến nhiệt độ' },
      { label: 'Khóa cửa bảo mật', value: 'Hệ thống khóa 3 điểm chống trộm, lõi khóa chống nước' },
      { label: 'Cửa tủ', value: 'Cửa trước và sau mở 130°, có pít-tông thủy lực giữ cửa khi thao tác dã ngoại' },
      { label: 'Đế tủ & Nóc mái', value: 'Đế thép hình cao 100 – 200 mm; Mái dốc che mưa có tai cẩu nâng hàng' },
      { label: 'Bề mặt hoàn thiện', value: 'Sơn tĩnh điện bột ngoài trời Polyester màu xám nhạt RAL 7035' },
      { label: 'Cảm biến an ninh', value: 'Công tắc hành trình cảnh báo mở cửa, cảm biến nhiệt độ và độ ẩm' },
      { label: 'Bảo hành', value: '24 tháng theo tiêu chuẩn nhà sản xuất APEX' },
    ],
    gallery: [outdoorCabinetImage],
    projectImages: [],
    relatedSlugs: ['nha-tram-shelter', 'tu-dien', 'tu-rack'],
  },
};

