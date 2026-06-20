import { Metadata } from "next";

export { default } from "@/app/features/job-automation/page";

export const metadata: Metadata = {
  title: "Job Automation - Apply to 1,000+ Roles Without the Grind | Flashfire Canada",
  description:
    "Flashfire sources high-fit Canadian roles, tailors your assets, and applies on your behalf so you land interviews while saving 150+ hours.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/features/job-automation",
  },
  openGraph: {
    title: "Job Automation - Let Flashfire Apply for You",
    description:
      "Scale your job hunt with human-powered, AI-assisted application automation purpose-built for Canadian job seekers.",
    url: "https://www.flashfirejobs.com/en-ca/features/job-automation",
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

