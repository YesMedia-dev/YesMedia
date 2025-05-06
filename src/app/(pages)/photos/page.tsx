"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const allImages = [
  // SET 1
  "bear.png", "group3.png", "beds.png", "rehab2.png",
  // SET 2
  "biggroup.png", "group9.png", "chair.png", "group1.png",
  // SET 3
  "chef.png", "meetingroom.png", "doctor1.png", "event.png",
  // SET 4
  "group7.png", "group2.png", "patio.png", "doctor2.png",
  // SET 5
  "outside1.png", "hall.png", "group6.png", "letter.png",
  // SET 6 (house replaces group10)
  "rehab.png", "flower.png", "lobby.png", "house.png",
  // SET 7
  "group4.png", "group5.png", "welcome.png", "group8.png",
  // SET 8 (group10 alone)
  "group10.png"
];

const imageDetails = {
  "bear.png": "Comfort", "group3.png": "Team", "beds.png": "Rooms", "rehab2.png": "Rooms",
  "biggroup.png": "Team", "group9.png": "Team", "chair.png": "Comfort", "group1.png": "Team",
  "chef.png": "Comfort", "meetingroom.png": "Rooms", "doctor1.png": "Team", "event.png": "Rooms",
  "group7.png": "Team", "group2.png": "Team", "patio.png": "Rooms", "doctor2.png": "Team",
  "outside1.png": "Rooms", "hall.png": "Rooms", "group6.png": "Team", "letter.png": "Comfort",
  "rehab.png": "Rooms", "flower.png": "Comfort", "lobby.png": "Rooms", "house.png": "Rooms",
  "group4.png": "Team", "group5.png": "Team", "welcome.png": "Rooms", "group8.png": "Team",
  "group10.png": "Team"
};

const categories = ["All", "Team", "Rooms", "Comfort"] as const;

export default function PhotoGallery() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredImages = filter === "All"
    ? allImages
    : allImages.filter((img) => imageDetails[img as keyof typeof imageDetails] === filter);

  const IMAGES_PER_PAGE = 4;
  const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);
  const currentImages = filteredImages.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

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
        {/* Categories */}
        <div className="flex justify-center gap-4 flex-wrap mb-10">
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
              {cat}
            </button>
          ))}
        </div>

        {/* Side Pagination Arrows */}
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="absolute left-4 top-[55%] transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full text-[#428f47] hover:bg-green-100 z-10"
          >
            <ChevronLeft />
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="absolute right-4 top-[55%] transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full text-[#428f47] hover:bg-green-100 z-10"
          >
            <ChevronRight />
          </button>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {currentImages.map((img, i) => (
            <div
              key={img}
              className="overflow-hidden rounded-xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-[#428f47] transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(img)}
              style={{ animation: `fadeIn 0.3s ease-out ${i * 0.1}s both` }}
            >
              <img
                src={`/gallery/${img}`}
                alt=""
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Pagination Indicators */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                currentPage === i + 1
                  ? "bg-[#428f47] text-white"
                  : "bg-white text-gray-700 hover:bg-green-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setSelectedImage(null)} />
          <div className="relative max-w-6xl mx-auto">
            <img
              src={`/gallery/${selectedImage}`}
              alt=""
              className="max-h-[80vh] mx-auto object-contain"
            />
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full text-white hover:bg-white/30"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full text-white hover:bg-white/30"
              onClick={handleNext}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Animation */}
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
      `}</style>
    </section>
  );
}









