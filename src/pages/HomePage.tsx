import React from 'react';
import {
  ArrowRight, ArrowUpRight, Award, Building, Building2,
  Factory, FileCheck2, Hotel,
  MessageSquare, School, ShieldCheck, Store, Wrench,
} from 'lucide-react';
import {
  HERO_IMAGE, PRODUCTS, SOLUTIONS,
} from '../data/mockData';

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

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenQuote, onOpenChat }) => {
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
        <img src={HERO_IMAGE} alt="Cửa chống cháy APEX tại công trình" className="absolute inset-0 h-full w-full object-cover object-center" />
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
            {PRODUCTS.slice(0, 4).map((product) => (
              <article key={product.id} className="group flex min-w-0 flex-col bg-white">
                <button onClick={() => onNavigate('products', product.id)} className="relative block h-56 overflow-hidden bg-slate-100 text-left" aria-label={`Xem ${product.name}`}>
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  <span className="absolute left-4 top-4 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-900 shadow-sm">{product.fireRating}</span>
                </button>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold leading-6 text-slate-900">{product.name}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{product.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-semibold text-red-700">{product.priceEstimate}</span>
                    <button onClick={() => onOpenQuote(product.category)} className="text-xs font-semibold text-slate-700 hover:text-red-700">Nhận báo giá</button>
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

      <section className="bg-[#14532d] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="section-kicker !text-red-400">Giải pháp theo công trình</span>
              <h2 className="mt-3 max-w-lg text-3xl font-semibold leading-tight text-white sm:text-4xl">Không có một cấu hình chung cho mọi dự án.</h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
                Mỗi loại công trình có mật độ sử dụng, lối thoát nạn và yêu cầu vận hành khác nhau. Đội ngũ APEX khảo sát trước khi đề xuất sản phẩm.
              </p>
              <button onClick={() => onNavigate('contact')} className="mt-8 flex items-center gap-2 border-b border-red-400 pb-1.5 text-sm font-semibold text-white">
                Đặt lịch khảo sát <ArrowUpRight className="h-4 w-4 text-red-400" />
              </button>
            </div>

            <div className="grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-3">
              {SOLUTIONS.map((solution) => {
                const Icon = solutionIcons[solution.id] || Building;
                return (
                  <button key={solution.id} onClick={() => onNavigate('solutions', solution.id)} className="group min-h-40 border-b border-r border-white/15 p-5 text-left transition-colors hover:bg-white/5">
                    <Icon className="h-6 w-6 text-red-400" strokeWidth={1.6} />
                    <h3 className="mt-8 max-w-[12rem] text-sm font-semibold leading-6 text-white">{solution.title}</h3>
                    <ArrowUpRight className="mt-3 h-4 w-4 text-slate-500 transition-colors group-hover:text-white" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="section-kicker">Hồ sơ dự án</span>
              <h2 className="section-title max-w-2xl">Dự án thực tế đang được hoàn thiện hồ sơ</h2>
            </div>
          </div>

          <div className="mt-12 border-y border-slate-200 bg-white px-6 py-12 sm:px-10">
            <p className="max-w-2xl text-sm leading-7 text-slate-600">APEX đang hoàn thiện thông tin, hình ảnh và quyền sử dụng tư liệu dự án trước khi công bố. Liên hệ để được tư vấn theo nhu cầu công trình hiện tại.</p>
            <button onClick={() => onNavigate('contact')} className="mt-6 flex items-center gap-2 text-sm font-semibold text-red-700">Trao đổi nhu cầu công trình <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <span className="section-kicker">Giá trị cốt lõi</span>
              <h2 className="section-title">Bốn cam kết định hình APEX</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">Tên gọi APEX là lời cam kết xuyên suốt từ tư vấn, thiết kế đến sản xuất, lắp đặt và đồng hành sau bàn giao.</p>
            </div>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {coreValues.map(({ letter, icon: Icon, english, vietnamese, description }) => (
                <div key={letter} className="border-t border-slate-300 pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-4xl font-semibold leading-none text-[#14532d]">{letter}</span>
                    <Icon className="h-5 w-5 text-red-700" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-slate-900">{english} <span className="font-normal text-slate-500">/ {vietnamese}</span></h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-red-700 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-5 sm:px-8 md:flex-row md:items-center lg:px-10">
          <div><p className="text-xs font-semibold text-red-100">Cần tư vấn cho dự án đang triển khai?</p><h2 className="mt-2 max-w-2xl text-2xl font-semibold leading-9 text-white sm:text-3xl">Gửi bản vẽ hoặc yêu cầu kỹ thuật, APEX sẽ phản hồi phương án phù hợp.</h2></div>
          <button onClick={() => onOpenQuote()} className="flex min-h-12 shrink-0 items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-semibold text-red-700 hover:bg-red-50">Nhận tư vấn và báo giá <ArrowRight className="h-4 w-4" /></button>
        </div>
      </section>
    </div>
  );
};
