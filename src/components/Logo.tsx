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
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  return (
    <div className={`flex items-center space-x-3 select-none text-[#121316] dark:text-white ${className}`}>
      {/* Exact Vector Brand Icon */}
      <div className={`relative flex items-center justify-center ${iconDimensions[size]} flex-shrink-0`}>
        <svg
          viewBox="0 0 110 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          {/* Mask to create clean transparent reflection cutouts on any background */}
          <mask id="lens-reflection-mask">
            <rect width="110" height="115" fill="white" />
            {/* Top-Left Reflection Arc Cutout */}
            <path
              d="M 39 44 A 14 14 0 0 1 47 37"
              fill="none"
              stroke="black"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Bottom-Right Reflection Arc Cutout */}
            <path
              d="M 57 61 A 14 14 0 0 1 63 54"
              fill="none"
              stroke="black"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </mask>

          {/* 1. Square Outer Box */}
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            fill="none"
            stroke="currentColor"
            strokeWidth="7.5"
            strokeLinejoin="miter"
          />

          {/* 2. Horizontal Baseline Underneath the Box */}
          <line
            x1="22"
            y1="104"
            x2="78"
            y2="104"
            stroke="currentColor"
            strokeWidth="7.5"
            strokeLinecap="round"
          />

          {/* 3. Outer Circular Lens Ring */}
          <circle
            cx="50"
            cy="50"
            r="28.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
          />

          {/* 4. Inner Lens Core with Reflection Cutouts */}
          <circle
            cx="50"
            cy="50"
            r="18.5"
            fill="currentColor"
            mask="url(#lens-reflection-mask)"
          />

          {/* 5. 4-Pointed Flash Sparkle Star (✦) overlapping bottom-right of lens ring */}
          <path
            d="M 68 53 Q 68 64 57 64 Q 68 64 68 75 Q 68 64 79 64 Q 68 64 68 53 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Wordmark "DigiShot" */}
      {showWordmark && (
        <span
          className={`${textSizes[size]} font-black tracking-[-0.02em] font-sans text-[#121316] dark:text-white leading-none ${wordmarkClassName}`}
          style={{ letterSpacing: "-0.025em" }}
        >
          DigiShot
        </span>
      )}
    </div>
  );
};