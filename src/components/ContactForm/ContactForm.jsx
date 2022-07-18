import React, { useState, useRef } from "react";
import s from "./ContactForm.module.css";

import { generateName, generatePhone } from "helpers/personsProvider";
import { useLanguagesContext } from "../LanguageProvider";
import { nanoid } from "nanoid";

import icons from "resources/icons.svg";

import { useSelector } from "react-redux";
import { useAddContact } from "redux/contactsSlice";
import { getLanguage } from "redux/selectors";


export default function ContactForm() {
  const currentLanguage = useSelector(getLanguage);
  const [ contacts, addContact ] = useAddContact();
  const { text } = useLanguagesContext();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const nameLabelID = useRef(nanoid());
  const numberLabelID = useRef(nanoid());

  const updateNameState = event => setName(event.target.value);
  const updateNumberState = event => setNumber(event.target.value);

  function contactExists(searchName) {
    searchName = searchName.toLowerCase();
    return contacts.some(({ name }) => name.toLowerCase() === searchName);
  }

  function onSubmit(event) {
    event.preventDefault();
    const format = str => str.trim().replace(/ +(?= )/g, ''); // Removes extra spaces
    const nameFormatted = format(name);
    if (contactExists(nameFormatted)) {
      alert(nameFormatted + text.alreadyInContacts);
      return;
    }
    addContact(nameFormatted, format(number), new Date().toISOString());
    setName("");
    setNumber("");
  }

  function submitGenerated() {
    let name;
    do { // This to make sure we're adding unique name
      name = generateName(currentLanguage);
    } while (contactExists(name));
    const phoneNumber = generatePhone(currentLanguage);
    addContact(name, phoneNumber, new Date().toISOString());
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
