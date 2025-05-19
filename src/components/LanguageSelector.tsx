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

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex items-center space-x-4">
        <button
          onClick={() => setLanguage("en")}
          className={`flex items-center h-8 ${
            language === "en" ? "font-bold underline" : "opacity-60"
          }`}
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-6 h-4">
              <Image
                src="/logos/USA.png"
                alt="USA Flag"
                width={20}
                height={14}
                className="object-contain"
              />
            </div>
            <span className="ml-1 text-sm">English</span>
          </div>
        </button>
        <button
          onClick={() => setLanguage("es")}
          className={`flex items-center h-8 ${
            language === "es" ? "font-bold underline" : "opacity-60"
          }`}
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-6 h-4">
              <Image
                src="/logos/MX.png"
                alt="Mexico Flag"
                width={20}
                height={14}
                className="object-contain"
              />
            </div>
            <span className="ml-1 text-sm">Español</span>
          </div>
        </button>
      </div>

      {/* Mobile */}
      <div className="flex lg:hidden items-center space-x-3 mr-2">
        <button
          onClick={() => setLanguage("en")}
          className={`flex items-center h-6 ${
            language === "en" ? "font-bold underline" : "opacity-60"
          }`}
          aria-label="Switch to English"
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-5 h-4">
              <Image
                src="/logos/USA.png"
                alt="USA Flag"
                width={16}
                height={11}
                className="object-contain"
              />
            </div>
            <span className="ml-1 text-xs">EN</span>
          </div>
        </button>
        <button
          onClick={() => setLanguage("es")}
          className={`flex items-center h-6 ${
            language === "es" ? "font-bold underline" : "opacity-60"
          }`}
          aria-label="Switch to Spanish"
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-5 h-4">
              <Image
                src="/logos/MX.png"
                alt="Mexico Flag"
                width={16}
                height={11}
                className="object-contain"
              />
            </div>
            <span className="ml-1 text-xs">ES</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default LanguageSelector;










