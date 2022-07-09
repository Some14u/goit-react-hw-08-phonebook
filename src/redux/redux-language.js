export const getLanguage = state => state.language;

export const languageActions = {
  SELECT_LANGUAGE: 'selectLanguage',
};

export const selectLanguage = language => ({
  type: languageActions.SELECT_LANGUAGE,
  payload: language,
});

export const languageReducer = (state = '', action) => {
  switch (action.type) {
    case languageActions.SELECT_LANGUAGE:
      return action.payload;
    default:
      return state;
  }
};
