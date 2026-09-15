import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  wordmarkClassName?: string;
}

export const DigiShotLogo: React.FC<LogoProps> = ({
  size = "md",
  className = "",
  wordmarkClassName = "",
}) => {
  const iconDimensions = {
    sm: "h-7 w-7",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-14 w-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  return (
    <a href="#" className={`flex items-center gap-3 select-none no-underline text-slate-900 dark:text-white ${className}`}>
      {/* Exact DigiShot Icon (NO BASELINE UNDERNEATH) */}
      <svg
        className={`${iconDimensions[size]} flex-shrink-0 text-current`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. Zaoblený čtverec (tělo) */}
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

        {/* 2. Vnější kroužek objektivu */}
        <circle
          cx="50"
          cy="50"
          r="26"
          stroke="currentColor"
          strokeWidth="7"
          fill="none"
        />

        {/* 3. Střed objektivu */}
        <circle
          cx="50"
          cy="50"
          r="16"
          fill="currentColor"
        />

        {/* 4. Půlměsíční odlesk vlevo nahoře */}
        <path
          d="M41 40 C41 40, 45 35, 52 35 C56 35, 59 38, 59 38 C55 41, 47 43, 41 40 Z"
          fill="#ffffff"
        />

        {/* 5. Šalvějová 4cípá hvězdička blesku vpravo dole */}
        <path
          d="M74 69 Q74 58 63 58 Q74 58 74 47 Q74 58 85 58 Q74 58 74 69 Z"
          fill="#94A684"
        />
      </svg>

      {/* Nápis DigiShot */}
      <span className={`${textSizes[size]} font-bold tracking-tight text-current ${wordmarkClassName}`}>
        DigiShot
      </span>
    </a>
  );
};