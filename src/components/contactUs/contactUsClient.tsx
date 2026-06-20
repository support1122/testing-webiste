"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ContactForm from "./contactForm";
import { FaEnvelope, FaPhone, FaBuilding, FaUser, FaLinkedinIn, FaInstagram, FaYoutube, FaArrowRight } from "react-icons/fa";
import { Copy, Check } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { FaPlus, FaTimes } from "react-icons/fa";



type FAQ = {
  q: string;
  a: string;
};
export default function ContactUsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);


  const faqs: FAQ[] = [
    {
      q: "How do I contact Flashfire customer support?",
      a: "You can contact Flashfire customer support by emailing support@flashfirejobs.com or using the contact form on this page.",
    },
    {
      q: "What are Flashfire's contact details?",
      a: "Flashfire contact details include our official email support channel and sales demo request options available on this page.",
    },
    {
      q: "Does Flashfire offer email support?",
      a: "Yes. Flashfire email support is available for product questions, technical issues, and general enquiries.",
    },
  ];

  const handleScheduleDemo = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Contact_Us_Page"
          : "Contact_Us_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Contact_Us_Schedule_Demo_Button",
          utmParams: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign:
              typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_campaign") || "Website"
                : "Website",
          },
        });
      } catch (gtagError) {
        console.warn("GTagUTM error:", gtagError);
      }

      try {
        trackButtonClick("Schedule A Demo", "contact_us_cta", "cta", {
          button_location: "contact_us_sales_enquiry",
          section: "contact_us",
        });
        trackSignupIntent("contact_us_cta", {
          signup_source: "contact_us_schedule_demo_button",
          funnel_stage: "signup_intent",
        });
      } catch (trackError) {
        console.warn("Tracking error:", trackError);
      }

      // Check current path
      const currentPath =
        pathname ||
        (typeof window !== "undefined" ? window.location.pathname : "");
      const normalizedPath = currentPath.split("?")[0];
      const isAlreadyOnGetMeInterview =
        normalizedPath === "/schedule-a-demo-with-flashfire" ||
        normalizedPath === "/en-ca/schedule-a-demo-with-flashfire";
      const isOnContactUsPage =
        normalizedPath === "/contact-us" ||
        normalizedPath === "/en-ca/contact-us";

      // If already on get-me-interview, just show modal
      if (isAlreadyOnGetMeInterview) {
        const currentScrollY =
          typeof window !== "undefined" ? window.scrollY : 0;

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: "instant" });
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: "instant" });
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: "instant" });
            }, 50);
          });
        });

        return;
      }

      // Dispatch custom event to force show modal FIRST
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }

      // If on contact us page, change URL but keep page content visible
      if (isOnContactUsPage) {
        if (typeof window !== "undefined") {
          const currentScrollY = window.scrollY;
          sessionStorage.setItem(
            "previousPageBeforeGetMeInterview",
            normalizedPath
          );
          sessionStorage.setItem(
            "preserveScrollPosition",
            currentScrollY.toString()
          );
        }

        const targetPath = normalizedPath.startsWith("/en-ca")
          ? "/en-ca/schedule-a-demo-with-flashfire"
          : "/schedule-a-demo-with-flashfire";
        router.replace(targetPath);
        return;
      }

      // Save current scroll position before navigation to preserve it
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        sessionStorage.setItem(
          "preserveScrollPosition",
          currentScrollY.toString()
        );
      }

      // Navigate to get-me-interview
      const targetPath = "/schedule-a-demo-with-flashfire";
      router.push(targetPath);
    } catch (error) {
      console.warn("Error in Schedule Demo handler:", error);
    }
  };

  const handleCopyEmail = async () => {
    const email = "support@flashfirejobs.com";
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  mb-16">
          {/* Left Panel: Contact Information */}
          <div className="flex flex-col mt-16 ">
            <h1 className="text-6xl md:text-7xl font-bold mb-4">
              Flashfire Contact – Customer Support, Sales & Enquiries
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Use the Flashfire contact page to reach customer support, sales enquiries, or general assistance. Our team is available via Flashfire email support or demo requests.
            </p>
          </div>

          {/* Right Panel: Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Contact Flashfire Customer Support or Sales Team
            </h2>
            <ContactForm />
          </div>
        </div>
        {/* === FLASHFIRE CONTACT DETAILS (CLEAN, SPACIOUS, FUNCTIONAL) === */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-20">
              <span className="block text-xs font-semibold tracking-widest text-[#ff4c00] uppercase mb-4">
                Get in touch
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                Flashfire <span className="text-[#ff4c00]">Contact Details</span>
              </h2>
              <p className="mt-6 text-base md:text-lg text-slate-600">
                Clear, direct ways to reach the Flashfire team.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">


              {/* Support */}
              <div className="bg-white border border-orange-500 rounded-2xl p-12 transition-colors hover:border-[#ff4c00] hover:border-2">
                <FaEnvelope className="text-[#ff4c00] text-2xl mb-10" />

                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Customer Support
                </h3>

                <p className="text-slate-600 leading-relaxed mb-8">
                  Need help? Flashfire customer support is available via email to assist with your account, job search, or platform questions.
                </p>

                <div className="flex items-center gap-4">
                  <span className="font-semibold text-[#ff4c00]">
                    Flashfire Email Support: support@flashfirejobs.com
                  </span>

                  {/* Copy clipboard */}
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#ff4c00] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Sales */}
              <div className="bg-white border border-orange-500 rounded-2xl p-12 transition-colors hover:border-[#ff4c00] hover:border-2">
                <FaUser className="text-[#ff4c00] text-2xl mb-10" />

                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Flashfire Sales Enquiry & Demo Requests
                </h3>

                <p className="text-slate-600 leading-relaxed mb-8">
                  Explore demos, partnerships, or product questions.
                </p>

                <button
                  onClick={handleScheduleDemo}
                  className="group font-semibold text-[#ff4c00]  flex items-center gap-2"
                >
                  Schedule a Flashfire Demo
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                </button>
              </div>

              {/* Company */}
              <div className="bg-white border border-orange-500 rounded-2xl p-12 transition-colors hover:border-[#ff4c00] hover:border-2">
                <FaBuilding className="text-[#ff4c00] text-2xl mb-10" />

                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Company
                </h3>

                <p className="text-slate-600 leading-relaxed mb-8">
                  Official corporate and business information.
                </p>

                <p className="font-semibold text-slate-900">
                  Flashfire Pvt. Ltd.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="ff-faq-section">
      <div className="ff-faq-shell">

        {/* Header */}
        <div className="ff-faq-header">
          <h2>
            Frequently Asked
            <span className="block">Questions</span>
          </h2>

          <p>
            Get answers about contacting Flashfire.
          </p>
        </div>

        {/* FAQ Container */}
        <div className="ff-faq-list">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`ff-faq-item ${
                activeFaqIndex === i
                  ? "is-active"
                  : ""
              }`}
            >
              <button
                className="ff-faq-question"
                onClick={() =>
                  setActiveFaqIndex(activeFaqIndex === i ? null : i)
                }
              >
                <span
                  className="ff-faq-question-text"
                >
                  {item.q}
                </span>

                <span className="ff-faq-icon">
                  {activeFaqIndex === i ? <FaTimes /> : <FaPlus />}
                </span>
              </button>

              {activeFaqIndex === i && (
                <div className="ff-faq-answer">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>

      </div>


    </section>
  );
}
