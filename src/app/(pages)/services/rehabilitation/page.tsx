"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ServicesSection from "@/components/ServiceSection";

export default function RehabilitationPage() {
  const { t } = useTranslation("common");

  const paragraph = t("rehabPage.intro");
  const bullets = t("rehabPage.bullets", { returnObjects: true }) as string[];

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      {/* Title */}
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">{t("rehabPage.title")}</h1>
        <p className="text-gray-600 text-lg italic">{t("rehabPage.subtitle")}</p>
      </motion.section>

      {/* Hero Image */}
      <motion.div
        className="mb-12 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Image
          src="/services/rehabilitation.jpg"
          alt="Rehabilitation Room"
          width={1400}
          height={400}
          className="w-full object-cover h-[350px]"
        />
      </motion.div>

      {/* Text Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left: Text Content */}
          <div className="flex-1 text-gray-700 text-lg space-y-8">
            {/* Animated paragraph word by word */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.01,
                  },
                },
              }}
              className="flex flex-wrap"
            >
              {paragraph.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className="mr-1"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            {/* Animated list heading */}
            <motion.p
              className="font-semibold text-[#428f47] mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {t("rehabPage.sectionTitle")}
            </motion.p>

            {/* Bullet list with staggered appearance */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    delayChildren: 1,
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="list-disc pl-6 space-y-2"
            >
              {bullets.map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right: Services List with fade-in */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <ServicesSection variant="list" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

