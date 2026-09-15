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
    <a href="/" className={`flex items-center select-none no-underline ${className}`}>
      <img
        src="/logo.png"
        alt="DigiShot"
        className={`${heightClasses[size]} w-auto object-contain transition-transform hover:scale-105 active:scale-95`}
      />
    </a>
  );
};