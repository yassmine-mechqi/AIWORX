"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, BriefcaseBusiness, Building2, Check, CheckCircle2, ClipboardCheck, FileCheck2, FileText, Globe2, LockKeyhole, ShieldCheck, UploadCloud, UserRound, X } from "lucide-react";

const categories = ["web", "apps", "marketing", "design", "ai", "consulting"] as const;
const languages = ["fr", "en", "ar"] as const;
type FormData = {
  fullName: string; email: string; password: string; confirm: string;
  providerType: string; company: string; country: string; city: string; bio: string;
  categories: string[]; skills: string; sectors: string; experience: string; languages: string[];
  website: string; portfolio: string; reference: string; consent: boolean;
};
const emptyForm: FormData = { fullName: "", email: "", password: "", confirm: "", providerType: "freelance", company: "", country: "Maroc", city: "", bio: "", categories: [], skills: "", sectors: "", experience: "", languages: ["fr"], website: "", portfolio: "", reference: "", consent: false };

const words = {
  fr: {
    eyebrow: "Rejoignez le réseau AIWORX", title: "Faites reconnaître votre expertise.", subtitle: "Présentez votre activité et vos réalisations. Chaque candidature est examinée par l’équipe AIWORX avant l’accès aux opportunités.",
    steps: ["Votre compte", "Votre activité", "Expertises", "Portfolio & documents", "Vérification"],
    asideTitle: "Une sélection transparente", asideText: "Les prestataires sont vérifiés avant de recevoir des opportunités.",
    stages: ["Dossier en brouillon", "Vérification des informations", "Compléments éventuellement requis", "Test adapté aux compétences", "Validation manuelle AIWORX"],
    accountTitle: "Créez votre compte prestataire", accountHint: "Ces informations servent à créer votre accès et à vous contacter au sujet de votre candidature.",
    name: "Nom complet", email: "Adresse e-mail", password: "Mot de passe", confirm: "Confirmer le mot de passe",
    activityTitle: "Présentez votre activité", activityHint: "Ces informations seront examinées par AIWORX. Vos coordonnées ne seront pas affichées sur votre profil public.",
    type: "Votre statut", freelance: "Indépendant(e)", agency: "Agence / entreprise", company: "Nom professionnel ou de l’entreprise", country: "Pays", city: "Ville", bio: "Présentation professionnelle", bioPlaceholder: "Votre expérience, votre approche et le type de projets que vous accompagnez…",
    skillsTitle: "Où se situe votre expertise ?", skillsHint: "Choisissez vos catégories, puis décrivez vos compétences et vos secteurs d’expérience.", categoriesTitle: "Catégories de services", categoryNames: { web: "Sites web & e-commerce", apps: "Applications & logiciels", marketing: "Marketing digital", design: "Design & contenu", ai: "IA & automatisation", consulting: "Conseil & transformation" },
    skills: "Compétences principales", skillsPlaceholder: "Ex. : Next.js, Shopify, Figma…", sectors: "Secteurs d’expérience", sectorsPlaceholder: "Ex. : commerce, éducation, tourisme…", experience: "Années d’expérience", langs: "Langues de travail",
    portfolioTitle: "Montrez votre travail", portfolioHint: "Ajoutez des liens de portfolio et des références. Les documents légaux requis dépendront de votre statut et seront précisés pendant la vérification.", website: "Site web professionnel (facultatif)", portfolio: "Lien vers portfolio ou réalisations", reference: "Référence professionnelle ou client (facultatif)", documents: "Documents justificatifs", upload: "Choisir des documents", fileHint: "PDF, JPG ou PNG. La liste exacte dépendra de votre statut.", privacy: "Prototype frontend : les fichiers sélectionnés restent dans cette page et ne sont pas téléversés. La transmission sécurisée sera activée avec le backend.",
    verificationTitle: "Vérifiez votre candidature", verificationHint: "Après transmission réelle, AIWORX vérifiera votre identité, vos informations professionnelles, vos références et les documents requis.", testTitle: "Évaluation des compétences", testText: "Après l’étude du dossier, un test adapté aux catégories choisies pourra vous être proposé.", manualTitle: "Décision humaine", manualText: "L’accès complet aux opportunités est accordé après validation manuelle par AIWORX.", consent: "Je confirme l’exactitude des informations et j’accepte que AIWORX les utilise pour examiner ma candidature.",
    back: "Retour", next: "Continuer", submit: "Préparer ma candidature", doneTitle: "Votre dossier est prêt", doneText: "Le formulaire a été vérifié dans cette démo. Il n’a pas été transmis : la création de compte, la vérification de l’e-mail et l’envoi sécurisé des documents nécessitent un backend.", doneBack: "Modifier mon dossier", login: "Vous avez déjà un compte ?", loginLink: "Se connecter", required: "Ce champ est obligatoire.", invalidEmail: "Saisissez une adresse e-mail valide.", badPassword: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.", match: "Les mots de passe ne correspondent pas.", chooseCategory: "Sélectionnez au moins une catégorie.", chooseLanguage: "Choisissez au moins une langue.", consentError: "Veuillez confirmer avant de continuer.", progress: "Étape", verifiedBadge: "Examen humain", demo: "Candidature de démonstration",
  },
  en: {
    eyebrow: "Join the AIWORX network", title: "Put your expertise forward.", subtitle: "Tell us about your work and experience. Every application is reviewed by the AIWORX team before access to opportunities.",
    steps: ["Your account", "Your business", "Expertise", "Portfolio & documents", "Verification"],
    asideTitle: "A transparent review", asideText: "Providers are reviewed before they receive opportunities.",
    stages: ["Application draft", "Information review", "Additional information if needed", "Skills test", "Manual AIWORX approval"],
    accountTitle: "Create your provider account", accountHint: "We use these details to set up access and contact you about your application.",
    name: "Full name", email: "Email address", password: "Password", confirm: "Confirm password",
    activityTitle: "Tell us about your business", activityHint: "AIWORX will review this information. Your contact details will not appear on your public profile.",
    type: "Business type", freelance: "Freelancer", agency: "Agency / company", company: "Professional or company name", country: "Country", city: "City", bio: "Professional introduction", bioPlaceholder: "Your experience, approach and the kind of projects you work on…",
    skillsTitle: "What is your expertise?", skillsHint: "Choose your service categories, then describe your skills and industries.", categoriesTitle: "Service categories", categoryNames: { web: "Websites & e-commerce", apps: "Applications & software", marketing: "Digital marketing", design: "Design & content", ai: "AI & automation", consulting: "Consulting & transformation" },
    skills: "Main skills", skillsPlaceholder: "E.g. Next.js, Shopify, Figma…", sectors: "Industries", sectorsPlaceholder: "E.g. retail, education, tourism…", experience: "Years of experience", langs: "Working languages",
    portfolioTitle: "Show your work", portfolioHint: "Add portfolio links and references. The exact legal documents depend on your status and will be confirmed during review.", website: "Professional website (optional)", portfolio: "Portfolio or work samples link", reference: "Professional or client reference (optional)", documents: "Supporting documents", upload: "Choose documents", fileHint: "PDF, JPG or PNG. Required documents depend on your business status.", privacy: "Frontend prototype: selected files stay in this page and are not uploaded. Secure transfer will be enabled with the backend.",
    verificationTitle: "Review your application", verificationHint: "After actual submission, AIWORX will check your identity, business details, references and required documents.", testTitle: "Skills assessment", testText: "After reviewing your application, we may invite you to a test tailored to your selected categories.", manualTitle: "Human decision", manualText: "Full access to opportunities follows manual approval by AIWORX.", consent: "I confirm that the information is accurate and agree that AIWORX may use it to review my application.",
    back: "Back", next: "Continue", submit: "Prepare my application", doneTitle: "Your application is ready", doneText: "The form was checked in this demo. It was not submitted: account creation, email verification and secure document transfer require a backend.", doneBack: "Edit my application", login: "Already have an account?", loginLink: "Sign in", required: "This field is required.", invalidEmail: "Enter a valid email address.", badPassword: "Use at least 8 characters, an uppercase letter, a number and a special character.", match: "Passwords do not match.", chooseCategory: "Select at least one category.", chooseLanguage: "Select at least one language.", consentError: "Please confirm before continuing.", progress: "Step", verifiedBadge: "Human review", demo: "Application demo",
  },
} as const;

export default function BecomeProviderPage() {
  const en = useLocale() === "en";
  const t = en ? words.en : words.fr;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const update = (key: keyof FormData, value: string | boolean | string[]) => setForm((current) => ({ ...current, [key]: value }));
  const toggleArray = (key: "categories" | "languages", value: string) => {
    const current = form[key];
    update(key, current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };
  const toggleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(event.target.files ?? []));
  };
  const validate = () => {
    const nextErrors: string[] = [];
    if (step === 0) {
      if (!form.fullName.trim()) nextErrors.push("fullName");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.push("email");
      if (form.password.length < 8 || !/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) nextErrors.push("password");
      if (form.confirm !== form.password) nextErrors.push("confirm");
    }
    if (step === 1 && (!form.providerType || !form.country || !form.city.trim() || form.bio.trim().length < 30)) nextErrors.push("activity");
    if (step === 2) {
      if (!form.categories.length) nextErrors.push("categories");
      if (!form.skills.trim()) nextErrors.push("skills");
      if (!form.languages.length) nextErrors.push("languages");
    }
    if (step === 3 && !form.portfolio.trim() && !form.website.trim()) nextErrors.push("portfolio");
    if (step === 4 && !form.consent) nextErrors.push("consent");
    setErrors(nextErrors);
    return nextErrors.length === 0;
  };
  const next = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    if (step < 4) setStep((current) => current + 1);
    else setDone(true);
  };
  const fieldError = (name: string, label: string) => errors.includes(name) ? <span className="bp-error" role="alert">{label}</span> : null;
  const textField = (key: keyof FormData, label: string, placeholder: string, type = "text", required = true) => (
    <label className="bp-field"><span>{label}{required && <i> *</i>}</span><input type={type} value={form[key] as string} onChange={(event) => update(key, event.target.value)} placeholder={placeholder} />{required && errors.includes(String(key)) && fieldError(String(key), t.required)}</label>
  );

  const stepIcons = [UserRound, Building2, BriefcaseBusiness, FileText, ClipboardCheck];
  const categoryNames = t.categoryNames as Record<(typeof categories)[number], string>;
  const langLabels = en ? { fr: "French", en: "English", ar: "Arabic" } : { fr: "Français", en: "Anglais", ar: "Arabe" };

  return (
    <main className="bp-page">
      <section className="bp-hero"><div className="bp-shell"><div className="bp-eyebrow"><span />{t.eyebrow}</div><h1>{t.title}</h1><p>{t.subtitle}</p><div className="bp-proof"><span><ShieldCheck size={17} />{t.verifiedBadge}</span><span><FileCheck2 size={17} />{en ? "Verified work history" : "Références examinées"}</span><span><LockKeyhole size={17} />{en ? "Protected information" : "Informations protégées"}</span></div></div></section>
      <div className="bp-shell bp-layout">
        <aside className="bp-sidebar"><div className="bp-aside-icon"><BadgeCheck size={24} /></div><h2>{t.asideTitle}</h2><p>{t.asideText}</p><ol>{t.stages.map((stage, index) => <li key={stage} className={index === step ? "current" : index < step ? "complete" : ""}><span>{index < step ? <Check size={14} /> : index + 1}</span>{stage}</li>)}</ol><div className="bp-side-note"><ShieldCheck size={16} /><span>{en ? "Final approval remains with the AIWORX team." : "La validation finale reste effectuée par l’équipe AIWORX."}</span></div></aside>
        <section className="bp-card">
          {!done ? <>
            <div className="bp-progress"><div><span>{t.progress} {step + 1} / 5</span><strong>{t.steps[step]}</strong></div><div className="bp-progress-track"><i style={{ width: `${((step + 1) / 5) * 100}%` }} /></div></div>
            <form onSubmit={next} noValidate>
              {step === 0 && <section className="bp-step"><div className="bp-step-icon"><UserRound size={21} /></div><h2>{t.accountTitle}</h2><p>{t.accountHint}</p><div className="bp-grid">{textField("fullName", t.name, en ? "Your full name" : "Votre nom complet")}{textField("email", t.email, en ? "you@example.com" : "vous@exemple.com", "email")}</div><div className="bp-grid">{textField("password", t.password, "••••••••", "password")}{textField("confirm", t.confirm, "••••••••", "password")}</div>{errors.includes("password") && fieldError("password", t.badPassword)}{errors.includes("confirm") && fieldError("confirm", t.match)}<div className="bp-hint"><LockKeyhole size={15} />{en ? "At least 8 characters, uppercase, number and special character." : "8 caractères minimum, une majuscule, un chiffre et un caractère spécial."}</div></section>}
              {step === 1 && <section className="bp-step"><div className="bp-step-icon"><Building2 size={21} /></div><h2>{t.activityTitle}</h2><p>{t.activityHint}</p><fieldset className="bp-choice-field"><legend>{t.type} *</legend><div className="bp-choice-row"><label className={form.providerType === "freelance" ? "selected" : ""}><input type="radio" name="providerType" checked={form.providerType === "freelance"} onChange={() => update("providerType", "freelance")} /><UserRound size={18} />{t.freelance}</label><label className={form.providerType === "agency" ? "selected" : ""}><input type="radio" name="providerType" checked={form.providerType === "agency"} onChange={() => update("providerType", "agency")} /><Building2 size={18} />{t.agency}</label></div></fieldset><div className="bp-grid">{textField("company", t.company, en ? "Professional or company name" : "Nom professionnel ou entreprise", "text", false)}<label className="bp-field"><span>{t.country} *</span><select value={form.country} onChange={(event) => update("country", event.target.value)}><option value="Maroc">{en ? "Morocco" : "Maroc"}</option><option value="France">France</option><option value="Belgique">{en ? "Belgium" : "Belgique"}</option><option value="Autre">{en ? "Other" : "Autre"}</option></select></label></div>{textField("city", t.city, en ? "Your city" : "Votre ville")}<label className="bp-field"><span>{t.bio} * <small>(30 {en ? "characters minimum" : "caractères minimum"})</small></span><textarea value={form.bio} onChange={(event) => update("bio", event.target.value)} placeholder={t.bioPlaceholder} rows={4} /></label>{errors.includes("activity") && fieldError("activity", t.required)}</section>}
              {step === 2 && <section className="bp-step"><div className="bp-step-icon"><BriefcaseBusiness size={21} /></div><h2>{t.skillsTitle}</h2><p>{t.skillsHint}</p><fieldset className="bp-category-field"><legend>{t.categoriesTitle} *</legend><div className="bp-category-grid">{categories.map((category) => { const selected = form.categories.includes(category); const labels = categoryNames[category]; return <label key={category} className={selected ? "selected" : ""}><input type="checkbox" checked={selected} onChange={() => toggleArray("categories", category)} /><span>{labels}</span><i>{selected && <Check size={14} />}</i></label>; })}</div></fieldset>{errors.includes("categories") && fieldError("categories", t.chooseCategory)}<div className="bp-grid">{textField("skills", t.skills, t.skillsPlaceholder)}{textField("sectors", t.sectors, t.sectorsPlaceholder, "text", false)}</div><div className="bp-grid"><label className="bp-field"><span>{t.experience}</span><select value={form.experience} onChange={(event) => update("experience", event.target.value)}><option value="">{en ? "Select" : "Sélectionner"}</option><option value="0-2">0–2</option><option value="3-5">3–5</option><option value="6-10">6–10</option><option value="10+">10+</option></select></label><fieldset className="bp-language"><legend>{t.langs} *</legend><div>{languages.map((lang) => <label key={lang}><input type="checkbox" checked={form.languages.includes(lang)} onChange={() => toggleArray("languages", lang)} />{langLabels[lang]}</label>)}</div></fieldset></div>{errors.includes("languages") && fieldError("languages", t.chooseLanguage)}</section>}
              {step === 3 && <section className="bp-step"><div className="bp-step-icon"><FileText size={21} /></div><h2>{t.portfolioTitle}</h2><p>{t.portfolioHint}</p>{textField("website", t.website, "https://…", "url", false)}{textField("portfolio", t.portfolio, "https://…", "url", false)}{textField("reference", t.reference, en ? "Name or professional reference" : "Nom ou référence professionnelle", "text", false)}{errors.includes("portfolio") && fieldError("portfolio", en ? "Add a portfolio or professional website link." : "Ajoutez un lien vers votre portfolio ou votre site professionnel.")}<label className="bp-field"><span>{t.documents}</span><div className="bp-upload"><UploadCloud size={22} /><strong>{t.upload}</strong><small>{t.fileHint}</small><input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={toggleFiles} /></div></label>{files.length > 0 && <ul className="bp-file-list">{files.map((file) => <li key={`${file.name}-${file.size}`}><FileText size={15} />{file.name}<button type="button" onClick={() => setFiles((current) => current.filter((f) => f !== file))} aria-label={en ? "Remove file" : "Supprimer le fichier"}><X size={15} /></button></li>)}</ul>}<div className="bp-privacy-note"><LockKeyhole size={16} /><span>{t.privacy}</span></div></section>}
              {step === 4 && <section className="bp-step"><div className="bp-step-icon"><ClipboardCheck size={21} /></div><h2>{t.verificationTitle}</h2><p>{t.verificationHint}</p><div className="bp-review"><div><span>{t.name}</span><strong>{form.fullName}</strong></div><div><span>{t.email}</span><strong>{form.email}</strong></div><div><span>{t.type}</span><strong>{form.providerType === "agency" ? t.agency : t.freelance}</strong></div><div><span>{t.categoriesTitle}</span><strong>{form.categories.map((category) => categoryNames[category as keyof typeof categoryNames]).join(", ")}</strong></div><div><span>{t.skills}</span><strong>{form.skills}</strong></div><div><span>{t.documents}</span><strong>{files.length ? `${files.length} ${en ? "file(s) selected" : "fichier(s) sélectionné(s)"}` : en ? "None selected" : "Aucun document sélectionné"}</strong></div></div><div className="bp-requirement-cards"><article><FileCheck2 size={19} /><strong>{en ? "Document review" : "Vérification des documents"}<small>{en ? "According to your status" : "Selon votre statut"}</small></strong></article><article><BriefcaseBusiness size={19} /><strong>{t.testTitle}<small>{en ? "If required after review" : "Si nécessaire après examen"}</small></strong></article><article><ShieldCheck size={19} /><strong>{en ? "Manual approval" : "Validation manuelle"}<small>AIWORX</small></strong></article></div><p className="bp-test-note">{t.testText} {t.manualText}</p><label className="bp-consent"><input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} /><span>{t.consent} *</span></label>{errors.includes("consent") && fieldError("consent", t.consentError)}</section>}
              <div className="bp-actions">{step > 0 ? <button className="bp-back" type="button" onClick={() => { setErrors([]); setStep((current) => current - 1); }}><ArrowLeft size={16} />{t.back}</button> : <span />}{step < 4 ? <button className="bp-next" type="submit">{t.next}<ArrowRight size={16} /></button> : <button className="bp-next" type="submit">{t.submit}<ArrowRight size={16} /></button>}</div>
            </form>
          </> : <div className="bp-done"><div><CheckCircle2 size={30} /></div><span>{t.demo}</span><h2>{t.doneTitle}</h2><p>{t.doneText}</p><button type="button" onClick={() => { setDone(false); setStep(0); }}>{t.doneBack}</button></div>}
          <p className="bp-login">{t.login} <Link href="/connexion">{t.loginLink}</Link></p>
        </section>
      </div>
    </main>
  );
}

function CheckMark(): ReactNode { return <Check size={15} />; }
