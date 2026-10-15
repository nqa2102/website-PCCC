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
  MapPin,
  MessageCircle,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
  Sparkles,
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

  // Lấy dữ liệu case study đầy đủ của dự án (từ projectDetails.ts)
  const caseStudy = useMemo(() => getProjectCaseStudy(project), [project]);

  // Danh sách ảnh thực tế từ photoStory
  const photoList = useMemo(() => {
    return caseStudy.photoStory || [];
  }, [caseStudy]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Phím tắt bàn phím cho Lightbox xem ảnh lớn
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

  // Schema.org CreativeWork cho bài viết dự án
  useEffect(() => {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = `project-schema-${project.id}`;

    const schemaData: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: caseStudy.title || project.title,
      description: caseStudy.contextIntro || project.description,
      creator: {
        '@type': 'Organization',
        name: 'Công ty TNHH Apex VN',
      },
    };

    if (caseStudy.location || project.location) {
      schemaData.contentLocation = {
        '@type': 'Place',
        name: caseStudy.location || project.location,
      };
    }

    if (caseStudy.completedYear) {
      schemaData.dateCreated = String(caseStudy.completedYear);
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

  // 3 dự án thực tế khác để khách hàng tham khảo tiếp
  const relatedProjects = useMemo(() => {
    return allProjects
      .filter((p) => p.id !== project.id && p.slug !== project.slug)
      .slice(0, 3);
  }, [allProjects, project]);

  const categoryName = PRODUCT_CATEGORY_LABELS[project.category] || project.categoryLabel || 'Cửa thép ngăn cháy';

  return (
    <article className="min-h-screen bg-neutral-100/60 pb-20">
      {/* 1. Thanh Breadcrumb điều hướng */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1 font-semibold text-slate-700 transition-colors hover:text-red-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Dự án đã thi công</span>
            </button>
            <span>/</span>
            <span className="font-medium text-slate-600">{categoryName}</span>
            <span>/</span>
            <span className="max-w-[280px] truncate font-bold text-slate-900 sm:max-w-md">
              {caseStudy.title}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. BỐ CỤC TRẢI DÀI LIỀN MẠCH TRONG 1 TRANG (Continuous Single-Page Article Layout) */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-10 lg:p-12">
          {/* Header bài viết công trình */}
          <header className="border-b border-slate-100 pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-600/20">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Đã nghiệm thu PCCC hoàn thành</span>
              </span>
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {categoryName}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                Năm hoàn thành: {caseStudy.completedYear}
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl lg:leading-tight">
              Cung cấp và thi công cửa ngăn cháy dự án {caseStudy.title}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Hồ sơ ghi nhận quá trình sản xuất, lắp đặt và nghiệm thu hoàn thành gói thầu {categoryName.toLowerCase()} do APEX Việt Nam trực tiếp triển khai tại công trình.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 sm:text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-red-600 shrink-0" />
                <span>Địa điểm: <strong className="text-slate-900">{caseStudy.location}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
                <span>Chủ đầu tư: <strong className="text-slate-900">{caseStudy.clientName}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-amber-600 shrink-0" />
                <span>Nhà thầu thi công: <strong className="text-slate-900">APEX Việt Nam</strong></span>
              </div>
            </div>
          </header>

          {/* 3. BẢNG HỒ SƠ THÔNG TIN DỰ ÁN (100% Thuần Việt, dạng bảng kẻ ngang sạch sẽ, không đóng khung hộp) */}
          <section className="mt-8 border-b border-slate-100 pb-8">
            <h2 className="flex items-center gap-2 text-base font-black uppercase tracking-wider text-slate-900 sm:text-lg">
              <FileCheck className="h-5 w-5 text-red-600" />
              <span>Thông tin tổng quan dự án</span>
            </h2>

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/50">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody className="divide-y divide-slate-200/80">
                  <tr>
                    <td className="w-1/3 bg-slate-100/70 px-4 py-3 font-semibold text-slate-600 sm:w-1/4 sm:px-6">
                      Tên dự án / Công trình
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-950 sm:px-6">
                      {caseStudy.title}
                    </td>
                  </tr>

                  <tr>
                    <td className="bg-slate-100/70 px-4 py-3 font-semibold text-slate-600 sm:px-6">
                      Chủ đầu tư
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900 sm:px-6">
                      {caseStudy.clientName}
                    </td>
                  </tr>

                  {caseStudy.generalContractor && (
                    <tr>
                      <td className="bg-slate-100/70 px-4 py-3 font-semibold text-slate-600 sm:px-6">
                        Tổng thầu thi công
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900 sm:px-6">
                        {caseStudy.generalContractor}
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td className="bg-slate-100/70 px-4 py-3 font-semibold text-slate-600 sm:px-6">
                      Địa chỉ công trình
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900 sm:px-6">
                      {caseStudy.location}
                    </td>
                  </tr>

                  <tr>
                    <td className="bg-slate-100/70 px-4 py-3 font-semibold text-slate-600 sm:px-6">
                      Gói thầu thực hiện
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900 sm:px-6">
                      {caseStudy.tenderPackage}
                    </td>
                  </tr>

                  <tr>
                    <td className="bg-slate-100/70 px-4 py-3 font-semibold text-slate-600 sm:px-6">
                      Hạng mục APEX cung cấp
                    </td>
                    <td className="px-4 py-3 font-bold text-red-600 sm:px-6">
                      {categoryName} và phụ kiện PCCC đồng bộ
                    </td>
                  </tr>

                  <tr>
                    <td className="bg-slate-100/70 px-4 py-3 font-semibold text-slate-600 sm:px-6">
                      Thời gian hoàn thành
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900 sm:px-6">
                      {caseStudy.acceptanceDate}
                    </td>
                  </tr>

                  <tr>
                    <td className="bg-slate-100/70 px-4 py-3 font-semibold text-slate-600 sm:px-6">
                      Tiêu chuẩn nghiệm thu PCCC
                    </td>
                    <td className="px-4 py-3 font-medium text-emerald-700 sm:px-6">
                      QCVN 06:2022/BXD, QCVN 03:2023/BCA, TCVN 9383:2012
                    </td>
                  </tr>

                  <tr>
                    <td className="bg-slate-100/70 px-4 py-3 font-semibold text-slate-600 sm:px-6">
                      Tình trạng công trình
                    </td>
                    <td className="px-4 py-3 font-bold text-emerald-700 sm:px-6">
                      Đã nghiệm thu hoàn thành, bàn giao đưa vào khai thác sử dụng
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. NỘI DUNG TRIỂN KHAI THỰC TẾ: Bối cảnh & Yêu cầu công trình */}
          <section className="mt-8 border-b border-slate-100 pb-8">
            <h2 className="text-lg font-black text-slate-950 sm:text-xl">
              1. Bối cảnh công trình và yêu cầu an toàn PCCC
            </h2>

            <div className="mt-4 space-y-3.5 text-xs leading-relaxed text-slate-700 sm:text-sm">
              <p className="font-medium text-slate-900">
                {caseStudy.contextIntro}
              </p>
              <p>
                {caseStudy.contextChallenge}
              </p>
            </div>

            {/* Ảnh đại diện nổi bật của công trình */}
            {photoList[0] && (
              <figure className="mt-6 space-y-2">
                <div
                  onClick={() => setLightboxIndex(0)}
                  className="group relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm"
                >
                  <img
                    src={photoList[0].url}
                    alt={photoList[0].title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xs">
                    <ZoomIn className="h-3.5 w-3.5" />
                    <span>Xem ảnh lớn</span>
                  </div>
                </div>
                <figcaption className="text-center text-xs text-slate-500 italic">
                  Hình 1: {photoList[0].title} — {photoList[0].caption}
                </figcaption>
              </figure>
            )}
          </section>

          {/* 5. HẠNG MỤC CHI TIẾT APEX CUNG CẤP & LẮP ĐẶT */}
          <section className="mt-8 border-b border-slate-100 pb-8">
            <h2 className="text-lg font-black text-slate-950 sm:text-xl">
              2. Các hạng mục APEX cung cấp và thi công tại dự án
            </h2>

            <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
              Căn cứ theo hồ sơ thiết kế bản vẽ thi công và nghiệm thu thực tế, APEX Việt Nam đã sản xuất, vận chuyển và hoàn thiện các hạng mục sau:
            </p>

            {/* Danh sách các hạng mục */}
            <div className="mt-5 space-y-4">
              {caseStudy.suppliedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                        {idx + 1}
                      </span>
                      <h3 className="font-bold text-slate-950 text-sm sm:text-base">
                        {item.name}
                      </h3>
                    </div>
                    {item.locationScope && (
                      <span className="hidden rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 sm:inline-block">
                        {item.locationScope}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 pl-8.5 sm:text-sm">
                    {item.spec}
                  </p>

                  {item.locationScope && (
                    <div className="mt-2 text-xs font-medium text-slate-600 pl-8.5 sm:hidden">
                      <span className="text-slate-400">Vị trí: </span>
                      <span className="text-slate-800">{item.locationScope}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Yêu cầu thi công lắp đặt thực tế */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 sm:text-sm">
                <Sparkles className="h-4 w-4 text-red-600" />
                <span>Yêu cầu kỹ thuật thi công thực tế tại công trình:</span>
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-slate-700 sm:text-sm">
                {caseStudy.installationNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 6. PHÓNG SỰ HÌNH ẢNH THỰC TẾ THI CÔNG TẠI CÔNG TRÌNH */}
          <section className="mt-8 border-b border-slate-100 pb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-950 sm:text-xl">
                3. Hình ảnh thực tế thi công và nghiệm thu tại công trình
              </h2>
              <span className="text-xs text-slate-400">Bấm ảnh để phóng to</span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
              Toàn bộ hình ảnh dưới đây được chụp thực tế trong quá trình cán bộ kỹ thuật APEX tiến hành lắp đặt, căn chỉnh phụ kiện và nghiệm thu tại {caseStudy.title}:
            </p>

            {/* Lưới ảnh trải dài 2 cột sắc nét, có Caption rõ ràng */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {photoList.slice(1).map((photo, idx) => (
                <figure
                  key={idx}
                  onClick={() => setLightboxIndex(idx + 1)}
                  className="group cursor-zoom-in space-y-2 rounded-2xl border border-slate-200/90 bg-slate-50/50 p-3 transition-all hover:border-red-600/50 hover:bg-white hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-900">
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
                  <figcaption className="space-y-0.5 px-1">
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                      {photo.title}
                    </h3>
                    <p className="text-[11px] leading-relaxed text-slate-500">
                      {photo.caption}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* 7. KẾT QUẢ NGHIỆM THU & BÀN GIAO ĐƯA VÀO SỬ DỤNG */}
          <section className="mt-8 border-b border-slate-100 pb-8">
            <h2 className="text-lg font-black text-slate-950 sm:text-xl">
              4. Kết quả nghiệm thu và bàn giao đưa vào sử dụng
            </h2>

            <div className="mt-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
                <div className="space-y-2 text-xs text-slate-700 sm:text-sm">
                  <p className="font-semibold text-emerald-950">
                    {caseStudy.acceptanceResult}
                  </p>
                  <div className="flex flex-wrap gap-y-1 gap-x-6 text-xs text-slate-600 pt-2 border-t border-emerald-200/60">
                    <div>
                      <span>Thời điểm nghiệm thu: </span>
                      <strong className="text-slate-900">{caseStudy.acceptanceDate}</strong>
                    </div>
                    <div>
                      <span>Chính sách bảo hành: </span>
                      <strong className="text-slate-900">{caseStudy.warrantyPeriod}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 8. KHUNG LIÊN HỆ TƯ VẤN & BÁO GIÁ DỰ ÁN TƯƠNG TỰ */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
            <div className="text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div className="space-y-1.5 sm:max-w-xl">
                <h3 className="text-base font-black text-slate-950 sm:text-lg">
                  Bạn đang chuẩn bị dự toán hoặc hồ sơ chào thầu cho công trình tương tự?
                </h3>
                <p className="text-xs text-slate-600 sm:text-sm leading-relaxed">
                  Quý Chủ đầu tư, Tổng thầu hoặc Tư vấn thiết kế có thể gửi bản vẽ thiết kế hoặc bảng bóc tách khối lượng để kỹ sư APEX tư vấn phương án kỹ thuật và báo giá nhanh trong 1–2 ngày.
                </p>
              </div>

              <div className="mt-5 sm:mt-0 flex flex-col gap-2.5 sm:w-64 shrink-0">
                <button
                  onClick={onOpenQuote}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-red-700"
                >
                  <MessageSquareText className="h-4 w-4" />
                  <span>Nhận báo giá dự án</span>
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
                    <span>Chat Zalo</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 9. CÁC DỰ ÁN THI CÔNG KHÁC CỦA APEX */}
        {relatedProjects.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <div className="mb-6 flex items-center justify-between">
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

      {/* 10. LIGHTBOX XEM ẢNH FULLSCREEN */}
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

          {/* Khung ảnh & Chú thích */}
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
              <span className="mt-2 inline-block rounded bg-white/10 px-2.5 py-0.5 text-[11px] text-slate-400">
                Ảnh {lightboxIndex + 1} / {photoList.length} — {caseStudy.title}
              </span>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
