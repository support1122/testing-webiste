import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Application Automation Tool | AI Job Applications",
  description: "Flashfire is an AI job application automation tool that helps you automate job applications, beat ATS filters, and land interviews faster.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/automated-job-applications",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

