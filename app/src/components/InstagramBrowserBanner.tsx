"use client";

import { useEffect, useState } from "react";
import ShareButton from "@/components/ShareButton";

type DevicePlatform = "ios" | "android" | "other";

const STORAGE_KEY = "instagram-browser-banner-dismissed";

const instructionsByPlatform: Record<DevicePlatform, string> = {
  ios: "Touchez l'icône ⋯ en bas de l'écran, puis choisissez « Ouvrir dans Safari » pour une expérience fluide.",
  android:
    "Touchez l'icône ⋯ en haut à droite, puis sélectionnez « Ouvrir dans le navigateur » pour continuer sur Chrome.",
  other:
    "Utilisez le menu de partage d'Instagram pour ouvrir ce lien dans votre navigateur par défaut.",
};

function detectPlatform(userAgent: string): DevicePlatform {
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return "ios";
  }

  if (/Android/i.test(userAgent)) {
    return "android";
  }

  return "other";
}

function isInstagramInAppBrowser(userAgent: string): boolean {
  return /Instagram|FBAN|FBAV|FB_IAB/i.test(userAgent);
}

export default function InstagramBrowserBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [platform, setPlatform] = useState<DevicePlatform>("other");
  const [copyFeedback, setCopyFeedback] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const isDismissed = (() => {
      try {
        return window.sessionStorage.getItem(STORAGE_KEY) === "1";
      } catch {
        return false;
      }
    })();

    if (isDismissed) {
      return;
    }

    const userAgent = window.navigator.userAgent || "";
    const inInstagram = isInstagramInAppBrowser(userAgent);

    const isStandalone =
      (window.navigator as Navigator & { standalone?: boolean })?.standalone ?? false ||
      window.matchMedia("(display-mode: standalone)").matches;

    if (inInstagram && !isStandalone) {
      setPlatform(detectPlatform(userAgent));
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (copyFeedback !== "idle") {
      const timer = window.setTimeout(() => setCopyFeedback("idle"), 2500);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [copyFeedback]);

  if (!isVisible) {
    return null;
  }

  async function handleCopyLink() {
    if (typeof window === "undefined") {
      return;
    }

    try {
      await window.navigator.clipboard.writeText(window.location.href);
      setCopyFeedback("copied");
    } catch {
      setCopyFeedback("failed");
    }
  }

  function handleClose() {
    setIsVisible(false);

    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore storage errors (private mode, etc.)
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[999] flex justify-center px-4 pt-4 sm:pt-6">
      <div className="pointer-events-auto flex max-w-2xl flex-1 flex-col gap-3 rounded-2xl border border-white/30 bg-white/95 p-4 text-sm text-slate-700 shadow-[0_18px_42px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-slate-700/40 dark:bg-slate-900/95 dark:text-slate-100 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white shadow-md">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-7 w-7"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm9.25 2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
              />
            </svg>
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              Ouvrir dans votre navigateur
            </p>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-200">
              Ce lien est ouvert dans le navigateur intégré d&apos;Instagram. Pour profiter de toutes les fonctionnalités, ouvrez-le dans votre navigateur habituel.
            </p>
            <p className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-600 shadow-inner dark:bg-slate-800 dark:text-slate-100">
              {instructionsByPlatform[platform]}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
            aria-label="Fermer la bannière"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <ShareButton
            label="Partager / Ouvrir via…"
            className="flex-1 rounded-xl border border-slate-200 bg-slate-900/90 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.16)] transition hover:bg-slate-900 dark:border-slate-700"
          />
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.12)] transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-700"
          >
            {copyFeedback === "copied"
              ? "Lien copié ✔"
              : copyFeedback === "failed"
                ? "Copie impossible"
                : "Copier le lien"}
          </button>
        </div>
      </div>
    </div>
  );
}
