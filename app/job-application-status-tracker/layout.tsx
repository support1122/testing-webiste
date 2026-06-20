import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Application Status Tracker with AI | Flashfire",
  description:
    "Track every job application, follow-up, and interview in one AI-powered job application status tracker.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/job-application-status-tracker",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}


