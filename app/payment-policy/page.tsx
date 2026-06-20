import { Metadata } from "next";
import PaymentPolicy from "@/src/components/legal/PaymentPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Payment Policy - Payment Terms & Methods | Flashfire",
  description:
    "Learn about Flashfire's payment policy, accepted payment methods, billing cycles, and refund procedures.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/payment-policy",
  },
  openGraph: {
    title: "Payment Policy - Payment Terms & Methods",
    description:
      "Learn about Flashfire's payment policy and accepted payment methods.",
    url: "https://www.flashfirejobs.com/payment-policy",
    type: "website",
  },
};

export default function PaymentPolicyPage() {
  return (
    <>
      <Navbar />
      <PaymentPolicy />
      <Footer />
    </>
  );
}

