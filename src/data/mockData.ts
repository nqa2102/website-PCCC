import { Product, Solution, Project, TechnicalDoc, NewsArticle } from '../types';
import heroImage from '../assets/images/hero_fire_door_apex_1790648819738.webp';
import steelDoorImage from '../assets/images/product_steel_fire_door_1790648833826.webp';
import rollerShutterImage from '../assets/images/product_fire_roller_shutter_1790648844563.webp';
import fireCurtainImage from '../assets/images/product_fire_curtain_1790648858516.webp';

export const HERO_IMAGE = heroImage;
export const STEEL_DOOR_IMAGE = steelDoorImage;
export const ROLLER_SHUTTER_IMAGE = rollerShutterImage;
export const FIRE_CURTAIN_IMAGE = fireCurtainImage;

export const PRODUCTS: Product[] = [
  {
    id: 'cua-thep-ngan-chay-ei70-ei120',
    name: 'Cửa Thép Ngăn Cháy',
    category: 'steel-door',
    categoryName: 'Cửa thép ngăn cháy',
    fireRating: 'EI70-EI120',
    description: 'Giải pháp ngăn cháy, ngăn khói phổ biến với độ bền cơ học cao và chi phí hợp lý.',
    longDescription: 'Cửa thép ngăn cháy được làm từ thép kết hợp lõi vật liệu cách nhiệt như bông gốm, MGO hoặc bông thủy tinh, giúp hạn chế sự lan truyền của lửa và khói giữa các khu vực khi xảy ra hỏa hoạn.',
    specs: {
      material: 'Thép kết hợp lõi bông gốm, MGO hoặc bông thủy tinh',
      thickness: 'Kích thước tiêu chuẩn 900 x 2.200 mm; nhận sản xuất theo kích thước thực tế',
      insulation: 'Bông gốm, MGO hoặc bông thủy tinh theo cấu hình sản phẩm',
      finish: 'Màu hoàn thiện theo bảng màu Jotun',
      standard: 'EI70, EI90, EI120; kiểm định theo hồ sơ sản phẩm',
      warranty: '12 tháng'
    },
    features: [
      'Các cấu hình chịu lửa EI70, EI90 và EI120',
      'Tùy chọn khóa tay gạt, khóa thanh đẩy, ô kính và tay co',
      'Màu sắc theo bảng màu Jotun',
      'Sản xuất theo kích thước thực tế của công trình'
    ],
    image: STEEL_DOOR_IMAGE,
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'cua-kinh-ngan-chay',
    name: 'Cửa Kính Ngăn Cháy',
    category: 'glass-door',
    categoryName: 'Cửa kính ngăn cháy',
    fireRating: 'Theo cấu hình',
    description: 'Kết hợp khả năng ngăn cháy, cách nhiệt và tính thẩm mỹ, đồng thời giữ ánh sáng tự nhiên cho không gian.',
    longDescription: 'Cửa kính ngăn cháy phù hợp với các vị trí cần mở rộng tầm nhìn và lấy sáng tự nhiên nhưng vẫn phải đáp ứng yêu cầu phân khoang cháy của công trình.',
    specs: {
      material: 'Kính ngăn cháy kết hợp hệ khung theo thiết kế',
      thickness: 'Sản xuất theo kích thước khảo sát thực tế',
      insulation: 'Cấu hình kính lựa chọn theo yêu cầu chịu lửa',
      finish: 'Màu và hoàn thiện theo lựa chọn của khách hàng',
      standard: 'Áp dụng theo hồ sơ thiết kế và hồ sơ kiểm định sản phẩm',
      warranty: '12-24 tháng tùy loại sản phẩm'
    },
    features: [
      'Hỗ trợ lấy sáng tự nhiên và mở rộng tầm nhìn',
      'Phù hợp công trình yêu cầu cao về thẩm mỹ',
      'Cấu hình theo vị trí lắp đặt thực tế',
      'Tư vấn chi tiết sau khi tiếp nhận bản vẽ'
    ],
    image: STEEL_DOOR_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'cua-cuon-ngan-chay',
    name: 'Cửa Cuốn Ngăn Cháy',
    category: 'roller-shutter',
    categoryName: 'Cửa cuốn ngăn cháy',
    fireRating: 'EI70-EI92',
    description: 'Giải pháp che chắn các khoảng mở lớn mà cửa mở quay thông thường khó đáp ứng.',
    longDescription: 'Cửa cuốn ngăn cháy có khả năng che chắn các khoảng mở diện tích lớn, phù hợp nhà xưởng, kho vận và các không gian cần duy trì khẩu độ sử dụng khi vận hành bình thường.',
    specs: {
      material: 'Vật liệu và cơ cấu cuốn theo cấu hình được duyệt',
      thickness: 'Sản xuất theo kích thước khoảng mở thực tế',
      insulation: 'Lựa chọn theo yêu cầu chịu lửa của công trình',
      finish: 'Màu hoàn thiện theo lựa chọn của khách hàng',
      standard: 'TCVN 9383:2012; đối chiếu hồ sơ thử nghiệm theo cấu hình AKS',
      warranty: '12-24 tháng tùy loại sản phẩm'
    },
    features: [
      'Phù hợp các khoảng mở có diện tích lớn',
      'Giải pháp cho nhà xưởng, kho và không gian thương mại',
      'Có cấu hình tham chiếu hồ sơ thử nghiệm EI70 và EI92',
      'Tư vấn chi tiết sau khi tiếp nhận bản vẽ'
    ],
    image: ROLLER_SHUTTER_IMAGE,
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'rem-ngan-chay-ngan-khoi',
    name: 'Rèm Ngăn Cháy',
    category: 'fire-curtain',
    categoryName: 'Rèm ngăn cháy & khói',
    fireRating: 'EI60-EI91',
    description: 'Giải pháp ngăn cháy linh hoạt, trọng lượng nhẹ và có thể giấu kín trên trần khi cuộn lại.',
    longDescription: 'Rèm ngăn cháy phù hợp các không gian cần giải pháp ngăn cháy linh hoạt và ưu tiên tính thẩm mỹ. Khi cuộn lại, hệ rèm có thể được giấu trên trần để hạn chế ảnh hưởng tới kiến trúc.',
    specs: {
      material: 'Vật liệu rèm và hệ cuốn theo cấu hình được duyệt',
      thickness: 'Sản xuất theo kích thước khảo sát thực tế',
      insulation: 'Lựa chọn theo yêu cầu chịu lửa của công trình',
      finish: 'Hộp rèm và chi tiết hoàn thiện theo thiết kế',
      standard: 'TCVN 9383:2012; đối chiếu hồ sơ thử nghiệm theo cấu hình AKF',
      warranty: '12-24 tháng tùy loại sản phẩm'
    },
    features: [
      'Trọng lượng nhẹ và linh hoạt trong bố trí',
      'Có thể giấu kín trên trần khi cuộn lại',
      'Có cấu hình tham chiếu hồ sơ thử nghiệm EI60 và EI91',
      'Tư vấn chi tiết sau khi tiếp nhận bản vẽ'
    ],
    image: FIRE_CURTAIN_IMAGE,
    priceEstimate: 'Liên hệ',
    popular: true
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
    year: '2023 - 2024',
    image: HERO_IMAGE,
    description: 'Cung cấp và lắp đặt trọn gói 1.850 bộ cửa thép chống cháy EI90 cho buồng thang thoát hiểm, 16 bộ rèm ngăn cháy tự động giếng trời và cửa kỹ thuật điện các tầng.',
    client: 'Công ty TNHH Phát triển Phú Mỹ Hưng'
  },
  {
    id: 'nha-may-san-xuat-cong-nghiep',
    title: 'Nhà máy sản xuất công nghiệp Pegatron',
    category: 'industrial',
    categoryLabel: 'Nhà xưởng công nghiệp',
    location: 'KCN Deep C 2, Hải Phòng',
    scale: 'Khuôn viên 100.000 m² sàn',
    itemsSupplied: 'Cửa cuốn ngăn cháy, hệ thống PCCC',
    year: '2023',
    image: ROLLER_SHUTTER_IMAGE,
    description: 'Thi công 48 bộ cửa cuốn ngăn cháy siêu trường EI120 kích thước 8m x 6m, 120 bộ cửa thoát hiểm chống cháy có thanh đẩy panic cho toàn bộ 4 xưởng sản xuất linh kiện vi điện tử.',
    client: 'Pegatron Technology Vietnam'
  },
  {
    id: 'trung-tam-thuong-mai-vincom',
    title: 'Trung tâm thương mại Vincom Mega Mall',
    category: 'commercial',
    categoryLabel: 'Thương mại dịch vụ',
    location: 'Nam Từ Liêm, Hà Nội',
    scale: 'Tổng diện tích 68.000 m²',
    itemsSupplied: 'Cửa chống cháy, thang máy, tủ điện',
    year: '2022 - 2023',
    image: HERO_IMAGE,
    description: 'Cung cấp giải pháp phân khoang ngăn cháy tổng thể gồm 24 bộ rèm ngăn khói thông tầng, 320 bộ cửa thép chống cháy EI120 và hệ thống cửa tầng thang máy cứu nạn chuyên dụng.',
    client: 'Tập đoàn Vingroup'
  },
  {
    id: 'benh-vien-da-khoa-tinh',
    title: 'Bệnh viện Đa khoa Quốc tế Miền Đông',
    category: 'healthcare',
    categoryLabel: 'Y tế & Bệnh viện',
    location: 'Thủ Dầu Một, Bình Dương',
    scale: 'Quy mô 1.000 giường bệnh',
    itemsSupplied: 'Rèm ngăn cháy, cửa chống cháy',
    year: '2024',
    image: STEEL_DOOR_IMAGE,
    description: 'Trang bị 450 bộ cửa chống cháy EI60 có ô kính cách nhiệt chuyên dụng phòng mổ, kho dược, buồng cấp cứu và phân luồng thoát hiểm khẩn cấp theo tiêu chuẩn an toàn y tế quốc tế.',
    client: 'Sở Y tế & Ban Quản lý Dự án'
  }
];

export const PROJECTS: Project[] = [];

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
    title: 'Cập nhật tiêu chuẩn cửa chống cháy mới nhất 2024 theo QCVN 06:2022/BXD',
    date: '12/06/2024',
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
    date: '10/06/2024',
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
    date: '08/06/2024',
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

export const NEWS_ARTICLES: NewsArticle[] = [];

const PARTNER_LOGO_SAMPLES = [
  { name: '3CElectric', tag: 'Switch on your world' },
  { name: 'ANKO', tag: 'Fire Resistant Doors & Curtains' },
  { name: 'MITSUBISHI ELECTRIC', tag: 'Changes for the Better' },
  { name: 'HITACHI', tag: 'Inspire the Next' },
  { name: 'LS ELECTRIC', tag: 'Futuring Smart Energy' },
  { name: 'CADIVI', tag: 'Dây Cáp Điện Hàng Đầu' }
];

export const PARTNER_LOGOS: { name: string; tag: string }[] = [];
