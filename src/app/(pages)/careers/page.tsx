"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "New Hires",
    description: "Full-time new hires are eligible for Medical, Dental, Vision, Aflac, LegalZoom, PHMP.",
    image: "/assets/newhire.png",
  },
  {
    title: "Free CNA Classes",
    description: "Free CNA schooling and job placement.",
    image: "/assets/edutrack.png",
    link: "https://edutracktraining.com/",
  },
  {
    title: "Annual Car Giveaway",
    description:
      "Twelve years in a row, two employees drive away in brand new cars. Employees are eligible based on stellar attendance and safety record.",
    image: "/assets/car.png",
  },
  {
    title: "Monthly Safety Bonus",
    description: "The facility celebrates safety compliance monthly, raffling away cash and prizes.",
    image: "/assets/safety.png",
  },
  {
    title: "PHMP Plan",
    description:
      "Includes telemedicine, coaching, dietary assistance, and more — designed to improve health and lower taxes.",
    image: "/assets/phmp.png",
  },
  {
    title: "Tickets at Work",
    description: "Theme parks, concerts, movies & more — enjoy big discounts as a Vineland team member.",
    image: "/assets/tickets.png",
  },
];

const cardClasses =
  "bg-white rounded-lg shadow-md p-6 text-left flex flex-col items-center justify-start h-[200px] hover:shadow-lg transition";

const Careers = () => {
  return (
    <section className="bg-white pt-20 pb-16 px-6 animate-fadeIn overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-[#428f47] mb-2"
        >
          Careers
        </motion.h1>
        <p className="text-[#000000] italic text-lg mb-10">Vineland Post Acute</p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden shadow-lg mb-12"
        >
          <div className="relative w-full h-[400px] md:h-[350px]">
            <Image
              src="/contact/welcome.jpeg"
              alt="Welcome to Vineland"
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-md text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8"
        >
          <strong>Vineland Post Acute</strong> is always hiring dedicated team members. We have openings in Nursing,
          Therapy, Marketing, Housekeeping, Laundry, Social Services, and more. We are an equal opportunity employer and
          offer CNA training and career growth paths.
        </motion.p>

        <a
          href="https://www2.appone.com/Search/Search.aspx?ServerVar=sunmarmanagementservices.appone.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition mb-16"
        >
          APPLY NOW
        </a>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Employee Benefits</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => {
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={cardClasses}
              >
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  width={175}
                  height={175}
                  className="mb-4 object-contain"
                />
                <h3 className="font-bold text-lg text-gray-800 mb-2 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-sm text-center">{benefit.description}</p>
              </motion.div>
            );

            return benefit.link ? (
              <a key={benefit.title} href={benefit.link} target="_blank" rel="noopener noreferrer" className="block">
                {content}
              </a>
            ) : (
              <div key={benefit.title}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Careers;
