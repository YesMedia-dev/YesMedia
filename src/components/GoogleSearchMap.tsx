"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FACILITIES } from "@/constants/facilities";
import { FacilityDistance } from "@/types/facility";
import { initLocationMap } from "@/utilities/initLocationMap";
import { fillContent, closeAutocomplete } from "@/utilities/mapUtilities";
import FacilitiesList from "./FacilitiesList";

const GoogleSearchMap = () => {
  const { t } = useTranslation("common");

  const mapRef = useRef(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const autocompleteMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  const [, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [autocompleteInstance] = useState<google.maps.places.Autocomplete | null>(null);
  const [autocompleteMarker, setAutocompleteMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  const [closestLocations, setClosestLocations] = useState<FacilityDistance[] | null>(null);
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    autocompleteMarkerRef.current = autocompleteMarker;
  }, [autocompleteMarker]);

  useEffect(() => {
    if (mapRef.current) {
      initLocationMap({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
        mapContainer: mapRef.current,
        infoWindowRef,
        autocompleteMarkerRef,
        setAutocomplete,
        closeAutocomplete,
        setAutocompleteMarker,
        setClosestLocations,
        setMarkers,
        setSearchInput,
      });
    }
  }, []);

  const handleFacilityClick = (index: number) => {
    const marker = markers[index];
    const facility = closestLocations ? closestLocations[index].facility : FACILITIES[index];
    if (marker && facility) {
      const infoWindow = infoWindowRef.current;
      if (infoWindow) {
        infoWindow.close();
        infoWindow.setHeaderContent(facility.name);
        infoWindow.setContent(fillContent(facility));
        infoWindow.open(marker.map, marker);
      }
    }
  };

  const handleClearInput = () => {
    setSearchInput("");
    if (autocompleteMarkerRef.current) {
      autocompleteMarkerRef.current.map = null;
      setAutocompleteMarker(null);
    }
    closeAutocomplete(autocompleteInstance);
    if (closestLocations) {
      setClosestLocations(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Sidebar */}
      <div
        className={`w-full mt-24 ${!isMobile ? "md:w-1/2 lg:w-1/3 xl:w-1/4" : ""} px-4 pt-4 flex flex-col bg-white z-10 mx-auto`}
      >
        {!isMobile && (
          <h1 className="text-[#428f47] font-medium text-lg text-center">
            {t("mapPage.title")}
          </h1>
        )}

        {/* Search input */}
        <div className="relative mb-2 w-full">
          <input
            id="autocomplete-input"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t("mapPage.placeholder")}
            className="w-full p-2 pr-8 border border-gray-300"
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearInput}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-black"
              aria-label={t("mapPage.clear")}
            >
              ×
            </button>
          )}
        </div>

        {/* Mobile buttons */}
        {isMobile && (
          <div className="flex w-full mb-2">
            <button
              onClick={() => setMobileView("list")}
              className={`w-1/2 px-2 border border-[#428f47] rounded-l ${
                mobileView === "list" ? "bg-[#428f47] text-white" : "bg-white text-[#428f47]"
              }`}
            >
              {t("mapPage.buttons.list")}
            </button>
            <button
              onClick={() => setMobileView("map")}
              className={`w-1/2 px-2 border border-[#428f47] rounded-r ${
                mobileView === "map" ? "bg-[#428f47] text-white" : "bg-white text-[#428f47]"
              }`}
            >
              {t("mapPage.buttons.map")}
            </button>
          </div>
        )}

        {/* Facilities list */}
        {(!isMobile || mobileView === "list") && (
          <FacilitiesList
            facilities={FACILITIES}
            closestLocations={closestLocations}
            handleFacilityClick={handleFacilityClick}
          />
        )}
      </div>

      {/* Map */}
      <div
        ref={mapRef}
        className={`${isMobile && mobileView !== "map" ? "hidden" : ""} w-full ${
          isMobile ? "h-[800px] border-t-[#428f47] border-t-4" : "md:w-1/2 lg:w-3/4 h-full"
        }`}
      />
    </div>
  );
};

export default GoogleSearchMap;

