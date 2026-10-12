-- ====================================================================
-- MIGRATION: 20261012_product_features_and_long_desc.sql
-- Thêm cột features (JSONB) và long_description (TEXT) cho bảng products
-- Cho phép quản trị viên cập nhật thông số, tính năng nổi bật và bài viết mô tả chi tiết từ /admin
-- An toàn: Chạy lại nhiều lần không lỗi (Idempotent)
-- ====================================================================

ALTER TABLE products ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;
ALTER TABLE products ADD COLUMN IF NOT EXISTS long_description TEXT;
