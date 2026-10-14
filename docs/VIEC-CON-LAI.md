# Bàn giao việc còn lại — Website APEX VN (apexhome.vn)

*Lập ngày 12/10/2026 · Dành cho AI agent (Antigravity) xử lý tiếp · Đọc kèm [`AGENTS.md`](../AGENTS.md) và [`GO-LIVE-STATUS.md`](./GO-LIVE-STATUS.md)*

---

## 0. Lệnh khởi động (dán vào Antigravity)

> Bạn tiếp quản dự án website APEX VN tại thư mục này. Đọc `AGENTS.md`, rồi đọc toàn bộ `docs/VIEC-CON-LAI.md`.
> Làm lần lượt các việc **T1 → T9** theo đúng thứ tự, mỗi việc một nhánh git và một Pull Request vào `main` (repo `nqa2102/website-PCCC`). Không push thẳng `main`.
> Với mỗi việc: làm đúng phần "Các bước", tuân thủ "Không được làm", chạy đủ "Kiểm thử", chỉ báo xong khi đạt "Xong khi" và dán bằng chứng (output lệnh) vào mô tả PR. Sau mỗi việc cập nhật `docs/GO-LIVE-STATUS.md`.
> Việc **T0** do chủ dự án tự chạy trên Neon — nếu `curl https://apexhome.vn/api/public-content` vẫn trả `"isDatabaseLive": false`, dừng lại và nhắc chủ dự án làm T0 trước.
> Mọi bước cần tài khoản bên ngoài (Neon, Vercel, Mắt Bão, Resend, Google): không tự làm, ghi rõ vào phần "Việc của chủ dự án" và tiếp tục việc độc lập.

---

## 1. Bối cảnh

| Mục | Giá trị |
|---|---|
| Website | https://apexhome.vn (`www` chuyển 308 về đây). Tên miền ở Mắt Bão, DNS trỏ Vercel |
| Repo | GitHub `nqa2102/website-PCCC`, nhánh chính `main` |
| Stack | React 19 + Vite + Tailwind v4 (SPA), Vercel Functions trong `api/` (Node, ESM), Neon PostgreSQL (`@neondatabase/serverless`), Vercel Blob (ảnh/PDF) |
| Vercel | Team `nguyen-quang-anh`, project `website-pccc`. Production deploy tự động từ `main`; mỗi PR có Preview |
| Neon | Store `neon-amethyst-pillar`, branch `main`, database `neondb`. **Preview và Production dùng chung database này** |
| Biến môi trường (Vercel) | `DATABASE_URL` (sensitive), `ADMIN_SESSION_SECRET` (sensitive), `BLOB_READ_WRITE_TOKEN`. Chưa có: `RESEND_API_KEY`, `NOTIFICATION_EMAIL`, `RESEND_FROM`, `VITE_GTM_ID`, `VITE_GA4_ID`, `VITE_GOOGLE_ADS_ID`, `VITE_GOOGLE_ADS_LEAD_LABEL`, `VITE_META_PIXEL_ID` |
| Doanh nghiệp | Công ty TNHH Apex VN · MST 0111651857 · Trụ sở: Số 10 Ngõ 25 Đường 422B, Xã Sơn Đồng, TP. Hà Nội · Hotline 0566 38 5555 · Email `contact@apexhome.vn` (hộp thư **chưa tồn tại**) |
| Kiểm thử | `npm run lint` (tsc), `npm run build`, `node scripts/test_integrity.js` |

### Trạng thái lúc bàn giao

| Hạng mục | Trạng thái |
|---|---|
| `main` | `4175900` (đã deploy production). Gồm catalog 9 nhóm sản phẩm (`01d02f7`), đo lường quảng cáo + banner cookie + GTM (PR #2) |
| **Production** | ⚠️ **Lỗi:** `/api/public-content` → `NeonDbError: column "certification_no" does not exist`. Website đang hiện dữ liệu tĩnh trong code, không đọc Neon. Trang quản trị Sản phẩm lỗi. Cách sửa: **T0** |
| PR #3 `fix/lead-capture` | Mở, base đang là `feat/ads-tracking` (đã merge) → phải chuyển sang `main`. Xung đột 1 file: `src/admin/adminRepository.ts` |
| Thư mục làm việc trên `main` | 6 file chưa commit + file này (xem **T1**) |
| Worktree phụ | `D:\ELMICH\Apex-pccc\website-PCCC-leadfix` (nhánh `fix/lead-capture`). `node_modules` trong đó là **junction** trỏ về `website-PCCC-main\node_modules` |

---

## 2. Quy tắc bắt buộc (rút ra từ lỗi đã gặp)

1. **Migration chạy trên Neon TRƯỚC khi merge code dùng cột/bảng mới.** Preview dùng chung DB với Production, nên có thể kiểm tra trên Preview sau khi migration đã chạy. Production đang lỗi chính vì vi phạm quy tắc này.
2. **Migration chỉ được thêm**: `ADD COLUMN IF NOT EXISTS`, `CREATE TABLE/INDEX IF NOT EXISTS`, phải chạy lại nhiều lần an toàn. Không `DROP`, không `UPDATE` đổi nghĩa dữ liệu khi chưa có xác nhận của chủ dự án. Ràng buộc mới trên bảng có dữ liệu dùng `NOT VALID`.
3. Agent **không tự chạy SQL trên Neon** (không có quyền, `DATABASE_URL` là biến sensitive). Viết file `sql/migrations/YYYYMMDD_ten.sql`, cập nhật `sql/neon_schema.sql`, rồi ghi vào "Việc của chủ dự án".
4. `package.json` có `"type": "module"` → mọi import tương đối trong `api/` **phải có đuôi `.js`** (`from '../_db.js'`). Thiếu đuôi = mọi API trả 500 trên Vercel. `scripts/test_integrity.js` đã kiểm tra.
5. Đồng bộ 4 lớp khi thêm trường dữ liệu: `sql/` (schema + migration) ↔ `api/` (SELECT/INSERT) ↔ `src/admin/adminTypes.ts` + `src/types/index.ts` ↔ `src/admin/adminData.ts` (mapper) / màn hình quản trị.
6. API quản trị dùng `requireAdminRole(req, res, ROLE_ACCESS.<khu vực>)` từ `api/_db.ts`. Chỉ `admin` được công bố (`canPublish`) và xóa (`ROLE_ACCESS.destructive`). Giữ nguyên ma trận quyền.
7. CSP trong `vercel.json` chỉ cho phép Google (GA4/Ads/GTM) và Meta. Thêm dịch vụ bên thứ ba → bổ sung tên miền vào CSP và kiểm tra trình duyệt không có lỗi "violates the following Content Security Policy".
8. Không đưa mật khẩu, API key, token vào mã nguồn, log hay chat. Tài khoản admin tạo bằng `npm run admin-temp-password` (người dùng tự chạy).
9. Không công bố thông tin chưa xác minh: dự án, logo đối tác, số chứng nhận kiểm định, tên khách hàng (AGENTS.md mục 5).
10. Giao diện: kiểm tra ở **1440px** và **375px**; không thanh cuộn ngang toàn trang; nút ≥ 40px chiều cao; có `focus-visible`; ảnh có `alt`.
11. SQL đặc thù Postgres (tuple compare, `regexp_replace`, `make_interval`, JSONB): kiểm thử bằng Postgres thật — PGlite (`npm i -D @electric-sql/pglite`) nạp `sql/neon_schema.sql`, chạy handler API qua adapter `neon()` → `db.query(text, values)`.

---

## 3. Danh sách việc

### T0 — [Chủ dự án làm ngay] Khôi phục kết nối Neon trên Production

**Bối cảnh:** code catalog 9 nhóm đã deploy nhưng cột `certification_no`, `specs` và bảng `projects` chưa có trên Neon.
**Không chạy** file `sql/migrations/20261012_products_and_projects.sql` hiện tại: nó đổi `accessories` (phụ kiện chống cháy) thành `tu-dien` (tủ điện) — sai nghĩa.

Chạy đoạn sau trong **Neon → SQL Editor** (branch `main`, database `neondb`). Đã kiểm thử trên Postgres: chạy lại 2 lần an toàn, dữ liệu cũ giữ nguyên, nhóm sai bị chặn ở bản ghi mới.

```sql
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
```

**Xong khi:** `curl https://apexhome.vn/api/public-content` trả `"isDatabaseLive": true`; Vercel logs (Production) không còn `certification_no does not exist`; `/admin` → Sản phẩm tải được danh sách.

---

### T1 — Đưa thay đổi chưa commit ra khỏi `main` + sửa file migration trong repo

**Nhánh:** `feat/catalog-ui` (tạo từ trạng thái hiện tại: `git switch -c feat/catalog-ui` — mang theo thay đổi chưa commit).

**Các file chưa commit và nội dung:**

| File | Thay đổi | Xử lý |
|---|---|---|
| `src/components/Header.tsx` | Menu Sản phẩm desktop: bỏ mega menu 2 cột (840px) → **danh sách 340px chia 2 nhóm** ("Giải pháp ngăn cháy" 4 nhóm, "Cơ điện & viễn thông" 5 nhóm); đóng menu sau khi chọn (`productMenuSuppressed`), Esc đóng | Đã kiểm thử 1440px → commit |
| `src/pages/ProductsPage.tsx` | Trang `/san-pham`: đầu trang gọn (H1 = tên nhóm), **cột lọc trái sticky** có số sản phẩm/nhóm, lưới sản phẩm hiện ngay màn hình đầu; điện thoại: chip cuộn ngang, ẩn nút báo giá trùng; bảng EI + cấu tạo 5 lớp **chỉ hiện ở nhóm cửa thép**; trạng thái trống có nút báo giá; bỏ tự cuộn | Đã kiểm thử 1440px + 375px → commit |
| `src/components/products/ProductCard.tsx` | Chân thẻ: bỏ "Dự toán cấu hình: Liên hệ"; giá chỉ hiện khi có giá thật; 2 nút chia đều, cao 40px, không xuống dòng | Commit |
| `src/components/products/ProductCategoryGrid.tsx` | Thêm `PRODUCT_CATEGORY_GROUPS` (dùng chung menu + trang) | Commit |
| `src/App.tsx` | Header truyền `category` cho `onOpenQuote` và `productId` cho `onSelectProductCategory` | Kiểm tra chạy đúng → commit |
| `src/data/mockData.ts` | Thêm nhiều sản phẩm tĩnh (`cua-thep-ei70-1-canh`, `cua-cuon-aks-ei70`, …) — dữ liệu dự phòng và nguồn của "Nhập danh mục ban đầu" | **Không thêm số chứng nhận/kiểm định chưa xác minh**: để trống `certificationNo` nếu chưa có bản gốc. Commit riêng, ghi rõ trong PR là dữ liệu mẫu cần rà soát |
| `docs/VIEC-CON-LAI.md` | File này | Commit |

**Sửa thêm trong cùng nhánh:**
- `sql/migrations/20261012_products_and_projects.sql`: thay nội dung bằng đoạn SQL ở **T0** (bỏ `UPDATE … accessories → tu-dien`, thêm `NOT VALID`).
- `sql/neon_schema.sql`: thêm vào `CREATE TABLE products` hai cột `certification_no TEXT`, `specs JSONB DEFAULT '{}'::jsonb`; thêm `CREATE TABLE IF NOT EXISTS projects (…)` + 3 index như T0; giữ nguyên các bảng khác. Đảm bảo chạy file 2 lần không lỗi.

**Kiểm thử:** `npm run lint`, `npm run build`, `node scripts/test_integrity.js`; PGlite: nạp `sql/neon_schema.sql` hai lần không lỗi. Trình duyệt: hover menu Sản phẩm → 9 mục 2 nhóm; bấm "Tủ rack" → URL `/san-pham/tu-rack`, H1 đúng, menu đóng, không có bảng EI; bấm "Cửa thép" → có bảng EI; 375px không cuộn ngang.

**Xong khi:** `git status` trên `main` sạch; PR `feat/catalog-ui` có bằng chứng kiểm thử; Preview hiển thị đúng.

**Không được làm:** push thẳng `main`; xóa thay đổi trong `mockData.ts` khi chưa hiểu mục đích.

---

### T2 — Hoàn tất PR #3 (lưu thông tin khách hàng)

**Bối cảnh:** PR #3 (`fix/lead-capture`) đã kiểm thử 24/24 trên Postgres thật. Nội dung:
- Form báo giá: ô **đồng ý xử lý dữ liệu bắt buộc** (mặc định không tick), honeypot `website`, ô Công ty.
- API `POST /api/leads`: từ chối nếu `consent !== true` (NĐ 13/2023), lưu `consent_at`; kiểm tra email; cắt độ dài theo cột; giới hạn **3 lead/10 phút/SĐT** (bảng `leads`) và **5 lead/10 phút/IP** (bảng `lead_rate_limits`, IP băm HMAC bằng `ADMIN_SESSION_SECRET`, không lưu IP thô); thiếu bảng thì vẫn nhận lead.
- `GET /api/leads`: phân trang con trỏ `?before=<ISO>&beforeId=<id>&limit=` (so sánh `date_trunc('milliseconds', created_at), id`), trả `hasMore`, `total`. Admin có nút "Tải thêm".
- Migration `sql/migrations/20261012_lead_rate_limits.sql`.

**Các bước:**
1. `gh pr edit 3 --repo nqa2102/website-PCCC --base main`
2. Làm việc trong worktree `D:\ELMICH\Apex-pccc\website-PCCC-leadfix` (hoặc checkout `fix/lead-capture`): `git fetch origin && git merge origin/main`.
3. Xử lý xung đột `src/admin/adminRepository.ts` — **giữ cả hai phía**. Hàm `loadRemoteAdminState` kết quả đúng:
   ```ts
   const [leadsRes, productsRes, projectsRes, documentsRes, contentsRes, companyRes, activitiesRes] = await Promise.all([
     fetchJson<LeadPage>('/api/leads'),
     fetchJson<{ products: AdminProduct[] }>('/api/admin/products'),
     fetchJson<{ projects: AdminProject[] }>('/api/admin/projects').catch(() => ({ projects: [] })),
     fetchJson<{ documents: AdminDocument[] }>('/api/admin/documents'),
     fetchJson<{ contents: AdminContent[] }>('/api/admin/contents'),
     fetchJson<{ company: AdminCompany | null }>('/api/admin/settings'),
     fetchJson<{ activities: AdminActivity[] }>('/api/admin/activities').catch(() => ({ activities: [] })),
   ]);
   return {
     leads: leadsRes.leads || [],
     leadsHasMore: Boolean(leadsRes.hasMore),
     leadsTotal: leadsRes.total ?? (leadsRes.leads || []).length,
     products: productsRes.products || [],
     projects: projectsRes.projects || [],
     // …các trường còn lại như phía main
   };
   ```
   Giữ `interface LeadPage`, `loadMoreLeads`, và các hàm `saveRemoteProject` / `deleteRemoteProject` của phía main.
4. `npm run lint`, `npm run build`, `node scripts/test_integrity.js`; push; chờ Preview.
5. Ghi "Việc của chủ dự án": chạy `sql/migrations/20261012_lead_rate_limits.sql` trên Neon (chỉ thêm bảng + index).

**Kiểm thử trên Preview (sau migration):** gửi form báo giá không tick đồng ý → bị chặn; tick → thành công, `/admin` → Khách hàng hiện lead có Công ty, Địa điểm, Cấp chịu lửa, Nguồn "Form báo giá website"; gửi cùng SĐT 4 lần trong 10 phút → lần 4 báo "gửi nhiều yêu cầu" (HTTP 429).

**Xong khi:** PR #3 merge vào `main`; các kiểm thử trên đạt; đã xóa lead thử.

---

### T3 — Form báo giá theo 9 nhóm sản phẩm

**Vấn đề:** `src/components/QuoteModal.tsx` → `PRODUCT_OPTIONS` vẫn dùng ID cũ (`steel-door`, `glass-door`, `roller-shutter`, `fire-curtain`). Nút "Báo giá" ở trang sản phẩm/menu truyền slug mới (`cua-thep-ngan-chay`…) nên form **không chọn sẵn đúng nhóm**, và **không có 5 nhóm cơ điện – viễn thông**. (Làm sau T2 vì T2 cũng sửa file này.)

**Đặc tả:**
- Danh sách nhóm lấy từ `PRODUCT_CATEGORY_DEFINITIONS` (9 slug). Nhận `preselectedProduct` là slug mới; chấp nhận slug cũ qua `normalizeCategory()` trong `src/routing.ts`.
- Cấu hình trường theo nhóm (một object `QUOTE_FIELDS_BY_GROUP`):
  - **Nhóm ngăn cháy** (`cua-thep-ngan-chay`, `cua-kinh-ngan-chay`, `cua-cuon-ngan-chay`, `rem-ngan-chay`): giữ các trường hiện có — cấp chịu lửa EI (EI60/70/90/120), kiểu cánh (chỉ cửa thép/kính), kích thước R×C (mm), số lượng, phụ kiện (tay co, thanh thoát hiểm, ô kính — chỉ cửa thép/kính).
  - **Nhóm cơ điện – viễn thông** (`tu-dien`, `thang-mang-cap`, `tu-rack`, `nha-tram-shelter`, `tu-nguon-outdoor`): ẩn EI, kiểu cánh, phụ kiện cửa. Hiện: kích thước R×C×S (mm) (thang máng cáp: R×C (mm) + chiều dài (m)), số lượng, vật liệu/độ dày tôn (tùy chọn), cấp bảo vệ IP (chỉ tủ điện / tủ nguồn outdoor / shelter: IP54, IP55, IP65), hoàn thiện (sơn tĩnh điện / mạ kẽm / nhúng nóng).
- Gửi lên API (giữ cấu trúc PR #3): `productInterest` = tên nhóm; `fireRating` chỉ gửi với nhóm ngăn cháy; `message` = tóm tắt thông số đã chọn; `formName: 'quote'`.
- Giá trị mặc định kích thước theo nhóm (ví dụ cửa thép 900×2200, tủ rack 600×1000×2000) — đặt trong cấu hình, không rải trong JSX.

**Kiểm thử:** từ trang mỗi nhóm bấm "Báo giá" → form chọn sẵn đúng nhóm (9/9); đổi sang "Tủ rack" → không còn trường EI; gửi thử trên Preview → lead có `product_interest` = "Tủ Rack Mạng & Server", `fire_rating` rỗng.

**Xong khi:** 9 nhóm chọn sẵn đúng; trường hiển thị đúng theo nhóm; lint/build/test PASS; ảnh chụp form 1440px + 375px trong PR.

---

### T4 — Sitemap và SEO theo nhóm / sản phẩm

**Vấn đề:**
- `public/sitemap.xml` còn `https://apexhome.vn/san-pham?nhom=steel-door|glass-door|roller-shutter|fire-curtain` (ID cũ); thiếu 5 nhóm mới và trang chi tiết sản phẩm.
- `applySeo(tab, itemName)` trong `src/routing.ts` dùng chung tiêu đề/mô tả "Sản phẩm" cho mọi nhóm; trang chi tiết không dùng `seo_title` / `seo_description` / `image_alt` đã lưu.

**Các bước:**
1. Sitemap: thay 4 URL `?nhom=` bằng 9 URL `https://apexhome.vn/san-pham/<slug>`; giữ các trang tĩnh khác; thêm `/du-an` nếu có dự án công bố. Cập nhật `scripts/test_integrity.js` (đang kiểm tra URL trang chủ trong sitemap) nếu cần.
2. URL cũ: kiểm tra `/san-pham?nhom=steel-door` hiển thị nhóm Cửa thép và `history.replaceState` về `/san-pham/cua-thep-ngan-chay` (dùng `normalizeCategory`). Canonical = URL mới.
3. `applySeo`: mở rộng nhận `{ title?, description?, image? }`. Trang nhóm: `"<Tên nhóm> | APEX Việt Nam"` + `shortDesc`. Trang chi tiết: `seoTitle || "<Tên sản phẩm> | APEX Việt Nam"`, `seoDescription || mô tả ngắn`, `og:image` = ảnh sản phẩm (URL tuyệt đối).
4. Canonical giữ quy tắc hiện tại: `SITE_URL` + pathname (+ `?nhom=` nếu còn), bỏ `utm_*`.

**Kiểm thử:** mọi `<loc>` trong sitemap mở được (HTTP 200) và trang có `<link rel="canonical">` trùng URL đó; `document.title` đúng ở 1 trang nhóm và 1 trang chi tiết.

**Xong khi:** sitemap 100% URL mới; tiêu đề/mô tả riêng từng nhóm và sản phẩm.

---

### T5 — Dự án tiêu biểu: một nguồn dữ liệu + màn hình quản trị

**Vấn đề:** dự án đang ở **2 nơi**:
- bảng `contents` (`type = 'project'`) — màn hình quản trị Nội dung đang sửa loại này (`src/admin/AdminApp.tsx`, editor `data.type === 'project'`);
- bảng `projects` mới (API `api/admin/projects.ts` đã có: chỉ admin set `verified = true`, bắt buộc `verified_note`) — **chưa có màn hình quản trị**.
`/api/public-content` trả cả hai; `mapProjects(contents, remoteProjects)` trong `src/admin/adminData.ts` gộp.

**Quyết định:** dùng **bảng `projects`** làm nguồn duy nhất (có cờ xác minh, gallery).

**Các bước:**
1. Migration chuyển dữ liệu (chỉ thêm, chạy lại an toàn) `sql/migrations/YYYYMMDD_move_projects.sql`:
   ```sql
   INSERT INTO projects (id, title, slug, client_name, category, location, completed_year, description, cover_image, status, verified, verified_note)
   SELECT c.id, c.title, c.id, c.client, c.category, c.location,
          NULLIF(regexp_replace(COALESCE(c.year, ''), '[^0-9]', '', 'g'), '')::int,
          c.summary, c.image,
          CASE WHEN c.status = 'published' THEN 'review' ELSE c.status END,  -- buộc xác minh lại
          false, NULL
   FROM contents c WHERE c.type = 'project'
   ON CONFLICT (id) DO NOTHING;
   ```
   (Không xóa bản ghi trong `contents`; chỉ ẩn khỏi giao diện.)
2. Màn hình quản trị "Dự án" (thêm vào `NAV_ITEMS` + `permittedViews` cho `admin`, `editor`):
   - Bảng danh sách: tiêu đề, nhóm, địa điểm, năm, trạng thái, **Đã xác minh** (có/không).
   - Editor: tiêu đề, slug (tự sinh từ tiêu đề, sửa được), nhóm (9 slug), khách hàng (để trống nếu chưa được phép nêu tên), địa điểm, năm hoàn thành, mô tả, **ảnh bìa** + **gallery** (dùng `UploadField kind="images"`, gallery là danh sách nhiều ảnh), trạng thái (`StatusSelect`, chỉ admin chọn "Đã công bố"), **Đã xác minh** (checkbox chỉ admin) + **Ghi chú xác minh** (bắt buộc khi tick: ai xác nhận, ngày, văn bản nào).
   - Lưu/xóa qua `saveRemoteProject` / `deleteRemoteProject` (đã có trong `adminRepository.ts`).
3. Bỏ lựa chọn "Hồ sơ dự án" khỏi editor Nội dung (giữ "Bài viết", "Trang tĩnh").
4. `mapProjects` chỉ lấy từ `projects` (`verified = true` và `status = 'published'`); `/api/public-content` bỏ phần dự án từ `contents`.
5. API: chặn công bố khi `verified = false` (trả 400 "Dự án phải được xác minh trước khi công bố").

**Kiểm thử:** PGlite cho migration (2 lần an toàn) và API (editor lưu `verified=true` → 403; admin không có ghi chú → 400; admin công bố khi chưa verified → 400). Trình duyệt: tạo dự án có ảnh → công bố + xác minh → hiện ở `/du-an`; bỏ xác minh → biến mất.

**Xong khi:** một nguồn dữ liệu; admin quản lý dự án đầy đủ; `/du-an` chỉ hiện dự án đã xác minh.

**Không được làm:** công bố dự án mẫu (`PROJECT_SAMPLES` trong `mockData.ts`); xóa dữ liệu trong `contents`.

---

### T6 — Trang quản trị sản phẩm: sửa được thông số, tính năng, mô tả, SEO

**Vấn đề:** cột `specs` (JSONB) và `certification_no` đã có, nhưng editor sản phẩm chỉ có ô số chứng nhận; không sửa được thông số, tính năng nổi bật, mô tả dài. Trường SEO lưu nhưng website không dùng (xem T4).

**Các bước:**
1. Migration (chỉ thêm): `ALTER TABLE products ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb; ALTER TABLE products ADD COLUMN IF NOT EXISTS long_description TEXT;` → cập nhật `sql/neon_schema.sql`.
2. API `api/admin/products.ts` + `api/public-content.ts`: SELECT/INSERT/UPSERT `features`, `long_description` (đã có `specs`, `certification_no`). Kiểm tra `features` là mảng chuỗi (tối đa 12 mục, mỗi mục ≤ 200 ký tự), `specs` là object chuỗi→chuỗi (tối đa 30 cặp).
3. Kiểu dữ liệu: `AdminProduct` thêm `features?: string[]`, `longDescription?: string`; mapper `mapProducts` trong `adminData.ts` ưu tiên dữ liệu Neon, rơi về dữ liệu tĩnh khi trống.
4. Editor (`ProductEditor` trong `AdminApp.tsx`):
   - **Thông số kỹ thuật:** bảng 2 cột Tên – Giá trị, nút "Thêm dòng", xóa từng dòng, sắp xếp lên/xuống; gợi ý tên thông số theo nhóm (cửa: Độ dày thép, Lõi cách nhiệt, Hoàn thiện…; tủ điện: Kích thước, Độ dày tôn, Cấp IP…).
   - **Tính năng nổi bật:** textarea, mỗi dòng một tính năng.
   - **Mô tả chi tiết:** textarea.
5. Trang chi tiết (`src/components/products/ProductDetailLayout.tsx`, `SpecsTable.tsx`): hiển thị `specs`, `features`, `longDescription` từ Neon.

**Kiểm thử:** PGlite cho API (lưu/đọc `specs`, `features`); trình duyệt: sửa 2 thông số + 1 tính năng trong admin → công bố → trang chi tiết hiển thị đúng.

**Xong khi:** sửa được toàn bộ nội dung trang chi tiết sản phẩm từ `/admin`, không cần sửa code.

---

### T7 — Hoàn thiện danh sách khách hàng trong admin (sau T2)

1. `leadsTotal` cập nhật khi thêm lead thủ công (+1) và khi xóa (−1) trong `AdminApp.tsx`.
2. Xuất CSV toàn bộ: `GET /api/leads?format=csv` (quyền `ROLE_ACCESS.leads`), trả `text/csv; charset=utf-8` có BOM (`\uFEFF`) để Excel đọc đúng tiếng Việt, escape dấu `"` và xuống dòng; nút "Xuất Excel/CSV" gọi endpoint này (tải file `khach-hang-YYYY-MM-DD.csv`).
3. Lọc theo nguồn (`source`: Form báo giá / Form liên hệ / Nhập thủ công) và theo sản phẩm quan tâm.

**Xong khi:** CSV có đủ toàn bộ lead (kể cả chưa tải trang); bộ lọc hoạt động; lint/build/test PASS.

---

### T8 — Menu Sản phẩm trên điện thoại

Hiện là accordion 2 cấp (nhóm → sản phẩm con) trong `Header.tsx` (khối `MOBILE ACCORDION`). Đổi thành **danh sách 2 nhóm giống desktop** (dùng `PRODUCT_CATEGORY_GROUPS`), mỗi dòng cao ≥ 44px, bấm vào nhóm → `/san-pham/<slug>` và đóng menu.

**Xong khi:** kiểm tra 375px: menu mở/đóng đúng, không cuộn ngang, chọn nhóm đúng trang.

---

### T9 — Dọn dẹp kỹ thuật

1. Sau khi PR #3 merge — xóa worktree phụ **đúng thứ tự** (xóa junction trước, nếu không có thể xóa nhầm `node_modules` của thư mục chính):
   ```powershell
   cmd /c rmdir D:\ELMICH\Apex-pccc\website-PCCC-leadfix\node_modules
   git worktree remove D:\ELMICH\Apex-pccc\website-PCCC-leadfix
   git branch -d fix/lead-capture
   ```
2. Xóa nhánh đã merge trên GitHub: `feat/ads-tracking`, `feat/neon-go-live`.
3. Nhánh local `master` (lịch sử cũ, không chung gốc với `origin/main`): hỏi chủ dự án trước khi xóa.
4. `ProductCategoryGrid` (lưới 9 thẻ lớn) không còn dùng ở `/san-pham`: dùng ở trang chủ hoặc xóa component (giữ `PRODUCT_CATEGORY_DEFINITIONS`, `PRODUCT_CATEGORY_GROUPS`).
5. Cập nhật `docs/GO-LIVE-STATUS.md`: bảng giai đoạn, danh sách việc của chủ dự án.

---

## 4. Việc của chủ dự án (agent nhắc, không tự làm)

| # | Việc | Hạn / điều kiện |
|---|---|---|
| 1 | **T0** — chạy SQL khôi phục Production | **Ngay** |
| 2 | Chạy `sql/migrations/20261012_lead_rate_limits.sql` | Trước/khi merge PR #3 |
| 3 | Chạy các migration mới của T5, T6 | Trước khi merge PR tương ứng |
| 4 | **Mắt Bão: xác nhận thông tin chủ thể qua email** cho `apexhome.vn` | **Trước 24/10/2026** (quá hạn tên miền bị khóa) |
| 5 | Mắt Bão: hoàn tất bản khai "Chờ ký" cho `apexhome.vn`, `apexdoor.cloud` | Sớm |
| 6 | Tạo hộp thư `contact@apexhome.vn` | Trước khi chạy quảng cáo |
| 7 | Resend: tạo tài khoản, thêm domain `apexhome.vn` (bản ghi DNS tại Mắt Bão), tạo API key → `vercel env add RESEND_API_KEY production` (tự nhập, không gửi qua chat); đặt `NOTIFICATION_EMAIL`, `RESEND_FROM="APEX Website <thongbao@apexhome.vn>"` | Trước khi chạy quảng cáo |
| 8 | Mã đo lường: tạo GTM container (khuyến nghị cho agency) hoặc GA4 / Google Ads / Meta Pixel → đặt `VITE_*` trên Vercel (Production) → **deploy lại** (biến build-time) | Trước khi chạy quảng cáo |
| 9 | Nâng Vercel lên gói **Pro** (Hobby không dành cho thương mại) | Trước khi chạy quảng cáo |
| 10 | `/admin` → Cấu hình → Lưu; "Nhập danh mục ban đầu (dạng nháp)" → rà soát → công bố sản phẩm | Trước khi chạy quảng cáo |
| 11 | Xóa lead thử "KIỂM THỬ HỆ THỐNG – xin xóa" | Bất kỳ lúc nào |
| 12 | Xác minh logo đối tác (`PARTNER_LOGOS`: Mitsubishi, Hitachi, LS…), số chứng nhận kiểm định, dự án — gửi văn bản để công bố hoặc yêu cầu gỡ | Trước khi chạy quảng cáo |
| 13 | Google Search Console: thêm `apexhome.vn`, gửi sitemap | Sau T4 |

---

## 5. Lệnh hữu ích

```bash
# Kiểm thử cục bộ
npm run lint
npm run build
node scripts/test_integrity.js

# Sức khỏe Production
curl -s https://apexhome.vn/api/public-content          # phải có "isDatabaseLive": true

# Log Vercel (đã đăng nhập Vercel CLI, đã link project)
vercel logs --environment production --since 1h --json
vercel ls website-pccc

# PR
gh pr list --repo nqa2102/website-PCCC
gh pr create --repo nqa2102/website-PCCC --base main --head <nhánh> --title "<tiêu đề>"
```

Trên Git Bash (Windows) gọi `vercel api /v9/...` phải đặt `MSYS_NO_PATHCONV=1`, nếu không đường dẫn API bị đổi thành đường dẫn Windows.

