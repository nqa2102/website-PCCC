import React, { useState } from 'react';
import { 
  Building2, 
  Building, 
  Store, 
  Factory, 
  School, 
  Hotel, 
  ShieldAlert, 
  CheckCircle, 
  FileCheck, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { SOLUTIONS } from '../data/mockData';

interface SolutionsPageProps {
  onOpenQuote: () => void;
  onNavigate: (tab: string, itemId?: string) => void;
  initialSolutionId?: string;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onOpenQuote,
  onNavigate,
  initialSolutionId
}) => {
  const [activeSolutionId, setActiveSolutionId] = useState<string>(
    initialSolutionId || SOLUTIONS[0].id
  );

  const activeSolution = SOLUTIONS.find(s => s.id === activeSolutionId) || SOLUTIONS[0];

  const solutionIcons: Record<string, React.ReactNode> = {
    'chung-cu-can-ho': <Building2 className="w-5 h-5" />,
    'van-phong-toa-nha': <Building className="w-5 h-5" />,
    'trung-tam-thuong-mai': <Store className="w-5 h-5" />,
    'nha-xuong-khu-cong-nghiep': <Factory className="w-5 h-5" />,
    'benh-vien-truong-hoc': <School className="w-5 h-5" />,
    'khach-san-resort': <Hotel className="w-5 h-5" />,
  };

  return (
    <div className="w-full bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <span className="w-1 h-3.5 bg-red-600 inline-block rounded-xs"></span>
            <span>GIẢI PHÁP PCCC CHUYÊN SÂU</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            GIẢI PHÁP AN TOÀN CHO TỪNG LOẠI HÌNH CÔNG TRÌNH
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Mỗi loại hình kiến trúc đòi hỏi tiêu chuẩn ngăn khói, thoát hiểm và giới hạn chịu lửa EI đặc thù. APEX cung cấp phương án trọn gói tối ưu chi phí đầu tư.
          </p>
        </div>

        {/* 6 Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {SOLUTIONS.map((sol) => (
            <button
              key={sol.id}
              onClick={() => {
                setActiveSolutionId(sol.id);
                onNavigate('solutions', sol.id);
              }}
              className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 text-center transition-all ${
                activeSolutionId === sol.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-700 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300'
              }`}
            >
              <div className={`${activeSolutionId === sol.id ? 'text-red-400' : 'text-slate-500'}`}>
                {solutionIcons[sol.id]}
              </div>
              <span className="line-clamp-2">{sol.title}</span>
            </button>
          ))}
        </div>

        {/* Active Solution Details Container */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8 space-y-8">
          
          {/* Top Banner */}
          <div className="border-b border-neutral-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                Phân tích giải pháp chuyên biệt
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Giải Pháp PCCC Cho {activeSolution.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 italic">
                "{activeSolution.tagline}"
              </p>
            </div>

            <button
              onClick={onOpenQuote}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm self-start md:self-auto"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Yêu cầu khảo sát công trình</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {activeSolution.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left: Challenges */}
            <div className="bg-amber-50/60 rounded-xl p-5 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Thách thức & Rủi ro hỏa hoạn đặc thù</span>
              </div>
              <ul className="space-y-2 text-xs text-amber-950">
                {activeSolution.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5"></span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Recommended Systems */}
            <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hệ thống thiết bị APEX đề xuất</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {activeSolution.recommendedProducts.map((prod, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5"></span>
                    <span className="font-medium text-slate-900">{prod}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Standards & Case Study Bar */}
          <div className="pt-6 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider">
                <FileCheck className="w-4 h-4" />
                <span>Quy chuẩn & Pháp lý bắt buộc:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeSolution.standards.map((std, i) => (
                  <span key={i} className="bg-slate-800 text-slate-200 px-2.5 py-1 rounded-md text-[11px] font-mono">
                    {std}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-red-50 text-slate-900 rounded-xl border border-red-100 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                  Dự án triển khai thực tế tiêu biểu
                </span>
                <p className="font-bold text-slate-900 text-xs mt-1">
                  {activeSolution.caseStudy}
                </p>
              </div>
              <button
                onClick={() => onNavigate('projects')}
                className="text-xs font-bold text-red-600 hover:text-red-700 mt-2 flex items-center gap-1"
              >
                <span>Xem hồ sơ dự án</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
