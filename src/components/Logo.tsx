import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showWordmark?: boolean;
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
    <a href="/" className={`flex items-center ${className}`}>
      <img
        src="/logo.png"
        alt="DigiShot"
        className={`${heightClasses[size]} w-auto object-contain rounded-lg select-none`}
      />
    </a>
  );
};