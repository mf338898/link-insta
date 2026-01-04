'use client';

import Link from "next/link";
import { Suspense, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import GradualBlur from "@/components/GradualBlur";
import SectionReveal from "@/components/SectionReveal";
import SubtleGridBackground from "@/components/SubtleGridBackground";
import { Button } from "@/components/ui/button";
import BlurText from "@/components/BlurText";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

type VideoItem = {
  id: string;
  episodeNumber: number;
  moduleId: string;
  title: string;
  description?: string;
  youtubeUrl?: string;
  status: 'comingSoon' | 'published';
};

const modules = [
  { id: 'module-1', title: 'Module 1 : Fondations', videoCount: 2 },
  { id: 'module-2', title: 'Module 2 : Le Carré', videoCount: 4 },
  { id: 'module-3', title: 'Module 3 : Les Couches & Négociation', videoCount: 3 },
  { id: 'module-4', title: 'Module 4 : Plan d\'action', videoCount: 1 },
];

const placeholderVideos: VideoItem[] = [
  {
    id: 'episode-1',
    episodeNumber: 1,
    moduleId: 'module-1',
    title: 'Pourquoi 90% des investisseurs se plantent sur la rentabilité',
    description: 'Déconstruction du mythe "rentabilité = une formule unique" et introduction de la méthode du carré.',
    status: 'comingSoon',
  },
  {
    id: 'episode-2',
    episodeNumber: 2,
    moduleId: 'module-1',
    title: 'Les 3 zones de l\'analyse : ta feuille de route',
    description: 'Présentation de la structure visuelle des 3 zones et explication de leur utilisation en visite.',
    status: 'comingSoon',
  },
  {
    id: 'episode-3',
    episodeNumber: 3,
    moduleId: 'module-2',
    title: 'Le centre du carré : La valeur à la revente (le critère qui change tout)',
    description: 'Explication de pourquoi la valeur de revente est le critère n°1, avant même la rentabilité.',
    status: 'comingSoon',
  },
  {
    id: 'episode-4',
    episodeNumber: 4,
    moduleId: 'module-2',
    title: 'Rentabilité & Taux de remplissage : le piège des studios',
    description: 'Compréhension de la différence entre rentabilité affichée et rentabilité réelle (vacance, turnover, temps de travail).',
    status: 'comingSoon',
  },
  {
    id: 'episode-5',
    episodeNumber: 5,
    moduleId: 'module-2',
    title: 'Qualité & Emplacement : les tueurs silencieux de deals',
    description: 'Identification des postes critiques de qualité (toiture, façade, options) et adaptation au marché local.',
    status: 'comingSoon',
  },
  {
    id: 'episode-6',
    episodeNumber: 6,
    moduleId: 'module-2',
    title: 'Personnaliser le carré selon ton marché (Paris vs villes secondaires)',
    description: 'Démonstration de la modularité du carré : possibilité de supprimer un côté et de le remplacer par une couche plus pertinente.',
    status: 'comingSoon',
  },
  {
    id: 'episode-7',
    episodeNumber: 7,
    moduleId: 'module-3',
    title: 'Les 6 couches additionnelles qui font exploser la valeur',
    description: 'Présentation des 6 couches additionnelles (critères non obligatoires mais déterminants).',
    status: 'comingSoon',
  },
  {
    id: 'episode-8',
    episodeNumber: 8,
    moduleId: 'module-3',
    title: 'L\'art de la négo : proposer 100K pour un bien à 300K',
    description: 'Transmission des scripts de négociation et de la psychologie de prix.',
    status: 'comingSoon',
  },
  {
    id: 'episode-9',
    episodeNumber: 9,
    moduleId: 'module-3',
    title: 'Cas pratique complet : J\'analyse un bien en direct',
    description: 'Application de la méthode complète sur un bien réel (ou simulé).',
    status: 'comingSoon',
  },
  {
    id: 'episode-10',
    episodeNumber: 10,
    moduleId: 'module-4',
    title: 'Ta checklist ultime + les erreurs à éviter absolument',
    description: 'Récapitulation de la méthode, présentation de la checklist terrain et liste des erreurs fatales.',
    status: 'comingSoon',
  },
];

function collectUtms(searchParams: ReturnType<typeof useSearchParams>) {
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

function FormationContent() {
  const searchParams = useSearchParams();
  const utmValues = useMemo(() => collectUtms(searchParams), [searchParams]);
  const device = useDeviceType();

  const sendEvent = useCallback(
    (eventName: string, extra: Record<string, string> = {}) => {
      if (typeof window === "undefined") return;
      const gtag = (window as any).gtag;
      if (!gtag) return;
      gtag("event", eventName, {
        page_source: "formation_page",
        device,
        ...utmValues,
        ...extra,
      });
    },
    [device, utmValues]
  );

  useEffect(() => {
    sendEvent("formation_page_view");
  }, [sendEvent]);

  const handlePlaceholderClick = (videoId: string) => {
    sendEvent("formation_placeholder_click", {
      video_id: videoId,
    });
  };

  return (
    <main className="w-full max-w-5xl space-y-10 pb-10 sm:space-y-12 sm:pb-16 lg:max-w-6xl">
          <SectionReveal
            as="section"
            className="relative flex flex-col gap-4 rounded-3xl border border-[rgba(148,197,255,0.26)] bg-white/92 px-6 py-8 text-center shadow-[0_18px_44px_rgba(15,23,42,0.12)] sm:px-8 sm:py-10"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.7)]">
              <span className="rounded-full border border-[rgba(148,197,255,0.35)] bg-white/80 px-3 py-1">Formation</span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Bientôt disponible
              </span>
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-[color:var(--alv-navy)] sm:text-4xl">
              Formation — Le Carré de la Rentabilité Immobilière
            </h1>
            <p className="mx-auto max-w-3xl text-base text-slate-600 sm:text-lg">
              La formation est en cours de production. Les vidéos seront intégrées ici (visionnage sur le site) et disponibles sur YouTube.
            </p>
            <div
              className="relative mx-auto mt-6 h-48 w-full max-w-md overflow-hidden rounded-2xl border border-[rgba(148,197,255,0.28)] bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.82)), url('/images/formation/photo-formation.jpg')",
                backgroundSize: "106%",
                backgroundPosition: "center 28%",
              }}
            >
              <div className="absolute inset-0 backdrop-blur-[2px]" aria-hidden="true" />
              <div className="relative flex h-full items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="text-5xl">🚧</div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">En construction</p>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal
            as="section"
            className="relative px-4 py-8 sm:px-8 sm:py-10"
          >
            <div className="relative space-y-8">
              <header className="space-y-3 text-center">
                <BlurText
                  as="h2"
                  text="Programme (à venir)"
                  className="text-2xl font-semibold text-[color:var(--alv-navy)] sm:text-[26px]"
                />
              </header>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className="group relative flex h-full flex-col gap-3 rounded-3xl border border-[rgba(148,197,255,0.22)] bg-white/88 p-5 text-center text-[color:var(--alv-navy)] shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
                  >
                    <h3 className="text-lg font-semibold leading-tight">{module.title}</h3>
                    <p className="text-sm text-slate-500">{module.videoCount} {module.videoCount === 1 ? 'vidéo' : 'vidéos'}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal
            as="section"
            className="relative px-4 py-8 sm:px-8 sm:py-10"
          >
            <div className="relative space-y-8">
              <header className="space-y-3 text-center">
                <BlurText
                  as="h2"
                  text="Vidéos"
                  className="text-2xl font-semibold text-[color:var(--alv-navy)] sm:text-[26px]"
                />
              </header>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {placeholderVideos.map((video) => (
                  <div
                    key={video.id}
                    className="group relative flex h-full flex-col gap-4 rounded-3xl border border-[rgba(148,197,255,0.22)] bg-white/88 p-5 text-[color:var(--alv-navy)] shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
                  >
                    <div
                      className="relative h-40 w-full overflow-hidden rounded-2xl border border-[rgba(148,197,255,0.28)] bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.86)), url('/images/formation/photo-formation.jpg')",
                        backgroundSize: "106%",
                        backgroundPosition: "center 28%",
                      }}
                    >
                      <div className="absolute inset-0 backdrop-blur-[2px]" aria-hidden="true" />
                      <div className="relative flex h-full items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="text-3xl">📹</div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">En production</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-400">Épisode {video.episodeNumber}</span>
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                          {video.status === 'comingSoon' ? 'En production' : 'Publiée'}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold leading-tight">{video.title}</h3>
                      {video.description && (
                        <p className="text-sm text-slate-600 line-clamp-2">{video.description}</p>
                      )}
                    </div>
                    <div className="mt-auto flex flex-col gap-2">
                      <Button
                        disabled={video.status === 'comingSoon' || !video.youtubeUrl}
                        variant="outline"
                        size="sm"
                        className="w-full justify-center"
                        onClick={() => handlePlaceholderClick(video.id)}
                      >
                        Regarder
                      </Button>
                      {video.youtubeUrl ? (
                        <Button
                          as="a"
                          href={video.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="ghost"
                          size="sm"
                          className="w-full justify-center text-xs"
                        >
                          YouTube
                        </Button>
                      ) : (
                        <p className="text-center text-xs text-slate-400">YouTube (bientôt)</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal
            as="footer"
            className="flex flex-col items-center gap-4 px-4 py-6 text-center text-[color:var(--alv-navy)] sm:px-6 sm:py-6"
          >
            <Link
              href="/c/matthis"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--alv-navy)] hover:underline"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7 7V17H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Revenir à l'estimation
            </Link>
          </SectionReveal>
        </main>
  );
}

export default function FormationPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      <SubtleGridBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center gap-6 p-4 sm:p-6">
        <GradualBlur
          position="bottom"
          target="page"
          strength={2.2}
          divCount={5}
          exponential
          opacity={1}
          className="pointer-events-none w-full"
          style={{ height: "6rem" }}
        />
        <Suspense fallback={<main className="w-full max-w-5xl space-y-10 pb-10 sm:space-y-12 sm:pb-16 lg:max-w-6xl" />}>
          <FormationContent />
        </Suspense>
      </div>
    </div>
  );
}

