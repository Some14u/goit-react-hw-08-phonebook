import { nanoid } from 'nanoid';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { conditionalEquality } from 'helpers/common';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], filter: '' },
  reducers: {
    addContact({ items }, { payload }) {
      const newContact = {
        name: payload.name,
        phoneNumber: payload.phoneNumber,
        id: nanoid(),
      };
      items.push(newContact);
    },
    removeContact(state, { payload }) {
      state.items = state.items.filter(({ id }) => id !== payload.id);
    },
    setFilter(state, { payload }) {
      state.filter = payload;
    },
  },
});

export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;

export const { addContact, removeContact, setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;

export const useContacts = ({
  trackContacts = true,
  trackFilter = true,
} = {}) => {
  const dispatch = useDispatch();
  const result = {
    addContact: (name, phoneNumber) =>
      dispatch(contactsSlice.actions.addContact({ name, phoneNumber })),
    removeContact: id => dispatch(removeContact({ id })),
    setFilter: text => dispatch(setFilter(text)),
  };
  const contacts = useSelector(getContacts, conditionalEquality(trackContacts));
  const filter = useSelector(getFilter, conditionalEquality(trackFilter));
  if (trackContacts) result.contacts = contacts;
  if (trackFilter) result.filter = filter;
  return result;
};
