import store from 'redux/store';
import { redirect } from 'react-router-dom';
import { resetApiState } from 'redux/connectionsApi';
import userApiSlice from 'redux/userApiSlice';
import authSlice, { selectToken, selectUser } from 'redux/authSlice';

/** Logouts user if there is a token, and redirects to /login endpoint */
const logout = async () => {
  const state = store.getState();
  const token = selectToken(state);

  if (token) {
    const promise = store.dispatch(userApiSlice.endpoints.logout.initiate());
    try {
      await promise.unwrap();
      store.dispatch(authSlice.actions.clearCredentials());
      store.dispatch(resetApiState);
    } catch (error) {
      throw new Error(error);
    }
  }

  return redirect('/login');
};

const authGateModes = {
  authorizedOnly: 'authorizedOnly',
  unauthorizedOnly: 'unauthorizedOnly',
};

const authGate = (mode, fallbackEndpoint) => () => {
  const state = store.getState();
  const user = selectUser(state);
  if (!!user && mode === authGateModes.unauthorizedOnly) return redirect(fallbackEndpoint || '/');
  if (!user && mode === authGateModes.authorizedOnly) return redirect(fallbackEndpoint || '/login');
  return true;
};

authGate.modes = authGateModes;

export { logout, authGate };
