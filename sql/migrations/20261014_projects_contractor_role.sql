-- ====================================================================
-- MIGRATION: 20261014_projects_contractor_role.sql
-- Thêm cột general_contractor (Tổng thầu) và apex_role (Vai trò APEX) cho bảng projects
-- Nâng cao uy tín và tính minh bạch pháp lý cho hồ sơ năng lực dự án
-- An toàn: Chạy lại nhiều lần không lỗi (Idempotent)
-- ====================================================================

ALTER TABLE projects ADD COLUMN IF NOT EXISTS general_contractor TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS apex_role TEXT;
