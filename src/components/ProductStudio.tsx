import React from "react";
import { useShop } from "../context/ShopContext";
import { PRODUCT_VARIANTS } from "../data/products";
import { CameraModel } from "./CameraModel";
import { Check, Zap, Sparkles, Package, Bell, EyeOff, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export const ProductStudio: React.FC = () => {
  const {
    t,
    selectedVariant,
    setSelectedVariant,
    formatPrice,
    openCheckout,
    triggerFlash,
  } = useShop();

  const currentVariant =
    PRODUCT_VARIANTS.find((v) => v.id === selectedVariant) || PRODUCT_VARIANTS[0];

  const currentPriceFormatted = formatPrice(
    currentVariant.priceCZK,
    currentVariant.priceEUR
  );

  return (
    <section id="variants" className="py-20 bg-white dark:bg-[#0C0D12] border-y border-black/10 dark:border-white/10 relative transition-colors duration-300">
      {/* Glow highlight */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A2B997]/15 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#A2B997]/20 dark:bg-[#A2B997]/10 border border-[#7B9370]/30 dark:border-[#A2B997]/30 text-xs font-mono text-[#5A734F] dark:text-[#A2B997] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.variants.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white transition-colors">
            {t.variants.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal transition-colors">
            {t.variants.subheading}
          </p>
        </div>

        {/* 2-Column Product Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Visual Camera Studio */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#12141C] border border-black/10 dark:border-white/10 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
            {/* Camera Model */}
            <div className="w-full py-4">
              <CameraModel
                variantId={selectedVariant}
                interactive={true}
                onFlashClick={triggerFlash}
              />
            </div>

            {/* Bottom flash interaction button */}
            <div className="mt-4 flex items-center space-x-3 z-10">
              <button
                onClick={triggerFlash}
                className="px-4 py-2 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-[#7B9370]/40 dark:border-[#A2B997]/40 text-[#5A734F] dark:text-[#C4D8BC] text-xs font-mono flex items-center space-x-2 transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{t.hero.flashBtn}</span>
              </button>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                ⚡ 500+ flashes on single charge
              </span>
            </div>
          </div>

          {/* Right Column: Variant Selector, Specs & Reserve Action */}
          <div className="lg:col-span-6 space-y-6">
            {/* Title & Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl sm:text-3xl font-black font-sans text-slate-900 dark:text-white transition-colors">
                  {t.variants[currentVariant.nameKey]}
                </h3>
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#7B9370] dark:text-[#A2B997]">
                  {currentPriceFormatted}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal transition-colors">
                {t.variants[currentVariant.descKey]}
              </p>
            </div>

            {/* Color Option Cards (Clean, without micro-label clutter) */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase block">
                {t.variants.selectColor}
              </span>
              <div className="grid grid-cols-3 gap-3">
                {PRODUCT_VARIANTS.map((variant) => {
                  const isSelected = selectedVariant === variant.id;
                  return (
                    <motion.button
                      key={variant.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "bg-[#A2B997]/20 border-[#7B9370] dark:border-[#A2B997] shadow-sm dark:shadow-neon-sage"
                          : "bg-white dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {/* Color Preview Swatch Dot */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="w-5 h-5 rounded-full border border-black/20 dark:border-white/30 shadow-sm"
                          style={{ backgroundColor: variant.colors.primary }}
                        />
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#7B9370] dark:bg-[#A2B997] text-white dark:text-black flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold font-sans text-slate-900 dark:text-white block truncate">
                        {t.variants[variant.nameKey]}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Specs Checklist */}
            <div className="pt-2 pb-2 space-y-2.5">
              <div className="flex items-start space-x-3 p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                <div className="p-1 rounded-lg bg-emerald-500/20 text-[#5A734F] dark:text-[#A2B997] mt-0.5">
                  <EyeOff className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    {t.specs.noScreenTitle}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.specs.noScreenDesc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                <div className="p-1 rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    {t.specs.flashTitle}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.specs.flashDesc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                <div className="p-1 rounded-lg bg-pink-500/20 text-pink-600 dark:text-pink-300 mt-0.5">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    {t.specs.usbTransferTitle}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.specs.usbTransferDesc}</p>
                </div>
              </div>
            </div>

            {/* Included in Box Summary */}
            <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-black/40 border border-black/10 dark:border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <Package className="w-4 h-4 text-[#7B9370] dark:text-[#A2B997]" />
                <span>{t.variants.includedInBox}</span>
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                {t.variants.boxItems.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-1.5 truncate">
                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Pre-order Action */}
            <div className="pt-2">
              <button
                onClick={() => openCheckout(selectedVariant)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#A2B997] via-[#8FA885] to-[#FF70A6] text-black font-black text-sm sm:text-base shadow-md dark:shadow-neon-sage hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-3 cursor-pointer"
              >
                <Bell className="w-5 h-5 text-black" />
                <span>{t.variants.reserveBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};