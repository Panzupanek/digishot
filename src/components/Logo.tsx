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
    <a href="#" className={`flex items-center gap-3 text-slate-900 dark:text-white no-underline group select-none ${className}`}>
      {/* DigiShot Minimalist Lens & Flash Icon */}
      <svg
        className={`${iconDimensions[size]} flex-shrink-0 text-current`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Vnější prstenec objektivu */}
        <circle cx="46" cy="52" r="32" stroke="currentColor" strokeWidth="6" />
        
        {/* Vnitřní prstenec optiky */}
        <circle cx="46" cy="52" r="19" stroke="currentColor" strokeWidth="5" />
        
        {/* Středové jádro */}
        <circle cx="46" cy="52" r="9" fill="currentColor" />
        
        {/* Jemný půlměsíční odlesk */}
        <path
          d="M36 40 C36 40, 41 36, 48 36 C54 36, 57 39, 57 39 C53 43, 44 45, 36 40 Z"
          fill="currentColor"
        />
        
        {/* 4cípá jiskra blesku v šalvějově zelené barvě (#A2B997) */}
        <path
          d="M78 30 Q78 18 68 18 Q78 18 78 6 Q78 18 88 18 Q78 18 78 30 Z"
          fill="#A2B997"
        />
      </svg>

      {/* Prémiový Wordmark DigiShot */}
      {showWordmark && (
        <span className={`${textSizes[size]} font-bold tracking-tight text-current ${wordmarkClassName}`}>
          DigiShot
        </span>
      )}
    </a>
  );
};