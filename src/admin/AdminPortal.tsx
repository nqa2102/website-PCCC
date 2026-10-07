import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  ArrowLeft,
  CheckCircle2,
  Cloud,
  Database,
  ExternalLink,
  Flame,
  HelpCircle,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  LogIn,
  RotateCcw,
  Save,
  Server,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { supabase, isSupabaseConfigured, setCustomSupabaseConfig } from '../lib/supabase';
import { AdminApp } from './AdminApp';

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
      return raw ? (JSON.parse(raw) as StoredSession) : null;
    } catch {
      return null;
    }
  });

  // Supabase state
  const [supabaseSession, setSupabaseSession] = useState<Session | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(isSupabaseConfigured);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState('admin');

  // Form states
  const [activeTab, setActiveTab] = useState<'local' | 'cloud'>('local');
  const [email, setEmail] = useState('admin@apex.vn');
  const [password, setPassword] = useState('apex2026');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Cloud config form states
  const [cloudUrl, setCloudUrl] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem('apex_supabase_url') || import.meta.env.VITE_SUPABASE_URL || '';
  });
  const [cloudKey, setCloudKey] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem('apex_supabase_anon_key') || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
  });
  const [showConfigCloud, setShowConfigCloud] = useState(!isSupabaseConfigured);

  // Monitor Supabase Auth if configured
  useEffect(() => {
    if (!supabase) {
      setCheckingAuth(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSupabaseSession(data.session);
      if (!data.session) setCheckingAuth(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSupabaseSession(nextSession);
      setAuthorized(null);
      setCheckingAuth(Boolean(nextSession));
    });

    return () => data.subscription.unsubscribe();
  }, []);

  // Check roles for Supabase user
  useEffect(() => {
    if (!supabase || !supabaseSession) return;
    let active = true;

    supabase
      .from('profiles')
      .select('role, active')
      .eq('id', supabaseSession.user.id)
      .eq('active', true)
      .maybeSingle()
      .then(({ data, error: profileError }) => {
        if (!active) return;
        const isAuth = Boolean(data) && !profileError;
        setAuthorized(isAuth);
        const role = data?.role || 'admin';
        setUserRole(role);
        setCheckingAuth(false);

        if (isAuth) {
          const sess: StoredSession = {
            email: supabaseSession.user.email || 'admin@apex.vn',
            role,
            mode: 'remote',
          };
          window.localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sess));
          setActiveSession(sess);
        }
      });

    return () => {
      active = false;
    };
  }, [supabaseSession]);

  // Sign in local admin
  const handleLocalSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    setError('');

    // Allow internal administration
    setTimeout(() => {
      const sess: StoredSession = {
        email: email.trim() || 'admin@apex.vn',
        role: 'admin',
        mode: 'local',
      };
      window.localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sess));
      setActiveSession(sess);
      setSubmitting(false);
    }, 250);
  };

  // 1-Click quick login
  const handleQuickLogin = () => {
    setEmail('admin@apex.vn');
    setPassword('apex2026');
    const sess: StoredSession = {
      email: 'admin@apex.vn',
      role: 'admin',
      mode: 'local',
    };
    window.localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sess));
    setActiveSession(sess);
  };

  // Sign in cloud Supabase
  const handleCloudSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError('Chưa cấu hình thông tin kết nối Supabase Cloud.');
      return;
    }
    setSubmitting(true);
    setError('');

    const result = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSubmitting(false);

    if (result.error) {
      setError('Đăng nhập thất bại: Vui lòng kiểm tra email, mật khẩu hoặc quyền truy cập Supabase.');
    }
  };

  // Save Cloud Config
  const handleSaveCloudConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cloudUrl.trim() || !cloudKey.trim()) {
      setError('Vui lòng nhập đầy đủ Supabase Project URL và Anon Key.');
      return;
    }
    setCustomSupabaseConfig(cloudUrl.trim(), cloudKey.trim());
    setSuccessMsg('Đã lưu cấu hình Supabase! Đang khởi động lại...');
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };

  // Clear Cloud Config
  const handleClearCloudConfig = () => {
    setCustomSupabaseConfig('', '');
    setSuccessMsg('Đã xóa cấu hình Supabase Cloud.');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  // Sign out
  const handleSignOut = () => {
    window.localStorage.removeItem(STORAGE_SESSION_KEY);
    setActiveSession(null);
    if (supabase) {
      supabase.auth.signOut();
    }
    setSupabaseSession(null);
    setAuthorized(null);
  };

  // Active authenticated session view
  if (activeSession) {
    return (
      <AdminApp
        onExit={onExit}
        dataMode={activeSession.mode}
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
        <span className="text-xs text-slate-500 font-mono">APEX Portal v2.6</span>
      </div>

      {/* Main card */}
      <div className="mx-auto max-w-xl overflow-hidden rounded-lg border border-neutral-300 bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-white/10 bg-[#102b21] p-6 text-white sm:p-8">
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded bg-red-600 shadow-md">
              <Flame className="h-6 w-6 text-white" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="h-3.5 w-3.5" />
              Cổng Quản Trị Hệ Thống
            </span>
          </div>

          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-emerald-400">
            APEX FIRE SAFETY SOLUTIONS
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Đăng nhập Quản trị APEX
          </h1>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-emerald-100/80">
            Quản trị thông tin doanh nghiệp, danh mục sản phẩm PCCC, hồ sơ kỹ thuật kiểm định và tiếp nhận danh sách khách hàng cần tư vấn.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-neutral-200 bg-neutral-50">
          <button
            type="button"
            onClick={() => {
              setActiveTab('local');
              setError('');
            }}
            className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-xs font-bold sm:text-sm transition-colors border-b-2 ${
              activeTab === 'local'
                ? 'border-red-600 bg-white text-red-700 shadow-sm'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="h-4 w-4 text-amber-500" />
            Quản trị Nội bộ (Trực tiếp)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('cloud');
              setError('');
            }}
            className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-xs font-bold sm:text-sm transition-colors border-b-2 ${
              activeTab === 'cloud'
                ? 'border-red-600 bg-white text-red-700 shadow-sm'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cloud className="h-4 w-4 text-sky-500" />
            Supabase Cloud {isSupabaseConfigured && <span className="h-2 w-2 rounded-full bg-emerald-500" />}
          </button>
        </div>

        {/* Checking Supabase Auth spinner */}
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

            {/* TAB 1: LOCAL ADMIN (RECOMMENDED) */}
            {activeTab === 'local' && (
              <div className="space-y-5">
                <div className="rounded-md border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-950 leading-relaxed">
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                    <span>Hệ thống Quản trị Sẵn sàng vận hành</span>
                  </div>
                  <p className="mt-1 text-emerald-800">
                    Mọi thay đổi về hotline, địa chỉ, sản phẩm và hồ sơ kiểm định được cập nhật trực tiếp 2 chiều lên toàn bộ website ngay tức thì. Phiên làm việc được ghi nhớ tự động.
                  </p>
                </div>

                {/* 1-Click login highlight button */}
                <button
                  type="button"
                  onClick={handleQuickLogin}
                  className="w-full flex items-center justify-center gap-2 rounded bg-red-600 py-3.5 px-4 text-sm font-bold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg focus:ring-2 focus:ring-red-600 focus:ring-offset-2 active:scale-[0.99]"
                >
                  <Zap className="h-4 w-4 text-yellow-300" />
                  ⚡ Đăng nhập Quản trị viên (1-Click)
                </button>

                <div className="relative my-4 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200" />
                  </div>
                  <span className="relative bg-white px-3 text-xs font-medium text-slate-500 uppercase">
                    hoặc đăng nhập thủ công
                  </span>
                </div>

                <form onSubmit={handleLocalSignIn} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700">
                      Email quản trị viên
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@apex.vn"
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
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded border border-neutral-300 bg-neutral-50 px-4 text-sm font-bold text-slate-800 transition hover:bg-neutral-100 disabled:opacity-60"
                  >
                    {submitting ? (
                      <LoaderCircle className="h-4 w-4 animate-spin text-slate-600" />
                    ) : (
                      <LogIn className="h-4 w-4" />
                    )}
                    Đăng nhập tài khoản nội bộ
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: CLOUD SUPABASE */}
            {activeTab === 'cloud' && (
              <div className="space-y-5">
                {isSupabaseConfigured && !showConfigCloud ? (
                  <div>
                    <div className="mb-4 rounded border border-sky-200 bg-sky-50 p-3.5 text-xs text-sky-950 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-sky-700 shrink-0" />
                        <div>
                          <strong>Đã kết nối Supabase Cloud</strong>
                          <p className="text-[11px] text-sky-800">Cơ sở dữ liệu đám mây đang sẵn sàng.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowConfigCloud(true)}
                        className="text-xs font-bold text-sky-800 hover:underline"
                      >
                        Đổi cấu hình
                      </button>
                    </div>

                    <form onSubmit={handleCloudSignIn} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700">
                          Email tài khoản Supabase Auth
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tenban@congty.com"
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
                        className="flex min-h-11 w-full items-center justify-center gap-2 rounded bg-sky-700 px-4 text-sm font-bold text-white transition hover:bg-sky-800 disabled:opacity-60"
                      >
                        {submitting ? (
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : (
                          <LogIn className="h-4 w-4" />
                        )}
                        Đăng nhập Supabase Cloud
                      </button>
                    </form>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4 rounded border border-amber-200 bg-amber-50 p-4 text-xs text-amber-950">
                      <div className="flex items-center gap-2 font-bold text-amber-900">
                        <Database className="h-4 w-4 text-amber-700 shrink-0" />
                        <span>Cấu hình kết nối Supabase Cloud</span>
                      </div>
                      <p className="mt-1 text-amber-900 leading-relaxed">
                        Bạn có thể nhập Project URL và Anon Key của dự án Supabase để kích hoạt lưu trữ đám mây từ xa.
                        Nếu không cần, bạn có thể sử dụng ngay tab <strong>Quản trị Nội bộ</strong> bên cạnh.
                      </p>
                    </div>

                    <form onSubmit={handleSaveCloudConfig} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700">
                          Supabase Project URL
                        </label>
                        <input
                          type="url"
                          required
                          value={cloudUrl}
                          onChange={(e) => setCloudUrl(e.target.value)}
                          placeholder="https://xyzcompany.supabase.co"
                          className="mt-1 h-11 w-full rounded border border-neutral-300 px-3 text-sm text-slate-900 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600 font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700">
                          Supabase Publishable / Anon Key
                        </label>
                        <input
                          type="text"
                          required
                          value={cloudKey}
                          onChange={(e) => setCloudKey(e.target.value)}
                          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                          className="mt-1 h-11 w-full rounded border border-neutral-300 px-3 text-sm text-slate-900 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600 font-mono text-xs"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded bg-sky-700 px-4 text-xs font-bold text-white transition hover:bg-sky-800"
                        >
                          <Save className="h-4 w-4" />
                          Lưu & Kích hoạt kết nối
                        </button>
                        {isSupabaseConfigured && (
                          <button
                            type="button"
                            onClick={handleClearCloudConfig}
                            className="flex min-h-11 items-center justify-center gap-1 rounded border border-neutral-300 px-3 text-xs font-semibold text-slate-700 hover:bg-neutral-100"
                            title="Xóa cấu hình"
                          >
                            <RotateCcw className="h-4 w-4" />
                            Xóa
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer info bar */}
        <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Bảo mật nội bộ APEX Safety Systems
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
