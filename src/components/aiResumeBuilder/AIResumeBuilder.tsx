"use client";

import { CheckCircle, FileText, Sparkles, Briefcase, Target, TrendingUp, Award, BarChart3, Users } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";

const updateCtaUrl = (basePath: string, label: string) => {
  if (typeof window === "undefined") return;
  const slug = label.trim().replace(/\s+/g, "-");
  const isCanada = window.location.pathname.startsWith("/en-ca");
  const normalizedBase = isCanada ? `/en-ca${basePath}` : basePath;
  const newUrl = `${normalizedBase}/${slug}`;
  window.history.pushState({}, "", newUrl);
  window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
};

export default function AIResumeBuilderPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">


      <main className="mt-0">

        {/* HERO */}
        <section className="relative bg-gradient-to-br from-[#fff0e6] via-[#fff7f2] to-[#ffefe6] min-h-[95vh] flex items-center py-16 md:py-24 overflow-hidden">
  {/* Background decorative elements */}
  <div className="absolute top-20 left-10 w-72 h-72 bg-[#ff4c00]/5 rounded-full blur-3xl"></div>
  <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl"></div>
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#ff4c00]/5 to-transparent rounded-full blur-3xl"></div>
  
  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full relative z-10">
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

      {/* LEFT - Asymmetric typography */}
      <div className="lg:col-span-7 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#ffd6c2] shadow-sm">
          <Sparkles className="h-4 w-4 text-[#ff4c00]" />
          <span className="text-sm font-semibold text-[#ff4c00]">AI-Powered Resume Builder</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] text-slate-900 tracking-tight">
          AI Resume Builder for <span className="text-[#ff4c00]">Job Seekers</span>
        </h1>

        <div className="space-y-4 max-w-xl">
          <p className="text-xl text-slate-700 leading-relaxed font-medium">
            Stop wasting hours writing resumes that never get responses.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            With our AI resume builder, you can create a recruiter-ready, ATS-optimized resume in minutes — even if you have zero writing experience.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => updateCtaUrl("/ai-resume-builder", "It's Free to Start")}
            className="inline-flex items-center justify-center rounded-2xl bg-[#ff4c00] px-8 py-4 text-lg font-bold text-white hover:bg-[#e24400] transition-colors shadow-xl hover:shadow-2xl"
          >
            It's Free to Start
          </button>
         
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4">
          {[
            "Get noticed by recruiters faster",
            "Improve your ATS match score instantly",
            "Turn your experience into powerful achievements",
          ].map((text) => (
            <div key={text} className="flex items-start gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-[#ffd6c2]/50">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff4c00]/10 flex items-center justify-center mt-0.5">
                <CheckCircle className="h-3.5 w-3.5 text-[#ff4c00]" />
              </div>
              <span className="text-sm text-slate-700 font-medium leading-snug">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - Glassmorphism floating card */}
      <div className="lg:col-span-5 relative">
        <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-6 md:p-8">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl pointer-events-none"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff7a45] flex items-center justify-center shadow-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">AI Resume Optimization</p>
                  <p className="text-xs text-slate-500">Real-time analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-semibold text-green-700">Live</span>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-[#fff7f2] to-orange-50/80 border border-[#ffd6c2] p-5 mb-6 shadow-inner">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Resume Summary</p>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Frontend Developer with experience in React, JavaScript, and modern UI development.
              </p>
            </div>

            <div className="space-y-3">
              {[
                ["ATS Compatibility", "Optimized", "95%"],
                ["Keyword Match", "Strong", "88%"],
                ["Role Relevance", "High", "92%"],
              ].map(([label, value, score]) => (
                <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-white/80 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-[#ff4c00]" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">{label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">{score}</span>
                    <span className="px-3 py-1 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] font-bold text-sm">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bars */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600">Overall Score</span>
                <span className="text-lg font-bold text-[#ff4c00]">91%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[91%] bg-gradient-to-r from-[#ff4c00] to-[#ff7a45] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating badges */}
        <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-xl border border-[#ffd6c2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-xs font-bold text-slate-700">ATS Ready</span>
          </div>
        </div>
        
        <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-xl border border-[#ffd6c2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-[#ff4c00]" />
            </div>
            <span className="text-xs font-bold text-slate-700">AI Enhanced</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


        {/* Real-Time Resume Score Section */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Real-Time Resume Score & <span className="text-[#ff4c00]">Improvements</span>
              </h2>
              <p className="text-lg text-slate-700">
                Our system continuously evaluates your resume.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Resume strength scoring",
                  desc: "Get instant feedback on your resume's overall quality and competitiveness.",
                  icon: <BarChart3 className="h-8 w-8 text-[#ff4c00]" />,
                },
                {
                  title: "Keyword effectiveness analysis",
                  desc: "See how well your resume matches job descriptions and ATS requirements.",
                  icon: <Target className="h-8 w-8 text-[#ff4c00]" />,
                },
                {
                  title: "Optimization suggestions",
                  desc: "Receive actionable recommendations to improve your resume's performance.",
                  icon: <TrendingUp className="h-8 w-8 text-[#ff4c00]" />,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gradient-to-br from-white to-orange-50 border-2 border-[#ffd6c2] rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-3 text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-700">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-slate-600 font-medium">
              Helping you compete with top candidates.
            </p>
          </div>
        </section>

        {/* Outcomes Section */}
        <section className="bg-gradient-to-br from-[#fff7f2] to-white py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Outcomes You Can <span className="text-[#ff4c00]">Expect</span>
              </h2>
              <p className="text-lg text-slate-700">
                This isn't just another resume maker online.
              </p>
              <p className="text-base text-slate-600 mt-2">
                Job seekers use our professional resume builder to achieve real results:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Create resumes 80% faster",
                "Improve ATS match instantly",
                "Increase recruiter visibility",
                "Reduce resume rejection risk",
                "Apply with confidence",
                "Optimize for ATS & recruiters",
              ].map((outcome) => (
                <div
                  key={outcome}
                  className="bg-white border-2 border-[#ff4c00] rounded-xl p-6 shadow-md hover:shadow-lg transition flex items-center gap-4"
                >
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] shrink-0" />
                  <span className="font-semibold text-slate-900">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Key Benefits of Our <span className="text-[#ff4c00]">ATS-Friendly Resume Builder</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  num: "1",
                  title: "Get More Interview Calls",
                  desc: "Optimized resumes rank higher in recruiter searches.",
                },
                {
                  num: "2",
                  title: "Eliminate Resume Guesswork",
                  desc: "AI-driven keyword & content optimization.",
                },
                {
                  num: "3",
                  title: "Write Like a Professional — Instantly",
                  desc: "No writing expertise required.",
                },
                {
                  num: "4",
                  title: "Pass Applicant Tracking Systems",
                  desc: "Built-in ATS optimization (applicant tracking system).",
                },
                {
                  num: "5",
                  title: "Stand Out From Generic Applicants",
                  desc: "Create a tailored resume/resume tailoring for every job.",
                },
                {
                  num: "6",
                  title: "Save Hours of Resume Editing",
                  desc: "Smart automation handles formatting & structure.",
                },
                {
                  num: "7",
                  title: "Boost Resume Confidence",
                  desc: "Know that your resume is competitive before applying.",
                },
                {
                  num: "8",
                  title: "Match Jobs Faster with AI",
                  desc: "Instantly align your resume with job descriptions for better results.",
                },
                {
                  num: "9",
                  title: "Increase Job Offer Chances",
                  desc: "Stronger resumes lead to better interview and hiring outcomes.",
                },
              ].map((benefit) => (
                <div
                  key={benefit.num}
                  className="relative bg-gradient-to-br from-[#fffaf7] to-white border-2 border-[#ffd6c2] rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {benefit.num}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 mt-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-700">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#fffaf7] py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Features Designed for <span className="text-[#ff4c00]">Modern Job Seekers</span>
              </h2>
              <p className="text-lg text-slate-700">
                Our AI resume builder combines intelligence with simplicity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "ATS-friendly formatting",
                "AI-generated bullet points",
                "Smart keyword optimization",
                "Modern resume templates",
                "Resume tailoring engine",
                "Built-in cover letter generator",
                "Cloud storage & editing",
                "Resume creation in under 10 minutes",
              ].map((feature) => (
                <div
                  key={feature}
                  className="bg-white border border-[#ffd6c2] rounded-xl p-5 hover:shadow-md transition flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Social Proof & <span className="text-[#ff4c00]">Trust Signals</span>
              </h2>
              <p className="text-lg text-slate-700">
                Thousands of job seekers already use our resume builder online.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Trusted by growing numbers of candidates",
                  icon: <Users className="h-8 w-8 text-[#ff4c00]" />,
                },
                {
                  title: "Used across multiple industries",
                  icon: <Briefcase className="h-8 w-8 text-[#ff4c00]" />,
                },
                {
                  title: "Designed for modern hiring systems",
                  icon: <Award className="h-8 w-8 text-[#ff4c00]" />,
                },
                
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gradient-to-br from-orange-50 to-white border-2 border-[#ffd6c2] rounded-2xl p-8 text-center hover:shadow-lg transition"
                >
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a45] rounded-2xl p-8 text-white text-center">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-sm opacity-90">Job seekers trust us</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">90%</div>
                  <div className="text-sm opacity-90">Users finish resumes under 10 minutes</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">Proven</div>
                  <div className="text-sm opacity-90">ATS optimization engine</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="bg-[#fffaf7] py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                AI Resume Builder vs <span className="text-[#ff4c00]">Traditional Resume Makers</span>
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[#ffd6c2]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a45] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Feature</th>
                      <th className="px-6 py-4 text-left font-bold">Traditional Resume Tools</th>
                      <th className="px-6 py-4 text-left font-bold">Our AI Resume Builder</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        feature: "Content Creation",
                        traditional: "Manual writing required",
                        ai: "AI-generated content",
                      },
                      {
                        feature: "Bullet Points",
                        traditional: "Generic bullet points",
                        ai: "Achievement-driven statements",
                      },
                      {
                        feature: "Templates",
                        traditional: "Static templates",
                        ai: "Dynamic keyword optimization",
                      },
                      {
                        feature: "Formatting",
                        traditional: "Basic formatting",
                        ai: "ATS-friendly resume structure",
                      },
                      {
                        feature: "Editing",
                        traditional: "Time-consuming editing",
                        ai: "Automated improvements",
                      },
                      {
                        feature: "Job Targeting",
                        traditional: "One resume for all jobs",
                        ai: "Tailored resumes for each job",
                      },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-orange-50/30"}>
                        <td className="px-6 py-4 font-semibold text-slate-900">{row.feature}</td>
                        <td className="px-6 py-4 text-slate-600">{row.traditional}</td>
                        <td className="px-6 py-4 text-[#ff4c00] font-semibold">{row.ai}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-center mt-6 text-lg font-semibold text-slate-700">
              Modern hiring requires smarter tools.
            </p>
          </div>
        </section>

        {/* Who Is This For Section */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Who Is This <span className="text-[#ff4c00]">ATS-Friendly Resume Builder</span> For?
              </h2>
              <p className="text-lg text-slate-700">
                Our resume builder for job seekers works for:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Freelancers & remote job seekers",
                "Executives & senior professionals",
                "International applicants",
                "Job seekers returning after a career break",
              ].map((persona) => (
                <div
                  key={persona}
                  className="bg-gradient-to-br from-[#fffaf7] to-white border-2 border-[#ffd6c2] rounded-xl p-6 text-center hover:shadow-lg transition hover:-translate-y-1"
                >
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] mx-auto mb-3" />
                  <p className="font-semibold text-slate-900">{persona}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-slate-600 font-medium">
              No writing skills required.
            </p>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative bg-gradient-to-br from-[#fff7f2] via-[#fff7f2] to-white py-24 overflow-hidden">
  
  {/* soft glow */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#ff4c00]/10 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#ff4c00]/10 rounded-full blur-3xl"></div>

  <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
    
    {/* Headline */}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">
      Build Your Resume Smarter with <span className="text-[#ff4c00]">AI</span>
    </h2>

    {/* Subtext */}
    <p className="text-lg md:text-xl text-slate-700 mb-6 max-w-2xl mx-auto">
      Stop struggling with formatting, rewriting, and keyword guessing.
    </p>

    <p className="text-base md:text-lg text-slate-700 mb-10">
      With our AI resume builder, you can:
    </p>

    {/* Benefits */}
    <div className="grid md:grid-cols-2 gap-4 mb-12 text-left max-w-2xl mx-auto">
      {[
        "Create ATS-optimized resumes",
        "Generate powerful achievements",
        "Improve recruiter visibility",
        "Apply faster & smarter",
      ].map((item) => (
        <div
          key={item}
          className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-3 rounded-xl border border-[#ffd6c2] shadow-sm"
        >
          <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
          <span className="text-slate-700 font-medium">{item}</span>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={() => updateCtaUrl("/ai-resume-builder", "Create Your Resume Now")}
        className="
          group
          inline-flex
          items-center
          justify-center
          rounded-full
          bg-[#ff4c00]
          px-12
          py-5
          text-lg
          font-semibold
          text-white
          shadow-[0_10px_30px_rgba(255,76,0,0.3)]
          hover:-translate-y-[3px]
          hover:shadow-[0_15px_40px_rgba(255,76,0,0.4)]
          active:translate-y-[2px]
          transition-all duration-200
        "
      >
        Create Your Resume Now
        <span className="ml-2 group-hover:translate-x-1 transition">
          →
        </span>
      </button>

      {/* trust line */}
      <p className="text-sm text-slate-500">
        Free to start • No credit card required
      </p>
    </div>

  </div>
</section>

        {/* FAQ SECTION */}
        <section className="ff-faq-section">
          <div className="ff-faq-shell">
            <div className="ff-faq-header">
              <h2>
                Resume Builder
                <span className="block">Questions Answered</span>
              </h2>
            </div>

            <div className="ff-faq-list">
              {[
                {
                  q: "What is an AI resume builder?",
                  a: "An AI resume builder uses artificial intelligence to automatically write, optimize, and format resumes.",
                },
                {
                  q: "How does an ATS-friendly resume builder work?",
                  a: "An ATS friendly resume builder structures resumes to pass applicant tracking systems using optimized formatting and keywords.",
                },
                {
                  q: "Is an AI resume generator better than manual writing?",
                  a: "Yes. An AI resume generator improves clarity, keyword relevance, and recruiter appeal.",
                },
                {
                  q: "Can I customize my AI-generated resume?",
                  a: "Absolutely. You can edit templates, layout, content, and sections.",
                },
                {
                  q: "Is this resume builder suitable for freshers?",
                  a: "Yes. Perfect for candidates with limited experience, freshers, and those who have just graduated, who are new to the job market.",
                },
                {
                  q: "Does this resume maker online support all industries?",
                  a: "Yes. Our resume maker online works across all sectors.",
                },
                {
                  q: "How long does it take to create a resume?",
                  a: "Most users finish within 10 minutes.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes. We use secure cloud infrastructure and privacy protection.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`ff-faq-item ${activeFaqIndex === i ? "is-active" : ""
                    }`}
                >
                  <button
                    className="ff-faq-question"
                    onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                  >
                    <span className="ff-faq-question-text">
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


      </main>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-0.3rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
      `}} />
    </div>
  );
}
