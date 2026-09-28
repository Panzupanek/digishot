import React from "react";
import { useShop } from "../context/ShopContext";
import { PRODUCT_VARIANTS } from "../data/products";
import { Bell } from "lucide-react";

export const StickyBottomBar: React.FC = () => {
  const { t, selectedVariant, setSelectedVariant, openCheckout } = useShop();

  const variantObj =
    PRODUCT_VARIANTS.find((v) => v.id === selectedVariant) || PRODUCT_VARIANTS[0];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0A0B10]/95 backdrop-blur-xl border-t border-black/10 dark:border-white/15 px-4 py-3 shadow-[0_-10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_25px_rgba(0,0,0,0.5)] transition-colors">
      <div className="flex items-center justify-between gap-3">
        {/* Variant color buttons */}
        <div className="flex items-center space-x-2">
          {PRODUCT_VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVariant(v.id)}
              className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                selectedVariant === v.id
                  ? "border-[#7B9370] dark:border-white scale-110 shadow-sm"
                  : "border-transparent opacity-60"
              }`}
              style={{ backgroundColor: v.colors.primary }}
              title={(v.nameKey && (t.variants as any)[v.nameKey]) || v.name}
            />
          ))}
        </div>

        {/* Status & Reserve CTA */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="text-[9px] font-mono text-rose-600 dark:text-rose-400 font-bold block uppercase">
              SOLD OUT (0/100)
            </span>
            <span className="text-[11px] font-bold font-mono text-[#5A734F] dark:text-[#A2B997]">
              DROP IN 30 DAYS
            </span>
          </div>

          <button
            onClick={() => openCheckout(selectedVariant)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#A2B997] to-[#FF70A6] text-black font-black text-xs font-sans shadow-md dark:shadow-neon-sage flex items-center space-x-1.5 active:scale-95 transition-transform cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 fill-black" />
            <span>{t.nav.orderNow}</span>
          </button>
        </div>
      </div>
    </div>
  );
};