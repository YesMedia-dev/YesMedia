"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ServicesSection from "@/components/ServiceSection";

const services = [
  "Dental",
  "Vision",
  "Podiatry",
  "Audiology",
  "Dementia assessment",
  "Psychosocial and Psychiatric Evaluation",
  "Individual therapy",
  "Arrange transportation to appointments",
  "Accompanying patients to appointments upon request",
  "Power of Attorney",
];

export default function SocialServicesPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      {/* Title */}
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">Social Services</h1>
        <p className="text-gray-600 text-lg italic">Vineland Post Acute</p>
      </motion.section>

      {/* Image */}
      <motion.div
        className="mb-12 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Image
          src="/services/social.jpg"
          alt="Social Services"
          width={1400}
          height={400}
          className="w-full object-cover h-[350px]"
        />
      </motion.div>

      {/* Description */}
      <div className="flex flex-col md:flex-row gap-12">
        <div>
          <motion.p
            className="text-left text-gray-700 text-[17px] leading-relaxed max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Social Services assist both patients and their families. We also provide essential information, manage
            requests and concerns, and help in care planning and discharge planning for each patient.
          </motion.p>

          {/* List of Services */}
          <motion.h2
            className="text-xl font-semibold text-[#428f47] max-w-3xl mx-auto mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            We can arrange professional services for:
          </motion.h2>

          <ul className="list-disc text-gray-700 pl-8 max-w-3xl mx-auto">
            {services.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                className="mb-1"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Fade-in added below */}
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
