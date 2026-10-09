# Lộ trình Go-live Website APEX VN – Kế hoạch chi tiết

Oct 8, 2026 · @Quang Anh (cập nhật 09/10/2026)

## Tổng quan & mục tiêu go-live

Mục tiêu: đưa website APEX VN (giải pháp cửa ngăn cháy PCCC) từ trạng thái demo hiện tại sang trạng thái sẵn sàng phục vụ khách hàng thật, trong khoảng 4 tuần, không để lộ dữ liệu và không để nội dung sai gây rủi ro pháp lý.

Ba kết luận từ đợt rà soát trước quyết định toàn bộ thứ tự ưu tiên trong kế hoạch này:

1. Bảo mật (P0): trang `/admin` lộ công khai với tài khoản viết cứng trong mã nguồn và nút đăng nhập 1-click — phải vá trước khi làm bất kỳ việc gì khác.
2. Dữ liệu (P0/P1): chưa có biến môi trường backend thật trên Vercel, nên form liên hệ và phần "quản trị nội dung" hiện chưa hoạt động đúng như quảng cáo trên site.
3. Nội dung (P1): trang Dự án nêu tên khách hàng lớn (Vingroup, Pegatron, Phú Mỹ Hưng...) với năm thực hiện không khớp năm thành lập công ty (2026) — cần xác minh với kinh doanh trước khi công bố, hoặc gỡ bỏ.

Nguyên tắc ưu tiên xuyên suốt kế hoạch: P0 = chặn go-live, phải xong trước tiên; P1 = nên xong trước go-live, có thể làm song song P0 ở phần không liên quan bảo mật; P2 = có thể hoàn thiện ngay sau go-live mà không ảnh hưởng người dùng.

## Cập nhật tiến độ (09/10/2026)

Đã chốt dùng **Neon** (Postgres) thay vì Supabase cho toàn bộ dữ liệu. Gói code backend đã được chuẩn bị và bàn giao (`apex-neon-patch`: schema SQL, các API `/api/admin/*` và `/api/leads`, hướng dẫn thao tác Vercel) — các mốc trong GĐ1 bên dưới đã cập nhật theo kiến trúc này. Phần còn lại (kết nối Neon trên Vercel, chạy SQL với mật khẩu thật, merge code vào `AdminPortal.tsx`/`AdminApp.tsx`) vẫn đang chờ thực hiện.

## Lộ trình tổng thể theo tuần

Sơ đồ 5 chặng / 4 tuần: GĐ0 (Ngày 1-3, Khẩn cấp bảo mật) → GĐ1-2 (Tuần 1-3, Hạ tầng & dữ liệu, chạy song song) → GĐ3 (Tuần 2-3, SEO & kỹ thuật) → GĐ4 (Tuần 3-4, Kiểm thử QA) → GĐ5-6 (Cuối tuần 4 trở đi, Ra mắt & vận hành).

GĐ0 phải xong trước tiên vì chặn go-live; GĐ1 và GĐ2 chạy song song trong các tuần tiếp theo để không kéo dài tổng thời gian.

## GĐ0 – Xử lý khẩn cấp bảo mật (Ngày 1-3)

Mục tiêu: không còn cách nào để một người lạ vào được khu vực quản trị.

1. Sửa file quản trị (`AdminPortal`): xóa giá trị mặc định `admin@apex.vn` / `apex2026` khỏi state, xóa nút "Đăng nhập Quản trị viên (1-Click)".
2. Đổi ngay mật khẩu `apex2026` dù sắp bỏ, phòng trường hợp trùng với mật khẩu dùng ở nơi khác (email, Zalo Business, hosting...).
3. Chặn tạm `/admin` bằng Vercel Password Protection hoặc Deployment Protection trong lúc chờ xác thực thật được triển khai ở GĐ1.
4. Kiểm tra Vercel Deployment Logs để xem có dấu hiệu truy cập bất thường vào `/admin` trước đó không (Neon chưa được kết nối ở bước này nên chưa có log đăng nhập thật để đối chiếu).
5. Deploy bản vá lên production, tự kiểm tra lại bằng trình duyệt ẩn danh: vào `/admin` xác nhận không còn pre-fill, không còn nút 1-click.

Tiêu chí hoàn thành: `/admin` yêu cầu đăng nhập thật, không còn giá trị nào lộ trong mã nguồn phía client (kiểm tra lại bằng cách tải file JS đã build và tìm chuỗi `apex2026`).

## GĐ1 – Hạ tầng & dữ liệu (Neon + API, Tuần 1-2)

1. Tạo project Neon thật (qua Vercel → Storage → Connect Database → Neon), tạo các bảng `leads`, `products`, `documents`, `contents`, `company_settings`, `activities`, `admin_users` theo đúng file `sql/neon_schema.sql` đã chuẩn bị sẵn.
2. Xác nhận Vercel đã tự thêm biến `DATABASE_URL` sau khi kết nối Neon; tự thêm biến `ADMIN_SESSION_SECRET` (chuỗi ngẫu nhiên dài) cho cả Production và Preview — không hardcode trong code hay lưu trong localStorage.
3. Chuyển xác thực admin từ fake-session trong localStorage sang API thật `/api/admin/login` + `/api/admin/me` (JWT trong cookie httpOnly), xóa hẳn tài khoản/mật khẩu viết cứng và nút đăng nhập 1-click trong `AdminPortal.tsx`.
4. API nhận form liên hệ (`/api/leads`, đã có sẵn trong gói patch): lưu vào bảng `leads`, có honeypot chống spam; bổ sung gửi email qua Resend/SendGrid và/hoặc thông báo Zalo OA khi có lead mới.
5. Gửi thử một lead kiểm thử thật qua trang Liên hệ, xác nhận dữ liệu xuất hiện đúng trong bảng `leads` trên Neon console trước khi coi là xong.
6. Viết đủ các endpoint `/api/admin/products`, `/api/admin/documents`, `/api/admin/contents`, `/api/admin/settings`, `/api/admin/activities` (theo mẫu `/api/leads.ts`); đảm bảo khi admin sửa sản phẩm/dự án/tin tức, thay đổi hiển thị lại ngay trên website công khai — không chỉ lưu local.
7. Đối chiếu tên cột trong file SQL schema với đúng các field trong `adminTypes.ts` trước khi chạy — tránh để admin lưu được dữ liệu mà phía ngoài site hiển thị sai hoặc thiếu.
8. Viết đủ các endpoint quản trị còn thiếu cho Products, Documents, Contents, Settings, Activities theo đúng mẫu endpoint Leads đã có, thay toàn bộ các lệnh gọi Supabase còn sót trong `adminRepository.ts`.
9. Tắt hẳn mọi đường dữ liệu mẫu hoặc fallback localStorage trong bản production — admin chỉ được thấy và sửa đúng dữ liệu thật trong Neon.

## GĐ2 – Nội dung & pháp lý (Tuần 1-3, chạy song song GĐ1)

1. Lập danh sách toàn bộ case study ở trang Dự án, đối chiếu với phòng kinh doanh: dự án nào có hợp đồng/thư xác nhận cho phép nêu tên chủ đầu tư.
2. Với dự án chưa xác nhận bằng văn bản: tạm ẩn tên chủ đầu tư cụ thể (Vingroup, Pegatron, Phú Mỹ Hưng...) hoặc gỡ khỏi site cho đến khi được phép.
3. Thống nhất lại mốc thời gian: năm thành lập công ty, và sửa ngày các bài "Tin tức" cho không mâu thuẫn (hiện ghi 2024, trước cả năm thành lập 2026).
4. Bổ sung ở footer: tên pháp nhân đầy đủ, mã số doanh nghiệp/giấy phép kinh doanh, email liên hệ chính thức — nên có ý kiến bộ phận pháp lý/kế toán công ty về việc công khai các thông tin này.
5. Cập nhật lại trang "Chính sách bảo mật", bỏ các câu đang để ngỏ kiểu "sẽ được bổ sung sau khi hệ thống được kích hoạt".
6. Đối chiếu với phòng kỹ thuật từng mã kiểm định/chứng nhận đang hiển thị (QCVN, mã KD-PCCC...), giữ bản gốc PDF để đối chiếu khi khách hàng hoặc cơ quan PCCC yêu cầu.
7. Chuẩn bị file catalogue/bản vẽ CAD thật dạng PDF cho trang "Tài liệu kỹ thuật" (hiện chỉ là form yêu cầu gửi, cần có nội dung thật để gửi).
8. Khi nội dung (case study, mốc thời gian, mã kiểm định...) đã được xác nhận, nhập đúng dữ liệu đó vào Neon qua trang quản trị — nội dung hiển thị công khai phải khớp 100% với bản đã duyệt, không còn placeholder hay dữ liệu demo.

## GĐ3 – SEO & hoàn thiện kỹ thuật (Tuần 2-3)

1. Mua và trỏ domain riêng của công ty (thay cho `website-pccc.vercel.app`), cập nhật lại canonical URL, sitemap.xml, và khai báo trong Google Search Console.
2. Chuyển các mục điều hướng chính từ `<button>` sang `<a href>` thật (giữ nguyên router phía dưới), giúp crawler và người dùng mở tab mới dễ hơn.
3. Thêm trang 404 tùy chỉnh có thương hiệu APEX thay vì trang lỗi mặc định của Vercel.
4. Thêm thẻ `og:image` cho các trang chính, bổ sung schema.org `Organization`/`LocalBusiness` và `Product` cho từng dòng sản phẩm.
5. Chạy Lighthouse/PageSpeed Insights, tối ưu ảnh và kiểm tra Core Web Vitals trên cả mobile và desktop.

## GĐ4 – Kiểm thử toàn diện trước go-live (Tuần 3-4)

1. Kiểm tra bảo mật: xác nhận `/admin` không còn lộ thông tin đăng nhập, chạy quét lỗ hổng cơ bản (ví dụ OWASP ZAP baseline) trước khi mở công khai hoàn toàn.
2. Kiểm tra chức năng trên nhiều trình duyệt/thiết bị: gửi thử form liên hệ, yêu cầu catalogue, kiểm tra nút gọi/Zalo trên mobile.
3. UAT nội dung: đội kinh doanh và kỹ thuật APEX đọc lại toàn bộ trang, xác nhận số liệu kỹ thuật, chính tả, giá/thông tin liên hệ.
4. Kiểm tra kỹ thuật SEO: sitemap.xml, robots.txt, thẻ meta từng trang, test schema bằng Google Rich Results Test.
5. Lập biên bản nghiệm thu nội bộ, có xác nhận của người đại diện công ty (chị Nguyễn Thị Ngọc Anh) trước khi bấm go-live.
6. Kiểm tra dữ liệu đầu cuối: tạo hoặc sửa thử một sản phẩm, một dự án và một tài liệu trong trang quản trị, xác nhận đúng dữ liệu đó — không sai lệch — hiển thị ra trang công khai và khớp với dữ liệu lưu trong Neon.

## GĐ5 – Go-live & giám sát 24-72 giờ đầu

1. Thứ tự thao tác: gắn domain chính thức → xác nhận SSL tự động của Vercel → submit sitemap lên Google Search Console → gỡ mọi chặn tạm → thông báo đội kinh doanh sẵn sàng tiếp nhận lead.
2. Chuẩn bị phương án rollback: giữ bản deploy production trước đó, dùng Instant Rollback của Vercel nếu phát hiện lỗi nghiêm trọng ngay sau go-live.
3. 24-72 giờ đầu: theo dõi log lỗi (Vercel Functions), theo dõi lead có đổ về đúng không, theo dõi tốc độ tải thực tế, có người trực điện thoại/Zalo để phản hồi khách hàng đầu tiên kịp thời.

## GĐ6 – Vận hành & lộ trình sau go-live

1. Quy trình cập nhật nội dung định kỳ qua trang quản trị, quy định rõ ai được sửa sản phẩm/dự án/tin tức.
2. Bật backup tự động định kỳ cho dữ liệu Neon (Point-in-Time Restore theo gói Neon đang dùng).
3. Rà soát bảo mật định kỳ (đổi mật khẩu, xem log truy cập admin, cập nhật thư viện phần mềm) — nên lặp lại tối thiểu mỗi quý.
4. Mở rộng tiếp theo khi đã ổn định: tích hợp CRM thật, viết đều bài blog SEO mới, cân nhắc thêm bản tiếng Anh nếu nhắm khách FDI, gắn Google Analytics/Search Console để đo lường.

## Phân công vai trò (RACI)

| Hạng mục | Quang Anh (chủ DN) | Đội phát triển (dev) | Kinh doanh/Marketing | Pháp lý/Kế toán |
| --- | --- | --- | --- | --- |
| GĐ0 – Vá bảo mật admin | A | R | - | - |
| GĐ1 – Hạ tầng & dữ liệu | A | R | C | - |
| GĐ2 – Nội dung & pháp lý | A | C | R | R |
| GĐ3 – SEO & kỹ thuật | C | R | C | - |
| GĐ4 – Kiểm thử (UAT) | A | R | R | C |
| GĐ5 – Go-live | A | R | C | - |
| GĐ6 – Vận hành lâu dài | A | R | R | C |

R = Thực hiện, A = Phê duyệt, C = Được tham vấn.

## Checklist nghiệm thu Go-live (Definition of Done)

- [ ] `/admin` không còn tài khoản/mật khẩu viết cứng, không còn nút đăng nhập 1-click
- [ ] Đã kết nối Neon qua Vercel Storage; biến `DATABASE_URL` và `ADMIN_SESSION_SECRET` cấu hình thật trên Vercel (không qua localStorage), mật khẩu admin trong SQL không còn là giá trị placeholder
- [ ] Form liên hệ đã gửi thử thành công, lead lưu đúng và có thông báo tới đội kinh doanh
- [ ] Toàn bộ case study ở trang Dự án đã được xác nhận thật hoặc gỡ bỏ
- [ ] Mốc thời gian (năm thành lập, ngày tin tức) không còn mâu thuẫn
- [ ] Footer có đủ tên pháp nhân, mã số doanh nghiệp, email chính thức
- [ ] Chính sách bảo mật đã cập nhật, không còn câu "sẽ bổ sung sau"
- [ ] Domain riêng đã trỏ và chạy SSL ổn định
- [ ] Trang 404 riêng, sitemap.xml và robots.txt hoạt động đúng
- [ ] Đã chạy kiểm tra bảo mật cơ bản, không còn lỗ hổng đã biết
- [ ] Đội kinh doanh/kỹ thuật đã UAT và ký biên bản nghiệm thu nội bộ
- [ ] Toàn bộ endpoint quản trị (leads, products, documents, contents, settings) đã hoạt động đúng, không còn đoạn mã nào gọi Supabase trong mã nguồn
- [ ] Dữ liệu hiển thị công khai trên website khớp 100% với dữ liệu trong Neon — không còn dữ liệu mẫu/demo nào sót lại

## Rủi ro chính & biện pháp giảm thiểu

| Rủi ro | Mức độ | Biện pháp giảm thiểu |
| --- | --- | --- |
| Lỗ hổng admin bị khai thác trước khi vá | Cao | Vá ngay trong GĐ0, chặn tạm route, đổi mật khẩu liên quan |
| Công bố tên khách hàng/dự án chưa được phép | Cao | Xác nhận bằng văn bản trước khi đăng; mặc định ẩn nếu chưa chắc |
| Lead khách hàng bị mất do backend chưa kích hoạt | Trung bình | Kiểm thử gửi thử thực tế trước go-live, có cảnh báo khi gửi lỗi |
| Chậm tiến độ do chờ xác nhận nội dung từ kinh doanh | Trung bình | Giao việc xác nhận case study ngay từ tuần 1, song song với kỹ thuật |
| Mất dữ liệu khi chuyển sang Neon thật | Thấp | Bật backup tự động ngay khi kích hoạt Neon, kiểm thử khôi phục thử 1 lần, đối chiếu kỹ schema SQL với `adminTypes.ts` trước khi nhập dữ liệu thật |
| Dữ liệu quản trị và trang công khai lệch nhau do còn fallback demo/local | Trung bình | Kiểm thử round-trip dữ liệu trước go-live; loại bỏ hoàn toàn nhánh code đọc localStorage trong bản production |

---

*Tài liệu gốc (bản sống, có thể bình luận/chỉnh sửa): https://claude.ai/code/artifact/43f4fa9b-e584-4754-bfc8-2bb98030a46a*
*Gói code backend tham chiếu (Neon + API serverless): thư mục `apex-neon-patch/` đã gửi trước đó trong cuộc trò chuyện này.*
