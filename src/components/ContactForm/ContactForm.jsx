import React from "react";
import PropTypes from "prop-types";
import s from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { text } from "helpers/languageManager";
import icons from "resources/icons.svg";
import { generateName, generatePhone } from "helpers/personsProvider";


export default class ContactForm extends React.Component {
  static defaultState = { name: "", number: "" };

  constructor(props) { // Doing constructor to prevent eslint warning about static assignment
    super(props);
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
    const success = this.props.addContact({ name: format(name), number: format(number) });
    if (success) this.setState(ContactForm.defaultState);
  }

  submitGenerated = e => {
    const name = generateName();
    const number = generatePhone();
    this.props.addContact({ name, number });
  }

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.form} onSubmit={this.onSubmit}>
        <label className={s.formLabel} htmlFor={this.nameLabelId}>
          {text.name}
          <input
            className={s.formInput}
            type="text"
            name="name"
            id={this.nameLabelId}
            pattern="^[a-zA-Zа-яА-ЯіІєЄїЇґҐ\']+(([' -][a-zA-Zа-яА-ЯіІєЄїЇґҐ\' ])?[a-zA-Zа-яА-ЯіІєЄїЇґҐ\']*)*$"
            title={text.nameMessage}
            required
            value={name}
            onChange={this.updateNameState}
          />
        </label>
        <label className={s.formLabel} htmlFor={this.numberLabelId}>
          {text.number}
          <input
            className={s.formInput}
            id={this.numberLabelId}
            type="tel"
            name="number"
            pattern="\+?\d{1,5}?[-.\s]?\(?\d{1,5}?\)?[-.\s]?\d{1,5}[-.\s]?\d{1,5}[-.\s]?\d{1,9}"
            title={text.phoneMessage}
            required
            value={number}
            onChange={this.updateNumberState}
          />
        </label>
        <div className={s.buttonGroup}>
          <button className={s.formButton} type="submit">{text.addContact}</button>
          <button className={s.formButton} type="button" onClick={this.submitGenerated}>
            <svg width="25" height="25">
              <use href={icons + "#random"} />
            </svg>
            {text.addRandom}
          </button>
        </div>
      </form>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func,
}