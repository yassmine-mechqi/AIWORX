import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Bot,
  Check,
  Code,
  Compass,
  CreditCard,
  FileText,
  Megaphone,
  Monitor,
  Palette,
  ShieldCheck,
} from "lucide-react";

const categories = [
  { id: "sites-web-ecommerce", Icone: Monitor },
  { id: "applications-logiciels", Icone: Code },
  { id: "marketing-digital", Icone: Megaphone },
  { id: "design-contenu", Icone: Palette },
  { id: "ia-automatisation", Icone: Bot },
  { id: "conseil-transformation", Icone: Compass },
] as const;

const garanties = [
  { cle: "verifies", Icone: ShieldCheck },
  { cle: "besoin", Icone: FileText },
  { cle: "qualite", Icone: Check },
  { cle: "paiement", Icone: CreditCard },
] as const;

const manieres = [
  { cle: "publier", numero: "01" },
  { cle: "accompagne", numero: "02" },
  { cle: "profil", numero: "03" },
] as const;

export default function ServicesPage() {
  const t = useTranslations("ServicesPage");
  const ts = useTranslations("Services");

  return (
    <main className="bg-soft">
      {/* En-tête */}
      <header className="bg-linear-to-br from-[#d9f1ed] via-[#f4fbf9] to-soft pb-10 pt-16 lg:pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1f9d8c] shadow-sm ring-1 ring-black/5">
            <span className="h-2 w-2 rounded-full bg-[#2fbfae]" />
            {t("surtitre")}
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[54px]">
            {t("titre")}{" "}
            <span className="text-[#2fbfae]">{t("titreAccent")}</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {t("sousTitre")}
          </p>

          <nav className="mt-8 flex flex-wrap gap-3">
            {categories.map(({ id, Icone }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy ring-1 ring-black/5 transition hover:bg-navy hover:text-white"
              >
                <Icone
                  size={18}
                  className="text-[#1f9d8c] transition group-hover:text-[#3de8d0]"
                />
                {ts(`items.${id}.nom`)}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Catégories détaillées */}
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 pb-6 pt-8 lg:px-8">
        {categories.map(({ id, Icone }) => {
          const sousServices = t.raw(`categories.${id}.sousServices`) as string[];
          const controles = t.raw(`categories.${id}.controles`) as string[];

          return (
            <section
              key={id}
              id={id}
              className="grid scroll-mt-28 overflow-hidden rounded-[32px] bg-white shadow-[0_10px_40px_-15px_rgba(11,27,58,0.15)] ring-1 ring-black/5 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="p-8 lg:p-10">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-[#3dd1bd] to-[#1f9d8c] text-white shadow-lg shadow-[#2fbfae]/30">
                  <Icone size={28} strokeWidth={1.8} />
                </span>

                <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-navy">
                  {ts(`items.${id}.nom`)}
                </h2>
                <p className="mt-2.5 text-[17px] leading-relaxed text-muted">
                  {ts(`items.${id}.description`)}
                </p>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.14em] text-[#1f9d8c]">
                  {t("demander")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sousServices.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#eaf7f4] px-3.5 py-1.5 text-sm font-semibold text-[#14665e]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  href="/publier-un-besoin"
                  className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-navy px-6 py-3.5 font-semibold text-white shadow-lg shadow-navy/20 transition hover:-translate-y-0.5 hover:bg-navy-light"
                >
                  {t("publier")}
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="border-t border-slate-200/70 bg-[#f6f9fb] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1f9d8c]">
                  {t("controle")}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {t("controleNote")}
                </p>
                <ul className="mt-5 grid gap-x-4 gap-y-3 sm:grid-cols-2">
                  {controles.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[15px] font-medium leading-snug text-navy"
                    >
                      <span className="mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[#2fbfae] text-white">
                        <Check size={12} strokeWidth={3.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      {/* Notre cadre */}
      <section className="mx-auto max-w-7xl px-6 pb-6 pt-14 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1f9d8c] shadow-sm ring-1 ring-black/5">
          <span className="h-2 w-2 rounded-full bg-[#2fbfae]" />
          {t("garanties.surtitre")}
        </span>
        <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl">
          {t("garanties.titre")}{" "}
          <span className="text-[#2fbfae]">{t("garanties.titreAccent")}</span>
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {garanties.map(({ cle, Icone }) => (
            <div
              key={cle}
              className="rounded-3xl bg-white p-6 shadow-[0_10px_40px_-15px_rgba(11,27,58,0.12)] ring-1 ring-black/5"
            >
              <span className="grid h-[52px] w-[52px] place-items-center rounded-2xl bg-linear-to-br from-[#3dd1bd] to-[#1f9d8c] text-white shadow-lg shadow-[#2fbfae]/30">
                <Icone size={24} strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy">
                {t(`garanties.items.${cle}.titre`)}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {t(`garanties.items.${cle}.texte`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comment démarrer */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1f9d8c] shadow-sm ring-1 ring-black/5">
          <span className="h-2 w-2 rounded-full bg-[#2fbfae]" />
          {t("demarrer.surtitre")}
        </span>
        <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl">
          {t("demarrer.titre")}{" "}
          <span className="text-[#2fbfae]">{t("demarrer.titreAccent")}</span>
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {manieres.map(({ cle, numero }) => (
            <div
              key={cle}
              className="rounded-3xl bg-white p-7 shadow-[0_10px_40px_-15px_rgba(11,27,58,0.12)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(31,157,140,0.35)]"
            >
              <span className="text-[44px] font-extrabold leading-none text-[#2fbfae]/25">
                {numero}
              </span>
              <h3 className="mt-3.5 text-xl font-bold text-navy">
                {t(`demarrer.items.${cle}.titre`)}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">
                {t(`demarrer.items.${cle}.texte`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Appel à l'action final */}
      <section className="bg-linear-to-br from-[#0b4a45] to-[#14665e] py-16 text-white lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {t("cta.titre")}{" "}
              <span className="text-[#3de8d0]">{t("cta.titreAccent")}</span>
            </h2>
            <p className="mt-3 max-w-lg text-[17px] leading-relaxed text-[#b9dcd6]">
              {t("cta.texte")}
            </p>
          </div>

          <div className="flex flex-wrap gap-3.5">
            <Link
              href="/publier-un-besoin"
              className="inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 font-semibold text-navy transition hover:-translate-y-0.5"
            >
              {t("cta.publier")}
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#1fbfae] text-white">
                <ArrowRight size={20} />
              </span>
            </Link>
            <Link
              href="/devenir-prestataire"
              className="inline-flex min-h-[60px] items-center rounded-full border border-white/35 px-6 font-semibold text-white transition hover:bg-white/10"
            >
              {t("cta.prestataire")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}