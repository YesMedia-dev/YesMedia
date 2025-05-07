"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WhoWeArePage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16 relative overflow-hidden">
      {/* Decorative Bubbles */}
      {/* Left bubbles */}
      <motion.div 
        className="absolute top-20 left-0 w-32 h-32 rounded-full bg-green-200/30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div 
        className="absolute bottom-40 left-12 w-20 h-20 rounded-full bg-green-300/40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      
      {/* Right bubbles */}
      <motion.div 
        className="absolute top-10 right-12 w-36 h-36 rounded-full bg-green-200/30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.3 }}
      />
      <motion.div 
        className="absolute bottom-20 right-[0] w-14 h-14 rounded-full bg-green-300/40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
      />

      {/* Title with slide-down animation */}
      <motion.section
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">Who We Are</h1>
        <p className="text-gray-600 text-lg italic">Vineland Post Acute</p>
      </motion.section>

      <div className="flex flex-col lg:flex-row gap-10 relative z-10">
        {/* Images column with fade-in */}
        <motion.div
          className="flex-shrink-0 mx-auto lg:mx-0 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* First image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/assets/group.png"
              alt="Vineland Staff"
              width={600}
              height={400}
              className="rounded-xl shadow-md object-cover"
            />
          </motion.div>
          
          {/* Second image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Image
              src="/assets/group1.png"
              alt="Vineland Team"
              width={600}
              height={400}
              className="rounded-xl shadow-md object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Animated text content */}
        <div className="flex-1 text-gray-800 space-y-6 text-base leading-relaxed">
          {[
            `<strong>Vineland Post Acute</strong> is a 49-bed skilled nursing facility located in North Hollywood, California.`,
            `Are you or a loved one about to be discharged from the hospital but not yet well enough to go home? Are additional nursing and rehabilitation care and support needed around the clock? If so, our experienced staff can help. Our main objective is to help each patient rest, recover and return home as quickly as possible with their optimal mobility and independence.`,
            `Skilled nursing facilities operate 24 hours a day, 7 days a week, and employ a skilled support staff of clinicians, therapists, and medical consultants to oversee your overall health, rehab, and recovery plan.`,
            `Our staff recognizes that most individuals prefer to be at home instead of a nursing facility. Yet oftentimes, many patients and families are not aware of the additional supportive services a skilled nursing environment can provide while recovering following a hospital stay.`,
            `We want our patients and their families to feel comfortable while individuals recover and rehabilitate. Putting "patients first" is a guiding principle of our culture. We believe what separates us from other facilities is our positive team culture and our commitment to service. We strive to provide a compassionate and meaningful experience for each patient.`,
            `We invite you to come tour our facility and meet our team of professional caregivers. We are available nights and weekends to accommodate any busy schedule.`,
          ].map((text, i) => (
            <motion.p
              key={i}
              dangerouslySetInnerHTML={{ __html: text }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
