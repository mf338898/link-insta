"use client";

import { useState, FormEvent } from "react";

export default function NewsletterForm() {
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
      const response = await fetch("/api/newsletter", {
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
    <div className="relative flex w-full flex-col gap-3 rounded-3xl border border-[rgba(16,185,129,0.35)] bg-gradient-to-br from-white via-emerald-50/85 to-sky-50/80 px-5 py-5 shadow-[0_18px_44px_rgba(16,185,129,0.18)]">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(16,185,129,0.12)] text-emerald-600 shadow-inner">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 7l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-[color:var(--alv-navy)] sm:text-lg">📬 Recevoir mes analyses du marché immobilier (Finistère)</span>
            <span className="inline-flex items-center rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-600">
              Newsletter 2x/mois
            </span>
          </div>
          <span className="text-sm text-slate-500">Tendances locales, prix, stratégies vendeur & investisseur, points de vigilance.</span>
        </div>
      </div>
      
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
          <label className="sr-only" htmlFor="newsletter-email">
            Adresse email
          </label>
          <input
            id="newsletter-email"
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
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[color:var(--alv-navy)] via-[color:var(--alv-sky)] to-[color:var(--alv-emerald)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.24)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/60 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Envoi..." : "Je m'inscris"}
          </button>
        </form>
      )}
      
      {error && (
        <div className="rounded-2xl bg-rose-50/90 px-4 py-3 text-sm font-medium text-rose-700 border border-rose-200/60">
          {error}
        </div>
      )}
      
      {!successMessage && (
        <p className="text-xs text-slate-500">Pas de spam - uniquement de l'information utile et vérifiée.</p>
      )}
    </div>
  );
}

