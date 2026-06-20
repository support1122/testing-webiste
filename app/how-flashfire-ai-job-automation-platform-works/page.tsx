import { Metadata } from "next";
import HowItWorks from "@/src/components/pages/howItWorks/HowItWorks";

export const metadata: Metadata = {
  title: "AI Job Application Software to Apply for Jobs Automatically",
  description:
    "Flashfire is an AI job application software that helps you apply for jobs automatically with ATS-optimized resumes and targeted applications.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/how-flashfire-ai-job-automation-platform-works",
  },
  openGraph: {
    title: "AI Job Application Software to Apply for Jobs Automatically",
    description:
      "Flashfire is an AI job application software that helps you apply for jobs automatically with ATS-optimized resumes and targeted applications.",
    url: "https://www.flashfirejobs.com/how-flashfire-ai-job-automation-platform-works",
    type: "website",
  },
};

export default function HowItWorksPage() {
  return <HowItWorks />;
}

