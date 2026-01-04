import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlurText from "@/components/BlurText";
import GradualBlur from "@/components/GradualBlur";
import HeroSplit from "@/components/HeroSplit";
import SectionReveal from "@/components/SectionReveal";
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

  const estimationBaseUrl = process.env.NEXT_PUBLIC_ESTIMATION_URL ?? "/estimation";

  const { name, handle, avatarUrl, url, title, status } = contact;
  const displayHandle = handle ? (handle.startsWith("@") ? handle : `@${handle}`) : null;
  const avatarSrc = avatarUrl ?? "/images/avatars/matthis-profile.png";
  const displayTitle = title ?? "Conseiller immobilier & investisseur local";
  const displayStatus = status ?? "Accompagnement personnalisé et rigoureux.";
  const shareTitle = `${name} - ${displayTitle} (Finistère)`;
  const fallbackAgencyUrl = "https://www.alvimmobilier.bzh";
  const agencyUrl = url ?? fallbackAgencyUrl;
  let agencyLabel = agencyUrl.replace(/^https?:\/\//, "");
  if (agencyLabel.endsWith("/")) {
    agencyLabel = agencyLabel.slice(0, -1);
  }

  const signaturePoints = [
    {
      title: "🎯 Marché",
      content: "Finistère : Pleyben - Brest",
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
      id: "moulin-brenizennec",
      title: "Le Moulin de Brenizennec – Projet familial",
      description: "Notre aventure de rénovation d'un moulin du XIXᵉ siècle en Bretagne.",
      href: "https://www.instagram.com/le_moulin_de_brenizennec/",
      icon: "🛠️",
      linkLabel: "Suivre l'avancement",
      imageSrc: "/images/projects/le-moulin-de-brenizennec.png",
      imageAlt: "Le Moulin de Brenizennec - chambres d'hôtes et rénovation familiale",
    },
    {
      id: "alize-foveau",
      title: "Alizé Foveau – Nutrition & vie à la ferme",
      description:
        'Diététicienne à domicile et ateliers gourmands "De la ferme à l\'assiette". Basée à Plozévet, Finistère Sud.',
      href: "https://www.instagram.com/alize_bzh_/",
      icon: "🥗",
      linkLabel: "Explorer les offres",
      imageSrc: "/images/projects/alize-foveau-nutrition.png",
      imageAlt: "Alizé Foveau entourée d'animaux à la ferme",
    },
    {
      id: "coraline-foveau",
      title: "Coraline Foveau – Windsurf World Ranking 🌊",
      description: "Athlète mondiale en windsurf. Performance, discipline & voyages.",
      href: "https://www.instagram.com/cocofoveau/",
      icon: "🏄‍♀️",
      linkLabel: "Découvrir le parcours",
      imageSrc: "/images/projects/coraline-foveau-windsurf.png",
      imageAlt: "Coraline Foveau en entraînement windsurf",
      imagePositionClass: "object-[50%_30%]",
    },
    {
      id: "eliott-foveau",
      title: "Eliott Foveau – Créateur de sites web 🌊",
      description: "Designer et développeur web. Sites modernes & identités visuelles inspirés par son univers : voyages & surf.",
      href: "https://www.instagram.com/eliott.fovo/",
      icon: "🧭",
      linkLabel: "Découvrir l'univers",
      imageSrc: "/images/projects/eliott-foveau.png",
      imageAlt: "Eliott Foveau au bord d'une cascade",
      imagePositionClass: "object-[50%_40%]",
    },
    {
      id: "alv-immobilier",
      title: "ALV Immobilier – Instagram",
      description: "L'agence dans laquelle j'exerce : actualités, biens disponibles et conseils immobiliers.",
      href: "https://www.instagram.com/alvimmobilier/",
      icon: "🏢",
      linkLabel: "Voir le compte Instagram",
      imageSrc: "/images/projects/alv-immobilier-cover.png",
      imageAlt: "ALV Immobilier - couverture bleue avec logo",
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

        <main className="w-full max-w-5xl space-y-10 pb-10 sm:space-y-12 sm:pb-16 lg:max-w-6xl">
          <HeroSplit
            estimationBaseUrl={estimationBaseUrl}
            secondaryHref="https://www.alvimmobilier.bzh/catalog/products_selled.php?filtre=Vente"
            pageSource="hub_matthis"
            estimationLabel="Estimer mon bien"
            secondaryLabel="Voir les biens"
            agencyUrl={agencyUrl}
            agencyLabel={agencyLabel}
            proCard={{
              name: name ?? "Matthis Foveau",
              title: displayTitle,
              status: displayStatus,
              handle: displayHandle,
              handleHref: "https://www.instagram.com/matthis_immobilier",
              imageSrc: avatarSrc,
              idLabel: "Finistère — ALV Immobilier",
              idValue: "Pleyben · Brest",
            }}
          />
          {/* Section : Mes autres projets & liens utiles */}
          <SectionReveal
            as="section"
            className="relative px-4 py-8 sm:px-8 sm:py-10"
          >
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
            className="flex flex-col gap-4 px-4 py-6 text-[color:var(--alv-navy)] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.65)]">Liens directs</p>
              <p className="text-sm text-slate-500">📍 Pleyben - Brest</p>
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
