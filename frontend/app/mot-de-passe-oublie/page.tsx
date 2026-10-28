import type { Metadata } from "next";
import ForgotPasswordPage from "@/components/auth/ForgotPasswordPage";
import "../auth.css";

export const metadata: Metadata = {
  title: "Mot de passe oublié | AIWORX",
  description: "Demandez un lien de réinitialisation pour votre mot de passe AIWORX.",
};

export default function MotDePasseOublieRoute() {
  return <ForgotPasswordPage />;
}
