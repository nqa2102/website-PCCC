import React from 'react';
import { ShieldCheck, Award, Wrench, CheckCircle2, FileCheck, ArrowRight, Phone } from 'lucide-react';
import { HERO_IMAGE, STEEL_DOOR_IMAGE } from '../data/mockData';

interface AboutPageProps {
  onOpenQuote: () => void;
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuote, onNavigate }) => {
  const coreValues = [
    { letter: 'A', icon: FileCheck, english: 'Assurance', vietnamese: 'An tâm', description: 'Cam kết minh bạch về tiêu chuẩn, hồ sơ và chất lượng trong toàn bộ quá trình triển khai.' },
    { letter: 'P', icon: ShieldCheck, english: 'Protection', vietnamese: 'Bảo vệ', description: 'Đặt sự an toàn của con người, tài sản và công trình làm mục tiêu cao nhất.' },
    { letter: 'E', icon: Wrench, english: 'Engineering', vietnamese: 'Kỹ thuật', description: 'Lấy khảo sát thực tế, tính chính xác và khả năng nghiệm thu làm nền tảng cho mọi giải pháp.' },
    { letter: 'X', icon: Award, english: 'eXcellence', vietnamese: 'Vượt trội', description: 'Không ngừng nâng cao sản phẩm, tiến độ và chất lượng phục vụ sau bàn giao.' },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Banner */}
      <div className="bg-slate-900 text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-red-500 font-bold text-xs uppercase tracking-widest block mb-2">
            VỀ CHÚNG TÔI
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-serif">
            CÔNG TY TNHH APEX VIỆT NAM
          </h1>
          <p className="mt-3 text-sm font-semibold text-red-300 sm:text-base">
            Vững chuẩn an toàn, trọn niềm an tâm.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-3 leading-relaxed">
            Tiên phong trong lĩnh vực nghiên cứu, chế tạo và cung ứng giải pháp cửa chống cháy, cửa cuốn ngăn cháy siêu trường và rèm ngăn khói theo quy chuẩn an toàn PCCC cao nhất tại Việt Nam.
          </p>
        </div>
      </div>

      {/* Main Story & Values */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
              <span className="w-1 h-3.5 bg-red-600 inline-block rounded-xs"></span>
              <span>LỊCH SỬ HÌNH THÀNH & PHÁT TRIỂN</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              Kiến tạo giải pháp ngăn cháy thụ động bền vững cho hàng triệu công trình
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thành lập từ năm 2015, APEX Việt Nam khởi đầu từ khát vọng giải quyết bài toán cấp bách về an toàn thoát hiểm và ngăn cháy lan trong các công trình cao tầng. Với việc đầu tư bài bản vào dây chuyền cơ khí chính xác CNC và hợp tác cùng các viện nghiên cứu vật liệu chống cháy, APEX nhanh chóng trở thành một trong những nhà cung cấp giải pháp PCCC uy tín hàng đầu.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mỗi sản phẩm cửa thép chống cháy, cửa cuốn hay rèm ngăn cháy của APEX đều trải qua quy trình kiểm soát chất lượng nghiêm ngặt ISO 9001:2015, được đốt mẫu thử nghiệm thực tế tại Viện IBST và cấp chứng chỉ kiểm định hợp quy bởi Cục Cảnh sát PCCC & CNCH (Bộ Công an).
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-2xl font-extrabold text-red-600 block">25.000 m²</span>
                <span className="text-xs font-semibold text-slate-800">Quy mô nhà máy hiện đại</span>
                <p className="text-[11px] text-slate-500 mt-0.5">KCN Quang Minh, Mê Linh, Hà Nội</p>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-2xl font-extrabold text-red-600 block">1.500+</span>
                <span className="text-xs font-semibold text-slate-800">Dự án hoàn thành</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Chung cư, TTTM, KCN trên cả nước</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
              <img
                src={STEEL_DOOR_IMAGE}
                alt="Nhà máy APEX Việt Nam"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold block">Dây chuyền sản xuất tự động công nghệ Nhật Bản</span>
                <span className="text-[10px] text-slate-300">Đảm bảo độ phẳng, độ khít và khả năng chịu nhiệt tới 1200°C</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Vision - Mission - Core Values */}
      <section className="py-14 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 max-w-2xl">
            <span className="section-kicker">Giá trị cốt lõi</span>
            <h2 className="section-title">APEX không chỉ là tên gọi</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Bốn chữ cái đại diện cho bốn nguyên tắc được áp dụng nhất quán trong sản phẩm, kỹ thuật và cách APEX đồng hành cùng khách hàng.
            </p>
          </div>

          <div className="grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map(({ letter, icon: Icon, english, vietnamese, description }) => (
              <article key={letter} className="min-h-64 border-b border-r border-slate-200 bg-white p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-5xl font-semibold leading-none text-[#14532d]">{letter}</span>
                  <Icon className="h-5 w-5 text-red-700" strokeWidth={1.7} aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-base font-semibold text-slate-900">{english}</h3>
                <p className="mt-1 text-xs font-semibold text-red-700">{vietnamese}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* Production Capacity & Compliance */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                NĂNG LỰC SẢN XUẤT & KIỂM ĐỊNH
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white font-serif">
                Quy trình thử nghiệm đốt mẫu thực tế tại Viện IBST
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Khác biệt lớn nhất của APEX là tính minh bạch và chuẩn mực pháp lý. Mỗi thiết kế cửa đều được chế tạo mẫu gửi tới Viện Khoa học Công nghệ Xây dựng (IBST) để thử lửa trực tiếp trong lò nung ở nhiệt độ trên 1.000°C theo TCVN 9383:2012.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Đạt chỉ số toàn vẹn (E) không biến dạng thủng trong 60 - 120 phút</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Đạt chỉ số cách nhiệt (I) mặt sau không vượt quá 140°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Được Cục CS PCCC & CNCH cấp tem kiểm định phương tiện PCCC</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('documents')}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Xem chứng chỉ kiểm định PCCC</span>
                </button>
                <button
                  onClick={onOpenQuote}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg border border-slate-700 transition-colors"
                >
                  Nhận báo giá dự án
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-3xl font-extrabold text-red-500 font-mono">10.000+</span>
                <p className="text-xs font-bold text-white">Bộ cửa xuất xưởng/tháng</p>
                <p className="text-[11px] text-slate-400">Đáp ứng tiến độ các đại dự án nghìn tỷ</p>
              </div>
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-3xl font-extrabold text-red-500 font-mono">100%</span>
                <p className="text-xs font-bold text-white">Thép mạ kẽm tiêu chuẩn</p>
                <p className="text-[11px] text-slate-400">Chống rỉ sét, chịu lực va đập cơ học</p>
              </div>
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-3xl font-extrabold text-red-500 font-mono">36</span>
                <p className="text-xs font-bold text-white">Tháng bảo hành chính hãng</p>
                <p className="text-[11px] text-slate-400">Cam kết chất lượng dài lâu</p>
              </div>
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-3xl font-extrabold text-red-500 font-mono">24/7</span>
                <p className="text-xs font-bold text-white">Hỗ trợ kỹ thuật tại chỗ</p>
                <p className="text-[11px] text-slate-400">Khảo sát & tư vấn công trình miễn phí</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
