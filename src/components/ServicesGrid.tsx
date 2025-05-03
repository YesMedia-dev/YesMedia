"use client";

import React from "react";
import GoogleMap from "@/components/GoogleMap";

const ServicesGrid = () => {
  return (
    <section className="py-20 bg-white text-center animate-fadeIn">
      <div className="max-w-6xl mx-auto px-8 bg-white shadow-lg rounded-xl p-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-2 border-b-2 border-green-600 pb-2">
          <span role="img" aria-label="map-pin">
            📍
          </span>
          Find a Sun Mar health care provider near you
        </h2>
        <div className="h-[400px] w-full border border-gray-300 bg-gray-50 shadow-md rounded-xl flex items-center justify-center">
          <GoogleMap />
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
