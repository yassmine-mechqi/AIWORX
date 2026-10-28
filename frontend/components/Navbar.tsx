"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  User,
  House,
  Settings,
  Users,
  Star,
  BriefcaseBusiness,
  UserRoundPlus,
  Menu,
  X,
} from "lucide-react";

const liens = [
  { href: "/", cle: "accueil", Icon: House },
  { href: "/services", cle: "services", Icon: Settings },
  { href: "/prestataires", cle: "prestataires", Icon: Users },
  { href: "/#comment-ca-marche", cle: "commentCaMarche", Icon: Star },
  { href: "/realisations", cle: "realisations", Icon: BriefcaseBusiness },
  { href: "/devenir-prestataire", cle: "devenirPrestataire", Icon: UserRoundPlus },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [, startTransition] = useTransition();
  const t = useTranslations("Nav");
  const locale = useLocale(); // "fr" ou "en"

  // On écrit le post-it (cookie) puis on demande au serveur de recharger les textes
  function changerLangue(nouvelle: "fr" | "en") {
    document.cookie = `locale=${nouvelle}; path=/; max-age=31536000; SameSite=Lax`;
    startTransition(() => router.refresh());
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-[#FAF9F6]/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex w-full max-w-[1600px] items-center gap-3 px-4 py-3 lg:px-6">
        {/* LOGO AIWORX */}
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center"
          aria-label="Accueil AIWORX"
        >
          <Image
            src="/aiworx-logo-clean.png"
            alt="AIWORX"
            width={460}
            height={105}
            priority
            unoptimized
            className="block h-10 w-auto object-contain sm:h-11"
          />
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 min-[1180px]:flex">
          {liens.map(({ href, cle, Icon }) => {
            const actif =
              href === "/"
                ? pathname === "/"
                : href.startsWith("/#")
                  ? false
                  : pathname === href ||
                    pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                aria-current={actif ? "page" : undefined}
                className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-[13px] font-medium transition-all duration-200 xl:gap-2 xl:px-3 xl:text-sm ${
                  actif
                    ? "border-[#8DDEDA] bg-[#E8F8F6] text-[#159C96]"
                    : "border-[#E1E5EA] bg-white text-[#0D1933] hover:border-[#A6DCD8] hover:bg-[#F0FAF9] hover:text-[#159C96]"
                }`}
              >
                <Icon size={17} strokeWidth={1.9} />
                <span>{t(cle)}</span>
              </Link>
            );
          })}
        </div>

        {/* LANGUES ET CONNEXION */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          {/* SÉLECTEUR DE LANGUE */}
          <div className="flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white p-1">
            <button
              type="button"
              aria-label="Langue française"
              aria-pressed={locale === "fr"}
              onClick={() => changerLangue("fr")}
              className={`rounded-full px-3 py-2 text-xs font-bold transition sm:px-3.5 sm:text-sm ${
                locale === "fr"
                  ? "bg-[#20AAA5] text-white"
                  : "text-[#647084] hover:bg-gray-100"
              }`}
            >
              FR
            </button>

            <button
              type="button"
              aria-label="English language"
              aria-pressed={locale === "en"}
              onClick={() => changerLangue("en")}
              className={`rounded-full px-2.5 py-2 text-xs font-semibold transition sm:px-3 sm:text-sm ${
                locale === "en"
                  ? "bg-[#20AAA5] text-white"
                  : "text-[#647084] hover:bg-gray-100"
              }`}
            >
              EN
            </button>
          </div>

          {/* BOUTON CONNEXION (avec animation au survol) */}
          <Link
            href="/connexion"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0D1933] px-3 py-3 text-sm font-semibold text-white
                       transition-all duration-300
                       hover:-translate-y-0.5 hover:bg-[#1B2B4A] hover:shadow-lg hover:shadow-[#0D1933]/30
                       active:translate-y-0 active:scale-95
                       sm:px-4 lg:px-5"
          >
            <User
              size={17}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span className="hidden sm:inline">{t("seConnecter")}</span>
          </Link>

          {/* BOUTON MENU MOBILE */}
          <button
            type="button"
            aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOuvert}
            onClick={() => setMenuOuvert(!menuOuvert)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E1E5EA] bg-white text-[#0D1933] transition hover:bg-[#E8F8F6] min-[1180px]:hidden"
          >
            {menuOuvert ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {/* MENU MOBILE ET TABLETTE */}
      {menuOuvert && (
        <div className="border-t border-[#E5E7EB] bg-[#FAF9F6] p-4 min-[1180px]:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {liens.map(({ href, cle, Icon }) => {
              const actif =
                href === "/"
                  ? pathname === "/"
                  : href.startsWith("/#")
                    ? false
                    : pathname === href ||
                      pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOuvert(false)}
                  aria-current={actif ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    actif
                      ? "border-[#8DDEDA] bg-[#E8F8F6] text-[#159C96]"
                      : "border-[#E1E5EA] bg-white text-[#0D1933] hover:border-[#A6DCD8] hover:bg-[#F0FAF9]"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                      actif
                        ? "border-[#8DDEDA] bg-white"
                        : "border-[#E1E5EA] bg-[#FAF9F6]"
                    }`}
                  >
                    <Icon size={19} strokeWidth={1.9} />
                  </span>
                  <span>{t(cle)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
