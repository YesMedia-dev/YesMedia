"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Jeanine A.",
    source: "5-Star, Google Review",
    full: `I was at the facility a little over three weeks with a fractured bone in my hip...`,
  },
  {
    name: "Peter F.",
    source: "5-Star, Yelp Review",
    full: `Very good quality! They have enough staff and there's not too many people...`,
  },
  {
    name: "Jodi C.",
    source: "5-Star, Yelp Review",
    full: `I was sent to this facility to recover from a health emergency...`,
  },
  {
    name: "Norma S.",
    source: "5-Star, Yelp Review",
    full: `My respect for all CNAs at Vineland Post Acute...`,
  },
  {
    name: "Marie C.",
    source: "5-Star, Yelp Review",
    full: `My sister always had positive comments regarding this facility...`,
  },
  {
    name: "Janelle R.",
    source: "5-Star, Google Review",
    full: `I can't say enough about how much this place helped my mother...`,
  },
];

export default function TestimonialsPage() {
  const [mounted, setMounted] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const groupSize = 3;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const showNextGroup = () => {
    const maxStart = testimonials.length - groupSize;
    setVisibleIndex((prev) => Math.min(prev + groupSize, maxStart));
  };

  const showPrevGroup = () => {
    setVisibleIndex((prev) => Math.max(prev - groupSize, 0));
  };

  const modalNext = () => {
    if (modalIndex !== null && modalIndex + 1 < testimonials.length) {
      setModalIndex(modalIndex + 1);
    }
  };

  const modalPrev = () => {
    if (modalIndex !== null && modalIndex > 0) {
      setModalIndex(modalIndex - 1);
    }
  };

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">Testimonials</h1>
        <p className="text-gray-600 text-lg italic">Vineland Post Acute</p>
      </motion.section>

      <motion.div
        className="mb-12 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Image
          src="/assets/testimony.jpg"
          alt="Facility"
          width={1400}
          height={350}
          className="w-full object-cover h-[350px]"
        />
      </motion.div>

      <div className="flex justify-center gap-4 mb-8">
        <button onClick={showPrevGroup} className="text-3xl px-4 text-gray-600 hover:text-black">
          ❮
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(visibleIndex, visibleIndex + groupSize).map((t, i) => (
            <motion.div
              key={visibleIndex + i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="bg-gray-100 p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition w-80"
              onClick={() => setModalIndex(visibleIndex + i)}
            >
              <div className="flex justify-center mb-4">
                <Image src="/assets/quotes.png" alt="Quotes" width={80} height={80} />
              </div>
              <p className="text-gray-700 text-sm mb-4">
                {t.full.split(" ").slice(0, 40).join(" ")}...
              </p>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.source}</p>
            </motion.div>
          ))}
        </div>
        <button onClick={showNextGroup} className="text-3xl px-4 text-gray-600 hover:text-black">
          ❯
        </button>
      </div>

      {modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} // Light transparent background
        >
          <motion.div
            className="bg-white max-w-lg w-full p-6 rounded-lg relative shadow-xl text-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              onClick={() => setModalIndex(null)}
              className="absolute top-2 right-3 text-gray-500 text-xl hover:text-black"
            >
              ×
            </button>

            <div className="flex justify-center mb-4">
              <Image src="/assets/quotes.png" alt="Quotes" width={60} height={60} />
            </div>

            <p className="text-gray-700 mb-4">
              {testimonials[modalIndex].full}
            </p>

            <p className="font-semibold">{testimonials[modalIndex].name}</p>
            <p className="text-sm text-gray-500">{testimonials[modalIndex].source}</p>

            <div className="absolute left-[-60px] top-1/2 transform -translate-y-1/2">
              <button
                onClick={modalPrev}
                disabled={modalIndex === 0}
                className="w-9 h-9 flex items-center justify-center bg-white text-blue-700 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &#x276E;
              </button>
            </div>
            <div className="absolute right-[-60px] top-1/2 transform -translate-y-1/2">
              <button
                onClick={modalNext}
                disabled={modalIndex === testimonials.length - 1}
                className="w-9 h-9 flex items-center justify-center bg-white text-blue-700 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &#x276F;
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
