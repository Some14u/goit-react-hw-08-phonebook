import { Collapse, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from 'redux/authSlice';
import userApi from 'redux/userApiSlice';
import { buildFormProps, useAuthError } from './form';
import { useActionFromMutationsByMode, useBoolean } from 'helpers/hooks';
import ControlledMuiInput from 'components/ControlledTextField';
import PasswordEye from './PasswordEye';
import PropTypes from "prop-types";

const AuthForm = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Provides {apply(), isLoading} object
  const action = useActionFromMutationsByMode(
    ['login', 'register'],
    userApi,
    mode
  );

  const passwordVisibility = useBoolean();
  const authError = useAuthError();

  const {
    handleSubmit,
    control,
    formState: { isValid, dirtyFields },
    trigger,
  } = useForm(buildFormProps(mode));

  // This is required to narrow the following useEffect
  const oldMode = useRef(mode);

  // Revalidates fields on switching the mode
  useEffect(() => {
    if (oldMode.current === mode) return;
    oldMode.current = mode;

    // Triggering only those fields which are dirty
    trigger(Object.keys(dirtyFields));

    // AuthErrors are always mode-specific, so just wiping them out
    authError.dispatch({ type: "clear" });
  }, [authError, dirtyFields, mode, trigger]);

  const onSubmit = async data => {
    const fromEndpoint = location.state?.from?.pathname;

    // I added this to ensure that the name remains in the original data
    const user = { ...data };
    if (mode !== 'register') delete user.name;
    try {
      // Fullfilling the request
      const credentials = await action.apply(user).unwrap();

      // Saving it to redux
      dispatch(setCredentials(credentials));

      // We're done, going to the root endpoint
      navigate(fromEndpoint || '/');
    } catch (error) {
      if (error.status === 400) authError.dispatch({ type: "processApiError", error });
      else throw new Error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={action.isLoading}>
        <Stack spacing={3} mb={4}>
          <Collapse in={mode === 'register'}>
            <ControlledMuiInput
              control={control}
              name="name"
              type="name"
              label="Your name"
              apiError={authError}
              fullWidth
              sx={{ mt: 3 }}
            />
          </Collapse>
          <ControlledMuiInput
            control={control}
            name="email"
            type="email"
            label="Email address"
            apiError={authError}
          />
          <ControlledMuiInput
            control={control}
            name="password"
            label="Password"
            type={passwordVisibility.isTrue ? 'text' : 'password'}
            apiError={authError}
            InputProps={{
              endAdornment: <PasswordEye visibility={passwordVisibility} />,
            }}
          />
        </Stack>
      </fieldset>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={action.isLoading || !isValid}
        loading={action.isLoading}
      >
        {mode}
      </LoadingButton>
    </form>
  );
};

AuthForm.propTypes = {
  mode: PropTypes.string.isRequired,
}

export default AuthForm;
