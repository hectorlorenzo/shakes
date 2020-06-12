const { FileReader } = require("./FileReader");

class Phonetics {
  constructor(word) {
    this.word = word;
  }

  findWordPhonetics() {
    const fr = new FileReader();

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fr.findLineByWord(this.word.toUpperCase());

        if (!res || !res.phonetics) {
          throw new Error("Word not found.");
        }

        resolve(res.phonetics);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = {
  Phonetics,
};
