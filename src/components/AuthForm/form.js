import { buildResolver } from 'helpers/misc';
import { useReducer } from 'react';
import userApiSlice from 'redux/userApiSlice';

const authValidators = {
  setValueAs: value => value.trim().replace(/\s+/g, ' '),
  postprocessFn: (res, { mode }) => {
    if (mode !== userApiSlice.endpoints.register.name) delete res.errors.name;
  },
  name: {
    emptyField: value => value === '' && 'Please enter your name here',
  },
  email: {
    emptyField: value => value === '' && 'Please enter your email here',
    invalidEmail: value =>
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value) &&
      'Please enter a valid email',
  },
  password: {
    emptyField: value => value === '' && 'You should enter your password here',
    invalidPassword: value =>
      !/^[\w~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?\\/]+$/i.test(value) &&
      'Only engish letters, numbers and basic special symbols allowed',
    shortPassword: value =>
      value.length < 7 && 'Password length must be at least 7 characters',
    passwordContainsPassword: value =>
      /password/i.test(value) && 'Password cannot contain word "password"',
  },
};

/** Converts api error response to more consistent form */
const convertApiError = error => {
  if (Object.keys(error.data).length === 0) {
    // login auth failed
    return [
      {
        element: 'email',
        message: 'Authentication failed, check email',
      },
      {
        element: 'password',
        message: 'Authentication failed, check password',
      },
    ];
  } else if (error.data.keyPattern?.email) {
    // occupied email
    return [
      {
        element: 'email',
        message: 'This email has already been taken by another person',
      },
    ];
  } else if (error.data.errors) {
    const errorsList = Object.entries(error.data.errors).map(
      ([element, { message }]) => ({ element, message })
    );
    // All possible unhandled server errors
    return errorsList;
  }
  return [];
};

const authErrorReducer = (old, action) => {
  switch (action.type) {
    case 'clearField':
      return [...old.filter(item => item.element !== action.name)];
    case 'processApiError':
      return convertApiError(action.error);
    case 'clear':
    default:
      return [];
  }
};
const useAuthError = () => {
  const [value, dispatch] = useReducer(authErrorReducer, []);
  return { value, dispatch };
};

const defaultValues = {
  name: '',
  email: '',
  password: '',
};

const buildFormProps = mode => ({
  defaultValues,
  mode: 'onChange',
  resolver: buildResolver(authValidators, { mode }),
});

export { buildFormProps, useAuthError };
