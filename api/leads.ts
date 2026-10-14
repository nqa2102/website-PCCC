import crypto from 'crypto';
import { getDb, requireAdminRole, ROLE_ACCESS } from './_db.js';

const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'closed', 'lost'];
const LEAD_PRIORITIES = ['high', 'medium', 'low'];

// Chống gửi hàng loạt (bot / spam từ quảng cáo)
const RATE_WINDOW_MINUTES = 10;
const MAX_LEADS_PER_IP = 5;
const MAX_LEADS_PER_PHONE = 3;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Cắt chuỗi theo độ dài cột Neon để lệnh INSERT không lỗi (mất lead) khi khách nhập quá dài
const clip = (value: unknown, max: number): string | null => {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text ? text.slice(0, max) : null;
};

// Không lưu IP thô (dữ liệu cá nhân): chỉ lưu mã băm có khóa bí mật của hệ thống
const hashIp = (req: any) => {
  const forwarded = req.headers?.['x-forwarded-for'];
  const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') || req.socket?.remoteAddress || 'unknown';
  return crypto.createHmac('sha256', process.env.ADMIN_SESSION_SECRET || 'apex-lead-rate').update(ip).digest('hex').slice(0, 32);
};

// Dữ liệu khách nhập được chèn vào email HTML: phải escape để tránh chèn mã/link giả mạo
const escapeHtml = (value: unknown) =>
  String(value ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch] as string));

export default async function handler(req: any, res: any) {
  // GET: Admin lấy danh sách leads
  if (req.method === 'GET') {
    const user = await requireAdminRole(req, res, ROLE_ACCESS.leads);
    if (!user) return;

    // Xuất toàn bộ danh sách leads dưới dạng CSV (BOM UTF-8, escape quote)
    if (req.query?.format === 'csv') {
      try {
        const sql = getDb();
        const allRows = await sql`
          SELECT 
            id,
            created_at as "createdAt",
            full_name as "fullName",
            phone,
            email,
            company,
            project_name as "projectName",
            project_location as "projectLocation",
            product_interest as "productInterest",
            fire_rating as "fireRating",
            source,
            message,
            status,
            priority,
            assignee,
            next_follow_up_at as "nextFollowUpAt",
            notes,
            consent
          FROM leads
          ORDER BY date_trunc('milliseconds', created_at) DESC, id DESC
        `;

        const csvEscape = (val: unknown) => {
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

        const statusLabels: Record<string, string> = {
          new: 'Mới tiếp nhận',
          contacted: 'Đã liên hệ',
          qualified: 'Đủ điều kiện',
          closed: 'Thành công',
          lost: 'Thất bại'
        };

        const priorityLabels: Record<string, string> = {
          high: 'Cao',
          medium: 'Trung bình',
          low: 'Thấp'
        };

        const lines = [headers.join(',')];
        for (const row of allRows) {
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
            csvEscape(statusLabels[row.status] || row.status),
            csvEscape(priorityLabels[row.priority] || row.priority),
            csvEscape(row.assignee),
            csvEscape(row.nextFollowUpAt),
            csvEscape(row.message),
            csvEscape(row.notes),
            csvEscape(row.consent ? 'Đồng ý' : 'Không')
          ].join(','));
        }

        const csvContent = '\uFEFF' + lines.join('\r\n');
        const dateStr = new Date().toISOString().slice(0, 10);
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="khach-hang-${dateStr}.csv"`);
        if (typeof res.send === 'function') {
          return res.status(200).send(csvContent);
        }
        res.statusCode = 200;
        return res.end(csvContent);
      } catch (err: any) {
        console.error('Lỗi xuất CSV leads:', err);
        return res.status(500).json({ error: 'DatabaseError', message: 'Không thể xuất danh sách liên hệ.' });
      }
    }

    // Phân trang theo con trỏ (created_at, id): ?before=<ISO>&beforeId=<id>&limit=<1-500>
    const limit = Math.min(Math.max(Number(req.query?.limit) || 200, 1), 500);
    const before = typeof req.query?.before === 'string' ? req.query.before : null;
    const beforeId = typeof req.query?.beforeId === 'string' ? req.query.beforeId : '';
    if (before && Number.isNaN(Date.parse(before))) {
      return res.status(400).json({ error: 'BadRequest', message: 'Tham số phân trang không hợp lệ.' });
    }

    try {
      const sql = getDb();
      const rows = await sql`
        SELECT 
          id,
          created_at as "createdAt",
          full_name as "fullName",
          phone,
          email,
          company,
          project_name as "projectName",
          project_location as "projectLocation",
          product_interest as "productInterest",
          fire_rating as "fireRating",
          source,
          message,
          status,
          priority,
          assignee,
          next_follow_up_at as "nextFollowUpAt",
          notes,
          consent
        FROM leads
        WHERE ${before}::timestamptz IS NULL
          OR (date_trunc('milliseconds', created_at), id) < (${before}::timestamptz, ${beforeId})
        ORDER BY date_trunc('milliseconds', created_at) DESC, id DESC
        LIMIT ${limit + 1}
      `;
      const [{ total }] = await sql`SELECT COUNT(*)::int AS total FROM leads`;
      return res.status(200).json({ leads: rows.slice(0, limit), hasMore: rows.length > limit, total });
    } catch (err: any) {
      console.error('Lỗi lấy danh sách leads:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể tải danh sách liên hệ.' });
    }
  }

  // POST: Tiếp nhận lead mới từ website
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const {
        fullName,
        phone,
        email,
        company,
        projectName,
        projectLocation,
        productInterest,
        fireRating,
        source,
        message,
        consent,
        website, // Honeypot trap chống spam
      } = body;

      // 1. Kiểm tra Honeypot: Nếu bot điền trường website ẩn thì bỏ qua âm thầm
      if (website && typeof website === 'string' && website.trim().length > 0) {
        return res.status(200).json({ ok: true, id: 'sp-trap', message: 'Đã tiếp nhận yêu cầu.' });
      }

      // 2. Kiểm tra dữ liệu bắt buộc
      if (!fullName || !phone) {
        return res.status(400).json({ error: 'BadRequest', message: 'Họ tên và số điện thoại là bắt buộc.' });
      }

      const cleanPhone = String(phone).replace(/[^\d+]/g, '');
      if (cleanPhone.length < 8) {
        return res.status(400).json({ error: 'BadRequest', message: 'Số điện thoại không hợp lệ.' });
      }

      // 3. Đồng ý xử lý dữ liệu phải được khách chủ động xác nhận (Nghị định 13/2023)
      if (consent !== true) {
        return res.status(400).json({ error: 'ConsentRequired', message: 'Vui lòng xác nhận đồng ý xử lý thông tin để APEX liên hệ.' });
      }

      const cleanEmail = clip(email, 255);
      if (cleanEmail && !EMAIL_PATTERN.test(cleanEmail)) {
        return res.status(400).json({ error: 'BadRequest', message: 'Email không hợp lệ.' });
      }

      const leadId = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const lead = {
        fullName: clip(fullName, 255)!,
        phone: clip(phone, 50)!,
        email: cleanEmail,
        company: clip(company, 255),
        projectName: clip(projectName, 255),
        projectLocation: clip(projectLocation, 255),
        productInterest: clip(productInterest, 255),
        fireRating: clip(fireRating, 100),
        source: clip(source, 100) || 'Biểu mẫu website',
        message: clip(message, 4000),
      };

      let sql;
      try {
        sql = getDb();
      } catch {
        return res.status(503).json({
          error: 'DatabaseNotConfigured',
          message: 'Hệ thống đang bảo trì cơ sở dữ liệu. Vui lòng gọi trực tiếp hotline để được hỗ trợ tức thì.',
        });
      }

      // 4. Giới hạn tần suất: theo số điện thoại (bảng leads) và theo IP đã băm (bảng lead_rate_limits)
      const tooMany = () =>
        res.status(429).json({
          error: 'TooManyRequests',
          message: 'Quý khách đã gửi nhiều yêu cầu trong thời gian ngắn. Vui lòng gọi hotline để được hỗ trợ ngay.',
        });
      const [phoneCount] = await sql`
        SELECT COUNT(*)::int AS n FROM leads
        WHERE regexp_replace(phone, '[^0-9+]', '', 'g') = ${cleanPhone}
          AND created_at > NOW() - make_interval(mins => ${RATE_WINDOW_MINUTES})
      `;
      if (phoneCount.n >= MAX_LEADS_PER_PHONE) return tooMany();

      const ipHash = hashIp(req);
      let ipTableReady = true;
      try {
        const [ipCount] = await sql`
          SELECT COUNT(*)::int AS n FROM lead_rate_limits
          WHERE ip_hash = ${ipHash} AND created_at > NOW() - make_interval(mins => ${RATE_WINDOW_MINUTES})
        `;
        if (ipCount.n >= MAX_LEADS_PER_IP) return tooMany();
      } catch (err) {
        // Chưa chạy migration lead_rate_limits: vẫn nhận lead (giới hạn theo số điện thoại vẫn hoạt động)
        ipTableReady = false;
        console.error('Chưa kiểm tra được giới hạn theo IP (bảng lead_rate_limits?):', err);
      }

      // 5. Ghi nhận lead vào Neon DB
      await sql`
        INSERT INTO leads (
          id, full_name, phone, email, company, project_name, project_location,
          product_interest, fire_rating, source, message, status, priority, consent, consent_at
        ) VALUES (
          ${leadId}, ${lead.fullName}, ${lead.phone}, ${lead.email}, ${lead.company},
          ${lead.projectName}, ${lead.projectLocation}, ${lead.productInterest}, ${lead.fireRating},
          ${lead.source}, ${lead.message}, 'new', 'medium', true, NOW()
        )
      `;

      if (ipTableReady) {
        try {
          await sql`INSERT INTO lead_rate_limits (ip_hash) VALUES (${ipHash})`;
          await sql`DELETE FROM lead_rate_limits WHERE created_at < NOW() - INTERVAL '1 day'`;
        } catch (err) {
          console.error('Không ghi được giới hạn tần suất lead:', err);
        }
      }

      // 6. Gửi email thông báo nội bộ qua Resend nếu có cấu hình API Key
      // NOTIFICATION_EMAIL: một hoặc nhiều địa chỉ nhận, phân tách bằng dấu phẩy
      const notifyTo = (process.env.NOTIFICATION_EMAIL || '').split(',').map((item) => item.trim()).filter(Boolean);
      if (!process.env.RESEND_API_KEY || notifyTo.length === 0) {
        console.warn('Chưa gửi email báo lead mới: thiếu RESEND_API_KEY hoặc NOTIFICATION_EMAIL.');
      } else {
        try {
          const mailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // Đặt RESEND_FROM (vd: "APEX Website <thongbao@apexhome.vn>") sau khi xác thực tên miền trên Resend
              from: process.env.RESEND_FROM || 'APEX Website <onboarding@resend.dev>',
              to: notifyTo,
              // Bấm "Trả lời" trong email là trả lời thẳng cho khách (nếu khách để lại email)
              ...(lead.email ? { reply_to: lead.email } : {}),
              subject: `[APEX PCCC] Khách hàng mới: ${String(fullName).trim()} - ${String(phone).trim()}`,
              html: `
                <h2>Có yêu cầu tư vấn mới từ website APEX VN</h2>
                <p><strong>Họ tên:</strong> ${escapeHtml(String(fullName).trim())}</p>
                <p><strong>Điện thoại:</strong> ${escapeHtml(String(phone).trim())}</p>
                <p><strong>Email:</strong> ${email ? escapeHtml(String(email).trim()) : 'Chưa cung cấp'}</p>
                <p><strong>Công ty:</strong> ${company ? escapeHtml(String(company).trim()) : 'Chưa cung cấp'}</p>
                <p><strong>Dự án:</strong> ${projectName ? escapeHtml(String(projectName).trim()) : 'Chưa cung cấp'}</p>
                <p><strong>Sản phẩm quan tâm:</strong> ${productInterest ? escapeHtml(String(productInterest).trim()) : 'Tư vấn chung'}</p>
                <p><strong>Nội dung:</strong> ${message ? escapeHtml(String(message).trim()) : 'Không có'}</p>
                <hr/>
                <p><small>Hệ thống tự động ghi nhận tại Neon DB lúc ${new Date().toISOString()}</small></p>
              `,
            }),
          });
          if (!mailRes.ok) {
            // Lead vẫn đã lưu trong Neon; chỉ ghi log để kiểm tra cấu hình Resend
            console.error('Resend từ chối gửi email báo lead:', mailRes.status, await mailRes.text().catch(() => ''));
          }
        } catch (mailErr) {
          console.error('Lỗi gửi email thông báo qua Resend:', mailErr);
        }
      }

      return res.status(200).json({
        ok: true,
        id: leadId,
        message: 'Cảm ơn quý khách! APEX đã tiếp nhận thông tin và sẽ liên hệ lại trong thời gian sớm nhất.',
      });
    } catch (err: any) {
      console.error('Lỗi lưu lead mới:', err);
      return res.status(500).json({ error: 'InternalServerError', message: 'Không thể gửi yêu cầu lúc này.' });
    }
  }

  // PUT: Admin cập nhật lead (trạng thái, phân công, ghi chú...) hoặc thêm lead thủ công
  if (req.method === 'PUT') {
    const user = await requireAdminRole(req, res, ROLE_ACCESS.leads);
    if (!user) return;

    const l = req.body || {};
    if (!l.id || !l.fullName || !l.phone) {
      return res.status(400).json({ error: 'BadRequest', message: 'Thiếu mã, họ tên hoặc số điện thoại của khách hàng.' });
    }
    const status = LEAD_STATUSES.includes(l.status) ? l.status : 'new';
    const priority = LEAD_PRIORITIES.includes(l.priority) ? l.priority : 'medium';
    const text = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : null);

    try {
      const sql = getDb();
      await sql`
        INSERT INTO leads (
          id, full_name, phone, email, company, project_name, project_location,
          product_interest, fire_rating, source, message, status, priority,
          assignee, next_follow_up_at, notes, consent
        ) VALUES (
          ${String(l.id)}, ${String(l.fullName).trim()}, ${String(l.phone).trim()},
          ${text(l.email)}, ${text(l.company)}, ${text(l.projectName)}, ${text(l.projectLocation)},
          ${text(l.productInterest)}, ${text(l.fireRating)}, ${text(l.source) || 'Nhập thủ công'},
          ${text(l.message)}, ${status}, ${priority}, ${text(l.assignee)},
          ${text(l.nextFollowUpAt)}, ${text(l.notes)}, ${l.consent !== false}
        )
        ON CONFLICT (id) DO UPDATE SET
          full_name = EXCLUDED.full_name,
          phone = EXCLUDED.phone,
          email = EXCLUDED.email,
          company = EXCLUDED.company,
          project_name = EXCLUDED.project_name,
          project_location = EXCLUDED.project_location,
          product_interest = EXCLUDED.product_interest,
          fire_rating = EXCLUDED.fire_rating,
          source = EXCLUDED.source,
          message = EXCLUDED.message,
          status = EXCLUDED.status,
          priority = EXCLUDED.priority,
          assignee = EXCLUDED.assignee,
          next_follow_up_at = EXCLUDED.next_follow_up_at,
          notes = EXCLUDED.notes
      `;
      return res.status(200).json({ ok: true, id: l.id });
    } catch (err: any) {
      console.error('Lỗi cập nhật lead:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể cập nhật thông tin khách hàng.' });
    }
  }

  // DELETE: Xóa lead
  if (req.method === 'DELETE') {
    const user = await requireAdminRole(req, res, ROLE_ACCESS.destructive);
    if (!user) return;

    const { id } = req.query || req.body || {};
    if (!id) return res.status(400).json({ error: 'BadRequest', message: 'Cần mã liên hệ cần xóa.' });

    try {
      const sql = getDb();
      await sql`DELETE FROM leads WHERE id = ${String(id)}`;
      return res.status(200).json({ ok: true, id });
    } catch (err: any) {
      console.error('Lỗi xóa lead:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể xóa lead.' });
    }
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE');
  return res.status(405).json({ error: 'MethodNotAllowed' });
}
