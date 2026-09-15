import React from "react";

interface LogoProps {
  className?: string;
  size?: string;
  showWordmark?: boolean;
}

export const DigiShotLogo: React.FC<LogoProps> = ({
  className = "",
}) => {
  return (
    <a href="/" className={`flex items-center ${className}`}>
      <img src="logo.png" alt="DigiShot" className="h-9 w-auto object-contain" />
    </a>
  );
};