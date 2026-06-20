"use client";

import { PostHogProvider, usePostHog } from "posthog-js/react";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureUTMParams } from "@/src/utils/captureUTMParams";

// Inner component to handle pageview tracking
function PostHogPageView({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  // Capture UTM params on mount and when searchParams change
  useEffect(() => {
    captureUTMParams();
  }, [searchParams]);

  useEffect(() => {
    // Track pageviews on route change
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      
      // Get country context
      const isCanada = pathname.startsWith("/en-ca");
      const countryCode = typeof window !== "undefined" 
        ? localStorage.getItem("ff_country_code_v1") || (isCanada ? "CA" : "US")
        : "US";
      
      // Get UTM parameters
      const utmSource = typeof window !== "undefined"
        ? localStorage.getItem("utm_source") || new URLSearchParams(window.location.search).get("utm_source")
        : null;
      const utmMedium = typeof window !== "undefined"
        ? localStorage.getItem("utm_medium") || new URLSearchParams(window.location.search).get("utm_medium")
        : null;
      const utmCampaign = typeof window !== "undefined"
        ? localStorage.getItem("utm_campaign") || new URLSearchParams(window.location.search).get("utm_campaign")
        : null;
      const utmContent = typeof window !== "undefined"
        ? localStorage.getItem("utm_content") || new URLSearchParams(window.location.search).get("utm_content")
        : null;
      const utmTerm = typeof window !== "undefined"
        ? localStorage.getItem("utm_term") || new URLSearchParams(window.location.search).get("utm_term")
        : null;
      
      // PostHog automatically tracks pageviews, but we ensure it captures route changes
      posthog.capture("$pageview", {
        $current_url: url,
        country_code: countryCode,
        is_canada: isCanada,
        locale: isCanada ? "en-ca" : "en-us",
        utm_source: utmSource || "direct",
        utm_medium: utmMedium || "website",
        utm_campaign: utmCampaign || "organic",
        utm_content: utmContent || "none",
        utm_term: utmTerm || "none",
      });

      // ALSO track to MongoDB for Metabase (real-time tracking)
      // Get or create session ID
      let sessionId = typeof window !== "undefined" ? sessionStorage.getItem("session_id") : null;
      if (!sessionId && typeof window !== "undefined") {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem("session_id", sessionId);
      }

      // Get visitor ID (try to get from PostHog or create new)
      let visitorId = typeof window !== "undefined" 
        ? localStorage.getItem("visitor_id") || posthog?.get_distinct_id?.() || null
        : null;
      
      if (!visitorId && typeof window !== "undefined") {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("visitor_id", visitorId);
      }

      // Track to MongoDB (non-blocking) via backend API
      if (typeof window !== "undefined") {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.flashfirejobs.com";
        fetch(`${API_BASE_URL}/api/track/page-visit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitorId: visitorId,
            pageUrl: url,
            referrer: document.referrer || null,
            utmSource: utmSource || null,
            utmMedium: utmMedium || null,
            utmCampaign: utmCampaign || null,
            utmContent: utmContent || null,
            utmTerm: utmTerm || null,
            sessionId: sessionId,
            metadata: {
              pathname: pathname,
              searchParams: searchParams?.toString() || null,
              countryCode: countryCode,
              isCanada: isCanada,
            },
          }),
        }).catch((error) => {
          // Silently fail - don't break the app if tracking fails
          console.error("MongoDB tracking error:", error);
        });
      }
    }
  }, [pathname, searchParams, posthog]);

  return <>{children}</>;
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  // PostHog configuration matching the old frontend
  const posthogOptions = {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    autocapture: true,
    capture_pageview: true,
    capture_pageleave: true,
    person_profiles: "identified_only" as const,
    // Enable heatmaps for click tracking and visual analytics
    enable_heatmaps: true,
    // Enable session recording for user behavior analysis
    session_recording: {
      maskAllInputs: false, // Set to true if you want to mask sensitive input fields
      recordCrossOriginIframes: false,
      recordCanvas: false, // Set to true if you have canvas elements
    },
    // Enhanced tracking options
    capture_performance: true,
    capture_console_logs: false, // Set to true for debugging
    // Feature flags for A/B testing
    bootstrap: {
      featureFlags: {},
    },
  };

  // Only initialize PostHog if we have an API key
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    console.warn(
      "PostHog API key not found. PostHog tracking will be disabled."
    );
    return <>{children}</>;
  }

  return (
    <PostHogProvider
      apiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY}
      options={posthogOptions}
    >
      <Suspense fallback={<>{children}</>}>
        <PostHogPageView>{children}</PostHogPageView>
      </Suspense>
    </PostHogProvider>
  );
}

