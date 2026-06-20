import { Metadata } from "next";
import SectionPage from "@/src/components/pages/shared/SectionPage";

interface LocaleTestimonialsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocaleTestimonialsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isCanada = locale === "en-ca";
  
  return {
    title: isCanada 
      ? "Testimonials - Success Stories from Flashfire Users | Flashfire (Canada)"
      : "Testimonials - Success Stories from Flashfire Users | Flashfire",
    description:
      "Read success stories and testimonials from job seekers who used Flashfire to land their dream jobs. See how our automated job search service helped them succeed.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/testimonials"
        : "https://www.flashfirejobs.com/testimonials",
    },
    openGraph: {
      title: "Testimonials - Success Stories from Flashfire Users",
      description:
        "Read success stories from job seekers who used Flashfire to land their dream jobs.",
      url: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/testimonials"
        : "https://www.flashfirejobs.com/testimonials",
      type: "website",
    },
  };
}

export default async function LocaleTestimonialsPage({ params }: LocaleTestimonialsPageProps) {
  await params; // Await params even if not used
  return <SectionPage sectionId="testimonials" />;
}

