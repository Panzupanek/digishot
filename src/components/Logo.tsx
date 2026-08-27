import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

export const DigiShotLogo: React.FC<LogoProps> = ({
  size = "md",
  showWordmark = true,
  className = "",
  wordmarkClassName = "",
}) => {
  const iconDimensions = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  return (
    <div className={`flex items-center gap-3 select-none text-[#121316] dark:text-white ${className}`}>
      {/* Exact DigiShot Camera Vector Icon */}
      <svg
        className={`${iconDimensions[size]} text-current flex-shrink-0`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Square Body */}
        <rect
          x="18"
          y="10"
          width="64"
          height="64"
          rx="4"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
        />

        {/* Outer Lens Ring */}
        <circle
          cx="50"
          cy="42"
          r="22"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
        />

        {/* Inner Lens Fill */}
        <circle
          cx="50"
          cy="42"
          r="14"
          fill="currentColor"
        />

        {/* Lens Reflection Crescent */}
        <path
          d="M42 34 C42 34, 46 30, 52 30 C56 30, 58 32, 58 32 C55 35, 48 37, 42 34 Z"
          fill="#ffffff"
        />

        {/* 4-Pointed Flash Sparkle Star (Bottom-Right of Lens) */}
        <path
          d="M66 54 Q66 46 60 46 Q66 46 66 38 Q66 46 72 46 Q66 46 66 54 Z"
          fill="currentColor"
        />

        {/* Short Baseline Underneath (Slightly shorter than the square body) */}
        <line
          x1="28"
          y1="84"
          x2="72"
          y2="84"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Wordmark */}
      {showWordmark && (
        <span
          className={`${textSizes[size]} font-black tracking-tight text-current ${wordmarkClassName}`}
        >
          DigiShot
        </span>
      )}
    </div>
  );
};