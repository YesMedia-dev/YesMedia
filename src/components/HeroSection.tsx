"use client";

import React from "react";
import HeroSlider from "./HeroSlider";

const HeroSection = () => {
  return (
    <section className="relative w-full text-center text-white">
      {/* Title and subtitle section with black overlay */}
      <div className="bg-black/80 py-12 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Vineland Post Acute</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Compassionate Skilled Nursing & Rehabilitation in North Hollywood, CA
        </p>
        <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
          Contact Us
        </button>
      </div>

      {/* Image slideshow placed directly below the title block */}
      <HeroSlider />
    </section>
  );
};

export default HeroSection;
