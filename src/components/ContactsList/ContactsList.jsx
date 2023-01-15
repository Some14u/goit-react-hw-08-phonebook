import { Collapse, List } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { useGetContactsQuery } from 'redux/contactsApiSlice';
import { filterSearchParameterName } from 'components/ContactsFilter/ContactsFilter';
import Contact from 'components/Contact';
import Loading from 'components/LoadingText';
import * as sx from './sx';

const ContactsList = () => {
  const contacts = useGetContactsQuery();

  const [searchParams] = useSearchParams();
  const filter = searchParams.get(filterSearchParameterName);

  if (contacts.isError) throw new Error(contacts.error);
  if (contacts.isLoading) return <Loading />;

  const filterFn = contact =>
    filter ? contact.name.trim().toLowerCase().includes(filter) : true;

  return (
    <List sx={sx.list}>
      <TransitionGroup>
        {contacts.data.filter(filterFn).map(contact => (
          <Collapse key={contact.id}>
            <Contact contact={contact} />
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  );
};

export default ContactsList;
