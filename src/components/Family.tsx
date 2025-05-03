"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import React, { useState } from "react";

const testimonials = [
  {
    image: "/assets/placeholder1.jpeg",
    text: "My sister always had positive comments regarding this facility. She said the food was very good. The nurses were great. The staff was also very much involved and willing to give her all the answers that she needed on top of the Physical Therapy that she said was the best she had ever received, her physical therapy was customized for her needs for the areas of her body that needed to be strengthened. She said she was very happy with this facility. And would happily return if she needed this type of therapy.",
  },
  {
    image: "/assets/placeholder2.jpeg",
    text: "My respect for all CNAs at Vineland Post Acute. They work very hard to take care of their patients and accommodate their needs. They take pride in helping the elderly like one of their family. Thank you Maria Pena, Jackie, Norma Martínez, Marcey, Elba, Alma, Flor, Cithalie, Osmen, Greatest CNA at Vineland Post Acute to date.",
  },
];

const Family = () => {
  // Use proper typing for the Swiper instance
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  
  // These classes will be applied to our custom navigation buttons
  const navigationButtonClasses = "absolute top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md z-10 cursor-pointer text-blue-800 hover:bg-gray-100";

  return (
    <section className="py-24 bg-gray-50 text-center animate-fadeIn">
      <div className="max-w-5xl mx-auto px-6 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your Loved Ones Deserve the Best Care
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          Everyone is family here at Vineland Post Acute
        </p>

        <div className="relative">
          {/* Custom previous button - position as needed */}
          <div 
            className={`${navigationButtonClasses} left-[100px] md:left-[-100px]`}
            onClick={() => swiperInstance?.slidePrev()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>

          {/* Custom next button - position as needed */}
          <div 
            className={`${navigationButtonClasses} right-4 md:right-[-80px]`}
            onClick={() => swiperInstance?.slideNext()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>

          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 6000 }}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            className="mySwiper"
          >
            {testimonials.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col md:flex-row items-center gap-10 justify-center py-8">
                  <div className="w-full md:w-[400px] h-[300px] relative rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={item.image}
                      alt={`Resident ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="max-w-xl text-gray-700 text-md md:text-lg leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-12">
          <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition">
            Read More Testimonials
          </button>
        </div>
      </div>
    </section>
  );
};

export default Family;