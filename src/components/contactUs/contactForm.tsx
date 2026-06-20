"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaBuilding, FaPhone } from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    workAuthorization: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    console.log("Form submission started", { formData, baseUrl });

    if (!baseUrl) {
      console.error("NEXT_PUBLIC_API_BASE_URL is not set");
      setError("Configuration error. Please contact support.");
      setLoading(false);
      return;
    }

    try {
      // Remove trailing slash from baseUrl and ensure proper URL construction
      const baseUrlClean = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      const apiUrl = `${baseUrlClean}/api/contact`;
      console.log("Sending request to:", apiUrl);
      console.log("Request payload:", formData);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      // Get response as text first to handle both JSON and HTML responses
      const responseText = await response.text();
      let result: any = {};

      // Try to parse as JSON
      try {
        result = JSON.parse(responseText);
        console.log("Response data:", result);
      } catch (parseError) {
        // If it's not JSON, it's probably an HTML error page
        console.error("Non-JSON response received:", responseText.substring(0, 200));
        setError(`Server error (${response.status}). Please check if the API endpoint is correct.`);
        return;
      }

      if (response.ok && (response.status === 200 || response.status === 201)) {
        setSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          company: "",
          phone: "",
          message: "",
          workAuthorization: "",
        });
        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(result?.error || result?.message || "Failed to submit form. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Your Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaUser className="text-gray-400" />
          </div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your First Name"
            required
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4c00] focus:border-[#ff4c00] outline-none transition"
          />
          </div>
          </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="text-gray-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            required
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4c00] focus:border-[#ff4c00] outline-none transition"
          />
        </div>
          </div>

      {/* Company / School */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Company / School <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaBuilding className="text-gray-400" />
          </div>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter your Company / School"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4c00] focus:border-[#ff4c00] outline-none transition"
          />
        </div>
          </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Phone <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaPhone className="text-gray-400" />
          </div>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your Phone Number"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4c00] focus:border-[#ff4c00] outline-none transition"
          />
        </div>
      </div>

      {/* Work Authorization */}
      <div>
        <label
          htmlFor="workAuthorization"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Work Authorization <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <select
          id="workAuthorization"
          name="workAuthorization"
          value={formData.workAuthorization}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4c00] focus:border-[#ff4c00] outline-none transition"
        >
          <option value="">Select work authorization status</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          How can we help?
        </label>
          <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter Message Here"
          rows={5}
          required
          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4c00] focus:border-[#ff4c00] outline-none transition resize-y"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          Thank you for contacting us! We'll get back to you soon.
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ff4c00] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#e64400] transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
