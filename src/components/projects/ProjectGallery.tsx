import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ProjectGalleryProps {
  images?: string[];
  projectTitle: string;
  className?: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  images = [],
  projectTitle,
  className = '',
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
        Hình ảnh công trình thực tế ({images.length})
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImageIndex(idx)}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xs"
          >
            <img
              src={imgUrl}
              alt={`Hình ảnh ${idx + 1} - Dự án ${projectTitle}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 opacity-0 transition-all group-hover:bg-slate-950/40 group-hover:opacity-100">
              <ZoomIn className="h-6 w-6 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setActiveImageIndex(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-slate-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeImageIndex]}
              alt={`Ảnh chi tiết ${activeImageIndex + 1} - Dự án ${projectTitle}`}
              className="max-h-[85vh] w-auto object-contain"
            />
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white hover:bg-black"
              aria-label="Đóng xem ảnh"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-3 rounded bg-black/60 px-3 py-1 text-xs text-white">
              {activeImageIndex + 1} / {images.length} — Dự án {projectTitle}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
