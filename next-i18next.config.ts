import type { UserConfig } from "next-i18next";

const config: UserConfig = {
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    localeDetection: false
  },
  localePath: "./public/locales",
  localeStructure: "{{lng}}",
  defaultNS: "common",
  reloadOnPrerender: process.env.NODE_ENV === "development"
};

export default config;
export const { i18n } = config;








