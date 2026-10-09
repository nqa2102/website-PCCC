-- ====================================================================
-- Migration 2026-10-09: Bảng ghi nhận đăng nhập quản trị (giới hạn dò mật khẩu)
-- Chỉ THÊM bảng mới, không thay đổi hay xóa dữ liệu hiện có. Chạy lại nhiều lần an toàn.
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
