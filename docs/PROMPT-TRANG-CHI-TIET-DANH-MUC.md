# Prompt cho Antigravity: Trang chi tiết theo danh mục (bỏ grid sản phẩm con)

> Copy phần dưới đường kẻ, dán vào Antigravity. Làm **tuần tự từng PHASE**, mỗi phase 1 commit/PR riêng và **DỪNG LẠI cho chủ dự án duyệt** trước khi sang phase sau.

---

Bạn làm trên repo website APEX VN. Đọc `AGENTS.md` trước và tuân thủ tuyệt đối. Mở file **`docs/mockup/chi-tiet-cua-thep.html`** trong trình duyệt — đây là **giao diện mẫu (ảnh mẫu) đã được chủ dự án duyệt**, bám sát bố cục, thứ tự và văn phong của nó.

## Mục tiêu tổng
Đổi mô hình "danh mục → lưới nhiều sản phẩm con" sang **mỗi danh mục là 1 trang chi tiết** (landing). Bấm vào một danh mục (ví dụ "Cửa thép ngăn cháy") → ra **thẳng trang chi tiết** như mockup. Áp dụng cho **cả 9 danh mục**.

**Thứ tự các khối trên trang chi tiết (đúng mockup, không đổi thứ tự):**
1. Hero: thư viện ảnh (trái) + tên + giá từ /m² + 3 điểm bán hàng + bảng thông số tóm tắt + nút "Nhận báo giá" & "Tư vấn Zalo" + hotline.
2. Ưu điểm & công dụng (6 gạch đầu dòng + 4 thẻ công dụng).
3. Hình ảnh thực tế tại công trình (3 ảnh).
4. Bảng thông số kỹ thuật chi tiết (bảng đầy đủ).
5. Dự toán chi tiết cho 1 bộ (bảng) + thanh CTA ngay dưới.
6. Sản phẩm tương tự (3 thẻ danh mục khác).

## Mô hình dữ liệu (quan trọng — thống nhất trước khi code)
Trang chi tiết **không lấy từ bảng `products` nữa** mà từ một cấu trúc nội dung theo danh mục. Tạo `src/data/categoryDetails.ts`:
```ts
export interface CategoryDetail {
  slug: string;              // trùng id danh mục, vd 'cua-thep-ngan-chay'
  name: string;
  priceFrom?: string;        // "1.600.000 đ/m²" | undefined -> ẩn dòng giá
  intro: string;
  sellingPoints: string[];   // 3 ý
  quickSpec: { label: string; value: string }[];   // bảng tóm tắt ở hero
  advantages: string[];      // gạch đầu dòng mục Ưu điểm
  uses: { icon: string; title: string; desc: string }[]; // thẻ công dụng
  specTable: { label: string; value: string }[];   // thông số chi tiết
  quote?: {                  // undefined -> ẩn mục 5, chỉ hiện nút báo giá
    model: string;           // "cửa 1 cánh, 0.9 × 2.2m"
    rows: { name: string; unit: string; qty: string; price: string; amount: string }[];
    total: string;
    note?: string;
  };
  gallery: string[];         // import ảnh thật; [] -> ẩn mục 3
  projectImages: string[];   // [] -> ẩn mục 3 (hoặc dùng chung gallery)
  relatedSlugs: string[];    // 3 danh mục khác
}
export const CATEGORY_DETAILS: Record<string, CategoryDetail> = { ... }
```
- Danh mục **chưa có dữ liệu** (ảnh/giá/giấy) thì để field tương ứng rỗng/undefined, và component **tự ẩn** khối đó — **không bịa nội dung**.
- Ảnh import từ `src/assets/images/...` (ảnh thật đã merge). Danh mục chưa có ảnh thật dùng ảnh danh mục cũ hiện có, không tự tạo.

## Ràng buộc nội dung (AGENTS.md)
- **Không copy** chữ, ảnh, bản vẽ, giá, giấy kiểm định của 3CElectric/3ce hay bất kỳ bên nào. Văn phong tự viết cho APEX.
- **Không công bố** giấy kiểm định/giá/dự án chưa được chủ dự án xác minh. Thiếu thì để trống.
- Mockup **không có** mục "Giấy kiểm định" — không thêm lại.

---

## PHASE 0 — Chuẩn bị (DỪNG duyệt)
- `git checkout main && git pull`, tạo nhánh `feat/category-detail-page`.
- Đọc: `src/pages/ProductsPage.tsx`, `src/components/Header.tsx`, `src/components/products/ProductCategoryGrid.tsx` (`PRODUCT_CATEGORY_DEFINITIONS`, `PRODUCT_CATEGORY_GROUPS`), `src/components/products/productMenu.ts`, `src/routing.ts`, `src/data/mockData.ts`, `src/admin/adminData.ts`.
- Viết `docs/GO-LIVE-STATUS.md` một đoạn mô tả kế hoạch 6 phase.
- **Dừng:** báo cáo hiểu hiện trạng + xác nhận mô hình dữ liệu ở trên trước khi code.

## PHASE 1 — Dữ liệu danh mục + điền đầy đủ "Cửa thép ngăn cháy" (DỪNG duyệt)
- Tạo `src/data/categoryDetails.ts` theo interface trên.
- Điền **đầy đủ** danh mục `cua-thep-ngan-chay` lấy nguyên nội dung từ `docs/mockup/chi-tiet-cua-thep.html`:
  - priceFrom "1.600.000 đ/m²", 3 điểm bán hàng, quickSpec (7 dòng), advantages (6 ý), uses (4 thẻ), specTable (11 dòng theo mẫu), quote (5 dòng vật tư, tổng 4.320.000, bỏ nhân công), gallery (ảnh cửa thép thật), relatedSlugs = cửa kính/cửa cuốn/rèm.
- 8 danh mục còn lại: tạo entry **khung rỗng** (name + specTable mẫu nếu có, còn lại để trống) — sẽ điền ở Phase 4.
- **Không** có test UI ở phase này; chỉ cần `npm run lint`/`build` pass.
- **Dừng:** chủ dự án xem lại dữ liệu cửa thép có đúng không.

## PHASE 2 — Component trang chi tiết (DỪNG duyệt)
- Tạo `src/pages/CategoryDetailPage.tsx` (+ tách component con nếu cần) render **đúng 6 khối** theo mockup, nhận 1 prop `slug`, đọc `CATEGORY_DETAILS[slug]`.
- Tự ẩn khối khi dữ liệu rỗng (giá, mục 3 ảnh, mục 5 dự toán).
- Thư viện ảnh: ảnh lớn + hàng thumbnail bấm đổi ảnh (có bàn phím, `aria`).
- Nút "Nhận báo giá" mở `QuoteModal` hiện có với category tương ứng; "Tư vấn Zalo" mở link Zalo công ty; dùng hotline từ `useLiveData().company`.
- Responsive: desktop 2 cột hero, mobile 1 cột; vùng bấm ≥ 44px; không tràn ngang.
- Tạm thời cho route thử nghiệm `/san-pham/<slug>` render component này để xem (chưa gỡ grid cũ).
- **Dừng + bằng chứng:** ảnh chụp 1440px & 375px trang `cua-thep-ngan-chay`, so khớp mockup. `lint`/`build` pass.

## PHASE 3 — Đổi điều hướng: danh mục → thẳng trang chi tiết (DỪNG duyệt)
- `src/routing.ts`: `/san-pham/<slug>` trỏ `CategoryDetailPage`. Giữ `/san-pham/<slug>/<sanpham>` **chuyển hướng (redirect)** về `/san-pham/<slug>` (tránh 404 link cũ).
- `Header.tsx`: trong menu, mỗi danh mục là **link thẳng** tới `/san-pham/<slug>` (**bỏ accordion xổ sản phẩm con**, bỏ `groupProductsByVariant` khỏi menu). Giữ: bấm "Sản phẩm" → `/san-pham`.
- `ProductsPage.tsx` (trang `/san-pham` "tất cả"): đổi thành **lưới 9 thẻ danh mục** (ảnh + tên + mô tả ngắn) link tới từng trang chi tiết — **bỏ lưới sản phẩm con và bảng thông số/EI cũ**.
- **Dừng + bằng chứng:** quay video/ảnh luồng: bấm "Cửa thép ngăn cháy" ở menu → ra thẳng trang chi tiết; `/san-pham` hiện 9 danh mục. `lint`/`build`/`node scripts/test_product_menu.mjs`.

## PHASE 4 — Điền nội dung 8 danh mục còn lại (DỪNG duyệt từng nhóm)
- Điền `categoryDetails.ts` cho: cửa kính, cửa cuốn, rèm, tủ điện, thang máng cáp, tủ rack, nhà trạm shelter, tủ nguồn outdoor.
- Với mỗi danh mục: specTable theo thông số chuẩn của loại đó; advantages/uses viết cho APEX; quote/ảnh/giá chỉ điền khi **chủ dự án cung cấp** (xem bảng "Cần chủ dự án" cuối file) — thiếu thì để trống, khối tự ẩn.
- Làm **theo từng nhóm 2–3 danh mục/lần**, mỗi lần commit và **dừng để duyệt**.
- **Không** bịa số liệu/giá/chứng nhận.

## PHASE 5 — SEO + dọn dẹp (DỪNG duyệt)
- Sitemap: liệt kê 9 URL `/san-pham/<slug>`; bỏ URL sản phẩm con cũ. Canonical mỗi trang chi tiết.
- `applySeo` theo từng danh mục (title/description/OG).
- Gỡ code chết: component/data sản phẩm con không còn dùng (giữ lại nếu admin vẫn cần — kiểm tra kỹ bằng grep trước khi xóa, đúng quy tắc "không xóa khi chưa hiểu mục đích").
- **Dừng + bằng chứng:** `lint`/`build`/`test_integrity.js` pass; kiểm tra 9 trang mở được, redirect link cũ hoạt động.

## PHASE 6 — QA tổng + bàn giao
- Chụp 1440px & 375px cho đủ 9 trang (hoặc các trang đã có dữ liệu).
- Kiểm tra: không lỗi console, không tràn ngang, nút báo giá/Zalo hoạt động, ảnh tải được.
- Cập nhật `docs/GO-LIVE-STATUS.md`. Mở PR tổng (hoặc gộp các PR phase), **không tự merge, không deploy, không chạy SQL Neon**.

---

## Quy tắc chung
- Mỗi phase 1 commit/PR, mô tả rõ + ảnh chụp 1440px & 375px; **dừng cho chủ dự án duyệt** rồi mới sang phase sau.
- Không deploy production, không merge, không chạy SQL Neon — chủ dự án tự làm.
- Import trong `api/` phải có đuôi `.js` (nếu đụng API).
- Không copy nội dung 3ce; không công bố thông tin chưa xác minh; không bịa.
- Bám sát `docs/mockup/chi-tiet-cua-thep.html` về bố cục và thứ tự.

## Cần chủ dự án cung cấp (ghi blocker, không bịa)
| Hạng mục | Danh mục |
|---|---|
| Bảng dự toán 1 bộ | cửa kính, cửa cuốn, rèm, tủ điện, thang máng cáp, tủ rack, nhà trạm, tủ nguồn outdoor (cửa thép đã có) |
| Giá từ /m² (nếu công khai) | tất cả trừ cửa thép |
| Ảnh thật sản phẩm & công trình | cửa cuốn, rèm, tủ điện, thang máng cáp, tủ rack, nhà trạm, tủ nguồn outdoor (cửa thép & cửa kính đã có) |
| Thông số kỹ thuật chuẩn | các nhóm cơ điện (nếu khác mẫu chung) |
