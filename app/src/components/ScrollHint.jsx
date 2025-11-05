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
      className={`${className} pointer-events-none select-none inline-flex flex-col items-center gap-2 text-foreground/70`}
      aria-hidden
    >
      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] shadow-sm backdrop-blur-md animate-[hint-text_2.6s_ease-in-out_infinite]">
        Faites défiler
      </span>
      <span className="flex flex-col items-center gap-1 text-foreground/60">
        <span className="block h-2 w-px rounded-full bg-current opacity-70" />
        <span className="block h-2 w-px rounded-full bg-current opacity-50" />
        <svg viewBox="0 0 18 10" className="h-2.5 w-4 animate-[hint-arrow_2.6s_ease-in-out_infinite]">
          <path d="M1 1.5 9 8.5 17 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <style>{`
        @keyframes hint-text {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          45% { opacity: 0.9; transform: translateY(-3px); }
        }
        @keyframes hint-arrow {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(4px); }
          70% { opacity: 0.5; transform: translateY(8px); }
        }
      `}</style>
    </div>
  );
}
