import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Factory,
  FileCheck2,
  MessageSquareText,
  Phone,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { useLiveData } from '../admin/adminData';

interface TechnicalDocsPageProps {
  onOpenQuote: () => void;
  initialDocId?: string;
}

const FILTERS = [
  { id: 'all', label: 'Tất cả hồ sơ' },
  { id: 'steel-door', label: 'Cửa thép' },
  { id: 'roller-shutter', label: 'Cửa cuốn' },
  { id: 'fire-curtain', label: 'Rèm ngăn cháy' },
];

export const TechnicalDocsPage: React.FC<TechnicalDocsPageProps> = ({
  onOpenQuote,
  initialDocId,
}) => {
  const { documents } = useLiveData();
  const [selectedGroup, setSelectedGroup] = useState('all');

  const filteredDocs = useMemo(
    () => selectedGroup === 'all'
      ? documents
      : documents.filter((doc) => doc.productGroup === selectedGroup),
    [documents, selectedGroup],
  );

  useEffect(() => {
    if (!initialDocId) return;
    const selectedDoc = documents.find((doc) => doc.id === initialDocId);
    if (selectedDoc?.productGroup) setSelectedGroup(selectedDoc.productGroup);
    window.setTimeout(() => {
      document.getElementById(`doc-${initialDocId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
  }, [documents, initialDocId]);

  return (
    <div className="min-h-screen bg-[#f4f4f1]">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.35fr_0.65fr] lg:px-10 lg:py-16">
          <div>
            <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase text-red-300">
              <span className="h-0.5 w-8 bg-red-500" />
              Trung tâm hồ sơ kỹ thuật
            </div>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Đối chiếu hồ sơ theo đúng cấu hình sản phẩm.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
              APEX phân loại hồ sơ kiểm định và kết quả thử nghiệm theo nhóm sản phẩm, số cánh và giới hạn chịu lửa để đội ngũ thiết kế, thi công và nghiệm thu tra cứu đúng phạm vi.
            </p>
          </div>

          <div className="grid grid-cols-2 border border-white/15 sm:grid-cols-3 lg:grid-cols-1">
            <div className="border-b border-white/15 p-4 sm:border-b-0 sm:border-r lg:border-b lg:border-r-0">
              <strong className="block text-2xl text-white">08</strong>
              <span className="text-xs text-slate-300">Hồ sơ đã phân loại</span>
            </div>
            <div className="border-b border-white/15 p-4 sm:border-b-0 sm:border-r lg:border-b lg:border-r-0">
              <strong className="block text-2xl text-white">03</strong>
              <span className="text-xs text-slate-300">Nhóm sản phẩm</span>
            </div>
            <div className="col-span-2 p-4 sm:col-span-1">
              <strong className="block text-2xl text-white">EI60-EI120</strong>
              <span className="text-xs text-slate-300">Dải hồ sơ tham chiếu</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-3">
              <Scale className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">Nguyên tắc công bố minh bạch</h2>
                <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-600">
                  Các hồ sơ dưới đây đứng tên đơn vị sản xuất hoặc đối tác liên quan. APEX sử dụng để đối chiếu cấu hình khi tư vấn; hồ sơ áp dụng cho từng đơn hàng phải được xác nhận lại theo sản phẩm thực tế.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenQuote}
              className="flex min-h-11 items-center justify-center gap-2 bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
            >
              <MessageSquareText className="h-4 w-4" />
              Yêu cầu đúng bộ hồ sơ
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="mb-8 flex flex-col gap-5 border-b border-slate-300 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-red-600">Danh mục đối chiếu</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Hồ sơ theo nhóm sản phẩm</h2>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Lọc hồ sơ kỹ thuật">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedGroup(filter.id)}
                className={`min-h-11 border px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedGroup === filter.id
                    ? 'border-slate-950 bg-slate-950 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-red-600 hover:text-red-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {filteredDocs.map((doc) => (
            <article
              id={`doc-${doc.id}`}
              key={doc.id}
              className="border border-slate-200 border-l-4 border-l-red-600 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-emerald-700/20 bg-emerald-50 text-emerald-700">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase text-red-700">{doc.categoryLabel}</p>
                    <h3 className="mt-1 text-lg font-bold leading-6 text-slate-900">{doc.title}</h3>
                  </div>
                </div>
                <span className="self-start bg-slate-950 px-2.5 py-1 font-mono text-xs font-bold text-white sm:shrink-0">
                  {doc.code}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">{doc.description}</p>

              <dl className="mt-5 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2">
                <div className="bg-slate-50 p-3">
                  <dt className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500">
                    <FileCheck2 className="h-3.5 w-3.5" /> Phạm vi
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-5 text-slate-800">{doc.scope}</dd>
                </div>
                <div className="bg-slate-50 p-3">
                  <dt className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Tiêu chuẩn
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-5 text-slate-800">{doc.standard}</dd>
                </div>
                <div className="bg-slate-50 p-3">
                  <dt className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500">
                    <Factory className="h-3.5 w-3.5" /> Đơn vị đứng tên
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-5 text-slate-800">{doc.sourceOwner}</dd>
                </div>
                <div className="bg-slate-50 p-3">
                  <dt className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500">
                    <CalendarDays className="h-3.5 w-3.5" /> Ngày hồ sơ
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-5 text-slate-800">{doc.updatedDate}</dd>
                </div>
              </dl>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
                <span className="text-xs leading-5 text-slate-500">Cung cấp bản đối chiếu theo yêu cầu công trình</span>
                <button
                  onClick={onOpenQuote}
                  className="shrink-0 text-sm font-bold text-red-700 hover:text-red-800"
                >
                  Yêu cầu hồ sơ
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase text-red-300">Hỗ trợ hồ sơ dự án</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Gửi mã sản phẩm hoặc bản vẽ để nhận đúng hồ sơ.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Nhân viên kỹ thuật sẽ đối chiếu loại cửa, số cánh, kích thước và yêu cầu EI trước khi cung cấp tài liệu.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:0566385555"
              className="flex min-h-11 items-center justify-center gap-2 bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
            >
              <Phone className="h-4 w-4" /> Gọi 0566 38 5555
            </a>
            <button
              onClick={onOpenQuote}
              className="min-h-11 border border-white/30 px-5 py-2.5 text-sm font-bold text-white hover:border-white"
            >
              Nhắn nhân viên kỹ thuật
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
