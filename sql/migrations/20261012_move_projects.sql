-- ====================================================================
-- MIGRATION: 20261012_move_projects.sql
-- Chuyển dữ liệu dự án từ contents (type='project') sang bảng projects
-- An toàn: Chạy lại nhiều lần không lỗi, không xóa dữ liệu trong contents
-- ====================================================================

INSERT INTO projects (
  id, title, slug, client_name, category, location, completed_year,
  description, cover_image, status, verified, verified_note
)
SELECT
  c.id,
  c.title,
  c.id,
  c.client,
  c.category,
  c.location,
  NULLIF(regexp_replace(COALESCE(c.year, ''), '[^0-9]', '', 'g'), '')::int,
  c.summary,
  c.image,
  CASE WHEN c.status = 'published' THEN 'review' ELSE c.status END,  -- buộc xác minh lại
  false,
  NULL
FROM contents c
WHERE c.type = 'project'
  AND NOT EXISTS (SELECT 1 FROM projects p WHERE p.id = c.id OR p.slug = c.id)
ON CONFLICT (id) DO NOTHING;
