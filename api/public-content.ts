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

    // Tự động kiểm tra: nếu Neon có < 5 dự án thực tế hoặc còn dự án mẫu cũ (prj-toa-an-quang-ninh)
    // thì chạy đồng bộ 5 dự án thực tế và loại bỏ dự án mẫu cũ
    const needsSync = finalProjectRows.length < 5 || 
      finalProjectRows.some((p: any) => p.id === 'prj-toa-an-quang-ninh' || p.slug === 'toa-nha-da-nang-kv-i-hoc-vien-hau-can');

    if (needsSync) {
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

        await sql`
          INSERT INTO projects (
            id, title, slug, client_name, general_contractor, apex_role, category, location, completed_year,
            description, cover_image, gallery, status, verified, verified_note, updated_at
          ) VALUES
          (
            'prj-benh-vien-tim-hn',
            'Bệnh viện Tim Hà Nội cơ sở 2',
            'benh-vien-tim-ha-noi-co-so-2',
            'Bệnh viện Tim Hà Nội',
            'Ban quản lý dự án công trình y tế Hà Nội',
            'Cung cấp và lắp đặt cửa ngăn cháy phòng kỹ thuật và sảnh bệnh viện',
            'cua-thep-ngan-chay',
            'Tây Hồ, Hà Nội',
            2026,
            'Cung cấp và thi công hoàn thiện hệ thống cửa thép ngăn cháy tiêu chuẩn PCCC, cửa phòng kỹ thuật y tế tại Bệnh viện Tim Hà Nội cơ sở 2.',
            '/src/assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-1.webp',
            '["/src/assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-1.webp", "/src/assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-2.webp", "/src/assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-3.webp", "/src/assets/images/projects/benh-vien-tim-ha-noi-co-so-2/photo-4.webp"]'::jsonb,
            'published',
            true,
            'Hồ sơ nghiệm thu hoàn thành bàn giao sử dụng',
            NOW()
          ),
          (
            'prj-hoc-vien-hau-can',
            'Học viện Hậu Cần',
            'hoc-vien-hau-can',
            'Học viện Hậu Cần',
            'Tổng công ty 789/BQP',
            'Nghiệm thu hoàn thành gói cửa chống cháy',
            'cua-thep-ngan-chay',
            'Long Biên, Hà Nội',
            2026,
            'Cung cấp, lắp đặt và nghiệm thu hoàn thành toàn bộ hệ thống cửa thép chống cháy tiêu chuẩn EI tại Tòa nhà đa năng KV I - Học viện Hậu Cần.',
            '/src/assets/images/projects/hoc-vien-hau-can/photo-1.webp',
            '["/src/assets/images/projects/hoc-vien-hau-can/photo-1.webp", "/src/assets/images/projects/hoc-vien-hau-can/photo-2.webp", "/src/assets/images/projects/hoc-vien-hau-can/photo-3.webp", "/src/assets/images/projects/hoc-vien-hau-can/photo-4.webp"]'::jsonb,
            'published',
            true,
            'Biên bản nghiệm thu hoàn thành ngày 22/5/2026',
            NOW()
          ),
          (
            'prj-dien-luc-yen-bai',
            'Nhà làm việc 9 tầng công ty Điện lực Yên Bái',
            'cong-ty-dien-luc-yen-bai',
            'Công ty Điện lực Yên Bái (EVNNPC)',
            'Công ty Cổ phần Xây dựng Điện lực',
            'Cung cấp và lắp đặt cửa thép chống cháy sảnh và buồng thang',
            'cua-thep-ngan-chay',
            'TP. Yên Bái, Yên Bái',
            2026,
            'Sản xuất, cung cấp và lắp đặt cửa thép chống cháy sảnh tầng, buồng thang thoát hiểm và phòng máy kỹ thuật Nhà làm việc 9 tầng Công ty Điện lực Yên Bái.',
            '/src/assets/images/projects/cong-ty-dien-luc-yen-bai/photo-1.webp',
            '["/src/assets/images/projects/cong-ty-dien-luc-yen-bai/photo-1.webp", "/src/assets/images/projects/cong-ty-dien-luc-yen-bai/photo-2.webp", "/src/assets/images/projects/cong-ty-dien-luc-yen-bai/photo-3.webp", "/src/assets/images/projects/cong-ty-dien-luc-yen-bai/photo-4.webp"]'::jsonb,
            'published',
            true,
            'Hồ sơ nghiệm thu bàn giao hệ thống cửa chống cháy hoàn thành',
            NOW()
          ),
          (
            'prj-nha-may-astarte',
            'Nhà máy Astarte Việt Nam',
            'nha-may-astarte-viet-nam',
            'Công ty TNHH Astarte Việt Nam',
            'Tổng thầu Xây dựng Công nghiệp',
            'Cung cấp và lắp đặt cửa thép ngăn cháy nhà xưởng sản xuất',
            'cua-thep-ngan-chay',
            'Khu công nghiệp, Hưng Yên',
            2026,
            'Cung cấp và lắp đặt trọn gói hệ thống cửa thép ngăn cháy nhà xưởng sản xuất, kho nguyên liệu và phòng kỹ thuật Nhà máy Astarte Việt Nam.',
            '/src/assets/images/projects/nha-may-astarte-viet-nam/photo-1.webp',
            '["/src/assets/images/projects/nha-may-astarte-viet-nam/photo-1.webp", "/src/assets/images/projects/nha-may-astarte-viet-nam/photo-2.webp", "/src/assets/images/projects/nha-may-astarte-viet-nam/photo-3.webp", "/src/assets/images/projects/nha-may-astarte-viet-nam/photo-4.webp"]'::jsonb,
            'published',
            true,
            'Nghiệm thu hoàn thành bàn giao đưa vào hoạt động',
            NOW()
          ),
          (
            'prj-vien-kiem-sat-quang-ninh',
            'Viện kiểm sát nhân dân tỉnh Quảng Ninh',
            'vien-kiem-sat-tinh-quang-ninh',
            'Viện kiểm sát nhân dân tỉnh Quảng Ninh',
            'Ban quản lý dự án công trình cơ quan nhà nước',
            'Cung cấp và lắp đặt cửa chống cháy sảnh và kho hồ sơ',
            'cua-thep-ngan-chay',
            'Hạ Long, Quảng Ninh',
            2026,
            'Gói thầu cung cấp và lắp đặt toàn bộ hệ thống cửa ngăn cháy tiêu chuẩn EI cho công trình Trụ sở Viện kiểm sát nhân dân tỉnh Quảng Ninh.',
            '/src/assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-1.webp',
            '["/src/assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-1.webp", "/src/assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-2.webp", "/src/assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-3.webp", "/src/assets/images/projects/vien-kiem-sat-tinh-quang-ninh/photo-4.webp"]'::jsonb,
            'published',
            true,
            'Hồ sơ nghiệm thu bàn giao hệ thống cửa chống cháy hoàn thành',
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

        // Xóa triệt để dự án demo cũ (prj-toa-an-quang-ninh) không nằm trong 5 folder ảnh thực tế
        await sql`DELETE FROM projects WHERE id = 'prj-toa-an-quang-ninh';`;

        finalProjectRows = await sql`
          SELECT 
            id, title, slug, client_name as "clientName",
            general_contractor as "generalContractor", apex_role as "apexRole",
            category, location, completed_year as "completedYear", description,
            cover_image as "coverImage", gallery, status, verified
          FROM projects
          WHERE verified = true AND status = 'published'
          ORDER BY completed_year DESC NULLS LAST, created_at DESC
        `.catch(() => finalProjectRows);
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
