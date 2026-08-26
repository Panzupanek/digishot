import React from "react";
import { useShop } from "../context/ShopContext";
import { CameraModel } from "./CameraModel";
import { CountdownTimer } from "./CountdownTimer";
import { Zap, Sparkles, Star, ArrowRight, Play, EyeOff, Bell, Flame } from "lucide-react";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  const { t, openCheckout, triggerFlash, selectedVariant, setSelectedVariant } = useShop();

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden transition-colors duration-300">
      {/* Background Decorative Neon Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#A2B997]/25 via-[#70EEFF]/15 to-[#FF70A6]/20 rounded-full filter blur-[120px] -z-10 pointer-events-none opacity-80 dark:opacity-100" />
      <div className="absolute top-10 left-10 w-52 h-52 bg-[#A2B997]/20 rounded-full filter blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#70EEFF]/15 rounded-full filter blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Pitch, Countdown & Waitlist CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Urgency Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2"
            >
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#A2B997]/20 dark:bg-[#A2B997]/15 border border-[#7B9370]/30 dark:border-[#A2B997]/30 backdrop-blur-md shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#7B9370] dark:text-[#A2B997] animate-spin" style={{ animationDuration: "8s" }} />
                <span className="text-xs font-mono font-bold tracking-wider text-[#5A734F] dark:text-[#C4D8BC] uppercase">
                  {t.hero.badge}
                </span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs font-mono font-bold">
                <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                <span>{t.hero.urgencyTag}</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans tracking-tight text-slate-900 dark:text-white leading-[1.1] transition-colors"
            >
              {t.hero.title}{" "}
              <span className="block mt-2 bg-gradient-to-r from-[#7B9370] via-[#0284c7] to-[#e11d48] dark:from-[#A2B997] dark:via-[#70EEFF] dark:to-[#FF70A6] bg-clip-text text-transparent drop-shadow-sm">
                {t.hero.titleHighlight}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal transition-colors"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Live 30-Day Drop Countdown Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#10121A] border border-black/10 dark:border-[#A2B997]/30 shadow-lg dark:shadow-2xl max-w-xl mx-auto lg:mx-0 space-y-3 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[#7B9370] dark:text-[#A2B997] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#7B9370] dark:text-[#A2B997] animate-bounce" />
                  {t.hero.dropDateTitle}
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                  0/100 IN STOCK
                </span>
              </div>

              <CountdownTimer compact={false} />

              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 text-left">
                {t.hero.soldOutNotice}
              </p>
            </motion.div>

            {/* Quick Interactive Flash Trigger Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={triggerFlash}
                className="group relative inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white dark:bg-[#171A24] hover:bg-slate-50 dark:hover:bg-[#202534] border border-[#7B9370]/40 dark:border-[#A2B997]/40 text-[#5A734F] dark:text-[#C4D8BC] text-xs font-mono font-bold shadow-sm dark:shadow-neon-sage transition-all cursor-pointer transform active:scale-95"
              >
                <Zap className="w-4 h-4 text-[#7B9370] dark:text-[#A2B997] group-hover:scale-125 transition-transform" />
                <span>{t.hero.flashBtn}</span>
                <span className="text-[10px] text-slate-400 font-normal">({t.hero.flashHint})</span>
              </button>
            </motion.div>

            {/* CTAs Button Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => openCheckout(selectedVariant)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#A2B997] via-[#8FA885] to-[#FF70A6] text-black font-black text-sm sm:text-base shadow-md dark:shadow-neon-sage hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-3 group cursor-pointer"
              >
                <Bell className="w-5 h-5 text-black animate-pulse" />
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-800 dark:text-white font-semibold text-sm border border-black/10 dark:border-white/15 backdrop-blur-md transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 text-[#7B9370] dark:text-[#A2B997] fill-current" />
                <span>{t.hero.secondaryCta}</span>
              </a>
            </motion.div>

            {/* Social Proof & Rating Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono"
            >
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">{t.hero.socialProof}</span>
            </motion.div>
          </div>

          {/* Right Column: Interactive Camera Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Quick Color Swatches */}
            <div className="flex items-center space-x-2 mb-4 p-1.5 rounded-2xl bg-white/80 dark:bg-black/60 border border-black/10 dark:border-white/10 backdrop-blur-md shadow-sm">
              <button
                onClick={() => setSelectedVariant("sage")}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
                  selectedVariant === "sage"
                    ? "bg-[#A2B997]/30 text-[#5A734F] dark:text-[#C4D8BC] border border-[#7B9370]/50 dark:border-[#A2B997]/50 font-bold shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#A2B997] inline-block" />
                <span>Sage Green</span>
              </button>
              <button
                onClick={() => setSelectedVariant("blush")}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
                  selectedVariant === "blush"
                    ? "bg-pink-500/20 text-pink-700 dark:text-pink-300 border border-pink-500/40 font-bold shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF70A6] inline-block" />
                <span>Blush</span>
              </button>
              <button
                onClick={() => setSelectedVariant("classic")}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
                  selectedVariant === "classic"
                    ? "bg-amber-600/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 font-bold shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#8D4F28] inline-block" />
                <span>Classic</span>
              </button>
            </div>

            {/* Interactive Camera Component */}
            <div className="w-full">
              <CameraModel
                variantId={selectedVariant}
                interactive={true}
                onFlashClick={triggerFlash}
              />
            </div>

            {/* HUD Status Bar under camera */}
            <div className="mt-4 w-full max-w-sm grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm">
                <span className="block text-slate-400 uppercase text-[9px]">STATUS</span>
                <span className="font-bold text-rose-500 dark:text-rose-400">SOLD OUT</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm">
                <span className="block text-slate-400 uppercase text-[9px]">NEXT DROP</span>
                <span className="font-bold text-[#7B9370] dark:text-[#A2B997]">IN 30 DAYS</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm">
                <span className="block text-slate-400 uppercase text-[9px]">BATCH SIZE</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-300">100 PIECES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};