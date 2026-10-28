import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  FileText,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";

const etapes = [
  { cle: "publier", numero: "01", Icone: FileText },
  { cle: "offres", numero: "02", Icone: Users },
  { cle: "choisir", numero: "03", Icone: ShieldCheck },
  { cle: "suivre", numero: "04", Icone: Rocket },
] as const;

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  return (
    <section id="comment-ca-marche" className="scroll-mt-24 bg-soft py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[5fr_7fr] lg:gap-16">
        {/* Colonne gauche */}
        <div className="flex flex-col items-start justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1f9d8c] shadow-sm ring-1 ring-black/5">
            <span className="h-2 w-2 rounded-full bg-[#2fbfae]" />
            {t("surtitre")}
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl">
            {t("titre")}{" "}
            <span className="text-[#2fbfae]">{t("titreAccent")}</span>
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {t("sousTitre")}
          </p>

          <Link
            href="/publier-un-besoin"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-navy px-7 py-4 text-base font-semibold text-white shadow-lg shadow-navy/20 transition hover:-translate-y-0.5 hover:bg-navy-light"
          >
            {t("enSavoirPlus")}
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Colonne droite : étapes */}
        <div className="grid gap-6 sm:grid-cols-2">
          {etapes.map(({ cle, numero, Icone }, index) => (
            <div
              key={cle}
              className="relative rounded-3xl bg-white p-7 shadow-[0_10px_40px_-15px_rgba(11,27,58,0.15)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(31,157,140,0.35)]"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-[#3dd1bd] to-[#1f9d8c] text-white shadow-lg shadow-[#2fbfae]/30">
                  <Icone size={28} strokeWidth={1.8} />
                </span>
                <span className="text-5xl font-extrabold leading-none text-[#2fbfae]/20">
                  {numero}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-navy">
                {t(`etapes.${cle}.titre`)}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">
                {t(`etapes.${cle}.texte`)}
              </p>

              {/* flèche de liaison entre les cartes (desktop) */}
              {index % 2 === 0 && (
                <span className="absolute -right-5 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white text-[#1f9d8c] shadow-md ring-1 ring-black/5 sm:grid">
                  <ArrowRight size={16} />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}