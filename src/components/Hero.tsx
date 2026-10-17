import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { cameraSound } from '../lib/sound';
import { useShop } from '../context/ShopContext';
import { CameraVariantId } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Lock } from 'lucide-react';

const COLOR_OPTIONS: { id: CameraVariantId; name: string; label: string; dot: string }[] = [
  { id: 'blush', name: 'DigiShot Blush', label: 'Blush', dot: '#FFB7C5' },
  { id: 'white', name: 'DigiShot Retro White', label: 'Retro White', dot: '#E2E8F0' },
  { id: 'brown', name: 'DigiShot Classic', label: 'Classic', dot: '#8D4F28' },
  { id: 'purple', name: 'DigiShot Purple', label: 'Purple', dot: '#9333EA' },
  { id: 'black', name: 'DigiShot Noir', label: 'Noir', dot: '#27272A' },
];

export const Hero: React.FC = () => {
  const { selectedVariant, setSelectedVariant } = useShop();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowWelcome(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const promoCode = "DROP20";

  const currentVariant = COLOR_OPTIONS.find((c) => c.id === selectedVariant) || COLOR_OPTIONS[0];
  const selectedColor = currentVariant.name;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/mqpaljal', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          preferred_color: selectedColor,
          discount_code: 'DROP20',
        }),
      });

      if (res.ok) {
        setStatus('success');
        if (typeof cameraSound === 'function') {
          (cameraSound as any)();
        } else if (cameraSound?.playShutter) {
          cameraSound.playShutter();
        }
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'waitlist_signup', {
            event_category: 'Waitlist',
            event_label: `Drop #1 - ${selectedColor}`
          });
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Uvítací vrstva (Welcome Modal / Overlay) pro okamžitou konverzi ihned po načtení */}
      <AnimatePresence>
        {showWelcome && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-[#0C0D12] text-white border-t sm:border border-emerald-500/35 rounded-t-[2rem] sm:rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_35px_rgba(16,185,129,0.2)] overflow-hidden my-0 sm:my-auto text-left max-h-[92vh] overflow-y-auto"
            >
              {/* Y2K Ambient Glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 w-52 h-52 bg-emerald-500/20 rounded-full blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-52 h-52 bg-pink-500/20 rounded-full blur-3xl" />

              {/* Close Button X */}
              <button
                type="button"
                onClick={() => setShowWelcome(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 transition cursor-pointer border border-zinc-800 z-10"
                aria-label="Zavřít"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Mobile grab bar indicator */}
              <div className="sm:hidden w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-4" />

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>⚡ LIVE WAITLIST • DROP #1</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-snug mb-3">
                Místa v Dropu #1 mizí <span className="text-emerald-400">(zbývá pár míst z 75)</span>. Získej foťák jako první s 20% slevou.
              </h2>

              {/* Price comparison strip */}
              <div className="flex flex-wrap items-center gap-2 bg-zinc-900/90 border border-zinc-800 rounded-xl px-3.5 py-2.5 mb-4">
                <span className="text-xs font-mono text-zinc-400">VIP cena:</span>
                <span className="text-sm font-bold text-zinc-500 line-through">1 890 Kč (75 €)</span>
                <span className="text-base font-black text-emerald-400">1 490 Kč (60 €)</span>
                <span className="ml-auto text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  -20 % S KÓDEM DROP20
                </span>
              </div>

              {status === 'success' ? (
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-emerald-500/50 text-center animate-fade-in shadow-xl">
                  <p className="text-emerald-400 font-extrabold text-base mb-1">
                    ✓ Místo v Dropu #1 rezervováno pro edici: {selectedColor}
                  </p>
                  <p className="text-xs text-zinc-300 mb-3">
                    Tvůj kód na 20% slevu: <strong>{promoCode}</strong>
                  </p>
                  <div className="flex items-center justify-between bg-black border border-zinc-700 rounded-xl p-3 px-4 mb-4">
                    <span className="font-mono text-xl font-bold tracking-widest text-emerald-400">{promoCode}</span>
                    <button
                      type="button"
                      onClick={copyCode}
                      className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-lg border border-zinc-600 transition cursor-pointer font-medium"
                    >
                      {copied ? '✓ Zkopírováno' : 'Kopírovat'}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowWelcome(false)}
                    className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold text-sm rounded-xl transition cursor-pointer shadow-lg"
                  >
                    Vstoupit na web a prohlédnout fotky ✦
                  </button>
                </div>
              ) : (
                <>
                  {/* Color Selector Pills */}
                  <div className="mb-4">
                    <span className="block text-xs font-semibold text-zinc-400 mb-2">
                      Vyber si barvu pro rezervaci:
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {COLOR_OPTIONS.map((opt) => {
                        const active = selectedVariant === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setSelectedVariant(opt.id);
                              if (cameraSound?.playClick) cameraSound.playClick();
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                              active
                                ? "bg-white text-black border-transparent font-bold ring-2 ring-emerald-400 shadow-sm scale-105"
                                : "bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-zinc-700"
                            }`}
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/20"
                              style={{ backgroundColor: opt.dot }}
                            />
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Tvůj e-mail pro 20% slevový kód..."
                        className="w-full bg-zinc-950/90 border border-zinc-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 text-base focus:outline-none transition shadow-inner"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-black font-black text-base sm:text-lg uppercase tracking-wide shadow-[0_0_30px_rgba(52,211,153,0.45)] hover:shadow-[0_0_40px_rgba(52,211,153,0.65)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        'Rezervuji místo...'
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 fill-black" />
                          <span>Zapsat na waitlist</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

              {status === 'error' && (
                <p className="text-red-400 text-xs mt-2 font-medium">Něco se pokazilo, zkus to prosím znovu.</p>
              )}

              {/* Close secondary link */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowWelcome(false)}
                  className="text-xs text-zinc-500 hover:text-zinc-400 transition cursor-pointer underline underline-offset-4"
                >
                  Pokračovat na web bez rezervace →
                </button>
              </div>

              {/* Reassurance */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                <Lock className="w-3 h-3 text-zinc-500" />
                <span>Bez spamu • Kód obdržíš ihned na obrazovce</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="relative pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
        {/* Cenový odznak se slevou (kliknutím lze znovu otevřít uvítací okno) */}
        <button
          type="button"
          onClick={() => setShowWelcome(true)}
          className="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider mb-6 cursor-pointer hover:bg-emerald-500/20 transition-colors"
        >
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">⚡ DROP #1: SLEVA 20 % PRO WAITLIST</span>
          <span className="line-through text-zinc-500 mx-1">1 890 Kč (75 €)</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">1 490 Kč (60 €)</span>
        </button>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-4">
        Žádný displej. Čistá párty.
      </h1>
      <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
        Zapiš se na waitlist a získej VIP kód na 20% slevu pro nadcházející Drop #1.
      </p>

      {/* Formulář nebo Odhalený kód */}
      <div className="max-w-md mx-auto">
        {status === 'success' ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-emerald-500/40 text-center animate-fade-in shadow-xl">
            <p className="text-emerald-600 dark:text-emerald-400 font-bold mb-1">
              ✓ Místo v Dropu #1 rezervováno pro edici: {selectedColor}
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
              Tvůj kód na 20% slevu: <strong>{promoCode}</strong> (zasláno také na e-mail)
            </p>
            
            <div className="flex items-center justify-between bg-white dark:bg-black/60 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 px-4 shadow-sm">
              <span className="font-mono text-xl font-bold tracking-widest text-emerald-600 dark:text-emerald-400">{promoCode}</span>
              <button
                type="button"
                onClick={copyCode}
                className="text-xs bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-600 transition cursor-pointer font-medium"
              >
                {copied ? '✓ Zkopírováno' : 'Kopírovat'}
              </button>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-3">Platí na cenu 1 490 Kč / 60 € po spuštění dropu.</p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Color Selector Pills */}
            <div className="text-center">
              <span className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
                Vyber si barvu pro rezervaci:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                {COLOR_OPTIONS.map((opt) => {
                  const active = selectedVariant === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSelectedVariant(opt.id);
                        if (cameraSound?.playClick) cameraSound.playClick();
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                        active
                          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent shadow-sm font-semibold scale-105 ring-2 ring-emerald-500/40"
                          : "bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/20"
                        style={{ backgroundColor: opt.dot }}
                      />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email input and submit button */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tvůj e-mail pro slevový kód..."
                className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 shadow-sm text-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition whitespace-nowrap disabled:opacity-50 cursor-pointer text-sm shadow-md active:scale-95"
              >
                {status === 'loading' ? 'Odesílám...' : 'Získat kód (-20 %) ✦'}
              </button>
            </div>
          </form>
        )}
        {status === 'error' && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-2 font-medium">Něco se pokazilo, zkus to prosím znovu.</p>
        )}
      </div>
    </section>
  </>
  );
};