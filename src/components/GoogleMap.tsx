"use client";

import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";
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

const GoogleMap = () => {
  const mapRef = React.useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
        version: "weekly",
      });

      const { Map, InfoWindow } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } = await loader.importLibrary("marker");
      const { ColorScheme } = await loader.importLibrary("core");

      const vinelandCenter = {
        lat: 34.17913653778753,
        lng: -118.36711955880061,
      };

      const mapOptions: google.maps.MapOptions = {
        center: vinelandCenter,
        zoom: 11,
        mapId: "428a471c5a144130",
        colorScheme: ColorScheme.LIGHT,
      };

      if (mapRef.current) {
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
        const infoWindow = new InfoWindow();

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
            infoWindow.close();
            const content = fillContent(facility);
            infoWindow.setHeaderContent(facility.name);
            infoWindow.setContent(content);
            infoWindow.open(marker.map, marker);
          });
        });
      }
    };

    initMap();
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
};

const fillContent = (facility: Facility) => {
  const content = `
    <div>
      ${facility.address}<br/>
      ${facility.city}, ${facility.state} ${facility.zip}<br/>
      <a href="tel:${facility.phone.replace(/\D/g, "")}">
      ${facility.phone}
      </a><br/>
      <a href="https://${facility.website}" target="_blank" rel="noopener noreferrer">
      ${facility.website}</a>
      </div>
            `;
  return content;
};

export default GoogleMap;
