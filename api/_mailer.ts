import nodemailer from 'nodemailer';

export interface LeadNotificationPayload {
  id: string;
  fullName: string;
  phone: string;
  email?: string | null;
  company?: string | null;
  projectName?: string | null;
  projectLocation?: string | null;
  productInterest?: string | null;
  fireRating?: string | null;
  source?: string | null;
  message?: string | null;
  createdAt?: string;
}

export interface MailSendResult {
  success: boolean;
  provider?: 'resend' | 'smtp' | 'formsubmit';
  messageId?: string;
  error?: string;
  recipients: string[];
  activationNeeded?: boolean;
}

const escapeHtml = (value: unknown): string =>
  String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch] as string));

export function getNotificationRecipients(): string[] {
  const envEmails = process.env.NOTIFICATION_EMAIL || '';
  const parsed = envEmails
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (parsed.length > 0) return parsed;
  return ['hung061195@gmail.com'];
}

export const formatVnTime = (isoString?: string): string => {
  try {
    const d = isoString ? new Date(isoString) : new Date();
    return d.toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/-/g, '/');
  } catch {
    return new Date().toISOString();
  }
};

export const formatShortTime = (isoString?: string): string => {
  try {
    const d = isoString ? new Date(isoString) : new Date();
    const time = d.toLocaleTimeString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
    });
    const date = d.toLocaleDateString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
    }).replace(/-/g, '/');
    return `${time} ${date}`;
  } catch {
    return '';
  }
};

export function buildLeadEmailHtml(lead: LeadNotificationPayload): { subject: string; html: string; text: string } {
  const name = String(lead.fullName || 'Khách hàng').trim();
  const phone = String(lead.phone || '').trim();
  const shortTime = formatShortTime(lead.createdAt);
  const timeStr = formatVnTime(lead.createdAt);
  const subject = shortTime
    ? `[APEX PCCC - ${shortTime}] Yêu cầu tư vấn mới: ${name} - ${phone}`
    : `[APEX PCCC] Yêu cầu tư vấn mới: ${name} - ${phone}`;

  const cleanEmail = lead.email ? String(lead.email).trim() : '';
  const company = lead.company ? String(lead.company).trim() : 'Chưa cung cấp';
  const projectName = lead.projectName ? String(lead.projectName).trim() : 'Chưa cung cấp';
  const projectLocation = lead.projectLocation ? String(lead.projectLocation).trim() : 'Chưa cung cấp';
  const productInterest = lead.productInterest ? String(lead.productInterest).trim() : 'Tư vấn chung';
  const fireRating = lead.fireRating ? String(lead.fireRating).trim() : 'Theo tiêu chuẩn PCCC';
  const source = lead.source ? String(lead.source).trim() : 'Website APEX VN';
  const message = lead.message ? String(lead.message).trim() : 'Không có ghi chú thêm';

  const html = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #991b1b 0%, #b91c1c 100%); padding: 24px 32px; text-align: left;">
              <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #fecaca; margin-bottom: 6px;">
                CÔNG TY TNHH APEX VN • THÔNG BÁO TỰ ĐỘNG
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; line-height: 1.3;">
                Có khách hàng cần tư vấn mới!
              </h1>
              <p style="margin: 6px 0 0 0; color: #fee2e2; font-size: 13px;">
                Tiếp nhận lúc ${escapeHtml(timeStr)} (Giờ Việt Nam)
              </p>
            </td>
          </tr>

          <!-- Quick Actions -->
          <tr>
            <td style="padding: 20px 32px 10px 32px; background-color: #fff7ed; border-bottom: 1px solid #ffedd5;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 6px 0;">
                    <a href="tel:${escapeHtml(phone)}" style="display: inline-block; background-color: #dc2626; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 14px; font-weight: 700; border-radius: 6px; margin-right: 12px; margin-bottom: 8px;">
                      📞 Bấm gọi ngay: ${escapeHtml(phone)}
                    </a>
                    <a href="https://apexhome.vn/admin" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 14px; font-weight: 600; border-radius: 6px; margin-bottom: 8px;">
                      📋 Mở trang quản trị Admin
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Details -->
          <tr>
            <td style="padding: 24px 32px;">
              <h2 style="font-size: 15px; font-weight: 700; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 16px 0; border-bottom: 2px solid #fee2e2; padding-bottom: 8px;">
                Chi tiết thông tin khách hàng
              </h2>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="font-size: 14px; border-collapse: collapse;">
                <tr style="border-bottom: 2px solid #fee2e2; background-color: #fef2f2;">
                  <td width="35%" style="color: #991b1b; font-weight: 700; padding: 10px 8px;">⏰ Thời gian tiếp nhận:</td>
                  <td width="65%" style="color: #991b1b; font-weight: 700; padding: 10px 8px;">${escapeHtml(timeStr)} (Giờ Việt Nam GMT+7)</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td width="35%" style="color: #64748b; font-weight: 600; padding: 10px 0;">Họ và tên:</td>
                  <td width="65%" style="color: #0f172a; font-weight: 700; padding: 10px 0;">${escapeHtml(name)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600; padding: 10px 0;">Số điện thoại:</td>
                  <td style="color: #dc2626; font-weight: 700; padding: 10px 0;">
                    <a href="tel:${escapeHtml(phone)}" style="color: #dc2626; text-decoration: underline;">${escapeHtml(phone)}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600; padding: 10px 0;">Email:</td>
                  <td style="color: #0f172a; padding: 10px 0;">
                    ${cleanEmail ? `<a href="mailto:${escapeHtml(cleanEmail)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(cleanEmail)}</a>` : '<em style="color: #94a3b8;">Chưa cung cấp</em>'}
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600; padding: 10px 0;">Công ty / Đơn vị:</td>
                  <td style="color: #0f172a; padding: 10px 0;">${escapeHtml(company)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600; padding: 10px 0;">Dự án / Công trình:</td>
                  <td style="color: #0f172a; padding: 10px 0;">${escapeHtml(projectName)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600; padding: 10px 0;">Địa điểm:</td>
                  <td style="color: #0f172a; padding: 10px 0;">${escapeHtml(projectLocation)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600; padding: 10px 0;">Sản phẩm quan tâm:</td>
                  <td style="color: #0f172a; font-weight: 600; padding: 10px 0;">${escapeHtml(productInterest)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600; padding: 10px 0;">Chỉ số chịu lửa:</td>
                  <td style="color: #0f172a; padding: 10px 0;">${escapeHtml(fireRating)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600; padding: 10px 0;">Nguồn gửi:</td>
                  <td style="color: #0f172a; padding: 10px 0;">${escapeHtml(source)}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; padding: 10px 0; vertical-align: top;">Nội dung yêu cầu:</td>
                  <td style="color: #0f172a; padding: 10px 0; background-color: #f8fafc; border-radius: 4px; padding: 10px 12px; white-space: pre-wrap;">${escapeHtml(message)}</td>
                </tr>
              </table>

              <div style="margin-top: 24px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #991b1b; font-size: 13px; color: #475569;">
                <strong>💡 Mục tiêu xử lý:</strong> Vui lòng liên hệ lại khách hàng trong vòng <strong>15 - 30 phút</strong> để nâng cao tỷ lệ chuyển đổi và uy tín thương hiệu APEX.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b;">
              <p style="margin: 0 0 6px 0;">
                Email này được tự động gửi từ hệ thống quản trị website APEX PCCC (<a href="https://apexhome.vn" style="color: #991b1b; text-decoration: none; font-weight: 600;">apexhome.vn</a>).
              </p>
              <p style="margin: 0;">
                Mã yêu cầu (Lead ID): <code style="font-family: monospace; background: #e2e8f0; padding: 2px 6px; border-radius: 3px;">${escapeHtml(lead.id)}</code>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
[APEX PCCC] CÓ YÊU CẦU TƯ VẤN MỚI
======================================
Thời gian tiếp nhận: ${timeStr} (Giờ Việt Nam GMT+7)
Mã yêu cầu: ${lead.id}

THÔNG TIN KHÁCH HÀNG:
- Họ và tên: ${name}
- Số điện thoại: ${phone}
- Email: ${cleanEmail || 'Chưa cung cấp'}
- Công ty: ${company}
- Dự án: ${projectName}
- Địa điểm: ${projectLocation}
- Sản phẩm quan tâm: ${productInterest}
- Chỉ số chịu lửa: ${fireRating}
- Nguồn tiếp nhận: ${source}
- Nội dung: ${message}

Link quản trị: https://apexhome.vn/admin
  `.trim();

  return { subject, html, text };
}

/**
 * Gửi email thông báo lead mới.
 * Tự động chọn kênh gửi:
 * 1. Resend API nếu có cấu hình RESEND_API_KEY
 * 2. SMTP (Gmail/Nodemailer) nếu có cấu hình SMTP_USER & SMTP_PASS (hoặc GMAIL_APP_PASS)
 * 3. FormSubmit REST API (tự động chuyển tiếp nếu chưa có SMTP_PASS)
 */
export async function sendLeadNotification(lead: LeadNotificationPayload): Promise<MailSendResult> {
  const recipients = getNotificationRecipients();
  const { subject, html, text } = buildLeadEmailHtml(lead);

  // 1. Thử qua Resend nếu có cấu hình API Key
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const from = process.env.RESEND_FROM || 'APEX Website <onboarding@resend.dev>';
      const payload: any = {
        from,
        to: recipients,
        subject,
        html,
        text,
      };

      if (lead.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim())) {
        payload.reply_to = lead.email.trim();
      }

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const bodyText = await res.text().catch(() => '');
      if (res.ok) {
        let parsed: any = {};
        try { parsed = JSON.parse(bodyText); } catch {}
        return {
          success: true,
          provider: 'resend',
          messageId: parsed.id,
          recipients,
        };
      } else {
        console.error('Resend API trả về lỗi:', res.status, bodyText);
      }
    } catch (err: any) {
      console.error('Lỗi khi gửi email qua Resend:', err);
    }
  }

  // 2. Thử qua SMTP (Gmail / Custom SMTP) nếu có cấu hình
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (smtpUser && smtpPass && smtpPass.trim().length > 0) {
    try {
      const host = process.env.SMTP_HOST || (smtpUser.includes('@gmail.com') ? 'smtp.gmail.com' : 'smtp.gmail.com');
      const port = Number(process.env.SMTP_PORT) || 465;
      const secure = process.env.SMTP_SECURE === 'true' || port === 465;

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const fromAddress = process.env.SMTP_FROM || `APEX PCCC <${smtpUser}>`;

      const info = await transporter.sendMail({
        from: fromAddress,
        to: recipients,
        replyTo: lead.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim()) ? lead.email.trim() : undefined,
        subject,
        text,
        html,
      });

      return {
        success: true,
        provider: 'smtp',
        messageId: info.messageId,
        recipients,
      };
    } catch (smtpErr: any) {
      console.error('Lỗi khi gửi email qua SMTP:', smtpErr);
    }
  }

  // 3. Dự phòng gửi tự động qua FormSubmit REST API
  try {
    const vnTimeStr = formatVnTime(lead.createdAt);
    for (const recipient of recipients) {
      const formPayload: Record<string, any> = {
        _subject: subject,
        '⏰ Thời gian tiếp nhận (Giờ Việt Nam)': `${vnTimeStr} (GMT+7)`,
        'Họ và tên': lead.fullName,
        'Số điện thoại': lead.phone,
        'Email': lead.email || 'Chưa cung cấp',
        'Công ty': lead.company || 'Chưa cung cấp',
        'Dự án': lead.projectName || 'Chưa cung cấp',
        'Địa điểm': lead.projectLocation || 'Chưa cung cấp',
        'Sản phẩm quan tâm': lead.productInterest || 'Tư vấn chung',
        'Chỉ số chịu lửa': lead.fireRating || 'Theo tiêu chuẩn PCCC',
        'Nội dung yêu cầu': lead.message || 'Không có ghi chú thêm',
        'Nguồn gửi': lead.source || 'Website APEX VN',
        'Mã yêu cầu (Lead ID)': lead.id,
        'Link quản trị': 'https://apexhome.vn/admin',
        _captcha: 'false',
      };
      if (lead.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim())) {
        formPayload._replyto = lead.email.trim();
      }

      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://apexhome.vn',
          'Referer': 'https://apexhome.vn/',
        },
        body: JSON.stringify(formPayload),
      });

      const data = await res.json().catch(() => ({}));
      if (data.success === 'true' || data.success === true) {
        return {
          success: true,
          provider: 'formsubmit',
          messageId: `formsubmit-${Date.now()}`,
          recipients,
        };
      } else if (data.message && data.message.includes('Activation')) {
        return {
          success: true,
          provider: 'formsubmit',
          messageId: 'activation-sent',
          recipients,
          activationNeeded: true,
        };
      }
    }
  } catch (formSubmitErr: any) {
    console.error('Lỗi khi gửi email qua FormSubmit:', formSubmitErr);
  }

  return {
    success: false,
    error: 'Không thể gửi email qua các kênh đã cấu hình.',
    recipients,
  };
}
