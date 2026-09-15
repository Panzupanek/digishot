import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const DigiShotLogo: React.FC<LogoProps> = ({
  size = "md",
  className = "",
}) => {
  const heightClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
    xl: "h-14",
  };

  return (
    <a href="#" className={`flex items-center gap-4 text-slate-900 dark:text-white no-underline select-none ${className}`}>
      {/* Exact DigiShot Logo Graphic */}
      <svg
        className={`${heightClasses[size]} w-auto flex-shrink-0 text-current`}
        viewBox="0 0 320 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. Rounded Square Body (Squircle) */}
        <rect
          x="6"
          y="6"
          width="78"
          height="78"
          rx="18"
          stroke="currentColor"
          strokeWidth="7"
          fill="none"
        />

        {/* 2. Outer Lens Ring */}
        <circle
          cx="45"
          cy="45"
          r="23"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
        />

        {/* 3. Inner Lens Core */}
        <circle
          cx="45"
          cy="45"
          r="14"
          fill="currentColor"
        />

        {/* 4. Top-Left Lens Crescent Reflection */}
        <path
          d="M37 36 C37 36, 41 32, 47 32 C51 32, 53 34, 53 34 C50 37, 43 38, 37 36 Z"
          fill="#ffffff"
        />

        {/* 5. Sage Green 4-Pointed Flash Star (Bottom-Right) */}
        <path
          d="M68 62 Q68 51 58 51 Q68 51 68 40 Q68 51 78 51 Q68 51 68 62 Z"
          fill="#98A886"
        />

        {/* 6. Exact DigiShot Wordmark */}
        <text
          x="100"
          y="58"
          fill="currentColor"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="44"
          fontWeight="700"
          letterSpacing="-1"
        >
          DigiShot
        </text>
      </svg>
    </a>
  );
};