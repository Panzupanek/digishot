import React from "react";
import { useShop } from "../context/ShopContext";
import { AnimatePresence, motion } from "framer-motion";

export const FlashEffect: React.FC = () => {
  const { isFlashActive } = useShop();

  return (
    <AnimatePresence>
      {isFlashActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.9, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, times: [0, 0.1, 0.3, 1], ease: "easeOut" }}
          className="fixed inset-0 z-[100] pointer-events-none bg-white flex items-center justify-center"
        >
          {/* Subtle Viewfinder HUD overlay inside flash */}
          <div className="w-full h-full p-8 sm:p-16 flex flex-col justify-between text-black/60 font-mono text-xs font-bold">
            <div className="flex justify-between">
              <span>[ REC • FLASH FIRED ]</span>
              <span>ISO 400 • 1/125s</span>
            </div>
            <div className="w-16 h-16 border-2 border-black/40 rounded-full mx-auto" />
            <div className="flex justify-between">
              <span>f/2.8 • 28mm</span>
              <span>2004 ARCHIVE</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};