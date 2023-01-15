const editContactValidators = {
  setValueAs: value => value.trim().replace(/\s+/g, ' '),
  name: {
    emptyField: value =>
      value === '' && 'Please enter the person identity here',
    exists: (value, { contacts, id }) =>
      contacts.some(
        c => c.id !== id && c.name.toLowerCase() === value.toLowerCase()
      ) && 'The person with this name is already in the book',
  },
  number: {
    emptyField: value =>
      value === '' && 'Please provide the person phone number here',
    invalidEmail: value =>
      !/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(value) &&
      'Please enter a valid phone number',
  },
};

const emptyContact = { name: '', number: '' };

export { editContactValidators, emptyContact };
