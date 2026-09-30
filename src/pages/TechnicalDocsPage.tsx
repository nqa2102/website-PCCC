import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  FileCode, 
  ShieldCheck, 
  BookOpen, 
  Check, 
  Search,
  ExternalLink
} from 'lucide-react';
import { TECHNICAL_DOCS } from '../data/mockData';
import { TechnicalDoc } from '../types';

interface TechnicalDocsPageProps {
  onOpenQuote: () => void;
  initialDocId?: string;
}

export const TechnicalDocsPage: React.FC<TechnicalDocsPageProps> = ({
  onOpenQuote,
  initialDocId
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả tài liệu' },
    { id: 'regulation', label: 'Quy chuẩn QCVN & Pháp lý' },
    { id: 'catalog', label: 'Catalogue sản phẩm' },
    { id: 'cad', label: 'Thư viện Bản vẽ CAD (.DWG)' },
    { id: 'certificate', label: 'Chứng chỉ kiểm định PCCC' },
  ];

  const filteredDocs = selectedCategory === 'all' 
    ? TECHNICAL_DOCS 
    : TECHNICAL_DOCS.filter(d => d.category === selectedCategory);

  const handleDownload = (doc: TechnicalDoc) => {
    setDownloadingId(doc.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccessId(doc.id);
      setTimeout(() => setDownloadSuccessId(null), 3000);
    }, 800);
  };

  const getDocIcon = (cat: string) => {
    switch (cat) {
      case 'cad':
        return <FileCode className="w-5 h-5 text-blue-600" />;
      case 'certificate':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'regulation':
        return <BookOpen className="w-5 h-5 text-amber-600" />;
      default:
        return <FileText className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="w-full bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <span className="w-1 h-3.5 bg-red-600 inline-block rounded-xs"></span>
            <span>THƯ VIỆN KỸ THUẬT & PHÁP LÝ PCCC</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            TÀI LIỆU KỸ THUẬT, BẢN VẼ CAD & GIẤY KIỂM ĐỊNH
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Catalogue, bản vẽ CAD và hồ sơ kiểm định sẽ được công bố sau khi APEX hoàn tất tài liệu chính thức.
          </p>
        </div>

        {/* Filter Bar */}
        {TECHNICAL_DOCS.length > 0 && <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>}

        {/* Documents List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                      {getDocIcon(doc.category)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {doc.categoryLabel}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700 block">
                        Mã hiệu: {doc.code}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-neutral-100 px-2 py-0.5 rounded-sm shrink-0">
                    {doc.fileSize}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 mt-4 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  <span>Cập nhật: {doc.updatedDate}</span>
                  <span className="mx-1.5">·</span>
                  <span>{doc.downloadCount} lượt tải</span>
                </div>

                <button
                  onClick={() => handleDownload(doc)}
                  disabled={downloadingId === doc.id}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs ${
                    downloadSuccessId === doc.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white active:scale-95'
                  }`}
                >
                  {downloadingId === doc.id ? (
                    <span>Đang tải xuống...</span>
                  ) : downloadSuccessId === doc.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đã tải file</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Tải về máy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {TECHNICAL_DOCS.length === 0 && (
          <div className="border-y border-neutral-200 bg-white px-6 py-14 sm:px-10">
            <FileText className="w-8 h-8 text-red-600" />
            <h2 className="mt-4 text-xl font-bold text-slate-900">Tài liệu kỹ thuật đang được cập nhật</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Vui lòng gửi nhu cầu cụ thể. APEX sẽ tiếp nhận yêu cầu về catalogue, bản vẽ và hồ sơ kỹ thuật theo từng sản phẩm.</p>
            <button onClick={onOpenQuote} className="mt-6 bg-red-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-red-700">Yêu cầu tài liệu</button>
          </div>
        )}

        {/* Support Section for Custom CAD & Project files */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold">
              Cần Thư Viện Bản Vẽ Kỹ Thuật Riêng Theo Dự Án?
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Gửi thông tin sản phẩm, kích thước và yêu cầu công trình để APEX tiếp nhận nhu cầu tài liệu phù hợp.
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shrink-0 transition-colors"
          >
            Yêu cầu hỗ trợ kỹ thuật
          </button>
        </div>

      </div>
    </div>
  );
};
