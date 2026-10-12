import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  FileCheck,
  MapPin,
  MessageSquareText,
  ShieldCheck,
} from 'lucide-react';
import type { Project } from '../../types';
import { ProjectGallery } from './ProjectGallery';

interface ProjectDetailLayoutProps {
  project: Project;
  onBack: () => void;
  onOpenQuote: () => void;
}

export const ProjectDetailLayout: React.FC<ProjectDetailLayoutProps> = ({
  project,
  onBack,
  onOpenQuote,
}) => {
  // Schema.org CreativeWork cho dự án đã được xác minh
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

    if (project.coverImage || project.image) {
      schemaData.image = project.coverImage || project.image;
    }

    schemaScript.textContent = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);

    return () => {
      const el = document.getElementById(`project-schema-${project.id}`);
      if (el) el.remove();
    };
  }, [project]);

  const cover = project.coverImage || project.image;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button & Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition-colors hover:text-red-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại danh sách dự án tiêu biểu</span>
        </button>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Dự án: {project.categoryLabel || 'Tiêu biểu'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left column: Cover & Gallery */}
        <div className="space-y-6 lg:col-span-7">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
            {cover ? (
              <img
                src={cover}
                alt={`Dự án ${project.title} - APEX Việt Nam`}
                className="h-full w-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-500">
                <Building2 className="h-16 w-16" />
              </div>
            )}
            <div className="absolute left-4 top-4 flex gap-2">
              <span className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-xs">
                {project.categoryLabel || 'Dự án thực tế'}
              </span>
              {project.verified && (
                <span className="inline-flex items-center gap-1 rounded bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow-xs">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Đã xác minh thông tin</span>
                </span>
              )}
            </div>
          </div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <ProjectGallery images={project.gallery} projectTitle={project.title} />
          )}

          {/* Mô tả triển khai dự án */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">
              Chi tiết triển khai & Nghiệm thu công trình
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
              <p>{project.description}</p>
            </div>

            {project.verified && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-900">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <div className="space-y-1">
                  <strong className="font-bold">Hồ sơ xác minh nghiệm thu thực tế</strong>
                  <p className="text-emerald-800">
                    Dự án đã được ban lãnh đạo APEX đối chiếu hợp đồng, biên bản giao nhận hàng hóa và xác nhận được phép công bố tư liệu theo thỏa thuận bảo mật với chủ đầu tư.
                  </p>
                  {project.verifiedNote && (
                    <p className="font-mono text-[11px] text-emerald-700">
                      Ghi chú xác minh: {project.verifiedNote}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Project metadata & CTA */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h1 className="text-2xl font-black text-slate-950 sm:text-3xl">
              {project.title}
            </h1>

            <div className="mt-6 space-y-4 divide-y divide-slate-100 text-xs">
              {project.clientName && (
                <div className="flex justify-between py-2.5">
                  <span className="font-medium text-slate-500">Chủ đầu tư / Đối tác:</span>
                  <span className="font-bold text-slate-900">{project.clientName}</span>
                </div>
              )}

              {project.location && (
                <div className="flex justify-between py-2.5">
                  <span className="flex items-center gap-1 font-medium text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-red-500" />
                    <span>Địa điểm công trình:</span>
                  </span>
                  <span className="font-bold text-slate-900">{project.location}</span>
                </div>
              )}

              {(project.completedYear || project.year) && (
                <div className="flex justify-between py-2.5">
                  <span className="flex items-center gap-1 font-medium text-slate-500">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>Năm hoàn thành:</span>
                  </span>
                  <span className="font-bold text-slate-900">{project.completedYear || project.year}</span>
                </div>
              )}

              {project.scale && (
                <div className="flex justify-between py-2.5">
                  <span className="font-medium text-slate-500">Quy mô công trình:</span>
                  <span className="font-bold text-slate-900">{project.scale}</span>
                </div>
              )}

              {project.itemsSupplied && (
                <div className="py-2.5">
                  <span className="block font-medium text-slate-500">Hạng mục PCCC APEX cung cấp:</span>
                  <span className="mt-1 block rounded-lg bg-red-50 p-2.5 font-bold text-red-700">
                    {project.itemsSupplied}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-2 border-t border-slate-100 pt-5">
              <button
                onClick={onOpenQuote}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-xs font-bold text-white shadow-sm transition-colors hover:bg-red-700"
              >
                <MessageSquareText className="h-4 w-4" />
                <span>Tư vấn giải pháp cho dự án tương tự</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-600">
            <h4 className="flex items-center gap-1.5 font-bold text-slate-900">
              <FileCheck className="h-4 w-4 text-emerald-600" />
              <span>Tiêu chuẩn công bố dự án APEX</span>
            </h4>
            <p className="mt-2 leading-relaxed text-slate-600">
              Mọi dự án xuất hiện trên website APEX đều là công trình thật có văn bản nghiệm thu hoặc biên bản bàn giao, cam kết không sử dụng hình ảnh từ bất kỳ đối thủ cạnh tranh nào trên thị trường.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
