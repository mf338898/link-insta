"use client";

import { useEffect, useState } from "react";

interface WindowWithOpera extends Window {
  opera?: string;
}

interface WindowWithInstagram extends Window {
  Instagram?: unknown;
  webkit?: {
    messageHandlers?: {
      instagram?: unknown;
    };
  };
}

const isClientEnvironment = () => typeof window !== "undefined" && typeof navigator !== "undefined";

export default function InstagramRedirectBanner() {
  const [isInstagram, setIsInstagram] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Détecter si on est dans Instagram WebView
    const checkInstagram = (): void => {
      if (!isClientEnvironment()) return;

      const operaUserAgent = (window as WindowWithOpera)?.opera ?? "";
      const userAgent = navigator.userAgent || navigator.vendor || operaUserAgent || "";

      // User agents Instagram connus
      const instagramPatterns: readonly RegExp[] = [
        /Instagram/i,
        /FBAN/i, // Facebook App (inclut Instagram)
        /FBAV/i, // Facebook App Version
        /FBSV/i, // Facebook App String Version
      ];

      // Vérifier si on est dans Instagram
      const isInstaWebView = instagramPatterns.some((pattern: RegExp) => pattern.test(userAgent));

      // Vérifier les propriétés spécifiques à Instagram WebView
      const instagramWindow = window as WindowWithInstagram;
      const documentReferrer = typeof document !== "undefined" ? document.referrer : "";
      const isInstaContext =
        Boolean(instagramWindow?.Instagram) ||
        // Instagram WebView a souvent des propriétés spécifiques
        Boolean(instagramWindow?.webkit?.messageHandlers?.instagram) ||
        // Détection par referrer (peut être trompeur)
        documentReferrer.includes("instagram.com");

      // Vérifier les dimensions spécifiques (Instagram WebView a souvent des dimensions spécifiques)
      const windowWidth = window.innerWidth || 0;
      const windowHeight = window.innerHeight || 0;
      const isLikelyMobileWebView =
        (windowWidth <= 430 || windowWidth <= 390) &&
        (windowHeight <= 932 || windowHeight <= 844);

      if (isInstaWebView || (isInstaContext && isLikelyMobileWebView)) {
        setIsInstagram(true);
        // Afficher le banner après un court délai pour une meilleure UX
        window.setTimeout(() => setIsVisible(true), 500);
      }
    };

    checkInstagram();
  }, []);

  const handleOpenInBrowser = (): void => {
    if (!isClientEnvironment() || typeof document === "undefined") return;

    const currentUrl = window.location.href;

    // Sur iOS, utiliser plusieurs techniques pour forcer l'ouverture externe
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent || "");
    const isAndroid = /Android/.test(navigator.userAgent || "");

    if (isIOS) {
      // Technique 1: Créer un lien temporaire avec target="_blank" et le déclencher
      const link: HTMLAnchorElement = document.createElement("a");
      link.href = currentUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.style.display = "none";
      document.body.appendChild(link);

      // Déclencher le clic
      const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      link.dispatchEvent(clickEvent);

      // Nettoyer après un court délai
      window.setTimeout(() => {
        if (link.parentNode !== null) {
          document.body.removeChild(link);
        }
      }, 100);

      // Technique 2: Essayer aussi avec window.open (parfois plus fiable)
      window.setTimeout(() => {
        try {
          const newWindow = window.open(currentUrl, "_blank");
          if (!newWindow || newWindow.closed) {
            // Si ça n'a pas fonctionné, utiliser location.href comme fallback
            window.location.href = currentUrl;
          }
        } catch {
          // Fallback: redirection directe
          window.location.href = currentUrl;
        }
      }, 200);
    } else if (isAndroid) {
      // Sur Android, utiliser window.open avec paramètres spécifiques
      try {
        const newWindow = window.open(currentUrl, "_blank", "noopener,noreferrer");
        if (!newWindow || newWindow.closed) {
          // Fallback: redirection directe
          window.location.href = currentUrl;
        }
      } catch {
        window.location.href = currentUrl;
      }
    } else {
      // Autres plateformes
      window.open(currentUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!isInstagram || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50 animate-in slide-in-from-top duration-300">
      <div className="mx-auto max-w-md p-4">
        <div className="rounded-2xl border-2 border-[rgba(236,72,153,0.4)] bg-gradient-to-br from-white via-rose-50/90 to-pink-50/90 p-4 shadow-[0_20px_50px_rgba(236,72,153,0.3)] backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-rose-600"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
              </svg>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-semibold text-[color:var(--alv-navy)]">
                Ouvrir dans votre navigateur
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pour une meilleure expérience, ouvrez ce lien dans votre navigateur par défaut plutôt que dans Instagram.
              </p>
              <button
                onClick={handleOpenInBrowser}
                className="w-full rounded-full border border-rose-500 bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(236,72,153,0.35)] transition-all duration-200 hover:bg-rose-600 hover:shadow-[0_12px_28px_rgba(236,72,153,0.45)] active:scale-[0.98]"
              >
                Ouvrir dans le navigateur
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="w-full rounded-full border border-slate-300 bg-white/90 px-4 py-2 text-xs font-medium text-slate-600 transition-colors duration-200 hover:bg-white hover:text-slate-700"
              >
                Continuer ici
              </button>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Fermer"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
