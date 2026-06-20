import { Metadata } from "next";
import AIInterviewAnswerGenerator from "@/src/components/aiInterviewAnswerGenerator/AIInterviewAnswerGenerator";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "AI Interview Answer Generator – STAR Format | Flashfire",
    description: "Generate polished STAR-format interview answers from your role, question, and achievement. Personalize and ace your next interview.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/ai-interview-answer-generator" },
    openGraph: {
        title: "AI Interview Answer Generator – STAR Format | Flashfire",
        description: "Generate polished STAR-format interview answers from your role, question, and achievement. Personalize and ace your next interview.",
        url: "https://www.flashfirejobs.com/ai-interview-answer-generator",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function AIInterviewAnswerGeneratorPage() {
    return (
        <>
            <Navbar />
            <AIInterviewAnswerGenerator />
            <Footer />
        </>
    );
}
