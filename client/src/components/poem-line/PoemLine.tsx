import React from "react";

interface PoemLineState {
  lineValue: string;
}

export class PoemLine extends React.Component<{}, PoemLineState> {
  state = {
    lineValue: "",
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ lineValue: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.checkLinePhonetics();
  };

  checkLinePhonetics() {
    const words = this.state.lineValue.split(" ");
    const lastWord = words[words.length - 1];

    fetch(`http://localhost:9000/rhymes/${lastWord}`)
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.lineValue}
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    );
  }
}
