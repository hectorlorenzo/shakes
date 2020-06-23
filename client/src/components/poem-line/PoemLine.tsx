import React from "react";
import syllable from "syllable";

interface PoemLineProps {
  onSubmit: (line: string) => void;
  rhymesWith: string;
}

interface PoemLineState {
  lineValue: string;
  error: boolean;
  currentNumberOfSyllables: number;
}

export class PoemLine extends React.Component<PoemLineProps, PoemLineState> {
  state = {
    lineValue: "",
    error: false,
    currentNumberOfSyllables: 0,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lineValue = event.target.value;
    this.setState({ lineValue, currentNumberOfSyllables: syllable(lineValue) });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ error: false });

    const words = this.state.lineValue.split(" ");
    const lastWord = words[words.length - 1];

    const rhymes = await this.doesItRhyme(lastWord, this.props.rhymesWith);

    if (rhymes && this.state.currentNumberOfSyllables === 10) {
      this.props.onSubmit(this.state.lineValue);
    } else {
      this.setState({ error: true });
    }
  };

  countSyllabes = (word: string): number => syllable(word);

  doesItRhyme = (word: string, rhymeWord: string): Promise<boolean> => {
    if (!rhymeWord) {
      return Promise.resolve(true);
    }

    return fetch(`http://localhost:9000/rhymes/${word}/${rhymeWord}`)
      .then((response) => response.json())
      .then(({ type, message }) => {
        if (type === "SUCCESS" && message.match) {
          return true;
        }
        return false;
      })
      .catch(() => false);
  };

  render() {
    return (
      <>
        {this.state.error && <p>There is an error</p>}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.lineValue}
            onChange={this.handleChange}
            style={{
              width: "300px",
            }}
          />
          <button>Submit</button>
        </form>
        <pre>{this.state.currentNumberOfSyllables}</pre>
      </>
    );
  }
}
