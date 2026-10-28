"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Code2, ExternalLink, Monitor, Palette, Search, X, ShoppingBag, Smartphone, Shapes } from "lucide-react";

const studies = [
  { id: "commerce", category: "web", icon: "shop", title: "Expérience e-commerce", titleEn: "E-commerce experience", service: "Sites web & e-commerce", serviceEn: "Websites & e-commerce", summary: "Un aperçu de boutique en ligne : parcours de découverte, catalogue et présentation des produits.", summaryEn: "An online store concept: product discovery, catalogue and product presentation.", deliverables: ["Parcours d’achat", "Catalogue produit", "Interface responsive"], deliverablesEn: ["Shopping journey", "Product catalogue", "Responsive interface"] },
  { id: "mobile", category: "apps", icon: "mobile", title: "Application mobile", titleEn: "Mobile application", service: "Applications & logiciels", serviceEn: "Applications & software", summary: "Un concept d’interface mobile pour illustrer la navigation, les écrans clés et les composants d’une application.", summaryEn: "A mobile interface concept illustrating navigation, key screens and application components.", deliverables: ["Écrans d’application", "Navigation mobile", "Composants d’interface"], deliverablesEn: ["Application screens", "Mobile navigation", "Interface components"] },
  { id: "identite", category: "design", icon: "shapes", title: "Univers de marque digital", titleEn: "Digital brand identity", service: "Design & contenu", serviceEn: "Design & content", summary: "Une piste de direction visuelle montrant comment cohérence, couleurs et typographie structurent une présence digitale.", summaryEn: "A visual direction concept showing how consistency, colour and typography shape a digital presence.", deliverables: ["Direction visuelle", "Système graphique", "Déclinaisons digitales"], deliverablesEn: ["Visual direction", "Graphic system", "Digital adaptations"] },
  { id: "espace", category: "web", icon: "web", title: "Présence digitale d’un espace", titleEn: "Digital presence for a venue", service: "Sites web & e-commerce", serviceEn: "Websites & e-commerce", summary: "Un exemple de mise en valeur d’un lieu et de ses informations pour aider les visiteurs à préparer leur venue.", summaryEn: "A concept for presenting a venue and its information to help visitors plan their visit.", deliverables: ["Présentation du lieu", "Informations pratiques", "Mise en page responsive"], deliverablesEn: ["Venue presentation", "Practical information", "Responsive layout"] },
];

const filters = [
  { id: "all", fr: "Tout voir", en: "All work" },
  { id: "web", fr: "Sites web", en: "Websites" },
  { id: "apps", fr: "Applications", en: "Applications" },
  { id: "design", fr: "Design", en: "Design" },
];

export default function CaseStudies() {
  const en = useLocale() === "en";
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof studies)[number] | null>(null);
  const t = en ? {
    crumb: "Home", eyebrow: "Selected work", title: "Digital projects, built around", accent: "real needs.", intro: "Explore illustrative case studies across AIWORX service categories. Each published case study should be approved by its client.", search: "Search a project or service…", popular: "Browse by service", cases: "Project examples", count: "illustrative case studies", demo: "Illustrative demo content — replace with client-approved case studies before publication.", learn: "View case study", CTA: "Have a project in mind?", CTAtext: "Tell us what you want to build and receive proposals from qualified providers.", publish: "Post a need", detail: "Case study overview", deliverables: "Example deliverables", placeholder: "This is a visual example. Client, provider and outcome details should only be published after review and authorization.", close: "Close",
  } : {
    crumb: "Accueil", eyebrow: "Nos réalisations", title: "Des projets digitaux, pensés pour", accent: "des besoins réels.", intro: "Découvrez des études de cas illustratives dans les catégories de services AIWORX. Toute étude publiée doit être autorisée par son client.", search: "Rechercher un projet ou un service…", popular: "Explorer par service", cases: "Exemples de projets", count: "études de cas illustratives", demo: "Contenu de démonstration — à remplacer par des études de cas validées par les clients avant publication.", learn: "Voir l’étude de cas", CTA: "Vous avez un projet en tête ?", CTAtext: "Décrivez votre besoin et recevez des propositions de prestataires qualifiés.", publish: "Publier un besoin", detail: "Présentation de l’étude", deliverables: "Exemples de livrables", placeholder: "Cet exemple sert à illustrer la page. Les informations sur le client, le prestataire et les résultats ne seront publiées qu’après vérification et autorisation.", close: "Fermer",
  };
  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(en ? "en" : "fr");
    return studies.filter((study) => (filter === "all" || study.category === filter) && (!q || [study.title, study.titleEn, study.service, study.serviceEn, study.summary, study.summaryEn].join(" ").toLocaleLowerCase(en ? "en" : "fr").includes(q)));
  }, [filter, query, en]);
  const label = (study: (typeof studies)[number]) => en ? study.serviceEn : study.service;
  const ArtIcon = ({ icon, size = 42 }: { icon: string; size?: number }) => icon === "shop" ? <ShoppingBag size={size} /> : icon === "mobile" ? <Smartphone size={size} /> : icon === "shapes" ? <Shapes size={size} /> : <Monitor size={size} />;

  return (
    <main className="cases-page">
      <section className="cases-hero"><div className="cases-shell">
        <div className="cases-crumb"><Link href="/">{t.crumb}</Link><span>/</span><strong>{en ? "Portfolio" : "Réalisations"}</strong></div>
        <div className="cases-hero-layout"><div><span className="cases-eyebrow"><i />{t.eyebrow}</span><h1>{t.title} <em>{t.accent}</em></h1><p>{t.intro}</p><div className="cases-hero-actions"><Link href="/publier-un-besoin">{t.publish}<ArrowRight size={16} /></Link><span><Check size={15} />{en ? "Client-approved publications" : "Publications autorisées par le client"}</span></div></div>
          <div className="cases-collage" aria-label={en ? "Digital project categories" : "Catégories de projets digitaux"}><div className="cases-art-shape shape-one"><ShoppingBag size={38} /></div><div className="cases-art-shape shape-two"><Smartphone size={32} /></div><div className="cases-art-shape shape-three"><Shapes size={27} /></div><div className="cases-number"><strong>AIWORX</strong><span>{en ? "Digital know-how" : "Savoir-faire digital"}</span></div><div className="cases-art-caption">{en ? "Strategy · Design · Development" : "Stratégie · Design · Développement"}</div></div>
        </div>
      </div></section>
      <section className="cases-shell cases-main">
        <div className="cases-heading"><div><span>{t.popular}</span><h2>{t.cases}</h2><p>{visible.length} {t.count}</p></div><label className="cases-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} /></label></div>
        <div className="cases-filters" role="tablist" aria-label={t.popular}>{filters.map((item) => <button key={item.id} type="button" role="tab" aria-selected={filter === item.id} className={filter === item.id ? "active" : ""} onClick={() => setFilter(item.id)}>{en ? item.en : item.fr}</button>)}</div>
        <p className="cases-demo-note">{t.demo}</p>
        {visible.length ? <div className="cases-grid">{visible.map((study, index) => <article className={`case-card ${index === 0 ? "featured" : ""}`} key={study.id}>
          <button className={`case-image art-${study.category}`} type="button" onClick={() => setSelected(study)} aria-label={`${t.learn}: ${en ? study.titleEn : study.title}`}><span className="case-art-icon"><ArtIcon icon={study.icon} /></span><span className="case-art-lines"><i /><i /><i /></span><span className="case-image-label">{en ? "Illustrative example" : "Exemple illustratif"}</span><span className="case-image-arrow"><ArrowUpRight size={20} /></span></button>
          <div className="case-content"><span className="case-category">{label(study)}</span><h3>{en ? study.titleEn : study.title}</h3><p>{en ? study.summaryEn : study.summary}</p><div className="case-bottom"><span>{en ? "Example deliverables" : "Livrables types"}: {en ? study.deliverablesEn.slice(0, 2).join(" · ") : study.deliverables.slice(0, 2).join(" · ")}</span><button type="button" onClick={() => setSelected(study)}>{t.learn}<ArrowRight size={14} /></button></div></div>
        </article>)}</div> : <div className="cases-empty">{en ? "No project matches this search." : "Aucun projet ne correspond à cette recherche."}<button type="button" onClick={() => { setFilter("all"); setQuery(""); }}>{en ? "Reset" : "Effacer"}</button></div>}
        <div className="cases-authorization"><ShieldCheckSmall /><p>{en ? "Publication rights matter." : "Le droit de publication est essentiel."}<span>{en ? "Client names, testimonials, images and performance results must be checked and authorized before a case study goes live." : "Les noms des clients, témoignages, images et résultats doivent être vérifiés et autorisés avant la mise en ligne d’une étude."}</span></p></div>
      </section>
      <section className="cases-cta"><div className="cases-shell"><div><span>{en ? "Start a project" : "Démarrer un projet"}</span><h2>{t.CTA}</h2><p>{t.CTAtext}</p></div><Link href="/publier-un-besoin">{t.publish}<ArrowRight size={17} /></Link></div></section>
      {selected && <div className="case-modal-layer" onClick={() => setSelected(null)}><section className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-modal-title" onClick={(event) => event.stopPropagation()}><button className="case-close" type="button" onClick={() => setSelected(null)} aria-label={t.close}><X size={19} /></button><div className={`case-modal-art art-${selected.category}`}><span className="case-art-icon"><ArtIcon icon={selected.icon} size={48} /></span><span className="case-art-lines"><i /><i /><i /></span></div><span className="case-category">{label(selected)}</span><h2 id="case-modal-title">{en ? selected.titleEn : selected.title}</h2><p>{en ? selected.summaryEn : selected.summary}</p><h3>{t.deliverables}</h3><ul>{(en ? selected.deliverablesEn : selected.deliverables).map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><p className="case-modal-note">{t.placeholder}</p><Link href="/publier-un-besoin">{t.publish}<ArrowRight size={15} /></Link></section></div>}
    </main>
  );
}

function ShieldCheckSmall() { return <span className="cases-shield"><ExternalLink size={17} /></span>; }
