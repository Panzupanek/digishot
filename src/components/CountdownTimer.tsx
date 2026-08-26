import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ compact = false }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 29,
    hours: 23,
    minutes: 58,
    seconds: 45,
  });

  useEffect(() => {
    const targetKey = "digishot_drop_target";
    let targetTime = localStorage.getItem(targetKey);
    if (!targetTime) {
      const future = Date.now() + (29 * 24 * 60 * 60 * 1000) + (23 * 60 * 60 * 1000) + (59 * 60 * 1000);
      localStorage.setItem(targetKey, future.toString());
      targetTime = future.toString();
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, parseInt(targetTime || "0", 10) - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (compact) {
    return (
      <span className="font-mono font-bold text-[#7B9370] dark:text-[#A2B997] tracking-wider inline-flex items-center gap-1">
        <span>{pad(timeLeft.days)}d</span>:
        <span>{pad(timeLeft.hours)}h</span>:
        <span>{pad(timeLeft.minutes)}m</span>:
        <span>{pad(timeLeft.seconds)}s</span>
      </span>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto lg:mx-0 font-mono select-none">
      <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#14161F] border border-[#7B9370]/40 dark:border-[#A2B997]/30 shadow-sm dark:shadow-neon-sage text-center transition-colors">
        <span className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white block">
          {pad(timeLeft.days)}
        </span>
        <span className="text-[9px] sm:text-[10px] text-[#7B9370] dark:text-[#C4D8BC] font-semibold uppercase tracking-wider">
          DAYS
        </span>
      </div>

      <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#14161F] border border-black/10 dark:border-white/10 shadow-sm text-center transition-colors">
        <span className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white block">
          {pad(timeLeft.hours)}
        </span>
        <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          HOURS
        </span>
      </div>

      <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#14161F] border border-black/10 dark:border-white/10 shadow-sm text-center transition-colors">
        <span className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white block">
          {pad(timeLeft.minutes)}
        </span>
        <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          MINS
        </span>
      </div>

      <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#14161F] border border-[#FF70A6]/40 dark:border-[#FF70A6]/30 shadow-sm dark:shadow-neon-pink text-center transition-colors">
        <span className="text-xl sm:text-3xl font-black text-[#FF4D88] dark:text-[#FF70A6] block">
          {pad(timeLeft.seconds)}
        </span>
        <span className="text-[9px] sm:text-[10px] text-[#FF4D88] dark:text-pink-300 font-semibold uppercase tracking-wider">
          SECS
        </span>
      </div>
    </div>
  );
};