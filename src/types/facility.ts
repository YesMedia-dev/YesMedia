export type Facility = {
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
    logo: string;
  };
  
export type FacilityDistance = {
    facility: Facility;
    distanceMiles: number;
  };

export type FacilityList ={
  facilities: Facility[];
  closestLocations: FacilityDistance[] | null;
  handleFacilityClick: (index: number) => void;
};