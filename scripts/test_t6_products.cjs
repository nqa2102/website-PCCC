// Test PGlite idempotency for 20261012_product_features_and_long_desc.sql and Products API
const { PGlite } = require('@electric-sql/pglite');
const fs = require('fs');
const path = require('path');

async function run() {
  console.log('--- BẮT ĐẦU KIỂM THỬ T6 PGLITE & PRODUCT FEATURES/SPECS ---');
  const db = new PGlite();

  // 1. Chạy schema cơ sở
  const schemaSql = fs.readFileSync(path.join(__dirname, '../sql/neon_schema.sql'), 'utf8');
  await db.exec(schemaSql);
  console.log('✓ Nạp neon_schema.sql thành công');

  // 2. Chạy migration 20261012_product_features_and_long_desc.sql LẦN 1
  const migrationSql = fs.readFileSync(
    path.join(__dirname, '../sql/migrations/20261012_product_features_and_long_desc.sql'),
    'utf8'
  );
  await db.exec(migrationSql);
  console.log('✓ Chạy 20261012_product_features_and_long_desc.sql lần 1 thành công');

  // 3. Chạy migration LẦN 2 (kiểm tra Idempotency)
  await db.exec(migrationSql);
  console.log('✓ Chạy migration lần 2 thành công (Idempotency PASS)');

  // 4. Test lưu và đọc thông số specs, tính năng features, mô tả chi tiết long_description
  const sampleFeatures = [
    'Khả năng ngăn khói và chống cháy liên tục đạt EI70 theo TCVN 9383:2012',
    'Khung bao thép mạ kẽm dày 1.4mm định hình vững chắc',
    'Lõi Magie Oxide cách nhiệt chống truyền nhiệt cao cấp',
    'Gioăng ngăn khói tự giãn nở khi nhiệt độ vượt 150°C'
  ];

  const sampleSpecs = {
    material: 'Thép mạ kẽm điện phân dày 1.2mm - 1.4mm',
    thickness: 'Cánh dày 50mm, khung bao 100mm',
    insulation: 'Lõi bông gốm Ceramic kết hợp Magie Oxide',
    standard: 'TCVN 9383:2012 / QCVN 06:2022/BXD',
    finish: 'Sơn tĩnh điện kháng trầy xước công nghiệp'
  };

  const sampleLongDesc = 'Cửa thép ngăn cháy APEX EI70 được thiết kế và sản xuất đồng bộ phục vụ các công trình chung cư cao tầng, bệnh viện, nhà máy sản xuất và trung tâm thương mại...';

  await db.exec(`
    INSERT INTO products (
      id, name, slug, category, category_name, fire_rating, certification_no,
      short_description, material, standard, warranty, specs, features, long_description,
      featured, status, sort_order, seo_title, seo_description, image_alt, image,
      price_estimate, updated_at
    ) VALUES (
      'p-test-ei70',
      'Cửa thép ngăn cháy APEX EI70 Đặc Biệt',
      'cua-thep-ngan-chay-apex-ei70-dac-biet',
      'cua-thep-ngan-chay',
      'Cửa thép ngăn cháy',
      'EI70',
      '1803/KD-PCCC-P7',
      'Mô tả ngắn hiển thị tại thẻ danh mục',
      'Thép mạ kẽm',
      'TCVN 9383:2012',
      '24 tháng',
      '${JSON.stringify(sampleSpecs)}'::jsonb,
      '${JSON.stringify(sampleFeatures)}'::jsonb,
      '${sampleLongDesc}',
      true,
      'published',
      1,
      'Cửa thép ngăn cháy APEX EI70 | APEX Việt Nam',
      'Cung cấp cửa thép ngăn cháy EI70 chính hãng',
      'Cửa thép EI70',
      '/test-ei70.jpg',
      'Từ 2.100.000 đ/m²',
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      specs = EXCLUDED.specs,
      features = EXCLUDED.features,
      long_description = EXCLUDED.long_description;
  `);
  console.log('✓ Chèn sản phẩm có đầy đủ specs, features, long_description thành công');

  // 5. Query kiểm tra
  const queryRes = await db.query(`
    SELECT id, name, fire_rating, specs, features, long_description, status
    FROM products
    WHERE id = 'p-test-ei70'
  `);

  if (queryRes.rows.length !== 1) {
    throw new Error('Không tìm thấy sản phẩm vừa chèn');
  }

  const row = queryRes.rows[0];
  console.log('Sản phẩm đã đọc từ database:');
  console.log('- ID:', row.id);
  console.log('- Tên:', row.name);
  console.log('- Cấp chịu lửa:', row.fire_rating);
  console.log('- Specs count:', Object.keys(row.specs).length);
  console.log('- Features count:', row.features.length);
  console.log('- Long description length:', row.long_description.length);

  if (row.features.length !== 4) {
    throw new Error(`Kỳ vọng 4 features, nhận: ${row.features.length}`);
  }
  if (row.specs.material !== sampleSpecs.material) {
    throw new Error(`Kỳ vọng specs.material đúng giá trị`);
  }
  if (!row.long_description.startsWith('Cửa thép ngăn cháy APEX EI70')) {
    throw new Error(`Kỳ vọng long_description khớp`);
  }

  // 6. Test Upsert cập nhật thông số và tính năng mới
  const updatedSpecs = {
    ...sampleSpecs,
    finish: 'Sơn tĩnh điện kháng tia UV'
  };
  const updatedFeatures = [...sampleFeatures, 'Khóa tay gạt Hafele đồng bộ'];

  await db.exec(`
    UPDATE products
    SET 
      specs = '${JSON.stringify(updatedSpecs)}'::jsonb,
      features = '${JSON.stringify(updatedFeatures)}'::jsonb,
      updated_at = NOW()
    WHERE id = 'p-test-ei70';
  `);

  const updatedRes = await db.query(`
    SELECT specs, features FROM products WHERE id = 'p-test-ei70'
  `);
  const updatedRow = updatedRes.rows[0];
  if (updatedRow.features.length !== 5) {
    throw new Error(`Kỳ vọng 5 features sau cập nhật, nhận: ${updatedRow.features.length}`);
  }
  if (updatedRow.specs.finish !== 'Sơn tĩnh điện kháng tia UV') {
    throw new Error(`Kỳ vọng specs.finish cập nhật thành công`);
  }
  console.log('✓ Cập nhật sản phẩm với specs và features mới thành công');

  console.log('--- KIỂM THỬ T6 PGLITE HOÀN TẤT VÀ ĐẠT 100% ---');
}

run().catch((err) => {
  console.error('XẢY RA LỖI KIỂM THỬ T6:', err);
  process.exit(1);
});
