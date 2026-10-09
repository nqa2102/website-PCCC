import React from 'react';
import { ApexMark, ApexMarkVariant } from './ApexMark';

export type LogoLayout = 'horizontal' | 'stacked' | 'icon-only';
export type LogoSize = 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LogoTheme = 'light' | 'dark' | 'gold' | 'navy' | 'fire';
export type TaglineMode = 'none' | 'corporate' | 'slogan' | 'full';

export interface ApexBrandLogoProps {
  layout?: LogoLayout;
  size?: LogoSize;
  theme?: LogoTheme;
  markVariant?: ApexMarkVariant;
  taglineMode?: TaglineMode;
  corporateName?: string;
  slogan?: string;
  className?: string;
  onClick?: () => void;
  asLink?: boolean;
  href?: string;
}

/**
 * Bảng kích thước chuẩn hóa cho từng thành phần (Mark, Chữ chính, Hậu tố VN, Tagline)
 */
const SIZE_CONFIGS = {
  xs: {
    markSize: 22,
    wordmarkClass: 'text-sm tracking-[0.2em]',
    suffixClass: 'text-[9px] tracking-widest',
    stackedMarkSize: 32,
    taglineClass: 'text-[8px]',
    dividerClass: 'h-4',
  },
  sm: {
    markSize: 28,
    wordmarkClass: 'text-base sm:text-lg tracking-[0.22em]',
    suffixClass: 'text-[10px] tracking-widest',
    stackedMarkSize: 42,
    taglineClass: 'text-[9px]',
    dividerClass: 'h-5',
  },
  md: {
    markSize: 36,
    wordmarkClass: 'text-xl sm:text-2xl tracking-[0.24em]',
    suffixClass: 'text-xs tracking-[0.28em]',
    stackedMarkSize: 56,
    taglineClass: 'text-[10px]',
    dividerClass: 'h-7',
  },
  lg: {
    markSize: 44,
    wordmarkClass: 'text-2xl sm:text-3xl tracking-[0.26em]',
    suffixClass: 'text-sm tracking-[0.3em]',
    stackedMarkSize: 72,
    taglineClass: 'text-xs',
    dividerClass: 'h-9',
  },
  xl: {
    markSize: 56,
    wordmarkClass: 'text-3xl sm:text-4xl tracking-[0.28em]',
    suffixClass: 'text-base tracking-[0.32em]',
    stackedMarkSize: 96,
    taglineClass: 'text-sm',
    dividerClass: 'h-11',
  },
  // 'auto': Tự động co giãn mượt mà theo breakpoints màn hình (Mobile -> Tablet -> Desktop)
  auto: {
    markSize: 30, // baseline
    wordmarkClass: 'text-lg sm:text-xl lg:text-2xl tracking-[0.2em] sm:tracking-[0.25em]',
    suffixClass: 'text-[10px] sm:text-xs tracking-[0.25em]',
    stackedMarkSize: 48,
    taglineClass: 'text-[9px] sm:text-[10px]',
    dividerClass: 'h-5 sm:h-7',
  },
};

/**
 * Phối màu chuẩn thương hiệu APEX VN
 */
const THEME_CONFIGS = {
  // Nền sáng (Header ban ngày, modal)
  light: {
    defaultMark: 'faceted-gold' as ApexMarkVariant,
    wordmarkColor: 'text-slate-900',
    suffixColor: 'text-[#C5A059] font-bold',
    taglineTitle: 'text-slate-800',
    taglineSubtitle: 'text-slate-500',
    dividerColor: 'border-neutral-200',
    hairlineColor: 'bg-neutral-300',
  },
  // Nền tối (Header tối, Hero banner, Footer đen)
  dark: {
    defaultMark: 'faceted-gold' as ApexMarkVariant,
    wordmarkColor: 'text-white',
    suffixColor: 'text-[#DFBA73] font-bold',
    taglineTitle: 'text-neutral-200',
    taglineSubtitle: 'text-neutral-400',
    dividerColor: 'border-white/20',
    hairlineColor: 'bg-white/30',
  },
  // Option A - Luxury & Power (Matte Gold & Matte Black)
  gold: {
    defaultMark: 'faceted-gold' as ApexMarkVariant,
    wordmarkColor: 'text-white',
    suffixColor: 'text-[#C5A059] font-bold',
    taglineTitle: 'text-amber-100',
    taglineSubtitle: 'text-amber-200/60',
    dividerColor: 'border-[#C5A059]/30',
    hairlineColor: 'bg-[#C5A059]/40',
  },
  // Option B - Modern Clean (Navy Dark & Silver Gray)
  navy: {
    defaultMark: 'faceted-navy' as ApexMarkVariant,
    wordmarkColor: 'text-[#0B132B]',
    suffixColor: 'text-[#B0B6C3] font-semibold',
    taglineTitle: 'text-[#0B132B]',
    taglineSubtitle: 'text-slate-500',
    dividerColor: 'border-slate-300',
    hairlineColor: 'bg-[#B0B6C3]',
  },
  // PCCC Brand Identity (Đỏ ngọn lửa PCCC & Vàng ánh kim)
  fire: {
    defaultMark: 'faceted-fire' as ApexMarkVariant,
    wordmarkColor: 'text-slate-950',
    suffixColor: 'text-red-700 font-bold',
    taglineTitle: 'text-slate-800',
    taglineSubtitle: 'text-slate-500',
    dividerColor: 'border-red-200',
    hairlineColor: 'bg-red-300',
  },
};

/**
 * Component Thương hiệu Master: APEX BRAND LOGO
 * Hỗ trợ tách mảng độc lập, co giãn tỉ lệ tự động và phù hợp mọi ngữ cảnh trên website.
 */
export const ApexBrandLogo: React.FC<ApexBrandLogoProps> = ({
  layout = 'horizontal',
  size = 'auto',
  theme = 'light',
  markVariant,
  taglineMode = 'full',
  corporateName = 'CÔNG TY TNHH APEX VIỆT NAM',
  slogan = 'Vững chuẩn an toàn, trọn niềm an tâm',
  className = '',
  onClick,
  asLink = true,
  href = '/',
}) => {
  const sizeConfig = SIZE_CONFIGS[size];
  const themeConfig = THEME_CONFIGS[theme];
  const resolvedMarkVariant = markVariant || themeConfig.defaultMark;

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  // 1. CHỈ CÓ BIỂU TƯỢNG (ICON ONLY)
  if (layout === 'icon-only') {
    const markEl = (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <ApexMark size={sizeConfig.markSize} variant={resolvedMarkVariant} />
      </div>
    );
    if (onClick && asLink) {
      return (
        <a
          href={href}
          onClick={handleAnchorClick}
          className="inline-flex items-center justify-center focus:outline-hidden hover:opacity-90 transition-opacity"
          aria-label="APEX Logo"
        >
          {markEl}
        </a>
      );
    }
    return markEl;
  }

  // 2. BỐ CỤC DỌC (STACKED LOGO - VERTICAL)
  // Biểu tượng A ở trên, chữ A P E X ở giữa, — V N — ở dưới
  if (layout === 'stacked') {
    const content = (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        {/* Mảng 1: Biểu tượng A trên đỉnh */}
        <div className="mb-2 sm:mb-3">
          <ApexMark
            size={sizeConfig.stackedMarkSize}
            variant={resolvedMarkVariant}
            className="drop-shadow-xs"
          />
        </div>

        {/* Mảng 2: Tên thương hiệu APEX */}
        <span
          className={`font-black font-sans uppercase ${sizeConfig.wordmarkClass} ${themeConfig.wordmarkColor} leading-none`}
          style={{ letterSpacing: '0.32em', paddingLeft: '0.32em' }}
        >
          APEX
        </span>

        {/* Mảng 3: Hậu tố — VN — với 2 đường chỉ mảnh */}
        <div className="mt-1.5 sm:mt-2 flex items-center justify-center gap-2 sm:gap-3 w-full">
          <span className={`h-px w-5 sm:w-8 ${themeConfig.hairlineColor}`} />
          <span
            className={`font-bold font-sans ${sizeConfig.suffixClass} ${themeConfig.suffixColor} uppercase leading-none`}
            style={{ letterSpacing: '0.28em', paddingLeft: '0.28em' }}
          >
            VN
          </span>
          <span className={`h-px w-5 sm:w-8 ${themeConfig.hairlineColor}`} />
        </div>

        {/* Mảng 4: Tagline phụ (nếu bật) */}
        {taglineMode !== 'none' && (
          <p className={`mt-2 font-medium ${sizeConfig.taglineClass} ${themeConfig.taglineSubtitle} tracking-wider uppercase`}>
            {taglineMode === 'corporate' || taglineMode === 'full' ? corporateName : slogan}
          </p>
        )}
      </div>
    );

    if (onClick && asLink) {
      return (
        <a
          href={href}
          onClick={handleAnchorClick}
          className="group inline-flex flex-col items-center text-left focus:outline-hidden hover:opacity-95 transition-opacity"
          aria-label="Trang chủ APEX"
        >
          {content}
        </a>
      );
    }
    return content;
  }

  // 3. BỐ CỤC NGANG (PRIMARY LOGO - HORIZONTAL)
  // Biểu tượng A kết hợp cùng chữ P E X   V N tạo thành cụm thương hiệu liền mạch
  const horizontalContent = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      {/* Cụm biểu tượng & chữ thương hiệu */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Mảng 1: Biểu tượng đỉnh chóp chữ A */}
        <div className="flex items-center justify-center shrink-0">
          <ApexMark
            size={size === 'auto' ? undefined : sizeConfig.markSize}
            variant={resolvedMarkVariant}
            className={
              size === 'auto'
                ? 'h-6 w-auto sm:h-7 lg:h-8 drop-shadow-xs transition-transform duration-300 group-hover:scale-105'
                : 'drop-shadow-xs transition-transform duration-300 group-hover:scale-105'
            }
          />
        </div>

        {/* Mảng 2 + 3: Chữ APEX và VN */}
        <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none">
          <span
            className={`font-black font-sans uppercase ${sizeConfig.wordmarkClass} ${themeConfig.wordmarkColor}`}
            style={{ letterSpacing: '0.22em' }}
          >
            APEX
          </span>
          <span
            className={`font-bold font-sans uppercase ${sizeConfig.suffixClass} ${themeConfig.suffixColor}`}
            style={{ letterSpacing: '0.2em' }}
          >
            VN
          </span>
        </div>
      </div>

      {/* Mảng 4: Vách ngăn và Thông tin pháp nhân / Khẩu hiệu phụ (Tự động co giãn thông minh) */}
      {taglineMode !== 'none' && (
        <div className="hidden sm:flex items-center border-l pl-2.5 sm:pl-3 border-neutral-300/80 dark:border-white/20">
          <div className="flex flex-col justify-center">
            {(taglineMode === 'corporate' || taglineMode === 'full') && (
              <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${themeConfig.taglineTitle} leading-snug`}>
                {corporateName}
              </span>
            )}
            {(taglineMode === 'slogan' || taglineMode === 'full') && (
              <span className={`text-[9px] sm:text-[10px] font-medium ${themeConfig.taglineSubtitle} leading-tight`}>
                {slogan}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (onClick && asLink) {
    return (
      <a
        href={href}
        onClick={handleAnchorClick}
        className="group inline-flex items-center text-left focus:outline-hidden hover:opacity-95 transition-opacity cursor-pointer"
        title="Về trang chủ APEX"
      >
        {horizontalContent}
      </a>
    );
  }

  return horizontalContent;
};

/**
 * Brand Avatar cho Nền tảng số (Icon ứng dụng, Profile mạng xã hội, Chat Widget)
 * Chuẩn nhận diện: Hình squircle (bo góc mềm mại) chứa biểu tượng chữ A mạ vàng/navy.
 */
export interface ApexAvatarProps {
  size?: number;
  theme?: 'dark-gold' | 'navy-white' | 'white-navy' | 'fire-gold';
  className?: string;
}

export const ApexAvatar: React.FC<ApexAvatarProps> = ({
  size = 40,
  theme = 'dark-gold',
  className = '',
}) => {
  const getThemeStyles = () => {
    switch (theme) {
      case 'dark-gold':
        return {
          bg: 'bg-[#111111] border border-white/10 shadow-md',
          mark: 'faceted-gold' as ApexMarkVariant,
        };
      case 'navy-white':
        return {
          bg: 'bg-[#0B132B] border border-sky-400/20 shadow-md',
          mark: 'solid-white' as ApexMarkVariant,
        };
      case 'white-navy':
        return {
          bg: 'bg-white border border-slate-200 shadow-sm',
          mark: 'faceted-navy' as ApexMarkVariant,
        };
      case 'fire-gold':
        return {
          bg: 'bg-[#102B21] border border-amber-500/20 shadow-md',
          mark: 'faceted-gold' as ApexMarkVariant,
        };
    }
  };

  const style = getThemeStyles();
  const markSize = Math.round(size * 0.58);

  return (
    <div
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.24) }}
      className={`inline-flex items-center justify-center shrink-0 select-none overflow-hidden ${style.bg} ${className}`}
      aria-hidden="true"
    >
      <ApexMark size={markSize} variant={style.mark} />
    </div>
  );
};
