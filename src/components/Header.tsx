import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { DigiShotLogo } from "./Logo";
import { LanguageCurrencySwitchers } from "./LanguageCurrencySwitchers";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const { t, openCheckout } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1. CLEAN TOP ANNOUNCEMENT BAR (Subtle, Centered, Apple / Teenage Engineering Aesthetic) */}
      <div className="bg-[#F3F4F6] dark:bg-[#16171A] border-b border-black/5 dark:border-white/5 py-2 px-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 tracking-wider">
          <span>{t.announcement.dropPrefix}</span>
        </div>
      </div>

      {/* 2. FLOATING MINIMALIST HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0B0B0C]/80 backdrop-blur-md border-b border-black/5 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 min-h-[90px] flex items-center justify-between">
          {/* Left: Official DigiShot Logo */}
          <a href="/" className="flex items-center no-underline select-none flex-shrink-0 py-1">
            <img 
              src="logo.png" 
              alt="DigiShot" 
              className="w-auto object-contain flex-shrink-0 transition-transform" 
              style={{ height: "80px", maxHeight: "80px", width: "auto" }} 
            />
          </a>

          {/* Center: Clean Muted Sans-Serif Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-slate-600 dark:text-slate-400">
            <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#variants" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.nav.variants}</a>
            <a href="#how-it-works" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.nav.howItWorks}</a>
            <a href="#gallery" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.nav.gallery}</a>
            <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.nav.faq}</a>
          </nav>

          {/* Right: Unified Compact Control Cluster */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Desktop Language, Currency, and Theme Switcher Cluster */}
            <div className="hidden sm:block">
              <LanguageCurrencySwitchers layout="desktop" />
            </div>

            {/* Main Elegant Compact CTA: "Waitlist Drop →" */}
            <button
              onClick={() => openCheckout()}
              className="px-4 py-2 rounded-full bg-[#A2B997] hover:bg-[#92A987] text-black font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              {t.nav.orderNow}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-black/5 dark:border-white/10 cursor-pointer transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-black/5 dark:border-white/10 bg-white/95 dark:bg-[#0F1118]/95 backdrop-blur-xl px-6 py-4 space-y-3 font-medium text-slate-800 dark:text-slate-200 transition-colors"
            >
              <div className="pb-1">
                <LanguageCurrencySwitchers
                  layout="mobile"
                  onSelect={() => setMobileMenuOpen(false)}
                />
              </div>

              <div className="flex flex-col space-y-2.5 pt-2 border-t border-black/5 dark:border-white/10 text-xs">
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-slate-900 dark:hover:text-white"
                >
                  {t.nav.features}
                </a>
                <a
                  href="#variants"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-slate-900 dark:hover:text-white"
                >
                  {t.nav.variants}
                </a>
                <a
                  href="#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-slate-900 dark:hover:text-white"
                >
                  {t.nav.howItWorks}
                </a>
                <a
                  href="#gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-slate-900 dark:hover:text-white"
                >
                  {t.nav.gallery}
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-slate-900 dark:hover:text-white"
                >
                  {t.nav.faq}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};