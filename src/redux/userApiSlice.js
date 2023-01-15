import connectionsApi from './connectionsApi';

const userApiSlice = connectionsApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: credentials => ({
        url: '/users/signup',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: '/users/current',
      }),
    }),
  }),
});

export default userApiSlice;
export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useRefreshQuery } =
  userApiSlice;
