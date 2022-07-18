import PropTypes from "prop-types";
import s from "./Contact.module.css";
import { useLanguagesContext } from "components/LanguageProvider";
import { useDeleteContact } from "redux/contactsSlice";
import { useMemo } from "react";


export default function Contact({ id, idx, isFiltered, name, phone }) {
  const [deleteContact] = useDeleteContact();
  const { text } = useLanguagesContext();

  const itemClass = useMemo(() => {
    return s.item + (!isFiltered ? " " + s.itemFilteredOut : "")
  }, [isFiltered]);
  return (
    <li className={itemClass} style={{"--top": idx * 40 + "px"}}>
      <div className={s.wrapper} >
        <span>{name}: {phone}</span>
        <button className={s.deleteBtn} type="button" onClick={() => deleteContact(id)}>{text.deleteContact}</button>
      </div>
    </li>
  );
}

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
}

