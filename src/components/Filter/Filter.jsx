import PropTypes from "prop-types";
import { nanoid } from "nanoid";

const filterLabelId = nanoid();

export default function Filter({ filter, updateFilterState }) {
  return (
    <label className="phonebook__label" htmlFor={filterLabelId}>
      Find contacts by name
      <input
        className="phonebook__input"
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