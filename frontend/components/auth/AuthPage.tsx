"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";

type AuthMode = "login" | "register";

export default function AuthPage({ mode }: { mode: AuthMode }) {
  const locale = useLocale();
  const en = locale === "en";
  const register = mode === "register";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  const copy = en
    ? {
        eyebrow: "Your AIWORX space",
        headline: register ? <>Bring your projects to life with <em>the right talent.</em></> : <>Welcome back to your <em>AIWORX space.</em></>,
        intro: register
          ? "Create your AIWORX account to organize your digital projects, keep track of conversations and work with qualified providers."
          : "Sign in to track your projects, exchange with providers and manage your requests with ease.",
        benefits: ["Track your projects from A to Z", "Keep all your conversations in one place", "Manage your projects with ease"],
        registerTitle: "Create an account",
        loginTitle: "Sign in",
        registerSubtitle: "Choose a secure password for your AIWORX space.",
        loginSubtitle: "Access your AIWORX space",
        email: "Email address",
        password: "Password",
        confirm: "Confirm password",
        emailPlaceholder: "you@example.com",
        passwordPlaceholder: register ? "Create a password" : "Enter your password",
        confirmPlaceholder: "Re-enter your password",
        rulesTitle: "Your password must include",
        rules: ["At least 8 characters", "An uppercase letter (A–Z)", "A number (0–9)", "A special character (!, @, #…)"],
        remember: "Remember me",
        forgot: "Forgot password?",
        submitLogin: "Sign in",
        submitRegister: "Create my account",
        noAccount: "Don't have an account?",
        hasAccount: "Already have an account?",
        registerLink: "Create an account",
        loginLink: "Sign in",
        demo: "Interface demo: no information is sent to a server.",
        matching: "Passwords match",
        mismatch: "Passwords do not match",
        invalid: "Please check the information entered.",
        demoSuccess: register
          ? "All checks passed. No account was created because an authentication backend is not connected yet."
          : "Your details look valid. Sign-in is not available until an authentication backend is connected.",
        sending: "Please wait…",
      }
    : {
        eyebrow: "Votre espace AIWORX",
        headline: register ? <>Donnez vie à vos projets avec <em>les bons talents.</em></> : <>Ravi de vous revoir sur votre <em>espace AIWORX.</em></>,
        intro: register
          ? "Créez votre compte AIWORX pour organiser vos projets digitaux, retrouver vos échanges et collaborer avec des prestataires qualifiés."
          : "Connectez-vous pour suivre vos projets, échanger avec les prestataires et gérer vos demandes en toute simplicité.",
        benefits: ["Suivez vos missions de A à Z", "Retrouvez vos échanges au même endroit", "Gérez vos projets en toute simplicité"],
        registerTitle: "Créer un compte",
        loginTitle: "Se connecter",
        registerSubtitle: "Choisissez un mot de passe sécurisé pour votre espace AIWORX.",
        loginSubtitle: "Accédez à votre espace AIWORX",
        email: "Adresse e-mail",
        password: "Mot de passe",
        confirm: "Confirmer le mot de passe",
        emailPlaceholder: "vous@exemple.com",
        passwordPlaceholder: register ? "Créez un mot de passe" : "Entrez votre mot de passe",
        confirmPlaceholder: "Retapez le mot de passe",
        rulesTitle: "Votre mot de passe doit contenir",
        rules: ["Au moins 8 caractères", "Une lettre majuscule (A–Z)", "Un chiffre (0–9)", "Un caractère spécial (!, @, #…)"],
        remember: "Se souvenir de moi",
        forgot: "Mot de passe oublié ?",
        submitLogin: "Se connecter",
        submitRegister: "Créer mon compte",
        noAccount: "Vous n’avez pas encore de compte ?",
        hasAccount: "Vous avez déjà un compte ?",
        registerLink: "Créer un compte",
        loginLink: "Se connecter",
        demo: "Démo locale : aucune donnée n’est envoyée à un serveur.",
        matching: "Les mots de passe correspondent",
        mismatch: "Les mots de passe ne correspondent pas",
        invalid: "Vérifiez les informations saisies.",
        demoSuccess: register
          ? "Toutes les conditions sont respectées. Aucun compte n’a été créé, car aucun service d’authentification n’est connecté."
          : "Les champs sont valides. La connexion sera disponible lorsqu’un service d’authentification sera connecté.",
        sending: "Veuillez patienter…",
      };

  const passwordRules = [
    (value: string) => value.length >= 8,
    (value: string) => /[A-Z]/.test(value),
    (value: string) => /[0-9]/.test(value),
    (value: string) => /[^A-Za-z0-9]/.test(value),
  ];
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(true);
  const validRules = passwordRules.map((rule) => rule(password));
  const validPassword = register ? validRules.every(Boolean) : password.length > 0;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const matches = confirmation.length > 0 && password === confirmation;
  const canSubmit = validEmail && validPassword && (!register || matches);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSuccess(false);
    if (!canSubmit) {
      setMessage(copy.invalid);
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      setMessage(copy.demoSuccess);
      setSuccess(true);
      setBusy(false);
    }, 300);
  }

  return (
    <main className="auth-page">
      <div className="auth-orbit auth-orbit-one" aria-hidden="true" />
      <div className="auth-orbit auth-orbit-two" aria-hidden="true" />
      <div className="auth-inner">
        <section className="auth-intro" aria-labelledby="auth-headline">
          <div className="auth-eyebrow"><Sparkles size={16} />{copy.eyebrow}</div>
          <h1 id="auth-headline">{copy.headline}</h1>
          <p className="auth-lead">{copy.intro}</p>
          <ul className="auth-benefits">
            {copy.benefits.map((benefit) => <li key={benefit}><span><Check size={16} strokeWidth={3} /></span>{benefit}</li>)}
          </ul>
        </section>

        <section className="auth-form-side" aria-label={register ? copy.registerTitle : copy.loginTitle}>
          <div className="auth-card">
            <div className="auth-mark"><Image src="/logo-icon.png" alt="" width={36} height={36} /></div>
            <h2>{register ? copy.registerTitle : copy.loginTitle}</h2>
            <p className="auth-subtitle">{register ? copy.registerSubtitle : copy.loginSubtitle}</p>
            <form onSubmit={submit} noValidate>
              <div className="auth-field">
                <label htmlFor="auth-email">{copy.email}</label>
                <div className="auth-input-wrap"><Mail size={20} aria-hidden="true" /><input id="auth-email" type="email" autoComplete="email" placeholder={copy.emailPlaceholder} value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
              </div>
              <div className="auth-field">
                <label htmlFor="auth-password">{copy.password}</label>
                <div className="auth-input-wrap"><LockKeyhole size={20} aria-hidden="true" /><input id="auth-password" type={showPassword ? "text" : "password"} autoComplete={register ? "new-password" : "current-password"} placeholder={copy.passwordPlaceholder} value={password} onChange={(event) => setPassword(event.target.value)} required /><button className="auth-icon-button" type="button" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? (en ? "Hide password" : "Masquer le mot de passe") : (en ? "Show password" : "Afficher le mot de passe")}>{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div>
              </div>

              {register ? (
                <>
                  <div className="auth-rules" aria-live="polite">
                    <p>{copy.rulesTitle}</p>
                    {copy.rules.map((rule, index) => <div className={validRules[index] ? "auth-rule is-valid" : "auth-rule"} key={rule}><span>{validRules[index] ? "✓" : "×"}</span>{rule}</div>)}
                  </div>
                  <div className="auth-field">
                    <label htmlFor="auth-confirm">{copy.confirm}</label>
                    <div className="auth-input-wrap"><LockKeyhole size={20} aria-hidden="true" /><input id="auth-confirm" type={showConfirmation ? "text" : "password"} autoComplete="new-password" placeholder={copy.confirmPlaceholder} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required /><button className="auth-icon-button" type="button" onClick={() => setShowConfirmation((shown) => !shown)} aria-label={showConfirmation ? (en ? "Hide password" : "Masquer le mot de passe") : (en ? "Show password" : "Afficher le mot de passe")}>{showConfirmation ? <EyeOff size={19} /> : <Eye size={19} />}</button></div>
                    {confirmation && <p className={matches ? "auth-match is-valid" : "auth-match is-invalid"}>{matches ? "✓ " : "× "}{matches ? copy.matching : copy.mismatch}</p>}
                  </div>
                </>
              ) : (
                <div className="auth-options">
                  <label className="auth-remember"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span>{copy.remember}</span></label>
                  <Link href="/mot-de-passe-oublie">{copy.forgot}</Link>
                </div>
              )}

              <button className="auth-submit" type="submit" disabled={busy}>
                <span>{busy ? copy.sending : register ? copy.submitRegister : copy.submitLogin}</span>
                <span className="auth-submit-icon"><ArrowRight size={20} /></span>
              </button>
              {message && <p className={`auth-status${success ? " is-success" : ""}`} role="status">{message}</p>}
            </form>
            <div className="auth-divider"><span />{en ? "or" : "ou"}<span /></div>
            <p className="auth-switch">
              {register ? copy.hasAccount : copy.noAccount}{" "}
              <Link href={register ? "/connexion" : "/inscription"}>{register ? copy.loginLink : copy.registerLink}</Link>
            </p>
            {register && <p className="auth-footnote">{copy.demo}</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
