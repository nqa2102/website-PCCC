# Prompt cho Antigravity: Sửa menu "Sản phẩm" + bố cục trang danh mục

> Copy toàn bộ phần dưới đường kẻ, dán vào Antigravity.

---

Bạn đang ở repo website APEX VN. Đọc `AGENTS.md` trước và tuân thủ. Đây là 2 chỉnh sửa tiếp theo cho phần Sản phẩm, làm **trên nhánh `feat/product-menu-accordion`** (nhánh đã có menu accordion và `src/components/products/productMenu.ts`). Nếu nhánh đó đã mở PR thì commit thêm vào cùng nhánh. Trước khi làm: `git checkout feat/product-menu-accordion`, `git pull`, `git status` phải sạch.

Có **2 việc**:

## VIỆC 1 — Bấm "Sản phẩm" trên thanh menu phải vào thẳng trang danh mục

**Hiện tại (sai):** bấm chữ "Sản phẩm" chỉ mở/đóng dropdown; muốn vào trang danh mục phải bấm "Xem tất cả sản phẩm".

**Yêu cầu:**
- **Rê chuột (hover)** vào "Sản phẩm" → vẫn xổ dropdown danh mục như hiện tại (giữ nguyên).
- **Bấm (click)** vào chữ "Sản phẩm" → điều hướng thẳng tới `/san-pham` (trang tất cả sản phẩm), **không** chỉ toggle dropdown.

**Cách làm (desktop, `src/components/Header.tsx`):**
- Đổi nút "Sản phẩm" top-level: `onClick` gọi `handleNavClick(e, 'products')` (điều hướng), bỏ hành vi `setProductDropdownOpen(!productDropdownOpen)` trên chính nút này.
- Giữ `onMouseEnter`/`onMouseLeave` của wrapper để dropdown vẫn mở khi hover và mở khi focus-within (bàn phím). Dropdown vẫn phải mở được bằng bàn phím: khi Tab vào nút "Sản phẩm" rồi Tab tiếp thì tới được các danh mục con (dùng `group-focus-within` như hiện có).
- Link "Xem tất cả sản phẩm" ở cuối dropdown giữ nguyên.

**Mobile (`src/components/Header.tsx`):** hàng "Sản phẩm" trong menu hamburger: bấm chữ "Sản phẩm" → điều hướng `/san-pham` và đóng menu; giữ **nút mũi tên (chevron) riêng** để mở/đóng accordion danh mục con (không gộp 2 hành vi vào 1 vùng bấm). Vùng bấm mỗi phần ≥ 44px.

**Không đổi:** logic accordion danh mục con (bấm danh mục xổ 1 cánh/2 cánh, bấm sản phẩm ra chi tiết) đã đúng, giữ nguyên.

## VIỆC 2 — Trang danh mục: thẻ sản phẩm chia nhóm 1 cánh / 2 cánh, bỏ khối kỹ thuật

File: `src/pages/ProductsPage.tsx`.

**2a. Chia nhóm thẻ sản phẩm theo biến thể.**
- Khi đang xem **một danh mục cụ thể** (`selectedCategory !== 'all'`): thay vì 1 lưới phẳng tất cả sản phẩm, hãy **gom thẻ theo nhóm** dùng lại hàm `groupProductsByVariant(filteredProducts, selectedCategory)` trong `src/components/products/productMenu.ts` (đã có sẵn, đừng viết lại).
  - Với nhóm cửa tách theo số cánh (cửa thép…): render các khối, mỗi khối có **tiêu đề phụ "1 CÁNH" / "2 CÁNH"** (chữ hoa nhỏ, `text-slate-500`, giống nhãn trong menu), bên dưới là **lưới thẻ `ProductCard` có ảnh** của nhóm đó (giữ `grid sm:grid-cols-2 xl:grid-cols-3`).
  - Với nhóm không tách (`groupProductsByVariant` trả về 1 nhóm `label: null` — cửa cuốn, rèm, tủ điện, thang máng cáp, tủ rack, nhà trạm, tủ nguồn): render lưới thẻ phẳng như hiện tại, không có tiêu đề phụ.
  - `groupProductsByVariant` đã tự loại sản phẩm "tổng quan" (id === category). Vì vậy trên trang danh mục cụ thể **không hiển thị thẻ sản phẩm tổng quan** nữa (tránh trùng). Nếu danh mục có mô tả tổng quan, giữ ở phần header trang (H1 + mô tả ngắn) như hiện có.
- Khi `selectedCategory === 'all'`: giữ lưới phẳng tất cả sản phẩm như hiện tại (không chia nhóm 1 cánh/2 cánh).
- Giữ nguyên: bộ lọc danh mục (sidebar desktop + chip mobile), số đếm, trạng thái rỗng (empty state), bấm thẻ → `handleViewProduct` → trang chi tiết. Dòng đếm "{n} sản phẩm" giữ lại (đếm tổng của danh mục).
- Thẻ `ProductCard` giữ khung ảnh 4:5 và ảnh thật (khi nhánh ảnh được merge). Không đổi `ProductCard`.

**2b. Bỏ khối kỹ thuật khỏi trang danh mục.**
- Xóa hẳn khối chỉ hiện cho cửa thép: **bảng "Giới hạn chịu lửa EI theo QCVN"** và **"Cấu tạo 5 lớp cửa ngăn cháy APEX"** (đoạn `{isSteelDoor && (...)}`).
- Xóa luôn dữ liệu không còn dùng: hằng số `EI_MATRIX`, `DOOR_LAYERS`, biến `isSteelDoor`, và các import icon chỉ phục vụ 2 khối đó (ShieldCheck, Layers…) nếu không còn chỗ nào dùng — chạy lint để chắc chắn không còn import thừa.
- Giữ lại khối CTA cuối trang (E-Catalogue & hotline) nếu đang có.

## Kiểm thử (bắt buộc, có bằng chứng)
- `npm run lint` và `npm run build` pass; không còn import/biến thừa.
- `node scripts/test_product_menu.mjs` vẫn pass.
- Chạy dev server, chụp màn hình **1440px** và **375px**:
  1. Bấm chữ "Sản phẩm" trên menu → vào thẳng `/san-pham`.
  2. Hover "Sản phẩm" → vẫn xổ dropdown; bấm danh mục xổ 1 cánh/2 cánh; bấm sản phẩm ra chi tiết (không hồi quy).
  3. Mở `/san-pham/cua-thep-ngan-chay`: thấy 2 khối "1 CÁNH" (EI70, EI90) và "2 CÁNH" (EI90, EI120) với **thẻ có ảnh**; **không còn** bảng EI và cấu tạo 5 lớp.
  4. Mở `/san-pham/tu-dien` (hoặc nhóm cơ điện bất kỳ): lưới thẻ phẳng, không có tiêu đề 1 cánh/2 cánh.
  5. Mở `/san-pham` (tất cả): lưới phẳng như cũ.
  6. Bấm 1 thẻ bất kỳ → ra trang chi tiết đúng sản phẩm.
- Cập nhật `docs/GO-LIVE-STATUS.md`.

## Quy tắc
- Không deploy, không chạy SQL Neon, không merge PR — để chủ dự án duyệt.
- Dùng lại `groupProductsByVariant`, không nhân đôi logic phân nhóm.
- Không đổi nội dung/thông số/tên sản phẩm, không đụng danh sách đối tác.
- Commit gọn trên nhánh `feat/product-menu-accordion`, mô tả PR kèm ảnh chụp 1440px & 375px và kết quả lint/build/test.
