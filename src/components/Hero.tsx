import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { CameraModel } from "./CameraModel";
import { CAMERA_COLOR_OPTIONS } from "../data/products";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { cameraSound } from "../lib/sound";

export const Hero: React.FC = () => {
  const { t, triggerFlash, selectedVariant, setSelectedVariant } = useShop();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mqpaljal", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          selectedVariant,
          source: "Hero Waitlist Drop #1",
        }),
      });

      if (res.ok) {
        setStatus("success");
        cameraSound.playPlugIn();
        triggerFlash();
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 },
            colors: ["#98A886", "#FF70A6", "#70EEFF", "#FFFFFF"],
          });
        } catch {
          // ignore
        }

        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "waitlist_signup", {
            event_category: "Waitlist",
            event_label: "Drop #1 Lead",
          });
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative pt-12 pb-24 lg:pt-24 lg:pb-32 overflow-hidden transition-colors duration-300">
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A2B997]/15 rounded-full filter blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Clean Headline, Countdown & Primary CTA */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-sans tracking-[-0.03em] text-[#0f172a] dark:text-white leading-[1.08]"
            >
              {t.hero.title}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Urgent Stock Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A2B997]/15 dark:bg-[#A2B997]/20 border border-[#A2B997]/40 text-[#405338] dark:text-[#C4D8BC] text-xs font-mono font-bold tracking-wide shadow-sm backdrop-blur-md"
            >
              <span>{t.hero.stockPill}</span>
            </motion.div>

            {/* Formspree Interactive Waitlist Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              id="waitlist-box"
              className="mt-6 max-w-md w-full mx-auto lg:mx-0"
            >
              {status !== "success" ? (
                <form
                  id="hero-waitlist-form"
                  action="https://formspree.io/f/mqpaljal"
                  method="POST"
                  onSubmit={handleFormSubmit}
                  className="space-y-2"
                >
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      name="email"
                      id="waitlist-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Zadej e-mail pro přednostní přístup..."
                      required
                      className="flex-1 px-5 py-3.5 rounded-full bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#98A886] transition-colors text-sm"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="px-6 py-3.5 rounded-full bg-[#98A886] hover:bg-[#889876] text-black font-semibold text-sm transition-all whitespace-nowrap shadow-lg shadow-[#98A886]/20 cursor-pointer disabled:opacity-70 flex items-center justify-center space-x-1.5"
                    >
                      <span>{status === "loading" ? "Odesílám..." : "Získat Drop kód ✦"}</span>
                    </button>
                  </div>

                  {status === "error" && (
                    <div className="text-xs text-rose-400 font-mono pl-4 pt-1">
                      Chyba při odesílání. Zkuste to prosím znovu.
                    </div>
                  )}
                </form>
              ) : null}

              <div
                id="waitlist-success"
                className={`${status === "success" ? "block" : "hidden"} mt-3 p-3.5 rounded-2xl bg-[#98A886]/10 border border-[#98A886]/30 text-[#98A886] text-sm font-medium text-center lg:text-left`}
              >
                ✓ Skvělé! Máš zarezervované místo v Dropu #1.
              </div>

              {/* Secondary Flash Test Button */}
              <div className="mt-3.5 flex items-center justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={triggerFlash}
                  className="px-4 py-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium text-xs font-mono hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-[#5A734F] dark:text-[#98A886]" />
                  <span>{t.hero.flashBtn}</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Camera Showcase with 8-Color Switcher */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* 8-Color Interactive Product Switcher Pills */}
            <div className="w-full max-w-lg mb-4">
              <div className="flex flex-wrap items-center justify-center gap-1.5 p-2 rounded-2xl bg-white/80 dark:bg-black/60 border border-black/10 dark:border-white/10 backdrop-blur-md shadow-sm">
                {CAMERA_COLOR_OPTIONS.map((option) => {
                  const isSelected =
                    selectedVariant === option.id ||
                    (selectedVariant === "green" && option.id === "sage") ||
                    (selectedVariant === "pink" && option.id === "blush") ||
                    (selectedVariant === "classic" && option.id === "brown");

                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedVariant(option.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#98A886]/60 ${
                        isSelected
                          ? `${option.bgActive} border-2 ${option.borderActive} font-bold shadow-sm scale-105`
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                      }`}
                      title={`Select ${option.name}`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0 shadow-sm border border-black/10 dark:border-white/20"
                        style={{ backgroundColor: option.colorDot }}
                      />
                      <span className="whitespace-nowrap">{option.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Camera Component */}
            <div className="w-full flex items-center justify-center">
              <CameraModel
                variantId={selectedVariant}
                interactive={true}
                onFlashClick={triggerFlash}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};