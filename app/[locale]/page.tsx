import { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/src/components/pages/home/Home";
import CanadaHome from "@/src/components/countries/ca/Home";

interface LocalePageProps {
  params: Promise<{
    locale: string;
  }>;
}

const validLocales = ["en-ca"];

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isCanada = locale === "en-ca";

  if (!isCanada) {
    return {
      title: "Flashfire: Automate Job Applications with AI",
      description:
        "Flashfire is an AI job application platform that automates job search, auto-applies to jobs using AI, and matches you with the right roles faster.",
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: "https://www.flashfirejobs.com/",
      },
      openGraph: {
        title: "Flashfire: Automate Job Applications with AI",
        description:
          "Flashfire is an AI job application platform that automates job search, auto-applies to jobs using AI, and matches you with the right roles faster.",
        url: "https://www.flashfirejobs.com/",
        type: "website",
        images: [
          {
            url: "https://www.flashfirejobs.com/images/og-image.png",
            width: 1200,
            height: 630,
            alt: "FLASHFIRE Logo",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Flashfire: Automate Job Applications with AI",
        description:
          "Flashfire is an AI job application platform that automates job search, auto-applies to jobs using AI, and matches you with the right roles faster.",
        images: ["https://www.flashfirejobs.com/images/og-image.png"],
      },
    };
  }

  return {
    title: "FLASHFIRE - AI-Powered Job Search Automation | Land Your Dream Job Faster (Canada)",
    description:
      "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates. Your job hunt—automated.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://www.flashfirejobs.com/en-ca",
    },
    openGraph: {
      title: "FLASHFIRE - AI-Powered Job Search Automation (Canada)",
      description:
        "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates.",
      url: "https://www.flashfirejobs.com/en-ca",
      type: "website",
      images: [
        {
          url: "https://www.flashfirejobs.com/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "FLASHFIRE Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["https://www.flashfirejobs.com/images/og-image.png"],
    },
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  // Handle default locale (no locale in URL)
  if (!locale || locale === "default") {
    return <HomePage />;
  }

  // Handle Canada locale
  if (locale === "en-ca") {
    return <CanadaHome />;
  }

  // Invalid locale - 404
  notFound();
}

