import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from 'mui/theme';

import React from 'react';
import ReactDOM from 'react-dom/client';
import store, { persistor } from 'redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';


import AppRouter from 'components/AppRouter';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  /* </React.StrictMode> */
);
