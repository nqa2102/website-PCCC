import React, { useEffect, useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  FileText,
  HardHat,
  Layers,
  MapPin,
  MessageCircle,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  UserCheck,
  ZoomIn,
  X,
} from 'lucide-react';
import type { Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { PRODUCT_CATEGORY_LABELS } from '../../routing';
import { COMPANY_INFO } from '../../data/companyData';
import { useLiveData } from '../../admin/adminData';
import { getProjectCaseStudy } from '../../data/projectDetails';

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

  // Lấy dữ liệu case study hoàn chỉnh (dựa trên slug hoặc tự động fallback sinh động)
  const caseStudy = useMemo(() => getProjectCaseStudy(project), [project]);

  // Danh sách ảnh từ photoStory
  const photoList = useMemo(() => {
    if (caseStudy.photoStory && caseStudy.photoStory.length > 0) {
      return caseStudy.photoStory;
    }
    const cover = project.coverImage || project.image;
    const gallery = Array.isArray(project.gallery) ? project.gallery : [];
    const urls = Array.from(new Set([cover, ...gallery].filter(Boolean))) as string[];
    return urls.map((url, idx) => ({
      url,
      title: `Hình ảnh thi công tại ${project.title} (${idx + 1})`,
      caption: `Ghi nhận quá trình thi công và nghiệm thu thực tế hạng mục tại công trình.`,
      tag: idx === 0 ? 'Toàn cảnh' : 'Hiện trường',
    }));
  }, [caseStudy, project]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Đóng lightbox khi ấn ESC hoặc phím mũi tên chuyển ảnh
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photoList.length : null));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photoList.length) % photoList.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photoList.length]);

  // Schema.org CreativeWork cho dự án
  useEffect(() => {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = `project-schema-${project.id}`;

    const schemaData: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description || caseStudy.contextLead,
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

    if (photoList[0]?.url) {
      schemaData.image = photoList[0].url;
    }

    schemaScript.textContent = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);

    return () => {
      const el = document.getElementById(`project-schema-${project.id}`);
      if (el) el.remove();
    };
  }, [project, caseStudy, photoList]);

  // Danh sách 3 dự án khác cùng danh mục hoặc liên quan
  const relatedProjects = useMemo(() => {
    const otherProjects = allProjects.filter(
      (p) => p.id !== project.id && p.slug !== project.slug
    );
    const sameCat = otherProjects.filter((p) => p.category === project.category);
    const diffCat = otherProjects.filter((p) => p.category !== project.category);
    return [...sameCat, ...diffCat].slice(0, 3);
  }, [allProjects, project]);

  const categoryName = PRODUCT_CATEGORY_LABELS[project.category] || project.categoryLabel || project.category || 'Cửa ngăn cháy';

  return (
    <article className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. Thanh Breadcrumb điều hướng */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1 font-semibold text-slate-700 transition-colors hover:text-red-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Dự án thi công</span>
            </button>
            <span>/</span>
            <span className="font-medium text-slate-600">{categoryName}</span>
            <span>/</span>
            <span className="max-w-[240px] truncate font-bold text-slate-900 sm:max-w-md">
              {project.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8">
        {/* 2. Tiêu Đề Bài Báo Cáo Công Trình & Huy Hiệu Chứng Nhận */}
        <header className="mb-8 border-b border-slate-200/80 pb-8 sm:mb-10 sm:pb-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-600/20">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Đã nghiệm thu PCCC hoàn thành</span>
            </span>
            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
              {categoryName}
            </span>
            {(project.completedYear || project.year) && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                Bàn giao năm {project.completedYear || project.year}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl lg:leading-tight">
            Cung cấp & thi công hệ thống {categoryName.toLowerCase()} cho dự án {project.title}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base lg:max-w-4xl">
            {caseStudy.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-medium text-slate-600 sm:text-sm">
            {project.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-red-600 shrink-0" />
                <span>Địa điểm: <strong>{project.location}</strong></span>
              </div>
            )}
            {project.clientName && (
              <div className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
                <span>Chủ đầu tư: <strong>{project.clientName}</strong></span>
              </div>
            )}
            {project.generalContractor && (
              <div className="flex items-center gap-1.5">
                <HardHat className="h-4 w-4 text-slate-400 shrink-0" />
                <span>Tổng thầu: <strong>{project.generalContractor}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Đơn vị thực hiện: <strong>APEX Việt Nam</strong></span>
            </div>
          </div>
        </header>

        {/* 3. Khung Bố Cục 2 Cột: Nội dung bài viết công trình (Trái) & Factsheet + Box hỗ trợ (Phải) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* CỘT TRÁI (8 CỘT): Toàn bộ nội dung triển khai, hạng mục cung cấp & phóng sự ảnh hiện trường */}
          <div className="space-y-10 lg:col-span-8">
            {/* Ảnh đại diện nổi bật của công trình */}
            {photoList[0] && (
              <figure className="space-y-2">
                <div
                  onClick={() => setLightboxIndex(0)}
                  className="group relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-md transition-all hover:shadow-lg"
                >
                  <img
                    src={photoList[0].url}
                    alt={photoList[0].title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                  <div className="absolute top-3 left-3 rounded-lg bg-red-600/90 px-3 py-1 text-xs font-bold text-white shadow-xs backdrop-blur-xs">
                    Ảnh thực tế tại công trình
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xs">
                    <ZoomIn className="h-3.5 w-3.5" />
                    <span>Xem ảnh lớn</span>
                  </div>
                </div>
                <figcaption className="text-center text-xs italic text-slate-500 sm:text-left">
                  {photoList[0].title} — {photoList[0].caption}
                </figcaption>
              </figure>
            )}

            {/* Mục 1: Bối cảnh công trình & Yêu cầu kỹ thuật */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-xs font-black text-red-600">
                  01
                </span>
                <h2 className="text-lg font-black text-slate-950 sm:text-xl">
                  Bối cảnh công trình & Yêu cầu kỹ thuật
                </h2>
              </div>

              <div className="mt-4 space-y-3.5 text-xs leading-relaxed text-slate-700 sm:text-sm">
                <p className="font-medium text-slate-900">
                  {caseStudy.contextLead}
                </p>
                <p className="text-slate-600">
                  {caseStudy.contextBody}
                </p>
              </div>

              {/* Tiêu chuẩn PCCC áp dụng */}
              <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5">
                <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800 sm:text-sm">
                  <FileText className="h-4 w-4 text-red-600" />
                  <span>Quy chuẩn & Tiêu chuẩn PCCC áp dụng:</span>
                </h3>
                <ul className="mt-3 space-y-2 text-xs text-slate-700 sm:text-sm">
                  {caseStudy.standards.map((std, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{std}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Mục 2: Hạng mục APEX cung cấp cho dự án */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-xs font-black text-red-600">
                  02
                </span>
                <h2 className="text-lg font-black text-slate-950 sm:text-xl">
                  Hạng mục APEX cung cấp & thi công tại dự án
                </h2>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-600 sm:text-sm">
                {caseStudy.scopeIntro}
              </p>

              {/* Bảng danh sách thiết bị & vị trí lắp đặt */}
              <div className="mt-5 space-y-3">
                {caseStudy.suppliedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-2 rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-colors hover:border-slate-300 hover:bg-slate-50 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="space-y-1 sm:max-w-[70%]">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {item.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 pl-7">
                        {item.spec}
                      </p>
                    </div>

                    {item.locationScope && (
                      <div className="pl-7 sm:pl-0 sm:text-right">
                        <span className="inline-block rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs border border-slate-200">
                          {item.locationScope}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Điểm nổi bật về giải pháp kỹ thuật */}
              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 p-4 sm:p-5">
                <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900 sm:text-sm">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <span>Giải pháp kỹ thuật & Ưu thế triển khai:</span>
                </h3>
                <ul className="mt-3 space-y-2 text-xs text-slate-700 sm:text-sm">
                  {caseStudy.technicalHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Mục 3: Phóng sự hình ảnh thực tế tại công trình */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-xs font-black text-red-600">
                    03
                  </span>
                  <h2 className="text-lg font-black text-slate-950 sm:text-xl">
                    Một số hình ảnh thực tế thi công tại dự án
                  </h2>
                </div>
                <span className="hidden text-xs text-slate-400 sm:inline">Bấm vào ảnh để phóng to</span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Hình ảnh thực tế tại công trình ghi nhận quá trình gia công, vận chuyển, lắp đặt các hệ thống{' '}
                <strong className="text-slate-900">{categoryName.toLowerCase()}</strong> và kiểm tra phụ kiện đồng bộ trước khi tiến hành nghiệm thu bàn giao.
              </p>

              {/* Lưới ảnh hiện trường có Caption chi tiết */}
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {photoList.map((photo, idx) => (
                  <figure
                    key={idx}
                    className="group cursor-zoom-in space-y-2 rounded-xl border border-slate-200/90 bg-slate-50/60 p-3 transition-all hover:border-red-600/50 hover:bg-white hover:shadow-md"
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-900">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 opacity-0 transition-opacity group-hover:opacity-100" />
                      {photo.tag && (
                        <span className="absolute top-2.5 left-2.5 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                          {photo.tag}
                        </span>
                      )}
                      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-[11px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-xs">
                        <ZoomIn className="h-3 w-3" />
                        <span>Phóng to</span>
                      </div>
                    </div>
                    <figcaption className="space-y-1 px-1">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-red-600">
                        {photo.title}
                      </h4>
                      <p className="text-[11px] leading-relaxed text-slate-500 line-clamp-2">
                        {photo.caption}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {/* Mục 4: Đánh giá nghiệm thu & Kết luận */}
            <section className="rounded-2xl border border-emerald-200/80 bg-linear-to-b from-emerald-50/50 to-white p-6 shadow-xs sm:p-8">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-xs font-black text-white">
                  04
                </span>
                <h2 className="text-lg font-black text-slate-950 sm:text-xl">
                  Kết quả nghiệm thu & Bàn giao đưa vào sử dụng
                </h2>
              </div>

              <div className="mt-4 space-y-3.5 text-xs leading-relaxed text-slate-700 sm:text-sm">
                <p>{caseStudy.handoverSummary}</p>
              </div>

              {/* Box chứng thực nghiệm thu */}
              <div className="mt-5 grid grid-cols-1 gap-3.5 rounded-xl border border-emerald-200 bg-white p-4.5 sm:grid-cols-2">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Tình trạng nghiệm thu
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{caseStudy.inspectionResults.statusText}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Căn cứ nghiệm thu
                  </span>
                  <div className="font-semibold text-slate-800">
                    {caseStudy.inspectionResults.standardReference}
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2 border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Cam kết bảo hành công trình
                  </span>
                  <div className="text-xs text-slate-700 font-medium">
                    {caseStudy.warrantyText}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* CỘT PHẢI (4 CỘT): Khung Factsheet dự án, Form/CTA nhận báo giá dự án, Hotline, Zalo */}
          <aside className="space-y-6 lg:col-span-4">
            {/* 1. KHUNG HỒ SƠ TỔNG QUAN DỰ ÁN (Project Factsheet) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-red-600" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                    Hồ sơ dự án thi công
                  </h3>
                </div>
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  Hoàn thành
                </span>
              </div>

              {/* Danh sách thông số chi tiết */}
              <dl className="mt-4 divide-y divide-slate-100 text-xs">
                <div className="py-2.5">
                  <dt className="text-slate-400 font-medium">Dự án / Project:</dt>
                  <dd className="mt-0.5 font-bold text-slate-900 text-sm">{project.title}</dd>
                </div>

                {project.clientName && (
                  <div className="py-2.5">
                    <dt className="text-slate-400 font-medium">Chủ đầu tư / Investor:</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">{project.clientName}</dd>
                  </div>
                )}

                {project.generalContractor && (
                  <div className="py-2.5">
                    <dt className="text-slate-400 font-medium">Tổng thầu / General Contractor:</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">{project.generalContractor}</dd>
                  </div>
                )}

                <div className="py-2.5">
                  <dt className="text-slate-400 font-medium">Gói thầu / Tender Package:</dt>
                  <dd className="mt-0.5 font-semibold text-slate-800">{caseStudy.tenderPackage}</dd>
                </div>

                {project.location && (
                  <div className="py-2.5">
                    <dt className="text-slate-400 font-medium">Địa chỉ / Address:</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">{project.location}</dd>
                  </div>
                )}

                <div className="py-2.5">
                  <dt className="text-slate-400 font-medium">Hạng mục APEX cung cấp:</dt>
                  <dd className="mt-0.5 font-bold text-red-600">{categoryName}</dd>
                </div>

                <div className="py-2.5">
                  <dt className="text-slate-400 font-medium">Năm hoàn thành & Nghiệm thu:</dt>
                  <dd className="mt-0.5 font-semibold text-slate-900">
                    Năm {project.completedYear || project.year || 2026}
                  </dd>
                </div>

                <div className="py-2.5">
                  <dt className="text-slate-400 font-medium">Tiêu chuẩn nghiệm thu PCCC:</dt>
                  <dd className="mt-0.5 font-semibold text-emerald-700">QCVN 06:2022/BXD & TCVN 9383:2012</dd>
                </div>
              </dl>

              {/* 2. KHỐI KÊU GỌI HÀNH ĐỘNG DÀNH CHO DỰ ÁN TƯƠNG TỰ */}
              <div className="mt-6 border-t border-slate-100 pt-5 space-y-3">
                <div className="rounded-xl bg-slate-50 p-3.5 text-center">
                  <p className="text-xs font-semibold text-slate-700">
                    Bạn đang lập dự toán hoặc chào thầu cho công trình tương tự?
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Gửi bản vẽ hoặc bóc tách khối lượng để kỹ sư APEX tư vấn phương án kỹ thuật và báo giá nhanh trong 1–2 ngày.
                  </p>
                </div>

                <button
                  onClick={onOpenQuote}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-red-700"
                >
                  <MessageSquareText className="h-4 w-4" />
                  <span>Nhận báo giá dự án tương tự</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
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

              {/* 3. CAM KẾT NĂNG LỰC NHÀ THẦU */}
              <div className="mt-5 rounded-xl border border-amber-200/80 bg-amber-50/70 p-3.5 text-[11px] text-amber-950">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                  <span>Hồ sơ năng lực tham chiếu dự thầu</span>
                </div>
                <p className="mt-1 text-amber-900 leading-relaxed">
                  Cung cấp trọn bộ hồ sơ kiểm định đốt mẫu PCCC, chứng chỉ xuất xưởng CO/CQ và năng lực nhà máy cho các đơn vị tư vấn và tổng thầu.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* 4. Khối Các Dự Án Thực Tế Khác Đã Hoàn Thành */}
        {relatedProjects.length > 0 && (
          <section className="mt-16 border-t border-slate-200/80 pt-12 sm:mt-20 sm:pt-14">
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                  Hồ sơ công trình thực tế
                </span>
                <h3 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
                  Các dự án thi công khác của APEX
                </h3>
              </div>

              <button
                onClick={onBack}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-red-600"
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
          </section>
        )}
      </div>

      {/* 5. LIGHTBOX XEM ẢNH HIỆN TRƯỜNG FULLSCREEN */}
      {lightboxIndex !== null && photoList[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Nút đóng */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-50 rounded-full bg-black/60 p-2.5 text-white transition-colors hover:bg-red-600"
            aria-label="Đóng xem ảnh"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Nút chuyển ảnh trước */}
          {photoList.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photoList.length) % photoList.length : 0));
              }}
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white transition-colors hover:bg-black/90"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Nút chuyển ảnh tiếp */}
          {photoList.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photoList.length : 0));
              }}
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white transition-colors hover:bg-black/90"
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Khung ảnh chính & Caption */}
          <div
            className="relative flex max-h-[90vh] max-w-5xl flex-col items-center overflow-hidden rounded-2xl bg-slate-950 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photoList[lightboxIndex].url}
              alt={photoList[lightboxIndex].title}
              className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
            />
            <div className="mt-3 w-full px-4 text-center">
              <h4 className="text-sm font-bold text-white">
                {photoList[lightboxIndex].title}
              </h4>
              <p className="mt-1 text-xs text-slate-300">
                {photoList[lightboxIndex].caption}
              </p>
              <span className="mt-2 inline-block rounded bg-white/10 px-2 py-0.5 text-[11px] text-slate-400">
                Ảnh {lightboxIndex + 1} / {photoList.length} — {project.title}
              </span>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
