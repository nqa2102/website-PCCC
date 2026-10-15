import { Product, Solution, Project, TechnicalDoc, NewsArticle } from '../types';
import heroImage from '../assets/images/hero_fire_door_apex_1790648819738.webp';
import rollerShutterImage from '../assets/images/product_fire_roller_shutter_1790648844563.webp';
import fireCurtainImage from '../assets/images/product_fire_curtain_1790648858516.webp';
import electricalCabinetImage from '../assets/images/product_electrical_cabinet.jpg';
import cableTrayImage from '../assets/images/product_cable_tray.jpg';
import serverRackImage from '../assets/images/product_server_rack.jpg';
import telecomShelterImage from '../assets/images/product_telecom_shelter.jpg';
import outdoorCabinetImage from '../assets/images/product_outdoor_cabinet.jpg';

// Ảnh sản phẩm thật Cửa Thép Ngăn Cháy
import cuaThepEi70Cover from '../assets/images/products/cua-thep-ei70-1-canh-cover.webp';
import cuaThepEi70_2 from '../assets/images/products/cua-thep-ei70-1-canh-2.webp';
import cuaThepEi70_3 from '../assets/images/products/cua-thep-ei70-1-canh-3.webp';
import cuaThepEi70_4 from '../assets/images/products/cua-thep-ei70-1-canh-4.webp';
import cuaThepEi70_5 from '../assets/images/products/cua-thep-ei70-1-canh-5.webp';

import cuaThepEi90_1Cover from '../assets/images/products/cua-thep-ei90-1-canh-cover.webp';
import cuaThepEi90_1_2 from '../assets/images/products/cua-thep-ei90-1-canh-2.webp';
import cuaThepEi90_1_3 from '../assets/images/products/cua-thep-ei90-1-canh-3.webp';
import cuaThepEi90_1_4 from '../assets/images/products/cua-thep-ei90-1-canh-4.webp';

import cuaThepEi90_2Cover from '../assets/images/products/cua-thep-ei90-2-canh-cover.webp';
import cuaThepEi90_2_2 from '../assets/images/products/cua-thep-ei90-2-canh-2.webp';
import cuaThepEi90_2_3 from '../assets/images/products/cua-thep-ei90-2-canh-3.webp';
import cuaThepEi90_2_4 from '../assets/images/products/cua-thep-ei90-2-canh-4.webp';
import cuaThepEi90_2_5 from '../assets/images/products/cua-thep-ei90-2-canh-5.webp';

import cuaThepEi120_2Cover from '../assets/images/products/cua-thep-ei120-2-canh-cover.webp';
import cuaThepEi120_2_2 from '../assets/images/products/cua-thep-ei120-2-canh-2.webp';
import cuaThepEi120_2_3 from '../assets/images/products/cua-thep-ei120-2-canh-3.webp';

import cuaThepTongQuanCover from '../assets/images/products/cua-thep-ngan-chay-cover.webp';
import cuaThepTongQuan_2 from '../assets/images/products/cua-thep-ngan-chay-2.webp';
import cuaThepTongQuan_3 from '../assets/images/products/cua-thep-ngan-chay-3.webp';
import cuaThepTongQuan_4 from '../assets/images/products/cua-thep-ngan-chay-4.webp';
import cuaThepTongQuan_5 from '../assets/images/products/cua-thep-ngan-chay-5.webp';

// Ảnh sản phẩm thật Cửa Thép Vân Gỗ Chống Cháy
import cuaThepVanGoCover from '../assets/images/products/cua-thep-van-go-cover.webp';
import cuaThepVanGoProj1 from '../assets/images/products/cua-thep-van-go-2.webp';
import cuaThepVanGoProj2 from '../assets/images/products/cua-thep-van-go-3.webp';
import cuaThepVanGoProj3 from '../assets/images/products/cua-thep-van-go-4.webp';

// Ảnh sản phẩm thật Cửa Kính Ngăn Cháy
import cuaKinhEi60Cover from '../assets/images/products/cua-kinh-ngan-chay-ei60-cover.webp';
import cuaKinhEi60_2 from '../assets/images/products/cua-kinh-ngan-chay-ei60-2.webp';
import cuaKinhEi60_3 from '../assets/images/products/cua-kinh-ngan-chay-ei60-3.webp';
import cuaKinhEi60_4 from '../assets/images/products/cua-kinh-ngan-chay-ei60-4.webp';

import cuaKinhEi90Cover from '../assets/images/products/cua-kinh-ngan-chay-ei90-cover.webp';
import cuaKinhEi90_2 from '../assets/images/products/cua-kinh-ngan-chay-ei90-2.webp';
import cuaKinhEi90_3 from '../assets/images/products/cua-kinh-ngan-chay-ei90-3.webp';
import cuaKinhEi90_4 from '../assets/images/products/cua-kinh-ngan-chay-ei90-4.webp';

import vachKinhCover from '../assets/images/products/vach-kinh-ngan-chay-ei60-ei90-cover.webp';
import vachKinh_2 from '../assets/images/products/vach-kinh-ngan-chay-ei60-ei90-2.webp';
import vachKinh_3 from '../assets/images/products/vach-kinh-ngan-chay-ei60-ei90-3.webp';

import cuaKinhTongQuanCover from '../assets/images/products/cua-kinh-ngan-chay-cover.webp';
import cuaKinhTongQuan_2 from '../assets/images/products/cua-kinh-ngan-chay-2.webp';
import cuaKinhTongQuan_3 from '../assets/images/products/cua-kinh-ngan-chay-3.webp';
import cuaKinhTongQuan_4 from '../assets/images/products/cua-kinh-ngan-chay-4.webp';

export const HERO_IMAGE = heroImage;
export const STEEL_DOOR_IMAGE = cuaThepEi90_1Cover;
export const DOUBLE_FIRE_DOOR_IMAGE = cuaThepEi90_2Cover;
export const GLASS_FIRE_DOOR_IMAGE = cuaKinhEi60Cover;
export const ROLLER_SHUTTER_IMAGE = rollerShutterImage;
export const FIRE_CURTAIN_IMAGE = fireCurtainImage;
export const ELECTRICAL_CABINET_IMAGE = electricalCabinetImage;
export const CABLE_TRAY_IMAGE = cableTrayImage;
export const SERVER_RACK_IMAGE = serverRackImage;
export const TELECOM_SHELTER_IMAGE = telecomShelterImage;
export const OUTDOOR_CABINET_IMAGE = outdoorCabinetImage;

export const PRODUCTS: Product[] = [
  // ==========================================
  // NHÓM 1: CỬA THÉP NGĂN CHÁY (PCCC Công Trình)
  // ==========================================
  {
    id: 'cua-thep-ei70-1-canh',
    slug: 'cua-thep-ei70-1-canh',
    name: 'Cửa Thép Ngăn Cháy 1 Cánh EI70',
    category: 'cua-thep-ngan-chay',
    categoryName: 'Cửa thép ngăn cháy',
    fireRating: 'EI70',
    certificationNo: '1803/KD-PCCC-P7',
    description: 'Cửa thép chống cháy 1 cánh tiêu chuẩn EI70 theo QCVN 06:2022/BXD và Sửa đổi 1:2023, ứng dụng cho buồng thang bộ thoát hiểm N1/N2/N3, sảnh thang máy và lối thoát nạn căn hộ.',
    longDescription: 'Cửa thép ngăn cháy 1 cánh EI70 được chứng nhận theo giấy kiểm định phương tiện PCCC số 1803/KD-PCCC-P7. Khung bao thép định hình dày 1.2mm - 1.4mm chấn gấp CNC, cánh cửa dày 50mm với tấm thép bọc 0.8mm - 1.0mm, bên trong chứa lõi bông gốm Ceramic chống cháy cách nhiệt mật độ cao. Hệ gioăng kép gồm gioăng cao su giảm chấn và gioăng trương nở ngăn khói độc khi nhiệt độ vượt 150°C.',
    specs: {
      material: 'Thép mạ kẽm cán nguội tiêu chuẩn JIS G3141',
      thickness: 'Cánh dày 50mm (thép 0.8 - 1.0mm) / Khung dày 1.2 - 1.4mm',
      insulation: 'Lõi bông gốm Ceramic cách nhiệt tỷ trọng 120kg/m³',
      finish: 'Sơn tĩnh điện bột Jotun ngoài trời / trong nhà theo bảng màu RAL',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012 (Mã 1803/KD-PCCC-P7)',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Giấy kiểm định phương tiện PCCC số 1803/KD-PCCC-P7',
      'Gioăng ngăn khói trương nở tự động bịt kín khe hở',
      'Tích hợp tay co thủy lực tự đóng và thanh đẩy panic thoát hiểm',
      'Khung bao chấn rãnh cài gioăng chuyên dụng chống ồn và khói'
    ],
    image: cuaThepEi70Cover,
    gallery: [cuaThepEi70Cover, cuaThepEi70_2, cuaThepEi70_3, cuaThepEi70_4, cuaThepEi70_5],
    imageAlt: 'Cửa thép ngăn cháy 1 cánh sơn tĩnh điện xám lắp cạnh hộp chữa cháy PCCC – APEX',
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'cua-thep-ei90-1-canh',
    slug: 'cua-thep-ei90-1-canh',
    name: 'Cửa Thép Ngăn Cháy 1 Cánh EI90',
    category: 'cua-thep-ngan-chay',
    categoryName: 'Cửa thép ngăn cháy',
    fireRating: 'EI90',
    certificationNo: '1786/KD-PCCC-P7',
    description: 'Cửa thép chống cháy 1 cánh giới hạn chịu lửa 90 phút bảo vệ chuyên sâu phòng kỹ thuật điện, phòng máy chủ server, trạm biến áp phụ tải và kho lưu trữ hồ sơ.',
    longDescription: 'Cửa thép ngăn cháy 1 cánh EI90 đạt chứng nhận kiểm định số 1786/KD-PCCC-P7. Cánh cửa dày 50mm với 2 lớp thép mạ điện dày 1.0mm, lõi composite đa tầng chống cháy chịu nhiệt vượt 1.100°C. Phù hợp tuyệt đối cho các vị trí yêu cầu thời gian ngăn lửa và ngăn bức xạ nhiệt kéo dài 90 phút.',
    specs: {
      material: 'Thép mạ kẽm cao cấp cán nguội gia cường gân tăng cứng',
      thickness: 'Cánh dày 50mm (thép 1.0mm) / Khung hộp 1.4mm',
      insulation: 'Lõi composite đa tầng chống cháy chịu nhiệt > 1.100°C',
      finish: 'Sơn tĩnh điện Jotun chịu nhiệt và chống trầy xước',
      standard: 'TCVN 9383:2012, QCVN 06:2022/BXD (Mã 1786/KD-PCCC-P7)',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Chứng nhận kiểm định phương tiện PCCC số 1786/KD-PCCC-P7',
      'Chịu lửa và ngăn khói toàn diện 90 phút',
      'Bản lề cối Inox 304 chịu tải trọng cánh lớn',
      'Tùy chọn ô kính quan sát chống cháy EI90 kích thước theo quy chuẩn'
    ],
    image: cuaThepEi90_1Cover,
    gallery: [cuaThepEi90_1Cover, cuaThepEi90_1_2, cuaThepEi90_1_3, cuaThepEi90_1_4],
    imageAlt: 'Cửa thép ngăn cháy 1 cánh EI90 sơn tĩnh điện xám hoàn thiện tại sảnh văn phòng – APEX',
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'cua-thep-ei90-2-canh',
    slug: 'cua-thep-ei90-2-canh',
    name: 'Cửa Thép Ngăn Cháy 2 Cánh EI90',
    category: 'cua-thep-ngan-chay',
    categoryName: 'Cửa thép ngăn cháy',
    fireRating: 'EI90',
    certificationNo: '2736/KD-PCCC-P7',
    description: 'Cửa thép 2 cánh mở khẩu độ lớn chịu lửa 90 phút, bố trí sảnh chính, hành lang tầng, phòng máy trung tâm và kho lưu trữ của tòa nhà thương mại.',
    longDescription: 'Cửa thép ngăn cháy 2 cánh EI90 kiểm định theo số 2736/KD-PCCC-P7, kích thước khung bao tham chiếu 2.300 x 2.400 mm. Kết cấu chốt âm Inox trên dưới giữ cánh phụ, khóa tay gạt và tay co thủy lực kép đảm bảo đóng kín cả hai cánh khi có sự cố cháy nổ.',
    specs: {
      material: 'Thép mạ điện tiêu chuẩn JIS G3141 gia cường liên kết ngầm',
      thickness: 'Cánh dày 50mm (thép 1.0mm) / Khung bao dày 1.4 - 1.6mm',
      insulation: 'Lõi cách nhiệt chịu lửa đa tầng không sinh khói độc',
      finish: 'Sơn tĩnh điện hoàn thiện màu xám ghi hoặc màu theo thiết kế',
      standard: 'TCVN 9383:2012 (Mã 2736/KD-PCCC-P7)',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Chứng nhận kiểm định số 2736/KD-PCCC-P7',
      'Thiết kế 2 cánh mở tiện lợi cho lưu thông hàng hóa và thiết bị',
      'Hệ thống chốt âm Inox định vị cánh phụ chắc chắn',
      'Đồng bộ thanh thoát hiểm panic đôi cho cả 2 cánh'
    ],
    image: cuaThepEi90_2Cover,
    gallery: [cuaThepEi90_2Cover, cuaThepEi90_2_2, cuaThepEi90_2_3, cuaThepEi90_2_4, cuaThepEi90_2_5],
    imageAlt: 'Cửa thép ngăn cháy 2 cánh EI90 phủ vân gỗ sáng lắp tại hành lang tòa nhà – APEX',
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'cua-thep-ei120-2-canh',
    slug: 'cua-thep-ei120-2-canh',
    name: 'Cửa Thép Ngăn Cháy 2 Cánh EI120',
    category: 'cua-thep-ngan-chay',
    categoryName: 'Cửa thép ngăn cháy',
    fireRating: 'EI120',
    certificationNo: '2225/KD-PCCC-P7',
    description: 'Cửa thép chống cháy cấp độ cao nhất EI120 (120 phút), chuyên dụng cho trạm biến áp chính, trạm bơm PCCC trung tâm và phân khoang cháy nhà xưởng nặng.',
    longDescription: 'Cửa thép ngăn cháy 2 cánh EI120 đạt chứng nhận kiểm định số 2225/KD-PCCC-P7. Khung bao thép dày 1.6mm chấn gia cường, cánh thép dày 1.2mm với lõi bông gốm Ceramic mật độ cực cao 128kg/m³, giữ nhiệt độ mặt không cháy dưới 140°C trong suốt 120 phút thử nghiệm lửa.',
    specs: {
      material: 'Thép mạ kẽm độ dày cao, chấn gấp CNC dung sai ±0.5mm',
      thickness: 'Cánh dày 50mm (thép 1.0 - 1.2mm) / Khung dày 1.4 - 1.6mm',
      insulation: 'Lõi bông gốm Ceramic siêu cách nhiệt 128kg/m³',
      finish: 'Sơn tĩnh điện Jotun ngoài trời 2 thành phần',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012 (Mã 2225/KD-PCCC-P7)',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Chứng nhận kiểm định phương tiện PCCC số 2225/KD-PCCC-P7',
      'Thời gian chịu lửa và cách nhiệt tối đa 120 phút',
      'Khả năng ngăn khói và áp lực nhiệt vượt trội',
      'Gia công kích thước chính xác theo số đo thực tế công trình'
    ],
    image: cuaThepEi120_2Cover,
    gallery: [cuaThepEi120_2Cover, cuaThepEi120_2_2, cuaThepEi120_2_3],
    imageAlt: 'Cửa thép ngăn cháy 2 cánh EI120 có ô kính quan sát chịu nhiệt và tay nắm inox – APEX',
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'cua-thep-ngan-chay',
    slug: 'cua-thep-ngan-chay',
    name: 'Hệ Cửa Thép Ngăn Cháy APEX (Tổng Quan)',
    category: 'cua-thep-ngan-chay',
    categoryName: 'Cửa thép ngăn cháy',
    fireRating: 'EI60 - EI120',
    certificationNo: 'QCVN 06:2022/BXD',
    description: 'Tổng quan giải pháp cửa thép ngăn cháy APEX: 1 cánh, 2 cánh, ô kính quan sát, đầy đủ cấp độ EI60 - EI70 - EI90 - EI120 đồng bộ kiểm định PCCC.',
    longDescription: 'Cửa thép ngăn cháy APEX là cấu kiện phân khoang ngăn cháy trọng yếu trong các công trình công nghiệp và dân dụng. Sản phẩm được sản xuất từ thép mạ kẽm hoặc thép cán nguội chất lượng cao, khung và cánh gia cường gân tăng cứng, bên trong chứa lõi cách nhiệt chống cháy. Hệ thống gioăng ngăn khói tự giãn nở khi nhiệt độ tăng cao giúp cô lập buồng cháy, bảo vệ lối thoát nạn khẩn cấp.',
    specs: {
      material: 'Thép mạ kẽm độ dày theo hồ sơ thiết kế công trình',
      thickness: 'Kích thước gia công theo khảo sát thực tế',
      insulation: 'Lõi vật liệu cách nhiệt không cháy chuyên dụng',
      finish: 'Sơn tĩnh điện bảng màu Jotun theo yêu cầu',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Gia công theo kích thước khảo sát thực tế của từng công trình',
      'Tùy chọn khóa tay gạt, thanh đẩy thoát hiểm panic, tay co thủy lực',
      'Hệ gioăng ngăn khói và chống ồn chuyên dụng',
      'Hồ sơ kỹ thuật đồng bộ phục vụ nghiệm thu PCCC'
    ],
    image: cuaThepTongQuanCover,
    gallery: [cuaThepTongQuanCover, cuaThepTongQuan_2, cuaThepTongQuan_3, cuaThepTongQuan_4, cuaThepTongQuan_5],
    imageAlt: 'Tổng quan giải pháp cửa thép ngăn cháy kiểm định PCCC công trình – APEX',
    priceEstimate: 'Liên hệ'
  },

  // ==========================================
  // NHÓM 1B: CỬA THÉP VÂN GỖ CHỐNG CHÁY (Thẩm Mỹ & An Toàn)
  // ==========================================
  {
    id: 'cua-thep-van-go-1-canh-ei70',
    slug: 'cua-thep-van-go-1-canh-ei70',
    name: 'Cửa Thép Vân Gỗ 1 Cánh EI70',
    category: 'cua-thep-van-go',
    categoryName: 'Cửa thép vân gỗ chống cháy',
    fireRating: 'EI70',
    certificationNo: 'QCVN 06:2022/BXD',
    description: 'Cửa thép vân gỗ chống cháy 1 cánh tiêu chuẩn EI70 dập huỳnh panel sang trọng, công nghệ in chuyển nhiệt 3D vân gỗ tự nhiên, cách âm 35–40dB cho căn hộ cao cấp và biệt thự.',
    longDescription: 'Cửa thép vân gỗ chống cháy 1 cánh EI70 APEX kết hợp hoàn hảo giữa tiêu chuẩn an toàn PCCC nghiêm ngặt và tính thẩm mỹ nội thất gỗ quý. Cánh dày 50mm thép mạ điện 0.8–1.0mm, lõi Magie Oxit (MgO) không sinh khói độc, gioăng cao su EPDM giảm chấn và gioăng ngăn khói trương nở nhiệt. Bề mặt sơn in truyền nhiệt Nano chống trầy, bảo hành 36 tháng.',
    specs: {
      material: 'Thép mạ điện cán nguội JIS G3141',
      thickness: 'Cánh dày 50mm (thép 0.8 - 1.0mm) / Khung dày 1.2 - 1.5mm',
      insulation: 'Tấm Magie Oxit (MgO) / ERON chống cháy tỷ trọng cao',
      finish: 'Sơn tĩnh điện in chuyển nhiệt vân gỗ 3D phủ bóng Nano',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012',
      warranty: '36 tháng bề mặt vân gỗ, 24 tháng phụ kiện'
    },
    features: [
      'Đạt kiểm định PCCC EI70 theo QCVN 06:2022/BXD',
      'Công nghệ in truyền nhiệt vân gỗ 3D tự nhiên bền màu trên 15 năm',
      'Cách âm 35–40dB, gioăng ngăn khói nở nhiệt tự động bịt kín',
      'Tương thích khóa cơ an toàn và khóa thông minh điện tử'
    ],
    image: cuaThepVanGoCover,
    gallery: [cuaThepVanGoCover, cuaThepVanGoProj1, cuaThepVanGoProj2, cuaThepVanGoProj3],
    imageAlt: 'Cửa thép vân gỗ chống cháy 1 cánh dập huỳnh panel căn hộ cao cấp – APEX',
    priceEstimate: 'Từ 1.600.000 đ/m²',
    popular: true
  },
  {
    id: 'cua-thep-van-go-2-canh-ei90',
    slug: 'cua-thep-van-go-2-canh-ei90',
    name: 'Cửa Thép Vân Gỗ 2 Cánh EI90',
    category: 'cua-thep-van-go',
    categoryName: 'Cửa thép vân gỗ chống cháy',
    fireRating: 'EI90',
    certificationNo: 'QCVN 06:2022/BXD',
    description: 'Cửa thép vân gỗ chống cháy 2 cánh đôi tiêu chuẩn EI90 chịu lửa 90 phút, thiết kế đại sảnh sang trọng cho biệt thự, khách sạn, phòng họp và lối thoát hiểm hành lang.',
    longDescription: 'Cửa thép vân gỗ 2 cánh EI90 APEX được chế tạo từ thép tấm cán nguội gia cường gân tăng cứng, cánh đôi đóng mở êm nhẹ nhờ bản lề inox SUS304 4 vòng bi chịu lực. Lõi cách nhiệt MgO chịu nhiệt độ trên 1.000°C trong 90 phút. Bề mặt vân gỗ tinh xảo, chống ẩm mốc cong vênh trước khí hậu nhiệt đới ẩm.',
    specs: {
      material: 'Thép mạ kẽm cán nguội JIS G3141 gia cường gân chịu lực',
      thickness: 'Cánh dày 50mm (thép 1.0mm) / Khung 1.4 - 1.5mm',
      insulation: 'Lõi tấm cách nhiệt Magie Oxit (MgO) chống cháy không sinh khói độc',
      finish: 'Sơn tĩnh điện phủ màng vân gỗ 3D hút chân không truyền nhiệt',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012',
      warranty: '36 tháng bề mặt vân gỗ, 24 tháng phụ kiện'
    },
    features: [
      'Khả năng chịu lửa và cách nhiệt EI90 (90 phút)',
      'Quy cách 2 cánh đều hoặc lệch theo ô chờ thực tế',
      'Bản lề Inox SUS304 4 vòng bi chịu tải nặng đóng mở êm',
      'Chốt âm cánh phụ và tay co thủy lực tự động đóng kín'
    ],
    image: cuaThepVanGoProj2,
    gallery: [cuaThepVanGoProj2, cuaThepVanGoProj3, cuaThepVanGoCover, cuaThepVanGoProj1],
    imageAlt: 'Cửa thép vân gỗ chống cháy 2 cánh đại sảnh lối thoát hiểm PCCC – APEX',
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'cua-thep-van-go',
    slug: 'cua-thep-van-go',
    name: 'Hệ Cửa Thép Vân Gỗ Chống Cháy APEX (Tổng Quan)',
    category: 'cua-thep-van-go',
    categoryName: 'Cửa thép vân gỗ chống cháy',
    fireRating: 'EI60 - EI90',
    certificationNo: 'QCVN 06:2022/BXD',
    description: 'Tổng quan giải pháp cửa thép vân gỗ chống cháy cao cấp APEX: 1 cánh, 2 cánh, đa dạng màu vân gỗ Lim, Sồi, Óc chó, đạt kiểm định PCCC EI60 - EI90 cho căn hộ và biệt thự.',
    longDescription: 'Cửa thép vân gỗ APEX là giải pháp đột phá kết hợp độ bền và tính năng ngăn cháy cách nhiệt của thép với nét đẹp ấm cúng sang trọng của gỗ tự nhiên. Đạt chuẩn QCVN 06:2022/BXD, cách âm 35–40dB, chống ẩm mốc mối mọt cong vênh tuyệt đối.',
    specs: {
      material: 'Thép mạ điện cán nguội JIS G3141',
      thickness: 'Cánh 50mm (thép 0.8 - 1.0mm) / Khung 1.2 - 1.5mm',
      insulation: 'Lõi Magie Oxit (MgO) / ERON không amiăng',
      finish: 'Sơn tĩnh điện in chuyển nhiệt vân gỗ tự nhiên 3D',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012',
      warranty: '36 tháng'
    },
    features: [
      'Đạt kiểm định PCCC EI60 – EI90 theo QCVN 06:2022/BXD',
      'Vân gỗ in chuyển nhiệt 3D bền màu trên 15 năm',
      'Không cong vênh, co ngót, mối mọt hay ẩm mốc',
      'Gia công theo kích thước ô chờ thực tế công trình'
    ],
    image: cuaThepVanGoCover,
    gallery: [cuaThepVanGoCover, cuaThepVanGoProj1, cuaThepVanGoProj2, cuaThepVanGoProj3],
    imageAlt: 'Tổng quan hệ cửa thép vân gỗ chống cháy kiểm định PCCC APEX',
    priceEstimate: 'Từ 1.600.000 đ/m²'
  },

  // ==========================================
  // NHÓM 2: CỬA KÍNH NGĂN CHÁY (Kiến Trúc Mở)
  // ==========================================
  {
    id: 'cua-kinh-ngan-chay-ei60',
    slug: 'cua-kinh-ngan-chay-ei60',
    name: 'Cửa Kính Ngăn Cháy EI60',
    category: 'cua-kinh-ngan-chay',
    categoryName: 'Cửa kính ngăn cháy',
    fireRating: 'EI60',
    description: 'Cửa kính chống cháy khung thép bọc Inox, kính ngăn cháy nhiều lớp gel cách nhiệt trong suốt, đảm bảo tầm nhìn thông thoáng cho sảnh văn phòng và trung tâm thương mại.',
    longDescription: 'Cửa kính ngăn cháy EI60 kết hợp tính thẩm mỹ cao của kiến trúc không gian mở với khả năng cách nhiệt ngăn khói 60 phút. Gel chống cháy trong suốt giữa các lớp kính tự động phồng nở khi tiếp xúc với nhiệt độ cao, tạo thành bức tường chắn nhiệt mờ đục bảo vệ lối thoát nạn.',
    specs: {
      material: 'Kính chống cháy đa tầng kết hợp khung thép định hình bọc Inox 304',
      thickness: 'Kính dày 20 - 28mm tùy cấu hình khẩu độ thiết kế',
      insulation: 'Lớp hợp chất Intumescent gel cách nhiệt trong suốt',
      finish: 'Inox xước Hairline hoặc sơn tĩnh điện màu cao cấp',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Khả năng truyền sáng tự nhiên và tầm nhìn quan sát thông thoáng',
      'Khung bao bọc Inox sắc nét, độ chính xác cơ khí cao',
      'Ngăn nhiệt bức xạ và khí độc trong 60 phút',
      'Đồng bộ phụ kiện tay nắm Inox và bản lề sàn thủy lực chịu lửa'
    ],
    image: cuaKinhEi60Cover,
    gallery: [cuaKinhEi60Cover, cuaKinhEi60_2, cuaKinhEi60_3, cuaKinhEi60_4],
    imageAlt: 'Cửa kính ngăn cháy EI60 khung thép định hình sơn tĩnh điện lắp tại sảnh thang máy – APEX',
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'cua-kinh-ngan-chay-ei90',
    slug: 'cua-kinh-ngan-chay-ei90',
    name: 'Cửa Kính Ngăn Cháy EI90',
    category: 'cua-kinh-ngan-chay',
    categoryName: 'Cửa kính ngăn cháy',
    fireRating: 'EI90',
    description: 'Cửa kính ngăn cháy cách nhiệt cao cấp EI90 cho sảnh giao dịch tài chính, trung tâm điều hành và văn phòng hạng A đòi hỏi tiêu chuẩn an toàn nghiêm ngặt.',
    longDescription: 'Cửa kính ngăn cháy EI90 cấu tạo từ hệ khung chịu lực cách nhiệt chuyên dụng và phôi kính chống cháy nhiều lớp dày trên 30mm. Chịu nhiệt độ ngọn lửa trên 1.000°C liên tục trong 90 phút mà không làm truyền nhiệt sang mặt đối diện.',
    specs: {
      material: 'Kính chống cháy nhiều lớp gel cách nhiệt + Khung Inox gia cường lõi chống cháy',
      thickness: 'Kính dày 30 - 36mm / Khung thép cách nhiệt gia cố',
      insulation: 'Đa lớp gel trương nở cách nhiệt chịu nhiệt độ cao',
      finish: 'Bề mặt Inox gương / xước hoặc sơn tĩnh điện fluorocarbon',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Chỉ số giới hạn chịu lửa EI90 tiêu chuẩn cao cấp',
      'Cách âm và cách nhiệt vượt trội',
      'Hệ thống gioăng chống khói kép kín khít tuyệt đối',
      'Tích hợp cảm biến mở tự động và khóa điện tử kết nối PCCC'
    ],
    image: cuaKinhEi90Cover,
    gallery: [cuaKinhEi90Cover, cuaKinhEi90_2, cuaKinhEi90_3, cuaKinhEi90_4],
    imageAlt: 'Cửa kính ngăn cháy EI90 2 cánh khung thép chịu nhiệt nhìn ra cầu thang ngoài trời – APEX',
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'vach-kinh-ngan-chay-ei60-ei90',
    slug: 'vach-kinh-ngan-chay-ei60-ei90',
    name: 'Vách Kính Cố Định Chống Cháy EI60 - EI90',
    category: 'cua-kinh-ngan-chay',
    categoryName: 'Cửa kính ngăn cháy',
    fireRating: 'EI60 - EI90',
    description: 'Hệ vách kính cố định ngăn khoang cháy thông tầng kiến trúc mở, lấy sáng tự nhiên kết hợp ngăn nhiệt bức xạ theo QCVN 06:2022/BXD.',
    longDescription: 'Vách kính chống cháy APEX được lắp đặt tại các khoảng thông tầng, vách hành lang thoát hiểm và giếng trời. Thiết kế module lắp ghép với nẹp kính giấu vít, keo chống cháy chịu nhiệt đàn hồi cao đảm bảo độ bền kết cấu khi giãn nở vì nhiệt.',
    specs: {
      material: 'Kính ngăn cháy hộp nhiều lớp khung thép chịu lực bọc Inox',
      thickness: 'Khẩu độ và độ dày kính tính toán theo bản vẽ kết cấu',
      insulation: 'Hợp chất gel ngăn nhiệt trương nở đa lớp',
      finish: 'Sơn tĩnh điện màu sắc đồng bộ nội thất hoặc Inox 304',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Ngăn khoang cháy thông tầng không cản trở tầm nhìn kiến trúc',
      'Chịu áp lực gió và chống va đập an toàn theo tiêu chuẩn xây dựng',
      'Hệ keo kết cấu chống cháy chuyên dụng chịu nhiệt độ cao',
      'Gia công module tại xưởng rút ngắn thời gian lắp đặt tại công trình'
    ],
    image: vachKinhCover,
    gallery: [vachKinhCover, vachKinh_2, vachKinh_3],
    imageAlt: 'Vách kính và cửa kính ngăn cháy cách nhiệt thông tầng kiến trúc mở – APEX',
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'cua-kinh-ngan-chay',
    slug: 'cua-kinh-ngan-chay',
    name: 'Hệ Cửa Kính Ngăn Cháy APEX (Tổng Quan)',
    category: 'cua-kinh-ngan-chay',
    categoryName: 'Cửa kính ngăn cháy',
    fireRating: 'EI60 - EI90',
    description: 'Cửa kính ngăn cháy APEX kết hợp hệ khung chịu lực và kính ngăn lửa nhiều lớp, duy trì khả năng quan sát và lấy sáng tự nhiên đồng thời đảm bảo an toàn chịu nhiệt.',
    longDescription: 'Cửa kính ngăn cháy là giải pháp kiến trúc hiện đại đáp ứng đồng thời yêu cầu phân khoang ngăn lửa và tính thẩm mỹ không gian mở. Kính ngăn cháy có cấu tạo nhiều lớp với gel cách nhiệt trong suốt trương nở khi gặp nhiệt độ cao, tạo thành màng chắn ngăn bức xạ nhiệt và khói độc.',
    specs: {
      material: 'Kính ngăn cháy chuyên dụng kết hợp khung thép hoặc Inox gia cường',
      thickness: 'Theo cấu hình kính và khẩu độ thiết kế',
      insulation: 'Lớp hợp chất trương nở cách nhiệt trong suốt',
      finish: 'Sơn tĩnh điện cao cấp hoặc Inox xước hairline',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Đảm bảo tầm nhìn thông thoáng và khả năng lấy sáng tự nhiên',
      'Tính thẩm mỹ cao cho sảnh tòa nhà, văn phòng và trung tâm thương mại',
      'Khung viền gia công chính xác, kín khít ngăn khói độc',
      'Tư vấn phương án lắp đặt chi tiết theo hồ sơ bản vẽ'
    ],
    image: cuaKinhTongQuanCover,
    gallery: [cuaKinhTongQuanCover, cuaKinhTongQuan_2, cuaKinhTongQuan_3, cuaKinhTongQuan_4],
    imageAlt: 'Hệ cửa kính ngăn cháy an toàn thẩm mỹ cho trung tâm thương mại và tòa nhà văn phòng – APEX',
    priceEstimate: 'Liên hệ'
  },

  // ==========================================
  // NHÓM 3: CỬA CUỐN NGĂN CHÁY (Khoảng Mở Lớn)
  // ==========================================
  {
    id: 'cua-cuon-aks-ei70',
    slug: 'cua-cuon-aks-ei70',
    name: 'Cửa Cuốn Ngăn Cháy Cách Nhiệt AKS - EI70',
    category: 'cua-cuon-ngan-chay',
    categoryName: 'Cửa cuốn ngăn cháy',
    fireRating: 'EI70',
    certificationNo: '0378-2024/TNCL',
    description: 'Cửa cuốn ngăn cháy cách nhiệt model AKS giới hạn chịu lửa EI70, tự động hạ đóng kín phân khoang khi nhận tín hiệu báo cháy cho tầng hầm và TTTM.',
    longDescription: 'Cửa cuốn ngăn cháy cách nhiệt AKS - EI70 thử nghiệm đạt chuẩn theo kết quả số 0378-2024/TNCL theo TCVN 9383:2012. Nan cửa chế tạo bằng thép định hình chịu nhiệt hai lớp có chèn vật liệu cách nhiệt, liên kết trục cuốn chịu lực và ray dẫn hướng có gioăng ngăn khói.',
    specs: {
      material: 'Nan thép mạ kẽm định hình chịu nhiệt chèn bông gốm Ceramic',
      thickness: 'Khẩu độ sản xuất rộng lên tới 8.000 mm x 6.000 mm',
      insulation: 'Lõi vật liệu cách nhiệt không cháy chịu nhiệt độ > 1.000°C',
      finish: 'Sơn tĩnh điện Jotun chịu nhiệt độ cao',
      standard: 'TCVN 9383:2012 (Mã 0378-2024/TNCL)',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Kết quả thử nghiệm chất lượng số 0378-2024/TNCL đạt EI70',
      'Động cơ chống cháy chuyên dụng liên động tủ trung tâm báo cháy',
      'Cơ chế hạ tự động trọng lực khi mất điện nguồn hoàn toàn',
      'Ray dẫn hướng thép dày 2.0mm tăng cứng chống biến dạng nhiệt'
    ],
    image: ROLLER_SHUTTER_IMAGE,
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'cua-cuon-aks-ei92',
    slug: 'cua-cuon-aks-ei92',
    name: 'Cửa Cuốn Ngăn Cháy Siêu Trường AKS - EI92',
    category: 'cua-cuon-ngan-chay',
    categoryName: 'Cửa cuốn ngăn cháy',
    fireRating: 'EI92',
    certificationNo: '0040-2024/TNCL-TT2',
    description: 'Cửa cuốn ngăn cháy siêu trường khẩu độ lớn chịu lửa 92 phút, giải pháp phân khoang chống cháy tối ưu cho kho vận logistics và xưởng công nghiệp nặng.',
    longDescription: 'Cửa cuốn ngăn cháy AKS - EI92 kiểm định theo kết quả số 0040-2024/TNCL-TT2. Cấu trúc nan cửa dày dặn tăng cường khả năng chịu áp lực gió và nhiệt lượng cực lớn trong 92 phút liên tục, ngăn lửa và khí độc lan sang kho xưởng lân cận.',
    specs: {
      material: 'Thép mạ kẽm cường độ cao, nan chấn phức hợp đa tầng',
      thickness: 'Khẩu độ siêu trường rộng đến 12m theo thiết kế dự án',
      insulation: 'Bông khoáng cách nhiệt tỷ trọng cao kết hợp màng chống cháy',
      finish: 'Sơn tĩnh điện chống ăn mòn công nghiệp',
      standard: 'TCVN 9383:2012 (Mã 0040-2024/TNCL-TT2)',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Kết quả thử nghiệm số 0040-2024/TNCL-TT2 đạt EI92',
      'Vận hành êm ái, cơ chế bảo vệ chống rơi cửa an toàn',
      'Động cơ motor công suất lớn trang bị xích kéo tay thoát hiểm',
      'Hộp che cuốn thép bảo vệ đồng bộ cơ cấu trục xoay'
    ],
    image: ROLLER_SHUTTER_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'cua-cuon-ngan-chay-motor-ups',
    slug: 'cua-cuon-ngan-chay-motor-ups',
    name: 'Hệ Thống Cửa Cuốn Motor Chống Cháy & UPS Lưu Điện',
    category: 'cua-cuon-ngan-chay',
    categoryName: 'Cửa cuốn ngăn cháy',
    fireRating: 'EI70 - EI120',
    description: 'Cửa cuốn ngăn cháy tích hợp đồng bộ motor chịu nhiệt, bộ lưu điện UPS dự phòng và nút bấm khẩn cấp, kích hoạt hạ cửa tin cậy 100% trong mọi tình huống.',
    longDescription: 'Hệ thống vận hành cửa cuốn ngăn cháy APEX đảm bảo cửa tự động đóng kín ngay cả khi toàn bộ nguồn điện lưới công trình bị ngắt. Bộ điều khiển thông minh tự kiểm tra dung lượng ắc quy định kỳ và phát tín hiệu cảnh báo bảo trì.',
    specs: {
      material: 'Nan cửa cuốn chống cháy kết hợp động cơ motor chuyên dụng chịu nhiệt',
      thickness: 'Tùy chọn tải trọng motor từ 600kg đến 2.000kg',
      insulation: 'Cơ cấu xả trọng lực bằng cơ học độc lập nguồn điện',
      finish: 'Hộp điều khiển sơn tĩnh điện chuẩn công nghiệp',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Bộ lưu điện UPS duy trì nguồn dự phòng vận hành khẩn cấp',
      'Cơ chế xả ly hợp tự hạ cửa bằng trọng lực khi có báo cháy',
      'Cảm biến an toàn dừng khi gặp vật cản trong hành trình',
      'Kết nối tín hiệu tiếp điểm khô với hệ thống BMS/Fire Alarm'
    ],
    image: ROLLER_SHUTTER_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'cua-cuon-ngan-chay',
    slug: 'cua-cuon-ngan-chay',
    name: 'Hệ Cửa Cuốn Ngăn Cháy APEX (Tổng Quan)',
    category: 'cua-cuon-ngan-chay',
    categoryName: 'Cửa cuốn ngăn cháy',
    fireRating: 'EI70 - EI92',
    description: 'Cửa cuốn ngăn cháy siêu trường APEX che chắn các khoảng mở nhịp lớn, tự động kích hoạt đóng kín khi nhận tín hiệu báo cháy kết nối hệ thống điều khiển trung tâm.',
    longDescription: 'Cửa cuốn ngăn cháy được thiết kế nhằm đáp ứng yêu cầu ngăn khoang cháy diện tích lớn tại các vị trí không thể bố trí cửa mở quay thông thường. Nan cửa chế tạo bằng thép định hình chịu nhiệt, ray dẫn hướng và trục cuốn gia cố vững chắc, kết hợp motor chống cháy và bộ lưu điện dự phòng UPS đảm bảo vận hành tin cậy ngay cả khi mất điện nguồn.',
    specs: {
      material: 'Nan thép mạ kẽm định hình chịu nhiệt, cấu trúc cách âm cách nhiệt',
      thickness: 'Sản xuất khẩu độ rộng theo khoảng mở công trình',
      insulation: 'Lõi vật liệu sợi khoáng vô cơ không cháy',
      finish: 'Sơn tĩnh điện Jotun chịu nhiệt độ cao',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Che chắn các khoảng mở siêu trường lên đến hơn 10m nhịp rộng',
      'Tự động hạ cửa cô lập đám cháy khi nhận tín hiệu báo khói báo nhiệt',
      'Bộ lưu điện dự phòng đảm bảo đóng cửa kể cả khi mất điện lưới',
      'Tích hợp cảm biến an toàn chống va đập người và phương tiện'
    ],
    image: ROLLER_SHUTTER_IMAGE,
    priceEstimate: 'Liên hệ'
  },

  // ==========================================
  // NHÓM 4: RÈM NGĂN CHÁY & KHÓI (Ngăn Khói Trọng Lực)
  // ==========================================
  {
    id: 'rem-ngan-chay-akf-ei60',
    slug: 'rem-ngan-chay-akf-ei60',
    name: 'Rèm Ngăn Cháy Tự Động AKF - EI60',
    category: 'rem-ngan-chay',
    categoryName: 'Rèm ngăn cháy & khói',
    fireRating: 'EI60',
    certificationNo: '0250-2024/TNCL-TT2',
    description: 'Rèm ngăn cháy tự động model AKF giới hạn chịu lửa EI60, giấu kín trên trần thạch cao thẩm mỹ, tự động thả xuống phân khoang ngăn lửa cho sảnh trung tâm thương mại.',
    longDescription: 'Rèm ngăn cháy tự động AKF - EI60 được thử nghiệm đạt chuẩn theo kết quả số 0250-2024/TNCL-TT2. Vải rèm dệt từ sợi thủy tinh gia cường lưới thép Inox và phủ lớp polymer chống cháy ngăn khói độc. Hộp trục cuốn siêu mỏng dễ dàng giấu kín trong khe trần kiến trúc.',
    specs: {
      material: 'Vải sợi thủy tinh kỹ thuật cao gia cường sợi thép Inox',
      thickness: 'Khẩu độ sản xuất không giới hạn chiều dài phân đoạn',
      insulation: 'Lớp phủ composite ngăn nhiệt và khí độc ở nhiệt độ > 1.000°C',
      finish: 'Màu xám bạc phản xạ nhiệt, thanh đáy sơn tĩnh điện',
      standard: 'TCVN 9383:2012 (Mã 0250-2024/TNCL-TT2)',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Kết quả thử nghiệm chất lượng số 0250-2024/TNCL-TT2 đạt EI60',
      'Thiết kế giấu trần siêu mỏng không ảnh hưởng kiến trúc không gian',
      'Trọng lượng nhẹ hơn 80% so với cửa cuốn thép truyền thống',
      'Cơ cấu thả rơi trọng lực Gravigen đảm bảo an toàn tuyệt đối'
    ],
    image: FIRE_CURTAIN_IMAGE,
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'rem-ngan-chay-akf-ei91',
    slug: 'rem-ngan-chay-akf-ei91',
    name: 'Rèm Ngăn Cháy Cách Nhiệt AKF - EI91',
    category: 'rem-ngan-chay',
    categoryName: 'Rèm ngăn cháy & khói',
    fireRating: 'EI91',
    certificationNo: '0174-2024/TNCL',
    description: 'Rèm ngăn cháy cách nhiệt AKF - EI91 chịu lửa trên 90 phút, tích hợp giải pháp ngăn bức xạ nhiệt cho các khoảng thông tầng lớn, rạp chiếu phim và showroom.',
    longDescription: 'Rèm ngăn cháy cách nhiệt AKF - EI91 thử nghiệm theo số 0174-2024/TNCL. Cấu tạo vải rèm đa tầng cách nhiệt phản xạ bức xạ nhiệt kết hợp hệ thống đầu phun màng nước làm mát hoặc vật liệu trương nở cách nhiệt khô theo thiết kế dự án.',
    specs: {
      material: 'Vải dệt sợi gốm Ceramic và sợi thủy tinh nhiều lớp tăng cường',
      thickness: 'Khổ rèm thiết kế linh hoạt theo mặt cắt kiến trúc',
      insulation: 'Vật liệu chặn nhiệt bức xạ cao cấp giữ an toàn lối thoát nạn',
      finish: 'Thanh dẫn hướng Inox/thép sơn tĩnh điện chống kẹt rèm',
      standard: 'TCVN 9383:2012 (Mã 0174-2024/TNCL)',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Kết quả thử nghiệm số 0174-2024/TNCL đạt EI91',
      'Khả năng chịu nhiệt độ khắc nghiệt vượt 90 phút',
      'Ray dẫn hướng chống bung mép rèm trước áp lực gió lớn',
      'Tủ điều khiển thông minh quản lý tốc độ thả rơi êm ái'
    ],
    image: FIRE_CURTAIN_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'rem-ngan-khoi-trong-luc',
    slug: 'rem-ngan-khoi-trong-luc',
    name: 'Rèm Ngăn Khói Trọng Lực Âm Trần DH60',
    category: 'rem-ngan-chay',
    categoryName: 'Rèm ngăn cháy & khói',
    fireRating: 'DH60 / D120',
    description: 'Rèm ngăn khói chuyên dụng tự động hạ phân khoang tích tụ khói trần, dẫn khói vào hệ thống quạt hút sự cố, bảo vệ tầm nhìn và đường thở cho người thoát nạn.',
    longDescription: 'Rèm ngăn khói âm trần APEX đáp ứng yêu cầu QCVN 06:2022/BXD về hệ thống thông gió chống khói. Thiết bị hạ xuống một khoảng cách định trước dưới trần tạo thành phễu gom khói độc, ngăn khói tràn sang các khu vực xung quanh.',
    specs: {
      material: 'Vải sợi thủy tinh phủ polyurethane chống thấm khí khói độc',
      thickness: 'Chiều dài nhịp liên tục không giới hạn',
      insulation: 'Chịu nhiệt độ dòng khói 600°C liên tục trong 120 phút',
      finish: 'Thanh đáy nẹp nhôm định hình mạ anode thẩm mỹ',
      standard: 'EN 12101-1, QCVN 06:2022/BXD',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Gom khói độc hiệu quả vào miệng hút của hệ thống quạt PCCC',
      'Tự động hạ xuống bằng trọng lực không phụ thuộc nguồn điện',
      'Độ khít khí cao, không sinh khói thứ cấp',
      'Thi công nhanh chóng, gọn nhẹ, bảo trì thuận tiện'
    ],
    image: FIRE_CURTAIN_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'rem-ngan-chay',
    slug: 'rem-ngan-chay',
    name: 'Hệ Rèm Ngăn Cháy & Khói APEX (Tổng Quan)',
    category: 'rem-ngan-chay',
    categoryName: 'Rèm ngăn cháy & khói',
    fireRating: 'EI60 - EI91',
    description: 'Rèm ngăn cháy và khói APEX là giải pháp linh hoạt và thẩm mỹ, thay thế vách ngăn cố định, tự động hạ xuống tạo khoang cách ly đám cháy khi nhận cảnh báo.',
    longDescription: 'Rèm ngăn cháy sử dụng chất liệu vải dệt sợi thủy tinh gia cường sợi thép kỹ thuật cao, chịu nhiệt độ lớn mà không bị biến dạng. Trục cuốn nhỏ gọn giấu âm trần thạch cao, giữ nguyên vẻ đẹp kiến trúc mở của không gian sảnh đón, tầng thương mại mà vẫn đáp ứng nghiêm ngặt tiêu chuẩn an toàn PCCC.',
    specs: {
      material: 'Vải sợi thủy tinh gia cường sợi kim loại bọc composite chịu nhiệt',
      thickness: 'Khẩu độ sản xuất linh hoạt theo kiến trúc công trình',
      insulation: 'Khả năng ngăn khói độc và bức xạ nhiệt vượt trội',
      finish: 'Thanh đáy và hộp cuốn sơn tĩnh điện màu sắc theo yêu cầu',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Giải pháp tối ưu cho không gian kiến trúc mở hiện đại',
      'Giấu âm trần hoàn toàn, chỉ hạ xuống khi có báo cháy thực tế',
      'Cơ chế hạ tự động bằng đối trọng trọng lực an toàn khi mất điện',
      'Hồ sơ kiểm định phương tiện PCCC đồng bộ'
    ],
    image: FIRE_CURTAIN_IMAGE,
    priceEstimate: 'Liên hệ'
  },

  // ==========================================
  // NHÓM 5: TỦ ĐIỆN PHÂN PHỐI & ĐIỀU KHIỂN (Cơ Điện Hạ Thế)
  // ==========================================
  {
    id: 'tu-dien-phan-phoi-msb',
    slug: 'tu-dien-phan-phoi-msb',
    name: 'Tủ Điện Phân Phối Tổng MSB & DB Hạ Thế',
    category: 'tu-dien',
    categoryName: 'Tủ điện',
    fireRating: 'IP43 - IP54',
    description: 'Vỏ tủ điện tổng MSB và tủ phân phối DB gia công CNC chính xác từ thép cán nguội mạ kẽm, cấp bảo vệ IP43 - IP54, sơn tĩnh điện bảo vệ thiết bị điện lực công trình.',
    longDescription: 'Tủ điện phân phối APEX được sản xuất trên dây chuyền cơ khí CNC hiện đại, thiết kế dạng module khung lắp ghép đa năng theo chuẩn IEC 61439. Khoang tủ phân chia rõ ràng giữa khoang thanh cái chính, khoang máy cắt ACB/MCCB và khoang đấu cáp ra tải, đảm bảo an toàn thao tác vận hành.',
    specs: {
      material: 'Thép mạ kẽm hoặc thép cán nguội SPCC dày 1.5mm - 2.5mm',
      thickness: 'Kích thước tủ thiết kế theo dung lượng và số lượng thiết bị đóng cắt',
      insulation: 'Khoang thanh cái cách ly form 2b, 3b, 4b theo yêu cầu',
      finish: 'Sơn tĩnh điện bột ngoài trời/trong nhà chống ăn mòn hóa chất',
      standard: 'TCVN 7997, IEC 61439-1/2',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Khung lắp ghép module chịu lực xung ngắn mạch lớn',
      'Cánh mở 2 lớp cửa an toàn, khóa then liên động chống giật',
      'Thanh cái đồng gia công uốn CNC, co màng nhiệt đánh dấu pha',
      'Sản xuất kích thước tùy biến chính xác theo bản vẽ cơ điện M&E'
    ],
    image: ELECTRICAL_CABINET_IMAGE,
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'tu-dien-dieu-khien-bom-pccc',
    slug: 'tu-dien-dieu-khien-bom-pccc',
    name: 'Tủ Điện Điều Khiển Trạm Bơm PCCC Tự Động',
    category: 'tu-dien',
    categoryName: 'Tủ điện',
    fireRating: 'IP54',
    description: 'Tủ điều khiển cụm bơm điện, bơm diesel và bơm bù áp PCCC tự động, tích hợp bộ chuyển nguồn ATS và bảo vệ mất pha, khởi động lập tức khi tụt áp đường ống.',
    longDescription: 'Tủ điện điều khiển bơm PCCC là trái tim của hệ thống chữa cháy vách tường và sprinkler. Tủ trang bị logic điều khiển tự động thông minh: ưu tiên bơm điện, tự động đề nổ bơm diesel khi mất điện lưới, điều khiển khởi động sao - tam giác hoặc biến tần/soft-starter giảm sụt áp lưới điện.',
    specs: {
      material: 'Thép tấm dày 1.5 - 2.0mm sơn tĩnh điện màu đỏ PCCC nổi bật',
      thickness: 'Cấp bảo vệ IP54 chống nước hắt và bụi bẩn kho bơm',
      insulation: 'Thiết bị đóng cắt và relay điều khiển chính hãng tiêu chuẩn',
      finish: 'Sơn tĩnh điện màu đỏ PCCC hoặc màu cam nổi bật cảnh báo',
      standard: 'TCVN 3890:2023, NFPA 20',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Điều khiển tuần tự bơm bù áp, bơm chính điện và bơm diesel dự phòng',
      'Tích hợp bộ sạc ắc quy tự động 24VDC cho động cơ diesel',
      'Đèn báo pha, đồng hồ Vôn/Ampe và nút dừng khẩn cấp mặt tủ',
      'Kết nối tín hiệu rơ le áp lực đường ống và tủ trung tâm PCCC'
    ],
    image: ELECTRICAL_CABINET_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'vo-tu-dien-chong-chay-cnc',
    slug: 'vo-tu-dien-chong-chay-cnc',
    name: 'Vỏ Tủ Điện Chống Cháy Sơn Tĩnh Điện / Inox 304',
    category: 'tu-dien',
    categoryName: 'Tủ điện',
    fireRating: 'IP55 / IP65',
    description: 'Gia công vỏ tủ điện công nghiệp theo kích thước bản vẽ thiết kế, sử dụng thép mạ kẽm sơn tĩnh điện hoặc Inox 304 chống ăn mòn hóa chất và ẩm ướt.',
    longDescription: 'Dịch vụ gia công vỏ tủ điện APEX sử dụng máy chấn gấp và đột dập CNC Bystronic/Amada đạt độ chính xác đến từng milimet. Mối hàn kín khít, xử lý bề mặt phốt phát hóa 7 bể trước khi sơn tĩnh điện Jotun đảm bảo độ bám dính và tuổi thọ trên 15 năm.',
    specs: {
      material: 'Thép tấm cán nguội, tôn mạ kẽm hoặc Inox 304 / 316',
      thickness: 'Độ dày vật liệu 1.2mm, 1.5mm, 2.0mm, 2.5mm',
      insulation: 'Gioăng xốp Polyurethane rót tự động trên máy CNC chống nước',
      finish: 'Sơn sần tĩnh điện Jotun hoặc bề mặt Inox Hairline',
      standard: 'IEC 60529 (Cấp bảo vệ IP55, IP65)',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Gia công đột lỗ mặt tủ cho nút bấm, đồng hồ đo đếm theo yêu cầu',
      'Bản lề tháo lắp nhanh, góc mở cánh lên đến 130 độ',
      'Tấm gá đáy tháo rời thuận tiện luồn dây cáp nguồn',
      'Nhận sản xuất đơn chiếc và số lượng lớn theo hồ sơ thiết kế'
    ],
    image: ELECTRICAL_CABINET_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'tu-dien',
    slug: 'tu-dien',
    name: 'Hệ Tủ Điện Phân Phối & Điều Khiển APEX (Tổng Quan)',
    category: 'tu-dien',
    categoryName: 'Tủ điện',
    fireRating: 'IP43 - IP65',
    description: 'Vỏ tủ điện hạ thế, tủ MSB, DB và tủ điều khiển bơm PCCC gia công CNC chính xác từ thép cán nguội mạ kẽm, sơn tĩnh điện chất lượng cao.',
    longDescription: 'Hệ thống tủ điện công nghiệp APEX được thiết kế đáp ứng các yêu cầu khắt khe của trạm biến áp, phòng kỹ thuật điện và hệ thống bơm chữa cháy trong các công trình cao tầng và nhà máy công nghiệp. Độ hoàn thiện cơ khí cao, khung vỏ vững chắc bảo vệ an toàn cho thiết bị đóng cắt và hệ thống điều khiển tự động.',
    specs: {
      material: 'Thép cán nguội mạ kẽm độ dày 1.5mm - 2.5mm gia công CNC',
      thickness: 'Kích thước thiết kế theo yêu cầu sơ đồ nguyên lý dự án',
      insulation: 'Cách điện thanh cái và khoang thiết bị theo tiêu chuẩn IEC',
      finish: 'Sơn tĩnh điện bột Jotun màu ghi sáng RAL 7035 / màu đỏ PCCC',
      standard: 'IEC 61439, TCVN 7997',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Gia công đột dập và chấn gấp trên dây chuyền CNC chính xác',
      'Hệ thanh gá thiết bị điều chỉnh linh hoạt theo kích thước khí cụ',
      'Cấp bảo vệ kín nước, kín bụi IP43 đến IP65 theo môi trường lắp đặt',
      'Đáp ứng tiến độ cung ứng nhanh chóng cho các dự án cơ điện M&E'
    ],
    image: ELECTRICAL_CABINET_IMAGE,
    priceEstimate: 'Liên hệ'
  },

  // ==========================================
  // NHÓM 6: THANG MÁNG CÁP ĐIỆN (Hạ Tầng Dây Dẫn)
  // ==========================================
  {
    id: 'mang-cap-trunking-son-tinh-dien',
    slug: 'mang-cap-trunking-son-tinh-dien',
    name: 'Máng Cáp Điện (Cable Trunking) Sơn Tĩnh Điện Kèm Nắp',
    category: 'thang-mang-cap',
    categoryName: 'Thang máng cáp',
    fireRating: 'Chống va đập cơ học',
    description: 'Máng cáp kín có nắp đậy bảo vệ đường cáp điện lực và tín hiệu PCCC khỏi va đập cơ học, bụi bẩn và côn trùng trong các tòa nhà cao tầng và tầng hầm.',
    longDescription: 'Máng cáp điện Trunking APEX chấn mép chữ C tăng cứng chống võng khi chịu tải trọng cáp lớn. Bề mặt sơn tĩnh điện láng mịn không bavia sắc nhọn, bảo vệ an toàn tuyệt đối cho lớp vỏ bọc cách điện của cáp điện trong suốt quá trình kéo rải dây.',
    specs: {
      material: 'Thép mạ kẽm cán nguội tiêu chuẩn JIS G3141',
      thickness: 'Độ dày thép 1.0mm, 1.2mm, 1.5mm, 2.0mm',
      insulation: 'Quy cách bề rộng W50mm - W800mm, chiều cao H50mm - H200mm',
      finish: 'Sơn tĩnh điện sần hoặc bóng màu ghi sáng / cam / xanh',
      standard: 'TCVN 10688, NEMA VE 1',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Mép gấp an toàn không làm trầy xước vỏ cáp khi kéo rải',
      'Nắp đậy cài ngàm chắc chắn hoặc bắt vít tiện tháo lắp',
      'Đục sẵn lỗ nối tiếp địa và lỗ liên kết phụ kiện tiêu chuẩn',
      'Chiều dài tiêu chuẩn 2.500mm hoặc 3.000mm/cây thuận tiện thi công'
    ],
    image: CABLE_TRAY_IMAGE,
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'thang-cap-cable-ladder-ma-kem',
    slug: 'thang-cap-cable-ladder-ma-kem',
    name: 'Thang Cáp Điện (Cable Ladder) Mạ Kẽm Nhúng Nóng',
    category: 'thang-mang-cap',
    categoryName: 'Thang máng cáp',
    fireRating: 'Chịu tải trọng nặng',
    description: 'Thang cáp thông thoáng tải trọng lớn mạ kẽm nhúng nóng, tối ưu cho trục đứng riser tòa nhà cao tầng, trạm biến áp và nhà máy công nghiệp ngoài trời.',
    longDescription: 'Thang cáp Cable Ladder APEX gồm 2 thanh dọc chịu lực liên kết với các thanh ngang tay thang đột lỗ đai siết cáp. Cấu trúc mở giúp tản nhiệt tự nhiên tối đa cho các tuyến cáp điện lực hạ thế và trung thế tải dòng điện lớn, giảm thiểu nguy cơ quá nhiệt gây chập cháy.',
    specs: {
      material: 'Thép tấm cường độ cao mạ kẽm nhúng nóng bề mặt',
      thickness: 'Độ dày thép 1.5mm, 2.0mm, 2.5mm',
      insulation: 'Lớp mạ kẽm nhúng nóng dày > 65 micron theo tiêu chuẩn ASTM A123',
      finish: 'Mạ kẽm nhúng nóng chống ăn mòn muối biển và hóa chất',
      standard: 'ASTM A123, TCVN 10688 (NEMA VE 1)',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Chống ăn mòn rỉ sét vượt trội trong môi trường dã ngoại và ven biển',
      'Khả năng chịu tải trọng dây cáp điện nặng không bị cong vênh',
      'Thanh ngang đột lỗ oval thuận tiện cố định dây bằng đai rút Inox',
      'Phụ kiện nối, ngã ba, co L mạ kẽm đồng bộ khớp nối vững chắc'
    ],
    image: CABLE_TRAY_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'khay-cap-perforated-tray-phu-kien',
    slug: 'khay-cap-perforated-tray-phu-kien',
    name: 'Khay Cáp Đột Lỗ Perforated Tray & Phụ Kiện Đồng Bộ',
    category: 'thang-mang-cap',
    categoryName: 'Thang máng cáp',
    fireRating: 'Thoát nhiệt tối ưu',
    description: 'Khay cáp đục lỗ thoát nhiệt tối ưu kèm phụ kiện co, tê, thập, nối giảm gia công đột dập chính xác trên dây chuyền CNC phục vụ hệ thống điện nhẹ và PCCC.',
    longDescription: 'Khay cáp APEX là sự kết hợp ưu điểm của máng cáp và thang cáp: vừa bảo vệ tuyến cáp khỏi rơi tuột, vừa có các lỗ đột dập thoát nhiệt và thoát nước đọng. Phụ kiện co cút bo tròn góc uốn mềm mại bảo vệ bán kính uốn cong tiêu chuẩn của dây cáp tín hiệu.',
    specs: {
      material: 'Tôn tráng kẽm hoặc thép tấm cán nguội sơn tĩnh điện',
      thickness: 'Độ dày 1.2mm - 2.0mm gia công CNC liên tục',
      insulation: 'Lỗ đột đáy quy cách tiêu chuẩn tản nhiệt và thoát nước',
      finish: 'Tôn kẽm hoa hoặc sơn tĩnh điện theo mã màu dự án',
      standard: 'TCVN 10688, NEMA VE 1',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Lỗ đột đáy giúp tản nhiệt đường dây và dễ dàng bắt dây đai',
      'Góc lượn phụ kiện bo tròn chuẩn bán kính uốn cong cáp quang và cáp mạng',
      'Hệ phụ kiện nối âm dương lắp đặt nhanh tiết kiệm chi phí nhân công',
      'Sản xuất số lượng lớn đáp ứng tiến độ gấp của nhà thầu cơ điện'
    ],
    image: CABLE_TRAY_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'thang-mang-cap',
    slug: 'thang-mang-cap',
    name: 'Hệ Thang Máng Cáp Điện APEX (Tổng Quan)',
    category: 'thang-mang-cap',
    categoryName: 'Thang máng cáp',
    fireRating: 'Tiêu chuẩn NEMA VE 1',
    description: 'Hệ thống thang cáp, máng cáp và khay cáp APEX đột dập CNC chính xác, chịu tải trọng lớn, bảo vệ đường dây dẫn điện và cáp tín hiệu PCCC an toàn.',
    longDescription: 'Thang máng cáp APEX là giải pháp quản lý hạ tầng dây dẫn điện lực, dây điều khiển và cáp tín hiệu PCCC trong các công trình hiện đại. Sản phẩm được sản xuất trên dây chuyền cơ khí tự động với đa dạng vật liệu (sơn tĩnh điện, mạ kẽm nhúng nóng), mép uốn an toàn không làm trầy xước vỏ cáp, phụ kiện đồng bộ dễ dàng thi công lắp đặt.',
    specs: {
      material: 'Thép mạ kẽm, tôn tráng kẽm hoặc Inox 304 độ dày 1.2mm - 2.5mm',
      thickness: 'Chiều dài tiêu chuẩn 2.500 mm - 3.000 mm / cây kèm nắp đậy',
      insulation: 'Máng cáp (Trunking), Thang cáp (Cable Ladder), Khay cáp (Tray)',
      finish: 'Sơn tĩnh điện hoặc mạ kẽm nhúng nóng theo môi trường sử dụng',
      standard: 'TCVN 10688 (NEMA VE 1)',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Gia cường gân tăng cứng, chịu tải trọng cáp điện lớn',
      'Mép gấp chữ C chống võng và bảo vệ an toàn cho vỏ bọc cáp',
      'Hệ phụ kiện cút nối, tê, chữ thập, co lên co xuống đồng bộ',
      'Sản xuất theo kích thước và quy cách yêu cầu của bản vẽ cơ điện'
    ],
    image: CABLE_TRAY_IMAGE,
    priceEstimate: 'Liên hệ'
  },

  // ==========================================
  // NHÓM 7: TỦ RACK MẠNG & SERVER (CNTT & Viễn Thông)
  // ==========================================
  {
    id: 'tu-server-rack-19-inch-42u',
    slug: 'tu-server-rack-19-inch-42u',
    name: 'Tủ Server Rack 19 Inch 42U Data Center (D1000 - D1200)',
    category: 'tu-rack',
    categoryName: 'Tủ rack',
    fireRating: 'Tải trọng 1.000kg',
    description: 'Tủ mạng 42U chuẩn EIA-310-D độ sâu D1000/D1200, tải trọng chịu lực 1.000kg, cửa lưới thông thoáng >70% chuyên dụng cho phòng máy chủ và trung tâm dữ liệu.',
    longDescription: 'Tủ Server Rack 42U APEX phục vụ lắp đặt máy chủ chuyên dụng, hệ thống SAN lưu trữ và switch mạng lõi. Khung hàn liền hoặc tháo lắp chịu lực cao từ thép SPCC dày 2.0mm, cột gắn thiết bị đánh số U rõ ràng 2 mặt, tích hợp thanh quản lý cáp dọc và thanh phân phối nguồn PDU.',
    specs: {
      material: 'Thép cán nguội SPCC chất lượng cao dày 1.5mm - 2.0mm',
      thickness: 'Kích thước H2050 x W600/800 x D1000/D1200 mm',
      insulation: 'Tải trọng chịu lực tĩnh lên đến 1.000 kg',
      finish: 'Sơn tĩnh điện màu đen cát sần chống trầy xước cao cấp',
      standard: 'Chuẩn 19 inch EIA-310-D, IEC 60297',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Cửa trước và sau đột lưới tổ ong thông thoáng đối lưu khí trên 70%',
      'Cột gá thiết bị đánh số U dập nổi, điều chỉnh độ sâu linh hoạt',
      'Khóa tay gạt xoay đa điểm an toàn cho cả cửa trước và cửa sau',
      'Trang bị sẵn cụm 4 quạt tản nhiệt nóc tủ và bánh xe chịu lực có hãm'
    ],
    image: SERVER_RACK_IMAGE,
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'tu-mang-treo-tuong-6u-12u',
    slug: 'tu-mang-treo-tuong-6u-12u',
    name: 'Tủ Mạng Treo Tường 6U - 12U Tiết Kiệm Không Gian',
    category: 'tu-rack',
    categoryName: 'Tủ rack',
    fireRating: 'EIA-310-D',
    description: 'Tủ rack nhỏ gọn gắn tường độ sâu D400/D600 cho switch mạng tầng, đầu ghi camera CCTV và hộp đấu dây viễn thông văn phòng gọn gàng, an toàn.',
    longDescription: 'Tủ mạng treo tường Wall Mount Rack APEX thiết kế thông minh với cánh cửa mở linh hoạt, cửa trước mica trong suốt hoặc cửa lưới thông gió. Tải trọng treo tường 60kg vững chắc, bố trí lỗ khoét nóc đáy có nẹp nhựa luồn cáp chống cọ xát dây.',
    specs: {
      material: 'Thép cán nguội SPCC dày 1.0mm - 1.5mm',
      thickness: 'Chiều cao 6U, 9U, 12U; Độ sâu D400, D500, D600 mm',
      insulation: 'Tải trọng treo tường an toàn 50kg - 80kg',
      finish: 'Sơn tĩnh điện màu đen cát hoặc màu ghi sáng RAL 7035',
      standard: 'Chuẩn 19 inch EIA-310-D',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Thiết kế gắn tường gọn gàng, tiết kiệm tối đa diện tích sàn',
      'Cửa trước có khóa an toàn chống can thiệp trái phép thiết bị',
      'Cửa hông tháo lắp nhanh thuận tiện đấu nối và kiểm tra cáp',
      'Tặng kèm 01 quạt tản nhiệt và thanh nguồn đa năng 3 chấu'
    ],
    image: SERVER_RACK_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'tu-rack-outdoor-vien-thong',
    slug: 'tu-rack-outdoor-vien-thong',
    name: 'Tủ Rack Viễn Thông Dã Ngoại Chống Nước IP55',
    category: 'tu-rack',
    categoryName: 'Tủ rack',
    fireRating: 'Cấp bảo vệ IP55',
    description: 'Tủ rack ngoài trời vỏ 2 lớp cách nhiệt tích hợp quạt hút bụi và khóa 3 điểm an toàn chống cạy phá, bảo vệ thiết bị mạng và truyền dẫn ngoài trời.',
    longDescription: 'Tủ rack viễn thông outdoor APEX phục vụ lắp đặt thiết bị mạng dã ngoại, camera giao thông và trạm phát sóng di động. Vỏ hai lớp tạo khoảng lưu thông khí giảm hấp thụ nhiệt mặt trời, gioăng cao su xốp kín khít chống nước mưa xâm nhập theo chuẩn IP55.',
    specs: {
      material: 'Thép mạ kẽm hoặc Inox 304 kết cấu 2 lớp chống nóng',
      thickness: 'Kích thước thiết kế từ 15U đến 32U theo cấu hình trạm',
      insulation: 'Lớp đệm xốp cách nhiệt và khe thông gió có lưới lọc bụi mịn',
      finish: 'Sơn tĩnh điện ngoài trời chuyên dụng chống tia cực tím UV',
      standard: 'IEC 60529 (IP55), EIA-310-D',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Cấp bảo vệ IP55 chống bụi xâm nhập và vòi phun nước từ mọi hướng',
      'Hệ thống quạt hút thông gió tự động kích hoạt theo cảm biến nhiệt độ',
      'Khóa tay gạt 3 điểm chống cạy phá bảo mật cao cho khu vực công cộng',
      'Đế bệ chân tủ vững chắc thuận tiện bắt bu lông neo móng bê tông'
    ],
    image: SERVER_RACK_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'tu-rack',
    slug: 'tu-rack',
    name: 'Hệ Tủ Rack Mạng & Viễn Thông APEX (Tổng Quan)',
    category: 'tu-rack',
    categoryName: 'Tủ rack',
    fireRating: 'Chuẩn EIA-310-D',
    description: 'Tủ mạng, tủ server rack APEX chuẩn 19 inch đa dạng kích thước (6U - 42U), tải trọng cao, thông gió tối ưu và bảo vệ an toàn cho thiết bị viễn thông.',
    longDescription: 'Tủ rack APEX phục vụ lắp đặt máy chủ, thiết bị mạng, switch, tổng đài và hệ thống ghi hình giám sát PCCC. Thiết kế theo tiêu chuẩn công nghiệp quốc tế 19 inch với kết cấu tháo lắp linh hoạt, cửa lưới đột lỗ thông thoáng tăng hiệu quả làm mát, ray trượt đánh số U rõ ràng thuận tiện cho việc đấu nối và bảo trì hạ tầng CNTT.',
    specs: {
      material: 'Thép cán nguội SPCC chất lượng cao, khung hàn liền hoặc lắp ghép',
      thickness: 'Độ sâu D600, D800, D1000, D1200 mm; Chiều cao 6U đến 42U',
      insulation: 'Tải trọng chịu lực lên tới 800 kg - 1.000 kg đối với tủ đứng',
      finish: 'Sơn tĩnh điện màu đen cát hoặc ghi sáng chống trầy xước',
      standard: 'Chuẩn 19 inch EIA-310-D, IEC 60297',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Cửa trước đột lưới tổ ong dạng lục giác đạt độ thông thoáng trên 70%',
      'Cột gắn thiết bị đánh số U rõ ràng, điều chỉnh chiều sâu linh hoạt',
      'Tích hợp quạt tản nhiệt, thanh nguồn PDU và bánh xe chịu tải',
      'Khóa tay gạt an toàn, bảo vệ chống can thiệp trái phép'
    ],
    image: SERVER_RACK_IMAGE,
    priceEstimate: 'Liên hệ'
  },

  // ==========================================
  // NHÓM 8: NHÀ TRẠM SHELTER VIỄN THÔNG (Module Dã Ngoại)
  // ==========================================
  {
    id: 'nha-tram-shelter-bts-panel',
    slug: 'nha-tram-shelter-bts-panel',
    name: 'Nhà Trạm Shelter Viễn Thông Panel Sandwich Trạm BTS',
    category: 'nha-tram-shelter',
    categoryName: 'Nhà trạm Shelter',
    fireRating: 'Panel chống cháy B2/B1',
    description: 'Module nhà trạm lắp ghép panel cách nhiệt PU/EPS chống thấm dột tuyệt đối, giữ nhiệt độ ổn định cho thiết bị viễn thông BTS trên nóc nhà và mặt đất.',
    longDescription: 'Nhà trạm Shelter viễn thông APEX giải quyết bài toán thi công trạm thu phát sóng nhanh chóng tại các vị trí phức tạp như nóc nhà phố, đồi núi. Kết cấu khung thép mạ kẽm định hình vững chắc kết hợp vách panel sandwich cách nhiệt dày 75mm - 100mm, sàn chống tĩnh điện và hệ thống chiếu sáng, báo cháy tích hợp sẵn.',
    specs: {
      material: 'Khung thép mạ kẽm liên kết bu lông + Vách Panel Polyurethane (PU)',
      thickness: 'Kích thước trạm 2.5m x 3.0m x 2.8m hoặc theo yêu cầu nhà mạng',
      insulation: 'Lõi xốp PU tỷ trọng 40 - 42kg/m³ hệ số dẫn nhiệt cực thấp',
      finish: 'Tôn mạ màu chống ăn mòn dã ngoại dày 0.5mm 2 mặt',
      standard: 'Tiêu chuẩn viễn thông TCVN / ITU-T',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Thời gian lắp dựng siêu nhanh chỉ trong 1 - 2 ngày tại hiện trường',
      'Khả năng cách nhiệt và cách âm vượt trội giúp tiết kiệm 40% điện điều hòa',
      'Cửa thoát hiểm có gioăng cao su kín khít và khóa bảo mật chống đột nhập',
      'Trang bị sẵn ống luồn cáp Feeder và hệ thống tiếp địa chống sét toàn trạm'
    ],
    image: TELECOM_SHELTER_IMAGE,
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'nha-tram-shelter-da-ngoai-chong-bao',
    slug: 'nha-tram-shelter-da-ngoai-chong-bao',
    name: 'Nhà Trạm Shelter Dã Ngoại Chống Bão Cấp 12 & Ăn Mòn',
    category: 'nha-tram-shelter',
    categoryName: 'Nhà trạm Shelter',
    fireRating: 'Chịu bão cấp 12',
    description: 'Kết cấu khung thép hình mạ kẽm nhúng nóng, vỏ tôn mạ màu chịu gió bão cấp 12 cho vùng biển đảo và khu vực thời tiết khắc nghiệt.',
    longDescription: 'Nhà trạm shelter chống bão dã ngoại APEX được tính toán kết cấu chịu lực gió giật đến 160km/h. Toàn bộ cấu kiện thép được mạ kẽm nhúng nóng dày trên 80 micron kháng hơi muối biển, đảm bảo hoạt động bền bỉ trên 20 năm tại các vùng hải đảo.',
    specs: {
      material: 'Khung dầm thép hình chữ I, chữ U mạ kẽm nhúng nóng ASTM A123',
      thickness: 'Panel vách sandwich PIR chống cháy dày 100mm',
      insulation: 'Lõi PIR chống cháy lan đạt tiêu chuẩn an toàn PCCC cao',
      finish: 'Sơn phủ bảo vệ kháng muối biển và hóa chất dã ngoại',
      standard: 'TCVN 2737 (Tải trọng gió bão), ASTM A123',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Chịu được sức gió bão giật cấp 12 - 14 mà không bị biến dạng',
      'Chống ăn mòn muối mặn tối ưu cho bờ biển và hải đảo',
      'Mái dốc thoát nước mưa nhanh chống đọng nước cục bộ',
      'Lối vào có bậc thang chống trượt và mái che cửa chống hắt mưa'
    ],
    image: TELECOM_SHELTER_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'module-phong-may-di-dong',
    slug: 'module-phong-may-di-dong',
    name: 'Module Phòng Máy Kỹ Thuật Viễn Thông Ghép Khối',
    category: 'nha-tram-shelter',
    categoryName: 'Nhà trạm Shelter',
    fireRating: 'Ghép khối module',
    description: 'Giải pháp phòng thiết bị container lắp ghép sẵn hoàn thiện đường điện, chiếu sáng và điều hòa không khí, cẩu đặt vận hành ngay tại chân công trình.',
    longDescription: 'Module phòng máy di động APEX được sản xuất hoàn thiện 100% tại nhà máy bao gồm hệ thống điện hạ thế, máy lạnh luân phiên, tủ phân phối nguồn và giá đỡ cáp. Khi vận chuyển đến công trường chỉ cần cẩu đặt vào vị trí bệ móng và đấu nối nguồn điện lưới.',
    specs: {
      material: 'Kết cấu vỏ container module chịu lực cẩu móc 4 góc',
      thickness: 'Kích thước tiêu chuẩn 10ft, 20ft hoặc module ghép đôi',
      insulation: 'Cách nhiệt bông khoáng tỷ trọng cao chống cháy',
      finish: 'Sơn epoxy hàng hải chịu môi trường khắc nghiệt',
      standard: 'ISO Container, TCVN',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Hoàn thiện toàn bộ hệ thống cơ điện lạnh trước khi xuất xưởng',
      'Dễ dàng di dời đến vị trí mới khi thay đổi quy hoạch trạm',
      'Tích hợp cảm biến báo nhiệt, báo khói và cảnh báo ngập nước từ xa',
      'Khóa cửa vân tay và mã số bảo mật tuyệt đối'
    ],
    image: TELECOM_SHELTER_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'nha-tram-shelter',
    slug: 'nha-tram-shelter',
    name: 'Hệ Nhà Trạm Viễn Thông Shelter APEX (Tổng Quan)',
    category: 'nha-tram-shelter',
    categoryName: 'Nhà trạm Shelter',
    fireRating: 'Cách nhiệt PU/PIR',
    description: 'Nhà trạm viễn thông Shelter tích hợp APEX cấu trúc module panel sandwich cách âm cách nhiệt chuyên dụng, bảo vệ an toàn cho thiết bị phát sóng BTS.',
    longDescription: 'Nhà trạm viễn thông Shelter tích hợp APEX cấu trúc module panel sandwich cách âm cách nhiệt chuyên dụng, chống nước mưa và chịu được điều kiện thời tiết dã ngoại khắc nghiệt. Sản phẩm tối ưu cho các trạm viễn thông BTS, trạm trung chuyển dữ liệu và trung tâm điều hành quan trắc kỹ thuật.',
    specs: {
      material: 'Panel Sandwich tôn mạ kẽm bọc lõi xốp Polyurethane (PU) cách nhiệt',
      thickness: 'Độ dày panel 50mm - 100mm, kết cấu khung thép lắp ghép modul',
      insulation: 'Khả năng giữ nhiệt độ khoang máy ổn định, giảm tiêu thụ điện điều hòa',
      finish: 'Tôn mạ màu chống oxy hóa bề mặt màu trắng sữa hoặc ghi sáng',
      standard: 'Tiêu chuẩn trạm viễn thông BTS dã ngoại',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Thi công lắp đặt nhanh chóng tại địa hình đồi núi hiểm trở và mái nhà cao tầng',
      'Độ kín khít cao ngăn nước, bụi mịn và côn trùng xâm nhập',
      'Khung thép liên kết bu lông mạ kẽm chịu gió bão lớn',
      'Tích hợp sẵn hệ thống điện chiếu sáng, lỗ luồn cáp feeder và tiếp địa chống sét'
    ],
    image: TELECOM_SHELTER_IMAGE,
    priceEstimate: 'Liên hệ'
  },

  // ==========================================
  // NHÓM 9: TỦ NGUỒN OUTDOOR NGOÀI TRỜI (Nguồn Ngoài Trời)
  // ==========================================
  {
    id: 'tu-nguon-outdoor-ip55-ip65',
    slug: 'tu-nguon-outdoor-ip55-ip65',
    name: 'Tủ Nguồn Outdoor 2 Lớp Vỏ Cách Nhiệt IP55 / IP65',
    category: 'tu-nguon-outdoor',
    categoryName: 'Tủ nguồn Outdoor',
    fireRating: 'IP55 / IP65',
    description: 'Vỏ tủ nguồn ngoài trời 2 lớp tạo khoảng lưu thông khí tản nhiệt tự nhiên, cấp bảo vệ IP55/IP65 chống nước bụi xâm nhập, bảo vệ bộ chỉnh lưu Rectifier.',
    longDescription: 'Tủ nguồn ngoài trời APEX được thiết kế chuyên biệt để hoạt động liên tục 24/7 dưới thời tiết nắng nóng nhiệt đới. Cấu trúc vỏ kép 2 lớp thép tạo khoảng đệm không khí đối lưu, làm giảm nhiệt độ bên trong tủ tới 10°C so với vỏ 1 lớp thông thường, kéo dài tuổi thọ của ắc quy và linh kiện điện tử.',
    specs: {
      material: 'Thép mạ kẽm hoặc Inox 304 độ dày 1.5mm - 2.0mm',
      thickness: 'Kích thước tủ H1400 x W750 x D750 mm (hoặc tùy biến theo dự án)',
      insulation: 'Vỏ kép 2 lớp cách nhiệt đối lưu khí tự nhiên + gioăng EPDM',
      finish: 'Sơn tĩnh điện ngoài trời chuyên dụng Jotun UV-Resistant',
      standard: 'IEC 60529 (IP55, IP65)',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Khả năng chống nước mưa tạt và bụi bẩn xâm nhập tuyệt đối IP55/IP65',
      'Giảm bức xạ nhiệt mặt trời bảo vệ bình ắc quy dự phòng',
      'Khóa 3 điểm chìm chống cạy phá, tay gạt an toàn có nắp che ổ khóa',
      'Đế bệ chân tủ cao 100 - 200mm chống ngập nước cục bộ'
    ],
    image: OUTDOOR_CABINET_IMAGE,
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'tu-nguon-chinh-luu-rectifier-bts',
    slug: 'tu-nguon-chinh-luu-rectifier-bts',
    name: 'Tủ Nguồn Chỉnh Lưu Rectifier & Ắc Quy Dự Phòng BTS',
    category: 'tu-nguon-outdoor',
    categoryName: 'Tủ nguồn Outdoor',
    fireRating: 'Khoang cách ly độc lập',
    description: 'Tủ outdoor phân chia 2 khoang độc lập: khoang thiết bị nguồn điện tử và khoang ắc quy lithium/ắc quy chì, tích hợp máy lạnh mini hoặc quạt hút DC.',
    longDescription: 'Tủ nguồn chỉnh lưu BTS APEX tối ưu hóa không gian cho trạm viễn thông 4G/5G. Khoang thiết bị nguồn điện tử trang bị hệ thống thanh ray 19 inch gắn module rectifier 48VDC. Khoang ắc quy có khay chịu lực gia cường, thông gió chống tích tụ khí hydro an toàn tuyệt đối.',
    specs: {
      material: 'Thép cán nguội mạ kẽm dày 1.5 - 2.0mm gia công đột dập CNC',
      thickness: 'Khoang nguồn 19 inch 12U - 24U / Khoang ắc quy tải trọng 400kg',
      insulation: 'Vách ngăn kim loại cách ly hoàn toàn khí thải ắc quy',
      finish: 'Sơn tĩnh điện màu ghi sáng phản xạ nhiệt',
      standard: 'Tiêu chuẩn ngành viễn thông',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Cách ly hoàn toàn khí ắc quy bảo vệ linh kiện điện tử không bị oxy hóa',
      'Tùy chọn tích hợp máy làm lạnh mini ngoài trời 500W - 1500W',
      'Cảm biến nhiệt độ tự động kích hoạt quạt giải nhiệt thông minh',
      'Đèn LED chiếu sáng tự động bật sáng khi mở cửa phục vụ bảo trì ban đêm'
    ],
    image: OUTDOOR_CABINET_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'tu-thiet-bi-ngoai-troi-camera-iot',
    slug: 'tu-thiet-bi-ngoai-troi-camera-iot',
    name: 'Tủ Bảo Vệ Thiết Bị Điện Tử & Camera Giám Sát Ngoài Trời',
    category: 'tu-nguon-outdoor',
    categoryName: 'Tủ nguồn Outdoor',
    fireRating: 'Treo cột IP65',
    description: 'Tủ treo cột hoặc gắn tường chuyên dụng cho hệ thống camera giao thông, trạm quan trắc môi trường IoT và đèn chiếu sáng thông minh đô thị.',
    longDescription: 'Tủ thiết bị camera ngoài trời APEX thiết kế nhỏ gọn kèm đai siết ôm cột tròn hoặc gá chữ U gắn cột thép. Cửa trước có gioăng bọt cao su kín nước IP65, đáy tủ trang bị ốc siết cáp chống nước PG gland và quạt hút tản nhiệt có màng lọc chắn bụi.',
    specs: {
      material: 'Thép tấm sơn tĩnh điện hoặc Inox 304 dày 1.2mm - 1.5mm',
      thickness: 'Kích thước H600 x W450 x D250 mm hoặc theo thiết kế camera',
      insulation: 'Cấp bảo vệ kín nước IP65, chống bọ và hơi ẩm',
      finish: 'Sơn tĩnh điện ngoài trời màu ghi xám',
      standard: 'IEC 60529 (IP65)',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Tích hợp sẵn đai siết Inox gắn cột đèn và cột camera chắc chắn',
      'Đáy tủ có các đầu ốc siết cáp chống nước PG9, PG13.5, PG21',
      'Tấm gá thiết bị bắt thanh ray nhôm cài aptomat và switch POE',
      'Khóa tam giác hoặc khóa chìa bảo mật chống phá hoại'
    ],
    image: OUTDOOR_CABINET_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'tu-nguon-outdoor',
    slug: 'tu-nguon-outdoor',
    name: 'Hệ Tủ Nguồn Outdoor APEX (Tổng Quan)',
    category: 'tu-nguon-outdoor',
    categoryName: 'Tủ nguồn Outdoor',
    fireRating: 'IP55 / IP65',
    description: 'Tủ nguồn ngoài trời APEX bảo vệ tin cậy bộ chỉnh lưu Rectifier, ắc quy dự phòng và thiết bị điều khiển trong điều kiện thời tiết khắc nghiệt.',
    longDescription: 'Tủ nguồn ngoài trời (Outdoor Power Cabinet) APEX được thiết kế chuyên biệt để chứa bộ chỉnh lưu (Rectifier), ắc quy dự phòng (Battery) và thiết bị phân phối nguồn tại các vị trí ngoài trời khắc nghiệt. Thiết kế vỏ hai lớp tản nhiệt tự nhiên, khóa an toàn chống cạy phá đa điểm, gioăng cao su bọt biển kháng lão hóa đảm bảo thiết bị bên trong hoạt động bền bỉ 24/7.',
    specs: {
      material: 'Thép mạ kẽm hoặc Inox cấu trúc 2 lớp cách nhiệt',
      thickness: 'Kích thước thiết kế theo dung lượng nguồn và ắc quy dự phòng',
      insulation: 'Lớp đệm lưu thông khí động học giảm bức xạ nhiệt mặt trời',
      finish: 'Sơn tĩnh điện ngoài trời chuyên dụng kháng tia cực tím',
      standard: 'Cấp bảo vệ kín khít IP55 / IP65 chống nước bụi',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Khoang chứa ắc quy và khoang thiết bị điện tử độc lập an toàn',
      'Hệ thống làm mát bằng quạt hút lọc bụi hoặc máy lạnh mini ngoài trời',
      'Khóa bảo mật 3 điểm chuyên dụng chống cạy phá',
      'Cảm biến giám sát nhiệt độ và cảnh báo mở cửa kết nối từ xa'
    ],
    image: OUTDOOR_CABINET_IMAGE,
    priceEstimate: 'Liên hệ'
  }
];

export const SOLUTIONS: Solution[] = [
  {
    id: 'chung-cu-can-ho',
    title: 'Chung cư, căn hộ',
    slug: 'chung-cu-can-ho',
    icon: 'Building2',
    tagline: 'An toàn tính mạng cư dân là ưu tiên số 1',
    description: 'Hệ thống cửa chống cháy lối thoát hiểm cầu thang bộ, cửa ngăn hành lang các tầng, cửa căn hộ cách âm chống cháy và hệ thống hút khói sự cố.',
    challenges: [
      'Mật độ cư dân đông, thời gian thoát hiểm cần kiểm soát chặt chẽ',
      'Hành lang dài dễ bị tích tụ khói độc gây ngạt thở',
      'Yêu cầu thẩm mỹ cao cho cửa chính căn hộ kết hợp tính năng PCCC'
    ],
    recommendedProducts: [
      'Cửa thép ngăn cháy cho buồng thang bộ và hành lang thoát hiểm',
      'Cửa căn hộ vân gỗ cách nhiệt EI60 thẩm mỹ cao',
      'Hệ thống tay co tự đóng giữ kín khoang thang không để khói xâm nhập'
    ],
    standards: ['QCVN 06:2022/BXD Bảng 4', 'TCVN 3890:2023', 'Thông tư 149/2020/TT-BCA'],
    caseStudy: 'Hồ sơ dự án đang được cập nhật.'
  },
  {
    id: 'van-phong-toa-nha',
    title: 'Văn phòng, tòa nhà',
    slug: 'van-phong-toa-nha',
    icon: 'Building',
    tagline: 'Bảo vệ tài sản và vận hành thông suốt',
    description: 'Giải pháp cửa thép ngăn cháy buồng kỹ thuật điện, phòng máy chủ IT server, vách kính chống cháy sảnh giao dịch và cửa thoát hiểm cầu thang.',
    challenges: [
      'Tập trung nhiều thiết bị điện tử, máy chủ có nguy cơ chập cháy điện cao',
      'Phải đảm bảo luồng di chuyển thuận tiện trong giờ làm việc thông thường',
      'Yêu cầu cách âm cao cho các phòng họp và khu làm việc tập trung'
    ],
    recommendedProducts: [
      'Cửa thép ngăn cháy cho phòng điện và khu vực kỹ thuật',
      'Vách kính chống cháy EI60 trong suốt sảnh lễ tân văn phòng',
      'Khóa thoát hiểm panic bar điện từ liên động hệ thống kiểm soát ra vào Access Control'
    ],
    standards: ['TCVN 9383:2012', 'QCVN 06:2022/BXD Mục 3.2', 'TCVN 5738:2021'],
    caseStudy: 'Hồ sơ dự án đang được cập nhật.'
  },
  {
    id: 'trung-tam-thuong-mai',
    title: 'Trung tâm thương mại',
    slug: 'trung-tam-thuong-mai',
    icon: 'Store',
    tagline: 'Phân khoang ngăn cháy linh hoạt và thẩm mỹ',
    description: 'Ứng dụng rèm ngăn khói và ngăn cháy tự động cho các khoảng thông tầng lớn, cửa cuốn ngăn cháy siêu trường cho lối đi siêu thị và hầm để xe.',
    challenges: [
      'Diện tích mặt sàn cực lớn, khó ngăn chia bằng tường cố định',
      'Lượng khách tham quan đông đúc, đa dạng lứa tuổi cần lối thoát nhanh',
      'Cần tích hợp âm trần để không che chắn biển hiệu các gian hàng thời trang'
    ],
    recommendedProducts: [
      'Rèm hoặc cửa cuốn ngăn cháy cho khoảng mở và không gian thông tầng',
      'Cửa cuốn ngăn cháy nhịp lớn EI120 phân chia khoang gian hàng',
      'Cửa thép 2 cánh thoát hiểm bản rộng thoát nạn số đông'
    ],
    standards: ['QCVN 06:2022/BXD Mục 4.14', 'NFPA 80', 'BS EN 1634-1'],
    caseStudy: 'Hồ sơ dự án đang được cập nhật.'
  },
  {
    id: 'nha-xuong-khu-cong-nghiep',
    title: 'Nhà xưởng, khu công nghiệp',
    slug: 'nha-xuong-khu-cong-nghiep',
    icon: 'Factory',
    tagline: 'Chịu lực bền bỉ trong môi trường công nghiệp nặng',
    description: 'Cửa cuốn chống cháy khổ rộng xe container di chuyển, cửa thép phòng hóa chất nguy hiểm, cửa chống cháy chịu áp lực gió và môi trường bụi bẩn.',
    challenges: [
      'Chứa nguyên vật liệu dễ cháy (hóa chất, bao bì, gỗ, điện tử)',
      'Xe nâng di chuyển liên tục cần kích thước cửa rộng và độ bền cơ học cao',
      'Môi trường có độ ẩm, bụi kim loại hoặc hóa chất ăn mòn'
    ],
    recommendedProducts: [
      'Cửa cuốn ngăn cháy cho các khoảng mở lớn trong nhà xưởng',
      'Cửa thép bọc chì hoặc inox 304 kháng hóa chất',
      'Cửa chống cháy tự đóng liên kết rơ-le nhiệt khi nguồn điện bị cắt'
    ],
    standards: ['QCVN 06:2022/BXD', 'TCVN 2622:1995', 'FM Global Standards'],
    caseStudy: 'Hồ sơ dự án đang được cập nhật.'
  },
  {
    id: 'benh-vien-truong-hoc',
    title: 'Bệnh viện, trường học',
    slug: 'benh-vien-truong-hoc',
    icon: 'School',
    tagline: 'Bảo vệ an toàn cho đối tượng dễ bị tổn thương',
    description: 'Cửa chống cháy mở nhẹ nhàng phù hợp cáng cứu thương di chuyển, gioăng cao su triệt tiêu khói độc bảo vệ bệnh nhân và trẻ nhỏ.',
    challenges: [
      'Nhiều bệnh nhân hạn chế khả năng tự di chuyển cần xe đẩy/cáng',
      'Khói độc là nguyên nhân gây tử vong hàng đầu trong đám cháy bệnh viện',
      'Cần độ êm ái khi đóng mở để duy trì sự yên tĩnh cho khu điều trị'
    ],
    recommendedProducts: [
      'Cửa ngăn cháy có cấu hình mở phù hợp xe đẩy và luồng thoát nạn',
      'Bản lề tự đóng êm và gioăng cản khói kín khí 100%',
      'Cửa trượt tự động ngăn khói phòng mổ áp lực dương'
    ],
    standards: ['TCVN 4470:2012', 'QCVN 06:2022/BXD', 'TCVN 9383:2012'],
    caseStudy: 'Hồ sơ dự án đang được cập nhật.'
  },
  {
    id: 'khach-san-resort',
    title: 'Khách sạn, resort',
    slug: 'khach-san-resort',
    icon: 'Hotel',
    tagline: 'Đẳng cấp 5 sao đi đôi cùng an toàn tính mạng',
    description: 'Cửa phòng khách sạn vân gỗ sang trọng chống cháy EI60, cách âm 40dB, cửa thoát hiểm sảnh tiệc và hệ thống rèm ngăn khói nhà hàng.',
    challenges: [
      'Khách lưu trú không quen thuộc địa hình tòa nhà khi có chuông báo cháy',
      'Đòi hỏi tính thẩm mỹ sang trọng, hài hòa với nội thất cao cấp',
      'Yêu cầu cách âm cao để tránh tiếng ồn từ hành lang'
    ],
    recommendedProducts: [
      'Cửa thép ngăn cháy với màu hoàn thiện phù hợp thiết kế nội thất',
      'Khóa thông minh khách sạn tích hợp chức năng mở nhanh khẩn cấp',
      'Cửa thoát nạn sảnh tiệc hội nghị vách kính chịu nhiệt'
    ],
    standards: ['TCVN 4391:2015', 'QCVN 06:2022/BXD', 'TCVN 9383:2012'],
    caseStudy: 'Hồ sơ dự án đang được cập nhật.'
  }
];

const PROJECT_SAMPLES: Project[] = [
  {
    id: 'the-peak-midtown',
    title: 'Khu căn hộ cao cấp The Peak',
    category: 'residential',
    categoryLabel: 'Chung cư cao cấp',
    location: 'Quận 7, TP. Hồ Chí Minh',
    scale: '2 tòa tháp 30 tầng - 980 căn hộ',
    itemsSupplied: 'Cung cấp cửa chống cháy, rèm ngăn cháy',
    year: '2026',
    image: HERO_IMAGE,
    description: 'Cung cấp và lắp đặt trọn gói 1.850 bộ cửa thép chống cháy EI90 cho buồng thang thoát hiểm, 16 bộ rèm ngăn cháy tự động giếng trời và cửa kỹ thuật điện các tầng.',
    client: 'Đơn vị Phát triển Đô thị Nam Sài Gòn'
  },
  {
    id: 'nha-may-san-xuat-cong-nghiep',
    title: 'Nhà máy sản xuất công nghiệp FDI Hải Phòng',
    category: 'industrial',
    categoryLabel: 'Nhà xưởng công nghiệp',
    location: 'KCN Deep C 2, Hải Phòng',
    scale: 'Khuôn viên 100.000 m² sàn',
    itemsSupplied: 'Cửa cuốn ngăn cháy, hệ thống PCCC',
    year: '2026',
    image: ROLLER_SHUTTER_IMAGE,
    description: 'Thi công 48 bộ cửa cuốn ngăn cháy siêu trường EI120 kích thước 8m x 6m, 120 bộ cửa thoát hiểm chống cháy có thanh đẩy panic cho toàn bộ 4 xưởng sản xuất linh kiện vi điện tử.',
    client: 'Tập đoàn Sản xuất Điện tử Quốc tế'
  },
  {
    id: 'trung-tam-thuong-mai-vincom',
    title: 'Trung tâm thương mại & Dịch vụ Đô thị',
    category: 'commercial',
    categoryLabel: 'Thương mại dịch vụ',
    location: 'Nam Từ Liêm, Hà Nội',
    scale: 'Tổng diện tích 68.000 m²',
    itemsSupplied: 'Cửa chống cháy, thang máy, tủ điện',
    year: '2026',
    image: HERO_IMAGE,
    description: 'Cung cấp giải pháp phân khoang ngăn cháy tổng thể gồm 24 bộ rèm ngăn khói thông tầng, 320 bộ cửa thép chống cháy EI120 và hệ thống cửa tầng thang máy cứu nạn chuyên dụng.',
    client: 'Tập đoàn Bất động sản & Bán lẻ Đô thị'
  },
  {
    id: 'benh-vien-da-khoa-tinh',
    title: 'Bệnh viện Đa khoa Quốc tế Miền Đông',
    category: 'healthcare',
    categoryLabel: 'Y tế & Bệnh viện',
    location: 'Thủ Dầu Một, Bình Dương',
    scale: 'Quy mô 1.000 giường bệnh',
    itemsSupplied: 'Rèm ngăn cháy, cửa chống cháy',
    year: '2026',
    image: STEEL_DOOR_IMAGE,
    description: 'Trang bị 450 bộ cửa chống cháy EI60 có ô kính cách nhiệt chuyên dụng phòng mổ, kho dược, buồng cấp cứu và phân luồng thoát hiểm khẩn cấp theo tiêu chuẩn an toàn y tế quốc tế.',
    client: 'Ban Quản lý Dự án Y tế'
  }
];

export const PROJECTS: Project[] = PROJECT_SAMPLES;

export const TECHNICAL_DOCS: TechnicalDoc[] = [
  {
    id: 'kiem-dinh-cua-thep-ei70-1-canh-1803',
    title: 'Cửa thép ngăn cháy 1 cánh EI70',
    code: '1803/KD-PCCC-P7',
    category: 'certificate',
    categoryLabel: 'Giấy chứng nhận kiểm định',
    updatedDate: '15/05/2023',
    description: 'Hồ sơ kiểm định mẫu cửa thép bản lề mở một phía, có cấu hình khóa thoát hiểm, khóa tay gạt và tay co thủy lực.',
    productGroup: 'steel-door',
    standard: 'Hồ sơ kiểm định phương tiện PCCC',
    sourceOwner: 'Công ty TNHH Điện - Điện tử 3C',
    documentType: 'Chứng nhận kiểm định',
    scope: 'Mã 3C-EI70-1C, mẫu 1 cánh, giới hạn chịu lửa EI70'
  },
  {
    id: 'kiem-dinh-cua-thep-ei90-1-canh-1786',
    title: 'Cửa thép ngăn cháy 1 cánh EI90',
    code: '1786/KD-PCCC-P7',
    category: 'certificate',
    categoryLabel: 'Giấy chứng nhận kiểm định',
    updatedDate: '12/05/2023',
    description: 'Hồ sơ kiểm định mẫu cửa thép 1 cánh, kích thước mẫu tổng thể 1.220 x 2.440 x 50 mm.',
    productGroup: 'steel-door',
    standard: 'Hồ sơ kiểm định phương tiện PCCC',
    sourceOwner: 'Công ty TNHH Điện - Điện tử 3C',
    documentType: 'Chứng nhận kiểm định',
    scope: 'Mã 3C-EI90-1C, mẫu 1 cánh, giới hạn chịu lửa EI90'
  },
  {
    id: 'kiem-dinh-cua-thep-ei90-2-canh-2736',
    title: 'Cửa thép ngăn cháy 2 cánh EI90',
    code: '2736/KD-PCCC-P7',
    category: 'certificate',
    categoryLabel: 'Giấy chứng nhận kiểm định',
    updatedDate: '06/07/2023',
    description: 'Hồ sơ kiểm định mẫu cửa thép 2 cánh, khung bao tham chiếu 2.300 x 2.400 mm.',
    productGroup: 'steel-door',
    standard: 'Hồ sơ kiểm định phương tiện PCCC',
    sourceOwner: 'Công ty TNHH Điện - Điện tử 3C',
    documentType: 'Chứng nhận kiểm định',
    scope: 'Mã 3C-EI90-2C, mẫu 2 cánh, giới hạn chịu lửa EI90'
  },
  {
    id: 'kiem-dinh-cua-thep-ei120-2-canh-2225',
    title: 'Cửa thép ngăn cháy 2 cánh EI120',
    code: '2225/KD-PCCC-P7',
    category: 'certificate',
    categoryLabel: 'Giấy chứng nhận kiểm định',
    updatedDate: '08/06/2023',
    description: 'Hồ sơ kiểm định mẫu cửa thép 2 cánh, kích thước mẫu tổng thể 1.800 x 2.400 x 50 mm.',
    productGroup: 'steel-door',
    standard: 'Hồ sơ kiểm định phương tiện PCCC',
    sourceOwner: 'Công ty TNHH Điện - Điện tử 3C',
    documentType: 'Chứng nhận kiểm định',
    scope: 'Mã 3C-EI120-2C, mẫu 2 cánh, giới hạn chịu lửa EI120'
  },
  {
    id: 'thu-nghiem-cua-cuon-aks-ei70-0378',
    title: 'Cửa cuốn ngăn cháy, cách nhiệt AKS - EI70',
    code: '0378-2024/TNCL',
    category: 'certificate',
    categoryLabel: 'Công bố kết quả thử nghiệm',
    updatedDate: '12/07/2024',
    description: 'Công bố kết quả thử nghiệm mẫu cụm cửa cuốn ngăn cháy, cách nhiệt mã hiệu AKS theo TCVN 9383:2012.',
    productGroup: 'roller-shutter',
    standard: 'TCVN 9383:2012',
    sourceOwner: 'Công ty TNHH Đầu tư và Phát triển ANKO Việt Nam',
    documentType: 'Kết quả thử nghiệm',
    scope: 'Mẫu AKS, giới hạn chịu lửa EI70'
  },
  {
    id: 'thu-nghiem-cua-cuon-aks-ei92-0040',
    title: 'Cửa cuốn ngăn cháy, cách nhiệt AKS - EI92',
    code: '0040-2024/TNCL-TT2',
    category: 'certificate',
    categoryLabel: 'Công bố kết quả thử nghiệm',
    updatedDate: '10/08/2024',
    description: 'Công bố kết quả thử nghiệm mẫu cụm cửa cuốn ngăn cháy, cách nhiệt mã hiệu AKS theo TCVN 9383:2012.',
    productGroup: 'roller-shutter',
    standard: 'TCVN 9383:2012',
    sourceOwner: 'Công ty TNHH Đầu tư và Phát triển ANKO Việt Nam',
    documentType: 'Kết quả thử nghiệm',
    scope: 'Mẫu AKS, giới hạn chịu lửa EI92'
  },
  {
    id: 'thu-nghiem-rem-akf-ei60-0250',
    title: 'Rèm ngăn cháy, cách nhiệt AKF - EI60',
    code: '0250-2023/TNCL',
    category: 'certificate',
    categoryLabel: 'Công bố kết quả thử nghiệm',
    updatedDate: '24/05/2023',
    description: 'Công bố kết quả thử nghiệm mẫu cụm màn cuốn ngăn cháy, cách nhiệt mã hiệu AKF theo TCVN 9383:2012.',
    productGroup: 'fire-curtain',
    standard: 'TCVN 9383:2012',
    sourceOwner: 'Công ty TNHH Đầu tư và Phát triển ANKO Việt Nam',
    documentType: 'Kết quả thử nghiệm',
    scope: 'Mẫu AKF, giới hạn chịu lửa EI60'
  },
  {
    id: 'thu-nghiem-rem-akf-ei91-0174',
    title: 'Rèm ngăn cháy, cách nhiệt AKF - EI91',
    code: '0174-2024/TNCL',
    category: 'certificate',
    categoryLabel: 'Công bố kết quả thử nghiệm',
    updatedDate: '27/03/2024',
    description: 'Công bố kết quả thử nghiệm mẫu cụm màn ngăn cháy, cách nhiệt mã hiệu AKF theo TCVN 9383:2012.',
    productGroup: 'fire-curtain',
    standard: 'TCVN 9383:2012',
    sourceOwner: 'Công ty TNHH Đầu tư và Phát triển ANKO Việt Nam',
    documentType: 'Kết quả thử nghiệm',
    scope: 'Mẫu AKF, giới hạn chịu lửa EI91'
  }
];

const NEWS_ARTICLE_SAMPLES: NewsArticle[] = [
  {
    id: 'cap-nhat-tieu-chuan-cua-chong-chay-moi-nhat-2024',
    title: 'Cập nhật tiêu chuẩn cửa chống cháy mới nhất theo QCVN 06:2022/BXD',
    date: '12/06/2026',
    author: 'Ks. Nguyễn Thành Long - Trưởng phòng Kỹ thuật APEX',
    category: 'Tiêu chuẩn & Quy chuẩn',
    summary: 'Phân tích những điểm mới quan trọng về giới hạn chịu lửa EI, tiêu chí thử nghiệm đốt mẫu thực tế và quy trình cấp tem kiểm định phương tiện PCCC theo quy định hiện hành.',
    readTime: '6 phút đọc',
    image: HERO_IMAGE,
    content: [
      'Theo QCVN 06:2022/BXD và Thông tư sửa đổi 1:2023/BXD, các yêu cầu đối với cửa chống cháy đã được siết chặt nhằm đảm bảo cả tính toàn vẹn (E) và tính cách nhiệt (I).',
      'Trước đây, nhiều đơn vị chỉ chú trọng đến khả năng không bị cháy thủng của cửa. Tuy nhiên, tiêu chí I (Insulation) yêu cầu nhiệt độ mặt không tiếp xúc với lửa không được vượt quá mức quy định (trung bình 140°C), tránh gây cháy lan các vật liệu bên trong hành lang thoát hiểm.',
      'Hồ sơ chịu lửa phải được đối chiếu theo đúng loại cửa, số cánh, kích thước và cấu hình vật liệu. APEX tư vấn lựa chọn sản phẩm trên cơ sở hồ sơ kiểm định hoặc kết quả thử nghiệm phù hợp với yêu cầu của từng công trình.'
    ]
  },
  {
    id: 'ung-dung-cua-cuon-ngan-chay-trong-nha-xuong-hien-dai',
    title: 'Ứng dụng cửa cuốn ngăn cháy trong nhà xưởng hiện đại và kho logistics',
    date: '10/06/2026',
    author: 'Kỹ sư Giải pháp Công nghiệp',
    category: 'Giải pháp thi công',
    summary: 'Giải pháp phân khoang chống cháy tối ưu diện tích sàn sản xuất, cơ chế ngắt tự động Fail-Safe an toàn tuyệt đối khi xảy ra sự cố chập cháy điện.',
    readTime: '5 phút đọc',
    image: ROLLER_SHUTTER_IMAGE,
    content: [
      'Trong các nhà máy sản xuất hiện đại và kho logistic quy mô lớn, việc ngăn chia khoang cháy bằng tường cố định thường cản trở nghiêm trọng luồng di chuyển của xe nâng và dây chuyền tự động.',
      'Cửa cuốn ngăn cháy siêu trường của APEX chính là chìa khóa tháo gỡ điểm nghẽn này. Ở trạng thái vận hành thông thường, cửa được cuộn gọn lên trần giải phóng 100% khẩu độ thông thủy.',
      'Khi xảy ra sự cố hỏa hoạn, tín hiệu từ trung tâm báo cháy sẽ kích hoạt cửa hạ xuống theo 2 giai đoạn: hạ một phần để người kịp thoát và sau đó đóng kín hoàn toàn để cô lập ngọn lửa trong suốt 120 phút.'
    ]
  },
  {
    id: 'rem-ngan-chay-giai-phap-an-toan-cho-cong-trinh-lon',
    title: 'Rèm ngăn cháy – Giải pháp an toàn kiến trúc cho công trình lớn',
    date: '08/06/2026',
    author: 'Ban Tư vấn Dự án',
    category: 'Xu hướng kiến trúc',
    summary: 'Khắc phục hoàn toàn nhược điểm cồng kềnh của cửa truyền thống, rèm ngăn cháy tự động mang lại vẻ đẹp thanh thoát cho giếng trời và trung tâm thương mại.',
    readTime: '4 phút đọc',
    image: FIRE_CURTAIN_IMAGE,
    content: [
      'Kiến trúc hiện đại luôn hướng đến không gian mở, sảnh thông tầng tràn ngập ánh sáng tự nhiên. Tuy nhiên, giếng trời lại là con đường lan truyền khói độc và ngọn lửa nhanh nhất khi xảy ra hỏa hoạn do hiệu ứng ống khói (chimney effect).',
      'Rèm ngăn khói và ngăn cháy tự động APEX được làm từ vải thủy tinh chịu nhiệt độ 1000°C cốt sợi thép không gỉ. Với hộp chứa siêu mỏng chỉ từ 18cm, rèm dễ dàng giấu kín trong trần thạch cao.',
      'Sản phẩm đạt tiêu chuẩn an toàn quốc tế BS EN 12101 và đáp ứng đầy đủ điều kiện nghiệm thu PCCC khắt khe nhất hiện nay tại các đô thị lớn.'
    ]
  }
];

export const NEWS_ARTICLES: NewsArticle[] = NEWS_ARTICLE_SAMPLES;

const PARTNER_LOGO_SAMPLES = [
  { name: 'ANKO', tag: 'Fire Resistant Doors & Curtains' },
  { name: 'MITSUBISHI ELECTRIC', tag: 'Changes for the Better' },
  { name: 'HITACHI', tag: 'Inspire the Next' },
  { name: 'LS ELECTRIC', tag: 'Futuring Smart Energy' },
  { name: 'CADIVI', tag: 'Dây Cáp Điện Hàng Đầu' }
];

export const PARTNER_LOGOS: { name: string; tag: string }[] = PARTNER_LOGO_SAMPLES;
