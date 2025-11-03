"use client";

import React from "react";
import ShinyText from "@/components/ShinyText";

type Props = {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
  label?: string;
  children?: React.ReactNode;
};

export default function ShareButton({
  title,
  text,
  url,
  className,
  label,
  children,
}: Props) {
  async function handleShare() {
    const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
    const shareData: ShareData = {
      title: title ?? document?.title ?? "",
      text: text ?? "",
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // fallthrough to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Lien copié dans le presse-papiers");
    } catch {
      // last resort: open native share sheet via mailto
      window.location.href = `mailto:?subject=${encodeURIComponent(
        title ?? "Ma carte de contact"
      )}&body=${encodeURIComponent(shareUrl)}`;
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={
        className ??
        "rounded-full border px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
      }
    >
      {children ?? <ShinyText text={label ?? "Partager ma carte"} speed={6} />}
    </button>
  );
}
