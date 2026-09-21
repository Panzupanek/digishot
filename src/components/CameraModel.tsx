import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAMERA_COLOR_OPTIONS, CameraVariantId, CameraColorOption } from "../data/products";
import { cameraSound } from "../lib/sound";

interface CameraModelProps {
  variantId: CameraVariantId;
  interactive?: boolean;
  onFlashClick?: () => void;
}

export const CameraModel: React.FC<CameraModelProps> = ({
  variantId,
  interactive = true,
  onFlashClick,
}) => {
  const [isFlashingLocal, setIsFlashingLocal] = useState(false);

  // Normalize alias like "green" to "sage", "pink" to "blush", etc.
  const normalizedId =
    variantId === "green" ? "sage" :
    variantId === "pink" ? "blush" :
    variantId === "classic" ? "brown" :
    variantId;

  const currentOption: CameraColorOption =
    CAMERA_COLOR_OPTIONS.find((c) => c.id === normalizedId || c.id === variantId) ||
    CAMERA_COLOR_OPTIONS[0];

  const handleFlashTrigger = () => {
    cameraSound.playShutter();
    cameraSound.playFlashCharge();
    setIsFlashingLocal(true);
    if (onFlashClick) onFlashClick();
    setTimeout(() => setIsFlashingLocal(false), 700);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none p-2 sm:p-4">
      {/* Hidden preloaded images for all variants to ensure zero-lag switching */}
      <div className="hidden" aria-hidden="true">
        {CAMERA_COLOR_OPTIONS.map((opt) => (
          <img key={opt.id} src={opt.image} alt="preload" />
        ))}
      </div>

      {/* Ambient Backlight Glow matching active variant */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full filter blur-3xl -z-10 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentOption.glowColor }}
      />

      {/* Main Photographic Camera Render Display Container */}
      <div className="relative w-full max-w-[400px] sm:max-w-[440px] aspect-square flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOption.id}
            initial={{ opacity: 0, x: 28, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -28, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center cursor-pointer group"
            onClick={interactive ? handleFlashTrigger : undefined}
            whileHover={interactive ? { scale: 1.03, rotateZ: 0.5 } : {}}
            whileTap={interactive ? { scale: 0.97 } : {}}
          >
            <img
              src={currentOption.image}
              alt={`DigiShot ${currentOption.name}`}
              className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)] pointer-events-none select-none transition-all duration-300"
              loading="eager"
            />

            {/* Flash Burst Animation Overlay */}
            <AnimatePresence>
              {isFlashingLocal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 3.5 }}
                  exit={{ opacity: 0, scale: 4.5 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-white via-amber-200 to-transparent filter blur-md z-40 pointer-events-none shadow-[0_0_80px_#FFFFFF]"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Edition Pill below camera */}
      <motion.div
        key={`badge-${currentOption.id}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-2 flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-[#151722]/90 border border-black/10 dark:border-white/15 backdrop-blur-md shadow-md text-slate-900 dark:text-white font-mono text-[11px] font-bold tracking-wider uppercase"
      >
        <span
          className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/30 shadow-sm"
          style={{ backgroundColor: currentOption.colorDot }}
        />
        <span>{currentOption.badgeText}</span>
      </motion.div>
    </div>
  );
};