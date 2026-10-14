import React, { useEffect, useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  FileCheck,
  HardHat,
  Layers,
  MapPin,
  MessageCircle,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
  UserCheck,
  ZoomIn,
  X,
} from 'lucide-react';
import type { Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { PRODUCT_CATEGORY_LABELS } from '../../routing';
import { COMPANY_INFO } from '../../data/companyData';
import { useLiveData } from '../../admin/adminData';

interface ProjectDetailLayoutProps {
  project: Project;
  onBack: () => void;
  onOpenQuote: () => void;
  onNavigate?: (tab: string, itemId?: string) => void;
  allProjects?: Project[];
  onSelectProject?: (project: Project) => void;
}

export const ProjectDetailLayout: React.FC<ProjectDetailLayoutProps> = ({
  project,
  onBack,
  onOpenQuote,
  onNavigate,
  allProjects = [],
  onSelectProject,
}) => {
  const { company } = useLiveData();
  const hotlineDisplay = company?.hotlineDisplay || COMPANY_INFO.hotlineDisplay;
  const hotlineHref = company?.hotlineHref || COMPANY_INFO.hotlineHref;
  const zaloHref = company?.zaloHref || COMPANY_INFO.zaloHref;

  // Tổng hợp danh sách ảnh: coverImage + gallery (loại bỏ trùng lặp)
  const allImages = useMemo(() => {
    const list: string[] = [];
    const cover = project.coverImage || project.image;
    if (cover) list.push(cover);
    if (Array.isArray(project.gallery)) {
      project.gallery.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    return list;
  }, [project]);

  // Thư viện ảnh thi công (phần còn lại của gallery ngoài ảnh bìa)
  const constructionGallery = useMemo(() => {
    if (!Array.isArray(project.gallery)) return [];
    const cover = project.coverImage || project.image;
    return project.gallery.filter((img) => Boolean(img) && img !== cover);
  }, [project]);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Reset active image khi đổi dự án
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project.id, project.slug]);

  // Schema.org CreativeWork cho dự án
  useEffect(() => {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = `project-schema-${project.id}`;

    const schemaData: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      creator: {
        '@type': 'Organization',
        name: 'Công ty TNHH Apex VN',
      },
    };

    if (project.location) {
      schemaData.contentLocation = {
        '@type': 'Place',
        name: project.location,
      };
    }

    if (project.completedYear || project.year) {
      schemaData.dateCreated = String(project.completedYear || project.year);
    }

    if (allImages[0]) {
      schemaData.image = allImages[0];
    }

    schemaScript.textContent = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);

    return () => {
      const el = document.getElementById(`project-schema-${project.id}`);
      if (el) el.remove();
    };
  }, [project, allImages]);

  // Hỗ trợ phím mũi tên chuyển ảnh thumbnail
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveImageIndex(index);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveImageIndex((prev) => (prev + 1) % allImages.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  // Dự án khác: 3 dự án công khai khác (ưu tiên cùng category)
  const relatedProjects = useMemo(() => {
    const otherProjects = allProjects.filter(
      (p) => p.id !== project.id && p.slug !== project.slug
    );
    const sameCat = otherProjects.filter((p) => p.category === project.category);
    const diffCat = otherProjects.filter((p) => p.category !== project.category);
    return [...sameCat, ...diffCat].slice(0, 3);
  }, [allProjects, project]);

  const categoryName = PRODUCT_CATEGORY_LABELS[project.category] || project.categoryLabel || project.category;
  const currentImage = allImages[activeImageIndex] || allImages[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      {/* 1. Breadcrumb & Nút quay lại */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 font-semibold text-slate-700 transition-colors hover:text-red-600"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Danh sách dự án</span>
        </button>
        <span>/</span>
        <span className="text-slate-500">{categoryName}</span>
        <span>/</span>
        <span className="max-w-[200px] truncate font-bold text-slate-900 sm:max-w-md">{project.title}</span>
      </nav>

      {/* 2. Tiêu đề dự án & Meta Badge Bar */}
      <div className="mb-8 border-b border-slate-200/80 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-xs">
            {categoryName}
          </span>
          {project.verified && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow-xs">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Đã xác minh nghiệm thu thực tế</span>
            </span>
          )}
        </div>

        <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
          {project.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 sm:text-sm">
          {project.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-red-600 shrink-0" />
              <span>{project.location}</span>
            </span>
          )}
          {(project.completedYear || project.year) && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
              <span>Năm hoàn thành: <strong>{project.completedYear || project.year}</strong></span>
            </span>
          )}
        </div>
      </div>

      {/* 3. Khối Nội dung chính: Ảnh lớn + Thư viện & Bảng thông tin */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Cột trái: Ảnh lớn + Thư viện ảnh + Mô tả (7 cột) */}
        <div className="space-y-8 lg:col-span-7">
          {/* Ảnh lớn chính (Interactive) */}
          <div className="space-y-3">
            <div
              onClick={() => currentImage && setLightboxOpen(true)}
              className="group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm sm:aspect-[16/10]"
            >
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={`Hình ảnh dự án ${project.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-500">
                  <Building2 className="h-16 w-16" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xs">
                <ZoomIn className="h-3.5 w-3.5" />
                <span>Xem ảnh lớn</span>
              </div>
            </div>

            {/* Thư viện thumbnail nhỏ (bấm đổi ảnh, hỗ trợ bàn phím & aria) */}
            {allImages.length > 1 && (
              <div
                role="tablist"
                aria-label="Danh sách ảnh dự án"
                className="grid grid-cols-4 gap-2.5 sm:grid-cols-5"
              >
                {allImages.map((img, idx) => {
                  const isSelected = idx === activeImageIndex;
                  return (
                    <button
                      key={idx}
                      role="tab"
                      aria-selected={isSelected}
                      aria-label={`Ảnh ${idx + 1} của dự án`}
                      tabIndex={0}
                      onClick={() => setActiveImageIndex(idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className={`relative aspect-[4/3] overflow-hidden rounded-xl border transition-all ${
                        isSelected
                          ? 'border-red-600 ring-2 ring-red-600/30 shadow-xs'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Ảnh nhỏ ${idx + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mô tả triển khai công trình */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-7">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-950 sm:text-lg">
              <span className="inline-block h-4 w-1 rounded-xs bg-red-600" />
              <span>Nội dung triển khai & Nghiệm thu công trình</span>
            </h2>
            <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-700 sm:text-sm">
              <p className="whitespace-pre-line">{project.description}</p>
            </div>

            {/* Hộp cam kết thẩm định nghiệm thu */}
            {project.verified && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-950">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <div className="space-y-1">
                  <strong className="font-bold text-slate-900">Cam kết xác minh nghiệm thu thực tế</strong>
                  <p className="text-emerald-800">
                    Hồ sơ công trình này đã được APEX kiểm duyệt đối chiếu theo biên bản nghiệm thu PCCC và thỏa thuận công bố tư liệu với chủ đầu tư. Tuyệt đối không sao chép thông tin từ bên thứ ba.
                  </p>
                  {project.verifiedNote && (
                    <p className="font-mono text-[11px] text-emerald-700 pt-1 border-t border-emerald-200/60 mt-1">
                      Căn cứ xác minh: {project.verifiedNote}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Thư viện ảnh thi công & nghiệm thu hiện trường (phần còn lại của gallery) */}
          {constructionGallery.length > 0 && (
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-7">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-base font-bold text-slate-950 sm:text-lg">
                  <span className="inline-block h-4 w-1 rounded-xs bg-red-600" />
                  <span>Hình ảnh thi công & Nghiệm thu tại công trình ({constructionGallery.length})</span>
                </h3>
                <span className="text-xs text-slate-400">Bấm để phóng to</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {constructionGallery.map((img, idx) => {
                  const fullIndex = allImages.indexOf(img);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (fullIndex !== -1) setActiveImageIndex(fullIndex);
                        setLightboxOpen(true);
                      }}
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 transition-all hover:border-red-600 hover:shadow-md focus:outline-hidden focus:ring-2 focus:ring-red-600"
                    >
                      <img
                        src={img}
                        alt={`Ảnh thi công ${idx + 1} - ${project.title}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30 opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="flex items-center gap-1 rounded-lg bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                          <ZoomIn className="h-3 w-3" />
                          <span>Phóng to</span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Cột phải: Bảng thông tin chi tiết (UC6) + CTA Bar (5 cột) */}
        <div className="space-y-6 lg:col-span-5">
          {/* Bảng thông tin dự án (UC6: trường trống tự ẩn dòng) */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-7">
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
              Thông tin tổng quan dự án
            </h2>
            <div className="mt-5 divide-y divide-slate-100 text-xs sm:text-sm">
              {/* Chủ đầu tư */}
              {project.clientName && (
                <div className="flex justify-between gap-4 py-3">
                  <span className="flex items-center gap-1.5 font-medium text-slate-500 shrink-0">
                    <UserCheck className="h-4 w-4 text-slate-400" />
                    <span>Chủ đầu tư:</span>
                  </span>
                  <span className="text-right font-bold text-slate-900">{project.clientName}</span>
                </div>
              )}

              {/* Tổng thầu (UC6: ẩn nếu trống) */}
              {project.generalContractor && (
                <div className="flex justify-between gap-4 py-3">
                  <span className="flex items-center gap-1.5 font-medium text-slate-500 shrink-0">
                    <HardHat className="h-4 w-4 text-slate-400" />
                    <span>Tổng thầu:</span>
                  </span>
                  <span className="text-right font-bold text-slate-900">{project.generalContractor}</span>
                </div>
              )}

              {/* Hạng mục */}
              {categoryName && (
                <div className="flex justify-between gap-4 py-3">
                  <span className="flex items-center gap-1.5 font-medium text-slate-500 shrink-0">
                    <Layers className="h-4 w-4 text-slate-400" />
                    <span>Hạng mục:</span>
                  </span>
                  <span className="text-right font-bold text-red-600">{categoryName}</span>
                </div>
              )}

              {/* Vai trò APEX (UC6: ẩn nếu trống) */}
              {project.apexRole && (
                <div className="py-3">
                  <span className="flex items-center gap-1.5 font-medium text-slate-500">
                    <Award className="h-4 w-4 text-amber-600" />
                    <span>Vai trò APEX tại dự án:</span>
                  </span>
                  <div className="mt-1.5 rounded-lg border border-amber-200/80 bg-amber-50 p-2.5 font-bold text-amber-950">
                    {project.apexRole}
                  </div>
                </div>
              )}

              {/* Thời gian hoàn thành */}
              {(project.completedYear || project.year) && (
                <div className="flex justify-between gap-4 py-3">
                  <span className="flex items-center gap-1.5 font-medium text-slate-500 shrink-0">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>Thời gian nghiệm thu:</span>
                  </span>
                  <span className="text-right font-bold text-slate-900">
                    Năm {project.completedYear || project.year}
                  </span>
                </div>
              )}

              {/* Địa điểm */}
              {project.location && (
                <div className="flex justify-between gap-4 py-3">
                  <span className="flex items-center gap-1.5 font-medium text-slate-500 shrink-0">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>Địa điểm:</span>
                  </span>
                  <span className="text-right font-bold text-slate-900">{project.location}</span>
                </div>
              )}

              {/* Hạng mục sản phẩm chi tiết nếu có */}
              {project.itemsSupplied && (
                <div className="py-3">
                  <span className="block font-medium text-slate-500">Gói vật tư PCCC cung cấp:</span>
                  <div className="mt-1.5 rounded-lg bg-slate-50 p-2.5 font-semibold text-slate-800">
                    {project.itemsSupplied}
                  </div>
                </div>
              )}
            </div>

            {/* 4. CTA Khối Báo Giá & Hotline */}
            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
              <button
                onClick={onOpenQuote}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-red-700"
              >
                <MessageSquareText className="h-4 w-4" />
                <span>Nhận dự toán & Báo giá dự án tương tự</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={hotlineHref}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-800 transition-colors hover:border-red-600 hover:text-red-600"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-red-600" />
                  <span>{hotlineDisplay}</span>
                </a>

                <a
                  href={zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 py-2.5 text-xs font-bold text-blue-800 transition-colors hover:bg-blue-100"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-blue-600" />
                  <span>Chat Zalo kỹ sư</span>
                </a>
              </div>
            </div>
          </div>

          {/* Box bảo chứng tiêu chuẩn */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-600">
            <h4 className="flex items-center gap-1.5 font-bold text-slate-900">
              <FileCheck className="h-4 w-4 text-red-600" />
              <span>Hồ sơ năng lực tham chiếu dự thầu</span>
            </h4>
            <p className="mt-2 leading-relaxed text-slate-600">
              Quý tổng thầu, chủ đầu tư hoặc đơn vị tư vấn thiết kế cần tài liệu kiểm định đối chiếu hoặc hồ sơ năng lực dự thầu tương tự cho công trình sắp tới, vui lòng liên hệ trực tiếp phòng kỹ thuật APEX để nhận file PDF chính thức.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Khối Dự án khác (3 dự án công khai khác) */}
      {relatedProjects.length > 0 && (
        <div className="mt-14 border-t border-slate-200/80 pt-10 sm:mt-16 sm:pt-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600">
                <span className="inline-block h-3 w-1 rounded-xs bg-red-600" />
                <span>Công trình tiêu biểu</span>
              </div>
              <h3 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
                Các dự án thực tế khác của APEX
              </h3>
            </div>

            <button
              onClick={onBack}
              className="hidden items-center gap-1 text-xs font-bold text-slate-700 hover:text-red-600 sm:inline-flex"
            >
              <span>Xem tất cả dự án</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
            {relatedProjects.map((relPrj) => (
              <ProjectCard
                key={relPrj.id}
                project={relPrj}
                onViewDetail={(p) => {
                  if (onSelectProject) {
                    onSelectProject(p);
                  } else if (onNavigate) {
                    onNavigate('projects', p.slug || p.id);
                  } else if (typeof window !== 'undefined' && window.history?.pushState) {
                    window.history.pushState({}, '', `/du-an/${encodeURIComponent(p.slug || p.id)}`);
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox xem ảnh lớn */}
      {lightboxOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl bg-slate-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage}
              alt={`Ảnh chi tiết - Dự án ${project.title}`}
              className="max-h-[85vh] w-auto object-contain"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white hover:bg-black"
              aria-label="Đóng xem ảnh"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-3 rounded bg-black/60 px-3 py-1 text-xs text-white">
              Ảnh {activeImageIndex + 1} / {allImages.length} — {project.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
