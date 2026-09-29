import React, { useState } from 'react';
import {
  ArrowRight, ArrowUpRight, Award, Building, Building2, ChevronLeft,
  ChevronRight, Clock3, Factory, FileCheck2, Hotel, MapPin,
  MessageSquare, School, ShieldCheck, Store, Wrench,
} from 'lucide-react';
import {
  HERO_IMAGE, NEWS_ARTICLES, PARTNER_LOGOS, PRODUCTS, PROJECTS, SOLUTIONS,
} from '../data/mockData';

interface HomePageProps {
  onNavigate: (tab: string, itemId?: string) => void;
  onOpenQuote: (productId?: string) => void;
  onOpenChat: () => void;
}

const trustPoints = [
  { value: 'EI60-EI120', label: 'Dải giới hạn chịu lửa' },
  { value: '36 tháng', label: 'Bảo hành cơ khí' },
  { value: '24/7', label: 'Hỗ trợ kỹ thuật' },
  { value: 'QCVN 06', label: 'Đáp ứng quy chuẩn' },
];

const reasons = [
  { icon: FileCheck2, title: 'Hồ sơ kiểm định minh bạch', description: 'Mẫu cửa được thử nghiệm tại IBST, đủ cơ sở phục vụ thẩm duyệt và nghiệm thu.' },
  { icon: Wrench, title: 'Thiết kế theo hiện trạng', description: 'Kỹ sư khảo sát khẩu độ, điều kiện vận hành và đề xuất cấu hình phù hợp từng khu vực.' },
  { icon: Clock3, title: 'Chủ động tiến độ', description: 'Sản xuất, vận chuyển và lắp đặt được kiểm soát theo mốc nghiệm thu của dự án.' },
  { icon: ShieldCheck, title: 'Đồng hành sau bàn giao', description: 'Bảo trì định kỳ và tiếp nhận sự cố kỹ thuật trong suốt vòng đời sản phẩm.' },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenQuote, onOpenChat }) => {
  const [projectIndex, setProjectIndex] = useState(0);
  const activeProject = PROJECTS[projectIndex];

  const solutionIcons: Record<string, React.ElementType> = {
    'chung-cu-can-ho': Building2,
    'van-phong-toa-nha': Building,
    'trung-tam-thuong-mai': Store,
    'nha-xuong-khu-cong-nghiep': Factory,
    'benh-vien-truong-hoc': School,
    'khach-san-resort': Hotel,
  };

  const changeProject = (direction: number) => {
    setProjectIndex((current) => (current + direction + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <div className="w-full bg-[#f7f7f5]">
      <section className="relative min-h-[620px] overflow-hidden bg-slate-950 text-white lg:min-h-[700px]">
        <img src={HERO_IMAGE} alt="Cửa chống cháy APEX tại công trình" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,15,24,0.96)_0%,rgba(8,15,24,0.8)_48%,rgba(8,15,24,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent" />

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-5 py-20 sm:px-8 lg:min-h-[700px] lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold text-red-300">
              <span className="h-px w-10 bg-red-400" />
              Giải pháp ngăn cháy cho công trình
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
              Bảo vệ công trình bằng giải pháp được kiểm chứng.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              APEX Việt Nam thiết kế, sản xuất và thi công cửa chống cháy, cửa cuốn và rèm ngăn cháy theo đúng yêu cầu kỹ thuật của từng dự án.
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

          <div className="mt-14 grid max-w-3xl grid-cols-2 border-y border-white/20 sm:grid-cols-4">
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

      <section className="bg-[#18212b] py-20 text-white sm:py-24">
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

      <section className="bg-[#f7f7f5] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="section-kicker">Dự án tiêu biểu</span>
              <h2 className="section-title max-w-2xl">Kinh nghiệm được xây dựng từ công trường</h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => changeProject(-1)} className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-slate-700 hover:border-slate-900" aria-label="Dự án trước"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => changeProject(1)} className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-slate-700 hover:border-slate-900" aria-label="Dự án tiếp theo"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>

          <article className="mt-12 grid overflow-hidden bg-white lg:grid-cols-[1.35fr_0.65fr]">
            <div className="h-80 overflow-hidden lg:h-[520px]"><img src={activeProject.image} alt={activeProject.title} className="h-full w-full object-cover" /></div>
            <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-10">
              <div>
                <p className="text-xs font-semibold text-red-700">{activeProject.categoryLabel}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-8 text-slate-900">{activeProject.title}</h3>
                <p className="mt-5 text-sm leading-7 text-slate-600">{activeProject.description}</p>
                <dl className="mt-8 space-y-4 border-t border-slate-200 pt-6 text-sm">
                  <div className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-700" /><div><dt className="text-xs text-slate-500">Địa điểm</dt><dd className="mt-1 font-medium text-slate-800">{activeProject.location}</dd></div></div>
                  <div className="flex gap-3"><Award className="mt-0.5 h-4 w-4 shrink-0 text-red-700" /><div><dt className="text-xs text-slate-500">Phạm vi cung cấp</dt><dd className="mt-1 font-medium leading-6 text-slate-800">{activeProject.itemsSupplied}</dd></div></div>
                </dl>
              </div>
              <button onClick={() => onNavigate('projects', activeProject.id)} className="mt-10 flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-red-700">Xem hồ sơ dự án <ArrowRight className="h-4 w-4" /></button>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <span className="section-kicker">Năng lực triển khai</span>
              <h2 className="section-title">Một đầu mối từ thiết kế đến bảo trì</h2>
              <p className="mt-5 text-sm leading-7 text-slate-600">Quy trình rõ ràng giúp chủ đầu tư và nhà thầu kiểm soát chất lượng, tiến độ và hồ sơ nghiệm thu.</p>
            </div>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {reasons.map(({ icon: Icon, title, description }, index) => (
                <div key={title} className="border-t border-slate-300 pt-5">
                  <div className="flex items-center justify-between"><Icon className="h-5 w-5 text-red-700" strokeWidth={1.7} /><span className="text-xs text-slate-400">0{index + 1}</span></div>
                  <h3 className="mt-5 text-base font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f7f7f5] py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="text-xs font-semibold text-slate-500">Đối tác và thương hiệu đồng hành</p>
          <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {PARTNER_LOGOS.map((partner) => (
              <div key={partner.name} className="border-l-2 border-slate-300 pl-3">
                <strong className="block text-sm font-semibold text-slate-800">{partner.name}</strong>
                <span className="mt-1 block text-[10px] leading-4 text-slate-500">{partner.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between gap-6">
            <div><span className="section-kicker">Tài liệu chuyên môn</span><h2 className="section-title">Kiến thức PCCC từ thực tế triển khai</h2></div>
            <button onClick={() => onNavigate('news')} className="hidden items-center gap-2 text-sm font-semibold text-slate-900 hover:text-red-700 sm:flex">Xem tất cả <ArrowRight className="h-4 w-4" /></button>
          </div>
          <div className="mt-12 grid gap-10 border-t border-slate-200 pt-8 md:grid-cols-3">
            {NEWS_ARTICLES.map((article) => (
              <article key={article.id} className="group cursor-pointer" onClick={() => onNavigate('news', article.id)}>
                <div className="aspect-[16/10] overflow-hidden bg-slate-100"><img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div>
                <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-500"><span className="font-semibold text-red-700">{article.category}</span><span>•</span><span>{article.date}</span></div>
                <h3 className="mt-3 text-lg font-semibold leading-7 text-slate-900 transition-colors group-hover:text-red-700">{article.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{article.summary}</p>
              </article>
            ))}
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
