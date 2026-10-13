import assert from 'node:assert';
import { groupProductsByVariant, formatMenuProductName, getCategorySubProducts } from '../src/components/products/productMenu.ts';

console.log('--- Kiểm thử groupProductsByVariant (VIỆC B) ---');

// Mock data mẫu
const steelDoorOverview = {
  id: 'cua-thep-ngan-chay',
  name: 'Hệ Cửa Thép Ngăn Cháy APEX (Tổng Quan)',
  category: 'cua-thep-ngan-chay',
  fireRating: 'EI70 - EI120'
};

const steelDoorEi90_1 = {
  id: 'cua-thep-ei90-1-canh',
  name: 'Cửa thép ngăn cháy 1 cánh EI90',
  category: 'cua-thep-ngan-chay',
  fireRating: 'EI90'
};

const steelDoorEi70_1 = {
  id: 'cua-thep-ei70-1-canh',
  name: 'Cửa thép ngăn cháy 1 cánh EI70',
  category: 'cua-thep-ngan-chay',
  fireRating: 'EI70'
};

const steelDoorEi120_2 = {
  id: 'cua-thep-ei120-2-canh',
  name: 'Cửa thép ngăn cháy 2 cánh EI120',
  category: 'cua-thep-ngan-chay',
  fireRating: 'EI120'
};

const steelDoorEi90_2 = {
  id: 'cua-thep-ei90-2-canh',
  name: 'Cửa thép ngăn cháy 2 cánh EI90',
  category: 'cua-thep-ngan-chay',
  fireRating: 'EI90'
};

const electricalCabinets = [
  { id: 'tu-dien-msb', name: 'Tủ điện phân phối tổng MSB', category: 'tu-dien' },
  { id: 'tu-dien-db', name: 'Tủ điện nhánh DB', category: 'tu-dien' },
  { id: 'tu-dien-pccc', name: 'Tủ điều khiển bơm PCCC', category: 'tu-dien' }
];

// Test 1: Nhóm rỗng -> mảng rỗng
const emptyRes = groupProductsByVariant([]);
assert.deepStrictEqual(emptyRes, [], 'Nhóm rỗng phải trả về mảng rỗng');
console.log('[PASS] Test 1: Nhóm rỗng -> mảng rỗng []');

// Test 2: Sản phẩm tổng quan bị loại
const overviewOnly = groupProductsByVariant([steelDoorOverview]);
assert.deepStrictEqual(overviewOnly, [], 'Sản phẩm tổng quan phải bị loại bỏ');
console.log('[PASS] Test 2: Sản phẩm tổng quan bị loại bỏ');

// Test 3: Nhóm cửa thép -> 2 nhóm con (1 CÁNH, 2 CÁNH) đúng thứ tự EI tăng dần
// Đưa dữ liệu đầu vào đảo lộn thứ tự để kiểm tra thuật toán sắp xếp
const steelDoorsInput = [
  steelDoorOverview, // Sẽ bị loại
  steelDoorEi90_2,
  steelDoorEi90_1,
  steelDoorEi120_2,
  steelDoorEi70_1
];

const steelRes = groupProductsByVariant(steelDoorsInput, 'cua-thep-ngan-chay');
assert.strictEqual(steelRes.length, 2, 'Cửa thép phải chia thành 2 nhóm con');
assert.strictEqual(steelRes[0].label, '1 CÁNH', 'Nhóm con đầu tiên là 1 CÁNH');
assert.strictEqual(steelRes[1].label, '2 CÁNH', 'Nhóm con thứ hai là 2 CÁNH');

// Kiểm tra thứ tự EI trong nhóm 1 CÁNH
assert.strictEqual(steelRes[0].products[0].id, 'cua-thep-ei70-1-canh', 'EI70 phải đứng trước EI90');
assert.strictEqual(steelRes[0].products[1].id, 'cua-thep-ei90-1-canh', 'EI90 phải đứng sau EI70');

// Kiểm tra thứ tự EI trong nhóm 2 CÁNH
assert.strictEqual(steelRes[1].products[0].id, 'cua-thep-ei90-2-canh', 'EI90 phải đứng trước EI120');
assert.strictEqual(steelRes[1].products[1].id, 'cua-thep-ei120-2-canh', 'EI120 phải đứng sau EI90');
console.log('[PASS] Test 3: Nhóm cửa thép -> 2 nhóm con đúng thứ tự EI (1 CÁNH: EI70->EI90; 2 CÁNH: EI90->EI120)');

// Test 4: Nhóm tủ điện -> danh sách phẳng
const elecRes = groupProductsByVariant(electricalCabinets, 'tu-dien');
assert.strictEqual(elecRes.length, 1, 'Tủ điện phải là danh sách phẳng (1 group)');
assert.strictEqual(elecRes[0].label, null, 'Danh sách phẳng có label = null');
assert.strictEqual(elecRes[0].products.length, 3, 'Giữ nguyên 3 sản phẩm tủ điện');
console.log('[PASS] Test 4: Nhóm tủ điện -> danh sách phẳng');

// Test 5: getCategorySubProducts loại bỏ overview
const subProds = getCategorySubProducts([steelDoorOverview, steelDoorEi70_1], 'cua-thep-ngan-chay');
assert.strictEqual(subProds.length, 1);
assert.strictEqual(subProds[0].id, 'cua-thep-ei70-1-canh');
console.log('[PASS] Test 5: getCategorySubProducts loại bỏ overview chính xác');

console.log('TẤT CẢ TEST groupProductsByVariant THÀNH CÔNG (100%)');
