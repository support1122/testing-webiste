import { Metadata } from "next";
import SectionPage from "@/src/components/pages/shared/SectionPage";

interface LocaleFeaturePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocaleFeaturePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isCanada = locale === "en-ca";
  
  return {
    title: isCanada 
      ? "Features - Job Search Automation Tools | Flashfire (Canada)"
      : "Features - Job Search Automation Tools | Flashfire",
    description:
      "Discover Flashfire's powerful features: AI-powered resume tailoring, automated job applications, real-time tracking, and more to accelerate your job search.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/feature"
        : "https://www.flashfirejobs.com/feature",
    },
    openGraph: {
      title: "Features - Job Search Automation Tools",
      description:
        "Discover Flashfire's powerful features for automated job search and resume optimization.",
      url: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/feature"
        : "https://www.flashfirejobs.com/feature",
      type: "website",
    },
  };
}

export default async function LocaleFeaturePage({ params }: LocaleFeaturePageProps) {
  await params; // Await params even if not used
  return <SectionPage sectionId="feature" />;
}

