import storage from 'redux-persist/lib/storage';
import authSlice from './authSlice';
import store from './store';
import userApiSlice from './userApiSlice';

const authWebStorage = {
  getItem: async key =>
    storage.getItem(key).then(value => requestCredentials(value)),
  setItem: storage.setItem,
  removeItem: storage.removeItem,
};

/** This is an injection hack. It suppose to be injected into getItem webStorage to
 *  request user credentials right after redux-persist obtains the persisted token (if any).
 */
const requestCredentials = async value => {
  // Redux-persist stores data double-jsoned for consistency
  const token = JSON.parse(JSON.parse(value).token);
  if (!token) return value;

  // Manually set store token value to initiate api bearer header (see connectionsApi).
  // This thing should be done by redux-persist itself, but at this point
  // it isn't yet initiated, and I haven't found any other ways to inject
  // asynchronously right after redux-persist would initiate the value in the store
  store.dispatch(authSlice.actions.setCredentials({ token }));

  try {
    // Request credentials now
    const promise = await store.dispatch(
      userApiSlice.endpoints.refresh.initiate()
    );

    if (promise.isError) return value;

    // Manually set user again because previous request
    store.dispatch(
      authSlice.actions.setCredentials({ user: { ...promise.data }, token })
    );

    promise.unsubscribe();
  } finally {
    return value;
  }
};

export default authWebStorage;
