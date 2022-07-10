import { configureStore } from '@reduxjs/toolkit';
import contacts from './contacts-slice';
import language from './language-slice';

import { defaultLanguage } from 'components/LanguageProvider';
import { loadFromStorage, saveToStorage } from 'helpers/localStorage';

const defaultState = {
  contacts: {
    items: [],
    filter: '',
  },
  language: defaultLanguage,
};

const store = configureStore({
  reducer: { contacts, language },
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: loadFromStorage(null, defaultState),
});

store.subscribe(() => {
  saveToStorage(null, store.getState());
});

export default store;
