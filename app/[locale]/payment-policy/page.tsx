import { Metadata } from "next";
import PaymentPolicy from "@/src/components/legal/PaymentPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

interface LocalePaymentPolicyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocalePaymentPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isCanada = locale === "en-ca";
  
  return {
    title: isCanada 
      ? "Payment Policy | Flashfire (Canada)"
      : "Payment Policy | Flashfire",
    description:
      "Read Flashfire's Payment Policy to understand our payment terms and billing information.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/payment-policy"
        : "https://www.flashfirejobs.com/payment-policy",
    },
    openGraph: {
      title: "Payment Policy | Flashfire",
      description:
        "Read Flashfire's Payment Policy to understand our payment terms.",
      url: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/payment-policy"
        : "https://www.flashfirejobs.com/payment-policy",
      type: "website",
    },
  };
}

export default async function LocalePaymentPolicyPage({ params }: LocalePaymentPolicyPageProps) {
  await params; // Await params even if not used
  return (
    <>
      <Navbar />
      <PaymentPolicy />
      <Footer />
    </>
  );
}

