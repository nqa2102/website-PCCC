import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Đọc .env.local và nạp vào process.env nếu có
const envLocalPath = path.join(rootDir, '.env.local');
if (fs.existsSync(envLocalPath)) {
  const lines = fs.readFileSync(envLocalPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

// Import mailer từ thư mục api (hỗ trợ cả file .ts lẫn .js khi build)
let mailer;
try {
  mailer = await import('../api/_mailer.ts');
} catch {
  mailer = await import('../api/_mailer.js');
}
const { sendLeadNotification, getNotificationRecipients, buildLeadEmailHtml } = mailer;

console.log('=============================================================');
console.log('KIỂM THỬ TỰ ĐỘNG BẮN EMAIL BÁO LEAD CHO ADMIN');
console.log('=============================================================');

const recipients = getNotificationRecipients();
console.log(`[CẤU HÌNH] Danh sách email nhận thông báo: ${recipients.join(', ')}`);
console.log(`[CẤU HÌNH] Kênh Resend: ${process.env.RESEND_API_KEY ? 'ĐÃ CẤU HÌNH (' + process.env.RESEND_API_KEY.slice(0, 7) + '...)' : 'CHƯA CẤU HÌNH'}`);
console.log(`[CẤU HÌNH] Kênh Gmail/SMTP: ${process.env.SMTP_USER || process.env.GMAIL_USER ? 'ĐÃ CẤU HÌNH (' + (process.env.SMTP_USER || process.env.GMAIL_USER) + ')' : 'CHƯA CẤU HÌNH'}`);

const mockLead = {
  id: `test-lead-${Date.now()}`,
  fullName: 'Nguyễn Hoàng Hùng (Kiểm thử hệ thống)',
  phone: '0912 345 678',
  email: 'hung061195@gmail.com',
  company: 'Công ty Cổ phần Thử Nghiệm PCCC',
  projectName: 'Công trình Nhà máy Kỹ thuật APEX',
  projectLocation: 'Khu công nghệ cao Láng - Hòa Lạc, Hà Nội',
  productInterest: 'Cửa thép ngăn cháy EI70 (1 cánh)',
  fireRating: 'EI 70 phút',
  source: 'Kiểm thử tính năng gửi mail tự động',
  message: 'Chào Admin, đây là email kiểm thử tự động được kích hoạt khi có khách hàng cần tư vấn gửi form trên website APEX PCCC (apexhome.vn). Hệ thống thông báo tự động đã sẵn sàng!',
  createdAt: new Date().toISOString(),
};

// 1. Kiểm tra HTML build
const { subject, html } = buildLeadEmailHtml(mockLead);
if (!html.includes('0912 345 678') || !html.includes('hung061195@gmail.com') || !subject.includes('Nguyễn Hoàng Hùng')) {
  console.error('❌ Lỗi tạo nội dung email kiểm thử!');
  process.exit(1);
}
console.log(`[OK] Tiêu đề email: "${subject}"`);
console.log(`[OK] Nội dung HTML được tạo thành công (${html.length} bytes).`);

// 2. Thử gửi mail
console.log('\n--- ĐANG TIẾN HÀNH BẮN EMAIL KIỂM THỬ ---');
const result = await sendLeadNotification(mockLead);

if (result.success) {
  console.log('🎉 THÀNH CÔNG! Email đã được bắn thực tế tới:');
  console.log(`   - Người nhận: ${result.recipients.join(', ')}`);
  console.log(`   - Kênh chuyển phát: ${result.provider?.toUpperCase()}`);
  console.log(`   - Message ID: ${result.messageId}`);
  console.log('\nQuý khách vui lòng mở hòm thư hung061195@gmail.com để kiểm tra hộp thư đến (Inbox / Spam).');
} else {
  console.warn('⚠️ CHƯA THỂ BẮN MAIL THẬT:');
  console.warn(`   Lý do: ${result.error}`);
  console.log('\n👉 HƯỚNG DẪN CẤU HÌNH ĐỂ BẮN MAIL THẬT ĐẾN hung061195@gmail.com:');
  console.log('1. Cách 1 - Dùng Gmail (Khuyên dùng, 1 phút là xong):');
  console.log('   - Vào https://myaccount.google.com/apppasswords');
  console.log('   - Tạo Mật khẩu ứng dụng 16 chữ cái cho Gmail hung061195@gmail.com');
  console.log('   - Thêm vào file .env.local:');
  console.log('       SMTP_USER="hung061195@gmail.com"');
  console.log('       SMTP_PASS="xxxx xxxx xxxx xxxx"');
  console.log('2. Cách 2 - Dùng Resend (resend.com):');
  console.log('   - Đăng nhập resend.com bằng email hung061195@gmail.com');
  console.log('   - Lấy API Key (bắt đầu bằng re_...)');
  console.log('   - Thêm vào file .env.local:');
  console.log('       RESEND_API_KEY="re_..."');
}
console.log('=============================================================\n');
