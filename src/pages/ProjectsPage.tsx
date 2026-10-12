import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { useLiveData } from '../admin/adminData';
import type { Project } from '../types';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectDetailLayout } from '../components/projects/ProjectDetailLayout';
import { PRODUCT_CATEGORY_LABELS } from '../routing';

interface ProjectsPageProps {
  onOpenQuote: () => void;
  initialProjectId?: string;
  onNavigate?: (tab: string, itemId?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onOpenQuote,
  initialProjectId,
  onNavigate,
}) => {
  const { projects } = useLiveData();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(() => {
    if (initialProjectId) {
      return projects.find((p) => p.id === initialProjectId || p.slug === initialProjectId) || null;
    }
    return null;
  });

  useEffect(() => {
    if (initialProjectId) {
      const found = projects.find((p) => p.id === initialProjectId || p.slug === initialProjectId);
      setActiveProject(found || null);
    } else {
      setActiveProject(null);
    }
  }, [initialProjectId, projects]);

  // Bộ lọc danh mục dựa trên các dự án thực tế hiện có trong database
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return projects;
    return projects.filter((p) => p.category === selectedFilter);
  }, [projects, selectedFilter]);

  const handleViewDetail = (project: Project) => {
    setActiveProject(project);
    if (onNavigate) {
      onNavigate('projects', project.slug || project.id);
    }
  };

  const handleBackToList = () => {
    setActiveProject(null);
    if (onNavigate) {
      onNavigate('projects');
    }
  };

  // Nếu đang xem chi tiết một dự án: hiển thị layout chi tiết
  if (activeProject) {
    return (
      <div className="min-h-screen w-full bg-neutral-50 pb-20">
        <ProjectDetailLayout
          project={activeProject}
          onBack={handleBackToList}
          onOpenQuote={onOpenQuote}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-neutral-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600">
            <span className="inline-block h-3.5 w-1 rounded-xs bg-red-600" />
            <span>Hồ sơ năng lực công trình</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 sm:text-3xl">
            Dự án tiêu biểu APEX Việt Nam
          </h1>
          <p className="mt-2 max-w-2xl text-xs text-slate-600 sm:text-sm">
            Thông tin và hình ảnh dự án thực tế chỉ được công bố sau khi đã hoàn tất nghiệm thu và được sự đồng ý xác nhận bằng văn bản của chủ đầu tư.
          </p>
        </div>

        {/* Filter Bar (nếu có dự án) */}
        {projects.length > 0 && availableCategories.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                selectedFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'border border-neutral-200 bg-white text-slate-700 hover:bg-neutral-100'
              }`}
            >
              Tất cả dự án ({projects.length})
            </button>
            {availableCategories.map((catKey) => (
              <button
                key={catKey}
                onClick={() => setSelectedFilter(catKey)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  selectedFilter === catKey
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'border border-neutral-200 bg-white text-slate-700 hover:bg-neutral-100'
                }`}
              >
                {PRODUCT_CATEGORY_LABELS[catKey] || catKey}
              </button>
            ))}
          </div>
        )}

        {/* Project Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetail={handleViewDetail}
              />
            ))}
          </div>
        ) : (
          /* Trạng thái chuẩn: Chưa có dự án verified được công bố */
          <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xs">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Quy trình thẩm định tính trung thực dữ liệu</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Hồ sơ dự án đang được cập nhật & kiểm duyệt xác minh
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                APEX cam kết <strong>tuyệt đối không sao chép hình ảnh hoặc thông tin dự án từ bất kỳ đối thủ cạnh tranh nào</strong> trên thị trường. Mọi công trình xuất hiện trên website phải có hợp đồng cung cấp thật, biên bản nghiệm thu PCCC và văn bản chấp thuận công bố từ chủ đầu tư.
              </p>

              <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <FileCheck className="h-4 w-4 text-red-600" />
                    <span>Hồ sơ năng lực riêng theo ngành</span>
                  </div>
                  <p className="mt-1 text-slate-500">
                    Quý đối tác, tổng thầu hoặc tư vấn thiết kế có thể yêu cầu tài liệu năng lực và danh sách dự án tham chiếu theo từng nhóm công trình cụ thể.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Tư vấn phương án tối ưu</span>
                  </div>
                  <p className="mt-1 text-slate-500">
                    Đội ngũ kỹ sư APEX sẵn sàng bóc tách bản vẽ kỹ thuật, tính toán cấp chịu lửa EI và tối ưu chi phí dự toán cho công trình của bạn.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-xs font-bold text-white shadow-sm transition-colors hover:bg-red-700"
                >
                  <span>Gửi yêu cầu nhận hồ sơ năng lực dự án</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
