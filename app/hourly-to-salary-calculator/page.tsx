import { Metadata } from "next";
import HourlyToSalaryCalculator from "@/src/components/hourlyToSalaryCalculator/HourlyToSalaryCalculator";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "Hourly to Salary Calculator – Convert Hourly Pay | Flashfire",
    description: "Convert your hourly wage to annual salary instantly. Includes overtime and weeks-per-year inputs.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/hourly-to-salary-calculator" },
    openGraph: {
        title: "Hourly to Salary Calculator – Convert Hourly Pay | Flashfire",
        description: "Convert your hourly wage to annual salary instantly. Includes overtime and weeks-per-year inputs.",
        url: "https://www.flashfirejobs.com/hourly-to-salary-calculator",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function HourlyToSalaryCalculatorPage() {
    return (
        <>
            <Navbar />
            <HourlyToSalaryCalculator />
            <Footer />
        </>
    );
}
