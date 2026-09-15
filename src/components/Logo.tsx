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
        className="h-16 md:h-20 w-auto object-contain flex-shrink-0"
        style={{ height: "68px", maxHeight: "none", width: "auto" }}
      />
    </a>
  );
};