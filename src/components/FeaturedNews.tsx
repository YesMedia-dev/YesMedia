"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const newsSlides = [
  {
    image: "/assets/award.jpeg",
    title: "Vineland Recognized as Having Best Leadership in Southern California",
    text: "Vineland has been recognized as having the best leadership by U.S. News & World Report. This is the first time U.S. News has published a list of the Best Hospitals for Maternity.",
  },
  {
    image: "/assets/fivestar.png",
    title: "Vineland Receives 5-Star Facility Rating",
    text: "Vineland Post Acute is proud to be recognized as a 5-star rated facility by CMS, reflecting our commitment to high-quality care, staff excellence, and resident satisfaction.",
  },
];

const FeaturedNews = () => {
  return (
    <section className="pt-20 pb-32 bg-white text-center animate-fadeIn">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">Featured News</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Vineland Highlights</h2>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          navigation={true}
          loop={true}
          className="w-full"
        >
          {newsSlides.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                <div className="w-full md:w-[500px] h-[300px] relative rounded-xl overflow-hidden shadow-lg">
                  <Image src={item.image} alt={`Featured ${idx + 1}`} fill className="object-cover" />
                </div>

                <div className="max-w-md text-left">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedNews;
