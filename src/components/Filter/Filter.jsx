import PropTypes from "prop-types";
import s from "./Filter.module.css";
import { nanoid } from "nanoid";
import { useLanguagesContext } from "../LanguageProvider";

const filterLabelId = nanoid();

export default function Filter({ filter, updateFilterState }) {
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
        onChange={ e => updateFilterState(e.target.value) } />
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  updateFilterState: PropTypes.func.isRequired,
}

