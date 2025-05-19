"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ServicesSection from "@/components/ServiceSection";

export default function ActivitiesPage() {
  const { t } = useTranslation("common");

  const activityPoints = t("activitiesPage.bullets", {
    returnObjects: true,
  }) as string[];

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      {/* Title */}
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">
          {t("activitiesPage.title")}
        </h1>
        <p className="text-gray-600 text-lg italic">
          {t("activitiesPage.subtitle")}
        </p>
      </motion.section>

      {/* Hero Image */}
      <motion.div
        className="mb-12 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Image
          src="/services/activities.jpg"
          alt="Activities Outdoor Area"
          width={1400}
          height={400}
          className="w-full object-cover h-[350px]"
        />
      </motion.div>

      {/* Description and List */}
      <div className="flex flex-col md:flex-row gap-12">
        <div>
          {/* Paragraph */}
          <motion.p
            className="text-gray-700 max-w-2xl mx-auto mb-8 text-left text-[17px] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {t("activitiesPage.intro")}
          </motion.p>

          {/* Section Header */}
          <motion.p
            className="text-lg text-[#428f47] font-semibold mb-4 max-w-2xl mx-auto text-left"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {t("activitiesPage.sectionTitle")}
          </motion.p>

          {/* List */}
          <ul className="max-w-2xl mx-auto text-gray-700 text-left space-y-2 pl-5 list-disc">
            {activityPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              >
                {point}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <ServicesSection variant="list" />
        </motion.div>
      </div>
    </main>
  );
}
