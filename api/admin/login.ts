import { getDb, verifyPassword, createSessionToken, hashPassword } from '../_db.js';

// Giới hạn đăng nhập sai trong cửa sổ 15 phút
const WINDOW_MINUTES = 15;
const MAX_FAILURES_PER_EMAIL = 5;
const MAX_FAILURES_PER_IP = 20;
// Hash giả để so sánh khi email không tồn tại, tránh lộ email hợp lệ qua thời gian phản hồi
const DUMMY_HASH = hashPassword('apex-dummy-password-for-timing');

const clientIp = (req: any) => {
  const forwarded = req.headers?.['x-forwarded-for'];
  const first = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '';
  return first || req.socket?.remoteAddress || 'unknown';
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'MethodNotAllowed', message: 'Chỉ chấp nhận phương thức POST.' });
  }

  try {
    const { email, password } = req.body || {};
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const cleanPassword = typeof password === 'string' ? password : '';

    if (!cleanEmail || !cleanPassword) {
      return res.status(400).json({ error: 'BadRequest', message: 'Vui lòng nhập đầy đủ email và mật khẩu.' });
    }

    let sql;
    try {
      sql = getDb();
    } catch (err: any) {
      return res.status(503).json({
        error: 'DatabaseNotConfigured',
        message: 'Cơ sở dữ liệu Neon chưa được kết nối trên Vercel (thiếu DATABASE_URL).',
      });
    }

    const ip = clientIp(req);

    // Chặn dò mật khẩu: đếm số lần sai gần đây theo email và theo IP.
    // Nếu bảng login_attempts chưa được tạo, ghi log lỗi và tiếp tục (không khóa toàn bộ admin).
    let rateLimitReady = true;
    try {
      const [counts] = await sql`
        SELECT
          COUNT(*) FILTER (WHERE email = ${cleanEmail})::int AS "byEmail",
          COUNT(*) FILTER (WHERE ip = ${ip})::int AS "byIp"
        FROM login_attempts
        WHERE success = false
          AND created_at > NOW() - make_interval(mins => ${WINDOW_MINUTES})
      `;
      if (counts.byEmail >= MAX_FAILURES_PER_EMAIL || counts.byIp >= MAX_FAILURES_PER_IP) {
        res.setHeader('Retry-After', String(WINDOW_MINUTES * 60));
        return res.status(429).json({
          error: 'TooManyAttempts',
          message: `Đăng nhập sai quá nhiều lần. Vui lòng thử lại sau ${WINDOW_MINUTES} phút.`,
        });
      }
    } catch (err) {
      rateLimitReady = false;
      console.error('Chưa kiểm tra được giới hạn đăng nhập (bảng login_attempts?):', err);
    }

    const recordAttempt = async (success: boolean) => {
      if (!rateLimitReady) return;
      try {
        await sql`INSERT INTO login_attempts (email, ip, success) VALUES (${cleanEmail}, ${ip}, ${success})`;
        if (success) {
          await sql`DELETE FROM login_attempts WHERE email = ${cleanEmail} AND success = false`;
        }
      } catch (err) {
        console.error('Không ghi được lịch sử đăng nhập:', err);
      }
    };

    // Truy vấn thông tin người dùng quản trị
    const users = await sql`
      SELECT id, email, password_hash, full_name, role, active
      FROM admin_users
      WHERE LOWER(email) = ${cleanEmail} AND active = true
      LIMIT 1
    `;

    if (!users || users.length === 0) {
      verifyPassword(cleanPassword, DUMMY_HASH);
      await recordAttempt(false);
      return res.status(401).json({ error: 'InvalidCredentials', message: 'Email hoặc mật khẩu không chính xác.' });
    }

    const admin = users[0];
    const isMatch = verifyPassword(cleanPassword, admin.password_hash);
    if (!isMatch) {
      await recordAttempt(false);
      return res.status(401).json({ error: 'InvalidCredentials', message: 'Email hoặc mật khẩu không chính xác.' });
    }

    // Tạo session token
    let token;
    try {
      token = createSessionToken({
        id: admin.id,
        email: admin.email,
        role: admin.role,
        fullName: admin.full_name,
      });
    } catch (err: any) {
      return res.status(500).json({
        error: 'AuthConfigError',
        message: 'Chưa cấu hình ADMIN_SESSION_SECRET trên Vercel.',
      });
    }

    // Thiết lập cookie HTTP-Only bảo mật
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieFlags = [
      `apex_admin_token=${encodeURIComponent(token)}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      'Max-Age=604800', // 7 ngày
      isProduction ? 'Secure' : '',
    ].filter(Boolean).join('; ');

    res.setHeader('Set-Cookie', cookieFlags);
    await recordAttempt(true);

    // Ghi nhận lịch sử đăng nhập
    try {
      await sql`
        INSERT INTO activities (id, actor, action, target)
        VALUES (
          ${'act-' + Date.now()},
          ${admin.full_name || admin.email},
          'Đăng nhập hệ thống quản trị',
          ${'IP: ' + ip}
        )
      `;
    } catch {}

    return res.status(200).json({
      // Token chỉ nằm trong cookie HttpOnly, không trả về cho JavaScript phía trình duyệt
      ok: true,
      user: {
        id: admin.id,
        email: admin.email,
        fullName: admin.full_name,
        role: admin.role,
      },
    });
  } catch (error: any) {
    console.error('Lỗi API /api/admin/login:', error);
    return res.status(500).json({
      error: 'InternalServerError',
      message: 'Có lỗi xảy ra trong quá trình xác thực. Vui lòng thử lại sau.',
    });
  }
}
