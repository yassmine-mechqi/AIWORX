import type { Metadata } from "next";
import CompanySignupPage from "@/components/auth/CompanySignupPage";
import "../../auth.css";

export const metadata: Metadata = {
  title: "Créer un compte entreprise | AIWORX",
  description: "Créez un compte entreprise pour publier et suivre vos besoins AIWORX.",
};

export default function InscriptionEntreprisePage() {
  return <CompanySignupPage />;
}
