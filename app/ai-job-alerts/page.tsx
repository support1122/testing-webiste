"use client"; 
import AIJobAlertsPage from "@/src/components/aiJobAlerts/AIJobAlerts";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <AIJobAlertsPage />
      <Footer />
    </>
  );
}


