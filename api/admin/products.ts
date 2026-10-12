import { getDb, requireAdminRole, canPublish, ROLE_ACCESS } from '../_db.js';

export default async function handler(req: any, res: any) {
  // GET: Lấy danh sách sản phẩm
  if (req.method === 'GET') {
    // Dữ liệu quản trị gồm cả bản nháp/nội bộ: chỉ trả cho người đã đăng nhập.
    // Website công khai đọc qua /api/public-content (chỉ nội dung published).
    const user = await requireAdminRole(req, res, ROLE_ACCESS.products);
    if (!user) return;

    try {
      const sql = getDb();
      const rows = await sql`
        SELECT 
          id, name, slug, category, category_name as "categoryName",
          fire_rating as "fireRating", certification_no as "certificationNo",
          short_description as "shortDescription", material, standard, warranty,
          specs, features, long_description as "longDescription",
          featured, status, sort_order as "sortOrder",
          seo_title as "seoTitle", seo_description as "seoDescription",
          image_alt as "imageAlt", image, price_estimate as "priceEstimate",
          updated_at as "updatedAt"
        FROM products
        ORDER BY sort_order ASC, name ASC
      `;
      return res.status(200).json({ products: rows });
    } catch (err: any) {
      console.error('Lỗi lấy danh sách sản phẩm:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể tải danh mục sản phẩm.' });
    }
  }

  // POST / PUT: Thêm mới hoặc cập nhật sản phẩm (Yêu cầu quyền admin)
  if (req.method === 'POST' || req.method === 'PUT') {
    const user = await requireAdminRole(req, res, ROLE_ACCESS.products);
    if (!user) return;

    const p = req.body || {};
    if (p.status === 'published' && !canPublish(user.role)) {
      return res.status(403).json({ error: 'Forbidden', message: 'Chỉ Quản trị viên được công bố nội dung ra website. Hãy chuyển sang "Chờ duyệt".' });
    }

    try {
      if (!p.id || !p.name || !p.slug || !p.category) {
        return res.status(400).json({ error: 'BadRequest', message: 'Thiếu thông tin bắt buộc của sản phẩm.' });
      }

      // Kiểm tra và làm sạch features: mảng chuỗi tối đa 12 mục, mỗi mục <= 200 ký tự
      let cleanFeatures: string[] = [];
      if (Array.isArray(p.features)) {
        cleanFeatures = p.features
          .filter((item: any) => typeof item === 'string' && item.trim().length > 0)
          .map((item: string) => item.trim().slice(0, 200))
          .slice(0, 12);
      }
      const featuresJson = JSON.stringify(cleanFeatures);

      // Kiểm tra và làm sạch specs: object chuỗi -> chuỗi, tối đa 30 cặp
      let cleanSpecs: Record<string, string> = {};
      if (p.specs && typeof p.specs === 'object' && !Array.isArray(p.specs)) {
        const entries = Object.entries(p.specs).slice(0, 30);
        for (const [k, v] of entries) {
          if (typeof k === 'string' && k.trim()) {
            cleanSpecs[k.trim()] = String(v ?? '').trim();
          }
        }
      }
      const specsJson = JSON.stringify(cleanSpecs);

      const longDesc = typeof p.longDescription === 'string' ? p.longDescription : (typeof p.long_description === 'string' ? p.long_description : null);

      const sql = getDb();

      await sql`
        INSERT INTO products (
          id, name, slug, category, category_name, fire_rating, certification_no,
          short_description, material, standard, warranty, specs, features, long_description,
          featured, status, sort_order, seo_title, seo_description, image_alt, image,
          price_estimate, updated_at
        ) VALUES (
          ${p.id}, ${p.name}, ${p.slug}, ${p.category}, ${p.categoryName || p.category},
          ${p.fireRating || null}, ${p.certificationNo || null}, ${p.shortDescription || null},
          ${p.material || null}, ${p.standard || null}, ${p.warranty || null},
          ${specsJson}::jsonb, ${featuresJson}::jsonb, ${longDesc || null},
          ${Boolean(p.featured)}, ${p.status || 'draft'},
          ${Number(p.sortOrder) || 0}, ${p.seoTitle || null}, ${p.seoDescription || null},
          ${p.imageAlt || null}, ${p.image || null}, ${p.priceEstimate || null}, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          category = EXCLUDED.category,
          category_name = EXCLUDED.category_name,
          fire_rating = EXCLUDED.fire_rating,
          certification_no = EXCLUDED.certification_no,
          short_description = EXCLUDED.short_description,
          material = EXCLUDED.material,
          standard = EXCLUDED.standard,
          warranty = EXCLUDED.warranty,
          specs = EXCLUDED.specs,
          features = EXCLUDED.features,
          long_description = EXCLUDED.long_description,
          featured = EXCLUDED.featured,
          status = EXCLUDED.status,
          sort_order = EXCLUDED.sort_order,
          seo_title = EXCLUDED.seo_title,
          seo_description = EXCLUDED.seo_description,
          image_alt = EXCLUDED.image_alt,
          image = EXCLUDED.image,
          price_estimate = EXCLUDED.price_estimate,
          updated_at = NOW()
      `;

      return res.status(200).json({ ok: true, id: p.id });
    } catch (err: any) {
      console.error('Lỗi lưu sản phẩm:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể lưu thông tin sản phẩm.' });
    }
  }

  // DELETE: Xóa sản phẩm
  if (req.method === 'DELETE') {
    const user = await requireAdminRole(req, res, ROLE_ACCESS.destructive);
    if (!user) return;

    const { id } = req.query || req.body || {};
    if (!id) return res.status(400).json({ error: 'BadRequest', message: 'Cần mã sản phẩm cần xóa.' });

    try {
      const sql = getDb();
      await sql`DELETE FROM products WHERE id = ${String(id)}`;
      return res.status(200).json({ ok: true, id });
    } catch (err: any) {
      console.error('Lỗi xóa sản phẩm:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể xóa sản phẩm.' });
    }
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE');
  return res.status(405).json({ error: 'MethodNotAllowed' });
}
