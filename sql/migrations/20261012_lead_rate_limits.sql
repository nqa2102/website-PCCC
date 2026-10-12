-- ====================================================================
-- Migration 2026-10-12: Giới hạn tần suất gửi form (chống spam / bot khi chạy quảng cáo)
-- Chỉ THÊM bảng mới, không thay đổi hay xóa dữ liệu hiện có. Chạy lại nhiều lần an toàn.
-- Lưu mã băm IP (HMAC), không lưu IP thô. Bản ghi cũ hơn 1 ngày được API tự dọn.
-- ====================================================================
CREATE TABLE IF NOT EXISTS lead_rate_limits (
  id BIGSERIAL PRIMARY KEY,
  ip_hash VARCHAR(64) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_rate_limits_ip_created ON lead_rate_limits(ip_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone_created ON leads(phone, created_at DESC);
