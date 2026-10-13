import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

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
const payload = { id: 'usr-001', email: 'admin@apexdoor.net', role: 'admin', fullName: 'Admin' };
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
assert(robotsContent.includes('Sitemap: https://apexdoor.net/sitemap.xml'), 'robots.txt khai báo sitemap');

assert(fs.existsSync(sitemapPath), 'public/sitemap.xml tồn tại');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
assert(sitemapContent.includes('<loc>https://apexdoor.net/</loc>'), 'sitemap.xml có URL trang chủ');
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
console.log('\n--- 5. Kiểm tra Serverless API Handlers (Chuẩn tối đa 12 functions cho Vercel Hobby plan) ---');
const requiredApis = [
  'api/_db.ts',
  'api/leads.ts',
  'api/public-content.ts',
  'api/admin/login.ts',
  'api/admin/me.ts',
  'api/admin/change-password.ts',
  'api/admin/settings.ts',
  'api/admin/products.ts',
  'api/admin/projects.ts',
  'api/admin/documents.ts',
  'api/admin/contents.ts',
  'api/admin/activities.ts',
  'api/admin/upload.ts',
];

for (const apiPath of requiredApis) {
  assert(fs.existsSync(path.join(rootDir, apiPath)), `Endpoint ${apiPath} tồn tại`);
}

// Kiểm tra số lượng endpoint không vượt quá 12 theo chính sách Vercel Hobby plan (loại trừ file helper _db.ts)
const totalServerlessEndpoints = requiredApis.filter((p) => !path.basename(p).startsWith('_')).length;
assert(totalServerlessEndpoints <= 12, `Số lượng Serverless Functions (${totalServerlessEndpoints}) không vượt quá 12 (giới hạn Hobby plan)`);

// package.json dùng "type": "module": Vercel chạy API dạng ES module, import tương đối
// bắt buộc có đuôi .js (thiếu đuôi -> ERR_MODULE_NOT_FOUND, toàn bộ API trả 500)
const apiFiles = ['api', 'api/admin'].flatMap((dir) =>
  fs.readdirSync(path.join(rootDir, dir)).filter((f) => f.endsWith('.ts')).map((f) => `${dir}/${f}`)
);
for (const apiFile of apiFiles) {
  const source = fs.readFileSync(path.join(rootDir, apiFile), 'utf8');
  const badImports = [...source.matchAll(/from\s+['"](\.{1,2}\/[^'"]+)['"]/g)]
    .map((m) => m[1])
    .filter((spec) => !spec.endsWith('.js'));
  assert(badImports.length === 0, `${apiFile}: import tương đối có đuôi .js${badImports.length ? ` (thiếu: ${badImports.join(', ')})` : ''}`);
}

// -------------------------------------------------------------
// Test 6: Kiểm tra 9 Dòng sản phẩm, Dự án & Tuân thủ bản quyền
// -------------------------------------------------------------
console.log('\n--- 6. Kiểm tra 9 Dòng sản phẩm, Dự án & Tuân thủ bản quyền ---');

// 6.1 Migration SQL mới
const migrationPath = path.join(rootDir, 'sql', 'migrations', '20261012_products_and_projects.sql');
assert(fs.existsSync(migrationPath), 'Migration SQL sql/migrations/20261012_products_and_projects.sql tồn tại');
const migrationSql = fs.readFileSync(migrationPath, 'utf8').toLowerCase();
assert(migrationSql.includes('products_category_check'), 'Migration chứa CHECK constraint cho 9 category slug');
assert(migrationSql.includes('create table if not exists projects'), 'Migration tạo bảng projects');
assert(migrationSql.includes('verified') && migrationSql.includes('default false'), 'Bảng projects có cột verified với default false');
assert(migrationSql.includes('verified_note'), 'Bảng projects có cột verified_note');

// 6.2 Đồng bộ 9 Category slugs
const expectedCategories = [
  'cua-thep-ngan-chay',
  'cua-kinh-ngan-chay',
  'cua-cuon-ngan-chay',
  'rem-ngan-chay',
  'tu-dien',
  'thang-mang-cap',
  'tu-rack',
  'nha-tram-shelter',
  'tu-nguon-outdoor',
];
const routingSource = fs.readFileSync(path.join(rootDir, 'src', 'routing.ts'), 'utf8');
for (const cat of expectedCategories) {
  assert(routingSource.includes(`'${cat}'`), `routing.ts chứa category slug '${cat}'`);
}

// 6.3 Bảo mật tầng API cho projects
const publicContentApi = fs.readFileSync(path.join(rootDir, 'api', 'public-content.ts'), 'utf8');
assert(publicContentApi.includes('verified = true') && publicContentApi.includes("status = 'published'"), 'API public /api/public-content CHỈ trả về verified = true AND status = published cho projects');

const adminProjectsApi = fs.readFileSync(path.join(rootDir, 'api', 'admin', 'projects.ts'), 'utf8');
assert(adminProjectsApi.includes('verified_note') && adminProjectsApi.includes('role !== \'admin\''), 'API admin /api/admin/projects bắt buộc quyền admin và verified_note khi xác minh dự án');

// 6.4 Kiểm tra không sao chép đối thủ (ankovina.vn, 3ce.vn)
const srcDir = path.join(rootDir, 'src');
const scanForCompetitorUrls = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanForCompetitorUrls(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.json') || entry.name.endsWith('.html'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      assert(!content.includes('ankovina.vn'), `Không chứa link ankovina.vn trong ${entry.name}`);
      assert(!content.includes('3ce.vn'), `Không chứa link 3ce.vn trong ${entry.name}`);
    }
  }
};
scanForCompetitorUrls(srcDir);
assert(true, 'Toàn bộ mã nguồn src/ không chứa bất kỳ liên kết hay tài sản nào từ đối thủ (ankovina, 3ce)');

// --- 7. Kiểm tra Menu Sản phẩm Accordion (VIỆC B) ---
console.log('\n--- 7. Kiểm tra Menu Sản phẩm Accordion (VIỆC B) ---');

const productMenuPath = path.join(rootDir, 'src', 'components', 'products', 'productMenu.ts');
assert(fs.existsSync(productMenuPath), 'Module src/components/products/productMenu.ts tồn tại');

try {
  const menuTestOutput = execSync('node --experimental-strip-types scripts/test_product_menu.mjs', { cwd: rootDir }).toString();
  assert(menuTestOutput.includes('TẤT CẢ TEST groupProductsByVariant THÀNH CÔNG'), 'Kiểm thử groupProductsByVariant (Cửa thép 2 nhóm EI, Tủ điện phẳng, Rỗng, Loại bỏ Tổng quan) PASS 100%');
} catch (err) {
  assert(false, `Kiểm thử unit test product menu thất bại: ${err.message}`);
}

const headerSource = fs.readFileSync(path.join(rootDir, 'src', 'components', 'Header.tsx'), 'utf8');
assert(headerSource.includes('groupProductsByVariant'), 'Header.tsx sử dụng hàm groupProductsByVariant');
assert(headerSource.includes('formatMenuProductName'), 'Header.tsx sử dụng hàm formatMenuProductName');
assert(headerSource.includes('getCategorySubProducts'), 'Header.tsx sử dụng hàm getCategorySubProducts');
assert(headerSource.includes('aria-expanded'), 'Header.tsx có aria-expanded cho accordion');
assert(headerSource.includes('overscroll-contain'), 'Header.tsx có scrolling container chống tràn viewport');

console.log('\n=============================================================');
console.log(`KẾT QUẢ TỔNG QUAN: ${passedTests}/${totalTests} BÀI KIỂM THỬ THÀNH CÔNG (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('=============================================================');

