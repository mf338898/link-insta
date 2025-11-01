import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import GradualBlur from "@/components/GradualBlur";
import Magnet from "@/components/Magnet";
import NewsletterForm from "@/components/NewsletterForm";
import ShareButton from "@/components/ShareButton";
import { getContactBySlug } from "@/data/contacts";

type ActionLink = {
  id: string;
  href: string;
  label: string;
  description: string;
  icon: ReactNode;
  iconClass: string;
  badge: string;
  badgeClass: string;
  helper?: string;
  external?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
};

type LockedAction = {
  id: string;
  label: string;
  note: string;
  badge: string;
};

export default async function ContactPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const contact = getContactBySlug(slug);
  if (!contact) return notFound();

  const { name, handle, avatarUrl, url } = contact;
  const displayHandle = handle ? (handle.startsWith("@") ? handle : `@${handle}`) : null;
  const avatarSrc = avatarUrl ?? "/images/avatars/matthis-profile.png";
  const shareTitle = `${name} - Conseiller immobilier & investisseur local (Finistère)`;
  const fallbackAgencyUrl = "https://www.alvimmobilier.com";
  const agencyUrl = url ?? fallbackAgencyUrl;
  let agencyLabel = agencyUrl.replace(/^https?:\/\//, "");
  if (agencyLabel.endsWith("/")) {
    agencyLabel = agencyLabel.slice(0, -1);
  }

  const actionLinks: ActionLink[] = [
    {
      id: "submit-project",
      href: `/c/${slug}/submit-project`,
      label: "💼 Déposer votre projet immobilier (Sélection)",
      description: "Accès au questionnaire premium. Ce formulaire me permet de comprendre votre projet en profondeur et d'évaluer comment je peux vous accompagner au mieux.",
      helper: "Temps : environ 2 minutes - réponses complètes. Priorité aux projets du Finistère.",
      badge: "Sélection",
      badgeClass: "bg-[rgba(236,72,153,0.12)] text-rose-500",
      iconClass: "bg-[rgba(236,72,153,0.14)] text-rose-500",
      disabled: true,
      disabledMessage: "Bientôt disponible pour les demandes d'estimation. Merci de contacter l'agence directement jusque-là.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 7V6a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="3" y="7" width="18" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "premium-guides",
      href: `/c/${slug}/guides`,
      label: "📚 Guides & Mini-formations (Premium)",
      description: "Bibliothèque privée d'expertises - contenus débloqués progressivement.",
      helper: "Guides vendeurs, checklists, mini-formations. Accès progressif aux ressources.",
      badge: "Premium",
      badgeClass: "bg-[rgba(56,189,248,0.16)] text-sky-600",
      iconClass: "bg-[rgba(56,189,248,0.14)] text-sky-600",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 19V5a2 2 0 0 1 2-2h10.5a1.5 1.5 0 0 1 1.5 1.5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 19h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 7h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "instagram",
      href: "https://www.instagram.com/matthis_immobilier",
      label: "🎥 Conseils gratuits",
      description: "Reels, pédagogie terrain, transparence locale.",
      helper: "Cas concrets et retours d'expérience.",
      badge: "Instagram",
      badgeClass: "bg-[rgba(148,197,255,0.2)] text-[color:var(--alv-navy)]",
      iconClass: "bg-[rgba(236,72,153,0.12)] text-[color:var(--alv-navy)]",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
        </svg>
      ),
      external: true,
    },
  ];

  const lockedActions: LockedAction[] = [
    {
      id: "estimation",
      label: "Espace estimation locale",
      note: "Réservé - ouverture prochaine",
      badge: "🔒 Prochainement",
    },
    {
      id: "investor-kit",
      label: "Kit investisseur Finistère",
      note: "En préparation - dossiers & chiffres clés.",
      badge: "🔒 Bientôt",
    },
  ];

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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,197,255,0.18),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),_transparent_65%)]" aria-hidden="true" />

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
          <section className="relative overflow-hidden rounded-[36px] border border-[rgba(148,197,255,0.24)] bg-white/96 px-6 py-8 shadow-[0_18px_42px_rgba(15,23,42,0.1)] backdrop-blur-xl sm:px-10 sm:py-12">
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
                    className="inline-flex w-full items-center justify-center rounded-full border border-[rgba(148,197,255,0.3)] bg-white/90 px-4 py-2.5 text-sm font-semibold text-[color:var(--alv-navy)] shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition-colors duration-200 hover:border-[rgba(148,197,255,0.45)] hover:bg-white sm:w-auto"
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
                <Link
                  href={agencyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-auto inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgba(96,165,216,0.35)] bg-white/95 px-4 py-2 text-sm font-semibold text-[color:var(--alv-navy)] shadow-[0_12px_26px_rgba(15,23,42,0.12)] transition-colors duration-200 hover:border-[rgba(96,165,216,0.5)] hover:bg-white sm:w-auto"
                >
                  <span>Explorer l'agence</span>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M9 7H17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
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
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(76,29,149,0.7)]">{name}</p>
                    <p className="text-sm font-medium text-slate-500">Conseiller immobilier & investisseur local</p>
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
                    <h1 className="text-3xl font-semibold leading-tight text-[color:var(--alv-navy)] sm:text-4xl">Conseiller immobilier & investisseur local - Finistère</h1>
                    <p className="text-lg font-medium text-slate-600 sm:text-xl">J'aide les familles et les investisseurs avec méthode et transparence.</p>
                    <p className="text-sm font-semibold text-emerald-600 sm:text-base">Accompagnement personnalisé et rigoureux.</p>
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
          </section>

          <section className="space-y-6">
            <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.65)]">Actions immédiates</p>
                <h2 className="text-2xl font-semibold text-[color:var(--alv-navy)] sm:text-[26px]">Choisissez le canal qui correspond à votre besoin</h2>
              </div>
              <p className="text-xs text-slate-500 sm:text-sm">Priorité aux vendeurs et investisseurs du Finistère.</p>
            </header>

            <div className="grid gap-4">
              {actionLinks.map((action) => (
                <Magnet
                  key={action.id}
                  wrapperClassName="w-full"
                  magnetStrength={action.disabled ? 0 : 3.5}
                  padding={60}
                  disabled={action.disabled}
                >
                  {action.disabled ? (
                    <div
                      role="button"
                      aria-disabled="true"
                      className="group relative flex w-full flex-col gap-2.5 rounded-2xl border border-[rgba(148,197,255,0.2)] bg-white/70 px-4 py-4 text-[color:var(--alv-navy)] opacity-85 shadow-[0_8px_20px_rgba(15,23,42,0.08)] backdrop-blur-sm transition"
                    >
                      <div className="absolute inset-0 rounded-2xl border border-dashed border-[rgba(236,72,153,0.45)]" aria-hidden="true" />
                      <div className="flex items-start gap-3">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.iconClass} shadow-inner`}>{action.icon}</span>
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-base font-semibold">{action.label}</span>
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.28em] ${action.badgeClass}`}>
                              {action.badge}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-[rgba(236,72,153,0.12)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-600">
                              Bientot
                            </span>
                          </div>
                          <span className="text-sm text-slate-500">{action.description}</span>
                        </div>
                        <svg className="mt-1 h-4 w-4 text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M8 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M8 17H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      {action.helper && <p className="text-xs text-slate-400">{action.helper}</p>}
                      {action.disabledMessage && (
                        <p className="text-xs font-semibold text-amber-600">
                          {action.disabledMessage}
                        </p>
                      )}
                    </div>
                  ) : (
                    <a
                      href={action.href}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noopener noreferrer" : undefined}
                      className="group relative flex w-full flex-col gap-2.5 rounded-2xl border border-[rgba(148,197,255,0.2)] bg-white/95 px-4 py-4 text-[color:var(--alv-navy)] shadow-[0_12px_28px_rgba(15,23,42,0.12)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,23,42,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(148,197,255,0.45)]"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.iconClass} shadow-inner`}>{action.icon}</span>
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-base font-semibold">{action.label}</span>
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.28em] ${action.badgeClass}`}>
                              {action.badge}
                            </span>
                          </div>
                          <span className="text-sm text-slate-500">{action.description}</span>
                        </div>
                        <svg className="mt-1 h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[color:var(--alv-navy)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M9 7H17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      {action.helper && <p className="text-xs text-slate-400">{action.helper}</p>}
                    </a>
                  )}
                </Magnet>
              ))}

              <NewsletterForm />
            </div>
          </section>

          <section className="space-y-4">
            <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.65)]">Vision long terme</p>
                <h2 className="text-2xl font-semibold text-[color:var(--alv-navy)] sm:text-[26px]">Boutons verrouillés - encore un peu de patience</h2>
              </div>
              <p className="text-xs text-slate-500 sm:text-sm">Ces ressources sont en cours de création - merci pour votre patience.</p>
            </header>
            <div className="grid gap-4">
              {lockedActions.map((item) => (
                <div
                  key={item.id}
                  className="relative flex flex-col gap-3 rounded-3xl border border-dashed border-[rgba(148,197,255,0.4)] bg-white/82 px-5 py-5 text-slate-600 shadow-[0_14px_34px_rgba(15,23,42,0.1)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(148,163,184,0.18)] text-[rgba(30,58,95,0.65)]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="5" y="10" width="14" height="9" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 10V8a4 4 0 1 1 8 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-semibold text-[color:var(--alv-navy)] sm:text-lg">{item.label}</span>
                        <span className="inline-flex items-center rounded-full bg-[rgba(148,163,184,0.18)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[rgba(71,85,105,0.9)]">
                          {item.badge}
                        </span>
                      </div>
                      <span className="text-sm text-slate-500">{item.note}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[32px] border border-[rgba(148,197,255,0.24)] bg-gradient-to-br from-white via-sky-50/85 to-emerald-50/80 px-6 py-8 shadow-[0_26px_55px_rgba(15,23,42,0.12)]">
            <div className="pointer-events-none absolute -right-20 -top-28 h-60 w-60 rounded-full bg-gradient-to-br from-emerald-200/45 via-sky-200/30 to-transparent blur-[100px]" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-gradient-to-tr from-amber-200/40 via-rose-200/32 to-transparent blur-[90px]" aria-hidden="true" />
            <div className="relative space-y-6">
              <header className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.65)]">Signature</p>
                <h2 className="text-2xl font-semibold text-[color:var(--alv-navy)] sm:text-[26px]">Mon cadre d'accompagnement</h2>
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
          </section>

          <footer className="flex flex-col gap-4 rounded-3xl border border-[rgba(148,197,255,0.24)] bg-white/85 px-6 py-6 text-[color:var(--alv-navy)] shadow-[0_18px_40px_rgba(15,23,42,0.12)] sm:flex-row sm:items-center sm:justify-between">
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
          </footer>
        </main>
      </div>
    </div>
  );
}
