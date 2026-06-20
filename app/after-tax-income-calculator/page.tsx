import { Metadata } from "next";
import AfterTaxIncomeCalculator from "@/src/components/afterTaxIncomeCalculator/AfterTaxIncomeCalculator";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "After Tax Income Calculator – Net Annual Income | Flashfire",
    description: "Estimate your after-tax income by filing status, deductions, tax credits, and state tax rate.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/after-tax-income-calculator" },
    openGraph: {
        title: "After Tax Income Calculator – Net Annual Income | Flashfire",
        description: "Estimate your after-tax income by filing status, deductions, tax credits, and state tax rate.",
        url: "https://www.flashfirejobs.com/after-tax-income-calculator",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function AfterTaxIncomeCalculatorPage() {
    return (
        <>
            <Navbar />
            <AfterTaxIncomeCalculator />
            <Footer />
        </>
    );
}
