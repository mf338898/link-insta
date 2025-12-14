"use client";
import React from "react";

export default function ScrollHint({ className = "" }) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const hide = () => setVisible(false);
    const timer = setTimeout(hide, 2600);
    window.addEventListener("scroll", hide, { once: true });
    window.addEventListener("pointerdown", hide, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("pointerdown", hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`${className} pointer-events-none select-none flex flex-col items-center gap-3 text-white/80`}
      aria-hidden
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-[-18px] rounded-full bg-gradient-to-br from-white/14 via-white/6 to-transparent blur-[6px] opacity-80 animate-[hint-pulse_2.6s_ease-in-out_infinite]" />
        <div className="absolute inset-[-8px] rounded-full border border-white/12 opacity-60 animate-[hint-breathe_2.6s_ease-in-out_infinite]" />
        <div className="relative flex items-center gap-3 rounded-2xl bg-[rgba(15,23,42,0.82)] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] shadow-[0_18px_40px_rgba(15,23,42,0.35)] ring-1 ring-white/12 backdrop-blur-xl">
          <svg viewBox="0 0 18 10" className="h-3.5 w-5 animate-[hint-arrow_2.6s_ease-in-out_infinite] text-white/90">
            <path d="M1 1.5 9 8.5 17 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span>FAITES DÉFILER</span>
        </div>
      </div>
      <style>{`
        @keyframes hint-arrow {
          0%, 100% { opacity: 0.35; transform: translateY(0); }
          45% { opacity: 1; transform: translateY(6px); }
        }
        @keyframes hint-pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.96); }
          45% { opacity: 0.45; transform: scale(1.02); }
        }
        @keyframes hint-breathe {
          0%, 100% { opacity: 0.28; transform: scale(0.98); }
          50% { opacity: 0.6; transform: scale(1.01); }
        }
      `}</style>
    </div>
  );
}
