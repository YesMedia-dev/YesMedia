"use client";

import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";
import { FACILITIES } from "@/constants/facilities";

const GoogleMap = () => {
  const mapRef = React.useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const google = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
      });

      const { Map, InfoWindow } = await google.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } = await google.importLibrary(
        "marker"
      );
      const { ColorScheme } = await google.importLibrary("core");

      // Los Angeles Center
      const defaultCenter = {
        lat: 34.0522,
        lng: -118.2437,
      };

      const mapOptions: google.maps.MapOptions = {
        center: defaultCenter,
        zoom: 8,
        mapId: "cd229f410e543e1b",
        colorScheme: ColorScheme.LIGHT,
      };

      if (mapRef.current) {
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
        const infoWindow = new InfoWindow();

        FACILITIES.map((facility, index) => {
          const pin = new PinElement({
            scale: 1,
          });

          const marker = new AdvancedMarkerElement({
            map: map,
            position: facility.pos,
            title: facility.name,
            content: pin.element,
            gmpClickable: true,
          });

          marker.addListener("gmp-click", () => {
            infoWindow.close();

            const { name, address, city, state, zip, phone, website } =
              facility;

            const formattedWebsite = website.startsWith("http")
              ? website
              : `https://${website}`;

            const content = `
              <div>
                ${address}<br/>
                ${city}, ${state} ${zip}<br/>
                <a href="tel:${phone.replace(/\D/g, "")}">${phone}</a><br/>
                <a href="${formattedWebsite}" target="_blank" rel="noopener noreferrer">${website}</a>
              </div>
            `;

            infoWindow.setHeaderContent(name);
            infoWindow.setContent(content);
            infoWindow.open(marker.map, marker);
          });
        });
      }
    };

    initMap();
  }, []);

  return <div style={{ width: "100%", height: "400px" }} ref={mapRef}></div>;
};

export default GoogleMap;
