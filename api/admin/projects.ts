import { getDb, requireAdminRole, ROLE_ACCESS } from '../_db.js';

export default async function handler(req: any, res: any) {
  // GET: Lấy danh sách dự án cho quản trị viên
  if (req.method === 'GET') {
    const user = await requireAdminRole(req, res, ['admin', 'editor', 'sales', 'technical']);
    if (!user) return;

    try {
      const sql = getDb();
      let rows;
      try {
        rows = await sql`
          SELECT 
            id, title, slug, client_name as "clientName",
            general_contractor as "generalContractor", apex_role as "apexRole",
            category, location, completed_year as "completedYear", description,
            cover_image as "coverImage", gallery, status, verified,
            verified_note as "verifiedNote", created_at as "createdAt",
            updated_at as "updatedAt"
          FROM projects
          ORDER BY created_at DESC
        `;
      } catch (colErr: any) {
        console.warn('Fallback admin projects query không có cột mới:', colErr?.message || colErr);
        rows = await sql`
          SELECT 
            id, title, slug, client_name as "clientName",
            '' as "generalContractor", '' as "apexRole",
            category, location, completed_year as "completedYear", description,
            cover_image as "coverImage", gallery, status, verified,
            verified_note as "verifiedNote", created_at as "createdAt",
            updated_at as "updatedAt"
          FROM projects
          ORDER BY created_at DESC
        `;
      }
      return res.status(200).json({ projects: rows });
    } catch (err: any) {
      console.error('Lỗi lấy danh sách dự án admin:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể tải danh sách dự án.' });
    }
  }

  // POST / PUT / PATCH: Thêm mới hoặc cập nhật dự án
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    const user = await requireAdminRole(req, res, ['admin', 'editor']);
    if (!user) return;

    try {
      const p = req.body || {};
      if (!p.id || !p.title || !p.slug) {
        return res.status(400).json({ error: 'BadRequest', message: 'Thiếu mã, tiêu đề hoặc đường dẫn (slug) của dự án.' });
      }

      const isSettingVerified = Boolean(p.verified);

      // Chặn công bố khi chưa xác minh (P0 an toàn pháp lý: chỉ dự án đã xác minh mới được công bố)
      if (p.status === 'published' && !isSettingVerified) {
        return res.status(400).json({
          error: 'UnverifiedPublishForbidden',
          message: 'Dự án phải được xác minh trước khi công bố.',
        });
      }

      // RÀNG BUỘC QUAN TRỌNG:
      // 1. Chỉ Quản trị viên (admin) mới được set verified = true
      if (isSettingVerified && user.role !== 'admin') {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'Chỉ Quản trị viên (admin) mới có thẩm quyền xác minh dự án tiêu biểu.',
        });
      }

      // 2. Khi set verified = true, BẮT BUỘC phải có verified_note
      const verifiedNote = (p.verifiedNote || p.verified_note || '').trim();
      if (isSettingVerified && !verifiedNote) {
        return res.status(400).json({
          error: 'MissingVerifiedNote',
          message: 'Bắt buộc nhập ghi chú xác minh (ai xác nhận, ngày nào, theo văn bản/hợp đồng nào) khi đánh dấu dự án là Đã xác minh.',
        });
      }

      const sql = getDb();
      const galleryJson = JSON.stringify(Array.isArray(p.gallery) ? p.gallery : []);

      try {
        await sql`
          INSERT INTO projects (
            id, title, slug, client_name, general_contractor, apex_role, category, location, completed_year,
            description, cover_image, gallery, status, verified, verified_note,
            updated_at
          ) VALUES (
            ${p.id}, ${p.title}, ${p.slug}, ${p.clientName || null},
            ${p.generalContractor || null}, ${p.apexRole || null},
            ${p.category || null}, ${p.location || null},
            ${p.completedYear ? Number(p.completedYear) : null},
            ${p.description || null}, ${p.coverImage || null},
            ${galleryJson}::jsonb, ${p.status || 'draft'},
            ${isSettingVerified}, ${isSettingVerified ? verifiedNote : null},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            slug = EXCLUDED.slug,
            client_name = EXCLUDED.client_name,
            general_contractor = EXCLUDED.general_contractor,
            apex_role = EXCLUDED.apex_role,
            category = EXCLUDED.category,
            location = EXCLUDED.location,
            completed_year = EXCLUDED.completed_year,
            description = EXCLUDED.description,
            cover_image = EXCLUDED.cover_image,
            gallery = EXCLUDED.gallery,
            status = EXCLUDED.status,
            verified = EXCLUDED.verified,
            verified_note = EXCLUDED.verified_note,
            updated_at = NOW()
        `;
      } catch (colErr: any) {
        console.warn('Fallback lưu admin projects khi chưa có 2 cột mới:', colErr?.message || colErr);
        await sql`
          INSERT INTO projects (
            id, title, slug, client_name, category, location, completed_year,
            description, cover_image, gallery, status, verified, verified_note,
            updated_at
          ) VALUES (
            ${p.id}, ${p.title}, ${p.slug}, ${p.clientName || null},
            ${p.category || null}, ${p.location || null},
            ${p.completedYear ? Number(p.completedYear) : null},
            ${p.description || null}, ${p.coverImage || null},
            ${galleryJson}::jsonb, ${p.status || 'draft'},
            ${isSettingVerified}, ${isSettingVerified ? verifiedNote : null},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            slug = EXCLUDED.slug,
            client_name = EXCLUDED.client_name,
            category = EXCLUDED.category,
            location = EXCLUDED.location,
            completed_year = EXCLUDED.completed_year,
            description = EXCLUDED.description,
            cover_image = EXCLUDED.cover_image,
            gallery = EXCLUDED.gallery,
            status = EXCLUDED.status,
            verified = EXCLUDED.verified,
            verified_note = EXCLUDED.verified_note,
            updated_at = NOW()
        `;
      }

      return res.status(200).json({ ok: true, id: p.id });
    } catch (err: any) {
      console.error('Lỗi lưu dự án admin:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể lưu thông tin dự án.' });
    }
  }

  // DELETE: Xóa dự án (chỉ Admin)
  if (req.method === 'DELETE') {
    const user = await requireAdminRole(req, res, ROLE_ACCESS.destructive);
    if (!user) return;

    const { id } = req.query || req.body || {};
    if (!id) return res.status(400).json({ error: 'BadRequest', message: 'Cần mã dự án cần xóa.' });

    try {
      const sql = getDb();
      await sql`DELETE FROM projects WHERE id = ${String(id)}`;
      return res.status(200).json({ ok: true, id });
    } catch (err: any) {
      console.error('Lỗi xóa dự án admin:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể xóa dự án.' });
    }
  }

  res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE');
  return res.status(405).json({ error: 'MethodNotAllowed' });
}
