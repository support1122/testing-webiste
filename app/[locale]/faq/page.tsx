import { Metadata } from "next";
import SectionPage from "@/src/components/pages/shared/SectionPage";

interface LocaleFAQPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocaleFAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isCanada = locale === "en-ca";
  
  return {
    title: isCanada 
      ? "FAQ - Frequently Asked Questions | Flashfire (Canada)"
      : "FAQ - Frequently Asked Questions | Flashfire",
    description:
      "Find answers to common questions about Flashfire's job search automation service, pricing, how it works, and more.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/faq"
        : "https://www.flashfirejobs.com/faq",
    },
    openGraph: {
      title: "FAQ - Frequently Asked Questions",
      description:
        "Find answers to common questions about Flashfire's job search automation service.",
      url: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/faq"
        : "https://www.flashfirejobs.com/faq",
      type: "website",
    },
  };
}

export default async function LocaleFAQPage({ params }: LocaleFAQPageProps) {
  await params; // Await params even if not used
  return <SectionPage sectionId="faq" />;
}

