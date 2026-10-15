import { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import './index.css';

// Xử lý tự động tải lại khi Vite phát hiện chunk hash cũ bị lệch sau khi deploy mới
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();
    const lastReload = Number(sessionStorage.getItem('apex_vite_preload_reload_ts') || '0');
    const now = Date.now();
    if (now - lastReload > 10000) {
      sessionStorage.setItem('apex_vite_preload_reload_ts', String(now));
      window.location.reload();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
