"use client";

import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import AIRemoteJobSearchPage from "@/src/components/aiRemoteJobSearch/AIRemoteJobSearch";

export default function Page() {
  return (
    <>
      <Navbar />
      <AIRemoteJobSearchPage />
      <Footer />
    </>
  );
}

