import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { conditionalEquality } from 'helpers/common';

export const getLanguage = state => state.language;

const languageSlice = createSlice({
  name: 'language',
  initialState: '',
  reducers: {
    selectLanguage: (_, action) => action.payload,
  },
});

export const { selectLanguage } = languageSlice.actions;
export default languageSlice.reducer;

export const useLanguage = ({ trackLanguage = true } = {}) => {
  const dispatch = useDispatch();
  const result = {
    selectLanguage: language => dispatch(selectLanguage(language)),
  };
  const language = useSelector(getLanguage, conditionalEquality(trackLanguage));
  if (trackLanguage) result.language = language;
  return result;
};
