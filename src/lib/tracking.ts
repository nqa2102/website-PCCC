// Đo lường quảng cáo: Google Analytics 4, Google Ads, Meta Pixel.
// Mã được cấu hình qua biến môi trường VITE_* trên Vercel (ID công khai, không phải bí mật).
// Script bên thứ ba chỉ được tải SAU KHI khách đồng ý cookie (Nghị định 13/2023/NĐ-CP).

type Gtag = (...args: unknown[]) => void;
interface Fbq {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined; // dạng AW-XXXXXXXXX
const ADS_LEAD_LABEL = import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL as string | undefined;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
// Google Tag Manager cho đơn vị chạy quảng cáo tự quản lý thẻ (dạng GTM-XXXXXXX)
const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;

export const trackingConfigured = Boolean(GA4_ID || ADS_ID || META_PIXEL_ID || GTM_ID);

// Sự kiện chuẩn cho GTM: dataLayer.push({ event, ... }) để agency tạo trigger "Custom Event"
const pushDataLayer = (event: string, params: Record<string, unknown> = {}) => {
  if (!GTM_ID) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
};

export type ConsentChoice = 'granted' | 'denied';
const CONSENT_KEY = 'apex-cookie-consent';
export const OPEN_COOKIE_SETTINGS_EVENT = 'apex-open-cookie-settings';

export const getConsent = (): ConsentChoice | null => {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
};

let loaded = false;

const loadScript = (src: string) => {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

export const loadTracking = () => {
  if (loaded || !trackingConfigured || getConsent() !== 'granted') return;
  loaded = true;

  if (GTM_ID) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`);
  }

  if (GA4_ID || ADS_ID) {
    window.dataLayer = window.dataLayer || [];
    // gtag phải đẩy đúng đối tượng `arguments` vào dataLayer
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    // Trang được ghi nhận thủ công ở mỗi lần chuyển trang (website một trang - SPA)
    if (GA4_ID) window.gtag('config', GA4_ID, { send_page_view: false });
    if (ADS_ID) window.gtag('config', ADS_ID, { send_page_view: false });
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent((GA4_ID || ADS_ID)!)}`);
  }

  if (META_PIXEL_ID) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    }) as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID);
  }

  trackPageView();
};

export const setConsent = (choice: ConsentChoice) => {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Trình duyệt chặn lưu trữ: lựa chọn chỉ có hiệu lực trong phiên này
  }
  if (choice === 'granted') loadTracking();
};

export const trackPageView = () => {
  if (!loaded) return;
  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  });
  window.fbq?.('track', 'PageView');
  pushDataLayer('apex_page_view', { page_path: window.location.pathname + window.location.search, page_title: document.title });
};

// Chuyển đổi chính: khách gửi form báo giá / liên hệ thành công
export const trackLead = (formName: string) => {
  if (!loaded) return;
  window.gtag?.('event', 'generate_lead', { form_name: formName, currency: 'VND' });
  if (ADS_ID && ADS_LEAD_LABEL) {
    window.gtag?.('event', 'conversion', { send_to: `${ADS_ID}/${ADS_LEAD_LABEL}` });
  }
  window.fbq?.('track', 'Lead', { content_name: formName });
  pushDataLayer('generate_lead', { form_name: formName });
};

// Bấm gọi hotline / nhắn Zalo ở bất kỳ vị trí nào trên website
export const trackContactClick = (channel: 'phone' | 'zalo') => {
  if (!loaded) return;
  window.gtag?.('event', 'contact_click', { channel });
  window.fbq?.('track', 'Contact', { channel });
  pushDataLayer('contact_click', { channel });
};

export const installContactClickTracking = () => {
  const handler = (event: MouseEvent) => {
    const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (href.startsWith('tel:')) trackContactClick('phone');
    else if (href.includes('zalo.me')) trackContactClick('zalo');
  };
  document.addEventListener('click', handler, { capture: true });
  return () => document.removeEventListener('click', handler, { capture: true });
};
