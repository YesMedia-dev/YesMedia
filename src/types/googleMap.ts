import { FacilityDistance } from "./facility";

export type InitGoogleMapParams = {
  apiKey: string;
  mapContainer: HTMLDivElement;
}

export type InitLocationMapParams = {
    apiKey: string;
    mapContainer: HTMLDivElement;
    infoWindowRef: { current: google.maps.InfoWindow | null };
    autocompleteMarkerRef: { current: google.maps.marker.AdvancedMarkerElement | null };
    setAutocomplete: (a: google.maps.places.Autocomplete) => void;
    closeAutocomplete: (a: google.maps.places.Autocomplete | null) => void;
    setAutocompleteMarker: (m: google.maps.marker.AdvancedMarkerElement) => void;
    setClosestLocationsSOCAL: (list: FacilityDistance[]) => void;
    setClosestLocationsNORCAL: (list: FacilityDistance[]) => void;
    setSocalMarkers: (m: google.maps.marker.AdvancedMarkerElement[]) => void;
    setNorcalMarkers: (m: google.maps.marker.AdvancedMarkerElement[]) => void;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  };