import React from "react";
import { useShop } from "../context/ShopContext";
import { CameraModel } from "./CameraModel";
import { CAMERA_COLOR_OPTIONS } from "../data/products";
import { Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  const { t, openCheckout, triggerFlash, selectedVariant, setSelectedVariant } = useShop();

  return (
    <section className="relative pt-12 pb-24 lg:pt-24 lg:pb-32 overflow-hidden transition-colors duration-300">
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A2B997]/15 rounded-full filter blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Clean Headline, Countdown & Primary CTA */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-sans tracking-[-0.03em] text-[#0f172a] dark:text-white leading-[1.08]"
            >
              {t.hero.title}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Urgent Stock Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A2B997]/15 dark:bg-[#A2B997]/20 border border-[#A2B997]/40 text-[#405338] dark:text-[#C4D8BC] text-xs font-mono font-bold tracking-wide shadow-sm backdrop-blur-md"
            >
              <span>{t.hero.stockPill}</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5"
            >
              <button
                onClick={() => openCheckout(selectedVariant)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#98A886] hover:bg-[#889876] text-black font-extrabold text-xs sm:text-sm tracking-wider shadow-sm transition-all active:scale-95 flex items-center justify-center space-x-2.5 uppercase cursor-pointer"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={triggerFlash}
                className="w-full sm:w-auto px-5 py-3 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium text-xs font-mono hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-[#5A734F] dark:text-[#A2B997]" />
                <span>{t.hero.flashBtn}</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Interactive Camera Showcase with 8-Color Switcher */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* 8-Color Interactive Product Switcher Pills */}
            <div className="w-full max-w-lg mb-4">
              <div className="flex flex-wrap items-center justify-center gap-1.5 p-2 rounded-2xl bg-white/80 dark:bg-black/60 border border-black/10 dark:border-white/10 backdrop-blur-md shadow-sm">
                {CAMERA_COLOR_OPTIONS.map((option) => {
                  const isSelected =
                    selectedVariant === option.id ||
                    (selectedVariant === "green" && option.id === "sage") ||
                    (selectedVariant === "pink" && option.id === "blush") ||
                    (selectedVariant === "classic" && option.id === "brown");

                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedVariant(option.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#98A886]/60 ${
                        isSelected
                          ? `${option.bgActive} border-2 ${option.borderActive} font-bold shadow-sm scale-105`
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                      }`}
                      title={`Select ${option.name}`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0 shadow-sm border border-black/10 dark:border-white/20"
                        style={{ backgroundColor: option.colorDot }}
                      />
                      <span className="whitespace-nowrap">{option.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Camera Component */}
            <div className="w-full flex items-center justify-center">
              <CameraModel
                variantId={selectedVariant}
                interactive={true}
                onFlashClick={triggerFlash}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};