"use client";

import React from "react";
import { FaUserNurse, FaDumbbell, FaSmile, FaHandsHelping } from "react-icons/fa";

const services = [
  {
    title: "Skilled Nursing",
    description: "24-hour medical care from experienced licensed professionals.",
    icon: <FaUserNurse size={32} className="text-green-700" />,
  },
  {
    title: "Rehabilitation",
    description: "Physical and occupational therapy to help you recover mobility.",
    icon: <FaDumbbell size={32} className="text-green-700" />,
  },
  {
    title: "Activities",
    description: "Engaging social events and enrichment activities for residents.",
    icon: <FaSmile size={32} className="text-green-700" />,
  },
  {
    title: "Social Services",
    description: "Support with care coordination, discharge planning, and more.",
    icon: <FaHandsHelping size={32} className="text-green-700" />,
  },
];

const ServicesGrid = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition text-left"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
