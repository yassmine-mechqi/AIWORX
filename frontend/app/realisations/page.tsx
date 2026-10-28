import type { Metadata } from "next";
import CaseStudies from "@/components/CaseStudies";
import "./realisations.css";

export const metadata: Metadata = {
  title: "Réalisations | AIWORX",
  description: "Découvrez des exemples de projets digitaux AIWORX.",
};

export default function RealisationsPage() {
  return <CaseStudies />;
}
