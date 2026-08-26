import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { cameraSound } from "../lib/sound";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FAQ: React.FC = () => {
  const { t } = useShop();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    cameraSound.playClick();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#F8FAF7] dark:bg-[#090A0E] relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#A2B997]/20 dark:bg-white/5 border border-[#7B9370]/30 dark:border-white/10 text-xs font-mono text-[#5A734F] dark:text-[#A2B997] font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faq.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-slate-900 dark:text-white transition-colors">
            {t.faq.heading}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-normal transition-colors">
            {t.faq.subheading}
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {t.faq.items.map((item, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-white dark:bg-[#141620] border-[#7B9370] dark:border-[#A2B997]/40 shadow-md dark:shadow-neon-sage"
                    : "bg-white/80 dark:bg-[#10121A] border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold font-sans text-slate-900 dark:text-white">
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-1.5 rounded-full bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 flex-shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-black/5 dark:border-white/5 font-normal">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};