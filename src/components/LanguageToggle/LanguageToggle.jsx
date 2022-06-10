import s from "./LanguageToggle.module.css";
import PropTypes from "prop-types";
import icons from "resources/icons.svg";


export default function LanguageToggle({ languagesList, currentLanguage, changeStateLanguage }) {

  function nextLanguage() {
    let index = (languagesList.indexOf(currentLanguage) + 1) % languagesList.length;
    changeStateLanguage(languagesList[index]);
  }

  return (
    <button type="button" className={s.toggle} onClick={nextLanguage}>
      <svg className={s.svg} width="39" height="26">
        <use href={icons + "#language-" + currentLanguage} />
      </svg>
    </button>
  );
}

LanguageToggle.propTypes = {
  languagesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentLanguage: PropTypes.string.isRequired,
  changeStateLanguage: PropTypes.func.isRequired,
}