import s from "./Filter.module.css";
import { nanoid } from "nanoid";
import { useLanguagesContext } from "components/LanguageProvider";
import { useContacts } from "redux/contacts-slice";

const filterLabelId = nanoid();

export default function Filter() {
  const { filter, setFilter } = useContacts({ trackContacts: false });
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