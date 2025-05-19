"use client";

import { SERVICES } from "@/constants/services";
import { useTranslation } from "react-i18next";
import ServicesCards from "./ServicesCards";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

interface ServicesSectionProps {
  variant?: "grid" | "list";
  id?: string;
}

const ServicesSection = ({ variant = "grid", id }: ServicesSectionProps) => {
  const pathname = usePathname();
  const { t } = useTranslation("common");

  const translatedServices = SERVICES.map((service) => ({
    ...service,
    title: t(`service${capitalize(service.key)}Title`),
    description: t(`service${capitalize(service.key)}Desc`),
  }));

  const filteredServices =
    variant === "list"
      ? translatedServices.filter((s) => s.link !== pathname && s.key !== "overview")
      : translatedServices;

  const mobileServices = translatedServices.filter((s) => s.key !== "overview");
  const isList = variant === "list";

  return (
    <section id={id} className="text-center animate-fadeIn relative w-full">
      <div className={`${isList ? "" : "py-12"} mx-auto max-w-6xl px-8 flex flex-col items-center`}>
        <div className="mb-8">
          <p className={`text-[#428f47] text-2xl font-semibold ${isList ? "" : "uppercase tracking-widest"} mb-2`}>
            {isList ? t("servicesExplore") : t("servicesHeader")}
          </p>
          {!isList && <h2 className="text-4xl md:text-5xl font-bold text-gray-800">{t("servicesSubheader")}</h2>}
        </div>

        {isList ? (
          <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 place-items-center">
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
          <div className="flex flex-col items-center gap-8 w-full">
            {/* Top Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center w-full">
              {filteredServices.map(({ title, image, link, size }, index) => (
                <Link
                  href={link}
                  key={title}
                  className={`text-center group w-full ${
                    index === 3 ? "flex justify-end ml-40" : index === 4 ? "flex justify-end ml-30" : ""
                  }`}
                >
                  <div className="transition-transform duration-300 group-hover:scale-105 flex flex-col items-center">
                    <div className={`relative ${index === 4 ? "flex justify-center w-full" : ""}`}>
                      <Image
                        src={image}
                        alt={title}
                        width={size}
                        height={size}
                        className="mx-auto transition duration-300 ease-in-out group-hover:scale-105 group-hover:drop-shadow-xl"
                      />
                    </div>
                    <p className="text-blue-900 font-semibold text-lg mt-4">{title}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden w-full">
              <p className="mb-4">{t("mobileDescription")}</p>
              <ServicesCards services={mobileServices} animateDur={0.3} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
