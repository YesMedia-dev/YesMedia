"use client";

import React from "react";

const Banner = () => {
  return (
    <section
    className="relative h-[400px] bg-fixed bg-cover bg-center text-white flex items-center justify-center px-4 text-center mt-20"
      style={{
        backgroundImage: "url('/assets/welcome.jpeg')",
      }}
    >
      <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>

      <div className="relative z-10 text-white max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          “Southern California's Greatest Elder Care facility.”
        </h2>
        <p className="text-sm md:text-base font-light">
          — U.S. News & World Report, 2024–2025
        </p>
      </div>
    </section>
  );
};

export default Banner;
