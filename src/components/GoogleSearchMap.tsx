"use client";

import React, { useEffect, useRef, useState } from "react";
import { SOCALFACILITIES, NORCALFACILITIES } from "@/constants/facilities";
import { FacilityDistance } from "@/types/facility";
import { initLocationMap } from "@/utilities/initLocationMap";
import { fillContent, closeAutocomplete } from "@/utilities/mapUtilities";
import FacilitiesList from "./FacilitiesList";

const GoogleSearchMap = () => {
  // All necessary Refs
  const mapRef = useRef(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const autocompleteMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  // All autocomplete states
  const [, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [autocompleteInstance] = useState<google.maps.places.Autocomplete | null>(null);
  const [autocompleteMarker, setAutocompleteMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  // Facilities sorted by distance for both regions
  const [closestLocationsSOCAL, setClosestLocationsSOCAL] = useState<FacilityDistance[] | null>(null);
  const [closestLocationsNORCAL, setClosestLocationsNORCAL] = useState<FacilityDistance[] | null>(null);
  const [activeRegion, setActiveRegion] = useState<"SOCAL" | "NORCAL">("SOCAL");

  // Markers for both regions
  const [socalMarkers, setSocalMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [norcalMarkers, setNorcalMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);

  // Used for clearing search input in the button
  const [searchInput, setSearchInput] = useState("");

  // Retrieves the right facilities depending on region
  const currentFacilities = activeRegion === "SOCAL" ? SOCALFACILITIES : NORCALFACILITIES;
  const currentMarkers = activeRegion === "SOCAL" ? socalMarkers : norcalMarkers;
  const closestLocations = activeRegion === "SOCAL" ? closestLocationsSOCAL : closestLocationsNORCAL;

  // Used to update search marker when searching for a new location
  useEffect(() => {
    autocompleteMarkerRef.current = autocompleteMarker;
  }, [autocompleteMarker]);

  // Loads map
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
        setClosestLocationsSOCAL,
        setClosestLocationsNORCAL,
        setSocalMarkers,
        setNorcalMarkers,
        setSearchInput,
      });
    }
  }, []);

  // Opens up the right facility content window from the Facility list
  const handleFacilityClick = (index: number) => {
    const marker = currentMarkers[index];
    const facility = closestLocations ? closestLocations[index].facility : currentFacilities[index];
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

  // Correctly updates the region
  const handleRegionClick = (region: "SOCAL" | "NORCAL") => {
    setActiveRegion(region);
    region === "SOCAL"
      ? setClosestLocationsSOCAL(closestLocationsSOCAL)
      : setClosestLocationsNORCAL(closestLocationsNORCAL);
  };

  const handleClearInput = () => {
    setSearchInput("");
    // Removes search location
    if (autocompleteMarkerRef.current) {
      autocompleteMarkerRef.current.map = null;
      setAutocompleteMarker(null);
    }
    // Removes dropdown menu
    closeAutocomplete(autocompleteInstance);
    // Removes the miles from the list
    if (closestLocationsNORCAL || closestLocationsSOCAL) {
      setClosestLocationsSOCAL(null);
      setClosestLocationsNORCAL(null);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/4 p-4 mt-[80px] flex flex-col h-full">
        <div className="relative mb-4 w-full">
          <input
            id="autocomplete-input"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="City, State, or Zip Code"
            className="w-full p-2 pr-8 border border-gray-300"
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearInput}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-black"
            >
              ×
            </button>
          )}
        </div>

        {/* Toggle Buttons */}
        <div className="flex mb-4 border border-gray-300 rounded overflow-hidden w-full">
          <button
            className={`flex-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              activeRegion === "SOCAL" ? "bg-[#428f47] text-black" : "bg-white text-gray-700 hover:bg-gray-100"
            } rounded-l`}
            onClick={() => {
              handleRegionClick("SOCAL");
            }}
          >
            SoCal Facilities
          </button>
          <div className="w-px bg-gray-300" />
          <button
            className={`flex-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              activeRegion === "NORCAL" ? "bg-[#428f47] text-black" : "bg-white text-gray-700 hover:bg-gray-100"
            } rounded-r`}
            onClick={() => {
              handleRegionClick("NORCAL");
            }}
          >
            NorCal Facilities
          </button>
        </div>

        {/* Facilities List */}
        <FacilitiesList
          facilities={currentFacilities}
          closestLocations={closestLocations}
          handleFacilityClick={handleFacilityClick}
        />
      </div>

      {/* Google Map */}
      <div ref={mapRef} className="w-3/4 h-full" />
    </div>
  );
};

export default GoogleSearchMap;
