"use client";

import React, { useEffect, useRef } from "react";
import { initGoogleMap } from "@/utilities/initGoogleMap";

const GoogleMap = () => {
  const mapRef = useRef(null);

  // Loads map
  useEffect(() => {
    if (mapRef.current) {
      initGoogleMap({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
        mapContainer: mapRef.current,
      });
    }
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default GoogleMap;
