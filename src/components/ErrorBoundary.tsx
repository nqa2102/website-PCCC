import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw, Home, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const isChunkLoadFailed = (error?: Error) => {
  if (!error) return false;
  const msg = error.message || '';
  return (
    error.name === 'ChunkLoadError' ||
    msg.includes('Failed to fetch dynamically imported module') ||
    msg.includes('Importing a module script failed') ||
    msg.includes('error loading dynamically imported module') ||
    msg.includes('Loading chunk')
  );
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary bắt được ngoại lệ:', error, errorInfo);

    // Xử lý tự động tải lại nếu gặp lỗi lệch hash do vừa có bản cập nhật mới (ChunkLoadError)
    if (isChunkLoadFailed(error)) {
      const lastReload = Number(sessionStorage.getItem('apex_chunk_reload_ts') || '0');
      const now = Date.now();
      if (now - lastReload > 10000) {
        sessionStorage.setItem('apex_chunk_reload_ts', String(now));
        window.location.reload();
      }
    }
  }

  handleReload = () => {
    sessionStorage.removeItem('apex_chunk_reload_ts');
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[60vh] w-full items-center justify-center bg-neutral-50 px-4 py-16">
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 mb-4">
              <ShieldAlert className="h-7 w-7" />
            </div>

            <h2 className="text-lg font-black text-slate-900 sm:text-xl">
              Hệ thống vừa cập nhật phiên bản mới
            </h2>

            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
              Trang web vừa nhận được bản phát hành cập nhật mới từ máy chủ. Vui lòng tải lại trang để tải phiên bản mới nhất.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-red-700 cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Tải lại trang</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:border-red-600 hover:text-red-600 cursor-pointer"
              >
                <Home className="h-4 w-4" />
                <span>Về trang chủ</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
