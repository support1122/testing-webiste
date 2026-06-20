import { Metadata } from "next";
import GrossPayCalculator from "@/src/components/grossPayCalculator/GrossPayCalculator";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "Gross Pay Calculator – Weekly, Monthly & Annual | Flashfire",
    description: "Calculate gross pay before taxes from hourly rate, regular hours, overtime, and annual bonus.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/gross-pay-calculator" },
    openGraph: {
        title: "Gross Pay Calculator – Weekly, Monthly & Annual | Flashfire",
        description: "Calculate gross pay before taxes from hourly rate, regular hours, overtime, and annual bonus.",
        url: "https://www.flashfirejobs.com/gross-pay-calculator",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function GrossPayCalculatorPage() {
    return (
        <>
            <Navbar />
            <GrossPayCalculator />
            <Footer />
        </>
    );
}
