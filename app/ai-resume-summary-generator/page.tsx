import { Metadata } from "next";
import AiResumeSummaryGenerator from "@/src/components/resumeTools/AiResumeSummaryGenerator";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "AI Resume Summary Generator – Free Professional Summary | Flashfire",
    description: "Generate a compelling resume summary in seconds with AI. Choose your tone, enter your details, and get 3 tailored professional summary options — free, no sign-up needed.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/ai-resume-summary-generator" },
    openGraph: {
        title: "AI Resume Summary Generator – Free Professional Summary | Flashfire",
        description: "Free AI resume summary generator. Get 3 tailored professional summary options in seconds.",
        url: "https://www.flashfirejobs.com/ai-resume-summary-generator",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function AiResumeSummaryGeneratorPage() {
    return (
        <>
            <Navbar />
            <AiResumeSummaryGenerator />
            <Footer />
        </>
    );
}
