# Prompt cho Antigravity: Ảnh sản phẩm thật + Menu sản phẩm dạng xổ xuống

> Copy toàn bộ phần dưới đường kẻ và dán vào Antigravity.

---

Bạn đang làm việc trên repo website APEX VN (`D:\ELMICH\Apex-pccc\website-PCCC-main`). Trước khi làm, đọc `AGENTS.md` và tuân thủ toàn bộ. Có **2 việc**, làm **tuần tự**, mỗi việc 1 nhánh + 1 PR riêng vào `main`:

- **VIỆC A** – Cập nhật ảnh thật cho từng sản phẩm (nhánh `feat/product-photos`)
- **VIỆC B** – Đổi logic menu Sản phẩm: bấm vào danh mục thì xổ danh sách sản phẩm bên dưới, bấm sản phẩm thì vào thẳng trang chi tiết (nhánh `feat/product-menu-accordion`)

## 0. Kiểm tra trước khi bắt đầu (bắt buộc)

1. Chạy `git status`. Hiện `main` đang có thay đổi chưa commit ở `src/admin/AdminApp.tsx`, `src/components/products/ProductDetailLayout.tsx`, `src/components/products/SpecsTable.tsx`, `src/pages/ProductsPage.tsx`. **Không được xóa / ghi đè / `git checkout --` các thay đổi này.** Nếu đó là việc dở của bạn: hoàn tất, chạy `npm run lint && npm run build`, commit sang nhánh riêng, mở PR trước. Nếu không rõ mục đích: **dừng lại và hỏi chủ dự án**.
2. `git pull origin main`, tạo nhánh mới từ `main` mới nhất.
3. Đọc kỹ các file liên quan: `src/data/mockData.ts`, `src/types/index.ts`, `src/admin/adminData.ts` (hàm gộp sản phẩm Neon + tĩnh: `image: ap.image || orig.image`), `src/components/Header.tsx`, `src/components/products/ProductCard.tsx`, `src/components/products/ProductDetailLayout.tsx`, `src/components/products/ProductCategoryGrid.tsx` (`PRODUCT_CATEGORY_GROUPS`), `src/routing.ts` (đã hỗ trợ `/san-pham/:category/:slug`).

---

## VIỆC A – Ảnh thật cho từng sản phẩm

### A1. Nguồn ảnh

- Thư mục ảnh gốc: **`D:\ELMICH\Apex-pccc\ảnh`** (nằm **ngoài** repo, cùng cấp với `website-PCCC-main`). Có 37 file.
- **Không** copy nguyên ảnh gốc vào repo (ảnh điện thoại 1–2,5 MP, có EXIF GPS). Chỉ đưa vào repo ảnh **đã xử lý** theo A3.
- **Không sửa / xóa / đổi tên** file trong thư mục gốc.

### A2. Tự xem từng ảnh và sắp xếp vào sản phẩm (bắt buộc)

Ảnh gốc **chưa được đặt tên theo sản phẩm** (tên file là chuỗi số ngẫu nhiên từ điện thoại/Zalo). Bạn phải **tự mở và nhìn từng ảnh một** (dùng công cụ đọc ảnh, không đoán theo tên file, không bỏ ảnh nào) rồi tự quyết định ảnh nào thuộc sản phẩm nào.

**Bước 1 – Lập danh mục ảnh.** Với **từng file** trong thư mục gốc, ghi 1 dòng vào `docs/anh-san-pham-phan-loai.md` gồm:

| Cột | Nội dung |
|---|---|
| File | 13 ký tự đầu tên file (hoặc tên đầy đủ nếu ngắn) |
| Loại | cửa thép / cửa kính / cửa cuốn / rèm / tủ điện / khác / bản vẽ |
| Số cánh | 1 cánh / 2 cánh / 1 cánh + ô cố định / không xác định |
| Bề mặt | sơn xám, sơn trắng, vân gỗ sáng, vân gỗ tối, kính… |
| Chi tiết nhận dạng | ô kính quan sát, tay co, thanh thoát hiểm, tay nắm dài, khung nhôm… |
| Chất lượng | tốt / tạm / kém (mờ, tối, nghiêng, nhiều rác công trường, bị che) |
| Vấn đề | chữ đè ngày giờ/GPS/địa chỉ, logo hoặc watermark công ty khác, mặt người, biển số, ảnh trùng lặp |
| Gán cho | id sản phẩm + vai trò (cover / gallery) hoặc "không dùng" + lý do |

**Bước 2 – Ghép với sản phẩm.** Đọc `name`, `category`, `fireRating`, mô tả của từng sản phẩm trong `src/data/mockData.ts` rồi ghép ảnh theo **đặc điểm nhìn thấy được** (loại cửa, số cánh, bề mặt). Quy tắc:
- Ảnh không thể hiện được chỉ số EI → ảnh 1 cánh dùng chung được cho các sản phẩm 1 cánh (EI70, EI90), nhưng **ảnh cover phải khác nhau** giữa các sản phẩm.
- Cover = ảnh chất lượng "tốt", thấy **trọn cánh cửa**, nền gọn gàng nhất. Ảnh "kém" không dùng làm cover.
- Ảnh gần như trùng nhau (cùng góc chụp) chỉ lấy 1.
- Mỗi sản phẩm có ảnh thật: 1 cover + tối đa 5 ảnh gallery.
- Ảnh không khớp sản phẩm nào → "không dùng", **không tự tạo sản phẩm mới**, đưa vào mục "Cần chủ dự án xác nhận".

**Bước 3 – Đối chiếu.** Bảng dưới là kết quả xem sơ bộ của người khác, chỉ để **đối chiếu**. Nếu bạn nhìn ảnh thấy khác bảng này → làm theo những gì bạn thấy và ghi rõ chỗ khác trong báo cáo.

Bảng tham khảo (gọi file theo **13 chữ số đầu** tên file):

| Nhóm | Ảnh (13 số đầu tên file) | Mô tả | Dùng cho sản phẩm |
|---|---|---|---|
| G1 – Cửa thép 1 cánh, sơn xám, **có ô kính** | `1791877528963`, `1791877528969`, `1791877528971` | Cửa 1 cánh có ô kính quan sát, tay co, thanh thoát hiểm (ảnh …971) | `cua-thep-ei70-1-canh`, `cua-thep-ei90-1-canh` (ảnh phụ) |
| G2 – Cửa thép 1 cánh, sơn xám **trơn** | `1791878194722`, `1791878194731`, `1791878194735`, `1791878194739`, `1791878194743`, `1791878194746`, `1791878207014`, `1791878207023` | Cửa lối thoát hiểm/cầu thang, cạnh tủ PCCC | Ảnh **chính** của `cua-thep-ei70-1-canh` và `cua-thep-ei90-1-canh` (chọn 2 ảnh khác nhau, đẹp nhất), còn lại làm ảnh phụ |
| G3 – Cửa thép 2 cánh **vân gỗ** | `1791877528973`, `1791877528976`, `1791877528978`, `1791877528980`, `1791877528982`, `1791877528984`, `1791877528986`, `1791877528988` | Cửa 2 cánh vân gỗ sáng, hành lang/sảnh. Lưu ý: `…980` và `…986` có thể là 1 cánh – tự kiểm tra | Ảnh chính của `cua-thep-ei90-2-canh` hoặc `cua-thep-ei120-2-canh` + ảnh phụ |
| G4 – Cửa thép 2 cánh xám **có ô kính** | `1791877528990` | 2 cánh, ô kính, tay nắm dài | Ảnh chính của sản phẩm 2 cánh còn lại (`ei90-2-canh` / `ei120-2-canh`, không trùng G3) |
| G5 – Cửa thép **vân gỗ tối** (dạng panel) | `1791877528992`, `1791878222859`, `1791878222868`, `1791878222872` | Ba ảnh `179187822…` có **chữ đè góc trên phải: ngày giờ, tọa độ GPS, địa chỉ công trình** | Hiện **chưa có** sản phẩm "cửa thép vân gỗ". Ghi vào báo cáo, hỏi chủ dự án có tạo sản phẩm mới không. **Không tự tạo sản phẩm.** Nếu dùng: bắt buộc cắt bỏ hoàn toàn phần chữ đè GPS |
| G6 – Cửa kính ngăn cháy khung thép | `1791878059623`, `1791878067187`, `1791878158030`, `1791878158039`, `1791878158043`, `1791878158047`, `1791878166393` | 2 cánh & 1 cánh, kính trong suốt | Ảnh chính: `cua-kinh-ngan-chay-ei60`, `cua-kinh-ngan-chay-ei90`, `vach-kinh-ngan-chay-ei60-ei90` (mỗi sản phẩm 1 ảnh chính khác nhau), tổng quan `cua-kinh-ngan-chay` |
| ⛔ G7 – **KHÔNG ĐƯỢC DÙNG** | `1_cua-thep-an-toan-…` (.jpg & .png), `2_ban-ve-chi-tiet-…`, `3_tay-co-thuy-luc-…`, `4_cua-thep-an-toan-1-canh-lap-dat`, `5_cua-thep-an-toan-loi-thoat-hiem-…` | Ảnh lấy từ website **công ty khác (3CElectric)**, đã bị xóa logo | **Không đưa vào website** dưới bất kỳ hình thức nào (vi phạm bản quyền). Chỉ dùng khi chủ dự án xác nhận bằng văn bản có quyền sử dụng |

Sản phẩm tổng quan (`cua-thep-ngan-chay`, `cua-kinh-ngan-chay`): dùng 1 ảnh đại diện đẹp nhất của nhóm, không trùng ảnh chính của sản phẩm con.

**6 nhóm còn lại** (cửa cuốn, rèm, tủ điện, thang máng cáp, tủ rack, nhà trạm, tủ nguồn outdoor): **chưa có ảnh thật** → giữ nguyên ảnh hiện tại, không đổi.

Mỗi ảnh chỉ được làm **ảnh chính** cho 1 sản phẩm. Lập bảng mapping cuối cùng `ảnh gốc → file mới → sản phẩm → vai trò (chính/phụ)` và đưa vào mô tả PR.

**Bước 4 – Tự kiểm tra lại sau khi gắn.** Sau khi build, mở từng trang chi tiết sản phẩm đã đổi ảnh và **nhìn lại ảnh hiển thị**: ảnh 2 cánh không được nằm ở sản phẩm 1 cánh, ảnh cửa kính không nằm ở cửa thép, cover không bị cắt mất đầu/chân cửa. Sai thì sửa mapping và chạy lại script.

### A3. Xử lý ảnh (viết script, không làm tay)

Tạo `scripts/optimize_product_photos.mjs` dùng `sharp` (thêm vào `devDependencies`). Script đọc file mapping `scripts/product-photo-map.json` (bạn tạo, dạng `[{ "source": "1791878194722", "product": "cua-thep-ei70-1-canh", "role": "cover", "crop": null }]`) và thư mục nguồn truyền qua tham số (`node scripts/optimize_product_photos.mjs "D:/ELMICH/Apex-pccc/ảnh"`).

Yêu cầu đầu ra:
- `.rotate()` theo EXIF trước, sau đó **xóa toàn bộ metadata** (EXIF/GPS) – sharp mặc định không giữ metadata, không gọi `.withMetadata()`.
- Định dạng **WebP**, quality 78.
- Ảnh chính (cover): cắt về **tỉ lệ 4:5**, kích thước **1200×1500**, `fit: 'cover'`, `position: 'attention'` hoặc toạ độ crop trong mapping – **phải thấy trọn cánh cửa** (không cụt đầu/chân cửa). Ảnh nào không cắt được 4:5 mà vẫn thấy trọn cửa thì dùng `fit: 'contain'` với nền `#f1f5f9`.
- Ảnh phụ (gallery): cạnh dài tối đa **1600px**, giữ tỉ lệ gốc.
- Ảnh G5 có chữ đè GPS: crop bỏ phần chữ (khai báo `crop` trong mapping), mở ảnh kết quả ra kiểm tra bằng mắt.
- Tên file: `src/assets/images/products/<product-id>-cover.webp`, `<product-id>-2.webp`, `-3.webp`…
- Mỗi file cover **≤ 200 KB**, mỗi file phụ **≤ 300 KB**; script in bảng dung lượng và **báo lỗi (exit 1)** nếu vượt.
- Chạy lại script nhiều lần cho ra cùng kết quả (idempotent).

### A4. Gắn ảnh vào sản phẩm

1. `src/types/index.ts`: thêm `gallery?: string[]` vào `Product` (tuỳ chọn, không phá kiểu cũ).
2. `src/data/mockData.ts`: import ảnh mới, đặt `image` = cover, `gallery` = [cover, ảnh phụ…] cho các sản phẩm ở A2. Cập nhật `imageAlt` mô tả đúng ảnh thật, ví dụ `"Cửa thép ngăn cháy 1 cánh sơn tĩnh điện xám lắp tại lối thoát hiểm – APEX"`. **Không** viết alt có tên/địa chỉ công trình khách hàng.
3. Ảnh cũ (`product_steel_fire_door_…webp`, `product_double_fire_door.jpg`, `product_glass_fire_door.jpg`): nếu không còn chỗ nào import thì xóa khỏi repo (kiểm tra bằng grep cả `src/`, `api/`, `index.html`, `public/`). Ảnh còn dùng ở dự án/tin tức/hero thì giữ.
4. **Neon:** dữ liệu sản phẩm trong DB đang có `image = ''` nên web tự dùng ảnh tĩnh. Kiểm tra `GET https://apexhome.vn/api/public-content` – nếu sản phẩm nào có `image` khác rỗng trong DB thì ảnh DB sẽ **đè** ảnh mới: liệt kê trong báo cáo, **không tự chạy SQL**, ghi rõ câu SQL đề xuất để chủ dự án tự chạy.
5. `ProductCard.tsx`: đổi khung ảnh từ `aspect-[16/10]` sang **`aspect-[4/5]`** (ảnh cửa là ảnh dọc). Giữ `object-cover`, `loading="lazy"`, `decoding="async"`, thêm `width`/`height` để không giật bố cục (CLS). Kiểm tra lưới 9 nhóm vẫn đều (các ảnh cũ ngang của nhóm cơ điện vẫn nhìn được).
6. Trang chi tiết (`ProductDetailLayout.tsx`): nếu có `gallery` ≥ 2 ảnh thì hiện ảnh lớn + hàng thumbnail bên dưới (bấm thumbnail đổi ảnh lớn; thumbnail là `<button>` có `aria-label="Xem ảnh 2 / 5"`, `aria-current` cho ảnh đang chọn; điều khiển được bằng bàn phím). Ảnh lớn dùng `object-contain` nền `bg-slate-100`, ảnh đầu tiên `fetchpriority="high"`, các ảnh khác `loading="lazy"`. Không thêm thư viện slider.
7. Bỏ nhãn "Hình ảnh minh họa" ở các sản phẩm đã có ảnh thật (logic `hasRealImage` hiện đang dựa vào chữ `placeholder` – kiểm tra lại cho đúng).

### A5. Kiểm thử Việc A

- `docs/anh-san-pham-phan-loai.md` có **đủ 1 dòng cho mỗi file** trong thư mục gốc (đếm số file và số dòng phải bằng nhau, ghi kết quả đếm vào báo cáo).
- `npm run lint` và `npm run build` pass. Báo cáo tổng dung lượng `dist/assets/*.webp` mới thêm.
- Mở `/san-pham/cua-thep-ngan-chay`, `/san-pham/cua-kinh-ngan-chay` và từng trang chi tiết sản phẩm đã đổi ảnh, chụp màn hình ở **1440px** và **375px**.
- Xác nhận bằng lệnh: không file ảnh nào trong `src/assets/images/products/` còn EXIF (ví dụ `node -e "require('sharp')(f).metadata().then(m=>console.log(m.exif?'CÒN EXIF':'ok'))"`).
- Grep repo: không còn file/tên nào chứa `3CElectric` hoặc `cua-thep-an-toan` trong `src/` và `public/`.
- Cập nhật `docs/GO-LIVE-STATUS.md`.

---

## VIỆC B – Menu Sản phẩm: bấm danh mục → xổ danh sách sản phẩm → bấm vào xem chi tiết

### B1. Hành vi hiện tại (sai so với yêu cầu)

Trong menu "Sản phẩm" trên header, bấm "Cửa thép ngăn cháy" sẽ chuyển sang trang `/san-pham/cua-thep-ngan-chay` hiển thị 5 sản phẩm.

### B2. Hành vi mới (yêu cầu của chủ dự án)

Bấm "Cửa thép ngăn cháy" trong menu → **không chuyển trang**, mà **xổ ngay bên dưới** danh sách các loại sản phẩm của nhóm đó. Bấm vào từng loại → **vào thẳng trang chi tiết** của sản phẩm.

Ví dụ hiển thị (desktop, trong dropdown 340px hiện có):

```
GIẢI PHÁP NGĂN CHÁY
  ▾ Cửa thép ngăn cháy                 4
      1 CÁNH
        Cửa thép ngăn cháy 1 cánh EI70
        Cửa thép ngăn cháy 1 cánh EI90
      2 CÁNH
        Cửa thép ngăn cháy 2 cánh EI90
        Cửa thép ngăn cháy 2 cánh EI120
      Xem tổng quan cửa thép ngăn cháy →
  ▸ Cửa kính ngăn cháy                 3
  ▸ Cửa cuốn ngăn cháy                 3
  ▸ Rèm ngăn cháy                      3
CƠ ĐIỆN & VIỄN THÔNG
  ▸ Tủ điện                            3
  ...
Xem tất cả sản phẩm →
```

### B3. Đặc tả chi tiết

**Dữ liệu**
- Lấy sản phẩm từ `useLiveData().products` (Header đã có sẵn), lọc theo `category`.
- **Không** đưa sản phẩm "Tổng quan" vào danh sách con (sản phẩm có `id === category id`, ví dụ `cua-thep-ngan-chay`). Thay bằng link cuối "Xem tổng quan {tên nhóm} →" dẫn tới `/san-pham/{category}` (giữ trang danh mục cho SEO và quảng cáo).
- Nhóm con theo số cánh: viết hàm thuần `groupProductsByVariant(products)` trong `src/components/products/productMenu.ts`. Nếu **mọi** sản phẩm của nhóm khớp regex `/(\d)\s*cánh/i` trên `name` → chia nhóm "1 CÁNH", "2 CÁNH"… theo số tăng dần; trong mỗi nhóm sắp xếp theo số EI tăng dần (`/EI\s*(\d+)/i`). Nếu không khớp hết (cửa cuốn, tủ điện…) → danh sách phẳng, giữ thứ tự dữ liệu. Không hard-code id sản phẩm.
- Tên hiển thị trong menu: dùng `product.name`, viết hoa kiểu câu (chỉ chữ đầu và mã EI viết hoa), tối đa 2 dòng, không cắt chữ.
- Số đếm bên phải danh mục = số sản phẩm con (không tính tổng quan).
- Danh mục có 0 sản phẩm con: giữ hành vi cũ (là link sang trang danh mục), không có mũi tên.

**Tương tác desktop**
- Hàng danh mục là `<button type="button">` có `aria-expanded`, `aria-controls`, mũi tên `ChevronDown` xoay 180° khi mở (transition 150–200ms, tắt khi `prefers-reduced-motion`).
- **Chỉ mở 1 danh mục một lúc**; bấm danh mục khác thì đóng danh mục cũ; bấm lại danh mục đang mở thì đóng.
- Bấm danh mục **không** đóng dropdown, **không** bật `productMenuSuppressed`.
- Link sản phẩm: `<a href="/san-pham/{category}/{slug || id}">`, onClick gọi `handleNavClick(e, 'products', cat.id, product.id)` (hàm đã hỗ trợ tham số `productId`), sau đó đóng dropdown và bật `productMenuSuppressed` như link hiện tại. Ctrl/Cmd+click vẫn mở tab mới (handleNavClick đã xử lý).
- Đóng dropdown (rời chuột, Escape, chọn sản phẩm) thì **reset** danh mục đang mở về `null`.
- Khi mở dropdown lần sau: nếu người dùng đang ở trang thuộc 1 danh mục (`/san-pham/{category}…`) thì tự mở sẵn danh mục đó và tô đậm sản phẩm đang xem (`aria-current="page"`).
- Dropdown có `max-h-[calc(100vh-140px)] overflow-y-auto overscroll-contain` để khi mở nhóm dài không tràn màn hình.
- Bàn phím: Tab đi qua danh mục → sản phẩm con (khi mở) → danh mục kế; Enter/Space mở/đóng; Escape đóng dropdown và trả focus về nút "Sản phẩm". Focus ring rõ (`focus-visible:outline-2 outline-red-600`).
- Kiểu dáng: sản phẩm con thụt lề thẳng hàng với chữ danh mục (bỏ qua icon), chữ 13px `text-slate-700`, hover `bg-neutral-100`, `min-h-9`; nhãn "1 CÁNH" 10px chữ hoa `text-slate-500` như nhãn nhóm hiện có. Không thêm ảnh/icon vào từng sản phẩm.

**Mobile (menu hamburger)**
- Áp dụng cùng logic accordion trong khối "MOBILE DANH MỤC SẢN PHẨM" hiện có (cấp 2 bên trong mục "Sản phẩm").
- Vùng bấm mỗi dòng **≥ 44px**, khoảng cách giữa các dòng ≥ 8px; bấm sản phẩm thì đóng menu mobile và chuyển trang chi tiết.
- Dùng chung hàm `groupProductsByVariant`, không nhân đôi logic.

**Không thay đổi**
- Trang `/san-pham` và `/san-pham/{category}` (sidebar lọc, lưới sản phẩm) giữ nguyên.
- Route, sitemap, canonical giữ nguyên.

### B4. Kiểm thử Việc B

- Viết test cho `groupProductsByVariant` (thêm vào `scripts/test_integrity.js` hoặc file test riêng chạy bằng `node`): nhóm cửa thép → 2 nhóm con đúng thứ tự EI; nhóm tủ điện → danh sách phẳng; nhóm rỗng → mảng rỗng; sản phẩm tổng quan bị loại.
- `npm run lint`, `npm run build` pass.
- Chạy dev server, kiểm tra thủ công và chụp màn hình:
  1. Desktop 1440px: hover "Sản phẩm" → bấm "Cửa thép ngăn cháy" → thấy 1 CÁNH / 2 CÁNH → bấm "2 cánh EI120" → URL `/san-pham/cua-thep-ngan-chay/cua-thep-ei120-2-canh`, trang chi tiết đúng, dropdown đóng.
  2. Bấm "Cửa kính ngăn cháy" khi cửa thép đang mở → cửa thép đóng, cửa kính mở.
  3. Chỉ dùng bàn phím: Tab tới "Sản phẩm", mở, Enter vào danh mục, Tab tới sản phẩm, Enter → vào chi tiết.
  4. Mobile 375px: mở hamburger → Sản phẩm → Cửa thép ngăn cháy → bấm sản phẩm → vào chi tiết, menu đóng.
  5. Đang ở trang chi tiết 1 sản phẩm, mở lại menu → nhóm của nó tự mở sẵn, sản phẩm đang xem được tô đậm.
- Không có lỗi trong console.
- Cập nhật `docs/GO-LIVE-STATUS.md`.

---

## Quy tắc chung

- Mỗi việc 1 PR, mô tả PR có: tóm tắt thay đổi, bảng mapping ảnh (Việc A), ảnh chụp màn hình 1440px & 375px, kết quả lint/build/test.
- **Không** deploy production, **không** chạy SQL trên Neon, **không** merge PR – để chủ dự án duyệt.
- **Không** tạo sản phẩm mới, không đổi tên/mô tả/thông số sản phẩm ngoài phạm vi trên.
- **Không** dùng ảnh nhóm G7 (3CElectric) và không đăng ảnh còn lộ tọa độ GPS / địa chỉ công trình.
- Import trong thư mục `api/` phải có đuôi `.js` (nếu có sửa API).
- Mọi điểm chưa chắc chắn (ảnh nào là 1 hay 2 cánh, ảnh G5 dùng cho đâu) → liệt kê trong mục "Cần chủ dự án xác nhận" cuối PR thay vì tự đoán.

