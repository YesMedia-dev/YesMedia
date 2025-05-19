"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const carouselImages = [
  "/gallery/group1.webp",
  "/gallery/group2.webp",
  "/gallery/group3.webp",
  "/gallery/group4.webp",
  "/gallery/group5.webp",
  "/gallery/group6.webp",
  "/gallery/group7.webp",
  "/gallery/group8.webp",
  "/gallery/group9.webp",
  "/gallery/group10.webp",
];

const Photos = () => {
  const [showModal, setShowModal] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const { t } = useTranslation("common");

  const photos = [
    { image: "/assets/house.webp", alt: t("photo1Alt") },
    { image: "/gallery/beds.webp", alt: t("photo2Alt") },
    { image: "/assets/room.webp", alt: t("photo3Alt") },
  ];

  const openModal = (index: number) => {
    setActivePhoto(index);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handlePrev = () => {
    setActivePhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setActivePhoto((prev) => (prev + 1) % photos.length);
  };

  return (
    <section className="pt-20 pb-0 bg-white px-6 animate-fadeIn relative z-0 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          {t("photosSectionTitle")}
        </h2>

        {/* Top 3 photos */}
        <div className="hidden sm:grid grid-cols-6 gap-4 auto-rows-[200px] mb-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`${
                index === 0 ? "col-span-4 row-span-2" : "col-span-2 row-span-1"
              } relative rounded-xl overflow-hidden shadow-md cursor-pointer`}
              onClick={() => openModal(index)}
            >
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                className="rounded-xl object-cover"
              />
            </div>
          ))}
        </div>

        {/* Carousel */}
        <div className="col-span-6 row-span-3 relative rounded-xl overflow-hidden shadow-md mt-4 h-[250px] sm:h-[300px] md:h-[400px]">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={4000}
            spaceBetween={20}
            allowTouchMove={false}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="h-full w-full"
          >
            {carouselImages.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View Collage Button */}
        <div className="text-center mt-10">
          <Link
            href="/photos"
            className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            {t("viewCollage")}
          </Link>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-gray-800/70 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-6xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex items-center justify-center">
              {/* Image */}
              <img
                src={photos[activePhoto].image}
                alt={photos[activePhoto].alt}
                className="max-h-[80vh] mx-auto object-contain rounded-lg"
              />

              {/* Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-10 top-1/2 transform -translate-y-1/2 bg-black/70 p-3 rounded-full hover:bg-black/90"
              >
                <ChevronLeft className="w-8 h-8 text-[#39d462]" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-black/70 p-3 rounded-full hover:bg-black/90"
              >
                <ChevronRight className="w-8 h-8 text-[#39d462]" />
              </button>

              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-8 p-2 bg-black/70 rounded-full hover:bg-black/90"
              >
                <X className="w-6 h-6 text-[#39d462]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Photos;









