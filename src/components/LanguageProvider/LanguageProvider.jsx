import { createContext, useContext, useReducer, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import strings from '../../resources/strings.json';
import { loadFromStorage, saveToStorage } from "helpers/localStorage";

const LanguageContext = createContext();
export const useLanguagesContext = () => useContext(LanguageContext);


export function LanguageProvider({ children }) {

  const availableLanguages = Object.keys(strings.languages);
  const defaultLanguage = strings.default;

  const refs = useRef({
    text: strings.languages[defaultLanguage], // This holds all localized text. Should be updated to currentLanguage
    isMounted: false, // This to prevent first render of effects
  });

  const [currentLanguage, setCurrentLanguage] = useReducer(reducer, loadFromStorage("language", defaultLanguage), reducer);

  // This updates refs-text in the same state-commit as current language is
  function reducer(oldValue, newValue = oldValue) {
    refs.current.text = strings.languages[newValue];
    return newValue;
  }


  useEffect(() => {
    if (!refs.current.isMounted) return;
    saveToStorage("language", currentLanguage);
  }, [currentLanguage])


  useEffect(() => { refs.current.isMounted = true }, []);

  const toContext = {
    availableLanguages,
    defaultLanguage,
    currentLanguage,
    setCurrentLanguage,
    text: refs.current.text,
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