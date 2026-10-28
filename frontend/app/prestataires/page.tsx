import type { Metadata } from "next";
import ProvidersDirectory from "@/components/ProvidersDirectory";
import "./prestataires.css";

export const metadata: Metadata = {
  title: "Prestataires vérifiés | AIWORX",
  description: "Explorez les profils de prestataires digitaux vérifiés par AIWORX.",
};

export default function PrestatairesPage() {
  return <ProvidersDirectory />;
}
