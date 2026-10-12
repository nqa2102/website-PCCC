// Test PGlite idempotency for 20261012_move_projects.sql and API constraints
const { PGlite } = require('@electric-sql/pglite');
const fs = require('fs');
const path = require('path');

async function run() {
  console.log('--- BẮT ĐẦU KIỂM THỬ T5 PGLITE & API ---');
  const db = new PGlite();

  // 1. Chạy schema gốc
  const schemaSql = fs.readFileSync(path.join(__dirname, '../sql/neon_schema.sql'), 'utf8');
  await db.exec(schemaSql);
  console.log('✓ Nạp neon_schema.sql thành công');

  // 2. Chèn dữ liệu mẫu vào contents (type = project)
  await db.exec(`
    INSERT INTO contents (id, type, title, summary, status, location, client, year, image)
    VALUES 
      ('proj-c1', 'project', 'Dự án Căn hộ Sun Grand', 'Cung cấp 120 bộ cửa thép EI70', 'published', 'Hà Nội', 'Sun Group', '2024', '/img1.jpg'),
      ('proj-c2', 'project', 'Nhà máy Foxconn Bắc Ninh', 'Hệ thống cửa cuốn & rèm ngăn cháy', 'draft', 'Bắc Ninh', 'Foxconn', '2023', '/img2.jpg')
    ON CONFLICT (id) DO NOTHING;
  `);
  console.log('✓ Chèn dữ liệu thử nghiệm vào contents thành công');

  // 3. Chạy migration 20261012_move_projects.sql LẦN 1
  const moveSql = fs.readFileSync(path.join(__dirname, '../sql/migrations/20261012_move_projects.sql'), 'utf8');
  await db.exec(moveSql);
  console.log('✓ Chạy 20261012_move_projects.sql lần 1 thành công');

  // 4. Chạy migration 20261012_move_projects.sql LẦN 2 (kiểm tra Idempotency)
  await db.exec(moveSql);
  console.log('✓ Chạy 20261012_move_projects.sql lần 2 thành công (Idempotency PASS)');

  // 5. Kiểm tra dữ liệu trong bảng projects
  const res = await db.query('SELECT id, title, slug, status, verified, verified_note FROM projects ORDER BY id');
  console.log('Dữ liệu bảng projects sau migration:');
  console.table(res.rows);

  if (res.rows.length !== 2) {
    throw new Error(`Kỳ vọng 2 bản ghi trong projects, nhận được ${res.rows.length}`);
  }

  // proj-c1 từng published thì phải chuyển sang status = 'review', verified = false
  const p1 = res.rows.find(r => r.id === 'proj-c1');
  if (p1.status !== 'review' || p1.verified !== false) {
    throw new Error(`Bản ghi proj-c1 phải có status = review và verified = false để buộc xác minh lại. Nhận: ${JSON.stringify(p1)}`);
  }

  // 6. Kiểm tra bảng contents không bị xóa
  const contentCount = await db.query("SELECT COUNT(*) as count FROM contents WHERE type = 'project'");
  if (Number(contentCount.rows[0].count) !== 2) {
    throw new Error('Dữ liệu trong contents không được bị xóa!');
  }
  console.log('✓ Bảng contents vẫn giữ nguyên vẹn 2 bản ghi');

  console.log('--- KIỂM THỬ T5 PGLITE HOÀN TẤT VÀ ĐẠT 100% ---');
}

run().catch((err) => {
  console.error('XẢY RA LỖI KIỂM THỬ:', err);
  process.exit(1);
});
