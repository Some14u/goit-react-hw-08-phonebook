import { createContext, useContext, useReducer, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import strings from '../../resources/strings.json';
import { loadFromStorage, saveToStorage } from "helpers/localStorage";

const LanguageContext = createContext();
export const useLanguagesContext = () => useContext(LanguageContext);


export function LanguageProvider({ children }) {

  const availableLanguages = Object.keys(strings.languages);
  const defaultLanguage = strings.default;

  // This holds all localized text. It should be updated according to currentLanguage
  const text = useRef(strings.languages[defaultLanguage]);
  const isMounted = useRef(false);

  const [currentLanguage, setCurrentLanguage] = useReducer(reducer, loadFromStorage("language", defaultLanguage), reducer);

  // This updates text in the same state-commit as current language is
  function reducer(oldValue, newValue = oldValue) {
    text.current = strings.languages[newValue];
    return newValue;
  }


  useEffect(() => {
    if (!isMounted.current) return;
    saveToStorage("language", currentLanguage);
  }, [currentLanguage])


  useEffect(() => { isMounted.current = true }, []);

  const toContext = {
    availableLanguages,
    defaultLanguage,
    currentLanguage,
    setCurrentLanguage,
    text: text.current,
  };

  return (
    <LanguageContext.Provider value={toContext}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
}