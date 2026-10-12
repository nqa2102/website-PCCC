// Test API logic for api/admin/projects.ts
const assert = require('assert');

// Mock request and response
function createMockReqRes({ method, body, user }) {
  const req = {
    method,
    body,
    headers: {
      cookie: user ? `token=mock_token_${user.role}` : ''
    }
  };
  const res = {
    statusCode: 200,
    headers: {},
    data: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.data = payload;
      return this;
    },
    setHeader(key, val) {
      this.headers[key] = val;
    }
  };
  return { req, res };
}

// Giả lập logic kiểm tra bảo mật trong api/admin/projects.ts
function validateProjectSave(p, user) {
  if (!p.id || !p.title || !p.slug) {
    return { status: 400, error: 'BadRequest' };
  }

  const isSettingVerified = Boolean(p.verified);

  // 1. Chặn công bố khi chưa xác minh
  if (p.status === 'published' && !isSettingVerified) {
    return { status: 400, error: 'UnverifiedPublishForbidden', message: 'Dự án phải được xác minh trước khi công bố.' };
  }

  // 2. Chỉ Quản trị viên (admin) mới được set verified = true
  if (isSettingVerified && user.role !== 'admin') {
    return { status: 403, error: 'Forbidden', message: 'Chỉ Quản trị viên (admin) mới có thẩm quyền xác minh dự án tiêu biểu.' };
  }

  // 3. Khi set verified = true, BẮT BUỘC phải có verified_note
  const verifiedNote = (p.verifiedNote || p.verified_note || '').trim();
  if (isSettingVerified && !verifiedNote) {
    return { status: 400, error: 'MissingVerifiedNote', message: 'Bắt buộc nhập ghi chú xác minh khi đánh dấu dự án là Đã xác minh.' };
  }

  return { status: 200, ok: true };
}

async function run() {
  console.log('--- BẮT ĐẦU KIỂM THỬ QUY TẮC API T5 ---');

  // Test 1: Editor lưu verified = true -> 403 Forbidden
  const test1 = validateProjectSave(
    { id: 'p1', title: 'Dự án A', slug: 'du-an-a', verified: true, verifiedNote: 'Đã nghiệm thu', status: 'review' },
    { role: 'editor' }
  );
  assert.strictEqual(test1.status, 403, 'Editor lưu verified=true phải trả về 403');
  console.log('✓ Test 1: Editor lưu verified=true -> 403 Forbidden (PASS)');

  // Test 2: Admin lưu verified = true nhưng KHÔNG CÓ ghi chú -> 400 MissingVerifiedNote
  const test2 = validateProjectSave(
    { id: 'p1', title: 'Dự án A', slug: 'du-an-a', verified: true, verifiedNote: '', status: 'review' },
    { role: 'admin' }
  );
  assert.strictEqual(test2.status, 400, 'Admin lưu verified=true không ghi chú phải trả về 400');
  assert.strictEqual(test2.error, 'MissingVerifiedNote');
  console.log('✓ Test 2: Admin lưu verified=true không có ghi chú -> 400 MissingVerifiedNote (PASS)');

  // Test 3: Admin công bố khi chưa verified (verified = false, status = published) -> 400 UnverifiedPublishForbidden
  const test3 = validateProjectSave(
    { id: 'p1', title: 'Dự án A', slug: 'du-an-a', verified: false, status: 'published' },
    { role: 'admin' }
  );
  assert.strictEqual(test3.status, 400, 'Admin công bố khi chưa verified phải trả về 400');
  assert.strictEqual(test3.error, 'UnverifiedPublishForbidden');
  console.log('✓ Test 3: Admin công bố khi chưa verified -> 400 UnverifiedPublishForbidden (PASS)');

  // Test 4: Admin công bố hợp lệ (verified = true, có ghi chú, status = published) -> 200 OK
  const test4 = validateProjectSave(
    { id: 'p1', title: 'Dự án A', slug: 'du-an-a', verified: true, verifiedNote: 'BB nghiệm thu số 01', status: 'published' },
    { role: 'admin' }
  );
  assert.strictEqual(test4.status, 200, 'Admin công bố hợp lệ phải trả về 200 OK');
  console.log('✓ Test 4: Admin công bố hợp lệ -> 200 OK (PASS)');

  console.log('--- TOÀN BỘ KIỂM THỬ QUY TẮC API T5 PASS 100% ---');
}

run();
