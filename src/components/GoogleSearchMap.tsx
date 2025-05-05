"use client";

import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FACILITIES } from "@/constants/facilities";

type Facility = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
  pos: {
    lat: number;
    lng: number;
  };
  color: string;
};

type FacilityDistance = {
  facility: (typeof FACILITIES)[number];
  distanceMiles: number;
};

let map: google.maps.Map;
let infoWindow: google.maps.InfoWindow; // Store a single InfoWindow instance

const GoogleMap = () => {
  const mapRef = useRef(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [closestLocations, setClosestLocations] = useState<FacilityDistance[]>();
  const autocompleteMarker = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  // Resets list position after searching
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [closestLocations]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
        version: "weekly",
      });

      const { Map, InfoWindow } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } = await loader.importLibrary("marker");
      const { ColorScheme, LatLng } = await loader.importLibrary("core");
      const { Autocomplete } = await loader.importLibrary("places");
      const { spherical } = await loader.importLibrary("geometry");

      const defaultCenter = {
        lat: 34.0522,
        lng: -118.2437,
      };

      const mapOptions: google.maps.MapOptions = {
        center: defaultCenter,
        zoom: 10,
        mapId: "cd229f410e543e1b",
        colorScheme: ColorScheme.LIGHT,
      };

      if (mapRef.current) {
        map = new Map(mapRef.current as HTMLDivElement, mapOptions);
        infoWindow = new InfoWindow(); // Initialize a single InfoWindow instance

        // Initialize autocomplete for search input
        const input = document.getElementById("autocomplete-input") as HTMLInputElement;
        const autocompleteInstance = new Autocomplete(input, {
          fields: ["place_id", "geometry", "name"],
        });

        // Set the autocomplete to state
        setAutocomplete(autocompleteInstance);

        // Listen for the place selection
        autocompleteInstance.addListener("place_changed", () => {
          const place = autocompleteInstance.getPlace();
          if (place.geometry?.location) {
            const location = place.geometry.location;

            const pin = new PinElement({
              scale: 1.25,
              background: "#005100",
              borderColor: "#002e00",
              glyphColor: "#002e00",
            });

            if (autocompleteMarker.current) {
              autocompleteMarker.current.position = location;
            } else {
              const marker = new AdvancedMarkerElement({
                map,
                position: location,
                content: pin.element,
              });
              autocompleteMarker.current = marker;
            }

            map.setCenter(location);
            map.setZoom(11);

            // Calculate all facility distances from searched location
            const facilityDistances = FACILITIES.map((facility) => {
              const destination = new LatLng(facility.pos.lat, facility.pos.lng);
              const distanceMeters = spherical.computeDistanceBetween(location, destination);
              const distanceMiles = distanceMeters * 0.000621371; // convert to miles

              return {
                facility,
                distanceMiles: parseFloat(distanceMiles.toFixed(1)), // round to 2 decimals
              };
            });

            // Sort by facilities by closest distance
            facilityDistances.sort((a, b) => a.distanceMiles - b.distanceMiles);
            setClosestLocations(facilityDistances);

            // Sort markers as well
            const sortedMarkers = facilityDistances.map(
              (fd) => facilityMarkers.find((marker) => marker.title === fd.facility.name)!
            );
            setMarkers(sortedMarkers);

            // Debug
            console.log("Distances to each facility:", facilityDistances);
          }
        });

        // Add markers for facilities and store them in state
        const facilityMarkers: google.maps.marker.AdvancedMarkerElement[] = [];

        FACILITIES.forEach((facility) => {
          const pin = new PinElement({
            scale: 0.75,
            background: "#428F47",
            borderColor: "#26792C",
            glyphColor: "#26792C",
          });

          const marker = new AdvancedMarkerElement({
            map,
            position: facility.pos,
            title: facility.name,
            content: pin.element,
            gmpClickable: true,
          });

          marker.addListener("gmp-click", () => {
            // Close any open InfoWindow before opening a new one
            infoWindow.close();
            const content = fillContent(facility);
            infoWindow.setHeaderContent(facility.name);
            infoWindow.setContent(content);
            infoWindow.open(marker.map, marker);
          });

          // Store the marker for later use
          facilityMarkers.push(marker);
        });

        // Set the markers in state
        setMarkers(facilityMarkers);
      }
    };

    initMap();
  }, []);

  const handleFacilityClick = (index: number) => {
    const marker = markers[index];
    if (marker) {
      // Close any open InfoWindow before opening a new one
      infoWindow.close();

      let facility;
      if (closestLocations) {
        facility = closestLocations[index].facility;
      } else {
        facility = FACILITIES[index];
      }
      const content = fillContent(facility);
      infoWindow.setHeaderContent(facility.name);
      infoWindow.setContent(content);
      infoWindow.open(marker.map, marker);
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Autocomplete Input + Facilities List */}
      <div className="w-1/4 p-4 mt-[80px] flex flex-col h-full">
        {/* Autocomplete Input */}
        <input
          id="autocomplete-input"
          type="text"
          placeholder="City, State, or Zip Code"
          className="w-full p-2 border border-gray-300 mb-4"
        />

        {/* Facilities List (Scrollable) */}

        <ul ref={listRef} className="overflow-y-auto max-h-[calc(100vh-160px)] border border-gray-300">
          {closestLocations
            ? closestLocations.map((array, index) => (
                <li
                  key={index}
                  onClick={() => handleFacilityClick(index)}
                  className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                >
                  <Image
                    src="/logos/vine.png"
                    alt="Facility Image"
                    width={40}
                    height={40}
                    className="mr-4 justify-item-center"
                  />

                  <div>
                    <p className="text-sm text-gray-600">{`${array.distanceMiles} Miles`}</p>
                    <h6 className="text-lg font-semibold text-green-700">{array.facility.name}</h6>

                    <p className="text-sm text-gray-600">
                      {array.facility.address}, {array.facility.city}, {array.facility.state} {array.facility.zip}
                    </p>

                    <a
                      href={`tel:${array.facility.phone.replace(/\D/g, "")}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {array.facility.phone}
                    </a>
                  </div>
                </li>
              ))
            : FACILITIES.map((facility, index) => (
                <li
                  key={index}
                  onClick={() => handleFacilityClick(index)}
                  className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                >
                  <Image
                    src="/vine.png"
                    alt="Facility Image"
                    width={40}
                    height={40}
                    className="mr-4 justify-item-center"
                  />

                  <div>
                    <h6 className="text-lg font-semibold text-green-700">{facility.name}</h6>

                    <p className="text-sm text-gray-600">
                      {facility.address}, {facility.city}, {facility.state} {facility.zip}
                    </p>

                    <a
                      href={`tel:${facility.phone.replace(/\D/g, "")}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {facility.phone}
                    </a>
                  </div>
                </li>
              ))}
        </ul>
      </div>

      {/* Google Map on the Right */}
      <div ref={mapRef} className="w-3/4 h-full" />
    </div>
  );
};

export default GoogleMap;

const fillContent = (facility: Facility) => {
  const content = `
    <div>
      ${facility.address}<br/>
      ${facility.city}, ${facility.state} ${facility.zip}<br/>
      <a href="tel:${facility.phone.replace(/\D/g, "")}">
      ${facility.phone}
      </a><br/>
      <a href="${facility.website}" target="_blank" rel="noopener noreferrer">
      ${facility.website}</a>
      </div>
            `;
  return content;
};
