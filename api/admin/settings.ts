import { getDb, requireAdminRole, ROLE_ACCESS } from '../_db';

export default async function handler(req: any, res: any) {
  // GET: Lấy thông tin công ty / cấu hình
  if (req.method === 'GET') {
    // Dữ liệu quản trị gồm cả bản nháp/nội bộ: chỉ trả cho người đã đăng nhập.
    // Website công khai đọc qua /api/public-content (chỉ nội dung published).
    const user = await requireAdminRole(req, res, ROLE_ACCESS.settings);
    if (!user) return;

    try {
      const sql = getDb();
      const rows = await sql`
        SELECT 
          id,
          legal_name as "legalName",
          tax_code as "taxCode",
          brand_name as "brandName",
          representative,
          representative_title as "representativeTitle",
          hotline,
          zalo,
          email,
          response_time as "responseTime",
          service_area as "serviceArea",
          addresses,
          default_seo_title as "defaultSeoTitle",
          default_seo_description as "defaultSeoDescription"
        FROM company_settings
        WHERE id = 'apex'
        LIMIT 1
      `;
      if (rows && rows.length > 0) {
        return res.status(200).json({ company: rows[0] });
      }
      return res.status(200).json({ company: null });
    } catch (err: any) {
      console.error('Lỗi lấy cấu hình công ty:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể tải cấu hình công ty.' });
    }
  }

  // POST / PUT: Cập nhật thông tin công ty
  if (req.method === 'POST' || req.method === 'PUT') {
    const user = await requireAdminRole(req, res, ROLE_ACCESS.settings);
    if (!user) return;

    try {
      const c = req.body || {};
      const sql = getDb();
      const addressesJson = JSON.stringify(Array.isArray(c.addresses) ? c.addresses : []);

      await sql`
        INSERT INTO company_settings (
          id, legal_name, tax_code, brand_name, representative, representative_title,
          hotline, zalo, email, response_time, service_area, addresses,
          default_seo_title, default_seo_description, updated_at
        ) VALUES (
          'apex',
          ${c.legalName || 'Công ty TNHH Apex VN'},
          ${c.taxCode || null},
          ${c.brandName || 'APEX Việt Nam'},
          ${c.representative || null},
          ${c.representativeTitle || null},
          ${c.hotline || null},
          ${c.zalo || null},
          ${c.email || null},
          ${c.responseTime || null},
          ${c.serviceArea || null},
          ${addressesJson}::jsonb,
          ${c.defaultSeoTitle || null},
          ${c.defaultSeoDescription || null},
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          legal_name = EXCLUDED.legal_name,
          tax_code = EXCLUDED.tax_code,
          brand_name = EXCLUDED.brand_name,
          representative = EXCLUDED.representative,
          representative_title = EXCLUDED.representative_title,
          hotline = EXCLUDED.hotline,
          zalo = EXCLUDED.zalo,
          email = EXCLUDED.email,
          response_time = EXCLUDED.response_time,
          service_area = EXCLUDED.service_area,
          addresses = EXCLUDED.addresses,
          default_seo_title = EXCLUDED.default_seo_title,
          default_seo_description = EXCLUDED.default_seo_description,
          updated_at = NOW()
      `;

      return res.status(200).json({ ok: true });
    } catch (err: any) {
      console.error('Lỗi lưu cấu hình công ty:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể lưu cấu hình công ty.' });
    }
  }

  res.setHeader('Allow', 'GET, POST, PUT');
  return res.status(405).json({ error: 'MethodNotAllowed' });
}
