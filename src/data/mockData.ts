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
    id: 'cua-thep-ngan-chay',
    slug: 'cua-thep-ngan-chay',
    name: 'Cửa Thép Ngăn Cháy',
    category: 'cua-thep-ngan-chay',
    categoryName: 'Cửa thép ngăn cháy',
    fireRating: '',
    certificationNo: '',
    description: 'Cửa thép ngăn cháy APEX kết cấu thép tấm định hình vững chắc, lõi cách nhiệt chuyên dụng, ngăn lửa và ngăn khói lan giữa các khoang cháy theo tiêu chuẩn PCCC.',
    longDescription: 'Cửa thép ngăn cháy là cấu kiện phân khoang ngăn cháy trọng yếu trong các công trình công nghiệp và dân dụng. Sản phẩm được sản xuất từ thép mạ kẽm hoặc thép cán nguội chất lượng cao, khung và cánh gia cường gân tăng cứng, bên trong chứa lõi cách nhiệt chống cháy. Hệ thống gioăng ngăn khói tự giãn nở khi nhiệt độ tăng cao giúp cô lập buồng cháy, bảo vệ lối thoát nạn khẩn cấp.',
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
    image: STEEL_DOOR_IMAGE,
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'cua-kinh-ngan-chay',
    slug: 'cua-kinh-ngan-chay',
    name: 'Cửa Kính Ngăn Cháy',
    category: 'cua-kinh-ngan-chay',
    categoryName: 'Cửa kính ngăn cháy',
    fireRating: '',
    certificationNo: '',
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
    image: STEEL_DOOR_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'cua-cuon-ngan-chay',
    slug: 'cua-cuon-ngan-chay',
    name: 'Cửa Cuốn Ngăn Cháy',
    category: 'cua-cuon-ngan-chay',
    categoryName: 'Cửa cuốn ngăn cháy',
    fireRating: '',
    certificationNo: '',
    description: 'Cửa cuốn ngăn cháy siêu trường APEX che chắn các khoảng mở nhịp lớn, tự động kích hoạt đóng kín khi nhận tín hiệu báo cháy kết nối hệ thống điều khiển trung tâm.',
    longDescription: 'Cửa cuốn ngăn cháy được thiết kế nhằm đáp ứng yêu cầu ngăn khoang cháy diện tích lớn tại các vị trí không thể bố trí cửa mở quay thông thường. Nan cửa chế tạo bằng thép định hình chịu nhiệt, ray dẫn hướng và trục cuốn gia cố vững chắc, kết hợp motor chống cháy và bộ lưu điện dự phòng UPS đảm bảo vận hành tin cậy ngay cả khi mất điện nguồn.',
    specs: {
      material: 'Nan thép mạ kẽm định hình chịu nhiệt, cấu trúc cách âm cách nhiệt',
      thickness: 'Sản xuất khẩu độ rộng theo khoảng mở công trình',
      insulation: 'Lớp cách nhiệt chuyên dụng trong lòng nan',
      finish: 'Sơn tĩnh điện công nghiệp kháng ăn mòn',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Giải pháp tối ưu cho khoảng mở siêu trường tại tầng hầm và nhà xưởng',
      'Động cơ chuyên dụng tích hợp xích kéo thoát hiểm khẩn cấp cơ học',
      'Kết nối trực tiếp hệ thống báo cháy tự động tòa nhà (BMS)',
      'Hộp che cuốn gọn gàng, tiết kiệm không gian vận hành'
    ],
    image: ROLLER_SHUTTER_IMAGE,
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'rem-ngan-chay',
    slug: 'rem-ngan-chay',
    name: 'Rèm Ngăn Cháy & Ngăn Khói Tự Động',
    category: 'rem-ngan-chay',
    categoryName: 'Rèm ngăn cháy',
    fireRating: '',
    certificationNo: '',
    description: 'Màn rèm ngăn cháy APEX cấu tạo từ sợi thủy tinh gia cường dây thép, trọng lượng nhẹ, giấu âm trần thẩm mỹ và tự động hạ xuống ngăn khói lửa khi xảy ra hỏa hoạn.',
    longDescription: 'Rèm ngăn cháy và ngăn khói tự động là giải pháp phân chia khoang cháy linh hoạt cho kiến trúc hiện đại. Vải rèm được dệt từ sợi kỹ thuật composite chịu nhiệt độ cao, cuốn gọn trong hộp kỹ thuật gắn âm trần khi trạng thái bình thường. Khi có tín hiệu khẩn cấp, rèm tự động hạ theo trọng lực (gravity fail-safe) xuống vị trí cách ly ngăn khói độc lan truyền.',
    specs: {
      material: 'Vải sợi thủy tinh kỹ thuật gia cường sợi thép không gỉ',
      thickness: 'Thiết kế theo kích thước ô thông tầng hoặc hành lang',
      insulation: 'Lớp phủ phản xạ nhiệt và ngăn truyền khói độc',
      finish: 'Hộp cuốn kỹ thuật sơn tĩnh điện lắp âm trần',
      standard: 'QCVN 06:2022/BXD, TCVN 9383:2012',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Trọng lượng nhẹ, giấu kín trên trần không ảnh hưởng thiết kế nội thất',
      'Cơ chế hạ tự do an toàn theo trọng lực (Gravity Fail-Safe)',
      'Ứng dụng cho sảnh thông tầng, giếng trời, thang cuốn trung tâm thương mại',
      'Tích hợp cảm biến báo khói và tủ điều khiển trung tâm'
    ],
    image: FIRE_CURTAIN_IMAGE,
    priceEstimate: 'Liên hệ',
    popular: true
  },
  {
    id: 'tu-dien',
    slug: 'tu-dien',
    name: 'Tủ Điện Phân Phối & Điều Khiển Công Nghiệp',
    category: 'tu-dien',
    categoryName: 'Tủ điện',
    fireRating: '',
    certificationNo: '',
    description: 'Vỏ tủ điện và hệ thống tủ phân phối hạ thế, tủ điều khiển máy bơm PCCC APEX chế tạo cơ khí chính xác, cấp bảo vệ IP cao và sơn tĩnh điện bền bỉ.',
    longDescription: 'Tủ điện APEX được thiết kế và gia công cơ khí đáp ứng các tiêu chuẩn kỹ thuật điện và an toàn phòng chống cháy nổ. Kết cấu khung vỏ chắc chắn từ thép mạ kẽm hoặc Inox, khoang ngăn phân đoạn hợp lý giúp tản nhiệt tối ưu, bảo vệ thiết bị đóng cắt và hệ thống điều khiển bơm PCCC vận hành ổn định trong điều kiện khắc nghiệt.',
    specs: {
      material: 'Thép cán nguội mạ kẽm độ dày 1.5mm - 2.5mm',
      thickness: 'Dạng module tự đứng hoặc treo tường theo sơ đồ đơn tuyến',
      insulation: 'Sơn tĩnh điện chống ăn mòn và cách điện an toàn',
      finish: 'Màu ghi sáng sần RAL 7032 / RAL 7035 tiêu chuẩn công nghiệp',
      standard: 'TCVN 7994-1 (IEC 61439-1), Cấp bảo vệ IP43 - IP55',
      warranty: '12 - 24 tháng theo hợp đồng'
    },
    features: [
      'Gia công CNC đột dập và chấn gấp cơ khí độ chính xác cao',
      'Tủ phân phối tổng MSB, tủ phân phối tầng DB, tủ điều khiển bơm PCCC',
      'Gioăng cao su bọt biển chống bụi và nước xâm nhập',
      'Bố trí thanh cái đồng và thiết bị đóng cắt khoa học, dễ bảo trì'
    ],
    image: STEEL_DOOR_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'thang-mang-cap',
    slug: 'thang-mang-cap',
    name: 'Thang Máng Cáp Điện & Khay Cáp Kỹ Thuật',
    category: 'thang-mang-cap',
    categoryName: 'Thang máng cáp',
    fireRating: '',
    certificationNo: '',
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
    image: STEEL_DOOR_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'tu-rack',
    slug: 'tu-rack',
    name: 'Tủ Rack Mạng & Viễn Thông Server Rack',
    category: 'tu-rack',
    categoryName: 'Tủ rack',
    fireRating: '',
    certificationNo: '',
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
    image: STEEL_DOOR_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'nha-tram-shelter',
    slug: 'nha-tram-shelter',
    name: 'Nhà Trạm Viễn Thông Shelter Tích Hợp',
    category: 'nha-tram-shelter',
    categoryName: 'Nhà trạm Shelter',
    fireRating: '',
    certificationNo: '',
    description: 'Nhà trạm Shelter APEX kết cấu sandwich panel cách nhiệt, kín nước, chống ăn mòn thời tiết, bảo vệ thiết bị truyền dẫn và nguồn điện tại các trạm BTS dã ngoại.',
    longDescription: 'Nhà trạm viễn thông Shelter APEX là giải pháp nhà tiền chế module chuyên dụng bảo vệ máy móc viễn thông và năng lượng điện tại các địa hình phức tạp ngoài trời. Vỏ trạm gồm các tấm panel lõi xốp PU/PIR hoặc bông khoáng chống cháy, khung thép mạ kẽm chịu gió bão, tích hợp hệ thống điều hòa luân phiên, cửa kín nước và hệ thống tiếp địa chống sét toàn diện.',
    specs: {
      material: 'Sandwich panel cách nhiệt lõi PU/PIR hoặc bông khoáng chống cháy',
      thickness: 'Khung thép mạ kẽm nhúng nóng liên kết module cơ động',
      insulation: 'Hệ số truyền nhiệt thấp, bảo ôn duy trì nhiệt độ tối ưu',
      finish: 'Tôn mạ màu chống chịu thời tiết, muối biển và bức xạ UV',
      standard: 'TCVN kỹ thuật xây dựng nhà trạm viễn thông dã ngoại',
      warranty: '24 - 36 tháng theo hợp đồng'
    },
    features: [
      'Lắp dựng cơ động trên mọi địa hình: đồi núi, mái nhà, ven biển',
      'Độ kín khít cao, chống bụi bẩn và chống ngấm nước mưa tuyệt đối',
      'Tích hợp hệ thống điều hòa luân phiên, chiếu sáng và báo khói khẩn cấp',
      'Cửa bảo vệ 3 điểm khóa chống đột nhập chuyên dụng ngoài trời'
    ],
    image: STEEL_DOOR_IMAGE,
    priceEstimate: 'Liên hệ'
  },
  {
    id: 'tu-nguon-outdoor',
    slug: 'tu-nguon-outdoor',
    name: 'Tủ Nguồn Outdoor Chuyên Dụng Ngoài Trời',
    category: 'tu-nguon-outdoor',
    categoryName: 'Tủ nguồn Outdoor',
    fireRating: '',
    certificationNo: '',
    description: 'Tủ nguồn ngoài trời APEX kết cấu hai lớp vỏ cách nhiệt, cấp bảo vệ IP55/IP65, tích hợp điều hòa / quạt thông gió tản nhiệt, chống nước và chống bụi xâm nhập.',
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
    image: STEEL_DOOR_IMAGE,
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
  { name: '3CElectric', tag: 'Switch on your world' },
  { name: 'ANKO', tag: 'Fire Resistant Doors & Curtains' },
  { name: 'MITSUBISHI ELECTRIC', tag: 'Changes for the Better' },
  { name: 'HITACHI', tag: 'Inspire the Next' },
  { name: 'LS ELECTRIC', tag: 'Futuring Smart Energy' },
  { name: 'CADIVI', tag: 'Dây Cáp Điện Hàng Đầu' }
];

export const PARTNER_LOGOS: { name: string; tag: string }[] = PARTNER_LOGO_SAMPLES;
