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
    <a href="/" className={`flex items-center no-underline select-none flex-shrink-0 relative overflow-visible ${className}`}>
      <img
        src="logo.png"
        alt="DigiShot"
        className="w-auto object-contain flex-shrink-0 block"
        style={{
          height: "56px",
          minHeight: "56px",
          transform: "scale(1.35)",
          transformOrigin: "left center",
          marginLeft: "4px",
        }}
      />
    </a>
  );
};