import { Metadata } from "next";

export { default } from "@/app/features/precision-targeting/page";

export const metadata: Metadata = {
  title: "Precision Targeting - Find the Right Canadian Roles | Flashfire",
  description:
    "Flashfire pinpoints roles that match your visa status, salary goals, and tech stack so every application is high intent.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/features/precision-targeting",
  },
  openGraph: {
    title: "Precision Targeting - Hyper-Relevant Job Matching",
    description:
      "Use Flashfire’s targeting engine to surface Canadian roles aligned to your background, visa, and compensation needs.",
    url: "https://www.flashfirejobs.com/en-ca/features/precision-targeting",
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

