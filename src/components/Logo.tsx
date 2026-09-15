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
    <a href="/" className={`flex items-center flex-shrink-0 no-underline select-none ${className}`}>
      <img
        src="logo.png"
        alt="DigiShot"
        className="h-14 md:h-16 w-auto object-contain flex-shrink-0"
        style={{ height: "56px", maxHeight: "56px", width: "auto" }}
      />
    </a>
  );
};