import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { cameraSound } from "../lib/sound";
import { motion } from "framer-motion";
import { Usb, Sparkles, CheckCircle, Image as ImageIcon, Heart, Share2, RefreshCw } from "lucide-react";
import { GALLERY_PHOTOS } from "../data/photos";

export const PhoneSyncDemo: React.FC = () => {
  const { t } = useShop();
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleToggleConnect = () => {
    if (!isConnected) {
      cameraSound.playPlugIn();
      setIsSyncing(true);
      setTimeout(() => {
        setIsSyncing(false);
        setIsConnected(true);
      }, 1200);
    } else {
      cameraSound.playClick();
      setIsConnected(false);
    }
  };

  return (
    <div className="mt-12 rounded-3xl bg-gradient-to-b from-[#F2F5EF] to-[#E9ECE4] dark:from-[#151722] dark:to-[#0D0E14] border border-black/10 dark:border-white/10 p-6 sm:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-black/10 dark:border-white/10">
        <div>
          <span className="text-xs font-mono font-bold text-[#5A734F] dark:text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {t.howItWorks.demoTitle}
          </span>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-normal">
            {t.howItWorks.demoSubtitle}
          </p>
        </div>

        {/* Plug/Unplug CTA */}
        <button
          onClick={handleToggleConnect}
          className={`px-5 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all flex items-center space-x-2 active:scale-95 shadow-md cursor-pointer ${
            isConnected
              ? "bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
              : "bg-[#A2B997] dark:bg-cyan-400 text-black shadow-sm dark:shadow-neon-cyan hover:brightness-105"
          }`}
        >
          <Usb className="w-4 h-4" />
          <span>{isConnected ? t.howItWorks.unplugBtn : t.howItWorks.plugBtn}</span>
        </button>
      </div>

      {/* Interactive Stage */}
      <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Camera & Animated USB-C Cable */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1C26] border border-black/10 dark:border-white/10 text-center w-full max-w-xs shadow-md">
            <div className="w-full h-24 rounded-xl bg-gradient-to-r from-emerald-500/15 to-[#FF70A6]/15 flex items-center justify-center border border-black/5 dark:border-white/10">
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                DIGISHOT MK-1
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2">
              MicroSD: 84 new photos ready
            </p>
          </div>

          {/* Cable Cord Graphic */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                height: isConnected ? [20, 40, 20] : 30,
                borderColor: isConnected ? "#7B9370" : "#94A3B8",
              }}
              className="w-1 border-l-2 border-dashed transition-colors"
            />
            <div
              className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border transition-all ${
                isConnected
                  ? "bg-[#A2B997]/25 text-[#5A734F] dark:text-cyan-300 border-[#7B9370]/50 shadow-sm"
                  : "bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-black/10 dark:border-white/10"
              }`}
            >
              USB-C TO LIGHTNING / USB-C
            </div>
          </div>
        </div>

        {/* Right Side: Phone Screen Simulation */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-sm rounded-[36px] bg-[#121418] border-4 border-[#2A2D3A] p-3 shadow-2xl">
            {/* Phone Notch */}
            <div className="w-24 h-4 bg-[#1B1D26] rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0E0F14]" />
            </div>

            {/* Screen Content */}
            <div className="rounded-[28px] bg-[#111218] p-3 min-h-[300px] flex flex-col justify-between border border-white/5 font-sans text-white">
              {/* Top Phone App Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono text-slate-300">
                <span className="font-bold flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-[#FF70A6]" />
                  Photos • Imports
                </span>
                <span className="text-[10px] text-slate-500">100% ⚡</span>
              </div>

              {/* Dynamic State in Phone */}
              {isSyncing ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className="w-8 h-8 text-[#A2B997]" />
                  </motion.div>
                  <p className="text-xs font-mono text-[#A2B997] animate-pulse">
                    {t.howItWorks.syncingText}
                  </p>
                </div>
              ) : isConnected ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1.5 rounded-xl border border-emerald-500/20">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {t.howItWorks.syncedText}
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans">03:42 AM</span>
                  </div>

                  {/* Imported Photo Grid inside Phone */}
                  <div className="grid grid-cols-2 gap-2">
                    {GALLERY_PHOTOS.slice(0, 4).map((photo) => (
                      <div
                        key={photo.id}
                        className="relative rounded-xl overflow-hidden aspect-square border border-white/10 group"
                      >
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform filter contrast-125"
                        />
                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[8px] font-mono text-amber-300">
                          {photo.timestamp}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-400">
                    <span className="text-[#FF70A6] font-semibold">{t.howItWorks.photosDumped}</span>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-3.5 h-3.5 text-[#FF70A6] fill-[#FF70A6]" />
                      <Share2 className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500">
                    <Usb className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-mono text-slate-400">
                    No cable connected.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Click "Connect Cable to Phone" above to simulate transfer.
                  </p>
                </div>
              )}

              {/* Home indicator bar */}
              <div className="w-20 h-1 bg-white/20 rounded-full mx-auto mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};