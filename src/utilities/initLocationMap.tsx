import { Loader } from "@googlemaps/js-api-loader";
import { SOCALFACILITIES, NORCALFACILITIES } from "@/constants/facilities";
import { InitLocationMapParams } from "@/types/googleMap";
import { createMarkers, calculateDistance } from "./mapUtilities";

export async function initLocationMap({
  apiKey,
  mapContainer,
  infoWindowRef,
  autocompleteMarkerRef,
  setAutocomplete,
  setAutocompleteMarker,
  setClosestLocationsSOCAL,
  setClosestLocationsNORCAL,
  setSocalMarkers,
  setNorcalMarkers,
  setSearchInput,
}: InitLocationMapParams) {
  const loader = new Loader({
    apiKey,
    version: "weekly",
  });

  const { Map, InfoWindow } = await loader.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await loader.importLibrary("marker");
  const { ColorScheme, LatLng } = await loader.importLibrary("core");
  const { Autocomplete } = await loader.importLibrary("places");
  const { spherical } = await loader.importLibrary("geometry");

  const defaultCenter = { lat: 37.5, lng: -120 };

  const mapOptions: google.maps.MapOptions = {
    center: defaultCenter,
    zoom: 6,
    mapId: "428a471c5a144130",
    colorScheme: ColorScheme.LIGHT,
  };

  const map = new Map(mapContainer, mapOptions);
  infoWindowRef.current = new InfoWindow();

  const input = document.getElementById("autocomplete-input") as HTMLInputElement;
  const autocompleteInstance = new Autocomplete(input, {
    fields: ["place_id", "geometry", "name", "formatted_address"],
  });
  setAutocomplete(autocompleteInstance);

  autocompleteInstance.addListener("place_changed", () => {
    const place = autocompleteInstance.getPlace();
    if (place.geometry?.location) {
      const location = place.geometry.location;

      setSearchInput(place.formatted_address || place.name || "");

      const pin = new PinElement({
        scale: 1.25,
        background: "#b81f14",
        borderColor: "#7a150d",
        glyphColor: "#b81f14",
      });

      if (autocompleteMarkerRef.current) {
        autocompleteMarkerRef.current.position = location;
      } else {
        const marker = new AdvancedMarkerElement({
          map,
          position: location,
          content: pin.element,
        });
        setAutocompleteMarker(marker);
      }

      map.setCenter(location);
      map.setZoom(8);

      setClosestLocationsSOCAL(calculateDistance(SOCALFACILITIES, location, LatLng, spherical));
      setClosestLocationsNORCAL(calculateDistance(NORCALFACILITIES, location, LatLng, spherical));
    }
  });

  setSocalMarkers(createMarkers(SOCALFACILITIES, map, AdvancedMarkerElement, infoWindowRef));
  setNorcalMarkers(createMarkers(NORCALFACILITIES, map, AdvancedMarkerElement, infoWindowRef));
}
