-- ====================================================================
-- MIGRATION: 20261012_products_and_projects.sql
-- Thêm 9 dòng sản phẩm cố định & Bảng dự án tiêu biểu (projects)
-- ====================================================================

-- 1. Mở rộng bảng products
ALTER TABLE products ADD COLUMN IF NOT EXISTS certification_no TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS specs JSONB DEFAULT '{}'::jsonb;

-- Chuẩn hóa category cũ nếu có
UPDATE products SET category = 'cua-thep-ngan-chay' WHERE category IN ('steel-door', 'cua-thep');
UPDATE products SET category = 'cua-kinh-ngan-chay' WHERE category IN ('glass-door', 'cua-kinh');
UPDATE products SET category = 'cua-cuon-ngan-chay' WHERE category IN ('roller-shutter', 'cua-cuon');
UPDATE products SET category = 'rem-ngan-chay' WHERE category IN ('fire-curtain', 'rem-ngan-khoi');
UPDATE products SET category = 'tu-dien' WHERE category IN ('accessories', 'phu-kien');

-- 9 category slug cố định, dùng check constraint để tránh gõ sai
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE products ADD CONSTRAINT products_category_check
  CHECK (category IN (
    'cua-thep-ngan-chay',
    'cua-kinh-ngan-chay',
    'cua-cuon-ngan-chay',
    'rem-ngan-chay',
    'tu-dien',
    'thang-mang-cap',
    'tu-rack',
    'nha-tram-shelter',
    'tu-nguon-outdoor'
  ));

-- 2. Tạo bảng projects (MỚI) — "Dự án tiêu biểu"
CREATE TABLE IF NOT EXISTS projects (
  id              VARCHAR(64) PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  client_name     TEXT,              -- để trống nếu khách hàng chưa đồng ý nêu tên
  category        TEXT,              -- liên kết tới 1 trong 9 category sản phẩm dùng trong dự án
  location        TEXT,
  completed_year  INTEGER,
  description     TEXT,
  cover_image     TEXT,
  gallery         JSONB DEFAULT '[]'::jsonb,
  status          VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'internal')),
  verified        BOOLEAN NOT NULL DEFAULT FALSE,   -- BẮT BUỘC true mới được public
  verified_note   TEXT,                              -- ghi chú ai xác nhận, ngày nào, theo văn bản nào
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects (slug);
CREATE INDEX IF NOT EXISTS idx_projects_verified ON projects (verified, status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects (category);

-- ====================================================================
-- 3. SEED DỮ LIỆU 9 DÒNG SẢN PHẨM APEX BAN ĐẦU
-- ====================================================================
INSERT INTO products (
  id, name, slug, category, category_name, fire_rating, certification_no,
  short_description, material, standard, warranty, specs,
  featured, status, sort_order, seo_title, seo_description, image_alt, price_estimate
) VALUES
(
  'cua-thep-ngan-chay',
  'Cửa Thép Ngăn Cháy',
  'cua-thep-ngan-chay',
  'cua-thep-ngan-chay',
  'Cửa thép ngăn cháy',
  NULL,
  NULL,
  'Cửa thép ngăn cháy APEX kết cấu thép tấm định hình vững chắc, lõi cách nhiệt chuyên dụng, ngăn lửa và ngăn khói lan giữa các khoang cháy theo tiêu chuẩn PCCC.',
  'Thép mạ kẽm độ dày theo hồ sơ thiết kế công trình',
  'QCVN 06:2022/BXD, TCVN 9383:2012',
  '12 - 24 tháng theo hợp đồng',
  '{"material":"Thép mạ kẽm độ dày theo hồ sơ thiết kế công trình","thickness":"Kích thước gia công theo khảo sát thực tế","insulation":"Lõi vật liệu cách nhiệt không cháy chuyên dụng","finish":"Sơn tĩnh điện bảng màu Jotun theo yêu cầu","standard":"QCVN 06:2022/BXD, TCVN 9383:2012","warranty":"12 - 24 tháng theo hợp đồng"}'::jsonb,
  true,
  'published',
  1,
  'Cửa Thép Ngăn Cháy | APEX Việt Nam',
  'Cửa thép ngăn cháy APEX kết cấu thép tấm định hình vững chắc, lõi cách nhiệt chuyên dụng.',
  'Cửa Thép Ngăn Cháy APEX',
  'Liên hệ'
),
(
  'cua-kinh-ngan-chay',
  'Cửa Kính Ngăn Cháy',
  'cua-kinh-ngan-chay',
  'cua-kinh-ngan-chay',
  'Cửa kính ngăn cháy',
  NULL,
  NULL,
  'Cửa kính ngăn cháy APEX kết hợp hệ khung chịu lực và kính ngăn lửa nhiều lớp, duy trì khả năng quan sát và lấy sáng tự nhiên đồng thời đảm bảo an toàn chịu nhiệt.',
  'Kính ngăn cháy chuyên dụng kết hợp khung thép hoặc Inox gia cường',
  'QCVN 06:2022/BXD, TCVN 9383:2012',
  '12 - 24 tháng theo hợp đồng',
  '{"material":"Kính ngăn cháy chuyên dụng kết hợp khung thép hoặc Inox gia cường","thickness":"Theo cấu hình kính và khẩu độ thiết kế","insulation":"Lớp hợp chất trương nở cách nhiệt trong suốt","finish":"Sơn tĩnh điện cao cấp hoặc Inox xước hairline","standard":"QCVN 06:2022/BXD, TCVN 9383:2012","warranty":"12 - 24 tháng theo hợp đồng"}'::jsonb,
  false,
  'published',
  2,
  'Cửa Kính Ngăn Cháy | APEX Việt Nam',
  'Cửa kính ngăn cháy APEX kết hợp hệ khung chịu lực và kính ngăn lửa nhiều lớp.',
  'Cửa Kính Ngăn Cháy APEX',
  'Liên hệ'
),
(
  'cua-cuon-ngan-chay',
  'Cửa Cuốn Ngăn Cháy',
  'cua-cuon-ngan-chay',
  'cua-cuon-ngan-chay',
  'Cửa cuốn ngăn cháy',
  NULL,
  NULL,
  'Cửa cuốn ngăn cháy siêu trường APEX che chắn các khoảng mở nhịp lớn, tự động kích hoạt đóng kín khi nhận tín hiệu báo cháy kết nối hệ thống điều khiển trung tâm.',
  'Nan thép mạ kẽm định hình chịu nhiệt, cấu trúc cách âm cách nhiệt',
  'QCVN 06:2022/BXD, TCVN 9383:2012',
  '12 - 24 tháng theo hợp đồng',
  '{"material":"Nan thép mạ kẽm định hình chịu nhiệt, cấu trúc cách âm cách nhiệt","thickness":"Sản xuất khẩu độ rộng theo khoảng mở công trình","insulation":"Lớp cách nhiệt chuyên dụng trong lòng nan","finish":"Sơn tĩnh điện công nghiệp kháng ăn mòn","standard":"QCVN 06:2022/BXD, TCVN 9383:2012","warranty":"12 - 24 tháng theo hợp đồng"}'::jsonb,
  true,
  'published',
  3,
  'Cửa Cuốn Ngăn Cháy | APEX Việt Nam',
  'Cửa cuốn ngăn cháy siêu trường APEX che chắn các khoảng mở nhịp lớn.',
  'Cửa Cuốn Ngăn Cháy APEX',
  'Liên hệ'
),
(
  'rem-ngan-chay',
  'Rèm Ngăn Cháy & Ngăn Khói Tự Động',
  'rem-ngan-chay',
  'rem-ngan-chay',
  'Rèm ngăn cháy',
  NULL,
  NULL,
  'Màn rèm ngăn cháy APEX cấu tạo từ sợi thủy tinh gia cường dây thép, trọng lượng nhẹ, giấu âm trần thẩm mỹ và tự động hạ xuống ngăn khói lửa khi xảy ra hỏa hoạn.',
  'Vải sợi thủy tinh kỹ thuật gia cường sợi thép không gỉ',
  'QCVN 06:2022/BXD, TCVN 9383:2012',
  '12 - 24 tháng theo hợp đồng',
  '{"material":"Vải sợi thủy tinh kỹ thuật gia cường sợi thép không gỉ","thickness":"Thiết kế theo kích thước ô thông tầng hoặc hành lang","insulation":"Lớp phủ phản xạ nhiệt và ngăn truyền khói độc","finish":"Hộp cuốn kỹ thuật sơn tĩnh điện lắp âm trần","standard":"QCVN 06:2022/BXD, TCVN 9383:2012","warranty":"12 - 24 tháng theo hợp đồng"}'::jsonb,
  true,
  'published',
  4,
  'Rèm Ngăn Cháy & Ngăn Khói Tự Động | APEX Việt Nam',
  'Màn rèm ngăn cháy APEX cấu tạo từ sợi thủy tinh gia cường dây thép.',
  'Rèm Ngăn Cháy APEX',
  'Liên hệ'
),
(
  'tu-dien',
  'Tủ Điện Phân Phối & Điều Khiển Công Nghiệp',
  'tu-dien',
  'tu-dien',
  'Tủ điện',
  NULL,
  NULL,
  'Vỏ tủ điện và hệ thống tủ phân phối hạ thế, tủ điều khiển máy bơm PCCC APEX chế tạo cơ khí chính xác, cấp bảo vệ IP cao và sơn tĩnh điện bền bỉ.',
  'Thép cán nguội mạ kẽm độ dày 1.5mm - 2.5mm',
  'TCVN 7994-1 (IEC 61439-1), Cấp bảo vệ IP43 - IP55',
  '12 - 24 tháng theo hợp đồng',
  '{"material":"Thép cán nguội mạ kẽm độ dày 1.5mm - 2.5mm","thickness":"Dạng module tự đứng hoặc treo tường theo sơ đồ đơn tuyến","insulation":"Sơn tĩnh điện chống ăn mòn và cách điện an toàn","finish":"Màu ghi sáng sần RAL 7032 / RAL 7035 tiêu chuẩn công nghiệp","standard":"TCVN 7994-1 (IEC 61439-1), Cấp bảo vệ IP43 - IP55","warranty":"12 - 24 tháng theo hợp đồng"}'::jsonb,
  false,
  'published',
  5,
  'Tủ Điện Phân Phối & Điều Khiển | APEX Việt Nam',
  'Vỏ tủ điện và hệ thống tủ phân phối hạ thế, tủ điều khiển máy bơm PCCC APEX.',
  'Tủ Điện APEX',
  'Liên hệ'
),
(
  'thang-mang-cap',
  'Thang Máng Cáp Điện & Khay Cáp Kỹ Thuật',
  'thang-mang-cap',
  'thang-mang-cap',
  'Thang máng cáp',
  NULL,
  NULL,
  'Hệ thống thang cáp, máng cáp và khay cáp APEX đột dập CNC chính xác, chịu tải trọng lớn, bảo vệ đường dây dẫn điện và cáp tín hiệu PCCC an toàn.',
  'Thép mạ kẽm, tôn tráng kẽm hoặc Inox 304 độ dày 1.2mm - 2.5mm',
  'TCVN 10688 (NEMA VE 1)',
  '12 - 24 tháng theo hợp đồng',
  '{"material":"Thép mạ kẽm, tôn tráng kẽm hoặc Inox 304 độ dày 1.2mm - 2.5mm","thickness":"Chiều dài tiêu chuẩn 2.500 mm - 3.000 mm / cây kèm nắp đậy","insulation":"Máng cáp (Trunking), Thang cáp (Cable Ladder), Khay cáp (Tray)","finish":"Sơn tĩnh điện hoặc mạ kẽm nhúng nóng theo môi trường sử dụng","standard":"TCVN 10688 (NEMA VE 1)","warranty":"12 - 24 tháng theo hợp đồng"}'::jsonb,
  false,
  'published',
  6,
  'Thang Máng Cáp Điện & Khay Cáp Kỹ Thuật | APEX Việt Nam',
  'Hệ thống thang cáp, máng cáp và khay cáp APEX đột dập CNC chính xác.',
  'Thang Máng Cáp APEX',
  'Liên hệ'
),
(
  'tu-rack',
  'Tủ Rack Mạng & Viễn Thông Server Rack',
  'tu-rack',
  'tu-rack',
  'Tủ rack',
  NULL,
  NULL,
  'Tủ mạng, tủ server rack APEX chuẩn 19 inch đa dạng kích thước (6U - 42U), tải trọng cao, thông gió tối ưu và bảo vệ an toàn cho thiết bị viễn thông.',
  'Thép cán nguội SPCC chất lượng cao, khung hàn liền hoặc lắp ghép',
  'Chuẩn 19 inch EIA-310-D, IEC 60297',
  '12 - 24 tháng theo hợp đồng',
  '{"material":"Thép cán nguội SPCC chất lượng cao, khung hàn liền hoặc lắp ghép","thickness":"Độ sâu D600, D800, D1000, D1200 mm; Chiều cao 6U đến 42U","insulation":"Tải trọng chịu lực lên tới 800 kg - 1.000 kg đối với tủ đứng","finish":"Sơn tĩnh điện màu đen cát hoặc ghi sáng chống trầy xước","standard":"Chuẩn 19 inch EIA-310-D, IEC 60297","warranty":"12 - 24 tháng theo hợp đồng"}'::jsonb,
  false,
  'published',
  7,
  'Tủ Rack Mạng & Viễn Thông Server Rack | APEX Việt Nam',
  'Tủ mạng, tủ server rack APEX chuẩn 19 inch đa dạng kích thước (6U - 42U).',
  'Tủ Rack APEX',
  'Liên hệ'
),
(
  'nha-tram-shelter',
  'Nhà Trạm Viễn Thông Shelter Tích Hợp',
  'nha-tram-shelter',
  'nha-tram-shelter',
  'Nhà trạm Shelter',
  NULL,
  NULL,
  'Nhà trạm Shelter APEX kết cấu sandwich panel cách nhiệt, kín nước, chống ăn mòn thời tiết, bảo vệ thiết bị truyền dẫn và nguồn điện tại các trạm BTS dã ngoại.',
  'Sandwich panel cách nhiệt lõi PU/PIR hoặc bông khoáng chống cháy',
  'TCVN kỹ thuật xây dựng nhà trạm viễn thông dã ngoại',
  '24 - 36 tháng theo hợp đồng',
  '{"material":"Sandwich panel cách nhiệt lõi PU/PIR hoặc bông khoáng chống cháy","thickness":"Khung thép mạ kẽm nhúng nóng liên kết module cơ động","insulation":"Hệ số truyền nhiệt thấp, bảo ôn duy trì nhiệt độ tối ưu","finish":"Tôn mạ màu chống chịu thời tiết, muối biển và bức xạ UV","standard":"TCVN kỹ thuật xây dựng nhà trạm viễn thông dã ngoại","warranty":"24 - 36 tháng theo hợp đồng"}'::jsonb,
  false,
  'published',
  8,
  'Nhà Trạm Viễn Thông Shelter Tích Hợp | APEX Việt Nam',
  'Nhà trạm Shelter APEX kết cấu sandwich panel cách nhiệt, kín nước.',
  'Nhà Trạm Shelter APEX',
  'Liên hệ'
),
(
  'tu-nguon-outdoor',
  'Tủ Nguồn Outdoor Chuyên Dụng Ngoài Trời',
  'tu-nguon-outdoor',
  'tu-nguon-outdoor',
  'Tủ nguồn Outdoor',
  NULL,
  NULL,
  'Tủ nguồn ngoài trời APEX kết cấu hai lớp vỏ cách nhiệt, cấp bảo vệ IP55/IP65, tích hợp điều hòa / quạt thông gió tản nhiệt, chống nước và chống bụi xâm nhập.',
  'Thép mạ kẽm hoặc Inox cấu trúc 2 lớp cách nhiệt',
  'Cấp bảo vệ kín khít IP55 / IP65 chống nước bụi',
  '12 - 24 tháng theo hợp đồng',
  '{"material":"Thép mạ kẽm hoặc Inox cấu trúc 2 lớp cách nhiệt","thickness":"Kích thước thiết kế theo dung lượng nguồn và ắc quy dự phòng","insulation":"Lớp đệm lưu thông khí động học giảm bức xạ nhiệt mặt trời","finish":"Sơn tĩnh điện ngoài trời chuyên dụng kháng tia cực tím","standard":"Cấp bảo vệ kín khít IP55 / IP65 chống nước bụi","warranty":"12 - 24 tháng theo hợp đồng"}'::jsonb,
  false,
  'published',
  9,
  'Tủ Nguồn Outdoor Chuyên Dụng Ngoài Trời | APEX Việt Nam',
  'Tủ nguồn ngoài trời APEX kết cấu hai lớp vỏ cách nhiệt, cấp bảo vệ IP55/IP65.',
  'Tủ Nguồn Outdoor APEX',
  'Liên hệ'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  category_name = EXCLUDED.category_name,
  short_description = EXCLUDED.short_description,
  material = EXCLUDED.material,
  standard = EXCLUDED.standard,
  warranty = EXCLUDED.warranty,
  specs = EXCLUDED.specs,
  status = EXCLUDED.status,
  updated_at = NOW();
