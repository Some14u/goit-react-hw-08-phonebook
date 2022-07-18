import PropTypes from "prop-types";
import s from "./Filter.module.css";
import { useLanguagesContext } from "components/LanguageProvider";


export default function Filter({filter, setFilter}) {
  const { text } = useLanguagesContext();
  return (
    <label className={s.label} htmlFor="filter">
      {text.findByName}
      <input
        className={s.input}
        type="search"
        name="filter"
        id="filter"
        value={filter}
        onChange={ e => setFilter(e.target.value) } />
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
}