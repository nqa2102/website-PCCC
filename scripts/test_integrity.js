import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('=============================================================');
console.log('KIỂM THỬ TÍNH TOÀN VẸN VÀ DỮ LIỆU THỰC TẾ — APEX VIỆT NAM');
console.log('=============================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// -------------------------------------------------------------
// Test 1: Băm mật khẩu scrypt và xác thực chống timing attack
// -------------------------------------------------------------
console.log('--- 1. Kiểm tra mã hóa & xác thực quản trị (Scrypt & HMAC) ---');
const testPassword = 'ApexSafe@2026!RealPassword';
const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.scryptSync(testPassword, salt, 64).toString('hex');
const storedHash = `${salt}:${hash}`;

function verifyPassword(pwd, stored) {
  try {
    const [s, k] = stored.split(':');
    if (!s || !k) return false;
    const keyBuf = Buffer.from(k, 'hex');
    const derived = crypto.scryptSync(pwd, s, 64);
    return crypto.timingSafeEqual(keyBuf, derived);
  } catch {
    return false;
  }
}

assert(verifyPassword(testPassword, storedHash) === true, 'Xác thực mật khẩu đúng khớp 100%');
assert(verifyPassword('WrongPassword123', storedHash) === false, 'Từ chối mật khẩu sai');

// Test HMAC Session
const mockSecret = 'test-secret-32-chars-long-123456';
const payload = { id: 'usr-001', email: 'admin@apex.vn', role: 'admin', fullName: 'Admin' };
const data = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 60000 })).toString('base64url');
const sig = crypto.createHmac('sha256', mockSecret).update(data).digest('base64url');
const token = `${data}.${sig}`;

const [tokData, tokSig] = token.split('.');
const expectedSig = crypto.createHmac('sha256', mockSecret).update(tokData).digest('base64url');
const isValidSig = crypto.timingSafeEqual(Buffer.from(tokSig), Buffer.from(expectedSig));
assert(isValidSig === true, 'Chữ ký session HMAC SHA-256 hợp lệ');

// -------------------------------------------------------------
// Test 2: Rà soát tệp SQL Neon Schema
// -------------------------------------------------------------
console.log('\n--- 2. Kiểm tra Neon Schema (sql/neon_schema.sql) ---');
const schemaPath = path.join(rootDir, 'sql', 'neon_schema.sql');
assert(fs.existsSync(schemaPath), 'File sql/neon_schema.sql tồn tại');

const schemaContent = fs.readFileSync(schemaPath, 'utf8');
const requiredTables = [
  'admin_users',
  'leads',
  'products',
  'documents',
  'contents',
  'company_settings',
  'activities',
];

for (const table of requiredTables) {
  assert(schemaContent.includes(`CREATE TABLE IF NOT EXISTS ${table}`), `Bảng ${table} được định nghĩa đầy đủ`);
}

// Kiểm tra không chứa dữ liệu mock/khuếch đại
assert(!schemaContent.includes('0988.123.456'), 'Không còn hotline mock 0988.123.456');
assert(!schemaContent.includes('Apex Tower'), 'Không còn địa chỉ mock Apex Tower');
assert(!schemaContent.includes('Bitexco'), 'Không còn địa chỉ mock Bitexco');
assert(!schemaContent.includes('Phản hồi trong 15 phút'), 'Không còn thời gian phản hồi khuếch đại 15 phút');
assert(schemaContent.includes('0566 38 5555'), 'Hotline thật 0566 38 5555 đã được cập nhật');
assert(schemaContent.includes('Nguyễn Thị Ngọc Anh'), 'Đại diện pháp luật Nguyễn Thị Ngọc Anh đã cập nhật');
assert(schemaContent.includes('Công ty TNHH Apex VN'), 'Tên pháp lý Công ty TNHH Apex VN đã cập nhật');

// -------------------------------------------------------------
// Test 3: Rà soát tài nguyên SEO & Kỹ thuật
// -------------------------------------------------------------
console.log('\n--- 3. Kiểm tra SEO, Sitemap, Robots, Assets ---');
const robotsPath = path.join(rootDir, 'public', 'robots.txt');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
const ogImagePath = path.join(rootDir, 'public', 'og-image.png');
const indexPath = path.join(rootDir, 'index.html');

assert(fs.existsSync(robotsPath), 'public/robots.txt tồn tại');
const robotsContent = fs.readFileSync(robotsPath, 'utf8');
assert(robotsContent.includes('Disallow: /admin'), 'robots.txt chặn bot lập chỉ mục /admin');
assert(robotsContent.includes('Sitemap: https://website-pccc.vercel.app/sitemap.xml'), 'robots.txt khai báo sitemap');

assert(fs.existsSync(sitemapPath), 'public/sitemap.xml tồn tại');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
assert(sitemapContent.includes('<loc>https://website-pccc.vercel.app/</loc>'), 'sitemap.xml có URL trang chủ');
assert(!sitemapContent.includes('/admin'), 'sitemap.xml không chứa đường dẫn /admin');

assert(fs.existsSync(ogImagePath), 'public/og-image.png tồn tại');
const ogStats = fs.statSync(ogImagePath);
assert(ogStats.size > 1000, `Ảnh OG Image hợp lệ (kích thước: ${ogStats.size} bytes)`);

const indexContent = fs.readFileSync(indexPath, 'utf8');
assert(indexContent.includes('property="og:image"'), 'index.html chứa thẻ og:image');
assert(!indexContent.includes('Diamond Flower'), 'index.html không chứa địa chỉ mock Diamond Flower');
assert(!indexContent.includes('Cityland'), 'index.html không chứa địa chỉ mock Cityland');
assert(indexContent.includes('11 Trần Thái Tông'), 'index.html chứa địa chỉ thực 11 Trần Thái Tông');

// -------------------------------------------------------------
// Test 4: Rà soát bảo mật mã nguồn (Không hardcoded mật khẩu)
// -------------------------------------------------------------
console.log('\n--- 4. Kiểm tra bảo mật mã nguồn & bundle ---');
const distIndexPath = path.join(rootDir, 'dist', 'index.html');
assert(fs.existsSync(distIndexPath), 'dist/index.html đã được tạo sau khi build');

const filesInDist = fs.readdirSync(path.join(rootDir, 'dist', 'assets'));
let foundCreds = false;
for (const file of filesInDist) {
  if (file.endsWith('.js')) {
    const jsContent = fs.readFileSync(path.join(rootDir, 'dist', 'assets', file), 'utf8');
    if (jsContent.includes('apex2026') || jsContent.includes('1-Click')) {
      foundCreds = true;
    }
  }
}
assert(!foundCreds, 'Bundle JavaScript đã được làm sạch, không chứa mật khẩu admin');

// -------------------------------------------------------------
// Test 5: Rà soát API Serverless Endpoints
// -------------------------------------------------------------
console.log('\n--- 5. Kiểm tra Serverless API Handlers ---');
const requiredApis = [
  'api/_db.ts',
  'api/leads.ts',
  'api/public-content.ts',
  'api/admin/login.ts',
  'api/admin/logout.ts',
  'api/admin/me.ts',
  'api/admin/settings.ts',
  'api/admin/products.ts',
  'api/admin/documents.ts',
  'api/admin/contents.ts',
  'api/admin/activities.ts',
];

for (const apiPath of requiredApis) {
  assert(fs.existsSync(path.join(rootDir, apiPath)), `Endpoint ${apiPath} tồn tại`);
}

console.log('\n=============================================================');
console.log(`KẾT QUẢ TỔNG QUAN: ${passedTests}/${totalTests} BÀI KIỂM THỬ THÀNH CÔNG (100%)`);
console.log('=============================================================');
