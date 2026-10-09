import { getDb, requireAdminRole, ALL_ROLES } from '../_db.js';

export default async function handler(req: any, res: any) {
  const user = await requireAdminRole(req, res, ALL_ROLES);
  if (!user) return;

  // GET: Lấy nhật ký hoạt động
  if (req.method === 'GET') {
    try {
      const sql = getDb();
      const rows = await sql`
        SELECT id, created_at as "at", actor, action, target
        FROM activities
        ORDER BY created_at DESC
        LIMIT 100
      `;
      return res.status(200).json({ activities: rows });
    } catch (err: any) {
      console.error('Lỗi lấy nhật ký:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể tải nhật ký hoạt động.' });
    }
  }

  // POST: Ghi nhận nhật ký mới
  if (req.method === 'POST') {
    try {
      const { actor, action, target } = req.body || {};
      const sql = getDb();
      const id = `act-${Date.now()}`;
      await sql`
        INSERT INTO activities (id, actor, action, target)
        VALUES (${id}, ${actor || user.fullName || user.email}, ${action || 'Thao tác'}, ${target || ''})
      `;
      return res.status(200).json({ ok: true, id });
    } catch (err: any) {
      console.error('Lỗi ghi nhật ký:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể ghi nhận nhật ký.' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'MethodNotAllowed' });
}
