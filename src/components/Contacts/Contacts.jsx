import { useMemo } from "react";
import { useFetchContacts } from "redux/contactsSlice";

import Contact from "./Contact/Contact";
import Loader from "components/Loader";
import Filter from "components/Filter";

import { useLanguagesContext } from "components/LanguageProvider";
import { useFilter } from "helpers/common";


export default function Contacts() {
  const { text } = useLanguagesContext();
  const [contacts, loaded] = useFetchContacts();
  const [filter, setFilter] = useFilter();

  // extra contains each element by id with calculated y-index based on filtered status
  const extra = useMemo(() => {
    if (!contacts) return;
    const normalizedFilter = filter.trim().toLowerCase();
    let [extra, filteredCounter, unfilteredCounter] = [{}, 0, 0];
    contacts.forEach(({ createdAt:id, name }) => {
      const isFiltered = name.toLowerCase().includes(normalizedFilter);
      extra[id] = { isFiltered, idx: isFiltered ? filteredCounter++ : unfilteredCounter++ };
    });
    Object.values(extra) // unfiltered should be shifted down by filtered amount
      .filter(item => !item.isFiltered)
      .forEach(item => item.idx += filteredCounter);
    return extra;
  }, [contacts, filter]);

  if (!loaded) return <Loader/>;
  return (
    <>
      <h2>{text.contacts}</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <ul>
        {
          contacts.map(({ createdAt, id, ...restProps }) =>
          <Contact
            key={createdAt}
            id={id}
            idx={extra[createdAt].idx}
            isFiltered={extra[createdAt].isFiltered}
            {...restProps}
          />)
        }
      </ul>
    </>
  );
}