import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { PRODUCT_VARIANTS } from "../data/products";
import { cameraSound } from "../lib/sound";
import confetti from "canvas-confetti";
import { X, Check, Bell, Sparkles, CheckCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CheckoutModal: React.FC = () => {
  const {
    t,
    isCheckoutOpen,
    closeCheckout,
    selectedVariant,
    setSelectedVariant,
    formatPrice,
  } = useShop();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [vipNumber, setVipNumber] = useState(348);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const variantObj =
    PRODUCT_VARIANTS.find((v) => v.id === selectedVariant) || PRODUCT_VARIANTS[0];

  const priceFormatted = formatPrice(variantObj.priceCZK, variantObj.priceEUR);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setStatus("loading");

    try {
      const res = await fetch("https://formspree.io/f/mqpaljal", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          selectedVariant: variantObj.id,
          price: priceFormatted,
          source: "VIP Reservation Modal Drop #1",
        }),
      });

      if (res.ok) {
        setStatus("success");
        cameraSound.playPlugIn();
        const randomVip = Math.floor(250 + Math.random() * 500);
        setVipNumber(randomVip);
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#A2B997", "#FF70A6", "#70EEFF", "#FFFFFF"],
          });
        } catch {
          // ignore
        }

        if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
          (window as any).gtag("event", "purchase_intent", {
            event_category: "Reservation",
            event_label: `Drop #1 - ${variantObj.id}`,
            value: variantObj.priceCZK,
            currency: "CZK",
          });
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    closeCheckout();
  };

  if (!isCheckoutOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#12141D] border border-black/10 dark:border-[#A2B997]/30 shadow-2xl overflow-hidden my-8 transition-colors"
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-gradient-to-r from-[#A2B997]/25 via-cyan-500/10 to-[#FF70A6]/10">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-[#A2B997]/25 text-[#5A734F] dark:text-[#A2B997]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
                  {t.waitlist.modalTitle}
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30">
                    DROP #1
                  </span>
                </h3>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
            {status === "success" ? (
              /* Success Confirmation Screen */
              <div className="text-center py-6 space-y-5 font-sans">
                <div className="w-16 h-16 rounded-full bg-[#A2B997]/25 text-[#5A734F] dark:text-[#A2B997] mx-auto flex items-center justify-center border border-[#7B9370]/40 dark:border-[#A2B997]/40 shadow-sm dark:shadow-neon-sage">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                    {t.waitlist.successTitle}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    {t.waitlist.successSubtitle}
                  </p>
                </div>

                {/* VIP Pass Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#1A1E1C] dark:to-[#12141C] border border-black/10 dark:border-[#A2B997]/40 max-w-sm mx-auto text-left space-y-3 shadow-md">
                  <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2">
                    <span className="text-[10px] font-mono text-[#5A734F] dark:text-[#A2B997] font-bold uppercase tracking-wider">
                      ★ VIP DROP PASS #1
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      DROP IN 30 DAYS
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 dark:text-slate-400">{t.waitlist.vipNumberLabel}</span>
                    <span className="text-xl font-mono font-black text-[#5A734F] dark:text-[#A2B997]">
                      #VIP-{vipNumber}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Reserved Color:</span>
                    <span className="text-slate-900 dark:text-white font-bold">
                      {(variantObj.nameKey && (t.variants as any)[variantObj.nameKey]) || variantObj.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">VIP Discount:</span>
                    <span className="text-[#e11d48] dark:text-[#FF70A6] font-bold">20% OFF (Kód DROP20)</span>
                  </div>
                </div>

                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  {t.waitlist.successCodeNote}
                </p>

                <button
                  onClick={handleClose}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#A2B997] to-[#FF70A6] text-black font-black text-sm shadow-md cursor-pointer"
                >
                  {t.waitlist.closeBtn}
                </button>
              </div>
            ) : (
              /* Waitlist Lead Capture Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="source" value="VIP Reservation Modal Drop #1" />
                <input type="hidden" name="selectedVariant" value={variantObj.id} />
                <input type="hidden" name="price" value={priceFormatted} />

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.waitlist.modalSubtitle}
                </p>

                {/* 1. Selected Camera Variant Picker */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#171924] border border-black/10 dark:border-white/10 space-y-3">
                  <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">
                    {t.waitlist.selectVariantTitle}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PRODUCT_VARIANTS.map((v) => {
                      const active = selectedVariant === v.id;
                      const name = (v.nameKey && (t.variants as any)[v.nameKey]) || v.name;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v.id)}
                          className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                            active
                              ? "bg-[#A2B997]/25 border-[#7B9370] dark:border-[#A2B997] text-slate-900 dark:text-white font-bold shadow-sm"
                              : "bg-white dark:bg-white/5 border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full inline-block mr-1.5"
                            style={{ backgroundColor: v.colors.primary }}
                          />
                          <span className="truncate block">{name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. VIP Perks Checklist */}
                <div className="p-4 rounded-2xl bg-[#A2B997]/15 dark:bg-[#A2B997]/10 border border-[#7B9370]/30 dark:border-[#A2B997]/25 space-y-2 text-xs">
                  <span className="font-mono font-bold text-[#5A734F] dark:text-[#A2B997] flex items-center gap-1.5 uppercase text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t.waitlist.perksTitle}
                  </span>
                  <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#5A734F] dark:text-[#A2B997] flex-shrink-0" />
                      <span>{t.waitlist.perk1}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#5A734F] dark:text-[#A2B997] flex-shrink-0" />
                      <span>{t.waitlist.perk2}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#5A734F] dark:text-[#A2B997] flex-shrink-0" />
                      <span>{t.waitlist.perk3}</span>
                    </li>
                  </ul>
                </div>

                {/* 3. Input Fields */}
                <div className="space-y-3 text-xs">
                  <div>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={t.waitlist.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/15 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#7B9370] dark:focus:border-[#A2B997]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={t.waitlist.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/15 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#7B9370] dark:focus:border-[#A2B997]"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder={t.waitlist.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/15 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#7B9370] dark:focus:border-[#A2B997]"
                    />
                  </div>

                  {status === "error" && (
                    <div className="text-xs text-rose-400 font-mono pl-1">
                      Chyba při odesílání. Zkuste to prosím znovu.
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#A2B997] via-[#8FA885] to-[#FF70A6] text-black font-black text-sm sm:text-base shadow-md dark:shadow-neon-sage hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70"
                  >
                    <span>{status === "loading" ? "Odesílám..." : t.waitlist.submitBtn}</span>
                    <ArrowRight className="w-5 h-5 text-black" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 px-1">
                    <span className="flex items-center gap-1 text-[#5A734F] dark:text-[#A2B997]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      100% Free VIP Access
                    </span>
                    <span>No spam • Instant cancellation</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};