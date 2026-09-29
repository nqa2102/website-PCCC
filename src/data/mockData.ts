import { Product, Solution, Project, TechnicalDoc, NewsArticle } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_fire_door_apex_1790648819738.jpg';
export const STEEL_DOOR_IMAGE = '/src/assets/images/product_steel_fire_door_1790648833826.jpg';
export const ROLLER_SHUTTER_IMAGE = '/src/assets/images/product_fire_roller_shutter_1790648844563.jpg';
export const FIRE_CURTAIN_IMAGE = '/src/assets/images/product_fire_curtain_1790648858516.jpg';
export const VINCOM_IMAGE = '/src/assets/images/project_vincom_facade_1790648869674.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'cua-thep-ngan-chay-ei60-ei120',
    name: 'Cửa Thép Ngăn Cháy',
    category: 'steel-door',
    categoryName: 'Cửa thép ngăn cháy',
    fireRating: 'EI120',
    description: 'Đa dạng mẫu mã, đạt tiêu chuẩn EI60 – EI120, phù hợp mọi công trình dân dụng và công nghiệp.',
    longDescription: 'Cửa thép ngăn cháy APEX được sản xuất trên dây chuyền dập chấn CNC tự động công nghệ Nhật Bản. Cánh cửa cấu tạo bởi 2 lớp thép mạ điện dày 1.0mm - 1.2mm, lõi cách nhiệt Magie Oxit (MgO) hoặc bông khoáng Rockwool tỷ trọng cao chống cháy và cách âm vượt trội, đạt chuẩn kiểm định theo QCVN 06:2022/BXD.',
    specs: {
      material: 'Thép mạ kẽm/mạ điện cao cấp (SECC/SGCC)',
      thickness: 'Độ dày cánh 50mm, khung bao dày 1.2 - 1.5mm',
      insulation: 'Lõi tấm MGO (Magie Oxit) tỷ trọng 350kg/m³ hoặc Bông gốm ceramic',
      finish: 'Sơn tĩnh điện bột ngoài trời Jotun/KCC kháng hóa chất, chịu nhiệt',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012, chứng nhận Cục CS PCCC & CNCH',
      warranty: 'Bảo hành chính hãng 36 tháng đối với kết cấu cơ khí, 12 tháng phụ kiện'
    },
    features: [
      'Giới hạn chịu lửa EI60, EI90, EI120 theo tiêu chuẩn kiểm định thực tế',
      'Gioăng cao su ngăn khói tự nở khi nhiệt độ vượt 150°C',
      'Tùy chọn ô kính chống cháy cách nhiệt Borosilicate chịu lửa',
      'Tích hợp tay co thủy lực Hafele, khóa thanh đẩy panic bar thoát hiểm'
    ],
    image: STEEL_DOOR_IMAGE,
    priceEstimate: 'Từ 1.850.000 đ/m²',
    popular: true
  },
  {
    id: 'cua-cuon-ngan-chay',
    name: 'Cửa Cuốn Ngăn Cháy',
    category: 'roller-shutter',
    categoryName: 'Cửa cuốn ngăn cháy',
    fireRating: 'EI120',
    description: 'Giải pháp ngăn cháy cho không gian lớn, nhà xưởng, trung tâm thương mại và hầm gửi xe.',
    longDescription: 'Hệ thống cửa cuốn chống cháy siêu trường APEX với nan thép 2 lớp cách nhiệt, tích hợp motor chống cháy chịu nhiệt 300°C và hộp điều khiển tự động đóng sập 2 cấp khi nhận tín hiệu báo cháy từ trung tâm PCCC tòa nhà.',
    specs: {
      material: 'Thép hợp kim mạ kẽm cường độ cao, nan kép dập định hình',
      thickness: 'Độ dày nan thép 1.2mm - 1.4mm, lót sợi gốm cách nhiệt',
      insulation: 'Sợi thủy tinh silicat và bông gốm chịu nhiệt 1200°C',
      finish: 'Sơn tĩnh điện chống cháy chất lượng cao chống ăn mòn',
      standard: 'QCVN 06:2022/BXD, BS EN 1634-1, TCVN 9383:2012',
      warranty: 'Bảo hành 24 tháng cho toàn bộ motor và hệ thống điều khiển'
    },
    features: [
      'Khổ rộng nhịp lớn lên tới 12m phù hợp nhà xưởng, kho bãi',
      'Cơ chế tự hạ trọng lực khi mất nguồn điện hoàn toàn',
      'Động cơ chuyên dụng PCCC với rơ-le nhiệt tự ngắt thông minh',
      'Tích hợp nút nhấn khẩn cấp 2 bên cửa và cảm biến chống kẹt'
    ],
    image: ROLLER_SHUTTER_IMAGE,
    priceEstimate: 'Từ 2.450.000 đ/m²',
    popular: true
  },
  {
    id: 'rem-ngan-chay-ngan-khoi',
    name: 'Rèm Ngăn Cháy',
    category: 'fire-curtain',
    categoryName: 'Rèm ngăn cháy & khói',
    fireRating: 'EI60',
    description: 'Ngăn lửa, ngăn khói hiệu quả, thiết kế linh hoạt âm trần thẩm mỹ cao cho sảnh và thông tầng.',
    longDescription: 'Rèm ngăn cháy tự động APEX giải quyết bài toán phân khoang ngăn cháy cho các không gian kiến trúc mở hiện đại như giếng trời, sảnh thông tầng TTTM, khu vực cầu thang cuốn. Rèm cuốn gọn gàng bên trong hộp kỹ thuật âm trần khi ở trạng thái bình thường.',
    specs: {
      material: 'Vải dệt sợi thủy tinh cốt dây inox không gỉ gia cường phủ polymer',
      thickness: 'Độ dày vải rèm 0.65mm - 1.0mm chịu nhiệt độ tới 1000°C',
      insulation: 'Vải phủ lớp ngăn bức xạ nhiệt cách nhiệt intumescent',
      finish: 'Hộp che và thanh đáy thép sơn tĩnh điện đồng màu trần',
      standard: 'BS EN 12101-1, UL 10D, QCVN 06:2022/BXD',
      warranty: 'Bảo hành 36 tháng cơ cấu thả rèm tự do Fail-Safe'
    },
    features: [
      'Thiết kế giấu trần 100% không ảnh hưởng cảnh quan kiến trúc',
      'Cơ cấu hạ tự do kiểm soát tốc độ (Gravity Fail-Safe)',
      'Hệ thống xịt nước làm mát sprinkler gia tăng thời gian chịu lửa',
      'Kết nối trực tiếp tủ trung tâm báo cháy địa chỉ'
    ],
    image: FIRE_CURTAIN_IMAGE,
    priceEstimate: 'Từ 3.100.000 đ/m²',
    popular: true
  },
  {
    id: 'thang-may-cap-tu-dien',
    name: 'Thang Máy & Cáp Tự Điện',
    category: 'accessories',
    categoryName: 'Thang máy & Cáp điện PCCC',
    fireRating: 'EI120',
    description: 'Giải pháp thang máy chữa cháy, cáp điện chống cháy FR, tủ điện đồng bộ, an toàn và hiện đại.',
    longDescription: 'Cung cấp đồng bộ cửa tầng thang máy cứu nạn chuyên dụng cho lính cứu hỏa đạt chuẩn EI120, cáp điện chịu lửa bọc vỏ LSZH ít khói không halogen và tủ điện phân phối hạ thế chuẩn IP54 đáp ứng vận hành an toàn trong sự cố hỏa hoạn.',
    specs: {
      material: 'Thép không gỉ Inox 304 xước / Thép tấm sơn tĩnh điện PCCC',
      thickness: 'Cánh cửa thang 1.5mm, khung giằng hộp chịu va đập cơ học',
      insulation: 'Tấm cách nhiệt ceramic cách nhiệt khoang thang máy',
      finish: 'Mạ PVD titan vàng, đồng hoặc xước hairline cao cấp',
      standard: 'TCVN 6396-72 (Thang máy chữa cháy), IEC 60331 (Cáp chịu lửa)',
      warranty: 'Bảo hành hệ thống 24 tháng theo tiêu chuẩn nhà sản xuất'
    },
    features: [
      'Cửa thang máy cứu hộ ưu tiên vận hành nguồn điện sự cố cấp 1',
      'Cáp chống cháy duy trì nguồn điện 120 phút ở 950°C',
      'Tủ điện điều khiển PCCC tự động chuyển nguồn ATS thông minh',
      'Tương thích đồng bộ mọi thương hiệu thang máy Mitsubishi, Hitachi, Otis'
    ],
    image: HERO_IMAGE,
    priceEstimate: 'Liên hệ khảo sát',
    popular: false
  },
  {
    id: 'vach-kinh-chong-chay-ei60-ei90',
    name: 'Cửa & Vách Kính Chống Cháy',
    category: 'glass-door',
    categoryName: 'Cửa & Vách kính ngăn cháy',
    fireRating: 'EI90',
    description: 'Kính trong suốt nhiều lớp gel cách nhiệt intumescent, sang trọng và an toàn tuyệt đối.',
    longDescription: 'Giải pháp cửa kính và vách kính ngăn cháy cách nhiệt APEX mang đến độ truyền sáng quang học cao tới 88%, đồng thời ngăn chặn hoàn toàn khói lửa và bức xạ nhiệt trong 60 - 90 phút nhờ lớp gel nano phồng nở đặc biệt.',
    specs: {
      material: 'Kính chống cháy nhiều lớp ghép nano cách nhiệt + Khung thép mạ định hình',
      thickness: 'Độ dày kính 19mm (EI60) đến 28mm (EI90)',
      insulation: 'Hợp chất gel ngăn bức xạ nhiệt cách nhiệt Pyrostop',
      finish: 'Khung inox 304 xước mờ hoặc thép sơn tĩnh điện màu tùy chọn',
      standard: 'BS EN 1364-1, QCVN 06:2022/BXD',
      warranty: 'Bảo hành quang học chống ố vàng 5 năm'
    },
    features: [
      'Độ trong suốt tuyệt đối không hạn chế tầm nhìn sảnh tòa nhà',
      'Khả năng cách âm lên tới 42dB',
      'Đạt đầy đủ tiêu chuẩn E (Tính toàn vẹn) và I (Tính cách nhiệt)',
      'Phù hợp phân chia phòng họp VIP, hành lang văn phòng hạng A'
    ],
    image: STEEL_DOOR_IMAGE,
    priceEstimate: 'Từ 4.800.000 đ/m²'
  },
  {
    id: 'phu-kien-pccc-chinh-hang',
    name: 'Phụ Kiện Cửa Chống Cháy Đồng Bộ',
    category: 'accessories',
    categoryName: 'Phụ kiện PCCC',
    fireRating: 'Tất cả',
    description: 'Tay co thủy lực chống cháy, thanh khóa panic thoát hiểm, bản lề inox chịu tải trọng cao.',
    longDescription: 'Trọn bộ phụ kiện cửa chống cháy chính hãng từ Hafele, Dorma, NewEra, APEX Hardware. Mọi phụ kiện đều được thử nghiệm đồng bộ trong buồng đốt kiểm định cùng cửa để đảm bảo cấp tem kiểm định hợp quy.',
    specs: {
      material: 'Inox SUS304 đúc nguyên khối, hợp kim kẽm siêu bền',
      thickness: 'Bản lề cối 3.5mm chịu tải cánh nặng tới 160kg',
      insulation: 'Ron ngăn khói tự phồng nở trương nở gấp 10 lần thể tích',
      finish: 'Xước satin chống xước, chống oxy hóa muối biển',
      standard: 'EN 1154 (Tay co), EN 1125 (Thanh thoát hiểm), UL listed',
      warranty: 'Bảo hành đổi mới 24 tháng đối với lỗi kỹ thuật'
    },
    features: [
      'Thanh đẩy panic đơn và đôi thoát hiểm khẩn cấp 1 chạm',
      'Tay co thủy lực có tính năng đóng tự động khi có còi báo cháy',
      'Khóa thẻ từ và khóa cơ PCCC ruột đồng chống cạy phá',
      'Chốt âm tự động cho cánh phụ cửa 2 cánh'
    ],
    image: HERO_IMAGE,
    priceEstimate: 'Giá niêm yết'
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
      'Cửa thép ngăn cháy EI60/EI90 cho buồng thang bộ thoát hiểm',
      'Cửa căn hộ vân gỗ cách nhiệt EI60 thẩm mỹ cao',
      'Hệ thống tay co tự đóng giữ kín khoang thang không để khói xâm nhập'
    ],
    standards: ['QCVN 06:2022/BXD Bảng 4', 'TCVN 3890:2023', 'Thông tư 149/2020/TT-BCA'],
    caseStudy: 'Dự án The Peak Midtown Phú Mỹ Hưng - 1.850 bộ cửa chống cháy EI90'
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
      'Cửa thép chống cháy EI90 phòng điện, phòng máy biến áp',
      'Vách kính chống cháy EI60 trong suốt sảnh lễ tân văn phòng',
      'Khóa thoát hiểm panic bar điện từ liên động hệ thống kiểm soát ra vào Access Control'
    ],
    standards: ['TCVN 9383:2012', 'QCVN 06:2022/BXD Mục 3.2', 'TCVN 5738:2021'],
    caseStudy: 'Tòa nhà văn phòng TechnoPark Tower - Đồng bộ hệ thống kiểm soát cửa PCCC'
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
      'Rèm ngăn cháy tự động hạ âm trần khi có tín hiệu khói',
      'Cửa cuốn ngăn cháy nhịp lớn EI120 phân chia khoang gian hàng',
      'Cửa thép 2 cánh thoát hiểm bản rộng thoát nạn số đông'
    ],
    standards: ['QCVN 06:2022/BXD Mục 4.14', 'NFPA 80', 'BS EN 1634-1'],
    caseStudy: 'Vincom Mega Mall Smart City - Hệ thống rèm ngăn khói giếng trời 1.200m²'
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
      'Cửa cuốn chống cháy siêu trường nan thép 1.4mm',
      'Cửa thép bọc chì hoặc inox 304 kháng hóa chất',
      'Cửa chống cháy tự đóng liên kết rơ-le nhiệt khi nguồn điện bị cắt'
    ],
    standards: ['QCVN 06:2022/BXD', 'TCVN 2622:1995', 'FM Global Standards'],
    caseStudy: 'Tổ hợp nhà máy Pegatron KCN Đình Vũ Hải Phòng - 68 bộ cửa cuốn PCCC'
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
      'Cửa chống cháy 2 cánh lệch có ô kính quan sát chống cháy',
      'Bản lề tự đóng êm và gioăng cản khói kín khí 100%',
      'Cửa trượt tự động ngăn khói phòng mổ áp lực dương'
    ],
    standards: ['TCVN 4470:2012', 'QCVN 06:2022/BXD', 'TCVN 9383:2012'],
    caseStudy: 'Bệnh viện Đa khoa Quốc tế Vinmec Central Park - Hệ thống cửa PCCC chuyên dụng'
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
      'Cửa thép chống cháy phủ phim vân gỗ sồi, óc chó cao cấp',
      'Khóa thông minh khách sạn tích hợp chức năng mở nhanh khẩn cấp',
      'Cửa thoát nạn sảnh tiệc hội nghị vách kính chịu nhiệt'
    ],
    standards: ['TCVN 4391:2015', 'QCVN 06:2022/BXD', 'TCVN 9383:2012'],
    caseStudy: 'Khách sạn JW Marriott Hanoi - Cung cấp cửa thoát nạn chịu lửa hành lang phòng hội nghị'
  }
];

export const PROJECTS: Project[] = [
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
    image: VINCOM_IMAGE,
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

export const TECHNICAL_DOCS: TechnicalDoc[] = [
  {
    id: 'qcvn-06-2022-bxd',
    title: 'Quy chuẩn kỹ thuật quốc gia QCVN 06:2022/BXD về An toàn cháy cho nhà và công trình',
    code: 'QCVN 06:2022/BXD',
    category: 'regulation',
    categoryLabel: 'Quy chuẩn & Pháp lý',
    fileSize: '4.8 MB',
    updatedDate: '16/01/2024',
    downloadCount: 4210,
    description: 'Toàn văn quy chuẩn kỹ thuật bắt buộc áp dụng khi thẩm duyệt và nghiệm thu PCCC các công trình xây dựng tại Việt Nam, cập nhật thông tư sửa đổi mới nhất.'
  },
  {
    id: 'catalogue-cua-chong-chay-apex-2024',
    title: 'Catalogue Kỹ Thuật Tổng Hợp Cửa Chống Cháy & Thiết Bị PCCC APEX Việt Nam',
    code: 'CAT-APEX-2024',
    category: 'catalog',
    categoryLabel: 'Catalogue & Thông số',
    fileSize: '12.5 MB',
    updatedDate: '20/05/2024',
    downloadCount: 8930,
    description: 'Bản catalogue chi tiết kích thước tiêu chuẩn, cấu tạo vật liệu, phụ kiện đồng bộ, bảng màu sơn tĩnh điện và hướng dẫn lựa chọn cho kỹ sư thiết kế.'
  },
  {
    id: 'ban-ve-cad-cua-thep-ei60-ei120',
    title: 'Bộ Thư Viện Bản Vẽ CAD Chi Tiết Cửa Thép Chống Cháy 1 Cánh & 2 Cánh (.DWG)',
    code: 'DWG-APEX-DOOR',
    category: 'cad',
    categoryLabel: 'Bản vẽ kỹ thuật CAD',
    fileSize: '8.2 MB',
    updatedDate: '10/06/2024',
    downloadCount: 6540,
    description: 'Hồ sơ bản vẽ CAD mặt cắt khung bao, chi tiết cánh cửa, ô kính và chôn nở gia cố tường xây sẵn sàng chèn vào đồ án thiết kế kiến trúc MEP.'
  },
  {
    id: 'giay-chung-nhan-kiem-dinh-pccc',
    title: 'Giấy chứng nhận kết quả thử nghiệm chịu lửa mẫu cửa EI60, EI90, EI120 - Cục CS PCCC & CNCH',
    code: 'CERT-FIRE-2024',
    category: 'certificate',
    categoryLabel: 'Chứng chỉ kiểm định',
    fileSize: '3.1 MB',
    updatedDate: '02/04/2024',
    downloadCount: 3820,
    description: 'Biên bản thử nghiệm đốt mẫu thực tế tại Viện Khoa học Công nghệ Xây dựng (IBST) và tem chứng nhận hợp quy của Bộ Công an.'
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
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
      'APEX Việt Nam tự hào là đơn vị tiên phong áp dụng lõi vật liệu Magie Oxit (MgO) và bông gốm Ceramic thế hệ mới, vượt qua toàn bộ các bài thử nghiệm đốt mẫu gắt gao tại IBST và được Cục CS PCCC & CNCH cấp chứng nhận kiểm định chính thức cho các dòng EI60, EI90 và EI120.'
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

export const PARTNER_LOGOS = [
  { name: '3CElectric', tag: 'Switch on your world' },
  { name: 'ANKO', tag: 'Fire Resistant Doors & Curtains' },
  { name: 'MITSUBISHI ELECTRIC', tag: 'Changes for the Better' },
  { name: 'HITACHI', tag: 'Inspire the Next' },
  { name: 'LS ELECTRIC', tag: 'Futuring Smart Energy' },
  { name: 'CADIVI', tag: 'Dây Cáp Điện Hàng Đầu' }
];
