"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "swiper/css";

const testimonials = [
  {
    image: "/assets/care1.png",
    text: "My sister always had positive comments regarding this facility. She said the food was very good. The nurses were great. The staff was also very much involved and willing to give her all the answers that she needed on top of the Physical Therapy that she said was the best she had ever received, her physical therapy was customized for her needs for the areas of her body that needed to be strengthened. She said she was very happy with this facility. And would happily return if she needed this type of therapy.",
  },
  {
    image: "/assets/care2.png",
    text: "My respect for all CNAs at Vineland Post Acute. They work very hard to take care of their patients and accommodate their needs. They take pride in helping the elderly like one of their family. Thank you Maria Pena, Jackie, Norma Martínez, Marcey, Elba, Alma, Flor, Cithalie, Osmen, Greatest CNA at Vineland Post Acute to date.",
  },
];

const Family = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const router = useRouter();

  return (
    <section className="pt-24 pb-10 bg-white text-center animate-fadeIn relative overflow-hidden">
      {/* Decorative Bubbles */}
      <div className="absolute w-[120px] h-[120px] bg-green-100 rounded-full top-[-40px] left-[-30px] z-0 opacity-40" />
      <div className="absolute w-[100px] h-[100px] bg-green-200 rounded-full bottom-[px] left-[10%] z-0 opacity-30" />
      <div className="absolute w-[90px] h-[90px] bg-green-100 rounded-full top-[20%] right-[5%] z-0 opacity-30" />
      <div className="absolute w-[110px] h-[110px] bg-green-200 rounded-full bottom-[20px] right-[15%] z-0 opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your Loved Ones Deserve the Best Care
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          Everyone is family here at Vineland Post Acute
        </p>

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
                    <Image
                      src={item.image}
                      alt={`Testimonial ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Right: Testimonial */}
                  <div className="w-full md:w-[45%] bg-green-50 p-6 md:p-8 rounded-2xl shadow-sm text-left">
                    <p className="text-gray-800 text-lg leading-relaxed italic">
                      "{item.text}"
                    </p>
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
            Read More Testimonials
          </button>
        </div>
      </div>
    </section>
  );
};

export default Family;


