import { Metadata } from "next";
import HowItWorks from "@/src/components/pages/howItWorks/HowItWorks";

export const metadata: Metadata = {
  title: "How Flashfire's AI Job Automation Platform Works?",
  description:
    "See how Flashfire's AI Job Automation Platform gets international students interview calls faster: visa-aware matching, ATS-ready resumes, automated applications, tracking, and interview prep.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/how-flashfire-ai-job-automation-platform-works",
  },
  openGraph: {
    title: "How Flashfire's AI Job Automation Platform Works?",
    description:
      "Understand how Flashfire's AI Job Automation Platform automates sourcing, tailoring, and submitting applications so students land interviews faster.",
    url: "https://www.flashfirejobs.com/how-flashfire-ai-job-automation-platform-works",
    type: "website",
  },
};

export default function HowItWorksPage() {
  return <HowItWorks />;
}
