import React from "react";
import Statistics from "./Statistics";

export class App extends React.Component {
  state = { good: 0, neutral: 0, bad: 0 }
  keys = Object.keys(this.state);

  buildButton = (option) => <button className="voteButton" key={option} name={option} onClick={this.OnButtonClick}>{option}</button>;

  OnButtonClick = e => {
    const option = e.target.name;
    this.setState(oldState => ({ [option]: oldState[option] + 1 }));
  }

  countTotalFeedback = (list = App.options) => {
    return this.keys.reduce((acc, option) => (acc + this.state[option]), 0);
  }

  countPositivePercentage() {
    return Math.round(this.state.good / this.countTotalFeedback() * 100);
  }

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositivePercentage()
    return (
      <div>
        <h2>Please leave feedback</h2>
        {this.keys.map(key => this.buildButton(key))}
        <Statistics good={good} neutral={neutral} bad={bad} total={total} positivePercentage={positivePercentage}/>
      </div>
    )
  };
}

