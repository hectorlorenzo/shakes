const { FileReader } = require("./FileReader");

const getPhonetics = (word) => {
  const fr = new FileReader();

  console.log("HELLO");

  return new Promise(async (resolve, reject) => {
    try {
      const res = await fr.findLineByWord(word.toUpperCase());

      if (!res || !res.phonetics) {
        throw new Error("Word not found.");
      }

      resolve(res.phonetics);
    } catch (error) {
      reject(error);
    }
  });
};

const strongPhonemeRegex = /([A-Z]*1)/;

const getPhoneticsRhyme = (phonetics) => {
  const match = strongPhonemeRegex.exec(phonetics);
  return phonetics.substring(match.index);
};

const wordsAreEqual = (words) => {
  if (words.length < 2) {
    return false;
  }

  let firstWord = words[0];

  return words.findIndex((w) => w !== firstWord) === -1;
};

const wordsRhyme = async (...words) => {
  if (wordsAreEqual(words)) {
    return Promise.reject("Words are all equal.");
  }

  return Promise.all(words.map((w) => getPhonetics(w))).then((phonetics) => {
    const strongPhoneme1 = getPhoneticsRhyme(phonetics[0]);
    const strongPhoneme2 = getPhoneticsRhyme(phonetics[1]);

    return {
      phonetics1: phonetics[0],
      phonetics2: phonetics[1],
      match: strongPhoneme1 === strongPhoneme2,
    };
  });
};

module.exports = {
  getPhonetics,
  wordsRhyme,
};
