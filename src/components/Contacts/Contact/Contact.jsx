import PropTypes from "prop-types";
import s from "./Contact.module.css";
import { useLanguagesContext } from "components/LanguageProvider";
import { useContacts } from "redux/contacts-slice";

export default function Contact({ id, idx, isFiltered, name, phoneNumber }) {
  const { removeContact } = useContacts({ trackContacts: false, trackFilter: false });
  const { text } = useLanguagesContext();

  const itemClass = s.item + (!isFiltered ? " " + s.itemFilteredOut : "");

  return (
    <li className={itemClass} style={{"--top": idx * 40 + "px"}}>
      <div className={s.wrapper} >
        {name}: {phoneNumber}
        <button className={s.deleteBtn} type="button" onClick={() => removeContact(id)}>{text.deleteContact}</button>
      </div>
    </li>
  );
}

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
}

