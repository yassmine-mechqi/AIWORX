import {
  BrainCircuit,
  Code2,
  Megaphone,
  Monitor,
  PenTool,
  Users,
} from "lucide-react";

export const categories = [
  {
    slug: "sites-web-ecommerce",
    nom: "Sites web & e-commerce",
    description:
      "Création, refonte et optimisation de sites web et boutiques en ligne.",
    Icone: Monitor,
    degrade: "from-accent to-[#1f9a94]",
    subs: ["Site vitrine", "Catalogue", "Réservation", "E-commerce", "Refonte", "Optimisation"],
    liv: [
      "Maquettes validées",
      "Site développé et mis en ligne",
      "Contenus intégrés",
      "Paramétrage SEO de base",
      "Accès et fichiers sources",
      "Documentation et formation",
    ],
  },
  {
    slug: "applications-logiciels",
    nom: "Applications & logiciels",
    description: "Développement d'applications web, mobiles et outils métiers.",
    Icone: Code2,
    degrade: "from-brand to-[#7c5cf3]",
    subs: ["Application web", "Application mobile", "Outil métier", "CRM", "ERP", "Solution sur mesure"],
    liv: [
      "Spécifications fonctionnelles",
      "Application développée",
      "Tests et recette",
      "Déploiement en production",
      "Code source et accès",
      "Documentation technique et utilisateur",
    ],
  },
  {
    slug: "marketing-digital",
    nom: "Marketing digital",
    description: "Stratégie, acquisition, réseaux sociaux et contenu.",
    Icone: Megaphone,
    degrade: "from-[#5b6cf3] to-[#7c5cf3]",
    subs: ["Stratégie", "Publicité", "Acquisition", "Contenu", "SEO", "Analytics"],
    liv: [
      "Stratégie et plan d'action",
      "Création des campagnes",
      "Paramétrage du suivi (tracking)",
      "Rapport de résultats",
      "Restitution des accès aux comptes",
    ],
  },
  {
    slug: "design-contenu",
    nom: "Design & contenu",
    description: "Identité visuelle, UI/UX, vidéos et rédaction.",
    Icone: PenTool,
    degrade: "from-accent to-[#1f9a94]",
    subs: ["Identité visuelle", "UI/UX", "Visuels", "Vidéo", "Photographie", "Supports commerciaux"],
    liv: [
      "Brief créatif validé",
      "Propositions de pistes",
      "Livrables finaux aux formats demandés",
      "Fichiers sources",
      "Déclinaisons",
      "Guide d'usage",
    ],
  },
  {
    slug: "ia-automatisation",
    nom: "IA & automatisation",
    description: "Des processus plus intelligents pour plus de performance.",
    Icone: BrainCircuit,
    degrade: "from-brand to-[#4f46e5]",
    subs: ["Automatisation", "Assistants", "Intégrations", "Audit", "Cas d'usage IA"],
    liv: [
      "Cadrage du cas d'usage",
      "Prototype ou preuve de concept",
      "Solution en production",
      "Jeux de tests et mesure de précision",
      "Documentation et supervision",
    ],
  },
  {
    slug: "conseil-transformation",
    nom: "Conseil & transformation",
    description: "Accompagnement stratégique et digitalisation des métiers.",
    Icone: Users,
    degrade: "from-[#6d5cf3] to-[#8b5cf6]",
    subs: ["Diagnostic", "Cadrage", "Organisation", "Feuille de route digitale"],
    liv: [
      "Diagnostic de l'existant",
      "Recommandations priorisées",
      "Plan d'action",
      "Présentation de restitution",
      "Document de transfert",
    ],
  },
];

export type Category = (typeof categories)[number];

export const LANGS = ["Français", "Anglais", "Arabe"];