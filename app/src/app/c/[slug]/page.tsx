import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlurText from "@/components/BlurText";
import GradualBlur from "@/components/GradualBlur";
import SectionReveal from "@/components/SectionReveal";
import ShareButton from "@/components/ShareButton";
import SubtleGridBackground from "@/components/SubtleGridBackground";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getContactBySlug } from "@/data/contacts";

type ProjectCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  linkLabel: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePositionClass?: string;
};

export default async function ContactPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const contact = getContactBySlug(slug);
  if (!contact) return notFound();

  const { name, handle, avatarUrl, url, title, status } = contact;
  const displayHandle = handle ? (handle.startsWith("@") ? handle : `@${handle}`) : null;
  const avatarSrc = avatarUrl ?? "/images/avatars/matthis-profile.png";
  const displayTitle = title ?? "Conseiller immobilier & investisseur local";
  const displayStatus = status ?? "Accompagnement personnalisé et rigoureux.";
  const shareTitle = `${name} - ${displayTitle} (Finistère)`;
  const fallbackAgencyUrl = "https://www.alvimmobilier.com";
  const agencyUrl = url ?? fallbackAgencyUrl;
  let agencyLabel = agencyUrl.replace(/^https?:\/\//, "");
  if (agencyLabel.endsWith("/")) {
    agencyLabel = agencyLabel.slice(0, -1);
  }

  const signaturePoints = [
    {
      title: "🎯 Marché",
      content: "Finistère : Pleyben - Quimper - Brest",
    },
    {
      title: "🧠 Approche",
      content: "Stratégie, pédagogie, transparence sans langue de bois.",
    },
    {
      title: "🏠 Positionnement",
      content: "100% ancien - pas de programmes neufs.",
    },
  ];

  const otherProjects: ProjectCard[] = [
    {
      id: "alv-immobilier",
      title: "1️⃣ ALV Immobilier – Instagram",
      description: "L'agence dans laquelle j'exerce : actualités, biens disponibles et conseils immobiliers.",
      href: "https://www.instagram.com/alvimmobilier/",
      icon: "🏢",
      linkLabel: "Voir le compte Instagram",
      imageSrc: "/images/projects/alv-immobilier-cover.png",
      imageAlt: "ALV Immobilier - couverture bleue avec logo",
    },
    {
      id: "moulin-brenizennec",
      title: "2️⃣ Le Moulin de Brenizennec – Projet familial 🏡",
      description: "Notre aventure de rénovation d'un moulin du XIXᵉ siècle en Bretagne.",
      href: "https://www.instagram.com/le_moulin_de_brenizennec/",
      icon: "🛠️",
      linkLabel: "Suivre l'avancement",
      imageSrc: "/images/projects/le-moulin-de-brenizennec.png",
      imageAlt: "Le Moulin de Brenizennec - chambres d'hôtes et rénovation familiale",
    },
    {
      id: "coraline-foveau",
      title: "3️⃣ Coraline Foveau – Windsurf World Ranking 🌊",
      description: "Athlète mondiale en windsurf. Performance, discipline & voyages.",
      href: "https://www.instagram.com/cocofoveau/",
      icon: "🏄‍♀️",
      linkLabel: "Découvrir le parcours",
      imageSrc: "/images/projects/coraline-foveau-windsurf.png",
      imageAlt: "Coraline Foveau en entraînement windsurf",
      imagePositionClass: "object-[50%_30%]",
    },
    {
      id: "alize-foveau",
      title: "4️⃣ Alizé Foveau – Nutrition & vie à la ferme 🌱",
      description:
        'Diététicienne à domicile et ateliers gourmands "De la ferme à l\'assiette". Basée à Plozévet, Finistère Sud.',
      href: "https://www.instagram.com/alize_bzh_/",
      icon: "🥗",
      linkLabel: "Explorer les offres",
      imageSrc: "/images/projects/alize-foveau-nutrition.png",
      imageAlt: "Alizé Foveau entourée d'animaux à la ferme",
    },
  ];

  const footerLinks = [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/matthis_immobilier",
      note: "Stories & coulisses",
    },
    {
      id: "site",
      label: "Site agence",
      href: agencyUrl,
      note: agencyLabel,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/matthisfoveau/",
      note: "Profil professionnel",
    },
  ];

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

        <main className="w-full max-w-4xl space-y-10 pb-10 sm:space-y-12 sm:pb-16">
          <SectionReveal
            as="section"
            className="relative overflow-hidden rounded-[36px] border border-[rgba(148,197,255,0.24)] bg-white/96 px-6 py-8 shadow-[0_18px_42px_rgba(15,23,42,0.1)] backdrop-blur-xl sm:px-10 sm:py-12"
          >
            <div className="pointer-events-none absolute -left-28 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-amber-200/45 via-rose-200/35 to-transparent blur-[110px]" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-gradient-to-tl from-sky-200/45 via-emerald-200/30 to-transparent blur-[120px]" />

            <div className="relative flex flex-col gap-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.7)]">
                  <span className="rounded-full border border-[rgba(148,197,255,0.35)] bg-white/80 px-3 py-1">Écoute & clarté</span>
                  <span className="rounded-full border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)] text-emerald-600 px-3 py-1">Conseil</span>
                  <span className="rounded-full border border-[rgba(252,211,77,0.35)] bg-[rgba(252,211,77,0.18)] text-amber-600 px-3 py-1">Qualité de suivi</span>
                </div>
                <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
                  <ShareButton
                    title={shareTitle}
                    text="Carte de contact ALV Immobilier"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "w-full sm:w-auto"
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-5 rounded-3xl border border-[rgba(148,197,255,0.24)] bg-white/94 p-6 text-center shadow-[0_16px_34px_rgba(15,23,42,0.1)] sm:flex-row sm:items-center sm:justify-center sm:gap-8">
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className="mx-auto w-full max-w-[260px] sm:max-w-[320px]">
                    <Image
                      src="/images/logo/alv-immobilier.svg"
                      alt="ALV Immobilier"
                      width={280}
                      height={120}
                      className="h-auto w-full"
                      sizes="(max-width: 640px) 240px, 320px"
                    />
                  </div>
                  <p className="mx-auto text-sm text-slate-500 max-w-[260px] sm:max-w-[320px]">À vos côtés depuis plus de 20 ans</p>
                </div>
                <Button
                  as="a"
                  href={agencyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="subtle"
                  size="lg"
                  className="mx-auto w-full gap-2 sm:w-auto"
                >
                  <span>Explorer l'agence</span>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M9 7H17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Button>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start">
                <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
                  <div className="relative h-32 w-32 overflow-hidden rounded-3xl border border-[rgba(148,197,255,0.28)] bg-white/85 shadow-[0_16px_36px_rgba(15,23,42,0.12)] sm:h-36 sm:w-36">
                    <Image
                      src={avatarSrc}
                      alt={name ? `Portrait de ${name}` : "Portrait professionnel"}
                      fill
                      sizes="(max-width: 640px) 50vw, 180px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(76,29,149,0.7)]">
                      <BlurText text={name ?? ""} as="span" />
                    </p>
                    <BlurText
                      text={displayTitle}
                      as="p"
                      className="text-sm font-medium text-slate-500"
                      delay={60}
                    />
                    {displayHandle && (
                      <Link
                        href="https://www.instagram.com/matthis_immobilier"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-[rgba(236,72,153,0.3)] bg-white/90 px-3.5 py-1.5 text-sm font-semibold text-[color:var(--alv-navy)] shadow-[0_10px_24px_rgba(30,58,95,0.12)] transition-colors duration-200 hover:border-[rgba(236,72,153,0.45)] hover:bg-white"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-rose-400 via-amber-400 to-sky-500 text-white shadow-[0_8px_16px_rgba(30,58,95,0.18)]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" className="text-white/90" />
                            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" className="text-white/90" />
                            <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" className="text-white/90" />
                          </svg>
                        </span>
                        <span className="text-base font-semibold text-amber-600 group-hover:text-amber-500">{displayHandle}</span>
                      </Link>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <BlurText
                      as="h1"
                      text={title ? `${title} - Finistère` : "Conseiller immobilier & investisseur local - Finistère"}
                      className="text-3xl font-semibold leading-tight text-[color:var(--alv-navy)] sm:text-4xl"
                    />
                    <p className="text-lg font-medium text-slate-600 sm:text-xl">J'aide les familles et les investisseurs avec méthode et transparence.</p>
                    <p className="text-sm font-semibold text-emerald-600 sm:text-base">{displayStatus}</p>
                  </div>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    <p>Je suis né en Guadeloupe, où j'ai passé mes dix premières années, entouré de soleil, d'eau et de simplicité.</p>
                    <p>À l'âge de 10 ans, la vie m'a demandé de grandir plus vite que prévu. Le décès de mon père a marqué un tournant, et ma famille a dû repartir de zéro dans le Nord-Pas-de-Calais.</p>
                    <p>C'est là que j'ai appris deux choses essentielles : rien n'est acquis, et on peut toujours reconstruire, pierre par pierre.</p>
                    <p>En 2021, j'ai choisi la Bretagne pour écrire mon propre chapitre. J'y ai trouvé ce que je cherchais : de l'authenticité, du sens et la possibilité de bâtir.</p>
                    <p>Aujourd'hui, j'accompagne les projets immobiliers avec cette même philosophie : prendre le temps, faire les choses bien, et avancer avec sérieux, humanité et clarté.</p>
                    <p className="text-sm font-semibold text-[color:var(--alv-navy)] sm:text-base">Je ne vends pas des biens - j'accompagne des décisions de vie.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[rgba(30,58,95,0.7)]">
                    <span className="rounded-full bg-[rgba(148,197,255,0.18)] px-3 py-1 text-[color:var(--alv-navy)]">Pleyben</span>
                    <span className="rounded-full bg-[rgba(148,197,255,0.18)] px-3 py-1 text-[color:var(--alv-navy)]">Quimper</span>
                    <span className="rounded-full bg-[rgba(148,197,255,0.18)] px-3 py-1 text-[color:var(--alv-navy)]">Brest</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal
            as="section"
            className="relative overflow-hidden rounded-[32px] border border-[rgba(148,197,255,0.24)] bg-gradient-to-br from-white via-sky-50/85 to-emerald-50/80 px-6 py-8 shadow-[0_26px_55px_rgba(15,23,42,0.12)]"
          >
            <div className="pointer-events-none absolute -right-20 -top-28 h-60 w-60 rounded-full bg-gradient-to-br from-emerald-200/45 via-sky-200/30 to-transparent blur-[100px]" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-gradient-to-tr from-amber-200/40 via-rose-200/32 to-transparent blur-[90px]" aria-hidden="true" />
            <div className="relative space-y-6">
              <header className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.65)]">Signature</p>
                <BlurText
                  as="h2"
                  text="Mon cadre d'accompagnement"
                  className="text-2xl font-semibold text-[color:var(--alv-navy)] sm:text-[26px]"
                />
              </header>
              <div className="grid gap-4 sm:grid-cols-3">
                {signaturePoints.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-2xl border border-[rgba(148,197,255,0.24)] bg-white/85 p-4 text-[color:var(--alv-navy)] shadow-[0_16px_32px_rgba(15,23,42,0.1)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(30,58,95,0.7)]">{point.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--alv-navy)]">{point.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Section : Mes autres projets & liens utiles */}
          <SectionReveal
            as="section"
            className="relative overflow-hidden rounded-[32px] border border-[rgba(148,197,255,0.22)] bg-white/92 px-6 py-8 shadow-[0_22px_48px_rgba(15,23,42,0.12)]"
          >
            <div className="pointer-events-none absolute -left-16 top-0 h-52 w-52 rounded-full bg-gradient-to-br from-sky-200/45 via-emerald-200/30 to-transparent blur-[95px]" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-12 bottom-0 h-48 w-48 rounded-full bg-gradient-to-tl from-amber-200/38 via-rose-200/24 to-transparent blur-[90px]" aria-hidden="true" />
            <div className="relative space-y-8">
              <header className="space-y-3 text-center">
                <BlurText
                  as="h2"
                  text="🌿 Mes autres projets & liens utiles"
                  className="text-2xl font-semibold text-[color:var(--alv-navy)] sm:text-[26px]"
                />
                <p className="mx-auto max-w-3xl text-sm text-slate-600 sm:text-base">
                  Découvrez également les projets et les membres de ma famille qui m'inspirent au quotidien.
                </p>
              </header>

              <div className="grid gap-4 sm:grid-cols-2">
                {otherProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group relative flex h-full flex-col gap-4 rounded-3xl border border-[rgba(148,197,255,0.22)] bg-white/88 p-5 text-center text-[color:var(--alv-navy)] shadow-[0_16px_36px_rgba(15,23,42,0.12)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(15,23,42,0.16)]"
                  >
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(148,197,255,0.18)] text-lg shadow-inner">
                        {project.icon}
                      </span>
                      <h3 className="text-base font-semibold leading-tight sm:text-lg">{project.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">{project.description}</p>
                    <div className="mt-auto flex flex-col gap-3">
                      {project.imageSrc ? (
                        <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-[rgba(148,197,255,0.26)] bg-white/90 shadow-[0_10px_24px_rgba(15,23,42,0.1)]">
                          <Image
                            src={project.imageSrc}
                            alt={project.imageAlt ?? project.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className={`object-cover ${project.imagePositionClass ?? ""}`}
                            priority={project.id === "moulin-brenizennec"}
                          />
                        </div>
                      ) : (
                        <div className="flex h-32 w-full items-center justify-center rounded-2xl border border-dashed border-[rgba(148,197,255,0.32)] bg-gradient-to-br from-white via-slate-50/80 to-white text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                          Photo à venir
                        </div>
                      )}
                      <Button
                        as="a"
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="sm"
                        className="group justify-center gap-2"
                      >
                        <span>{project.linkLabel}</span>
                        <svg className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[color:var(--alv-navy)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M9 7H17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal
            as="footer"
            className="flex flex-col gap-4 rounded-3xl border border-[rgba(148,197,255,0.24)] bg-white/85 px-6 py-6 text-[color:var(--alv-navy)] shadow-[0_18px_40px_rgba(15,23,42,0.12)] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.65)]">Liens directs</p>
              <p className="text-sm text-slate-500">📍 Pleyben - Quimper - Brest</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-[rgba(148,197,255,0.3)] bg-white/90 px-3.5 py-1.5 text-sm font-semibold text-[color:var(--alv-navy)] shadow-[0_10px_24px_rgba(15,23,42,0.1)] transition-colors duration-200 hover:border-[rgba(148,197,255,0.45)] hover:bg-white"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-slate-500">{item.note}</span>
                </Link>
              ))}
            </div>
          </SectionReveal>
        </main>
      </div>
    </div>
  );
}
