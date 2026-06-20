import { Metadata } from "next";
import SalaryCalculator from "@/src/components/salaryCalculator/SalaryCalculator";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "Salary Calculator – Estimate Take-Home Pay | Flashfire",
    description: "Calculate your take-home pay from annual salary. Includes bonus, pre-tax deductions, federal and state tax estimates.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/salary-calculator" },
    openGraph: {
        title: "Salary Calculator – Estimate Take-Home Pay | Flashfire",
        description: "Calculate your take-home pay from annual salary. Includes bonus, pre-tax deductions, federal and state tax estimates.",
        url: "https://www.flashfirejobs.com/salary-calculator",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function SalaryCalculatorPage() {
    return (
        <>
            <Navbar />
            <SalaryCalculator />
            <Footer />
        </>
    );
}
