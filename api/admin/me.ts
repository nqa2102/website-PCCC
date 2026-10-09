import { requireAdminRole, ALL_ROLES } from '../_db.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'MethodNotAllowed' });
  }

  // Trả vai trò hiện hành trong Neon để giao diện hiển thị đúng quyền
  const user = await requireAdminRole(req, res, ALL_ROLES);
  if (!user) return;

  return res.status(200).json({
    authenticated: true,
    user,
  });
}
