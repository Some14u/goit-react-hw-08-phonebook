import persons from './persons.json';

const randomInRange = range => Math.floor(Math.random() * range);
const randomItem = list => list[randomInRange(list.length)];

function generateName(language) {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const node = persons[language][gender];
  return randomItem(node.first) + ' ' + randomItem(node.last);
}

function generatePhone(language) {
  const mask = randomItem(persons[language].phoneMasks);
  return [...mask]
    .map(token => (token === 'x' ? randomInRange(10) : token))
    .join('');
}

export { generateName, generatePhone };
