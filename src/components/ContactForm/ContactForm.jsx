import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import s from "./ContactForm.module.css";

import { generateName, generatePhone } from "helpers/personsProvider";
import { useLanguagesContext } from "../LanguageProvider";
import { nanoid } from "nanoid";

import icons from "resources/icons.svg";


export default function ContactForm({ addContact }) {
  const { text, currentLanguage } = useLanguagesContext();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const nameLabelID = useRef(nanoid());
  const numberLabelID = useRef(nanoid());

  const updateNameState = event => setName(event.target.value);
  const updateNumberState = event => setNumber(event.target.value);

  function onSubmit(event) {
    event.preventDefault();
    const format = str => str.trim().replace(/ +(?= )/g,''); // Removes extra spaces
    const success = addContact({ name: format(name), number: format(number) });
    if (success) {
      setName("");
      setNumber("");
    };
  }

  function submitGenerated () {
    const name = generateName(currentLanguage);
    const number = generatePhone(currentLanguage);
    addContact({ name, number });
  }

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <label className={s.formLabel} htmlFor={nameLabelID.current}>
        {text.name}
        <input
          className={s.formInput}
          type="text"
          name="name"
          id={nameLabelID.current}
          pattern="^[a-zA-Zа-яА-ЯіІєЄїЇґҐёЁ]+(([' -][a-zA-Zа-яА-ЯіІєЄїЇґҐёЁ ])?[a-zA-Zа-яА-ЯіІєЄїЇґҐёЁ]*)*$"
          title={text.nameMessage}
          required
          value={name}
          onChange={updateNameState}
        />
      </label>
      <label className={s.formLabel} htmlFor={numberLabelID.current}>
        {text.number}
        <input
          className={s.formInput}
          id={numberLabelID.current}
          type="tel"
          name="number"
          pattern="\+?\d{1,5}?[-.\s]?\(?\d{1,5}?\)?[-.\s]?\d{1,5}[-.\s]?\d{1,5}[-.\s]?\d{1,9}"
          title={text.phoneMessage}
          required
          value={number}
          onChange={updateNumberState}
        />
      </label>
      <div className={s.buttonGroup}>
        <button className={s.formButton} type="submit">{text.addContact}</button>
        <button className={s.formButton} type="button" onClick={submitGenerated}>
          <svg width="25" height="25">
            <use href={icons + "#random"} />
          </svg>
          {text.addRandom}
        </button>
      </div>
    </form>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func,
}