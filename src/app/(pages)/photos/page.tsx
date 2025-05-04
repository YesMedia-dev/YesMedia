"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const photoGallery = [
  {
    src: "/assets/house.jpeg",
    title: "Main Building",
    size: "large", // large, medium, small
  },
  {
    src: "/assets/outside2.jpeg",
    title: "Outdoor Seating",
    size: "tall",
  },
  {
    src: "/assets/outside3.jpeg",
    title: "Patio",
    size: "medium",
  },
  {
    src: "/assets/social.jpg",
    title: "Social Space",
    size: "small",
  },
  {
    src: "/assets/room.jpeg",
    title: "Bedroom",
    size: "wide",
  },
  // Moved team photo to the middle of the gallery
  {
    src: "/assets/group.png",
    title: "Our Team",
    size: "large",
  },
  {
    src: "/assets/nursing.jpg",
    title: "Nursing Care",
    size: "medium",
  },
  {
    src: "/assets/testimony.jpg",
    title: "Testimonials",
    size: "small",
  },
  {
    src: "/assets/rehab.jpg",
    title: "Rehabilitation",
    size: "wide",
  },
  {
    src: "/assets/room2.jpeg",
    title: "Therapy Room",
    size: "medium",
  },
  {
    src: "/assets/chef.jpeg",
    title: "Our Chef",
    size: "tall",
  },
  {
    src: "/assets/social.jpg",
    title: "Activities",
    size: "small",
  }
];

export default function PhotosPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [swiperRef, setSwiperRef] = useState<SwiperCore | null>(null);
  const [initialSlide, setInitialSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (src: string) => {
    const index = photoGallery.findIndex(item => item.src === src);
    setInitialSlide(index);
    setSelectedImage(src);
  };

  // Get size class based on photo size property
  const getSizeClass = (size: string) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2";
      case "tall":
        return "col-span-1 row-span-2";
      case "wide":
        return "col-span-2 row-span-1";
      case "medium":
        return "col-span-1 row-span-1";
      case "small":
        return "col-span-1 row-span-1";
      default:
        return "col-span-1 row-span-1";
    }
  };

  // Get height class based on photo size property
  const getHeightClass = (size: string) => {
    switch (size) {
      case "large":
        return "h-[400px]";
      case "tall":
        return "h-[400px]";
      case "wide":
        return "h-[200px]";
      case "medium":
        return "h-[200px]";
      case "small":
        return "h-[200px]";
      default:
        return "h-[200px]";
    }
  };

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-[#428f47] opacity-5"></div>
        <div className="absolute top-24 right-12 w-24 h-24 rounded-full bg-[#428f47] opacity-5"></div>
        <div className="absolute bottom-0 left-1/3 w-16 h-16 rounded-full bg-[#428f47] opacity-5"></div>
        
        <motion.section
          className="text-center mb-12 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-[#428f47] mb-2">Photo Gallery</h1>
          <p className="text-gray-600 text-lg italic">Vineland Post Acute</p>
        </motion.section>
      </div>

      {/* Photo grid with masonry layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-auto gap-4 mb-12">
        {photoGallery.map((photo, index) => (
          <motion.div
            key={index}
            className={`${getSizeClass(photo.size)} relative group overflow-hidden rounded-lg shadow-lg cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleImageClick(photo.src)}
          >
            <div className={`relative w-full ${getHeightClass(photo.size)}`}>
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4 font-medium">{photo.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image viewer modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-between py-8 z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="relative max-w-4xl w-full flex-grow">
            <Swiper
              modules={[Navigation, Thumbs]}
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              onSwiper={(swiper) => setSwiperRef(swiper)}
              initialSlide={initialSlide}
              className="rounded-lg"
            >
              {photoGallery.map((photo, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-[70vh]">
                    {/* Caption moved to top */}
                    <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10">
                      <p className="text-white text-xl font-medium">{photo.title}</p>
                    </div>
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 1200px) 100vw, 80vw"
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </motion.div>

          {/* Enhanced thumbnail navigation row */}
          <div className="w-full bg-black/90 p-4 rounded-md">
            <Swiper
              modules={[Thumbs]}
              onSwiper={(swiper) => setThumbsSwiper(swiper)}
              slidesPerView={5}
              spaceBetween={10}
              watchSlidesProgress
              className="max-w-4xl"
              breakpoints={{
                640: { slidesPerView: 7 },
                768: { slidesPerView: 9 },
              }}
            >
              {photoGallery.map((photo, index) => (
                <SwiperSlide key={index} className={`${initialSlide === index ? 'opacity-100 border-2 border-[#428f47]' : 'opacity-60'} hover:opacity-100 transition-all duration-300`}>
                  <div className="relative h-20 w-full">
                    <Image
                      src={photo.src}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      sizes="100px"
                      className="rounded-md object-cover cursor-pointer"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      )}
    </main>
  );
}
