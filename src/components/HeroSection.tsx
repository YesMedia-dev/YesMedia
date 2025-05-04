"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import dynamic from "next/dynamic";

const GoogleMap = dynamic(() => import("./GoogleMap"), { ssr: false });

const slides = [
  {
    image: "/assets/chef.jpeg",
    title: "True Love is a Homecooked Meal",
    subtitle: "Meet Chef Jose Ramirez, Culinary Director of Vineland Post Acute",
    description:
      "With decades of experience and a heart for healing, Chef Jose brings warmth to the table with every dish he prepares.",
  },
  {
    image: "/assets/outside1.jpeg",
    title: "A Place to Enjoy",
    subtitle: "Our beautifully renovated facility offers peace, safety, and comfort.",
    description:
      "Vineland Post Acute is committed to providing exceptional skilled nursing and rehabilitation services in a serene environment.",
  },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full h-[75vh]">
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
            <div className="relative w-full h-[75vh]">
              <Image
                src={slide.image}
                alt={`Slide ${idx + 1}`}
                fill
                className={`object-cover ${
                  idx === 0 ? "object-[center_10%]" : "object-center"
                }`}
                priority
              />

              {/* TEXT OVERLAY */}
              <div className="absolute top-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4">
                <p className="text-xl tracking-widest uppercase font-semibold mb-2">
                  FIRST CLASS CARE
                </p>
                <h2 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow">
                  {slide.title}
                </h2>
                <h3 className="text-xl md:text-2xl font-medium mb-2 drop-shadow">
                  {slide.subtitle}
                </h3>
                <p className="max-w-2xl text-md md:text-lg drop-shadow mx-auto">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Map in bottom-right corner */}
      <div className="absolute bottom-4 right-4 w-[450px] h-[250px] rounded-lg overflow-hidden border border-white shadow-lg z-20">
        <GoogleMap />
      </div>
    </section>
  );
};

export default HeroSection;
