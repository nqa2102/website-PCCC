-- ====================================================================
-- APEX VIỆT NAM — NEON POSTGRESQL DATABASE SCHEMA
-- File: sql/neon_schema.sql
-- Mục đích: Khởi tạo cấu trúc bảng trên Neon Database cho Website APEX VN
-- Chuẩn hóa: Tương thích 100% với adminTypes.ts và kiến trúc Vercel Serverless
-- ====================================================================

-- 1. BẢNG QUẢN TRỊ VIÊN (ADMIN USERS)
-- Lưu trữ thông tin tài khoản đăng nhập quản trị hệ thống có băm mật khẩu
CREATE TABLE IF NOT EXISTS admin_users (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL DEFAULT '',
  role VARCHAR(50) NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'sales', 'technical')),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- 2. BẢNG KHÁCH HÀNG TIỀM NĂNG (LEADS)
-- Tiếp nhận yêu cầu báo giá, tư vấn từ form website
CREATE TABLE IF NOT EXISTS leads (
  id VARCHAR(64) PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  company VARCHAR(255),
  project_name VARCHAR(255),
  project_location VARCHAR(255),
  product_interest VARCHAR(255),
  fire_rating VARCHAR(100),
  source VARCHAR(100) NOT NULL DEFAULT 'Biểu mẫu website',
  message TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'lost')),
  priority VARCHAR(50) NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  assignee VARCHAR(255),
  next_follow_up_at TIMESTAMPTZ,
  notes TEXT,
  consent BOOLEAN NOT NULL DEFAULT TRUE,
  consent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- 3. BẢNG SẢN PHẨM (PRODUCTS)
-- Đồng bộ sản phẩm cửa ngăn cháy, phụ kiện PCCC
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100) NOT NULL,
  category_name VARCHAR(255) NOT NULL,
  fire_rating VARCHAR(100),
  short_description TEXT,
  material TEXT,
  standard VARCHAR(255),
  warranty VARCHAR(100),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'internal')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  seo_title VARCHAR(255),
  seo_description TEXT,
  image_alt VARCHAR(255),
  image TEXT,
  price_estimate VARCHAR(100),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

-- 4. BẢNG HỒ SƠ KIỂM ĐỊNH & TÀI LIỆU KỸ THUẬT (DOCUMENTS)
CREATE TABLE IF NOT EXISTS documents (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  code VARCHAR(100) NOT NULL,
  document_type VARCHAR(100),
  product_group VARCHAR(100),
  standard VARCHAR(255),
  owner VARCHAR(255),
  scope TEXT,
  issued_date VARCHAR(50),
  expiry_date VARCHAR(50),
  status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'internal')),
  source_reference TEXT,
  verified_by VARCHAR(255),
  verified_at VARCHAR(50),
  notes TEXT,
  file_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_code ON documents(code);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);

-- 5. BẢNG NỘI DUNG (CONTENTS: PROJECTS, NEWS & PAGES)
CREATE TABLE IF NOT EXISTS contents (
  id VARCHAR(64) PRIMARY KEY,
  type VARCHAR(50) NOT NULL CHECK (type IN ('project', 'article', 'page')),
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'internal')),
  publish_at VARCHAR(50),
  owner VARCHAR(255),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  media_approved BOOLEAN NOT NULL DEFAULT FALSE,
  client_approved BOOLEAN NOT NULL DEFAULT FALSE,
  category VARCHAR(100),
  location VARCHAR(255),
  scale VARCHAR(255),
  items_supplied TEXT,
  year VARCHAR(50),
  client VARCHAR(255),
  image TEXT,
  author VARCHAR(255),
  read_time VARCHAR(50),
  content JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contents_type_status ON contents(type, status);

-- 6. BẢNG THÔNG TIN DOANH NGHIỆP & CẤU HÌNH (COMPANY SETTINGS)
CREATE TABLE IF NOT EXISTS company_settings (
  id VARCHAR(64) PRIMARY KEY DEFAULT 'apex',
  legal_name VARCHAR(255) NOT NULL,
  tax_code VARCHAR(100),
  brand_name VARCHAR(255) NOT NULL,
  representative VARCHAR(255),
  representative_title VARCHAR(255),
  hotline VARCHAR(50),
  hotline_sales VARCHAR(50),
  hotline_tech VARCHAR(50),
  zalo VARCHAR(50),
  email VARCHAR(255),
  email_support VARCHAR(255),
  website VARCHAR(255),
  factory_address TEXT,
  head_office TEXT,
  showroom_address TEXT,
  founded_year VARCHAR(10),
  working_hours VARCHAR(255),
  response_time VARCHAR(100),
  service_area TEXT,
  addresses JSONB DEFAULT '[]'::jsonb,
  default_seo_title VARCHAR(255),
  default_seo_description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. BẢNG NHẬT KÝ HOẠT ĐỘNG (ACTIVITIES)
CREATE TABLE IF NOT EXISTS activities (
  id VARCHAR(64) PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actor VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  target VARCHAR(255) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_activities_created ON activities(created_at DESC);

-- ====================================================================
-- DỮ LIỆU KHỞI TẠO (SEED DATA)
-- ====================================================================

-- Khởi tạo thông tin công ty ban đầu (nếu chưa có)
INSERT INTO company_settings (
  id, legal_name, tax_code, brand_name, representative, representative_title,
  hotline, hotline_sales, hotline_tech, zalo, email, email_support, website,
  factory_address, head_office, showroom_address, founded_year, working_hours,
  response_time, service_area, addresses, default_seo_title, default_seo_description
) VALUES (
  'apex',
  'Công ty TNHH Apex VN',
  '0111651857',
  'APEX Việt Nam',
  'Nguyễn Thị Ngọc Anh',
  'Giám đốc',
  '0566 38 5555',
  '0566 38 5555',
  '0566 38 5555',
  'https://zalo.me/0566385555',
  'contact@apex.vn',
  'contact@apex.vn',
  'https://website-pccc.vercel.app',
  'Hương Ngải, Thạch Thất, Hà Nội; Đông Anh, Hà Nội',
  'Số 10 Ngõ 25 Đường 422B, Xã Sơn Đồng, Thành phố Hà Nội',
  '11 Trần Thái Tông, Cầu Giấy, Hà Nội',
  '2026',
  'Hỗ trợ cả ngày',
  'Phản hồi trong 1-2 ngày',
  'Toàn quốc',
  '["Trụ sở chính: Số 10 Ngõ 25 Đường 422B, Xã Sơn Đồng, Thành phố Hà Nội", "Văn phòng: 11 Trần Thái Tông, Cầu Giấy, Hà Nội", "Nhà máy 1: Hương Ngải, Thạch Thất, Hà Nội", "Nhà máy 2: Đông Anh, Hà Nội"]'::jsonb,
  'APEX Việt Nam - Cửa Ngăn Cháy & Giải Pháp PCCC Toàn Diện',
  'Cung cấp và thi công cửa chống cháy, cửa cuốn ngăn cháy, rèm ngăn cháy đạt chuẩn QCVN 06:2022/BXD.'
) ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 7. BẢNG NHẬT KÝ HOẠT ĐỘNG (ACTIVITIES)
-- ====================================================================
CREATE TABLE IF NOT EXISTS activities (
  id VARCHAR(64) PRIMARY KEY,
  actor VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  target TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at DESC);

-- ====================================================================
-- 8. BẢNG GHI NHẬN ĐĂNG NHẬP (LOGIN ATTEMPTS) - giới hạn dò mật khẩu
-- (Cũng có trong sql/migrations/20261009_login_attempts.sql cho DB đã khởi tạo)
-- ====================================================================
CREATE TABLE IF NOT EXISTS login_attempts (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  ip VARCHAR(100) NOT NULL,
  success BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_login_attempts_email_created ON login_attempts(email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_created ON login_attempts(ip, created_at DESC);
