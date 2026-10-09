import { getDb, requireAdminRole, canPublish, ROLE_ACCESS } from '../_db.js';

export default async function handler(req: any, res: any) {
  // GET: Lấy danh sách nội dung (dự án, tin tức, bài viết)
  if (req.method === 'GET') {
    // Dữ liệu quản trị gồm cả bản nháp/nội bộ: chỉ trả cho người đã đăng nhập.
    // Website công khai đọc qua /api/public-content (chỉ nội dung published).
    const user = await requireAdminRole(req, res, ROLE_ACCESS.contents);
    if (!user) return;

    try {
      const sql = getDb();
      const typeFilter = req.query?.type;

      let rows;
      if (typeFilter && typeof typeFilter === 'string') {
        rows = await sql`
          SELECT 
            id, type, title, summary, status,
            publish_at as "publishAt", owner, featured,
            media_approved as "mediaApproved", client_approved as "clientApproved",
            category, location, scale, items_supplied as "itemsSupplied",
            year, client, image, author, read_time as "readTime",
            content, updated_at as "updatedAt"
          FROM contents
          WHERE type = ${typeFilter}
          ORDER BY updated_at DESC
        `;
      } else {
        rows = await sql`
          SELECT 
            id, type, title, summary, status,
            publish_at as "publishAt", owner, featured,
            media_approved as "mediaApproved", client_approved as "clientApproved",
            category, location, scale, items_supplied as "itemsSupplied",
            year, client, image, author, read_time as "readTime",
            content, updated_at as "updatedAt"
          FROM contents
          ORDER BY updated_at DESC
        `;
      }
      return res.status(200).json({ contents: rows });
    } catch (err: any) {
      console.error('Lỗi lấy danh sách nội dung:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể tải nội dung.' });
    }
  }

  // POST / PUT: Thêm hoặc cập nhật nội dung
  if (req.method === 'POST' || req.method === 'PUT') {
    const user = await requireAdminRole(req, res, ROLE_ACCESS.contents);
    if (!user) return;

    const c = req.body || {};
    if (c.status === 'published' && !canPublish(user.role)) {
      return res.status(403).json({ error: 'Forbidden', message: 'Chỉ Quản trị viên được công bố nội dung ra website. Hãy chuyển sang "Chờ duyệt".' });
    }
    if (c.type === 'project' && c.status === 'published' && !(c.mediaApproved && c.clientApproved)) {
      return res.status(400).json({ error: 'NotApproved', message: 'Dự án chỉ được công bố khi đã duyệt hình ảnh và có xác nhận của khách hàng.' });
    }

    try {
      if (!c.id || !c.type || !c.title) {
        return res.status(400).json({ error: 'BadRequest', message: 'Thiếu thông tin bắt buộc của nội dung.' });
      }

      const sql = getDb();
      const contentJson = JSON.stringify(Array.isArray(c.content) ? c.content : c.summary ? [c.summary] : []);

      await sql`
        INSERT INTO contents (
          id, type, title, summary, status, publish_at, owner, featured,
          media_approved, client_approved, category, location, scale,
          items_supplied, year, client, image, author, read_time, content, updated_at
        ) VALUES (
          ${c.id}, ${c.type}, ${c.title}, ${c.summary || null}, ${c.status || 'draft'},
          ${c.publishAt || null}, ${c.owner || null}, ${Boolean(c.featured)},
          ${Boolean(c.mediaApproved)}, ${Boolean(c.clientApproved)}, ${c.category || null},
          ${c.location || null}, ${c.scale || null}, ${c.itemsSupplied || null},
          ${c.year || null}, ${c.client || null}, ${c.image || null}, ${c.author || null},
          ${c.readTime || null}, ${contentJson}::jsonb, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          type = EXCLUDED.type,
          title = EXCLUDED.title,
          summary = EXCLUDED.summary,
          status = EXCLUDED.status,
          publish_at = EXCLUDED.publish_at,
          owner = EXCLUDED.owner,
          featured = EXCLUDED.featured,
          media_approved = EXCLUDED.media_approved,
          client_approved = EXCLUDED.client_approved,
          category = EXCLUDED.category,
          location = EXCLUDED.location,
          scale = EXCLUDED.scale,
          items_supplied = EXCLUDED.items_supplied,
          year = EXCLUDED.year,
          client = EXCLUDED.client,
          image = EXCLUDED.image,
          author = EXCLUDED.author,
          read_time = EXCLUDED.read_time,
          content = EXCLUDED.content,
          updated_at = NOW()
      `;

      return res.status(200).json({ ok: true, id: c.id });
    } catch (err: any) {
      console.error('Lỗi lưu nội dung:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể lưu nội dung.' });
    }
  }

  // DELETE: Xóa nội dung
  if (req.method === 'DELETE') {
    const user = await requireAdminRole(req, res, ROLE_ACCESS.destructive);
    if (!user) return;

    const { id } = req.query || req.body || {};
    if (!id) return res.status(400).json({ error: 'BadRequest', message: 'Cần mã nội dung cần xóa.' });

    try {
      const sql = getDb();
      await sql`DELETE FROM contents WHERE id = ${String(id)}`;
      return res.status(200).json({ ok: true, id });
    } catch (err: any) {
      console.error('Lỗi xóa nội dung:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể xóa nội dung.' });
    }
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE');
  return res.status(405).json({ error: 'MethodNotAllowed' });
}
