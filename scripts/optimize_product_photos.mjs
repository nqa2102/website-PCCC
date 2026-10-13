import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const sourceDirArg = process.argv[2] || 'D:/ELMICH/Apex-pccc/ảnh';
const sourceDir = path.resolve(sourceDirArg);

if (!fs.existsSync(sourceDir)) {
  console.error(`[LỖI] Không tìm thấy thư mục nguồn ảnh: ${sourceDir}`);
  process.exit(1);
}

const mapPath = path.join(projectRoot, 'scripts', 'product-photo-map.json');
if (!fs.existsSync(mapPath)) {
  console.error(`[LỖI] Không tìm thấy file cấu hình mapping: ${mapPath}`);
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
const outputDir = path.join(projectRoot, 'src', 'assets', 'images', 'products');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Lấy danh sách file trong thư mục nguồn
const sourceFiles = fs.readdirSync(sourceDir);

const MAX_COVER_BYTES = 200 * 1024; // 200 KB
const MAX_GALLERY_BYTES = 300 * 1024; // 300 KB

async function run() {
  console.log(`=== BẮT ĐẦU XỬ LÝ ẢNH SẢN PHẨM APEX ===`);
  console.log(`Thư mục nguồn: ${sourceDir}`);
  console.log(`Thư mục đích:  ${outputDir}`);
  console.log(`Tổng số mục tiêu mapping: ${mapping.length}\n`);

  const results = [];
  let hasError = false;

  for (const item of mapping) {
    const { source, product, role, index, fit = 'cover', position = 'center', background = '#f1f5f9', crop } = item;
    
    // Tìm file tương ứng trong sourceDir theo tiền tố source (13 ký tự đầu)
    const matchingFile = sourceFiles.find((f) => f.startsWith(source));
    if (!matchingFile) {
      console.error(`[LỖI] Không tìm thấy file bắt đầu bằng "${source}" trong ${sourceDir}`);
      hasError = true;
      continue;
    }

    const inputPath = path.join(sourceDir, matchingFile);
    const outputFilename = role === 'cover' ? `${product}-cover.webp` : `${product}-${index}.webp`;
    const outputPath = path.join(outputDir, outputFilename);

    let pipeline = sharp(inputPath).rotate(); // Tự động xoay theo EXIF trước

    if (crop) {
      pipeline = pipeline.extract(crop);
    }

    if (role === 'cover') {
      // Ảnh chính: tỉ lệ 4:5, 1200x1500
      pipeline = pipeline.resize(1200, 1500, {
        fit: fit,
        position: position,
        background: background,
      });
    } else {
      // Ảnh phụ: cạnh dài tối đa 1600px, giữ tỉ lệ
      pipeline = pipeline.resize({
        width: 1600,
        height: 1600,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Không gọi .withMetadata() => xóa bỏ toàn bộ EXIF/GPS
    pipeline = pipeline.webp({ quality: 78 });

    await pipeline.toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    const maxLimit = role === 'cover' ? MAX_COVER_BYTES : MAX_GALLERY_BYTES;
    const isExceeded = stats.size > maxLimit;

    if (isExceeded) {
      hasError = true;
    }

    results.push({
      file: outputFilename,
      product: product,
      role: role,
      sizeKB: `${sizeKB} KB`,
      status: isExceeded ? 'VƯỢT QUÁ GIỚI HẠN' : 'HỢP LỆ',
    });
  }

  console.log('--- BẢNG TỔNG HỢP KÍCH THƯỚC FILE WEBP ---');
  console.table(results);

  if (hasError) {
    console.error('\n[LỖI NGHIỆM THU] Có file bị thiếu hoặc vượt quá dung lượng cho phép (Cover <= 200KB, Gallery <= 300KB)!');
    process.exit(1);
  }

  console.log('\n[THÀNH CÔNG] Toàn bộ ảnh đã được tối ưu đạt chuẩn WebP, sạch EXIF, đúng kích thước và dung lượng!');
}

run().catch((err) => {
  console.error('[LỖI THỰC THI]', err);
  process.exit(1);
});
