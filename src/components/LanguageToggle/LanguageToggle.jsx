import React from "react";
import s from "./LanguageToggle.module.css";
import PropTypes from "prop-types";
import icons from "resources/icons.svg";


export default class LanguageToggle extends React.Component {

  state = { selectedLanguage: this.props.initialLanguage };

  nextState = e => {
    console.log(this.props.languagesList);
    this.setState(oldState => {
      const list = this.props.languagesList;

      var index = list.indexOf(oldState.selectedLanguage) + 1;
      if (index === list.length) index = 0;
      
      this.props.changeLanguage(list[index]);
      return { selectedLanguage: list[index] };
    });
  }

  render() {
    const { selectedLanguage } = this.state;
    return (
      <button type="button" className={s.toggle} onClick={this.nextState}>
        <svg className={s.svg} width="39" height="26">
          <use href={icons + "#language-" + selectedLanguage} />
        </svg>
      </button>
    );
  }
}

LanguageToggle.propTypes = {
  languagesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialLanguage: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired,
}