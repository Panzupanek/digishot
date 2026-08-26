import React from "react";
import { useShop } from "../context/ShopContext";
import { Sparkles, Star, Quote, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const Testimonials: React.FC = () => {
  const { t } = useShop();

  return (
    <section className="py-20 bg-white dark:bg-[#0C0D12] border-t border-black/10 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#A2B997]/20 dark:bg-white/5 border border-[#7B9370]/30 dark:border-white/10 text-xs font-mono text-[#5A734F] dark:text-[#70EEFF] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.testimonials.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white transition-colors">
            {t.testimonials.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal transition-colors">
            {t.testimonials.subheading}
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {t.testimonials.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#13151D] border border-black/10 dark:border-white/10 shadow-md dark:shadow-xl flex flex-col justify-between relative group hover:border-[#7B9370] dark:hover:border-[#A2B997]/50 transition-all"
            >
              <div>
                {/* Top Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-black/10 dark:text-white/10 group-hover:text-[#7B9370] dark:group-hover:text-cyan-400/30 transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic mb-6 font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* User Profile Footer */}
              <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white font-sans">
                      {item.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7B9370] dark:text-cyan-400" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {item.handle} • {item.location}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[#5A734F] dark:text-[#A2B997]">
                  {item.variantBought}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};