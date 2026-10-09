import { getDb, requireAdminRole, ALL_ROLES, verifyPassword, hashPassword } from '../_db.js';

const MIN_PASSWORD_LENGTH = 12;

// Người dùng quản trị (mọi vai trò) tự đổi mật khẩu của chính mình
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'MethodNotAllowed' });
  }

  const user = await requireAdminRole(req, res, ALL_ROLES);
  if (!user) return;

  const { currentPassword, newPassword } = req.body || {};
  if (typeof currentPassword !== 'string' || typeof newPassword !== 'string' || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'BadRequest', message: 'Vui lòng nhập mật khẩu hiện tại và mật khẩu mới.' });
  }
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return res.status(400).json({ error: 'WeakPassword', message: `Mật khẩu mới phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự.` });
  }
  if (newPassword === currentPassword) {
    return res.status(400).json({ error: 'SamePassword', message: 'Mật khẩu mới phải khác mật khẩu hiện tại.' });
  }

  try {
    const sql = getDb();
    const rows = await sql`SELECT password_hash FROM admin_users WHERE id = ${user.id} LIMIT 1`;
    if (!rows.length || !verifyPassword(currentPassword, rows[0].password_hash)) {
      return res.status(400).json({ error: 'WrongPassword', message: 'Mật khẩu hiện tại không đúng.' });
    }

    await sql`
      UPDATE admin_users
      SET password_hash = ${hashPassword(newPassword)}, updated_at = NOW()
      WHERE id = ${user.id}
    `;

    try {
      await sql`
        INSERT INTO activities (id, actor, action, target)
        VALUES (${'act-' + Date.now()}, ${user.fullName || user.email}, 'Đổi mật khẩu', ${user.email})
      `;
    } catch {}

    return res.status(200).json({ ok: true, message: 'Đã đổi mật khẩu.' });
  } catch (err: any) {
    console.error('Lỗi đổi mật khẩu:', err);
    return res.status(500).json({ error: 'DatabaseError', message: 'Không thể đổi mật khẩu lúc này.' });
  }
}
