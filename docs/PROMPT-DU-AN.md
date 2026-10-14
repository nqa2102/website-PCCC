# Prompt cho Antigravity: Tính năng "Dự án tiêu biểu"

> Copy phần dưới đường kẻ, dán vào Antigravity. Làm **tuần tự từng PHASE**, mỗi phase 1 commit/PR riêng và **DỪNG cho chủ dự án duyệt** rồi mới sang phase sau.

---

Bạn làm trên repo website APEX VN. Đọc `AGENTS.md` trước và tuân thủ. Mục tiêu: nâng cấp trang **Dự án** để trưng bày các công trình APEX đã tham gia, tăng uy tín với khách.

## Hiện trạng (ĐÃ CÓ sẵn — đọc kỹ trước, không làm lại)
- Bảng Neon `projects`: `id, title, slug, client_name, category, location, completed_year, description, cover_image, gallery, status, verified, verified_note`.
- `src/pages/ProjectsPage.tsx` (trang dự án hiện tại, cần nâng cấp).
- `src/routing.ts`: `/du-an` → tab `projects`; `/du-an/:slug` → chi tiết (đã có).
- `api/public-content.ts`: trả `projects` (công khai).
- `api/admin/projects.ts`: CRUD dự án.
- `src/admin/adminData.ts` → `mapProjects()`: **chỉ hiển thị công khai dự án `verified = true` và `status = 'published'`** (giữ nguyên quy tắc này).
- `src/admin/adminTypes.ts` → `interface AdminProject`.
- `src/types` → `Project`.

## Bố cục đích (đã được chủ dự án duyệt — bám theo)
**Trang danh sách `/du-an`:** Hero (tiêu đề "Dự án tiêu biểu" + giới thiệu ngắn + **hàng số liệu uy tín**) → **bộ lọc theo loại hạng mục** → **lưới thẻ dự án** (ảnh + tên + địa điểm · năm + nhãn vai trò) → nút "Xem thêm".
**Trang chi tiết `/du-an/:slug`:** breadcrumb + tên + địa điểm/thời gian → **ảnh lớn + thư viện ảnh nhỏ** → **bảng thông tin** (Chủ đầu tư · Tổng thầu · Hạng mục · Vai trò APEX · Thời gian) → mô tả → **thư viện ảnh thi công/nghiệm thu** → **CTA liên hệ/báo giá** → **dự án khác**.

## Use case bắt buộc đúng (Definition of Done cho cả tính năng)
- **UC1** `/du-an` hiển thị hero + số liệu + bộ lọc + lưới, **chỉ** dự án `verified=true & status=published`.
- **UC2** Bấm chip lọc theo loại hạng mục → lưới lọc đúng, "Tất cả" hiện hết.
- **UC3** Bấm 1 dự án → `/du-an/<slug>` hiện đủ: ảnh lớn + thư viện + bảng thông tin + mô tả + ảnh công trình + CTA + dự án khác.
- **UC4** Dự án `verified=false` hoặc chưa publish → **không** xuất hiện ở cả danh sách lẫn truy cập trực tiếp URL (trả về trạng thái "không tìm thấy / đang cập nhật").
- **UC5** Trong admin: tạo/sửa dự án với **đủ trường mới** (Tổng thầu, Vai trò APEX), tải ảnh bìa + thư viện, chuyển trạng thái nháp→chờ duyệt→công bố và bật `verified`.
- **UC6** Trường trống (vd chưa có Tổng thầu) → **ẩn dòng đó**, không vỡ giao diện.
- **UC7** Responsive 1440px & 375px, không tràn ngang; link cũ `/du-an` không vỡ.
- **UC8** SEO: sitemap có `/du-an` và từng `/du-an/<slug>` (chỉ dự án công khai); canonical + OG mỗi trang.
- **UC9** **Số liệu uy tín không được bịa** — tính từ dữ liệu thật (đếm số dự án công khai, số tỉnh/thành) hoặc lấy từ hằng số cấu hình do chủ dự án điền; nếu chưa có thì ẩn khối số liệu.

---

## PHASE 0 — Chuẩn bị (DỪNG duyệt)
- `git checkout main && git pull`, tạo nhánh `feat/projects-showcase`.
- Đọc toàn bộ file ở mục "Hiện trạng". Ghi lại luồng dữ liệu projects (Neon → api → adminData → page).
- **Dừng:** báo cáo hiểu hiện trạng + xác nhận 2 trường cần thêm (`general_contractor`, `apex_role`).

## PHASE 1 — Thêm 2 trường dữ liệu, đồng bộ toàn tuyến (DỪNG duyệt)
Thêm **Tổng thầu** và **Vai trò APEX** (bổ sung, không phá dữ liệu cũ):
- `sql/neon_schema.sql`: thêm cột `general_contractor TEXT`, `apex_role TEXT` vào bảng projects.
- Tạo file migration mới `sql/migrations/<ngày>_projects_contractor_role.sql`:
  ```sql
  ALTER TABLE projects ADD COLUMN IF NOT EXISTS general_contractor TEXT;
  ALTER TABLE projects ADD COLUMN IF NOT EXISTS apex_role TEXT;
  ```
- `adminTypes.ts` `AdminProject`: thêm `generalContractor?: string; apexRole?: string;`.
- `api/admin/projects.ts`: thêm 2 cột vào SELECT, INSERT, UPDATE ... ON CONFLICT (map `general_contractor as "generalContractor"`, `apex_role as "apexRole"`). Nhớ import trong `api/` có đuôi `.js`.
- `api/public-content.ts`: thêm 2 cột vào SELECT projects.
- `src/types` `Project` + `adminData.ts mapProjects`: thêm `generalContractor`, `apexRole`.
- **Không tự chạy SQL trên Neon.** Ghi rõ câu SQL để chủ dự án tự chạy (xem "Việc của chủ dự án").
- Viết fallback an toàn: nếu cột chưa có trong DB, API không được crash (giống cách xử lý `features/long_description` trước đây — try/catch fallback SELECT).
- **Dừng + bằng chứng:** `npm run lint`/`build` pass; mô tả câu SQL chủ dự án cần chạy.

## PHASE 2 — Trang danh sách `/du-an` theo wireframe (DỪNG duyệt)
Nâng cấp `src/pages/ProjectsPage.tsx` (chế độ danh sách):
- Hero: tiêu đề + 1 đoạn giới thiệu ngắn + **hàng số liệu** (UC9: đếm từ dữ liệu thật — số dự án công khai, số tỉnh/thành khác nhau; nếu 0 dự án thì ẩn khối số liệu).
- **Bộ lọc chip** theo `category` của dự án (Tất cả + các loại có dữ liệu). Lọc ở client.
- **Lưới thẻ** (`grid sm:2 lg:3`): ảnh bìa (tỉ lệ 4:3), tên, `location · completed_year`, nhãn vai trò (`apexRole` nếu có). Bấm thẻ → `/du-an/<slug>`.
- Trạng thái rỗng: nếu chưa có dự án công khai → thông báo "đang cập nhật" + nút liên hệ.
- "Xem thêm" phân trang client (vd 9 thẻ/lần).
- **Dừng + bằng chứng:** ảnh 1440px & 375px; `lint`/`build`.

## PHASE 3 — Trang chi tiết `/du-an/:slug` theo wireframe (DỪNG duyệt)
Trong `ProjectsPage.tsx` (hoặc tách `ProjectDetail`):
- Lấy dự án theo slug; nếu không tìm thấy / chưa công khai → trạng thái "không tìm thấy" (UC4).
- Breadcrumb + tên + `location` · `completed_year`.
- Ảnh lớn + **thư viện thumbnail** (bấm đổi ảnh, có bàn phím + `aria`), nguồn từ `coverImage` + `gallery`.
- **Bảng thông tin**: Chủ đầu tư (`clientName`) · Tổng thầu (`generalContractor`) · Hạng mục (`category`) · Vai trò APEX (`apexRole`) · Thời gian (`completedYear`). Trường trống thì **ẩn dòng** (UC6).
- Mô tả (`description`).
- Thư viện ảnh thi công (phần còn lại của `gallery`).
- **CTA**: nút "Nhận báo giá" (mở QuoteModal) + "Liên hệ" (hotline/Zalo từ `useLiveData().company`).
- **Dự án khác**: 3 dự án công khai khác (ưu tiên cùng `category`).
- **Dừng + bằng chứng:** ảnh 1440px & 375px của 1 dự án mẫu; `lint`/`build`.

## PHASE 4 — Admin: thêm 2 trường + đảm bảo tải ảnh & duyệt (DỪNG duyệt)
- Trong màn quản trị dự án (`src/admin/AdminApp.tsx`): thêm ô nhập **Tổng thầu** và **Vai trò APEX**; đảm bảo tải **ảnh bìa** và **thư viện ảnh** (dùng cơ chế upload Blob hiện có), và điều khiển `status` (nháp/chờ/công bố) + `verified`.
- Lưu qua `api/admin/projects.ts` (đã cập nhật ở Phase 1).
- **Dừng + bằng chứng:** tạo thử 1 dự án nháp (không verified) và xác nhận nó **không** hiện ngoài trang công khai (UC4).

## PHASE 5 — SEO + dọn dẹp + link cũ (DỪNG duyệt)
- Sitemap: thêm `/du-an` và từng `/du-an/<slug>` của dự án công khai.
- `applySeo` cho trang danh sách và từng dự án (title/description/OG dùng ảnh bìa). Schema.org dạng `CreativeWork`/`Project` nếu phù hợp.
- Kiểm tra link cũ `/du-an` không vỡ.
- **Dừng + bằng chứng:** `lint`/`build`/`node scripts/test_integrity.js` pass.

## PHASE 6 — Nhập 3 dự án mẫu (chỉ chữ, DỪNG duyệt)
- Nhập **nội dung chữ** 3 dự án chủ dự án đã cung cấp vào admin, để **trạng thái nháp, `verified=false`** (chưa công khai):
  1. Viện kiểm sát tỉnh Quảng Ninh
  2. Tòa án tỉnh Quảng Ninh
  3. Tòa nhà đa năng KV I – Học viện Hậu Cần (Chủ đầu tư: Học viện Hậu Cần; Tổng thầu: Tổng công ty 789/BQP; Vai trò APEX: Nghiệm thu hoàn thành gói cửa chống cháy; Địa điểm: Long Biên, Hà Nội; Thời gian: 22/5/2026)
- **Chưa gắn ảnh** (chủ dự án sẽ bổ sung ảnh từ thư mục sau). **Không bịa** chủ đầu tư/tổng thầu/thời gian cho dự án 1, 2 — để trống nếu chưa có.
- **Không tự công khai** (verified vẫn false) — chủ dự án tự xác minh và bật verified sau.

---

## Quy tắc chung
- Mỗi phase 1 commit/PR + ảnh chụp 1440px & 375px; **dừng cho chủ dự án duyệt**.
- Không deploy, không merge, không chạy SQL Neon — chủ dự án tự làm.
- Migration **chỉ bổ sung**, không xóa/sửa dữ liệu cũ. Import trong `api/` có đuôi `.js`.
- **Không công khai dự án chưa `verified`**; **không bịa** chủ đầu tư, tổng thầu, số liệu uy tín, thời gian.
- Ghi đúng **vai trò thật của APEX** theo từng dự án (nghiệm thu / cung cấp / thi công), không nói chung chung APEX làm tất cả.

## Việc của chủ dự án (ngoài Antigravity)
| Việc | Khi nào |
|---|---|
| Chạy SQL thêm cột trên Neon (`ALTER TABLE projects ADD COLUMN ...`) | Sau Phase 1, trước khi deploy |
| Cung cấp ảnh dự án (thư mục `ảnh/ảnh website pccc`) | Trước khi công khai |
| Xác minh & bật `verified` cho từng dự án | Trước khi công khai |
| Cung cấp chủ đầu tư/tổng thầu/thời gian cho dự án 1, 2 | Phase 6 |
| Chốt số liệu uy tín (nếu muốn hiện cố định) | Phase 2 |
