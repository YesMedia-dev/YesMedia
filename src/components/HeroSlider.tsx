"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

const HeroSlider = () => {
  return (
    <div className="relative w-full h-[70vh]">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        navigation={true}
        speed={500}
        className="w-full h-full"
      >
        <SwiperSlide>
          <Image
            src="/assets/chef.jpeg"
            alt="Chef"
            fill
            className="object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/assets/outside1.jpeg"
            alt="Outside"
            fill
            className="object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
