import { useEffect, useState, useRef } from "react";

import Contacts from "./Contacts";
import ContactForm from "./ContactForm";
import LanguageToggle from "./LanguageToggle";
import Filter from "./Filter";
import { useLanguagesContext } from "./LanguageProvider";
import { loadFromStorage, saveToStorage } from "helpers/localStorage";

import { nanoid } from "nanoid";


export function App() {
  const [contacts, setContacts] = useState(loadFromStorage("contacts", []));
  const [filter, setFilter] = useState("");
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) return;
    saveToStorage("contacts", contacts);
  }, [contacts]);

  useEffect(() => { isMounted.current = true }, []);

  function contactExists (searchName) {
    searchName = searchName.toLowerCase();
    return contacts.some(({ name }) => name.toLowerCase() === searchName);
  }

  function addContact ({ name, number }) { // Returns true only after successfull insert
    if (contactExists(name)) {
      alert(name + text.alreadyInContacts);
      return;
    }
    const newContact = { name, number, id: nanoid() };
    setContacts(oldContacts => [...oldContacts, newContact]);
    return true;
  }

  function removeContact (idToDelete) {
    setContacts(oldContacts => oldContacts.filter(({ id }) => id !== idToDelete));
  }

  const { text } = useLanguagesContext();
  return (
    <div>
      <h1>{text.phoneBook}</h1>
      <ContactForm addContact={addContact} />
      <h2>{text.contacts}</h2>
      <Filter filter={filter} updateFilterState={setFilter} />
      <Contacts contacts={contacts} filter={filter} removeContact={removeContact} />
      <LanguageToggle/>
    </div>
  );
}



