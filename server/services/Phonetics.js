const { FileReader } = require("./FileReader");

class Phonetics {
  constructor(word) {
    this.word = word;
  }

  findWordPhonetics() {
    const fr = new FileReader();

    return new Promise(async (resolve, reject) => {
      const res = await fr.findLineByWord(this.word.toUpperCase());

      if (!res || !res.phonetics) {
        reject(res);
      }

      resolve(res.phonetics);
    });
  }
}

module.exports = {
  Phonetics,
};
