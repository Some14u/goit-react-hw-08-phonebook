import { Container } from '@mui/material';
import ContactsList from 'components/ContactsList';
import ContactsToolBar from 'components/ContactsToolBar';

const Contacts = () => {
  return (
    <>
      <ContactsToolBar />
      <Container>
        <ContactsList />
      </Container>
    </>
  );
};

export default Contacts;
