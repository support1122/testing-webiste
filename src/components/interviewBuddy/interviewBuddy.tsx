"use client";

import { Star, Mic, MessageSquare, Sparkles, FileText ,UserCheck, GraduationCap, Repeat, Shield } from "lucide-react";
import HomePageHappyUsers from "../homePageHappyUsers/homePageHappyUsers";
import HomePageFAQ from "../homePageFAQ/homePageFAQ";
import Image from "next/image";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";

export default function InterviewBuddy() {
    const { getButtonProps } = useGeoBypass({
        onBypass: () => {
            // Bypass will be handled by the event listener
        },
    });
    const pushCustomUrl = (path?: string) => {
            if (typeof window === "undefined" || !path) return;
            const isCanada = window.location.pathname.startsWith("/en-ca");
            const normalized = path.startsWith("/en-ca")
              ? path
              : isCanada
              ? `/en-ca${path}`
              : path;
            window.history.pushState({}, "", normalized);
          };
    return (
        <div className="w-full bg-white  ">

            {/* ================= HERO SECTION ================= */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#fff1ea] via-white to-[#ffe5d8]" />

                <div className="relative max-w-[1200px] mx-auto px-6 py-28 text-center">
                    {/* Rating */}
                    <div className="flex justify-center items-center gap-2 mb-4 text-sm text-gray-600">
                        <span className="font-semibold">Excellent</span>
                        <div className="flex text-[#ff4c00]">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <span className="opacity-70">Trusted by job seekers</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                        AI Interview Assistant for
                        <br />
                        <span className="text-[#ff4c00]">Real-Time Confidence</span>
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                        Get live AI support during interviews. Receive instant guidance,
                        suggested answers, and structured responses while you speak.
                    </p>

                    <div className="mt-10 flex justify-center items-center gap-6">
                        <button {...getButtonProps()} 
                        onClick={() => {
                            const utmSource = typeof window !== "undefined"
                                ? localStorage.getItem("utm_source") || "WEBSITE"
                                : "WEBSITE";
                            const utmMedium = typeof window !== "undefined"
                                ? localStorage.getItem("utm_medium") || "Interview_Buddy_Page"
                                : "Interview_Buddy_Page";
                            GTagUTM({
                                eventName: "sign_up_click",
                                label: "Interview_Buddy_Get_Me_Interview_Button",
                                utmParams: {
                                    utm_source: utmSource,
                                    utm_medium: utmMedium,
                                    utm_campaign: typeof window !== "undefined"
                                        ? localStorage.getItem("utm_campaign") || "Website"
                                        : "Website",
                                    },
                            });
                            trackButtonClick("Get me interview", "interview_buddy_cta", "cta", {
                                button_location: "interview_buddy_hero_section",
                                section: "interview_buddy_hero"
                            });
                            trackSignupIntent("interview_buddy_cta", {
                                signup_source: "interview_buddy_hero_button",
                                funnel_stage: "signup_intent"
                            });

                            if (typeof window !== "undefined") {
                                window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
                            }
                            pushCustomUrl("/interview-buddy/Start-free");
                        }}
                        className="bg-[#ff4c00] text-white px-8 py-4 rounded-xl font-semibold shadow-[0_3px_0_black] hover:opacity-90">
                            Start free
                        </button>

                        <div className="flex items-center justify-center gap-2.5 mb-1 max-[768px]:mb-8 max-[768px]:gap-2 max-[480px]:mb-6 max-[480px]:flex-col max-[480px]:gap-2">
                            <div className="flex items-center">
                                {[
                                    "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/amit%20(1).jpg",
                                    "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aman.jpg",
                                    "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/akrati.jpeg",
                                ].map((url, i) => (
                                    <div
                                        key={i}
                                        className={`relative w-[2.2rem] h-[2.2rem] rounded-full border-2 border-white overflow-hidden -ml-3.5 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] max-[768px]:w-[2rem] max-[768px]:h-[2rem] max-[768px]:-ml-3 max-[480px]:w-[1.8rem] max-[480px]:h-[1.8rem] max-[480px]:-ml-2.5 ${i === 0 ? "ml-0" : ""
                                            }`}
                                    >
                                        <Image
                                            src={url}
                                            alt={`User ${i + 1}`}
                                            fill
                                            sizes="2.2rem"
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </div>

                            <p className="text-base text-black font-medium max-[768px]:text-sm max-[480px]:text-xs max-[480px]:text-center max-[480px]:px-2">Loved by 560+ users</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FEATURES SECTION ================= */}
            <section className="max-w-[1200px] mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold">
                        Everything you need to ace interviews
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Real-time AI assistance that helps you think, respond, and perform better.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">

                    {/* Feature Card 1 */}
                    <FeatureCard
                        title="On-the-spot support & guidance"
                        desc="Get instant AI suggestions when questions get tough. Stay calm and respond clearly without pauses."
                        icon={<Sparkles size={28} />}
                        mock={
                            <MockAnswerCard />
                        }
                    />

                    {/* Feature Card 2 */}
                    <FeatureCard
                        title="Accurate real-time transcripts"
                        desc="Track the conversation live, capture key points, and respond with clarity and confidence."
                        icon={<Mic size={28} />}
                        mock={
                            <MockTranscriptCard />
                        }
                    />

                    {/* Feature Card 3 */}
                    <FeatureCard
                        title="Instant answers to interview questions"
                        desc="Receive structured, role-specific answers tailored to your profile in real time."
                        icon={<MessageSquare size={28} />}
                        mock={
                            <MockInstantAnswer />
                        }
                    />

                    {/* Feature Card 4 */}
                    <FeatureCard
                        title="Highlight relevant experience instantly"
                        desc="Surface the most relevant achievements from your resume exactly when needed."
                        icon={<FileText size={28} />}
                        mock={
                            <MockResumeHighlight />
                        }
                    />

                </div>
            </section>
            {/* ================= WHO IS THIS AI INTERVIEW ASSISTANT FOR ================= */}
            <section className="relative">
  <div className="absolute inset-0 bg-[#fff7f3]" />

  <div className="relative max-w-[1200px] mx-auto px-6 py-24">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-black">
        Who Is This AI Interview Assistant For?
      </h2>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Built for candidates who want clarity, confidence, and real-time support
        when interviews matter most.
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-2 gap-8">

      {[
        {
          title: "Active Job Seekers",
          desc: "Get real-time guidance during live interviews, screenings, and technical rounds.",
          icon: <UserCheck size={22} />,
        },
        {
          title: "Freshers & Early Professionals",
          desc: "Deliver structured, professional answers even with limited interview experience.",
          icon: <GraduationCap size={22} />,
        },
        {
          title: "Career Switchers",
          desc: "Handle unfamiliar interview formats and explain transitions with confidence.",
          icon: <Repeat size={22} />,
        },
        {
          title: "Candidates Under Pressure",
          desc: "Stay calm, organized, and articulate during high-stakes interview moments.",
          icon: <Shield size={22} />,
        },
      ].map((item, i) => (
        <div
          key={i}
          className="relative rounded-3xl bg-gradient-to-br from-[#ff7a3d] via-[#ff4c00] to-[#ff2e00] p-[1px]"
        >
          <div className="bg-white rounded-3xl p-8 h-full">

            {/* Icon Badge */}
            <div className="w-11 h-11 rounded-xl bg-[#fff7f3] flex items-center justify-center text-[#ff4c00] mb-5">
              {item.icon}
            </div>

            {/* Accent Line */}
            <div className="w-12 h-[2px] bg-[#ff4c00]/40 mb-4" />

            <h3 className="text-xl font-bold text-black mb-3">
              {item.title}
            </h3>

            <p className="text-gray-600">
              {item.desc}
            </p>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>


            <HomePageHappyUsers />
            <HomePageFAQ />
        </div>
    );
}

/* ================= REUSABLE COMPONENTS ================= */

function FeatureCard({
    title,
    desc,
    icon,
    mock,
}: {
    title: string;
    desc: string;
    icon: React.ReactNode;
    mock: React.ReactNode;
}) {
    return (
        <div>
            <div className="flex items-center gap-3 mb-3 text-[#ff4c00]">
                {icon}
                <h3 className="font-bold text-xl text-black">{title}</h3>
            </div>

            <p className="text-gray-600 mb-6">{desc}</p>

            <div className="rounded-3xl bg-gradient-to-br from-[#ff7a3d] via-[#ff4c00] to-[#ff2e00] p-[1px]">
                <div className="bg-white rounded-3xl p-6">
                    {mock}
                </div>
            </div>
        </div>
    );
}

/* ================= UI MOCKS ================= */

function MockAnswerCard() {
    return (
        <div className="bg-[#fff7f3] rounded-2xl p-5">
            <p className="text-xs text-[#ff4c00] font-semibold mb-2">
                SUGGESTED ANSWER
            </p>
            <p className="text-gray-700 text-sm">
                “I led a cross-functional project where we launched a new feature
                that improved user engagement by 30%…”
            </p>
        </div>
    );
}

function MockTranscriptCard() {
    return (
        <div className="space-y-3">
            <div className="bg-[#fff7f3] rounded-xl p-3 text-sm">
                <strong>Interviewer:</strong> Tell me about your experience.
            </div>
            <div className="bg-[#ff4c00]/10 rounded-xl p-3 text-sm">
                <strong>You:</strong> I recently worked on a project where…
            </div>
        </div>
    );
}

function MockInstantAnswer() {
    return (
        <div className="bg-[#fff7f3] rounded-2xl p-5 text-sm text-gray-700">
            Press <span className="font-semibold text-[#ff4c00]">Space</span> to get an
            AI-generated answer instantly during the interview.
        </div>
    );
}

function MockResumeHighlight() {
    return (
        <div className="bg-[#fff7f3] rounded-2xl p-5 text-sm">
            <p className="font-semibold mb-2">Highlighted Experience</p>
            <div className="h-3 bg-[#ff4c00]/20 rounded w-3/4 mb-2" />
            <div className="h-3 bg-[#ff4c00]/10 rounded w-2/3" />
        </div>
    );
}
