import { Metadata } from "next";
import CanadaHome from "@/src/components/countries/ca/Home";

export const metadata: Metadata = {
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

export default function HomeCA() {
  return <CanadaHome />;
}

