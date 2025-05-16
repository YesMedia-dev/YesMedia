"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const photos = [
  { image: "/assets/house.webp", alt: "Facility Exterior" },
  { image: "/assets/bear.webp", alt: "Bear on Table" },
  { image: "/assets/room.webp", alt: "Therapy Room" },
];

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

  const openModal = (index: number) => {
    setActivePhoto(index);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <section className="pt-20 pb-0 bg-white px-6 animate-fadeIn relative z-0 overflow-hidden">
      {/* Decorative Green Bubbles */}
      <div className="absolute w-[100px] h-[100px] bg-green-100 rounded-full top-[-40px] left-[-30px] z-0 opacity-40" />
      <div className="absolute w-[80px] h-[80px] bg-green-200 rounded-full top-[30%] left-[0px] z-0 opacity-30" />
      <div className="absolute w-[90px] h-[90px] bg-green-100 rounded-full bottom-[10%] left-[5%] z-0 opacity-30" />
      <div className="absolute w-[100px] h-[100px] bg-green-200 rounded-full top-[5%] right-[80px] z-0 opacity-25" />
      <div className="absolute w-[90px] h-[90px] bg-green-100 rounded-full top-[50%] right-[0px] z-0 opacity-30" />
      <div className="absolute w-[110px] h-[110px] bg-green-200 rounded-full bottom-[5%] right-[5%] z-0 opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Life at Vineland</h2>

        {/* Top 3 photos: hidden on mobile */}
        <div className="hidden sm:grid grid-cols-6 gap-4 auto-rows-[200px] mb-4">
          <div
            className="col-span-4 row-span-2 relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
            onClick={() => openModal(0)}
          >
            <Image src="/assets/house.webp" alt="Facility Exterior" fill className="rounded-xl object-cover" />
          </div>

          <div
            className="col-span-2 row-span-1 relative rounded-xl overflow-hidden shadow-md cursor-pointer"
            onClick={() => openModal(1)}
          >
            <Image src="/assets/bear.webp" alt="Bear on Table" fill className="rounded-xl object-cover" />
          </div>

          <div
            className="col-span-2 row-span-1 relative rounded-xl overflow-hidden shadow-md cursor-pointer"
            onClick={() => openModal(2)}
          >
            <Image src="/assets/room.webp" alt="Therapy Room" fill className="rounded-xl object-cover" />
          </div>
        </div>

        {/* Carousel: adapts based on screen size */}
        <div className="col-span-6 row-span-3 relative rounded-xl overflow-hidden shadow-md mt-4 h-[250px] sm:h-[300px] md:h-[400px]">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={4000}
            spaceBetween={20}
            allowTouchMove={false}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="h-full w-full"
          >
            {carouselImages.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image src={src} alt={`Gallery ${idx + 1}`} fill className="object-cover rounded-xl" />
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
            View Photo Collage
          </Link>
        </div>
      </div>

      {/* Modal Viewer */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative w-full max-w-5xl h-[90vh] mx-auto">
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              navigation
              initialSlide={activePhoto}
              className="h-full"
            >
              {photos.map((photo, idx) => (
                <SwiperSlide key={idx} className="flex items-center justify-center bg-transparent">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image src={photo.image} alt={photo.alt} fill className="object-contain rounded-lg" priority />
                    <button
                      onClick={closeModal}
                      className="absolute bg-white text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 z-50"
                      style={{ top: "230px", right: "5px" }}
                    >
                      &times;
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </section>
  );
};

export default Photos;




