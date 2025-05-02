"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    image: "/assets/placeholder1.jpeg",
    text:
      "My sister always had positive comments regarding this facility. She said the food was very good. The nurses were great. The staff was also very much involved and willing to give her all the answers that she needed on top of the Physical Therapy that she said was the best she had ever received, her physical therapy was customized for her needs for the areas of her body that needed to be strengthened. She said she was very happy with this facility. And would happily return if she needed this type of therapy.",
  },
  {
    image: "/assets/placeholder2.jpeg",
    text:
      "My respect for all CNAs at Vineland Post Acute. They work very hard to take care of their patients and accommodate their needs. They take pride in helping the elderly like one of their family. Thank you Maria Pena, Jackie, Norma Martínez, Marcey, Elba, Alma, Flor, Cithalie, Osmen, Greatest CNA at Vineland Post Acute to date.",
  },
];

const Family = () => {
  return (
    <section className="py-24 bg-gray-50 text-center animate-fadeIn">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your Loved Ones Deserve the Best Care
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          Everyone is family here at Vineland Post Acute
        </p>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 6000 }}
          loop={true}
          className="w-full"
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col md:flex-row items-center gap-10 justify-center">
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
