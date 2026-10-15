-- Migration: Đồng bộ 5 dự án thực tế từ thư mục ảnh công trình của APEX
-- Xóa bỏ dự án mẫu cũ (prj-toa-an-quang-ninh) không thuộc 5 công trình thực tế
-- Cập nhật thông tin nghiệm thu, hình ảnh và slug chuẩn hóa 100% tiếng Việt

INSERT INTO projects (
  id, title, slug, client_name, general_contractor, apex_role, category, location, completed_year,
  description, cover_image, gallery, status, verified, verified_note, updated_at
) VALUES
(
  'prj-benh-vien-tim-hn',
  'Bệnh viện Tim Hà Nội cơ sở 2',
  'benh-vien-tim-ha-noi-co-so-2',
  'Bệnh viện Tim Hà Nội',
  'Ban quản lý dự án công trình y tế Hà Nội',
  'Cung cấp và lắp đặt cửa ngăn cháy phòng kỹ thuật và sảnh bệnh viện',
  'cua-thep-ngan-chay',
  'Tây Hồ, Hà Nội',
  2026,
  'Cung cấp và thi công hoàn thiện hệ thống cửa thép ngăn cháy tiêu chuẩn PCCC, cửa phòng kỹ thuật y tế tại Bệnh viện Tim Hà Nội cơ sở 2.',
  '/src/assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-1.webp',
  '["/src/assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-1.webp", "/src/assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-2.webp", "/src/assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-3.webp", "/src/assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-4.webp"]'::jsonb,
  'published',
  true,
  'Hồ sơ nghiệm thu hoàn thành bàn giao sử dụng',
  NOW()
),
(
  'prj-hoc-vien-hau-can',
  'Học viện Hậu Cần',
  'hoc-vien-hau-can',
  'Học viện Hậu Cần',
  'Tổng công ty 789/BQP',
  'Nghiệm thu hoàn thành gói cửa chống cháy',
  'cua-thep-ngan-chay',
  'Long Biên, Hà Nội',
  2026,
  'Cung cấp, lắp đặt và nghiệm thu hoàn thành toàn bộ hệ thống cửa thép chống cháy tiêu chuẩn EI tại Tòa nhà đa năng KV I - Học viện Hậu Cần.',
  '/src/assets/images/projects/hoc-vien-hau-can/photo-1.webp',
  '["/src/assets/images/projects/hoc-vien-hau-can/photo-1.webp", "/src/assets/images/projects/hoc-vien-hau-can/photo-2.webp", "/src/assets/images/projects/hoc-vien-hau-can/photo-3.webp", "/src/assets/images/projects/hoc-vien-hau-can/photo-4.webp"]'::jsonb,
  'published',
  true,
  'Biên bản nghiệm thu hoàn thành ngày 22/5/2026',
  NOW()
),
(
  'prj-dien-luc-yen-bai',
  'Nhà làm việc 9 tầng công ty Điện lực Yên Bái',
  'cong-ty-dien-luc-yen-bai',
  'Công ty Điện lực Yên Bái (EVNNPC)',
  'Công ty Cổ phần Xây dựng Điện lực',
  'Cung cấp và lắp đặt cửa thép chống cháy sảnh và buồng thang',
  'cua-thep-ngan-chay',
  'TP. Yên Bái, Yên Bái',
  2026,
  'Sản xuất, cung cấp và lắp đặt cửa thép chống cháy sảnh tầng, buồng thang thoát hiểm và phòng máy kỹ thuật Nhà làm việc 9 tầng Công ty Điện lực Yên Bái.',
  '/src/assets/images/projects/cong-ty-dien-luc-yen-bai/photo-1.webp',
  '["/src/assets/images/projects/cong-ty-dien-luc-yen-bai/photo-1.webp", "/src/assets/images/projects/cong-ty-dien-luc-yen-bai/photo-2.webp", "/src/assets/images/projects/cong-ty-dien-luc-yen-bai/photo-3.webp", "/src/assets/images/projects/cong-ty-dien-luc-yen-bai/photo-4.webp"]'::jsonb,
  'published',
  true,
  'Hồ sơ nghiệm thu bàn giao hệ thống cửa chống cháy hoàn thành',
  NOW()
),
(
  'prj-nha-may-astarte',
  'Nhà máy Astarte Việt Nam',
  'nha-may-astarte-viet-nam',
  'Công ty TNHH Astarte Việt Nam',
  'Tổng thầu Xây dựng Công nghiệp',
  'Cung cấp và lắp đặt cửa thép ngăn cháy nhà xưởng sản xuất',
  'cua-thep-ngan-chay',
  'Khu công nghiệp, Hưng Yên',
  2026,
  'Cung cấp và lắp đặt trọn gói hệ thống cửa thép ngăn cháy nhà xưởng sản xuất, kho nguyên liệu và phòng kỹ thuật Nhà máy Astarte Việt Nam.',
  '/src/assets/images/projects/nha-may-astarte-viet-nam/photo-1.webp',
  '["/src/assets/images/projects/nha-may-astarte-viet-nam/photo-1.webp", "/src/assets/images/projects/nha-may-astarte-viet-nam/photo-2.webp", "/src/assets/images/projects/nha-may-astarte-viet-nam/photo-3.webp", "/src/assets/images/projects/nha-may-astarte-viet-nam/photo-4.webp"]'::jsonb,
  'published',
  true,
  'Nghiệm thu hoàn thành bàn giao đưa vào hoạt động',
  NOW()
),
(
  'prj-vien-kiem-sat-quang-ninh',
  'Viện kiểm sát nhân dân tỉnh Quảng Ninh',
  'vien-kiem-sat-tinh-quang-ninh',
  'Viện kiểm sát nhân dân tỉnh Quảng Ninh',
  'Ban quản lý dự án công trình cơ quan nhà nước',
  'Cung cấp và lắp đặt cửa chống cháy sảnh và kho hồ sơ',
  'cua-thep-ngan-chay',
  'Hạ Long, Quảng Ninh',
  2026,
  'Gói thầu cung cấp và lắp đặt toàn bộ hệ thống cửa ngăn cháy tiêu chuẩn EI cho công trình Trụ sở Viện kiểm sát nhân dân tỉnh Quảng Ninh.',
  '/src/assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-1.webp',
  '["/src/assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-1.webp", "/src/assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-2.webp", "/src/assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-3.webp", "/src/assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-4.webp"]'::jsonb,
  'published',
  true,
  'Hồ sơ nghiệm thu bàn giao hệ thống cửa chống cháy hoàn thành',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  client_name = EXCLUDED.client_name,
  general_contractor = EXCLUDED.general_contractor,
  apex_role = EXCLUDED.apex_role,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  completed_year = EXCLUDED.completed_year,
  description = EXCLUDED.description,
  cover_image = EXCLUDED.cover_image,
  gallery = EXCLUDED.gallery,
  status = EXCLUDED.status,
  verified = EXCLUDED.verified,
  verified_note = EXCLUDED.verified_note,
  updated_at = NOW();

-- Xóa bỏ dự án mẫu cũ không có trong thư mục ảnh thực tế
DELETE FROM projects WHERE id = 'prj-toa-an-quang-ninh';
