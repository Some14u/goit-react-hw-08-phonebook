import { createContext, useContext } from "react";

import PropTypes from "prop-types";
import strings from "resources/strings.json";

import { useLanguage } from "redux/language-slice";


const LanguageContext = createContext();

export const useLanguagesContext = () => useContext(LanguageContext);
export const availableLanguages = Object.keys(strings.languages);
export const defaultLanguage = strings.default;


export function LanguageProvider({ children }) {
  const { language } = useLanguage();
  return (
    <LanguageContext.Provider value={{ text: strings.languages[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
}



