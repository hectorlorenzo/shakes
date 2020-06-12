var fs = require("fs");
var path = require("path");

const pattern = /\n([A-Z]*)(\(1\))\s\s/;

class FileReader {
  chunk = "";
  foundChunk = false;
  readingStream = null;
  word = "";

  async findLineByWord(word) {
    if (!word) {
      throw new Error("Please provide a word.");
    }

    this.word = word;
    this.createStream();
    const chunk = await this.findChunk();
    const match = this.findLineInChunk(chunk);

    if (!match) {
      return null;
    }

    return {
      line: match[0],
      word: match[1],
      phonetics: match[2],
    };
  }

  createStream() {
    this.readingStream = fs.createReadStream(
      path.resolve(__dirname, "../data/a.txt"),
      {
        encoding: "utf8",
        highWaterMark: 16 * 1024,
      }
    );
  }

  findLineInChunk(chunk) {
    const wordRegex = new RegExp("(" + this.word + `)\\s\\s(.*)\\n`);
    return chunk.match(wordRegex);
  }

  findChunk() {
    let chunk = "";
    let previousChunk = "";

    if (!this.word) {
      return Promise.reject("No word was provided");
    }

    return new Promise((resolve, reject) => {
      this.readingStream.on("readable", () => {
        while ((chunk = this.readingStream.read()) !== null) {
          const match = chunk.match(pattern);

          if (!match || !match[1]) {
            continue;
          }

          if (this.word < match[1]) {
            resolve(previousChunk);
            break;
          } else {
            previousChunk = chunk;
          }
        }
      });

      this.readingStream.on("end", () => resolve(previousChunk));
      this.readingStream.on("error", (error) => reject(error));
    });
  }
}

module.exports = {
  FileReader,
};
