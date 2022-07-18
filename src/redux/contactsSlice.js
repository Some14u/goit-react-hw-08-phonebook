import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getContactsLoaded } from './selectors';
import { useEffect } from 'react';

// Thunks

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { extra: api }) => {
    const response = await api.getContacts();
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, { extra: api }) => {
    const response = await api.addContact(data);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (data, { extra: api }) => {
    const response = await api.deleteContact(data);
    return response.data;
  }
);

// Slice

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], loaded: false },
  reducers: {},
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.loaded = false;
    },
    [fetchContacts.rejected]: (state, { error }) => {
      state.loaded = true;
    },
    [fetchContacts.fulfilled]: (state, { payload }) => {
      state.items = payload;
      state.loaded = true;
    },
    [addContact.pending]: (state, { meta }) => {
      // working with pending to improve responce
      const data = { ...meta.arg, id: meta.requestId }; // mock up an id temporarely
      state.items.push(data);
    },
    [addContact.fulfilled]: (state, { meta, payload }) => {
      // substitute mocked id to the real one
      const item = state.items.find(item => item.id === meta.requestId);
      item.id = payload.id;
    },
    [deleteContact.pending]: (state, { meta }) => {
      // working with pending to improve responce
      state.items = state.items.filter(({ id }) => id !== meta.arg.id);
    },
  },
});

export default contactsSlice.reducer;

// Hooks

export function useFetchContacts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return [useSelector(getContacts), useSelector(getContactsLoaded)];
}

export function useAddContact() {
  const dispatch = useDispatch();
  return [
    useSelector(getContacts),
    (name, phone, createdAt) =>
      dispatch(addContact({ name, phone, createdAt })),
  ];
}

export function useDeleteContact() {
  const dispatch = useDispatch();
  return [id => dispatch(deleteContact({ id }))];
}
