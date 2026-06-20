import { Metadata } from "next";
import HomePage from "@/src/components/pages/home/Home";
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
    canonical: "https://www.flashfirejobs.com/faq",
  },
  openGraph: {
    title: "FAQ - Frequently Asked Questions",
    description:
      "Find answers to common questions about Flashfire's job search automation.",
    url: "https://www.flashfirejobs.com/faq",
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <>
      <HomePage />
      <ScrollToSection targetId="faq" />
    </>
  );
}

