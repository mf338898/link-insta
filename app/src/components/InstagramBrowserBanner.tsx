"use client";

import { useEffect, useState } from "react";
import ShareButton from "@/components/ShareButton";

type DevicePlatform = "ios" | "android" | "other";

const STORAGE_KEY = "instagram-browser-banner-dismissed";

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

function SafariIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <defs>
        <linearGradient id="safariGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#safariGradient)" />
      <circle cx="24" cy="24" r="18" fill="#fff" />
      <polygon
        points="24,10 27,24 24,38 21,24"
        fill="#1E293B"
        opacity="0.85"
        transform="rotate(45 24 24)"
      />
      <polygon
        points="24,12 26,24 24,36 22,24"
        fill="#38BDF8"
        transform="rotate(45 24 24)"
      />
    </svg>
  );
}

function ChromeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#DB4437" />
      <path d="M24 24L9 16.5C11.8 11 17.5 7 24 7c9.4 0 17 7.6 17 17h-17Z" fill="#4285F4" />
      <path d="M24 24 16.5 39C11 36.2 7 30.5 7 24c0-3.2.9-6.3 2.5-9L24 24Z" fill="#0F9D58" />
      <path d="M24 24h17c0 9.4-7.6 17-17 17-3.2 0-6.3-.9-9-2.5L24 24Z" fill="#F4B400" />
      <circle cx="24" cy="24" r="9" fill="#fff" />
      <circle cx="24" cy="24" r="6" fill="#4285F4" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M15 6a3 3 0 1 0-.356 1.428l-5.036 2.52a3 3 0 1 0 0 4.105l5.036 2.52a3 3 0 1 0 .692-1.384l-5.036-2.52a3.01 3.01 0 0 0 0-.338l5.036-2.52A3.001 3.001 0 0 0 15 6Z"
      />
    </svg>
  );
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
      ((window.navigator as Navigator & { standalone?: boolean })?.standalone ?? false) ||
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

  const ctaLabel =
    platform === "ios"
      ? "Ouvrir dans Safari"
      : platform === "android"
        ? "Ouvrir dans Chrome"
        : "Ouvrir via…";

  const IconComponent =
    platform === "ios" ? SafariIcon : platform === "android" ? ChromeIcon : ShareIcon;

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
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[999] flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="pointer-events-auto flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-white/30 bg-white/95 p-3 text-sm text-slate-700 shadow-[0_18px_42px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-slate-700/40 dark:bg-slate-900/95 dark:text-slate-100 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white shadow-md">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" focusable="false">
                <path
                  fill="currentColor"
                  d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm9.25 2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
                />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Instagram détecté
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                Ouvrez ce lien dans votre navigateur habituel pour profiter de toutes les fonctionnalités.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
            aria-label="Fermer la bannière"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-600 dark:text-slate-200">
            <span className="block">
              {platform === "ios"
                ? "1. Touchez ⋯ dans la barre Instagram."
                : platform === "android"
                  ? "1. Touchez ⋮ dans la barre Instagram."
                  : "1. Ouvrez le menu de partage Instagram."}
            </span>
            <span className="block">
              {platform === "ios"
                ? "2. Choisissez « Ouvrir dans Safari »."
                : platform === "android"
                  ? "2. Choisissez « Ouvrir dans Chrome »."
                  : "2. Sélectionnez votre navigateur par défaut."}
            </span>
          </p>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <ShareButton
              label={ctaLabel}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.16)] transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 sm:w-auto"
            >
              <span className="flex items-center gap-2">
                <IconComponent />
                <span>{ctaLabel}</span>
              </span>
            </ShareButton>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white sm:w-auto"
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
    </div>
  );
}
