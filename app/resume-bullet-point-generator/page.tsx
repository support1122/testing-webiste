import { Metadata } from "next";
import ResumeBulletPointGenerator from "@/src/components/resumeTools/ResumeBulletPointGenerator";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "Resume Bullet Point Generator – Free ATS-Friendly Bullets | Flashfire",
    description: "Generate strong, ATS-friendly resume bullet points in seconds. Enter your role, task, and result — get 5 polished options with powerful action verbs.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/resume-bullet-point-generator" },
    openGraph: {
        title: "Resume Bullet Point Generator – Free ATS-Friendly Bullets | Flashfire",
        description: "Generate powerful resume bullet points with strong action verbs and quantified results.",
        url: "https://www.flashfirejobs.com/resume-bullet-point-generator",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function ResumeBulletPointGeneratorPage() {
    return (
        <>
            <Navbar />
            <ResumeBulletPointGenerator />
            <Footer />
        </>
    );
}
