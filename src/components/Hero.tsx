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
      {/* 1. 100VH SQUEEZE PAGE - DOMINANTNÍ SBĚR E-MAILU */}
      <section className="min-h-screen flex flex-col justify-between items-center px-4 py-8 text-center relative max-w-4xl mx-auto w-full">
        {/* Zcela nahoře: malinké logo / text */}
        <div className="pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-xs font-mono font-bold tracking-wider uppercase text-zinc-700 dark:text-zinc-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#A2B997] animate-ping" />
            <span>DigiShot ✦ Drop #1</span>
          </div>
        </div>

        {/* Uprostřed obrazovky: Velký a extrémně výrazný blok s formulářem */}
        <div className="my-auto w-full max-w-2xl px-2 py-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A2B997]/20 border border-[#A2B997]/50 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 text-[#3d5a32] dark:text-[#A2B997]">
            <span>⚡ VIP WAITLIST: SLEVA 20 %</span>
            <span className="line-through opacity-60">1 890 Kč</span>
            <span className="font-extrabold text-[#2a4122] dark:text-white">1 490 Kč (60 €)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-950 dark:text-white mb-4 leading-tight">
            Získej foťák mezi prvními <br className="hidden sm:inline" />
            <span className="text-[#55754b] dark:text-[#A2B997]">s 20% VIP slevou</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
            Limitovaná série 75 kusů. Zapiš se na waitlist dříve, než zmizí poslední místa, a získej VIP kód.
          </p>

          {/* Obrovský zářící box */}
          <div className="relative p-4 sm:p-7 rounded-3xl bg-white/95 dark:bg-[#121318]/95 backdrop-blur-xl border-2 border-[#A2B997]/70 shadow-[0_0_50px_rgba(162,185,151,0.35)] dark:shadow-[0_0_60px_rgba(162,185,151,0.25)] transition-all">
            {/* Vnější pulzující aura boxu */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#A2B997]/25 via-[#A2B997]/40 to-[#A2B997]/25 blur-xl opacity-70 animate-pulse -z-10 pointer-events-none" />

            {status === 'success' ? (
              <div className="p-4 sm:p-6 text-center animate-fade-in">
                <p className="text-emerald-600 dark:text-[#A2B997] font-bold text-lg mb-1">
                  ✓ Místo v Dropu #1 rezervováno!
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
                  Tvůj kód na 20% slevu: <strong>{promoCode}</strong> (platí na zahájení dropu)
                </p>
                <div className="flex items-center justify-between bg-white dark:bg-black/60 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 px-4 shadow-sm max-w-sm mx-auto">
                  <span className="font-mono text-xl font-bold tracking-widest text-[#4d6f43] dark:text-[#A2B997]">{promoCode}</span>
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
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tvůj e-mail pro slevový kód..."
                    className="flex-1 bg-white/80 dark:bg-zinc-950/70 border border-zinc-300 dark:border-zinc-700 focus:border-[#A2B997] focus:ring-2 focus:ring-[#A2B997]/40 rounded-2xl px-5 py-4 text-base text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 shadow-inner outline-none transition"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative bg-[#A2B997] hover:bg-white text-gray-950 font-black text-base sm:text-lg px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(162,185,151,0.8)] hover:shadow-[0_0_45px_rgba(162,185,151,1)] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 overflow-hidden disabled:opacity-50"
                  >
                    {/* Pulzující glow aura */}
                    <span className="absolute inset-0 bg-[#A2B997] blur-md opacity-40 animate-pulse pointer-events-none" />
                    <span className="relative z-10 flex items-center gap-2">
                      <span>{status === 'loading' ? 'Odesílám...' : 'Získat kód -20 %'}</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                        →
                      </span>
                    </span>
                  </button>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono text-center">
                  🔒 Žádný spam • Kód DROP20 získáš okamžitě na obrazovce
                </p>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-2 font-medium">Něco se pokazilo, zkus to prosím znovu.</p>
            )}
          </div>
        </div>

        {/* Úplný spodek: animovaná šipka dolů s textem "Nebo objev DigiShot" */}
        <div className="pb-4 pt-2">
          <a
            href="#discover"
            onClick={scrollToDiscover}
            className="group inline-flex flex-col items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer select-none"
          >
            <span>Nebo objev DigiShot</span>
            <svg
              className="w-5 h-5 animate-bounce text-[#A2B997]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* 2. ODSUNUTÝ ZBYTEK WEBU POD 100VH SEKCI */}
      <section id="discover" className="relative pt-20 pb-20 px-4 text-center max-w-4xl mx-auto scroll-mt-12">
        {/* Cenový odznak se slevou */}
        <div className="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">⚡ DROP #1: SLEVA 20 % PRO WAITLIST</span>
          <span className="line-through text-zinc-500 mx-1">1 890 Kč (75 €)</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">1 490 Kč (60 €)</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-4">
          Žádný displej. Čistá párty.
        </h2>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Zapiš se na waitlist a získej VIP kód na 20% slevu pro nadcházející Drop #1.
        </p>

        {/* Color Selector Pills */}
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
              <div className="flex flex-col sm:flex-row gap-2">
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
                  {status === 'loading' ? (
                    'Odesílám...'
                  ) : (
                    <>
                      <span>Získat kód (-20 %)</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </>
                  )}
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