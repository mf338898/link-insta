import { Fingerprint, Activity, Lock, Instagram, MapPin } from "lucide-react";

type ReflectiveCardProps = {
  name: string;
  title: string;
  status?: string;
  handle?: string | null;
  handleHref?: string;
  idLabel?: string;
  idValue?: string;
  imageSrc?: string;
  overlayColor?: string;
  textColor?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function ReflectiveCard({
  name,
  title,
  status,
  handle,
  handleHref,
  idLabel = "Finistère — ALV Immobilier",
  idValue = "Pleyben · Quimper · Brest",
  imageSrc = "/images/avatars/matthis-profile.png",
  overlayColor = "rgba(255,255,255,0.06)",
  textColor = "rgba(21, 36, 75, 0.96)",
  className = "",
  style = {},
}: ReflectiveCardProps) {
  return (
    <div
      className={`relative w-full max-w-[420px] min-h-[440px] sm:min-h-[520px] overflow-hidden rounded-[26px] bg-gradient-to-br from-white via-[#f7fbff] to-[#e7f3ff] shadow-[0_24px_60px_rgba(15,23,42,0.16)] ring-1 ring-white/70 backdrop-blur-xl ${className}`}
      style={style}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(148,197,255,0.35),transparent_35%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.22),transparent_32%),radial-gradient(circle_at_50%_88%,rgba(252,211,77,0.25),transparent_38%)]" />

      <div className="absolute inset-[-18%] rotate-[8deg] bg-[linear-gradient(120deg,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_55%,rgba(255,255,255,0.7)_100%)] mix-blend-screen opacity-60 animate-[shine_6s_ease-in-out_infinite]" />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%270%200%20200%20200%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.95%27%20numOctaves%3D%273%27%20stitchTiles%3D%27stitch%27/%3E%3C/filter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url(%23n)%27%20opacity%3D%270.07%27/%3E%3C/svg%3E')] opacity-70 mix-blend-soft-light" />

      <div className="absolute inset-0 rounded-[26px] p-[1px] bg-[linear-gradient(135deg,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0.35)_48%,rgba(255,255,255,0.8)_100%)] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude]" />

      <div
        className="relative z-10 flex h-full flex-col justify-between gap-5 bg-[var(--overlay-color,rgba(255,255,255,0.06))] p-5 sm:p-7"
        style={{ ["--overlay-color" as string]: overlayColor, color: textColor }}
      >
        <div className="flex items-center justify-between border-b border-white/40 pb-4">
          <div className="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/60 px-2.5 py-1.5 sm:px-3 sm:py-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[color:var(--alv-navy,#111827)] shadow-[0_10px_28px_rgba(15,23,42,0.14)] backdrop-blur">
            <Lock size={14} className="opacity-70" />
            <span>Carte Pro</span>
          </div>
          <Activity className="opacity-70" size={18} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-3xl border border-white/70 shadow-[0_18px_36px_rgba(15,23,42,0.18)]">
            <img
              src={imageSrc}
              alt={name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 mix-blend-screen" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-[0.04em] sm:tracking-[0.06em] drop-shadow-sm break-words">{name}</h2>
            <p className="text-[11px] sm:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[color:var(--alv-navy,#1f2937)]/80">
              {title}
            </p>
            {status ? (
              <p className="text-xs sm:text-sm font-medium text-[color:var(--alv-navy,#1f2937)]/80 leading-relaxed">{status}</p>
            ) : null}
          </div>
          {handle ? (
            <a
              href={handleHref ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[color:var(--alv-navy,#111827)] shadow-[0_12px_26px_rgba(15,23,42,0.16)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(15,23,42,0.2)]"
            >
              <Instagram size={14} className="opacity-80" />
              <span>{handle}</span>
            </a>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-white/40 pt-5 text-[color:var(--alv-navy,#1f2937)]/85">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.18em] uppercase opacity-70">{idLabel}</span>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.06em] flex items-center gap-1.5">
              <MapPin size={13} className="opacity-70" />
              {idValue}
            </span>
          </div>
          <div className="rounded-full border border-white/40 bg-white/60 p-2 shadow-inner">
            <Fingerprint size={26} className="opacity-60" />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-18%) rotate(8deg); opacity: 0.2; }
          50% { transform: translateX(18%) rotate(8deg); opacity: 0.5; }
          100% { transform: translateX(36%) rotate(8deg); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
