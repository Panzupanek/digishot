import React, { useState, useRef, useCallback } from "react";
import { useShop } from "../context/ShopContext";
import { Sparkles, ArrowRight, Smartphone, Zap, MoveHorizontal } from "lucide-react";
import { motion } from "framer-motion";

interface ComparisonScene {
  id: string;
  titleKey: "scene1" | "scene2" | "scene3";
  image: string;
  timestamp: string;
}

export const BeforeAfterSlider: React.FC = () => {
  const { t, openCheckout } = useShop();

  const scenes: ComparisonScene[] = [
    {
      id: "portrait",
      titleKey: "scene1",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=85",
      timestamp: "'26 08:26 02:45 AM",
    },
    {
      id: "festival",
      titleKey: "scene2",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=85",
      timestamp: "'26 08:26 01:18 AM",
    },
    {
      id: "afters",
      titleKey: "scene3",
      image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=1200&auto=format&fit=crop&q=85",
      timestamp: "'26 08:26 04:32 AM",
    },
  ];

  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeScene = scenes[activeSceneIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const handlePointerDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  return (
    <section className="py-20 bg-white dark:bg-[#0C0D12] border-t border-black/10 dark:border-white/10 relative transition-colors duration-300 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A2B997]/15 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#A2B997]/20 dark:bg-[#A2B997]/10 border border-[#7B9370]/30 dark:border-[#A2B997]/30 text-xs font-mono text-[#5A734F] dark:text-[#A2B997] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.beforeAfter.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white transition-colors">
            {t.beforeAfter.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal transition-colors">
            {t.beforeAfter.subheading}
          </p>
        </div>

        {/* Scene Selection Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setActiveSceneIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                activeSceneIndex === idx
                  ? "bg-[#7B9370] dark:bg-[#A2B997] text-white dark:text-black shadow-sm"
                  : "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {t.beforeAfter[scene.titleKey]}
            </button>
          ))}
        </div>

        {/* Comparison Stage Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={handlePointerDown}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-4 border-black/10 dark:border-white/15 select-none cursor-ew-resize group"
          >
            {/* 1. BEFORE LAYER: iPhone (Flat, Over-Processed, Cold) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={activeScene.image}
                alt="iPhone Photo"
                className="w-full h-full object-cover filter saturate-85 brightness-95 contrast-90"
              />
              {/* Cold sterile digital overlay */}
              <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />

              {/* Before Label Badge (Top Left) */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-slate-300 flex items-center space-x-1.5">
                <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.beforeAfter.beforeLabel}</span>
              </div>
            </div>

            {/* 2. AFTER LAYER: DigiShot (Harsh Xenon Flash, Warm 2004 CCD Grain & Watermark) */}
            <div
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-0 w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%" }}>
                <img
                  src={activeScene.image}
                  alt="DigiShot Flash Photo"
                  className="w-full h-full object-cover filter contrast-130 saturate-125 brightness-105"
                />

                {/* Warm Flash Flare & Radial Vignette */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-transparent to-rose-500/10 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

                {/* Subtle Grain texture */}
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px] pointer-events-none" />

                {/* After Label Badge (Top Left of DigiShot reveal) */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-[#A2B997] text-black shadow-md text-xs font-mono font-black flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 fill-black text-black" />
                  <span>{t.beforeAfter.afterLabel}</span>
                </div>

                {/* OFFICIAL DIGISHOT WATERMARK & TIMESTAMP (Bottom Right) */}
                <div className="absolute bottom-4 right-4 z-10 p-2 sm:p-2.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 shadow-2xl flex items-center space-x-2.5">
                  {/* Official Logo SVG */}
                  <div className="w-6 h-6 sm:w-7 sm:h-7 relative flex-shrink-0">
                    <svg viewBox="0 0 48 52" fill="none" className="w-full h-full">
                      <rect x="6" y="5" width="36" height="36" rx="4" stroke="#FFFFFF" strokeWidth="3" />
                      <line x1="3" y1="47" x2="45" y2="47" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="24" cy="23" r="10" stroke="#FFFFFF" strokeWidth="2.5" />
                      <path d="M 33 24.5 Q 33 30.5 27 30.5 Q 33 30.5 33 36.5 Q 33 30.5 39 30.5 Q 33 30.5 33 24.5 Z" fill="#A2B997" />
                      <circle cx="33" cy="30.5" r="1.2" fill="#FFFFFF" />
                    </svg>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-black font-sans text-white leading-none">
                      DigiShot
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-amber-400 leading-none mt-1">
                      {activeScene.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. SLIDER DIVIDER LINE & HANDLE */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Vertical Glowing Line */}
              <div className="absolute inset-y-0 -left-[1.5px] w-[3px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />

              {/* Center Handle Button */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#12141D] border-2 border-[#A2B997] shadow-[0_0_20px_rgba(162,185,151,0.8)] flex items-center justify-center text-slate-800 dark:text-white">
                <MoveHorizontal className="w-5 h-5 text-[#5A734F] dark:text-[#A2B997]" />
              </div>
            </div>
          </div>

          {/* Description & Action Below */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-slate-50 dark:bg-[#11131A] border border-black/10 dark:border-white/10">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-mono font-bold text-[#5A734F] dark:text-[#A2B997] uppercase tracking-wider block">
                ✦ 2004 CCD VINTAGE FLASH SCIENCE
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                {t.beforeAfter.afterDesc}
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => openCheckout()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#A2B997] via-[#8FA885] to-[#FF70A6] text-black font-black text-xs sm:text-sm shadow-md dark:shadow-neon-sage hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
            >
              <span>{t.beforeAfter.ctaBtn}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};