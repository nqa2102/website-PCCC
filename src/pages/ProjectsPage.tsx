import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  UserCheck, 
  Layers, 
  ArrowRight, 
  X,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { PROJECTS } from '../data/mockData';
import { Project } from '../types';

interface ProjectsPageProps {
  onOpenQuote: () => void;
  initialProjectId?: string;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onOpenQuote,
  initialProjectId
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(
    initialProjectId ? (PROJECTS.find(p => p.id === initialProjectId) || null) : null
  );

  const filters = [
    { id: 'all', label: 'Tất cả dự án' },
    { id: 'commercial', label: 'Trung tâm thương mại & Văn phòng' },
    { id: 'residential', label: 'Chung cư cao tầng & Đô thị' },
    { id: 'industrial', label: 'Nhà máy & Khu công nghiệp' },
    { id: 'healthcare', label: 'Bệnh viện & Y tế' },
  ];

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return PROJECTS;
    return PROJECTS.filter(p => p.category === selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="w-full bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <span className="w-1 h-3.5 bg-red-600 inline-block rounded-xs"></span>
            <span>HỒ SƠ NĂNG LỰC DỰ ÁN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            HỒ SƠ DỰ ÁN APEX VIỆT NAM
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Thông tin và hình ảnh dự án sẽ được công bố sau khi hoàn tất hồ sơ và quyền sử dụng tư liệu.
          </p>
        </div>

        {/* Filter Bar */}
        {PROJECTS.length > 0 && <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedFilter === f.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col"
            >
              <div className="relative h-64 bg-neutral-200 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-xs">
                  {project.categoryLabel}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span>{project.location}</span>
                    <span className="mx-1">·</span>
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-900">Chủ đầu tư:</strong> {project.client}
                  </div>
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-900">Quy mô:</strong> {project.scale}
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
                    <span className="font-bold text-slate-800 block mb-1">Hạng mục PCCC cung cấp:</span>
                    <p className="text-red-700 font-semibold">{project.itemsSupplied}</p>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">
                    {project.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="text-xs font-bold text-slate-900 hover:text-red-600 flex items-center gap-1 transition-colors"
                  >
                    <span>Xem chi tiết dự án</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onOpenQuote}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Tư vấn dự án tương tự →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {PROJECTS.length === 0 && (
          <div className="border-y border-neutral-200 bg-white px-6 py-14 sm:px-10">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <h2 className="mt-4 text-xl font-bold text-slate-900">Hồ sơ dự án đang được cập nhật</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">APEX chỉ công bố dự án sau khi thông tin, hình ảnh và phạm vi cung cấp đã được xác nhận. Bạn vẫn có thể gửi yêu cầu để nhận phương án phù hợp với công trình hiện tại.</p>
            <button onClick={onOpenQuote} className="mt-6 inline-flex items-center gap-2 bg-red-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-red-700">
              Gửi yêu cầu tư vấn <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200 my-auto">
            <div className="relative h-48 sm:h-64 bg-slate-900 shrink-0">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                  {activeProject.categoryLabel}
                </span>
                <h2 className="text-base sm:text-xl font-bold mt-1 leading-snug">{activeProject.title}</h2>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">Chủ đầu tư</span>
                  <span className="font-bold text-slate-800">{activeProject.client}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Vị trí</span>
                  <span className="font-bold text-slate-800">{activeProject.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Quy mô công trình</span>
                  <span className="font-bold text-slate-800">{activeProject.scale}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Năm hoàn thành</span>
                  <span className="font-bold text-slate-800">{activeProject.year}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase text-xs mb-1.5">
                  Chi tiết triển khai & Nghiệm thu
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Công trình đã hoàn tất nghiệm thu và được cấp biên bản kiểm tra PCCC đạt chuẩn đi vào vận hành.
                </span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex justify-end gap-2">
              <button
                onClick={() => setActiveProject(null)}
                className="px-4 py-2 border border-neutral-200 text-xs font-semibold rounded-lg hover:bg-neutral-100"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setActiveProject(null);
                  onOpenQuote();
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg"
              >
                Liên hệ kinh doanh
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
