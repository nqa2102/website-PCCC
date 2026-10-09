# APEX VN — Antigravity Agent Rules (AGENTS.md)

Tài liệu này cung cấp quy chuẩn, nguyên tắc phát triển và chỉ dẫn hành động bắt buộc cho AI Agent khi làm việc trên dự án **APEX Việt Nam - Website PCCC**.

---

## 1. Mục Tiêu
Hoàn thiện website APEX VN theo lộ trình [`docs/Lo-trinh-Golive-Website-APEX-VN.md`](./docs/Lo-trinh-Golive-Website-APEX-VN.md) từ trạng thái demo sang trạng thái sẵn sàng phục vụ khách hàng thật, đảm bảo tuyệt đối an toàn dữ liệu và tính chính xác pháp lý/kỹ thuật.

---

## 2. Quy Tắc Làm Việc
- **Đọc code hiện tại trước khi sửa**: Luôn nắm rõ ngữ cảnh và cách cấu trúc hiện tại trước khi thực hiện bất kỳ thay đổi nào.
- **Tự thực hiện các thao tác**: Tự động thực hiện các thao tác đọc file, tìm kiếm, phân tích, chỉnh sửa code thông thường và chạy kiểm thử cục bộ an toàn (`npm run lint`, `npm run build`, v.v.).
- **Không yêu cầu xác nhận sau từng thao tác nhỏ**: Duy trì luồng công việc liên tục, chủ động hoàn thành các bước kế tiếp.
- **Chia công việc thành các task nhỏ, kiểm thử sau mỗi task**: Đảm bảo mỗi bước thay đổi đều được kiểm chứng.
- **Không ghi đè các thay đổi có sẵn nếu chưa hiểu mục đích của chúng**: Tránh phá vỡ các chức năng hoặc tài sản sẵn có trong dự án.
- **Không tuyên bố hoàn thành nếu chưa có bằng chứng kiểm thử**: Mọi kết luận đều phải dựa trên kết quả log lệnh, output biên dịch hoặc kiểm thử cụ thể.
- **Cập nhật `docs/GO-LIVE-STATUS.md` sau mỗi task**: Luôn ghi nhận trạng thái tiến độ mới nhất vào file theo dõi.

---

## 3. Thứ Tự Ưu Tiên
1. **GĐ0**: Bảo mật khu vực `/admin` (P0 khẩn cấp).
2. **GĐ1**: Neon PostgreSQL, API và xác thực thật (P0/P1).
3. **GĐ2**: Xác minh nội dung, thông tin pháp lý và chứng nhận (P1).
4. **GĐ3**: SEO và hoàn thiện kỹ thuật (P1/P2).
5. **GĐ4**: QA, UAT và nghiệm thu (P1).
6. **GĐ5**: Go-live (P0).
7. **GĐ6**: Vận hành sau go-live (P2).

---

## 4. Kiến Trúc
- **Neon là cơ sở dữ liệu mục tiêu đã được lựa chọn** (thay thế Supabase).
- **Không tạo kiến trúc Supabase mới**.
- **Kiểm tra các lệnh gọi Supabase còn sót trước khi thay thế**.
- **Đối chiếu schema SQL, `adminTypes.ts`, repository và API**: Giữ tính đồng bộ chặt chẽ về mặt kiểu dữ liệu và trường thông tin.
- **Không dùng dữ liệu demo hoặc localStorage fallback trong production**.

---

## 5. An Toàn
- **Không để mật khẩu, token hoặc secret trong mã nguồn phía client**.
- **Không tự ý xóa dữ liệu hoặc chạy migration phá hủy dữ liệu**.
- **Không tự deploy production hoặc gỡ chặn bảo mật khi chưa được xác nhận**.
- **Không tự công bố thông tin khách hàng, dự án hoặc chứng nhận chưa được xác minh**.
- **Nếu thiếu quyền truy cập hoặc cấu hình**: Ghi rõ blocker và tiếp tục các công việc độc lập an toàn.

---

## 6. Definition of Done
Một task chỉ được đánh dấu **DONE** khi có kết quả kiểm thử hoặc bằng chứng phù hợp (ví dụ: `npm run lint` pass, `npm run build` pass, log endpoint pass, v.v.). Các bước cần thao tác thủ công trên Vercel, Neon hoặc tài khoản bên ngoài phải được ghi rõ riêng rẽ trong mục Hướng dẫn Thao tác Ngoài.
