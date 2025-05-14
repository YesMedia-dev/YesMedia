"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GoogleMap = dynamic(() => import("./GoogleMap"), { ssr: false });

const slides = [
  {
    image: "/gallery/vinelandfacility.webp",
    title: "True Love is a Homecooked Meal",
    subtitle: "Our beautifully renovated facility offers peace, safety, and comfort.",
    description:
      "Our chefs bring decades of experience and culinary expertise, preparing the finest healthy meals with care and dedication for our residents.",
  },
];

const HeroSection = () => {
  const [, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        speed={1000}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-screen">
              <Image src={slide.image} alt={`Slide ${idx + 1}`} fill className="object-cover" priority />

              {/* TEXT OVERLAY with animation */}
              <motion.div
                className="absolute top-[78%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <p className="text-xl tracking-widest uppercase font-semibold mb-2">FIRST CLASS CARE</p>
                <h2 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow">{slide.title}</h2>
                <h3 className="text-xl md:text-2xl font-medium mb-2 drop-shadow">{slide.subtitle}</h3>
                <p className="max-w-2xl text-md md:text-lg drop-shadow mx-auto">{slide.description}</p>

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
                    className="mt-6 bg-white text-[#428f47] px-6 py-2 rounded-md font-semibold shadow hover:bg-gray-100 transition"
                  >
                    More Info
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
