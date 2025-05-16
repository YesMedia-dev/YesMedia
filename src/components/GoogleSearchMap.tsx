"use client";

import React, { useEffect, useRef, useState } from "react";
import { FACILITIES } from "@/constants/facilities";
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
  const [closestLocations, setClosestLocations] = useState<FacilityDistance[] | null>(null);

  // Markers for both regions
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);

  // Used for clearing search input in the button
  const [searchInput, setSearchInput] = useState("");

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
        setClosestLocations,
        setMarkers,
        setSearchInput,
      });
    }
  }, []);

  // Opens up the right facility content window from the Facility list
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
    // Removes search location
    if (autocompleteMarkerRef.current) {
      autocompleteMarkerRef.current.map = null;
      setAutocompleteMarker(null);
    }
    // Removes dropdown menu
    closeAutocomplete(autocompleteInstance);
    // Removes the miles from the list
    if (closestLocations) {
      setClosestLocations(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="w-full mt-24 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 flex flex-col overflow-auto bg-white z-10 mx-auto">
        <h1 className="text-[#428f47] font-medium text-lg text-center"> View our locations </h1>
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

        {/* Facilities List */}
        <FacilitiesList
          facilities={FACILITIES}
          closestLocations={closestLocations}
          handleFacilityClick={handleFacilityClick}
        />
      </div>

      {/* Google Map */}
      <div ref={mapRef} className="hidden md:block w-full md:w-1/2 lg:w-3/4 h-full" />
    </div>
  );
};

export default GoogleSearchMap;
