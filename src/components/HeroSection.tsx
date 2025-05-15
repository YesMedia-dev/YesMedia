"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GoogleMap = dynamic(() => import("./GoogleMap"), { ssr: false });

const hero = {
  image: "/gallery/vinelandfacility.webp",
  title: "Welcome",
  subtitle: "Our beautifully renovated facility offers peace, safety, and comfort.",
  description:
    "Our chefs bring decades of experience and culinary expertise, preparing the finest healthy meals with care and dedication for our residents.",
};

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen">
      <div className="relative w-full h-screen">
        <Image src={hero.image} alt="Vineland Facility" fill className="object-cover" priority />

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
             text-white px-4 text-center md:left-1/4 md:translate-x-0 md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-2 [text-shadow:3px_3px_5px_rgba(0,0,0,0.7)]">
            {hero.title}
          </h2>
          <h3 className="text-xl md:text-2xl font-medium mb-2 [text-shadow:3px_3px_5px_rgba(0,0,0,0.7)]">
            {hero.subtitle}
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
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
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center bg-white text-[#428f47] px-6 py-2 rounded-md font-semibold shadow hover:bg-gray-100 transition"
          >
            More Info
          </button>
        </motion.div>
      </div>

      {/* Google Map for 2XL screen and up, now animated */}
      <motion.div
        className="hidden 2xl:block absolute bottom-4 right-4 w-[450px] h-[250px] z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-center px-2 w-[450px]">
          <p className="text-md md:text-lg drop-shadow font-bold break-words">Find a Sun Mar Facility Near You</p>
        </div>

        <div className="w-full h-full rounded-lg overflow-hidden border border-white shadow-lg">
          <GoogleMap />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
