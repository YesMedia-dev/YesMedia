"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n"; // Ensure this is correctly imported based on your setup

const Contact = () => {
  const { t } = useTranslation("common");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comments: ""
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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          lang: i18n.language // send the current language
        })
      });

      const text = await res.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        if (res.ok) {
          setSuccessMessage(t("contactPage.form.success"));
          resetForm();
          return;
        } else {
          throw new Error();
        }
      }

      if (result?.success) {
        setSuccessMessage(t("contactPage.form.success"));
        resetForm();
      } else {
        throw new Error();
      }
    } catch {
      setErrorMessage(t("contactPage.form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      comments: ""
    });
  };

  return (
    <section className="relative bg-white pt-10 pb-20 px-6 overflow-hidden min-h-screen">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-[#428f47] mb-2 text-center"
        >
          {t("contactPage.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-black italic text-lg mb-10 text-center"
        >
          {t("contactPage.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden shadow-lg mb-12"
        >
          <div className="relative w-full h-[400px] md:h-[350px]">
            <Image src="/gallery/bear.webp" alt="Facility" fill className="object-cover rounded-xl" priority />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-700 text-center max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {t("contactPage.description")}
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
              {t("contactPage.form.firstName")}
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              placeholder={t("contactPage.form.placeholder.first")}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="font-semibold text-sm mb-1">
              {t("contactPage.form.lastName")}
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              placeholder={t("contactPage.form.placeholder.last")}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-sm mb-1">
              {t("contactPage.form.email")}
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              placeholder={t("contactPage.form.placeholder.email")}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold text-sm mb-1">
              {t("contactPage.form.phone")}
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              placeholder={t("contactPage.form.placeholder.phone")}
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label htmlFor="comments" className="font-semibold text-sm mb-1">
              {t("contactPage.form.comments")}
            </label>
            <textarea
              id="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={5}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#428f47]"
              placeholder={t("contactPage.form.placeholder.message")}
            ></textarea>
          </div>

          <div className="sm:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              {isSubmitting ? t("contactPage.form.sending") : t("contactPage.form.submit")}
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










