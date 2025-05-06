import { useEffect, useRef } from "react";
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
  logo: string;
};

type FacilityDistance = {
  facility: (typeof FACILITIES)[number];
  distanceMiles: number;
};

type Props = {
  closestLocations: FacilityDistance[] | null;
  handleFacilityClick: (index: number) => void;
  facilities: Facility[];
};

export default function FacilitiesList({ closestLocations, handleFacilityClick, facilities }: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [closestLocations]);

  return (
    <ul ref={listRef} className="overflow-y-auto max-h-[calc(100vh-160px)] border border-gray-300">
      {(closestLocations ?? facilities).map((item, index) => {
        const facility = "facility" in item ? item.facility : item;
        const distance =
          "distanceMiles" in item ? <p className="text-sm text-gray-600">{`${item.distanceMiles} Miles`}</p> : null;

        return (
          <li
            key={index}
            onClick={() => handleFacilityClick(index)}
            className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
          >
            <Image
              src={facility.logo}
              alt="Facility Image"
              width={40}
              height={40}
              className="mr-4 justify-item-center"
            />

            <div>
              {distance}
              <h6 className="text-lg font-semibold text-green-700">{facility.name}</h6>
              <p className="text-sm text-gray-600">
                {facility.address}, {facility.city}, {facility.state} {facility.zip}
              </p>
              <div className="flex items-center gap-4">
                <a href={`tel:${facility.phone.replace(/\D/g, "")}`} className="text-sm text-blue-600 hover:underline">
                  {facility.phone}
                </a>
                <a
                  href={`https://${facility.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  More Info
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
