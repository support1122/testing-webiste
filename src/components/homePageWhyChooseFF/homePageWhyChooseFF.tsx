"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import FlashfireLogo from "@/src/components/FlashfireLogo";

const featureCardBase =
  "flex flex-col justify-between bg-[#fffdfc] border border-[#94959a] rounded-[0.3rem] p-8 text-left h-[21rem] shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08)] max-[768px]:w-full max-[768px]:h-auto max-[768px]:p-6";

export default function HomePageWhyChooseFF() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "919817349846";
    const message = encodeURIComponent(
      "Hi! I'm interested in Flashfire's AI-powered job search automation. Can you help me get started?",
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      id="feature"
      className="relative bg-white py-20 px-8 text-center font-['Space_Grotesk',sans-serif] overflow-hidden max-[480px]:py-12 max-[480px]:px-5"
    >
      <div className="pointer-events-none absolute w-[18rem] h-[18rem] -left-32 top-16 bg-[rgba(245,93,29,1)] blur-[120px] opacity-70"></div>
      <div className="pointer-events-none absolute w-[18rem] h-[18rem] -right-32 top-24 bg-[rgba(245,93,29,1)] blur-[120px] opacity-70"></div>
      {/* === Header === */}
      <header className="w-[55%] mx-auto mb-12 max-[1024px]:w-4/5 max-[768px]:w-full">
        <h2 className="text-[50.84px] font-bold text-[#02060A] mb-4 leading-[110%] tracking-[-0.03em] font-['Satoshi',sans-serif] max-[1024px]:text-[2.4rem] max-[768px]:text-[1.8rem]">
          Why Flashfire Is a Smarter AI Job Matching Platform
        </h2>
        <p className="text-[20px] font-medium text-[#02060A] leading-[139%] tracking-[-0.03em] font-['Satoshi',sans-serif] max-[1024px]:text-[1.05rem] max-[768px]:text-[1rem]">
          We don&apos;t just apply, we <strong className="font-bold italic">make you get noticed.</strong>{" "}
          Flashfire combines{" "}
          <span className="text-[#ff4c00] font-semibold">AI precision</span>
          <br />
          with{" "}
          <span className="text-[#d64b00] font-semibold">human insight</span> to
          get you interviews that actually convert.
        </p>
      </header>

      {/* === Feature Grid === */}
      <div className="
          grid 
          grid-cols-3 
          gap-4 
          max-w-[80rem] 
          w-full 
          mx-auto 
          mb-16

          max-[1024px]:grid-cols-2
          max-[640px]:grid-cols-1
        ">
        <article
          className={`${featureCardBase}`}
        >
          <h3 className="text-[2rem] font-bold text-[#111] mb-3">
            AI-Powered Matching
          </h3>
          <p className="text-[1.125rem] text-[#333] leading-[1.5]">
            For each and every application, your base resume is automatically
            optimized to the job description with ATS-friendly keywords and
            skills.
          </p>
        </article>

        <article
          className={`${featureCardBase} `}
        >
          <h3 className="text-[2rem] font-bold text-[#111] mb-3">
            Dynamic Resume Optimization
          </h3>
          <p className="text-[1.125rem] text-[#333] leading-[1.5]">
            We build your base resume from scratch and tailor it for each job,
            making it ATS-friendly and recruiter-visible.
          </p>
        </article>

        <article
          className={`${featureCardBase} basis-[28.3%] max-[768px]:basis-full`}
        >
          <h3 className="text-[2rem] font-bold text-[#111] mb-3">
            LinkedIn Profile Optimization
          </h3>
          <p className="text-[1.125rem] text-[#333] leading-[1.5]">
            We professionally optimize your LinkedIn profile to boost recruiter
            visibility and align with your job search goals.
          </p>
        </article>

        <article
          className={`${featureCardBase} basis-[24.1%] max-[768px]:basis-full`}
        >
          <h3 className="text-[2rem] font-bold text-[#111] mb-3">
            Precision Targeting
          </h3>
          <p className="text-[1.125rem] text-[#333] leading-[1.5]">
            We only apply to jobs that fit your pay, location, company size, and
            career goals — and only to jobs posted in the last 24–48 hours.
          </p>
        </article>

        <article
          className={`${featureCardBase} basis-[36.7%] max-[768px]:basis-full`}
        >
          <h3 className="text-[2rem] font-bold text-[#111] mb-3">
            Lightning Fast Applications
          </h3>
          <p className="text-[1.125rem] text-[#333] leading-[1.5]">
            A dedicated team of 4–5 people handles your job hunt, applying to
            1200+ roles in 6–7 weeks. We'll keep you posted with every update in
            a WhatsApp group made just for you.
          </p>
        </article>

        <article
          className={`${featureCardBase} basis-[36.7%] max-[768px]:basis-full`}
        >
          <h3 className="text-[2rem] font-bold text-[#111] mb-3">
            Dashboard &amp; Analytics
          </h3>
          <p className="text-[1.125rem] text-[#333] leading-[1.5]">
            Access a personalized dashboard to track applications, monitor
            success rates, and get real-time insights to improve your job search
            strategy.
          </p>
        </article>
      </div>

      {/* === Bottom Section === */}
      <footer className="mt-16 flex justify-center">
        <div className="
    flex gap-4 bg-[rgba(251,240,235,1)] border border-[#f1e4df]
    max-w-[80rem] w-full mx-auto overflow-hidden relative
    p-3

    max-[1024px]:flex-col
    max-[1024px]:p-5
  ">

          {/* ===== Left Card ===== */}
          <div className="
      flex-1 bg-white p-8 flex flex-col justify-center relative overflow-hidden
      text-left

      max-[768px]:text-center
      max-[768px]:p-2
      rounded-md
    ">
            <h3 className="text-[1.6rem] font-bold text-[#111] mb-3 max-[480px]:text-[1.25rem]">
              Still Confused?
            </h3>

            <p className="text-[#333] text-[1rem] font-bold leading-[1.5] mb-5 max-[480px]:text-[0.95rem]">
              Feel free to post your queries over our WhatsApp Support.
            </p>

            <button
              onClick={handleWhatsAppClick}
              className="
          bg-[#ff4c00] text-white py-3 px-6 font-semibold rounded-lg
          w-fit shadow-[0_4px_0_#000]
          hover:bg-[#e24300]
          max-[768px]:mx-auto
        "
            >
              Connect on WhatsApp
            </button>

            {/* Icon hidden on mobile */}
            <div className="pointer-events-none absolute right-[-8rem] top-1/2 -translate-y-1/2 text-[18rem] text-[rgba(251,240,235,1)] opacity-90 max-[768px]:hidden">
              <FaWhatsapp />
            </div>
          </div>

          {/* ===== Right Testimonial Card ===== */}
          <div className="
  flex-[1.3] bg-black relative overflow-hidden rounded-md
  flex items-center p-8

  max-[768px]:flex-col
  max-[768px]:p-5
">

            {/* Text Content */}
            <div className="z-10 w-[65%] text-left max-[768px]:w-full max-[768px]:text-center">
              <p className="text-[#fffaf8] text-[0.75rem] font-semibold mb-3 tracking-wider">
                HELPING 560+ JOB SEEKERS
              </p>

              <blockquote className="text-[1.6rem] font-bold italic text-white mb-5 leading-tight max-[768px]:text-[1.1rem]">
                I've seen brilliant people lose hope. Flashfire exists so they don't have to.
              </blockquote>

              <div className="flex items-center gap-4 max-[768px]:justify-center">
                <div>
                  <p className="text-[0.95rem] font-semibold text-white">Adit Jain</p>
                  <p className="text-[0.8rem] text-[#aaa]">Partner</p>
                </div>

                <div className="flex items-center gap-2">
                  <FlashfireLogo variant="white" width={22} height={22} />
                  <p className="font-semibold text-white">Flashfire</p>
                </div>
              </div>
            </div>

            {/* Image */}
            {/* Image */}
<div className="absolute right-0 bottom-0 w-[40%] h-full max-[768px]:relative max-[768px]:w-full max-[768px]:h-[300px] max-[768px]:mt-6">
  <Image
    src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/adit-jain.png"
    alt="Adit Jain"
    fill
    className="object-cover object-[center_20%] scale-[1.1] max-[768px]:object-[center_30%] max-[768px]:scale-[1.05]"
    unoptimized
  />
</div>

          </div>


        </div>
      </footer>

    </section>
  );
}
