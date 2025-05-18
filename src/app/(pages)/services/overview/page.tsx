"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SERVICES } from "@/constants/services";
import { useTranslation } from "react-i18next";
import ServicesCards from "@/components/ServicesCards";

const ANIMATION_DURATION = 0.6;

export default function ServicesOverviewPage() {
  const { t } = useTranslation("common");

  // Only include the services that are NOT "overview"
  const filteredServices = SERVICES.filter((service) => service.key !== "overview").map((service) => ({
    ...service,
    title: t(`${service.key}CardTitle`),
    description: t(`${service.key}CardDesc`),
  }));

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      {/* Title */}
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATION }}
      >
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">{t("overviewPageTitle")}</h1>
        <p className="text-gray-600 text-lg italic">{t("overviewPageSubtitle")}</p>
      </motion.section>

      {/* Image */}
      <motion.div
        className="mb-12 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: ANIMATION_DURATION, delay: 0.2 }}
      >
        <Image
          src="/services/overview.jpg"
          alt={t("overviewPageImageAlt")}
          width={1400}
          height={400}
          className="w-full object-cover h-[350px]"
        />
      </motion.div>

      {/* Cards */}
      <ServicesCards services={filteredServices} animateDur={ANIMATION_DURATION} />
    </main>
  );
}










