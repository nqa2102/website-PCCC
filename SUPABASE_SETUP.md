# Thiết lập Supabase cho APEX

## 1. Tạo dự án

Tạo một Supabase project thuộc tài khoản doanh nghiệp APEX. Chọn khu vực gần Việt Nam và dùng mật khẩu cơ sở dữ liệu do trình quản lý mật khẩu tạo.

## 2. Tạo cấu trúc dữ liệu

Mở SQL Editor của Supabase và chạy toàn bộ file:

`supabase/migrations/202610020001_apex_admin.sql`

## 3. Tạo quản trị viên đầu tiên

Trong Authentication > Users, tạo người dùng bằng email công việc. Sau đó chạy trong SQL Editor:

```sql
update public.profiles
set role = 'admin', full_name = 'Tên quản trị viên'
where email = 'email@congty.vn';
```

Những tài khoản tạo sau mặc định có vai trò `sales`. Có thể đổi thành `editor` hoặc `technical` trong bảng `profiles`.

## 4. Kết nối Vercel

Trong Project Settings > Environment Variables của Vercel, thêm:

- `VITE_SUPABASE_URL`: Project URL.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Publishable key.

Áp dụng cho Production, Preview và Development, rồi redeploy website.

Không đưa `service_role` key vào Vercel hoặc mã nguồn phía trình duyệt.

## 5. Kiểm tra trước vận hành

- Khách gửi biểu mẫu và bản ghi xuất hiện trong `leads`.
- Người chưa đăng nhập không đọc được dữ liệu.
- Nhân viên Sales không sửa được hồ sơ kỹ thuật.
- Editor không sửa được thông tin doanh nghiệp.
- Đăng xuất chấm dứt phiên quản trị.

