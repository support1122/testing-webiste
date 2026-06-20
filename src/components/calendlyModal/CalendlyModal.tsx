"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Calendar, CheckCircle } from "lucide-react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { warmCalendly } from "@/src/utils/calendlyWarmup";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface CalendlyModalProps {
  isVisible: boolean;
  onClose: () => void;
  user: {
    fullName?: string;
    email?: string;
    phone?: string;
    countryCode?: string;
  };
}

interface CalendlyEventPayload {
  invitee?: {
    email?: string;
    name?: string;
    uri?: string;
  };
  event?: {
    uri?: string;
    start_time?: string;
    start_time_pretty?: string;
    end_time?: string;
    location?: {
      join_url?: string;
    };
  };
  name?: string;
  email?: string;
}

interface CalendlyEvent {
  data?: {
    payload?: CalendlyEventPayload;
  };
  payload?: CalendlyEventPayload;
}

interface CalendlyEventListenerOptions {
  onProfilePageSubmitted?: (e: CalendlyEvent) => void;
  onEventScheduled?: (e: CalendlyEvent) => Promise<void> | void;
}

export default function CalendlyModal({
  isVisible,
  onClose,
  user,
}: CalendlyModalProps) {
  const router = useRouter();
  const [profileInvitee, setProfileInvitee] = useState<{
    email?: string;
    name?: string;
  } | null>(null);
  const [isCalendlyReady, setIsCalendlyReady] = useState(false);

  useEffect(() => {
    warmCalendly();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const checkReady = () => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        'iframe[src*="calendly.com"]'
      );
      if (!iframe) return false;
      setIsCalendlyReady(true);
      return true;
    };

    if (checkReady()) return;

    const observer = new MutationObserver(() => {
      if (checkReady()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // Restore invitee profile info on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      const savedName = localStorage.getItem("cal_invitee_name") || undefined;
      const savedEmail = localStorage.getItem("cal_invitee_email") || undefined;
      if (savedName || savedEmail) {
        setProfileInvitee({ name: savedName, email: savedEmail });
      }
    } catch {}
  }, []);

  // Listen for Calendly scheduled events and capture to analytics/CRM
  useCalendlyEventListener({
    // Fires when the user submits their details (name/email) before picking a time
    onProfilePageSubmitted: (e: CalendlyEvent) => {
      try {
        const payload = e?.data?.payload || e?.payload || {};
        const name = payload?.name || payload?.invitee?.name || "";
        const email = payload?.email || payload?.invitee?.email || "";
        if (name || email) {
          setProfileInvitee({ name, email });
          try {
            if (typeof window !== "undefined") {
              if (name) localStorage.setItem("cal_invitee_name", name);
              if (email) localStorage.setItem("cal_invitee_email", email);
            }
          } catch {}
        }
      } catch (err) {
        console.error("❌ Failed to capture Calendly profile submission", err);
      }
    },
    onEventScheduled: async (e: CalendlyEvent) => {
      try {
        const payload = e?.data?.payload || e?.payload || {};
        const inviteeEmail =
          payload?.invitee?.email ||
          user?.email ||
          profileInvitee?.email ||
          (typeof window !== "undefined" ? localStorage.getItem("cal_invitee_email") : null) ||
          "";
        const inviteeName =
          payload?.invitee?.name ||
          user?.fullName ||
          profileInvitee?.name ||
          (typeof window !== "undefined" ? localStorage.getItem("cal_invitee_name") : null) ||
          "";
        const eventStartTime =
          payload?.event?.start_time ||
          payload?.event?.start_time_pretty ||
          "";

        // Trigger event visible in console
        const meetingBookedEvent = {
          type: "MEETING_BOOKED",
          payload: { inviteeName, inviteeEmail, eventStartTime },
        };
        console.log("📅 Meeting booked event:", meetingBookedEvent);

        try {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("flashfire_meeting_booked_pending_track", "1");
          }
        } catch {}

        // Navigate to meeting-booked page
        router.push("/meeting-booked");

        const meetingUrl =
          payload?.event?.uri ||
          payload?.event?.location?.join_url ||
          "";

        const utm_source =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_source") || "direct"
            : "direct";
        const utm_medium =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_medium") || "website"
            : "website";
        const utm_campaign =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_campaign") || "organic"
            : "organic";
        const utm_content =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_content")
            : null;
        const utm_term =
          typeof window !== "undefined" ? localStorage.getItem("utm_term") : null;

        // 🆕 DIRECT BACKUP: Send booking data to your backend API
        // This is a backup to Calendly webhook - if webhook fails, we still capture the booking
        try {
          const bookingData = {
            utmSource: utm_source,
            utmMedium: utm_medium,
            utmCampaign: utm_campaign,
            utmContent: utm_content,
            utmTerm: utm_term,
            clientName: inviteeName,
            clientEmail: inviteeEmail,
            clientPhone: user?.phone
              ? `${user?.countryCode || ""}${user?.phone}`
              : null,
            calendlyEventUri: payload?.event?.uri || null,
            calendlyInviteeUri: payload?.invitee?.uri || null,
            calendlyMeetLink: meetingUrl,
            scheduledEventStartTime: eventStartTime,
            scheduledEventEndTime: payload?.event?.end_time || null,
            visitorId:
              typeof window !== "undefined"
                ? localStorage.getItem("visitor_id")
                : null,
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
            source: "frontend_direct", // Mark this as coming from frontend
          };

          // Sending booking to backend

          if (!API_BASE_URL) {
            console.error("API_BASE_URL is not configured, skipping backend call");
            return;
          }

          const response = await fetch(
            `${API_BASE_URL}api/campaign-bookings/frontend-capture`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bookingData),
            }
          );

          if (response.ok) {
            const result = await response.json();
            // Booking saved to backend
          } else {
            console.warn(
              "⚠️ Backend booking save failed, webhook will handle it:",
              await response.text()
            );
          }
        } catch (backendError) {
          console.warn(
            "⚠️ Failed to send booking to backend directly (webhook will handle it):",
            backendError
          );
        }
      } catch (err) {
        console.error("❌ Calendly scheduled event capture failed", err);
      }
    },
  } as CalendlyEventListenerOptions);

  const calendlyUrl = `https://calendly.com/feedback-flashfire/30min?utm_source=${
    typeof window !== "undefined"
      ? localStorage.getItem("utm_source") || "webpage_visit"
      : "webpage_visit"
  }&utm_medium=${
    typeof window !== "undefined"
      ? localStorage.getItem("utm_medium") || "website"
      : "website"
  }${
    typeof window !== "undefined" && localStorage.getItem("utm_campaign")
      ? `&utm_campaign=${localStorage.getItem("utm_campaign")}`
      : ""
  }${
    typeof window !== "undefined" && localStorage.getItem("utm_content")
      ? `&utm_content=${localStorage.getItem("utm_content")}`
      : ""
  }${
    typeof window !== "undefined" && localStorage.getItem("utm_term")
      ? `&utm_term=${localStorage.getItem("utm_term")}`
      : ""
  }`;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[9999] items-center justify-center w-full"
      style={{ display: isVisible ? "flex" : "none" }}
      aria-hidden={!isVisible}
      onClick={onClose}
    >
      <div 
        className="relative bg-white/80 backdrop-blur-sm
max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-600 transition-colors z-20 bg-white/90 rounded-full p-2 shadow-lg"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Mobile Header */}
        <div className="block lg:hidden h-full w-full">
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">
                  Schedule Your Flashfire Consultation 
                </h2>
                <p className="text-orange-100 text-sm">15 Minutes • Free</p>
              </div>
            </div>
          </div>

        </div>

        {/* Desktop Layout */}
        <div className="flex w-full h-[90vh]">
          {/* Orange Section (Info) */}
          <div className="hidden lg:block w-2/5 bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white overflow-y-hidden rounded-l-xl">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Schedule Your Flashfire Consultation
                  </h2>
                  <p className="text-orange-100">15 Minutes • Free</p>
                </div>
              </div>
              <p className="text-orange-100 text-lg leading-relaxed">
                Book your personalized consultation to learn how Flashfire can
                automate your job search and land interviews faster.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-bold mb-4">What You&apos;ll Get:</h3>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Personalized Strategy</h4>
                  <p className="text-orange-100 text-sm">
                    Custom job search plan tailored to your goals
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Resume Review</h4>
                  <p className="text-orange-100 text-sm">
                    Expert feedback on your current resume
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300 mt-0.5" />
                <div>
                  <h4 className="font-semibold">AI Demo</h4>
                  <p className="text-orange-100 text-sm">
                    See our automation technology in action
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Q&A Session</h4>
                  <p className="text-orange-100 text-sm">
                    Get all your questions answered by experts
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-orange-100 text-xs">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-orange-100 text-xs">Jobs Landed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">220+</div>
                  <div className="text-orange-100 text-xs">Hours Saved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="w-full lg:w-3/5 bg-white overflow-hidden lg:rounded-r-xl relative">
            {!isCalendlyReady && isVisible && (
              <div className="absolute inset-0 bg-white z-10" />
            )}
            <InlineWidget
              url={calendlyUrl}
              prefill={{
                name: user?.fullName || "",
                email: user?.email || "",
                customAnswers: {
                  a3: (user?.countryCode || "") + (user?.phone || ""), // phone is the 3rd question
                },
              }}
              styles={{
                height: "100%",
                width: "100%",
                minHeight: "calc(100vh - 100px)",
              }}
              pageSettings={{
                backgroundColor: "ffffff",
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: "f97316",
                textColor: "374151",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

