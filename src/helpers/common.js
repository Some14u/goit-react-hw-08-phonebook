import { useReducer } from 'react';
import { loadFromStorage, saveToStorage } from './localStorage';

export const randomInRange = range => Math.floor(Math.random() * range);
export const randomItem = list => list[randomInRange(list.length)];

function filterReducer(_, newFilter) {
  saveToStorage('filter', newFilter);
  return newFilter;
}

export function useFilter() {
  return useReducer(filterReducer, loadFromStorage('filter', ''));
}
