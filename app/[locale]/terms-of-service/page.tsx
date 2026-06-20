import { Metadata } from "next";
import TermsOfService from "@/src/components/legal/TermsOfService";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

interface LocaleTermsOfServicePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocaleTermsOfServicePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isCanada = locale === "en-ca";
  
  return {
    title: isCanada 
      ? "Terms of Service | Flashfire (Canada)"
      : "Terms of Service | Flashfire",
    description:
      "Read Flashfire's Terms of Service to understand the terms and conditions for using our job search automation service.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/terms-of-service"
        : "https://www.flashfirejobs.com/terms-of-service",
    },
    openGraph: {
      title: "Terms of Service | Flashfire",
      description:
        "Read Flashfire's Terms of Service to understand our terms and conditions.",
      url: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/terms-of-service"
        : "https://www.flashfirejobs.com/terms-of-service",
      type: "website",
    },
  };
}

export default async function LocaleTermsOfServicePage({ params }: LocaleTermsOfServicePageProps) {
  await params; // Await params even if not used
  return (
    <>
      <Navbar />
      <TermsOfService />
      <Footer />
    </>
  );
}

