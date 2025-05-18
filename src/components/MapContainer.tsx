"use client";

import React from "react";
import GoogleMap from "@/components/GoogleMap";
import { useTranslation } from "react-i18next";

const MapContainer = () => {
  const { t } = useTranslation("common");

  return (
    <section className="py-20 bg-white text-center animate-fadeIn">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          {t("mapTitle")}
        </h2>
        <div className="h-[400px] w-full border border-gray-300 bg-gray-100 shadow-md rounded-xl overflow-hidden">
          <GoogleMap />
        </div>
      </div>
    </section>
  );
};

export default MapContainer;

