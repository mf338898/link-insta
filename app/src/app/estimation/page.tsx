import GradualBlur from "@/components/GradualBlur";
import EstimationStarter from "@/components/EstimationStarter";
import SectionReveal from "@/components/SectionReveal";
import SubtleGridBackground from "@/components/SubtleGridBackground";

export const metadata = {
  title: "Estimation immobilière en Bretagne | ALV Immobilier",
  description: "Démarrer une estimation offerte (~40 km autour de Pleyben). Réponse sous 24 h ouvrées.",
};

export const dynamic = "force-dynamic";

export default function EstimationPage() {
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

        <main className="w-full max-w-4xl space-y-8 pb-10 sm:space-y-10 sm:pb-14">
          <SectionReveal
            as="section"
            className="relative flex flex-col gap-3 rounded-3xl border border-[rgba(148,197,255,0.26)] bg-white/92 px-6 py-8 text-center shadow-[0_18px_44px_rgba(15,23,42,0.12)] sm:px-8 sm:py-10"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.7)]">
              <span className="rounded-full border border-[rgba(148,197,255,0.35)] bg-white/80 px-3 py-1">Bretagne</span>
              <span className="rounded-full border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.12)] text-emerald-700 px-3 py-1">
                Estimation rapide
              </span>
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-[color:var(--alv-navy)] sm:text-4xl">
              Estimation immobilière en Bretagne
            </h1>
            <p className="text-lg font-medium text-slate-700 sm:text-xl">
              Recevez un avis de valeur fiable et des conseils de vente. Réponse sous 24 h ouvrées.
            </p>
          </SectionReveal>

          <SectionReveal as="section" className="relative px-2 sm:px-0">
            <EstimationStarter pageSource="estimation_page" />
          </SectionReveal>
        </main>
      </div>
    </div>
  );
}

