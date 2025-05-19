"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation("common");

  return (
    <section className="mobile-banner relative h-[400px] bg-cover bg-center md:bg-fixed md:bg-cover text-white flex items-center justify-center px-4 text-center mt-20">
      <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>

      <div className="relative z-10 text-white max-w-3xl -mt-8 md:mt-0">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">&quot;{t("bannerQuote")}&quot;</h2>
        <p className="text-sm md:text-base font-light">{t("bannerAttribution")}</p>
      </div>
    </section>
  );
};

export default Banner;
