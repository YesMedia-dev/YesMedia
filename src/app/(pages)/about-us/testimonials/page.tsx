"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    name: "Jeanine A.",
    sourceKey: "reviewGoogle",
    full: "testimonial_jeanine",
  },
  {
    name: "Peter F.",
    sourceKey: "reviewYelp",
    full: "testimonial_peter",
  },
  {
    name: "Jodi C.",
    sourceKey: "reviewYelp",
    full: "testimonial_jodi",
  },
  {
    name: "Norma S.",
    sourceKey: "reviewYelp",
    full: "testimonial_norma",
  },
  {
    name: "Marie C.",
    sourceKey: "reviewYelp",
    full: "testimonial_marie",
  },
  {
    name: "Luis L.",
    sourceKey: "reviewGoogle",
    full: "testimonial_luis",
  },
];

export default function TestimonialsPage() {
  const { t } = useTranslation("common");
  const [mounted, setMounted] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [groupSize, setGroupSize] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const updateGroupSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setGroupSize(1);
      } else if (width < 1280) {
        setGroupSize(2);
      } else {
        setGroupSize(3);
      }
    };

    updateGroupSize();
    window.addEventListener("resize", updateGroupSize);
    return () => window.removeEventListener("resize", updateGroupSize);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const showNextGroup = () => {
    if (isAnimating) return;
    const maxStart = testimonials.length - groupSize;
    if (visibleIndex >= maxStart) return;
    setIsAnimating(true);
    setVisibleIndex((prev) => Math.min(prev + groupSize, maxStart));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const showPrevGroup = () => {
    if (isAnimating) return;
    if (visibleIndex <= 0) return;
    setIsAnimating(true);
    setVisibleIndex((prev) => Math.max(prev - groupSize, 0));
    setTimeout(() => setIsAnimating(false), 500);
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

  const openModal = (index: number) => {
    setModalIndex(index);
  };

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-[#428f47] mb-2">{t("testimonials")}</h1>
        <p className="text-gray-600 text-lg italic">Vineland Post Acute</p>
      </motion.section>

      <motion.div
        className="mb-12 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Image
          src="/gallery/flower.webp"
          alt="Facility"
          width={1400}
          height={350}
          className="w-full object-cover h-[350px]"
        />
      </motion.div>

      <div className="flex justify-center mb-4">
        <button
          onClick={showPrevGroup}
          disabled={visibleIndex === 0 || isAnimating}
          className="text-3xl px-4 text-[#428f47] hover:text-[#44f26d] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ❮
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={`group-${visibleIndex}`}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {testimonials.slice(visibleIndex, visibleIndex + groupSize).map((testimonial, i) => (
              <div
                key={visibleIndex + i}
                className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition w-60 xs:w-70 md:w-80"
                onClick={() => openModal(visibleIndex + i)}
              >
                <div className="flex justify-center">
                  <Image src="/assets/quotes.png" alt="Quotes" width={80} height={80} />
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{t(testimonial.full)}</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{t(testimonial.sourceKey)}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={showNextGroup}
          disabled={(visibleIndex + groupSize >= testimonials.length) || isAnimating}
          className="text-3xl px-4 text-[#428f47] hover:text-[#44f26d] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ❯
        </button>
      </div>

      <AnimatePresence>
        {modalIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30"
            onClick={(e) => {
              if (e.target === e.currentTarget) setModalIndex(null);
            }}
          >
            <motion.div
              className="bg-white max-w-lg w-full p-6 rounded-lg relative shadow-xl text-center"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
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

              <div className="text-gray-700 mb-4 max-h-60 overflow-y-auto pr-2">
                {t(testimonials[modalIndex].full)}
              </div>
              <p className="font-semibold">{testimonials[modalIndex].name}</p>
              <p className="text-sm text-gray-500">{t(testimonials[modalIndex].sourceKey)}</p>

              {/* ⬅ Left Arrow */}
              <div className="absolute bottom-4 left-4 lg:left-[-60px] lg:top-[60%] lg:transform lg:-translate-y-1/2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    modalPrev();
                  }}
                  disabled={modalIndex === 0}
                  className="w-9 h-9 flex items-center justify-center bg-white text-[#428f47] rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &#x276E;
                </button>
              </div>

              {/* ➡ Right Arrow */}
              <div className="absolute bottom-4 right-4 lg:right-[-60px] lg:top-[60%] lg:transform lg:-translate-y-1/2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    modalNext();
                  }}
                  disabled={modalIndex === testimonials.length - 1}
                  className="w-9 h-9 flex items-center justify-center bg-white text-[#428f47] rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &#x276F;
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}


