import Link from "next/link";
import { notFound } from "next/navigation";
import GradualBlur from "@/components/GradualBlur";
import PrivateAccessForm from "@/components/PrivateAccessForm";
import { getContactBySlug } from "@/data/contacts";

type AvailableGuide = {
  id: string;
  category: string;
  title: string;
  status: string;
  description: string;
  price: string;
  ctaLabel: string;
  ctaHref?: string;
  disabled?: boolean;
};

type LockedResource = {
  id: string;
  title: string;
  preview: string;
  status: string;
  buttonLabel: string;
};

const availableGuides: AvailableGuide[] = [
  {
    id: "sell-guide",
    category: "Guide",
    title: "Vendre sereinement dans le Finistère",
    status: "Pré-lancement",
    description: "Préparer, estimer, éviter les erreurs, gérer les visites, sélectionner l'agent ou vendre seul.",
    price: "19€",
    ctaLabel: "Accès bloqué 🤫",
    disabled: true,
  },
  {
    id: "perfect-checklist",
    category: "Checklist",
    title: "Dossier Vente Parfait",
    status: "Pré-lancement",
    description: "Tous les documents, étapes et contrôles avant mise en vente.",
    price: "15€",
    ctaLabel: "Accès bloqué 🤫",
    disabled: true,
  },
];

const lockedResources: LockedResource[] = [
  {
    id: "investor-dossier",
    title: "Dossier Investisseur Finistère - chiffres & loyers",
    preview: "Statistiques locales, secteurs, vacance, stratégies.",
    status: "🔒 Accès bientôt - réservé aux abonnés",
    buttonLabel: "Accès refusé - bientôt disponible",
  },
  {
    id: "negociation-guide",
    title: "Guide Négociation Immobilière Locale",
    preview: "Scripts, objections, psychologie du vendeur.",
    status: "🔒 Disponible prochainement",
    buttonLabel: "Accès refusé",
  },
  {
    id: "profitable-training",
    title: "Formation - Trouver un bien rentable dans le Finistère",
    preview: "Recherche, analyse, calculs, offres.",
    status: "🔒 Sortie prévue prochainement",
    buttonLabel: "Réservé - sortie prochaine",
  },
  {
    id: "tax-pack",
    title: "Pack Fiscalité Immobilier Débutant",
    preview: "LMNP / SCI / plus-value / arbitrage simple.",
    status: "🔒 En cours de création",
    buttonLabel: "Verrouillé 🔒",
  },
];

const lockedMessage =
  "Ce contenu n'est pas encore disponible. Priorité aux abonnés + -10% au lancement. 👉 Rejoins la liste privée";

export default async function PremiumGuidesPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const contact = getContactBySlug(slug);
  if (!contact) return notFound();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,197,255,0.18),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),_transparent_65%)]"
        aria-hidden="true"
      />

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

        <main className="w-full max-w-4xl space-y-10 pb-12 sm:space-y-12 sm:pb-16">
          <header className="flex flex-col gap-4 rounded-[32px] border border-[rgba(148,197,255,0.25)] bg-white/95 px-6 py-8 shadow-[0_22px_52px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:px-10 sm:py-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.65)]">🎓 Ressources Premium</p>
                <h1 className="text-2xl font-semibold text-[color:var(--alv-navy)] sm:text-[28px]">
                  Guides & mini-formations - Finistère
                </h1>
                <p className="text-xs text-slate-400 sm:text-sm">Sélection préparée par {contact.name}</p>
              </div>
              <Link
                href={`/c/${slug}`}
                className="inline-flex items-center gap-2 self-start rounded-full border border-[rgba(148,197,255,0.3)] bg-white/90 px-4 py-2 text-sm font-semibold text-[color:var(--alv-navy)] shadow-[0_12px_26px_rgba(15,23,42,0.12)] transition-colors duration-200 hover:border-[rgba(148,197,255,0.45)] hover:bg-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Revenir à ma carte
              </Link>
            </div>
            <p className="max-w-2xl text-sm text-slate-500">
              Ressources sérieuses pour vendeurs & investisseurs. Accès progressif — certains contenus en pré-ouverture👇
            </p>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.7)]">
              <span className="rounded-full border border-[rgba(148,197,255,0.35)] bg-white/80 px-3 py-1">Qualité Pro</span>
              <span className="rounded-full border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)] text-emerald-600 px-3 py-1">
                Accès progressif
              </span>
              <span className="rounded-full border border-[rgba(252,211,77,0.35)] bg-[rgba(252,211,77,0.18)] text-amber-600 px-3 py-1">
                Version Bêta
              </span>
            </div>
          </header>

          <section className="space-y-5">
            <header>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.65)]">Guides disponibles</p>
              <h2 className="text-xl font-semibold text-[color:var(--alv-navy)] sm:text-[24px]">Disponible prochainement — accès prioritaire sur liste</h2>
            </header>
            <div className="grid gap-4">
              {availableGuides.map((guide) => (
                <article
                  key={guide.id}
                  className="relative flex flex-col gap-4 rounded-3xl border border-[rgba(148,197,255,0.3)] bg-white/95 px-5 py-6 text-[color:var(--alv-navy)] shadow-[0_18px_42px_rgba(15,23,42,0.12)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(15,23,42,0.16)] sm:px-7 sm:py-8"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-[rgba(16,185,129,0.12)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-600">
                          {guide.category}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-[rgba(37,99,235,0.08)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-600">
                          {guide.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold sm:text-xl">{guide.title}</h3>
                      <p className="text-sm text-slate-500">{guide.description}</p>
                    </div>
                    <div
                      className={`flex items-center gap-2 self-start rounded-2xl border border-[rgba(252,211,77,0.4)] bg-[rgba(252,211,77,0.18)] px-3 py-1.5 text-sm font-semibold text-amber-600 ${
                        guide.disabled ? "absolute right-6 top-6 -translate-y-10 opacity-0 pointer-events-none" : ""
                      }`}
                      aria-hidden={guide.disabled}
                    >
                      <span>💸</span>
                      <span>{guide.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-400 sm:text-sm">
                      {guide.disabled ? "Accès verrouillé pour le moment. Rejoins la liste privée pour recevoir l'ouverture et l'offre de lancement." : "Accès sécurisé + ressources téléchargeables immédiatement."}
                    </p>
                    {guide.disabled ? (
                      <button
                        type="button"
                        disabled
                        className="inline-flex items-center justify-center rounded-2xl border border-[rgba(148,163,184,0.4)] bg-[rgba(148,163,184,0.18)] px-5 py-3 text-sm font-semibold text-[rgba(30,58,95,0.7)] shadow-[0_12px_28px_rgba(15,23,42,0.12)]"
                      >
                        {guide.ctaLabel}
                      </button>
                    ) : (
                      <Link
                        href={guide.ctaHref ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[color:var(--alv-navy)] via-[color:var(--alv-sky)] to-[color:var(--alv-emerald)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(15,23,42,0.24)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/60"
                      >
                        {guide.ctaLabel}
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <header>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.65)]">Ressources en préparation</p>
              <h2 className="text-xl font-semibold text-[color:var(--alv-navy)] sm:text-[24px]">Verrouillées - accès privé</h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Ces ressources sont en préparation - ouverture réservée aux inscrits. Clique pour voir le contenu preview.
              </p>
            </header>
            <div className="grid gap-4">
              {lockedResources.map((resource) => (
                <details
                  key={resource.id}
                  className="group rounded-3xl border border-dashed border-[rgba(148,197,255,0.4)] bg-white/82 px-5 py-5 text-[color:var(--alv-navy)] shadow-[0_16px_38px_rgba(15,23,42,0.12)] transition-colors duration-200 open:border-[rgba(37,99,235,0.3)] sm:px-7 sm:py-6"
                >
                  <summary className="flex cursor-pointer list-none flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-semibold sm:text-lg">⛔️ {resource.title}</span>
                        <span className="inline-flex items-center rounded-full bg-[rgba(148,163,184,0.18)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[rgba(71,85,105,0.9)]">
                          {resource.status}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 sm:text-sm">Cliquer pour afficher l'aperçu verrouillé.</span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(148,163,184,0.3)] bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(71,85,105,0.9)] transition-transform duration-200 group-open:-translate-y-0.5">
                      Preview
                      <svg className="h-3 w-3 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-4 space-y-3 rounded-2xl border border-dashed border-[rgba(148,163,184,0.4)] bg-white/85 p-4">
                    <p className="text-sm text-slate-600">{resource.preview}</p>
                    <button
                      type="button"
                      disabled
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[rgba(148,163,184,0.4)] bg-[rgba(148,163,184,0.18)] px-4 py-3 text-sm font-semibold text-[rgba(30,58,95,0.7)] shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
                    >
                      {resource.buttonLabel}
                    </button>
                    <p className="text-xs text-slate-500">
                      {lockedMessage}{" "}
                      <Link href="#liste-privee" className="font-semibold text-[color:var(--alv-navy)] underline decoration-dotted underline-offset-4">
                        Je rejoins
                      </Link>
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <PrivateAccessForm />
        </main>
      </div>
    </div>
  );
}
