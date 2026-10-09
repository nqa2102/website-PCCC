// Công cụ hỗ trợ tạo chuỗi băm mật khẩu cho tài khoản quản trị APEX (Neon PostgreSQL)
// Cách dùng: node scripts/hash_password.js "mat_khau_moi_cua_ban" "email_quan_tri@apexdoor.net"

import crypto from 'crypto';

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

const password = process.argv[2] || 'ApexSafe@2026!';
const email = (process.argv[3] || 'admin@apexdoor.net').toLowerCase().trim();
const hash = hashPassword(password);
const id = 'usr-' + Date.now();

console.log('================================================================');
console.log('APEX VIỆT NAM — TẠO HASH MẬT KHẨU QUẢN TRỊ VIÊN');
console.log('================================================================');
console.log(`Email:    ${email}`);
console.log(`Password: ${password}`);
console.log(`Hash:     ${hash}`);
console.log('\nCâu lệnh SQL thực thi trong Neon Console SQL Editor:');
console.log('----------------------------------------------------------------');
console.log(`INSERT INTO admin_users (id, email, password_hash, full_name, role, active)
VALUES (
  '${id}',
  '${email}',
  '${hash}',
  'Quản trị viên APEX',
  'admin',
  true
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  updated_at = NOW();`);
console.log('================================================================');
