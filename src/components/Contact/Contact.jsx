import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
} from '@mui/material';
import { useBoolean, useFocus } from 'helpers/hooks';
import contactsApiSlice, {
  useDeleteContactMutation,
} from 'redux/contactsApiSlice';
import EditContactForm from 'components/EditContactForm';
import Buttons from './Buttons';
import { spaceToNonbreaking } from './misc';
import * as sx from './sx';
import PropTypes from 'prop-types';

const Contact = ({ contact = { name: '', number: '' } }) => {
  const selected = useBoolean();
  const editFormVisibility = useBoolean();
  const [contactBaseRef, focusOnThisContactBase] = useFocus();

  const [
    deleteContact,
    { isSuccess: isDeleteSuccess, isLoading: isDeleteLoading },
  ] = useDeleteContactMutation();

  const handleDeleteButton = () => {
    deleteContact(contact.id);
  };

  /** Ensures that the form will be closed when the focus is lost */
  const onBlur = event => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    editFormVisibility.setFalse();
    selected.setFalse();
  };

  const hideEditForm = () => {
    editFormVisibility.setFalse();
    focusOnThisContactBase();
  };

  const focusEditContactsDialog = () => {
    contactBaseRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  return (
    <ListItem disablePadding>
      <Paper sx={sx.paper(selected.isTrue)}>
        <ListItemButton
          onFocus={selected.setTrue}
          onBlur={onBlur}
          ref={contactBaseRef}
          sx={sx.button(selected.isTrue)}
          disableRipple
        >
          <Stack width={'100%'}>
            <Collapse
              in={editFormVisibility.isTrue}
              onEntered={focusEditContactsDialog}
              unmountOnExit
            >
              <EditContactForm
                contact={contact}
                mode={contactsApiSlice.endpoints.editContact.name}
                hideForm={hideEditForm}
              />
            </Collapse>
            <Collapse in={editFormVisibility.isFalse}>
              <Stack direction={'row'} alignItems={'center'}>
                <ListItemText
                  id={`contact${contact.id}`}
                  sx={sx.text}
                  primary={`${contact.name}: ${spaceToNonbreaking(
                    contact.number
                  )}`}
                />
                {selected.isTrue && (
                  <Buttons
                    toggleVisibility={editFormVisibility.toggle}
                    handleDeleteButton={handleDeleteButton}
                    isDeleteLoading={isDeleteLoading}
                    isDeleteSuccess={isDeleteSuccess}
                  />
                )}
              </Stack>
            </Collapse>
          </Stack>
        </ListItemButton>
      </Paper>
    </ListItem>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};

export default Contact;
