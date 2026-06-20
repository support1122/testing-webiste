import { Metadata } from "next";
import EmployerForm from "@/src/components/employers/employerForm";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

interface LocaleEmployersPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocaleEmployersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isCanada = locale === "en-ca";
  
  return {
    title: isCanada 
      ? "Employers - Partner with Flashfire | Hire Top Talent Faster (Canada)"
      : "Employers - Partner with Flashfire | Hire Top Talent Faster",
    description:
      "Partner with Flashfire to access pre-screened, qualified candidates. Connect with job seekers actively applying to roles in your industry.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/employers"
        : "https://www.flashfirejobs.com/employers",
    },
    openGraph: {
      title: "Employers - Partner with Flashfire",
      description:
        "Partner with Flashfire to access pre-screened, qualified candidates.",
      url: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/employers"
        : "https://www.flashfirejobs.com/employers",
      type: "website",
    },
  };
}

export default async function LocaleEmployersPage({ params }: LocaleEmployersPageProps) {
  await params; // Await params even if not used
  return (
    <>
      <Navbar />
      <EmployerForm />
      <Footer />
    </>
  );
}

