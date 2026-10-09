// Công cụ tạo câu lệnh SQL tài khoản quản trị APEX (Neon PostgreSQL)
// Cách dùng: npm run hash-admin
// Script hỏi email, họ tên, vai trò và mật khẩu (gõ ẩn). Mật khẩu không được in ra
// và không nằm trong lịch sử lệnh; chỉ chuỗi băm scrypt xuất hiện trong câu SQL.

import crypto from 'crypto';
import readline from 'readline';

const ROLES = ['admin', 'editor', 'sales', 'technical'];
const MIN_PASSWORD_LENGTH = 12;

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

const sqlText = (value) => `'${String(value).replace(/'/g, "''")}'`;

const isTTY = Boolean(process.stdin.isTTY);
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: isTTY });

// Khi nhập mật khẩu: không hiển thị ký tự nào (giống sudo), chỉ cho phép xuống dòng
let muted = false;
if (isTTY) {
  const originalWrite = rl._writeToOutput.bind(rl);
  rl._writeToOutput = (text) => {
    if (!muted || text === '\r\n' || text === '\n') originalWrite(text);
  };
}

// Hàng đợi dòng nhập: hoạt động cả khi gõ tay lẫn khi dữ liệu được pipe vào
const pending = [];
const waiting = [];
let closed = false;
rl.on('line', (line) => (waiting.length ? waiting.shift()(line) : pending.push(line)));
rl.on('close', () => {
  closed = true;
  while (waiting.length) waiting.shift()('');
});
const nextLine = () =>
  pending.length ? Promise.resolve(pending.shift()) : closed ? Promise.resolve('') : new Promise((resolve) => waiting.push(resolve));

const ask = async (question) => {
  process.stdout.write(question);
  const answer = await nextLine();
  if (!isTTY) process.stdout.write('\n');
  return answer.trim();
};

const askHidden = async (question) => {
  process.stdout.write(question);
  muted = true;
  const answer = await nextLine();
  muted = false;
  if (!isTTY) process.stdout.write('\n');
  return answer;
};

const main = async () => {
  console.log('================================================================');
  console.log('APEX VIỆT NAM — TẠO TÀI KHOẢN QUẢN TRỊ (Neon PostgreSQL)');
  console.log('================================================================');

  const email = (await ask('Email đăng nhập: ')).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Email không hợp lệ.');

  const fullName = (await ask('Họ và tên: ')) || 'Quản trị viên APEX';
  const roleInput = (await ask(`Vai trò (${ROLES.join('/')}) [admin]: `)) || 'admin';
  if (!ROLES.includes(roleInput)) throw new Error(`Vai trò phải là một trong: ${ROLES.join(', ')}.`);

  const password = await askHidden(`Mật khẩu (tối thiểu ${MIN_PASSWORD_LENGTH} ký tự): `);
  if (password.length < MIN_PASSWORD_LENGTH) throw new Error(`Mật khẩu phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự.`);
  const confirm = await askHidden('Nhập lại mật khẩu: ');
  if (confirm !== password) throw new Error('Hai lần nhập mật khẩu không khớp.');

  const id = `usr-${crypto.randomBytes(6).toString('hex')}`;
  const hash = hashPassword(password);

  console.log('\nSao chép toàn bộ câu lệnh dưới đây và chạy trong Neon Console → SQL Editor:');
  console.log('----------------------------------------------------------------');
  console.log(`INSERT INTO admin_users (id, email, password_hash, full_name, role, active)
VALUES (${sqlText(id)}, ${sqlText(email)}, ${sqlText(hash)}, ${sqlText(fullName)}, ${sqlText(roleInput)}, true)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  active = true,
  updated_at = NOW();`);
  console.log('----------------------------------------------------------------');
};

main()
  .catch((err) => {
    console.error(`\nLỗi: ${err.message}`);
    process.exitCode = 1;
  })
  .finally(() => rl.close());
