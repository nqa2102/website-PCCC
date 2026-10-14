import fs from 'fs';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig, Plugin} from 'vite';

function devApiPlugin(): Plugin {
  let devProducts: any[] = [];
  try {
    const raw = fs.readFileSync(path.resolve(import.meta.dirname, 'src/data/initialProducts.json'), 'utf8');
    devProducts = JSON.parse(raw);
  } catch {
    devProducts = [];
  }
  let devLeads: any[] = [];
  let devProjects: any[] = [
    {
      id: 'prj-hoc-vien-hau-can',
      title: 'Tòa nhà đa năng KV I – Học viện Hậu Cần',
      slug: 'toa-nha-da-nang-kv-i-hoc-vien-hau-can',
      clientName: 'Học viện Hậu Cần',
      generalContractor: 'Tổng công ty 789/BQP',
      apexRole: 'Nghiệm thu hoàn thành gói cửa chống cháy',
      category: 'cua-thep-ngan-chay',
      location: 'Long Biên, Hà Nội',
      completedYear: 2026,
      description: 'Cung cấp, lắp đặt và nghiệm thu hoàn thành toàn bộ hệ thống cửa thép chống cháy tiêu chuẩn EI70 - EI90 tại Tòa nhà đa năng KV I - Học viện Hậu Cần.',
      coverImage: '/src/assets/images/hero_fire_door_apex_1790648819738.webp',
      gallery: [
        '/src/assets/images/product_fire_curtain_1790648858516.webp',
        '/src/assets/images/product_fire_roller_shutter_1790648844563.webp',
        '/src/assets/images/products/cua-kinh-ngan-chay-cover.webp',
      ],
      status: 'published',
      verified: true,
      verifiedNote: 'Biên bản nghiệm thu hoàn thành 22/5/2026',
    },
    {
      id: 'prj-toa-an-quang-ninh',
      title: 'Trụ sở Tòa án nhân dân tỉnh Quảng Ninh',
      slug: 'tru-so-toa-an-nhan-dan-tinh-quang-ninh',
      clientName: 'Tòa án nhân dân tỉnh Quảng Ninh',
      generalContractor: '',
      apexRole: 'Cung cấp và thi công cửa kính & vách kính chống cháy',
      category: 'cua-kinh-ngan-chay',
      location: 'Hạ Long, Quảng Ninh',
      completedYear: 2025,
      description: 'Cung cấp và hoàn thiện hệ thống cửa kính ngăn cháy EI60 và vách kính chống cháy cho khu vực đại sảnh và phòng xét xử.',
      coverImage: '/src/assets/images/products/cua-kinh-ngan-chay-cover.webp',
      gallery: [],
      status: 'published',
      verified: true,
      verifiedNote: 'Văn bản nghiệm thu số 48/PCCC',
    },
    {
      id: 'prj-nha-may-dien-tu',
      title: 'Tổ hợp Nhà máy sản xuất linh kiện điện tử',
      slug: 'to-hop-nha-may-san-xuat-linh-kien-dien-tu',
      clientName: 'Ban Quản lý KCN',
      generalContractor: 'Tổng thầu Xây dựng Công nghiệp',
      apexRole: 'Cung cấp cửa cuốn ngăn cháy siêu trường EI120',
      category: 'cua-cuon-ngan-chay',
      location: 'KCN Quế Võ, Bắc Ninh',
      completedYear: 2026,
      description: 'Lắp đặt hệ thống cửa cuốn ngăn cháy siêu trường EI120 tích hợp motor tự động và kết nối hệ thống báo cháy BMS nhà máy.',
      coverImage: '/src/assets/images/product_fire_roller_shutter_1790648844563.webp',
      gallery: [],
      status: 'published',
      verified: true,
      verifiedNote: 'Hợp đồng & biên bản kiểm định số 102/KD-PCCC',
    },
  ];
  let devDocuments: any[] = [];
  let devContents: any[] = [];
  let devCompany: any = null;
  let devActivities: any[] = [];

  return {
    name: 'vite-dev-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api')) {
          return next();
        }

        const url = new URL(req.url, 'http://localhost:5173');
        const pathname = url.pathname;
        const method = req.method || 'GET';

        const parseBody = (): Promise<any> => {
          return new Promise((resolve) => {
            let data = '';
            req.on('data', (chunk) => { data += chunk; });
            req.on('end', () => {
              try { resolve(JSON.parse(data)); } catch { resolve({}); }
            });
          });
        };

        const json = (status: number, payload: any) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify(payload));
        };

        // 1. /api/admin/me
        if (pathname === '/api/admin/me') {
          return json(200, {
            user: { id: 'usr-admin-dev', email: 'admin@apexhome.vn', role: 'admin', fullName: 'Quản trị viên APEX' }
          });
        }

        // 2. /api/admin/products
        if (pathname === '/api/admin/products') {
          if (method === 'GET') {
            return json(200, { products: devProducts });
          }
          if (method === 'POST' || method === 'PUT') {
            const body = await parseBody();
            if (body.action === 'seed' && Array.isArray(body.products)) {
              devProducts = body.products;
              return json(200, { ok: true, count: devProducts.length });
            }
            if (body.id) {
              const idx = devProducts.findIndex((p) => p.id === body.id);
              if (idx > -1) {
                devProducts[idx] = { ...devProducts[idx], ...body, updatedAt: new Date().toISOString().slice(0, 16) };
              } else {
                devProducts.push({ ...body, updatedAt: new Date().toISOString().slice(0, 16) });
              }
              return json(200, { ok: true, id: body.id });
            }
            return json(400, { error: 'BadRequest' });
          }
          if (method === 'DELETE') {
            const id = url.searchParams.get('id');
            if (id) {
              devProducts = devProducts.filter((p) => p.id !== id);
              return json(200, { ok: true, id });
            }
            return json(400, { error: 'BadRequest' });
          }
        }

        // 3. /api/leads
        if (pathname === '/api/leads') {
          if (method === 'GET') {
            return json(200, { leads: devLeads, hasMore: false, total: devLeads.length });
          }
          if (method === 'POST') {
            const body = await parseBody();
            const newLead = { ...body, id: `lead-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 16) };
            devLeads.unshift(newLead);
            return json(200, { ok: true, lead: newLead });
          }
          if (method === 'PUT') {
            const body = await parseBody();
            devLeads = devLeads.map((l) => (l.id === body.id ? { ...l, ...body } : l));
            return json(200, { ok: true });
          }
          if (method === 'DELETE') {
            const id = url.searchParams.get('id');
            if (id) devLeads = devLeads.filter((l) => l.id !== id);
            return json(200, { ok: true });
          }
        }

        // 4. /api/admin/projects
        if (pathname === '/api/admin/projects') {
          if (method === 'GET') return json(200, { projects: devProjects });
          if (method === 'POST') {
            const body = await parseBody();
            const idx = devProjects.findIndex((p) => p.id === body.id);
            if (idx > -1) devProjects[idx] = body; else devProjects.push(body);
            return json(200, { ok: true });
          }
          if (method === 'DELETE') {
            const id = url.searchParams.get('id');
            if (id) devProjects = devProjects.filter((p) => p.id !== id);
            return json(200, { ok: true });
          }
        }

        // 5. /api/admin/documents
        if (pathname === '/api/admin/documents') {
          if (method === 'GET') return json(200, { documents: devDocuments });
          if (method === 'POST') {
            const body = await parseBody();
            const idx = devDocuments.findIndex((d) => d.id === body.id);
            if (idx > -1) devDocuments[idx] = body; else devDocuments.push(body);
            return json(200, { ok: true });
          }
          if (method === 'DELETE') {
            const id = url.searchParams.get('id');
            if (id) devDocuments = devDocuments.filter((d) => d.id !== id);
            return json(200, { ok: true });
          }
        }

        // 6. /api/admin/contents
        if (pathname === '/api/admin/contents') {
          if (method === 'GET') return json(200, { contents: devContents });
          if (method === 'POST') {
            const body = await parseBody();
            const idx = devContents.findIndex((c) => c.id === body.id);
            if (idx > -1) devContents[idx] = body; else devContents.push(body);
            return json(200, { ok: true });
          }
          if (method === 'DELETE') {
            const id = url.searchParams.get('id');
            if (id) devContents = devContents.filter((c) => c.id !== id);
            return json(200, { ok: true });
          }
        }

        // 7. /api/admin/settings
        if (pathname === '/api/admin/settings') {
          if (method === 'GET') return json(200, { company: devCompany });
          if (method === 'POST') {
            devCompany = await parseBody();
            return json(200, { ok: true });
          }
        }

        // 8. /api/admin/activities
        if (pathname === '/api/admin/activities') {
          if (method === 'GET') return json(200, { activities: devActivities });
          if (method === 'POST') {
            const body = await parseBody();
            devActivities.unshift({ ...body, id: `act-${Date.now()}`, at: new Date().toISOString() });
            return json(200, { ok: true });
          }
        }

        // 9. /api/public-content
        if (pathname === '/api/public-content') {
          return json(200, {
            isDatabaseLive: true,
            company: devCompany,
            products: devProducts,
            documents: devDocuments,
            projects: devProjects.filter((p) => p.verified === true && p.status === 'published'),
            contents: devContents,
          });
        }

        return next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), devApiPlugin()],
    resolve: {
      alias: {
        '@': import.meta.dirname,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
