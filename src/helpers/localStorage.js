export const storageKey = process.env.PUBLIC_URL.replace('/', '') + '_';

export function saveToStorage(key, value) {
  localStorage.setItem(storageKey + key, JSON.stringify(value));
}
export function loadFromStorage(key, defaultValue) {
  const data = localStorage.getItem(storageKey + key);
  return data ? JSON.parse(data) : defaultValue;
}
