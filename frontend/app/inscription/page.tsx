import type { Metadata } from "next";
import SignupChoicePage from "@/components/auth/SignupChoicePage";
import "../auth.css";

export const metadata: Metadata = {
  title: "Créer un compte | AIWORX",
  description: "Choisissez un compte entreprise ou prestataire sur AIWORX.",
};

export default function InscriptionPage() {
  return <SignupChoicePage />;
}
