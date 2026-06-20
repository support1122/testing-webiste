import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HomePagePricingPlans from "@/src/components/homePagePricingPlans/homePagePricingPlans";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import HomePageFoundersNote from "@/src/components/homePageFoundersNote/homePageFoundersNote";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";

interface LocalePricingPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocalePricingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isCanada = locale === "en-ca";
  
  return {
    title: isCanada 
      ? "Pricing - Affordable Job Search Automation Plans | Flashfire CA"
      : "Pricing - Affordable Job Search Automation Plans | Flashfire",
    description:
      "Choose the perfect Flashfire plan for your job search. Transparent pricing with flexible options to automate your job applications and save time.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/pricing"
        : "https://www.flashfirejobs.com/pricing",
    },
    openGraph: {
      title: "Pricing - Affordable Job Search Automation Plans",
      description:
        "Choose the perfect Flashfire plan for your job search automation.",
      url: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/pricing"
        : "https://www.flashfirejobs.com/pricing",
      type: "website",
    },
  };
}

import PricingPageClient from "./PricingPageClient";

export default async function LocalePricingPage({ params }: LocalePricingPageProps) {
  await params; // Await params even if not used
  return <PricingPageClient />;
}

