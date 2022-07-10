import { combineReducers, createStore } from '@reduxjs/toolkit';
import { contactsReducer } from './redux-contacts';
import { languageReducer } from './redux-language';

import { defaultLanguage } from 'components/LanguageProvider';

import { loadFromStorage, saveToStorage } from 'helpers/localStorage';

const defaultStore = {
  contacts: {
    items: [],
    filter: '',
  },
  language: defaultLanguage,
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
  language: languageReducer,
});

const store = createStore(rootReducer, loadFromStorage(null, defaultStore));
export default store;

store.subscribe(() => {
  saveToStorage(null, store.getState());
});
