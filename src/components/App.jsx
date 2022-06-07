import React from "react";

import Contacts from "./Contacts";
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import { nanoid } from "nanoid";
import LanguageToggle from "./LanguageToggle";
import { defaultLanguage, availableLanguages, changeLanguage, text } from "helpers/languageManager";



export class App extends React.Component {
  state = {
    contacts: [],
    filter: "",
    currentLanguage: defaultLanguage,
  }

  contactExists = searchName => this.state.contacts.some(({name}) => name === searchName);

  addContact = ({ name, number }) => { // Returns true only on successfull insert
    if (this.contactExists(name)) {
      alert(name + text.alreadyInContacts);
      return;
    }
    this.setState(oldState => {
      const contacts = [ ...oldState.contacts ];
      contacts.push({ name, number, id: nanoid() });
      return { contacts };
    });
    return true;
  }

  removeContact = idToDelete => {
    this.setState(oldState => {
      const contacts = oldState.contacts.filter(({ id }) => id !== idToDelete);
      return { contacts };
    });
  }

  updateFilterState = filter => this.setState({ filter });

  onChangeLanguage = newLanguage => {
    changeLanguage(newLanguage);
    this.setState({ currentLanguage: newLanguage });
  }

  render() {
    const { contacts, filter, currentLanguage } = this.state;
    return (
      <div>
        <h1>{text.phoneBook}</h1>
        <ContactForm addContact={this.addContact} />
        
        <h2>{text.contacts}</h2>
        <Filter filter={filter} updateFilterState={this.updateFilterState} />
        <Contacts contacts={contacts} filter={filter} removeContact={this.removeContact} />
        <LanguageToggle
          languagesList={availableLanguages}
          initialLanguage={currentLanguage}
          changeLanguage={ this.onChangeLanguage }
        />
      </div>
    )
  };
}

