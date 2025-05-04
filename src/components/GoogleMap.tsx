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

      // const defaultCenter = {
      //   lat: 34.0522,
      //   lng: -118.2437,
      // };

      const vinelandCenter = {
        lat: 34.17913653778753,
        lng: -118.36711955880061,
      };

      const mapOptions: google.maps.MapOptions = {
        center: vinelandCenter,
        zoom: 11,
        mapId: "cd229f410e543e1b",
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
            const content = `
              <div>
                ${facility.address}<br/>
                ${facility.city}, ${facility.state} ${facility.zip}<br/>
                <a href="tel:${facility.phone.replace(/\D/g, "")}">${
              facility.phone
            }</a><br/>
                <a href="${
                  facility.website
                }" target="_blank" rel="noopener noreferrer">${
              facility.website
            }</a>
              </div>
            `;
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

export default GoogleMap;
