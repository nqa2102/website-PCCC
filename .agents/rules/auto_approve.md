# APEX VN — Quy Tắc Thực Thi AI Agent (.agents/rules/auto_approve.md)

Tuân thủ toàn bộ nguyên tắc trong [AGENTS.md](../../AGENTS.md):

1. **Quy tắc làm việc**:
   - Đọc code hiện tại trước khi sửa.
   - Tự thực hiện các thao tác đọc file, tìm kiếm, phân tích, chỉnh sửa code thông thường và chạy kiểm thử cục bộ an toàn (`npm run lint`, `npm run build`).
   - Không yêu cầu xác nhận sau từng thao tác nhỏ.
   - Chia công việc thành các task nhỏ, kiểm thử sau mỗi task.
   - Không ghi đè các thay đổi có sẵn nếu chưa hiểu mục đích của chúng.
   - Không tuyên bố hoàn thành nếu chưa có bằng chứng kiểm thử.
   - Cập nhật `docs/GO-LIVE-STATUS.md` sau mỗi task.

2. **Thứ tự ưu tiên**:
   - GĐ0: Bảo mật khu vực `/admin`.
   - GĐ1: Neon PostgreSQL, API và xác thực thật.
   - GĐ2: Xác minh nội dung, thông tin pháp lý và chứng nhận.
   - GĐ3: SEO và hoàn thiện kỹ thuật.
   - GĐ4: QA, UAT và nghiệm thu.
   - GĐ5: Go-live.
   - GĐ6: Vận hành sau go-live.

3. **Kiến trúc & An toàn**:
   - Neon PostgreSQL là database mục tiêu duy nhất. Không tạo mới Supabase.
   - Rà soát toàn bộ các lệnh gọi Supabase còn sót để chuyển sang Neon/Vercel serverless API.
   - Không để credential hay token lộ ở client-side.
   - Luôn cập nhật tiến độ vào `docs/GO-LIVE-STATUS.md`.
