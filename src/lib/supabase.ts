import { createClient } from '@supabase/supabase-js';

const getEnvOrStorage = (envVal?: string, storageKey?: string): string => {
  if (envVal?.trim()) return envVal.trim();
  if (typeof window !== 'undefined' && storageKey) {
    try {
      return window.localStorage.getItem(storageKey)?.trim() || '';
    } catch {}
  }
  return '';
};

const supabaseUrl = getEnvOrStorage(import.meta.env.VITE_SUPABASE_URL, 'apex_supabase_url');
const supabasePublishableKey = getEnvOrStorage(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, 'apex_supabase_anon_key');

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export const setCustomSupabaseConfig = (url: string, key: string) => {
  if (typeof window === 'undefined') return;
  if (url && key) {
    window.localStorage.setItem('apex_supabase_url', url.trim());
    window.localStorage.setItem('apex_supabase_anon_key', key.trim());
  } else {
    window.localStorage.removeItem('apex_supabase_url');
    window.localStorage.removeItem('apex_supabase_anon_key');
  }
};

