'use client';

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, type ReadonlyURLSearchParams } from "next/navigation";

import ReflectiveCard from "@/components/ReflectiveCard";
import { ESTIMATION_LOCALISATION_FIELD_ID, ESTIMATION_SECTION_ID } from "@/components/EstimationStarter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

type HeroSplitProps = {
  estimationBaseUrl?: string | null;
  secondaryHref: string;
  pageSource?: string;
  estimationLabel?: string;
  secondaryLabel?: string;
  agencyUrl?: string;
  proCard?: {
    name: string;
    title: string;
    status: string;
    handle?: string | null;
    handleHref?: string;
    imageSrc: string;
    idLabel: string;
    idValue: string;
  };
};

function collectUtms(searchParams: ReadonlyURLSearchParams) {
  const entries: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const value = searchParams.get(key);
    if (value) entries[key] = value;
  });
  return entries;
}

function mergeQueryParams(baseHref: string, utms: Record<string, string>) {
  const [pathWithQuery, hash] = baseHref.split("#");
  const [path, query] = pathWithQuery.split("?");
  const params = new URLSearchParams(query ?? "");
  Object.entries(utms).forEach(([key, value]) => params.set(key, value));
  const queryString = params.toString();
  const rebuilt = queryString ? `${path}?${queryString}` : path;
  return hash ? `${rebuilt}#${hash}` : rebuilt;
}

function buildEstimationHref(searchParams: ReadonlyURLSearchParams, baseHref?: string | null) {
  const utms = collectUtms(searchParams);
  const hasBase = typeof baseHref === "string" && baseHref.trim().length > 0;
  const trimmedBase = hasBase ? baseHref!.trim() : "";

  const fallback = `/estimation#${ESTIMATION_SECTION_ID}`;
  if (!hasBase) return fallback;
  if (trimmedBase.startsWith("#")) return trimmedBase;
  return mergeQueryParams(trimmedBase, utms);
}

function useDeviceType() {
  if (typeof window === "undefined") return "unknown";
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

export default function HeroSplit({
  estimationBaseUrl,
  secondaryHref,
  pageSource = "hub_matthis",
  estimationLabel = "Estimer mon bien",
  secondaryLabel = "Voir les biens",
  agencyUrl,
  proCard,
}: HeroSplitProps) {
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();

  const utmValues = useMemo(() => collectUtms(searchParams), [searchParamsKey]);
  const estimationHref = useMemo(
    () => buildEstimationHref(searchParams, estimationBaseUrl),
    [searchParamsKey, estimationBaseUrl]
  );

  const device = useDeviceType();
  const [isMapOpen, setIsMapOpen] = useState(false);

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

  useEffect(() => {
    sendEvent("hero_view");
  }, [sendEvent]);

  useEffect(() => {
    if (!isMapOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMapOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMapOpen]);

  const handleEstimationClick = () => {
    sendEvent("cta_estimation_click", {
      cta_label: estimationLabel,
      destination: estimationHref,
    });

    if (typeof document !== "undefined" && estimationHref.startsWith("#")) {
      const section = document.getElementById(ESTIMATION_SECTION_ID);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => {
          const field = document.getElementById(ESTIMATION_LOCALISATION_FIELD_ID) as HTMLInputElement | null;
          field?.focus();
        }, 260);
      }
    }
  };

  const handleSecondaryClick = () => {
    sendEvent("cta_contact_click", {
      cta_label: secondaryLabel,
      destination: secondaryHref,
    });
  };

  return (
    <section className="relative">
      <div className="grid min-h-[72vh] gap-8 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[1.05fr_1fr] lg:px-12">
        <div className="flex flex-col justify-center gap-6">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[rgba(30,58,95,0.7)]">
            <span className="rounded-full border border-[rgba(148,197,255,0.35)] bg-white/80 px-3 py-1">Bretagne</span>
            <span className="rounded-full border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.12)] text-emerald-700 px-3 py-1">
              Estimation rapide
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold leading-tight text-[color:var(--alv-navy)] sm:text-4xl">
              Estimation immobilière en Finistère – autour de Pleyben
            </h1>
            <p className="text-lg font-medium text-slate-700 sm:text-xl">
              Recevez un avis de valeur fiable et des conseils de vente. Réponse sous 24 h ouvrées.
            </p>
          </div>

          <ul className="grid gap-3 text-sm text-[color:var(--alv-navy)] sm:grid-cols-2 sm:text-base">
            <li className="flex items-center gap-2 rounded-2xl border border-[rgba(148,197,255,0.32)] bg-white/90 px-3 py-2 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
              <span className="text-lg">✅</span>
              Offerte, sans engagement
            </li>
            <li className="flex items-center gap-2 rounded-2xl border border-[rgba(148,197,255,0.32)] bg-white/90 px-3 py-2 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
              <span className="text-lg">📊</span>
              Basée sur le marché local + comparables
            </li>
            <li className="flex items-center gap-2 rounded-2xl border border-[rgba(148,197,255,0.32)] bg-white/90 px-3 py-2 shadow-[0_10px_22px_rgba(15,23,42,0.06)] sm:col-span-2">
              <span className="text-lg">🔒</span>
              Données confidentielles (non revendues)
            </li>
          </ul>

          <div className="flex flex-col gap-4 text-sm text-slate-700">
            <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.26em] text-[rgba(30,58,95,0.7)]">
              <span className="rounded-full border border-[rgba(148,197,255,0.32)] bg-white/85 px-3 py-1">Conseiller immobilier — ALV Immobilier</span>
              <span className="rounded-full border border-[rgba(148,197,255,0.32)] bg-white/85 px-3 py-1">
                Zone couverte : ~40 km autour de Pleyben (certaines communes exclues)
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Vérification de votre commune à l’étape 1 (2 min).{" "}
              <button
                type="button"
                onClick={() => setIsMapOpen(true)}
                className="font-semibold text-[color:var(--alv-navy)] underline decoration-dashed decoration-1 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgba(148,197,255,0.35)]"
              >
                Voir la carte du secteur
              </button>
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              as="a"
              href={estimationHref}
              onClick={handleEstimationClick}
              size="lg"
              className={cn(
                "min-w-[210px] justify-center gap-2 px-6 text-base shadow-[0_16px_34px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 active:translate-y-0"
              )}
            >
              {estimationLabel}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 7H17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Button>
            <Button
              as="a"
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
              onClick={handleSecondaryClick}
              className="justify-center gap-2 px-3 text-sm font-semibold text-[color:var(--alv-navy)] hover:bg-white"
            >
              {secondaryLabel}
              <svg className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[color:var(--alv-navy)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 7H17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="flex w-full max-w-[480px] flex-col gap-4">
            {proCard && (
              <div className="space-y-3">
                <ReflectiveCard
                  name={proCard.name}
                  title={proCard.title}
                  status={proCard.status}
                  handle={proCard.handle ?? undefined}
                  handleHref={proCard.handleHref}
                  imageSrc={proCard.imageSrc}
                  idLabel={proCard.idLabel}
                  idValue={proCard.idValue}
                  className="w-full"
                />
                <div className="flex items-center gap-3">
                  <div className="w-[120px] sm:w-[140px]">
                    <Image
                      src="/images/logo/alv-immobilier.svg"
                      alt="ALV Immobilier"
                      width={140}
                      height={56}
                      className="h-auto w-full"
                      sizes="(max-width: 640px) 120px, 140px"
                    />
                  </div>
                  <p className="text-sm text-slate-500">À vos côtés depuis plus de 20 ans</p>
                </div>
              </div>
            )}

            <div className="relative overflow-hidden rounded-3xl border border-[rgba(148,197,255,0.34)] bg-gradient-to-b from-white/95 via-[rgba(239,246,255,0.95)] to-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.14)]">
              <div className="absolute right-4 top-4 rounded-full border border-emerald-200 bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
                Confidentiel
              </div>

              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(30,58,95,0.7)]">
                  Démarrer une estimation
                </p>
                <h3 className="text-2xl font-semibold text-[color:var(--alv-navy)] sm:text-[26px]">Démarrer en 2 minutes</h3>
                <p className="text-sm text-slate-600">Réponse sous 24 h ouvrées</p>

                <div className="grid gap-3 rounded-2xl border border-[rgba(148,197,255,0.28)] bg-white/90 p-4 text-[color:var(--alv-navy)] shadow-inner">
                  {[
                    { step: "1", label: "Bien", description: "Type, surface, localisation" },
                    { step: "2", label: "Projet", description: "Délais, intentions, contraintes" },
                    { step: "3", label: "Coordonnées", description: "Pour vous répondre rapidement" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(148,197,255,0.16)] text-sm font-semibold text-[color:var(--alv-navy)]">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="text-xs text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  as="a"
                  href={estimationHref}
                  onClick={handleEstimationClick}
                  size="lg"
                  className="w-full justify-center gap-2 text-base"
                >
                  Estimer mon bien
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMapOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          onClick={() => setIsMapOpen(false)}
        >
          <div
            className="relative h-[80vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsMapOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[color:var(--alv-navy)] shadow-md transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgba(148,197,255,0.35)]"
              aria-label="Fermer l’aperçu de la carte du secteur"
            >
              ✕
            </button>
            <Image
              src="/images/hero/zonee.jpg"
              alt="Zone de couverture estimation ALV Immobilier"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}

