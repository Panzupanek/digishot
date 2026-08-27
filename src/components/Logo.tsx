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
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
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
      {/* DigiShot Official Camera Brand Icon */}
      <svg
        className={`${iconDimensions[size]} text-current flex-shrink-0`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. Outer Square Frame (Crisp, non-curved or very subtle rx=2) */}
        <rect
          x="14"
          y="8"
          width="72"
          height="72"
          stroke="currentColor"
          strokeWidth="7"
          fill="none"
        />

        {/* 2. Large Circular Lens Outer Ring */}
        <circle
          cx="50"
          cy="44"
          r="23"
          stroke="currentColor"
          strokeWidth="7"
          fill="none"
        />

        {/* 3. Inner Lens Core Fill */}
        <circle
          cx="50"
          cy="44"
          r="14"
          fill="currentColor"
        />

        {/* 4. Lens Crescent Reflection (Top-Left) */}
        <path
          d="M41 35 C41 35, 45 31, 51 31 C56 31, 58 33, 58 33 C55 36, 47 38, 41 35 Z"
          fill="#ffffff"
        />

        {/* 5. Sharp 4-Pointed Flash Star (Bottom-Right of the lens ring) */}
        <path
          d="M67 56 Q67 48 61 48 Q67 48 67 40 Q67 48 73 48 Q67 48 67 56 Z"
          fill="currentColor"
        />

        {/* 6. Short Baseline Underneath (Distinctly SHORTER than the square width) */}
        <line
          x1="28"
          y1="90"
          x2="72"
          y2="90"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>

      {/* DigiShot Wordmark */}
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