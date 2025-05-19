"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { enUS, es } from "date-fns/locale";
import { Locale } from "date-fns";

const ScheduleTour = () => {
  const { t, i18n } = useTranslation("common");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    comments: "",
  });

  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const localeMap: Record<string, Locale> = {
    en: enUS,
    es: es,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/tour-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          language: i18n.language // ✅ send current language
        }),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text || `Status ${res.status}`);

      try {
        const result = JSON.parse(text);
        if (result?.success) {
          setSuccessMessage(t("tourPage.form.success"));
          resetForm();
        } else {
          throw new Error();
        }
      } catch {
        setSuccessMessage(t("tourPage.form.success"));
      }
    } catch {
      setErrorMessage(t("tourPage.form.error"));
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
      preferredDate: "",
      preferredTime: "",
      comments: "",
    });
    setCalendarDate(null);
  };

  return (
    <section className="bg-white pt-10 pb-16 px-6 animate-fadeIn overflow-hidden relative">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-[#428f47] mb-2"
        >
          {t("tourPage.title")}
        </motion.h1>

        <p className="text-black italic text-lg mb-10">{t("tourPage.subtitle")}</p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden shadow-lg mb-12"
        >
          <div className="relative w-full h-[400px] md:h-[350px]">
            <Image
              src="/gallery/hall.webp"
              alt="Schedule a Tour"
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-md text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8"
        >
          {t("tourPage.description")}
        </motion.p>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto text-left space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                {t("tourPage.form.firstName")}
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder={t("tourPage.form.placeholder.first")}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                {t("tourPage.form.lastName")}
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder={t("tourPage.form.placeholder.last")}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                {t("tourPage.form.email")}
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t("tourPage.form.placeholder.email")}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                {t("tourPage.form.phone")}
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("tourPage.form.placeholder.phone")}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">
                {t("tourPage.form.preferredDate")}
              </label>
              <DatePicker
                selected={calendarDate}
                onChange={(date) => {
                  setCalendarDate(date);
                  setFormData({
                    ...formData,
                    preferredDate: date?.toISOString().split("T")[0] || "",
                  });
                }}
                locale={localeMap[i18n.language] || enUS}
                placeholderText={t("tourPage.form.placeholder.date")}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                dateFormat="P"
                wrapperClassName="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                {t("tourPage.form.preferredTime")}
              </label>
              <select
                id="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">
                  {t("tourPage.form.placeholder.selectTime")}
                </option>
                {[
                  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
                  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
                  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
                  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
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
            <label className="block text-sm font-semibold mb-1">
              {t("tourPage.form.comments")}
            </label>
            <textarea
              id="comments"
              rows={5}
              value={formData.comments}
              onChange={handleChange}
              placeholder={t("tourPage.form.placeholder.comments")}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 bg-[#428f47] text-white font-semibold px-6 py-2 rounded-md hover:bg-green-700 transition"
            >
              {isSubmitting
                ? t("tourPage.form.sending")
                : t("tourPage.form.submit")}
            </button>
          </div>

          {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default ScheduleTour;









