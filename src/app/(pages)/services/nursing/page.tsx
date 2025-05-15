"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ServicesSection from "@/components/ServiceSection";

const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const SkilledNursingPage = () => {
  const bullets = [
    "IV therapy, including TPN",
    "Wound care, wound vac, and wound debridement by a wound specialist",
    "Pain management",
    "Cardiac wellness and stroke rehabilitation",
    "Nutrition & hydration programs",
    "Stroke rehabilitation",
    "Joint replacement recovery program",
    "Tracheostomy and respiratory care",
    "Chest tube management",
    "Restorative nursing",
    "Diabetic management & education",
    "Coordinated care from medical director and director of nurses",
  ];

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">Skilled Nursing</h1>
        <p className="text-gray-600 text-lg italic">Vineland Post Acute</p>
      </motion.section>

      <motion.div
        className="mb-12 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Image
          src="/services/nursing.jpg"
          alt="Skilled Nursing Room"
          width={1400}
          height={400}
          className="w-full object-cover h-[350px]"
        />
      </motion.div>

      <div className="flex flex-col md:flex-row gap-12">
        <div>
          <motion.p
            className="text-left text-gray-700 text-[17px] leading-relaxed max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            We take a holistic approach to developing a comprehensive care plan. We assemble a team that includes
            administration, clinical, therapy, dietary, social service, and case management professionals. We provide
            individualized 24-hour skilled care and rehabilitation services in a comfortable and family-friendly
            environment. Our team works together with the patients and their family members to determine the optimal
            treatment plan for each situation.
          </motion.p>

          <motion.div
            className="text-left text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <p className="font-semibold text-[#428f47] text-lg mb-4">
              We offer comprehensive clinical disciplines that include:
            </p>
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    delayChildren: 0.9,
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="list-disc pl-6 space-y-2"
            >
              {bullets.map((item, idx) => (
                <motion.li key={idx} variants={listItemVariants}>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* ADDED FADE-IN ANIMATION HERE */}
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
};

export default SkilledNursingPage;
