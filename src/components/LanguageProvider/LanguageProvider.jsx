import { createContext, useContext, useReducer, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import strings from '../../resources/strings.json';
import { loadFromStorage, saveToStorage } from "helpers/localStorage";

const LanguageContext = createContext();
export const useLanguagesContext = () => useContext(LanguageContext);

// Builds content of state as { text, current } selecting appropriate text from strings
const reducer = (oldValue, newValue = oldValue) => ({ current: newValue, text: strings.languages[newValue] });

export function LanguageProvider({ children }) {

  const availableLanguages = Object.keys(strings.languages);
  const defaultLanguage = strings.default;

  const isMounted = useRef(false);

  const [language, setCurrentLanguage] = useReducer(reducer, loadFromStorage("language", defaultLanguage), reducer);


  useEffect(() => {
    if (!isMounted.current) return;
    saveToStorage("language", language.current);
  }, [language])


  useEffect(() => { isMounted.current = true }, []);

  const toContext = {
    availableLanguages,
    defaultLanguage,
    currentLanguage: language.current,
    setCurrentLanguage,
    text: language.text,
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