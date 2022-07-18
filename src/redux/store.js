import { configureStore } from '@reduxjs/toolkit';
import contacts from './contactsSlice';
import language from './languageSlice';
import loading from './asyncStatusSlice';
import mockApi from 'helpers/mockApi';

const store = configureStore({
  reducer: { contacts, language, loading },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: { extraArgument: mockApi },
    }),
});

if (process.env.NODE_ENV !== 'production') {
  store.subscribe(() => {
    console.log('Store changed:', store.getState());
  });
}

export default store;
