-- Migration: Bổ sung cột gallery và project_images cho bảng products
-- Cho phép quản trị viên cập nhật toàn bộ ảnh slider và ảnh công trình thực tế của sản phẩm
ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery JSONB DEFAULT '[]'::jsonb;
ALTER TABLE products ADD COLUMN IF NOT EXISTS project_images JSONB DEFAULT '[]'::jsonb;
