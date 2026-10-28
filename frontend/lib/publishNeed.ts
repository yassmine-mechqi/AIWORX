/**
 * AIWORX — "Publier un besoin" (CDC §11, §57, §58, §59)
 * Configuration, types, validation, brouillon et envoi.
 * Les textes affichés sont dans messages/{fr,en}.json (namespace "PublishNeed").
 * Les valeurs stockées sont des identifiants stables, jamais des libellés traduits.
 */

export type Mode = "guide" | "libre" | "import" | "conseiller";
export type StepId =
  | "contexte" | "objectifs" | "service" | "perimetre" | "livrables"
  | "contraintes" | "budget" | "pieces" | "libre" | "validation";

/** Parcours selon le mode de démarrage (CDC §11). */
export const FLOWS: Record<Mode, StepId[]> = {
  guide: ["contexte", "objectifs", "service", "perimetre", "livrables", "contraintes", "budget", "pieces", "validation"],
  libre: ["service", "libre", "budget", "pieces", "validation"],
  import: ["service", "pieces", "budget", "validation"],
  conseiller: ["service", "libre", "validation"],
};

/** Catégories du catalogue (CDC §7). Libellés : messages → PublishNeed.cats.<id>. */
export const CATEGORIES = [
  { id: "sites", icon: "sites",
    subs: ["vitrine", "catalogue", "reservation", "ecommerce", "refonte", "optimisation"],
    liv: ["mockups", "siteLive", "content", "seo", "sources", "docs"] },
  { id: "apps", icon: "apps",
    subs: ["webapp", "mobile", "business", "crm", "erp", "custom"],
    liv: ["specs", "app", "tests", "deploy", "code", "docs"] },
  { id: "mkt", icon: "mkt",
    subs: ["strategy", "ads", "acquisition", "content", "seo", "analytics"],
    liv: ["plan", "campaigns", "tracking", "report", "accounts"] },
  { id: "design", icon: "design",
    subs: ["identity", "uiux", "visuals", "video", "photo", "sales"],
    liv: ["brief", "concepts", "finals", "sources", "variants", "guide"] },
  { id: "ia", icon: "ia",
    subs: ["automation", "assistants", "integrations", "audit", "usecases"],
    liv: ["framing", "poc", "production", "tests", "docs"] },
  { id: "conseil", icon: "conseil",
    subs: ["diagnostic", "framing", "organisation", "roadmap"],
    liv: ["diagnostic", "recos", "plan", "presentation", "handover"] },
] as const;

export const MODELS = ["predefined", "configurable", "custom"] as const;
export const LANGS = ["fr", "en", "ar"] as const;
export const PRIORITIES = ["high", "medium", "low"] as const;
export const URGENCIES = ["immediate", "month", "quarter", "flexible"] as const;
export const CURRENCIES = ["MAD", "EUR", "USD"] as const;
export const CONFIDENTIALITY = ["standard", "high"] as const;
export const FILE_RIGHTS = ["invited", "selected", "nda"] as const;
export const PUBLICATIONS = ["autonomous", "qualification"] as const;
export const CONTACTS = ["email", "phone", "whatsapp"] as const; // NEW
export const SLOTS = ["morning", "afternoon", "evening"] as const; // NEW

/** Fichiers : liste blanche + limites (CDC §43). L'antivirus est côté serveur. */
export const FILE_RULES = {
  maxFiles: 10,
  maxSizeMB: 25,
  extensions: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "csv", "png", "jpg", "jpeg", "webp", "mp4", "mov"],
};

/** Longueurs minimales. */
export const MIN_LEN = { titre: 3, prob: 20, res: 10, fonc: 10, libre: 30, crit: 10 }; // NEW: crit

/**
 * CDC §57 : « les champs obligatoires dépendent de la catégorie et sont pilotés par configuration ».
 * Valeurs de départ, à ajuster selon le cahier des charges.
 */
export const REQUIRED_BY_CATEGORY: Partial<Record<(typeof CATEGORIES)[number]["id"], FieldKey[]>> = {
  apps: ["integ", "tech"],
  mkt: ["marque"],
  design: ["marque"],
  ia: ["integ", "conf"],
}; // NEW

export type FieldKey =
  | "titre" | "ent" | "prob" | "cible" | "users" | "res" | "kpi" | "prio" | "urg"
  | "fonc" | "excl" | "integ" | "dep" | "crit" | "date" | "tech" | "marque" | "conf"
  | "confid" | "dev" | "bmin" | "bmax" | "droits" | "libre" | "contact" | "creneau"; // NEW: cible, crit, contact, creneau

export interface LivItem { tpl?: string; text: string }

export interface Draft {
  mode: Mode;
  idx: number; // -1 = écran de choix du mode
  f: Partial<Record<FieldKey, string>> & { bshow: boolean };
  cat: string;
  subs: string[];
  modele: string;
  liv: LivItem[];
  langs: string[];
  pub: string;
}

export const newDraft = (mode: Mode): Draft => ({
  mode, idx: 0, cat: "", subs: [], modele: "", liv: [], langs: ["fr"], pub: "",
  f: { bshow: true, prio: "medium", urg: "month", dev: "MAD", confid: "standard", droits: "invited", contact: "email", creneau: "morning" }, // NEW: contact, creneau
});

/* ---------- Brouillon (sauvegarde auto, CDC §57) ---------- */
const KEY = "aiworx_need_draft_v2"; // NEW: v2, car la structure du brouillon a changé
export const loadDraft = (): Draft | null => {
  try { const r = localStorage.getItem(KEY); const d = r ? (JSON.parse(r) as Draft) : null; return d && d.mode && d.idx >= 0 ? d : null; }
  catch { return null; }
};
export const saveDraft = (d: Draft) => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch { /* quota / navigation privée */ } };
export const clearDraft = () => { try { localStorage.removeItem(KEY); } catch { /* noop */ } };

/* ---------- Validation ---------- */
export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function validateFile(file: File): "type" | "size" | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!FILE_RULES.extensions.includes(ext)) return "type";
  if (file.size > FILE_RULES.maxSizeMB * 1024 * 1024) return "size";
  return null;
}

/** Retourne les clés en erreur (vide = étape valide). */
export function validateStep(id: StepId, d: Draft, ctx: { filesCount: number; exact: boolean; cgu: boolean }): string[] {
  const f = d.f, len = (k: FieldKey) => (f[k] ?? "").trim().length, e: string[] = [];
  const need = (k: FieldKey, min: number) => { if (len(k) < min) e.push(k); };

  if (id === "contexte") { need("titre", MIN_LEN.titre); need("prob", MIN_LEN.prob); }
  if (id === "objectifs") need("res", MIN_LEN.res);
  if (id === "service") {
    if (!d.cat) e.push("cat");
    else { if (!d.subs.length) e.push("sub"); if (!d.modele) e.push("modele"); }
  }
  if (id === "perimetre") need("fonc", MIN_LEN.fonc);
  if (id === "livrables") { // NEW: critères d'acceptation obligatoires
    if (!d.liv.some((l) => l.text.trim())) e.push("liv");
    need("crit", MIN_LEN.crit);
  }
  if (id === "contraintes" && (!f.date || f.date < todayISO())) e.push("date");
  if (id === "budget") {
    const mn = Number(f.bmin), mx = Number(f.bmax);
    if (!(mn > 0)) e.push("bmin");
    if (!(mx > 0) || mx < mn) e.push("bmax");
  }
  if (id === "pieces" && d.mode === "import" && ctx.filesCount === 0) e.push("files");
  if (id === "libre") { need("titre", MIN_LEN.titre); need("libre", MIN_LEN.libre); }
  if (id === "validation") { if (!ctx.exact) e.push("exact"); if (!ctx.cgu) e.push("cgu"); }

  // Champs obligatoires pilotés par la catégorie
  const extra = REQUIRED_BY_CATEGORY[d.cat as keyof typeof REQUIRED_BY_CATEGORY] ?? [];
  const stepFields: Partial<Record<StepId, FieldKey[]>> = {
    contexte: ["ent", "cible", "users"], objectifs: ["kpi"], perimetre: ["excl", "integ", "dep"], contraintes: ["tech", "marque", "conf"],
  }; // NEW: cible
  (stepFields[id] ?? []).forEach((k) => { if (extra.includes(k) && !len(k)) e.push(k); });
  return e;
}

/* ---------- Envoi (CDC §40, §58) ---------- */
export interface SubmitResult { reference: string; version: number; status: "submitted" }

/** Montants en unités mineures (CDC §51), dates en UTC ISO. */
export function toPayload(d: Draft, locale: string, filesMeta: { name: string; size: number; type: string }[]) {
  const toMinor = (v?: string) => Math.round(Number(v ?? 0) * 100);
  const noEmpty = <T extends object>(o: T) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== "" && v !== undefined));
  return {
    status: "submitted",
    startMode: d.mode,
    locale,
    publication: d.mode === "conseiller" ? "qualification" : d.pub || "qualification",
    category: d.cat,
    subcategories: d.subs,
    serviceModel: d.modele,
    context: noEmpty({ title: d.f.titre, company: d.f.ent, problem: d.f.prob, targetAudience: d.f.cible, users: d.f.users }), // NEW: targetAudience
    objectives: noEmpty({ expected: d.f.res, kpi: d.f.kpi, priority: d.f.prio, urgency: d.f.urg }),
    scope: noEmpty({ included: d.f.fonc, excluded: d.f.excl, integrations: d.f.integ, dependencies: d.f.dep }),
    deliverables: d.liv.map((l) => l.text.trim()).filter(Boolean),
    acceptanceCriteria: d.f.crit ?? "", // NEW
    constraints: noEmpty({
      desiredDeliveryAt: d.f.date ? new Date(`${d.f.date}T00:00:00Z`).toISOString() : "",
      languages: d.langs, technology: d.f.tech, brand: d.f.marque, compliance: d.f.conf, confidentiality: d.f.confid,
    }),
    freeDescription: d.f.libre ?? "",
    support: d.mode === "conseiller" ? { preferredContact: d.f.contact, preferredSlot: d.f.creneau } : undefined, // NEW
    budget: { currency: d.f.dev ?? "MAD", minMinor: toMinor(d.f.bmin), maxMinor: toMinor(d.f.bmax), visibleToProviders: d.f.bshow },
    attachments: { files: filesMeta, access: d.f.droits },
    consents: { accuracy: true, terms: true, at: new Date().toISOString() },
  };
}

/**
 * Branchement backend : POST {NEXT_PUBLIC_API_URL}/v1/project-requests
 * - Clé d'idempotence pour éviter les doublons (CDC §40).
 * - Les fichiers partent ensuite vers le stockage objet via URL temporaire (CDC §43) :
 *   le serveur renvoie `uploadUrls` ; à brancher ici.
 * Sans NEXT_PUBLIC_API_URL, une réponse simulée est renvoyée (développement).
 */
export async function submitNeed(payload: ReturnType<typeof toPayload>, files: File[]): Promise<SubmitResult> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) {
    await new Promise((r) => setTimeout(r, 600));
    return { reference: `BES-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`, version: 1, status: "submitted" };
  }
  const res = await fetch(`${base}/v1/project-requests`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json", "Idempotency-Key": crypto.randomUUID() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as SubmitResult & { uploadUrls?: { name: string; url: string }[] };
  for (const u of data.uploadUrls ?? []) {
    const file = files.find((f) => f.name === u.name);
    if (file) await fetch(u.url, { method: "PUT", body: file });
  }
  return data;
}