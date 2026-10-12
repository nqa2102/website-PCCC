-- ====================================================================
-- MIGRATION: 20261012_products_and_projects.sql
-- Thêm cột certification_no, specs cho products, cập nhật check constraint 9 nhóm
-- Tạo bảng projects (Dự án tiêu biểu)
-- ====================================================================

ALTER TABLE products ADD COLUMN IF NOT EXISTS certification_no TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS specs JSONB DEFAULT '{}'::jsonb;

UPDATE products SET category = 'cua-thep-ngan-chay' WHERE category = 'steel-door';
UPDATE products SET category = 'cua-kinh-ngan-chay' WHERE category = 'glass-door';
UPDATE products SET category = 'cua-cuon-ngan-chay' WHERE category = 'roller-shutter';
UPDATE products SET category = 'rem-ngan-chay'      WHERE category = 'fire-curtain';

ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE products ADD CONSTRAINT products_category_check CHECK (category IN (
  'cua-thep-ngan-chay','cua-kinh-ngan-chay','cua-cuon-ngan-chay','rem-ngan-chay',
  'tu-dien','thang-mang-cap','tu-rack','nha-tram-shelter','tu-nguon-outdoor'
)) NOT VALID;

CREATE TABLE IF NOT EXISTS projects (
  id              VARCHAR(64) PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  client_name     TEXT,
  category        TEXT,
  location        TEXT,
  completed_year  INTEGER,
  description     TEXT,
  cover_image     TEXT,
  gallery         JSONB DEFAULT '[]'::jsonb,
  status          VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','review','published','internal')),
  verified        BOOLEAN NOT NULL DEFAULT FALSE,
  verified_note   TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects (slug);
CREATE INDEX IF NOT EXISTS idx_projects_verified ON projects (verified, status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects (category);
