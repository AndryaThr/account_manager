import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "../../translation/fr";

const resources = {
  fr: {
    translation: fr,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "fr",
  fallbackLng: "fr",
  resources,
  interpolation: {
    escapeValue: false,
  },
  keySeparator: ".",
});

export default i18n;
