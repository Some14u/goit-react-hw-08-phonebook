import PropTypes from "prop-types";
import s from "./Contact.module.css";
import { useLanguagesContext } from "components/LanguageProvider";
import { connect } from "react-redux";
import { removeContact } from "redux/redux-contacts";


function Contact({ id, idx, isFiltered, name, phoneNumber, removeContact }) {
  const itemClass = s.item + (!isFiltered ? " " + s.itemFilteredOut : "");
  const { text } = useLanguagesContext();

  return (
    <li className={itemClass} style={{"--top": idx * 40 + "px"}}>
      <div className={s.wrapper} >
        {name}: {phoneNumber}
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
  phoneNumber: PropTypes.string.isRequired,
  removeContact: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  removeContact: (id) => dispatch(removeContact(id)),
});

export default connect(null, mapDispatchToProps)(Contact);