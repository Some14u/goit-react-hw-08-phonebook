import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import contactsApi from 'redux/contactsApiSlice';
import { editContactValidators, emptyContact } from './form';
import { useActionFromMutationsByMode, useTrapFocus } from 'helpers/hooks';
import ControlledMuiTextField from 'components/ControlledTextField';
import { buildResolver } from 'helpers/misc';
import PropTypes from 'prop-types';

const EditContactFormModes = [
  contactsApi.endpoints.addContact.name,
  contactsApi.endpoints.editContact.name,
];

const EditContactForm = ({ contact = emptyContact, mode, hideForm }) => {
  const action = useActionFromMutationsByMode(
    EditContactFormModes,
    contactsApi,
    mode
  );

  const { data: contacts } = contactsApi.useGetContactsQuery();

  const formContext = useForm({
    defaultValues: contact,
    mode: 'onChange',
    resolver: buildResolver(editContactValidators, {
      contacts,
      id: contact.id,
    }),
  });

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = formContext;

  const trapFocus = useTrapFocus();

  /**
   *  Required as a substitution to autoFocus on the first field,
   *  because autoFocus messes with the surrounding Collapse component,
   *  making the form awkwardly jitter during the unfolding phase.
   */
  useEffect(() => {
    setTimeout(() => {
      trapFocus.firstRef?.current?.focus?.();
    }, 100); // 100 is enough for the first input to be shown
  }, [trapFocus.firstRef]);

  const onSubmit = async contact => {
    try {
      await action.apply(contact).unwrap();
    } catch (error) {
      // There is no apiErrors for this case yet
      //if (error.status === 400) processApiErrors(error);
      throw new Error(error);
    }
    hideForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={action.isLoading}>
        <Stack spacing={2} mt={1} mb={2}>
          <ControlledMuiTextField
            control={control}
            name="name"
            label="Name"
            size="small"
            fullWidth
            autoComplete="off"
            // autoFocus={true}
            onKeyDown={trapFocus.onKeyDown}
            ref={trapFocus.firstRef}
          />
          <ControlledMuiTextField
            control={control}
            name="number"
            label="Phone number"
            size="small"
            type="tel"
            fullWidth
            autoComplete="off"
          />
        </Stack>
      </fieldset>

      <Stack spacing={2} direction="row" mb={1}>
        <LoadingButton
          size="medium"
          type="submit"
          variant="contained"
          disabled={action.isLoading || !isValid}
          loading={action.isLoading}
          fullWidth
        >
          {mode === contactsApi.endpoints.editContact.name ? 'Save' : 'Add'}
        </LoadingButton>
        <Button
          size="medium"
          variant="contained"
          onClick={hideForm}
          onKeyDown={trapFocus.onKeyDown}
          ref={trapFocus.lastRef}
          fullWidth
        >
          Cancel
        </Button>
      </Stack>
    </form>
  );
};

EditContactForm.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  mode: PropTypes.oneOf(EditContactFormModes).isRequired,
  hideForm: PropTypes.func.isRequired,
};

export default EditContactForm;
