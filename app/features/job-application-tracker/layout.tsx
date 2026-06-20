import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Application Tracker to Track Job Applications",
  description: "Track job applications in one place with FlashFire's job application tracker. Organize jobs, monitor interviews, and optimize your job search faster.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/job-application-tracker",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

