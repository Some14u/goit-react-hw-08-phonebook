import {
  isPending,
  isFulfilled,
  isRejected,
  createSlice,
} from '@reduxjs/toolkit';

export const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  ERROR: 'error',
};

const asyncStatusSlice = createSlice({
  name: 'asyncStatus',
  initialState: { status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isPending, () => ({ status: status.PENDING }))
      .addMatcher(isFulfilled, () => ({ status: status.IDLE }))
      .addMatcher(isRejected, (_, { error }) => ({
        status: status.ERROR,
        error,
      }));
  },
});

export default asyncStatusSlice.reducer;
