import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showWordmark?: boolean;
}

export const DigiShotLogo: React.FC<LogoProps> = ({
  size = "md",
  className = "",
  showWordmark = true,
}) => {
  const iconDimensions = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-14 w-14",
  };

  const textSizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
    xl: "text-5xl",
  };

  return (
    <div className={`flex items-center gap-3 no-underline select-none text-gray-900 dark:text-white ${className}`}>
      {/* Crisp DigiShot Official Camera Brand Icon */}
      <svg
        className={`${iconDimensions[size]} flex-shrink-0 text-current`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. Squircle Body */}
        <rect
          x="8"
          y="8"
          width="84"
          height="84"
          rx="22"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
        />

        {/* 2. Outer Lens Ring */}
        <circle
          cx="50"
          cy="50"
          r="26"
          stroke="currentColor"
          strokeWidth="7"
          fill="none"
        />

        {/* 3. Inner Lens Core */}
        <circle
          cx="50"
          cy="50"
          r="16"
          fill="currentColor"
        />

        {/* 4. Top-Left Reflection Crescent */}
        <path
          d="M41 40 C41 40, 45 35, 52 35 C56 35, 59 38, 59 38 C55 41, 47 43, 41 40 Z"
          fill="#ffffff"
          className="dark:fill-[#090A0E] fill-white"
        />

        {/* 5. Sage Green 4-Point Star (✦) Bottom-Right */}
        <path
          d="M74 69 Q74 58 63 58 Q74 58 74 47 Q74 58 85 58 Q74 58 74 69 Z"
          fill="#94A684"
        />
      </svg>

      {/* High-Contrast DigiShot Wordmark */}
      {showWordmark && (
        <span
          className={`${textSizes[size]} font-extrabold tracking-tight text-current`}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          DigiShot
        </span>
      )}
    </div>
  );
};