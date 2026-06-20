import { Metadata } from "next";
import RefundPolicy from "@/src/components/legal/RefundPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Refund Policy - Money-Back Guarantee | Flashfire",
  description:
    "Read Flashfire's refund policy to understand our money-back guarantee, cancellation procedures, and refund terms.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/refund-policy",
  },
  openGraph: {
    title: "Refund Policy - Money-Back Guarantee",
    description:
      "Read Flashfire's refund policy and money-back guarantee terms.",
    url: "https://www.flashfirejobs.com/refund-policy",
    type: "website",
  },
};

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <RefundPolicy />
      <Footer />
    </>
  );
}

