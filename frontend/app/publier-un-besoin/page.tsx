import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PublishNeedWizard from "@/components/publish/PublishNeedWizard";
import "./publish-need.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PublishNeed");
  return { title: `${t("badge")} | AIWORX` };
}

export default function PublierUnBesoinPage() {
  return <PublishNeedWizard />;
}