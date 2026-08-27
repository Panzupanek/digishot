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
    <a href="#" className={`flex items-center gap-3 text-slate-900 dark:text-white no-underline select-none ${className}`}>
      <svg
        className={`${iconDimensions[size]} flex-shrink-0 text-current`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Square camera body */}
        <rect
          x="14"
          y="10"
          width="72"
          height="66"
          stroke="currentColor"
          strokeWidth="7"
          fill="none"
        />

        {/* Outer lens ring */}
        <circle
          cx="50"
          cy="43"
          r="21"
          stroke="currentColor"
          strokeWidth="7"
          fill="none"
        />

        {/* Inner lens core */}
        <circle
          cx="50"
          cy="43"
          r="13"
          fill="currentColor"
        />

        {/* Lens reflection (top-left) */}
        <path
          d="M42 34 C42 34, 46 30, 52 30 C56 30, 58 32, 58 32 C55 35, 48 37, 42 34 Z"
          className="fill-white dark:fill-[#090A0E]"
          fill="currentColor"
        />

        {/* Sharp 4-point star flash (bottom-right) */}
        <path
          d="M68 56 Q68 47 60 47 Q68 47 68 38 Q68 47 76 47 Q68 47 68 56 Z"
          fill="currentColor"
        />

        {/* Distinctly shorter bottom baseline centered underneath */}
        <line
          x1="30"
          y1="88"
          x2="70"
          y2="88"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark && (
        <span className={`${textSizes[size]} font-bold tracking-tight text-current ${wordmarkClassName}`}>
          DigiShot
        </span>
      )}
    </a>
  );
};