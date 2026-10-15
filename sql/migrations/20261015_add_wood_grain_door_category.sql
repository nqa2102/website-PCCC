-- ====================================================================
-- MIGRATION: 20261015_add_wood_grain_door_category.sql
-- Thêm danh mục 'cua-thep-van-go' (Cửa thép vân gỗ chống cháy) vào products_category_check
-- ====================================================================

ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE products ADD CONSTRAINT products_category_check CHECK (category IN (
  'cua-thep-ngan-chay',
  'cua-thep-van-go',
  'cua-kinh-ngan-chay',
  'cua-cuon-ngan-chay',
  'rem-ngan-chay',
  'tu-dien',
  'thang-mang-cap',
  'tu-rack',
  'nha-tram-shelter',
  'tu-nguon-outdoor'
)) NOT VALID;
