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
    <a href="/" className={`flex items-center flex-shrink-0 no-underline ${className}`}>
      <img
        src="logo.png"
        alt="DigiShot"
        className="h-12 md:h-14 w-auto object-contain flex-shrink-0"
      />
    </a>
  );
};