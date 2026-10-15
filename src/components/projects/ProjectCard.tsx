import React from 'react';
import { ArrowRight, Award, Building2, Calendar, MapPin } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onViewDetail: (project: Project) => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewDetail,
  className = '',
}) => {
  const cover = project.coverImage || project.image;
  const hasRealImage = Boolean(cover && !cover.includes('placeholder'));
  const altText = hasRealImage
    ? `Dự án ${project.title} - APEX Việt Nam`
    : `Dự án ${project.title} (Hình ảnh minh họa) - APEX Việt Nam`;

  const projectUrl = `/du-an/${encodeURIComponent(project.slug || project.id)}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onViewDetail(project);
  };

  return (
    <div
      className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg ${className}`}
    >
      <div>
        {/* Cover image (tỉ lệ chuẩn 4:3 theo wireframe Phase 2) */}
        <a
          href={projectUrl}
          onClick={handleClick}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-900"
          tabIndex={-1}
        >
          {cover ? (
            <img
              src={cover}
              alt={altText}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-400">
              <Building2 className="h-10 w-10 text-slate-500" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
            <span className="rounded bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase text-white shadow-xs">
              {project.categoryLabel || 'Dự án thực tế'}
            </span>
          </div>

          {/* Location & Year footer on image */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              {project.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="line-clamp-1">{project.location}</span>
                </span>
              )}
              {(project.year || project.completedYear) && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 shrink-0">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>Năm {project.completedYear || project.year}</span>
                  </span>
                </>
              )}
            </div>
            <h3 className="mt-1 line-clamp-1 text-base font-bold text-white group-hover:text-red-400">
              {project.title}
            </h3>
          </div>
        </a>

        {/* Nội dung chi tiết card */}
        <div className="space-y-3 p-5">
          {/* Nhãn vai trò APEX (nếu có) */}
          {project.apexRole && (
            <div className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-amber-200/80 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">
              <Award className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span className="line-clamp-1">Vai trò: {project.apexRole}</span>
            </div>
          )}

          {project.clientName && (
            <div className="text-xs text-slate-600">
              <strong className="text-slate-900">Chủ đầu tư:</strong> {project.clientName}
            </div>
          )}

          {project.generalContractor && (
            <div className="text-xs text-slate-600">
              <strong className="text-slate-900">Tổng thầu:</strong> {project.generalContractor}
            </div>
          )}

          <p className="line-clamp-2 text-xs leading-5 text-slate-600">
            {project.description}
          </p>

          {project.itemsSupplied && (
            <div className="rounded-lg bg-slate-50 p-2.5 text-xs text-slate-700">
              <span className="font-semibold text-slate-900">Hạng mục APEX cung cấp:</span>{' '}
              <span className="text-red-700">{project.itemsSupplied}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="border-t border-slate-100 bg-slate-50/50 p-4">
        <a
          href={projectUrl}
          onClick={handleClick}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2 text-xs font-bold text-slate-800 transition-colors hover:border-red-600 hover:text-red-600"
        >
          <span>Xem chi tiết dự án & hồ sơ</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
};
