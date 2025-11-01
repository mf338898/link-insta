import Link from "next/link";
import { notFound } from "next/navigation";
import GradualBlur from "@/components/GradualBlur";
import Magnet from "@/components/Magnet";
import ShinyText from "@/components/ShinyText";
import SubmitProjectForm from "@/components/SubmitProjectForm";
import { getContactBySlug } from "@/data/contacts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const heroHighlights = [
  {
    label: "⏱️ Durée",
    value: "≈ 2 minutes",
    detail: "Tu prends le temps de poser un dossier clair.",
  },
  {
    label: "🎯 Réponse",
    value: "Uniquement projets sérieux & locaux",
    detail: "Je filtre les curieux pour garder un temps chirurgical.",
  },
  {
    label: "📍 Zones",
    value: "Pleyben — Quimper — Brest (+ proches)",
    detail: "Ancrage terrain, expertise Finistère.",
  },
];

const valuePoints = [
  {
    title: "Filtrer les curieux",
    content: "Sans infos concrètes, je ne prends pas le dossier. Tu montres ta motivation.",
  },
  {
    title: "Dossier complet",
    content: "Tu arrives avec un brief précis : projet, timing, chiffres. Je gagne du temps, toi aussi.",
  },
  {
    title: "Position premium",
    content: "Ton projet est traité avec méthode. Pas de pitch commercial, juste de l'expertise locale.",
  },
];

export async function generateMetadata(props: PageProps) {
  const { slug } = await props.params;
  const contact = getContactBySlug(slug);
  if (!contact) {
    return {
      title: "Projet immobilier - Sélection",
    };
  }
  return {
    title: `Déposer ton projet immobilier — Sélection | ${contact.name}`,
    description:
      "Questionnaire premium pour filtrer les curieux, qualifier ton projet local et préparer une collaboration sérieuse.",
  };
}

export default async function SubmitProjectPage(props: PageProps) {
  const { slug } = await props.params;
  const contact = getContactBySlug(slug);
  if (!contact) return notFound();

  const { name, email, status } = contact;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,197,255,0.18),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),_transparent_65%)]" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col items-center gap-8 p-4 sm:p-8">
        <GradualBlur
          position="bottom"
          target="page"
          strength={2.4}
          divCount={6}
          exponential
          opacity={1}
          className="pointer-events-none w-full"
          style={{ height: "7rem" }}
        />

        <main className="w-full max-w-5xl space-y-10 pb-12 sm:space-y-14 sm:pb-20">
          <nav className="flex items-center justify-between">
            <Magnet>
              <Link
                href={`/c/${slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(148,197,255,0.35)] bg-white/90 px-4 py-2 text-sm font-semibold text-[color:var(--alv-navy)] shadow-[0_12px_28px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:border-[rgba(148,197,255,0.55)] hover:bg-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Retour carte de contact
              </Link>
            </Magnet>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(76,29,149,0.7)] sm:block">
              {status ?? "Sélection privée"}
            </span>
          </nav>

          <section className="relative overflow-hidden rounded-[36px] border border-[rgba(148,197,255,0.28)] bg-white/95 px-6 py-8 shadow-[0_24px_52px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:px-12 sm:py-12">
            <div className="pointer-events-none absolute -left-28 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-amber-200/45 via-rose-200/35 to-transparent blur-[110px]" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-gradient-to-tl from-sky-200/45 via-emerald-200/30 to-transparent blur-[120px]" />

            <div className="relative space-y-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.7)]">
                    <span className="rounded-full border border-[rgba(148,197,255,0.35)] bg-white/80 px-3 py-1">Sélection</span>
                    <span className="rounded-full border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)] text-emerald-600 px-3 py-1">Engagement</span>
                    {status && (
                      <span className="rounded-full border border-[rgba(252,211,77,0.35)] bg-[rgba(252,211,77,0.18)] text-amber-600 px-3 py-1">
                        {status}
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-semibold leading-tight text-[color:var(--alv-navy)] sm:text-[40px]">
                    Déposer ton projet immobilier — Sélection
                  </h1>
                  <p className="text-lg font-medium text-slate-600 sm:text-xl">
                    Pour propriétaires & investisseurs sérieux dans le Finistère.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    Ce questionnaire me permet de comprendre ton projet et de vérifier que je peux réellement t'aider. Mon rôle : trier, challenger et accompagner peu de dossiers mais des dossiers solides. Tu es entre de bonnes mains, mais la sélection est réelle.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <ShinyText
                    text="Version premium · Sérénité & méthode"
                    speed={6}
                    className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[rgba(30,58,95,0.72)]"
                  />
                  <div className="rounded-3xl border border-[rgba(148,197,255,0.32)] bg-white/90 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(30,58,95,0.7)] shadow-[0_16px_36px_rgba(15,23,42,0.12)]">
                    {name}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {heroHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-[rgba(148,197,255,0.28)] bg-white/90 px-5 py-6 shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(30,58,95,0.65)]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-base font-semibold text-[color:var(--alv-navy)]">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <SubmitProjectForm contactName={name} contactEmail={email} />

          <section className="relative rounded-[36px] border border-[rgba(148,197,255,0.24)] bg-gradient-to-br from-white via-sky-50/85 to-emerald-50/80 px-6 py-8 shadow-[0_24px_52px_rgba(15,23,42,0.14)] sm:px-12 sm:py-12">
            <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-200/45 via-sky-200/30 to-transparent blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-gradient-to-tr from-amber-200/40 via-rose-200/32 to-transparent blur-[100px]" />

            <div className="relative space-y-6">
              <header>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.65)]">
                  Pourquoi ce format ?
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[color:var(--alv-navy)] sm:text-[30px]">
                  On met ton temps et le mien au bon endroit
                </h2>
                <p className="mt-2 text-sm text-slate-600 sm:text-base">
                  Ce formulaire te permet de filtrer 80% des curieux, me transmettre un dossier complet dès l'entrée, démarrer sur une posture d'expertise, collecter les infos essentielles (valeur, motivation, budget) et nourrir ta base CRM.
                </p>
              </header>

              <div className="grid gap-5 sm:grid-cols-3">
                {valuePoints.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-3xl border border-[rgba(148,197,255,0.28)] bg-white/94 p-5 text-[color:var(--alv-navy)] shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
                  >
                    <p className="text-sm font-semibold">{point.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{point.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

