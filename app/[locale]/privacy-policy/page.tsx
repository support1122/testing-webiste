import { Metadata } from "next";
import PrivacyPolicy from "@/src/components/legal/PrivacyPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

interface LocalePrivacyPolicyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocalePrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isCanada = locale === "en-ca";
  
  return {
    title: isCanada 
      ? "Privacy Policy | Flashfire (Canada)"
      : "Privacy Policy | Flashfire",
    description:
      "Read Flashfire's Privacy Policy to understand how we collect, use, and protect your personal information.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/privacy-policy"
        : "https://www.flashfirejobs.com/privacy-policy",
    },
    openGraph: {
      title: "Privacy Policy | Flashfire",
      description:
        "Read Flashfire's Privacy Policy to understand how we protect your personal information.",
      url: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/privacy-policy"
        : "https://www.flashfirejobs.com/privacy-policy",
      type: "website",
    },
  };
}

export default async function LocalePrivacyPolicyPage({ params }: LocalePrivacyPolicyPageProps) {
  await params; // Await params even if not used
  return (
    <>
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </>
  );
}

