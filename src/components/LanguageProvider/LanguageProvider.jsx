import { createContext, useContext } from "react";
import PropTypes from "prop-types";

import strings from "resources/strings.json";

import { connect } from "react-redux";
import { getLanguage } from "redux/redux-language";


const LanguageContext = createContext();

export const useLanguagesContext = () => useContext(LanguageContext);
export const availableLanguages = Object.keys(strings.languages);
export const defaultLanguage = strings.default;


const mapStateToProps = state => ({
  language: getLanguage(state),
});


export const LanguageProvider = connect(mapStateToProps)(({language, children }) => {
  return (
    <LanguageContext.Provider value={{ text: strings.languages[language] }}>
      {children}
    </LanguageContext.Provider>
  );
});

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
}



