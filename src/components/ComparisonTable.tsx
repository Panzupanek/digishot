import React from "react";
import { useShop } from "../context/ShopContext";
import { Sparkles } from "lucide-react";

export const ComparisonTable: React.FC = () => {
  const { t } = useShop();

  return (
    <section id="comparison" className="py-20 bg-white dark:bg-[#0C0D12] border-t border-black/10 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#A2B997]/20 dark:bg-white/5 border border-[#7B9370]/30 dark:border-white/10 text-xs font-mono text-[#5A734F] dark:text-[#FF9F1C] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.comparison.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white transition-colors">
            {t.comparison.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal transition-colors">
            {t.comparison.subheading}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[640px] rounded-3xl bg-slate-50 dark:bg-[#12141C] border border-black/10 dark:border-white/10 shadow-lg dark:shadow-2xl p-6 sm:p-8 transition-colors">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 pb-4">
                  <th className="py-4 px-4 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                    {t.comparison.feature}
                  </th>
                  <th className="py-4 px-4 text-sm font-sans font-black text-[#5A734F] dark:text-[#A2B997] bg-[#A2B997]/15 dark:bg-[#A2B997]/10 rounded-t-2xl border-t border-x border-[#7B9370]/30 dark:border-[#A2B997]/30">
                    ★ {t.comparison.digishot}
                  </th>
                  <th className="py-4 px-4 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                    {t.comparison.smartphone}
                  </th>
                  <th className="py-4 px-4 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                    {t.comparison.disposableFilm}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs sm:text-sm">
                {t.comparison.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-medium text-slate-800 dark:text-slate-300 font-sans">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white bg-[#A2B997]/15 dark:bg-[#A2B997]/10 border-x border-[#7B9370]/30 dark:border-[#A2B997]/30 flex-1">
                      <span className="text-[#5A734F] dark:text-[#A2B997]">{row.digishot}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {row.smartphone}
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {row.disposableFilm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};