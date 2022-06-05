import React from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";




export default class ContactForm extends React.Component {
  static defaultState = { name: "", number: "" };

  constructor() { // Doing constructor to prevent eslint warning about static assignment
    super();
    this.state = { ...ContactForm.defaultState };
  }

  nameLabelId = nanoid();
  numberLabelId = nanoid();

  updateNameState = e => this.setState({ name: e.target.value });
  updateNumberState = e => this.setState({ number: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const format = str => str.trim().replace(/ +(?= )/g,''); // Removes extra spaces
    this.props.addContact({ name: format(name), number: format(number) });
    this.setState(ContactForm.defaultState);
  }

  render() {
    const { name, number } = this.state;
    return (
      <form className="phonebook__form" onSubmit={this.onSubmit}>
        <label className="phonebook__label" htmlFor={this.nameLabelId}>
          Name
          <input
            className="phonebook__input"
            type="text"
            name="name"
            id={this.nameLabelId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onInput={this.updateNameState}
          />
        </label>
        <label className="phonebook__label" htmlFor={this.numberLabelId}>
          Number
          <input
            className="phonebook__input"
            id={this.numberLabelId}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onInput={this.updateNumberState}
          />
        </label>
        <button className="phonebook__submit-btn" type="submit">Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func,
}