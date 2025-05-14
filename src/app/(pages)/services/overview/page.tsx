"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SERVICES } from "@/constants/services";
import ServicesCards from "@/components/ServicesCards";

const ANIMATION_DURATION = 0.6; // Adjust this value for slower or faster animations

// Removes "Overview" and uppercases all titles
const filteredServices = SERVICES.filter((service) => service.title !== "Overview").map((service) => ({
  ...service,
  title: service.title.toUpperCase(),
}));

export default function ServicesOverviewPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      {/* Title */}
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATION }}
      >
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">Services Overview</h1>
        <p className="text-gray-600 text-lg italic">Vineland Post Acute</p>
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
          alt="Service Overview"
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
