"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function GeneralFAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation("common");

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = Array.from({ length: 24 }, (_, i) => ({
    question: t(`faq.q${i + 1}`),
    answer: t(`faq.a${i + 1}`),
  }));

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      {/* Title */}
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">{t("faq.title")}</h1>
        <p className="text-gray-600 text-lg italic">{t("faq.subtitle")}</p>
      </motion.section>

      {/* Hero Image */}
      <motion.div
        className="mb-12 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Image
          src="/about/FAQ.jpg"
          alt="Facility Outdoor"
          width={1400}
          height={400}
          className="w-full object-cover h-[350px]"
        />
      </motion.div>

      {/* Intro */}
      <motion.p
        className="text-center text-gray-700 max-w-2xl mx-auto mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {t("faq.intro")}
      </motion.p>

      {/* FAQ List */}
      <section className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-[#428f47] font-medium text-lg hover:bg-gray-50 transition"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-gray-400">{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <motion.div
                className="px-6 pb-4 text-gray-600 whitespace-pre-line"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </section>
    </main>
  );
}



