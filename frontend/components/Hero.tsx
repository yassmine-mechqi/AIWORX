// components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`absolute flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0B1B3A] shadow-xl ${className}`}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white">
        <Check size={12} strokeWidth={3} />
      </span>
      {children}
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A3B3A] via-[#0F5A54] to-[#1A7F72]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <h1 className="text-5xl font-extrabold leading-[1.15] text-white md:text-6xl">
            {t("titre1")}
            <br />
            {t("titre2")}
            <br />
            <span className="inline-block border-b-4 border-teal-300 pb-1 text-teal-300">
              {t("accent")}
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
            {t("description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/publier-un-besoin"
              className="flex items-center gap-4 rounded-full bg-white py-2 pl-7 pr-2 font-semibold text-[#0B1B3A] shadow-lg transition hover:scale-[1.03]"
            >
              {t("publier")}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white">
                <ArrowRight size={20} />
              </span>
            </Link>

            <Link
              href="/services"
              className="group flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 font-semibold text-white
                         transition-all duration-300
                         hover:-translate-y-1 hover:border-white hover:bg-white/10 hover:shadow-lg hover:shadow-black/20
                         active:translate-y-0"
            >
              {t("decouvrir")}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto hidden h-[520px] w-full max-w-[560px] lg:block">
          <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5" />

          <div className="absolute left-1/2 top-1/2 flex h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl">
            <Image src="/logo-icon.png" alt="AIWORX" width={140} height={122} priority />
          </div>

          <Badge className="left-0 top-[8%]">{t("badge1")}</Badge>
          <Badge className="right-0 top-[40%]">{t("badge2")}</Badge>
          <Badge className="bottom-[6%] left-[12%]">{t("badge3")}</Badge>
        </div>
      </div>
    </section>
  );
}
