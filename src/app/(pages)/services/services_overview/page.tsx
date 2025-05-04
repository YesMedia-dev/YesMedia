"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ANIMATION_DURATION = 0.6; // Adjust this value for slower or faster animations

const services = [
  {
    title: "REHABILITATION",
    description:
      "Our experienced therapy team is committed to providing superior physical, occupational and speech therapy in an environment conducive to healing.",
    link: "/services/rehabilitation",
  },
  {
    title: "SKILLED NURSING",
    description:
      "We provide individualized 24-hour skilled care and rehabilitation services in a comfortable and family-friendly environment.",
    link: "/services/nursing",
  },
  {
    title: "SOCIAL SERVICES",
    description:
      "Social Services provide essential information, manage requests and concerns, help in the care planning and discharge planning for each patient.",
    link: "/services/social",
  },
  {
    title: "ACTIVITIES",
    description:
      "We create positive and uplifting social programs and individualized activities to match patient needs and capabilities.",
    link: "/services/activities",
  },
];

export default function ServicesOverviewPage() {
  const [openStates, setOpenStates] = useState<boolean[]>(
    Array(services.length).fill(false)
  );

  const toggleCard = (index: number) => {
    setOpenStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      {/* Title */}
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATION }}
      >
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">
          Services Overview
        </h1>
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
          src="/assets/room2.jpeg"
          alt="Service Overview"
          width={1400}
          height={400}
          className="w-full object-cover h-[350px]"
        />
      </motion.div>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {services.map((service, index) => {
          const isOpen = openStates[index];

          return (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: ANIMATION_DURATION,
                delay: 0.3 + index * 0.1,
              }}
              onClick={() => toggleCard(index)}
              className={`relative border border-gray-200 rounded-lg shadow-sm h-[150px] px-6 py-4 cursor-pointer overflow-hidden flex flex-col justify-center transition-colors duration-300 ${
                isOpen ? "bg-gray-50" : "bg-white"
              }`}
            >
              <motion.h2
                layout
                transition={{ duration: ANIMATION_DURATION }}
                className={`text-[#428f47] font-bold transition-all duration-300 ${
                  isOpen
                    ? "text-sm absolute top-4 left-6"
                    : "text-2xl text-center w-full"
                }`}
              >
                {service.title}
              </motion.h2>

              {isOpen && (
                <motion.p
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: ANIMATION_DURATION,
                    delay: 0.3,
                  }}
                  className="text-gray-700 text-sm mt-6"
                >
                  {service.description}{" "}
                  <a
                    href={service.link}
                    className="font-semibold text-[#428f47] underline"
                  >
                    Learn More Here.
                  </a>
                </motion.p>
              )}
            </motion.div>
          );
        })}
      </section>
    </main>
  );
}
