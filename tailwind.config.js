/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#090A0E",
        surface: "#111318",
        "surface-card": "#171A21",
        "surface-light": "#212530",
        y2k: {
          sage: "#A2B997",
          "sage-light": "#C4D8BC",
          "sage-dark": "#778F6D",
          pink: "#FF70A6",
          "pink-light": "#FFB7C5",
          cyan: "#70EEFF",
          "cyan-neon": "#00F0FF",
          amber: "#FF9F1C",
          sunset: "#FF5A36",
          silver: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Space Mono'", "monospace"],
      },
      boxShadow: {
        "neon-sage": "0 0 25px -5px rgba(162, 185, 151, 0.5), 0 0 10px -2px rgba(162, 185, 151, 0.3)",
        "neon-pink": "0 0 25px -5px rgba(255, 112, 166, 0.5), 0 0 10px -2px rgba(255, 112, 166, 0.3)",
        "neon-cyan": "0 0 25px -5px rgba(112, 238, 255, 0.5), 0 0 10px -2px rgba(112, 238, 255, 0.3)",
        "neon-amber": "0 0 25px -5px rgba(255, 159, 28, 0.5), 0 0 10px -2px rgba(255, 159, 28, 0.3)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "flash-pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};