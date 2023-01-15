import { configureStore } from '@reduxjs/toolkit';
import connectionsApi from 'redux/connectionsApi';
import authSlice from './authSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import authWebStorage from './authWebStorage';

const authPersistConfig = {
  key: authSlice.name,
  storage: authWebStorage,
  whitelist: ['token'],
};

const store = configureStore({
  reducer: {
    [connectionsApi.reducerPath]: connectionsApi.reducer,
    [authSlice.name]: persistReducer(authPersistConfig, authSlice.reducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(connectionsApi.middleware),
  // devTools: true,
});

export default store;
export const persistor = persistStore(store);
