import {Metadata} from "next";
import AICopilot from "@/src/components/AICopilot/AICopilot";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
const metadata: Metadata = {
  title: "AI Copilot - Get personalized interview tips | Flashfire",
  description:
    "Get personalized interview tips based on your skills, experience, and career goals. Our interview buddy is here to help you land your dream job.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/AI-copilot",
  },
  openGraph: {
    title: "AI Copilot - Get personalized interview tips",
    description:
      "Get personalized interview tips based on your skills, experience, and career goals.",
    url: "https://www.flashfirejobs.com/AI-copilot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};
export default function AIcopilot() {
  return (
    <>
      <Navbar />
      <AICopilot />
      <Footer />
    </>
  );
}