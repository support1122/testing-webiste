"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import HomePage from "@/src/components/pages/home/Home";
import { WHATSAPP_SUPPORT_URL } from "@/src/utils/whatsapp";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackExternalLink } from "@/src/utils/PostHogTracking";

function TalkToAnExpertContentCA() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Get UTM parameters from URL params or localStorage
    const utmSource = searchParams.get("utm_source") || 
      (typeof window !== "undefined" ? localStorage.getItem("utm_source") : null) || 
      "WEBSITE";
    const utmMedium = searchParams.get("utm_medium") || 
      (typeof window !== "undefined" ? localStorage.getItem("utm_medium") : null) || 
      "Navigation_Navbar_Button";
    const utmCampaign = searchParams.get("utm_campaign") || 
      (typeof window !== "undefined" ? localStorage.getItem("utm_campaign") : null) || 
      "Website";

    // Track with both GTag and PostHog
    GTagUTM({
      eventName: "whatsapp_support_click",
      label: "Navbar_Talk_To_Expert_Button_CA",
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      },
    });

    // PostHog tracking
    trackButtonClick("Talk to an Expert", "navigation", "cta", {
      button_location: "navbar",
      navigation_type: "primary_cta",
      page: "talk-to-an-expert",
      locale: "en-ca",
    });
    trackExternalLink(WHATSAPP_SUPPORT_URL, "Talk to an Expert", "navigation", {
      link_type: "whatsapp_support",
      contact_method: "whatsapp",
      source: "navbar_button",
      locale: "en-ca",
    });

    // Open WhatsApp in a new tab
    window.open(WHATSAPP_SUPPORT_URL, "_blank");
  }, [searchParams]);

  return <HomePage />;
}

export default function TalkToAnExpertPageCA() {
  return (
    <Suspense fallback={<HomePage />}>
      <TalkToAnExpertContentCA />
    </Suspense>
  );
}

