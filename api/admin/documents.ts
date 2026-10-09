import { getDb, requireAdminRole, canPublish, ROLE_ACCESS } from '../_db';

export default async function handler(req: any, res: any) {
  // GET: Lấy danh sách hồ sơ kiểm định & tài liệu kỹ thuật
  if (req.method === 'GET') {
    // Dữ liệu quản trị gồm cả bản nháp/nội bộ: chỉ trả cho người đã đăng nhập.
    // Website công khai đọc qua /api/public-content (chỉ nội dung published).
    const user = await requireAdminRole(req, res, ROLE_ACCESS.documents);
    if (!user) return;

    try {
      const sql = getDb();
      const rows = await sql`
        SELECT 
          id, title, code, document_type as "documentType",
          product_group as "productGroup", standard, owner, scope,
          issued_date as "issuedDate", expiry_date as "expiryDate",
          status, source_reference as "sourceReference",
          verified_by as "verifiedBy", verified_at as "verifiedAt",
          notes, file_url as "fileUrl"
        FROM documents
        ORDER BY code ASC
      `;
      return res.status(200).json({ documents: rows });
    } catch (err: any) {
      console.error('Lỗi lấy danh sách tài liệu:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể tải danh sách tài liệu.' });
    }
  }

  // POST / PUT: Thêm hoặc sửa tài liệu
  if (req.method === 'POST' || req.method === 'PUT') {
    const user = await requireAdminRole(req, res, ROLE_ACCESS.documents);
    if (!user) return;

    const d = req.body || {};
    if (d.status === 'published' && !canPublish(user.role)) {
      return res.status(403).json({ error: 'Forbidden', message: 'Chỉ Quản trị viên được công bố nội dung ra website. Hãy chuyển sang "Chờ duyệt".' });
    }
    if (d.status === 'published' && !d.verifiedAt) {
      return res.status(400).json({ error: 'NotVerified', message: 'Hồ sơ phải được xác minh, đối chiếu bản gốc trước khi công bố.' });
    }

    try {
      if (!d.id || !d.title || !d.code) {
        return res.status(400).json({ error: 'BadRequest', message: 'Thiếu thông tin tài liệu.' });
      }

      const sql = getDb();
      await sql`
        INSERT INTO documents (
          id, title, code, document_type, product_group, standard, owner, scope,
          issued_date, expiry_date, status, source_reference, verified_by, verified_at,
          notes, file_url, updated_at
        ) VALUES (
          ${d.id}, ${d.title}, ${d.code}, ${d.documentType || null},
          ${d.productGroup || null}, ${d.standard || null}, ${d.owner || null},
          ${d.scope || null}, ${d.issuedDate || null}, ${d.expiryDate || null},
          ${d.status || 'draft'}, ${d.sourceReference || null}, ${d.verifiedBy || null},
          ${d.verifiedAt || null}, ${d.notes || null}, ${d.fileUrl || null}, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          code = EXCLUDED.code,
          document_type = EXCLUDED.document_type,
          product_group = EXCLUDED.product_group,
          standard = EXCLUDED.standard,
          owner = EXCLUDED.owner,
          scope = EXCLUDED.scope,
          issued_date = EXCLUDED.issued_date,
          expiry_date = EXCLUDED.expiry_date,
          status = EXCLUDED.status,
          source_reference = EXCLUDED.source_reference,
          verified_by = EXCLUDED.verified_by,
          verified_at = EXCLUDED.verified_at,
          notes = EXCLUDED.notes,
          file_url = EXCLUDED.file_url,
          updated_at = NOW()
      `;

      return res.status(200).json({ ok: true, id: d.id });
    } catch (err: any) {
      console.error('Lỗi lưu tài liệu:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể lưu tài liệu.' });
    }
  }

  // DELETE: Xóa tài liệu
  if (req.method === 'DELETE') {
    const user = await requireAdminRole(req, res, ROLE_ACCESS.destructive);
    if (!user) return;

    const { id } = req.query || req.body || {};
    if (!id) return res.status(400).json({ error: 'BadRequest', message: 'Cần mã tài liệu cần xóa.' });

    try {
      const sql = getDb();
      await sql`DELETE FROM documents WHERE id = ${String(id)}`;
      return res.status(200).json({ ok: true, id });
    } catch (err: any) {
      console.error('Lỗi xóa tài liệu:', err);
      return res.status(500).json({ error: 'DatabaseError', message: 'Không thể xóa tài liệu.' });
    }
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE');
  return res.status(405).json({ error: 'MethodNotAllowed' });
}
