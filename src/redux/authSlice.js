const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    clearCredentials: state => {
      state.user = null;
      state.token = null;
    },
  },
});

export default authSlice;

export const { setCredentials, clearCredentials } = authSlice.actions;
export const selectUser = state => state.auth.user;
export const selectToken = state => state.auth.token;
