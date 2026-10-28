"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  CATEGORIES, CONFIDENTIALITY, CONTACTS, CURRENCIES, FILE_RIGHTS, FILE_RULES, FLOWS, LANGS, MODELS, PRIORITIES, PUBLICATIONS, REQUIRED_BY_CATEGORY, SLOTS, URGENCIES, // NEW: CONTACTS, SLOTS
  clearDraft, loadDraft, newDraft, saveDraft, submitNeed, todayISO, toPayload, validateFile, validateStep,
  type Draft, type FieldKey, type Mode, type StepId, type SubmitResult,
} from "@/lib/publishNeed";

/* ---------- Icônes ---------- */
const CAT_ICONS: Record<string, ReactNode> = {
  sites: <><rect width="20" height="14" x="2" y="3" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></>,
  apps: <><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></>,
  mkt: <><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>,
  design: <><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></>,
  ia: <><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></>,
  conseil: <><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></>,
  guide: <><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></>,
  libre: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  import: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /><path d="M12 3v12" /></>,
  conseiller: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  smart: <><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></>,
};
const Svg = ({ k, size = 22 }: { k: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{CAT_ICONS[k]}</svg>
);
const Check = ({ size = 12, w = 3.5 }: { size?: number; w?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
);

const SPECIFIC_ERRORS = ["titre", "prob", "res", "fonc", "crit", "libre", "date", "bmin", "bmax"]; // NEW: crit

/* ---------- Champ avec libellé + erreur accessible ---------- */
function Field({ id, label, optional, error, children, style }: { id: string; label?: string; optional?: string; error?: string; children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div className={`field${error ? " bad" : ""}`} data-field={id} style={style}>
      {label && <label className="l" htmlFor={id}>{label} {optional && <small>({optional})</small>}</label>}
      {children}
      {error && <p className="err" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}

function RecapRows({ rows, extra }: { rows: [string, string][]; extra?: [string, string] }) {
  return <div className="recap">{[...rows, ...(extra ? [extra] : [])].map(([k, v]) => <div key={k}><span>{k}</span><strong>{v}</strong></div>)}</div>;
}

export default function PublishNeedWizard() {
  const t = useTranslations("PublishNeed");
  const locale = useLocale();

  const [d, setD] = useState<Draft>(() => ({ ...newDraft("guide"), idx: -1 }));
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState<Draft | null>(null); // brouillon à reprendre
  const [errors, setErrors] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [fileMsg, setFileMsg] = useState("");
  const [exact, setExact] = useState(false);
  const [cgu, setCgu] = useState(false);
  const [livNew, setLivNew] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [done, setDone] = useState<SubmitResult | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  /* reprise de brouillon (lecture du localStorage côté client uniquement) */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPending(loadDraft());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { if (ready && d.idx >= 0 && !done) saveDraft(d); }, [d, ready, done]);

  const flow = d.mode ? FLOWS[d.mode] : [];
  const step: StepId | "mode" = d.idx < 0 ? "mode" : flow[d.idx];
  const cat = CATEGORIES.find((c) => c.id === d.cat);
  const err = (k: string) => (errors.includes(k) ? t(`errors.${k}` as never) : undefined);
  const fmtErr = (k: string) => (errors.includes(k) ? (SPECIFIC_ERRORS.includes(k) ? t(`errors.${k}` as never) : t("errors.required")) : undefined);

  const setF = (k: FieldKey, v: string) => { setD((p) => ({ ...p, f: { ...p.f, [k]: v } })); setErrors((e) => e.filter((x) => x !== k)); };
  const patch = (p: Partial<Draft>, clear: string[] = []) => { setD((x) => ({ ...x, ...p })); setErrors((e) => e.filter((k) => !clear.includes(k))); };
  const txt = (k: FieldKey) => ({
    id: k, value: d.f[k] ?? "", onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF(k, e.target.value),
    "aria-invalid": errors.includes(k) || undefined, "aria-describedby": errors.includes(k) ? `${k}-err` : undefined,
  });
  const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const start = (m: Mode) => { setD(newDraft(m)); setErrors([]); setFiles([]); setExact(false); setCgu(false); scrollTop(); };

  /* ---------- Navigation ---------- */
  const next = async () => {
    if (step === "mode") return;
    const errs = validateStep(step, d, { filesCount: files.length, exact, cgu });
    setErrors(errs);
    if (errs.length) { document.getElementById(errs[0])?.focus(); return; }
    if (d.idx < flow.length - 1) {
      const nd = { ...d, idx: d.idx + 1 };
      if (flow[nd.idx] === "validation") nd.pub = d.mode === "conseiller" ? "qualification" : d.pub || "qualification";
      setD(nd); scrollTop(); return;
    }
    setSending(true); setSendError(false);
    try {
      const res = await submitNeed(toPayload(d, locale, files.map((f) => ({ name: f.name, size: f.size, type: f.type }))), files);
      clearDraft(); setDone(res); scrollTop();
    } catch { setSendError(true); } finally { setSending(false); }
  };
  const prev = () => { setErrors([]); setD((p) => ({ ...p, idx: p.idx > 0 ? p.idx - 1 : -1 })); scrollTop(); };

  /* ---------- Fichiers ---------- */
  const onFiles = (list: FileList | null) => {
    if (!list) return;
    const ok: File[] = []; let msg = "";
    for (const f of Array.from(list)) {
      const v = validateFile(f);
      if (v === "type") msg = t("pieces.errType", { name: f.name });
      else if (v === "size") msg = t("pieces.errSize", { name: f.name, max: FILE_RULES.maxSizeMB });
      else if (files.length + ok.length >= FILE_RULES.maxFiles) msg = t("pieces.errCount", { max: FILE_RULES.maxFiles });
      else ok.push(f);
    }
    setFileMsg(msg); setFiles((p) => [...p, ...ok]); setErrors((e) => e.filter((k) => k !== "files"));
  };

  /* ---------- Récapitulatif ---------- */
  const recap = useMemo(() => {
    const f = d.f, r: [string, string][] = [];
    r.push([t("recap.project"), f.titre || "—"]);
    if (f.ent) r.push([t("recap.company"), f.ent]);
    if (cat) r.push([t("recap.service"), t(`cats.${cat.id}.name` as never)]);
    if (d.subs.length) r.push([t("recap.subs"), d.subs.map((s) => t(`cats.${d.cat}.subs.${s}` as never)).join(", ")]);
    if (d.modele) r.push([t("recap.model"), t(`service.models.${d.modele}.t` as never)]);
    if (d.liv.length) r.push([t("recap.deliverables"), t("recap.planned", { n: d.liv.length })]);
    if (f.date) r.push([t("recap.date"), new Date(`${f.date}T00:00:00`).toLocaleDateString(locale)]);
    if (f.bmin && f.bmax) r.push([t("recap.budget"), `${f.bmin} – ${f.bmax} ${f.dev ?? "MAD"}${f.bshow === false ? ` (${t("recap.hidden")})` : ""}`]);
    if (f.confid) r.push([t("recap.confidentiality"), t(`constraints.confid.${f.confid}.short` as never)]);
    if (files.length) r.push([t("recap.files"), t("recap.fileCount", { n: files.length })]);
    if (d.mode !== "guide") r.push([t("recap.startMode"), t(`mode.${d.mode}.t` as never)]);
    if (d.mode === "conseiller" && f.contact && f.creneau) // NEW
      r.push([t("recap.contact"), `${t(`libre.contacts.${f.contact}` as never)} · ${t(`libre.slots.${f.creneau}` as never)}`]);
    return r;
  }, [d, cat, files.length, locale, t]);
  const stepTitle = (s: StepId) => t(`steps.${s}` as never);
  const inFlow = d.idx >= 0 && !done;

  return (
    <div className="pn" ref={topRef}>
      <div className="wrap">
        <span className="badge"><i />{t("badge")}</span>
        <h1>{t.rich("title", { b: (c) => <span>{c}</span> })}</h1>
        <p className="lead">{t("lead")}</p>

        <div className="layout">
          <div className="card">
            {inFlow && (
              <div>
                <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={flow.length} aria-valuenow={d.idx + 1}><div style={{ width: `${((d.idx + 1) / flow.length) * 100}%` }} /></div>
                <div className="stepinfo"><span aria-live="polite">{t("stepLabel", { n: d.idx + 1, total: flow.length, title: stepTitle(step as StepId) })}</span><span>{t("draftSaved")}</span></div>
              </div>
            )}

            {done ? (
              <div className="done">
                <div className="big"><Check size={34} w={3} /></div>
                <h2>{t("done.title")}</h2>
                <div className="ref"><span>{t("done.ref", { ref: done.reference })}</span><span>{t("done.version", { v: done.version })}</span><span>{t("done.status")}</span></div>
                <RecapRows rows={recap} extra={[t("recap.publication"), t(`validation.pubs.${d.mode === "conseiller" ? "qualification" : d.pub || "qualification"}.t` as never)]} />
                <div className="tl">{[1, 2, 3].map((n) => <div key={n}><b>{n}</b><span>{t(`done.next${n}` as never)}</span></div>)}</div>
              </div>
            ) : (
              <>
                {/* ----- MODE ----- */}
                {step === "mode" && (
                  <div>
                    <h2>{t("mode.title")}</h2>
                    <p className="hint">{t("mode.hint")}</p>
                    {pending && (
                      <div className="banner">
                        <span>{t("draftBanner", { title: pending.f.titre || t("untitled") })}</span>
                        <div>
                          <button type="button" className="mini p" onClick={() => { setD(pending); setPending(null); }}>{t("resume")}</button>
                          <button type="button" className="mini g" onClick={() => { clearDraft(); setPending(null); }}>{t("restart")}</button>
                        </div>
                      </div>
                    )}
                    <div className="modes">
                      {(["guide", "libre", "import", "conseiller"] as Mode[]).map((m) => (
                        <button key={m} type="button" className="mode" onClick={() => start(m)}>
                          {m === "guide" && <span className="tag">{t("mode.recommended")}</span>}
                          <div className="ic"><Svg k={m} /></div>
                          <h3>{t(`mode.${m}.t` as never)}</h3><p>{t(`mode.${m}.d` as never, { n: FLOWS.guide.length } as never)}</p>
                        </button>
                      ))}
                      <button type="button" className="mode" disabled>
                        <span className="tag soon">{t("mode.soon")}</span>
                        <div className="ic"><Svg k="smart" /></div><h3>{t("mode.smart.t")}</h3><p>{t("mode.smart.d")}</p>
                      </button>
                    </div>
                  </div>
                )}

                {/* ----- 1 CONTEXTE ----- */}
                {step === "contexte" && (
                  <div>
                    <h2>{t("contexte.title")}</h2><p className="hint">{t("contexte.hint")}</p>
                    <Field id="titre" label={t("contexte.titre")} error={fmtErr("titre")}><input type="text" {...txt("titre")} placeholder={t("contexte.titreP")} /></Field>
                    <Field id="ent" label={t("contexte.ent")} optional={REQUIRED_OPT(d, "ent", t("optional"))} error={fmtErr("ent")}><input type="text" {...txt("ent")} placeholder={t("contexte.entP")} /></Field>
                    <Field id="prob" label={t("contexte.prob")} error={fmtErr("prob")}><textarea {...txt("prob")} placeholder={t("contexte.probP")} /></Field>
                    {/* NEW : public cible */}
                    <Field id="cible" label={t("contexte.cible")} optional={REQUIRED_OPT(d, "cible", t("optional"))} error={fmtErr("cible")}><input type="text" {...txt("cible")} placeholder={t("contexte.cibleP")} /></Field>
                    <Field id="users" label={t("contexte.users")} optional={REQUIRED_OPT(d, "users", t("optional"))} error={fmtErr("users")}><input type="text" {...txt("users")} placeholder={t("contexte.usersP")} /></Field>
                  </div>
                )}

                {/* ----- 2 OBJECTIFS ----- */}
                {step === "objectifs" && (
                  <div>
                    <h2>{t("objectifs.title")}</h2><p className="hint">{t("objectifs.hint")}</p>
                    <Field id="res" label={t("objectifs.res")} error={fmtErr("res")}><textarea {...txt("res")} placeholder={t("objectifs.resP")} /></Field>
                    <Field id="kpi" label={t("objectifs.kpi")} optional={REQUIRED_OPT(d, "kpi", t("optional"))} error={fmtErr("kpi")}><input type="text" {...txt("kpi")} placeholder={t("objectifs.kpiP")} /></Field>
                    <div className="row">
                      <Field id="prio" label={t("objectifs.prio")}><select {...txt("prio")}>{PRIORITIES.map((p) => <option key={p} value={p}>{t(`objectifs.prios.${p}` as never)}</option>)}</select></Field>
                      <Field id="urg" label={t("objectifs.urg")}><select {...txt("urg")}>{URGENCIES.map((u) => <option key={u} value={u}>{t(`objectifs.urgs.${u}` as never)}</option>)}</select></Field>
                    </div>
                  </div>
                )}

                {/* ----- 3 SERVICE ----- */}
                {step === "service" && (
                  <div>
                    <h2>{t("service.title")}</h2><p className="hint">{t("service.hint")}</p>
                    <div className="choices" role="group" aria-label={t("service.title")}>
                      {CATEGORIES.map((c) => (
                        <button key={c.id} type="button" id={c.id === CATEGORIES[0].id ? "cat" : undefined} aria-pressed={d.cat === c.id} className={`choice${d.cat === c.id ? " sel" : ""}`}
                          onClick={() => d.cat !== c.id && patch({ cat: c.id, subs: [], liv: [] }, ["cat"])}>
                          <span className="ic"><Svg k={c.icon} /></span>{t(`cats.${c.id}.name` as never)}
                        </button>
                      ))}
                    </div>
                    <Field id="cat" error={err("cat")} style={{ marginTop: 8 }}><span /></Field>
                    {cat && (
                      <div>
                        <p className="sub-title">{t("service.subs")} <small>({t("service.subsHint")})</small></p>
                        <div className="chips">{cat.subs.map((s, i) => (
                          <button key={s} id={i === 0 ? "sub" : undefined} type="button" aria-pressed={d.subs.includes(s)} className={`pill${d.subs.includes(s) ? " sel" : ""}`} onClick={() => patch({ subs: toggle(d.subs, s) }, ["sub"])}>{t(`cats.${cat.id}.subs.${s}` as never)}</button>
                        ))}</div>
                        <Field id="sub" error={err("sub")} style={{ marginTop: 6 }}><span /></Field>
                        <p className="sub-title">{t("service.modelTitle")}</p>
                        <div className="rad">{MODELS.map((m, i) => (
                          <button key={m} id={i === 0 ? "modele" : undefined} type="button" aria-pressed={d.modele === m} className={`opt${d.modele === m ? " sel" : ""}`} onClick={() => patch({ modele: m }, ["modele"])}>
                            <b>{t(`service.models.${m}.t` as never)}</b><span>{t(`service.models.${m}.d` as never)}</span>
                          </button>
                        ))}</div>
                        <Field id="modele" error={err("modele")} style={{ marginTop: 6 }}><span /></Field>
                      </div>
                    )}
                  </div>
                )}

                {/* ----- 4 PÉRIMÈTRE ----- */}
                {step === "perimetre" && (
                  <div>
                    <h2>{t("perimetre.title")}</h2><p className="hint">{t("perimetre.hint")}</p>
                    <Field id="fonc" label={t("perimetre.fonc")} error={fmtErr("fonc")}><textarea {...txt("fonc")} placeholder={t("perimetre.foncP")} /></Field>
                    <Field id="excl" label={t("perimetre.excl")} optional={REQUIRED_OPT(d, "excl", t("optional"))} error={fmtErr("excl")}><textarea {...txt("excl")} style={{ minHeight: 90 }} placeholder={t("perimetre.exclP")} /></Field>
                    <div className="row">
                      <Field id="integ" label={t("perimetre.integ")} optional={REQUIRED_OPT(d, "integ", t("optional"))} error={fmtErr("integ")}><input type="text" {...txt("integ")} placeholder={t("perimetre.integP")} /></Field>
                      <Field id="dep" label={t("perimetre.dep")} optional={REQUIRED_OPT(d, "dep", t("optional"))} error={fmtErr("dep")}><input type="text" {...txt("dep")} placeholder={t("perimetre.depP")} /></Field>
                    </div>
                  </div>
                )}

                {/* ----- 5 LIVRABLES ----- */}
                {step === "livrables" && (
                  <div>
                    <h2>{t("livrables.title")}</h2><p className="hint">{t("livrables.hint")}</p>
                    <p className="sub-title">{t("livrables.templates")}</p>
                    <div className="chips">
                      {cat ? cat.liv.map((k) => {
                        const on = d.liv.some((l) => l.tpl === k);
                        return <button key={k} type="button" aria-pressed={on} className={`pill${on ? " sel" : ""}`}
                          onClick={() => patch({ liv: on ? d.liv.filter((l) => l.tpl !== k) : [...d.liv, { tpl: k, text: t(`cats.${cat.id}.liv.${k}` as never) }] }, ["liv"])}>{t(`cats.${cat.id}.liv.${k}` as never)}</button>;
                      }) : <span className="hint inline">{t("livrables.pickCat")}</span>}
                    </div>
                    <div className="liv">{d.liv.map((l, i) => (
                      <div className="it" key={i}>
                        <input type="text" aria-label={t("livrables.item", { n: i + 1 })} value={l.text} onChange={(e) => setD((p) => ({ ...p, liv: p.liv.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)) }))} />
                        <button type="button" className="x" aria-label={t("livrables.remove")} onClick={() => patch({ liv: d.liv.filter((_, j) => j !== i) })}>×</button>
                      </div>
                    ))}</div>
                    <div className="add">
                      <input type="text" id="liv" value={livNew} placeholder={t("livrables.addP")} aria-label={t("livrables.addP")} onChange={(e) => setLivNew(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); (document.getElementById("livAdd") as HTMLButtonElement)?.click(); } }} />
                      <button type="button" id="livAdd" onClick={() => { const v = livNew.trim(); if (!v) return; patch({ liv: [...d.liv, { text: v }] }, ["liv"]); setLivNew(""); }}>{t("livrables.add")}</button>
                    </div>
                    <Field id="liv-e" error={err("liv")}><span /></Field>
                    {/* NEW : critères d'acceptation */}
                    <Field id="crit" label={t("livrables.crit")} error={fmtErr("crit")} style={{ marginTop: 18 }}>
                      <textarea {...txt("crit")} placeholder={t("livrables.critP")} />
                    </Field>
                  </div>
                )}

                {/* ----- 6 CONTRAINTES ----- */}
                {step === "contraintes" && (
                  <div>
                    <h2>{t("constraints.title")}</h2><p className="hint">{t("constraints.hint")}</p>
                    <Field id="date" label={t("constraints.date")} error={fmtErr("date")}><input type="date" {...txt("date")} min={todayISO()} /></Field>
                    <p className="sub-title">{t("constraints.langs")}</p>
                    <div className="chips">{LANGS.map((l) => (
                      <button key={l} type="button" aria-pressed={d.langs.includes(l)} className={`pill${d.langs.includes(l) ? " sel" : ""}`} onClick={() => patch({ langs: toggle(d.langs, l) })}>{t(`constraints.langNames.${l}` as never)}</button>
                    ))}</div>
                    <div className="row">
                      <Field id="tech" label={t("constraints.tech")} optional={REQUIRED_OPT(d, "tech", t("optional"))} error={fmtErr("tech")}><input type="text" {...txt("tech")} placeholder={t("constraints.techP")} /></Field>
                      <Field id="marque" label={t("constraints.brand")} optional={REQUIRED_OPT(d, "marque", t("optional"))} error={fmtErr("marque")}><input type="text" {...txt("marque")} placeholder={t("constraints.brandP")} /></Field>
                    </div>
                    <Field id="conf" label={t("constraints.conf")} optional={REQUIRED_OPT(d, "conf", t("optional"))} error={fmtErr("conf")}><input type="text" {...txt("conf")} placeholder={t("constraints.confP")} /></Field>
                    <Field id="confid" label={t("constraints.confidLabel")}><select {...txt("confid")}>{CONFIDENTIALITY.map((c) => <option key={c} value={c}>{t(`constraints.confid.${c}.long` as never)}</option>)}</select></Field>
                  </div>
                )}

                {/* ----- 7 BUDGET ----- */}
                {step === "budget" && (
                  <div>
                    <h2>{t("budget.title")}</h2><p className="hint">{t("budget.hint")}</p>
                    <div className="row3">
                      <Field id="dev" label={t("budget.currency")}><select {...txt("dev")}>{CURRENCIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
                      <Field id="bmin" label={t("budget.min")} error={fmtErr("bmin")}><input type="number" min={0} inputMode="decimal" {...txt("bmin")} placeholder="5000" /></Field>
                      <Field id="bmax" label={t("budget.max")} error={fmtErr("bmax")}><input type="number" min={0} inputMode="decimal" {...txt("bmax")} placeholder="15000" /></Field>
                    </div>
                    <label className="check"><input type="checkbox" checked={d.f.bshow} onChange={(e) => setD((p) => ({ ...p, f: { ...p.f, bshow: e.target.checked } }))} /><span>{t("budget.show")}</span></label>
                  </div>
                )}

                {/* ----- 8 PIÈCES ----- */}
                {step === "pieces" && (
                  <div>
                    <h2>{d.mode === "import" ? t("pieces.titleImport") : t("pieces.title")}</h2>
                    <p className="hint">{d.mode === "import" ? t("pieces.hintImport") : t("pieces.hint")}</p>
                    <label className="drop" id="files" tabIndex={0}>
                      <input type="file" multiple className="sr" accept={FILE_RULES.extensions.map((e) => `.${e}`).join(",")} onChange={(e) => { onFiles(e.target.files); e.target.value = ""; }} />
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1f9d8c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{CAT_ICONS.import}</svg>
                      <strong>{t("pieces.drop")}</strong><span>{t("pieces.formats", { max: FILE_RULES.maxSizeMB })}</span>
                    </label>
                    {fileMsg && <p className="err" style={{ display: "block" }} role="alert">{fileMsg}</p>}
                    <div className="files">{files.map((f, i) => (
                      <div className="file" key={`${f.name}-${i}`}><span>📎 {f.name}</span><button type="button" aria-label={t("livrables.remove")} onClick={() => setFiles((p) => p.filter((_, j) => j !== i))}>×</button></div>
                    ))}</div>
                    <Field id="files-e" error={err("files")}><span /></Field>
                    <Field id="droits" label={t("pieces.rights")}><select {...txt("droits")}>{FILE_RIGHTS.map((r) => <option key={r} value={r}>{t(`pieces.rightsOpts.${r}` as never)}</option>)}</select></Field>
                  </div>
                )}

                {/* ----- LIBRE ----- */}
                {step === "libre" && (
                  <div>
                    <h2>{t("libre.title")}</h2>
                    <p className="hint">{d.mode === "conseiller" ? t("libre.hintAdvisor") : t("libre.hint")}</p>
                    <Field id="titre" label={t("contexte.titre")} error={fmtErr("titre")}><input type="text" {...txt("titre")} placeholder={t("libre.titreP")} /></Field>
                    <Field id="libre" label={t("libre.desc")} error={fmtErr("libre")}><textarea {...txt("libre")} style={{ minHeight: 190 }} placeholder={t("libre.descP")} /></Field>
                    {/* NEW : contact préféré (mode accompagné uniquement) */}
                    {d.mode === "conseiller" && (
                      <div className="row">
                        <Field id="contact" label={t("libre.contact")}>
                          <select {...txt("contact")}>{CONTACTS.map((c) => <option key={c} value={c}>{t(`libre.contacts.${c}` as never)}</option>)}</select>
                        </Field>
                        <Field id="creneau" label={t("libre.slot")}>
                          <select {...txt("creneau")}>{SLOTS.map((s) => <option key={s} value={s}>{t(`libre.slots.${s}` as never)}</option>)}</select>
                        </Field>
                      </div>
                    )}
                  </div>
                )}

                {/* ----- 9 VALIDATION ----- */}
                {step === "validation" && (
                  <div>
                    <h2>{t("validation.title")}</h2><p className="hint">{t("validation.hint")}</p>
                    <RecapRows rows={recap} />
                    {d.mode === "conseiller" ? (
                      <p className="hint" style={{ marginTop: 20 }}>{t("validation.forced")}</p>
                    ) : (
                      <div>
                        <p className="sub-title">{t("validation.pubTitle")}</p>
                        <div className="rad two">{PUBLICATIONS.map((p) => (
                          <button key={p} type="button" aria-pressed={d.pub === p} className={`opt${d.pub === p ? " sel" : ""}`} onClick={() => patch({ pub: p })}>
                            <b>{t(`validation.pubs.${p}.t` as never)}</b><span>{t(`validation.pubs.${p}.d` as never)}</span>
                          </button>
                        ))}</div>
                      </div>
                    )}
                    <Field id="exact" error={err("exact")} style={{ marginTop: 6 }}>
                      <label className="check"><input id="exact" type="checkbox" checked={exact} onChange={(e) => { setExact(e.target.checked); setErrors((x) => x.filter((k) => k !== "exact")); }} /><span>{t("validation.exact")}</span></label>
                    </Field>
                    <Field id="cgu" error={err("cgu")} style={{ marginTop: 0 }}>
                      <label className="check" style={{ marginTop: 12 }}><input id="cgu" type="checkbox" checked={cgu} onChange={(e) => { setCgu(e.target.checked); setErrors((x) => x.filter((k) => k !== "cgu")); }} /><span>{t("validation.cgu")}</span></label>
                    </Field>
                    {sendError && <p className="err" style={{ display: "block", marginTop: 14 }} role="alert">{t("errors.send")}</p>}
                  </div>
                )}

                {inFlow && (
                  <div className="actions">
                    <button type="button" className="btn ghost" onClick={prev} disabled={sending}>← {t("nav.back")}</button>
                    <button type="button" className="btn primary" onClick={next} disabled={sending}>
                      {sending ? t("nav.sending") : d.idx === flow.length - 1 ? t("nav.send") : t("nav.next")}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <aside className="side">
            {inFlow && (
              <div>
                <h3>{t("side.progress")}</h3>
                <ol>{flow.map((s, i) => (
                  <li key={s} className={i === d.idx ? "cur" : i < d.idx ? "ok" : ""} aria-current={i === d.idx ? "step" : undefined}><b>{i < d.idx ? "✓" : i + 1}</b>{stepTitle(s)}</li>
                ))}</ol>
                <hr />
              </div>
            )}
            <h3>{t("side.next")}</h3>
            <ul>{[1, 2, 3].map((n) => <li key={n}><b><Check /></b>{t(`side.n${n}` as never)}</li>)}</ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

/** Affiche « facultatif » seulement si la catégorie choisie ne rend pas le champ obligatoire. */
function REQUIRED_OPT(d: Draft, k: FieldKey, label: string) {
  const req = (REQUIRED_BY_CATEGORY[d.cat as keyof typeof REQUIRED_BY_CATEGORY] ?? []).includes(k);
  return req ? undefined : label;
}
