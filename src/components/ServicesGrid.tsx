"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Overview",
    image: "/assets/services1.png",
    path: "/services/services_overview",
    size: 110,
  },
  {
    title: "Rehabilitation",
    image: "/assets/services2.png",
    path: "/services/rehabilitation",
    size: 80,
  },
  {
    title: "Skilled Nursing",
    image: "/assets/services3.png",
    path: "/services/nursing",
    size: 130,
  },
  {
    title: "Social Services",
    image: "/assets/services4.png",
    path: "/services/social",
    size: 140,
  },
  {
    title: "Activities",
    image: "/assets/services5.png",
    path: "/services/activities",
    size: 130,
  },
];

const ServicesGrid = ({ id }: { id?: string }) => {
  return (
    <section id={id} className="bg-white text-center animate-fadeIn relative overflow-visible">
      {/* Decorative Green Bubbles */}
      <div className="absolute w-[100px] h-[100px] bg-green-100 rounded-full top-[-30px] left-[-30px] z-0 opacity-30" />
      <div className="absolute w-[80px] h-[80px] bg-green-200 rounded-full bottom-[10%] left-[5%] z-0 opacity-25" />
      <div className="absolute w-[90px] h-[90px] bg-green-100 rounded-full top-[35%] left-[250px] z-0 opacity-30" />
      <div className="absolute w-[70px] h-[70px] bg-green-200 rounded-full bottom-[25%] left-[20%] z-0 opacity-20" />

      <div className="absolute w-[110px] h-[110px] bg-green-100 rounded-full top-[20%] right-[-40px] z-0 opacity-30" />
      <div className="absolute w-[90px] h-[90px] bg-green-200 rounded-full bottom-[5%] right-[10%] z-0 opacity-20" />

      <div className="py-20 max-w-6xl mx-auto px-8 relative z-10">
        {/* Header Text */}
        <div className="mb-14">
          <p className="text-[#428f47] text-2xl font-semibold uppercase tracking-widest mb-2">SERVICES</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Your Health is Our Priority</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center">
          {services.map(({ title, image, path, size }, index) => (
            <Link
              href={path}
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
                <p className={`text-blue-900 font-semibold text-lg ${index === 4 ? "-ml-8 -mt-2" : "mt-4"}`}>{title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
