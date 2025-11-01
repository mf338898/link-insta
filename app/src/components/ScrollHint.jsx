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
      className={`${className} pointer-events-none select-none inline-flex flex-col items-center gap-3 text-foreground/80`}
      aria-hidden
    >
      <div className="relative h-12 w-14 rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-lg">
        <span className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400 animate-[hint-dot_2s_ease-in-out_infinite] shadow-sm" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 animate-[hint-pulse_2s_ease-in-out_infinite]" />
      </div>
      <div className="text-[11px] font-medium opacity-80 animate-[hint-fade_2s_ease-in-out_infinite] tracking-wide">
        Faites défiler
      </div>
      <style>{`
        @keyframes hint-dot {
          0% { transform: translate(-50%, 3px); opacity: .3; scale: 0.8 }
          30% { opacity: 1; scale: 1.1 }
          60% { transform: translate(-50%, 25px); opacity: .3; scale: 0.8 }
          100% { transform: translate(-50%, 3px); opacity: .3; scale: 0.8 }
        }
        @keyframes hint-pulse {
          0%, 100% { opacity: 0.2; scale: 1 }
          50% { opacity: 0.6; scale: 1.1 }
        }
        @keyframes hint-fade { 
          0%, 100% { opacity: .6; transform: translateY(0px) } 
          50% { opacity: 1; transform: translateY(-2px) } 
        }
      `}</style>
    </div>
  );
}


