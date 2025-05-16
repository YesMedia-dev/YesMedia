import { Loader } from "@googlemaps/js-api-loader";
import { FACILITIES } from "@/constants/facilities";
import { InitGoogleMapParams } from "@/types/googleMap";
import { createMarkers } from "./mapUtilities";

export async function initGoogleMap({ apiKey, mapContainer }: InitGoogleMapParams) {
  const loader = new Loader({
    apiKey,
    version: "weekly",
  });

  const { Map, InfoWindow } = await loader.importLibrary("maps");
  const { AdvancedMarkerElement } = await loader.importLibrary("marker");
  const { ColorScheme } = await loader.importLibrary("core");

  const vinelandCenter = {
    lat: 34.17913653778753,
    lng: -118.36711955880061,
  };

  const mapOptions: google.maps.MapOptions = {
    center: vinelandCenter,
    zoom: 11,
    mapId: "428a471c5a144130",
    mapTypeControl: false,
    colorScheme: ColorScheme.LIGHT,
  };

  const map = new Map(mapContainer, mapOptions);
  const infoWindow = new InfoWindow();

  createMarkers(FACILITIES, map, AdvancedMarkerElement, infoWindow);
}
