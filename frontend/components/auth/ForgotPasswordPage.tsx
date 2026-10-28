"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const en = useLocale() === "en";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(en ? "Enter a valid email address." : "Saisissez une adresse e-mail valide.");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setSent(true);
    }, 350);
  }

  return (
    <main className="auth-page">
      <div className="auth-orbit auth-orbit-one" aria-hidden="true" />
      <div className="auth-orbit auth-orbit-two" aria-hidden="true" />
      <div className="auth-inner">
        <section className="auth-intro">
          <div className="auth-eyebrow"><Mail size={16} />{en ? "Account recovery" : "Récupération du compte"}</div>
          <h1>{en ? <>Get back to your <em>AIWORX space.</em></> : <>Retrouvez votre <em>espace AIWORX.</em></>}</h1>
          <p className="auth-lead">
            {en
              ? "Enter the email address linked to your account. We will send you a secure password reset link."
              : "Saisissez l’adresse e-mail associée à votre compte. Un lien sécurisé de réinitialisation pourra vous être envoyé."}
          </p>
          <ul className="auth-benefits">
            {(en
              ? ["Use the email address on your account", "The reset link should be used only by you", "Return to your projects after resetting"]
              : ["Utilisez l’adresse e-mail de votre compte", "Le lien de réinitialisation est personnel", "Retrouvez vos projets après la réinitialisation"]
            ).map((text) => <li key={text}><span><CheckCircle2 size={16} /></span>{text}</li>)}
          </ul>
        </section>

        <section className="auth-form-side" aria-label={en ? "Reset password" : "Réinitialiser le mot de passe"}>
          <div className="auth-card">
            {!sent ? (
              <>
                <div className="auth-mark"><Mail size={30} color="#128c88" /></div>
                <h2>{en ? "Forgot password?" : "Mot de passe oublié ?"}</h2>
                <p className="auth-subtitle">
                  {en ? "We’ll help you reset it in a few steps." : "Nous vous aiderons à le réinitialiser en quelques étapes."}
                </p>
                <form onSubmit={submit} noValidate>
                  <div className="auth-field">
                    <label htmlFor="reset-email">{en ? "Email address" : "Adresse e-mail"}</label>
                    <div className="auth-input-wrap">
                      <Mail size={20} aria-hidden="true" />
                      <input id="reset-email" type="email" autoComplete="email" placeholder={en ? "you@example.com" : "vous@exemple.com"} value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} required />
                    </div>
                  </div>
                  {error && <p className="auth-status" role="alert">{error}</p>}
                  <button className="auth-submit" type="submit" disabled={busy}>
                    <span>{busy ? (en ? "Sending…" : "Envoi…") : (en ? "Send reset link" : "Envoyer le lien")}</span>
                    <span className="auth-submit-icon"><ArrowRight size={20} /></span>
                  </button>
                </form>
                <div className="auth-divider"><span />{en ? "or" : "ou"}<span /></div>
                <p className="auth-switch"><Link href="/connexion"><ArrowLeft size={14} style={{ display: "inline", verticalAlign: "-2px" }} /> {en ? "Back to sign in" : "Retour à la connexion"}</Link></p>
              </>
            ) : (
              <div className="auth-reset-confirmation" role="status">
                <div className="auth-mark"><CheckCircle2 size={32} color="#128c88" /></div>
                <h2>{en ? "Check your inbox" : "Vérifiez votre boîte e-mail"}</h2>
                <p className="auth-subtitle">
                  {en
                    ? `If an account is associated with ${email.trim()}, a reset link can be sent to that address.`
                    : `Si un compte est associé à ${email.trim()}, un lien de réinitialisation pourra être envoyé à cette adresse.`}
                </p>
                <p className="auth-status">
                  {en
                    ? "Demo mode: no email was sent. Connect an authentication backend to enable password reset emails."
                    : "Mode démo : aucun e-mail n’a été envoyé. Connectez un backend d’authentification pour activer l’envoi des e-mails."}
                </p>
                <button className="auth-submit" type="button" onClick={() => { setSent(false); setError(""); }}>
                  <span>{en ? "Try another email" : "Essayer une autre adresse"}</span>
                  <span className="auth-submit-icon"><ArrowRight size={20} /></span>
                </button>
                <p className="auth-switch" style={{ marginTop: 20 }}><Link href="/connexion"><ArrowLeft size={14} style={{ display: "inline", verticalAlign: "-2px" }} /> {en ? "Back to sign in" : "Retour à la connexion"}</Link></p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
