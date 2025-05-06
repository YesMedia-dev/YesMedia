"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comments: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    console.log("🚀 Submitting form data:", formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Handle non-JSON responses
      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Server error response:", errorText || res.statusText);
        throw new Error(errorText || `Server error: ${res.status} ${res.statusText}`);
      }

      // For empty responses
      const responseText = await res.text();
      
      if (!responseText) {
        console.log("✅ Request successful but empty response received");
        setSuccessMessage("✅ Your message has been sent! We'll be in touch shortly.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          comments: "",
        });
        return;
      }

      // Try to parse JSON if we have content
      let result;
      try {
        result = JSON.parse(responseText);
        console.log("📬 Server response:", result);
      } catch (jsonError) {
        console.warn("⚠️ Response is not valid JSON:", responseText);
        // Still consider it a success if the request was successful
        if (res.ok) {
          setSuccessMessage("✅ Your message has been sent! We'll be in touch shortly.");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            comments: "",
          });
          return;
        }
        throw new Error("Invalid server response format");
      }

      // Handle parsed JSON result
      if (result?.success) {
        setSuccessMessage("✅ Your message has been sent! We'll be in touch shortly.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          comments: "",
        });
      } else {
        throw new Error(result?.error || "Unknown error occurred");
      }
    } catch (err) {
      console.error("❌ Form submission error:", err);
      setErrorMessage(`Failed to send message: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-white py-20 px-6 overflow-hidden min-h-screen">
      {/* Decorative Bubbles */}
      <div className="absolute w-[100px] h-[100px] bg-green-100 rounded-full top-[-40px] left-[-30px] z-0 opacity-30" />
      <div className="absolute w-[80px] h-[80px] bg-green-200 rounded-full top-[30%] left-0 z-0 opacity-30" />
      <div className="absolute w-[110px] h-[110px] bg-green-100 rounded-full bottom-[10%] left-[5%] z-0 opacity-20" />
      <div className="absolute w-[100px] h-[100px] bg-green-200 rounded-full top-[10%] right-[80px] z-0 opacity-25" />
      <div className="absolute w-[90px] h-[90px] bg-green-100 rounded-full top-[50%] right-0 z-0 opacity-20" />
      <div className="absolute w-[110px] h-[110px] bg-green-200 rounded-full bottom-[5%] right-[5%] z-0 opacity-20" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-[#428f47] mb-2 text-center"
        >
          Email Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-black italic text-lg mb-10 text-center"
        >
          Vineland Post Acute
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden shadow-lg mb-12"
        >
          <div className="relative w-full h-[400px] md:h-[350px]">
            <Image src="/assets/outside3.jpeg" alt="Facility" fill className="object-cover rounded-xl" priority />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-700 text-center max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          We would love to show you what makes us different. You can be confident when choosing{" "}
          <strong>Vineland Post Acute</strong>. We are committed to providing you or your loved one with excellent and
          personalized care during your stay.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto text-left"
        >
          <div className="flex flex-col">
            <label htmlFor="firstName" className="font-semibold text-sm mb-1">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              placeholder="First"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="font-semibold text-sm mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              placeholder="Last"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              placeholder="your@email.com"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold text-sm mb-1">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              placeholder="(555) 555-5555"
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label htmlFor="comments" className="font-semibold text-sm mb-1">
              Comment / Questions
            </label>
            <textarea
              id="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={5}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <div className="sm:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </div>

          {successMessage && (
            <p className="text-green-600 text-center sm:col-span-2 mt-4">{successMessage}</p>
          )}
          
          {errorMessage && (
            <p className="text-red-600 text-center sm:col-span-2 mt-4">{errorMessage}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;





