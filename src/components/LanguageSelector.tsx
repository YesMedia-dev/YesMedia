"use client";

import { useEffect, useState } from "react";
import i18n from "@/i18n";
import Image from "next/image";

const LanguageSelector = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      setLanguage(storedLang);
      i18n.changeLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  }, [language]);

  const renderFlag = (lang: string) => (
    <Image
      src={`/logos/${lang === "en" ? "USA" : "MX"}.png`}
      alt={lang === "en" ? "USA Flag" : "Mexico Flag"}
      width={20}
      height={14}
      className={`inline-block mr-1 align-middle ${
        lang === "es" ? "translate-y-[-1.5px]" : ""
      }`}
    />
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex items-center space-x-2">
        <button
          onClick={() => setLanguage("en")}
          className={`px-2 py-1 text-sm ${
            language === "en" ? "font-bold underline" : "opacity-60"
          }`}
        >
          {renderFlag("en")} English
        </button>
        <button
          onClick={() => setLanguage("es")}
          className={`px-2 py-1 text-sm ${
            language === "es" ? "font-bold underline" : "opacity-60"
          }`}
        >
          {renderFlag("es")} Español
        </button>
      </div>

      {/* Mobile */}
      <div className="flex lg:hidden items-center space-x-1 mr-2">
        <button
          onClick={() => setLanguage("en")}
          className={`text-xs ${
            language === "en" ? "font-bold underline" : "opacity-60"
          }`}
          aria-label="Switch to English"
        >
          {renderFlag("en")} EN
        </button>
        <button
          onClick={() => setLanguage("es")}
          className={`text-xs ${
            language === "es" ? "font-bold underline" : "opacity-60"
          }`}
          aria-label="Switch to Spanish"
        >
          {renderFlag("es")} ES
        </button>
      </div>
    </>
  );
};

export default LanguageSelector;








