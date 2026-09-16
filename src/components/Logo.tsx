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
    <a href="/" className={`flex items-center no-underline select-none flex-shrink-0 ${className}`}>
      <img
        src="logo.png"
        alt="DigiShot"
        className="h-10 md:h-11 w-auto object-contain flex-shrink-0 block"
      />
    </a>
  );
};