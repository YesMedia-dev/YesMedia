"use client";

import React from "react";

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
        {/* Optional: You can add something else here later */}
        <p className="text-gray-600 mt-4">
          Use the map in the hero section above to find your nearest facility.
        </p>
      </div>
    </section>
  );
};

export default ServicesGrid;
