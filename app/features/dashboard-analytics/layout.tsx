import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Search Analytics Dashboard & Application Tracking",
  description: "Use FlashFire's job search analytics dashboard to track job applications, response rates, and interview conversions. Optimize your job search with data.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/dashboard-analytics",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
