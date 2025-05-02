"use client";

import React from "react";
import HeroSlider from "./HeroSlider";

const HeroSection = () => {
  return (
    <section className="relative w-full">
      {/* Only the image carousel/slider */}
      <HeroSlider />
    </section>
  );
};

export default HeroSection;
