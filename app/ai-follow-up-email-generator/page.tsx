"use client";

import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import AIFollowUpEmailsPage from "@/src/components/aiFollowUpEmails/AIFollowUpEmails";

export default function Page() {
  return (
    <>
      <Navbar />
      <AIFollowUpEmailsPage />
      <Footer />
    </>
  );
}

