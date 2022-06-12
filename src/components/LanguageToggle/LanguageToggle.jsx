import s from "./LanguageToggle.module.css";
import icons from "resources/icons.svg";

import { useLanguagesContext } from "../LanguageProvider";


export default function LanguageToggle() {
  const { availableLanguages, currentLanguage, setCurrentLanguage } = useLanguagesContext();

  function nextLanguage() {
    let index = (availableLanguages.indexOf(currentLanguage) + 1) % availableLanguages.length;
    setCurrentLanguage(availableLanguages[index]);
  }

  return (
    <button type="button" className={s.toggle} onClick={nextLanguage}>
      <svg className={s.svg} width="39" height="26">
        <use href={icons + "#language-" + currentLanguage} />
      </svg>
    </button>
  );
}

