import React, { useState, useRef, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { Language, Currency } from "../data/translations";
import { cameraSound } from "../lib/sound";
import { ChevronDown, Check, Globe, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Crisp SVG Flags (Guarantees 100% perfect rendering on Windows & all platforms)
const FlagCZ: React.FC<{ className?: string }> = ({ className = "w-4 h-3" }) => (
  <svg viewBox="0 0 24 16" className={`${className} rounded-sm shadow-sm flex-shrink-0 overflow-hidden`} fill="none">
    <rect width="24" height="8" fill="#FFFFFF" />
    <rect y="8" width="24" height="8" fill="#D7141A" />
    <polygon points="0,0 12,8 0,16" fill="#11457E" />
  </svg>
);

const FlagUK: React.FC<{ className?: string }> = ({ className = "w-4 h-3" }) => (
  <svg viewBox="0 0 24 16" className={`${className} rounded-sm shadow-sm flex-shrink-0 overflow-hidden`}>
    <clipPath id="uk-flag-clip">
      <rect width="24" height="16" />
    </clipPath>
    <g clipPath="url(#uk-flag-clip)">
      <rect width="24" height="16" fill="#012169" />
      <path d="M0,0 L24,16 M24,0 L0,16" stroke="#FFFFFF" strokeWidth="2.5" />
      <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1.5" />
      <path d="M12,0 V16 M0,8 H24" stroke="#FFFFFF" strokeWidth="4" />
      <path d="M12,0 V16 M0,8 H24" stroke="#C8102E" strokeWidth="2.4" />
    </g>
  </svg>
);

const FlagDE: React.FC<{ className?: string }> = ({ className = "w-4 h-3" }) => (
  <svg viewBox="0 0 24 16" className={`${className} rounded-sm shadow-sm flex-shrink-0 overflow-hidden`}>
    <rect width="24" height="5.33" fill="#000000" />
    <rect y="5.33" width="24" height="5.33" fill="#DD0000" />
    <rect y="10.66" width="24" height="5.34" fill="#FFCE00" />
  </svg>
);

interface SwitcherProps {
  layout?: "desktop" | "mobile";
  onSelect?: () => void;
}

export const LanguageCurrencySwitchers: React.FC<SwitcherProps> = ({
  layout = "desktop",
  onSelect,
}) => {
  const { lang, setLang, currency, setCurrency, theme, toggleTheme } = useShop();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: {
    code: Language;
    codeLabel: string;
    fullName: string;
    flag: React.FC<{ className?: string }>;
  }[] = [
    { code: "cz", codeLabel: "CZ", fullName: "Čeština", flag: FlagCZ },
    { code: "en", codeLabel: "EN", fullName: "English", flag: FlagUK },
    { code: "de", codeLabel: "DE", fullName: "Deutsch", flag: FlagDE },
  ];

  const currentLang = languages.find((l) => l.code === lang) || languages[0];
  const CurrentFlag = currentLang.flag;

  // Auto-close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (code: Language) => {
    cameraSound.playClick();
    setLang(code);
    setIsLangOpen(false);
    if (onSelect) onSelect();
  };

  const handleCurrencyChange = (curr: Currency) => {
    cameraSound.playClick();
    setCurrency(curr);
    if (onSelect) onSelect();
  };

  /* Mobile Drawer Layout */
  if (layout === "mobile") {
    return (
      <div className="space-y-3 p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 font-mono transition-colors">
        {/* Mobile Language Selector */}
        <div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block mb-2 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#5A734F] dark:text-[#A2B997]" />
            Language / Jazyk / Sprache
          </span>
          <div className="grid grid-cols-3 gap-2">
            {languages.map((item) => {
              const active = lang === item.code;
              const FlagIcon = item.flag;
              return (
                <button
                  key={item.code}
                  onClick={() => handleLanguageChange(item.code)}
                  className={`py-2 px-2 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all border cursor-pointer ${
                    active
                      ? "bg-[#A2B997]/25 border-[#7B9370] dark:border-[#A2B997] text-slate-900 dark:text-white font-bold shadow-sm"
                      : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <FlagIcon />
                  <span className="font-bold">{item.codeLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Currency & Theme Controls Row */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {/* Currency Toggle */}
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10">
            <button
              onClick={() => handleCurrencyChange("CZK")}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === "CZK"
                  ? "bg-[#A2B997] text-black shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              CZK (Kč)
            </button>
            <button
              onClick={() => handleCurrencyChange("EUR")}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === "EUR"
                  ? "bg-[#A2B997] text-black shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              EUR (€)
            </button>
          </div>

          {/* Theme Toggle Button Mobile */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center space-x-2 p-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-black/10 dark:hover:bg-white/10 transition-all cursor-pointer"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#5A734F]" />
                <span>Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  /* Desktop Header Layout */
  return (
    <div className="flex items-center space-x-2 font-mono select-none">
      {/* 1. Language Dropdown Button */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsLangOpen(!isLangOpen)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
            isLangOpen
              ? "bg-black/10 dark:bg-white/10 border-[#7B9370] dark:border-[#A2B997] text-slate-900 dark:text-white shadow-sm"
              : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border-black/10 dark:border-white/15 text-slate-700 dark:text-slate-200"
          }`}
          title="Change language"
          aria-expanded={isLangOpen}
        >
          <CurrentFlag />
          <span className="font-bold tracking-wide">{currentLang.codeLabel}</span>
          <motion.div
            animate={{ rotate: isLangOpen ? 180 : 0 }}
            transition={{ duration: 0.15 }}
            className="text-slate-500 dark:text-slate-400"
          >
            <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
          </motion.div>
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isLangOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#12141D] border border-black/10 dark:border-white/15 shadow-2xl p-1.5 z-50 overflow-hidden backdrop-blur-xl"
            >
              <div className="space-y-1">
                {languages.map((item) => {
                  const isSelected = lang === item.code;
                  const FlagIcon = item.flag;
                  return (
                    <button
                      key={item.code}
                      onClick={() => handleLanguageChange(item.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#A2B997]/25 text-[#5A734F] dark:text-[#A2B997] font-bold border border-[#A2B997]/30"
                          : "text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <FlagIcon />
                        <span className="font-sans font-medium">{item.fullName}</span>
                        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">
                          ({item.codeLabel})
                        </span>
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#5A734F] dark:text-[#A2B997] stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Currency Switcher Pill [ Kč | € ] */}
      <div className="flex items-center p-0.5 rounded-full bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/15 text-xs font-mono">
        <button
          onClick={() => handleCurrencyChange("CZK")}
          className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
            currency === "CZK"
              ? "bg-[#A2B997] text-black shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
          title="Prices in Czech Koruna (CZK)"
        >
          Kč
        </button>
        <button
          onClick={() => handleCurrencyChange("EUR")}
          className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
            currency === "EUR"
              ? "bg-[#A2B997] text-black shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
          title="Prices in Euros (EUR)"
        >
          €
        </button>
      </div>

      {/* 3. Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="p-1.5 rounded-full border bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border-black/10 dark:border-white/15 text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
        title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        aria-label="Toggle Theme"
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-300" />
          ) : (
            <Moon className="w-4 h-4 text-[#5A734F]" />
          )}
        </motion.div>
      </button>
    </div>
  );
};