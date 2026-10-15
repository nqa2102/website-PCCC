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
    const [companyRows, productRows, documentRows, contentRows, projectRows] = await Promise.all([
      sql`
        SELECT 
          id, legal_name as "legalName", tax_code as "taxCode", brand_name as "brandName",
          representative, representative_title as "representativeTitle", hotline, zalo,
          email, response_time as "responseTime", service_area as "serviceArea",
          addresses, default_seo_title as "defaultSeoTitle", default_seo_description as "defaultSeoDescription"
        FROM company_settings
        WHERE id = 'apex'
        LIMIT 1
      `.catch(() => []),
      sql`
        SELECT 
          id, name, slug, category, category_name as "categoryName",
          fire_rating as "fireRating", certification_no as "certificationNo",
          short_description as "shortDescription", material, standard, warranty,
          specs, features, long_description as "longDescription",
          featured, status, sort_order as "sortOrder",
          seo_title as "seoTitle", seo_description as "seoDescription",
          image_alt as "imageAlt", image, price_estimate as "priceEstimate"
        FROM products
        WHERE status = 'published'
        ORDER BY sort_order ASC, name ASC
      `.catch(async (err: any) => {
        // Fallback tương thích nếu database Neon chưa chạy migration features/long_description
        console.warn('Truy vấn products fallback về tương thích ngược:', err?.message || err);
        return await sql`
          SELECT 
            id, name, slug, category, category_name as "categoryName",
            fire_rating as "fireRating", certification_no as "certificationNo",
            short_description as "shortDescription", material, standard, warranty,
            specs, '[]'::jsonb as features, short_description as "longDescription",
            featured, status, sort_order as "sortOrder",
            seo_title as "seoTitle", seo_description as "seoDescription",
            image_alt as "imageAlt", image, price_estimate as "priceEstimate"
          FROM products
          WHERE status = 'published'
          ORDER BY sort_order ASC, name ASC
        `.catch(async () => {
          return await sql`
            SELECT 
              id, name, slug, category, category_name as "categoryName",
              fire_rating as "fireRating", '' as "certificationNo",
              short_description as "shortDescription", material, standard, warranty,
              '{}'::jsonb as specs, '[]'::jsonb as features, short_description as "longDescription",
              featured, status, sort_order as "sortOrder",
              seo_title as "seoTitle", seo_description as "seoDescription",
              image_alt as "imageAlt", image, price_estimate as "priceEstimate"
            FROM products
            WHERE status = 'published'
            ORDER BY sort_order ASC, name ASC
          `;
        });
      }),
      sql`
        SELECT 
          id, title, code, document_type as "documentType", product_group as "productGroup",
          standard, owner, scope, issued_date as "issuedDate", expiry_date as "expiryDate",
          status, file_url as "fileUrl"
        FROM documents
        WHERE status = 'published'
        ORDER BY issued_date DESC
      `.catch(() => []),
      sql`
        SELECT 
          id, type, title, summary, status, publish_at as "publishAt", owner,
          featured, media_approved as "mediaApproved", client_approved as "clientApproved",
          category, location, scale, items_supplied as "itemsSupplied", year, client,
          author, read_time as "readTime", content, image
        FROM contents
        WHERE status = 'published' AND type != 'project'
        ORDER BY publish_at DESC
      `.catch(() => []),
      sql`
        SELECT 
          id, title, slug, client_name as "clientName",
          general_contractor as "generalContractor", apex_role as "apexRole",
          category, location, completed_year as "completedYear", description,
          cover_image as "coverImage", gallery, status, verified
        FROM projects
        WHERE verified = true AND status = 'published'
        ORDER BY completed_year DESC NULLS LAST, created_at DESC
      `.catch(async (err: any) => {
        // Fallback tương thích nếu database Neon chưa chạy migration general_contractor/apex_role
        console.warn('Truy vấn projects fallback về schema cũ:', err?.message || err);
        return await sql`
          SELECT 
            id, title, slug, client_name as "clientName",
            '' as "generalContractor", '' as "apexRole",
            category, location, completed_year as "completedYear", description,
            cover_image as "coverImage", gallery, status, verified
          FROM projects
          WHERE verified = true AND status = 'published'
          ORDER BY completed_year DESC NULLS LAST, created_at DESC
        `.catch(() => []);
      }),
    ]);

    let finalProjectRows = projectRows || [];

    // Nếu Neon chưa có dữ liệu dự án, tự động khởi tạo cấu trúc và nạp 3 dự án tiêu biểu thực tế
    if (finalProjectRows.length === 0) {
      try {
        await sql`
          CREATE TABLE IF NOT EXISTS projects (
            id VARCHAR(64) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            client_name VARCHAR(255),
            general_contractor VARCHAR(255),
            apex_role VARCHAR(255),
            category VARCHAR(100),
            location VARCHAR(255),
            completed_year INTEGER,
            description TEXT,
            cover_image TEXT,
            gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
            status VARCHAR(50) NOT NULL DEFAULT 'draft',
            verified BOOLEAN NOT NULL DEFAULT FALSE,
            verified_note TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `;
        await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS general_contractor VARCHAR(255);`;
        await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS apex_role VARCHAR(255);`;

        const countRes = await sql`SELECT COUNT(*)::int as total FROM projects;`.catch(() => [{ total: 0 }]);
        if ((countRes?.[0]?.total || 0) === 0) {
          await sql`
            INSERT INTO projects (
              id, title, slug, client_name, general_contractor, apex_role, category, location, completed_year,
              description, cover_image, gallery, status, verified, verified_note, updated_at
            ) VALUES
            (
              'prj-vien-kiem-sat-quang-ninh',
              'Viện kiểm sát nhân dân tỉnh Quảng Ninh',
              'vien-kiem-sat-tinh-quang-ninh',
              'Viện kiểm sát nhân dân tỉnh Quảng Ninh',
              NULL,
              'Cung cấp và lắp đặt cửa chống cháy',
              'cua-thep-ngan-chay',
              'Hạ Long, Quảng Ninh',
              2026,
              'Gói thầu cung cấp và lắp đặt toàn bộ hệ thống cửa ngăn cháy tiêu chuẩn EI cho công trình Trụ sở Viện kiểm sát nhân dân tỉnh Quảng Ninh.',
              '/assets/cua-thep-ngan-chay-cover-D9h1BATp.webp',
              '["/assets/cua-thep-ngan-chay-cover-D9h1BATp.webp", "/assets/cua-thep-ei90-2-canh-cover-DoOos29c.webp", "/assets/cua-thep-ei70-1-canh-cover-BCph26oY.webp"]'::jsonb,
              'published',
              true,
              'Hồ sơ nghiệm thu bàn giao hệ thống cửa chống cháy hoàn thành',
              NOW()
            ),
            (
              'prj-toa-an-quang-ninh',
              'Tòa án nhân dân tỉnh Quảng Ninh',
              'toa-an-tinh-quang-ninh',
              'Tòa án nhân dân tỉnh Quảng Ninh',
              NULL,
              'Cung cấp và thi công cửa kính & vách kính chống cháy',
              'cua-kinh-ngan-chay',
              'Hạ Long, Quảng Ninh',
              2026,
              'Cung cấp và thi công hệ thống cửa kính ngăn cháy và vách kính chống cháy cho trụ sở Tòa án nhân dân tỉnh Quảng Ninh.',
              '/assets/cua-kinh-ngan-chay-cover-B6C6S7au.webp',
              '["/assets/cua-kinh-ngan-chay-cover-B6C6S7au.webp", "/assets/cua-kinh-ngan-chay-ei60-cover-B-rV6Z_g.webp", "/assets/vach-kinh-ngan-chay-ei60-ei90-cover-B5UhhvrD.webp"]'::jsonb,
              'published',
              true,
              'Hồ sơ nghiệm thu kỹ thuật vách kính và cửa kính ngăn cháy',
              NOW()
            ),
            (
              'prj-hoc-vien-hau-can',
              'Tòa nhà đa năng KV I – Học viện Hậu Cần',
              'toa-nha-da-nang-kv-i-hoc-vien-hau-can',
              'Học viện Hậu Cần',
              'Tổng công ty 789/BQP',
              'Nghiệm thu hoàn thành gói cửa chống cháy',
              'cua-thep-ngan-chay',
              'Long Biên, Hà Nội',
              2026,
              'Cung cấp, lắp đặt và nghiệm thu hoàn thành toàn bộ hệ thống cửa thép chống cháy tiêu chuẩn EI tại Tòa nhà đa năng KV I - Học viện Hậu Cần.',
              '/assets/cua-thep-ei90-2-canh-cover-DoOos29c.webp',
              '["/assets/cua-thep-ei90-2-canh-cover-DoOos29c.webp", "/assets/cua-thep-ei120-2-canh-cover-Gs2ZhLqJ.webp", "/assets/cua-thep-ei70-1-canh-cover-BCph26oY.webp"]'::jsonb,
              'published',
              true,
              'Biên bản nghiệm thu hoàn thành ngày 22/5/2026',
              NOW()
            )
            ON CONFLICT (id) DO UPDATE SET
              title = EXCLUDED.title,
              slug = EXCLUDED.slug,
              client_name = EXCLUDED.client_name,
              general_contractor = EXCLUDED.general_contractor,
              apex_role = EXCLUDED.apex_role,
              category = EXCLUDED.category,
              location = EXCLUDED.location,
              completed_year = EXCLUDED.completed_year,
              description = EXCLUDED.description,
              cover_image = EXCLUDED.cover_image,
              gallery = EXCLUDED.gallery,
              status = EXCLUDED.status,
              verified = EXCLUDED.verified,
              verified_note = EXCLUDED.verified_note,
              updated_at = NOW();
          `;

          finalProjectRows = await sql`
            SELECT 
              id, title, slug, client_name as "clientName",
              general_contractor as "generalContractor", apex_role as "apexRole",
              category, location, completed_year as "completedYear", description,
              cover_image as "coverImage", gallery, status, verified
            FROM projects
            WHERE verified = true AND status = 'published'
            ORDER BY completed_year DESC NULLS LAST, created_at DESC
          `.catch(() => []);
        }
      } catch (autoSeedErr) {
        console.warn('Lưu ý khi tự động khởi tạo dự án Neon:', autoSeedErr);
      }
    }

    return res.status(200).json({
      isDatabaseLive: true,
      company: companyRows && companyRows.length > 0 ? companyRows[0] : null,
      products: productRows || [],
      documents: documentRows || [],
      contents: contentRows || [],
      projects: finalProjectRows || [],
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
