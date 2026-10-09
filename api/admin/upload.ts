import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { requireAdminRole, ROLE_ACCESS } from '../_db.js';

// Cấu hình theo loại tệp: ảnh hiển thị trên website và PDF hồ sơ/chứng nhận để tải về
const UPLOAD_RULES = {
  images: {
    allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    maximumSizeInBytes: 5 * 1024 * 1024,
  },
  documents: {
    allowedContentTypes: ['application/pdf'],
    maximumSizeInBytes: 25 * 1024 * 1024,
  },
} as const;

// Cấp token tải tệp trực tiếp từ trình duyệt lên Vercel Blob (không đi qua giới hạn 4,5 MB của Function).
// Tệp được lưu công khai vì dùng cho ảnh website và hồ sơ công bố; chỉ admin đã đăng nhập mới được cấp token.
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'MethodNotAllowed' });
  }

  const user = await requireAdminRole(req, res, ROLE_ACCESS.upload);
  if (!user) return;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({
      error: 'BlobNotConfigured',
      message: 'Chưa kết nối Vercel Blob cho dự án (thiếu BLOB_READ_WRITE_TOKEN).',
    });
  }

  try {
    const result = await handleUpload({
      body: req.body as HandleUploadBody,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const folder = pathname.split('/')[0];
        const rules = UPLOAD_RULES[folder as keyof typeof UPLOAD_RULES];
        if (!rules || pathname.includes('..')) {
          throw new Error('Đường dẫn tệp không hợp lệ.');
        }
        return {
          allowedContentTypes: [...rules.allowedContentTypes],
          maximumSizeInBytes: rules.maximumSizeInBytes,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ uploadedBy: user.email }),
        };
      },
    });
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Lỗi cấp quyền tải tệp:', err);
    return res.status(400).json({ error: 'UploadRejected', message: err?.message || 'Không thể tải tệp lên.' });
  }
}
