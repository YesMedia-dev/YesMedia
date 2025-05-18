"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GoogleMap = dynamic(() => import("./GoogleMap"), { ssr: false });

const hero = {
  image: "/gallery/vinelandfacility.webp",
};

const HeroSection = () => {
  const { t } = useTranslation("common");

  return (
    <section className="relative w-full h-screen">
      <div className="relative w-full h-screen">
        <Image
          src={hero.image}
          alt="Vineland Facility"
          fill
          className="object-cover"
          priority
        />

        {/* Title & Subtitle */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            text-white px-4 text-center md:left-1/4 md:translate-x-0 md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-2 [text-shadow:3px_3px_5px_rgba(0,0,0,0.7)]">
            {t("heroTitle")}
          </h2>
          <h3 className="text-xl md:text-2xl font-medium mb-2 [text-shadow:3px_3px_5px_rgba(0,0,0,0.7)]">
            {t("heroSubtitle")}
          </h3>
        </motion.div>

        {/* More Info Button (fixed flicker with motion.div wrapper) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <button
            onClick={() => {
              const section = document.getElementById("services");
              if (section) {
                window.scrollTo({
                  top: section.offsetTop - 80,
                  behavior: "smooth",
                });
              }
            }}
            className="flex justify-center bg-white text-[#428f47] px-6 py-2 rounded-md font-semibold shadow hover:bg-gray-100 transition"
          >
            {t("heroButton")}
          </button>
        </motion.div>
      </div>

      {/* Google Map (2XL Only) */}
      <motion.div
        className="hidden 2xl:block absolute bottom-4 right-4 w-[450px] h-[250px] z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-center px-2 w-[450px]">
          <p className="text-md md:text-lg drop-shadow font-bold break-words">
            {t("heroMapTitle")}
          </p>
        </div>

        <div className="w-full h-full rounded-lg overflow-hidden border border-white shadow-lg">
          <GoogleMap />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;




