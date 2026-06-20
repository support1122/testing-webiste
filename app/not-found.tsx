import Link from "next/link";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#fff6f4] to-white flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff4c00] to-[#f97316] leading-none">
              404
            </h1>
          </div>

          {/* Main Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved.
              Let's get you back on track to landing your dream job.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/"
              className="px-8 py-4 bg-[#ff4c00] text-white font-semibold rounded-lg shadow-[0_0.3rem_0_#e64400] hover:shadow-[0_0.4rem_0_#e64400] hover:translate-y-[-2px] transition-all duration-200 text-center min-w-[200px]"
            >
              Go to Homepage
            </Link>
            <Link
              href="/blog"
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border border-gray-300 hover:border-[#ff4c00] hover:text-[#ff4c00] transition-all duration-200 text-center min-w-[200px]"
            >
              Browse Blogs
            </Link>
          </div>

          {/* Quick Links */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 mb-4">Popular Pages:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/pricing"
                className="text-[#ff4c00] hover:text-[#e64400] hover:underline transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/feature"
                className="text-[#ff4c00] hover:text-[#e64400] hover:underline transition-colors"
              >
                Features
              </Link>
              <Link
                href="/testimonials"
                className="text-[#ff4c00] hover:text-[#e64400] hover:underline transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="/faq"
                className="text-[#ff4c00] hover:text-[#e64400] hover:underline transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/contact-us"
                className="text-[#ff4c00] hover:text-[#e64400] hover:underline transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

