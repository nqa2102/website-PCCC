import { useEffect, useState } from 'react';
import { getConsent, OPEN_COOKIE_SETTINGS_EVENT, setConsent, trackingConfigured, type ConsentChoice } from '../lib/tracking';

interface CookieConsentProps {
  onNavigatePrivacy: () => void;
}

// Hỏi khách đồng ý cookie đo lường trước khi tải Google Analytics / Google Ads / Meta Pixel.
// Không hiển thị khi chưa cấu hình mã đo lường nào.
export const CookieConsent = ({ onNavigatePrivacy }: CookieConsentProps) => {
  const [visible, setVisible] = useState(() => trackingConfigured && getConsent() === null);

  useEffect(() => {
    const open = () => trackingConfigured && setVisible(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, []);

  if (!visible) return null;

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Đồng ý sử dụng cookie"
      className="fixed inset-x-3 bottom-20 z-[60] mx-auto max-w-xl border border-neutral-200 bg-white p-4 text-xs leading-5 text-slate-700 shadow-2xl sm:bottom-5 sm:text-sm"
    >
      <p>
        APEX dùng cookie đo lường (Google Analytics, Google Ads, Meta) để hiểu khách hàng tìm đến website từ đâu và cải thiện
        quảng cáo. Thông tin bạn nhập vào biểu mẫu không được chia sẻ cho các dịch vụ này.{' '}
        <a
          href="/chinh-sach-bao-mat"
          onClick={(e) => {
            e.preventDefault();
            onNavigatePrivacy();
          }}
          className="font-semibold text-red-700 underline"
        >
          Chính sách bảo mật
        </a>
      </p>
      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="min-h-10 border border-neutral-300 bg-white px-4 font-semibold text-slate-700 hover:bg-neutral-50"
        >
          Từ chối
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="min-h-10 bg-red-700 px-4 font-semibold text-white hover:bg-red-800"
        >
          Đồng ý
        </button>
      </div>
    </div>
  );
};
