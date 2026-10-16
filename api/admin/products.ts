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
      let rows;
      try {
        rows = await sql`
          SELECT 
            id, name, slug, category, category_name as "categoryName",
            fire_rating as "fireRating", certification_no as "certificationNo",
            short_description as "shortDescription", material, standard, warranty,
            specs, features, long_description as "longDescription",
            featured, status, sort_order as "sortOrder",
            seo_title as "seoTitle", seo_description as "seoDescription",
            image_alt as "imageAlt", image, gallery, project_images as "projectImages",
            price_estimate as "priceEstimate",
            updated_at as "updatedAt"
          FROM products
          ORDER BY sort_order ASC, name ASC
        `;
      } catch (colErr: any) {
        console.warn('Fallback admin products query:', colErr?.message || colErr);
        rows = await sql`
          SELECT 
            id, name, slug, category, category_name as "categoryName",
            fire_rating as "fireRating", certification_no as "certificationNo",
            short_description as "shortDescription", material, standard, warranty,
            specs, '[]'::jsonb as features, short_description as "longDescription",
            featured, status, sort_order as "sortOrder",
            seo_title as "seoTitle", seo_description as "seoDescription",
            image_alt as "imageAlt", image, '[]'::jsonb as gallery, '[]'::jsonb as "projectImages",
            price_estimate as "priceEstimate",
            updated_at as "updatedAt"
          FROM products
          ORDER BY sort_order ASC, name ASC
        `;
      }
      return res.status(200).json({ products: rows });
    } catch (err: any) {
      console.error('Lỗi lấy danh sách sản phẩm:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể tải danh mục sản phẩm.' });
    }
  }

  // POST / PUT: Thêm mới hoặc cập nhật sản phẩm (Yêu cầu quyền admin, hỗ trợ batch seeding)
  if (req.method === 'POST' || req.method === 'PUT') {
    const user = await requireAdminRole(req, res, ROLE_ACCESS.products);
    if (!user) return;

    const body = req.body || {};
    const isBatch = body.action === 'seed' || Array.isArray(body.products);
    const items: any[] = isBatch ? (body.products || []) : [body];

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'BadRequest', message: 'Dữ liệu sản phẩm không hợp lệ.' });
    }

    // Kiểm tra quyền xuất bản nếu có sản phẩm yêu cầu published
    const hasPublished = items.some((item) => item.status === 'published');
    if (hasPublished && !canPublish(user.role)) {
      return res.status(403).json({ error: 'Forbidden', message: 'Chỉ Quản trị viên được công bố nội dung ra website. Hãy chuyển sang "Chờ duyệt".' });
    }

    try {
      const sql = getDb();

      // Đảm bảo các cột mở rộng và CHECK constraint hỗ trợ đầy đủ 10 nhóm danh mục (kể cả cua-thep-van-go)
      const ensureDdl = [
        sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS certification_no TEXT;`,
        sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS specs JSONB DEFAULT '{}'::jsonb;`,
        sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;`,
        sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS long_description TEXT;`,
        sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery JSONB DEFAULT '[]'::jsonb;`,
        sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS project_images JSONB DEFAULT '[]'::jsonb;`,
        sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS price_estimate VARCHAR(100);`,
        sql`ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;`,
        sql`ALTER TABLE products ADD CONSTRAINT products_category_check CHECK (category IN (
          'cua-thep-ngan-chay',
          'cua-thep-van-go',
          'cua-kinh-ngan-chay',
          'cua-cuon-ngan-chay',
          'rem-ngan-chay',
          'tu-dien',
          'thang-mang-cap',
          'tu-rack',
          'nha-tram-shelter',
          'tu-nguon-outdoor'
        )) NOT VALID;`,
      ];
      for (const query of ensureDdl) {
        try {
          await query;
        } catch (schemaErr: any) {
          console.warn('Cảnh báo migration sản phẩm:', schemaErr?.message || schemaErr);
        }
      }

      const categoryMap: Record<string, string> = {
        'steel-door': 'cua-thep-ngan-chay',
        'glass-door': 'cua-kinh-ngan-chay',
        'roller-shutter': 'cua-cuon-ngan-chay',
        'fire-curtain': 'rem-ngan-chay',
      };

      for (const p of items) {
        if (!p || !p.id || !p.name) continue;

        const cat = categoryMap[p.category] || p.category || 'cua-thep-ngan-chay';
        const slug = p.slug || p.id;
        const catName = p.categoryName || p.category || 'Sản phẩm PCCC';

        // Làm sạch features (tối đa 12 mục, mỗi mục <= 200 ký tự)
        let cleanFeatures: string[] = [];
        if (Array.isArray(p.features)) {
          cleanFeatures = p.features
            .filter((item: any) => typeof item === 'string' && item.trim().length > 0)
            .map((item: string) => item.trim().slice(0, 200))
            .slice(0, 12);
        }
        const featuresJson = JSON.stringify(cleanFeatures);

        // Làm sạch specs (object chuỗi -> chuỗi, tối đa 30 cặp)
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

        const cleanGallery = Array.isArray(p.gallery)
          ? p.gallery.filter((x: any) => typeof x === 'string' && x.trim().length > 0)
          : [];
        const galleryJson = JSON.stringify(cleanGallery);

        const cleanProjectImages = Array.isArray(p.projectImages)
          ? p.projectImages.filter((x: any) => typeof x === 'string' && x.trim().length > 0)
          : [];
        const projectImagesJson = JSON.stringify(cleanProjectImages);

        const longDesc = typeof p.longDescription === 'string'
          ? p.longDescription
          : (typeof p.long_description === 'string' ? p.long_description : null);

        await sql`
          INSERT INTO products (
            id, name, slug, category, category_name, fire_rating, certification_no,
            short_description, material, standard, warranty, specs, features, long_description,
            featured, status, sort_order, seo_title, seo_description, image_alt, image,
            gallery, project_images, price_estimate, updated_at
          ) VALUES (
            ${p.id}, ${p.name}, ${slug}, ${cat}, ${catName},
            ${p.fireRating || null}, ${p.certificationNo || null}, ${p.shortDescription || null},
            ${p.material || null}, ${p.standard || null}, ${p.warranty || null},
            ${specsJson}::jsonb, ${featuresJson}::jsonb, ${longDesc || null},
            ${Boolean(p.featured)}, ${p.status || 'published'},
            ${Number(p.sortOrder) || 0}, ${p.seoTitle || null}, ${p.seoDescription || null},
            ${p.imageAlt || null}, ${p.image || null},
            ${galleryJson}::jsonb, ${projectImagesJson}::jsonb,
            ${p.priceEstimate || null}, NOW()
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
            gallery = EXCLUDED.gallery,
            project_images = EXCLUDED.project_images,
            price_estimate = EXCLUDED.price_estimate,
            updated_at = NOW()
        `;
      }

      if (isBatch) {
        return res.status(200).json({ ok: true, count: items.length });
      }
      return res.status(200).json({ ok: true, id: items[0].id });
    } catch (err: any) {
      console.error('Lỗi lưu sản phẩm:', err);
      const detail = err?.message || 'Không thể lưu thông tin sản phẩm.';
      return res.status(500).json({ error: 'DatabaseError', message: `Không thể lưu thông tin sản phẩm: ${detail}` });
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
