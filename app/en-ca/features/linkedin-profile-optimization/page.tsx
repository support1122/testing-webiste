import { Metadata } from "next";

export { default } from "@/app/features/linkedin-profile-optimization/page";

export const metadata: Metadata = {
  title: "LinkedIn Optimization - Stand Out to Canadian Recruiters | Flashfire",
  description:
    "Refresh your LinkedIn profile with recruiter-ready headlines, summaries, and keywords so Canadian hiring teams can find and trust you faster.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/features/linkedin-profile-optimization",
  },
  openGraph: {
    title: "LinkedIn Optimization - Stand Out to Recruiters",
    description:
      "Polish your LinkedIn presence with ATS-aligned keywords, proof-backed bullets, and an irresistible summary tailored for Canada.",
    url: "https://www.flashfirejobs.com/en-ca/features/linkedin-profile-optimization",
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

