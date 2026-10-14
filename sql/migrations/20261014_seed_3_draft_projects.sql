-- Migration: Nhập 3 dự án mẫu dạng nháp theo Phase 6 (PROMPT-DU-AN.md)
-- Trạng thái: draft, verified: false (chưa công khai). Chưa gắn ảnh.
-- Chủ dự án sẽ tự bổ sung ảnh và kích hoạt verified trên Admin.

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
  'Quảng Ninh',
  NULL,
  'Gói thầu cung cấp và lắp đặt hệ thống cửa ngăn cháy cho công trình Trụ sở Viện kiểm sát nhân dân tỉnh Quảng Ninh.',
  NULL,
  '[]'::jsonb,
  'draft',
  false,
  NULL,
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
  'Quảng Ninh',
  NULL,
  'Cung cấp và thi công hệ thống cửa kính ngăn cháy và vách kính chống cháy cho trụ sở Tòa án nhân dân tỉnh Quảng Ninh.',
  NULL,
  '[]'::jsonb,
  'draft',
  false,
  NULL,
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
  NULL,
  '[]'::jsonb,
  'draft',
  false,
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
  updated_at = NOW();
