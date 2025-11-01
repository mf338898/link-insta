"use client";

import { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import Magnet from "./Magnet";
import ShinyText from "./ShinyText";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  contactPreference: "phone" | "sms" | "email" | "";
  hasExperience: "yes" | "no" | "";
  projectType: "sell" | "estimate" | "buy" | "invest" | "other" | "";
  projectTypeOther: string;
  projectLocation: string;
  propertyType: "house" | "apartment" | "building" | "land" | "commercial" | "other" | "";
  propertyTypeOther: string;
  propertyDetails: string;
  propertyCondition: "new" | "good" | "light" | "heavy" | "full" | "";
  motivation: string;
  timeline: "now" | "soon" | "later" | "thinking" | "";
  financingStatus: "approved" | "progress" | "none" | "cash" | "";
  sellBeforeBuy: "yes" | "no" | "na" | "";
  priceExpectation: string;
  priceEstimationMethod: "pro" | "personal" | "comparison" | "intuition" | "";
  contactedAgencies: "yes" | "no" | "";
  contactedAgencyDetails: string;
  discoveredVia: "instagram" | "recommendation" | "google" | "agency" | "other" | "";
  discoveredViaOther: string;
  reasonToWork: string;
  motivationLevel: number;
  callbackPreference: "yes" | "no" | "";
  validationAccepted: boolean;
  commitmentConfirmed: boolean;
};

type StepConfig = {
  id:
    | "profile"
    | "project"
    | "timeline"
    | "market"
    | "engagement"
    | "validation";
  label: string;
  subtitle: string;
  helper: string;
  requiredKeys: (keyof FormData)[];
  validate?: (data: FormData) => boolean;
};

const initialData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  contactPreference: "",
  hasExperience: "",
  projectType: "",
  projectTypeOther: "",
  projectLocation: "",
  propertyType: "",
  propertyTypeOther: "",
  propertyDetails: "",
  propertyCondition: "",
  motivation: "",
  timeline: "",
  financingStatus: "",
  sellBeforeBuy: "",
  priceExpectation: "",
  priceEstimationMethod: "",
  contactedAgencies: "",
  contactedAgencyDetails: "",
  discoveredVia: "",
  discoveredViaOther: "",
  reasonToWork: "",
  motivationLevel: 7,
  callbackPreference: "",
  validationAccepted: false,
  commitmentConfirmed: false,
};

const steps: StepConfig[] = [
  {
    id: "profile",
    label: "À propos de toi",
    subtitle: "Mieux te connaître pour ajuster notre premier échange.",
    helper: "Identité & contact privilégié.",
    requiredKeys: ["fullName", "email", "phone", "contactPreference", "hasExperience"],
  },
  {
    id: "project",
    label: "Ton projet",
    subtitle: "Comprendre le contexte précis de ton bien ou de ta recherche.",
    helper: "Localisation, type de bien, état & motivation.",
    requiredKeys: [
      "projectType",
      "projectLocation",
      "propertyType",
      "propertyDetails",
      "propertyCondition",
      "motivation",
    ],
    validate: (data) => {
      if (data.projectType === "other" && data.projectTypeOther.trim().length === 0) return false;
      if (data.propertyType === "other" && data.propertyTypeOther.trim().length === 0) return false;
      return true;
    },
  },
  {
    id: "timeline",
    label: "Timing & situation",
    subtitle: "Se caler sur ton agenda et ta capacité à avancer.",
    helper: "Calendrier & financement.",
    requiredKeys: ["timeline", "financingStatus", "sellBeforeBuy"],
  },
  {
    id: "market",
    label: "Infos marché",
    subtitle: "Situer ton projet sur le marché local.",
    helper: "Budget & démarches déjà réalisées.",
    requiredKeys: ["priceExpectation", "priceEstimationMethod", "contactedAgencies"],
    validate: (data) => {
      if (data.contactedAgencies === "yes" && data.contactedAgencyDetails.trim().length === 0) return false;
      return true;
    },
  },
  {
    id: "engagement",
    label: "Confiance & motivation",
    subtitle: "Pourquoi moi et quelle est ton énergie actuelle ?",
    helper: "Alignement humain & motivation.",
    requiredKeys: ["discoveredVia", "reasonToWork"],
    validate: (data) => {
      if (data.discoveredVia === "other" && data.discoveredViaOther.trim().length === 0) return false;
      return true;
    },
  },
  {
    id: "validation",
    label: "Validation",
    subtitle: "On vérifie que l'accompagnement te correspond.",
    helper: "Engagement & disponibilité.",
    requiredKeys: ["callbackPreference"],
    validate: (data) => data.validationAccepted && data.commitmentConfirmed,
  },
];

const inputClass =
  "w-full rounded-3xl border border-[rgba(148,197,255,0.35)] bg-white/92 px-4 py-3 text-sm text-[color:var(--alv-navy)] shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(96,165,216,0.55)] placeholder:text-slate-400";

const textareaClass = clsx(
  inputClass,
  "min-h-[128px] resize-none leading-relaxed placeholder:text-[13px] sm:placeholder:text-sm"
);

const sectionCardClass =
  "rounded-[32px] border border-[rgba(148,197,255,0.24)] bg-white/95 p-6 shadow-[0_22px_48px_rgba(15,23,42,0.14)] sm:p-8";

const optionBaseClass =
  "relative flex flex-1 min-w-[140px] cursor-pointer items-start gap-3 rounded-3xl border px-4 py-4 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(96,165,216,0.45)]";

function isStepValid(step: StepConfig, data: FormData) {
  const baseValid = step.requiredKeys.every((key) => {
    const value = data[key];
    if (typeof value === "string") {
      return value.trim().length > 0;
    }
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "number") {
      return true;
    }
    return Boolean(value);
  });

  if (!baseValid) return false;
  if (step.validate) {
    return step.validate(data);
  }
  return true;
}

function friendlyValue(field: keyof FormData, data: FormData): string {
  switch (field) {
    case "contactPreference":
      return (
        {
          phone: "Téléphone",
          sms: "SMS",
          email: "Email",
          "": "—",
        }[data[field]] ?? "—"
      );
    case "hasExperience":
      return data[field] === "yes" ? "Oui" : data[field] === "no" ? "Non" : "—";
    case "projectType":
      return (
        {
          sell: "Vendre un bien",
          estimate: "Faire estimer mon bien",
          buy: "Acheter pour y habiter",
          invest: "Investir (locatif)",
          other: `Autre : ${data.projectTypeOther || "à préciser"}`,
          "": "—",
        }[data[field]] ?? "—"
      );
    case "propertyType":
      return (
        {
          house: "Maison",
          apartment: "Appartement",
          building: "Immeuble",
          land: "Terrain",
          commercial: "Local commercial",
          other: `Autre : ${data.propertyTypeOther || "à préciser"}`,
          "": "—",
        }[data[field]] ?? "—"
      );
    case "propertyCondition":
      return (
        {
          new: "Neuf",
          good: "Bon état",
          light: "Travaux légers",
          heavy: "Travaux lourds",
          full: "À rénover entièrement",
          "": "—",
        }[data[field]] ?? "—"
      );
    case "timeline":
      return (
        {
          now: "Immédiat (0-3 mois)",
          soon: "Prévu bientôt (3-6 mois)",
          later: "Plus tard (6-12 mois)",
          thinking: "En réflexion",
          "": "—",
        }[data[field]] ?? "—"
      );
    case "financingStatus":
      return (
        {
          approved: "Oui, accord bancaire",
          progress: "Oui, en cours",
          none: "Non, pas encore",
          cash: "Je finance cash",
          "": "—",
        }[data[field]] ?? "—"
      );
    case "sellBeforeBuy":
      return (
        {
          yes: "Oui",
          no: "Non",
          na: "Pas concerné",
          "": "—",
        }[data[field]] ?? "—"
      );
    case "priceEstimationMethod":
      return (
        {
          pro: "Estimation professionnelle",
          personal: "Analyse personnelle",
          comparison: "Comparaison de biens",
          intuition: "Intuition / aucun calcul",
          "": "—",
        }[data[field]] ?? "—"
      );
    case "contactedAgencies":
      return data[field] === "yes" ? "Oui" : data[field] === "no" ? "Non" : "—";
    case "discoveredVia":
      return (
        {
          instagram: "Instagram",
          recommendation: "Recommandation",
          google: "Google",
          agency: "Agence ALV",
          other: `Autre : ${data.discoveredViaOther || "à préciser"}`,
          "": "—",
        }[data[field]] ?? "—"
      );
    case "callbackPreference":
      return data[field] === "yes" ? "Oui" : data[field] === "no" ? "Non, juste des infos" : "—";
    default:
      return String(data[field] ?? "—");
  }
}

function buildDossierText(data: FormData, contactName: string) {
  return [
    `Dossier projet immobilier envoyé via la carte de ${contactName}`,
    "",
    "Identité & contact",
    `- Nom : ${data.fullName}`,
    `- Email : ${data.email}`,
    `- Téléphone : ${data.phone}`,
    `- Préférence de contact : ${friendlyValue("contactPreference", data)}`,
    `- Expérience immobilière : ${friendlyValue("hasExperience", data)}`,
    "",
    "Projet",
    `- Nature : ${friendlyValue("projectType", data)}`,
    `- Zone / adresse : ${data.projectLocation || "—"}`,
    `- Type de bien : ${friendlyValue("propertyType", data)}`,
    `- Détails : ${data.propertyDetails || "—"}`,
    `- État : ${friendlyValue("propertyCondition", data)}`,
    `- Motivation : ${data.motivation || "—"}`,
    "",
    "Timing & situation",
    `- Calendrier : ${friendlyValue("timeline", data)}`,
    `- Financement : ${friendlyValue("financingStatus", data)}`,
    `- Vente avant achat : ${friendlyValue("sellBeforeBuy", data)}`,
    "",
    "Approche marché",
    `- Budget / prix : ${data.priceExpectation || "—"}`,
    `- Méthode d'estimation : ${friendlyValue("priceEstimationMethod", data)}`,
    `- Contact agences : ${friendlyValue("contactedAgencies", data)}`,
    data.contactedAgencies === "yes"
      ? `  > Détails : ${data.contactedAgencyDetails || "—"}`
      : undefined,
    "",
    "Confiance & motivation",
    `- Origine du contact : ${friendlyValue("discoveredVia", data)}`,
    data.discoveredVia === "other" ? `  > Précision : ${data.discoveredViaOther || "—"}` : undefined,
    `- Pourquoi travailler ensemble : ${data.reasonToWork || "—"}`,
    `- Niveau de motivation : ${data.motivationLevel}/10`,
    "",
    "Validation",
    `- Souhaite être rappelé : ${friendlyValue("callbackPreference", data)}`,
    "- Engagement sélectif accepté",
    "- Projet déclaré sérieux et dans le Finistère",
  ]
    .filter(Boolean)
    .join("\n");
}

type SubmitProjectFormProps = {
  contactName: string;
  contactEmail?: string;
};

export default function SubmitProjectForm({ contactName, contactEmail }: SubmitProjectFormProps) {
  const [data, setData] = useState<FormData>(initialData);
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState<"editing" | "review" | "submitted">("editing");
  const [showValidation, setShowValidation] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeStep = steps[currentStep];
  const totalSteps = steps.length;
  const progress =
    status === "submitted" || status === "review"
      ? 100
      : Math.round(((currentStep + 1) / totalSteps) * 100);

  const updateField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const goToStep = useCallback(
    (index: number) => {
      setCurrentStep(index);
      setStatus("editing");
      setShowValidation(false);
    },
    []
  );

  const handleNext = useCallback(() => {
    if (!isStepValid(activeStep, data)) {
      setShowValidation(true);
      return;
    }
    if (currentStep === totalSteps - 1) {
      setStatus("review");
      setShowValidation(false);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    setShowValidation(false);
  }, [activeStep, currentStep, data, totalSteps]);

  const handlePrevious = useCallback(() => {
    if (status === "review") {
      setStatus("editing");
      setShowValidation(false);
      return;
    }
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setShowValidation(false);
  }, [status]);

  const handleSubmit = useCallback(() => {
    setStatus("submitted");
    setShowValidation(false);
  }, []);

  const dossierText = useMemo(() => buildDossierText(data, contactName), [data, contactName]);

  const copyDossier = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      console.warn("Clipboard API not available.");
      return;
    }
    try {
      await navigator.clipboard.writeText(dossierText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      console.error("Clipboard error", error);
    }
  }, [dossierText]);

  const renderValidationMessage = (message: string) =>
    showValidation ? (
      <p className="text-sm font-medium text-rose-500">
        {message}
      </p>
    ) : null;

  const renderStepContent = () => {
    switch (activeStep.id) {
      case "profile":
        return (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-semibold text-[color:var(--alv-navy)]">
                  Prénom & nom
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={data.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  placeholder="Ex : Léa Martin"
                  className={clsx(inputClass, showValidation && !data.fullName.trim() && "border-rose-300")}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-[color:var(--alv-navy)]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="ton.email@exemple.fr"
                  className={clsx(inputClass, showValidation && !data.email.trim() && "border-rose-300")}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-[color:var(--alv-navy)]">
                  Téléphone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={data.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="+33 6 XX XX XX XX"
                  className={clsx(inputClass, showValidation && !data.phone.trim() && "border-rose-300")}
                  required
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm font-semibold text-[color:var(--alv-navy)]">
                  Comment préfères-tu qu'on te contacte ?
                </span>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { value: "phone" as const, label: "☎️ Téléphone" },
                    { value: "sms" as const, label: "💬 SMS" },
                    { value: "email" as const, label: "✉️ Email" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField("contactPreference", option.value)}
                      className={clsx(
                        optionBaseClass,
                        data.contactPreference === option.value
                          ? "border-[rgba(59,130,246,0.5)] bg-[rgba(59,130,246,0.08)] shadow-[0_14px_28px_rgba(59,130,246,0.18)] text-[color:var(--alv-navy)]"
                          : "border-[rgba(148,197,255,0.28)] bg-white/90 text-slate-600 hover:border-[rgba(96,165,216,0.45)] hover:bg-[rgba(148,197,255,0.12)]"
                      )}
                    >
                      <span className="text-sm font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>
                {showValidation && !data.contactPreference && renderValidationMessage("Choisis ton canal préféré.")}
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-sm font-semibold text-[color:var(--alv-navy)]">
                As-tu déjà acheté ou vendu un bien immobilier ?
              </span>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: "yes" as const, label: "Oui" },
                  { value: "no" as const, label: "Non" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("hasExperience", option.value)}
                    className={clsx(
                      optionBaseClass,
                      "max-w-[200px]",
                      data.hasExperience === option.value
                        ? "border-[rgba(16,185,129,0.5)] bg-[rgba(16,185,129,0.08)] shadow-[0_14px_28px_rgba(16,185,129,0.18)] text-[color:var(--alv-navy)]"
                        : "border-[rgba(148,197,255,0.28)] bg-white/90 text-slate-600 hover:border-[rgba(16,185,129,0.35)] hover:bg-[rgba(134,239,172,0.15)]"
                    )}
                  >
                    <span className="text-sm font-semibold">{option.label}</span>
                  </button>
                ))}
              </div>
              {showValidation && !data.hasExperience && renderValidationMessage("Précise ton expérience immobilière.")}
            </div>
          </div>
        );
      case "project":
        return (
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-sm font-semibold text-[color:var(--alv-navy)]">
                Quel est ton projet ?
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { value: "sell" as const, label: "Vendre un bien" },
                  { value: "estimate" as const, label: "Faire estimer mon bien" },
                  { value: "buy" as const, label: "Acheter pour y habiter" },
                  { value: "invest" as const, label: "Investir (locatif)" },
                  { value: "other" as const, label: "Autre" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("projectType", option.value)}
                    className={clsx(
                      optionBaseClass,
                      data.projectType === option.value
                        ? "border-[rgba(236,72,153,0.55)] bg-[rgba(236,72,153,0.08)] shadow-[0_16px_32px_rgba(236,72,153,0.18)] text-[color:var(--alv-navy)]"
                        : "border-[rgba(148,197,255,0.28)] bg-white/90 text-slate-600 hover:border-[rgba(236,72,153,0.4)] hover:bg-[rgba(248,187,208,0.16)]"
                    )}
                  >
                    <span className="text-sm font-semibold">{option.label}</span>
                  </button>
                ))}
              </div>
              {data.projectType === "other" && (
                <div className="space-y-2">
                  <label htmlFor="projectTypeOther" className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(71,85,105,0.8)]">
                    Précise ton projet
                  </label>
                  <input
                    id="projectTypeOther"
                    type="text"
                    value={data.projectTypeOther}
                    onChange={(event) => updateField("projectTypeOther", event.target.value)}
                    placeholder="Ex : Vente en viager, projet mixte…"
                    className={clsx(
                      inputClass,
                      showValidation && data.projectType === "other" && !data.projectTypeOther.trim() && "border-rose-300"
                    )}
                  />
                </div>
              )}
              {showValidation && !data.projectType && renderValidationMessage("Sélectionne ton projet.")}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="projectLocation" className="text-sm font-semibold text-[color:var(--alv-navy)]">
                  Adresse du bien / zone de recherche
                </label>
                <input
                  id="projectLocation"
                  type="text"
                  value={data.projectLocation}
                  onChange={(event) => updateField("projectLocation", event.target.value)}
                  placeholder="Commune, quartier, adresse précise…"
                  className={clsx(
                    inputClass,
                    showValidation && !data.projectLocation.trim() && "border-rose-300"
                  )}
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm font-semibold text-[color:var(--alv-navy)]">Type de bien</span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: "house" as const, label: "Maison" },
                    { value: "apartment" as const, label: "Appartement" },
                    { value: "building" as const, label: "Immeuble" },
                    { value: "land" as const, label: "Terrain" },
                    { value: "commercial" as const, label: "Local commercial" },
                    { value: "other" as const, label: "Autre" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField("propertyType", option.value)}
                      className={clsx(
                        optionBaseClass,
                        data.propertyType === option.value
                          ? "border-[rgba(59,130,246,0.55)] bg-[rgba(59,130,246,0.08)] shadow-[0_16px_32px_rgba(59,130,246,0.18)] text-[color:var(--alv-navy)]"
                          : "border-[rgba(148,197,255,0.28)] bg-white/90 text-slate-600 hover:border-[rgba(59,130,246,0.45)] hover:bg-[rgba(148,197,255,0.12)]"
                      )}
                    >
                      <span className="text-sm font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>
                {data.propertyType === "other" && (
                  <div className="space-y-2">
                    <label htmlFor="propertyTypeOther" className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(71,85,105,0.8)]">
                      Précise le type de bien
                    </label>
                    <input
                      id="propertyTypeOther"
                      type="text"
                      value={data.propertyTypeOther}
                      onChange={(event) => updateField("propertyTypeOther", event.target.value)}
                      placeholder="Précision sur le type de bien…"
                      className={clsx(
                        inputClass,
                        showValidation &&
                          data.propertyType === "other" &&
                          !data.propertyTypeOther.trim() &&
                          "border-rose-300"
                      )}
                    />
                  </div>
                )}
                {showValidation && !data.propertyType && renderValidationMessage("Indique le type de bien.")}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="propertyDetails" className="text-sm font-semibold text-[color:var(--alv-navy)]">
                  Surface approximative / caractéristiques
                </label>
                <textarea
                  id="propertyDetails"
                  value={data.propertyDetails}
                  onChange={(event) => updateField("propertyDetails", event.target.value)}
                  placeholder="Ex : 120 m², 3 chambres, terrain 800 m², exposition sud…"
                  className={clsx(
                    textareaClass,
                    showValidation && !data.propertyDetails.trim() && "border-rose-300"
                  )}
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm font-semibold text-[color:var(--alv-navy)]">État du bien</span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: "new" as const, label: "Neuf" },
                    { value: "good" as const, label: "Bon état" },
                    { value: "light" as const, label: "Travaux légers" },
                    { value: "heavy" as const, label: "Travaux lourds" },
                    { value: "full" as const, label: "À rénover entièrement" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField("propertyCondition", option.value)}
                      className={clsx(
                        optionBaseClass,
                        data.propertyCondition === option.value
                          ? "border-[rgba(16,185,129,0.55)] bg-[rgba(16,185,129,0.08)] shadow-[0_16px_32px_rgba(16,185,129,0.18)] text-[color:var(--alv-navy)]"
                          : "border-[rgba(148,197,255,0.28)] bg-white/90 text-slate-600 hover:border-[rgba(16,185,129,0.5)] hover:bg-[rgba(167,243,208,0.18)]"
                      )}
                    >
                      <span className="text-sm font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>
                {showValidation && !data.propertyCondition && renderValidationMessage("Sélectionne l'état du bien.")}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="motivation" className="text-sm font-semibold text-[color:var(--alv-navy)]">
                Motivation pour vendre / acheter / investir
              </label>
              <textarea
                id="motivation"
                value={data.motivation}
                onChange={(event) => updateField("motivation", event.target.value)}
                placeholder="Contexte, raisons profondes, enjeux personnels…"
                className={clsx(textareaClass, showValidation && !data.motivation.trim() && "border-rose-300")}
                required
              />
              {showValidation && !data.motivation.trim() && renderValidationMessage("Décris ta motivation.")}
            </div>
          </div>
        );
      case "timeline":
        return (
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-sm font-semibold text-[color:var(--alv-navy)]">Ton calendrier idéal</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { value: "now" as const, label: "Immédiat (0-3 mois)" },
                  { value: "soon" as const, label: "Prévu bientôt (3-6 mois)" },
                  { value: "later" as const, label: "Plus tard (6-12 mois)" },
                  { value: "thinking" as const, label: "Juste en réflexion" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("timeline", option.value)}
                    className={clsx(
                      optionBaseClass,
                      data.timeline === option.value
                        ? "border-[rgba(59,130,246,0.55)] bg-[rgba(59,130,246,0.1)] shadow-[0_16px_32px_rgba(59,130,246,0.18)] text-[color:var(--alv-navy)]"
                        : "border-[rgba(148,197,255,0.28)] bg-white/90 text-slate-600 hover:border-[rgba(59,130,246,0.45)] hover:bg-[rgba(148,197,255,0.12)]"
                    )}
                  >
                    <span className="text-sm font-semibold">{option.label}</span>
                  </button>
                ))}
              </div>
              {showValidation && !data.timeline && renderValidationMessage("Choisis ton horizon temporel.")}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <span className="text-sm font-semibold text-[color:var(--alv-navy)]">
                  As-tu déjà un financement ?
                </span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: "approved" as const, label: "Oui, accord bancaire" },
                    { value: "progress" as const, label: "Oui, en cours" },
                    { value: "none" as const, label: "Non, pas encore" },
                    { value: "cash" as const, label: "Je finance cash" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField("financingStatus", option.value)}
                      className={clsx(
                        optionBaseClass,
                        data.financingStatus === option.value
                          ? "border-[rgba(16,185,129,0.55)] bg-[rgba(16,185,129,0.1)] shadow-[0_16px_32px_rgba(16,185,129,0.18)] text-[color:var(--alv-navy)]"
                          : "border-[rgba(148,197,255,0.28)] bg-white/90 text-slate-600 hover:border-[rgba(16,185,129,0.45)] hover:bg-[rgba(56,189,248,0.1)]"
                      )}
                    >
                      <span className="text-sm font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>
                {showValidation && !data.financingStatus && renderValidationMessage("Précise ton financement.")}
              </div>
              <div className="space-y-3">
                <span className="text-sm font-semibold text-[color:var(--alv-navy)]">
                  Souhaites-tu vendre avant d'acheter ?
                </span>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { value: "yes" as const, label: "Oui" },
                    { value: "no" as const, label: "Non" },
                    { value: "na" as const, label: "Pas concerné" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField("sellBeforeBuy", option.value)}
                      className={clsx(
                        optionBaseClass,
                        data.sellBeforeBuy === option.value
                          ? "border-[rgba(236,72,153,0.55)] bg-[rgba(236,72,153,0.1)] shadow-[0_16px_32px_rgba(236,72,153,0.18)] text-[color:var(--alv-navy)]"
                          : "border-[rgba(148,197,255,0.28)] bg-white/90 text-slate-600 hover:border-[rgba(236,72,153,0.45)] hover:bg-[rgba(248,187,208,0.16)]"
                      )}
                    >
                      <span className="text-sm font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>
                {showValidation && !data.sellBeforeBuy && renderValidationMessage("Indique ta situation de vente.")}
              </div>
            </div>
          </div>
        );
      case "market":
        return (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="priceExpectation" className="text-sm font-semibold text-[color:var(--alv-navy)]">
                  Prix souhaité / budget envisagé
                </label>
                <input
                  id="priceExpectation"
                  type="text"
                  value={data.priceExpectation}
                  onChange={(event) => updateField("priceExpectation", event.target.value)}
                  placeholder="Ex : Viser 420 000 € / Budget max 280 000 €"
                  className={clsx(
                    inputClass,
                    showValidation && !data.priceExpectation.trim() && "border-rose-300"
                  )}
                />
              </div>
              <div className="space-y-3">
                <span className="text-sm font-semibold text-[color:var(--alv-navy)]">
                  Comment as-tu estimé ce montant ?
                </span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: "pro" as const, label: "Estimation pro" },
                    { value: "personal" as const, label: "Analyse personnelle" },
                    { value: "comparison" as const, label: "Comparaison de biens" },
                    { value: "intuition" as const, label: "Intuition / aucun calcul" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField("priceEstimationMethod", option.value)}
                      className={clsx(
                        optionBaseClass,
                        data.priceEstimationMethod === option.value
                          ? "border-[rgba(59,130,246,0.55)] bg-[rgba(59,130,246,0.1)] shadow-[0_16px_32px_rgba(59,130,246,0.18)] text-[color:var(--alv-navy)]"
                          : "border-[rgba(148,197,255,0.28)] bg-white/90 text-slate-600 hover:border-[rgba(59,130,246,0.45)] hover:bg-[rgba(148,197,255,0.12)]"
                      )}
                    >
                      <span className="text-sm font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>
                {showValidation && !data.priceEstimationMethod && renderValidationMessage("Sélectionne la méthode utilisée.")}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-sm font-semibold text-[color:var(--alv-navy)]">
                As-tu déjà contacté d'autres agences ?
              </span>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: "yes" as const, label: "Oui" },
                  { value: "no" as const, label: "Non" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("contactedAgencies", option.value)}
                    className={clsx(
                      optionBaseClass,
                      "max-w-[200px]",
                      data.contactedAgencies === option.value
                        ? "border-[rgba(16,185,129,0.55)] bg-[rgba(16,185,129,0.1)] shadow-[0_16px_32px_rgba(16,185,129,0.18)] text-[color:var(--alv-navy)]"
                        : "border-[rgba(148,197,255,0.28)] bg-white/90 text-slate-600 hover:border-[rgba(16,185,129,0.45)] hover:bg-[rgba(56,189,248,0.1)]"
                    )}
                  >
                    <span className="text-sm font-semibold">{option.label}</span>
                  </button>
                ))}
              </div>
              {data.contactedAgencies === "yes" && (
                <div className="space-y-2">
                  <label htmlFor="contactedAgencyDetails" className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(71,85,105,0.8)]">
                    Si oui : laquelle et pourquoi ?
                  </label>
                  <textarea
                    id="contactedAgencyDetails"
                    value={data.contactedAgencyDetails}
                    onChange={(event) => updateField("contactedAgencyDetails", event.target.value)}
                    placeholder="Nom de l'agence, ton ressenti, leur proposition…"
                    className={clsx(
                      textareaClass,
                      showValidation &&
                        data.contactedAgencies === "yes" &&
                        !data.contactedAgencyDetails.trim() &&
                        "border-rose-300"
                    )}
                  />
                </div>
              )}
              {showValidation && !data.contactedAgencies && renderValidationMessage("Indique si tu as déjà sollicité d'autres agences.")}
            </div>
          </div>
        );
      case "engagement":
        return (
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-sm font-semibold text-[color:var(--alv-navy)]">
                Comment m'as-tu trouvé ?
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { value: "instagram" as const, label: "Instagram" },
                  { value: "recommendation" as const, label: "Recommandation" },
                  { value: "google" as const, label: "Google" },
                  { value: "agency" as const, label: "Agence ALV" },
                  { value: "other" as const, label: "Autre" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("discoveredVia", option.value)}
                    className={clsx(
                      optionBaseClass,
                      data.discoveredVia === option.value
                        ? "border-[rgba(236,72,153,0.55)] bg-[rgba(236,72,153,0.1)] shadow-[0_16px_32px_rgba(236,72,153,0.18)] text-[color:var(--alv-navy)]"
                        : "border-[rgba(148,197,255,0.28)] bg-white/90 text-slate-600 hover:border-[rgba(236,72,153,0.45)] hover:bg-[rgba(248,187,208,0.18)]"
                    )}
                  >
                    <span className="text-sm font-semibold">{option.label}</span>
                  </button>
                ))}
              </div>
              {data.discoveredVia === "other" && (
                <div className="space-y-2">
                  <label htmlFor="discoveredViaOther" className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(71,85,105,0.8)]">
                    Précision
                  </label>
                  <input
                    id="discoveredViaOther"
                    type="text"
                    value={data.discoveredViaOther}
                    onChange={(event) => updateField("discoveredViaOther", event.target.value)}
                    placeholder="Précise le canal ou la personne…"
                    className={clsx(
                      inputClass,
                      showValidation &&
                        data.discoveredVia === "other" &&
                        !data.discoveredViaOther.trim() &&
                        "border-rose-300"
                    )}
                  />
                </div>
              )}
              {showValidation && !data.discoveredVia && renderValidationMessage("Indique la source du contact.")}
            </div>

            <div className="space-y-2">
              <label htmlFor="reasonToWork" className="text-sm font-semibold text-[color:var(--alv-navy)]">
                Pourquoi veux-tu travailler avec moi en particulier ?
              </label>
              <textarea
                id="reasonToWork"
                value={data.reasonToWork}
                onChange={(event) => updateField("reasonToWork", event.target.value)}
                placeholder="Ce qui t'inspire confiance, ce que tu recherches précisément…"
                className={clsx(textareaClass, showValidation && !data.reasonToWork.trim() && "border-rose-300")}
              />
              {showValidation && !data.reasonToWork.trim() && renderValidationMessage("C'est la question clé : partage ta raison.")}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[color:var(--alv-navy)]">
                  Note ton niveau de motivation
                </span>
                <span className="rounded-full bg-[rgba(16,185,129,0.1)] px-3 py-1 text-xs font-semibold text-emerald-600">
                  {data.motivationLevel} / 10
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={data.motivationLevel}
                onChange={(event) => updateField("motivationLevel", Number(event.target.value))}
                className="w-full accent-[color:var(--alv-navy)]"
              />
              <p className="text-xs text-slate-500">
                0 = simple curiosité • 10 = prêt à avancer dès maintenant.
              </p>
            </div>
          </div>
        );
      case "validation":
        return (
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-sm font-semibold text-[color:var(--alv-navy)]">
                Souhaites-tu être rappelé pour avancer ?
              </span>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: "yes" as const, label: "Oui" },
                  { value: "no" as const, label: "Non, juste des infos" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("callbackPreference", option.value)}
                    className={clsx(
                      optionBaseClass,
                      "max-w-[240px]",
                      data.callbackPreference === option.value
                        ? "border-[rgba(59,130,246,0.55)] bg-[rgba(59,130,246,0.12)] shadow-[0_16px_32px_rgba(59,130,246,0.18)] text-[color:var(--alv-navy)]"
                        : "border-[rgba(148,197,255,0.28)] bg-white/90 text-slate-600 hover:border-[rgba(59,130,246,0.45)] hover:bg-[rgba(148,197,255,0.12)]"
                    )}
                  >
                    <span className="text-sm font-semibold">{option.label}</span>
                  </button>
                ))}
              </div>
              {showValidation && !data.callbackPreference && renderValidationMessage("Précise si tu souhaites un rappel.")}
            </div>

            <div className="space-y-3 rounded-3xl border border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.08)] px-4 py-4 sm:px-6 sm:py-6">
              <div className="flex items-start gap-3">
                <input
                  id="validationAccepted"
                  type="checkbox"
                  checked={data.validationAccepted}
                  onChange={(event) => updateField("validationAccepted", event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[rgba(16,185,129,0.4)] text-[color:var(--alv-emerald)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(16,185,129,0.4)]"
                  required
                />
                <label htmlFor="validationAccepted" className="text-sm font-semibold text-[color:var(--alv-navy)]">
                  Je comprends que cet accompagnement est sélectif.
                </label>
              </div>
              <p className="text-xs text-emerald-700">
                Tu sollicites un chirurgien de l'immobilier : je prends peu de mandats pour garder un niveau d'exigence élevé.
              </p>
              {showValidation && !data.validationAccepted && renderValidationMessage("Accepte les conditions de sélection.")}
            </div>

            <div className="space-y-3 rounded-3xl border border-[rgba(96,165,216,0.3)] bg-[rgba(148,197,255,0.12)] px-4 py-4 sm:px-6 sm:py-6">
              <div className="flex items-start gap-3">
                <input
                  id="commitmentConfirmed"
                  type="checkbox"
                  checked={data.commitmentConfirmed}
                  onChange={(event) => updateField("commitmentConfirmed", event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[rgba(96,165,216,0.4)] text-[color:var(--alv-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(96,165,216,0.4)]"
                  required
                />
                <label htmlFor="commitmentConfirmed" className="text-sm font-semibold text-[color:var(--alv-navy)]">
                  Je confirme que mon projet est sérieux et situé dans le Finistère.
                </label>
              </div>
              <p className="text-xs text-[color:var(--alv-navy)]/70">
                Pour garder du temps pour mes clients engagés, je priorise les projets réalistes et alignés avec ma zone.
              </p>
              {showValidation && !data.commitmentConfirmed && renderValidationMessage("Confirme le sérieux et la localisation du projet.")}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const reviewSections = [
    {
      title: "Profil",
      stepId: "profile" as const,
      items: [
        { label: "Nom", value: data.fullName || "—" },
        { label: "Email", value: data.email || "—" },
        { label: "Téléphone", value: data.phone || "—" },
        { label: "Préférence de contact", value: friendlyValue("contactPreference", data) },
        { label: "Expérience immobilière", value: friendlyValue("hasExperience", data) },
      ],
    },
    {
      title: "Projet",
      stepId: "project" as const,
      items: [
        { label: "Projet", value: friendlyValue("projectType", data) },
        { label: "Adresse / zone", value: data.projectLocation || "—" },
        { label: "Type de bien", value: friendlyValue("propertyType", data) },
        { label: "Caractéristiques", value: data.propertyDetails || "—" },
        { label: "État du bien", value: friendlyValue("propertyCondition", data) },
        { label: "Motivation", value: data.motivation || "—" },
      ],
    },
    {
      title: "Timing & situation",
      stepId: "timeline" as const,
      items: [
        { label: "Calendrier idéal", value: friendlyValue("timeline", data) },
        { label: "Financement", value: friendlyValue("financingStatus", data) },
        { label: "Vendre avant d'acheter", value: friendlyValue("sellBeforeBuy", data) },
      ],
    },
    {
      title: "Marché",
      stepId: "market" as const,
      items: [
        { label: "Prix / budget", value: data.priceExpectation || "—" },
        { label: "Méthode d'estimation", value: friendlyValue("priceEstimationMethod", data) },
        {
          label: "Autres agences",
          value:
            data.contactedAgencies === "yes"
              ? `Oui — ${data.contactedAgencyDetails || "à préciser"}`
              : friendlyValue("contactedAgencies", data),
        },
      ],
    },
    {
      title: "Confiance & motivation",
      stepId: "engagement" as const,
      items: [
        { label: "Origine du contact", value: friendlyValue("discoveredVia", data) },
        { label: "Pourquoi travailler ensemble", value: data.reasonToWork || "—" },
        { label: "Motivation", value: `${data.motivationLevel} / 10` },
      ],
    },
    {
      title: "Validation",
      stepId: "validation" as const,
      items: [
        { label: "Souhaite être rappelé", value: friendlyValue("callbackPreference", data) },
        { label: "Sélectivité acceptée", value: data.validationAccepted ? "Oui" : "Non" },
        { label: "Projet sérieux & Finistère", value: data.commitmentConfirmed ? "Oui" : "Non" },
      ],
    },
  ];

  const statusMessage =
    status === "review"
      ? "Relis ton dossier avant de m'envoyer la version finale."
      : "Ton dossier est prêt. Je reviens vers toi sous 24-72 h si tout est aligné.";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(76,29,149,0.65)]">
            {status === "submitted" ? "Dossier reçu" : "Questionnaire sélection"}
          </p>
          <h2 className="text-2xl font-semibold text-[color:var(--alv-navy)] sm:text-[28px]">
            {status === "submitted" ? "Merci, je prends le relais" : activeStep.label}
          </h2>
          <p className="text-sm text-slate-500 sm:text-base">
            {status === "submitted" ? "Ton projet passe en revue personnelle." : activeStep.subtitle}
          </p>
        </div>
        <div className="flex w-full items-center gap-4 rounded-3xl border border-[rgba(148,197,255,0.32)] bg-white/92 px-4 py-3 shadow-[0_12px_28px_rgba(15,23,42,0.12)] sm:w-auto">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(30,58,95,0.6)]">
              <span>
                {status === "submitted" ? "100%" : `${String(currentStep + 1).padStart(2, "0")} / ${totalSteps.toString().padStart(2, "0")}`}
              </span>
              <span>{status === "submitted" ? "Complet" : "Sélection"}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-[rgba(148,197,255,0.2)]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[color:var(--alv-navy)] via-[color:var(--alv-sky)] to-[color:var(--alv-emerald)] transition-all"
                style={{ width: `${progress}%` }}
                aria-hidden="true"
              />
            </div>
          </div>
          <ShinyText
            text={status === "submitted" ? "Valeur validée" : activeStep.helper}
            speed={status === "submitted" ? 8 : 5}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[rgba(30,58,95,0.78)]"
          />
        </div>
      </div>

      {status === "review" || status === "submitted" ? (
        <div className={sectionCardClass}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(76,29,149,0.65)]">
                {status === "submitted" ? "Traitement en cours" : "Relecture finale"}
              </p>
              <h3 className="text-xl font-semibold text-[color:var(--alv-navy)] sm:text-2xl">
                {status === "submitted" ? "Je passe ton dossier au peigne fin" : "Garde 30 secondes pour relire"}
              </h3>
              <p className="text-sm text-slate-600 sm:text-base">{statusMessage}</p>
            </div>
            {status === "review" && (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-[color:var(--alv-navy)] via-[color:var(--alv-sky)] to-[color:var(--alv-emerald)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/60"
              >
                Soumettre mon projet
              </button>
            )}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {reviewSections.map((section) => (
              <div
                key={section.title}
                className="rounded-3xl border border-[rgba(148,197,255,0.28)] bg-white/92 p-5 shadow-[0_12px_24px_rgba(15,23,42,0.12)]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgba(30,58,95,0.68)]">
                    {section.title}
                  </p>
                  {status === "review" && (
                    <button
                      type="button"
                      onClick={() => {
                        const index = steps.findIndex((s) => s.id === section.stepId);
                        goToStep(index === -1 ? 0 : index);
                      }}
                      className="text-xs font-semibold text-[color:var(--alv-sky)] underline-offset-4 hover:underline"
                    >
                      Modifier
                    </button>
                  )}
                </div>
                <dl className="space-y-2 text-sm text-slate-600">
                  {section.items.map((item) => (
                    <div key={item.label} className="flex flex-col gap-1">
                      <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[rgba(30,58,95,0.6)]">
                        {item.label}
                      </dt>
                      <dd className="rounded-2xl bg-[rgba(148,197,255,0.12)] px-3.5 py-2 text-[color:var(--alv-navy)]">
                        {item.value || "—"}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {status === "submitted" && (
            <div className="mt-8 rounded-3xl border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.08)] px-6 py-5 text-sm text-[color:var(--alv-navy)] shadow-[0_16px_36px_rgba(16,185,129,0.22)]">
              <p className="font-semibold text-emerald-700">Merci pour ton envoi 🙏</p>
              <p className="mt-2 text-[color:var(--alv-navy)]">
                Je vais analyser ton projet avec attention. Si ton dossier matche mes critères (zone Finistère & méthode),
                je te recontacte sous 24-72 h pour la suite. Tu reçois aussi une copie de ton dossier par email si tu te l'envoies via le bouton ci-dessous.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Magnet>
                  <button
                    type="button"
                    onClick={copyDossier}
                    className="inline-flex items-center justify-center gap-2 rounded-3xl border border-[rgba(16,185,129,0.35)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--alv-navy)] shadow-[0_16px_32px_rgba(16,185,129,0.18)] transition hover:-translate-y-0.5"
                  >
                    {copied ? "Copié ✅" : "Copier le dossier"}
                  </button>
                </Magnet>
                {contactEmail && (
                  <button
                    type="button"
                    onClick={() => {
                      const subject = encodeURIComponent("Dossier projet immobilier - Sélection");
                      const body = encodeURIComponent(dossierText);
                      if (typeof window !== "undefined") {
                        window.open(`mailto:${contactEmail}?subject=${subject}&body=${body}`, "_blank");
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-3xl border border-[rgba(59,130,246,0.4)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--alv-navy)] shadow-[0_16px_32px_rgba(59,130,246,0.18)] transition hover:-translate-y-0.5"
                  >
                    S'envoyer une copie
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={sectionCardClass}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(76,29,149,0.65)]">
                Étape {String(currentStep + 1).padStart(2, "0")} · {activeStep.label}
              </p>
              <h3 className="text-xl font-semibold text-[color:var(--alv-navy)] sm:text-2xl">
                {activeStep.subtitle}
              </h3>
              <p className="text-sm text-slate-600 sm:text-base">{activeStep.helper}</p>
            </div>
            <div className="flex gap-2">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    if (index <= currentStep) goToStep(index);
                  }}
                  className={clsx(
                    "h-10 w-10 rounded-full border text-xs font-semibold transition",
                    index === currentStep
                      ? "border-[rgba(59,130,246,0.55)] bg-[rgba(59,130,246,0.12)] text-[color:var(--alv-navy)]"
                      : index < currentStep
                        ? "border-[rgba(16,185,129,0.45)] bg-[rgba(16,185,129,0.12)] text-[color:var(--alv-navy)] hover:border-[rgba(16,185,129,0.6)]"
                        : "border-[rgba(148,197,255,0.28)] bg-white/80 text-slate-400"
                  )}
                  aria-label={`Aller à l'étape ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-8">{renderStepContent()}</div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-slate-500">
              {showValidation && !isStepValid(activeStep, data)
                ? "Complète les points en surbrillance pour continuer."
                : "Ton temps est précieux : 2 minutes suffisent si tu as déjà réfléchi à ton projet."}
            </div>
            <div className="flex flex-wrap gap-3">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="inline-flex items-center justify-center rounded-3xl border border-[rgba(148,197,255,0.4)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--alv-navy)] shadow-[0_12px_24px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5"
                >
                  Revenir en arrière
                </button>
              )}
              <Magnet>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-[color:var(--alv-navy)] via-[color:var(--alv-sky)] to-[color:var(--alv-emerald)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/60"
                >
                  {currentStep === totalSteps - 1 ? "Prévisualiser mon dossier" : "Étape suivante"}
                </button>
              </Magnet>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
