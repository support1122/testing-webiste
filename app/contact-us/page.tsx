import { Metadata } from "next";
import ContactUsClient from "@/src/components/contactUs/contactUsClient";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Flashfire Contact | Customer Support & Enquiries",
  description:
    "Contact Flashfire for customer support, sales enquiries, demos, or general questions. Reach Flashfire email support or connect with our team today.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/contact-us",
  },
  openGraph: {
    title: "Flashfire Contact | Customer Support & Enquiries",
    description:
      "Contact Flashfire for customer support, sales enquiries, demos, or general questions. Reach Flashfire email support or connect with our team today.",
    url: "https://www.flashfirejobs.com/contact-us",
    type: "website",
  },
};

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <ContactUsClient />
      <Footer />
    </>
  );
}
