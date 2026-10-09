import crypto from 'crypto';
import { neon } from '@neondatabase/serverless';

// Lấy Neon SQL client qua biến môi trường DATABASE_URL
export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured.');
  }
  return neon(databaseUrl);
}

// Băm mật khẩu quản trị bằng Scrypt bảo mật cao
export function hashPassword(password: string, salt?: string): string {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, actualSalt, 64).toString('hex');
  return `${actualSalt}:${hash}`;
}

// Xác thực mật khẩu chống tấn công timing attack
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

// Tạo session token được ký bằng HMAC SHA-256
export function createSessionToken(payload: { id: string; email: string; role: string; fullName: string }): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not configured on Vercel.');
  }
  const body = {
    ...payload,
    exp: Date.now() + 7 * 24 * 3600 * 1000, // 7 ngày
  };
  const data = Buffer.from(JSON.stringify(body)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${sig}`;
}

// Kiểm tra token xác thực từ request
export function verifySessionToken(token: string): { id: string; email: string; role: string; fullName: string } | null {
  try {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret) return null;
    const [data, sig] = token.split('.');
    if (!data || !sig) return null;
    const expectedSig = crypto.createHmac('sha256', secret).update(data).digest('base64url');
    if (sig.length !== expectedSig.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return null;

    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

// Trích xuất token từ Authorization header hoặc Cookie
export function extractTokenFromRequest(req: any): string | null {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  const cookieHeader = req.headers?.cookie;
  if (typeof cookieHeader === 'string') {
    const match = cookieHeader.match(/apex_admin_token=([^;]+)/);
    if (match && match[1]) {
      return decodeURIComponent(match[1].trim());
    }
  }

  return null;
}

export type AdminRole = 'admin' | 'editor' | 'sales' | 'technical';

export interface AdminSessionUser {
  id: string;
  email: string;
  role: AdminRole;
  fullName: string;
}

// Ma trận phân quyền theo vai trò (khớp với menu trong AdminApp)
export const ALL_ROLES: readonly AdminRole[] = ['admin', 'editor', 'sales', 'technical'];
export const ROLE_ACCESS = {
  leads: ['admin', 'sales'],
  products: ['admin', 'editor', 'technical'],
  documents: ['admin', 'technical'],
  contents: ['admin', 'editor'],
  settings: ['admin'],
  upload: ['admin', 'editor', 'technical'],
  // Xóa dữ liệu và công bố ra website chỉ dành cho Quản trị viên
  destructive: ['admin'],
} as const satisfies Record<string, readonly AdminRole[]>;

export const canPublish = (role: AdminRole) => role === 'admin';

// Xác thực phiên + đọc lại vai trò từ Neon cho mỗi request: tài khoản bị khóa
// hoặc đổi vai trò có hiệu lực ngay, không phải chờ hết hạn token 7 ngày.
export async function requireAdminRole(req: any, res: any, allowed: readonly AdminRole[]): Promise<AdminSessionUser | null> {
  const session = requireAdminAuth(req, res);
  if (!session) return null;

  let sql;
  try {
    sql = getDb();
  } catch {
    res.status(503).json({ error: 'DatabaseNotConfigured', message: 'Cơ sở dữ liệu Neon chưa được kết nối (thiếu DATABASE_URL).' });
    return null;
  }

  try {
    const rows = await sql`
      SELECT id, email, full_name, role
      FROM admin_users
      WHERE id = ${session.id} AND active = true
      LIMIT 1
    `;
    if (!rows || rows.length === 0) {
      res.status(401).json({ error: 'InvalidToken', message: 'Tài khoản quản trị không còn hiệu lực.' });
      return null;
    }
    const user: AdminSessionUser = {
      id: rows[0].id,
      email: rows[0].email,
      role: rows[0].role,
      fullName: rows[0].full_name,
    };
    if (!allowed.includes(user.role)) {
      res.status(403).json({ error: 'Forbidden', message: 'Vai trò của bạn không có quyền thực hiện thao tác này.' });
      return null;
    }
    return user;
  } catch (err) {
    console.error('Lỗi kiểm tra quyền quản trị:', err);
    res.status(500).json({ error: 'DatabaseError', message: 'Không thể kiểm tra quyền truy cập.' });
    return null;
  }
}

// Middleware xác thực quyền quản trị (chỉ kiểm tra chữ ký token)
export function requireAdminAuth(req: any, res: any): { id: string; email: string; role: string; fullName: string } | null {
  const token = extractTokenFromRequest(req);
  if (!token) {
    res.status(401).json({ error: 'Unauthorized', message: 'Yêu cầu đăng nhập quản trị hệ thống.' });
    return null;
  }

  const user = verifySessionToken(token);
  if (!user) {
    res.status(401).json({ error: 'InvalidToken', message: 'Phiên đăng nhập đã hết hạn hoặc không hợp lệ.' });
    return null;
  }

  return user;
}
