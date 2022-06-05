import PropTypes from "prop-types";
import Contact from "./Contact/Contact";

export default function Contacts({ contacts, filter, removeContact }) {
  filter = filter.toLowerCase();
  return (
    <ul className="contacts__list">
      {
        contacts
          .filter(({ name }) => name.toLowerCase().includes(filter))
          .map(({ id, ...restProps }) => <Contact key={id} id={id} removeContact={removeContact} {...restProps} />)
      }
    </ul>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  filter: PropTypes.string.isRequired,
  removeContact: PropTypes.func.isRequired,
}