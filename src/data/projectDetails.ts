import type { Project } from '../types';
import { PRODUCT_CATEGORY_LABELS } from '../routing';

// Import ảnh thực tế sản phẩm thi công của APEX
import cuaThepTongQuanCover from '../assets/images/products/cua-thep-ngan-chay-cover.webp';
import cuaThepEi90_2Cover from '../assets/images/products/cua-thep-ei90-2-canh-cover.webp';
import cuaThepEi70Cover from '../assets/images/products/cua-thep-ei70-1-canh-cover.webp';
import cuaThepEi90_1_2 from '../assets/images/products/cua-thep-ei90-1-canh-2.webp';

import cuaKinhTongQuanCover from '../assets/images/products/cua-kinh-ngan-chay-cover.webp';
import cuaKinhEi60Cover from '../assets/images/products/cua-kinh-ngan-chay-ei60-cover.webp';
import vachKinhCover from '../assets/images/products/vach-kinh-ngan-chay-ei60-ei90-cover.webp';
import cuaKinhEi90Cover from '../assets/images/products/cua-kinh-ngan-chay-ei90-cover.webp';

import cuaThepEi120_2Cover from '../assets/images/products/cua-thep-ei120-2-canh-cover.webp';
import cuaThepEi90_2_4 from '../assets/images/products/cua-thep-ei90-2-canh-4.webp';

export interface ProjectSuppliedItem {
  name: string;
  spec: string;
  locationScope?: string;
}

export interface ProjectPhotoItem {
  url: string;
  title: string;
  caption: string;
  tag?: string;
}

export interface ProjectCaseStudy {
  slug: string;
  subtitle: string;
  tenderPackage: string;
  standards: string[];
  contextLead: string;
  contextBody: string;
  scopeIntro: string;
  suppliedItems: ProjectSuppliedItem[];
  technicalHighlights: string[];
  photoStory: ProjectPhotoItem[];
  inspectionResults: {
    statusText: string;
    acceptanceAgency: string;
    standardReference: string;
    note: string;
  };
  handoverSummary: string;
  warrantyText: string;
}

/**
 * Dữ liệu chi tiết case study cho các dự án tiêu biểu đã nghiệm thu của APEX VN.
 * Cấu trúc chuẩn hóa theo biểu mẫu báo cáo công trình thi công thực tế (Project Case Study).
 */
export const PROJECT_CASE_STUDIES: Record<string, ProjectCaseStudy> = {
  // 1. Viện kiểm sát nhân dân tỉnh Quảng Ninh
  'vien-kiem-sat-tinh-quang-ninh': {
    slug: 'vien-kiem-sat-tinh-quang-ninh',
    subtitle: 'Cung cấp, gia công và lắp đặt hoàn thiện trọn gói hệ thống cửa thép ngăn cháy tiêu chuẩn EI60 – EI90',
    tenderPackage: 'Thi công hoàn thiện hệ thống cửa ngăn cháy hành lang, buồng thang thoát hiểm và kho lưu trữ hồ sơ nghiệp vụ',
    standards: [
      'QCVN 06:2022/BXD (Quy chuẩn kỹ thuật quốc gia về an toàn cháy cho nhà và công trình)',
      'QCVN 03:2023/BCA (Quy chuẩn kỹ thuật về phương tiện phòng cháy và chữa cháy)',
      'TCVN 9383:2012 (Thử nghiệm khả năng chịu lửa của cửa đi và cửa ngăn cháy)',
    ],
    contextLead:
      'Trong các công trình cơ quan tư pháp và hành chính công quyền, hệ thống cửa ngăn cháy đóng vai trò cốt lõi trong việc khoanh vùng sự cố, bảo vệ an toàn tính mạng cán bộ nhân viên và ngăn khói độc xâm nhập hành lang thoát nạn.',
    contextBody:
      'Trụ sở Viện kiểm sát nhân dân tỉnh Quảng Ninh là công trình trọng điểm tại TP. Hạ Long, nơi làm việc và bảo quản khối lượng lớn tài liệu, hồ sơ nghiệp vụ quan trọng. Công trình yêu cầu hệ thống cửa chống cháy không chỉ đạt giới hạn chịu lửa khắt khe theo QCVN 06:2022/BXD mà còn phải đáp ứng khả năng cách âm, chống ồn, vận hành êm nhẹ và bề mặt sơn tĩnh điện bền vững trước môi trường khí hậu ven biển có nồng độ muối cao.',
    scopeIntro:
      'Tại dự án Trụ sở Viện kiểm sát nhân dân tỉnh Quảng Ninh, APEX Việt Nam trực tiếp đảm nhiệm các hạng mục cung cấp và thi công chính gồm:',
    suppliedItems: [
      {
        name: 'Cửa thép ngăn cháy 1 cánh EI70',
        spec: 'Cánh dày 50mm, thép mạ điện cán nguội JIS G3141 (0.8/1.2mm), lõi tấm MgO/ERON chống cháy tỷ trọng cao',
        locationScope: 'Lắp đặt tại các phòng làm việc chuyên môn, phòng kỹ thuật điện và kho lưu trữ hồ sơ',
      },
      {
        name: 'Cửa thép ngăn cháy 2 cánh EI90',
        spec: 'Kích thước tiêu chuẩn thoát nạn, thép cánh 1.0mm, khung 1.4mm tăng cứng, chịu lửa 90 phút',
        locationScope: 'Lắp đặt tại sảnh tầng, cửa phân khoang cháy hành lang và buồng thang bộ thoát hiểm',
      },
      {
        name: 'Hệ phụ kiện PCCC đồng bộ kiểm định',
        spec: 'Bản lề Inox SUS304 4 vòng bi chịu tải, khóa tay gạt Inox chống cạy phá, tay co thủy lực King/Dorma tự đóng',
        locationScope: 'Đồng bộ cho 100% các bộ cửa trong khuôn viên công trình',
      },
      {
        name: 'Doorsill Inox & Hệ gioăng ngăn khói nở nhiệt',
        spec: 'Doorsill ngăn khói chân cửa, gioăng EPDM giảm chấn kết hợp gioăng than chì nở nhiệt tự phồng bịt kín khe cửa',
        locationScope: 'Khu vực cầu thang thoát nạn và các phòng kỹ thuật điện',
      },
      {
        name: 'Công tác chèn khe & Bơm keo bọt PCCC',
        spec: 'Bơm keo bọt PCCC trương nở chống cháy, đảm bảo độ kín khít tuyệt đối giữa khung thép và tường xây ô chờ',
        locationScope: '100% các vị trí lắp dựng ô chờ',
      },
    ],
    technicalHighlights: [
      'Gia công chính xác theo kích thước ô chờ thực tế đo đạc tại hiện trường, độ hở khe mép đồng đều < 3mm.',
      'Sơn tĩnh điện màu ghi sáng cao cấp theo hệ màu tiêu chuẩn cơ quan nhà nước, chống trầy xước và chống gỉ sét ven biển.',
      'Toàn bộ phụ kiện tay co thủy lực và khóa cửa hoạt động đóng mở êm nhẹ, tự động đưa cửa về vị trí đóng kín an toàn.',
    ],
    photoStory: [
      {
        url: cuaThepTongQuanCover,
        title: 'Mặt trước trụ sở & Cụm cửa thoát nạn sảnh chính',
        caption: 'Hệ thống cửa thép ngăn cháy hoàn thiện đồng bộ kiến trúc ngoại thất công trình.',
        tag: 'Toàn cảnh',
      },
      {
        url: cuaThepEi90_2Cover,
        title: 'Cửa thép ngăn cháy 2 cánh EI90 lối buồng thang thoát nạn',
        caption: 'Thiết kế 2 cánh mở thoát nạn hành lang, trang bị tay co thủy lực tự động đóng kín.',
        tag: 'Cửa hành lang',
      },
      {
        url: cuaThepEi70Cover,
        title: 'Cửa thép chống cháy EI70 kho lưu trữ hồ sơ nghiệp vụ',
        caption: 'Đảm bảo khả năng cách nhiệt và ngăn khói bảo vệ an toàn kho tài liệu hành chính.',
        tag: 'Phòng kỹ thuật',
      },
      {
        url: cuaThepEi90_1_2,
        title: 'Chi tiết phụ kiện bản lề Inox 304 và khóa an toàn',
        caption: 'Phụ kiện Inox SUS304 4 vòng bi chịu lực, vận hành êm nhẹ và bền bỉ.',
        tag: 'Chi tiết phụ kiện',
      },
    ],
    inspectionResults: {
      statusText: 'Đã nghiệm thu hoàn thành 100% & Bàn giao đưa vào khai thác sử dụng',
      acceptanceAgency: 'Biên bản nghiệm thu kỹ thuật PCCC cơ quan quản lý thẩm duyệt',
      standardReference: 'QCVN 06:2022/BXD và chứng nhận kiểm định phương tiện PCCC hợp quy',
      note: 'Hồ sơ pháp lý, biên bản thử nghiệm đốt mẫu, chứng chỉ xuất xưởng CO/CQ được bàn giao trọn vẹn cho Chủ đầu tư.',
    },
    handoverSummary:
      'Gói thầu được APEX Việt Nam hoàn thành đúng tiến độ cam kết, đáp ứng đầy đủ các tiêu chuẩn kỹ thuật khắt khe của ngành tư pháp và cơ quan thẩm duyệt PCCC. Công trình bàn giao đảm bảo an toàn vận hành, góp phần xây dựng môi trường làm việc chuẩn mực, an toàn cho Viện kiểm sát nhân dân tỉnh Quảng Ninh.',
    warrantyText: 'Bảo hành kỹ thuật chính hãng 36 tháng cho kết cấu khung cánh và 24 tháng cho hệ thống phụ kiện.',
  },

  // 2. Tòa án nhân dân tỉnh Quảng Ninh
  'toa-an-tinh-quang-ninh': {
    slug: 'toa-an-tinh-quang-ninh',
    subtitle: 'Cung cấp và thi công hệ thống cửa kính & vách kính ngăn cháy kiến trúc mở kiểm định EI60 – EI90',
    tenderPackage: 'Thi công vách kính ngăn cháy phòng xét xử, sảnh tiếp dân và cửa kính chống cháy phân khoang hành lang',
    standards: [
      'QCVN 06:2022/BXD (Quy chuẩn kỹ thuật quốc gia về an toàn cháy cho nhà và công trình)',
      'TCVN 9383:2012 (Thử nghiệm khả năng chịu lửa của cửa đi và vách kính ngăn cháy)',
      'TCVN 7455:2013 (Kính xây dựng – Kính tôi nhiệt an toàn)',
    ],
    contextLead:
      'Tại các công trình kiến trúc hiện đại, giải pháp cửa kính và vách kính ngăn cháy cách nhiệt mang đến sự cân bằng hoàn hảo giữa tính năng bảo vệ an toàn sinh mạng trước hỏa hoạn và không gian mở tràn ngập ánh sáng.',
    contextBody:
      'Trụ sở Tòa án nhân dân tỉnh Quảng Ninh được thiết kế theo phong cách không gian mở, trang nghiêm và tiện ích. Để vừa phân chia các khoang ngăn cháy giữa khu vực phòng xử án, sảnh tiếp công dân và khu hành chính, vừa đảm bảo tầm nhìn thông thoáng và tận dụng tối đa ánh sáng tự nhiên, Chủ đầu tư đã lựa chọn giải pháp vách kính và cửa kính ngăn cháy cách nhiệt EI của APEX Việt Nam.',
    scopeIntro:
      'Tại công trình Tòa án nhân dân tỉnh Quảng Ninh, APEX Việt Nam triển khai trọn gói các hạng mục kính ngăn cháy chuyên dụng gồm:',
    suppliedItems: [
      {
        name: 'Vách kính ngăn cháy cách nhiệt EI60 – EI90',
        spec: 'Khung thép gia cường bọc Inox / sơn tĩnh điện cao cấp, kính ngăn cháy nhiều lớp chống bức xạ nhiệt',
        locationScope: 'Vách ngăn phân khoang sảnh xét xử, hành lang công cộng và khu làm việc',
      },
      {
        name: 'Cửa kính ngăn cháy 2 cánh mở quay EI60',
        spec: 'Cửa kính khung thép bọc Inox kết hợp kính an toàn ngăn cháy, gioăng chịu nhiệt ngăn khói độc',
        locationScope: 'Lối vào chính các phòng xử án và sảnh tiếp dân',
      },
      {
        name: 'Hệ phụ kiện bản lề sàn thủy lực chuyên dụng',
        spec: 'Bản lề sàn chịu tải trọng nặng 150–250kg, kẹp kính Inox SUS304 đúc nguyên khối, khóa sàn an toàn',
        locationScope: 'Đồng bộ cho toàn bộ hệ thống cửa kính mở quay',
      },
      {
        name: 'Gioăng silicone chống cháy chịu nhiệt',
        spec: 'Hợp chất keo và gioăng silicone chống cháy chuyên dụng liên kết mối nối kính, ngăn khói độc 100%',
        locationScope: 'Toàn bộ khe tiếp giáp kính và khung chịu lực',
      },
    ],
    technicalHighlights: [
      'Kính ngăn cháy cách nhiệt nhiều lớp (Multi-layer Fire Glass) giữ nhiệt độ mặt không tiếp lửa < 140°C.',
      'Độ trong suốt quang học cao > 85%, không bị ố vàng, bóng khí hay biến tính dưới tác động của ánh nắng.',
      'Khung chịu lực gia cường kiên cố, chịu được áp lực gió và lực va đập cơ học trong quá trình sử dụng.',
    ],
    photoStory: [
      {
        url: cuaKinhTongQuanCover,
        title: 'Hệ vách kính và cửa kính ngăn cháy đại sảnh',
        caption: 'Tạo không gian xét xử trang nghiêm, thông thoáng và đảm bảo an toàn ngăn lửa tuyệt đối.',
        tag: 'Đại sảnh',
      },
      {
        url: cuaKinhEi60Cover,
        title: 'Cửa kính ngăn cháy EI60 2 cánh mở quay',
        caption: 'Bản lề sàn thủy lực đóng mở êm nhẹ, phụ kiện kẹp Inox SUS304 đồng bộ cao cấp.',
        tag: 'Cửa phòng xử',
      },
      {
        url: vachKinhCover,
        title: 'Vách kính ngăn cháy liên kết khung tăng cứng',
        caption: 'Kết cấu khung chịu lực chắc chắn, kiểm định đốt mẫu thực tế đạt chuẩn EI.',
        tag: 'Vách ngăn cháy',
      },
      {
        url: cuaKinhEi90Cover,
        title: 'Cửa kính chống cháy EI90 lối hành lang',
        caption: 'Khả năng ngăn lửa và bức xạ nhiệt trên 90 phút bảo vệ hành lang thoát nạn.',
        tag: 'Khu vực hành lang',
      },
    ],
    inspectionResults: {
      statusText: 'Đã hoàn thành kiểm định đốt mẫu và nghiệm thu hiện trường',
      acceptanceAgency: 'Cơ quan Cảnh sát PCCC & CNCH nghiệm thu theo quy chuẩn',
      standardReference: 'QCVN 06:2022/BXD và chứng nhận kiểm định mẫu đốt thực tế',
      note: 'Sản phẩm bàn giao đi kèm đầy đủ hồ sơ kiểm định, CO, CQ kính chống cháy và phụ kiện Inox 304.',
    },
    handoverSummary:
      'Hệ thống cửa kính và vách kính chống cháy APEX được lắp đặt hoàn thiện chính xác, vận hành trơn tru và đạt thẩm mỹ cao. Dự án đã vượt qua các bài kiểm tra áp lực và nhiệt độ, được Hội đồng nghiệm thu đánh giá cao về chất lượng và bàn giao đưa vào phục vụ các kỳ xét xử an toàn.',
    warrantyText: 'Bảo hành 36 tháng cho kính và kết cấu khung, 24 tháng cho bản lề sàn và phụ kiện kẹp Inox.',
  },

  // 3. Tòa nhà đa năng KV I – Học viện Hậu Cần
  'toa-nha-da-nang-kv-i-hoc-vien-hau-can': {
    slug: 'toa-nha-da-nang-kv-i-hoc-vien-hau-can',
    subtitle: 'Cung cấp, lắp đặt và nghiệm thu hoàn thành toàn bộ hệ thống cửa thép ngăn cháy tiêu chuẩn EI',
    tenderPackage: 'Gói thầu thi công lắp đặt hệ thống cửa ngăn cháy hội trường, tầng hầm và các buồng thang kỹ thuật',
    standards: [
      'QCVN 06:2022/BXD (Quy chuẩn kỹ thuật quốc gia về an toàn cháy cho nhà và công trình)',
      'QCVN 03:2023/BCA (Quy chuẩn kỹ thuật về phương tiện phòng cháy và chữa cháy)',
      'TCVN 9383:2012 (Thử nghiệm khả năng chịu lửa của cửa ngăn cháy)',
    ],
    contextLead:
      'Các công trình giáo dục, đào tạo và quốc phòng quy mô lớn đòi hỏi phương án phòng cháy chữa cháy chủ động với độ bền cơ học cao, chịu tải trọng lớn và đáp ứng mật độ thoát hiểm đông đảo.',
    contextBody:
      'Tòa nhà đa năng KV I là công trình giảng đường, hội thảo và huấn luyện trọng điểm của Học viện Hậu Cần, do Tổng công ty 789 (Bộ Quốc Phòng) làm tổng thầu thi công. Dự án có quy mô nhiều tầng với lưu lượng cán bộ, học viên lớn, yêu cầu hệ thống cửa thoát nạn phải có kết cấu thép kiên cố, đóng mở nhẹ nhàng, thoát nạn khẩn cấp một chiều và đạt tuyệt đối các chỉ tiêu kiểm định PCCC quân đội và nhà nước.',
    scopeIntro:
      'Hợp tác cùng Tổng thầu Tổng công ty 789, APEX Việt Nam đã sản xuất, cung cấp và lắp đặt trọn gói hệ thống cửa ngăn cháy gồm:',
    suppliedItems: [
      {
        name: 'Cửa thép ngăn cháy 2 cánh EI90 & EI120',
        spec: 'Thép mạ kẽm cánh 1.0mm, khung 1.4mm, lõi Magie Oxit (MgO) tỷ trọng cao chịu nhiệt độ > 1000°C',
        locationScope: 'Lối thoát nạn hội trường lớn, sảnh tầng và cửa ngăn khoang cháy tầng hầm để xe',
      },
      {
        name: 'Cửa thép ngăn cháy 1 cánh EI70',
        spec: 'Cánh dày 50mm, bề mặt sơn tĩnh điện màu ghi xám quân sự, chống trầy xước và va đập cơ học',
        locationScope: 'Phòng máy biến áp, phòng máy bơm PCCC, phòng điều khiển trung tâm và buồng thang',
      },
      {
        name: 'Hệ thống thanh thoát hiểm Panic Bar',
        spec: 'Thanh đẩy panic bar một chiều bằng Inox SUS304 cho phép mở cửa tức thì bằng lực đẩy nhẹ khi khẩn cấp',
        locationScope: 'Toàn bộ các lối ra buồng thang bộ thoát nạn',
      },
      {
        name: 'Tay co thủy lực tải trọng nặng & Gioăng nở nhiệt',
        spec: 'Tay co tải trọng 85–120kg, gioăng cao su giảm chấn kết hợp gioăng ngăn khói trương nở nhiệt',
        locationScope: 'Đồng bộ cho các bộ cửa tại sảnh và buồng thang',
      },
    ],
    technicalHighlights: [
      'Tiến độ thi công thần tốc, hoàn thành gia công và lắp đặt toàn bộ gói thầu vượt tiến độ yêu cầu của Tổng thầu.',
      'Khả năng chịu tải bản lề vượt trội, không xệ cánh sau hàng chục nghìn lượt đóng mở liên tục.',
      'Kiểm định phương tiện PCCC đầy đủ theo đúng hồ sơ thiết kế thẩm duyệt của dự án.',
    ],
    photoStory: [
      {
        url: cuaThepEi90_2Cover,
        title: 'Cửa thép chống cháy 2 cánh EI90 sảnh hội trường',
        caption: 'Quy cách 2 cánh rộng rãi phục vụ thoát nạn nhanh chóng cho hội trường lớn.',
        tag: 'Lối thoát nạn chính',
      },
      {
        url: cuaThepEi120_2Cover,
        title: 'Cửa thép ngăn cháy EI120 chịu lửa 120 phút tầng hầm',
        caption: 'Khoang cháy tầng hầm kỹ thuật kiên cố, ngăn khói độc xâm nhập các tầng trên.',
        tag: 'Tầng hầm kỹ thuật',
      },
      {
        url: cuaThepEi70Cover,
        title: 'Cửa thép chống cháy 1 cánh phòng trạm biến áp',
        caption: 'Bảo vệ phòng kỹ thuật nguồn điện và hệ thống máy bơm chữa cháy.',
        tag: 'Phòng kỹ thuật điện',
      },
      {
        url: cuaThepEi90_2_4,
        title: 'Hệ thống thanh thoát hiểm panic bar và phụ kiện',
        caption: 'Thanh panic bar Inox 304 trợ lực thoát hiểm khẩn cấp an toàn và nhạy bén.',
        tag: 'Phụ kiện thoát nạn',
      },
    ],
    inspectionResults: {
      statusText: 'Nghiệm thu hoàn thành ký kết ngày 22/05/2026',
      acceptanceAgency: 'Biên bản nghiệm thu 3 bên: Chủ đầu tư – Tổng thầu 789 – Nhà thầu APEX',
      standardReference: 'QCVN 06:2022/BXD, QCVN 03:2023/BCA',
      note: 'Biên bản nghiệm thu hoàn thành toàn bộ khối lượng gói thầu, không phát sinh lỗi kỹ thuật.',
    },
    handoverSummary:
      'Gói thầu cửa chống cháy tại Tòa nhà đa năng KV I – Học viện Hậu Cần đã được bàn giao cho Tổng thầu Tổng công ty 789 và Ban quản lý dự án Học viện Hậu Cần đúng tiến độ và chất lượng cao nhất, sẵn sàng đưa vào phục vụ công tác giảng dạy và huấn luyện của học viện.',
    warrantyText: 'Bảo hành toàn diện 36 tháng đối với kết cấu cửa và 24 tháng đối với phụ kiện đóng mở.',
  },
};

/**
 * Hàm lấy dữ liệu case study đầy đủ cho một dự án.
 * Nếu dự án đã có dữ liệu biên tập riêng trong PROJECT_CASE_STUDIES, kết hợp với các trường động của project.
 * Nếu là dự án mới chưa có trong map, tự động sinh case study chuyên nghiệp đúng biểu mẫu thi công.
 */
export function getProjectCaseStudy(project: Project): ProjectCaseStudy {
  const existing = project.slug ? PROJECT_CASE_STUDIES[project.slug] : undefined;
  const categoryName = PRODUCT_CATEGORY_LABELS[project.category] || project.categoryLabel || project.category || 'Cửa ngăn cháy';

  if (existing) {
    return {
      ...existing,
      // Cập nhật linh hoạt theo dữ liệu mới nhất từ project database nếu có
      standards: existing.standards,
      photoStory:
        project.gallery && project.gallery.length > 0
          ? project.gallery.map((imgUrl, idx) => {
              const matchedPhoto = existing.photoStory.find((p) => p.url === imgUrl);
              if (matchedPhoto) return matchedPhoto;
              return {
                url: imgUrl,
                title: `Hình ảnh thi công thực tế tại công trình (${idx + 1})`,
                caption: `Hình ảnh ghi nhận quá trình lắp đặt hoàn thiện hạng mục tại ${project.title}.`,
                tag: idx === 0 ? 'Hiện trường' : 'Chi tiết lắp đặt',
              };
            })
          : existing.photoStory,
    };
  }

  // Fallback sinh động case study chuẩn kỹ thuật cho bất kỳ dự án mới nào
  const cover = project.coverImage || project.image || cuaThepTongQuanCover;
  const gallery = Array.isArray(project.gallery) && project.gallery.length > 0 ? project.gallery : [cover];

  return {
    slug: project.slug || project.id,
    subtitle: `Cung cấp, gia công và thi công hoàn thiện hệ thống ${categoryName.toLowerCase()} đạt chuẩn kiểm định PCCC`,
    tenderPackage: project.apexRole || `Gói thầu thi công lắp đặt hệ thống ${categoryName.toLowerCase()} cho công trình`,
    standards: [
      'QCVN 06:2022/BXD (Quy chuẩn kỹ thuật quốc gia về an toàn cháy cho nhà và công trình)',
      'QCVN 03:2023/BCA (Quy chuẩn kỹ thuật về phương tiện phòng cháy và chữa cháy)',
      'TCVN 9383:2012 (Thử nghiệm khả năng chịu lửa của cửa đi và vách ngăn cháy)',
    ],
    contextLead:
      `Trong các công trình hiện đại, việc trang bị hệ thống ${categoryName.toLowerCase()} đạt chuẩn kỹ thuật đóng vai trò quyết định đến an toàn thoát nạn, ngăn ngừa cháy lan và bảo vệ tài sản công trình.`,
    contextBody:
      project.description ||
      `Dự án ${project.title} tại ${project.location} đòi hỏi giải pháp ${categoryName.toLowerCase()} chất lượng cao, gia công chuẩn xác theo ô chờ thực tế, đáp ứng đầy đủ yêu cầu thẩm duyệt PCCC và bàn giao đúng tiến độ cam kết.`,
    scopeIntro: `Tại dự án ${project.title}, APEX Việt Nam đảm nhiệm trọn gói các hạng mục cung cấp và lắp đặt gồm:`,
    suppliedItems: [
      {
        name: `Hệ thống ${categoryName} tiêu chuẩn kiểm định EI`,
        spec: 'Gia công từ vật liệu chịu lực cao cấp, lõi cách nhiệt chống cháy, bề mặt sơn hoàn thiện bền màu',
        locationScope: 'Các vị trí lối thoát nạn, phòng kỹ thuật và phân khoang cháy theo bản vẽ thiết kế',
      },
      {
        name: 'Hệ phụ kiện PCCC đồng bộ kiểm định',
        spec: 'Bản lề chịu tải trọng nặng, khóa tay gạt an toàn, tay co thủy lực tự đóng và thanh thoát hiểm',
        locationScope: 'Lắp đặt đồng bộ trên toàn bộ các vị trí cửa',
      },
      {
        name: 'Gioăng ngăn khói nở nhiệt & Công tác chèn khe PCCC',
        spec: 'Hệ gioăng ngăn khói trương nở nhiệt kết hợp bơm keo bọt chống cháy đạt chuẩn kín khít',
        locationScope: '100% các ô chờ lắp dựng',
      },
    ],
    technicalHighlights: [
      'Sản xuất trực tiếp tại nhà máy APEX theo kích thước đo đạc thực tế của công trình.',
      'Đáp ứng tiến độ thi công và tiêu chuẩn kỹ thuật nghiêm ngặt của Chủ đầu tư và Tổng thầu.',
      'Cung cấp đầy đủ chứng chỉ xuất xưởng, biên bản thử nghiệm đốt mẫu và hồ sơ nghiệm thu PCCC hợp quy.',
    ],
    photoStory: gallery.map((imgUrl, idx) => ({
      url: imgUrl,
      title: `Hình ảnh thi công thực tế tại công trình (${idx + 1})`,
      caption: `Ghi nhận quá trình lắp đặt và hoàn thiện hạng mục tại ${project.title}.`,
      tag: idx === 0 ? 'Toàn cảnh' : 'Hiện trường',
    })),
    inspectionResults: {
      statusText: project.verifiedNote || 'Đã hoàn thành kiểm định và nghiệm thu đưa vào sử dụng',
      acceptanceAgency: 'Biên bản nghiệm thu kỹ thuật giữa Chủ đầu tư và đơn vị thi công',
      standardReference: 'QCVN 06:2022/BXD và quy chuẩn phương tiện PCCC hiện hành',
      note: 'Hồ sơ pháp lý và tài liệu nghiệm thu được lưu trữ và bàn giao đầy đủ cho Ban quản lý dự án.',
    },
    handoverSummary:
      `Hạng mục ${categoryName.toLowerCase()} tại dự án ${project.title} đã được APEX hoàn thành bàn giao với chất lượng kỹ thuật cao nhất, vận hành an toàn và ổn định.`,
    warrantyText: 'Bảo hành chính hãng 36 tháng cho kết cấu và 24 tháng cho phụ kiện.',
  };
}
