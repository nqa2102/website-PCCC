import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, X, Share2, Bookmark } from 'lucide-react';
import { NEWS_ARTICLES } from '../data/mockData';
import { NewsArticle } from '../types';

interface NewsPageProps {
  onOpenQuote: () => void;
  initialArticleId?: string;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onOpenQuote, initialArticleId }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [readingArticle, setReadingArticle] = useState<NewsArticle | null>(
    initialArticleId ? (NEWS_ARTICLES.find(a => a.id === initialArticleId) || null) : null
  );

  const categories = [
    { id: 'all', label: 'Tất cả bài viết' },
    { id: 'Tiêu chuẩn & Quy chuẩn', label: 'Tiêu chuẩn & Quy chuẩn' },
    { id: 'Giải pháp thi công', label: 'Giải pháp thi công' },
    { id: 'Xu hướng kiến trúc', label: 'Xu hướng kiến trúc' },
  ];

  const filteredNews = selectedCategory === 'all'
    ? NEWS_ARTICLES
    : NEWS_ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <div className="w-full bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <span className="w-1 h-3.5 bg-red-600 inline-block rounded-xs"></span>
            <span>TIN TỨC & BẢN TIN CHUYÊN NGÀNH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            KIẾN THỨC PCCC, TIÊU CHUẨN XÂY DỰNG & SỰ KIỆN APEX
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Cập nhật các thông tư mới nhất của Bộ Xây dựng, kinh nghiệm nghiệm thu thực tế và xu hướng vật liệu chống cháy thế hệ mới.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === c.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
              onClick={() => setReadingArticle(article)}
            >
              <div className="relative h-48 bg-neutral-100 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-sm">
                  {article.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                    <span className="mx-1">·</span>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-red-600 font-bold group-hover:text-red-700">
                  <span>Đọc bài viết chi tiết</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200 my-auto">
            
            {/* Header */}
            <div className="relative h-48 sm:h-64 bg-slate-900 shrink-0">
              <img
                src={readingArticle.image}
                alt={readingArticle.title}
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 text-white flex items-center justify-center hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6 text-white">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                  {readingArticle.category}
                </span>
                <h2 className="text-base sm:text-xl font-bold mt-1 text-white leading-snug">
                  {readingArticle.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-8 space-y-4 overflow-y-auto flex-1 text-xs leading-relaxed">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-red-500" />
                  <span>{readingArticle.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{readingArticle.date}</span>
                </div>
              </div>

              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 font-medium text-slate-800 italic">
                {readingArticle.summary}
              </div>

              <div className="space-y-3 text-slate-700 text-xs">
                {readingArticle.content.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
              <button
                onClick={() => alert('Đã sao chép liên kết bài viết!')}
                className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
              >
                <Share2 className="w-4 h-4" />
                <span>Chia sẻ bài viết</span>
              </button>

              <button
                onClick={() => setReadingArticle(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
