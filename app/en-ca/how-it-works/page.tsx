import { Metadata } from "next";
import HowItWorks from "@/src/components/pages/howItWorks/HowItWorks";

export const metadata: Metadata = {
  title:
    "How It Works - Flashfire Job Search Automation for Students | Flashfire",
  description:
    "See how Flashfire gets international students interview calls faster: visa-aware matching, ATS-ready resumes, automated applications, tracking, and interview prep.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/how-it-works",
  },
  openGraph: {
    title: "How It Works - Flashfire Job Search Automation",
    description:
      "Understand how Flashfire automates sourcing, tailoring, and submitting applications so students land interviews faster.",
    url: "https://www.flashfirejobs.com/en-ca/how-it-works",
    type: "website",
  },
};

export default function HowItWorksPage() {
  return <HowItWorks />;
}
