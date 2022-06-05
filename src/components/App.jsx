import React from "react";

import Contacts from "./Contacts";
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import { nanoid } from "nanoid";

export class App extends React.Component {
  state = {
    contacts: [
      // {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      // {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      // {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      // {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: "",
  }


  contactExists = searchName => this.state.contacts.some(({name}) => name === searchName);
  

  addContact = ({ name, number }) => {
    if (this.contactExists(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState(oldState => {
      const contacts = [ ...oldState.contacts ];
      contacts.push({ name, number, id: nanoid() });
      return { contacts };
    });
  }

  removeContact = idToDelete => {
    this.setState(oldState => {
      const contacts = oldState.contacts.filter(({ id }) => id !== idToDelete);
      return { contacts };
    });
  }

  updateFilterState = filter => this.setState({ filter });


  render() {
    const { contacts, filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        
        <h2>Contacts</h2>
        <Filter filter={filter} updateFilterState={this.updateFilterState} />
        <Contacts contacts={contacts} filter={filter} removeContact={this.removeContact} />
      </div>
    )
  };
}

