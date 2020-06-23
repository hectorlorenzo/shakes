import { v4 as uuidv4 } from "uuid";

import {
  PoemStorage,
  getPoem,
  getRandomPoem,
  poemCount,
  storePoem,
} from "./PoemStore";

interface PoemInterface {
  text: string;
  uuid: string;
}

class Poem implements PoemInterface {
  text: string;
  uuid: string;
  numberOfLines: number;
  static storage: PoemStorage = {
    getPoem,
    getRandomPoem,
    poemCount,
    storePoem,
  };

  constructor(text: string, uuid?: string) {
    this.text = text;
    this.uuid = uuid || uuidv4();
    this.numberOfLines = text.split("\n").length;
  }

  parse(): string[] {
    return this.text.split("\n");
  }

  getLastLine() {
    return this.parse()[this.numberOfLines - 1];
  }

  appendLine(line: string) {
    this.text = `${this.text}\n${line}`;
    this.numberOfLines++;
  }

  private getLineRhyme(line: string) {
    const arrayOfWords = line.split(" ");
    return arrayOfWords[arrayOfWords.length - 1];
  }

  getCurrentRhyme(): string {
    if (this.numberOfLines < 2) {
      return "";
    }

    const penultimateLine = this.parse()[this.numberOfLines - 2];

    return this.getLineRhyme(penultimateLine);
  }
}

export default Poem;
