import { Facility } from "@/types/facility";

export const fillContent = (facility: Facility) => {
  return `
    <div>
      <strong>${facility.name}</strong><br />
      ${facility.address}, ${facility.city}, ${facility.state} ${facility.zip}<br />
      <a href="tel:${facility.phone.replace(/\D/g, "")}">${facility.phone}</a><br />
      <a href="https://${facility.website}" target="_blank" rel="noopener noreferrer">More Info</a>
    </div>
  `;
};

export function createMarkers(
  facilities: Facility[],
  map: google.maps.Map,
  AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
  infoWindowRefOrInstance: { current: google.maps.InfoWindow | null } | google.maps.InfoWindow,
) {
  return facilities.map((facility) => {
    const img = document.createElement("img");
    img.src = facility.logo ?? "";
    img.alt = facility.name;
    img.style.width = "25px";
    img.style.height = "25px";
    img.style.objectFit = "contain";
    img.style.borderRadius = "50%";
    img.style.backgroundColor = "white";
    img.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";

    const marker = new AdvancedMarkerElement({
      map,
      position: facility.pos,
      title: facility.name,
      content: img,
      gmpClickable: true,
    });

    marker.addListener("gmp-click", () => {
      const infoWindow =
        "current" in infoWindowRefOrInstance ? infoWindowRefOrInstance.current : infoWindowRefOrInstance;

      if (infoWindow) {
        infoWindow.close();
        infoWindow.setHeaderContent(facility.name);
        infoWindow.setContent(fillContent(facility));
        infoWindow.open(marker.map, marker);
      }
    });

    return marker;
  });
}

export function calculateDistance(
  facilities: Facility[],
  location: google.maps.LatLng,
  LatLng: typeof google.maps.LatLng,
  spherical: typeof google.maps.geometry.spherical,
) {
  const facilityDistances = facilities.map((facility) => {
    const destination = new LatLng(facility.pos.lat, facility.pos.lng);
    const distanceMeters = spherical.computeDistanceBetween(location, destination);
    const distanceMiles = distanceMeters * 0.000621371;
    return {
      facility,
      distanceMiles: parseFloat(distanceMiles.toFixed(1)),
    };
  });

  facilityDistances.sort((a, b) => a.distanceMiles - b.distanceMiles);
  return facilityDistances;
}

export function closeAutocomplete(autocompleteInstance: google.maps.places.Autocomplete | null) {
  if (autocompleteInstance) {
    autocompleteInstance.set("place", null); // Close the dropdown
  }
}
