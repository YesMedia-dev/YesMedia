"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const benefitImages = [
  "/assets/newhire.png",
  "/assets/edutrack.png",
  "/assets/car.png",
  "/assets/safety.png",
  "/assets/phmp.png",
  "/assets/tickets.png"
];

const benefitLinks = [
  null,
  "https://edutracktraining.com/",
  null,
  null,
  null,
  null
];

const cardClasses =
  "bg-white rounded-lg shadow-md p-6 text-left flex flex-col items-center justify-start h-[230px] hover:shadow-lg transition";

const Careers = () => {
  const { t } = useTranslation("common");
  const benefits = t("careersPage.benefits", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-white pt-4 pb-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h1
          className={`mt-6 text-4xl md:text-5xl font-bold text-[#428f47] mb-2 transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(-20px)",
            transition: "transform 500ms ease, opacity 500ms ease"
          }}
        >
          {t("careersPage.title")}
        </h1>

        {/* Subtitle */}
        <p
          className={`text-[#000000] italic text-lg mb-6 transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(-10px)",
            transition: "opacity 500ms ease, transform 500ms ease",
            transitionDelay: "150ms"
          }}
        >
          {t("careersPage.subtitle")}
        </p>

        {/* Hero Image */}
        <div
          className={`rounded-xl overflow-hidden shadow-lg mb-6 transition-all duration-600 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative w-full h-[570px]">
            <Image
              src="/contact/chef.webp"
              alt="Welcome to Vineland"
              fill
              priority
              className="object-cover rounded-xl"
              style={{ objectPosition: "center 25%" }}
            />
          </div>
        </div>

        {/* Intro Paragraph */}
        <p
          className={`text-md text-gray-700 leading-relaxed max-w-4xl mx-auto mb-6 transition-opacity delay-200 duration-600 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {t("careersPage.intro")}
        </p>

        {/* Apply Button */}
        <a
          href="https://www2.appone.com/Search/Search.aspx?ServerVar=sunmarmanagementservices.appone.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition mb-12 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transition: "opacity 600ms ease, transform 600ms ease",
            transitionDelay: "300ms"
          }}
        >
          {t("careersPage.apply")}
        </a>

        {/* Benefits Heading */}
        <h2
          className={`text-3xl md:text-4xl font-bold text-gray-800 mb-10 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transition: "opacity 600ms ease, transform 600ms ease",
            transitionDelay: "400ms"
          }}
        >
          {t("careersPage.benefitsTitle")}
        </h2>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => {
            const card = (
              <div
                key={`benefit-${index}`}
                className={`${cardClasses} transition-all duration-500`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <Image
                  src={benefitImages[index]}
                  alt={benefit.title}
                  width={175}
                  height={175}
                  className="mb-4 object-contain"
                />
                <h3 className="font-bold text-lg text-gray-800 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  {benefit.description}
                </p>
              </div>
            );

            return benefitLinks[index] && index === 1 ? (
              <a
                key={`benefit-${index}`}
                href={benefitLinks[index]!}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {card}
              </a>
            ) : (
              <div key={`benefit-${index}`}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Careers;






