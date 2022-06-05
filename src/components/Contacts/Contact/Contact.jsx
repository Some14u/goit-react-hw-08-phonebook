import PropTypes from "prop-types";

export default function Contact({ id, name, number, removeContact }) {
  return (
    <li className="contacts__item">
      {name}: {number}
      <button onClick={ e => removeContact(id) }>Delete</button>
    </li>
  );
}

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  removeContact: PropTypes.func.isRequired,
}