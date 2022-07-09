import s from "./LanguageToggle.module.css";
import icons from "resources/icons.svg";
import { availableLanguages } from "components/LanguageProvider";

import { connect } from "react-redux";
import { getLanguage, selectLanguage } from "redux/redux-language";



function LanguageToggle({ currentLanguage, selectLanguage }) {

  function toggleNextLanguage() {
    let index = (availableLanguages.indexOf(currentLanguage) + 1) % availableLanguages.length;
    selectLanguage(availableLanguages[index]);
  }

  return (
    <button type="button" className={s.toggle} onClick={toggleNextLanguage}>
      <svg className={s.svg} width="39" height="26">
        <use href={icons + "#language-" + currentLanguage} />
      </svg>
    </button>
  );
}

const mapStateToProps = state => ({
  currentLanguage: getLanguage(state),
});

const mapDispatchToProps = dispatch => ({
  selectLanguage: language => dispatch(selectLanguage(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageToggle);

