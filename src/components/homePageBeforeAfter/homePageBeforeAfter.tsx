"use client"

import { FaTimes, FaCheck } from "react-icons/fa"

export default function BeforeAfterComparison() {
  const comparisonItems = [
    {
      title: "ATS-Friendly Resume Optimization",
      caption:
        "Resumes tailored to each job description with ATS-friendly keywords",
    },
    {
      title: "Time Efficiency in Job Search",
      caption: "150+ hours saved through AI-powered automation",
    },
    {
      title: "Accuracy & Attention to Detail",
      caption: "Role-matched applications reviewed by AI + humans",
    },
    {
      title: "Automated Applications",
      caption: "1,200+ smart applications sent strategically — not spam",
    },
    {
      title: "Application Tracking & Proof",
      caption: "Real-time tracking with visible proof and updates",
    },
    {
      title: "Interview Opportunity Rate",
      caption: "Higher interview conversion rates within weeks",
    },
  ]

  return (
    <section
      className="py-20 md:py-28 bg-white"
      style={{
        fontFamily: "var(--font-space-grotesk)",
        backgroundImage: "radial-gradient(#d9d9d9 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-14 md:mb-20 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Why Flashfire Is a Smarter AI Job Matching Platform
          </h2>

          <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            We don’t just apply, we <span className="font-semibold">make you get noticed</span>.
            Flashfire combines <span className="text-[#ff4c00] font-medium">AI precision</span>
            with <span className="text-[#ff4c00] font-medium">human insight</span>
            to get you interviews that actually convert.
          </p>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-3 pb-6 border-b border-gray-300 text-sm font-semibold text-gray-600">
          <div></div>
          <div className="text-center text-[#ff4c00]">
            Before Flashfire
          </div>
          <div className="text-center text-gray-900">
            After Flashfire
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-300">

          {comparisonItems.map((item, index) => (
            <div
              key={index}
              className="py-8 md:py-10"
            >
              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-3 items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {item.caption}
                  </p>
                </div>

                <div className="flex justify-center">
                  <FaTimes className="text-[#ff4c00] text-lg" />
                </div>

                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-full border border-gray-900 flex items-center justify-center">
                    <FaCheck className="text-gray-900 text-sm" />
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden">
                <h3 className="text-base font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {item.caption}
                </p>

                <div className="mt-6 space-y-3">

                  <div className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-3">
                    <div className="flex items-center gap-2 text-[#ff4c00] text-sm">
                      <FaTimes />
                      <span className="font-medium">Before Flashfire</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border border-gray-900 rounded-md px-4 py-3">
                    <div className="flex items-center gap-2 text-gray-900 text-sm font-medium">
                      <FaCheck />
                      <span>With Flashfire</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Bottom Line */}
        <div className="text-center mt-16 md:mt-24">
          <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
            Stop applying blindly. Start getting interviews strategically.
          </p>
        </div>

      </div>
    </section>
  )
}
