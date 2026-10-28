import type { Metadata } from "next";
import BecomeProviderPage from "@/components/BecomeProviderPage";
import "./devenir-prestataire.css";

export const metadata: Metadata = {
  title: "Devenir prestataire | AIWORX",
  description: "Présentez votre expertise et candidatez au réseau de prestataires AIWORX.",
};

export default function DevenirPrestatairePage() {
  return <BecomeProviderPage />;
}
