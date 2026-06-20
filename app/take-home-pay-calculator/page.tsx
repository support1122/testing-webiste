import { Metadata } from "next";
import TakeHomePayCalculator from "@/src/components/takeHomePayCalculator/TakeHomePayCalculator";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "Take Home Pay Calculator – Net Paycheck Estimator | Flashfire",
    description: "See your actual take-home pay after taxes and deductions. Enter gross pay, frequency, and state tax to get your net paycheck.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/take-home-pay-calculator" },
    openGraph: {
        title: "Take Home Pay Calculator – Net Paycheck Estimator | Flashfire",
        description: "See your actual take-home pay after taxes and deductions. Enter gross pay, frequency, and state tax to get your net paycheck.",
        url: "https://www.flashfirejobs.com/take-home-pay-calculator",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function TakeHomePayCalculatorPage() {
    return (
        <>
            <Navbar />
            <TakeHomePayCalculator />
            <Footer />
        </>
    );
}
