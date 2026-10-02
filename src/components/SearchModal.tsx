import React, { useState, useMemo } from 'react';
import { X, Search, FileText, ArrowRight, ShieldCheck, Box, Building } from 'lucide-react';
import { PRODUCTS, SOLUTIONS, PROJECTS, TECHNICAL_DOCS, NEWS_ARTICLES } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, itemId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return {
        products: PRODUCTS.slice(0, 3),
        solutions: SOLUTIONS.slice(0, 3),
        docs: TECHNICAL_DOCS.slice(0, 2),
        isDefault: true
      };
    }

    const query = searchTerm.toLowerCase().trim();

    const matchedProducts = PRODUCTS.filter(
      p => p.name.toLowerCase().includes(query) || 
           p.description.toLowerCase().includes(query) ||
           p.fireRating.toLowerCase().includes(query)
    );

    const matchedSolutions = SOLUTIONS.filter(
      s => s.title.toLowerCase().includes(query) ||
           s.description.toLowerCase().includes(query) ||
           s.recommendedProducts.some(r => r.toLowerCase().includes(query))
    );

    const matchedDocs = TECHNICAL_DOCS.filter(
      d => d.title.toLowerCase().includes(query) ||
           d.code.toLowerCase().includes(query) ||
           d.description.toLowerCase().includes(query)
    );

    const matchedProjects = PROJECTS.filter(
      p => p.title.toLowerCase().includes(query) ||
           p.itemsSupplied.toLowerCase().includes(query) ||
           p.location.toLowerCase().includes(query)
    );

    return {
      products: matchedProducts,
      solutions: matchedSolutions,
      docs: matchedDocs,
      projects: matchedProjects,
      isDefault: false
    };
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-20 px-2.5 sm:px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-neutral-200 my-auto sm:my-0">
        
        {/* Search Input Bar */}
        <div className="relative border-b border-neutral-200 p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Tìm kiếm: Cửa thép, QCVN 06, rèm ngăn cháy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-1"
            >
              Xóa
            </button>
          )}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs">
          
          {/* Products */}
          {searchResults.products && searchResults.products.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Sản phẩm PCCC</span>
                <span>{searchResults.products.length} kết quả</span>
              </div>
              <div className="space-y-1.5">
                {searchResults.products.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      onNavigate('products', prod.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-neutral-50 flex items-center justify-between border border-transparent hover:border-neutral-200 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-neutral-100 flex items-center justify-center text-red-600 shrink-0 font-bold text-xs">
                        {prod.fireRating}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">
                          {prod.description}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Solutions */}
          {searchResults.solutions && searchResults.solutions.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Giải pháp công trình</span>
                <span>{searchResults.solutions.length} kết quả</span>
              </div>
              <div className="space-y-1.5">
                {searchResults.solutions.map((sol) => (
                  <button
                    key={sol.id}
                    onClick={() => {
                      onNavigate('solutions', sol.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-neutral-50 flex items-center justify-between border border-transparent hover:border-neutral-200 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors">
                          Giải pháp {sol.title}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">
                          {sol.tagline}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Technical Docs */}
          {searchResults.docs && searchResults.docs.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Tài liệu & Tiêu chuẩn PCCC</span>
                <span>{searchResults.docs.length} kết quả</span>
              </div>
              <div className="space-y-1.5">
                {searchResults.docs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      onNavigate('documents', doc.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-neutral-50 flex items-center justify-between border border-transparent hover:border-neutral-200 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                          {doc.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {doc.code} · {doc.categoryLabel}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {searchResults.products.length === 0 && 
           searchResults.solutions.length === 0 && 
           searchResults.docs.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p>Không tìm thấy kết quả phù hợp với "{searchTerm}".</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Hãy thử tìm kiếm với các từ khóa: cửa thép, rèm ngăn cháy, EI90, QCVN 06, CAD...
              </p>
            </div>
          )}

        </div>

        {/* Footer shortcuts */}
        <div className="bg-neutral-50 px-4 py-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Gợi ý: Nhấn vào bất kỳ mục nào để chuyển ngay tới trang chi tiết</span>
          <span className="font-mono text-[10px] bg-neutral-200 px-1.5 py-0.5 rounded-xs">ESC để đóng</span>
        </div>

      </div>
    </div>
  );
};
