"use client";

import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import AIJobSearchFreshersPage from "@/src/components/aiJobSearchFreshers/AIJobSearchFreshers";

export default function Page() {
  return (
    <>
      <Navbar />
      <AIJobSearchFreshersPage />
      <Footer />
    </>
  );
}

