"use client";

import {
    X,
    CheckCircle,
    Calendar,
    MessageCircle,
    Phone,
    Clock,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { useCallback } from "react";
type Props = {
    onClose?: () => void;
};

export default function StrategyCallCard({ onClose }: Props) {
    const handleBookYourFreeStrategyCall = useCallback(() => {
        try {
            const utmSource = typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_source") || "WEBSITE"
                : "WEBSITE";
            const utmMedium = typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_medium") || "Strategy_Call_Card"
                : "Strategy_Call_Card";
            GTagUTM({
                eventName: "sign_up_click",
                label: "Strategy_Call_Card_Button",
                utmParams: {
                    utm_source: utmSource,
                    utm_medium: utmMedium,
                },
            });
            trackButtonClick("Book Your Free Strategy Call", "strategy_call_card", "cta", {
                button_location: "strategy_call_card",
                section: "strategy_call_card",
            });
            trackSignupIntent("strategy_call_card", {
                signup_source: "strategy_call_card_button",
                funnel_stage: "signup_intent",
            });
        } catch (error) {
            console.error("Error handling book your free strategy call:", error);
        }
    }, []);

    const openStrategyCallModal = useCallback(() => {
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("showGetMeInterviewModal"));
        }
    }, []);

    const handlePrimaryCtaClick = useCallback(() => {
        handleBookYourFreeStrategyCall();
        openStrategyCallModal();

        // ✅ Close the modal so homepage becomes visible
        if (onClose) onClose();

    }, [handleBookYourFreeStrategyCall, openStrategyCallModal, onClose]);


    const { getButtonProps } = useGeoBypass({
        onBypass: handlePrimaryCtaClick,
    });

    const whatsappNumber = "919817349846";
    const dialerNumber = "+1919817349846";
    const defaultMessage = "Hi! I'm interested in a free strategy call with Flashfire.";
    const encodedMessage = encodeURIComponent(defaultMessage);

    const handleWhatsAppClick = () => {
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
    };

    const handleTextClick = () => {
        window.open(`sms:${dialerNumber}?body=${encodedMessage}`, "_self");
    };

    const handleCallClick = () => {
        window.open(`tel:${dialerNumber}`, "_self");
    };
    return (
<div className="relative w-full max-w-[480px] mt-20 min-h-[500px] rounded-2xl bg-white px-7 py-9 shadow-2xl border border-orange-100 text-center">
      
          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          )}
      
          {/* Icon */}
          {/* <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-orange-500">
              <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
            </div>
          </div> */}
      
          {/* Heading */}
          <h2 className="text-[1.35rem] font-semibold text-gray-900 leading-snug">
            Get Your Personalized Job Search Strategy
          </h2>
      
          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-gray-500 px-1">
            15-minute expert call to accelerate your job search and unlock better opportunities.
          </p>
      
          {/* Extra Content */}
          <div className="mt-4 px-1 space-y-2 text-sm text-gray-600">
            <div className="flex  items-center justify-start gap-2">
              <CheckCircle size={15} className="text-orange-500" />
              Resume & LinkedIn feedback 
            </div>
            <div className="flex items-center justify-start gap-2">
              <CheckCircle size={15} className="text-orange-500" />
              Personalized job search strategy 
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={15} className="text-orange-500" />
              Curated job openings matched to your profile
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle size={15} className="text-orange-500" />
              Application tracking & follow-up reminders
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle size={15} className="text-orange-500" />
              Skill gap analysis & learning roadmap
            </div>
          </div>
      
          {/* Highlight Box */}
          <div className="mt-5 rounded-lg py-2.5 text-sm font-semibold text-orange-600">
            100% Free • No obligation • Limited slots
          </div>
      
          {/* CTA */}
          <button
            {...getButtonProps()}
            onClick={handlePrimaryCtaClick}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl 
            bg-orange-500 py-3 text-sm font-semibold text-white 
            hover:bg-orange-600 transition"
          >
            <Calendar size={16} />
            Book Your Free Strategy Call
          </button>
      
          {/* Meta */}
          <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <Clock size={12} /> 15 min
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} /> No obligation
            </span>
            <span className="flex items-center gap-1">
              <Sparkles size={12} /> Free
            </span>
          </div>
      
          {/* WhatsApp */}
          <div className="mt-4">
            <button
              onClick={handleWhatsAppClick}
              className="relative flex w-full items-center justify-center gap-2 
              rounded-lg border border-emerald-300 bg-emerald-50 py-2.5 
              text-sm font-medium text-emerald-700 hover:shadow transition"
            >
              <span className="absolute -top-2 rounded-full bg-orange-500 px-2 py-[2px] text-[10px] text-white">
                Fastest
              </span>
              <MessageCircle size={15} />
              WhatsApp
            </button>
          </div>
      
        </div>
      );
          
}