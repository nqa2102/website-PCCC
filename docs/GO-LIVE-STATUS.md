# Trạng Thái Tiến Độ Go-Live Website APEX VN (GO-LIVE-STATUS.md)

*Cập nhật lần cuối: 13/10/2026 (Hoàn thành VIỆC A — Xử lý 37 ảnh sản phẩm thật, WebP tối ưu, xóa sạch EXIF, gắn Cover 4:5 và Thư viện ảnh Gallery cho 9 sản phẩm Cửa thép và Cửa kính ngăn cháy, loại bỏ vi phạm bản quyền 3CElectric; và VIỆC B — Đổi logic Menu Sản phẩm dạng accordion xổ xuống trực tiếp, gom nhóm biến thể theo số cánh & cấp EI, deep link thẳng trang chi tiết, auto-expand theo route, mobile tap targets >= 44px)*  
*Tài liệu tham chiếu*: [`docs/Lo-trinh-Golive-Website-APEX-VN.md`](./Lo-trinh-Golive-Website-APEX-VN.md), [`docs/PROMPT-ANH-VA-MENU-SAN-PHAM.md`](./PROMPT-ANH-VA-MENU-SAN-PHAM.md), [`docs/anh-san-pham-phan-loai.md`](./anh-san-pham-phan-loai.md), [`docs/VIEC-CON-LAI.md`](./VIEC-CON-LAI.md) & [`AGENTS.md`](../AGENTS.md)

---

## 📊 Bảng Tổng Hợp Tiến Độ Các Giai Đoạn

| Giai đoạn | Hạng mục | Mức ưu tiên | Trạng thái kỹ thuật | Bằng chứng kiểm tra / Ghi chú blocker |
| :--- | :--- | :--- | :---: | :--- |
| **GĐ0** | **Khẩn cấp bảo mật `/admin`** | **P0** | 🟢 **DONE (100%)** | Đã xóa triệt để mật khẩu cứng `apex2026` & nút bypass khỏi client bundle (0 kết quả trong dist). Đã thay thế bằng xác thực Scrypt/HMAC. |
| **GĐ1** | **Hạ tầng & Dữ liệu (Neon + API)** | **P0/P1** | 🟢 **DONE (100% Code & Schema)** | Đã chạy migration T0 trên Neon (`isDatabaseLive: true`). Schema `sql/neon_schema.sql` và migration `sql/migrations/20261013_seed_37_products.sql` nạp đầy đủ 37 sản phẩm, test PGlite nạp 2 lần an toàn (Idempotency PASS). |
| **GĐ2** | **Nội dung & Pháp lý thực tế** | **P1** | 🟢 **DONE (100% 9 Sản phẩm & Ảnh Thật)** | 9 Dòng sản phẩm APEX nội dung gốc, không copy đối thủ (ankovina, 3ce). Đã xử lý & gắn 37 ảnh sản phẩm thật (VIỆC A), xóa 100% EXIF/GPS, tỷ lệ 4:5, gallery thumbnails, loại bỏ bản quyền G7. `certificationNo` để trống ("Đang cập nhật") chờ văn bản gốc. |
| **GĐ3** | **SEO & Hoàn thiện kỹ thuật** | **P1/P2** | 🟢 **DONE (100% Code & Assets)** | Điều hướng semantic `<a href>`, routing `/san-pham/:category`, `/san-pham/:category/:slug`, `/du-an`, `/du-an/:slug`. Schema.org `Product` và `CreativeWork`. **Đã hoàn thành Menu Sản phẩm Accordion (VIỆC B)**. |
| **GĐ4** | **Kiểm thử toàn diện (QA/UAT)** | **P1** | 🟢 **DONE (Code QA Pass 100%)** | Script kiểm thử `scripts/test_integrity.js` đạt **169/169 PASS (100%)**, `npm run lint` PASS, `npm run build` PASS, Browser QA 1440px và 375px đạt chuẩn (không vỡ layout, không tràn ngang). |
| **GĐ5** | **Go-live chính thức** | **P0** | 🟢 **DONE (100% Go-Live)** | Deploy production Vercel + tên miền chính thức `https://apexhome.vn` (kèm alias `apexhome.vn`). Database Neon live. |
| **GĐ6** | **Vận hành sau Go-live** | **P2** | ⚪ **NOT STARTED** | Quy trình backup tự động (Neon PITR) và phân quyền bảo trì. |
| **GĐ-CAT** | **Trang chi tiết theo danh mục (6 Phase)** | **P1** | 🟡 **IN PROGRESS (Phase 0, 1, 2 & 3 DONE)** | Chuyển từ lưới sản phẩm con sang trang chi tiết danh mục (landing 6 khối theo mockup `chi-tiet-cua-thep.html`). Nhánh `feat/category-detail-page`. |

---

## 🚀 Kế Hoạch 6 Phase: Trang Chi Tiết Theo Danh Mục (Landing Page 9 Danh Mục)
*Tài liệu kỹ thuật*: [`docs/PROMPT-TRANG-CHI-TIET-DANH-MUC.md`](./PROMPT-TRANG-CHI-TIET-DANH-MUC.md) & mockup [`docs/mockup/chi-tiet-cua-thep.html`](./mockup/chi-tiet-cua-thep.html).

- **Mục tiêu**: Đổi mô hình "danh mục → lưới nhiều sản phẩm con" sang **mỗi danh mục là 1 trang chi tiết** (landing 6 khối). Bấm danh mục ra thẳng trang chi tiết. Áp dụng cho cả 9 danh mục.
- **Thứ tự 6 khối chuẩn theo mockup**:
  1. Hero: Thư viện ảnh (trái) + tên + giá từ /m² + 3 điểm bán hàng + bảng tóm tắt quickSpec + CTA Báo giá & Zalo + Hotline.
  2. Ưu điểm & công dụng (6 gạch đầu dòng + 4 thẻ công dụng).
  3. Hình ảnh thực tế tại công trình (3 ảnh).
  4. Bảng thông số kỹ thuật chi tiết (bảng đầy đủ).
  5. Dự toán chi tiết cho 1 bộ (bảng vật tư) + thanh CTA bar.
  6. Sản phẩm tương tự (3 thẻ danh mục liên quan).

| Phase | Nội dung công việc | Trạng thái |
|:---:|:---|:---:|
| **Phase 0** | Khởi tạo nhánh `feat/category-detail-page`, khảo sát mã nguồn, cập nhật tiến độ, chốt mô hình dữ liệu. | 🟢 **DONE** |
| **Phase 1** | Tạo `src/data/categoryDetails.ts`, điền đủ `cua-thep-ngan-chay` từ mockup, tạo khung rỗng 8 danh mục còn lại. | 🟢 **DONE** |
| **Phase 2** | Xây dựng component `src/pages/CategoryDetailPage.tsx` đúng 6 khối, thư viện ảnh thumbnail, tự ẩn khối rỗng. Đã kiểm thử 1440px & 375px. | 🟢 **DONE** |
| **Phase 3** | Đổi điều hướng: menu link thẳng trang chi tiết (bỏ accordion xổ con), `/san-pham` hiện lưới 9 thẻ danh mục. Tự động chuyển hướng link cũ `/san-pham/:category/:slug` về `/san-pham/:category`. | 🟢 **DONE** |
| **Phase 4** | Điền nội dung cho toàn bộ 9 dòng sản phẩm theo template chuẩn 6 khối của Cửa Kính & Cửa Thép (Hero, điểm bán hàng, thông số quickSpec, 6 ưu điểm, 4 công dụng, bảng specTable 12 dòng, sản phẩm tương tự). Tích hợp bảng dự toán cho Cửa Thép, Cửa Kính, Cửa Cuốn (mẫu AKS, 54.300.000 đ/bộ từ file báo giá thực tế); các sản phẩm chưa có báo giá được chuyển sang thanh CTA dự toán đồng bộ. | 🟢 **DONE (Toàn bộ 9/9 danh mục)** |
| **Phase 5** | SEO (sitemap 9 URL danh mục, canonical, meta), dọn dẹp code cũ, kiểm tra integrity. | ⚪ Chưa làm |
| **Phase 6** | QA tổng thể 1440px & 375px, kiểm tra liên kết, hoàn thiện bàn giao. | ⚪ Chưa làm |

## 🎯 Bảng Đối Chiếu 13 Tiêu Chí "Definition of Done" (DoD)

| STT | Tiêu chí DoD | Kết quả kiểm tra trong mã nguồn | Đánh giá | Bằng chứng kiểm thử |
| :---: | :--- | :--- | :---: | :--- |
| **1** | Không còn thông tin đăng nhập hardcoded trong mã nguồn hoặc build bundle | Quét chuỗi `apex2026` và `1-Click` trên `dist/` và `src/` | 🟢 **ĐẠT** | 0 kết quả tìm thấy trong toàn bộ bundle. |
| **2** | Đăng nhập `/admin` thực hiện qua máy chủ hoặc dịch vụ xác thực an toàn | API `/api/admin/login.ts` dùng Scrypt password hash + HMAC SHA-256 session token trong HttpOnly cookie | 🟢 **ĐẠT** | `scripts/test_integrity.js` PASS 100%. |
| **3** | Lead từ website được lưu vào Neon Database | Biểu mẫu gọi `POST /api/leads` lưu trực tiếp bảng `leads` trong Neon | 🟢 **ĐẠT** | Endpoint `api/leads.ts` sẵn sàng, có honeypot chống bot spam. |
| **4** | Có thông báo email khi có lead mới | Tích hợp gửi email tức thì qua Resend REST API trong `api/leads.ts` khi có cấu hình `RESEND_API_KEY` | 🟢 **ĐẠT** | Code tích hợp tại dòng 113-145 của `api/leads.ts`. |
| **5** | Dữ liệu nội dung đồng bộ từ Neon | API `/api/public-content.ts` và hook `useLiveData()` tự động fetch và cập nhật dữ liệu mới nhất từ Neon khi online | 🟢 **ĐẠT** | Endpoint sẵn sàng, fallback tĩnh an toàn khi offline. |
| **6** | Thông tin doanh nghiệp hiển thị đầy đủ, chính xác pháp lý | Tên pháp lý: Công ty TNHH Apex VN (APEX VN COMPANY LIMITED); ĐDPL: Nguyễn Thị Ngọc Anh - Giám đốc; Mã số doanh nghiệp: `0111651857` (đăng ký lần đầu 06/10/2026); Website: `https://apexhome.vn`; Email: `contact@apexhome.vn` (cần tạo hộp thư) | 🟢 **ĐẠT** | Đồng bộ tại `companyData.ts`, `Footer.tsx`, `PrivacyPage.tsx`, `index.html`. |
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
- [x] **Task 2.3 (Pháp lý & Đại diện)**: Cập nhật mã số doanh nghiệp `0111651857` theo GCN ĐKDN (09/10/2026; trước đó là số giả `0111222333`), email chính thức (`contact@apexhome.vn`), đại diện pháp luật (`Nguyễn Thị Ngọc Anh` - Giám đốc) ở Footer và [`src/pages/PrivacyPage.tsx`](../src/pages/PrivacyPage.tsx).
- [x] **Task 2.4 (Địa chỉ & Hotline)**: Cập nhật đồng bộ Hotline `0566 38 5555`, loại bỏ hoàn toàn các địa chỉ và số điện thoại mock trước đây.
- [ ] **Task 2.5 (Nội dung/Asset)**: Tải file catalogue/bản vẽ CAD PDF thật từ phòng kỹ thuật để người dùng tải về trên trang Tài liệu.
  - *Trạng thái*: Chờ phòng kỹ thuật cung cấp bản PDF gốc.
- [x] **Task 2.6 (Ảnh sản phẩm thật & Thư viện ảnh Gallery)**:
  - Khảo sát & phân loại toàn bộ 37 ảnh nguồn tại `D:\ELMICH\Apex-pccc\ảnh`, lập bảng phân loại [`docs/anh-san-pham-phan-loai.md`](./anh-san-pham-phan-loai.md) đủ 37 dòng.
  - Tối ưu bằng `sharp` sang chuẩn WebP chất lượng cao, xóa 100% EXIF/GPS metadata, Cover 1200x1500 (tỷ lệ 4:5, dung lượng 43–96 KB ≤ 200 KB), Gallery cạnh dài 1600px (16–87 KB ≤ 300 KB).
  - Gắn Cover + Gallery cho 9 sản phẩm Cửa thép và Cửa kính ngăn cháy, cập nhật `imageAlt` chuẩn SEO kỹ thuật.
  - Khung `ProductCard` chuyển sang tỷ lệ `aspect-[4/5]`, thêm `width`/`height` chống CLS.
  - Trang chi tiết `ProductDetailLayout` hiển thị ảnh lớn `object-contain bg-slate-100` (`fetchPriority="high"`) + dải thumbnails tương tác chuẩn WCAG accessible (`aria-label`, `aria-current`).
  - Gỡ bỏ hoàn toàn ảnh vi phạm bản quyền 3CElectric (nhóm G7) và các từ khóa liên quan khỏi mã nguồn.

---

### GĐ3 – SEO & Hoàn Thiện Kỹ Thuật
- [x] **Task 3.1 (Hạ tầng)**: Tên miền chính thức `apexhome.vn` (Mắt Bão): đã gắn trên Vercel `website-pccc`, cập nhật mã nguồn toàn diện; hướng dẫn trỏ DNS tại Mắt Bão.
  - *Trạng thái*: Đã thêm trên Vercel và cấu hình mã nguồn sẵn sàng.
- [x] **Task 3.2 (Code)**: Chuyển các thẻ điều hướng trong Header/Footer/Trang chủ sang thẻ `<a href>` semantic chuẩn SEO.
- [x] **Task 3.3 (Code)**: Trang lỗi 404 tùy chỉnh mang nhận diện thương hiệu APEX ([`src/pages/NotFoundPage.tsx`](../src/pages/NotFoundPage.tsx)).
- [x] **Task 3.4 (SEO)**: Cấu hình `sitemap.xml`, `robots.txt`, thẻ Open Graph `og-image.png` (1200x630) và Schema.org Organization/Product chuẩn xác.
- [x] **Task 3.5 (Menu Sản phẩm Accordion Đa Cấp — VIỆC B)**:
  - Viết module thuần [`src/components/products/productMenu.ts`](../src/components/products/productMenu.ts) với hàm `groupProductsByVariant`: tự động phát hiện số cánh, gom nhóm biến thể (`1 CÁNH`, `2 CÁNH`), sắp xếp cấp chịu lửa EI tăng dần, giữ danh sách phẳng cho nhóm không có số cánh, loại bỏ sản phẩm tổng quan.
  - Desktop Menu: bấm danh mục xổ accordion ngay bên dưới (Chevron xoay 180°, `aria-expanded`, `aria-controls`), chỉ mở 1 danh mục một lúc, container cuộn chống tràn viewport, deep link thẳng trang chi tiết sản phẩm.
  - Tự động mở sẵn danh mục và highlight (`aria-current="page"`) sản phẩm đang xem khi mở menu trên trang chi tiết.
  - Hỗ trợ bàn phím đầy đủ: Tab, Enter/Space, Escape đóng và trả focus về nút Sản phẩm.
  - Mobile Menu (Hamburger): áp dụng cùng accordion logic, vùng bấm $\ge$ 44px, khoảng cách $\ge$ 8px.
  - Bộ kiểm thử tự động `scripts/test_integrity.js`: tích hợp 10 bài kiểm thử cho `productMenu.ts` $\rightarrow$ **169/169 PASS (100%)**.

---

### GĐ4 – QA, UAT & Nghiệm Thu
- [x] **Task 4.1 (Kiểm thử tự động)**: Chạy script kiểm thử toàn vẹn tự động [`scripts/test_integrity.js`](../scripts/test_integrity.js).
  - *Bằng chứng*: **159/159 bài kiểm thử đạt kết quả PASS (100%)**.
- [x] **Task 4.2 (Biên dịch & Kiểu dữ liệu)**:
  - `npm run lint` $\rightarrow$ PASS (0 lỗi TypeScript).
  - `npm run build` $\rightarrow$ PASS (hoàn tất trong 815ms).
- [x] **Task 4.3 (Kiểm thử thực tế giao diện & Khắc phục xung đột)**:
  - Khởi chạy Vite dev server trên port `5173` (tránh xung đột port 3000 với dự án khác).
  - Cơ chế fallback thông minh trong [`src/admin/adminData.ts`](../src/admin/adminData.ts): đảm bảo 9 dòng sản phẩm kỹ thuật luôn hiển thị ổn định, không bị rỗng khi Neon database chưa chạy migration.
  - Kiểm thử trực quan tự động bằng browser subagent trên `http://localhost:5173/san-pham` và `http://localhost:5173/du-an`: xác nhận toàn bộ 9 dòng sản phẩm, layout chi tiết sản phẩm và khung dự án tiêu biểu tải mượt mà.
- [ ] **Task 4.4**: UAT thực tế trên môi trường live sau khi người dùng kết nối Neon trên Vercel.
- [ ] **Task 4.5**: Ký biên bản nghiệm thu nội bộ bàn giao website.

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
- Vercel: `ADMIN_SESSION_SECRET` (ẩn, 3 môi trường), Blob store `apex-pccc-media` (public, sin1), Neon `apex-pccc-db` (Singapore) đã kết nối (Production + Preview), tên miền `apexhome.vn` + `www` (308) đã gắn, chờ DNS.
- Neon: đã chạy `sql/neon_schema.sql` (8 bảng, MST `0111651857`, website `https://apexhome.vn`); đã tạo tài khoản admin đầu tiên.
- **Lỗi nghiêm trọng đã sửa:** mọi `/api/*` trên Vercel trả 500 (`ERR_MODULE_NOT_FOUND`) vì `"type": "module"` yêu cầu import tương đối có đuôi `.js`. Đã thêm đuôi `.js` và kiểm tra tự động trong `scripts/test_integrity.js` (55/55).
- Kiểm thử trên preview với Neon thật: `/api/public-content` → `isDatabaseLive: true`, MST đọc từ Neon; `/api/admin/products`, `/api/leads`, `/api/admin/me` → 401 khi chưa đăng nhập; đăng nhập sai → 401, bảng `login_attempts` hoạt động.
- Lưu ý: Preview và Production đang dùng **chung một database Neon**.

### Lưu thông tin khách hàng (12/10/2026)
- Form báo giá: ô **đồng ý xử lý dữ liệu bắt buộc** (mặc định không tick); API từ chối lead không có `consent === true` (NĐ 13/2023).
- Lưu tách cột: `product_interest`, `fire_rating`, `project_location`, `company`, `source` (Form báo giá / Form liên hệ).
- Chống spam: bẫy bot ở form báo giá; giới hạn 3 lead/10 phút theo số điện thoại, 5 lead/10 phút theo IP (lưu mã băm HMAC, không lưu IP thô). Cần chạy `sql/migrations/20261012_lead_rate_limits.sql` (chưa chạy: giới hạn theo IP tạm tắt, lead vẫn nhận).
- Cắt độ dài trường theo cột Neon để không mất lead khi khách nhập quá dài; kiểm tra định dạng email.
- Trang quản trị: danh sách khách hàng phân trang (200/trang, nút "Tải thêm", hiển thị tổng số).
- Kiểm thử trên Postgres thật (PGlite + schema): 24/24 PASS; trình duyệt: form chặn khi chưa tick đồng ý, gửi đủ trường tách riêng.

### 🚀 Tổng Kết Toàn Bộ Lộ Trình T0 → T9 (Hoàn Tất 12/10/2026)

| Nhiệm vụ | Nội dung thực hiện | Bằng chứng kiểm thử & PR | Trạng thái |
|---|---|---|:---:|
| **T0** | **Khôi phục kết nối Neon Production** | `isDatabaseLive: true`, database `noisy-rain-90838361`, bổ sung đầy đủ cột `specs`, `certification_no` và bảng `projects` | 🟢 **DONE** |
| **T1** | **Catalog 9 nhóm & Header 340px** | Menu header 340px 2 cụm; lọc sản phẩm sticky; chip mobile; đồng bộ 9 nhóm sản phẩm | 🟢 **PR #4 MERGED** |
| **T2** | **Lưu thông tin khách hàng (PR #3)** | Tách cột `leads`; bẫy honeypot chống bot spam; rate limit IP (HMAC) & SĐT; đồng ý consent bắt buộc theo NĐ 13/2023 | 🟢 **PR #3 MERGED** |
| **T3** | **Form báo giá QuoteModal 9 nhóm** | Phân tách 2 khối form: Ngăn cháy (EI, cánh, phụ kiện) & Cơ điện viễn thông (R×C×S, IP54/55/65, vật liệu) | 🟢 **PR #5 MERGED** |
| **T4** | **Sitemap sạch 24 URL & Dynamic SEO** | Sitemap chuẩn 24 URL sạch; router redirect URL cũ 308; dynamic meta tags title/desc/canonical/og:image | 🟢 **PR #6 MERGED** |
| **T5** | **Dự án 1 nguồn dữ liệu `projects`** | Bảng `projects` là nguồn duy nhất; migration `20261012_move_projects.sql` an toàn; màn hình quản trị Dự án; chặn công bố khi chưa xác minh | 🟢 **PR #7 MERGED** |
| **T6** | **Quản trị sản phẩm: Specs, Features, SEO** | Migration `20261012_product_features_and_long_desc.sql`; `SpecsEditor` 2 cột có gợi ý 9 nhóm; textarea tính năng nổi bật & mô tả chi tiết | 🟢 **PR #8 MERGED** |
| **T7** | **Danh sách khách hàng: leadsTotal & CSV** | Cập nhật `leadsTotal` (+1/-1); endpoint `GET /api/leads?format=csv` xuất toàn bộ UTF-8 BOM cho Excel; bộ lọc Nguồn & Sản phẩm | 🟢 **PR #9 MERGED** |
| **T8** | **Menu mobile 2 nhóm phẳng** | Khối danh sách 2 nhóm phẳng theo `PRODUCT_CATEGORY_GROUPS`, touch target $\ge 44$px, đóng menu tự động khi chọn | 🟢 **PR #10 MERGED** |
| **PROD** | **Deploy Production & Fallback Tương Thích** | Cơ chế fallback tương thích ngược tự động cho bảng `products`; Deploy Production hoàn tất trên Vercel `apexhome.vn` với `isDatabaseLive: true` | 🟢 **PR #12 MERGED & LIVE** |
| **IMG** | **Chuẩn Hóa Hình Ảnh 9 Dòng Sản Phẩm** | Cung cấp ảnh chụp sản phẩm công nghiệp sắc nét riêng biệt cho từng nhóm (cửa kính, tủ điện MSB/DB, thang máng cáp, tủ rack 42U, shelter, tủ nguồn outdoor), loại bỏ hoàn toàn việc dùng chung 1 ảnh cửa thép | 🟢 **HOÀN TẤT** |
| **PJ-P0/P1** | **Dự án: Phase 0 & Phase 1 (Schema & Đồng bộ)** | Nhánh `feat/projects-showcase`. Bổ sung `general_contractor` (Tổng thầu) & `apex_role` (Vai trò APEX) cho `projects`. Fallback an toàn (zero-crash) trong `public-content.ts` và `admin/projects.ts`. 178/178 test pass | 🟢 **DONE** |
| **PJ-P2** | **Dự án: Phase 2 (Danh sách /du-an Wireframe)** | Nâng cấp `ProjectsPage.tsx` & `ProjectCard.tsx`: Hàng số liệu uy tín (UC9 tự ẩn khi 0 dự án), bộ lọc chip danh mục, lưới 3 cột thẻ ảnh 4:3, nhãn vai trò `apexRole`, phân trang client 9 thẻ/lần. Đã test 1440px & 375px | 🟢 **DONE** |

---

## 📋 Danh Sách Việc Của Chủ Dự Án (Thao Tác Ngoài Mã Nguồn)

| # | Việc | Hạn / Điều kiện | Hướng dẫn thao tác |
|---|---|---|---|
| **1** | **T0 — Chạy SQL khôi phục Production** | **ĐÃ XONG** | Đã chạy migration trên Neon store `noisy-rain-90838361`, `isDatabaseLive: true`. |
| **2** | **Chạy migration rate limits** | Đã sẵn sàng | File `sql/migrations/20261012_lead_rate_limits.sql` chạy trên Neon SQL Editor. |
| **3** | **Chạy migration T5 & T6 trên Neon** | **ĐÃ XONG** | Đã chạy thành công `20261012_product_features_and_long_desc.sql` và `20261012_move_projects.sql` trên Neon SQL Editor. |
| **3b** | **Chạy migration bổ sung trường Dự án (Phase 1)** | Sẵn sàng chạy | Chạy `sql/migrations/20261014_projects_contractor_role.sql` trên Neon SQL Editor (`ALTER TABLE projects ADD COLUMN IF NOT EXISTS general_contractor TEXT; ALTER TABLE projects ADD COLUMN IF NOT EXISTS apex_role TEXT;`). |
| **4** | **Mắt Bão: Xác nhận thông tin chủ thể qua email** cho `apexhome.vn` | **ĐÃ XONG** | Đã xác thực thành công qua link RAA servlet của Mắt Bão (`Your email address has been verified successfully`). Tên miền an toàn tuyệt đối. |
| **5** | **Mắt Bão: Hoàn tất bản khai "Chờ ký"** | Sớm | Ký điện tử hoặc nộp bản khai tên miền `apexhome.vn`, `apexdoor.cloud`. |
| **6** | **Tạo hộp thư `contact@apexhome.vn`** | Trước khi chạy quảng cáo | Cấu hình hộp thư theo tên miền trên Mắt Bão / Google Workspace. |
| **7** | **Resend Email API** | Trước khi chạy quảng cáo | Tạo tài khoản Resend, xác thực domain `apexhome.vn`, gắn `RESEND_API_KEY` và `NOTIFICATION_EMAIL` trên Vercel. |
| **8** | **Mã đo lường marketing (GTM / GA4 / Pixel)** | Trước khi chạy quảng cáo | Cấu hình các biến `VITE_GTM_ID`, `VITE_GA4_ID`, `VITE_FB_PIXEL_ID` trên Vercel Production và redeploy. |
| **9** | **Nâng Vercel lên gói Pro** | Trước khi chạy quảng cáo | Gói Hobby chỉ phục vụ cá nhân/phi thương mại, nâng Pro để đảm bảo SLA thương mại. |
| **10** | **Nhập danh mục ban đầu dạng nháp trong `/admin`** | Trước khi chạy quảng cáo | Vào `/admin` → Cấu hình → Nhập danh mục ban đầu → rà soát thông số kỹ thuật → Công bố. |
| **11** | **Xóa lead thử nghiệm** | Bất kỳ lúc nào | Vào tab Khách cần tư vấn xóa bản ghi "KIỂM THỬ HỆ THỐNG – xin xóa". |
| **12** | **Xác minh logo đối tác & chứng nhận kiểm định** | Trước khi chạy quảng cáo | Chỉ công bố đối tác và số chứng nhận kiểm định khi có hợp đồng/văn bản xác nhận lưu hành. |
| **13** | **Google Search Console** | Hoàn thành sau T4 | Thêm `apexhome.vn` vào GSC và nộp sitemap: `https://apexhome.vn/sitemap.xml`. |

---

## 🛠️ Hướng Dẫn Thao Tác Ngoài

Để website chính thức chuyển sang chế độ lưu trữ dữ liệu tập trung qua Neon Database:

### 1. Trên Vercel Console:
1. Vào dự án trên Vercel $\rightarrow$ chọn mục **Settings** $\rightarrow$ **Environment Variables**.
2. Thêm 2 biến môi trường:
   - `DATABASE_URL`: Đường dẫn kết nối PostgreSQL do Neon cung cấp.
   - `ADMIN_SESSION_SECRET`: Chuỗi khóa bí mật ngẫu nhiên dài trên 32 ký tự dùng để ký session đăng nhập.
   - *(Tùy chọn)* `RESEND_API_KEY`: Khóa API từ Resend.com.

### 2. Trên Neon Console:
1. Mở mục **SQL Editor** trong dự án Neon.
2. Sao chép và chạy nội dung file [`sql/neon_schema.sql`](../sql/neon_schema.sql) để khởi tạo toàn bộ các bảng và dữ liệu công ty ban đầu.
3. Chạy lệnh tạo tài khoản quản trị đầu tiên tại terminal:
   ```powershell
   node scripts/hash_password.js "MatKhauQuanTriCuaBan" "admin@apexhome.vn"
   ```
   Sau đó sao chép câu lệnh SQL hiển thị trên màn hình và chạy trong Neon SQL Editor.

### 3. Migration Chuyển dữ liệu dự án sang bảng `projects` (T5):
- Chạy [`sql/migrations/20261012_move_projects.sql`](../sql/migrations/20261012_move_projects.sql) trong Neon SQL Editor.

### 4. Migration Thêm cột `features` & `long_description` cho bảng `products` (T6):
- Chạy [`sql/migrations/20261012_product_features_and_long_desc.sql`](../sql/migrations/20261012_product_features_and_long_desc.sql) trong Neon SQL Editor:
  ```sql
---

## 🏗️ Kế Hoạch 7 Phase: Nâng Cấp Hồ Sơ Dự Án Tiêu Biểu (PROMPT-DU-AN.md)
*Tài liệu kỹ thuật*: [`docs/PROMPT-DU-AN.md`](./PROMPT-DU-AN.md) & [`AGENTS.md`](../AGENTS.md).
- **Mục tiêu**: Chuẩn hóa toàn bộ hệ thống trưng bày và quản trị dự án thực tế của APEX, tuân thủ nguyên tắc trung thực tuyệt đối: không sao chép đối thủ, không tự bịa số liệu, chỉ công bố dự án có hồ sơ nghiệm thu thực tế (`verified = true`).

| Phase | Nội dung công việc | Trạng thái | Bằng chứng kiểm thử |
|:---:|:---|:---:|:---|
| **Phase 0** | Khởi tạo nhánh `feat/projects-showcase`, rà soát kiến trúc Neon, API, types, lập kế hoạch. | 🟢 **DONE** | Lập plan chi tiết, người dùng phê duyệt. |
| **Phase 1** | Bổ sung 2 cột `general_contractor` & `apex_role` với migration an toàn idempotency, fallback SELECT API chống crash, cập nhật types và automated integrity tests. | 🟢 **DONE** | Commit `6472f54`, 178/178 test integrity PASS. |
| **Phase 2** | Nâng cấp trang danh sách `/du-an` theo wireframe: Hero + số liệu thật (UC9), chip filter theo category có đếm số, lưới thẻ tỉ lệ 4:3, phân trang client 9 thẻ/lần, chống tràn ngang. | 🟢 **DONE** | Commit `72d9282`, QA 1440px & 375px đạt 0 overflow. |
| **Phase 3** | Nâng cấp trang chi tiết `/du-an/:slug` theo wireframe: Breadcrumb + meta badge bar, ảnh lớn + thumbnail strip tương tác (bàn phím + aria), bảng thông tin tự ẩn dòng trống (UC6), mô tả công trình + cam kết nghiệm thu, thư viện ảnh thi công hiện trường, CTA dự toán + hotline + Zalo, 3 dự án liên quan, lightbox phóng to ảnh, và màn hình thân thiện chuẩn UC4 khi slug không tồn tại. | 🟢 **DONE** | `lint` pass, `build` pass, 178/178 tests PASS, Browser QA 1440px & 375px hoàn thành. |
| **Phase 4** | Admin: Thêm 2 trường `generalContractor` và `apexRole`, kiểm tra upload ảnh & thư viện, điều khiển status & verified (UC4). | ⚪ **CHỜ DUYỆT ĐỂ LÀM** | Sẵn sàng triển khai sau khi duyệt Phase 3. |
| **Phase 5** | SEO + Sitemap cho các slug dự án công khai, Schema.org `CreativeWork`, kiểm tra link cũ. | ⚪ Chưa làm | |
| **Phase 6** | Nhập 3 dự án mẫu dạng chữ vào admin ở trạng thái nháp (`verified=false`). | ⚪ Chưa làm | |




