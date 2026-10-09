# Trạng Thái Tiến Độ Go-Live Website APEX VN (GO-LIVE-STATUS.md)

*Cập nhật lần cuối: 09/10/2026 (Sửa nhóm lỗi 1–5: bảo mật API, lưu lead, luồng dữ liệu Neon, upload Blob, phân quyền, giới hạn đăng nhập, header bảo mật)*  
*Tài liệu tham chiếu*: [`docs/Lo-trinh-Golive-Website-APEX-VN.md`](./Lo-trinh-Golive-Website-APEX-VN.md) & [`AGENTS.md`](../AGENTS.md)

---

## 📊 Bảng Tổng Hợp Tiến Độ Các Giai Đoạn

| Giai đoạn | Hạng mục | Mức ưu tiên | Trạng thái kỹ thuật | Bằng chứng kiểm tra / Ghi chú blocker |
| :--- | :--- | :---: | :---: | :--- |
| **GĐ0** | **Khẩn cấp bảo mật `/admin`** | **P0** | 🟢 **DONE (100%)** | Đã xóa triệt để mật khẩu cứng `apex2026` & nút bypass khỏi client bundle (0 kết quả trong dist). Đã thay thế bằng xác thực Scrypt/HMAC. |
| **GĐ1** | **Hạ tầng & Dữ liệu (Neon + API)** | **P0/P1** | 🟡 **Code xong nhóm 1–5; chờ cấu hình Neon/Blob và UAT dữ liệu thật** | Schema `sql/neon_schema.sql` (7 bảng), 11 Serverless API (`/api/*`), đồng bộ Neon ngầm ra website công khai (`/api/public-content`), thông báo lead qua Resend API. Đã gỡ sạch Supabase. |
| **GĐ2** | **Nội dung & Pháp lý thực tế** | **P1** | 🟡 **MST đã cập nhật theo GCN ĐKDN; còn chứng nhận kiểm định & đối tác chưa xác minh** | Loại bỏ toàn bộ dữ liệu mock/khuếch đại. Đồng bộ 100% thông tin pháp lý thực tế: Công ty TNHH Apex VN, Giám đốc Nguyễn Thị Ngọc Anh, Hotline `0566 38 5555`, 4 địa chỉ thực (Sơn Đồng, Trần Thái Tông, Thạch Thất, Đông Anh), mốc thành lập 2026. |
| **GĐ3** | **SEO & Hoàn thiện kỹ thuật** | **P1/P2** | 🟢 **DONE (100% Code & Assets)** | Điều hướng semantic `<a href>`, trang lỗi 404 thương hiệu APEX, cấu hình `sitemap.xml` (19 URL), `robots.txt`, `og-image.png` (1200x630), Schema.org Organization/Product. |
| **GĐ4** | **Kiểm thử toàn diện (QA/UAT)** | **P1** | 🟢 **DONE (Code QA Pass)** / 🟡 **Chờ kết nối DB** | Script kiểm thử tự động `scripts/test_integrity.js` đạt 43/43 PASS (100%), `npm run lint` PASS (0 lỗi), `npm run build` PASS (538ms). Chờ người dùng nhập `DATABASE_URL` trên Vercel để test live data. |
| **GĐ5** | **Go-live chính thức** | **P0** | ⚪ **NOT STARTED** | Chờ nghiệm thu nội bộ và gắn DNS tên miền chính thức của doanh nghiệp. |
| **GĐ6** | **Vận hành sau Go-live** | **P2** | ⚪ **NOT STARTED** | Quy trình backup tự động (Neon PITR) và phân quyền bảo trì. |

---

## 🎯 Bảng Đối Chiếu 13 Tiêu Chí "Definition of Done" (DoD)

| STT | Tiêu chí DoD | Kết quả kiểm tra trong mã nguồn | Đánh giá | Bằng chứng kiểm thử |
| :---: | :--- | :--- | :---: | :--- |
| **1** | Không còn thông tin đăng nhập hardcoded trong mã nguồn hoặc build bundle | Quét chuỗi `apex2026` và `1-Click` trên `dist/` và `src/` | 🟢 **ĐẠT** | 0 kết quả tìm thấy trong toàn bộ bundle. |
| **2** | Đăng nhập `/admin` thực hiện qua máy chủ hoặc dịch vụ xác thực an toàn | API `/api/admin/login.ts` dùng Scrypt password hash + HMAC SHA-256 session token trong HttpOnly cookie | 🟢 **ĐẠT** | `scripts/test_integrity.js` PASS 100%. |
| **3** | Lead từ website được lưu vào Neon Database | Biểu mẫu gọi `POST /api/leads` lưu trực tiếp bảng `leads` trong Neon | 🟢 **ĐẠT** | Endpoint `api/leads.ts` sẵn sàng, có honeypot chống bot spam. |
| **4** | Có thông báo email khi có lead mới | Tích hợp gửi email tức thì qua Resend REST API trong `api/leads.ts` khi có cấu hình `RESEND_API_KEY` | 🟢 **ĐẠT** | Code tích hợp tại dòng 113-145 của `api/leads.ts`. |
| **5** | Dữ liệu nội dung đồng bộ từ Neon | API `/api/public-content.ts` và hook `useLiveData()` tự động fetch và cập nhật dữ liệu mới nhất từ Neon khi online | 🟢 **ĐẠT** | Endpoint sẵn sàng, fallback tĩnh an toàn khi offline. |
| **6** | Thông tin doanh nghiệp hiển thị đầy đủ, chính xác pháp lý | Tên pháp lý: Công ty TNHH Apex VN (APEX VN COMPANY LIMITED); ĐDPL: Nguyễn Thị Ngọc Anh - Giám đốc; Mã số doanh nghiệp: `0111651857` (đăng ký lần đầu 06/10/2026); Website: `https://apexdoor.net`; Email: `contact@apexdoor.net` (cần tạo hộp thư) | 🟢 **ĐẠT** | Đồng bộ tại `companyData.ts`, `Footer.tsx`, `PrivacyPage.tsx`, `index.html`. |
| **7** | Địa chỉ trụ sở và nhà máy chính xác | Trụ sở chính (theo GCN ĐKDN): Số 10 Ngõ 25 Đường 422B, Xã Sơn Đồng, TP. Hà Nội; Văn phòng: 11 Trần Thái Tông, Cầu Giấy, Hà Nội; Nhà máy: Thạch Thất và Đông Anh | 🟢 **ĐẠT** | Xóa sạch các địa chỉ mock cũ (Diamond Flower, Cityland, Apex Tower, Bitexco). |
| **8** | Cam kết phản hồi trung thực, không khuếch đại | "Phản hồi trong 1-2 ngày" theo đúng quy chuẩn thực tế của công ty | 🟢 **ĐẠT** | Quét 0 kết quả cho cụm từ khuếch đại "15 phút". |
| **9** | Case study dự án khách hàng lớn được trung hòa an toàn | Tên dự án tổng quát mang tính giải pháp kỹ thuật, không tự ý công bố nhãn hiệu bên thứ ba chưa ký duyệt văn bản | 🟢 **ĐẠT** | Đã chuẩn hóa danh mục dự án trong `mockData.ts`. |
| **10** | Trang 404 thương hiệu và điều hướng chuẩn SEO | Tạo `src/pages/NotFoundPage.tsx`, toàn bộ menu dùng thẻ `<a href>` semantic có router interceptor | 🟢 **ĐẠT** | Chuyển trang mượt mà không tải lại, giữ trọn vẹn khả năng crawl của Googlebot. |
| **11** | Đầy đủ thẻ SEO và Meta tags | `robots.txt`, `sitemap.xml` (19 URL), `og-image.png` (1200x630), JSON-LD Schema.org `Organization` và `Product` | 🟢 **ĐẠT** | Quét kiểm tra tại `public/` và `index.html` đạt chuẩn 100%. |
| **12** | Client bundle không chứa token bí mật | Không có `DATABASE_URL` hay `ADMIN_SESSION_SECRET` xuất hiện ở client bundle | 🟢 **ĐẠT** | Toàn bộ biến nhạy cảm chỉ nằm trong Serverless Functions phía máy chủ. |
| **13** | Kiểm tra biên dịch & linting không lỗi | `npm run lint` (tsc --noEmit) và `npm run build` (vite build) | 🟢 **ĐẠT** | 0 lỗi TypeScript, build thành công trong 538ms. |

---

## 🔍 Chi Tiết Bằng Chứng Kiểm Tra Theo Từng Giai Đoạn

### GĐ0 – Xử Lý Khẩn Cấp Bảo Mật (P0 Khẩn cấp)
- [x] **Task 0.1 (Code)**: Xóa thông tin xác thực hardcoded và bypass trong [`src/admin/AdminPortal.tsx`](../src/admin/AdminPortal.tsx).
  - *Kết quả*: Đã xóa giá trị mặc định email/password khỏi state, xóa nút `1-Click` và chuyển form đăng nhập sang kiểm tra API bảo mật.
  - *Kiểm thử*: `npm run lint` $\rightarrow$ PASS (0 lỗi).
- [ ] **Task 0.2 (Thao tác ngoài)**: Đổi mật khẩu `apex2026` trên các tài khoản ngoài nếu đã từng dùng chung.
  - *Trạng thái*: Chờ người dùng kiểm tra trên các tài khoản cá nhân/công ty bên ngoài.
- [ ] **Task 0.3 (Thao tác ngoài)**: Cấu hình Vercel Password Protection nếu muốn khóa truy cập tạm thời trước ngày khai trương.
  - *Trạng thái*: Chờ thao tác trên Vercel Project Settings.
- [x] **Task 0.4 (Code & Build)**: Build production (`npm run build`) và quét xác nhận không còn chuỗi `apex2026` trong `dist/`.
  - *Bằng chứng*: Quét ripgrep trên toàn bộ `dist/assets/*.js` và `src/` đều trả về 0 kết quả (sạch 100%).

---

### GĐ1 – Hạ Tầng & Dữ Liệu (Neon + Serverless API)
- [x] **Task 1.1 (SQL)**: File schema PostgreSQL chuyên biệt cho Neon ([`sql/neon_schema.sql`](../sql/neon_schema.sql)).
  - *Kết quả*: Hoàn thiện schema 7 bảng (`admin_users`, `leads`, `products`, `documents`, `contents`, `company_settings`, `activities`), indexes tối ưu, seed dữ liệu thực tế ban đầu.
- [ ] **Task 1.2 (Thao tác ngoài)**: Kết nối Neon database trên Vercel và gắn biến môi trường (`DATABASE_URL`, `ADMIN_SESSION_SECRET`).
  - *Trạng thái*: Chờ người dùng thực hiện theo hướng dẫn bên dưới.
- [x] **Task 1.3 (Backend Code)**: Xây dựng toàn bộ Serverless API routes trong thư mục `/api`:
  - [`api/admin/login.ts`](../api/admin/login.ts), [`api/admin/me.ts`](../api/admin/me.ts), [`api/admin/logout.ts`](../api/admin/logout.ts)
  - [`api/leads.ts`](../api/leads.ts) (có honeypot chống bot spam và gửi thông báo qua Resend)
  - [`api/public-content.ts`](../api/public-content.ts) (phục vụ dữ liệu công khai cho khách truy cập)
  - [`api/admin/products.ts`](../api/admin/products.ts), [`api/admin/documents.ts`](../api/admin/documents.ts), [`api/admin/contents.ts`](../api/admin/contents.ts), [`api/admin/settings.ts`](../api/admin/settings.ts), [`api/admin/activities.ts`](../api/admin/activities.ts).
- [x] **Task 1.4 (Code)**: Thay thế hoàn toàn các lệnh gọi Supabase bằng API fetch tới `/api/admin/*` và `/api/public-content`.
  - *Bằng chứng*: Gỡ sạch Supabase client khỏi bundle; bundle JavaScript giảm từ 541 kB xuống 328 kB; không còn import `@supabase/supabase-js` trong code thực thi.
- [x] **Task 1.5 (Code)**: Cập nhật hàm `appendWebsiteLead` và hook `useLiveData` trong [`src/admin/adminData.ts`](../src/admin/adminData.ts) sang đồng bộ Neon API.

---

### GĐ2 – Nội Dung & Pháp Lý Thực Tế
- [x] **Task 2.1 (Nội dung thực tế)**: Chuẩn hóa case study khách hàng mang tính giải pháp kỹ thuật, không tự ý công bố đối tác khi chưa ký duyệt văn bản.
- [x] **Task 2.2 (Thời gian)**: Chuẩn hóa mốc thời gian thành lập doanh nghiệp năm 2026.
- [x] **Task 2.3 (Pháp lý & Đại diện)**: Cập nhật mã số doanh nghiệp `0111651857` theo GCN ĐKDN (09/10/2026; trước đó là số giả `0111222333`), email chính thức (`contact@apexdoor.net`), đại diện pháp luật (`Nguyễn Thị Ngọc Anh` - Giám đốc) ở Footer và [`src/pages/PrivacyPage.tsx`](../src/pages/PrivacyPage.tsx).
- [x] **Task 2.4 (Địa chỉ & Hotline)**: Cập nhật đồng bộ Hotline `0566 38 5555`, loại bỏ hoàn toàn các địa chỉ và số điện thoại mock trước đây.
- [ ] **Task 2.5 (Nội dung/Asset)**: Tải file catalogue/bản vẽ CAD PDF thật từ phòng kỹ thuật để người dùng tải về trên trang Tài liệu.
  - *Trạng thái*: Chờ phòng kỹ thuật cung cấp bản PDF gốc.

---

### GĐ3 – SEO & Hoàn Thiện Kỹ Thuật
- [ ] **Task 3.1 (Hạ tầng)**: Tên miền chính thức `apexdoor.net` (Mắt Bão, hạn 09/10/2027): đã cập nhật trong code; chờ gắn domain trên Vercel + DNS (xem Hướng dẫn thao tác ngoài, mục 5).
  - *Trạng thái*: Chờ cung cấp domain và trỏ DNS.
- [x] **Task 3.2 (Code)**: Chuyển các thẻ điều hướng trong Header/Footer/Trang chủ sang thẻ `<a href>` semantic chuẩn SEO.
- [x] **Task 3.3 (Code)**: Trang lỗi 404 tùy chỉnh mang nhận diện thương hiệu APEX ([`src/pages/NotFoundPage.tsx`](../src/pages/NotFoundPage.tsx)).
- [x] **Task 3.4 (SEO)**: Cấu hình `sitemap.xml`, `robots.txt`, thẻ Open Graph `og-image.png` (1200x630) và Schema.org Organization/Product chuẩn xác.

---

### GĐ4 – QA, UAT & Nghiệm Thu
- [x] **Task 4.1 (Kiểm thử tự động)**: Chạy script kiểm thử toàn vẹn tự động [`scripts/test_integrity.js`](../scripts/test_integrity.js).
  - *Bằng chứng*: 43/43 bài kiểm thử đạt kết quả **PASS (100%)**.
- [x] **Task 4.2 (Biên dịch & Kiểu dữ liệu)**:
  - `npm run lint` $\rightarrow$ PASS (0 lỗi TypeScript).
  - `npm run build` $\rightarrow$ PASS (hoàn tất trong 538ms).
- [ ] **Task 4.3**: UAT thực tế trên môi trường live sau khi người dùng kết nối Neon trên Vercel.
- [ ] **Task 4.4**: Ký biên bản nghiệm thu nội bộ bàn giao website.

---

## 🔧 Rà Soát Go-Live & Sửa Lỗi Ngày 09/10/2026

### Nhóm 1 – Bảo mật API & lưu khách hàng (DONE)
| Lỗi | Sửa | Tệp |
| :--- | :--- | :--- |
| `GET /api/admin/{products,documents,contents,settings}` không cần đăng nhập → lộ bản nháp, nội dung nội bộ, ghi chú xác minh | Bắt buộc `requireAdminAuth` cho GET. Website công khai chỉ đọc `/api/public-content` | `api/admin/*.ts` |
| `/api/public-content` trả `notes`, `verifiedBy`, `sourceReference` của hồ sơ | Bỏ các trường nội bộ khỏi truy vấn công khai | `api/public-content.ts` |
| Sửa lead (trạng thái, phân công, ghi chú) không lưu vào Neon | Thêm `PUT /api/leads` (cần đăng nhập, kiểm tra status/priority hợp lệ) | `api/leads.ts`, `src/admin/adminRepository.ts` |
| Form website lỗi API vẫn báo "thành công", lead chỉ lưu trên trình duyệt khách | `appendWebsiteLead` ném lỗi → form báo khách gọi Hotline/Zalo; bỏ lưu tạm localStorage | `src/admin/adminData.ts` |

### Nhóm 2 – Luồng dữ liệu admin ↔ website (DONE)
| Lỗi | Sửa | Tệp |
| :--- | :--- | :--- |
| Admin hiển thị dữ liệu mẫu khi Neon trống; lần lưu đầu đẩy toàn bộ mẫu (published) lên Neon | Admin chỉ dùng dữ liệu Neon; lỗi tải hiển thị rõ, không hiện danh sách trống giả | `adminRepository.ts`, `AdminApp.tsx` |
| Mỗi lần lưu gửi lại toàn bộ danh sách; nhật ký bị ghi trùng | Lưu đúng 1 bản ghi/thao tác; nhật ký ghi 1 lần | `adminRepository.ts`, `AdminApp.tsx` |
| Nút "Khôi phục dữ liệu mẫu" ghi đè Neon | Thay bằng "Nhập danh mục ban đầu (dạng nháp)": chỉ thêm mục chưa có, trạng thái nháp, không nhập dự án mẫu | `AdminApp.tsx`, `adminData.ts` |
| Chế độ "cục bộ" (localStorage) và bộ chọn vai trò giả lập trong admin | Gỡ bỏ; phiên `local` cũ bị bỏ qua, bắt buộc đăng nhập qua máy chủ | `AdminApp.tsx`, `AdminPortal.tsx` |
| Website đọc localStorage của khách + trộn dữ liệu mẫu; dự án/tin mẫu hiện khi Neon trống | Khi Neon hoạt động: Neon là nguồn duy nhất (kể cả danh sách trống). Khi Neon chưa kết nối: dùng danh mục tĩnh, **không** hiển thị dự án mẫu | `adminData.ts` |
| Sản phẩm tạo mới từ admin tự gắn cam kết "Hồ sơ kiểm định PCCC đầy đủ", "Sơn Jotun" | Chỉ hiển thị thông tin admin đã nhập | `adminData.ts` |
| Trang chủ hiện khối dự án rỗng | Ẩn khối khi chưa có dự án công bố | `src/pages/HomePage.tsx` |

**Bằng chứng kiểm thử:**
- `npm run lint` PASS, `npm run build` PASS, `scripts/test_integrity.js` 43/43 PASS.
- Kiểm thử handler API với request giả lập (không DB): 14/14 PASS. Gồm: 4 GET admin trả 401 khi không đăng nhập, PUT lead 401/400, POST lead 503 khi thiếu DB, public-content `isDatabaseLive=false`.
- Kiểm thử trình duyệt (vite dev, không có API): localStorage cũ bị bỏ qua, không hiển thị dự án mẫu, danh mục sản phẩm vẫn hiển thị; form liên hệ hiển thị lỗi và không lưu lead vào trình duyệt; phiên admin `local` cũ chuyển về màn hình đăng nhập.
- **Chưa kiểm thử với Neon thật** (chưa có `DATABASE_URL`): cần UAT luồng đăng nhập → sửa → website cập nhật, và form → lead vào Neon.

### Nhóm 3 – Tải ảnh/PDF lên Vercel Blob (DONE code, chờ kết nối Blob store)
- `api/admin/upload.ts`: cấp token tải trực tiếp từ trình duyệt lên Vercel Blob (không qua giới hạn 4,5 MB của Function). Chỉ cấp token cho admin/editor/technical đã đăng nhập. Chỉ nhận ảnh JPG/PNG/WebP/AVIF ≤ 5 MB (thư mục `images/`) và PDF ≤ 25 MB (thư mục `documents/`). Tên tệp có hậu tố ngẫu nhiên.
- `AdminApp.tsx`: thêm ô **Tải lên** cho ảnh sản phẩm, ảnh nội dung/dự án và **Tệp PDF công bố** của hồ sơ (có xem trước).
- `/api/public-content` trả `fileUrl`; trang Tài liệu kỹ thuật hiện nút **Tải hồ sơ (PDF)** khi có tệp.

### Nhóm 4 – Phân quyền API & giới hạn đăng nhập (DONE)
- `requireAdminRole` (`api/_db.ts`) đọc lại vai trò và trạng thái `active` từ Neon ở mỗi request. Khóa tài khoản hoặc đổi vai trò có hiệu lực ngay.
- Ma trận quyền: Leads → admin, sales · Sản phẩm → admin, editor, technical · Hồ sơ → admin, technical · Nội dung → admin, editor · Cấu hình → admin · Xóa → chỉ admin.
- Quy tắc công bố: chỉ admin được đặt trạng thái "Đã công bố". Hồ sơ phải được xác minh (`verifiedAt`) mới công bố được. Dự án phải có đủ "duyệt hình ảnh" và "khách hàng xác nhận" mới công bố được.
- Giao diện: vai trò khác admin thấy lựa chọn "Đã công bố" bị khóa và không có nút xóa.
- Đăng nhập: sai 5 lần/email hoặc 20 lần/IP trong 15 phút → khóa tạm (HTTP 429). Email không tồn tại vẫn chạy scrypt giả để không lộ email hợp lệ qua thời gian phản hồi. Token không còn trả trong JSON (chỉ nằm trong cookie HttpOnly). Cần bảng `login_attempts`.

### Nhóm 5 – Dọn Supabase & header bảo mật (DONE)
- Xóa `src/lib/supabase.ts`, `SUPABASE_SETUP.md`, gỡ gói `@supabase/supabase-js`. `.env.example` liệt kê đúng biến môi trường hiện dùng.
- `vercel.json`: thêm CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- Email báo lead: escape HTML dữ liệu khách nhập.
- Còn giữ thư mục `supabase/migrations/` (đang có thay đổi chưa commit, chờ chủ dự án quyết định xóa).

**Bằng chứng kiểm thử nhóm 3–5:**
- `npm run lint` PASS, `npm run build` PASS, `scripts/test_integrity.js` 43/43 PASS.
- Kiểm thử handler API với Neon giả lập trong bộ nhớ: **28/28 PASS** (phân quyền 12, quy tắc công bố 7, upload 3, giới hạn đăng nhập 6).
- Cấp token upload với token Blob giả: ảnh hợp lệ → 200. Thư mục lạ hoặc đường dẫn `..` → 400.
- Trình duyệt: bản build phục vụ kèm đúng header CSP → trang chủ hiển thị bình thường, **0 lỗi console**. Admin với vai trò editor chỉ thấy Tổng quan/Sản phẩm/Nội dung; "Đã công bố" bị khóa; không có nút xóa; có ô tải ảnh.
- **Chưa kiểm thử với Neon và Vercel Blob thật.**

### Hạ tầng Vercel/Neon & lỗi API trên Vercel (09/10/2026)
- Vercel: `ADMIN_SESSION_SECRET` (ẩn, 3 môi trường), Blob store `apex-pccc-media` (public, sin1), Neon `apex-pccc-db` (Singapore) đã kết nối (Production + Preview), tên miền `apexdoor.net` + `www` (308) đã gắn, chờ DNS.
- Neon: đã chạy `sql/neon_schema.sql` (8 bảng, MST `0111651857`, website `https://apexdoor.net`); đã tạo tài khoản admin đầu tiên.
- **Lỗi nghiêm trọng đã sửa:** mọi `/api/*` trên Vercel trả 500 (`ERR_MODULE_NOT_FOUND`) vì `"type": "module"` yêu cầu import tương đối có đuôi `.js`. Đã thêm đuôi `.js` và kiểm tra tự động trong `scripts/test_integrity.js` (55/55).
- Kiểm thử trên preview với Neon thật: `/api/public-content` → `isDatabaseLive: true`, MST đọc từ Neon; `/api/admin/products`, `/api/leads`, `/api/admin/me` → 401 khi chưa đăng nhập; đăng nhập sai → 401, bảng `login_attempts` hoạt động.
- Lưu ý: Preview và Production đang dùng **chung một database Neon**.

### Việc còn lại (chưa làm)
- Xác minh chứng nhận kiểm định và danh sách "đối tác" (`PARTNER_LOGOS`: Mitsubishi, Hitachi...).
- Gắn `apexdoor.net` trên Vercel + DNS Mắt Bão (code đã cập nhật sitemap, robots, canonical, og, JSON-LD).
- Tạo hộp thư `contact@apexdoor.net`; xác thực `apexdoor.net` trên Resend và đặt biến `RESEND_FROM`.
- SEO cho chia sẻ mạng xã hội (meta theo từng trang phía máy chủ), sitemap động.

---

## 🛠️ Hướng Dẫn Thao Tác Ngoài

Để website chính thức chuyển sang chế độ lưu trữ dữ liệu tập trung qua Neon Database:

### 1. Trên Vercel Console:
1. Vào dự án trên Vercel $\rightarrow$ chọn mục **Settings** $\rightarrow$ **Environment Variables**.
2. Thêm 2 biến môi trường:
   - `DATABASE_URL`: Đường dẫn kết nối PostgreSQL do Neon cung cấp (ví dụ: `postgresql://user:pass@ep-xxxx.neon.tech/neondb?sslmode=require`).
   - `ADMIN_SESSION_SECRET`: Chuỗi khóa bí mật ngẫu nhiên dài trên 32 ký tự dùng để ký session đăng nhập (ví dụ: tạo bằng chuỗi ngẫu nhiên bất kỳ).
   - *(Tùy chọn)* `RESEND_API_KEY`: Khóa API từ [Resend.com](https://resend.com) nếu muốn nhận email thông báo tự động mỗi khi có khách gửi yêu cầu tư vấn.

### 2. Trên Neon Console:
1. Mở mục **SQL Editor** trong dự án Neon.
2. Sao chép và chạy nội dung file [`sql/neon_schema.sql`](../sql/neon_schema.sql) để khởi tạo toàn bộ 7 bảng và dữ liệu công ty ban đầu.
3. Chạy lệnh tạo tài khoản quản trị đầu tiên tại terminal máy tính:
   ```powershell
   node scripts/hash_password.js "MatKhauQuanTriCuaBan" "admin@apexdoor.net"
   ```
   Sau đó sao chép câu lệnh SQL hiển thị trên màn hình và chạy trong Neon SQL Editor.

### 3. Vercel Blob (để tải ảnh/PDF từ trang quản trị):
1. Vercel → dự án → **Storage** → **Create** → **Blob**, chọn chế độ **Public**, rồi **Connect** vào dự án.
2. Kiểm tra biến `BLOB_READ_WRITE_TOKEN` đã có trong Environment Variables, rồi deploy lại.

### 4. Bảng giới hạn đăng nhập (DB đã khởi tạo trước 09/10/2026):
- Chạy [`sql/migrations/20261009_login_attempts.sql`](../sql/migrations/20261009_login_attempts.sql) trong Neon SQL Editor. Chỉ thêm bảng mới, chạy lại nhiều lần vẫn an toàn. Nếu thiếu bảng này, đăng nhập vẫn hoạt động nhưng **không** có giới hạn dò mật khẩu (có ghi log lỗi).

### 5. Tên miền chính thức `apexdoor.net` (làm SAU khi merge PR vào `main`):
1. Vercel → dự án `website-pccc` → **Settings → Domains** → thêm `apexdoor.net` (Production) và `www.apexdoor.net` (chuyển hướng 308 về `apexdoor.net`).
2. Mắt Bão → quản lý DNS `apexdoor.net` → tạo đúng các bản ghi A/CNAME mà Vercel hiển thị; xóa bản ghi A/CNAME cũ trùng tên (`@`, `www`).
3. Chờ Vercel báo **Valid Configuration** và tự cấp SSL; mở thử `https://apexdoor.net`.
4. Google Search Console: thêm `apexdoor.net`, gửi `https://apexdoor.net/sitemap.xml`.

### 6. Nạp nội dung ban đầu (sau khi đăng nhập `/admin`):
1. Vào **Cấu hình** → bấm **Nhập danh mục ban đầu (dạng nháp)**.
2. Rà soát từng sản phẩm / hồ sơ / bài viết, đối chiếu bản gốc, rồi chuyển trạng thái sang **Đã công bố**.
3. Lưu ý: khi Neon đã kết nối, website chỉ hiển thị mục **Đã công bố**. Cần công bố nội dung trước khi trỏ tên miền chính thức.
