import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from './authSlice';

export const contactsSliceTag = 'contacts';

const connectionsApi = createApi({
  reducerPath: 'connectionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, api) => {
      const state = api.getState();
      const token = selectToken(state);
      if (!token) return headers;
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [contactsSliceTag],
  endpoints: () => ({}), // This is populated in dedicated slices by injection
});

export default connectionsApi;
export const { resetApiState } = connectionsApi.util;
