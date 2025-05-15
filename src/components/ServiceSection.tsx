"use client";

import { SERVICES } from "@/constants/services";
import { usePathname } from "next/navigation";
import ServicesCards from "./ServicesCards";
import Image from "next/image";
import Link from "next/link";

interface ServicesSectionProps {
  variant?: "grid" | "list";
  id?: string;
}

const ServicesSection = ({ variant = "grid", id }: ServicesSectionProps) => {
  const pathname = usePathname();
  const filteredServices =
    variant === "list"
      ? SERVICES.filter((service) => service.title !== "Overview" && service.link !== pathname)
      : SERVICES;

  const mobileServices = SERVICES.filter((service) => service.title !== "Overview");
  const isList = variant === "list";

  return (
    <section id={id} className="text-center animate-fadeIn relative w-full">
      <div className={`${isList ? "" : "py-12"} mx-auto max-w-6xl px-8 flex flex-col items-center`}>
        {/* Header */}
        <div className="mb-8">
          <p className={`text-[#428f47] text-2xl font-semibold ${isList ? "" : " uppercase tracking-widest"} mb-2`}>
            {isList ? "Explore Other Services" : "SERVICES"}
          </p>
          {!isList && <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Your Health is Our Priority</h2>}
        </div>

        {/* Services Grid/List */}
        {isList ? (
          // LIST VARIANT — preserves your original layout
          <div className={`grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 place-items-center`}>
            {filteredServices.map(({ title, image, link, size }, index) => {
              const listSpecial = filteredServices.length === 3 && index === 2 ? "col-span-2 justify-self-center" : "";

              return (
                <Link href={link} key={title} className={`text-center group w-full max-w-xs ${listSpecial}`}>
                  <div className="transition-transform duration-300 group-hover:scale-105 flex flex-col items-center">
                    <div className="relative">
                      <Image
                        src={image}
                        alt={title}
                        width={size}
                        height={size}
                        className="mx-auto transition duration-300 ease-in-out group-hover:scale-105 group-hover:drop-shadow-xl"
                      />
                    </div>
                    <p className="text-blue-900 font-semibold text-lg">{title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          // GRID VARIANT — special 3 + 2 desktop, text-right mobile layout
          <div className="flex flex-col items-center gap-8 w-full">
            {/* Desktop layout: 3 on top row */}
            <div className="hidden md:grid grid-cols-3 gap-8 w-full place-items-center">
              {filteredServices.slice(0, 3).map(({ title, image, link, size }) => (
                <Link href={link} key={title} className="group w-full max-w-xs text-center">
                  <div className="transition-transform duration-300 group-hover:scale-105 flex flex-col items-center">
                    <div className="relative w-full flex justify-center">
                      <Image
                        src={image}
                        alt={title}
                        width={size}
                        height={size}
                        className="transition duration-300 ease-in-out group-hover:scale-105 group-hover:drop-shadow-xl"
                      />
                    </div>
                    <p className="text-blue-900 font-semibold text-lg">{title}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop layout: 2 on bottom row */}
            <div className="hidden md:grid grid-cols-2 gap-8 w-full place-items-center">
              {filteredServices.slice(3, 5).map(({ title, image, link, size }) => (
                <Link href={link} key={title} className="group w-full max-w-xs text-center">
                  <div className="transition-transform duration-300 group-hover:scale-105 flex flex-col items-center">
                    <div className="relative w-full flex justify-center">
                      <Image
                        src={image}
                        alt={title}
                        width={size}
                        height={size}
                        className="transition duration-300 ease-in-out group-hover:scale-105 group-hover:drop-shadow-xl"
                      />
                    </div>
                    <p className="text-blue-900 font-semibold text-lg">{title}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile layout: one column, image left and text right */}
            <div className="md:hidden w-full">
              <p className="mb-4">
                Vineland Post Acute recognizes the unique needs of our patients and provides a secure environment to
                meet both their social and clinical needs while still promoting independence. We invite you to contact
                us today and ask us about any of our available services.
              </p>
              <ServicesCards services={mobileServices} animateDur={0.3} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
