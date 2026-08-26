import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { cameraSound } from "../lib/sound";
import { DigiShotLogo } from "./Logo";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useShop();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      cameraSound.playPlugIn();
      setIsSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#EDF1EA] dark:bg-[#07080B] border-t border-black/10 dark:border-white/10 pt-16 pb-12 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-black/10 dark:border-white/10">
          {/* Brand Col with Official Logo */}
          <div className="lg:col-span-5 space-y-4">
            <DigiShotLogo size="md" />
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm font-normal">
              {t.footer.brandTagline}
            </p>
            <div className="flex items-center space-x-3 pt-2 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                ⚡ USB-C Direct
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                🔒 2-Year Warranty
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2 font-sans text-sm">
              Explore
            </span>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-[#5A734F] dark:hover:text-[#A2B997] transition-colors">{t.nav.features}</a></li>
              <li><a href="#variants" className="hover:text-[#5A734F] dark:hover:text-[#A2B997] transition-colors">{t.nav.variants}</a></li>
              <li><a href="#how-it-works" className="hover:text-[#0284c7] dark:hover:text-[#70EEFF] transition-colors">{t.nav.howItWorks}</a></li>
              <li><a href="#gallery" className="hover:text-[#e11d48] dark:hover:text-[#FF70A6] transition-colors">{t.nav.gallery}</a></li>
              <li><a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.nav.faq}</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-4 space-y-3">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block font-sans text-sm">
              {t.footer.newsletterTitle}
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t.footer.newsletterDesc}
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono">
                {t.footer.subscribed}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.emailPlaceholder}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-black/15 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#7B9370] dark:focus:border-[#A2B997]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#A2B997] hover:bg-[#8FA885] text-black font-bold text-xs font-mono shadow-sm transition-all cursor-pointer"
                >
                  {t.footer.subscribeBtn}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center space-x-4">
            <span>{t.footer.privacy}</span>
            <span>•</span>
            <span>{t.footer.terms}</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 ml-2 cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};