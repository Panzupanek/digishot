import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cameraSound } from '../lib/sound';

export const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const promoCode = "DROP20";

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
        body: JSON.stringify({ email, discount_code: promoCode }),
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
            event_label: 'Drop #1 Lead'
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
            <p className="text-emerald-600 dark:text-emerald-400 font-bold mb-1">✓ Místo v Dropu #1 rezervováno!</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">Kód ti byl také odeslán na e-mail.</p>
            
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
              className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 shadow-sm text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition whitespace-nowrap disabled:opacity-50 cursor-pointer text-sm shadow-md active:scale-95"
            >
              {status === 'loading' ? 'Odesílám...' : 'Získat kód (-20 %) ✦'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-2 font-medium">Něco se pokazilo, zkus to prosím znovu.</p>
        )}
      </div>
    </section>
  );
};