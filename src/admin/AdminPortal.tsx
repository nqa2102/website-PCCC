import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { ArrowLeft, Database, LoaderCircle, LockKeyhole, LogIn, ShieldCheck } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AdminApp } from './AdminApp';

export const AdminPortal = ({ onExit }: { onExit: () => void }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(isSupabaseConfigured);
  const [demo, setDemo] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (!data.session) setChecking(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthorized(null);
      setChecking(Boolean(nextSession));
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase || !session) return;
    let active = true;
    supabase.from('profiles').select('role, active').eq('id', session.user.id).eq('active', true).maybeSingle()
      .then(({ data, error: profileError }) => {
        if (!active) return;
        setAuthorized(Boolean(data) && !profileError);
        setUserRole(data?.role || '');
        setChecking(false);
      });
    return () => { active = false; };
  }, [session]);

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setSubmitting(true);
    setError('');
    const result = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setSubmitting(false);
    if (result.error) setError('Không thể đăng nhập. Vui lòng kiểm tra email, mật khẩu hoặc quyền quản trị.');
  };

  const signOut = () => supabase?.auth.signOut();

  if (demo) return <AdminApp onExit={onExit} dataMode="local" />;
  if (session && supabase && authorized) {
    const client = supabase;
    return <AdminApp onExit={onExit} dataMode="remote" userEmail={session.user.email || ''} userRole={userRole} onSignOut={() => client.auth.signOut()} />;
  }

  return (
    <div className="min-h-screen bg-[#f3f5f4] p-4 font-sans text-slate-950 sm:p-8">
      <button onClick={onExit} className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-slate-700"><ArrowLeft className="h-4 w-4" />Về website</button>
      <div className="mx-auto mt-10 max-w-md border border-neutral-200 bg-white shadow-xl">
        <div className="border-b border-neutral-200 bg-[#102b21] p-6 text-white">
          <span className="flex h-11 w-11 items-center justify-center bg-red-700"><LockKeyhole className="h-5 w-5" /></span>
          <p className="mt-5 text-xs font-bold uppercase text-red-300">Không gian nội bộ</p>
          <h1 className="mt-2 text-2xl font-bold">Đăng nhập APEX Admin</h1>
          <p className="mt-2 text-sm leading-6 text-emerald-50/70">Dữ liệu khách hàng và nội dung chỉ dành cho nhân sự đã được cấp quyền.</p>
        </div>

        {checking ? <div className="flex items-center justify-center gap-2 p-10 text-sm text-slate-600"><LoaderCircle className="h-5 w-5 animate-spin" />Đang kiểm tra phiên đăng nhập...</div> : session && authorized === false && supabase ? (
          <div className="p-6"><p className="border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">Tài khoản này chưa được cấp quyền APEX Admin hoặc đã bị khóa.</p><button onClick={signOut} className="mt-4 min-h-11 w-full border border-neutral-300 text-sm font-bold text-slate-700">Đăng xuất</button></div>
        ) : isSupabaseConfigured ? (
          <form onSubmit={signIn} className="space-y-4 p-6">
            <label className="block text-xs font-semibold text-slate-700">Email công việc<input type="email" required autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 h-11 w-full border border-neutral-300 px-3 text-sm outline-none focus:border-red-700" /></label>
            <label className="block text-xs font-semibold text-slate-700">Mật khẩu<input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 h-11 w-full border border-neutral-300 px-3 text-sm outline-none focus:border-red-700" /></label>
            {error && <p role="alert" className="border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-800">{error}</p>}
            <button disabled={submitting} className="flex min-h-11 w-full items-center justify-center gap-2 bg-red-700 px-4 text-sm font-bold text-white hover:bg-red-800 disabled:opacity-60">{submitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}Đăng nhập</button>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500"><ShieldCheck className="h-4 w-4 text-emerald-700" />Phiên đăng nhập được Supabase Auth bảo vệ.</div>
          </form>
        ) : (
          <div className="p-6">
            <div className="flex gap-3 border border-amber-200 bg-amber-50 p-4"><Database className="mt-0.5 h-5 w-5 shrink-0 text-amber-800" /><div><strong className="text-sm text-amber-950">Chờ kết nối Supabase</strong><p className="mt-1 text-xs leading-5 text-amber-900">Cần Project URL và Publishable key để bật đăng nhập và dữ liệu máy chủ. Website khách hàng vẫn hoạt động bình thường.</p></div></div>
            <button onClick={() => setDemo(true)} className="mt-4 min-h-11 w-full border border-neutral-300 text-sm font-bold text-slate-700 hover:bg-neutral-50">Mở bản mô phỏng cục bộ</button>
          </div>
        )}
      </div>
    </div>
  );
};
