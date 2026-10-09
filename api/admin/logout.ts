export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'MethodNotAllowed' });
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const cookieFlags = [
    'apex_admin_token=',
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0',
    isProduction ? 'Secure' : '',
  ].filter(Boolean).join('; ');

  res.setHeader('Set-Cookie', cookieFlags);
  return res.status(200).json({ ok: true, message: 'Đã đăng xuất thành công.' });
}
