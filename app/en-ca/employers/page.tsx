import { Metadata } from "next";
import EmployerForm from "@/src/components/employers/employerForm";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Employers - Partner with Flashfire | Hire Top Talent Faster",
  description:
    "Partner with Flashfire to access pre-screened, qualified candidates. Connect with job seekers actively applying to roles in your industry.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/employers",
  },
  openGraph: {
    title: "Employers - Partner with Flashfire",
    description:
      "Partner with Flashfire to access pre-screened, qualified candidates.",
    url: "https://www.flashfirejobs.com/en-ca/employers",
    type: "website",
  },
};

export default function EmployersPageCA() {
  return (
    <>
      <Navbar />
      <EmployerForm />
      <Footer />
    </>
  );
}

