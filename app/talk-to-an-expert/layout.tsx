import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talk to an Expert - Get Help with Your Job Search | Flashfire",
  description:
    "Connect with Flashfire experts via WhatsApp to get personalized help with your job search, resume optimization, and career questions.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/talk-to-an-expert",
  },
  openGraph: {
    title: "Talk to an Expert - Get Help with Your Job Search",
    description:
      "Connect with Flashfire experts via WhatsApp for personalized job search help.",
    url: "https://www.flashfirejobs.com/talk-to-an-expert",
    type: "website",
  },
};

export default function TalkToAnExpertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

