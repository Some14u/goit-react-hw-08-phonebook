import { Box, Collapse, Container, Fab, Toolbar, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Stack } from '@mui/system';

import EditContactForm from 'components/EditContactForm';
import ContactsFilter from 'components/ContactsFilter';
import contactsApiSlice from 'redux/contactsApiSlice';

import { useBoolean, useFocus } from 'helpers/hooks';
import * as sx from './sx';

const ContactsToolBar = () => {
  const addFormVisibility = useBoolean();
  const [addButtonRef, focusOnAddButton] = useFocus();

  const hideAddForm = () => {
    addFormVisibility.setFalse();
    focusOnAddButton();
  };

  /** Ensures that the form will be closed when the focus is lost */
  const onAddFormBlur = event => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    addFormVisibility.setFalse();
  };

  return (
    <Box sx={sx.box}>
      <Container>
        <Toolbar sx={sx.spacerToolBar} />
        <Collapse
          in={addFormVisibility.isTrue}
          unmountOnExit
          onBlur={onAddFormBlur}
        >
          <EditContactForm
            mode={contactsApiSlice.endpoints.addContact.name}
            hideForm={hideAddForm}
          />
        </Collapse>
        <Collapse in={addFormVisibility.isFalse}>
          <Stack direction="row" spacing={1} alignItems="center">
            <ContactsFilter />
            <Tooltip title="Add a new person">
              <Fab
                size="small"
                color="primary"
                onClick={addFormVisibility.setTrue}
                sx={sx.fabShrinkFix}
                ref={addButtonRef}
              >
                <Add size="large" />
              </Fab>
            </Tooltip>
          </Stack>
        </Collapse>
      </Container>
    </Box>
  );
};

export default ContactsToolBar;
