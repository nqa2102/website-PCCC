import React, { useId } from 'react';

export type ApexMarkVariant =
  | 'faceted-gold'   // Option A - Luxury & Power (Matte Gold)
  | 'faceted-fire'   // PCCC Professional (Ember / Crimson Flame)
  | 'faceted-navy'   // Option B - Modern Clean (Navy Dark / Slate)
  | 'solid-white'    // Đơn sắc trắng (cho nền tối)
  | 'solid-dark'     // Đơn sắc đen / slate tối (cho in ấn / văn bản)
  | 'solid-red'      // Đơn sắc đỏ PCCC
  | 'current';       // Theo màu chữ cha (currentColor)

export interface ApexMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  variant?: ApexMarkVariant;
  className?: string;
  showGlow?: boolean;
}

/**
 * Biểu tượng chóp nhọn chữ A (Apex Mark) - Chuẩn nhận diện thương hiệu APEX VN.
 * Tỉ lệ hình học: 116 x 100 (W/H = 1.16) tạo thế đứng vững chãi, uy quyền, góc vát thoát cạnh hiện đại.
 * Cấu trúc 2 mặt lập thể vát cạnh (Chiseled Bevel) với sống lưng chia đôi đối xứng.
 */
export const ApexMark: React.FC<ApexMarkProps> = ({
  size = 36,
  variant = 'faceted-gold',
  className = '',
  showGlow = false,
  ...rest
}) => {
  const uid = useId().replace(/:/g, '');
  const leftGradId = `apex-lgrad-${uid}`;
  const rightGradId = `apex-rgrad-${uid}`;
  const glowFilterId = `apex-glow-${uid}`;

  // Tọa độ vector chuẩn xác theo Brand Identity Board
  // Điểm đỉnh (Apex tip): (58, 4)
  // Góc chân ngoài trái (Left outer toe): (4, 96)
  // Góc chân trong trái (Left inner heel): (32, 72)
  // Điểm chóp khuyết trong (Inner apex): (58, 42)
  // Góc chân trong phải (Right inner heel): (84, 72)
  // Góc chân ngoài phải (Right outer toe): (112, 96)
  const leftWingPoints = '58,4 4,96 32,72 58,42';
  const rightWingPoints = '58,4 58,42 84,72 112,96';
  const ridgeLine = { x1: 58, y1: 4, x2: 58, y2: 42 };

  // Cấu hình bảng màu theo từng biến thể nhận diện
  const renderDefs = () => {
    switch (variant) {
      case 'faceted-gold':
        return (
          <>
            <linearGradient id={leftGradId} x1="58" y1="4" x2="14" y2="96" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5E4B5" />
              <stop offset="35%" stopColor="#DFBA73" />
              <stop offset="70%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#AA8237" />
            </linearGradient>
            <linearGradient id={rightGradId} x1="58" y1="4" x2="102" y2="96" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DFBA73" />
              <stop offset="45%" stopColor="#A88035" />
              <stop offset="80%" stopColor="#876222" />
              <stop offset="100%" stopColor="#6C4D18" />
            </linearGradient>
          </>
        );

      case 'faceted-fire':
        return (
          <>
            <linearGradient id={leftGradId} x1="58" y1="4" x2="14" y2="96" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="40%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <linearGradient id={rightGradId} x1="58" y1="4" x2="102" y2="96" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="40%" stopColor="#B91C1C" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>
          </>
        );

      case 'faceted-navy':
        return (
          <>
            <linearGradient id={leftGradId} x1="58" y1="4" x2="14" y2="96" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="30%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>
            <linearGradient id={rightGradId} x1="58" y1="4" x2="102" y2="96" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#0B132B" />
              <stop offset="100%" stopColor="#050B1A" />
            </linearGradient>
          </>
        );

      default:
        return null;
    }
  };

  // Màu fill trực tiếp cho từng mặt
  let leftFill = `url(#${leftGradId})`;
  let rightFill = `url(#${rightGradId})`;
  let ridgeStroke = 'rgba(255, 255, 255, 0.45)';

  if (variant === 'solid-white') {
    leftFill = '#FFFFFF';
    rightFill = 'rgba(255, 255, 255, 0.78)';
    ridgeStroke = '#FFFFFF';
  } else if (variant === 'solid-dark') {
    leftFill = '#0B132B';
    rightFill = '#1E293B';
    ridgeStroke = 'rgba(255, 255, 255, 0.25)';
  } else if (variant === 'solid-red') {
    leftFill = '#DC2626';
    rightFill = '#991B1B';
    ridgeStroke = 'rgba(255, 255, 255, 0.35)';
  } else if (variant === 'current') {
    leftFill = 'currentColor';
    rightFill = 'currentColor';
    ridgeStroke = 'transparent';
  }

  return (
    <svg
      viewBox="0 0 116 100"
      width={size}
      height={typeof size === 'number' ? Math.round(size * (100 / 116)) : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 select-none transition-transform duration-300 ${className}`}
      filter={showGlow ? `url(#${glowFilterId})` : undefined}
      role="img"
      aria-label="APEX Logo Mark"
      {...rest}
    >
      <defs>
        {renderDefs()}
        {showGlow && (
          <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C5A059" floodOpacity="0.35" />
          </filter>
        )}
      </defs>

      {/* Cánh trái (Mặt sáng) */}
      <polygon points={leftWingPoints} fill={leftFill} />

      {/* Cánh phải (Mặt tối / đổ bóng) */}
      <polygon points={rightWingPoints} fill={rightFill} />

      {/* Sống lưng giữa (Đường gân đỉnh) */}
      {ridgeStroke !== 'transparent' && (
        <line
          x1={ridgeLine.x1}
          y1={ridgeLine.y1}
          x2={ridgeLine.x2}
          y2={ridgeLine.y2}
          stroke={ridgeStroke}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
};
