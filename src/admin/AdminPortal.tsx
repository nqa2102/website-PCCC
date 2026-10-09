import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
  LogIn,
  ShieldCheck,
} from 'lucide-react';
import { AdminApp } from './AdminApp';
import { ApexAvatar } from '../components/brand';

interface StoredSession {
  email: string;
  role: string;
  mode: 'local' | 'remote';
}

const STORAGE_SESSION_KEY = 'apex-admin-session';

export const AdminPortal = ({ onExit }: { onExit: () => void }) => {
  // Session state
  const [activeSession, setActiveSession] = useState<StoredSession | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_SESSION_KEY);
      const parsed = raw ? (JSON.parse(raw) as StoredSession) : null;
      // Phiên "local" của bản demo cũ không còn hợp lệ: chỉ chấp nhận phiên xác thực qua máy chủ
      return parsed?.mode === 'remote' ? parsed : null;
    } catch {
      return null;
    }
  });

  const [checkingAuth, setCheckingAuth] = useState(true);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Kiểm tra phiên đăng nhập an toàn từ backend
  useEffect(() => {
    let active = true;

    fetch('/api/admin/me')
      .then(async (res) => {
        if (!active) return;
        if (res.ok) {
          const data = await res.json();
          const sess: StoredSession = {
            email: data.user.email,
            role: data.user.role,
            mode: 'remote',
          };
          window.localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sess));
          setActiveSession(sess);
        } else if (res.status === 401) {
          // Phiên cookie không còn hợp lệ
          window.localStorage.removeItem(STORAGE_SESSION_KEY);
          setActiveSession(null);
        }
      })
      .catch(() => {
        // Môi trường dev hoặc chưa kết nối API
      })
      .finally(() => {
        if (active) setCheckingAuth(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Đăng nhập hệ thống quản trị
  const handleAdminSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu quản trị.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password }),
      });

      if (res.ok) {
        const data = await res.json();
        const sess: StoredSession = {
          email: data.user?.email || cleanEmail,
          role: data.user?.role || 'admin',
          mode: 'remote',
        };
        window.localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sess));
        setActiveSession(sess);
        setSuccessMsg('Đăng nhập thành công! Đang chuyển hướng...');
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || 'Email hoặc mật khẩu không chính xác.');
      }
    } catch {
      setError('Không thể kết nối đến máy chủ xác thực. Vui lòng kiểm tra kết nối mạng hoặc liên hệ kỹ thuật.');
    } finally {
      setSubmitting(false);
    }
  };

  // Đăng xuất
  const handleSignOut = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {}
    window.localStorage.removeItem(STORAGE_SESSION_KEY);
    setActiveSession(null);
  };

  // View khi đã xác thực thành công
  if (activeSession) {
    return (
      <AdminApp
        onExit={onExit}
        userEmail={activeSession.email}
        userRole={activeSession.role}
        onSignOut={handleSignOut}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/90 py-8 px-4 font-sans text-slate-900 sm:px-6 lg:px-8">
      {/* Top bar back button */}
      <div className="mx-auto max-w-xl mb-4 flex items-center justify-between">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Về trang chủ website</span>
        </button>
        <span className="text-xs text-slate-500 font-mono">APEX Portal v3.0 (Neon)</span>
      </div>

      {/* Main card */}
      <div className="mx-auto max-w-xl overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl">
        {/* Header */}
        <div className="border-b border-white/10 bg-[#102b21] p-6 text-white sm:p-8">
          <div className="flex items-center justify-between">
            <ApexAvatar size={48} theme="dark-gold" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="h-3.5 w-3.5" />
              Cổng Quản Trị Hệ Thống
            </span>
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Đăng nhập Quản trị APEX
          </h1>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-emerald-100/80">
            Quản trị thông tin doanh nghiệp, danh mục sản phẩm PCCC, hồ sơ kỹ thuật kiểm định và tiếp nhận danh sách khách hàng cần tư vấn.
          </p>
        </div>

        {/* Checking Auth spinner */}
        {checkingAuth ? (
          <div className="flex flex-col items-center justify-center p-12 text-sm text-slate-600">
            <LoaderCircle className="h-6 w-6 animate-spin text-red-600" />
            <span className="mt-3 font-medium">Đang kiểm tra chứng thực bảo mật...</span>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            {/* Notifications */}
            {error && (
              <div
                role="alert"
                className="mb-5 rounded border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-800 leading-relaxed"
              >
                {error}
              </div>
            )}
            {successMsg && (
              <div className="mb-5 rounded border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-medium text-emerald-800 leading-relaxed flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="space-y-5">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800 leading-relaxed">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <LockKeyhole className="h-4 w-4 text-red-600 shrink-0" />
                  <span>Xác Thực Tài Khoản Nội Bộ</span>
                </div>
                <p className="mt-1 text-slate-600">
                  Khu vực dành riêng cho cán bộ quản trị và kỹ thuật viên APEX Việt Nam. Mọi truy cập đều được mã hóa và lưu trữ nhật ký bảo mật.
                </p>
              </div>

              <form onSubmit={handleAdminSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Email quản trị viên
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@apexdoor.net"
                    className="mt-1 h-11 w-full rounded border border-neutral-300 px-3 text-sm text-slate-900 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1 h-11 w-full rounded border border-neutral-300 px-3 text-sm text-slate-900 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded bg-red-600 px-4 text-sm font-bold text-white shadow transition hover:bg-red-700 disabled:opacity-60"
                >
                  {submitting ? (
                    <LoaderCircle className="h-4 w-4 animate-spin text-white" />
                  ) : (
                    <LogIn className="h-4 w-4" />
                  )}
                  Đăng nhập Quản trị
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Footer info bar */}
        <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Hệ thống an toàn PCCC & Quản trị APEX
          </span>
          <button
            onClick={onExit}
            className="font-bold text-red-700 hover:underline inline-flex items-center gap-1"
          >
            Quay lại website khách hàng &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
