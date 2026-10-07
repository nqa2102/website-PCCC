import React from 'react';
import {
  AlertTriangle, ArrowRight, ArrowUpRight, Award, Building, Building2,
  Calendar, CheckCircle2, Factory, FileCheck2, Flame, Hotel,
  MapPin, MessageSquare, School, ShieldCheck, Store, Wrench,
} from 'lucide-react';
import {
  HERO_IMAGE, PARTNER_LOGOS, PROJECTS, SOLUTIONS,
} from '../data/mockData';
import { useLiveData } from '../admin/adminData';

interface HomePageProps {
  onNavigate: (tab: string, itemId?: string) => void;
  onOpenQuote: (productId?: string) => void;
  onOpenChat: () => void;
}

const trustPoints = [
  { value: 'EI60-EI120', label: 'Dải giới hạn chịu lửa' },
  { value: '12-24 tháng', label: 'Bảo hành theo sản phẩm' },
  { value: '1-2 ngày', label: 'Thời gian phản hồi' },
  { value: 'Toàn quốc', label: 'Phạm vi cung ứng' },
];

const coreValues = [
  { letter: 'A', icon: FileCheck2, english: 'Assurance', vietnamese: 'An tâm', description: 'Cam kết rõ ràng về tiêu chuẩn, hồ sơ và chất lượng để mỗi công trình được triển khai với sự tin cậy.' },
  { letter: 'P', icon: ShieldCheck, english: 'Protection', vietnamese: 'Bảo vệ', description: 'Mọi giải pháp đều hướng tới mục tiêu cốt lõi: bảo vệ con người, tài sản và khả năng thoát nạn.' },
  { letter: 'E', icon: Wrench, english: 'Engineering', vietnamese: 'Kỹ thuật', description: 'Khảo sát đúng hiện trạng, thiết kế đúng yêu cầu và kiểm soát chính xác trong từng khâu sản xuất, lắp đặt.' },
  { letter: 'X', icon: Award, english: 'eXcellence', vietnamese: 'Vượt trội', description: 'Liên tục nâng chuẩn sản phẩm, tiến độ và dịch vụ để tạo ra giá trị bền vững cho mỗi dự án.' },
];

const projectProcess = [
  ['Tiếp nhận yêu cầu', 'Bản vẽ, vị trí lắp đặt, số lượng và tiến độ dự kiến.'],
  ['Rà soát kỹ thuật', 'Đối chiếu công năng, lối thoát nạn và yêu cầu hồ sơ.'],
  ['Khảo sát hiện trường', 'Xác nhận kích thước, chiều mở và điều kiện lắp đặt.'],
  ['Chốt cấu hình', 'Thống nhất vật liệu, phụ kiện, màu và phạm vi cung cấp.'],
  ['Sản xuất & lắp đặt', 'Triển khai theo cấu hình và kích thước đã được xác nhận.'],
  ['Bàn giao', 'Đối chiếu hạng mục, hồ sơ liên quan và chính sách bảo hành.'],
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenQuote, onOpenChat }) => {
  const { products } = useLiveData();
  const solutionIcons: Record<string, React.ElementType> = {
    'chung-cu-can-ho': Building2,
    'van-phong-toa-nha': Building,
    'trung-tam-thuong-mai': Store,
    'nha-xuong-khu-cong-nghiep': Factory,
    'benh-vien-truong-hoc': School,
    'khach-san-resort': Hotel,
  };

  return (
    <div className="w-full bg-neutral-50">
      <section className="relative min-h-[520px] overflow-hidden bg-[#102b21] text-white sm:min-h-[540px]">
        <img src={HERO_IMAGE} alt="Cửa chống cháy APEX tại công trình" width="1376" height="768" loading="eager" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,43,33,0.97)_0%,rgba(16,43,33,0.84)_48%,rgba(39,36,31,0.16)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#102b21]/75 to-transparent" />

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-5 py-12 sm:min-h-[540px] sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold text-red-300">
              <span className="h-px w-10 bg-red-400" />
              Vững chuẩn an toàn, trọn niềm an tâm
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
              Bảo vệ công trình bằng giải pháp được kiểm chứng.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              APEX cung cấp giải pháp ngăn cháy toàn diện cho nhà ở và công trình, từ cửa thép, cửa kính đến cửa cuốn và rèm ngăn cháy.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('products')} className="flex min-h-12 items-center gap-2 bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700">
                Xem giải pháp <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={onOpenChat} className="flex min-h-12 items-center gap-2 border border-white/40 bg-black/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-slate-950">
                Trao đổi với kỹ sư <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-14 hidden max-w-3xl grid-cols-2 border-y border-white/20 sm:grid sm:grid-cols-4">
            {trustPoints.map((item) => (
              <div key={item.label} className="border-white/20 px-3 py-5 first:pl-0 sm:border-r sm:px-5">
                <strong className="block text-lg font-semibold text-white">{item.value}</strong>
                <span className="mt-1 block text-[11px] leading-4 text-slate-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <span className="section-kicker">Sản phẩm chủ lực</span>
              <h2 className="section-title">Hệ sản phẩm đồng bộ cho từng khoang cháy</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:pb-1">
              Từ cửa thép cho hành lang thoát hiểm đến cửa cuốn siêu trường và rèm ngăn khói, mỗi cấu hình đều được lựa chọn theo vị trí lắp đặt và hồ sơ thiết kế PCCC.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <article key={product.id} className="group flex min-w-0 flex-col bg-white">
                <button onClick={() => onNavigate('products', product.id)} className="relative block h-56 overflow-hidden bg-slate-100 text-left" aria-label={`Xem ${product.name}`}>
                  <img src={product.image} alt={product.name} width="1200" height="896" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  <span className="absolute left-4 top-4 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-900 shadow-sm">{product.fireRating}</span>
                </button>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold leading-6 text-slate-900">{product.name}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{product.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-semibold uppercase text-red-700">Liên hệ</span>
                    <button onClick={() => onOpenQuote(product.category)} className="text-xs font-semibold text-slate-700 hover:text-red-700">Liên hệ kinh doanh</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <button onClick={() => onNavigate('products')} className="mt-8 flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-red-700">
            Xem toàn bộ danh mục <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <span className="section-kicker">Quy trình phối hợp dự án</span>
              <h2 className="section-title max-w-lg">Khóa đúng dữ liệu trước khi sản xuất.</h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600">Quy trình được bắt đầu từ bản vẽ và điều kiện thực tế, giúp hạn chế sai khác giữa cấu hình sản phẩm, vị trí lắp đặt và hồ sơ công trình.</p>
              <button onClick={() => onNavigate('contact')} className="mt-7 flex min-h-11 items-center gap-2 bg-red-700 px-5 text-sm font-semibold text-white hover:bg-red-800">Gửi yêu cầu khảo sát <ArrowRight className="h-4 w-4" /></button>
            </div>
            <ol className="grid border-l border-t border-slate-200 sm:grid-cols-2 xl:grid-cols-3">
              {projectProcess.map(([title, description], index) => (
                <li key={title} className="min-h-44 border-b border-r border-slate-200 p-5">
                  <span className="font-mono text-xs font-semibold text-red-700">0{index + 1}</span>
                  <h3 className="mt-5 text-sm font-semibold text-slate-950">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f4f4f1] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <span className="section-kicker">Giải pháp theo công trình</span>
              <h2 className="section-title max-w-lg">Bắt đầu từ điểm có thể làm hỏng cả phương án PCCC.</h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
                Một bộ cửa đúng sản phẩm nhưng sai vị trí, sai chiều mở hoặc thiếu phụ kiện vẫn có thể làm gián đoạn lối thoát nạn. APEX phân tích rủi ro trước khi chọn cấu hình.
              </p>

              <div className="mt-8 border-l-4 border-red-600 bg-white px-5 py-5 shadow-sm">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase text-red-700"><AlertTriangle className="h-4 w-4" />Ba điểm cần khóa ngay</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  <li>Khói và lửa lan qua hành lang, giếng trời hoặc khoảng mở lớn.</li>
                  <li>Cửa cản trở luồng người, xe hàng hoặc vận hành thường ngày.</li>
                  <li>Cấu hình thực tế không khớp hồ sơ thiết kế và vị trí lắp đặt.</li>
                </ul>
              </div>

              <button onClick={() => onOpenQuote()} className="mt-7 flex min-h-11 items-center gap-2 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700">
                Trao đổi với kinh doanh <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {SOLUTIONS.map((solution) => {
                const Icon = solutionIcons[solution.id] || Building;
                return (
                  <button key={solution.id} onClick={() => onNavigate('solutions', solution.id)} className="group min-h-64 border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-red-300 hover:shadow-md sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center bg-slate-950 text-white transition-colors group-hover:bg-red-700"><Icon className="h-5 w-5" strokeWidth={1.7} /></span>
                      <ArrowUpRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-red-700" />
                    </div>
                    <h3 className="mt-6 text-base font-semibold leading-6 text-slate-950">{solution.title}</h3>
                    <p className="mt-3 text-xs font-semibold uppercase text-red-700">Rủi ro cần xử lý</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{solution.challenges[0]}</p>
                    <div className="mt-4 flex items-start gap-2 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{solution.recommendedProducts[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-neutral-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="section-kicker">Hồ sơ dự án tiêu biểu</span>
              <h2 className="section-title max-w-2xl">Công trình thực tế ứng dụng giải pháp APEX</h2>
            </div>
            <button onClick={() => onNavigate('projects')} className="flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-800">
              Xem toàn bộ dự án <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 3).map((project) => (
              <article key={project.id} className="group flex flex-col border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                    {project.categoryLabel}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-red-600" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="line-clamp-1 text-base font-bold text-slate-900 transition-colors group-hover:text-red-700">{project.title}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">{project.description}</p>
                  <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-700">
                    <span className="font-semibold text-slate-900">Hạng mục: </span>
                    <span className="font-medium text-red-700">{project.itemsSupplied}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {PARTNER_LOGOS.length > 0 && (
            <div className="mt-16 border-t border-slate-200 pt-10">
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                Hệ thống thương hiệu thiết bị & đối tác kỹ thuật
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-12">
                {PARTNER_LOGOS.map((partner) => (
                  <div key={partner.name} className="flex flex-col items-center px-3 py-1 opacity-80 transition-opacity hover:opacity-100">
                    <span className="text-sm font-extrabold tracking-tight text-slate-800 sm:text-base">{partner.name}</span>
                    <span className="text-[10px] text-slate-500">{partner.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#dc2626_0%,#f97316_45%,#dc2626_100%)]" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
            <div>
              <span className="text-xs font-semibold uppercase text-red-400">Giá trị cốt lõi</span>
              <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">APEX là bốn lớp bảo vệ trong một cam kết.</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">Từ hồ sơ đến sản phẩm, mỗi lớp đều phải đứng vững trước áp lực của lửa, khói, tiến độ và nghiệm thu.</p>
              <div className="mt-9 flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center border border-red-500 bg-red-600/10 text-red-400"><Flame className="h-6 w-6" /></span>
                <div><strong className="block text-sm text-white">Tư duy ngăn cháy thụ động</strong><span className="mt-1 block text-xs text-slate-400">An toàn được thiết kế từ trước sự cố</span></div>
              </div>
            </div>
            <div className="grid border-l border-t border-white/15 sm:grid-cols-2">
              {coreValues.map(({ letter, icon: Icon, english, vietnamese, description }, index) => (
                <div key={letter} className="relative min-h-64 border-b border-r border-white/15 p-6 transition-colors hover:bg-white/[0.04] sm:p-7">
                  <span className="absolute right-5 top-5 text-[10px] font-mono text-slate-500">0{index + 1}</span>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-5xl font-semibold leading-none text-red-500">{letter}</span>
                    <Icon className="mr-7 h-5 w-5 text-slate-400" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 text-base font-semibold text-white">{english} <span className="font-normal text-red-400">/ {vietnamese}</span></h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid border-y border-white/15 sm:grid-cols-4">
            {['Ngăn lửa lan', 'Chặn khói độc', 'Giữ lối thoát', 'Đồng bộ hồ sơ'].map((label, index) => (
              <div key={label} className="flex items-center gap-3 border-b border-white/15 py-4 sm:border-b-0 sm:border-r sm:px-5 first:pl-0 last:border-r-0">
                <span className="text-xs font-mono text-red-400">0{index + 1}</span><span className="text-sm font-semibold text-slate-200">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div><span className="section-kicker">Cấu hình vật tư</span><h2 className="mt-3 text-2xl font-semibold text-slate-950">Chọn đúng vật liệu cho từng vị trí lắp đặt.</h2></div>
          <div className="grid border-l border-t border-slate-200 sm:grid-cols-3">
            {[['Lõi cách nhiệt', 'Bông gốm, MGO hoặc bông thủy tinh'], ['Phụ kiện đồng bộ', 'Khóa, panic bar, ô kính và tay co'], ['Màu hoàn thiện', 'Bảng màu sơn Jotun theo lựa chọn']].map(([title, detail]) => (
              <div key={title} className="min-h-32 border-b border-r border-slate-200 p-5"><p className="text-xs font-semibold uppercase text-red-700">{title}</p><p className="mt-3 text-sm leading-6 text-slate-700">{detail}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-700 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-5 sm:px-8 md:flex-row md:items-center lg:px-10">
          <div><p className="text-xs font-semibold text-red-100">Cần tư vấn cho dự án đang triển khai?</p><h2 className="mt-2 max-w-2xl text-2xl font-semibold leading-9 text-white sm:text-3xl">Gửi bản vẽ hoặc yêu cầu kỹ thuật, APEX sẽ phản hồi phương án phù hợp.</h2></div>
          <button onClick={() => onOpenQuote()} className="flex min-h-12 shrink-0 items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-semibold text-red-700 hover:bg-red-50">Gọi hoặc nhắn kinh doanh <ArrowRight className="h-4 w-4" /></button>
        </div>
      </section>
    </div>
  );
};
