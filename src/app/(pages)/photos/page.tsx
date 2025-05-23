"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const allImages = [
  "bear.webp",
  "group3.webp",
  "beds.webp",
  "rehab2.webp",
  "biggroup.webp",
  "group9.webp",
  "chair.webp",
  "group1.webp",
  "chef.webp",
  "meetingroom.webp",
  "doctor1.webp",
  "event.webp",
  "group7.webp",
  "group2.webp",
  "patio.webp",
  "doctor2.webp",
  "outside1.webp",
  "hall.webp",
  "group6.webp",
  "letter.webp",
  "rehab.webp",
  "flower.webp",
  "lobby.webp",
  "house.webp",
  "group4.webp",
  "group5.webp",
  "welcome.webp",
  "group8.webp",
  "group10.webp",
];

const imageDetails: Record<string, "Team" | "Rooms" | "Comfort"> = {
  "bear.webp": "Comfort",
  "group3.webp": "Team",
  "beds.webp": "Rooms",
  "rehab2.webp": "Rooms",
  "biggroup.webp": "Team",
  "group9.webp": "Team",
  "chair.webp": "Comfort",
  "group1.webp": "Team",
  "chef.webp": "Comfort",
  "meetingroom.webp": "Rooms",
  "doctor1.webp": "Team",
  "event.webp": "Rooms",
  "group7.webp": "Team",
  "group2.webp": "Team",
  "patio.webp": "Rooms",
  "doctor2.webp": "Team",
  "outside1.webp": "Rooms",
  "hall.webp": "Rooms",
  "group6.webp": "Team",
  "letter.webp": "Comfort",
  "rehab.webp": "Rooms",
  "flower.webp": "Comfort",
  "lobby.webp": "Rooms",
  "house.webp": "Rooms",
  "group4.webp": "Team",
  "group5.webp": "Team",
  "welcome.webp": "Rooms",
  "group8.webp": "Team",
  "group10.webp": "Team",
};

const categories = ["All", "Team", "Rooms", "Comfort"] as const;

export default function PhotoGallery() {
  const { t } = useTranslation("common");
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [numImages, setNumImages] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const updateGroupSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width < 768) {
        // Mobile
        setNumImages(2);
      } else if (width < 1280 && height > 1080) {
        // Tablet
        setNumImages(6);
      } else {
        setNumImages(4);
      }
    };

    updateGroupSize(); // set on initial render
    window.addEventListener("resize", updateGroupSize);
    return () => window.removeEventListener("resize", updateGroupSize);
  }, []);

  const filteredImages =
    filter === "All" ? allImages : allImages.filter((img) => imageDetails[img as keyof typeof imageDetails] === filter);

  const IMAGES_PER_PAGE = numImages;
  const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);
  const currentImages = filteredImages.slice((currentPage - 1) * IMAGES_PER_PAGE, currentPage * IMAGES_PER_PAGE);

  const handleNext = () => {
    setSelectedImage((curr) => {
      const index = filteredImages.indexOf(curr!);
      return filteredImages[(index + 1) % filteredImages.length];
    });
  };

  const handlePrev = () => {
    setSelectedImage((curr) => {
      const index = filteredImages.indexOf(curr!);
      return filteredImages[(index - 1 + filteredImages.length) % filteredImages.length];
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-green-50 py-12 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Title + Subtitle */}
        <div className="text-center mb-12 animate-drop-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#428f47] mb-3">{t("galleryPage.title")}</h1>
          <p className="text-gray-600 text-lg italic">{t("galleryPage.subtitle")}</p>
        </div>

        {/* Category Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-10 opacity-0 animate-fade-in-slow">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === cat ? "bg-[#428f47] text-white" : "bg-white text-gray-700 hover:bg-green-100"
              }`}
            >
              {t(`galleryPage.categories.${cat.toLowerCase()}`)}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {currentImages.map((img, i) => (
            <div
              key={img}
              className="overflow-hidden rounded-xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-[#39d462] transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(img)}
              style={{ animation: `fadeIn 0.3s ease-out ${i * 0.1}s both` }}
            >
              <Image
                src={`/gallery/${img}`}
                alt=""
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                priority={i < 4}
              />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex xl:absolute xl:left-33 xl:top-[55%] xl:transform xl:-translate-y-1/2 bg-white shadow-md p-1 xl:p-2 rounded-full text-[#39d462] hover:bg-green-100 z-10"
            >
              <ChevronLeft />
            </button>
          )}
          {(totalPages > 10
            ? Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  return (
                    page === 1 || // First page
                    page === totalPages - 1 || // Last page
                    Math.abs(page - currentPage) <= 1 // Current ±1
                  );
                })
                .reduce((acc: (number | string)[], page, idx, arr) => {
                  if (idx > 0 && page !== arr[idx - 1] + 1) {
                    acc.push("ellipsis");
                  }
                  acc.push(page);
                  return acc;
                }, [])
            : Array.from({ length: totalPages }, (_, i) => i + 1)
          ).map((item, i) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${i}`} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => setCurrentPage(item as number)}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  currentPage === item ? "bg-[#428f47] text-white" : "bg-white text-gray-700 hover:bg-green-100"
                }`}
              >
                {item}
              </button>
            ),
          )}

          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex xl:absolute xl:right-35 xl:top-[55%] xl:transform xl:-translate-y-1/2 bg-white shadow-md p-1 xl:p-2 rounded-full text-[#39d462] hover:bg-green-100 z-10"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setSelectedImage(null)} />
          <div className="relative max-w-6xl mx-auto">
            <img src={`/gallery/${selectedImage}`} alt="" className="max-h-[80vh] mx-auto object-contain" />
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 p-3 rounded-full hover:bg-black/90"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-8 h-8 text-[#39d462]" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 p-3 rounded-full hover:bg-black/90"
              onClick={handleNext}
            >
              <ChevronRight className="w-8 h-8 text-[#39d462]" />
            </button>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/70 rounded-full hover:bg-black/90"
            >
              <X className="w-6 h-6 text-[#39d462]" />
            </button>
          </div>
        </div>
      )}

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-drop-in {
          animation: dropIn 0.6s ease-out both;
        }

        @keyframes dropIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-slow {
          animation: fadeInSlow 0.8s ease-out 0.3s both;
        }

        @keyframes fadeInSlow {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
