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
    <a href="/" className={`flex items-center no-underline select-none flex-shrink-0 py-1 ${className}`}>
      <img
        src="logo.png"
        alt="DigiShot"
        className="w-auto object-contain flex-shrink-0 transition-transform"
        style={{ height: "80px", maxHeight: "80px", width: "auto" }}
      />
    </a>
  );
};