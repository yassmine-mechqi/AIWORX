import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { categories } from "../lib/categories";

export default function ServicesSection() {
  const t = useTranslations("Services");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F4FAF8] to-white px-6 py-20 lg:py-24">
      {/* Lueur teal en haut à droite */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[620px] rounded-full bg-[#3DBDB0]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* ===== EN-TÊTE ===== */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            {/* Surtitre en pastille */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#E3ECEA] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1F9A8E] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#3DBDB0]" />
              {t("surtitre")}
            </span>

            {/* Titre avec accent en dégradé */}
            <h2 className="mt-5 max-w-3xl text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0B1B3A] md:text-5xl">
              {t("titre")}{" "}
              <span className="bg-gradient-to-r from-[#3DBDB0] to-[#1F9A8E] bg-clip-text text-transparent">
                {t("titreAccent")}
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4B5B70] md:text-lg">
              {t("sousTitre")}
            </p>
          </div>

          {/* Bouton contour */}
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 rounded-full border-[1.5px] border-[#0B1B3A] bg-white px-6 py-3.5 text-sm font-bold text-[#0B1B3A]
                       transition-all duration-300
                       hover:-translate-y-0.5 hover:bg-[#0B1B3A] hover:text-white hover:shadow-lg"
          >
            {t("voirTout")}
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ===== GRILLE DE CARTES (3 colonnes) ===== */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ slug, Icone }) => (
            <Link
              key={slug}
              href={`/services#${slug}`}
              className="group flex min-h-[270px] flex-col rounded-[26px] border border-[#E3ECEA] bg-white p-8
                         shadow-[0_1px_2px_rgba(11,27,58,.04),0_10px_30px_rgba(11,27,58,.05)]
                         transition-all duration-300
                         hover:-translate-y-2.5 hover:border-[#3DBDB0] hover:shadow-[0_22px_50px_rgba(31,154,142,.22)]"
            >
              {/* Pastille d'icône (toujours teal) */}
              <span className="grid h-16 w-16 place-items-center rounded-[18px] bg-gradient-to-br from-[#3DBDB0] to-[#1F9A8E] text-white shadow-[0_10px_22px_rgba(31,154,142,.32)]">
                <Icone size={30} strokeWidth={1.9} />
              </span>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-[#0B1B3A]">
                {t(`items.${slug}.nom`)}
              </h3>
              <p className="mt-2.5 flex-1 text-[15.5px] leading-relaxed text-[#4B5B70]">
                {t(`items.${slug}.description`)}
              </p>

              {/* Rond avec flèche : se remplit de teal au survol */}
              <span
                className="mt-5 grid h-[42px] w-[42px] place-items-center rounded-full border-[1.5px] border-[#E3ECEA] text-[#0B1B3A]
                           transition-all duration-300
                           group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-[#3DBDB0] group-hover:to-[#1F9A8E] group-hover:text-white"
              >
                <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
