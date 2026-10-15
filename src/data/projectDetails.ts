import type { Project } from '../types';
import { PRODUCT_CATEGORY_LABELS } from '../routing';

// 1. Ảnh thực tế dự án: Bệnh viện Tim Hà Nội cơ sở 2
import bvTim1 from '../assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-1.webp';
import bvTim2 from '../assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-2.webp';
import bvTim3 from '../assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-3.webp';
import bvTim4 from '../assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-4.webp';
import bvTim5 from '../assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-5.webp';
import bvTim6 from '../assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-6.webp';
import bvTim7 from '../assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-7.webp';

// 2. Ảnh thực tế dự án: Học viện Hậu Cần
import hvhc1 from '../assets/images/projects/hoc-vien-hau-can/photo-1.webp';
import hvhc2 from '../assets/images/projects/hoc-vien-hau-can/photo-2.webp';
import hvhc3 from '../assets/images/projects/hoc-vien-hau-can/photo-3.webp';
import hvhc4 from '../assets/images/projects/hoc-vien-hau-can/photo-4.webp';
import hvhc5 from '../assets/images/projects/hoc-vien-hau-can/photo-5.webp';
import hvhc6 from '../assets/images/projects/hoc-vien-hau-can/photo-6.webp';
import hvhc7 from '../assets/images/projects/hoc-vien-hau-can/photo-7.webp';
import hvhc8 from '../assets/images/projects/hoc-vien-hau-can/photo-8.webp';

// 3. Ảnh thực tế dự án: Nhà làm việc 9 tầng Công ty Điện lực Yên Bái
import dlyb1 from '../assets/images/projects/cong-ty-dien-luc-yen-bai/photo-1.webp';
import dlyb2 from '../assets/images/projects/cong-ty-dien-luc-yen-bai/photo-2.webp';
import dlyb3 from '../assets/images/projects/cong-ty-dien-luc-yen-bai/photo-3.webp';
import dlyb4 from '../assets/images/projects/cong-ty-dien-luc-yen-bai/photo-4.webp';
import dlyb5 from '../assets/images/projects/cong-ty-dien-luc-yen-bai/photo-5.webp';
import dlyb6 from '../assets/images/projects/cong-ty-dien-luc-yen-bai/photo-6.webp';
import dlyb7 from '../assets/images/projects/cong-ty-dien-luc-yen-bai/photo-7.webp';
import dlyb8 from '../assets/images/projects/cong-ty-dien-luc-yen-bai/photo-8.webp';

// 4. Ảnh thực tế dự án: Nhà máy Astarte Việt Nam
import astarte1 from '../assets/images/projects/nha-may-astarte-viet-nam/photo-1.webp';
import astarte2 from '../assets/images/projects/nha-may-astarte-viet-nam/photo-2.webp';
import astarte3 from '../assets/images/projects/nha-may-astarte-viet-nam/photo-3.webp';
import astarte4 from '../assets/images/projects/nha-may-astarte-viet-nam/photo-4.webp';
import astarte5 from '../assets/images/projects/nha-may-astarte-viet-nam/photo-5.webp';
import astarte6 from '../assets/images/projects/nha-may-astarte-viet-nam/photo-6.webp';
import astarte7 from '../assets/images/projects/nha-may-astarte-viet-nam/photo-7.webp';
import astarte8 from '../assets/images/projects/nha-may-astarte-viet-nam/photo-8.webp';

// 5. Ảnh thực tế dự án: Viện kiểm sát nhân dân tỉnh Quảng Ninh
import vks1 from '../assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-1.webp';
import vks2 from '../assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-2.webp';
import vks3 from '../assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-3.webp';
import vks4 from '../assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-4.webp';
import vks5 from '../assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-5.webp';
import vks6 from '../assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-6.webp';
import vks7 from '../assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-7.webp';

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
  title: string;
  clientName: string;
  generalContractor?: string;
  location: string;
  completedYear: number;
  tenderPackage: string;
  category: string;
  standards: string[];
  contextIntro: string;
  contextChallenge: string;
  suppliedItems: ProjectSuppliedItem[];
  installationNotes: string[];
  photoStory: ProjectPhotoItem[];
  acceptanceResult: string;
  acceptanceDate: string;
  warrantyPeriod: string;
}

/**
 * Danh sách 5 dự án thực tế đã hoàn thành của APEX theo đúng các folder trong:
 * D:\ELMICH\Apex-pccc\ảnh\ảnh website pccc
 */
export const PROJECT_CASE_STUDIES: Record<string, ProjectCaseStudy> = {
  // 1. Bệnh viện Tim Hà Nội cơ sở 2
  'benh-vien-tim-ha-noi-co-so-2': {
    slug: 'benh-vien-tim-ha-noi-co-so-2',
    title: 'Bệnh viện Tim Hà Nội cơ sở 2',
    clientName: 'Bệnh viện Tim Hà Nội',
    generalContractor: 'Ban quản lý dự án công trình y tế Hà Nội',
    location: 'Đường Võ Chí Công, Quận Tây Hồ, TP. Hà Nội',
    completedYear: 2026,
    tenderPackage: 'Cung cấp và lắp đặt hệ thống cửa thép ngăn cháy, cửa phòng kỹ thuật và phụ kiện PCCC',
    category: 'cua-thep-ngan-chay',
    standards: [
      'QCVN 06:2022/BXD – Quy chuẩn kỹ thuật quốc gia về an toàn cháy cho nhà và công trình',
      'QCVN 03:2023/BCA – Quy chuẩn kỹ thuật phương tiện phòng cháy và chữa cháy',
      'TCVN 9383:2012 – Thử nghiệm khả năng chịu lửa của cửa đi ngăn cháy',
    ],
    contextIntro:
      'Công trình Bệnh viện Tim Hà Nội cơ sở 2 là cơ sở y tế chuyên khoa tuyến đầu, phục vụ khám chữa bệnh nội trú và điều trị chuyên sâu về tim mạch cho hàng nghìn lượt bệnh nhân mỗi ngày.',
    contextChallenge:
      'Đặc thù công trình bệnh viện đòi hỏi phương án ngăn cháy và ngăn khói cực kỳ nghiêm ngặt: hệ thống cửa phải khoanh vùng cháy tuyệt đối, không cho khói độc tràn vào khu buồng bệnh nội trú và phòng mổ. Đồng thời, cửa phải cách âm tốt, đóng mở êm nhẹ bằng tay co thủy lực, không phát ra tiếng động làm ảnh hưởng đến người bệnh đang điều trị.',
    suppliedItems: [
      {
        name: 'Cửa thép ngăn cháy 1 cánh tiêu chuẩn EI70',
        spec: 'Thép mạ điện cán nguội JIS G3141 dày 0.8/1.2mm, lõi cách nhiệt Magie Oxit (MgO) không sinh khói độc',
        locationScope: 'Lắp đặt tại các phòng kỹ thuật điện, phòng máy y tế và cửa thông tầng',
      },
      {
        name: 'Cửa thép ngăn cháy 2 cánh tiêu chuẩn EI90',
        spec: 'Kích thước lọt lòng rộng rãi, thép cánh 1.0mm, khung 1.4mm tăng cứng, chịu lửa và ngăn nhiệt 90 phút',
        locationScope: 'Lắp đặt tại sảnh tầng, hành lang phân khoang cháy và lối vào buồng thang bộ thoát hiểm',
      },
      {
        name: 'Hệ phụ kiện Inox 304 & Tay co thủy lực đồng bộ',
        spec: 'Bản lề Inox SUS304 4 vòng bi chịu tải, tay co thủy lực King tự động đóng êm, khóa tay gạt Inox an toàn',
        locationScope: 'Lắp đặt đồng bộ 100% các bộ cửa trong khuôn viên bệnh viện',
      },
      {
        name: 'Gioăng giảm chấn & Gioăng ngăn khói nở nhiệt',
        spec: 'Gioăng cao su EPDM giảm chấn chống ồn kết hợp gioăng than chì trương nở tự phồng kín khe khi gặp nhiệt độ cao',
        locationScope: 'Chân cửa và hèm khung toàn bộ hệ thống cửa',
      },
    ],
    installationNotes: [
      'Khảo sát và đo đạc kích thước ô chờ tường xây thực tế trước khi sản xuất, đảm bảo lắp đặt chuẩn xác từng milimet.',
      'Bơm keo bọt PCCC chống cháy trương nở và chèn kín khe hở kỹ thuật giữa khung thép và tường xây.',
      'Cân chỉnh hành trình đóng mở của tay co thủy lực để cửa tự đóng kín nhưng nhẹ nhàng, phù hợp di chuyển cáng bệnh nhân.',
    ],
    photoStory: [
      {
        url: bvTim1,
        title: 'Mặt trước khối nhà điều trị Bệnh viện Tim Hà Nội cơ sở 2',
        caption: 'Hệ thống cửa thép ngăn cháy lắp đặt hoàn thiện tại các sảnh và lối thoát hiểm của bệnh viện.',
        tag: 'Toàn cảnh công trình',
      },
      {
        url: bvTim2,
        title: 'Cửa thép ngăn cháy 2 cánh EI90 tại hành lang sảnh tầng',
        caption: 'Cửa 2 cánh sơn tĩnh điện màu ghi sáng sạch sẽ, trang bị tay co thủy lực tự đóng kín an toàn.',
        tag: 'Hành lang thoát nạn',
      },
      {
        url: bvTim3,
        title: 'Cửa thép ngăn cháy 1 cánh EI70 lối buồng thang thoát hiểm',
        caption: 'Cửa buồng thang thoát hiểm mở một chiều theo hướng thoát nạn khẩn cấp của tòa nhà.',
        tag: 'Buồng thang bộ',
      },
      {
        url: bvTim4,
        title: 'Cửa thép chống cháy khu vực phòng kỹ thuật điện',
        caption: 'Bảo vệ an toàn cho phòng máy kỹ thuật và hệ thống tủ điện cấp nguồn y tế của bệnh viện.',
        tag: 'Phòng kỹ thuật',
      },
      {
        url: bvTim5,
        title: 'Chi tiết khóa tay gạt Inox và phụ kiện bản lề chịu tải',
        caption: 'Khóa cơ Inox SUS304 đóng mở nhẹ tay, kết hợp bản lề 4 vòng bi bền bỉ trên 100.000 lần đóng mở.',
        tag: 'Chi tiết phụ kiện',
      },
      {
        url: bvTim6,
        title: 'Kiểm tra độ kín khít gioăng ngăn khói chân cửa',
        caption: 'Gioăng cao su và doorsill Inox ngăn khói tràn sang các buồng bệnh lân cận khi có sự cố.',
        tag: 'Nghiệm thu hiện trường',
      },
      {
        url: bvTim7,
        title: 'Bàn giao hoàn thành hệ thống cửa ngăn cháy tại bệnh viện',
        caption: 'Hội đồng nghiệm thu kiểm tra thực tế và ký kết biên bản bàn giao đưa vào khai thác sử dụng.',
        tag: 'Bàn giao sử dụng',
      },
    ],
    acceptanceResult:
      'Công trình đã được nghiệm thu hoàn thành toàn bộ khối lượng cửa ngăn cháy, đạt 100% tiêu chí kiểm định PCCC theo quy chuẩn QCVN 06:2022/BXD, bàn giao cho Bệnh viện Tim Hà Nội đưa vào khai thác sử dụng an toàn.',
    acceptanceDate: 'Tháng 4 năm 2026',
    warrantyPeriod: 'Bảo hành kết cấu khung cánh 36 tháng, bảo hành phụ kiện 24 tháng',
  },

  // 2. Học viện Hậu Cần
  'hoc-vien-hau-can': {
    slug: 'hoc-vien-hau-can',
    title: 'Học viện Hậu Cần',
    clientName: 'Học viện Hậu Cần',
    generalContractor: 'Tổng công ty 789 – Bộ Quốc Phòng',
    location: 'Phường Ngọc Thụy, Quận Long Biên, TP. Hà Nội',
    completedYear: 2026,
    tenderPackage: 'Cung cấp, thi công lắp đặt và nghiệm thu hoàn thành toàn bộ hệ thống cửa thép chống cháy tiêu chuẩn EI',
    category: 'cua-thep-ngan-chay',
    standards: [
      'QCVN 06:2022/BXD – Quy chuẩn kỹ thuật quốc gia về an toàn cháy cho nhà và công trình',
      'QCVN 03:2023/BCA – Quy chuẩn kỹ thuật về phương tiện phòng cháy và chữa cháy',
      'TCVN 9383:2012 – Thử nghiệm khả năng chịu lửa của cửa ngăn cháy',
    ],
    contextIntro:
      'Dự án Tòa nhà đa năng KV I thuộc Học viện Hậu Cần là công trình giảng đường, hội trường huấn luyện và chỉ huy tác chiến quy mô lớn của Bộ Quốc Phòng.',
    contextChallenge:
      'Với quy mô tập trung hàng nghìn cán bộ, giảng viên và học viên quân sự, công trình đòi hỏi hệ thống cửa thoát hiểm phải có kết cấu thép đặc biệt kiên cố, chịu được va đập mạnh, lưu lượng thoát nạn khẩn cấp lớn và đáp ứng đầy đủ tiêu chuẩn kiểm định nghiệm thu PCCC của quân đội và nhà nước.',
    suppliedItems: [
      {
        name: 'Cửa thép ngăn cháy 2 cánh tiêu chuẩn EI90 & EI120',
        spec: 'Thép mạ kẽm cánh dày 1.0mm, khung dày 1.4mm tăng cứng, lõi Magie Oxit tỷ trọng cao chịu nhiệt trên 1000°C',
        locationScope: 'Lối thoát nạn hội trường lớn, sảnh tầng và cửa khoang cháy tầng hầm để xe',
      },
      {
        name: 'Cửa thép ngăn cháy 1 cánh tiêu chuẩn EI70',
        spec: 'Cánh dày 50mm, bề mặt sơn tĩnh điện màu ghi xám quân đội, chịu va đập cơ học cao',
        locationScope: 'Phòng trạm biến áp, phòng máy bơm PCCC và buồng kỹ thuật',
      },
      {
        name: 'Hệ thống thanh thoát hiểm Panic Bar Inox 304',
        spec: 'Thanh đẩy thoát hiểm một chiều Inox SUS304, mở cửa tức thì khi có lực đẩy nhẹ trong tình huống khẩn cấp',
        locationScope: 'Toàn bộ các lối ra buồng thang bộ thoát hiểm hội trường',
      },
      {
        name: 'Tay co thủy lực tải trọng nặng & Chốt âm cánh phụ',
        spec: 'Tay co thủy lực chịu tải 85–120kg, chốt âm Inox định vị cánh phụ vững chãi khi có gió lốc',
        locationScope: 'Đồng bộ cho các bộ cửa 2 cánh đại sảnh',
      },
    ],
    installationNotes: [
      'Tiến độ thi công thần tốc, tăng ca lắp đặt hoàn thành toàn bộ gói thầu trước thời hạn yêu cầu của Tổng thầu 789.',
      'Sử dụng bản lề Inox SUS304 4 vòng bi chịu tải trọng nặng, chống hiện tượng xệ cánh khi sử dụng cường độ cao.',
      'Hồ sơ đốt mẫu thử nghiệm và giấy kiểm định phương tiện PCCC hợp quy được chuẩn bị đầy đủ trước ngày nghiệm thu.',
    ],
    photoStory: [
      {
        url: hvhc1,
        title: 'Cửa thép ngăn cháy 2 cánh EI90 lối thoát hiểm sảnh hội trường',
        caption: 'Quy cách cửa 2 cánh rộng rãi, đáp ứng lưu lượng thoát nạn đông đảo của hội trường huấn luyện.',
        tag: 'Hội trường chính',
      },
      {
        url: hvhc2,
        title: 'Lắp đặt cửa thép ngăn cháy tại buồng thang bộ thoát nạn',
        caption: 'Cửa trang bị thanh thoát hiểm panic bar và tay co thủy lực tự động đóng kín bảo vệ buồng thang.',
        tag: 'Buồng thang bộ',
      },
      {
        url: hvhc3,
        title: 'Cửa thép chống cháy EI120 khoang kỹ thuật tầng hầm',
        caption: 'Giới hạn chịu lửa 120 phút ngăn chặn hoàn toàn nguy cơ cháy lan từ tầng hầm lên các tầng trên.',
        tag: 'Tầng hầm kỹ thuật',
      },
      {
        url: hvhc4,
        title: 'Cửa thép ngăn cháy 1 cánh phòng trạm biến áp',
        caption: 'Bảo vệ an toàn cho phòng máy biến áp trung thế và phòng điều khiển điện của tòa nhà.',
        tag: 'Phòng trạm điện',
      },
      {
        url: hvhc5,
        title: 'Chi tiết thanh thoát hiểm Panic Bar Inox SUS304',
        caption: 'Thanh thoát hiểm thao tác nhạy bén, mở cửa tức thì bằng lực đẩy một chạm từ bên trong.',
        tag: 'Chi tiết phụ kiện',
      },
      {
        url: hvhc6,
        title: 'Cân chỉnh bản lề và kiểm tra độ êm khi đóng cửa',
        caption: 'Kỹ sư APEX trực tiếp căn chỉnh khe hở đạt chuẩn dưới 3mm trước khi bàn giao.',
        tag: 'Thi công lắp đặt',
      },
      {
        url: hvhc7,
        title: 'Công tác chèn keo bọt PCCC trương nở chống cháy quanh khung',
        caption: 'Bơm keo bọt chống cháy bịt kín 100% khe ô chờ tường xây theo đúng tiêu chuẩn PCCC.',
        tag: 'Kỹ thuật chèn khe',
      },
      {
        url: hvhc8,
        title: 'Nghiệm thu hoàn thành 3 bên tại công trình',
        caption: 'Đại diện Chủ đầu tư Học viện Hậu Cần, Tổng thầu 789 và APEX nghiệm thu bàn giao.',
        tag: 'Nghiệm thu hoàn thành',
      },
    ],
    acceptanceResult:
      'Biên bản nghiệm thu hoàn thành bàn giao gói thầu ký kết ngày 22/05/2026 giữa Học viện Hậu Cần, Tổng công ty 789 và APEX Việt Nam. Toàn bộ hệ thống cửa đạt 100% tiêu chuẩn nghiệm thu PCCC.',
    acceptanceDate: 'Ngày 22 tháng 5 năm 2026',
    warrantyPeriod: 'Bảo hành kết cấu 36 tháng, bảo hành phụ kiện 24 tháng',
  },

  // 3. Nhà làm việc 9 tầng Công ty Điện lực Yên Bái
  'cong-ty-dien-luc-yen-bai': {
    slug: 'cong-ty-dien-luc-yen-bai',
    title: 'Nhà làm việc 9 tầng công ty Điện lực Yên Bái',
    clientName: 'Công ty Điện lực Yên Bái (EVNNPC)',
    generalContractor: 'Công ty Cổ phần Xây dựng Điện lực',
    location: 'TP. Yên Bái, Tỉnh Yên Bái',
    completedYear: 2026,
    tenderPackage: 'Sản xuất, cung cấp và lắp đặt cửa thép chống cháy sảnh tầng, buồng thang thoát hiểm và phòng máy kỹ thuật',
    category: 'cua-thep-ngan-chay',
    standards: [
      'QCVN 06:2022/BXD – Quy chuẩn an toàn cháy cho nhà và công trình',
      'TCVN 9383:2012 – Thử nghiệm khả năng chịu lửa cửa ngăn cháy',
      'Tiêu chuẩn kỹ thuật ngành Điện lực Việt Nam (EVN)',
    ],
    contextIntro:
      'Tòa nhà làm việc 9 tầng Công ty Điện lực Yên Bái là trung tâm điều hành lưới điện và trụ sở làm việc chính của ngành điện lực trên địa bàn toàn tỉnh Yên Bái.',
    contextChallenge:
      'Công trình đòi hỏi mức độ an toàn PCCC tuyệt đối để bảo vệ trung tâm điều độ thông tin và hệ thống máy chủ điện lực vận hành liên tục 24/7. Các cửa chống cháy phải ngăn nhiệt hiệu quả, gioăng chống khói kín khít, chịu được áp lực gió vùng cao và bền màu sơn tĩnh điện qua nhiều năm sử dụng.',
    suppliedItems: [
      {
        name: 'Cửa thép ngăn cháy 1 cánh tiêu chuẩn EI70',
        spec: 'Thép mạ điện cánh dày 0.8mm, khung 1.2mm, lõi Magie Oxit cách nhiệt, sơn tĩnh điện màu ghi sáng',
        locationScope: 'Lắp đặt tại các phòng làm việc chuyên môn, phòng kỹ thuật CNTT và buồng thang',
      },
      {
        name: 'Cửa thép ngăn cháy 2 cánh tiêu chuẩn EI90',
        spec: 'Kích thước theo ô chờ thực tế, thép cánh 1.0mm, khung 1.4mm tăng cứng, chịu lửa 90 phút',
        locationScope: 'Cửa phân khoang cháy hành lang các tầng 1 đến tầng 9 và lối thoát nạn khẩn cấp',
      },
      {
        name: 'Cửa phòng trạm biến áp và máy phát điện dự phòng',
        spec: 'Cửa thép gia cường chịu nhiệt cao, trang bị tay co thủy lực tải trọng lớn và khóa an toàn',
        locationScope: 'Khu vực tầng hầm kỹ thuật và trạm nguồn dự phòng',
      },
      {
        name: 'Phụ kiện PCCC Inox SUS304 đồng bộ',
        spec: 'Bản lề Inox 304 4 vòng bi, tay co thủy lực King tự đóng, khóa cơ an toàn Inox 304, doorsill ngăn khói',
        locationScope: 'Lắp đặt đồng bộ cho toàn bộ 9 tầng tòa nhà',
      },
    ],
    installationNotes: [
      'Đo đạc kích thước từng ô chờ cửa thực tế tại công trình Yên Bái trước khi tiến hành gia công tại xưởng.',
      'Vận chuyển đường dài bảo đảm bao bọc kỹ lưỡng, không trầy xước bề mặt sơn tĩnh điện.',
      'Lắp dựng đúng chuẩn tim cốt xây dựng, đóng mở nhẹ nhàng, độ kín khít khe hở đạt tiêu chuẩn PCCC.',
    ],
    photoStory: [
      {
        url: dlyb1,
        title: 'Mặt trước tòa nhà làm việc 9 tầng Công ty Điện lực Yên Bái',
        caption: 'Trụ sở điều hành khang trang, hiện đại của ngành điện lực tỉnh Yên Bái.',
        tag: 'Toàn cảnh công trình',
      },
      {
        url: dlyb2,
        title: 'Cửa thép chống cháy 2 cánh EI90 sảnh hành lang tầng làm việc',
        caption: 'Hệ thống cửa 2 cánh hoàn thiện màu ghi sáng đồng bộ với nội thất văn phòng làm việc.',
        tag: 'Sảnh hành lang',
      },
      {
        url: dlyb3,
        title: 'Cửa thép ngăn cháy 1 cánh lối buồng thang thoát hiểm',
        caption: 'Cửa buồng thang trang bị tay co thủy lực đảm bảo luôn ở trạng thái đóng kín an toàn.',
        tag: 'Buồng thang bộ',
      },
      {
        url: dlyb4,
        title: 'Cửa phòng kỹ thuật điện và điều độ thông tin lưới điện',
        caption: 'Ngăn cách an toàn phòng máy chủ và hệ thống điều hành viễn thông điện lực.',
        tag: 'Phòng kỹ thuật',
      },
      {
        url: dlyb5,
        title: 'Cửa thép chống cháy khu vực tầng hầm và máy phát điện',
        caption: 'Chịu nhiệt độ cao, ngăn khói độc xâm nhập hành lang khi chạy máy phát dự phòng.',
        tag: 'Khu vực kỹ thuật ngầm',
      },
      {
        url: dlyb6,
        title: 'Chi tiết phụ kiện bản lề Inox 304 và gioăng cao su giảm chấn',
        caption: 'Bản lề Inox 4 vòng bi chịu tải, đóng mở êm nhẹ và không phát ra tiếng ồn văn phòng.',
        tag: 'Chi tiết phụ kiện',
      },
      {
        url: dlyb7,
        title: 'Kiểm tra độ cân chỉnh hèm cửa và tay co thủy lực',
        caption: 'Căn chỉnh lực đóng cửa vừa phải, đảm bảo đóng kín hèm nhưng không kẹp tay người sử dụng.',
        tag: 'Căn chỉnh hoàn thiện',
      },
      {
        url: dlyb8,
        title: 'Bàn giao đưa công trình vào sử dụng chính thức',
        caption: 'Nghiệm thu hoàn thành với Ban quản lý dự án Điện lực Yên Bái, bàn giao vận hành an toàn.',
        tag: 'Nghiệm thu bàn giao',
      },
    ],
    acceptanceResult:
      'Hạng mục cửa thép ngăn cháy tại Nhà làm việc 9 tầng Công ty Điện lực Yên Bái đã được nghiệm thu hoàn thành, đạt đầy đủ chứng chỉ kiểm định PCCC và bàn giao đưa vào phục vụ công tác điều hành lưới điện an toàn.',
    acceptanceDate: 'Tháng 3 năm 2026',
    warrantyPeriod: 'Bảo hành 36 tháng cho kết cấu cửa và 24 tháng cho phụ kiện',
  },

  // 4. Nhà máy Astarte Việt Nam
  'nha-may-astarte-viet-nam': {
    slug: 'nha-may-astarte-viet-nam',
    title: 'Nhà máy Astarte Việt Nam',
    clientName: 'Công ty TNHH Astarte Việt Nam',
    generalContractor: 'Tổng thầu Xây dựng Công nghiệp',
    location: 'Khu công nghiệp, Tỉnh Hưng Yên',
    completedYear: 2026,
    tenderPackage: 'Cung cấp và lắp đặt trọn gói hệ thống cửa thép ngăn cháy nhà xưởng sản xuất và kho nguyên liệu',
    category: 'cua-thep-ngan-chay',
    standards: [
      'QCVN 06:2022/BXD – An toàn cháy cho nhà và công trình sản xuất công nghiệp',
      'TCVN 9383:2012 – Thử nghiệm khả năng chịu lửa cửa ngăn cháy',
      'Tiêu chuẩn an toàn PCCC nhà xưởng FDI',
    ],
    contextIntro:
      'Nhà máy Astarte Việt Nam là dự án sản xuất công nghiệp hiện đại có vốn đầu tư nước ngoài (FDI), quy mô nhiều phân xưởng sản xuất, kho bãi thành phẩm và khu văn phòng điều hành.',
    contextChallenge:
      'Môi trường nhà xưởng sản xuất công nghiệp có mật độ thiết bị máy móc cao, lượng vật liệu dễ cháy lớn và yêu cầu xuất nhập hàng liên tục. Do đó, hệ thống cửa ngăn cháy phải đáp ứng tiêu chuẩn chịu lửa khắt khe EI60 – EI90, kích thước lớn cho xe nâng di chuyển, khả năng đóng mở bền bỉ với tần suất cao và ngăn cháy lan giữa các phân xưởng.',
    suppliedItems: [
      {
        name: 'Cửa thép ngăn cháy 2 cánh kích thước lớn nhà xưởng',
        spec: 'Kích thước ô chờ lớn phục vụ vận chuyển hàng hóa, thép cánh 1.0mm gia cường, khung 1.5mm, chịu lửa 90 phút',
        locationScope: 'Lối thông giữa các phân xưởng sản xuất và kho chứa nguyên phụ liệu',
      },
      {
        name: 'Cửa thép thoát hiểm công nhân 1 cánh EI70',
        spec: 'Cánh dày 50mm, trang bị thanh thoát hiểm panic bar một chiều cho phép thoát nạn nhanh chóng khi có còi báo động',
        locationScope: 'Các cửa thoát hiểm khẩn cấp bố trí dọc theo chu vi nhà xưởng',
      },
      {
        name: 'Cửa thép ngăn cháy khu văn phòng điều hành nhà máy',
        spec: 'Sơn tĩnh điện chất lượng cao màu ghi xám hiện đại, cách âm tốt, gioăng cao su giảm chấn',
        locationScope: 'Khu vực văn phòng, phòng thí nghiệm QA/QC và phòng máy chủ nhà máy',
      },
      {
        name: 'Hệ phụ kiện công nghiệp chịu tải nặng',
        spec: 'Bản lề Inox SUS304 4 vòng bi loại lớn, tay co thủy lực King công nghiệp, thanh panic bar Inox 304',
        locationScope: 'Đồng bộ cho 100% cửa trong toàn bộ khuôn viên nhà máy',
      },
    ],
    installationNotes: [
      'Gia công cửa kích thước lớn đòi hỏi kết cấu khung hàn tăng cứng vững chắc, chống cong vênh khi chịu va chạm cơ học.',
      'Sơn tĩnh điện dày 80 micron chịu được môi trường nhà xưởng công nghiệp, chống ăn mòn hóa chất nhẹ.',
      'Lắp đặt hoàn thiện đồng bộ cùng tiến độ xây lắp nhà xưởng của Tổng thầu, bàn giao hồ sơ nghiệm thu đúng cam kết.',
    ],
    photoStory: [
      {
        url: astarte1,
        title: 'Toàn cảnh phân xưởng sản xuất Nhà máy Astarte Việt Nam',
        caption: 'Hệ thống cửa thép ngăn cháy lắp đặt hoàn thiện phân vùng khoang cháy nhà xưởng sản xuất.',
        tag: 'Khu vực nhà xưởng',
      },
      {
        url: astarte2,
        title: 'Cửa thép ngăn cháy 2 cánh kích thước lớn phân vùng xưởng',
        caption: 'Quy cách cửa rộng rãi, thuận tiện xe nâng di chuyển vật tư giữa các khu vực sản xuất.',
        tag: 'Lối thông phân xưởng',
      },
      {
        url: astarte3,
        title: 'Cửa thoát hiểm công nhân trang bị thanh Panic Bar',
        caption: 'Thanh đẩy panic bar một chiều trợ lực thoát hiểm an toàn khi xảy ra sự cố khẩn cấp.',
        tag: 'Cửa thoát hiểm',
      },
      {
        url: astarte4,
        title: 'Cửa thép chống cháy lối kho nguyên vật liệu',
        caption: 'Khoanh vùng bảo vệ an toàn kho chứa nguyên liệu phục vụ dây chuyền sản xuất.',
        tag: 'Kho nguyên liệu',
      },
      {
        url: astarte5,
        title: 'Cửa ngăn cháy khu vực văn phòng và phòng kiểm tra chất lượng',
        caption: 'Bề mặt sơn tĩnh điện màu ghi sáng sang trọng, cách âm tốt và ngăn khói hiệu quả.',
        tag: 'Khu văn phòng xưởng',
      },
      {
        url: astarte6,
        title: 'Chi tiết bản lề Inox SUS304 4 vòng bi công nghiệp',
        caption: 'Bản lề chịu tải trọng lớn, hoạt động bền bỉ với tần suất đóng mở liên tục hàng ngày.',
        tag: 'Chi tiết phụ kiện',
      },
      {
        url: astarte7,
        title: 'Công tác chèn keo bọt PCCC và bắn silicon hoàn thiện',
        caption: 'Bịt kín 100% khe hở kỹ thuật đảm bảo khả năng ngăn lửa và ngăn khói độc lan sang phân xưởng khác.',
        tag: 'Kỹ thuật chèn khe',
      },
      {
        url: astarte8,
        title: 'Nghiệm thu hoàn thành bàn giao cho Ban quản lý Nhà máy Astarte',
        caption: 'Hội đồng nghiệm thu kiểm tra thực tế các bài test đóng mở và nghiệm thu bàn giao đưa vào hoạt động.',
        tag: 'Nghiệm thu bàn giao',
      },
    ],
    acceptanceResult:
      'Gói thầu cửa ngăn cháy tại Nhà máy Astarte Việt Nam đã được nghiệm thu hoàn thành, vượt qua kỳ kiểm tra PCCC của cơ quan chức năng và bàn giao đúng tiến độ phục vụ kế hoạch khánh thành nhà máy.',
    acceptanceDate: 'Tháng 5 năm 2026',
    warrantyPeriod: 'Bảo hành kết cấu 36 tháng, bảo hành phụ kiện 24 tháng',
  },

  // 5. Viện kiểm sát nhân dân tỉnh Quảng Ninh
  'vien-kiem-sat-tinh-quang-ninh': {
    slug: 'vien-kiem-sat-tinh-quang-ninh',
    title: 'Viện kiểm sát nhân dân tỉnh Quảng Ninh',
    clientName: 'Viện kiểm sát nhân dân tỉnh Quảng Ninh',
    generalContractor: 'Ban quản lý dự án công trình cơ quan nhà nước',
    location: 'Phường Hồng Hà, TP. Hạ Long, Tỉnh Quảng Ninh',
    completedYear: 2026,
    tenderPackage: 'Cung cấp và lắp đặt hoàn thiện hệ thống cửa thép ngăn cháy sảnh, buồng thang và kho lưu trữ hồ sơ',
    category: 'cua-thep-ngan-chay',
    standards: [
      'QCVN 06:2022/BXD – Quy chuẩn kỹ thuật an toàn cháy cho nhà và công trình',
      'QCVN 03:2023/BCA – Quy chuẩn phương tiện phòng cháy và chữa cháy',
      'TCVN 9383:2012 – Thử nghiệm khả năng chịu lửa của cửa đi ngăn cháy',
    ],
    contextIntro:
      'Trụ sở Viện kiểm sát nhân dân tỉnh Quảng Ninh là công trình cơ quan tư pháp trọng điểm tọa lạc tại TP. Hạ Long, nơi làm việc và lưu trữ khối lượng lớn tài liệu, hồ sơ nghiệp vụ quan trọng.',
    contextChallenge:
      'Công trình đòi hỏi hệ thống cửa ngăn cháy không chỉ đạt giới hạn chịu lửa khắt khe theo QCVN 06:2022/BXD mà còn phải đáp ứng khả năng cách âm, chống ồn, an ninh bảo mật và bề mặt sơn tĩnh điện dày chống oxy hóa trước khí hậu ven biển Hạ Long có nồng độ muối cao.',
    suppliedItems: [
      {
        name: 'Cửa thép ngăn cháy 1 cánh tiêu chuẩn EI70',
        spec: 'Cánh dày 50mm, thép mạ điện cán nguội JIS G3141 dày 0.8/1.2mm, lõi Magie Oxit cách nhiệt chống cháy',
        locationScope: 'Lắp đặt tại các phòng làm việc chuyên môn, phòng kỹ thuật và kho lưu trữ hồ sơ nghiệp vụ',
      },
      {
        name: 'Cửa thép ngăn cháy 2 cánh tiêu chuẩn EI90',
        spec: 'Kích thước chuẩn thoát nạn, thép cánh 1.0mm, khung 1.4mm tăng cứng, chịu lửa và ngăn nhiệt 90 phút',
        locationScope: 'Lắp đặt tại sảnh tầng, cửa phân khoang cháy hành lang và buồng thang bộ thoát hiểm',
      },
      {
        name: 'Hệ phụ kiện Inox 304 & Khóa an toàn đồng bộ',
        spec: 'Bản lề Inox SUS304 4 vòng bi chịu tải, khóa tay gạt an toàn Inox 304, tay co thủy lực King tự đóng',
        locationScope: 'Đồng bộ cho 100% các bộ cửa trong tòa nhà',
      },
      {
        name: 'Doorsill Inox & Gioăng ngăn khói trương nở',
        spec: 'Doorsill ngăn khói chân cửa, gioăng giảm chấn EPDM kết hợp gioăng than chì trương nở tự phồng kín khe',
        locationScope: 'Khu vực cầu thang thoát nạn và các phòng kỹ thuật',
      },
    ],
    installationNotes: [
      'Đo đạc ô chờ thực tế tại hiện trường công trình Hạ Long, độ hở khe mép đồng đều dưới 3mm.',
      'Sơn tĩnh điện chất lượng cao màu ghi sáng, chống trầy xước và chống ăn mòn hơi muối biển.',
      'Toàn bộ tay co thủy lực và khóa cửa hoạt động đóng mở êm nhẹ, tự động đưa cửa về vị trí đóng kín an toàn.',
    ],
    photoStory: [
      {
        url: vks1,
        title: 'Mặt trước trụ sở Viện kiểm sát nhân dân tỉnh Quảng Ninh',
        caption: 'Hệ thống cửa thép ngăn cháy hoàn thiện đồng bộ kiến trúc ngoại thất công trình.',
        tag: 'Toàn cảnh công trình',
      },
      {
        url: vks2,
        title: 'Cửa thép ngăn cháy 2 cánh EI90 lối buồng thang thoát nạn',
        caption: 'Thiết kế 2 cánh mở thoát nạn hành lang, trang bị tay co thủy lực tự động đóng kín.',
        tag: 'Buồng thang thoát nạn',
      },
      {
        url: vks3,
        title: 'Cửa thép chống cháy EI70 kho lưu trữ hồ sơ nghiệp vụ',
        caption: 'Đảm bảo khả năng cách nhiệt và ngăn khói bảo vệ an toàn kho tài liệu hành chính.',
        tag: 'Kho tài liệu nghiệp vụ',
      },
      {
        url: vks4,
        title: 'Chi tiết phụ kiện bản lề Inox 304 và khóa an toàn',
        caption: 'Phụ kiện Inox SUS304 4 vòng bi chịu lực, vận hành êm nhẹ và bền bỉ trong môi trường ven biển.',
        tag: 'Chi tiết phụ kiện',
      },
      {
        url: vks5,
        title: 'Kiểm tra độ khít hèm cửa và gioăng ngăn khói',
        caption: 'Gioăng cao su EPDM kết hợp gioăng than chì nở nhiệt tự phồng bịt kín khe cửa khi gặp nhiệt độ cao.',
        tag: 'Kiểm tra kỹ thuật',
      },
      {
        url: vks6,
        title: 'Công tác chèn keo bọt PCCC chống cháy ô chờ tường xây',
        caption: 'Bơm keo bọt PCCC trương nở chống cháy chuyên dụng bịt kín 100% khe hở ô chờ.',
        tag: 'Kỹ thuật chèn khe',
      },
      {
        url: vks7,
        title: 'Bàn giao đưa hệ thống cửa ngăn cháy vào sử dụng',
        caption: 'Biên bản nghiệm thu hoàn thành ký kết giữa Chủ đầu tư và APEX Việt Nam, bàn giao vận hành an toàn.',
        tag: 'Bàn giao sử dụng',
      },
    ],
    acceptanceResult:
      'Gói thầu được APEX Việt Nam hoàn thành đúng tiến độ cam kết, đáp ứng đầy đủ các tiêu chuẩn kỹ thuật khắt khe của ngành tư pháp và cơ quan Cảnh sát PCCC. Công trình bàn giao đảm bảo an toàn vận hành cho Viện kiểm sát nhân dân tỉnh Quảng Ninh.',
    acceptanceDate: 'Tháng 5 năm 2026',
    warrantyPeriod: 'Bảo hành kết cấu khung cánh 36 tháng, bảo hành phụ kiện 24 tháng',
  },
};

/**
 * Hàm lấy case study cho một dự án bất kỳ.
 * Nếu đã có biên tập chi tiết trong PROJECT_CASE_STUDIES thì trả về case study đó.
 * Nếu là dự án mới thì tự sinh case study thuần Việt chuẩn xác.
 */
export function getProjectCaseStudy(project: Project): ProjectCaseStudy {
  const slug = project.slug || project.id;
  if (PROJECT_CASE_STUDIES[slug]) {
    return PROJECT_CASE_STUDIES[slug];
  }

  // Fallback sinh động case study thuần Việt cho bất kỳ dự án nào sau này
  const categoryName = PRODUCT_CATEGORY_LABELS[project.category] || project.categoryLabel || project.category || 'Cửa ngăn cháy';
  const cover = project.coverImage || project.image || vks1;
  const gallery = Array.isArray(project.gallery) && project.gallery.length > 0 ? project.gallery : [cover];

  return {
    slug,
    title: project.title,
    clientName: project.clientName || 'Chủ đầu tư công trình',
    generalContractor: project.generalContractor || 'Tổng thầu xây dựng',
    location: project.location || 'Việt Nam',
    completedYear: project.completedYear || project.year ? Number(project.completedYear || project.year) : 2026,
    tenderPackage: project.apexRole || `Cung cấp và lắp đặt hệ thống ${categoryName.toLowerCase()} đạt chuẩn kiểm định PCCC`,
    category: project.category || 'cua-thep-ngan-chay',
    standards: [
      'QCVN 06:2022/BXD – An toàn cháy cho nhà và công trình',
      'QCVN 03:2023/BCA – Quy chuẩn phương tiện phòng cháy và chữa cháy',
      'TCVN 9383:2012 – Thử nghiệm khả năng chịu lửa của cửa ngăn cháy',
    ],
    contextIntro:
      `Công trình ${project.title} tại ${project.location} là dự án tiêu biểu được đầu tư xây dựng đồng bộ về hạ tầng và an toàn PCCC.`,
    contextChallenge:
      project.description ||
      `Công trình đòi hỏi hệ thống ${categoryName.toLowerCase()} chất lượng cao, gia công chuẩn xác theo ô chờ thực tế, đáp ứng đầy đủ yêu cầu thẩm duyệt PCCC và bàn giao đúng tiến độ cam kết.`,
    suppliedItems: [
      {
        name: `Hệ thống ${categoryName} tiêu chuẩn kiểm định EI`,
        spec: 'Gia công từ thép mạ điện cán nguội, lõi cách nhiệt chống cháy Magie Oxit (MgO), sơn tĩnh điện màu tiêu chuẩn',
        locationScope: 'Các vị trí lối thoát hiểm, sảnh tầng và phòng kỹ thuật',
      },
      {
        name: 'Hệ phụ kiện Inox 304 đồng bộ',
        spec: 'Bản lề Inox 304 4 vòng bi chịu tải, khóa tay gạt an toàn, tay co thủy lực tự đóng và thanh thoát hiểm',
        locationScope: 'Lắp đặt đồng bộ cho toàn bộ hệ thống cửa',
      },
      {
        name: 'Gioăng ngăn khói nở nhiệt & Keo bọt PCCC',
        spec: 'Gioăng giảm chấn kết hợp gioăng than chì nở nhiệt tự phồng kín khe cửa, bơm keo bọt PCCC chống cháy',
        locationScope: '100% các ô chờ lắp dựng',
      },
    ],
    installationNotes: [
      'Đo đạc ô chờ thực tế trước khi gia công, đảm bảo khe hở đều đẹp dưới 3mm.',
      'Sơn tĩnh điện bền màu, chống trầy xước và chịu được tác động môi trường.',
      'Bàn giao đầy đủ chứng chỉ xuất xưởng CO/CQ và hồ sơ kiểm định PCCC hợp quy.',
    ],
    photoStory: gallery.map((imgUrl, idx) => ({
      url: imgUrl,
      title: `Hình ảnh thi công thực tế tại công trình (${idx + 1})`,
      caption: `Ghi nhận quá trình lắp đặt và hoàn thiện hạng mục tại ${project.title}.`,
      tag: idx === 0 ? 'Toàn cảnh công trình' : 'Hiện trường thi công',
    })),
    acceptanceResult:
      project.verifiedNote ||
      `Hạng mục ${categoryName.toLowerCase()} tại dự án ${project.title} đã được nghiệm thu hoàn thành, đạt 100% tiêu chí kỹ thuật PCCC và bàn giao đưa vào vận hành an toàn.`,
    acceptanceDate: `Năm ${project.completedYear || project.year || 2026}`,
    warrantyPeriod: 'Bảo hành kết cấu 36 tháng, bảo hành phụ kiện 24 tháng',
  };
}
