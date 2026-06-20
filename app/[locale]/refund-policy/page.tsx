import { Metadata } from "next";
import RefundPolicy from "@/src/components/legal/RefundPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

interface LocaleRefundPolicyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocaleRefundPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isCanada = locale === "en-ca";
  
  return {
    title: isCanada 
      ? "Refund Policy | Flashfire (Canada)"
      : "Refund Policy | Flashfire",
    description:
      "Read Flashfire's Refund Policy to understand our refund terms and conditions.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/refund-policy"
        : "https://www.flashfirejobs.com/refund-policy",
    },
    openGraph: {
      title: "Refund Policy | Flashfire",
      description:
        "Read Flashfire's Refund Policy to understand our refund terms.",
      url: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/refund-policy"
        : "https://www.flashfirejobs.com/refund-policy",
      type: "website",
    },
  };
}

export default async function LocaleRefundPolicyPage({ params }: LocaleRefundPolicyPageProps) {
  await params; // Await params even if not used
  return (
    <>
      <Navbar />
      <RefundPolicy />
      <Footer />
    </>
  );
}

