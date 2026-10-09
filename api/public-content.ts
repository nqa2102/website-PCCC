import { getDb } from './_db.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'MethodNotAllowed' });
  }

  // Caching nhẹ trên Vercel Edge CDN: cache 60 giây, stale-while-revalidate 300 giây
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

  let sql;
  try {
    sql = getDb();
  } catch {
    // Nếu cơ sở dữ liệu chưa cấu hình DATABASE_URL
    return res.status(200).json({
      isDatabaseLive: false,
      message: 'Cơ sở dữ liệu Neon chưa kết nối. Website sử dụng dữ liệu tĩnh an toàn.',
    });
  }

  try {
    const [companyRows, productRows, documentRows, contentRows] = await Promise.all([
      sql`
        SELECT 
          id, legal_name as "legalName", tax_code as "taxCode", brand_name as "brandName",
          representative, representative_title as "representativeTitle", hotline, zalo,
          email, response_time as "responseTime", service_area as "serviceArea",
          addresses, default_seo_title as "defaultSeoTitle", default_seo_description as "defaultSeoDescription"
        FROM company_settings
        WHERE id = 'apex'
        LIMIT 1
      `,
      sql`
        SELECT 
          id, name, slug, category, category_name as "categoryName",
          fire_rating as "fireRating", short_description as "shortDescription",
          material, standard, warranty, featured, status, sort_order as "sortOrder",
          seo_title as "seoTitle", seo_description as "seoDescription",
          image_alt as "imageAlt", image, price_estimate as "priceEstimate"
        FROM products
        WHERE status = 'published'
        ORDER BY sort_order ASC, name ASC
      `,
      sql`
        SELECT 
          id, title, code, document_type as "documentType", product_group as "productGroup",
          standard, owner, scope, issued_date as "issuedDate", expiry_date as "expiryDate",
          status, file_url as "fileUrl"
        FROM documents
        WHERE status = 'published'
        ORDER BY issued_date DESC
      `,
      sql`
        SELECT 
          id, type, title, summary, status, publish_at as "publishAt", owner,
          featured, media_approved as "mediaApproved", client_approved as "clientApproved",
          category, location, scale, items_supplied as "itemsSupplied", year, client,
          author, read_time as "readTime", content, image
        FROM contents
        WHERE status = 'published'
        ORDER BY publish_at DESC
      `,
    ]);

    return res.status(200).json({
      isDatabaseLive: true,
      company: companyRows && companyRows.length > 0 ? companyRows[0] : null,
      products: productRows || [],
      documents: documentRows || [],
      contents: contentRows || [],
    });
  } catch (err: any) {
    console.error('Lỗi truy vấn dữ liệu công khai từ Neon:', err);
    return res.status(200).json({
      isDatabaseLive: false,
      error: 'QueryFailed',
      message: 'Không thể truy vấn dữ liệu từ Neon. Website sử dụng dữ liệu tĩnh an toàn.',
    });
  }
}
