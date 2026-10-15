-- Migration: Nhập 3 dự án tiêu biểu thực tế đã nghiệm thu hoàn thành của APEX
-- Trạng thái: published, verified: true (công khai).
-- Kèm ảnh thực tế thi công & nghiệm thu.

INSERT INTO projects (
  id, title, slug, client_name, general_contractor, apex_role, category, location, completed_year,
  description, cover_image, gallery, status, verified, verified_note, updated_at
) VALUES
(
  'prj-vien-kiem-sat-quang-ninh',
  'Viện kiểm sát nhân dân tỉnh Quảng Ninh',
  'vien-kiem-sat-tinh-quang-ninh',
  'Viện kiểm sát nhân dân tỉnh Quảng Ninh',
  NULL,
  'Cung cấp và lắp đặt cửa chống cháy',
  'cua-thep-ngan-chay',
  'Hạ Long, Quảng Ninh',
  2026,
  'Gói thầu cung cấp và lắp đặt toàn bộ hệ thống cửa ngăn cháy tiêu chuẩn EI cho công trình Trụ sở Viện kiểm sát nhân dân tỉnh Quảng Ninh.',
  '/assets/cua-thep-ngan-chay-cover-D9h1BATp.webp',
  '["/assets/cua-thep-ngan-chay-cover-D9h1BATp.webp", "/assets/cua-thep-ei90-2-canh-cover-DoOos29c.webp", "/assets/cua-thep-ei70-1-canh-cover-BCph26oY.webp"]'::jsonb,
  'published',
  true,
  'Hồ sơ nghiệm thu bàn giao hệ thống cửa chống cháy hoàn thành',
  NOW()
),
(
  'prj-toa-an-quang-ninh',
  'Tòa án nhân dân tỉnh Quảng Ninh',
  'toa-an-tinh-quang-ninh',
  'Tòa án nhân dân tỉnh Quảng Ninh',
  NULL,
  'Cung cấp và thi công cửa kính & vách kính chống cháy',
  'cua-kinh-ngan-chay',
  'Hạ Long, Quảng Ninh',
  2026,
  'Cung cấp và thi công hệ thống cửa kính ngăn cháy và vách kính chống cháy cho trụ sở Tòa án nhân dân tỉnh Quảng Ninh.',
  '/assets/cua-kinh-ngan-chay-cover-B6C6S7au.webp',
  '["/assets/cua-kinh-ngan-chay-cover-B6C6S7au.webp", "/assets/cua-kinh-ngan-chay-ei60-cover-B-rV6Z_g.webp", "/assets/vach-kinh-ngan-chay-ei60-ei90-cover-B5UhhvrD.webp"]'::jsonb,
  'published',
  true,
  'Hồ sơ nghiệm thu kỹ thuật vách kính và cửa kính ngăn cháy',
  NOW()
),
(
  'prj-hoc-vien-hau-can',
  'Tòa nhà đa năng KV I – Học viện Hậu Cần',
  'toa-nha-da-nang-kv-i-hoc-vien-hau-can',
  'Học viện Hậu Cần',
  'Tổng công ty 789/BQP',
  'Nghiệm thu hoàn thành gói cửa chống cháy',
  'cua-thep-ngan-chay',
  'Long Biên, Hà Nội',
  2026,
  'Cung cấp, lắp đặt và nghiệm thu hoàn thành toàn bộ hệ thống cửa thép chống cháy tiêu chuẩn EI tại Tòa nhà đa năng KV I - Học viện Hậu Cần.',
  '/assets/cua-thep-ei90-2-canh-cover-DoOos29c.webp',
  '["/assets/cua-thep-ei90-2-canh-cover-DoOos29c.webp", "/assets/cua-thep-ei120-2-canh-cover-Gs2ZhLqJ.webp", "/assets/cua-thep-ei70-1-canh-cover-BCph26oY.webp"]'::jsonb,
  'published',
  true,
  'Biên bản nghiệm thu hoàn thành ngày 22/5/2026',
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
