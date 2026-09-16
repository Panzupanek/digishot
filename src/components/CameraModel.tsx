import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Sparkles } from "lucide-react";
import { PRODUCT_VARIANTS } from "../data/products";

interface CameraModelProps {
  variantId: "sage" | "blush" | "classic";
  interactive?: boolean;
  onFlashClick?: () => void;
}

export const CameraModel: React.FC<CameraModelProps> = ({
  variantId,
  interactive = true,
  onFlashClick,
}) => {
  const [isFlashingLocal, setIsFlashingLocal] = useState(false);

  const currentVariant =
    PRODUCT_VARIANTS.find((v) => v.id === variantId) || PRODUCT_VARIANTS[0];

  const handleFlashTrigger = () => {
    setIsFlashingLocal(true);
    if (onFlashClick) onFlashClick();
    setTimeout(() => setIsFlashingLocal(false), 700);
  };

  const getVariantTheme = () => {
    switch (variantId) {
      case "sage":
        return {
          name: "Sage Green",
          leatherColor: "#A2B997",
          leatherGradient: "linear-gradient(145deg, #B2C7A8 0%, #95AC8B 60%, #859C7B 100%)",
          glowColor: "rgba(162, 185, 151, 0.45)",
          badgeText: "SAGE GREEN EDITION",
        };
      case "blush":
        return {
          name: "Blush Pink",
          leatherColor: "#FFB7C5",
          leatherGradient: "linear-gradient(145deg, #FFC8D4 0%, #FFA8BA 60%, #F593A7 100%)",
          glowColor: "rgba(255, 183, 197, 0.45)",
          badgeText: "BLUSH PINK EDITION",
        };
      case "classic":
      default:
        return {
          name: "Classic Cream",
          leatherColor: "#EAE6DF",
          leatherGradient: "linear-gradient(145deg, #F5F2EC 0%, #E2DDD5 60%, #D4CEBF 100%)",
          glowColor: "rgba(234, 230, 223, 0.35)",
          badgeText: "CLASSIC RETRO EDITION",
        };
    }
  };

  const theme = getVariantTheme();

  return (
    <div className="relative flex items-center justify-center select-none p-3 sm:p-5">
      {/* Ambient Backlight Glow */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-6 rounded-full filter blur-3xl -z-10 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: theme.glowColor }}
      />

      {/* Main Physical Camera Chassis Container */}
      <motion.div
        whileHover={interactive ? { scale: 1.02, rotateX: 2, rotateY: -2 } : {}}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{ perspective: 1000 }}
        className="relative w-full max-w-[440px] aspect-[1.52/1] rounded-[28px] bg-[#101216] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/15 dark:border-white/10 flex flex-col justify-between overflow-visible"
      >
        {/* TOP METAL STRAP LUGS (Left & Right) */}
        {/* Left Lug */}
        <div className="absolute -top-2 left-5 w-4 h-5 rounded-t-full bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 border border-slate-400 shadow-md flex items-center justify-center">
          <div className="w-1.5 h-2 rounded-full bg-black/70" />
        </div>
        {/* Right Lug */}
        <div className="absolute -top-2 right-5 w-4 h-5 rounded-t-full bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 border border-slate-400 shadow-md flex items-center justify-center">
          <div className="w-1.5 h-2 rounded-full bg-black/70" />
        </div>

        {/* TOP SHUTTER BUTTON (Right Side) */}
        <motion.button
          whileTap={{ y: 2 }}
          onClick={handleFlashTrigger}
          title="Press Shutter / Test Flash"
          className="absolute -top-3.5 right-14 w-8 h-4 rounded-t-lg bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500 border border-slate-300 shadow-lg cursor-pointer hover:brightness-110 active:brightness-90 transition-all flex items-center justify-center z-30"
        >
          <div className="w-4 h-1.5 rounded-sm bg-gradient-to-b from-slate-300 to-slate-600" />
        </motion.button>

        {/* 1. TOP HOUSING SECTION (Matte Black with Beveled Edge) */}
        <div className="relative h-14 bg-gradient-to-b from-[#22252D] via-[#17181F] to-[#121318] rounded-t-[24px] px-5 flex items-center justify-between border-b border-black/60 shadow-inner z-20 overflow-hidden">
          {/* Top Bevel Highlight Line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Top-Left: DigiShot Official Logo (Clean White / Sage Green Engraved Brand Mark) */}
          <div className="flex items-center">
            <img 
              src="logo-dark.png" 
              alt="DigiShot" 
              className="h-5 sm:h-6 w-auto object-contain flex-shrink-0 opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] select-none pointer-events-none" 
            />
          </div>

          {/* Top-Center & Top-Right Elements Group */}
          <div className="flex items-center space-x-4">
            {/* Top-Center: Small Square Optical Viewfinder Window */}
            <div className="w-6 h-6 rounded-md bg-[#0A0B0E] border-2 border-[#3A3E4D] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 via-emerald-500/20 to-transparent opacity-80" />
              {/* Viewfinder crosshair */}
              <div className="w-3 h-3 border border-emerald-400/40 rounded-sm" />
            </div>

            {/* Top-Right: Horizontal Rectangular Xenon Flash Window */}
            <div
              onClick={handleFlashTrigger}
              className="relative w-14 h-6 rounded-md bg-[#0D0E13] border-2 border-[#4A4E5E] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)] p-0.5 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-[#A2B997] transition-all"
              title="Click to Test Flash"
            >
              {/* Fresnel Prism Texture */}
              <div className="w-full h-full rounded-sm bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_2px,#000_3px)]" />
                {/* Xenon Bulb Tube */}
                <div className="w-8 h-2 rounded-full bg-white shadow-md border border-slate-400/60 relative z-10 filter blur-[0.3px]" />
              </div>

              {/* Local Flash Burst Animation */}
              <AnimatePresence>
                {isFlashingLocal && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 4.5 }}
                    exit={{ opacity: 0, scale: 5 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-white via-amber-200 to-transparent filter blur-md z-40 pointer-events-none shadow-[0_0_50px_#FFFFFF]"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 2. MIDDLE BODY SECTION (Textured Leatherette Wrap) */}
        <div
          className="relative flex-1 my-0.5 mx-0.5 rounded-xl flex items-center justify-center transition-all duration-500 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] overflow-hidden"
          style={{ background: theme.leatherGradient }}
        >
          {/* Leatherette Grain Stippling Overlay */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:5px_5px] pointer-events-none" />

          {/* Subtle horizontal leather seam lines */}
          <div className="absolute top-1 left-0 right-0 h-[1px] bg-black/10" />
          <div className="absolute bottom-1 left-0 right-0 h-[1px] bg-white/20" />

          {/* CENTER: Large Prominent Circular Black Camera Lens */}
          <div className="relative z-10 flex items-center justify-center">
            {/* Outer Lens Metallic Barrel Ring */}
            <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-b from-[#2E313C] via-[#14151B] to-[#0A0B0E] p-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.7)] border-2 border-[#4A4E5E] flex items-center justify-center relative">
              {/* Stepped Knurled Focus Ring */}
              <div className="w-full h-full rounded-full p-2 bg-[#0E0F14] border border-[#2B2D38] flex items-center justify-center relative shadow-inner">
                {/* Micro Grooves / Concentric Rings */}
                <div className="w-full h-full rounded-full p-2.5 bg-[#07080B] border border-black flex items-center justify-center relative overflow-hidden">
                  {/* Coated Aperture Glass */}
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#0b1c15] via-[#132219] to-[#06242c] relative flex items-center justify-center shadow-inner">
                    {/* Glass Reflection Arcs */}
                    <div className="absolute top-1.5 left-3 w-16 h-8 bg-gradient-to-b from-emerald-300/35 via-[#A2B997]/20 to-transparent rounded-full transform -rotate-45 filter blur-[1.2px]" />
                    <div className="absolute bottom-2 right-4 w-9 h-4 bg-amber-400/25 rounded-full filter blur-[1.5px]" />

                    {/* Lens Center Optical Pupil */}
                    <div className="w-8 h-8 rounded-full bg-black border border-[#A2B997]/50 shadow-inner flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#A2B997] shadow-[0_0_10px_#A2B997]" />
                    </div>

                    {/* Concentric Lens Text Ring */}
                    <div className="absolute inset-1 rounded-full border border-white/5 pointer-events-none flex items-center justify-center">
                      <span className="text-[5.5px] sm:text-[6.5px] font-mono text-slate-400/80 tracking-widest uppercase">
                        DIGISHOT OPTICAL • 28MM F2.8
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOWER RIGHT (Next to Lens): Small Pill-Shaped 3-Slot Speaker/Mic Grille */}
          <div className="absolute bottom-4 right-5 z-10 flex items-center space-x-1 p-1.5 rounded-full bg-black/40 border border-black/20 shadow-inner">
            <span className="w-1 h-3 rounded-full bg-[#111216] border-r border-white/10" />
            <span className="w-1 h-3 rounded-full bg-[#111216] border-r border-white/10" />
            <span className="w-1 h-3 rounded-full bg-[#111216] border-r border-white/10" />
          </div>
        </div>

        {/* 3. BOTTOM BASE PLATE (Matte Black Finish with Bevel) */}
        <div className="relative h-7 bg-gradient-to-b from-[#181920] to-[#0D0E12] rounded-b-[24px] px-6 flex items-center justify-between border-t border-black/60 text-[9px] font-mono text-slate-400 shadow-md">
          {/* Bottom USB-C Port Indicator */}
          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-1.5 rounded-[2px] bg-[#2A2E3B] border border-slate-600/50 inline-block" title="USB-C Transfer Port" />
            <span className="text-[8px] tracking-wider text-slate-500 uppercase font-bold">
              USB-C DIRECT
            </span>
          </div>

          {/* Vintage Badge text */}
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-2.5 h-2.5 text-[#A2B997]" />
            <span className="text-[8px] tracking-widest text-slate-400 uppercase font-bold">
              CCD SENSOR 2004
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating Edition Pill below camera */}
      <div className="absolute -bottom-4 sm:-bottom-5 flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/80 dark:bg-[#151722]/90 border border-black/10 dark:border-white/15 backdrop-blur-md shadow-lg text-white font-mono text-[10px] font-bold tracking-wider uppercase">
        <span
          className="w-2 h-2 rounded-full border border-white/30"
          style={{ backgroundColor: theme.leatherColor }}
        />
        <span>{theme.badgeText}</span>
      </div>
    </div>
  );
};