"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "swiper/css";

const Family = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const router = useRouter();
  const { t } = useTranslation("common");

  const testimonials = [
    {
      image: "/assets/care1.webp",
      text: t("testimonial1"),
    },
    {
      image: "/gallery/group4.webp",
      text: t("testimonial2"),
    },
  ];

  return (
    <section className="pt-24 pb-10 bg-white text-center animate-fadeIn relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("familyTitle")}</h2>
        <p className="text-lg text-gray-700 mb-12">{t("familySubtitle")}</p>

        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 7000 }}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            className="mySwiper"
          >
            {testimonials.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                  {/* Left: Image */}
                  <div className="w-full md:w-[55%] h-[400px] relative rounded-2xl overflow-hidden shadow-xl">
                    <Image src={item.image} alt={`Testimonial ${idx + 1}`} fill className="object-cover" />
                  </div>

                  {/* Right: Testimonial */}
                  <div className="w-full md:w-[45%] bg-green-50 p-6 md:p-8 rounded-2xl shadow-sm text-left">
                    <p className="text-gray-800 text-lg leading-relaxed italic">&quot;{item.text}&quot;</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <div
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow cursor-pointer hover:bg-gray-100"
            onClick={() => swiperInstance?.slidePrev()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-800"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow cursor-pointer hover:bg-gray-100"
            onClick={() => swiperInstance?.slideNext()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-800"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Button */}
        <div className="mt-12">
          <button
            onClick={() => router.push("/about-us/testimonials")}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            {t("readMoreTestimonials")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Family;


