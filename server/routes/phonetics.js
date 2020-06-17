var express = require("express");
var router = express.Router();
const { Phonetics } = require("../services/Phonetics");

/* GET home page. */
router.get("/:word", function (req, res, next) {
  if (!req.params || !req.params.word) {
    throw new Error("No word has been sent.");
  }

  const wordPhonetics = new Phonetics(req.params.word);
  wordPhonetics.findWordPhonetics().then(
    (response) => {
      res.send({
        status: 200,
        type: "SUCCESS",
        message: response,
      });
    },
    () => {
      res.send({
        status: 200,
        type: "ERROR",
        message: "Word was not found on our dictionary.",
      });
    }
  );
});

module.exports = router;
