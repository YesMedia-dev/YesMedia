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
    description:
      "Our chefs bring decades of experience and culinary expertise, preparing the finest healthy meals with care and dedication for our residents.",
  },
  {
    image: "/assets/outside1.jpeg",
    title: "A Place to Enjoy",
    subtitle:
      "Our beautifully renovated facility offers peace, safety, and comfort.",
    description:
      "We are committed to providing exceptional skilled nursing and rehabilitation services in a serene environment.",
  },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
              <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4">
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

      <div className="hidden 2xl:block absolute bottom-4 right-4 w-[450px] h-[250px] z-20">
        {/* Text above the map, centered and constrained */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-center px-2 w-[450px]">
          <p className="text-md md:text-lg drop-shadow font-bold break-words">
            Find a Sun Mar Facility Near You
          </p>
        </div>

        {/* Map container */}
        <div className="w-full h-full rounded-lg overflow-hidden border border-white shadow-lg">
          <GoogleMap />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
