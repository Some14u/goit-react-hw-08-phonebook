import PropTypes from "prop-types";
import s from "./Contact.module.css";
import { text } from "helpers/languageManager";


export default function Contact({ id, idx, isFiltered, name, number, removeContact }) {
  const itemClass = s.item + (!isFiltered ? " " + s.itemFilteredOut : "");
  return (
    <li className={itemClass} style={{"--top": idx * 40 + "px"}}>
      <div className={s.wrapper} >
        {name}: {number}
        <button className={s.deleteBtn} type="button" onClick={e => removeContact(id)}>{text.deleteContact}</button>
      </div>
    </li>
  );
}

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  removeContact: PropTypes.func.isRequired,
}