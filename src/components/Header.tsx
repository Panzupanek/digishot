import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { CountdownTimer } from "./CountdownTimer";
import { DigiShotLogo } from "./Logo";
import { LanguageCurrencySwitchers } from "./LanguageCurrencySwitchers";
import { Zap, Menu, X, Sparkles, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const { t, openCheckout } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar with Live Countdown & Sold Out badge */}
      <div className="bg-gradient-to-r from-[#A2B997]/25 via-emerald-100/30 dark:via-emerald-900/30 to-[#FF70A6]/20 border-b border-black/10 dark:border-white/10 text-xs py-2 px-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono">
          <div className="flex items-center space-x-2 truncate">
            <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30 text-[10px] font-bold">
              {t.announcement.soldOutBadge}
            </span>
            <span className="text-slate-900 dark:text-white font-bold">{t.announcement.dropPrefix}</span>
            <CountdownTimer compact={true} />
          </div>
          <div className="hidden md:flex items-center space-x-2 text-slate-600 dark:text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-[#5A734F] dark:text-[#A2B997]" />
            <span className="font-semibold">{t.announcement.dropSuffix}</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-[#F8FAF7]/90 dark:bg-[#0B0B0C]/90 backdrop-blur-xl border-b border-black/10 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo with Official SVG */}
          <a href="#" className="flex items-center space-x-3 group">
            <DigiShotLogo size="md" className="group-hover:opacity-85 transition-opacity" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors">
            <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#variants" className="hover:text-[#5A734F] dark:hover:text-[#A2B997] transition-colors">{t.nav.variants}</a>
            <a href="#how-it-works" className="hover:text-[#0284c7] dark:hover:text-[#70EEFF] transition-colors">{t.nav.howItWorks}</a>
            <a href="#gallery" className="hover:text-[#e11d48] dark:hover:text-[#FF70A6] transition-colors">{t.nav.gallery}</a>
            <a href="#comparison" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.nav.specs}</a>
            <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.nav.faq}</a>
          </nav>

          {/* Controls: Language, Currency, Theme Switcher, Waitlist CTA */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Desktop Language & Currency Switchers */}
            <div className="hidden sm:block">
              <LanguageCurrencySwitchers layout="desktop" />
            </div>

            {/* VIP Waitlist CTA Button */}
            <button
              onClick={() => openCheckout()}
              className="relative flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#A2B997] to-[#FF70A6] hover:opacity-95 text-black font-extrabold text-xs sm:text-sm shadow-md dark:shadow-neon-sage transition-all transform active:scale-95 cursor-pointer"
            >
              <Bell className="w-4 h-4 text-black" />
              <span className="font-sans whitespace-nowrap">{t.nav.orderNow}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-black/10 dark:border-white/10 cursor-pointer transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              className="lg:hidden border-b border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0F1118]/95 backdrop-blur-xl px-6 py-5 space-y-4 font-medium text-slate-800 dark:text-slate-200 transition-colors"
            >
              {/* Mobile Language & Currency Switcher integrated at the top */}
              <div className="pb-2">
                <LanguageCurrencySwitchers
                  layout="mobile"
                  onSelect={() => setMobileMenuOpen(false)}
                />
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col space-y-3 pt-2 border-t border-black/10 dark:border-white/10">
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#5A734F] dark:hover:text-[#A2B997]"
                >
                  {t.nav.features}
                </a>
                <a
                  href="#variants"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#5A734F] dark:hover:text-[#A2B997]"
                >
                  {t.nav.variants}
                </a>
                <a
                  href="#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#0284c7] dark:hover:text-[#70EEFF]"
                >
                  {t.nav.howItWorks}
                </a>
                <a
                  href="#gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#e11d48] dark:hover:text-[#FF70A6]"
                >
                  {t.nav.gallery}
                </a>
                <a
                  href="#comparison"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-slate-900 dark:hover:text-white"
                >
                  {t.nav.specs}
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-slate-900 dark:hover:text-white"
                >
                  {t.nav.faq}
                </a>
              </div>

              {/* Mobile CTA */}
              <div className="pt-3 border-t border-black/10 dark:border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCheckout();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#A2B997] to-[#FF70A6] text-black font-bold text-sm shadow-md dark:shadow-neon-sage flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>{t.nav.orderNow}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};