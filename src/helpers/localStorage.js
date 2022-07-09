export const storageKey = process.env.PUBLIC_URL.replace('/', '');

export function saveToStorage(key, value) {
  if (key && storageKey) key = '_' + key;
  localStorage.setItem(storageKey || '' + key || '', JSON.stringify(value));
}
export function loadFromStorage(key, defaultValue) {
  if (key && storageKey) key = '_' + key;
  const data = localStorage.getItem(storageKey || '' + key || '');
  return data ? JSON.parse(data) : defaultValue;
}
