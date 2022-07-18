import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { getLanguage } from './selectors';
import { loadFromStorage, saveToStorage } from 'helpers/localStorage';
import { getDefaultLanguage } from 'components/LanguageProvider/LanguageProvider';

// Slice

const languageSlice = createSlice({
  name: 'language',
  initialState: loadFromStorage('language', getDefaultLanguage()),
  reducers: {
    selectLanguage: (_, { payload: language }) => {
      saveToStorage('language', language);
      return language;
    },
  },
});

export default languageSlice.reducer;

// Hooks

export function useLanguage() {
  const dispatch = useDispatch();
  return [
    useSelector(getLanguage),
    language => dispatch(languageSlice.actions.selectLanguage(language)),
  ];
}
