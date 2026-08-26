import React from "react";
import { useShop } from "../context/ShopContext";
import { PhoneSyncDemo } from "./PhoneSyncDemo";
import { Camera, Usb, Eye, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const HowItWorks: React.FC = () => {
  const { t } = useShop();

  const steps = [
    {
      num: t.howItWorks.step1Num,
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: Camera,
      badge: "PARTY TIME",
      color: "from-pink-500/15 to-pink-500/5 dark:from-pink-500/20 dark:to-pink-500/5",
      border: "border-pink-500/25 dark:border-pink-500/30",
      textColor: "text-[#e11d48] dark:text-[#FF70A6]",
    },
    {
      num: t.howItWorks.step2Num,
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: Usb,
      badge: "THE MORNING AFTER",
      color: "from-cyan-500/15 to-cyan-500/5 dark:from-cyan-500/20 dark:to-cyan-500/5",
      border: "border-cyan-500/25 dark:border-cyan-500/30",
      textColor: "text-[#0284c7] dark:text-[#70EEFF]",
    },
    {
      num: t.howItWorks.step3Num,
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: Eye,
      badge: "THE BIG REVEAL",
      color: "from-emerald-500/15 to-emerald-500/5 dark:from-emerald-500/20 dark:to-emerald-500/5",
      border: "border-emerald-500/25 dark:border-emerald-500/30",
      textColor: "text-[#5A734F] dark:text-[#A2B997]",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#F8FAF7] dark:bg-[#090A0E] relative overflow-hidden transition-colors duration-300">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-600 dark:text-cyan-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.howItWorks.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white transition-colors">
            {t.howItWorks.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal transition-colors">
            {t.howItWorks.subheading}
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-b ${step.color} bg-white dark:bg-[#11131A] border ${step.border} shadow-md dark:shadow-xl flex flex-col justify-between relative group hover:translate-y-[-4px] transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-4xl font-black font-mono ${step.textColor}`}>
                      {step.num}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-black/5 dark:border-white/10">
                      {step.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 flex items-center justify-center mb-5 text-slate-900 dark:text-white group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-black font-sans text-slate-900 dark:text-white mb-2 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal transition-colors">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive USB-C Phone Sync Simulator Demo */}
        <PhoneSyncDemo />
      </div>
    </section>
  );
};