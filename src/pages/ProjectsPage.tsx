import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  FileCheck,
  FolderGit2,
  MapPin,
  MessageSquareText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
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

const PAGE_SIZE = 9;

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onOpenQuote,
  initialProjectId,
  onNavigate,
}) => {
  const { projects } = useLiveData();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

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

  // Reset phân trang khi đổi bộ lọc
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setVisibleCount(PAGE_SIZE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  // UC9: Số liệu uy tín tính toán từ dữ liệu thật, nếu 0 dự án thì ẩn khối số liệu
  const stats = useMemo(() => {
    if (projects.length === 0) return null;

    const uniqueProvinces = new Set<string>();
    projects.forEach((p) => {
      if (p.location) {
        // Tách hoặc lấy chuỗi địa điểm
        const parts = p.location.split(',').map((s) => s.trim());
        const province = parts[parts.length - 1] || p.location;
        if (province) uniqueProvinces.add(province);
      }
    });

    return {
      totalProjects: projects.length,
      provincesCount: uniqueProvinces.size || 1,
    };
  }, [projects]);

  const handleViewDetail = (project: Project) => {
    setActiveProject(project);
    if (onNavigate) {
      onNavigate('projects', project.slug || project.id);
    } else if (typeof window !== 'undefined' && window.history?.pushState) {
      window.history.pushState({}, '', `/du-an/${encodeURIComponent(project.slug || project.id)}`);
    }
  };

  const handleBackToList = () => {
    setActiveProject(null);
    if (onNavigate) {
      onNavigate('projects');
    } else if (typeof window !== 'undefined' && window.history?.pushState) {
      window.history.pushState({}, '', '/du-an');
    }
  };

  // UC4: Nếu truy cập /du-an/:slug mà slug không tồn tại (hoặc chưa verified) -> Hiển thị thông báo thân thiện
  if (initialProjectId && !activeProject) {
    return (
      <div className="min-h-screen w-full bg-neutral-50 py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-1 font-semibold text-slate-700 transition-colors hover:text-red-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Danh sách dự án</span>
            </button>
            <span>/</span>
            <span className="text-slate-400">Không tìm thấy dự án</span>
          </nav>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <ShieldAlert className="h-7 w-7" />
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
              <span>Đang kiểm duyệt hoặc liên kết thay đổi</span>
            </div>

            <h1 className="mt-4 text-xl font-black text-slate-900 sm:text-2xl">
              Không tìm thấy dự án hoặc dự án đang trong quá trình cập nhật kiểm định
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm">
              Dự án bạn tìm kiếm có thể chưa được xác minh nghiệm thu thực tế hoặc chưa hoàn tất văn bản chấp thuận công bố từ chủ đầu tư theo cam kết trung thực của APEX.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleBackToList}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 transition-colors hover:border-red-600 hover:text-red-600"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Xem các dự án khác ({projects.length})</span>
              </button>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-red-700"
              >
                <MessageSquareText className="h-4 w-4" />
                <span>Gửi yêu cầu dự toán</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Nếu đang xem chi tiết một dự án: hiển thị layout chi tiết
  if (activeProject) {
    return (
      <div className="min-h-screen w-full bg-neutral-50 pb-20">
        <ProjectDetailLayout
          project={activeProject}
          onBack={handleBackToList}
          onOpenQuote={onOpenQuote}
          onNavigate={onNavigate}
          allProjects={projects}
          onSelectProject={(p) => {
            handleViewDetail(p);
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />
      </div>
    );
  }

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const remainingCount = filteredProjects.length - displayedProjects.length;

  return (
    <div className="min-h-screen w-full bg-neutral-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8 sm:mb-10">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600">
            <span className="inline-block h-3.5 w-1 rounded-xs bg-red-600" />
            <span>Hồ sơ năng lực công trình</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Dự án tiêu biểu APEX Việt Nam
          </h1>
          <p className="mt-2.5 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-sm">
            Tổng hợp các công trình dân dụng, thương mại và hạ tầng công nghiệp đã triển khai và nghiệm thu PCCC đồng bộ. Toàn bộ hình ảnh và thông tin chỉ công bố khi có đầy đủ biên bản nghiệm thu và văn bản xác nhận từ chủ đầu tư.
          </p>

          {/* UC9: Hàng số liệu uy tín (chỉ hiển thị khi có dữ liệu thật > 0) */}
          {stats && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:max-w-3xl">
              <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs sm:p-4">
                <div className="flex items-center gap-2 text-red-600">
                  <Building2 className="h-4 w-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Dự án công bố</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900 sm:text-3xl">{stats.totalProjects}</span>
                  <span className="text-xs font-semibold text-slate-500">công trình</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs sm:p-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Địa bàn triển khai</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900 sm:text-3xl">{stats.provincesCount}</span>
                  <span className="text-xs font-semibold text-slate-500">tỉnh / thành</span>
                </div>
              </div>

              <div className="col-span-2 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs sm:col-span-1 sm:p-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Kiểm duyệt PCCC</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900 sm:text-3xl">100%</span>
                  <span className="text-xs font-semibold text-slate-500">đã nghiệm thu</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bộ lọc chip theo category (nếu có dự án) */}
        {projects.length > 0 && availableCategories.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-5 sm:mb-8">
            <span className="mr-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              Phân loại:
            </span>
            <button
              onClick={() => handleFilterChange('all')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'border border-neutral-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-neutral-50'
              }`}
            >
              Tất cả ({projects.length})
            </button>
            {availableCategories.map((catKey) => {
              const count = projects.filter((p) => p.category === catKey).length;
              return (
                <button
                  key={catKey}
                  onClick={() => handleFilterChange(catKey)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                    selectedFilter === catKey
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'border border-neutral-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-neutral-50'
                  }`}
                >
                  {PRODUCT_CATEGORY_LABELS[catKey] || catKey} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Lưới thẻ dự án (Lưới grid sm:2 lg:3 theo wireframe) */}
        {projects.length > 0 ? (
          filteredProjects.length > 0 ? (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
                {displayedProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onViewDetail={handleViewDetail}
                  />
                ))}
              </div>

              {/* Phân trang client "Xem thêm" (9 thẻ/lần) */}
              {remainingCount > 0 && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-xs font-bold text-slate-800 shadow-xs transition-all hover:border-red-600 hover:bg-neutral-50 hover:text-red-600"
                  >
                    <span>Xem thêm dự án</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                      +{remainingCount}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Trạng thái bộ lọc không có kết quả */
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-12">
              <FolderGit2 className="mx-auto h-10 w-10 text-slate-400" />
              <h3 className="mt-3 text-base font-bold text-slate-900">
                Chưa có dự án công khai thuộc nhóm này
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Các dự án thuộc phân loại này đang trong quá trình nghiệm thu hoặc chờ văn bản chấp thuận công bố từ chủ đầu tư.
              </p>
              <button
                onClick={() => handleFilterChange('all')}
                className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                Xem tất cả ({projects.length}) dự án
              </button>
            </div>
          )
        ) : (
          /* Trạng thái chuẩn: Chưa có dự án verified được công bố */
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-12 shadow-xs">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Quy trình thẩm định tính trung thực dữ liệu</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Hồ sơ dự án đang được cập nhật & kiểm duyệt xác minh
              </h2>

              <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
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
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-xs font-bold text-white shadow-xs transition-colors hover:bg-red-700"
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
