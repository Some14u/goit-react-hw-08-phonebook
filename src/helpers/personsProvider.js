import persons from './persons.json';
import { currentLanguage } from './languageManager';

const randomInRange = range => Math.floor(Math.random() * range);
const randomItem = list => list[randomInRange(list.length)];

function generateName() {
  const language = currentLanguage;
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const node = persons[language][gender];
  return randomItem(node.first) + ' ' + randomItem(node.last);
}

function generatePhone() {
  const language = currentLanguage;
  const mask = randomItem(persons[language].phoneMasks);
  return [...mask]
    .map(token => (token === 'x' ? randomInRange(10) : token))
    .join('');
}

export { generateName, generatePhone };
