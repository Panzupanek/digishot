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

  return (
    <section className="relative pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
      {/* Cenový odznak se slevou */}
      <div className="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider mb-6">
        <span className="text-emerald-700 dark:text-emerald-400 font-bold">⚡ DROP #1: SLEVA 20 % PRO WAITLIST</span>
        <span className="line-through text-zinc-500 mx-1">1 890 Kč (75 €)</span>
        <span className="font-bold text-emerald-600 dark:text-emerald-400">1 490 Kč (60 €)</span>
      </div>

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
                className="group bg-[#A2B997] hover:bg-white text-zinc-950 font-bold px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(162,185,151,0.5)] hover:shadow-[0_0_25px_rgba(162,185,151,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap disabled:opacity-50 cursor-pointer text-sm flex items-center justify-center gap-2"
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
  );
};