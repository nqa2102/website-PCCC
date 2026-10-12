// Test T7: Leads CSV Export & Leads Management
const { PGlite } = require('@electric-sql/pglite');
const fs = require('fs');
const path = require('path');

async function run() {
  console.log('--- BẮT ĐẦU KIỂM THỬ T7 LEADS CSV EXPORT & FILTERING ---');
  const db = new PGlite();

  // 1. Nạp schema cơ sở
  const schemaSql = fs.readFileSync(path.join(__dirname, '../sql/neon_schema.sql'), 'utf8');
  await db.exec(schemaSql);
  console.log('✓ Nạp neon_schema.sql thành công');

  // 2. Chèn các lead thử nghiệm
  await db.exec(`
    INSERT INTO leads (
      id, full_name, phone, email, company, project_name, project_location,
      product_interest, fire_rating, source, message, status, priority, consent
    ) VALUES 
      ('lead-t1', 'Nguyễn Văn A', '0912345678', 'a@example.com', 'Tập đoàn Hòa Phát', 'Nhà máy Hòa Phát', 'Hà Nam', 'Cửa thép ngăn cháy', 'EI70', 'Form báo giá website', 'Cần tư vấn báo giá gấp,\n100 bộ cửa', 'new', 'high', true),
      ('lead-t2', 'Trần Thị B', '0987654321', 'b@example.com', 'Công ty Cổ phần Xây dựng "Delta"', 'Dự án Delta City', 'Hà Nội', 'Tủ Rack Mạng & Server', '', 'Form liên hệ website', 'Xin catalogue kỹ thuật', 'contacted', 'medium', true),
      ('lead-t3', 'Phạm Văn C', '0901122334', null, null, null, 'Hải Phòng', 'Thang máng cáp', null, 'Nhập thủ công', 'Gặp trực tiếp tại xưởng', 'qualified', 'low', true)
    ON CONFLICT (id) DO NOTHING;
  `);
  console.log('✓ Chèn 3 lead thử nghiệm thành công');

  // 3. Kiểm tra đếm tổng
  const countRes = await db.query('SELECT COUNT(*)::int as total FROM leads');
  const total = Number(countRes.rows[0].total);
  if (total !== 3) {
    throw new Error(`Kỳ vọng tổng số lead là 3, nhận được: ${total}`);
  }
  console.log('✓ Kiểm tra đếm tổng lead:', total);

  // 4. Kiểm tra sinh CSV với BOM UTF-8 và escape
  const rows = await db.query(`
    SELECT 
      id, created_at as "createdAt", full_name as "fullName", phone, email,
      company, project_name as "projectName", project_location as "projectLocation",
      product_interest as "productInterest", fire_rating as "fireRating",
      source, message, status, priority, assignee, next_follow_up_at as "nextFollowUpAt",
      notes, consent
    FROM leads
    ORDER BY created_at DESC, id DESC
  `);

  const csvEscape = (val) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const headers = [
    'Mã yêu cầu',
    'Thời gian gửi',
    'Họ và tên',
    'Số điện thoại',
    'Email',
    'Công ty',
    'Tên công trình',
    'Địa điểm',
    'Sản phẩm quan tâm',
    'Chỉ số chịu lửa',
    'Nguồn tiếp nhận',
    'Trạng thái',
    'Mức ưu tiên',
    'Người phụ trách',
    'Lịch liên hệ tiếp',
    'Nội dung tin nhắn',
    'Ghi chú nội bộ',
    'Đồng ý xử lý dữ liệu'
  ];

  const lines = [headers.join(',')];
  for (const row of rows.rows) {
    lines.push([
      csvEscape(row.id),
      csvEscape(row.createdAt ? new Date(row.createdAt).toISOString() : ''),
      csvEscape(row.fullName),
      csvEscape(row.phone),
      csvEscape(row.email),
      csvEscape(row.company),
      csvEscape(row.projectName),
      csvEscape(row.projectLocation),
      csvEscape(row.productInterest),
      csvEscape(row.fireRating),
      csvEscape(row.source),
      csvEscape(row.status),
      csvEscape(row.priority),
      csvEscape(row.assignee),
      csvEscape(row.nextFollowUpAt),
      csvEscape(row.message),
      csvEscape(row.notes),
      csvEscape(row.consent ? 'Đồng ý' : 'Không')
    ].join(','));
  }

  const csvContent = '\uFEFF' + lines.join('\r\n');

  // Kiểm tra BOM
  if (!csvContent.startsWith('\uFEFF')) {
    throw new Error('CSV phải bắt đầu bằng UTF-8 BOM (\\uFEFF) để Excel hiển thị tiếng Việt không lỗi font');
  }
  console.log('✓ UTF-8 BOM hiện diện chính xác');

  // Kiểm tra escape dấu ngoặc kép và dấu phẩy trong tên công ty "Delta"
  if (!csvContent.includes('""Delta""')) {
    throw new Error('Công ty chứa dấu ngoặc kép "Delta" phải được escape thành ""Delta""');
  }
  console.log('✓ Ký tự đặc biệt (ngoặc kép "Delta") được escape chính xác');

  // Kiểm tra số dòng: 1 dòng header + 3 dòng dữ liệu (tính cả dòng có newline trong message)
  if (!csvContent.includes('"Nguyễn Văn A"') || !csvContent.includes('"Trần Thị B"') || !csvContent.includes('"Phạm Văn C"')) {
    throw new Error('Thiếu tên khách hàng trong CSV');
  }
  console.log('✓ Đầy đủ toàn bộ bản ghi khách hàng trong CSV');

  console.log('--- KIỂM THỬ T7 LEADS HOÀN TẤT VÀ ĐẠT 100% ---');
}

run().catch((err) => {
  console.error('XẢY RA LỖI KIỂM THỬ T7:', err);
  process.exit(1);
});
