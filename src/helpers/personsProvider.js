import persons from 'resources/persons.json';
import { randomInRange, randomItem } from './common';

export function generateName(language) {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const node = persons[language][gender];
  return randomItem(node.first) + ' ' + randomItem(node.last);
}

export function generatePhone(language) {
  const mask = randomItem(persons[language].phoneMasks);
  return [...mask]
    .map(token => (token === 'x' ? randomInRange(10) : token))
    .join('');
}
