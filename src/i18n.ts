import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import arabic from "./locals/ar/arabic.json";
import english from "./locals/en/english.json";
i18n

  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)

  .init({
    fallbackLng: "en",
    debug: true,
    lng: "ar",
    resources: {
      en: {
        translation: english,
      },
      ar: {
        translation: arabic,
      },
    },
  });

export default i18n;
