import { Metadata } from "next";
import SalaryComparison from "@/src/components/salaryComparison/SalaryComparison";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "Salary Comparison – Compare Two Job Offers | Flashfire",
    description: "Compare two job offers side by side including salary, bonus, benefits, and commute costs to find the better total value.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/salary-comparison" },
    openGraph: {
        title: "Salary Comparison – Compare Two Job Offers | Flashfire",
        description: "Compare two job offers side by side including salary, bonus, benefits, and commute costs to find the better total value.",
        url: "https://www.flashfirejobs.com/salary-comparison",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function SalaryComparisonPage() {
    return (
        <>
            <Navbar />
            <SalaryComparison />
            <Footer />
        </>
    );
}
