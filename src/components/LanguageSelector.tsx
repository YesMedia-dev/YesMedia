"use client";

import { useEffect, useState } from "react";
import i18n from "@/i18n";

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
      <div className="hidden lg:flex items-center space-x-2">
        <button
          onClick={() => setLanguage("en")}
          className={`px-2 py-1 text-sm ${
            language === "en" ? "font-bold underline" : "opacity-60"
          }`}
        >
          🇺🇸 English
        </button>
        <button
          onClick={() => setLanguage("es")}
          className={`px-2 py-1 text-sm ${
            language === "es" ? "font-bold underline" : "opacity-60"
          }`}
        >
          🇲🇽 Español
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
          🇺🇸 EN
        </button>
        <button
          onClick={() => setLanguage("es")}
          className={`text-xs ${
            language === "es" ? "font-bold underline" : "opacity-60"
          }`}
          aria-label="Switch to Spanish"
        >
          🇲🇽 ES
        </button>
      </div>
    </>
  );
};

export default LanguageSelector;






