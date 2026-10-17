import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cameraSound } from '../lib/sound';
import { useShop } from '../context/ShopContext';
import { CameraVariantId } from '../data/products';

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

  const scrollToDiscover = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. DARK SPOTLIGHT – první obrazovka obsahuje pouze sběr e-mailu.
          Výška odečítá hlavičku (+ na mobilu i spodní sticky lištu), aby šipka dole byla vidět bez scrollování. */}
      <section className="relative w-full bg-[#121212] text-white overflow-hidden border-b border-white/10">
        {/* Jemný spotlight za formulářem */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] max-w-[120vw] rounded-full bg-[#A2B997]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 py-6 flex flex-col justify-between items-center text-center min-h-[calc(100svh-190px)] md:min-h-[calc(100vh-110px)]">
          {/* Nahoře: malý minimalistický badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A2B997]" />
            <span>DigiShot ✦ Drop #1</span>
          </div>

          {/* Středobod: krátká výzva + obří formulář */}
          <div className="w-full max-w-xl my-auto py-8">
            {status === 'success' ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-[#A2B997]/50 shadow-[0_0_40px_rgba(162,185,151,0.25)] animate-fade-in">
                <p className="text-[#A2B997] font-extrabold text-xl mb-2">
                  ✓ Jsi na waitlistu!
                </p>
                <p className="text-sm text-zinc-400 mb-5">
                  Tvůj VIP kód na 20% slevu pro edici {selectedColor}:
                </p>
                <div className="flex items-center justify-between bg-black/60 border border-white/15 rounded-2xl p-3 px-5 max-w-sm mx-auto">
                  <span className="font-mono text-2xl font-bold tracking-widest text-[#A2B997]">{promoCode}</span>
                  <button
                    type="button"
                    onClick={copyCode}
                    className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 transition cursor-pointer font-medium"
                  >
                    {copied ? '✓ Zkopírováno' : 'Kopírovat'}
                  </button>
                </div>
                <p className="text-[11px] text-zinc-500 mt-4">Platí na cenu 1 490 Kč / 60 € po spuštění dropu.</p>
              </div>
            ) : (
              <>
                <p className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-8 leading-tight">
                  Zapiš se na waitlist a získej VIP slevu.
                </p>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tvůj e-mail..."
                    aria-label="E-mail"
                    className="w-full bg-white text-black placeholder-zinc-400 text-lg sm:text-xl rounded-2xl px-6 py-5 outline-none border-2 border-transparent focus:border-[#A2B997] focus:ring-4 focus:ring-[#A2B997]/30 transition"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative w-full bg-[#A2B997] hover:bg-white text-black font-black text-lg sm:text-xl px-8 py-5 rounded-2xl shadow-[0_0_40px_rgba(162,185,151,0.6)] hover:shadow-[0_0_60px_rgba(162,185,151,0.9)] hover:scale-[1.03] active:scale-95 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {/* Pulzující záře za tlačítkem */}
                    <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-[#A2B997]/40 blur-lg animate-pulse -z-10" />
                    <span>{status === 'loading' ? 'Odesílám...' : 'Získat kód (-20 %)'}</span>
                    {status !== 'loading' && (
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    )}
                  </button>
                </form>

                {status === 'error' && (
                  <p className="text-red-400 text-sm mt-3 font-medium">Něco se pokazilo, zkus to prosím znovu.</p>
                )}
              </>
            )}
          </div>

          {/* Dole: animovaná šipka */}
          <a
            href="#discover"
            onClick={scrollToDiscover}
            className="inline-flex flex-col items-center gap-1 text-xs font-medium text-zinc-500 hover:text-white transition-colors cursor-pointer select-none"
          >
            <span>Nebo objev foťák</span>
            <svg className="w-5 h-5 animate-bounce text-[#A2B997]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* 2. VŠE OSTATNÍ – až pod tmavou obrazovkou */}
      <section id="discover" className="relative pt-20 pb-20 px-4 text-center max-w-4xl mx-auto scroll-mt-20">
        {/* Cenovka */}
        <div className="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">⚡ DROP #1: SLEVA 20 % PRO WAITLIST</span>
          <span className="line-through text-zinc-500 mx-1">1 890 Kč (75 €)</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">1 490 Kč (60 €)</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-3">
          Žádný displej. Čistá párty.
        </h2>
        <p className="text-xl sm:text-2xl font-bold text-[#55754b] dark:text-[#A2B997] mb-4">
          Získej foťák mezi prvními s 20% VIP slevou.
        </p>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Drop #1 se připravuje — limitovaná série 75 kusů. Zapiš se na waitlist a získej VIP kód DROP20.
        </p>

        {/* Výběr barev */}
        <div className="text-center max-w-md mx-auto mb-8">
          <span className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-3">
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
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent shadow-sm font-semibold scale-105 ring-2 ring-[#A2B997]"
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

        {/* Druhý formulář (sdílí stav s formulářem nahoře) */}
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
            <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tvůj e-mail pro slevový kód..."
                className="flex-1 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#A2B997] focus:ring-2 focus:ring-[#A2B997]/40 shadow-sm text-sm transition-all duration-200"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group bg-[#A2B997] hover:bg-white text-gray-900 font-bold px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(162,185,151,0.6)] hover:shadow-[0_0_30px_rgba(162,185,151,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out whitespace-nowrap disabled:opacity-50 cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                <span>{status === 'loading' ? 'Odesílám...' : 'Získat kód (-20 %)'}</span>
                {status !== 'loading' && (
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                )}
              </button>
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