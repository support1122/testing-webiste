"use client";

import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import AICareerAssessmentPage from "@/src/components/aiCareerAssessment/AICareerAssessment";

export default function Page() {
  return (
    <>
      <Navbar />
      <AICareerAssessmentPage />
      <Footer />
    </>
  );
}

