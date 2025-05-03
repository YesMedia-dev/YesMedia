import React from "react";
import GoogleMap from "@/components/GoogleMap";

const ServicesGrid = () => {
  return (
    <section className="pt-20 pb-32 bg-white text-center animate-fadeIn">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
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
