import { Metadata } from "next";

export { default } from "@/app/features/resume-optimizer/page";

export const metadata: Metadata = {
  title: "Resume Optimizer - ATS-Friendly Resumes for Every Role | Flashfire Canada",
  description:
    "Optimize your resume for each job you apply to. Flashfire aligns your experience with every JD so Canadian recruiters and ATS systems say yes.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/features/resume-optimizer",
  },
  openGraph: {
    title: "Resume Optimizer - ATS-Friendly Resumes for Every Role",
    description:
      "Automatically tailor your resume to each job description and pass every ATS filter with Flashfire.",
    url: "https://www.flashfirejobs.com/en-ca/features/resume-optimizer",
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

