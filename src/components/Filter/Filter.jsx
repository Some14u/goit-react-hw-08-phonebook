import PropTypes from "prop-types";
import s from "./Filter.module.css";
import { nanoid } from "nanoid";
import { useLanguagesContext } from "../LanguageProvider";

import { connect } from "react-redux";
import { getFilter, setFilter } from "redux/redux-contacts";
const filterLabelId = nanoid();

function Filter({ filter, setFilter }) {
  const { text } = useLanguagesContext();
  return (
    <label className={s.label} htmlFor={filterLabelId}>
      {text.findByName}
      <input
        className={s.input}
        type="search"
        name="filter"
        id={filterLabelId}
        value={filter}
        onChange={ e => setFilter(e.target.value) } />
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  filter: getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  setFilter: text => dispatch(setFilter(text)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Filter);