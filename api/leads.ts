import { getDb, requireAdminRole, ROLE_ACCESS } from './_db';

const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'closed', 'lost'];
const LEAD_PRIORITIES = ['high', 'medium', 'low'];

// Dữ liệu khách nhập được chèn vào email HTML: phải escape để tránh chèn mã/link giả mạo
const escapeHtml = (value: unknown) =>
  String(value ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch] as string));

export default async function handler(req: any, res: any) {
  // GET: Admin lấy danh sách leads
  if (req.method === 'GET') {
    const user = await requireAdminRole(req, res, ROLE_ACCESS.leads);
    if (!user) return;

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
        ORDER BY created_at DESC
        LIMIT 200
      `;
      return res.status(200).json({ leads: rows });
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

      const leadId = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const cleanSource = source || 'Biểu mẫu website';
      const cleanConsent = consent !== false;

      let sql;
      try {
        sql = getDb();
      } catch {
        return res.status(503).json({
          error: 'DatabaseNotConfigured',
          message: 'Hệ thống đang bảo trì cơ sở dữ liệu. Vui lòng gọi trực tiếp hotline để được hỗ trợ tức thì.',
        });
      }

      // 3. Ghi nhận lead vào Neon DB
      await sql`
        INSERT INTO leads (
          id, full_name, phone, email, company, project_name, project_location,
          product_interest, fire_rating, source, message, status, priority, consent
        ) VALUES (
          ${leadId},
          ${String(fullName).trim()},
          ${String(phone).trim()},
          ${email ? String(email).trim() : null},
          ${company ? String(company).trim() : null},
          ${projectName ? String(projectName).trim() : null},
          ${projectLocation ? String(projectLocation).trim() : null},
          ${productInterest ? String(productInterest).trim() : null},
          ${fireRating ? String(fireRating).trim() : null},
          ${cleanSource},
          ${message ? String(message).trim() : null},
          'new',
          'medium',
          ${cleanConsent}
        )
      `;

      // 4. Gửi email thông báo nội bộ qua Resend nếu có cấu hình API Key
      if (process.env.RESEND_API_KEY) {
        try {
          const notifyTo = process.env.NOTIFICATION_EMAIL || 'contact@apex.vn';
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'APEX Website <onboarding@resend.dev>',
              to: [notifyTo],
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
