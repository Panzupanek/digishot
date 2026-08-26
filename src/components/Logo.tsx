import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}

export const DigiShotLogo: React.FC<LogoProps> = ({
  size = "md",
  showWordmark = true,
  className = "",
}) => {
  const iconDimensions = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className={`flex items-center space-x-3 select-none text-[#121316] dark:text-white ${className}`}>
      {/* Official DigiShot SVG Icon */}
      <div className={`relative flex items-center justify-center ${iconDimensions[size]} flex-shrink-0`}>
        <svg
          viewBox="0 0 48 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          {/* Defs for Glow Filter */}
          <defs>
            <filter id="sage-star-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Crisp Square Outer Box Outline */}
          <rect
            x="6"
            y="5"
            width="36"
            height="36"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* 2. Thin Horizontal Baseline directly underneath the box */}
          <line
            x1="3"
            y1="47"
            x2="45"
            y2="47"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* 3. Circular Camera Lens inside */}
          <circle
            cx="24"
            cy="23"
            r="10.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />

          {/* 4. Inner Crescent Reflective Arc */}
          <path
            d="M 18.5 17.5 A 7 7 0 0 1 25.5 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* 5. Sharp 4-Point Flash Sparkle / Star Icon (✦) at bottom-right edge of lens */}
          <path
            d="M 33 24.5 Q 33 30.5 27 30.5 Q 33 30.5 33 36.5 Q 33 30.5 39 30.5 Q 33 30.5 33 24.5 Z"
            fill="#A2B997"
            filter="url(#sage-star-glow)"
          />
          {/* Inner core for crisp flash center */}
          <circle cx="33" cy="30.5" r="1.2" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col justify-center">
          <span className={`${textSizes[size]} font-black tracking-tight font-sans text-[#121316] dark:text-white leading-none`}>
            DigiShot
          </span>
        </div>
      )}
    </div>
  );
};