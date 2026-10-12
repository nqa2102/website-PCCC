import { getDb } from './_db.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'MethodNotAllowed' });
  }

  // Edge CDN Caching
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

  let sql;
  try {
    sql = getDb();
  } catch {
    return res.status(503).json({ error: 'DatabaseNotConfigured', message: 'Cơ sở dữ liệu chưa sẵn sàng.' });
  }

  const { category, slug } = req.query || {};

  try {
    // 1. Nếu có slug: trả về chi tiết 1 sản phẩm
    if (slug && typeof slug === 'string') {
      const cleanSlug = slug.trim();
      const rows = await sql`
        SELECT 
          id, name, slug, category, category_name as "categoryName",
          fire_rating as "fireRating", certification_no as "certificationNo",
          short_description as "shortDescription", material, standard, warranty,
          specs, featured, status, sort_order as "sortOrder",
          seo_title as "seoTitle", seo_description as "seoDescription",
          image_alt as "imageAlt", image, price_estimate as "priceEstimate",
          updated_at as "updatedAt"
        FROM products
        WHERE slug = ${cleanSlug} AND status = 'published'
        LIMIT 1
      `;

      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: 'NotFound', message: 'Sản phẩm không tồn tại hoặc chưa được công bố.' });
      }

      return res.status(200).json({ product: rows[0] });
    }

    // 2. Nếu có lọc theo category
    if (category && typeof category === 'string') {
      const cleanCategory = category.trim();
      const rows = await sql`
        SELECT 
          id, name, slug, category, category_name as "categoryName",
          fire_rating as "fireRating", certification_no as "certificationNo",
          short_description as "shortDescription", material, standard, warranty,
          specs, featured, status, sort_order as "sortOrder",
          seo_title as "seoTitle", seo_description as "seoDescription",
          image_alt as "imageAlt", image, price_estimate as "priceEstimate",
          updated_at as "updatedAt"
        FROM products
        WHERE category = ${cleanCategory} AND status = 'published'
        ORDER BY sort_order ASC, name ASC
      `;

      return res.status(200).json({ products: rows || [] });
    }

    // 3. Mặc định: Lấy toàn bộ sản phẩm published
    const rows = await sql`
      SELECT 
        id, name, slug, category, category_name as "categoryName",
        fire_rating as "fireRating", certification_no as "certificationNo",
        short_description as "shortDescription", material, standard, warranty,
        specs, featured, status, sort_order as "sortOrder",
        seo_title as "seoTitle", seo_description as "seoDescription",
        image_alt as "imageAlt", image, price_estimate as "priceEstimate",
        updated_at as "updatedAt"
      FROM products
      WHERE status = 'published'
      ORDER BY sort_order ASC, name ASC
    `;

    return res.status(200).json({ products: rows || [] });
  } catch (err: any) {
    console.error('Lỗi API /api/products:', err);
    return res.status(500).json({ error: 'DatabaseError', message: 'Không thể truy vấn danh mục sản phẩm.' });
  }
}
