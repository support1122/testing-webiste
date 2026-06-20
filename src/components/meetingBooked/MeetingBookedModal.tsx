"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlayCircle, Users, X } from "lucide-react";
import * as fbq from "@/lib/metaPixel";
import * as linkedin from "@/lib/linkedinInsightTag";
import * as googleAds from "@/lib/googleAds";
import { LINKEDIN_CONVERSION_IDS } from "@/lib/linkedinConversions";
import videoStyles from "@/src/components/homePageVideo/homePageVideo.module.css";

type Props = {
  onClose?: () => void;
};

const MEETING_BOOKED_PENDING_KEY = "flashfire_meeting_booked_pending_track";

export default function MeetingBookedModal({ onClose }: Props) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only fire after a Calendly booking just navigated here (not refresh / direct URL).
    // CalendlyModal sets this immediately before router.push to /meeting-booked.
    if (sessionStorage.getItem(MEETING_BOOKED_PENDING_KEY) !== "1") {
      return;
    }
    sessionStorage.removeItem(MEETING_BOOKED_PENDING_KEY);

    try {
      const inviteeEmail = localStorage.getItem("cal_invitee_email") || "";
      const inviteeName = localStorage.getItem("cal_invitee_name") || "";

      const utm_source = localStorage.getItem("utm_source") || "direct";
      const utm_medium = localStorage.getItem("utm_medium") || "website";
      const utm_campaign =
        localStorage.getItem("utm_campaign") || "organic";

      fbq.event("Schedule", {
        content_name: "Meeting Booked",
        content_category: "Consultation",
        value: 0,
        currency: "USD",
        ...(inviteeEmail && { em: inviteeEmail.toLowerCase() }),
        ...(inviteeName && { fn: inviteeName.split(" ")[0] }),
        ...(inviteeName && {
          ln: inviteeName.split(" ").slice(1).join(" "),
        }),
        utm_source,
        utm_medium,
        utm_campaign,
      });

      // Track LinkedIn Schedule event (only if conversion ID is configured)
      if (LINKEDIN_CONVERSION_IDS.SCHEDULE) {
        try {
          linkedin.trackSchedule(LINKEDIN_CONVERSION_IDS.SCHEDULE, {
            value: 0,
            currency: "USD",
            ...(inviteeEmail && { email: inviteeEmail.toLowerCase() }),
            ...(inviteeName && { firstName: inviteeName.split(" ")[0] }),
            ...(inviteeName && {
              lastName: inviteeName.split(" ").slice(1).join(" "),
            }),
            utm_source,
            utm_medium,
            utm_campaign,
          });
        } catch (linkedinError) {
          console.error("Failed to track LinkedIn event:", linkedinError);
        }
      }

      try {
        googleAds.trackMeetingBooked({
          value: 1.0,
          currency: "INR",
          ...(inviteeEmail && { email: inviteeEmail.toLowerCase() }),
          ...(inviteeName && { firstName: inviteeName.split(" ")[0] }),
          ...(inviteeName && {
            lastName: inviteeName.split(" ").slice(1).join(" "),
          }),
        });
      } catch (googleAdsError) {
        console.error("Failed to track Google event:", googleAdsError);
      }
    } catch (error) {
      console.error("Failed to track Facebook Pixel event:", error);
    }
  }, []);

  return (
    <>
      {/* Main Popup Overlay */}
      <div className="fixed inset-0 z-[9985] bg-black/60 flex items-center justify-center px-3 py-4 md:px-4 md:py-6">
        <div className="relative w-full max-w-[360px] md:max-w-[420px] rounded-2xl bg-white px-4 py-5 md:px-6 md:py-6 shadow-2xl border border-orange-100 text-center">
          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          )}

          <h1 className="text-lg md:text-2xl font-extrabold text-slate-900 mb-2">
            <span className="text-[#ff4c00]">Thank you</span>{" "}
            <span>for scheduling a call!</span>
          </h1>

          <p className="text-[11px] md:text-sm text-slate-700 mb-3 md:mb-3.5">
            🎉 You&apos;re one step closer to your next career move with
            Flashfire. 🎉
          </p>

          <div className="mb-4 md:mb-5">
            <div className="w-full max-w-md mx-auto rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <Image
                src="/images/meme.jpg"
                alt="See you there"
                width={512}
                height={256}
                className="w-full h-36 md:h-44 object-cover"
              />
            </div>
          </div>

          <p className="text-[11px] md:text-sm text-slate-700 text-center mb-4 md:mb-5">
            To make our conversation more productive, we recommend watching our
            short Flashfire demo video before the call.
          </p>

          <div className="flex justify-center mb-2 md:mb-3">
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center justify-center rounded-lg bg-[#ff4c00] px-4 py-2 text-xs md:text-sm font-semibold text-white hover:bg-[#e24400] transition-colors shadow-sm"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Watch Demo Video (2 min)
            </button>
          </div>

          <div className="flex flex-col items-center gap-2 border-t border-slate-100 pt-1 md:pt-2">
            <div className="flex -space-x-1.5">
              {[
                "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/amit%20(1).jpg",
                "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aman.jpg",
                "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/akrati.jpeg",
              ].map((src, i) => (
                <div
                  key={src}
                  className="relative h-7 w-7 rounded-full overflow-hidden border-2 border-white bg-[#fff7f2]"
                  aria-hidden="true"
                >
                  <Image
                    src={src}
                    alt={`Student ${i + 1}`}
                    fill
                    sizes="32px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            <p className="text-[11px] md:text-sm text-slate-600 flex items-center gap-1 text-center">
              <Users className="w-4 h-4" />
              Trusted by 560+ Users
            </p>

            <Link
              href="/"
                className="mt-1 inline-flex items-center justify-center text-xs md:text-sm font-semibold text-[#ff4c00] hover:underline"
              >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[9990] bg-black/60 flex items-center justify-center px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label="Demo video"
          onMouseDown={() => setIsVideoOpen(false)}
        >
          <div
            className="w-full max-w-4xl rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-slate-100">
              <p className="text-sm md:text-base font-semibold text-slate-900">
                Flashfire Demo Video
              </p>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-slate-700" />
              </button>
            </div>

            <div className="p-4 md:p-5 bg-white">
              <div
                className={videoStyles.videoWrapper}
                style={{ width: "100%", maxWidth: "100%" }}
              >
                <video
                  className={videoStyles.videoPlayer}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/videos/ii.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <span />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

