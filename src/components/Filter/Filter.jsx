import PropTypes from "prop-types";
import s from "./Filter.module.css";
import { nanoid } from "nanoid";
import { text } from "helpers/languageManager";

const filterLabelId = nanoid();

export default function Filter({ filter, updateFilterState }) {
  return (
    <label className={s.label} htmlFor={filterLabelId}>
      {text.findByName}
      <input
        className={s.input}
        type="search"
        name="filter"
        id={filterLabelId}
        value={filter}
        onChange={ e => updateFilterState(e.target.value) } />
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  updateFilterState: PropTypes.func.isRequired,
}

