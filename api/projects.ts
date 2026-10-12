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

  const { slug, category } = req.query || {};

  try {
    // 1. Chi tiết 1 dự án: Tuyệt đối chỉ trả về nếu verified = true VÀ status = 'published'
    // Bắt buộc trả 404 nếu verified = false kể cả khi slug tồn tại
    if (slug && typeof slug === 'string') {
      const cleanSlug = slug.trim();
      const rows = await sql`
        SELECT 
          id, title, slug, client_name as "clientName", category,
          location, completed_year as "completedYear", description,
          cover_image as "coverImage", gallery, status, verified,
          created_at as "createdAt", updated_at as "updatedAt"
        FROM projects
        WHERE slug = ${cleanSlug} AND verified = true AND status = 'published'
        LIMIT 1
      `;

      if (!rows || rows.length === 0) {
        return res.status(404).json({
          error: 'NotFound',
          message: 'Dự án không tồn tại hoặc chưa hoàn tất thủ tục xác minh công bố.',
        });
      }

      return res.status(200).json({ project: rows[0] });
    }

    // 2. Danh sách dự án tiêu biểu: CHỈ lấy các dự án verified = true VÀ status = 'published'
    let rows;
    if (category && typeof category === 'string') {
      rows = await sql`
        SELECT 
          id, title, slug, client_name as "clientName", category,
          location, completed_year as "completedYear", description,
          cover_image as "coverImage", gallery, status, verified,
          created_at as "createdAt", updated_at as "updatedAt"
        FROM projects
        WHERE verified = true AND status = 'published' AND category = ${category.trim()}
        ORDER BY completed_year DESC NULLS LAST, created_at DESC
      `;
    } else {
      rows = await sql`
        SELECT 
          id, title, slug, client_name as "clientName", category,
          location, completed_year as "completedYear", description,
          cover_image as "coverImage", gallery, status, verified,
          created_at as "createdAt", updated_at as "updatedAt"
        FROM projects
        WHERE verified = true AND status = 'published'
        ORDER BY completed_year DESC NULLS LAST, created_at DESC
      `;
    }

    return res.status(200).json({ projects: rows || [] });
  } catch (err: any) {
    console.error('Lỗi API /api/projects:', err);
    return res.status(500).json({ error: 'DatabaseError', message: 'Không thể truy vấn danh mục dự án.' });
  }
}
