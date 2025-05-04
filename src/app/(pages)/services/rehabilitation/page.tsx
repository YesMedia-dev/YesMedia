"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const paragraph =
  "Our experienced therapy team is committed to providing superior physical, occupational and speech therapy in an environment conducive to healing. Patients are empowered through individualized programs to work toward restoring maximum functionality, independence, and ability following hospitalization.";

const listItems = [
  "Orthopedic and neurological rehabilitation",
  "Chronic pain management",
  "Stroke recovery",
  "Strength training and conditioning",
  "Increased Mobility",
  "Coordination and balance",
  "Injury and fall prevention",
  "Safety awareness",
  "Teaching proper body mechanics to prevent future injury",
];

export default function RehabilitationPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      {/* Title */}
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">Rehabilitation</h1>
        <p className="text-gray-600 text-lg italic">Vineland Post Acute</p>
      </motion.section>

      {/* Hero Image */}
      <motion.div
        className="mb-12 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Image
          src="/assets/rehab.jpg"
          alt="Rehabilitation Room"
          width={1400}
          height={400}
          className="w-full object-cover h-[350px]"
        />
      </motion.div>

      {/* Text Content */}
      <section className="max-w-3xl mx-auto text-gray-700 text-lg space-y-8">
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
          Our therapy services include:
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
          {listItems.map((item, idx) => (
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
      </section>
    </main>
  );
}
