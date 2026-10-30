"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Building2, Check, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";

export default function CompanySignupPage() {
  const en = useLocale() === "en";
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [consent, setConsent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const passwordValid = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password);
  const copy = en
    ? {
        eyebrow: "Company account", headline: <>Build your projects with <em>AIWORX.</em></>, intro: "Create your company account to publish needs and follow your projects.",
        title: "Create a company account", subtitle: "Enter the details of the account representative.", name: "Full name", company: "Company name", email: "Work email", password: "Password", confirm: "Confirm password",
        passwordHint: "At least 8 characters, uppercase letter, number and special character.", consent: "I agree to the terms of use and privacy policy.", submit: "Prepare my account", demo: "Frontend demo: this form does not create an account or send an email until the backend is connected.",
        back: "Choose another account type", login: "Already have an account?", signIn: "Sign in", invalid: "Please check the required fields.", done: "The information is valid for this demo. No account was created because the backend is not connected.",
        required: "This field is required.", emailError: "Enter a valid email address.", passwordError: "Your password does not meet the requirements.", mismatch: "Passwords do not match.", consentError: "Please accept to continue.",
      }
    : {
        eyebrow: "Compte entreprise", headline: <>Donnez vie à vos projets avec <em>AIWORX.</em></>, intro: "Créez votre compte entreprise pour publier des besoins et suivre vos projets.",
        title: "Créer un compte entreprise", subtitle: "Renseignez les informations du représentant du compte.", name: "Nom complet", company: "Nom de l’entreprise", email: "E-mail professionnel", password: "Mot de passe", confirm: "Confirmer le mot de passe",
        passwordHint: "8 caractères minimum, une majuscule, un chiffre et un caractère spécial.", consent: "J’accepte les conditions d’utilisation et la politique de confidentialité.", submit: "Préparer mon compte", demo: "Démo frontend : ce formulaire ne crée pas de compte et n’envoie pas d’e-mail tant que le backend n’est pas connecté.",
        back: "Choisir un autre type de compte", login: "Vous avez déjà un compte ?", signIn: "Se connecter", invalid: "Vérifiez les champs obligatoires.", done: "Les informations sont valides pour cette démo. Aucun compte n’a été créé, car le backend n’est pas connecté.",
        required: "Ce champ est obligatoire.", emailError: "Saisissez une adresse e-mail valide.", passwordError: "Le mot de passe ne respecte pas les conditions.", mismatch: "Les mots de passe ne correspondent pas.", consentError: "Veuillez accepter pour continuer.",
      };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const next: string[] = [];
    if (!name.trim()) next.push("name");
    if (!company.trim()) next.push("company");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.push("email");
    if (!passwordValid) next.push("password");
    if (confirmation !== password || !confirmation) next.push("confirmation");
    if (!consent) next.push("consent");
    setErrors(next);
    if (next.length) return;
    setMessage(copy.done);
  }

  const fieldError = (key: string) => {
    if (!errors.includes(key)) return null;
    const text = key === "email" ? copy.emailError : key === "password" ? copy.passwordError : key === "confirmation" ? copy.mismatch : key === "consent" ? copy.consentError : copy.required;
    return <span className="auth-error" role="alert">{text}</span>;
  };

  return (
    <main className="auth-page">
      <div className="auth-orbit auth-orbit-one" aria-hidden="true" />
      <div className="auth-orbit auth-orbit-two" aria-hidden="true" />
      <div className="auth-inner">
        <section className="auth-intro" aria-labelledby="company-signup-headline">
          <div className="auth-eyebrow"><Building2 size={16} />{copy.eyebrow}</div>
          <h1 id="company-signup-headline">{copy.headline}</h1>
          <p className="auth-lead">{copy.intro}</p>
          <ul className="auth-benefits">
            {(en ? ["Publish and manage project needs", "Receive proposals from providers", "Keep project activity in one place"] : ["Publiez et gérez vos besoins", "Recevez des offres de prestataires", "Retrouvez vos projets au même endroit"]).map((item) => <li key={item}><span><Check size={16} strokeWidth={3} /></span>{item}</li>)}
          </ul>
        </section>
        <section className="auth-form-side" aria-label={copy.title}>
          <div className="auth-card">
            <div className="auth-mark"><Image src="/logo-icon.png" alt="" width={36} height={36} /></div>
            <h2>{copy.title}</h2>
            <p className="auth-subtitle">{copy.subtitle}</p>
            <form onSubmit={submit} noValidate>
              <div className="auth-field"><label htmlFor="company-name-person">{copy.name}</label><div className={`auth-input-wrap${errors.includes("name") ? " is-invalid" : ""}`}><UserRound size={19} aria-hidden="true" /><input id="company-name-person" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} /></div>{fieldError("name")}</div>
              <div className="auth-field"><label htmlFor="company-name">{copy.company}</label><div className={`auth-input-wrap${errors.includes("company") ? " is-invalid" : ""}`}><Building2 size={19} aria-hidden="true" /><input id="company-name" autoComplete="organization" value={company} onChange={(event) => setCompany(event.target.value)} /></div>{fieldError("company")}</div>
              <div className="auth-field"><label htmlFor="company-email">{copy.email}</label><div className={`auth-input-wrap${errors.includes("email") ? " is-invalid" : ""}`}><Mail size={19} aria-hidden="true" /><input id="company-email" type="email" autoComplete="email" placeholder={en ? "you@company.com" : "vous@entreprise.com"} value={email} onChange={(event) => setEmail(event.target.value)} /></div>{fieldError("email")}</div>
              <div className="auth-field"><label htmlFor="company-password">{copy.password}</label><div className={`auth-input-wrap${errors.includes("password") ? " is-invalid" : ""}`}><LockKeyhole size={19} aria-hidden="true" /><input id="company-password" type={showPassword ? "text" : "password"} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} /><button className="auth-icon-button" type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? (en ? "Hide password" : "Masquer le mot de passe") : (en ? "Show password" : "Afficher le mot de passe")}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{fieldError("password")}<small className="auth-field-hint">{copy.passwordHint}</small></div>
              <div className="auth-field"><label htmlFor="company-confirm">{copy.confirm}</label><div className={`auth-input-wrap${errors.includes("confirmation") ? " is-invalid" : ""}`}><LockKeyhole size={19} aria-hidden="true" /><input id="company-confirm" type={showConfirmation ? "text" : "password"} autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} /><button className="auth-icon-button" type="button" onClick={() => setShowConfirmation((value) => !value)} aria-label={showConfirmation ? (en ? "Hide password" : "Masquer le mot de passe") : (en ? "Show password" : "Afficher le mot de passe")}>{showConfirmation ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{fieldError("confirmation")}</div>
              <label className="auth-remember auth-company-consent"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>{copy.consent}</span></label>{fieldError("consent")}
              <button className="auth-submit" type="submit"><span>{copy.submit}</span><span className="auth-submit-icon"><ArrowRight size={20} /></span></button>
              {message && <p className="auth-status is-success" role="status">{message}</p>}
            </form>
            <p className="auth-footnote">{copy.demo}</p>
            <p className="auth-switch"><Link href="/inscription"><ArrowLeft size={14} style={{ display: "inline", verticalAlign: "-2px" }} /> {copy.back}</Link></p>
            <p className="auth-switch auth-company-login">{copy.login} <Link href="/connexion">{copy.signIn}</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}
