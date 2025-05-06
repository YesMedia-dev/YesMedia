"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ScheduleTour = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    comments: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const res = await fetch("/api/tour-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessMessage("✅ Your tour request has been sent!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          preferredDate: "",
          preferredTime: "",
          comments: "",
        });
      } else {
        alert("❌ Failed to send request. Try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error sending request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white pt-20 pb-16 px-6 animate-fadeIn overflow-hidden relative">
      {/* Decorative Green Bubbles */}
      {/* Left-side bubbles */}
      <div className="absolute w-[100px] h-[100px] bg-green-100 rounded-full top-[-40px] left-[-30px] z-0 opacity-30" />
      <div className="absolute w-[80px] h-[80px] bg-green-200 rounded-full top-[25%] left-[-40px] z-0 opacity-20" />
      <div className="absolute w-[60px] h-[60px] bg-green-100 rounded-full bottom-[30%] left-[0%] z-0 opacity-20" />
      <div className="absolute w-[90px] h-[90px] bg-green-200 rounded-full bottom-[5%] left-[5%] z-0 opacity-25" />

      {/* Right-side bubbles */}
      <div className="absolute w-[70px] h-[70px] bg-green-100 rounded-full top-[15%] right-[-25px] z-0 opacity-20" />
      <div className="absolute w-[100px] h-[100px] bg-green-200 rounded-full bottom-[15%] right-[10%] z-0 opacity-25" />
      <div className="absolute w-[80px] h-[80px] bg-green-100 rounded-full bottom-[0%] right-[0%] z-0 opacity-20" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-[#428f47] mb-2"
        >
          Schedule a Tour
        </motion.h1>
        <p className="text-black italic text-lg mb-10">Vineland Post Acute</p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden shadow-lg mb-12"
        >
          <div className="relative w-full h-[400px] md:h-[350px]">
            <Image src="/assets/tour.jpg" alt="Schedule a Tour" fill className="object-cover rounded-xl" priority />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-md text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8"
        >
          <strong>At Vineland Post Acute</strong>, we invite you to come tour our facility and meet our team of
          professional caregivers. We are available nights and weekends to accommodate any busy schedule.
        </motion.p>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto text-left space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">First Name</label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Phone</label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Preferred Date</label>
              <input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Preferred Time</label>
              <select
                id="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              >
                <option value="">Select a time</option>
                {[
                  "08:00",
                  "08:30",
                  "09:00",
                  "09:30",
                  "10:00",
                  "10:30",
                  "11:00",
                  "11:30",
                  "12:00",
                  "12:30",
                  "13:00",
                  "13:30",
                  "14:00",
                  "14:30",
                  "15:00",
                  "15:30",
                  "16:00",
                  "16:30",
                  "17:00",
                  "17:30",
                  "18:00",
                  "18:30",
                  "19:00",
                  "19:30",
                ].map((time) => (
                  <option key={time} value={time}>
                    {new Date(`1970-01-01T${time}:00`).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Comments/Questions</label>
            <textarea
              id="comments"
              rows={5}
              value={formData.comments}
              onChange={handleChange}
              placeholder="Let us know if you have any preferences or questions..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 bg-[#428f47] text-white font-semibold px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>

          {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default ScheduleTour;
