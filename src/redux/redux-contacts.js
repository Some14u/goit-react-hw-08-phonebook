import { nanoid } from 'nanoid';

export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;

export const contactsActions = {
  ADD_CONTACT: 'contacts/addContact',
  REMOVE_CONTACT: 'contacts/removeContact',
  SET_FILTER: 'contacts/setFilter',
};

export const addContact = (name, phoneNumber) => ({
  type: contactsActions.ADD_CONTACT,
  payload: { name, phoneNumber },
});

export const removeContact = id => ({
  type: contactsActions.REMOVE_CONTACT,
  payload: { id },
});

export const setFilter = text => ({
  type: contactsActions.SET_FILTER,
  payload: text,
});

export const contactsReducer = (state = { items: [], filter: '' }, action) => {
  switch (action.type) {
    case contactsActions.ADD_CONTACT:
      const newContact = {
        name: action.payload.name,
        phoneNumber: action.payload.phoneNumber,
        id: nanoid(),
      };
      return { ...state, items: [...state.items, newContact] };
    case contactsActions.REMOVE_CONTACT:
      return {
        ...state,
        items: state.items.filter(({ id }) => id !== action.payload.id),
      };
    case contactsActions.SET_FILTER:
      console.log('SET_FILTER', state);
      const res = { ...state, filter: action.payload };
      console.log('SET_FILTER AFTER', res);
      return res;
    default:
      return state;
  }
};
