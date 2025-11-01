"use client";

import { useState, FormEvent } from "react";

export default function PrivateAccessForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/private-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      setSuccessMessage(data.message);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="liste-privee"
      className="relative overflow-hidden rounded-[32px] border border-[rgba(148,197,255,0.24)] bg-gradient-to-br from-white via-sky-50/85 to-emerald-50/80 px-6 py-8 shadow-[0_26px_55px_rgba(15,23,42,0.12)] sm:px-10 sm:py-10"
    >
      <div className="pointer-events-none absolute -right-20 -top-28 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-200/45 via-sky-200/30 to-transparent blur-[90px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-gradient-to-tr from-amber-200/40 via-rose-200/32 to-transparent blur-[80px]" aria-hidden="true" />
      <div className="relative space-y-6">
        <header className="space-y-2">
          <h2 className="text-xl font-semibold text-[color:var(--alv-navy)] sm:text-[24px]">Accès privé — ressources immobilières Finistère</h2>
          <p className="text-sm text-slate-500 sm:max-w-xl">
            🎓 Accès prioritaire aux guides & outils réservés
            <br />
            Recevez les nouvelles ressources en avant-première, dédiées aux propriétaires & investisseurs du Finistère.
          </p>
        </header>
        
        {successMessage ? (
          <div className="rounded-2xl bg-emerald-50/90 px-4 py-3 text-sm font-medium text-emerald-700 border border-emerald-200/60">
            {successMessage.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
          >
            <label className="sr-only" htmlFor="email-guides">
              Adresse email
            </label>
            <input
              id="email-guides"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ton.email@exemple.fr"
              className="w-full rounded-2xl border border-[rgba(148,197,255,0.35)] bg-white/90 px-4 py-3 text-sm text-[color:var(--alv-navy)] shadow-[0_10px_24px_rgba(15,23,42,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(96,165,216,0.55)]"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[color:var(--alv-navy)] via-[color:var(--alv-sky)] to-[color:var(--alv-emerald)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(15,23,42,0.24)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/60 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Envoi..." : "Entrer mon email"}
            </button>
          </form>
        )}
        
        {error && (
          <div className="rounded-2xl bg-rose-50/90 px-4 py-3 text-sm font-medium text-rose-700 border border-rose-200/60">
            {error}
          </div>
        )}
        
        {!successMessage && (
          <p className="text-xs text-slate-500">Contenu utile uniquement — aucune sollicitation commerciale.</p>
        )}
      </div>
    </section>
  );
}

