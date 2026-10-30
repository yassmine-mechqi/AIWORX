"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, BriefcaseBusiness, Building2, UserRound } from "lucide-react";

export default function SignupChoicePage() {
  const en = useLocale() === "en";
  const copy = en
    ? {
        eyebrow: "Your AIWORX space",
        headline: <>Choose the account that <em>fits your role.</em></>,
        intro: "Create an account to manage projects or apply to join the AIWORX provider network.",
        title: "Create an account",
        subtitle: "How would you like to use AIWORX?",
        companyTitle: "I am a company",
        companyText: "Publish a need, review proposals and follow your projects.",
        providerTitle: "I am a provider",
        providerText: "Present your expertise and apply to join the verified network.",
        haveAccount: "Already have an account?",
        signIn: "Sign in",
        demo: "Frontend demo: account creation will be enabled when the backend is connected.",
      }
    : {
        eyebrow: "Votre espace AIWORX",
        headline: <>Choisissez le compte <em>adapté à votre rôle.</em></>,
        intro: "Créez un compte pour gérer vos projets ou candidater au réseau de prestataires AIWORX.",
        title: "Créer un compte",
        subtitle: "Comment souhaitez-vous utiliser AIWORX ?",
        companyTitle: "Je suis une entreprise",
        companyText: "Publiez un besoin, étudiez les offres et suivez vos projets.",
        providerTitle: "Je suis un prestataire",
        providerText: "Présentez votre expertise et candidatez au réseau vérifié.",
        haveAccount: "Vous avez déjà un compte ?",
        signIn: "Se connecter",
        demo: "Démo frontend : la création de compte sera activée lorsque le backend sera connecté.",
      };

  return (
    <main className="auth-page">
      <div className="auth-orbit auth-orbit-one" aria-hidden="true" />
      <div className="auth-orbit auth-orbit-two" aria-hidden="true" />
      <div className="auth-inner">
        <section className="auth-intro" aria-labelledby="signup-choice-headline">
          <div className="auth-eyebrow"><BriefcaseBusiness size={16} />{copy.eyebrow}</div>
          <h1 id="signup-choice-headline">{copy.headline}</h1>
          <p className="auth-lead">{copy.intro}</p>
        </section>

        <section className="auth-form-side" aria-label={copy.title}>
          <div className="auth-card signup-choice-card">
            <div className="auth-mark"><Image src="/logo-icon.png" alt="" width={36} height={36} /></div>
            <h2>{copy.title}</h2>
            <p className="auth-subtitle">{copy.subtitle}</p>
            <div className="signup-choice-list">
              <Link className="signup-choice-option" href="/inscription/entreprise">
                <span className="signup-choice-icon"><Building2 size={22} /></span>
                <span className="signup-choice-copy"><strong>{copy.companyTitle}</strong><small>{copy.companyText}</small></span>
                <ArrowRight className="signup-choice-arrow" size={19} />
              </Link>
              <Link className="signup-choice-option" href="/devenir-prestataire">
                <span className="signup-choice-icon"><UserRound size={22} /></span>
                <span className="signup-choice-copy"><strong>{copy.providerTitle}</strong><small>{copy.providerText}</small></span>
                <ArrowRight className="signup-choice-arrow" size={19} />
              </Link>
            </div>
            <p className="auth-footnote">{copy.demo}</p>
            <p className="auth-switch">{copy.haveAccount} <Link href="/connexion">{copy.signIn}</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}
