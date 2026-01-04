'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, type ReadonlyURLSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
export const ESTIMATION_SECTION_ID = "demarrer-estimation";
export const ESTIMATION_LOCALISATION_FIELD_ID = "estimation-localisation";

function collectUtms(searchParams: ReadonlyURLSearchParams) {
  const entries: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const value = searchParams.get(key);
    if (value) entries[key] = value;
  });
  return entries;
}

function useDeviceType() {
  if (typeof window === "undefined") return "unknown";
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

type EstimationStarterProps = {
  pageSource?: string;
};

export default function EstimationStarter({ pageSource = "hub_matthis" }: EstimationStarterProps) {
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const utmValues = useMemo(() => collectUtms(searchParams), [searchParamsKey]);
  const device = useDeviceType();
  const hasStartedRef = useRef(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [moduleReady] = useState(true);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
      handleFocusStart();
    }
  }, []);

  const sendEvent = useCallback(
    (eventName: string, extra: Record<string, string> = {}) => {
      if (typeof window === "undefined") return;
      const gtag = (window as any).gtag;
      if (!gtag) return;
      gtag("event", eventName, {
        page_source: pageSource,
        device,
        ...utmValues,
        ...extra,
      });
    },
    [device, pageSource, utmValues]
  );

  const handleFocusStart = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    sendEvent("estimation_flow_start", { step: "localisation" });
  };

  const handleSubmitPlaceholder = (evt: React.FormEvent) => {
    evt.preventDefault();
    sendEvent("estimation_submit", { status: "placeholder" });
  };

  const handleSectorIneligible = () => {
    sendEvent("sector_ineligible", { step: "localisation", reason: "self_declared" });
  };

  return (
    <section
      id={ESTIMATION_SECTION_ID}
      aria-labelledby="estimation-start-title"
      className="relative rounded-2xl border border-[rgba(148,197,255,0.26)] bg-white/94 p-5 shadow-[0_14px_32px_rgba(15,23,42,0.1)] sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(76,29,149,0.65)]">
            Accès estimation
          </p>
          <div className="space-y-1">
            <p id="estimation-start-title" className="text-base font-semibold text-[color:var(--alv-navy)] sm:text-lg">
              Estimation offerte avec réponse sous 24 h ouvrées.
            </p>
            <p className="text-sm text-slate-600">
              Couverture : ~40 km autour de Pleyben (certaines communes exclues). Vérification de votre commune à l’étape 1.
            </p>
            <a href="#carte-secteur" className="text-sm font-semibold text-[color:var(--alv-navy)] underline decoration-dashed decoration-1 underline-offset-4">
              Voir la carte du secteur
            </a>
          </div>
        </div>
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(30,58,95,0.7)]">
          Réassurance · Confidentiel · Local
        </div>
      </div>

      <form onSubmit={handleSubmitPlaceholder} className="mt-4 grid gap-4 sm:grid-cols-[1.4fr_auto] sm:items-center">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-[color:var(--alv-navy)]">Votre commune (CP)</span>
          <input
            id={ESTIMATION_LOCALISATION_FIELD_ID}
            ref={inputRef}
            name="localisation"
            type="text"
            onFocus={handleFocusStart}
            className="h-12 rounded-xl border border-[rgba(148,197,255,0.38)] bg-white/96 px-3 text-[color:var(--alv-navy)] shadow-[0_10px_24px_rgba(15,23,42,0.08)] focus:border-[rgba(148,197,255,0.6)] focus:outline-none focus:ring-2 focus:ring-[rgba(148,197,255,0.35)]"
            placeholder="Ex. 29190 Pleyben"
            autoComplete="postal-code"
          />
          <p className="text-xs text-slate-500">Étape 1 : vérification de votre commune pour confirmer l’éligibilité.</p>
        </label>

        <div className="flex flex-col gap-2">
          <Button type="submit" className="h-12 justify-center text-base">
            Démarrer
          </Button>
          <button
            type="button"
            onClick={handleSectorIneligible}
            className={cn(
              "text-xs font-semibold text-[color:var(--alv-navy)] underline decoration-dashed decoration-1 underline-offset-4 transition-colors hover:text-[color:var(--alv-navy)]/80"
            )}
          >
            Je pense être hors secteur
          </button>
          {!moduleReady && (
            <p className="text-xs text-amber-600">
              Module d’estimation indisponible, merci de réessayer ou{" "}
              <a href="mailto:contact@alvimmobilier.bzh" className="font-semibold underline">
                me contacter
              </a>
              .
            </p>
          )}
        </div>
      </form>

      <div id="carte-secteur" className="mt-4 rounded-xl border border-dashed border-[rgba(148,197,255,0.3)] bg-white/80 p-3 text-sm text-slate-600">
        Carte du secteur à venir (rayon ~40 km autour de Pleyben, exclusions gérées à l’étape 1).
      </div>
    </section>
  );
}

