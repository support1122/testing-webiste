import { Metadata } from "next";
import CanadaHome from "@/src/components/countries/ca/Home";
import ScrollToSection from "@/src/utils/ui/scrollToSection";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Flashfire Job Search Automation",
  description:
    "Find answers to common questions about Flashfire's job search automation service, pricing, how it works, and more.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/faq",
  },
  openGraph: {
    title: "FAQ - Frequently Asked Questions",
    description:
      "Find answers to common questions about Flashfire's job search automation.",
    url: "https://www.flashfirejobs.com/en-ca/faq",
    type: "website",
  },
};

export default function FAQPageCA() {
  return (
    <>
      <CanadaHome />
      <ScrollToSection targetId="faq" />
    </>
  );
}

