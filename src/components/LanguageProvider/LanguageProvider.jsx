import { createContext, useContext } from "react";

import PropTypes from "prop-types";
import strings from "resources/strings.json";

import { useLanguage } from "redux/languageSlice";


const LanguageContext = createContext();

export const useLanguagesContext = () => useContext(LanguageContext);
export const availableLanguages = Object.keys(strings.languages);

export function getDefaultLanguage() {
  return strings.default;
}


export function LanguageProvider({ children }) {
  const [language] = useLanguage();

  return (
    <LanguageContext.Provider value={{ text: strings.languages[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
}