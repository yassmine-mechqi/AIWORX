"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Code2, Globe2, MapPin, Monitor, Palette, Search, ShieldCheck, SlidersHorizontal, Star, Bot, X } from "lucide-react";

const providers = [
  { id: "nora", initials: "NB", name: "Nora Benali", role: "Experte e-commerce & sites web", roleEn: "E-commerce & web expert", cat: "web", catFr: "Sites web & e-commerce", catEn: "Websites & e-commerce", skills: ["Shopify", "WordPress", "SEO", "Optimisation"], sectors: ["Commerce", "Beauté"], langs: ["fr", "en"], missions: 28, rating: 4.9, reviews: 18, score: 94, city: "Casablanca", color: "teal", certified: false, about: "Accompagnement de boutiques en ligne, de la conception à l’optimisation des conversions." },
  { id: "yassine", initials: "YM", name: "Yassine El Mansouri", role: "Développeur d’applications & logiciels", roleEn: "Application & software developer", cat: "app", catFr: "Applications & logiciels", catEn: "Applications & software", skills: ["React", "Next.js", "Node.js", "CRM"], sectors: ["Services", "Finance"], langs: ["fr", "ar"], missions: 21, rating: 4.8, reviews: 14, score: 92, city: "Rabat", color: "blue", certified: true, about: "Conçoit des applications web et des outils métier avec une attention particulière à la fiabilité." },
  { id: "salma", initials: "SI", name: "Salma Idrissi", role: "Designer UI/UX & identité visuelle", roleEn: "UI/UX designer & visual identity", cat: "design", catFr: "Design & contenu", catEn: "Design & content", skills: ["UI/UX", "Figma", "Design system", "Branding"], sectors: ["Éducation", "Culture"], langs: ["fr", "en"], missions: 17, rating: 4.9, reviews: 12, score: 96, city: "Marrakech", color: "violet", certified: false, about: "Transforme les besoins utilisateurs en interfaces accessibles, cohérentes et soignées." },
  { id: "mehdi", initials: "MA", name: "Mehdi Amrani", role: "Consultant en marketing digital", roleEn: "Digital marketing consultant", cat: "marketing", catFr: "Marketing digital", catEn: "Digital marketing", skills: ["Acquisition", "Publicité", "Analytics", "SEO"], sectors: ["Commerce", "Tourisme"], langs: ["fr", "ar"], missions: 31, rating: 4.7, reviews: 22, score: 90, city: "Casablanca", color: "gold", certified: false, about: "Met en place des campagnes mesurables et des plans d’acquisition adaptés aux objectifs." },
  { id: "imane", initials: "IZ", name: "Imane Zahra", role: "Spécialiste IA & automatisation", roleEn: "AI & automation specialist", cat: "ai", catFr: "IA & automatisation", catEn: "AI & automation", skills: ["Automatisation", "Assistants IA", "Make", "Intégrations"], sectors: ["Finance", "Services"], langs: ["fr", "en"], missions: 12, rating: 4.8, reviews: 9, score: 95, city: "Tanger", color: "blue", certified: true, about: "Identifie les tâches répétitives et construit des automatisations supervisables." },
  { id: "adam", initials: "AF", name: "Adam El Fassi", role: "Développeur web & intégration", roleEn: "Web developer & integration", cat: "web", catFr: "Sites web & e-commerce", catEn: "Websites & e-commerce", skills: ["Développement web", "API", "Accessibilité", "Maintenance"], sectors: ["Services", "Éducation"], langs: ["fr", "ar"], missions: 9, rating: 4.6, reviews: 7, score: 89, city: "Fès", color: "violet", certified: false, about: "Développe et maintient des sites rapides, accessibles et faciles à faire évoluer." },
];

const categoryOptions = [
  { id: "web", fr: "Sites web & e-commerce", en: "Websites & e-commerce", Icon: Monitor },
  { id: "app", fr: "Applications & logiciels", en: "Applications & software", Icon: Code2 },
  { id: "marketing", fr: "Marketing digital", en: "Digital marketing", Icon: BriefcaseBusiness },
  { id: "design", fr: "Design & contenu", en: "Design & content", Icon: Palette },
  { id: "ai", fr: "IA & automatisation", en: "AI & automation", Icon: Bot },
];

const text = {
  fr: { home: "Accueil", eyebrow: "Réseau AIWORX vérifié", title: "Trouvez le bon partenaire pour", accent: "vos projets.", intro: "Explorez des profils qualifiés, comparez leurs expertises et échangez en toute confiance au sein de la plateforme AIWORX.", search: "Compétence, service ou secteur d’activité…", searchButton: "Rechercher", popular: "Recherches populaires", trust: "Des profils transparents pour mieux choisir", trustVerified: "Vérification AIWORX", trustReviews: "Avis de missions terminées", trustProtected: "Échanges protégés", filters: "Filtrer les profils", clear: "Effacer", cats: "Catégories", verification: "Vérification", verified: "Profils vérifiés AIWORX", certified: "Certifications affichées", langs: "Langues de travail", sector: "Secteur d’expérience", allSectors: "Tous les secteurs", recommended: "Prestataires recommandés", sort: "Trier par", relevance: "Pertinence", rating: "Meilleure note", experience: "Expérience", results: "prestataires correspondant à votre recherche", profile: "Voir le profil", ask: "Demander une offre", mission: "missions", quality: "Score qualité", badge: "Profil vérifié", noResults: "Aucun profil ne correspond à ces critères.", broaden: "Essaie d’élargir la recherche ou de retirer un filtre.", noteTitle: "Vos échanges restent protégés.", note: "Les coordonnées directes ne sont pas affichées avant l’étape autorisée. Les demandes de proposition et les échanges passent par AIWORX.", sample: "Maquette : profils et chiffres de démonstration à remplacer par les données réelles.", about: "Présentation", expertise: "Expertises", close: "Fermer", portfolio: "Aperçu de réalisation — visuel de démonstration", location: "Maroc" },
  en: { home: "Home", eyebrow: "Verified AIWORX network", title: "Find the right partner for", accent: "your projects.", intro: "Explore qualified profiles, compare their expertise and connect with confidence through AIWORX.", search: "Skill, service or industry…", searchButton: "Search", popular: "Popular searches", trust: "Transparent profiles help you choose", trustVerified: "AIWORX verification", trustReviews: "Reviews from completed missions", trustProtected: "Protected conversations", filters: "Filter profiles", clear: "Clear", cats: "Categories", verification: "Verification", verified: "AIWORX verified profiles", certified: "Certifications listed", langs: "Working languages", sector: "Industry experience", allSectors: "All industries", recommended: "Recommended providers", sort: "Sort by", relevance: "Relevance", rating: "Top rated", experience: "Experience", results: "providers matching your search", profile: "View profile", ask: "Request a proposal", mission: "missions", quality: "Quality score", badge: "Verified profile", noResults: "No profiles match these filters.", broaden: "Try broadening your search or removing a filter.", noteTitle: "Your conversations stay protected.", note: "Direct contact details remain hidden until the authorized stage. Requests and conversations go through AIWORX.", sample: "Mockup: demo profiles and figures to replace with real platform data.", about: "About", expertise: "Expertise", close: "Close", portfolio: "Work preview — demo visual", location: "Morocco" },
} as const;

export default function ProvidersDirectory() {
  const en = useLocale() === "en";
  const t = en ? text.en : text.fr;
  const [query, setQuery] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [verified, setVerified] = useState(false);
  const [certified, setCertified] = useState(false);
  const [language, setLanguage] = useState("");
  const [sector, setSector] = useState("");
  const [sort, setSort] = useState("relevance");
  const [selected, setSelected] = useState<(typeof providers)[number] | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(en ? "en" : "fr");
    const list = providers.filter((p) => {
      const searchText = [p.name, p.role, p.roleEn, p.catFr, p.catEn, p.city, ...p.skills, ...p.sectors].join(" ").toLocaleLowerCase(en ? "en" : "fr");
      return (!q || searchText.includes(q)) && (!cats.length || cats.includes(p.cat)) && (!verified || p.score >= 85) && (!certified || p.certified) && (!language || p.langs.includes(language)) && (!sector || p.sectors.includes(sector));
    });
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "experience") list.sort((a, b) => b.missions - a.missions);
    return list;
  }, [query, cats, verified, certified, language, sector, sort, en]);

  const toggleCat = (id: string) => setCats((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  const clear = () => { setQuery(""); setCats([]); setVerified(false); setCertified(false); setLanguage(""); setSector(""); };
  const langName = (code: string) => ({ fr: en ? "French" : "Français", en: en ? "English" : "Anglais", ar: en ? "Arabic" : "Arabe" }[code] ?? code);

  return (
    <main className="providers-page">
      <section className="providers-hero"><div className="providers-shell">
        <div className="providers-crumb"><Link href="/">{t.home}</Link><span>/</span><strong>Prestataires</strong></div>
        <span className="providers-eyebrow"><i />{t.eyebrow}</span>
        <div className="providers-hero-grid"><div>
          <h1>{t.title} <em>{t.accent}</em></h1><p>{t.intro}</p>
          <form className="providers-search" onSubmit={(event) => event.preventDefault()}><Search size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} aria-label={t.search} /><button type="submit">{t.searchButton}<ArrowRight size={16} /></button></form>
          <div className="providers-popular"><span>{t.popular} :</span>{["E-commerce", "UI/UX", "Marketing", "Automatisation"].map((term) => <button key={term} type="button" onClick={() => setQuery(term)}>{term}</button>)}</div>
        </div></div>
      </div></section>

      <section className="providers-shell providers-main">
        <div className="providers-trust"><strong>{t.trust}</strong><span><BadgeCheck size={17} />{t.trustVerified}</span><span><Star size={16} />{t.trustReviews}</span><span><ShieldCheck size={17} />{t.trustProtected}</span></div>
        <p className="providers-demo-note">{t.sample}</p>
        <div className="providers-layout">
          <aside className="providers-filters"><div className="providers-filter-title"><h2><SlidersHorizontal size={17} />{t.filters}</h2><button type="button" onClick={clear}>{t.clear}</button></div>
            <fieldset><legend>{t.cats}</legend>{categoryOptions.map(({ id, fr, en: labelEn, Icon }) => <label className="providers-check" key={id}><input type="checkbox" checked={cats.includes(id)} onChange={() => toggleCat(id)} /><span><Icon size={15} /></span>{en ? labelEn : fr}</label>)}</fieldset>
            <fieldset><legend>{t.verification}</legend><label className="providers-check"><input type="checkbox" checked={verified} onChange={(event) => setVerified(event.target.checked)} /><span><BadgeCheck size={15} /></span>{t.verified}</label><label className="providers-check"><input type="checkbox" checked={certified} onChange={(event) => setCertified(event.target.checked)} /><span><CheckMark /></span>{t.certified}</label></fieldset>
            <fieldset><legend>{t.langs}</legend><select value={language} onChange={(event) => setLanguage(event.target.value)}><option value="">{en ? "Any language" : "Toutes les langues"}</option><option value="fr">{langName("fr")}</option><option value="en">{langName("en")}</option><option value="ar">{langName("ar")}</option></select></fieldset>
            <fieldset><legend>{t.sector}</legend><select value={sector} onChange={(event) => setSector(event.target.value)}><option value="">{t.allSectors}</option>{["Commerce", "Services", "Éducation", "Finance", "Beauté", "Tourisme"].map((s) => <option key={s} value={s}>{en ? ({ "Éducation": "Education", "Beauté": "Beauty", "Tourisme": "Tourism" } as Record<string, string>)[s] ?? s : s}</option>)}</select></fieldset>
          </aside>
          <div className="providers-results">
            <div className="providers-results-head"><div><span>{en ? "AIWORX DIRECTORY" : "ANNUAIRE AIWORX"}</span><h2>{t.recommended}</h2><p>{filtered.length} {t.results}</p></div><label>{t.sort}<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="relevance">{t.relevance}</option><option value="rating">{t.rating}</option><option value="experience">{t.experience}</option></select></label></div>
            {cats.length > 0 && <div className="providers-active-filters">{cats.map((id) => <button key={id} type="button" onClick={() => toggleCat(id)}>{(en ? categoryOptions.find((c) => c.id === id)?.en : categoryOptions.find((c) => c.id === id)?.fr)} ×</button>)}</div>}
            {filtered.length ? <div className="providers-cards">{filtered.map((p) => <article className="provider-card" key={p.id}>
              <div className="provider-info"><div className="provider-name-row"><h3>{p.name}</h3><span className="provider-badge"><BadgeCheck size={13} />{t.badge}</span>{p.certified && <span className="provider-cert">{en ? "Certified" : "Certifié"}</span>}</div>
                <p className="provider-role">{en ? p.roleEn : p.role}</p><div className="provider-skills">{p.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                <div className="provider-facts"><span><MapPin size={13} />{p.city}</span><span><Globe2 size={13} />{p.langs.map(langName).join(" · ")}</span><span><BriefcaseBusiness size={13} />{p.missions} {t.mission}</span></div>
                <div className="provider-bottom"><span>{en ? p.catEn : p.catFr}</span><span>{t.quality} <b>{p.score}/100</b></span></div>
              </div>
              <div className="provider-actions"><span className="provider-rating">★ {p.rating.toFixed(1)} <small>({p.reviews} {en ? "reviews" : "avis"})</small></span><button type="button" onClick={() => setSelected(p)}>{t.profile}</button><Link href="/connexion">{t.ask}<ArrowRight size={14} /></Link></div>
            </article>)}</div> : <div className="providers-empty"><strong>{t.noResults}</strong><span>{t.broaden}</span><button type="button" onClick={clear}>{t.clear}</button></div>}
            <div className="providers-privacy"><ShieldCheck size={19} /><p><strong>{t.noteTitle}</strong> {t.note}</p></div>
          </div>
        </div>
      </section>

      {selected && <div className="provider-modal-layer" onClick={() => setSelected(null)}><section className="provider-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title" onClick={(event) => event.stopPropagation()}><button className="provider-modal-close" type="button" aria-label={t.close} onClick={() => setSelected(null)}><X size={20} /></button><span className="provider-badge"><BadgeCheck size={13} />{t.badge}</span><h2 id="profile-title">{selected.name}</h2><p className="provider-role">{en ? selected.roleEn : selected.role}</p><h3>{t.about}</h3><p>{selected.about}</p><h3>{t.expertise}</h3><div className="provider-skills">{selected.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><Link href="/connexion">{t.ask}<ArrowRight size={14} /></Link></section></div>}
    </main>
  );
}

function CheckMark() { return <span aria-hidden="true">✓</span>; }
