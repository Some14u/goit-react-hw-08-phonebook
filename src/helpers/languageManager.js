import strings from '../resources/strings.json';

const availableLanguages = Object.keys(strings.languages);
const defaultLanguage = strings.default;
var currentLanguage = defaultLanguage;
var text = strings.languages[defaultLanguage];

function selectLanguage(newLanguage) {
  text = strings.languages[newLanguage];
  currentLanguage = newLanguage;
}

export {
  availableLanguages,
  defaultLanguage,
  currentLanguage,
  text,
  selectLanguage,
};
