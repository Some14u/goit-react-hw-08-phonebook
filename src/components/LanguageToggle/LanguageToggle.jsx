import s from "./LanguageToggle.module.css";
import icons from "resources/icons.svg";
import { availableLanguages } from "components/LanguageProvider";

import { useLanguage } from "redux/language-slice";


export default function LanguageToggle() {
  const { language, selectLanguage } = useLanguage();

  function toggleNextLanguage() {
    let index = (availableLanguages.indexOf(language) + 1) % availableLanguages.length;
    selectLanguage(availableLanguages[index]);
  }

  return (
    <button type="button" className={s.toggle} onClick={toggleNextLanguage}>
      <svg className={s.svg} width="39" height="26">
        <use href={icons + "#language-" + language} />
      </svg>
    </button>
  );
}