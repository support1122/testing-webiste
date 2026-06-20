import { Metadata } from "next";
import CVKeywordScanner from "@/src/components/resumeTools/CVKeywordScanner";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "CV Keyword Scanner – Match Your Resume to Any Job | Flashfire",
    description: "Scan your CV against any job description and see which keywords match and which are missing. Tailor your resume for every application and increase your ATS pass rate.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/cv-keyword-scanner" },
    openGraph: {
        title: "CV Keyword Scanner – Match Your Resume to Any Job | Flashfire",
        description: "Free CV keyword scanner. See which keywords match the job description and boost your ATS score.",
        url: "https://www.flashfirejobs.com/cv-keyword-scanner",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function CVKeywordScannerPage() {
    return (
        <>
            <Navbar />
            <CVKeywordScanner />
            <Footer />
        </>
    );
}
