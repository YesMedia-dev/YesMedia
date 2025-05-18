"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type Services = {
  title: string;
  description: string;
  link: string;
};

export default function ServicesCards({
  services,
  animateDur,
}: {
  services: Services[];
  animateDur: number;
}) {
  const { t } = useTranslation("common");
  const [openStates, setOpenStates] = useState<boolean[]>(Array(services.length).fill(false));

  const toggleCard = (index: number) => {
    setOpenStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
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
              duration: animateDur,
              delay: 0.3 + index * 0.1,
            }}
            onClick={() => toggleCard(index)}
            className={`relative border border-gray-200 rounded-lg shadow-sm h-[150px] px-6 py-4 cursor-pointer overflow-hidden flex flex-col justify-center transition-colors duration-300 ${
              isOpen ? "bg-gray-50" : "bg-white"
            }`}
          >
            <motion.h2
              layout
              transition={{ duration: animateDur }}
              className={`text-[#428f47] font-bold transition-all duration-300 ${
                isOpen ? "text-sm absolute top-4 left-6" : "text-2xl text-center w-full"
              }`}
            >
              {service.title}
            </motion.h2>

            {isOpen && (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: animateDur, delay: 0.3 }}
                className="text-gray-700 text-sm mt-6"
              >
                {service.description}
                <motion.p
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: animateDur, delay: 0.3 }}
                  className="absolute bottom-2 right-4"
                >
                  <Link href={service.link} className="font-semibold text-[#428f47] underline">
                    {t("learnMore")}
                  </Link>
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </section>
  );
}




