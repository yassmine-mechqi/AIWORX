import type { Metadata } from "next";
import AuthPage from "@/components/auth/AuthPage";
import "../auth.css";

export const metadata: Metadata = {
  title: "Se connecter | AIWORX",
  description: "Connectez-vous à votre espace AIWORX.",
};

export default function ConnexionPage() {
  return <AuthPage mode="login" />;
}
