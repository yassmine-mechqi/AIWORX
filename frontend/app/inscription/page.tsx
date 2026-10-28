import type { Metadata } from "next";
import AuthPage from "@/components/auth/AuthPage";
import "../auth.css";

export const metadata: Metadata = {
  title: "Créer un compte | AIWORX",
  description: "Créez votre compte AIWORX pour gérer vos projets digitaux.",
};

export default function InscriptionPage() {
  return <AuthPage mode="register" />;
}
