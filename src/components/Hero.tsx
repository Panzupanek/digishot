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
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
        <span>⚡ Drop #1: Sleva 20 % pro waitlist</span>
        <span className="text-zinc-500 line-through font-normal">1 890 Kč (75 €)</span>
        <span className="text-emerald-300 font-bold">1 490 Kč (60 €)</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
        Žádný displej. Čistá párty.
      </h1>
      <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8">
        Zapiš se na waitlist a získej VIP kód na slevu 20 %. Ušetříš 400 Kč (15 €) při oficiálním spuštění.
      </p>

      {/* Formulář nebo Odhalený kód */}
      <div className="max-w-md mx-auto">
        {status === 'success' ? (
          <div className="p-6 rounded-2xl bg-zinc-900 border border-emerald-500/40 text-center animate-fade-in">
            <p className="text-emerald-400 font-semibold mb-1">✓ Místo v Dropu #1 rezervováno!</p>
            <p className="text-xs text-zinc-400 mb-4">Kód ti byl také odeslán na e-mail.</p>
            
            <div className="flex items-center justify-between bg-black/60 border border-zinc-700 rounded-xl p-3 px-4">
              <span className="font-mono text-xl font-bold tracking-widest text-emerald-300">{promoCode}</span>
              <button
                type="button"
                onClick={copyCode}
                className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-600 transition cursor-pointer"
              >
                {copied ? '✓ Zkopírováno' : 'Kopírovat'}
              </button>
            </div>
            <p className="text-[11px] text-zinc-500 mt-3">Platí na cenu 1 490 Kč / 60 € po spuštění dropu.</p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tvůj e-mail pro slevový kód..."
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition whitespace-nowrap disabled:opacity-50 cursor-pointer text-sm"
            >
              {status === 'loading' ? 'Odesílám...' : 'Získat kód (-20 %) ✦'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-xs mt-2">Něco se pokazilo, zkus to prosím znovu.</p>
        )}
      </div>
    </section>
  );
};